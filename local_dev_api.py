import json
import asyncio
import sys
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Add src to path to import our modules
sys.path.insert(0, str(Path(__file__).parent))

from src.clubmed_client import ClubMedClient

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def _load_config() -> dict[str, str]:
    """Load config.json from the project root."""
    config_path = Path(__file__).parent / "config.json"
    with config_path.open() as f:
        return json.load(f)

def _extract_villages(destinations_response: dict) -> list[dict]:
    """Extract a flat list of village dicts with coordinates from the destinations API."""
    villages: list[dict] = []
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

def _build_product_index(products: list[dict]) -> dict[str, dict]:
    """Index products by resort_id for merging with village coordinates."""
    index: dict[str, dict] = {}
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

def _enrich_villages(villages: list[dict], product_index: dict[str, dict]) -> list[dict]:
    """Merge village coordinates with rich product data."""
    enriched: list[dict] = []
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

@app.get("/api/clubmed-data")
async def get_clubmed_data():
    config = _load_config()
    client = ClubMedClient(
        api_key=config["clubmed_api_key"],
        language=config.get("clubmed_language", "en-US"),
    )

    # 1. Fetch villages
    dest_resp = await client.get_destinations(filter=["countries.products.type==VILLAGE"])
    villages = _extract_villages(dest_resp) if "error" not in dest_resp else []

    # 2. Enrich
    products = await client.get_all_products(limit=50, max_pages=8)
    product_index = _build_product_index(products)
    enriched = _enrich_villages(villages, product_index) if villages else []

    return enriched

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)