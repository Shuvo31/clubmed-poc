# AGENTS.md — Club Med MCP Tool

Guidance for agentic coding agents working in this repository.

---

## Project Overview

A minimal Python MCP (Model Context Protocol) server that proxies Club Med public APIs as MCP
tools over HTTP Streamable transport. The source is intentionally flat:

```
src/
  __init__.py          # package marker
  clubmed_client.py    # httpx-based relay client for Club Med APIs
  mcp_server.py        # FastMCP server + tool registrations
config.json            # runtime config (api key + language) — not committed
```

Two MCP tools are exposed at `http://0.0.0.0:8000/mcp`:
- `get_clubmed_products` → `GET /v2/products` (paginated)
- `get_clubmed_destinations` → `GET /v0/destinations` (full dataset)

---

## Package Manager

This project uses **uv**. Always use `uv run` to execute Python in the managed environment.
Do not activate the venv manually or use bare `python`/`pip`.

```bash
uv run python <script>      # run a script
uv run club-med-mcp         # start the MCP server
uv add <package>            # add a runtime dependency (updates pyproject.toml + uv.lock)
uv add --dev <package>      # add a dev dependency
uv sync                     # sync venv to lockfile
```

---

## Build & Run

```bash
# Start the MCP server (HTTP Streamable on 0.0.0.0:8000/mcp)
uv run club-med-mcp

# Or directly
uv run python -m src.mcp_server

# Verify tools load without starting the server
uv run python -c "from src.mcp_server import mcp; print([t.name for t in mcp._tool_manager.list_tools()])"
```

**`config.json`** must exist at the project root before running:
```json
{
  "clubmed_api_key": "<your-api-key>",
  "clubmed_language": "fr-FR"
}
```

---

## Lint & Format

Ruff is the sole linter and formatter. It is not installed in the venv — invoke via `uv run --with`:

```bash
# Lint
uv run --with ruff ruff check .

# Lint with auto-fix
uv run --with ruff ruff check --fix .

# Format check (no changes)
uv run --with ruff ruff format --check .

# Format in place
uv run --with ruff ruff format .
```

**Ruff config** (from `pyproject.toml`):
- `line-length = 100`
- `target-version = "py310"`
- Enabled rule sets: pyflakes (F) + pycodestyle (E) only — no isort, flake8-bugbear, etc.
- Formatter: 4-space indent, double quotes, respects magic trailing commas

---

## Tests

pytest is configured but **not yet installed** and the `tests/` directory does not exist.
When adding tests:

```bash
# Install pytest
uv add --dev pytest pytest-asyncio

# Run all tests
uv run pytest

# Run a single test file
uv run pytest tests/test_clubmed_client.py

# Run a single test function
uv run pytest tests/test_clubmed_client.py::test_get_destinations_success

# Run with verbose output
uv run pytest -v
```

pytest config in `pyproject.toml`:
```toml
[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
python_classes = ["Test*"]
python_functions = ["test_*"]
```

---

## Code Style Guidelines

### Python version
Target **Python 3.10+**. Use `X | Y` union syntax only in runtime contexts where supported;
prefer `Optional[X]` / `Union[X, Y]` in type annotations for 3.10 compat (already used throughout).

### Imports
Standard library first, third-party second, local (`src.*`) last — separated by blank lines.
Use absolute imports (`from src.clubmed_client import ClubMedClient`), never relative.

```python
import json
import logging
from contextlib import asynccontextmanager
from typing import Annotated, Any, Optional

import httpx

from src.clubmed_client import ClubMedClient
```

### Type annotations
- **All** function signatures must be fully annotated (parameters and return types).
- Use `Optional[X]` for nullable params; do not use `X | None` in annotations.
- Use `dict[str, Any]` / `list[str]` (lowercase generics) for return types.
- Annotate local variables only when the type is not obvious from the right-hand side.

### Naming conventions
| Kind | Convention | Example |
|---|---|---|
| Modules | `snake_case` | `clubmed_client.py` |
| Classes | `PascalCase` | `ClubMedClient` |
| Functions / methods | `snake_case` | `get_destinations` |
| Constants | `UPPER_SNAKE` | `CLUBMED_API_BASE` |
| Private helpers | leading underscore | `_load_config`, `_extract_link_url` |
| MCP tool functions | `snake_case`, descriptive | `get_clubmed_destinations` |

### Docstrings
- Module-level: one-liner describing the file's purpose.
- Public functions/methods: one-liner summary; add multi-line only for complex behaviour.
- Use imperative mood: "Call the API and return…" not "Calls the API and returns…"

### Formatting details
- Line length: **100 characters**
- Indentation: **4 spaces** (no tabs)
- String quotes: **double quotes** everywhere
- Section separators: 75-dash comment blocks (`# ---...---`) for logical groupings in files
- Blank lines: 2 between top-level definitions, 1 between methods

### Error handling
Return structured error dicts rather than raising exceptions from client methods:
```python
# Timeout
return {"error": "Request to Club Med API timed out after 30 seconds.", "status_code": 504}
# Network failure
return {"error": f"Club Med API is unreachable: {exc}", "status_code": 503}
# Bad request
return {"error": f"Bad request (400): {description}", "status_code": 400}
```
Always include `"status_code"` in every return value (success and error). MCP tool functions
do not catch exceptions themselves — they rely on the client to return error dicts.

### Async patterns
- All API calls are `async def` using `httpx.AsyncClient` as a context manager.
- Use keyword-only arguments (`*,`) for all optional API parameters.
- Timeout is always `30.0` seconds.

### Adding a new API endpoint
Follow this pattern:
1. Add a new `async def get_<resource>(self, *, ...) -> dict[str, Any]` method to `ClubMedClient`.
2. Build `params` dict with `timestamp`, then optional query params.
3. Set standard headers: `x-api-key`, `accept-language`, `accept: application/json`.
4. Handle `TimeoutException` (504), `RequestError` (503), 400, and unexpected codes.
5. Return `{"<resource>": data, "status_code": 200}` on success.
6. Register a `@mcp.tool(description=(...))` function in `mcp_server.py` that retrieves the
   client from `ctx.request_context.lifespan_context["client"]` and returns `json.dumps(result)`.

---

## Architecture Constraints

- **Keep `src/` flat** — no subdirectories or additional modules unless the complexity clearly
  warrants it. The current two-file layout is an explicit design decision.
- **Raw JSON relay** — tools return the upstream API response as-is. Do not filter, reshape,
  or summarise API responses in the server layer.
- **No business logic in `mcp_server.py`** — all HTTP concerns live in `clubmed_client.py`.
- **`config.json` is runtime config** — never hardcode API keys; never commit `config.json`.
