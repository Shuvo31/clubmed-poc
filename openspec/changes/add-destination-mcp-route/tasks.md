## 1. Client Method

- [x] 1.1 Add `get_destinations` async method to `ClubMedClient` in `src/clubmed_client.py` — accepts optional `filter` (list[str]) and `language` (str) parameters
- [x] 1.2 Build request with `x-api-key`, `accept-language`, `accept: application/json` headers and `timestamp` query param, matching `get_products` pattern
- [x] 1.3 Implement error handling: timeout (504), network error (503), bad request (400), unexpected status codes — same structured error dicts as `get_products`
- [x] 1.4 Return `{"destinations": <raw JSON array>, "status_code": 200}` on success

## 2. MCP Tool Registration

- [x] 2.1 Add `get_clubmed_destinations` tool to `src/mcp_server.py` using `@mcp.tool()` decorator with a description covering the geographic hierarchy, filter usage, and response structure
- [x] 2.2 Define tool parameters: optional `filter` (list[str]) and `language` (str) with `Annotated` type hints
- [x] 2.3 Wire the tool to call `client.get_destinations()` and return `json.dumps(result)`

## 3. Verification

- [x] 3.1 Update the `clubmed_client.py` module docstring to reflect both endpoints
- [x] 3.2 Verify the server starts without errors (`python -m src.mcp_server` or `uv run club-med-mcp`)
