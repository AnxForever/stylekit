import { createServer } from "node:http";
import { timingSafeEqual } from "node:crypto";
import { statfs } from "node:fs/promises";
import { pathToFileURL } from "node:url";

export const EVENT_TYPES = [
  "page_view", "style_view", "showcase_view", "style_engagement", "style_favorite",
  "style_export", "code_copy", "prompt_copy", "animation_view", "template_view",
  "template_source_open", "template_source_copy", "template_download", "template_external_click",
  "newsletter_subscribe", "cta_click", "search", "github_click", "showcase_open",
  "shadcn_command_copy", "project_brief_generated", "project_brief_copy", "project_brief_download",
  "pack_offer_view", "pack_price_view", "catalog_impression", "catalog_click",
];
const eventTypes = new Set(EVENT_TYPES);
const eventKeys = new Set([
  "event_id", "visitor_id", "session_id", "event_type", "event_data", "style_slug", "created_at",
]);
const propertyKeys = new Set([
  "slug", "source", "format", "language", "prompt_type", "locale", "surface", "action", "storage",
  "active_ms", "max_scroll_percent", "rank", "page", "sort", "collection_slug", "filter_count",
  "query_present", "query_length", "results_count", "label", "location", "target", "project_type",
  "stack_count", "required_item_count", "state_count", "optional_field_count", "completion_tier",
  "experiment_id", "offer_version", "variant_id", "pack_id", "pack_version", "offer_id",
  "visibility_ms", "visible_ratio_bps", "price_id", "currency", "amount_minor", "path", "hostname",
  "referrerDomain", "referrerType", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "browser", "os", "deviceType", "country", "environment", "measurementVersion", "timestampSource",
]);
const styleEvents = new Set([
  "style_view", "showcase_view", "style_engagement", "style_favorite", "style_export", "prompt_copy",
  "showcase_open", "shadcn_command_copy", "project_brief_generated", "project_brief_copy",
  "project_brief_download", "catalog_impression", "catalog_click",
]);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const GIB = 1024 ** 3;
const REPORT_WINDOW_MS = 90 * 24 * 60 * 60 * 1000;

