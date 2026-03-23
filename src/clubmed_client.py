"""Club Med API client — relay for GET /v2/products and GET /v0/destinations."""

import time
from typing import Any, Optional

import httpx

CLUBMED_API_BASE = "https://api.clubmed.com"


class ClubMedClient:
    """HTTP client that relays requests to the Club Med /v2/products API."""

    def __init__(self, api_key: str, language: str = "fr-FR") -> None:
        self.api_key = api_key
        self.default_language = language

    async def get_products(
        self,
        *,
        limit: Optional[int] = None,
        page: Optional[int] = None,
        filter: Optional[list[str]] = None,
        language: Optional[str] = None,
    ) -> dict[str, Any]:
        """Call GET /v2/products and return products with pagination metadata.

        Returns a dict with:
          - products: list of product objects (raw API JSON)
          - pagination: dict with total, range, has_more, links (only for 206)
          - status_code: HTTP status code
        On error returns:
          - error: error description
          - status_code: HTTP status code
        """
        resolved_language = language or self.default_language

        # Build query params
        params: dict[str, Any] = {
            "timestamp": int(time.time() * 1000),
        }
        if limit is not None:
            params["limit"] = limit
        if page is not None:
            params["page"] = page
        if filter:
            # httpx sends multiple values for the same key as repeated params
            params["filter"] = filter

        headers = {
            "x-api-key": self.api_key,
            "accept-language": resolved_language,
            "accept": "application/json",
        }

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.get(
                    f"{CLUBMED_API_BASE}/v2/products",
                    params=params,
                    headers=headers,
                )
        except httpx.TimeoutException:
            return {
                "error": "Request to Club Med API timed out after 30 seconds.",
                "status_code": 504,
            }
        except httpx.RequestError as exc:
            return {
                "error": f"Club Med API is unreachable: {exc}",
                "status_code": 503,
            }

        # Handle error status codes
        if response.status_code == 400:
            try:
                body = response.json()
                description = body.get("error_description", "bad_request")
            except Exception:
                description = response.text
            return {
                "error": f"Bad request (400): {description}",
                "status_code": 400,
            }

        if response.status_code == 416:
            return {
                "error": (
                    "Requested page is out of range (416). "
                    "Use a smaller `page` value or omit `page` to start from the beginning."
                ),
                "status_code": 416,
            }

        if response.status_code not in (200, 206):
            return {
                "error": f"Unexpected response from Club Med API: HTTP {response.status_code}",
                "status_code": response.status_code,
            }

        # Successful response — parse body
        try:
            products = response.json()
        except Exception:
            return {
                "error": "Club Med API returned a non-JSON response.",
                "status_code": response.status_code,
            }

        result: dict[str, Any] = {
            "products": products,
            "status_code": response.status_code,
        }

        # Extract pagination metadata for 206 Partial Content
        if response.status_code == 206:
            pagination: dict[str, Any] = {}

            content_range = response.headers.get("content-range", "")
            if content_range:
                # Format: "0-9/256"
                try:
                    range_part, total_str = content_range.split("/")
                    first_str, last_str = range_part.split("-")
                    pagination["total"] = int(total_str)
                    pagination["range_first"] = int(first_str)
                    pagination["range_last"] = int(last_str)
                    pagination["count_in_page"] = int(last_str) - int(first_str) + 1
                except (ValueError, AttributeError):
                    pagination["content_range_raw"] = content_range

            link_header = response.headers.get("link", "")
            if link_header:
                pagination["has_more"] = 'rel="next"' in link_header
                # Parse individual link relations
                links: dict[str, str] = {}
                for part in link_header.split(","):
                    part = part.strip()
                    if 'rel="next"' in part:
                        links["next"] = _extract_link_url(part)
                    elif 'rel="prev"' in part:
                        links["prev"] = _extract_link_url(part)
                    elif 'rel="last"' in part:
                        links["last"] = _extract_link_url(part)
                    elif 'rel="first"' in part:
                        links["first"] = _extract_link_url(part)
                if links:
                    pagination["links"] = links
            else:
                pagination["has_more"] = False

            result["pagination"] = pagination

        return result

    async def get_destinations(
        self,
        *,
        filter: Optional[list[str]] = None,
        language: Optional[str] = None,
    ) -> dict[str, Any]:
        """Call GET /v0/destinations and return destinations grouped by geographic area.

        Returns a dict with:
          - destinations: list of geographical area objects (raw API JSON)
          - status_code: HTTP status code (200)
        On error returns:
          - error: error description
          - status_code: HTTP status code
        """
        resolved_language = language or self.default_language

        # Build query params
        params: dict[str, Any] = {
            "timestamp": int(time.time() * 1000),
        }
        if filter:
            params["filter"] = filter

        headers = {
            "x-api-key": self.api_key,
            "accept-language": resolved_language,
            "accept": "application/json",
        }

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.get(
                    f"{CLUBMED_API_BASE}/v0/destinations",
                    params=params,
                    headers=headers,
                )
        except httpx.TimeoutException:
            return {
                "error": "Request to Club Med API timed out after 30 seconds.",
                "status_code": 504,
            }
        except httpx.RequestError as exc:
            return {
                "error": f"Club Med API is unreachable: {exc}",
                "status_code": 503,
            }

        # Handle error status codes
        if response.status_code == 400:
            try:
                body = response.json()
                description = body.get("error_description", "bad_request")
            except Exception:
                description = response.text
            return {
                "error": f"Bad request (400): {description}",
                "status_code": 400,
            }

        if response.status_code != 200:
            return {
                "error": f"Unexpected response from Club Med API: HTTP {response.status_code}",
                "status_code": response.status_code,
            }

        # Successful response — parse body
        try:
            destinations = response.json()
        except Exception:
            return {
                "error": "Club Med API returned a non-JSON response.",
                "status_code": response.status_code,
            }

        return {
            "destinations": destinations,
            "status_code": response.status_code,
        }


    async def get_all_products(
        self,
        *,
        limit: int = 50,
        max_pages: int = 5,
        filter: Optional[list[str]] = None,
        language: Optional[str] = None,
    ) -> list[dict[str, Any]]:
        """Fetch multiple pages of products and return a flat list."""
        all_products: list[dict[str, Any]] = []
        for page in range(1, max_pages + 1):
            result = await self.get_products(
                limit=limit, page=page, filter=filter, language=language
            )
            if "error" in result:
                break
            products = result.get("products", [])
            if isinstance(products, list):
                all_products.extend(products)
            pagination = result.get("pagination", {})
            if not pagination.get("has_more", False):
                break
        return all_products


def _extract_link_url(link_part: str) -> str:
    """Extract bare URL from a Link header segment like '<url>; rel="next"'."""
    start = link_part.find("<")
    end = link_part.find(">")
    if start != -1 and end != -1:
        return link_part[start + 1 : end]
    return link_part
