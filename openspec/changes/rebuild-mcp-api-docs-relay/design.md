## Context

The current MCP server (`src/mcp_server.py`) exposes three tools (`search_resorts`, `get_price_recommendations`, `get_location_recommendations`) backed by a multi-layer architecture: Pydantic models, service classes, a data layer with mock and real API clients, an HTTP bridge with FastAPI, and an LLM service. This complexity is unnecessary for the actual use case: enabling a chatbot to ask about Club Med resorts.

The Club Med product API (`GET /v2/products`) already provides all resort data -- names, locations, prices, services, accommodations, categories. The API documentation is captured locally in `./api-docs/get-product-api-swgger-doc.md`. The MCP server should simply relay requests to this API and return raw product data to the LLM, letting the LLM handle interpretation and conversation.

## Goals / Non-Goals

**Goals:**
- Strip the MCP server down to a single tool that calls `GET /v2/products` on `api.clubmed.com`
- Support the full query surface of the API: pagination (`limit`, `page`), filtering (`filter`), and locale (`accept-language`)
- Return raw API JSON so the LLM has maximum flexibility in how it presents resort data
- Keep configuration minimal: API key and language in `config.json`
- Maintain stdio transport for MCP protocol compatibility

**Non-Goals:**
- No derived/computed data (scoring, price comparisons, location recommendations)
- No mock data layer -- always hits the real API
- No HTTP bridge / REST API / FastAPI server
- No frontend chatbot UI
- No LLM integration inside the MCP server (the LLM is the MCP client, not part of the server)
- No caching layer (keep it simple; API already has cache headers)

## Decisions

### Decision 1: Single tool `get_clubmed_products` instead of multiple specialized tools

**Choice**: One tool that mirrors the `GET /v2/products` API parameters directly.

**Rationale**: The previous design had three tools that applied business logic (search filtering, price comparison, location scoring) on top of the API data. This added complexity without clear value -- the LLM can interpret raw data and apply its own reasoning. A single relay tool is simpler, easier to maintain, and gives the LLM full access to the API's native filtering capabilities.

**Alternative considered**: Multiple tools (e.g., `list_resorts`, `get_resort_details`, `search_by_filter`). Rejected because the API is a single endpoint with flexible query parameters -- splitting it artificially fragments the interface without benefit.

### Decision 2: Return raw API JSON, not mapped models

**Choice**: Pass through the JSON response from the Club Med API directly.

**Rationale**: The previous design mapped API responses to internal Pydantic models (`Resort`, `Location`, etc.), losing some fields and adding translation overhead. By returning raw JSON, the LLM gets the complete data (descriptions, media URLs, SEO text, tags, links) and can respond to any user question. This eliminates the models layer entirely.

**Alternative considered**: Minimal Pydantic mapping for type safety. Rejected because the MCP tool output is text content (JSON string), so Pydantic validation of the response adds overhead without benefit to the consumer.

### Decision 3: Use httpx for API calls

**Choice**: Keep `httpx` as the HTTP client library.

**Rationale**: Already a project dependency, async-capable, handles pagination well. No reason to change.

### Decision 4: Flat source structure

**Choice**: Two files only -- `src/mcp_server.py` (MCP server + tool handler) and `src/clubmed_client.py` (HTTP client for the Club Med API).

**Rationale**: With a single tool and no business logic, deeper directory structure (services/, data_layer/, models/) adds no organizational value. Two files keep the codebase easy to navigate.

**Alternative considered**: Keep a `services/` layer. Rejected -- there is no business logic to encapsulate; the "service" would just be a pass-through.

### Decision 5: Configuration via config.json

**Choice**: Keep `config.json` but simplify it to only `clubmed_api_key` and `clubmed_language`.

**Rationale**: The existing pattern works. Environment variables could also work but `config.json` is already established in the project and referenced by MCP client configurations.

## Risks / Trade-offs

- **[API availability]** The server depends on `api.clubmed.com` being reachable. No mock fallback means local development without network access is not possible. → Mitigation: This is acceptable for a POC; mock can be added later if needed.
- **[API key exposure]** The API key is stored in `config.json` which could be committed. → Mitigation: Ensure `config.json` is in `.gitignore` or use environment variable override.
- **[Large responses]** The API has 782 products. Fetching all without pagination could produce large responses that hit LLM context limits. → Mitigation: The tool supports `limit` and `page` parameters; the LLM should be instructed (via tool description) to paginate.
- **[Breaking change]** All existing MCP tool names change. Any client configured for the old tools will break. → Mitigation: Acceptable for a POC rebuild. Document the new tool name.
