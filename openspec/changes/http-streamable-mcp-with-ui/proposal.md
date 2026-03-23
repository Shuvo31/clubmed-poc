## Why

The MCP server currently uses stdio transport, which limits it to local process-based clients (e.g., Claude Desktop, CLI wrappers). Switching to HTTP Streamable transport exposes the server over HTTP, enabling remote clients and browser-based UIs to connect directly. This unlocks building a standalone web UI that queries Club Med resorts through the MCP protocol without needing a separate REST API layer.

## What Changes

- **Migrate MCP server transport from stdio to HTTP Streamable** — Replace `stdio_server()` with the MCP SDK's `StreamableHTTPServerTransport` (or equivalent from `mcp.server.fastmcp`), exposing the server on a configurable HTTP port.
- **Add HTTP Streamable server entry point** — New or modified entry point that starts the server with HTTP transport while preserving the existing tool registration and business logic.
- **Create a separate simple web UI project** — A standalone lightweight web application (outside the MCP server project directory) that acts as an MCP client over HTTP Streamable transport. The UI provides a minimal chat-like interface where users can query Club Med resorts by invoking the `get_clubmed_products` tool.
- **Update dependencies** — Add any required HTTP/ASGI dependencies (e.g., `uvicorn`, `starlette`) to `pyproject.toml` for the server; the UI project has its own dependency set.

## Capabilities

### New Capabilities
- `http-streamable-transport`: Migrating the MCP server from stdio to HTTP Streamable transport, including server configuration, CORS, and startup.
- `mcp-client-ui`: A standalone web UI application that connects to the MCP server as an HTTP Streamable client, lists available tools, invokes them, and displays results.

### Modified Capabilities
_(none — the existing `real-api-client` spec covers the Club Med API client layer, which remains unchanged)_

## Impact

- **Server entry point** (`src/mcp_server.py`): The `_async_main()` function and `main()` entry point change from stdio to HTTP transport. The `club-med-mcp` console script continues to work but now starts an HTTP server.
- **Dependencies** (`pyproject.toml`): New runtime dependencies for HTTP serving (likely already transitive via `mcp` SDK, but may need explicit `uvicorn`/`starlette`).
- **New project directory**: A sibling directory (e.g., `../clubmed-mcp-ui/`) containing the UI application with its own `package.json` or `pyproject.toml`.
- **Configuration**: The server will need a configurable host/port (defaulting to `localhost:8000`). The UI will need the server URL as configuration.
- **No breaking changes** to the MCP tool schema or the Club Med API client layer.
