import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { URL } from "node:url";

import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";

process.on("uncaughtException", (e) => console.error("uncaughtException:", e));
process.on("unhandledRejection", (e) => console.error("unhandledRejection:", e));

const MCP_PATH = "/mcp";       // ChatGPT Apps uses this
const SSE_PATH = "/sse";       // Inspector SSE (optional)
const MSG_PATH = "/messages";  // Inspector SSE messages (optional)

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const API_BASE_URL = process.env.CLUBMED_API_BASE_URL || "http://127.0.0.1:8080";
const WIDGET_URI = "ui://widget/clubmed-map.html";

const widgetHtml = readFileSync(
  new URL("./public/clubmed-map.html", import.meta.url),
  "utf8"
);

// ---------------------
// Helpers
// ---------------------
function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type,mcp-session-id,last-event-id");
  res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      if (!data) return resolve(undefined);
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

function hotelsListUrl({ query = "", country, region, themes, limit = 100 }) {
  const u = new URL(API_BASE_URL + "/hotels");
  if (query) u.searchParams.set("q", query);
  if (country) u.searchParams.set("country", country);
  if (region) u.searchParams.set("region", region);
  if (Array.isArray(themes)) themes.forEach((t) => u.searchParams.append("themes", t));
  u.searchParams.set("limit", String(limit));
  return u.toString();
}

function mapSearchUrl({ query = "", country, region, themes, limit = 100 }) {
  const u = new URL(API_BASE_URL + "/map/search");
  if (query) u.searchParams.set("q", query);
  if (country) u.searchParams.set("country", country);
  if (region) u.searchParams.set("region", region);
  if (Array.isArray(themes)) themes.forEach((t) => u.searchParams.append("themes", t));
  u.searchParams.set("limit", String(limit));
  return u.toString();
}

async function apiGetJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json();
}

async function apiPostJson(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json();
}

// ---------------------
// MCP server factory
// ---------------------
function createAppServer() {
  const server = new McpServer({ name: "clubmed-map-app", version: "0.6.0" });

  registerAppResource(server, "clubmed-map", WIDGET_URI, {}, async () => ({
    contents: [
      { uri: WIDGET_URI, mimeType: RESOURCE_MIME_TYPE, text: widgetHtml },
    ],
  }));

  const listHotelsSchema = {
    query: z.string().optional().default(""),
    country: z.string().optional(),
    region: z.string().optional(),
    themes: z.array(z.string()).optional(),
    limit: z.number().int().min(1).max(200).optional().default(100),
  };

  const getHotelSchema = { hotel_id: z.string() };

  const quoteSchema = {
    hotel_id: z.string(),
    check_in: z.string(),
    check_out: z.string(),
    adults: z.number().int().min(1),
    children: z.number().int().min(0).optional().default(0),
  };

  const searchSchema = {
    query: z.string(),
    limit: z.number().int().min(1).max(50).optional().default(10),
  };

  // ping (non-UI)
  registerAppTool(
    server,
    "ping",
    { title: "Ping", description: "Connectivity test.", inputSchema: { message: z.string().optional().default("pong") }, _meta: {} },
    async (args) => ({
      content: [{ type: "text", text: `ok: ${args?.message ?? "pong"}` }],
      structuredContent: { ok: true, echo: args?.message ?? "pong" },
    })
  );

  // map_search (UI-backed)
  registerAppTool(
    server,
    "map_search",
    {
      title: "Map search",
      description: "Returns resorts and bounds to render on the in-chat map UI.",
      inputSchema: listHotelsSchema,
      _meta: { ui: { resourceUri: WIDGET_URI } },
    },
    async (args) => {
      const data = await apiGetJson(
        mapSearchUrl({
          query: args?.query ?? "",
          country: args?.country,
          region: args?.region,
          themes: args?.themes,
          limit: args?.limit ?? 100,
        })
      );
      return {
        content: [],
        structuredContent: {
          hotels: data.hotels ?? [],
          bounds: data.bounds ?? null,
          count: data.count ?? (data.hotels?.length ?? 0),
        },
      };
    }
  );

  // ui_demo_load (UI-backed)
  registerAppTool(
    server,
    "ui_demo_load",
    {
      title: "UI demo load",
      description: "Loads a demo dataset onto the map UI (default: beach).",
      inputSchema: { preset: z.enum(["beach", "ski", "maldives", "alps"]).optional().default("beach") },
      _meta: { ui: { resourceUri: WIDGET_URI } },
    },
    async (args) => {
      const preset = args?.preset ?? "beach";
      const data = await apiGetJson(mapSearchUrl({ query: preset, limit: 100 }));
      return {
        content: [],
        structuredContent: {
          hotels: data.hotels ?? [],
          bounds: data.bounds ?? null,
          count: data.count ?? (data.hotels?.length ?? 0),
          preset,
        },
      };
    }
  );

  // list_hotels (non-UI)
  registerAppTool(
    server,
    "list_hotels",
    { title: "List hotels/resorts", description: "Lists hotels/resorts from the REST API.", inputSchema: listHotelsSchema, _meta: {} },
    async (args) => {
      const data = await apiGetJson(
        hotelsListUrl({
          query: args?.query ?? "",
          country: args?.country,
          region: args?.region,
          themes: args?.themes,
          limit: args?.limit ?? 100,
        })
      );
      return { content: [], structuredContent: data };
    }
  );

  // get_hotel (non-UI)
  registerAppTool(
    server,
    "get_hotel",
    { title: "Get hotel/resort by id", description: "Fetches a single hotel/resort.", inputSchema: getHotelSchema, _meta: {} },
    async (args) => {
      const data = await apiGetJson(`${API_BASE_URL}/hotels/${args.hotel_id}`);
      return { content: [], structuredContent: data };
    }
  );

  // get_quote (non-UI)
  registerAppTool(
    server,
    "get_quote",
    { title: "Get a quote", description: "Returns a mock quote from the REST API.", inputSchema: quoteSchema, _meta: {} },
    async (args) => {
      const data = await apiPostJson(`${API_BASE_URL}/quote`, {
        hotel_id: args.hotel_id,
        check_in: args.check_in,
        check_out: args.check_out,
        adults: args.adults,
        children: args.children ?? 0,
      });
      return { content: [], structuredContent: data };
    }
  );

  // search (non-UI)
  registerAppTool(
    server,
    "search",
    { title: "Search hotels (connector-style)", description: "Returns id/title/snippet/url results.", inputSchema: searchSchema, _meta: {} },
    async (args) => {
      const data = await apiGetJson(hotelsListUrl({ query: args.query, limit: args.limit ?? 10 }));
      const results = (data.hotels ?? []).map((h) => ({
        id: h.id,
        title: `${h.name} (${h.country})`,
        snippet: `Region: ${h.region}. Themes: ${(h.themes ?? []).join(", ")}. Rating: ${h.rating}`,
        url: h.bookingUrl,
        metadata: { type: "hotel" },
      }));
      return { content: [], structuredContent: { results } };
    }
  );

  // fetch (non-UI)
  registerAppTool(
    server,
    "fetch",
    { title: "Fetch hotel (connector-style)", description: "Returns JSON text blob by id.", inputSchema: { id: z.string() }, _meta: {} },
    async (args) => {
      const data = await apiGetJson(`${API_BASE_URL}/hotels/${args.id}`);
      return {
        content: [{ type: "text", text: JSON.stringify({ ok: true, ...data }, null, 2) }],
        structuredContent: data,
      };
    }
  );

  return server;
}

