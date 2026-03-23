## ADDED Requirements

### Requirement: MCP server exposes a single tool named get_clubmed_products
The MCP server SHALL expose exactly one tool named `get_clubmed_products`. All previously existing tools (`search_resorts`, `get_price_recommendations`, `get_location_recommendations`) SHALL be removed.

#### Scenario: Tool listing returns only get_clubmed_products
- **WHEN** an MCP client calls `list_tools`
- **THEN** the response SHALL contain exactly one tool with `name = "get_clubmed_products"`
- **THEN** the tool SHALL have a description explaining it queries Club Med resorts/products from the official API

### Requirement: get_clubmed_products accepts pagination parameters
The `get_clubmed_products` tool SHALL accept optional `limit` (integer) and `page` (integer, default 1) parameters to control pagination of results from the Club Med API.

#### Scenario: Pagination parameters passed to API
- **WHEN** the tool is called with `limit=10` and `page=2`
- **THEN** the HTTP request to `GET /v2/products` SHALL include query parameters `limit=10&page=2`

#### Scenario: Default pagination behavior
- **WHEN** the tool is called without `limit` or `page` parameters
- **THEN** the HTTP request SHALL be sent without `limit` and `page` query parameters, deferring to the API's default behavior

### Requirement: get_clubmed_products accepts filter parameters
The `get_clubmed_products` tool SHALL accept an optional `filter` parameter (array of strings) to filter products using the Club Med API filter syntax (field + operator + value).

#### Scenario: Single filter applied
- **WHEN** the tool is called with `filter=["destination.countries.id==FR"]`
- **THEN** the HTTP request to `GET /v2/products` SHALL include the filter as a query parameter

#### Scenario: Multiple filters applied
- **WHEN** the tool is called with `filter=["category.id==sun", "comfort.level>=4"]`
- **THEN** the HTTP request SHALL include both filter values as query parameters with AND logic

#### Scenario: No filter provided
- **WHEN** the tool is called without a `filter` parameter
- **THEN** the HTTP request SHALL be sent without filter query parameters

### Requirement: get_clubmed_products accepts language parameter
The `get_clubmed_products` tool SHALL accept an optional `language` parameter (string, e.g., "en-US", "fr-FR") that overrides the default `accept-language` header.

#### Scenario: Custom language specified
- **WHEN** the tool is called with `language="en-US"`
- **THEN** the HTTP request SHALL set the `accept-language` header to `"en-US"`

#### Scenario: No language specified uses default
- **WHEN** the tool is called without a `language` parameter
- **THEN** the HTTP request SHALL use the configured default language from `config.json` (e.g., `"fr-FR"`)

### Requirement: API requests include required authentication headers
Every HTTP request to the Club Med API SHALL include the `x-api-key` header with the configured API key and the `accept-language` header with the resolved language value.

#### Scenario: Headers present on request
- **WHEN** the client sends any request to `https://api.clubmed.com/v2/products`
- **THEN** the `x-api-key` header SHALL contain the API key from `config.json`
- **THEN** the `accept-language` header SHALL contain the resolved language value

### Requirement: API requests include timestamp query parameter
Every HTTP request to the Club Med API SHALL include a `timestamp` query parameter set to the current Unix time in milliseconds.

#### Scenario: Timestamp is present and current
- **WHEN** the client constructs a request URL
- **THEN** the URL SHALL include `timestamp=<current_unix_ms>` as a query parameter

### Requirement: Tool returns raw API JSON response
The `get_clubmed_products` tool SHALL return the raw JSON response body from the Club Med API as a text content block, without mapping or transforming the data.

#### Scenario: Successful API response returned verbatim
- **WHEN** the Club Med API responds with HTTP 200 or 206 and a JSON body
- **THEN** the tool SHALL return the JSON body as-is in a `TextContent` block

#### Scenario: Pagination metadata included in response
- **WHEN** the API responds with HTTP 206 (partial content) and includes `Content-Range` and `Link` headers
- **THEN** the tool SHALL include pagination metadata (total count, current range, has_more flag) alongside the products JSON so the LLM knows whether more pages exist

### Requirement: Tool handles API errors gracefully
The `get_clubmed_products` tool SHALL handle API errors and return structured error information rather than crashing.

#### Scenario: API returns 400 bad request
- **WHEN** the Club Med API responds with HTTP 400
- **THEN** the tool SHALL return a text content block with the error status code and description from the API response

#### Scenario: API returns 416 range not satisfiable
- **WHEN** the Club Med API responds with HTTP 416
- **THEN** the tool SHALL return a text content block explaining the requested page is out of range

#### Scenario: API is unreachable
- **WHEN** the HTTP request to the Club Med API fails due to network error or timeout
- **THEN** the tool SHALL return a text content block with an error message indicating the API is unreachable

### Requirement: All previous source code is removed
All files under `src/services/`, `src/data_layer/`, `src/models/`, `src/http_bridge/`, `data/`, and `frontend/` SHALL be deleted. The `src/` directory SHALL contain only `__init__.py`, `mcp_server.py`, and `clubmed_client.py`.

#### Scenario: Clean source directory
- **WHEN** the rebuild is complete
- **THEN** `src/` SHALL contain exactly: `__init__.py`, `mcp_server.py`, `clubmed_client.py`
- **THEN** the directories `src/services/`, `src/data_layer/`, `src/models/`, `src/http_bridge/` SHALL NOT exist
- **THEN** the directories `data/` and `frontend/` SHALL NOT exist at the project root

### Requirement: Configuration simplified to API key and language
The `config.json` file SHALL contain only `clubmed_api_key` (string) and `clubmed_language` (string, default "fr-FR"). All other configuration fields SHALL be removed.

#### Scenario: Minimal config.json
- **WHEN** the server reads `config.json`
- **THEN** it SHALL use `clubmed_api_key` for API authentication
- **THEN** it SHALL use `clubmed_language` as the default `accept-language` header value

### Requirement: pyproject.toml dependencies minimized
The `pyproject.toml` SHALL list only the required dependencies: `mcp>=1.9.0`, `httpx>=0.27.0`, and `pydantic>=2.7.2`. All other dependencies (`fastapi`, `uvicorn`, `boto3`, `botocore`, `python-dateutil`) SHALL be removed. Optional dependency groups (`llm`, `dev`) SHALL be removed.

#### Scenario: Minimal dependencies
- **WHEN** the project dependencies are inspected
- **THEN** only `mcp`, `httpx`, and `pydantic` SHALL be listed as required dependencies
