## Context

The Club Med MCP server (`src/mcp_server.py`) currently exposes two tools that return raw JSON from the Club Med API: `get_clubmed_products` and `get_clubmed_destinations`. The destinations endpoint returns village coordinates (latitude/longitude) grouped by geographical area and country — data that is ideal for map visualization.

The OpenAI Apps SDK allows MCP tools to return front-end widgets via a `text/html+skybridge` MIME type resource pattern. The `openai-apps-sdk-examples/pizzaz_server_python/main.py` demonstrates this: tools are registered with `openai/outputTemplate` metadata pointing to a resource URI, and the resource serves self-contained HTML that renders a React-based interactive widget.

The pizzaz example uses a separate Vite build pipeline (`pnpm run build`) producing pre-built HTML assets. Our constraint is to keep everything self-contained in Python — no separate Node build step.

## Goals / Non-Goals

**Goals:**
- Add a new MCP tool that renders an interactive Mapbox GL map showing Club Med village locations
- Include a browsable carousel/sidebar of villages (similar to pizzaz) with village names, countries, and geographical areas
- Generate the widget HTML entirely from Python at server startup — single self-contained HTML file with all JS/CSS loaded from CDNs
- Follow the OpenAI Apps SDK widget pattern (resource + tool with `openai/outputTemplate` metadata)
- Fetch live destination data from the Club Med API and embed it into the widget

**Non-Goals:**
- Modifying existing `get_clubmed_products` or `get_clubmed_destinations` tools
- Using the Vite/pnpm build pipeline from `openai-apps-sdk-examples`
- Supporting React component libraries like `@openai/apps-sdk-ui` (CDN-loaded React with vanilla Tailwind CSS instead)
- Adding Inspector/detail panel for fullscreen mode (keep it simple for v1)
- Adding `window.oai` widget state integration (can be added later)

## Decisions

### Decision 1: Single self-contained HTML with CDN dependencies

**Choice**: Generate one HTML string in Python containing inline JS that loads React, Mapbox GL, and Tailwind CSS from CDNs. Village data is embedded as a `<script>` block with a JSON object.

**Rationale**: This avoids any Node.js build toolchain. The pizzaz example pre-builds with Vite, but our constraint is keeping the MCP server self-contained in Python. CDN-loaded libraries are well-suited for this widget use case since the HTML runs in the ChatGPT browser context which has internet access.

**Alternatives considered**:
- *Vite build pipeline*: Rejected — adds Node.js dependency and build step, violates "keep it in Python" constraint.
- *Server-side rendering with Jinja*: Partially adopted — we use Python string templating to embed data, but the rendering is client-side React.
- *No React, vanilla JS only*: Considered, but the carousel interaction pattern (Embla-like dragging) and component composition are much cleaner with React. React via CDN is only ~40KB gzipped.

### Decision 2: Fetch destinations at lifespan startup, cache in context

**Choice**: During the existing `lifespan()` async context manager, call `client.get_destinations(filter=["type==VILLAGE"])` to fetch only village-type products with coordinates. Extract and flatten the village data into a list of `{id, name, country, area, lat, lng}` dicts. Store this list in the lifespan context alongside the client. Generate the HTML widget string once using this data.

**Rationale**: Destination data changes infrequently. Fetching once at startup means the widget HTML is ready instantly when the tool is called, with no per-request API latency. The filtered call (`type==VILLAGE`) reduces payload size.

**Alternatives considered**:
- *Fetch on every tool call*: Rejected — adds 1-2s latency per call and hammers the API unnecessarily.
- *Hard-code village data*: Rejected — data would go stale and defeats the purpose of a live API relay.

### Decision 3: Low-level MCP handler registration (not `@mcp.tool` decorator)

**Choice**: Register the widget tool and resource using direct handler attachment on `mcp._mcp_server.request_handlers`, exactly as the pizzaz Python server does. This allows full control over `_meta` fields (especially `openai/outputTemplate`), `structuredContent`, and resource MIME types.

**Rationale**: The `@mcp.tool` decorator in FastMCP doesn't expose `_meta` for `openai/outputTemplate`, `openai/toolInvocation/invoking`, etc. The pizzaz server demonstrates that direct handler registration is the established pattern for widget-backed tools.

**Alternatives considered**:
- *`@mcp.tool` decorator with monkey-patching*: Fragile, version-dependent.
- *Fork FastMCP to add metadata support*: Over-engineered for one tool.

### Decision 4: Coexist widget handlers with existing `@mcp.tool` handlers

**Choice**: Keep existing tools registered via `@mcp.tool()` decorator. Add the widget tool by wrapping/extending the `list_tools` and `call_tool` request handlers to handle both the decorator-registered tools and the new widget tool.

**Rationale**: The existing tools work well with the decorator pattern. We only need low-level access for the widget tool. The approach is to save the original handlers, then register new ones that check for the widget tool name first and delegate to the originals otherwise.

### Decision 5: Mapbox GL + React + Tailwind via CDN for the widget

**Choice**: Load from CDN:
- `mapbox-gl@3` for the interactive map
- `react@19` + `react-dom@19` for component rendering
- Tailwind CSS via `@tailwindcss/cdn` for styling
- No Embla Carousel — implement a simpler CSS scroll-snap carousel to avoid extra CDN deps

**Rationale**: These are the same core libraries used by the pizzaz widget. Tailwind CDN provides JIT compilation in the browser. A CSS scroll-snap carousel is lightweight and sufficient for the village browsing use case without needing Framer Motion or Embla.

## Risks / Trade-offs

- **[CDN availability]** → Widget won't render if CDN is down. Mitigation: Mapbox, React, and Tailwind CDNs are highly available; this is acceptable for a POC.
- **[Mapbox access token]** → A Mapbox token is required. Mitigation: Embed a public-scope token in the HTML (read-only, URL-restricted tokens are standard practice for client-side maps). For the POC, use the same token as the pizzaz example or configure one in `config.json`.
- **[Large HTML payload]** → The HTML string with embedded village data could be 20-50KB. Mitigation: This is within normal bounds for MCP resources; the pizzaz built assets are similar size.
- **[Startup latency]** → Fetching destinations at startup adds 1-2s to server start. Mitigation: This is a one-time cost and acceptable for a server that runs continuously.
- **[No `@openai/apps-sdk-ui` components]** → The widget won't have the polished OpenAI UI components (Button, Image). Mitigation: Use standard HTML/Tailwind equivalents. The visual difference is minor for a map-focused widget.
