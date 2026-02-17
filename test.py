from __future__ import annotations

from dataclasses import dataclass, asdict
from datetime import date
from typing import Any, Dict, List, Optional, Tuple
import re

from fastmcp import FastMCP


# ----------------------------
# Static data (replace later with real APIs)
# ----------------------------
@dataclass(frozen=True)
class Village:
    id: str
    name: str
    country: str
    region: str          # e.g., "Caribbean", "Alps", "Indian Ocean"
    themes: List[str]    # e.g., ["beach", "family", "ski", "luxury"]
    min_nights: int
    base_price_per_adult_per_night_eur: int
    child_discount_pct: int  # discount on adult price
    rating: float            # static "quality" signal
    booking_url: str         # placeholder/stub


VILLAGES: List[Village] = [
    Village(
        id="cm-punta-cana",
        name="Punta Cana",
        country="Dominican Republic",
        region="Caribbean",
        themes=["beach", "family", "all-inclusive", "kids-club"],
        min_nights=3,
        base_price_per_adult_per_night_eur=240,
        child_discount_pct=40,
        rating=4.6,
        booking_url="https://www.clubmed.example/book/punta-cana",
    ),
    Village(
        id="cm-kani",
        name="Kani",
        country="Maldives",
        region="Indian Ocean",
        themes=["beach", "luxury", "snorkeling", "couples"],
        min_nights=4,
        base_price_per_adult_per_night_eur=420,
        child_discount_pct=30,
        rating=4.8,
        booking_url="https://www.clubmed.example/book/kani",
    ),
    Village(
        id="cm-val-thorens",
        name="Val Thorens Sensations",
        country="France",
        region="Alps",
        themes=["ski", "mountains", "spa", "adults-only"],
        min_nights=5,
        base_price_per_adult_per_night_eur=310,
        child_discount_pct=0,
        rating=4.5,
        booking_url="https://www.clubmed.example/book/val-thorens",
    ),
    Village(
        id="cm-la-rosiere",
        name="La Rosière",
        country="France",
        region="Alps",
        themes=["ski", "family", "kids-club"],
        min_nights=5,
        base_price_per_adult_per_night_eur=295,
        child_discount_pct=35,
        rating=4.4,
        booking_url="https://www.clubmed.example/book/la-rosiere",
    ),
]


# ----------------------------
# Helpers
# ----------------------------
def _norm(s: str) -> str:
    return re.sub(r"\s+", " ", s.strip().lower())


def _match_village(v: Village, q: str) -> bool:
    qn = _norm(q)
    hay = " ".join(
        [
            v.id,
            v.name,
            v.country,
            v.region,
            " ".join(v.themes),
        ]
    ).lower()
    return qn in hay


def _nights_between(check_in: str, check_out: str) -> int:
    # Expect YYYY-MM-DD
    y1, m1, d1 = map(int, check_in.split("-"))
    y2, m2, d2 = map(int, check_out.split("-"))
    return (date(y2, m2, d2) - date(y1, m1, d1)).days


def _quote_for(v: Village, nights: int, adults: int, children: int) -> Dict[str, Any]:
    if nights < v.min_nights:
        return {
            "ok": False,
            "reason": f"Minimum stay for {v.name} is {v.min_nights} nights.",
        }

    adult_total = nights * adults * v.base_price_per_adult_per_night_eur
    child_price = int(v.base_price_per_adult_per_night_eur * (1 - v.child_discount_pct / 100))
    child_total = nights * children * child_price

    subtotal = adult_total + child_total

    # Static seasonal multiplier example (replace later)
    # Very rough: Jul-Aug +20%, Dec +25%, otherwise base
    seasonal_multiplier = 1.0
    # (kept simple; you can base this on check-in month later)
    total = int(subtotal * seasonal_multiplier)

    return {
        "ok": True,
        "village": {"id": v.id, "name": v.name, "country": v.country, "region": v.region},
        "nights": nights,
        "adults": adults,
        "children": children,
        "currency": "EUR",
        "price_breakdown": {
            "adult_price_per_night": v.base_price_per_adult_per_night_eur,
            "child_price_per_night": child_price,
            "adult_total": adult_total,
            "child_total": child_total,
            "subtotal": subtotal,
            "total": total,
        },
        "booking_url": v.booking_url,
    }


