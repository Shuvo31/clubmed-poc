## 1. Build System Migration

- [x] 1.1 Update `pyproject.toml`: replace `setuptools` build backend with `hatchling`, add `[tool.hatch.build.targets.wheel]` packages config, remove `[tool.setuptools.packages.find]`
- [x] 1.2 Add `httpx>=0.27.0` to `[project.dependencies]` in `pyproject.toml`
- [x] 1.3 Run `uv sync` to regenerate `uv.lock` with the new build backend and `httpx` runtime dep

## 2. Configuration

- [x] 2.1 Add `clubmed_api_key: str = ""` and `clubmed_language: str = "fr-FR"` fields to `AppConfig` in `src/config.py`
- [x] 2.2 Update `config.json`: set `"data_provider": "real"`, add `"clubmed_api_key"` and `"clubmed_language"` fields
- [x] 2.3 Add `CLUBMED_API_KEY=201801041426.test.clubmed.com` and `CLUBMED_ACCEPT_LANGUAGE=fr-FR` to `.env`

## 3. Real API Client

- [x] 3.1 Create `src/data_layer/clubmed_api_client.py` with `ClubMedAPIClient` class implementing `ResortDataProvider` protocol
- [x] 3.2 Implement `_fetch_all_products()`: paginated loop using `httpx.Client`, `limit=50`, timestamp query param, loop until no `rel="next"` in `Link` header
- [x] 3.3 Implement `_map_product(product: dict) -> Resort`: map all fields including climate derivation from `category.id` + `seasons`, default coordinates, empty `travel_time_hours`
- [x] 3.4 Implement `get_pricing()`: return a `Price` derived from `product.price.best_price` stored during init fetch (POC-level, always returns best price regardless of dates/persons)
- [x] 3.5 Implement `check_availability()`: always return `True` for POC
- [x] 3.6 Implement remaining protocol methods: `get_all_resorts()`, `get_resort_by_id()`, `search_resorts()`, `get_resorts_by_region()`
- [x] 3.7 Expose `ClubMedAPIClient` in `src/data_layer/__init__.py`

## 4. MCP Server Wiring

- [x] 4.1 Update `src/mcp_server.py` `initialize_services()`: add branch for `data_provider == "real"` that instantiates `ClubMedAPIClient`; update `data_provider == "mock"` branch; raise for unknown providers
- [x] 4.2 Remove `travel_time` property from `search_resorts` tool `inputSchema` in `mcp_server.py`

## 5. Verification

- [x] 5.1 Run `uv run club-med-mcp` and confirm server starts, fetches real products, and logs the resort count
