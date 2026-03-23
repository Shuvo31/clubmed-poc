## Why

The current village map widget loads 5 external resources from 3 CDN origins (Mapbox GL JS, React, ReactDOM, Tailwind JIT) at render time inside ChatGPT's iframe sandbox. These CDN requests are routinely blocked by CORS policies on the `web-sandbox.oaiusercontent.com` origin, causing the widget to fail completely. The pizzaz reference example from OpenAI solves this by bundling everything at build time — we need a similar approach, but even simpler given we have no control over the hosting environment.

## What Changes

- **Remove all CDN `<script>`/`<link>` tags** from the widget HTML template (React, ReactDOM, Tailwind, Mapbox GL JS, Mapbox GL CSS).
- **Drop React entirely** — rewrite the UI as vanilla JavaScript with inline CSS. The widget is simple enough (map + marker list) that a framework adds complexity without value.
- **Drop Tailwind entirely** — replace utility classes with a small inline `<style>` block already partially present.
- **Vendor Mapbox GL CSS inline** into the HTML template `<style>` block (following the pizzaz `map.css` pattern).
- **Inline Mapbox GL JS** — bundle the Mapbox GL JS library directly into the HTML template as an inline `<script>` block, eliminating the last external JS dependency. Alternatively, if inlining the full ~800KB library is impractical, use a lightweight alternative like Leaflet with OpenStreetMap tiles (zero API key, ~40KB) or a static map image approach.
- **Preserve all existing widget behavior** — map rendering, markers, inline carousel, fullscreen sidebar, village selection with flyTo, display mode switching via `window.openai`.

## Capabilities

### New Capabilities
- `self-contained-map-widget`: A fully self-contained HTML map widget that requires zero external resource loads at render time, working reliably inside ChatGPT's iframe sandbox.

### Modified Capabilities
_None — no existing spec-level requirements are changing._

## Impact

- **`src/mcp_server.py`**: The `_WIDGET_HTML_TEMPLATE` string (lines 90–409) will be substantially rewritten. The `_generate_village_map_html` function signature stays the same.
- **Dependencies**: If switching from Mapbox GL to Leaflet/OpenStreetMap, the `mapbox_access_token` config field and `_FALLBACK_MAPBOX_TOKEN` constant become unnecessary (simplification). If staying with Mapbox, the token is still needed but only for map tile requests (not JS loading).
- **No API changes**: The MCP tool `show-clubmed-village-map` and resource `ui://widget/clubmed-village-map.html` keep their existing interface.
- **No build pipeline needed**: The widget remains a Python f-string template — no Vite, no npm, no build step. This is intentional to keep the project flat and simple per AGENTS.md constraints.
