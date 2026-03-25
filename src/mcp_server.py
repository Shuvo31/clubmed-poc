"""Club Med MCP Server — HTTP Streamable transport via FastMCP."""

import json
import logging
from contextlib import asynccontextmanager
from copy import deepcopy
from pathlib import Path
from typing import Annotated, Any, AsyncIterator, Optional

import mcp.types as types
from mcp.server.fastmcp import Context, FastMCP

from src.clubmed_client import ClubMedClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

_VENDOR_DIR = Path(__file__).parent / "vendor"

WIDGET_TOOL_NAME = "show-clubmed-village-map"
WIDGET_RESOURCE_URI = "ui://widget/clubmed-village-map.html"
WIDGET_MIME_TYPE = "text/html+skybridge"

_widget_html_cache: str = ""
_villages_cache: list[dict[str, Any]] = []


def _load_config() -> dict[str, str]:
    """Load config.json from the project root (two levels up from src/)."""
    config_path = Path(__file__).parent.parent / "config.json"
    with config_path.open() as f:
        return json.load(f)


# ---------------------------------------------------------------------------
# Village data extraction + product enrichment
# ---------------------------------------------------------------------------


def _extract_villages(destinations_response: dict[str, Any]) -> list[dict[str, Any]]:
    """Extract a flat list of village dicts with coordinates from the destinations API."""
    villages: list[dict[str, Any]] = []
    raw = destinations_response.get("destinations", [])
    if not isinstance(raw, list):
        return villages
    for geo_area in raw:
        area_label = geo_area.get("geographical_area", "")
        for country in geo_area.get("countries", []):
            country_label = country.get("label", "")
            for product in country.get("products", []):
                if product.get("type") != "VILLAGE":
                    continue
                coords = product.get("coordinates")
                if not coords:
                    continue
                lat = coords.get("latitude")
                lng = coords.get("longitude")
                if lat is None or lng is None:
                    continue
                villages.append({
                    "id": product.get("id", ""),
                    "name": product.get("id", ""),
                    "country": country_label,
                    "area": area_label,
                    "latitude": lat,
                    "longitude": lng,
                })
    return villages


