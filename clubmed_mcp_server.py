from __future__ import annotations

import json
import os
from typing import Any, Dict, List, Optional

import httpx
from fastmcp import FastMCP

API_BASE_URL = os.getenv("CLUBMED_API_BASE_URL", "http://127.0.0.1:8080")
TIMEOUT_S = float(os.getenv("CLUBMED_API_TIMEOUT_S", "10"))

mcp = FastMCP(
    name="ClubMed MCP (REST-backed, UI-shaped)",
    instructions=(
        "MCP tools backed by ClubMed mock REST API. Returns hotel/village data in the same shape "
        "as the React components expect (basePrice, minNights, bookingUrl, coordinates, image)."
    ),
)

def _client() -> httpx.Client:
    return httpx.Client(base_url=API_BASE_URL, timeout=TIMEOUT_S)

def _clean_params(
    query: str = "",
    country: Optional[str] = None,
    region: Optional[str] = None,
    themes: Optional[List[str]] = None,
    limit: int = 100,
) -> Dict[str, Any]:
    params: Dict[str, Any] = {"q": query or "", "limit": limit}
    if country:
        params["country"] = country
    if region:
        params["region"] = region
    if themes:
        params["themes"] = themes
    return params


@mcp.tool()
def list_hotels(
    query: str = "",
    country: Optional[str] = None,
    region: Optional[str] = None,
    themes: Optional[List[str]] = None,
    limit: int = 100,
) -> Dict[str, Any]:
    """Get hotels/villages in React-friendly shape."""
    params = _clean_params(query, country, region, themes, limit)
    with _client() as c:
        r = c.get("/hotels", params=params)
        r.raise_for_status()
        return r.json()


@mcp.tool()
def get_hotel(hotel_id: str) -> Dict[str, Any]:
    """Fetch a single hotel/village by id."""
    with _client() as c:
        r = c.get(f"/hotels/{hotel_id}")
        r.raise_for_status()
        return r.json()


@mcp.tool()
def map_search(
    query: str = "",
    country: Optional[str] = None,
    region: Optional[str] = None,
    themes: Optional[List[str]] = None,
    limit: int = 100,
) -> Dict[str, Any]:
    """
    Returns bounds + hotels array.
    bounds shape matches React: {minX,maxX,minY,maxY} where X=lng and Y=lat.
    """
    params = _clean_params(query, country, region, themes, limit)
    with _client() as c:
        r = c.get("/map/search", params=params)
        r.raise_for_status()
        return r.json()


@mcp.tool()
def get_quote(
    hotel_id: str,
    check_in: str,
    check_out: str,
    adults: int,
    children: int = 0,
) -> Dict[str, Any]:
    """Quote tool (uses /quote)."""
    payload = {
        "hotel_id": hotel_id,
        "check_in": check_in,
        "check_out": check_out,
        "adults": adults,
        "children": children,
    }
    with _client() as c:
        r = c.post("/quote", json=payload)
        r.raise_for_status()
        return r.json()


# Optional: connector-style search/fetch (nice for generic browsing flows)
@mcp.tool()
def search(query: str) -> Dict[str, Any]:
    with _client() as c:
        r = c.get("/hotels", params={"q": query, "limit": 10})
        r.raise_for_status()
        data = r.json()

    results = []
    for h in data.get("hotels", []):
        results.append(
            {
                "id": h["id"],
                "title": f'{h["name"]} ({h["country"]})',
                "snippet": f'Region: {h["region"]}. Themes: {", ".join(h.get("themes", []))}. Rating: {h.get("rating")}',
                "url": h.get("bookingUrl"),
                "metadata": {"type": "hotel"},
            }
        )
    return {"results": results}


@mcp.tool()
def fetch(id: str) -> Dict[str, Any]:
    with _client() as c:
        r = c.get(f"/hotels/{id}")
        if r.status_code == 404:
            payload = {"ok": False, "reason": f"Unknown id: {id}"}
        else:
            r.raise_for_status()
            payload = {"ok": True, **r.json()}

    return {"content": [{"type": "text", "text": json.dumps(payload, ensure_ascii=False)}]}


if __name__ == "__main__":
    # Keep SSE if that’s how you're running it; otherwise remove transport arg for stdio
    mcp.run(transport="sse")
