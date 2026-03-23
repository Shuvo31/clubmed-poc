## 1. Vendor Leaflet Library

- [x] 1.1 Download Leaflet 1.9.4 minified JS (`leaflet.min.js`, ~40KB) and save as `src/vendor/leaflet.min.js`
- [x] 1.2 Download Leaflet 1.9.4 CSS (`leaflet.css`, ~15KB) and save as `src/vendor/leaflet.min.css`
- [x] 1.3 Verify both vendored files are valid by checking file sizes and contents

## 2. Rewrite Widget HTML Template

- [x] 2.1 Remove all external `<script src>` and `<link href>` tags from `_WIDGET_HTML_TEMPLATE` (React, ReactDOM, Tailwind, Mapbox GL JS, Mapbox GL CSS)
- [x] 2.2 Inline the vendored Leaflet CSS into the template `<style>` block
- [x] 2.3 Inline the vendored Leaflet JS into a `<script>` block in the template
- [x] 2.4 Expand the existing inline `<style>` block to replace all Tailwind utility classes (`font-semibold`, `text-sm`, `text-gray-900`, etc.) with equivalent plain CSS
- [x] 2.5 Rewrite the React component tree (App, VillageCard, SidebarItem) as vanilla JS functions using `document.createElement` and DOM manipulation
- [x] 2.6 Implement Leaflet map initialization: `L.map` with OpenStreetMap `L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png')`
- [x] 2.7 Implement village marker creation using `L.circleMarker` or `L.marker` with custom icons, with click handlers that trigger selection
- [x] 2.8 Implement `fitBounds` logic using Leaflet's `map.fitBounds(L.latLngBounds(...))` to show all villages on load
- [x] 2.9 Implement village selection: flyTo animation via `map.flyTo()`, marker highlight (style change), and list item highlight
- [x] 2.10 Implement inline mode layout: bottom carousel with horizontal scroll-snap (preserve existing CSS pattern)
- [x] 2.11 Implement fullscreen mode layout: left sidebar with scrollable village list, map offset to the right
- [x] 2.12 Implement `window.openai.displayMode` detection and dynamic layout switching (subscribe to changes, resize map on switch)

## 3. Update HTML Generation and Server Code

- [x] 3.1 Update `_generate_village_map_html()` to read vendored Leaflet JS/CSS from disk and embed into the template (or use Python constants)
- [x] 3.2 Remove the `mapbox_token` parameter from `_generate_village_map_html()` since it is no longer needed for map rendering
- [x] 3.3 Remove `_FALLBACK_MAPBOX_TOKEN` constant and any Mapbox token references used solely for the widget
- [x] 3.4 Update the lifespan function and `_widget_html_cache` generation to stop passing the Mapbox token for widget generation
- [x] 3.5 Update all callers of `_generate_village_map_html` to match the new signature

## 4. Cleanup and Verification

- [x] 4.1 Remove any unused Mapbox-related imports or constants that are no longer referenced
- [x] 4.2 Run `uv run --with ruff ruff check .` and fix any lint errors
- [x] 4.3 Run `uv run --with ruff ruff format .` to ensure formatting compliance
- [x] 4.4 Verify the generated HTML contains zero external `<script src>` or `<link href>` tags
- [x] 4.5 Verify the server starts successfully with `uv run club-med-mcp` and the widget tool loads
