## Why

The MCP server currently runs on fabricated JSON data instead of the real Club Med product catalogue, making it unusable for any production or demo use. The build system also uses `setuptools`, which is not the standard for UV-managed projects; switching to `hatchling` aligns the project with the UV ecosystem and simplifies packaging.

## What Changes

- **BREAKING**: Remove `travel_time` parameter from the `search_resorts` MCP tool (the real API does not return travel time data)
- Add `ClubMedAPIClient` — a real HTTP client that calls `GET /v2/products` on `api.clubmed.com`, fetches all pages on initialization, and maps responses to the internal `Resort` model
- Keep `MockAPIClient` for development/testing
- Switch `pyproject.toml` build backend from `setuptools` to `hatchling` (UV standard)
- Add `httpx` as a runtime dependency for synchronous HTTP calls
- Add `CLUBMED_API_KEY` and `CLUBMED_ACCEPT_LANGUAGE` to configuration (`config.py`, `.env`, `config.json`)
- Update `mcp_server.py` to instantiate `ClubMedAPIClient` when `data_provider = "real"`

## Capabilities

### New Capabilities

- `real-api-client`: HTTP client that fetches and caches all Club Med resort products from the real `GET /v2/products` API, including full pagination loop and mapping to internal models

### Modified Capabilities

(none — the MCP tool interfaces and services layer behavior are unchanged except the removal of `travel_time` filtering)

## Impact

- **`src/data_layer/clubmed_api_client.py`**: new file
- **`src/mcp_server.py`**: provider wiring + remove `travel_time` from tool schema
- **`src/config.py`**: new `api_key` and `language` fields on `AppConfig`
- **`pyproject.toml`**: build backend switch, add `httpx` dependency
- **`config.json`**: switch `data_provider` to `"real"`, add `api_key` + `language` fields
- **`.env`**: add `CLUBMED_API_KEY` variable
- **External dependency**: `api.clubmed.com` must be reachable at runtime; startup will fail fast if the API is unreachable or the key is invalid
