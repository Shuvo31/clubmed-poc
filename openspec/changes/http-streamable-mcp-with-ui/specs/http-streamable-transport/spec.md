## ADDED Requirements

### Requirement: MCP server uses HTTP Streamable transport
The MCP server SHALL use the `FastMCP` high-level API with `transport='streamable-http'` instead of stdio transport. The server SHALL listen on `0.0.0.0:8000` and expose the MCP endpoint at `/mcp`.

#### Scenario: Server starts with HTTP Streamable transport
- **WHEN** the `club-med-mcp` console script is executed
- **THEN** the server SHALL start an HTTP server listening on `0.0.0.0:8000`
- **THEN** the MCP Streamable HTTP endpoint SHALL be available at `http://localhost:8000/mcp`

#### Scenario: MCP client connects via HTTP Streamable
- **WHEN** an MCP client sends a valid HTTP POST to `http://localhost:8000/mcp`
- **THEN** the server SHALL respond with a valid MCP JSON-RPC response
- **THEN** the client SHALL be able to list tools and invoke `get_clubmed_products`

### Requirement: Tool registration uses FastMCP decorator
The `get_clubmed_products` tool SHALL be registered using the `@mcp.tool()` decorator on a standalone async function, replacing the low-level `@app.list_tools()` / `@app.call_tool()` pattern.

#### Scenario: Tool is discoverable via list_tools
- **WHEN** an MCP client calls `list_tools` on the HTTP Streamable endpoint
- **THEN** the response SHALL include a tool named `get_clubmed_products`
- **THEN** the tool's `inputSchema` SHALL contain `limit`, `page`, `filter`, and `language` properties

#### Scenario: Tool invocation returns products
- **WHEN** an MCP client calls `get_clubmed_products` with `{"limit": 5, "page": 1}`
- **THEN** the server SHALL return a JSON text result containing a `products` array and `pagination` metadata

### Requirement: ClubMedClient initialization from config
The server SHALL load `config.json` at startup and instantiate `ClubMedClient` with the `clubmed_api_key` and `clubmed_language` values, identical to the current behavior.

#### Scenario: Config loaded at startup
- **WHEN** the server starts
- **THEN** it SHALL read `config.json` from the project root
- **THEN** it SHALL create a `ClubMedClient` instance with the configured API key and language

### Requirement: Server dependencies updated
The `pyproject.toml` SHALL include `uvicorn` as a dependency since `FastMCP.run()` with HTTP transport requires it.

#### Scenario: Dependencies are sufficient for HTTP transport
- **WHEN** the project is installed with `uv pip install -e .`
- **THEN** `uvicorn` SHALL be available as a transitive or direct dependency
- **THEN** the server SHALL start without import errors
