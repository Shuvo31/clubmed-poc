## Context

The Club Med MCP server currently uses stdio transport (`mcp.server.stdio.stdio_server`), which requires the client to spawn the server as a child process. This restricts usage to local desktop clients like Claude Desktop. The MCP Python SDK (v1.26.0, installed) already ships with full HTTP Streamable transport support on both server and client sides:

- **Server**: `FastMCP.run(transport='streamable-http')` or lower-level `StreamableHTTPServerTransport`
- **Client**: `mcp.client.streamable_http.streamablehttp_client`

The existing server has a single tool (`get_clubmed_products`) registered on a `Server` instance, with business logic in `ClubMedClient`. The tool registration and client code remain unchanged; only the transport layer and entry point change.

There is no existing UI or frontend code in the project. The UI will be a new standalone project in a sibling directory.

## Goals / Non-Goals

**Goals:**
- Migrate the MCP server from stdio to HTTP Streamable transport, accessible at `http://localhost:8000/mcp`
- Keep the existing tool registration and `ClubMedClient` business logic untouched
- Create a minimal standalone web UI (separate project) that connects to the MCP server as an HTTP Streamable client and lets users invoke the `get_clubmed_products` tool
- Use `FastMCP` high-level API to simplify the server setup (replaces low-level `Server` + `stdio_server`)

**Non-Goals:**
- Authentication/authorization on the MCP server (POC scope)
- Production deployment, HTTPS, or reverse proxy configuration
- Multi-user session management
- Preserving stdio transport as a secondary option (can be re-added later if needed)
- Complex UI framework (React, Vue, etc.) — keep it as simple as possible

## Decisions

### D1: Use `FastMCP` with `transport='streamable-http'`

**Decision**: Rewrite the server to use the `FastMCP` high-level API instead of the low-level `Server` class, and call `mcp.run(transport='streamable-http')`.

**Rationale**: `FastMCP` wraps the `Server` class and handles ASGI app creation, uvicorn startup, and transport wiring internally. This replaces ~20 lines of boilerplate with a single `run()` call. The `@mcp.tool()` decorator replaces the `@app.list_tools()` / `@app.call_tool()` pattern, further simplifying the code.

**Alternatives considered**:
- *Low-level `StreamableHTTPServerTransport` + Starlette*: More control but significantly more boilerplate for a POC. Not justified.
- *SSE transport*: Older MCP transport, being superseded by HTTP Streamable. The SDK supports both but HTTP Streamable is the modern choice.

### D2: UI as a Python web app using the MCP Python client SDK

**Decision**: Build the UI as a separate Python project using the `mcp` client SDK (`streamablehttp_client`) with a lightweight web framework (FastAPI or Starlette) serving a simple HTML page. The HTML page uses vanilla JavaScript (no build step) to communicate with a thin Python backend that proxies MCP calls.

**Rationale**: Reusing the Python MCP SDK for the client avoids introducing a JavaScript MCP client dependency. The UI stays minimal — a single HTML file with vanilla JS, served by a small Python backend that holds the MCP client session. This keeps the stack homogeneous (Python everywhere) and avoids any npm/build tooling.

**Architecture**:
```
Browser  <-->  Python UI backend (FastAPI, port 3000)  <-->  MCP Server (port 8000)
  HTML/JS         MCP client (streamablehttp_client)          FastMCP (streamable-http)
```

**Alternatives considered**:
- *Browser-native MCP client in JS*: Would require a JS MCP SDK or manual HTTP Streamable protocol implementation. More complex and diverges from the Python stack.
- *Streamlit/Gradio*: Heavier dependencies, opinionated UI, harder to customize. Overkill for a simple tool invocation UI.

### D3: Separate sibling project for the UI

**Decision**: Place the UI in `../clubmed-mcp-ui/` (sibling to the MCP server project directory), with its own `pyproject.toml`.

**Rationale**: The user explicitly requested the UI be "outside the MCP project." A sibling directory keeps them co-located for development while maintaining separate dependency trees and lifecycles.

### D4: Server host/port configuration

**Decision**: Use `FastMCP` defaults — `host='0.0.0.0'`, `port=8000`, `streamable_http_path='/mcp'`. The server endpoint will be `http://localhost:8000/mcp`.

**Rationale**: `FastMCP` already has sensible defaults. Using `0.0.0.0` allows the UI (on a different port) to connect. For a POC, hardcoded defaults are sufficient.

## Risks / Trade-offs

- **[CORS]** The UI runs on port 3000, the MCP server on port 8000. Cross-origin requests may be blocked. → Mitigation: Add CORS middleware to the MCP server's ASGI app if needed, or proxy MCP calls through the UI backend (preferred — the UI backend acts as the MCP client, so the browser never talks directly to the MCP server).
- **[No stdio fallback]** Removing stdio means Claude Desktop and similar tools cannot connect. → Mitigation: Acceptable for POC. Can add a CLI flag to switch transports later.
- **[Session lifecycle]** The MCP client session in the UI backend is created per-request or held as a singleton. If singleton, server restarts may orphan it. → Mitigation: Use a fresh client connection per request for simplicity in the POC.
- **[No auth]** The MCP server is open on the network. → Mitigation: POC only, localhost usage. Document that auth is needed for production.
