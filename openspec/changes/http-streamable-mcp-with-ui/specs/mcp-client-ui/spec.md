## ADDED Requirements

### Requirement: Standalone UI project structure
The UI SHALL be a separate Python project located at `../clubmed-mcp-ui/` (sibling to the MCP server project). It SHALL have its own `pyproject.toml` with dependencies on `fastapi`, `uvicorn`, `mcp`, and `httpx`.

#### Scenario: UI project is independent
- **WHEN** a developer navigates to `../clubmed-mcp-ui/`
- **THEN** there SHALL be a `pyproject.toml`, a `main.py` backend file, and a `static/index.html` frontend file
- **THEN** the project SHALL be installable and runnable independently of the MCP server project

### Requirement: UI backend proxies MCP calls
The UI backend SHALL be a FastAPI application that acts as an MCP client using `streamablehttp_client` from the MCP SDK. It SHALL expose REST endpoints that the browser can call, and translate them into MCP tool invocations.

#### Scenario: List available tools
- **WHEN** the browser sends a GET request to `/api/tools`
- **THEN** the backend SHALL connect to the MCP server at `http://localhost:8000/mcp`
- **THEN** the backend SHALL return a JSON array of available tools with their names, descriptions, and input schemas

#### Scenario: Invoke a tool
- **WHEN** the browser sends a POST request to `/api/tools/invoke` with `{"name": "get_clubmed_products", "arguments": {"limit": 5}}`
- **THEN** the backend SHALL invoke the tool on the MCP server via the HTTP Streamable client
- **THEN** the backend SHALL return the tool result as JSON to the browser

#### Scenario: MCP server unreachable
- **WHEN** the browser sends a request to `/api/tools` but the MCP server is not running
- **THEN** the backend SHALL return an HTTP 502 response with an error message indicating the MCP server is unreachable

### Requirement: Simple HTML/JS frontend
The UI SHALL serve a single HTML page with vanilla JavaScript (no build step, no framework). The page SHALL provide a minimal interface to list MCP tools and invoke `get_clubmed_products` with configurable parameters.

#### Scenario: Page loads and lists tools
- **WHEN** the user opens `http://localhost:3000` in a browser
- **THEN** the page SHALL load and automatically fetch the list of available tools from `/api/tools`
- **THEN** each tool SHALL be displayed with its name and description

#### Scenario: User invokes get_clubmed_products
- **WHEN** the user enters filter parameters (limit, page, filter, language) and clicks an "Invoke" button
- **THEN** the page SHALL send a POST request to `/api/tools/invoke` with the tool name and arguments
- **THEN** the response SHALL be displayed as formatted JSON on the page

#### Scenario: Error display
- **WHEN** a tool invocation returns an error
- **THEN** the page SHALL display the error message clearly to the user

### Requirement: UI runs on port 3000
The UI backend SHALL listen on `0.0.0.0:3000` by default, avoiding conflict with the MCP server on port 8000.

#### Scenario: UI starts on correct port
- **WHEN** the UI application is started
- **THEN** it SHALL listen on port 3000
- **THEN** the user SHALL be able to access it at `http://localhost:3000`
