## Context

The Club Med village map widget is rendered inside ChatGPT's iframe sandbox (`web-sandbox.oaiusercontent.com`). The widget HTML is delivered via the MCP resource mechanism — we return a complete HTML string, and ChatGPT renders it in a sandboxed iframe. We have zero control over the hosting environment.

The current implementation loads 5 external resources from 3 CDN origins (Mapbox GL JS, React, ReactDOM, Tailwind JIT, Mapbox GL CSS). These are routinely blocked by CORS policy on the sandbox origin, causing total widget failure. The pizzaz reference example from OpenAI solves this by bundling everything at build time via Vite — but our project intentionally has no build pipeline (flat Python f-string template per AGENTS.md).

The solution is to eliminate all external resource dependencies by switching to Leaflet (inlined) with OpenStreetMap tiles, dropping React in favor of vanilla JS, and dropping Tailwind in favor of inline CSS.

## Goals / Non-Goals

**Goals:**
- Zero external `<script>` or `<link>` tags in the widget HTML — all JS and CSS inlined.
- Reliable rendering in ChatGPT's iframe sandbox regardless of CORS restrictions on CDN origins.
- Preserve all existing UX: map with village markers, inline carousel mode, fullscreen sidebar mode, village selection with flyTo animation, `window.openai.displayMode` integration.
- Keep the Python f-string template approach — no build step, no npm, no Vite.
- Remove the Mapbox token dependency entirely (OpenStreetMap tiles are free and open).

**Non-Goals:**
- Custom map tile styling (we accept OpenStreetMap's default appearance).
- Adding new features (inspector panel, widget state persistence, etc.) — that's a separate change.
- Migrating to a build-based approach like the pizzaz example.
- Changing the MCP tool/resource interface (`show-clubmed-village-map`, `ui://widget/clubmed-village-map.html`).

## Decisions

### Decision 1: Replace Mapbox GL JS with Leaflet + OpenStreetMap

**Choice**: Leaflet 1.9.x (~40KB minified) with OpenStreetMap tile layer.

**Rationale**: Leaflet is ~20x smaller than Mapbox GL JS (~800KB), making it practical to inline the entire library inside the HTML template. OpenStreetMap tiles require no API key and are served from `tile.openstreetmap.org` which has permissive CORS headers. Even if tile image loading were restricted, the map chrome and markers would still render (graceful degradation). Mapbox GL JS tiles go through `api.mapbox.com` which requires a token and may face the same CORS issues.

**Alternatives considered**:
- *Keep Mapbox GL JS, inline it*: ~800KB inline JS would bloat the HTML to nearly 1MB. MCP resource payloads have practical size limits. Map tiles would still need `api.mapbox.com` requests which may be CORS-blocked.
- *Static map image*: Would eliminate all JS dependencies but loses interactivity (panning, zooming, marker selection). Not acceptable given the current feature set.

### Decision 2: Drop React, use vanilla JavaScript

**Choice**: Rewrite the UI entirely in vanilla JS using `document.createElement` and event listeners.

**Rationale**: The widget has a single "page" with a map, a list of village cards, and selection state. No routing, no component composition, no complex state graph. React adds ~140KB for features we don't use. The current code already avoids JSX (raw `React.createElement` calls), so the migration is a simplification. Vanilla JS also eliminates the CORS-blocked `unpkg.com` dependency.

**Alternatives considered**:
- *Keep React, inline it*: Adding ~140KB to the already-inline HTML for no architectural benefit.
- *Use Preact (3KB)*: Smaller but still adds a dependency for no clear gain in a single-component widget.

### Decision 3: Drop Tailwind, use inline CSS

**Choice**: Pure inline `<style>` block with hand-written CSS.

**Rationale**: The current widget uses ~15 Tailwind utility classes (`font-semibold`, `text-sm`, `text-gray-900`, etc.). These map directly to simple CSS properties. The `cdn.tailwindcss.com` script is the Tailwind JIT compiler (~300KB+) — absurdly heavy for generating a handful of utility styles. The existing template already has an inline `<style>` block for the carousel and sidebar — we simply expand it to cover the few remaining utility-class-equivalent styles.

### Decision 4: Inline Leaflet JS and CSS into the HTML template

**Choice**: Embed the minified Leaflet JS (~40KB) and Leaflet CSS (~15KB) directly inside `<script>` and `<style>` tags in `_WIDGET_HTML_TEMPLATE`.

**Rationale**: This is the only way to guarantee zero external resource loads at render time. The combined size (~55KB) is well within practical limits for an MCP resource payload. The pizzaz example similarly vendors Mapbox GL CSS (707 lines) into its source tree.

**Implementation**: Store the Leaflet minified source as a Python constant string (or read from a vendored file in `src/`). The template embeds it at generation time. We use a single vendored copy of Leaflet 1.9.4 pinned at a known version.

### Decision 5: Keep OpenStreetMap tiles as the only external network request

**Choice**: The only runtime network requests are tile image fetches from `https://tile.openstreetmap.org/{z}/{x}/{y}.png`.

**Rationale**: Tile images are loaded by the browser as `<img>` elements inside the Leaflet map canvas. Image loads from cross-origin sources are generally not blocked by the same CORS policies that block `<script>` tags. OpenStreetMap tile servers set `Access-Control-Allow-Origin: *`. If tiles fail to load, the map still renders with markers and UI — just with blank tile areas.

## Risks / Trade-offs

- **[Visual change]** OpenStreetMap tiles look different from Mapbox Streets. The map will have a different aesthetic. → Acceptable trade-off for reliability. Can explore alternative free tile providers (Carto, Stamen) later if desired.
- **[Template size increase]** Inlining ~55KB of Leaflet JS+CSS increases the HTML template size. → Still well under 100KB total, which is reasonable for an MCP resource. The current template with Mapbox is ~15KB of template + ~800KB loaded externally, so net transfer is actually much smaller.
- **[Vendored dependency maintenance]** The inlined Leaflet code must be manually updated. → Pin to Leaflet 1.9.4 (stable, mature). Leaflet updates are infrequent and rarely breaking.
- **[Leaflet API differences]** Leaflet's API differs from Mapbox GL JS (e.g., `L.map` vs `new mapboxgl.Map`, `L.marker` vs `new mapboxgl.Marker`). → The migration is straightforward; both are well-documented. FlyTo, bounds fitting, and marker events have direct Leaflet equivalents.
- **[Tile loading in sandbox]** If `tile.openstreetmap.org` image requests are somehow blocked, the map will show blank tiles. → Markers and UI still work. Can add a fallback tile URL or use multiple tile providers.
