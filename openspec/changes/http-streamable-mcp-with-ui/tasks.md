## 1. MCP Server — HTTP Streamable Transport Migration

- [x] 1.1 Rewrite `src/mcp_server.py` to use `FastMCP` with `@mcp.tool()` decorator, replacing the low-level `Server` + `@app.list_tools()` / `@app.call_tool()` pattern
- [x] 1.2 Configure `FastMCP` to run with `transport='streamable-http'` on `host='0.0.0.0'`, `port=8000`, endpoint at `/mcp`
- [x] 1.3 Preserve `_load_config()` and `ClubMedClient` initialization from `config.json` (use `FastMCP` lifespan or module-level init)
- [x] 1.4 Add `uvicorn` to `pyproject.toml` dependencies if not already transitively available
- [x] 1.5 Verify the server starts and the tool is discoverable: run `club-med-mcp` and confirm `http://localhost:8000/mcp` responds to MCP requests

## 2. UI Project — Scaffolding

- [x] 2.1 Create the `../clubmed-mcp-ui/` directory with `pyproject.toml` (dependencies: `fastapi`, `uvicorn`, `mcp`, `httpx`)
- [x] 2.2 Create `main.py` with a FastAPI app that serves static files from `static/` and listens on port 3000
- [x] 2.3 Create `static/index.html` with a minimal HTML page shell (title, basic layout, script tag)

## 3. UI Backend — MCP Client Proxy

- [x] 3.1 Implement `GET /api/tools` endpoint: connect to MCP server via `streamablehttp_client`, call `list_tools`, return JSON array of tools with name, description, and input schema
- [x] 3.2 Implement `POST /api/tools/invoke` endpoint: accept `{"name": "...", "arguments": {...}}`, invoke the tool on the MCP server, return the result as JSON
- [x] 3.3 Handle MCP server unreachable errors — return HTTP 502 with a clear error message

## 4. UI Frontend — HTML/JS Interface

- [x] 4.1 On page load, fetch `/api/tools` and display available tools with their names and descriptions
- [x] 4.2 Build a form for `get_clubmed_products` with inputs for `limit`, `page`, `filter` (comma-separated text), and `language`
- [x] 4.3 Add an "Invoke" button that sends a POST to `/api/tools/invoke` with the form values as arguments
- [x] 4.4 Display the tool result as formatted JSON in a results area
- [x] 4.5 Display errors clearly when invocation fails

## 5. End-to-End Verification

- [x] 5.1 Start MCP server (`club-med-mcp`) and confirm it runs on port 8000
- [x] 5.2 Start UI (`python main.py` in `clubmed-mcp-ui/`) and confirm it runs on port 3000
- [x] 5.3 Open `http://localhost:3000`, verify tools load, invoke `get_clubmed_products` with sample parameters, and confirm results display
