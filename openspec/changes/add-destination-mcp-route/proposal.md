## Why

The MCP server currently only exposes the products API (`GET /v2/products`) as a tool. The Club Med destinations API (`GET /v0/destinations`) provides a complementary geographic view — products organized by geographical area and country — that is not yet accessible through MCP. Adding this route enables AI clients to browse the Club Med catalog by region/country hierarchy, discover available destinations, and use destination data to inform product queries.

## What Changes

- Add a `get_destinations` method to `ClubMedClient` that calls `GET /v0/destinations` with support for optional `filter` and `language` parameters
- Register a new `get_clubmed_destinations` MCP tool on the FastMCP server that relays requests to the destinations API
- The tool returns the raw JSON response: an array of geographical areas, each containing countries with their products (id, type, coordinates, links)

## Capabilities

### New Capabilities
- `clubmed-destinations-relay`: MCP tool that relays requests to the Club Med `GET /v0/destinations` API, returning products grouped by geographical area and country

### Modified Capabilities

## Impact

- **Code**: `src/clubmed_client.py` gains a new `get_destinations` method; `src/mcp_server.py` gains a new `@mcp.tool` registration
- **APIs**: New MCP tool `get_clubmed_destinations` exposed on the existing `/mcp` endpoint
- **Dependencies**: None — uses the same `httpx` client and auth headers already in place
- **Breaking changes**: None — additive only
