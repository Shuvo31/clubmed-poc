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
    """Generate widget HTML matching Club Med Figma designs with Trident UI tokens."""
    leaflet_css = _load_vendor("leaflet.min.css")
    leaflet_js = _load_vendor("leaflet.min.js")
    villages_json = json.dumps(villages, ensure_ascii=False)

    # The HTML template uses Trident UI design tokens, Club Med brand styling,
    # gold trident markers, resort image cards, and a fullscreen detail panel.
    return (
        "<!doctype html>\n"
        '<html lang="en">\n<head>\n'
        '<meta charset="utf-8"/>\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1"/>\n'
        "<title>Club Med Villages</title>\n"
        '<link rel="preconnect" href="https://fonts.googleapis.com"/>\n'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>\n'
        '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700'
        "&family=Newsreader:opsz,wght@6..72,400;6..72,700&display=swap\" "
        'rel="stylesheet"/>\n'
        "<style>\n"
        + leaflet_css
        + "\n"
        + _get_widget_css()
        + "\n</style>\n</head>\n<body>\n"
        '<div id="map"></div>\n'
        '<div id="ntag"></div>\n'
        '<div id="cw"><div class="ct" id="carousel"></div></div>\n'
        '<div id="sb">\n'
        '  <div class="sb-hdr"><div class="sb-logo">Club Med<span>\u03A8</span></div></div>\n'
        '  <div id="sb-list"></div>\n'
        "</div>\n"
        '<div id="dp"></div>\n'
        "<script>\n"
        + leaflet_js
        + "\n</script>\n<script>\n"
        + _get_widget_js(villages_json)
        + "\n</script>\n</body>\n</html>"
    )


