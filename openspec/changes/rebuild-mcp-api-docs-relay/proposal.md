## Why

The current MCP server exposes three complex tools (search_resorts, get_price_recommendations, get_location_recommendations) with elaborate service layers, mock data, and derived logic that don't align with the actual use case. The real need is simpler: let a connected chatbot query Club Med resort/product information by relaying to the Club Med API documentation. By stripping out all existing services and rebuilding with a single focused MCP tool that serves as a relay to the Club Med product API (documented in `./api-docs/get-product-api-swgger-doc.md`), we get a clean, maintainable server that directly enables chatbot conversations about Club Med resorts.

## What Changes

- **BREAKING**: Remove all existing MCP tools (`search_resorts`, `get_price_recommendations`, `get_location_recommendations`)
- **BREAKING**: Remove all service layer code (`search_service.py`, `price_service.py`, `location_service.py`)
- **BREAKING**: Remove all data models except what's needed for the new tool (`models/resort.py`, `models/search.py`, `models/pricing.py`, `models/recommendations.py`, `models/responses.py`)
- **BREAKING**: Remove the data layer (`data_layer/` directory including `mock_client.py`, `clubmed_api_client.py`, `protocol.py`)
- **BREAKING**: Remove the HTTP bridge (`http_bridge/` directory)
- **BREAKING**: Remove mock data files (`data/resorts.json`, `data/availability.json`, `data/pricing_rules.json`)
- **BREAKING**: Remove frontend chatbot UI (`frontend/` directory)
- Add a single new MCP tool: `get_clubmed_products` that calls the Club Med `GET /v2/products` API with pagination, filtering, and locale support
- The MCP server reads API documentation from `./api-docs/get-product-api-swgger-doc.md` to understand the endpoint contract
- Simplify `config.json` to only hold the API key and language settings
- Simplify `pyproject.toml` dependencies to only what's needed (mcp, httpx, pydantic)

## Capabilities

### New Capabilities
- `clubmed-products-relay`: Single MCP tool that relays requests to the Club Med `GET /v2/products` API, supporting pagination, filtering, and locale parameters. Returns product data (resorts) directly from the API, enabling a chatbot to list resorts or get specific resort information.

### Modified Capabilities
_(none - this is a full rebuild, existing specs are superseded)_

## Impact

- **Code**: Complete replacement of `src/` contents. Only `mcp_server.py` and a minimal API client module remain. All models, services, data layer, and HTTP bridge are removed.
- **APIs**: The three existing MCP tools are replaced by one (`get_clubmed_products`). Any MCP client configurations referencing the old tools will break.
- **Dependencies**: `fastapi`, `uvicorn`, `boto3`, `botocore`, `python-dateutil` can be removed. Only `mcp`, `httpx`, and `pydantic` are needed.
- **Configuration**: `config.json` simplifies to API key and language. The `data_provider` toggle is removed (always uses real API).
- **Data files**: `data/` directory with mock JSON files is removed.
- **Frontend**: `frontend/` directory is removed entirely.