# ----------------------------
# MCP server
# ----------------------------
mcp = FastMCP(
    name="ClubMed (Static) MCP",
    instructions=(
        "Static MCP server for Club Med-like village discovery and quoting. "
        "Data is hardcoded for now; replace with real APIs later."
    ),
)


@mcp.tool()
def search_villages(
    query: str = "",
    country: Optional[str] = None,
    region: Optional[str] = None,
    themes: Optional[List[str]] = None,
    limit: int = 10,
) -> Dict[str, Any]:
    """
    Find villages matching text query and optional filters.
    """
    themes = themes or []
    res: List[Village] = []

    for v in VILLAGES:
        if query and not _match_village(v, query):
            continue
        if country and _norm(country) != _norm(v.country):
            continue
        if region and _norm(region) != _norm(v.region):
            continue
        if themes and not all(_norm(t) in [x.lower() for x in v.themes] for t in themes):
            continue
        res.append(v)

    res = res[: max(0, limit)]
    return {"count": len(res), "villages": [asdict(v) for v in res]}


@mcp.tool()
def recommend_villages(
    intent: str,
    adults: int = 2,
    children: int = 0,
    preferred_region: Optional[str] = None,
    limit: int = 5,
) -> Dict[str, Any]:
    """
    Recommend villages using a simple, static scoring heuristic.
    """
    intent_n = _norm(intent)
    preferred_region_n = _norm(preferred_region) if preferred_region else None

    scored: List[Tuple[float, Village]] = []
    for v in VILLAGES:
        score = v.rating

        # intent/theme match
        for th in v.themes:
            if _norm(th) in intent_n:
                score += 0.6

        # family fit
        if children > 0 and "kids-club" in [t.lower() for t in v.themes]:
            score += 0.5
        if children == 0 and "adults-only" in [t.lower() for t in v.themes]:
            score += 0.3

        # region preference
        if preferred_region_n and preferred_region_n == _norm(v.region):
            score += 0.4

        scored.append((score, v))

    scored.sort(key=lambda x: x[0], reverse=True)
    top = scored[: max(0, limit)]

    return {
        "intent": intent,
        "recommendations": [
            {
                "score": round(score, 2),
                "village": asdict(v),
                "why": [
                    "rating-based baseline",
                    "theme match (static heuristic)",
                    "family/adults fit (static heuristic)",
                    "region preference (if provided)",
                ],
            }
            for score, v in top
        ],
    }


@mcp.tool()
def get_quote(
    village_id: str,
    check_in: str,
    check_out: str,
    adults: int,
    children: int = 0,
) -> Dict[str, Any]:
    """
    Produce a simple quote with a static pricing model.
    Dates must be YYYY-MM-DD.
    """
    v = next((x for x in VILLAGES if x.id == village_id), None)
    if not v:
        return {"ok": False, "reason": f"Unknown village_id: {village_id}"}

    nights = _nights_between(check_in, check_out)
    if nights <= 0:
        return {"ok": False, "reason": "check_out must be after check_in"}

    return _quote_for(v, nights, adults, children)


# Optional: Connector-style tools (search/fetch)
# Useful later if you want ChatGPT connector/deep research style integration
# that expects `search` and `fetch`. (Not required for your custom app flow.)
@mcp.tool()
def search(query: str) -> Dict[str, Any]:
    """
    Connector-style search: returns a list of result objects.
    """
    matches = [v for v in VILLAGES if _match_village(v, query)]
    results = [
        {
            "id": v.id,
            "title": f"{v.name} ({v.country})",
            "snippet": f"Region: {v.region}. Themes: {', '.join(v.themes)}. Rating: {v.rating}",
            "url": v.booking_url,
            "metadata": {"type": "village"},
        }
        for v in matches[:10]
    ]
    return {"results": results}


@mcp.tool()
def fetch(id: str) -> Dict[str, Any]:
    """
    Connector-style fetch: returns one text content item with JSON payload.
    """
    v = next((x for x in VILLAGES if x.id == id), None)
    if not v:
        payload = {"ok": False, "reason": f"Unknown id: {id}"}
    else:
        payload = {"ok": True, "village": asdict(v)}

    # MCP tool result format: {"content":[{"type":"text","text":"..."}]}
    # Keeping this simple for now.
    import json
    return {"content": [{"type": "text", "text": json.dumps(payload, ensure_ascii=False)}]}


if __name__ == "__main__":
    # Default transport is STDIO (good for local dev + Agents SDK stdio)
    mcp.run(transport="sse")
