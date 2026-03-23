## ADDED Requirements

### Requirement: Fetch all products from real API on initialization
The `ClubMedAPIClient` SHALL fetch all pages from `GET /v2/products` on initialization and cache the results in memory. It MUST loop through all pages using the `Link` response header until no `next` link is present.

#### Scenario: Successful full fetch
- **WHEN** `ClubMedAPIClient` is instantiated with a valid `api_key`
- **THEN** it SHALL fetch all pages from `api.clubmed.com/v2/products` using `limit=50` per page
- **THEN** the in-memory resort list SHALL contain all products across all pages

#### Scenario: API returns 206 with pagination
- **WHEN** the API responds with HTTP 206 and a `Link` header containing `rel="next"`
- **THEN** the client SHALL request the next page and accumulate results

#### Scenario: Last page reached
- **WHEN** the API response has no `rel="next"` in the `Link` header
- **THEN** the client SHALL stop paginating and finalize the in-memory cache

#### Scenario: API unreachable at init
- **WHEN** the API is unreachable or returns a non-2xx status during initialization
- **THEN** the client SHALL raise an exception that propagates to MCP server startup, causing fast failure

### Requirement: Map API product response to internal Resort model
The `ClubMedAPIClient` SHALL map each product from the API response to the internal `Resort` model using defined field mappings.

#### Scenario: Standard product mapping
- **WHEN** the API returns a product with `id`, `full_title`, `destination`, `capacity_max`, `category`, `seasons`, and `available_services`
- **THEN** the client SHALL produce a `Resort` with `id`, `name`, `location` (country, region, city, coordinates), `climate`, `activities`, `max_capacity`, and `travel_time_hours = {}`

#### Scenario: Climate derivation from category and seasons
- **WHEN** a product has `category.id = "sun"` and `seasons` does not exclusively contain `"WINTER"`
- **THEN** `climate` SHALL be `"tropical"`
- **WHEN** a product's `seasons` list contains only `"WINTER"`
- **THEN** `climate` SHALL be `"cold"`
- **WHEN** a product has any other combination
- **THEN** `climate` SHALL be `"temperate"`

#### Scenario: Missing coordinates default
- **WHEN** the API product has no coordinate data
- **THEN** `location.coordinates` SHALL default to `Coordinates(latitude=0.0, longitude=0.0)`

### Requirement: Authenticate API requests with x-api-key header
The `ClubMedAPIClient` SHALL send the `x-api-key` header and `accept-language` header on every request to the Club Med API.

#### Scenario: Headers sent on each request
- **WHEN** the client makes any HTTP request to `/v2/products`
- **THEN** the `x-api-key` header SHALL contain the configured API key
- **THEN** the `accept-language` header SHALL contain the configured language (default `"fr-FR"`)

### Requirement: Include timestamp query parameter on requests
The `ClubMedAPIClient` SHALL include a `timestamp` query parameter set to the current Unix time in milliseconds on each request.

#### Scenario: Timestamp present in request
- **WHEN** the client constructs a request URL
- **THEN** the URL SHALL include `timestamp=<current_unix_ms>` as a query parameter

### Requirement: search_resorts MCP tool does not accept travel_time
The `search_resorts` MCP tool's `inputSchema` SHALL NOT include a `travel_time` parameter, as the real API does not provide travel time data.

#### Scenario: Tool schema has no travel_time
- **WHEN** an MCP client calls `list_tools`
- **THEN** the `search_resorts` tool's `inputSchema` SHALL NOT contain a `travel_time` property

### Requirement: Provider selection via configuration
The `mcp_server` SHALL instantiate `ClubMedAPIClient` when `config.json` sets `data_provider = "real"` and SHALL instantiate `MockAPIClient` when `data_provider = "mock"`.

#### Scenario: Real provider selected
- **WHEN** `config.json` has `"data_provider": "real"`
- **THEN** `mcp_server` SHALL create a `ClubMedAPIClient` using `clubmed_api_key` and `clubmed_language` from config

#### Scenario: Mock provider selected
- **WHEN** `config.json` has `"data_provider": "mock"`
- **THEN** `mcp_server` SHALL create a `MockAPIClient` as before
