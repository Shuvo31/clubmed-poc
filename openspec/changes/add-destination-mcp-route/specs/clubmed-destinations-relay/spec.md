## ADDED Requirements

### Requirement: Destinations client method
The `ClubMedClient` class SHALL provide a `get_destinations` async method that calls `GET /v0/destinations` on the Club Med API. The method SHALL accept optional `filter` (list of strings) and `language` (string) parameters. It SHALL use the same auth headers (`x-api-key`, `accept-language`, `accept: application/json`) and timestamp query parameter as the existing `get_products` method.

#### Scenario: Successful destinations fetch
- **WHEN** `get_destinations()` is called with no parameters
- **THEN** the method SHALL return a dict with `destinations` (the raw JSON array of geographical areas) and `status_code` (200)

#### Scenario: Destinations fetch with language override
- **WHEN** `get_destinations(language="en-US")` is called
- **THEN** the request SHALL use `accept-language: en-US` header and return destinations in English

#### Scenario: Destinations fetch with filter
- **WHEN** `get_destinations(filter=["type==VILLAGE"])` is called
- **THEN** the request SHALL include the filter as query parameters and return the filtered result

#### Scenario: API timeout
- **WHEN** the Club Med API does not respond within 30 seconds
- **THEN** the method SHALL return `{"error": "Request to Club Med API timed out after 30 seconds.", "status_code": 504}`

#### Scenario: Network error
- **WHEN** the Club Med API is unreachable
- **THEN** the method SHALL return an error dict with `status_code` 503 and a descriptive error message

#### Scenario: Bad request
- **WHEN** the API returns HTTP 400
- **THEN** the method SHALL return an error dict with `status_code` 400 and the error description from the response body

### Requirement: Destinations MCP tool registration
The MCP server SHALL register a `get_clubmed_destinations` tool using the `@mcp.tool()` decorator. The tool SHALL have a description explaining the endpoint's purpose (geographic hierarchy of destinations), available parameters, and response structure.

#### Scenario: Tool is discoverable
- **WHEN** an MCP client lists available tools
- **THEN** `get_clubmed_destinations` SHALL appear in the tool list with its description

#### Scenario: Tool invocation returns destinations
- **WHEN** an MCP client calls `get_clubmed_destinations` with no arguments
- **THEN** the tool SHALL return a JSON string containing the full destinations hierarchy (geographical areas > countries > products)

#### Scenario: Tool accepts filter parameter
- **WHEN** an MCP client calls `get_clubmed_destinations` with `filter=["type==VILLAGE"]`
- **THEN** the tool SHALL pass the filter to the client method and return the filtered results

#### Scenario: Tool accepts language parameter
- **WHEN** an MCP client calls `get_clubmed_destinations` with `language="en-US"`
- **THEN** the tool SHALL pass the language override to the client method

### Requirement: Consistent response structure
The `get_destinations` method SHALL return responses in the same structural pattern as `get_products`: a dict with a primary data key (`destinations`), a `status_code` key, and on error an `error` key with a human-readable message.

#### Scenario: Success response shape
- **WHEN** the API returns HTTP 200
- **THEN** the response SHALL be `{"destinations": [...], "status_code": 200}` where `destinations` is the raw JSON array from the API

#### Scenario: Error response shape
- **WHEN** the API returns an error
- **THEN** the response SHALL be `{"error": "<message>", "status_code": <code>}` matching the products error pattern
