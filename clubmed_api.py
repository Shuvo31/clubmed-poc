from __future__ import annotations

from dataclasses import dataclass, asdict
from datetime import date
from typing import Any, Dict, List, Optional, Tuple
import math
import re

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="ClubMed API (Mock)", version="0.3.0")

# Allow your Vite dev server to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Mock data model (matches React shape)
# ----------------------------
@dataclass(frozen=True)
class Hotel:
    id: str
    name: str
    country: str
    region: str
    themes: List[str]
    minNights: int
    basePrice: int  # per night, displayed as €
    childDiscountPct: int
    rating: float
    bookingUrl: str
    lat: float
    lng: float
    image: str

    @property
    def coordinates(self) -> List[float]:
        # React expects [lng, lat]
        return [self.lng, self.lat]


HOTELS: List[Hotel] = [
    Hotel(
        id="cm-punta-cana",
        name="Punta Cana",
        country="Dominican Republic",
        region="Caribbean",
        themes=["beach", "family", "all-inclusive", "kids-club"],
        minNights=3,
        basePrice=240,
        childDiscountPct=40,
        rating=4.6,
        bookingUrl="https://www.clubmed.example/book/punta-cana",
        lat=18.5601,
        lng=-68.3725,
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    ),
    Hotel(
        id="cm-kani",
        name="Kani",
        country="Maldives",
        region="Indian Ocean",
        themes=["beach", "luxury", "snorkeling", "couples"],
        minNights=4,
        basePrice=420,
        childDiscountPct=30,
        rating=4.8,
        bookingUrl="https://www.clubmed.example/book/kani",
        lat=4.2979,
        lng=73.5065,
        image="https://images.unsplash.com/photo-1514282401047-430810e26beb?w=400&h=300&fit=crop",
    ),
    Hotel(
        id="cm-val-thorens",
        name="Val Thorens Sensations",
        country="France",
        region="Alps",
        themes=["ski", "mountains", "spa", "adults-only"],
        minNights=5,
        basePrice=310,
        childDiscountPct=0,
        rating=4.5,
        bookingUrl="https://www.clubmed.example/book/val-thorens",
        lat=45.2977,
        lng=6.5800,
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    ),
    Hotel(
        id="cm-la-rosiere",
        name="La Rosière",
        country="France",
        region="Alps",
        themes=["ski", "family", "kids-club"],
        minNights=5,
        basePrice=295,
        childDiscountPct=35,
        rating=4.4,
        bookingUrl="https://www.clubmed.example/book/la-rosiere",
        lat=45.6270,
        lng=6.8500,
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    ),
]


# ----------------------------
# Helpers
# ----------------------------
def _norm(s: str) -> str:
    return re.sub(r"\s+", " ", s.strip().lower())


def _match_hotel(h: Hotel, q: str) -> bool:
    qn = _norm(q)
    hay = " ".join([h.id, h.name, h.country, h.region, " ".join(h.themes)]).lower()
    return qn in hay


def _bounds_xy(points: List[Tuple[float, float]]) -> Dict[str, float]:
    # points are (lng, lat) => X=lng, Y=lat (matches your React bounds shape)
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    return {"minX": min(xs), "maxX": max(xs), "minY": min(ys), "maxY": max(ys)}


def _nights_between(check_in: str, check_out: str) -> int:
    y1, m1, d1 = map(int, check_in.split("-"))
    y2, m2, d2 = map(int, check_out.split("-"))
    return (date(y2, m2, d2) - date(y1, m1, d1)).days


def _quote_for(h: Hotel, nights: int, adults: int, children: int) -> Dict[str, Any]:
    if nights < h.minNights:
        return {"ok": False, "reason": f"Minimum stay for {h.name} is {h.minNights} nights."}

    adult_total = nights * adults * h.basePrice
    child_price = int(h.basePrice * (1 - h.childDiscountPct / 100))
    child_total = nights * children * child_price
    subtotal = adult_total + child_total

    # mock “no seasonality” for now
    total = int(subtotal)

    return {
        "ok": True,
        "hotel": {
            "id": h.id,
            "name": h.name,
            "country": h.country,
            "region": h.region,
        },
        "nights": nights,
        "adults": adults,
        "children": children,
        "currency": "EUR",
        "price_breakdown": {
            "adult_price_per_night": h.basePrice,
            "child_price_per_night": child_price,
            "adult_total": adult_total,
            "child_total": child_total,
            "subtotal": subtotal,
            "total": total,
        },
        "bookingUrl": h.bookingUrl,
    }


# ----------------------------
# Request schemas
# ----------------------------
class QuoteRequest(BaseModel):
    hotel_id: str = Field(..., description="Hotel/Village id")
    check_in: str = Field(..., description="YYYY-MM-DD")
    check_out: str = Field(..., description="YYYY-MM-DD")
    adults: int = Field(..., ge=1)
    children: int = Field(0, ge=0)


# ----------------------------
# Routes
# ----------------------------
@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.get("/hotels")
def list_hotels(
    q: str = "",
    country: Optional[str] = None,
    region: Optional[str] = None,
    themes: List[str] = Query(default=[]),
    limit: int = 100,
) -> Dict[str, Any]:
    res: List[Hotel] = []
    for h in HOTELS:
        if q and not _match_hotel(h, q):
            continue
        if country and _norm(country) != _norm(h.country):
            continue
        if region and _norm(region) != _norm(h.region):
            continue
        if themes and not all(_norm(t) in [x.lower() for x in h.themes] for t in themes):
            continue
        res.append(h)

    res = res[: max(0, limit)]

    def to_payload(x: Hotel) -> Dict[str, Any]:
        d = asdict(x)
        d["coordinates"] = x.coordinates
        return d

    return {"count": len(res), "hotels": [to_payload(h) for h in res]}


@app.get("/hotels/{hotel_id}")
def get_hotel(hotel_id: str) -> Dict[str, Any]:
    h = next((x for x in HOTELS if x.id == hotel_id), None)
    if not h:
        raise HTTPException(status_code=404, detail="Hotel not found")
    d = asdict(h)
    d["coordinates"] = h.coordinates
    return {"hotel": d}


@app.get("/map/search")
def map_search(
    q: str = "",
    country: Optional[str] = None,
    region: Optional[str] = None,
    themes: List[str] = Query(default=[]),
    limit: int = 100,
) -> Dict[str, Any]:
    data = list_hotels(q=q, country=country, region=region, themes=themes, limit=limit)
    hotels = data["hotels"]

    if hotels:
        b = _bounds_xy([(h["coordinates"][0], h["coordinates"][1]) for h in hotels])
    else:
        b = {"minX": 0, "maxX": 0, "minY": 0, "maxY": 0}

    # Return shape that your UI can consume easily
    return {"count": len(hotels), "bounds": b, "hotels": hotels}


@app.post("/quote")
def quote(req: QuoteRequest) -> Dict[str, Any]:
    h = next((x for x in HOTELS if x.id == req.hotel_id), None)
    if not h:
        raise HTTPException(status_code=404, detail="Hotel not found")

    nights = _nights_between(req.check_in, req.check_out)
    if nights <= 0:
        raise HTTPException(status_code=400, detail="check_out must be after check_in")

    return _quote_for(h, nights, req.adults, req.children)
