from __future__ import annotations

from dataclasses import dataclass, asdict
from datetime import date
from typing import Any, Dict, List, Optional, Tuple
import math
import re

from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field

app = FastAPI(title="ClubMed Static API", version="0.2.0")


# ----------------------------
# Static data (now includes lat/lng)
# ----------------------------
@dataclass(frozen=True)
class Village:
    id: str
    name: str
    country: str
    region: str
    themes: List[str]
    min_nights: int
    base_price_per_adult_per_night_eur: int
    child_discount_pct: int
    rating: float
    booking_url: str
    lat: float
    lng: float


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
        lat=18.5601,
        lng=-68.3725,
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
        lat=4.2979,
        lng=73.5065,
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
        lat=45.2977,
        lng=6.5800,
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
        lat=45.6270,
        lng=6.8500,
    ),
]


def _norm(s: str) -> str:
    return re.sub(r"\s+", " ", s.strip().lower())


def _match_village(v: Village, q: str) -> bool:
    qn = _norm(q)
    hay = " ".join([v.id, v.name, v.country, v.region, " ".join(v.themes)]).lower()
    return qn in hay


def _nights_between(check_in: str, check_out: str) -> int:
    y1, m1, d1 = map(int, check_in.split("-"))
    y2, m2, d2 = map(int, check_out.split("-"))
    return (date(y2, m2, d2) - date(y1, m1, d1)).days


def _quote_for(v: Village, nights: int, adults: int, children: int) -> Dict[str, Any]:
    if nights < v.min_nights:
        return {"ok": False, "reason": f"Minimum stay for {v.name} is {v.min_nights} nights."}

    adult_total = nights * adults * v.base_price_per_adult_per_night_eur
    child_price = int(v.base_price_per_adult_per_night_eur * (1 - v.child_discount_pct / 100))
    child_total = nights * children * child_price
    subtotal = adult_total + child_total
    total = int(subtotal * 1.0)

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


# --- geo helpers (Haversine) ---
def _haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371.0
    p1 = math.radians(lat1)
    p2 = math.radians(lat2)
    dp = math.radians(lat2 - lat1)
    dl = math.radians(lon2 - lon1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c


def _bounds(points: List[Tuple[float, float]]) -> Dict[str, float]:
    lats = [p[0] for p in points]
    lngs = [p[1] for p in points]
    return {"min_lat": min(lats), "min_lng": min(lngs), "max_lat": max(lats), "max_lng": max(lngs)}


# ----------------------------
# Schemas
# ----------------------------
class QuoteRequest(BaseModel):
    village_id: str
    check_in: str = Field(..., description="YYYY-MM-DD")
    check_out: str = Field(..., description="YYYY-MM-DD")
    adults: int = Field(..., ge=1)
    children: int = Field(0, ge=0)


@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.get("/villages")
def list_villages(
    q: str = "",
    country: Optional[str] = None,
    region: Optional[str] = None,
    themes: List[str] = Query(default=[]),
    limit: int = 10,
) -> Dict[str, Any]:
    res: List[Village] = []
    for v in VILLAGES:
        if q and not _match_village(v, q):
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


@app.get("/villages/{village_id}")
def get_village(village_id: str) -> Dict[str, Any]:
    v = next((x for x in VILLAGES if x.id == village_id), None)
    if not v:
        raise HTTPException(status_code=404, detail="Village not found")
    return {"village": asdict(v)}


@app.post("/quote")
def quote(req: QuoteRequest) -> Dict[str, Any]:
    v = next((x for x in VILLAGES if x.id == req.village_id), None)
    if not v:
        raise HTTPException(status_code=404, detail="Village not found")

    nights = _nights_between(req.check_in, req.check_out)
    if nights <= 0:
        raise HTTPException(status_code=400, detail="check_out must be after check_in")

    return _quote_for(v, nights, req.adults, req.children)


# ----------------------------
# Map endpoints
# ----------------------------
@app.get("/map/markers")
def map_markers(
    q: str = "",
    country: Optional[str] = None,
    region: Optional[str] = None,
    themes: List[str] = Query(default=[]),
    limit: int = 100,
) -> Dict[str, Any]:
    data = list_villages(q=q, country=country, region=region, themes=themes, limit=limit)
    villages = data["villages"]

    markers = [
        {
            "id": v["id"],
            "title": v["name"],
            "subtitle": f'{v["country"]} • {v["region"]}',
            "lat": v["lat"],
            "lng": v["lng"],
            "rating": v["rating"],
            "themes": v["themes"],
            "url": v["booking_url"],
        }
        for v in villages
    ]

    if markers:
        b = _bounds([(m["lat"], m["lng"]) for m in markers])
    else:
        b = {"min_lat": 0, "min_lng": 0, "max_lat": 0, "max_lng": 0}

    return {"count": len(markers), "bounds": b, "markers": markers}


@app.get("/map/geojson")
def map_geojson(
    q: str = "",
    country: Optional[str] = None,
    region: Optional[str] = None,
    themes: List[str] = Query(default=[]),
    limit: int = 100,
) -> Dict[str, Any]:
    data = list_villages(q=q, country=country, region=region, themes=themes, limit=limit)
    villages = data["villages"]

    features = []
    for v in villages:
        features.append(
            {
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [v["lng"], v["lat"]]},
                "properties": {
                    "id": v["id"],
                    "name": v["name"],
                    "country": v["country"],
                    "region": v["region"],
                    "themes": v["themes"],
                    "rating": v["rating"],
                    "url": v["booking_url"],
                },
            }
        )

    return {"type": "FeatureCollection", "features": features}


@app.get("/map/nearby")
def nearby(
    lat: float,
    lng: float,
    radius_km: float = 50,
    limit: int = 10,
) -> Dict[str, Any]:
    scored = []
    for v in VILLAGES:
        d = _haversine_km(lat, lng, v.lat, v.lng)
        if d <= radius_km:
            scored.append((d, v))

    scored.sort(key=lambda x: x[0])
    top = scored[: max(0, limit)]
    return {
        "origin": {"lat": lat, "lng": lng},
        "radius_km": radius_km,
        "count": len(top),
        "results": [
            {"distance_km": round(d, 2), "village": asdict(v)} for d, v in top
        ],
    }
