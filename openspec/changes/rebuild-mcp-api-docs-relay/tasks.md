## 1. Cleanup - Remove old code

- [x] 1.1 Delete `src/services/` directory (search_service.py, price_service.py, location_service.py)
- [x] 1.2 Delete `src/data_layer/` directory (protocol.py, mock_client.py, clubmed_api_client.py)
- [x] 1.3 Delete `src/models/` directory (resort.py, search.py, pricing.py, recommendations.py, responses.py)
- [x] 1.4 Delete `src/http_bridge/` directory (main.py, routes.py, chat_routes.py, system_routes.py, dependencies.py, llm_service.py)
- [x] 1.5 Delete `data/` directory (resorts.json, availability.json, pricing_rules.json)
- [x] 1.6 Delete `frontend/` directory (index.html, style.css, chat.js)
- [x] 1.7 Delete `src/config.py` and `src/logging_config.py`

## 2. Configuration

- [x] 2.1 Simplify `config.json` to contain only `clubmed_api_key` and `clubmed_language` fields
- [x] 2.2 Update `pyproject.toml`: remove `fastapi`, `uvicorn`, `boto3`, `botocore`, `python-dateutil` from dependencies; remove optional dependency groups (`llm`, `dev`); keep only `mcp>=1.9.0`, `httpx>=0.27.0`, `pydantic>=2.7.2`

## 3. Club Med API Client

- [x] 3.1 Create `src/clubmed_client.py` with a `ClubMedClient` class that takes `api_key` and `language` as constructor params
- [x] 3.2 Implement `get_products()` method that calls `GET https://api.clubmed.com/v2/products` with `x-api-key` header, `accept-language` header, and `timestamp` query parameter
- [x] 3.3 Support optional parameters: `limit` (int), `page` (int), `filter` (list of strings), `language` (string override)
- [x] 3.4 Parse response: return raw JSON body for 200/206, extract pagination metadata from `Content-Range` and `Link` headers for 206 responses
- [x] 3.5 Handle error responses (400, 416, network errors) and return structured error information

## 4. MCP Server

- [x] 4.1 Rewrite `src/mcp_server.py`: remove all existing tool registrations and handler functions
- [x] 4.2 Register single tool `get_clubmed_products` via `@app.list_tools()` with inputSchema defining optional params: `limit` (integer), `page` (integer), `filter` (array of strings), `language` (string)
- [x] 4.3 Implement `@app.call_tool()` handler that routes `get_clubmed_products` calls to `ClubMedClient.get_products()` and returns results as `TextContent`
- [x] 4.4 Load configuration from `config.json` at startup and initialize `ClubMedClient` with API key and language
- [x] 4.5 Write a clear tool description that guides the LLM to use pagination and explains the filter syntax

## 5. Verification

- [x] 5.1 Verify the server starts without errors via `python -m src.mcp_server` or `club-med-mcp`
- [x] 5.2 Verify `src/` contains only `__init__.py`, `mcp_server.py`, `clubmed_client.py`
- [x] 5.3 Verify removed directories (`src/services/`, `src/data_layer/`, `src/models/`, `src/http_bridge/`, `data/`, `frontend/`) no longer exist
