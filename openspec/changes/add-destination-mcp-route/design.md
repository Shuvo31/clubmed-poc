## Context

The MCP server is a minimal Python relay that proxies Club Med API endpoints as MCP tools. It currently has one tool (`get_clubmed_products`) backed by `ClubMedClient.get_products()`. The destinations API (`GET /v0/destinations`) is documented in `api-docs/api-destination-swagger.md` but has no corresponding MCP tool or client method.

The destinations endpoint returns a hierarchical structure — geographical areas containing countries containing products — which is fundamentally different from the flat paginated list returned by `/v2/products`. There is no pagination on this endpoint; it returns the full dataset in a single response.

## Goals / Non-Goals

**Goals:**
- Expose the Club Med destinations API as a second MCP tool following the established relay pattern
- Keep the same flat source structure (no new files) — add method to existing client and tool to existing server
- Return raw API JSON so the AI client can interpret the geographical hierarchy directly

**Non-Goals:**
- Transforming or flattening the nested geographic structure — relay as-is
- Adding caching or rate limiting for the destinations endpoint
- Combining destinations and products data into a single tool

## Decisions

### 1. Single method addition to `ClubMedClient`

**Decision**: Add `get_destinations()` to the existing `ClubMedClient` class rather than creating a new client class.

**Rationale**: The client already handles auth headers, timestamps, and error handling for the same API base URL. A second method keeps the code DRY and matches the relay architecture established by the `rebuild-mcp-api-docs-relay` change.

**Alternatives considered**: Separate client class per endpoint — rejected as unnecessary overhead for a simple relay.

### 2. Minimal parameters: `filter` and `language`

**Decision**: The tool accepts optional `filter` (array of strings) and `language` parameters, matching the API's supported query parameters.

**Rationale**: The destinations API only supports `filter` as a query parameter (plus the required headers). No pagination params exist on this endpoint. The `language` parameter overrides the default locale, same pattern as the products tool.

### 3. Return the raw JSON array

**Decision**: Return the API response as raw JSON (the array of geographical areas) without wrapping in additional metadata.

**Rationale**: Unlike `/v2/products` which needs pagination metadata extraction, `/v0/destinations` returns a complete dataset with HTTP 200. No `Content-Range` or `Link` headers to parse. The response is wrapped in a dict with `destinations` and `status_code` keys for consistency with the products tool pattern.

### 4. Same error handling pattern

**Decision**: Reuse the same error handling approach: structured error dicts for 400, timeout, and network errors.

**Rationale**: Consistency with `get_products()`. The destinations API does not document 206 or 416 responses, so those cases are not needed.

## Risks / Trade-offs

- **[Large response size]** The destinations endpoint returns all areas/countries/products in one call (~50KB+ JSON). This is the API's design and cannot be paginated. → Mitigation: Acceptable for MCP tool responses; AI clients can parse the hierarchy. Document the response size in the tool description.
- **[No pagination]** Unlike products, there is no way to request a subset. → Mitigation: The `filter` parameter can narrow results. This is a characteristic of the upstream API, not something we can change.