function object(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function validateEvent(record, now = Date.now()) {
  if (!object(record) || Object.keys(record).length !== eventKeys.size || Object.keys(record).some((key) => !eventKeys.has(key))) return false;
  if (!UUID.test(record.event_id) || !eventTypes.has(record.event_type)) return false;
  if (record.visitor_id !== null && (typeof record.visitor_id !== "string" || !UUID.test(record.visitor_id))) return false;
  if (record.session_id !== null && (typeof record.session_id !== "string" || record.session_id.length > 128 || !/^(?:[0-9a-f-]{36}|sess_[a-z0-9]{10,80})$/i.test(record.session_id))) return false;
  if (record.style_slug !== null && (typeof record.style_slug !== "string" || record.style_slug.length > 96 || !SLUG.test(record.style_slug))) return false;
  const occurredAt = typeof record.created_at === "string" ? Date.parse(record.created_at) : NaN;
  if (!Number.isFinite(occurredAt) || occurredAt < now - 10 * 60_000 || occurredAt > now + 2 * 60_000) return false;
  const data = record.event_data;
  if (!object(data) || Object.keys(data).length > 64 || data.measurementVersion !== 2 || data.environment !== "production" || data.deviceType === "bot") return false;
  for (const [key, value] of Object.entries(data)) {
    if (!propertyKeys.has(key)) return false;
    if (value === null || typeof value === "boolean") continue;
    if (typeof value === "string" && value.length <= 2048 && !/[\u0000]/.test(value)) continue;
    if (typeof value === "number" && Number.isFinite(value) && Math.abs(value) <= 1_000_000_000_000) continue;
    return false;
  }
  if (styleEvents.has(record.event_type) && (!record.style_slug || data.slug !== record.style_slug)) return false;
  if (record.event_type === "code_copy" && (data.slug ?? null) !== record.style_slug) return false;
  if (record.event_type === "page_view" && (
    typeof data.path !== "string" || !data.path.startsWith("/") || data.path.startsWith("//") ||
    !["stylekit.top", "www.stylekit.top"].includes(data.hostname)
  )) return false;
  if (record.event_type === "style_engagement" && (
    !Number.isInteger(data.active_ms) || data.active_ms < 0 || data.active_ms > 1_800_000 ||
    !Number.isInteger(data.max_scroll_percent) || data.max_scroll_percent < 0 || data.max_scroll_percent > 100
  )) return false;
  return true;
}

export function validateWindow(value) {
  if (!object(value) || Object.keys(value).length !== 2 || typeof value.start !== "string" || typeof value.end !== "string") return false;
  const start = Date.parse(value.start);
  const end = Date.parse(value.end);
  return Number.isFinite(start) && Number.isFinite(end) && end > start && end - start <= REPORT_WINDOW_MS;
}

export function createPostgresStore(pool) {
  return {
    async insert(record) {
      const { rows } = await pool.query(
        "insert into public.analytics_events(event_id, visitor_id, session_id, event_type, event_data, style_slug, created_at) values ($1::uuid, $2, $3, $4, $5::jsonb, $6, $7::timestamptz) on conflict (event_id) do nothing returning event_id",
        [record.event_id, record.visitor_id, record.session_id, record.event_type, JSON.stringify(record.event_data), record.style_slug, record.created_at],
      );
      return { success: true, duplicate: rows.length === 0 };
    },
    async insights(window) {
      const { rows } = await pool.query("select public.admin_analytics_style_insights($1::timestamptz,$2::timestamptz) as value", [window.start, window.end]);
      return rows[0].value;
    },
    async promptCopies(window) {
      const { rows } = await pool.query("select public.admin_analytics_prompt_copies($1::timestamptz,$2::timestamptz) as value", [window.start, window.end]);
      return rows[0].value;
    },
    async health() {
      const { rows } = await pool.query("select public.analytics_storage_health() as value");
      return rows[0].value;
    },
  };
}

async function freeDiskBytes(directory) {
  const stats = await statfs(directory, { bigint: true });
  const free = stats.bavail * stats.bsize;
  return Number(free > BigInt(Number.MAX_SAFE_INTEGER) ? BigInt(Number.MAX_SAFE_INTEGER) : free);
}

export function createCapacityMonitor({ store, storagePath = "/var/lib/postgresql", readDisk = freeDiskBytes, clock = Date.now, cacheMs = 10_000, limits = {} }) {
  const { warningBytes = 2 * GIB, maximumBytes = 4 * GIB, minimumFreeBytes = 2 * GIB } = limits;
  let cached;
  let expires = 0;
  let pending;
  async function load() {
    const [database, disk] = await Promise.allSettled([store.health(), readDisk(storagePath)]);
    const db = database.status === "fulfilled" ? database.value : null;
    const databaseBytes = Number.isSafeInteger(db?.databaseBytes) && db.databaseBytes >= 0 ? db.databaseBytes : null;
    const free = disk.status === "fulfilled" && Number.isSafeInteger(disk.value) && disk.value >= 0 ? disk.value : null;
    let status = "ok";
    let reason;
    if (databaseBytes === null || free === null) { status = "blocked"; reason = "health_unavailable"; }
    else if (free < minimumFreeBytes) { status = "blocked"; reason = "disk_pressure"; }
    else if (databaseBytes >= maximumBytes) { status = "blocked"; reason = "database_limit"; }
    else if (databaseBytes >= warningBytes) { status = "warning"; reason = "database_limit"; }
    const result = {
      collectionHealth: { status, databaseBytes, freeDiskBytes: free, checkedAt: new Date(clock()).toISOString(), ...(reason ? { reason } : {}) },
      estimatedRows: Number.isSafeInteger(db?.estimatedRows) ? db.estimatedRows : null,
      oldestEventAt: db?.oldestEventAt ?? null,
      newestEventAt: db?.newestEventAt ?? null,
    };
    cached = result;
    expires = clock() + cacheMs;
    return result;
  }
  return async () => {
    if (cached && clock() < expires) return cached;
    pending ??= load().finally(() => { pending = undefined; });
    return pending;
  };
}

class HttpError extends Error {
  constructor(status, code) { super(code); this.status = status; this.code = code; }
}

async function readBody(request, maxBytes) {
  if (!(request.headers["content-type"] ?? "").toLowerCase().startsWith("application/json")) throw new HttpError(415, "JSON_REQUIRED");
  if (request.headers["content-encoding"] && request.headers["content-encoding"] !== "identity") throw new HttpError(415, "ENCODING_NOT_SUPPORTED");
  const length = Number(request.headers["content-length"] ?? 0);
  if (!Number.isFinite(length) || length > maxBytes) throw new HttpError(413, "BODY_TOO_LARGE");
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxBytes) throw new HttpError(413, "BODY_TOO_LARGE");
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { throw new HttpError(400, "INVALID_JSON"); }
}

function authenticated(request, tokenBytes) {
  const header = request.headers.authorization;
  if (typeof header !== "string" || !header.startsWith("Bearer ")) return false;
  const supplied = Buffer.from(header.slice(7));
  return supplied.length === tokenBytes.length && timingSafeEqual(supplied, tokenBytes);
}

