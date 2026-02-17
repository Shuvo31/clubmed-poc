from __future__ import annotations

import json
import os
from typing import Any, Dict, List, Optional

import httpx
from fastmcp import FastMCP

API_BASE_URL = os.getenv("CLUBMED_API_BASE_URL", "http://127.0.0.1:8080")
TIMEOUT_S = float(os.getenv("CLUBMED_API_TIMEOUT_S", "10"))

mcp = FastMCP(
    name="ClubMed MCP (REST + Maps Mock)",
    instructions=(
        "MCP server that calls an external REST API for village search, quotes, and map-ready results "
        "(markers/GeoJSON/nearby). Data is mock/static for now."
    ),
)

def _client() -> httpx.Client:
    return httpx.Client(base_url=API_BASE_URL, timeout=TIMEOUT_S)


@mcp.tool()
def search_villages(
    query: str = "",
    country: Optional[str] = None,
    region: Optional[str] = None,
    themes: Optional[List[str]] = None,
    limit: int = 10,
) -> Dict[str, Any]:
    params: Dict[str, Any] = {"q": query or "", "limit": limit}
    if country:
        params["country"] = country
    if region:
        params["region"] = region
    if themes:
        params["themes"] = themes

    with _client() as c:
        r = c.get("/villages", params=params)
        r.raise_for_status()
        return r.json()


@mcp.tool()
def get_quote(
    village_id: str,
    check_in: str,
    check_out: str,
    adults: int,
    children: int = 0,
) -> Dict[str, Any]:
    payload = {
        "village_id": village_id,
        "check_in": check_in,
        "check_out": check_out,
        "adults": adults,
        "children": children,
    }
    with _client() as c:
        r = c.post("/quote", json=payload)
        r.raise_for_status()
        return r.json()


# ----------------------------
# NEW: Map tools
# ----------------------------
@mcp.tool()
def get_map_markers(
    query: str = "",
    country: Optional[str] = None,
    region: Optional[str] = None,
    themes: Optional[List[str]] = None,
    limit: int = 100,
) -> Dict[str, Any]:
    """
    Returns marker list + bounds for rendering on a map UI.
    """
    params: Dict[str, Any] = {"q": query or "", "limit": limit}
    if country:
        params["country"] = country
    if region:
        params["region"] = region
    if themes:
        params["themes"] = themes

    with _client() as c:
        r = c.get("/map/markers", params=params)
        r.raise_for_status()
        return r.json()


@mcp.tool()
def get_map_geojson(
    query: str = "",
    country: Optional[str] = None,
    region: Optional[str] = None,
    themes: Optional[List[str]] = None,
    limit: int = 100,
) -> Dict[str, Any]:
    """
    Returns GeoJSON FeatureCollection (Points) for map layers.
    """
    params: Dict[str, Any] = {"q": query or "", "limit": limit}
    if country:
        params["country"] = country
    if region:
        params["region"] = region
    if themes:
        params["themes"] = themes

    with _client() as c:
        r = c.get("/map/geojson", params=params)
        r.raise_for_status()
        return r.json()


@mcp.tool()
def nearby_villages(
    lat: float,
    lng: float,
    radius_km: float = 50,
    limit: int = 10,
) -> Dict[str, Any]:
    """
    Returns villages within radius_km of a point (lat/lng).
    """
    params = {"lat": lat, "lng": lng, "radius_km": radius_km, "limit": limit}
    with _client() as c:
        r = c.get("/map/nearby", params=params)
        r.raise_for_status()
        return r.json()


# Optional connector-style fetch/search still ok to keep
@mcp.tool()
def search(query: str) -> Dict[str, Any]:
    with _client() as c:
        r = c.get("/villages", params={"q": query, "limit": 10})
        r.raise_for_status()
        data = r.json()

    results = []
    for v in data.get("villages", []):
        results.append(
            {
                "id": v["id"],
                "title": f'{v["name"]} ({v["country"]})',
                "snippet": f'Region: {v["region"]}. Themes: {", ".join(v.get("themes", []))}. Rating: {v.get("rating")}',
                "url": v.get("booking_url"),
                "metadata": {"type": "village"},
            }
        )
    return {"results": results}


@mcp.tool()
def fetch(id: str) -> Dict[str, Any]:
    with _client() as c:
        r = c.get(f"/villages/{id}")
        if r.status_code == 404:
            payload = {"ok": False, "reason": f"Unknown id: {id}"}
        else:
            r.raise_for_status()
            payload = {"ok": True, **r.json()}

    return {"content": [{"type": "text", "text": json.dumps(payload, ensure_ascii=False)}]}


if __name__ == "__main__":
    mcp.run(transport="sse")