// ---------------------
// Start HTTP server
// ---------------------
const sseSessions = new Map(); // sessionId -> SSEServerTransport

async function main() {
  // Streamable HTTP: one long-lived server+transport is fine,
  // BUT you must pass JSON body for POST requests.
  const mcpServer = createAppServer();
  const streamableTransport = new StreamableHTTPServerTransport();
  await mcpServer.connect(streamableTransport);

  const httpServer = createServer(async (req, res) => {
    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);

    if (req.method === "GET" && url.pathname === "/") {
      res.writeHead(200, { "content-type": "text/plain" }).end("ClubMed MCP App server");
      return;
    }

    if ([MCP_PATH, SSE_PATH, MSG_PATH].includes(url.pathname) && req.method === "OPTIONS") {
      setCors(res);
      res.writeHead(204);
      res.end();
      return;
    }

    // ✅ Streamable HTTP endpoint for ChatGPT + Inspector
    if (url.pathname === MCP_PATH) {
      try {
        setCors(res);

        if (req.method === "POST") {
          const body = await readJsonBody(req);
          await streamableTransport.handleRequest(req, res, body); // ✅ body is required
          return;
        }

        // GET is used by Streamable HTTP for streaming (SSE-style) responses
        if (req.method === "GET" || req.method === "DELETE") {
          await streamableTransport.handleRequest(req, res);
          return;
        }

        res.writeHead(405, { "content-type": "text/plain" }).end("Method not allowed");
        return;
      } catch (e) {
        console.error("MCP /mcp error:", e);
        if (!res.headersSent) {
          res.writeHead(500, { "content-type": "text/plain" });
        }
        res.end("Internal Server Error");
        return;
      }
    }

    // (Optional) Legacy SSE endpoint for Inspector-only testing
    if (url.pathname === SSE_PATH && req.method === "GET") {
      setCors(res);
      const transport = new SSEServerTransport(MSG_PATH, res);
      sseSessions.set(transport.sessionId, transport);
      req.on("close", () => sseSessions.delete(transport.sessionId));
      const sseServer = createAppServer();
      await sseServer.connect(transport);
      return;
    }

    if (url.pathname === MSG_PATH && req.method === "POST") {
      setCors(res);
      const sessionId = url.searchParams.get("sessionId");
      const transport = sessionId ? sseSessions.get(sessionId) : null;
      if (!transport) {
        res.writeHead(404, { "content-type": "text/plain" }).end("Unknown sessionId");
        return;
      }
      await transport.handlePostMessage(req, res);
      return;
    }

    res.writeHead(404, { "content-type": "text/plain" }).end("Not found");
  });

  httpServer.listen(PORT, () => {
    console.log(`ClubMed MCP App listening on http://localhost:${PORT}${MCP_PATH} (Streamable HTTP)`);
    console.log(`ClubMed MCP App listening on http://localhost:${PORT}${SSE_PATH} (SSE GET stream)`);
    console.log(`ClubMed MCP App listening on http://localhost:${PORT}${MSG_PATH} (SSE POST messages)`);
    console.log(`Backend API assumed at ${API_BASE_URL}`);
  });
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