function send(response, status, value) {
  const body = JSON.stringify(value);
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
    ...(status === 503 ? { "Retry-After": "30" } : {}),
  });
  response.end(body);
}

/** No arbitrary SQL, customer identifiers, public CORS, or provider credentials. */
export function createAnalyticsServer({ store, token, capacity, clock = Date.now, maxBodyBytes = 16 * 1024, storagePath, readDisk, onError = () => {} }) {
  if (typeof token !== "string" || !/^[A-Za-z0-9_-]{32,256}$/.test(token)) throw new Error("Analytics bearer token must be a strong URL-safe token");
  const tokenBytes = Buffer.from(token);
  const capacityStatus = capacity ?? createCapacityMonitor({ store, storagePath, readDisk, clock });
  const server = createServer(async (request, response) => {
    try {
      if (!authenticated(request, tokenBytes)) { send(response, 401, { error: "Unauthorized", code: "UNAUTHORIZED" }); return; }
      if (request.method === "GET" && request.url === "/health") {
        const state = await capacityStatus();
        send(response, 200, { status: "ok", service: "stylekit-analytics", ...state });
        return;
      }
      if (request.method !== "POST" || !["/events", "/insights", "/prompt-copies"].includes(request.url)) {
        send(response, 404, { error: "Not found", code: "NOT_FOUND" });
        return;
      }
      const body = await readBody(request, maxBodyBytes);
      if (request.url === "/events") {
        if (!validateEvent(body, clock())) throw new HttpError(400, "INVALID_EVENT");
        const state = await capacityStatus();
        if (state.collectionHealth.status === "blocked") {
          send(response, 503, { error: "Analytics collection is paused", code: "ANALYTICS_STORAGE_PRESSURE", collectionHealth: state.collectionHealth });
          return;
        }
        send(response, 200, await store.insert(body));
        return;
      }
      if (!validateWindow(body)) throw new HttpError(400, "INVALID_WINDOW");
      if (request.url === "/insights") {
        const [report, state] = await Promise.all([store.insights(body), capacityStatus()]);
        send(response, 200, { ...report, collectionHealth: state.collectionHealth });
      } else {
        send(response, 200, await store.promptCopies(body));
      }
    } catch (error) {
      if (error instanceof HttpError) send(response, error.status, { error: "Invalid analytics request", code: error.code });
      else {
        // Never log SQL, event properties, tokens, URLs or provider error text.
        onError("analytics_operation_failed");
        send(response, 503, { error: "Analytics backend unavailable", code: "ANALYTICS_UNAVAILABLE" });
      }
    }
  });
  server.requestTimeout = 8_000;
  server.headersTimeout = 8_000;
  server.keepAliveTimeout = 5_000;
  server.maxRequestsPerSocket = 100;
  server.maxConnections = 40;
  return server;
}

export async function main() {
  const { Pool } = await import("pg");
  const url = process.env.ANALYTICS_DATABASE_URL;
  if (!url) throw new Error("ANALYTICS_DATABASE_URL is required");
  const parsed = new URL(url);
  if (!["postgres:", "postgresql:"].includes(parsed.protocol) || !["127.0.0.1", "localhost", "[::1]"].includes(parsed.hostname)) throw new Error("Analytics PostgreSQL must use loopback");
  if (parsed.pathname !== "/stylekit_analytics") throw new Error("Dedicated stylekit_analytics database is required");
  const port = Number(process.env.ANALYTICS_PORT ?? 3190);
  if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error("Invalid analytics port");
  const pool = new Pool({ connectionString: url, max: 3, idleTimeoutMillis: 30_000, connectionTimeoutMillis: 3_000, statement_timeout: 10_000, query_timeout: 11_000, application_name: "stylekit-analytics" });
  pool.on("error", () => process.stderr.write("analytics_database_pool_error\n"));
  const server = createAnalyticsServer({ store: createPostgresStore(pool), token: process.env.ANALYTICS_BACKEND_TOKEN, storagePath: process.env.ANALYTICS_STORAGE_PATH ?? "/var/lib/postgresql", onError: (code) => process.stderr.write(code + "\n") });
  await new Promise((resolve, reject) => { server.once("error", reject); server.listen(port, "127.0.0.1", resolve); });
  process.stdout.write(JSON.stringify({ service: "stylekit-analytics", listening: "127.0.0.1", port }) + "\n");
  const stop = () => {
    server.close(() => { void pool.end().finally(() => process.exit(0)); });
    setTimeout(() => process.exit(1), 10_000).unref();
  };
  process.once("SIGTERM", stop);
  process.once("SIGINT", stop);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(() => { process.stderr.write("analytics_startup_failed\n"); process.exitCode = 1; });
}