def _get_widget_css() -> str:
    """Return the widget CSS with Trident UI design tokens."""
    return """\
:root{
  --color-black:0deg 0% 0%;--color-black-active:0deg 0% 20%;
  --color-ultramarine:227deg 38% 19%;--color-ultramarine-active:227deg 38% 29%;
  --color-lavender:229deg 80% 79%;--color-saffron:45deg 100% 50%;
  --color-saffron-active:45deg 100% 45%;--color-lightSand:32deg 45% 94%;
  --color-white:0deg 0% 100%;--color-pearl:0deg 0% 97%;
  --color-darkGrey:0deg 0% 20%;--color-middleGrey:0deg 0% 40%;
  --color-grey:0deg 0% 60%;--color-lightGrey:0deg 0% 80%;
  --color-green:131deg 89% 29%;--color-sienna:13deg 48% 39%;
  --color-wave:180 100% 25%;--color-sand:35deg 18% 80%;
  --font-sans:'Inter','Helvetica Neue',Helvetica,Arial,sans-serif;
  --font-serif:'Newsreader','Times New Roman',Times,serif;
  --ease-boop:cubic-bezier(0.47,1.64,0.41,0.8);
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--font-sans);overflow:hidden;color:hsl(var(--color-black));background:hsl(var(--color-pearl))}
#map{width:100%;height:100%;position:absolute;inset:0}
/* Markers */
.cm-mk{
  width:30px;height:30px;border-radius:50%;
  background:hsl(var(--color-saffron));border:2.5px solid #fff;
  display:flex;align-items:center;justify-content:center;
  color:#fff;font-size:15px;font-weight:700;font-family:var(--font-serif);
  box-shadow:0 2px 8px rgba(0,0,0,0.25);cursor:pointer;
  transition:transform 0.3s var(--ease-boop),box-shadow 0.2s;
}
.cm-mk.sel{
  transform:scale(1.4);z-index:999!important;
  box-shadow:0 0 0 5px hsl(var(--color-saffron)/0.3),0 3px 12px rgba(0,0,0,0.3);
}
/* Carousel */
#cw{position:absolute;bottom:0;left:0;right:0;z-index:800;
  background:linear-gradient(to top,hsl(var(--color-white)) 75%,transparent)}
.ct{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;
  -webkit-overflow-scrolling:touch;scrollbar-width:none;padding:14px 16px}
.ct::-webkit-scrollbar{display:none}
/* Resort Card */
.rc{scroll-snap-align:start;flex:0 0 230px;background:#fff;
  border-radius:12px;overflow:hidden;cursor:pointer;
  box-shadow:0 2px 12px rgba(0,0,0,0.08);border:1.5px solid transparent;
  transition:border-color 0.15s,transform 0.15s}
.rc:hover{border-color:hsl(var(--color-saffron));transform:translateY(-2px)}
.rc.sel{border-color:hsl(var(--color-saffron));background:hsl(var(--color-lightSand))}
.rc-img{width:100%;height:130px;background-size:cover;background-position:center;
  background-color:hsl(var(--color-sand));position:relative}
.rc-body{padding:10px 12px}
.rc-name{font-family:var(--font-serif);font-weight:700;font-size:0.9375rem;line-height:1.2rem;
  color:hsl(var(--color-black));white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rc-loc{font-size:0.75rem;color:hsl(var(--color-middleGrey));margin-top:3px;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.rc-price{margin-top:6px;font-size:0.9375rem;display:flex;align-items:baseline;gap:6px}
.rc-ip{text-decoration:line-through;color:hsl(var(--color-grey));font-size:0.75rem}
.rc-bp{font-weight:700;color:hsl(var(--color-black))}
.rc-sub{font-size:0.625rem;color:hsl(var(--color-middleGrey));margin-top:1px}
/* Badges */
.badge{display:inline-flex;align-items:center;padding:2px 8px;border-radius:7.5rem;
  font-size:0.625rem;font-weight:600;line-height:1rem;border:1px solid;text-transform:capitalize}
.badge-winter{border-color:hsl(var(--color-ultramarine));color:hsl(var(--color-ultramarine));background:#fff}
.badge-summer{border-color:hsl(var(--color-saffron-active));color:hsl(var(--color-saffron-active));background:#fff}
.badge-ec{background:hsl(var(--color-wave));color:#fff;border-color:hsl(var(--color-wave));font-size:0.5625rem}
/* Rating */
.rating{display:flex;align-items:center;gap:4px;margin-top:5px}
.rating-num{font-size:0.75rem;font-weight:600;color:hsl(var(--color-black))}
.dots{display:flex;gap:2px}
.dot{width:7px;height:7px;border-radius:50%;background:hsl(var(--color-lightGrey))}
.dot.on{background:hsl(var(--color-saffron))}
/* Name Tag */
#ntag{position:absolute;top:12px;left:50%;transform:translateX(-50%);
  background:#fff;border-radius:7.5rem;padding:6px 18px;z-index:900;
  box-shadow:0 2px 12px rgba(0,0,0,0.14);font-size:0.8125rem;font-weight:600;
  color:hsl(var(--color-black));pointer-events:none;white-space:nowrap;display:none}
/* Sidebar */
#sb{position:absolute;top:0;left:0;bottom:0;width:280px;background:#fff;
  overflow-y:auto;z-index:800;box-shadow:2px 0 10px rgba(0,0,0,0.06);display:none}
.sb-hdr{padding:14px 16px;border-bottom:1px solid hsl(var(--color-pearl));
  position:sticky;top:0;background:#fff;z-index:1;display:flex;align-items:center;gap:6px}
.sb-logo{font-family:var(--font-serif);font-weight:700;font-size:1.125rem;color:hsl(var(--color-black))}
.sb-logo span{color:hsl(var(--color-saffron));font-size:1.25rem}
.si{padding:10px 14px;cursor:pointer;border-bottom:1px solid hsl(var(--color-pearl));
  transition:background 0.12s;border-left:3px solid transparent}
.si:hover{background:hsl(var(--color-lightSand))}
.si.sel{background:hsl(var(--color-lightSand));border-left-color:hsl(var(--color-saffron))}
.si-img{width:100%;height:80px;border-radius:8px;background-size:cover;background-position:center;
  background-color:hsl(var(--color-sand));margin-bottom:6px;position:relative}
.si-name{font-weight:600;font-size:0.8125rem;color:hsl(var(--color-black))}
.si-loc{font-size:0.6875rem;color:hsl(var(--color-middleGrey));margin-top:1px}
.si-price{font-size:0.8125rem;margin-top:3px;display:flex;align-items:baseline;gap:4px}
/* Detail Panel */
#dp{position:absolute;top:0;left:280px;right:0;bottom:0;background:#fff;
  overflow-y:auto;z-index:800;display:none}
.dp-brand{text-align:center;padding:18px 0 10px;font-family:var(--font-serif);
  font-weight:700;font-size:1rem;color:hsl(var(--color-black))}
.dp-brand span{color:hsl(var(--color-saffron));font-size:1.125rem}
.dp-hero{width:100%;aspect-ratio:16/9;background-size:cover;background-position:center;
  background-color:hsl(var(--color-sand))}
.dp-grid{display:grid;grid-template-columns:1fr 1fr;gap:3px}
.dp-grid-img{width:100%;aspect-ratio:4/3;background-size:cover;background-position:center;
  background-color:hsl(var(--color-sand))}
.dp-content{padding:24px 28px 40px;max-width:760px;margin:0 auto}
.dp-title{font-family:var(--font-serif);font-weight:700;font-size:1.625rem;
  line-height:2rem;color:hsl(var(--color-black));margin-bottom:10px}
.dp-desc{font-size:0.9375rem;line-height:1.625rem;color:hsl(var(--color-darkGrey));margin-bottom:16px}
.dp-meta{display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap}
.dp-section{margin-top:20px;padding-top:18px;border-top:1px solid hsl(var(--color-pearl))}
.dp-section h3{font-family:var(--font-serif);font-weight:700;font-size:1.125rem;
  color:hsl(var(--color-black));margin-bottom:10px}
.dp-section p{font-size:0.875rem;line-height:1.5rem;color:hsl(var(--color-darkGrey))}
.dp-accom-img{width:100%;height:200px;border-radius:12px;background-size:cover;
  background-position:center;background-color:hsl(var(--color-sand));margin-bottom:10px}
.dp-price-block{background:hsl(var(--color-lightSand));border-radius:12px;padding:16px 20px;
  margin-top:14px;display:flex;align-items:center;justify-content:space-between}
.dp-price-label{font-size:0.8125rem;color:hsl(var(--color-middleGrey))}
.dp-price-val{font-size:1.5rem;font-weight:700;color:hsl(var(--color-black))}
.dp-price-init{font-size:0.875rem;text-decoration:line-through;color:hsl(var(--color-grey));margin-right:6px}
.btn-all{display:block;margin:14px auto;padding:10px 28px;border-radius:7.5rem;
  border:1.5px solid hsl(var(--color-black));background:transparent;
  font-family:var(--font-sans);font-size:0.875rem;font-weight:600;
  color:hsl(var(--color-black));cursor:pointer;transition:all 0.15s}
.btn-all:hover{background:hsl(var(--color-black));color:#fff}
"""


