## Context

The project is a Club Med MCP server that exposes resort search and pricing tools to LLM agents via the MCP protocol over stdio. It currently uses a `MockAPIClient` backed by hand-crafted JSON files in `./data/`. The data layer is abstracted behind a `ResortDataProvider` protocol, so adding a real client requires only implementing that protocol — the services layer and MCP tool handlers are untouched.

The Club Med API is a REST API at `api.clubmed.com`. The relevant endpoint is `GET /v2/products`, which returns a paginated list of resort products. Authentication is via `x-api-key` header. The API uses HTTP 206 for paginated responses, with pagination metadata in `Link` and `Content-Range` response headers.

The build system uses `setuptools` but the project already uses UV for dependency management (there is a `uv.lock`). The UV standard build backend is `hatchling`.

## Goals / Non-Goals

**Goals:**
- Replace the active data provider with a real HTTP client calling the Club Med API
- Fetch all resort products at server startup (cache in memory, same pattern as `MockAPIClient`)
- Map the API's product schema to the internal `Resort` model faithfully
- Migrate `pyproject.toml` build backend from `setuptools` to `hatchling`
- Keep `MockAPIClient` intact and selectable via `config.json`

**Non-Goals:**
- Implementing real-time availability or pricing from the API (no such endpoint is in scope)
- Caching persistence across restarts (memory-only cache is sufficient for POC)
- Supporting concurrent/async HTTP at this stage (sync `httpx` is adequate)
- Implementing a `search_resorts` travel-time filter (data unavailable from API)

## Decisions

### Decision 1: Fetch all pages at initialization (eager load)

**Choice**: On `ClubMedAPIClient.__init__`, loop through all pages of `/v2/products` synchronously and store the full list in `self._resorts`.

**Rationale**: Mirrors the `MockAPIClient` pattern exactly. The services layer calls `get_all_resorts()` at search time and filters in Python — this design requires no change to services. The API has ~782 products across ~157 pages at `limit=5`; using `limit=50` reduces this to ~16 requests, which is fast enough at startup.

**Alternative considered**: Lazy fetch per tool call. Rejected because it adds latency to every MCP tool invocation and complicates error handling mid-conversation.

### Decision 2: Use `httpx` (sync client) rather than `aiohttp` or `requests`

**Choice**: `httpx.Client` (synchronous).

**Rationale**: The MCP server's `initialize_services()` is called synchronously before the async event loop starts. Using `httpx` (sync) fits naturally. `httpx` is also already present in `uv.lock` as a dev dependency (via pytest), so it's a known-compatible version. `requests` would also work but `httpx` is more modern and consistent with the project's dependency style.

**Alternative considered**: `aiohttp` with async init. Rejected — requires restructuring `mcp_server.py`'s startup to be async, adding unnecessary complexity for a POC.

### Decision 3: Climate field derived from `category.id` + `seasons`

**Choice**: Map as follows:
- `category.id == "sun"` AND seasons is not exclusively `["WINTER"]` → `"tropical"`
- seasons exclusively `["WINTER"]` → `"cold"`
- all other combinations → `"temperate"`

**Rationale**: The API has no explicit `climate` field. `category.id` is either `"sun"` (beach/warm) or `"ski"` (inferred from winter-only). Mountain resorts with both seasons fall back to `"temperate"`. This is a best-effort mapping that preserves the existing `search_resorts` climate filter.

### Decision 4: `travel_time_hours` set to empty dict; `travel_time` removed from MCP tool

**Choice**: Store `{}` for `travel_time_hours`; remove the `travel_time` input from `search_resorts` tool schema.

**Rationale**: The API does not return origin-city travel times. Setting `{}` means the existing `_filter_by_travel_time` method in `ResortSearchService` simply never matches (empty dict → no travel times → filter passes nothing). Removing the tool parameter prevents confusion. `SearchFilters.travel_time` remains optional and `None` by default so the filter is simply skipped.

### Decision 5: `hatchling` as build backend

**Choice**: Replace `setuptools` with `hatchling` in `[build-system]`; replace `[tool.setuptools.packages.find]` with `[tool.hatch.build.targets.wheel] packages = ["src"]`.

**Rationale**: `hatchling` is the recommended build backend for UV projects. It requires minimal configuration and is already a transitive dependency in the UV ecosystem. No functional change to how the package is built.

### Decision 6: API key stored in config.json + .env, not hardcoded

**Choice**: Add `clubmed_api_key: str` and `clubmed_language: str` to `AppConfig`. Read from `config.json`. Also document in `.env` as `CLUBMED_API_KEY`.

**Rationale**: Consistent with the existing config pattern. The test key (`201801041426.test.clubmed.com`) can live in `config.json` for the POC; production would override via environment variable.

## Risks / Trade-offs

- **API availability at startup** → The MCP server will fail to start if the API is unreachable. Mitigation: `httpx` raises `ConnectError` which propagates clearly with a log message. This is acceptable for a POC (fail fast > silent degradation).
- **API schema drift** → If Club Med changes the product response shape, field mapping will silently produce empty/default values. Mitigation: Add field-level logging at DEBUG for missing expected keys; easy to diagnose.
- **Memory footprint** → ~782 products cached in memory. Each product maps to a slim `Resort` object (~500 bytes). Total: ~400KB. Not a concern.
- **No pricing/availability from real API** → The `get_price_recommendations` and `get_location_recommendations` tools still use mock-style in-memory logic (services layer). Real prices from the API's `price.best_price` field are stored on the `Resort` model as... they aren't. The existing `price_service` uses `MockAPIClient.get_pricing()` which requires mock pricing rules. **This means price and location tools will fail at runtime when `data_provider=real`** because `ClubMedAPIClient` doesn't implement `get_pricing()` or `check_availability()` with real data.

  **Decision**: For the POC scope, `get_pricing()` will return a basic price derived from the product's `price.best_price` field captured during the initial fetch, and `check_availability()` will always return `True`. This is explicitly noted as POC-only behaviour.

## Migration Plan

1. Update `pyproject.toml` (hatchling, add httpx)
2. Run `uv sync` to regenerate `uv.lock`
3. Update `config.py` with new fields
4. Update `config.json` to `"data_provider": "real"`
5. Add `CLUBMED_API_KEY` to `.env`
6. Create `src/data_layer/clubmed_api_client.py`
7. Update `src/mcp_server.py` to wire the new client and remove `travel_time` from tool schema
8. Test: run `uv run club-med-mcp` and confirm startup fetches real products

**Rollback**: Set `"data_provider": "mock"` in `config.json`. No code changes needed.

## Open Questions

- Should `get_price_recommendations` be disabled or removed when `data_provider=real`? For now it returns POC-level prices from the stored `best_price` field.
- Should the `timestamp` parameter be required by the Club Med API or is it optional? Observation from the swagger doc sample suggests it is passed but may not be required.
