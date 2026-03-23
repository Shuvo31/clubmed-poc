## Why

The Club Med MCP server currently returns raw JSON from the destinations API, which is useful for LLMs but provides no visual experience. The OpenAI Apps SDK supports front-end widget rendering via MCP tools, allowing ChatGPT to display interactive UI components inline. Adding a map widget that shows Club Med villages with their coordinates (already available from `/v0/destinations`) would create a rich, visual tool that lets users explore resorts geographically — with a carousel for browsing villages by name.

## What Changes

- Add a new MCP tool (`show_clubmed_village_map`) that returns a self-contained HTML widget displaying an interactive Mapbox map of Club Med villages with markers at each village's coordinates.
- The widget includes a bottom carousel (inline mode) and a sidebar list (fullscreen mode) for browsing villages, modeled after the pizzaz map example in `openai-apps-sdk-examples`.
- The HTML widget is generated entirely in Python at server startup — no separate Node/Vite build server required. The server fetches destination data from the Club Med API, extracts village coordinates, and embeds them as JSON into a single self-contained HTML page that includes all JS/CSS inline.
- Register the widget as both an MCP tool and an MCP resource with `text/html+skybridge` MIME type, following the OpenAI Apps SDK pattern for widget-backed tools.
- The existing `get_clubmed_destinations` and `get_clubmed_products` tools remain unchanged.

## Capabilities

### New Capabilities
- `village-map-widget`: Self-contained HTML/JS widget served via MCP resource that renders an interactive Mapbox GL map with Club Med village markers and a browsing carousel/sidebar. Covers widget generation, MCP resource/tool registration, and data extraction from the destinations API.

### Modified Capabilities
_(none — existing tools and client methods are unchanged)_

## Impact

- **Code**: `src/mcp_server.py` gains new tool/resource handler registrations and widget HTML generation logic. `src/clubmed_client.py` is unchanged.
- **Dependencies**: No new Python dependencies required. The HTML widget loads Mapbox GL JS, React, and Tailwind CSS from CDNs at runtime in the browser.
- **APIs**: No changes to existing MCP tools. One new tool and one new resource are added.
- **Systems**: The MCP server continues to run on `0.0.0.0:8000/mcp` with no infrastructure changes.
