## 1. Village Data Extraction

- [x] 1.1 Add a `_extract_villages` helper function to `src/mcp_server.py` that takes the raw destinations API response and returns a flat list of village dicts (`id`, `name`, `country`, `area`, `latitude`, `longitude`), filtering for `type == "VILLAGE"` with non-null coordinates
- [x] 1.2 Update the `lifespan()` async context manager to call `client.get_destinations(filter=["type==VILLAGE"])` at startup, extract villages with `_extract_villages`, and store the result in the yielded context dict as `"villages"`
- [x] 1.3 Handle destinations API failure gracefully: log a warning and default to an empty village list so the server still starts

## 2. Widget HTML Generation

- [x] 2.1 Add a `_generate_village_map_html` function to `src/mcp_server.py` that takes the village list and a Mapbox access token, and returns a self-contained HTML string
- [x] 2.2 The HTML string SHALL embed the village data as inline JSON in a `<script>` tag and load React 19, Mapbox GL JS v3, and Tailwind CSS from CDN `<script>`/`<link>` tags
- [x] 2.3 Implement the inline React application: a Mapbox GL map with colored markers at each village's coordinates, auto-fitting bounds on initial load
- [x] 2.4 Implement a bottom carousel (inline/non-fullscreen mode): horizontally scrollable cards showing village name, country, and area, with CSS scroll-snap; clicking a card pans the map to that village
- [x] 2.5 Implement a left sidebar (fullscreen mode): vertical scrollable list of villages with name, country, and area; clicking an item pans the map; display mode detected via `window.oai` displayMode
- [x] 2.6 Add a Mapbox access token field to `config.json` (key: `mapbox_access_token`) and read it in `_load_config()`. Fall back to the public pizzaz example token if not configured.

## 3. MCP Tool and Resource Registration

- [x] 3.1 Store the generated widget HTML string in the lifespan context as `"village_map_html"`
- [x] 3.2 Wrap the existing `list_tools` handler to append the `show-clubmed-village-map` tool with correct `_meta` (`openai/outputTemplate`, `openai/toolInvocation/invoking`, `openai/toolInvocation/invoked`, `openai/widgetAccessible`) and `annotations` (`readOnlyHint: true`, `destructiveHint: false`, `openWorldHint: false`)
- [x] 3.3 Wrap the existing `call_tool` handler to intercept calls to `show-clubmed-village-map`, returning a `TextContent` summary and `structuredContent` with `villageCount`; delegate all other tool names to the original handler
- [x] 3.4 Register a `list_resources` handler that returns one resource with URI `ui://widget/clubmed-village-map.html` and `mimeType` `text/html+skybridge`
- [x] 3.5 Register a `list_resource_templates` handler for the same resource
- [x] 3.6 Register a `read_resource` handler that returns the widget HTML for the matching URI

## 4. Verification

- [x] 4.1 Start the server with `uv run club-med-mcp` and verify it starts without errors and logs the village count
- [x] 4.2 Verify existing tools still work: call `get_clubmed_products` and `get_clubmed_destinations` via the MCP endpoint
- [x] 4.3 Verify the new tool appears in `list_tools` with correct metadata
- [x] 4.4 Verify calling `show-clubmed-village-map` returns structured content with village count
- [x] 4.5 Verify the resource is readable and contains valid HTML with embedded village data
- [x] 4.6 Run `uv run --with ruff ruff check .` and `uv run --with ruff ruff format --check .` to ensure lint/format compliance
