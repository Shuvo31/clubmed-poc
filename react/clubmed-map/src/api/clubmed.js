const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8080";

async function request(path, { signal, ...options } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}

export async function fetchHotels({ q = "", country, region, themes, limit = 100 } = {}, signal) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (country) params.set("country", country);
  if (region) params.set("region", region);
  if (Array.isArray(themes)) themes.forEach((t) => params.append("themes", t));
  params.set("limit", String(limit));

  const query = params.toString();
  return request(`/hotels${query ? `?${query}` : ""}`, { signal });
}