def _get_widget_js(villages_json: str) -> str:
    """Return the widget JavaScript with embedded village data."""
    return (
        "(function(){\n"
        "var V=" + villages_json + ";\n"
        """var sel=null,mkMap={},cdMap={},siMap={};

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function fmt(n,c){
  if(n==null)return'';
  var sym=c==='USD'?'$':c==='GBP'?'\\u00a3':'\\u20ac';
  return sym+n.toLocaleString('en-US',{maximumFractionDigits:0});
}
function badges(v){
  var h='';
  if(v.ss&&v.ss.indexOf('WINTER')>=0)h+='<span class="badge badge-winter">Winter</span> ';
  if(v.ss&&v.ss.indexOf('SUMMER')>=0&&v.ss.indexOf('WINTER')<0)h+='<span class="badge badge-summer">Summer</span> ';
  if(v.ec)h+='<span class="badge badge-ec">With Exclusive Spaces</span> ';
  if(v.tags)v.tags.forEach(function(t){if(t.title)h+='<span class="badge" style="border-color:'+(t.background_color_id||'#ccc')+';color:'+(t.text_color_id||'#333')+'">'+esc(t.title)+'</span> '});
  return h;
}
function dots(level){
  if(!level)return'';
  var h='<div class="rating"><span class="rating-num">'+level+'/5</span><div class="dots">';
  for(var i=1;i<=5;i++)h+='<div class="dot'+(i<=level?' on':'')+'"></div>';
  return h+'</div></div>';
}
function priceH(v){
  if(!v.bp)return'';
  var h='<div class="rc-price">';
  if(v.ip&&v.ip>v.bp)h+='<span class="rc-ip">'+fmt(v.ip,v.cur)+'</span>';
  h+='<span class="rc-bp">'+fmt(v.bp,v.cur)+'</span></div>';
  h+='<div class="rc-sub">Total price</div>';
  return h;
}
function mode(){try{return(window.openai&&window.openai.displayMode)||'inline'}catch(e){return'inline'}}

/* Map */
var map=L.map('map',{zoomControl:true,attributionControl:true});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution:'\\u00a9 <a href=\\"https://www.openstreetmap.org/copyright\\">OpenStreetMap</a>',maxZoom:19
}).addTo(map);

V.forEach(function(v){
  var el=document.createElement('div');el.className='cm-mk';el.textContent='Ψ';
  var icon=L.divIcon({html:el.outerHTML,className:'',iconSize:[30,30],iconAnchor:[15,15]});
  var mk=L.marker([v.lat,v.lng],{icon:icon}).addTo(map);
  mk.on('click',function(){selectV(v.id)});
  mkMap[v.id]={mk:mk,el:mk.getElement()};
});

if(V.length===1)map.setView([V[0].lat,V[0].lng],10);
else if(V.length>1)map.fitBounds(V.map(function(v){return[v.lat,v.lng]}),{padding:[50,50],animate:false});

/* Carousel */
var car=document.getElementById('carousel');
var hasCards=false;
V.forEach(function(v){
  if(!v.img)return;
  hasCards=true;
  var d=document.createElement('div');d.className='rc';
  d.innerHTML='<div class="rc-img" style="background-image:url('+esc(v.img)+')"><div style="position:absolute;bottom:6px;left:6px">'+badges(v)+'</div></div>'+
    '<div class="rc-body"><div class="rc-name">'+esc(v.n)+'</div>'+
    '<div class="rc-loc">'+esc(v.co)+'</div>'+
    priceH(v)+dots(v.cl)+'</div>';
  d.onclick=function(){selectV(v.id)};
  car.appendChild(d);cdMap[v.id]=d;
});

/* Sidebar */
var sbList=document.getElementById('sb-list');
V.forEach(function(v){
  var d=document.createElement('div');d.className='si';
  var imgH=v.img?'<div class="si-img" style="background-image:url('+esc(v.img)+')"><div style="position:absolute;bottom:4px;left:4px">'+badges(v)+'</div></div>':'';
  d.innerHTML=imgH+'<div class="si-name">'+esc(v.n)+'</div>'+
    '<div class="si-loc">'+esc(v.co)+'</div>'+
    '<div class="si-price">'+(v.ip&&v.ip>v.bp?'<span class="rc-ip">'+fmt(v.ip,v.cur)+'</span>':'')+
    '<span class="rc-bp">'+fmt(v.bp,v.cur)+'</span></div>';
  d.onclick=function(){selectV(v.id)};
  sbList.appendChild(d);siMap[v.id]=d;
});

/* Detail Panel */
function renderDetail(v){
  var dp=document.getElementById('dp');
  if(!v){dp.style.display='none';return}
  var imgs=[v.img].concat(v.si||[]).filter(Boolean);
  var gridH='';
  if(imgs.length>1){
    gridH='<div class="dp-grid">';
    for(var i=1;i<Math.min(imgs.length,5);i++)gridH+='<div class="dp-grid-img" style="background-image:url('+esc(imgs[i])+')"></div>';
    gridH+='</div>';
  }
  var accomH='';
  if(v.ad){
    accomH='<div class="dp-section"><h3>The best reasons to go</h3>'+
      (v.ai?'<div class="dp-accom-img" style="background-image:url('+esc(v.ai)+')"></div>':'')+
      '<p>'+esc(v.ad).replace(/\\n/g,'<br>')+'</p></div>';
  }
  dp.innerHTML=
    '<div class="dp-brand">Club Med<span>Ψ</span></div>'+
    (v.img?'<div class="dp-hero" style="background-image:url('+esc(v.img)+')"></div>':'')+
    gridH+
    '<div class="dp-content">'+
    '<div class="dp-title">'+esc(v.n)+'</div>'+
    '<div class="dp-meta">'+
      '<span class="rc-loc">'+esc(v.co)+(v.ar?' \\u00b7 '+esc(v.ar):'')+'</span>'+
      badges(v)+dots(v.cl)+
    '</div>'+
    (v.dt?'<div class="dp-desc">'+esc(v.dt)+'</div>':'')+
    (v.bp?'<div class="dp-price-block"><div><div class="dp-price-label">From</div><div>'+
      (v.ip&&v.ip>v.bp?'<span class="dp-price-init">'+fmt(v.ip,v.cur)+'</span>':'')+
      '<span class="dp-price-val">'+fmt(v.bp,v.cur)+'</span>'+
      '</div></div><div class="dp-price-label">Total price</div></div>':'')+
    accomH+
    '</div>';
  dp.style.display='block';
}

/* Selection */
function selectV(id){
  var prev=sel;sel=id;
  if(prev&&mkMap[prev]&&mkMap[prev].el){var pe=mkMap[prev].el.querySelector('.cm-mk');if(pe)pe.classList.remove('sel')}
  if(mkMap[id]&&mkMap[id].el){var ce=mkMap[id].el.querySelector('.cm-mk');if(ce)ce.classList.add('sel')}
  if(prev&&cdMap[prev])cdMap[prev].classList.remove('sel');
  if(cdMap[id]){cdMap[id].classList.add('sel');cdMap[id].scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'})}
  if(prev&&siMap[prev])siMap[prev].classList.remove('sel');
  if(siMap[id]){siMap[id].classList.add('sel');siMap[id].scrollIntoView({behavior:'smooth',block:'nearest'})}
  var v=V.find(function(x){return x.id===id});
  if(v){
    var fs=mode()==='fullscreen';
    map.flyTo([v.lat,v.lng],12,{animate:true,duration:1,
      paddingTopLeft:fs?[280,0]:[0,0],paddingBottomRight:fs?[0,0]:[0,100]});
    var nt=document.getElementById('ntag');
    if(!fs){nt.textContent=v.n+' \\u2014 '+v.co;nt.style.display='block'}
    else{nt.style.display='none'}
    if(fs)renderDetail(v);
  }
}

/* Display Mode */
function applyMode(){
  var fs=mode()==='fullscreen';
  document.getElementById('sb').style.display=fs?'block':'none';
  document.getElementById('cw').style.display=fs?'none':'block';
  document.getElementById('ntag').style.display='none';
  document.getElementById('map').style.left=fs?'280px':'0';
  if(!fs)document.getElementById('dp').style.display='none';
  setTimeout(function(){map.invalidateSize()},60);
  if(!fs&&sel){var v=V.find(function(x){return x.id===sel});
    if(v){var nt=document.getElementById('ntag');nt.textContent=v.n+' \\u2014 '+v.co;nt.style.display='block'}}
  if(fs&&sel){var v=V.find(function(x){return x.id===sel});if(v)renderDetail(v)}
}
applyMode();
if(window.openai&&window.openai.subscribe)window.openai.subscribe(applyMode);
window.addEventListener('resize',function(){map.invalidateSize()});
"""
        "})();\n"
    )


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