def _build_product_index(products: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    """Index products by resort_id for merging with village coordinates."""
    index: dict[str, dict[str, Any]] = {}
    for p in products:
        rid = p.get("resort_id") or p.get("id", "")
        if not rid or rid in index:
            continue
        media = p.get("media") or {}
        price = p.get("price") or {}
        initial = price.get("initial_price") or {}
        best = price.get("best_price") or {}
        comfort = p.get("comfort") or {}
        dest = p.get("destination") or {}
        countries = dest.get("countries") or []
        geo = dest.get("geographical_area") or {}
        accom = p.get("accommodations_introduction") or {}
        accom_imgs = accom.get("images") or []
        index[rid] = {
            "fullTitle": p.get("full_title") or p.get("title") or rid,
            "image": media.get("immersive_image") or "",
            "surroundings": media.get("surroundings_images") or [],
            "initialPrice": initial.get("per_trip"),
            "bestPrice": best.get("per_trip"),
            "currency": price.get("currency", "EUR"),
            "comfortLevel": comfort.get("level"),
            "comfortLabel": comfort.get("label", ""),
            "seasons": p.get("seasons") or [],
            "descTitle": p.get("description_title") or "",
            "tags": p.get("tags") or [],
            "productLine": p.get("product_line") or [],
            "countryLabel": countries[0].get("label", "") if countries else "",
            "areaLabel": geo.get("label", ""),
            "accomDesc": accom.get("description") or "",
            "accomShort": accom.get("short_description") or "",
            "accomImg": accom_imgs[0] if accom_imgs else "",
            "categoryId": (p.get("category") or {}).get("id", ""),
        }
    return index


def _enrich_villages(
    villages: list[dict[str, Any]], product_index: dict[str, dict[str, Any]]
) -> list[dict[str, Any]]:
    """Merge village coordinates with rich product data."""
    enriched: list[dict[str, Any]] = []
    for v in villages:
        vid = v["id"]
        p = product_index.get(vid, {})
        enriched.append({
            "id": vid,
            "n": p.get("fullTitle") or vid,
            "co": p.get("countryLabel") or v.get("country", ""),
            "ar": p.get("areaLabel") or v.get("area", ""),
            "lat": v["latitude"],
            "lng": v["longitude"],
            "img": p.get("image", ""),
            "si": p.get("surroundings", []),
            "ip": p.get("initialPrice"),
            "bp": p.get("bestPrice"),
            "cur": p.get("currency", "EUR"),
            "cl": p.get("comfortLevel"),
            "ss": p.get("seasons", []),
            "dt": p.get("descTitle", ""),
            "ec": "EXCLUSIVE_COLLECTION" in p.get("productLine", []),
            "tags": p.get("tags", []),
            "cat": p.get("categoryId", ""),
            "ad": p.get("accomDesc", ""),
            "ai": p.get("accomImg", ""),
        })
    enriched.sort(key=lambda x: (0 if x["img"] else 1, x["n"]))
    return enriched


# ---------------------------------------------------------------------------
# Widget HTML generation
# ---------------------------------------------------------------------------


def _load_vendor(filename: str) -> str:
    """Read a vendored asset from src/vendor/ and return its contents."""
    return (_VENDOR_DIR / filename).read_text(encoding="utf-8")


def _generate_village_map_html(villages: list[dict[str, Any]]) -> str:
    """Reads the bundled Vite single-file HTML and injects the village data."""
    dist_path = Path(__file__).parent / "react-clubmed" / "ui" / "dist" / "index.html"
    if not dist_path.exists():
        return f"<h1>Error: React app build not found at {dist_path}</h1><p>Please run 'npm run build' in the react-clubmed/ui directory.</p>"
    
    html = dist_path.read_text(encoding="utf-8")
    
    # Inject the real data
    villages_json = json.dumps(villages, ensure_ascii=False)
    # The placeholder is: /* CLUBMED_DATA_PLACEHOLDER */null
    placeholder = "/* CLUBMED_DATA_PLACEHOLDER */null"
    html = html.replace(placeholder, villages_json)
    
    return html

# ---------------------------------------------------------------------------
# Lifespan
# ---------------------------------------------------------------------------


@asynccontextmanager
async def lifespan(server: FastMCP) -> AsyncIterator[dict[str, Any]]:
    """Create and tear down the ClubMedClient for the server lifetime."""
    global _widget_html_cache, _villages_cache  # noqa: PLW0603

    config = _load_config()
    client = ClubMedClient(
        api_key=config["clubmed_api_key"],
        language=config.get("clubmed_language", "fr-FR"),
    )

    # 1. Fetch village coordinates from destinations API
    villages: list[dict[str, Any]] = []
    try:
        dest_resp = await client.get_destinations(
            filter=["countries.products.type==VILLAGE"]
        )
        if "error" in dest_resp:
            logger.warning("Could not fetch villages: %s", dest_resp["error"])
        else:
            villages = _extract_villages(dest_resp)
            logger.info("Loaded %d village coordinates.", len(villages))
    except Exception as exc:  # noqa: BLE001
        logger.warning("Exception fetching villages: %s", exc)

    # 2. Fetch products for enrichment (images, prices, ratings)
    product_index: dict[str, dict[str, Any]] = {}
    try:
        products = await client.get_all_products(limit=50, max_pages=8)
        if products:
            product_index = _build_product_index(products)
            logger.info("Loaded %d products for enrichment.", len(product_index))
    except Exception as exc:  # noqa: BLE001
        logger.warning("Exception fetching products: %s", exc)

    # 3. Enrich and generate widget
    enriched = _enrich_villages(villages, product_index) if villages else []
    village_map_html = _generate_village_map_html(enriched)

    _villages_cache = enriched
    _widget_html_cache = village_map_html

    logger.info("Club Med MCP Server starting (HTTP Streamable on 0.0.0.0:8000/mcp)...")
    yield {"client": client, "villages": enriched, "village_map_html": village_map_html}
    logger.info("Club Med MCP Server shutting down.")


# ---------------------------------------------------------------------------
# FastMCP server
# ---------------------------------------------------------------------------

mcp = FastMCP(
    name="club-med-mcp",
    host="0.0.0.0",
    port=8000,
    streamable_http_path="/mcp",
    lifespan=lifespan,
)


# ---------------------------------------------------------------------------
# Tool: get_clubmed_products
# ---------------------------------------------------------------------------


@mcp.tool(
    description=(
        "Query Club Med resorts (products) from the official Club Med API. "
        "Returns a list of resort objects with full details: name, location, "
        "category, comfort level, available services, pricing, accommodations, "
        "media, and more.\n\n"
        "PAGINATION: Use `limit` and `page` to paginate. "
        "Check `pagination.has_more` — if true, increment `page`.\n\n"
        "FILTERING: Use `filter` with format `<field><op><value>`. Examples:\n"
        "  - filter=['destination.countries.id==FR']  → France\n"
        "  - filter=['category.id==sun']              → sun/beach\n"
        "  - filter=['comfort.level>=4']              → 4+ tridents\n"
        "  - filter=['opening_status==OPEN']          → open resorts\n\n"
        "LANGUAGE: e.g. 'en-US', 'fr-FR'. Defaults to fr-FR."
    )
)
async def get_clubmed_products(
    ctx: Context,
    limit: Annotated[Optional[int], "Products per page (e.g. 20)."] = None,
    page: Annotated[Optional[int], "Page number, starting from 1."] = None,
    filter: Annotated[
        Optional[list[str]],
        "Filter expressions. Example: ['destination.countries.id==FR']",
    ] = None,
    language: Annotated[
        Optional[str], "Locale, e.g. 'en-US', 'fr-FR'. Defaults to fr-FR."
    ] = None,
) -> str:
    """Call the Club Med /v2/products API and return the result as JSON."""
    client: ClubMedClient = ctx.request_context.lifespan_context["client"]
    result = await client.get_products(limit=limit, page=page, filter=filter, language=language)
    return json.dumps(result, ensure_ascii=False, indent=2)


# ---------------------------------------------------------------------------
# Tool: get_clubmed_destinations
# ---------------------------------------------------------------------------


@mcp.tool(
    description=(
        "Query Club Med destinations from the official Club Med API. "
        "Returns all resorts by geographic hierarchy: areas → countries → products.\n\n"
        "FILTERING: Use `filter` to narrow results.\n"
        "LANGUAGE: e.g. 'en-US', 'fr-FR'. Defaults to fr-FR."
    )
)
async def get_clubmed_destinations(
    ctx: Context,
    filter: Annotated[
        Optional[list[str]],
        "Filter expressions. Example: ['countries.products.type==VILLAGE']",
    ] = None,
    language: Annotated[
        Optional[str], "Locale, e.g. 'en-US', 'fr-FR'. Defaults to fr-FR."
    ] = None,
) -> str:
    """Call the Club Med /v0/destinations API and return the result as JSON."""
    client: ClubMedClient = ctx.request_context.lifespan_context["client"]
    result = await client.get_destinations(filter=filter, language=language)
    return json.dumps(result, ensure_ascii=False, indent=2)


# ---------------------------------------------------------------------------
# Widget tool + resource: show-clubmed-village-map
# ---------------------------------------------------------------------------

_WIDGET_TOOL_META: dict[str, Any] = {
    "openai/outputTemplate": WIDGET_RESOURCE_URI,
    "openai/toolInvocation/invoking": "Loading Club Med village map\u2026",
    "openai/toolInvocation/invoked": "Club Med village map ready",
    "openai/widgetAccessible": True,
}

_WIDGET_TOOL_SCHEMA: dict[str, Any] = {
    "type": "object",
    "properties": {},
    "required": [],
    "additionalProperties": False,
}


def _build_widget_tool() -> types.Tool:
    return types.Tool(
        name=WIDGET_TOOL_NAME,
        title="Show Club Med Village Map",
        description=(
            "Display an interactive map of all Club Med villages worldwide with "
            "resort photos, prices, ratings, and details."
        ),
        inputSchema=deepcopy(_WIDGET_TOOL_SCHEMA),
        _meta=deepcopy(_WIDGET_TOOL_META),
        annotations=types.ToolAnnotations(
            readOnlyHint=True, destructiveHint=False, openWorldHint=False
        ),
    )


def _build_widget_resource() -> types.Resource:
    return types.Resource(
        name="Club Med Village Map",
        title="Club Med Village Map",
        uri="ui://widget/clubmed-village-map.html",  # type: ignore[arg-type]
        description="Interactive map of Club Med villages (HTML widget)",
        mimeType=WIDGET_MIME_TYPE,
        _meta=deepcopy(_WIDGET_TOOL_META),
    )


def _build_widget_resource_template() -> types.ResourceTemplate:
    return types.ResourceTemplate(
        name="Club Med Village Map",
        title="Club Med Village Map",
        uriTemplate=WIDGET_RESOURCE_URI,
        description="Interactive map of Club Med villages (HTML widget)",
        mimeType=WIDGET_MIME_TYPE,
        _meta=deepcopy(_WIDGET_TOOL_META),
    )


# ---------------------------------------------------------------------------
# Register widget handlers
# ---------------------------------------------------------------------------


def _register_widget_handlers() -> None:
    server = mcp._mcp_server  # type: ignore[attr-defined]

    _orig_list_tools = server.request_handlers[types.ListToolsRequest]

    async def _list_tools_w(req: types.ListToolsRequest) -> types.ServerResult:
        orig: types.ServerResult = await _orig_list_tools(req)
        tools: list[types.Tool] = list(orig.root.tools)  # type: ignore[union-attr]
        tools.append(_build_widget_tool())
        return types.ServerResult(types.ListToolsResult(tools=tools))

    server.request_handlers[types.ListToolsRequest] = _list_tools_w

    _orig_call_tool = server.request_handlers[types.CallToolRequest]

    async def _call_tool_w(req: types.CallToolRequest) -> types.ServerResult:
        if req.params.name != WIDGET_TOOL_NAME:
            return await _orig_call_tool(req)
        count = len(_villages_cache)
        return types.ServerResult(
            types.CallToolResult(
                content=[types.TextContent(
                    type="text",
                    text=f"Displaying Club Med village map with {count} villages.",
                )],
                structuredContent={"villageCount": count},
                _meta={
                    "openai/toolInvocation/invoking": _WIDGET_TOOL_META[
                        "openai/toolInvocation/invoking"
                    ],
                    "openai/toolInvocation/invoked": _WIDGET_TOOL_META[
                        "openai/toolInvocation/invoked"
                    ],
                },
            )
        )

    server.request_handlers[types.CallToolRequest] = _call_tool_w

    async def _list_res(req: types.ListResourcesRequest) -> types.ServerResult:
        return types.ServerResult(
            types.ListResourcesResult(resources=[_build_widget_resource()])
        )

    server.request_handlers[types.ListResourcesRequest] = _list_res

    async def _list_res_tpl(req: types.ListResourceTemplatesRequest) -> types.ServerResult:
        return types.ServerResult(
            types.ListResourceTemplatesResult(
                resourceTemplates=[_build_widget_resource_template()]
            )
        )

    server.request_handlers[types.ListResourceTemplatesRequest] = _list_res_tpl

    async def _read_res(req: types.ReadResourceRequest) -> types.ServerResult:
        uri_str = str(req.params.uri)
        if uri_str != WIDGET_RESOURCE_URI:
            return types.ServerResult(
                types.ReadResourceResult(contents=[], _meta={"error": f"Unknown: {uri_str}"})
            )
        html = _widget_html_cache or _generate_village_map_html([])
        return types.ServerResult(
            types.ReadResourceResult(
                contents=[types.TextResourceContents(
                    uri=req.params.uri,  # type: ignore[arg-type]
                    mimeType=WIDGET_MIME_TYPE,
                    text=html,
                    _meta=deepcopy(_WIDGET_TOOL_META),
                )]
            )
        )

    server.request_handlers[types.ReadResourceRequest] = _read_res


_register_widget_handlers()


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------


def main() -> None:
    """Sync entry point — called by the `club-med-mcp` console script."""
    mcp.run(transport="streamable-http")


if __name__ == "__main__":
    main()
