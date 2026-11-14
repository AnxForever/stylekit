import { afterEach, describe, expect, it, vi } from "vitest";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { createAnalyticsServer, createCapacityMonitor, createPostgresStore, EVENT_TYPES, validateEvent, validateWindow } from "./server.mjs";

const token = "a".repeat(64);
const now = Date.parse("2026-11-14T12:00:00.000Z");
const event = () => ({ event_id: randomUUID(), visitor_id: randomUUID(), session_id: randomUUID(), event_type: "page_view", event_data: { path: "/styles", hostname: "www.stylekit.top", measurementVersion: 2, environment: "production", deviceType: "desktop" }, style_slug: null, created_at: new Date(now).toISOString() });
const healthy = { collectionHealth: { status: "ok", databaseBytes: 1024, freeDiskBytes: 9 * 1024 ** 3, checkedAt: new Date(now).toISOString() } };
const servers = [];
afterEach(async () => {
  for (const server of servers.splice(0)) await new Promise((resolve) => { server.closeAllConnections(); server.close(resolve); });
});

async function start(overrides = {}) {
  const store = { insert: vi.fn().mockResolvedValue({ success: true, duplicate: false }), insights: vi.fn().mockResolvedValue({ version: 2, source: "first_party", styles: [] }), promptCopies: vi.fn().mockResolvedValue({ totalCopies: 1, styles: [] }), health: vi.fn().mockResolvedValue({ databaseBytes: 1024 }) };
  const server = createAnalyticsServer({ store, token, clock: () => now, capacity: async () => healthy, ...overrides });
  servers.push(server);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const request = (path, body, headers = {}) => fetch(base + path, { method: body === undefined ? "GET" : "POST", headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json", ...headers }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
  return { store, server, request };
}

describe("self-host analytics service", () => {
  it("rejects missing and incorrect bearer tokens before database access", async () => {
    const { request, store } = await start();
    expect((await request("/events", event(), { authorization: "" })).status).toBe(401);
    expect((await request("/events", event(), { authorization: `Bearer ${"b".repeat(64)}` })).status).toBe(401);
    expect(store.insert).not.toHaveBeenCalled();
  });

  it("acknowledges only a completed insert and preserves duplicate outcomes", async () => {
    const { request, store } = await start();
    const value = event();
    const response = await request("/events", value);
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(await response.json()).toEqual({ success: true, duplicate: false });
    expect(store.insert).toHaveBeenCalledWith(value);
    store.insert.mockResolvedValue({ success: true, duplicate: true });
    expect(await (await request("/events", value)).json()).toEqual({ success: true, duplicate: true });
  });

  it("returns sanitized storage failures without claiming successful collection", async () => {
    const log = vi.fn();
    const { request, store } = await start({ onError: log });
    store.insert.mockRejectedValue(new Error("postgresql://private-credential internal query"));
    const response = await request("/events", event());
    expect(response.status).toBe(503);
    expect(JSON.stringify(await response.json())).not.toContain("private-credential");
    expect(log).toHaveBeenCalledWith("analytics_operation_failed");
  });

  it("refuses old envelopes, raw text and excessive body sizes", async () => {
    const { request, store } = await start();
    expect((await request("/events", { ...event(), visitor_id: "bad" })).status).toBe(400);
    expect((await request("/events", { ...event(), event_data: { ...event().event_data, query: "private text" } })).status).toBe(400);
    expect((await request("/events", { ...event(), oversized: "a".repeat(18_000) })).status).toBe(413);
    expect(store.insert).not.toHaveBeenCalled();
  });

  it("keeps reports readable while capacity protection pauses ingestion", async () => {
    const blocked = { collectionHealth: { status: "blocked", databaseBytes: null, freeDiskBytes: null, checkedAt: new Date(now).toISOString(), reason: "health_unavailable" } };
    const { request, store } = await start({ capacity: async () => blocked });
    const failed = await request("/events", event());
    expect(failed.status).toBe(503);
    expect((await failed.json()).code).toBe("ANALYTICS_STORAGE_PRESSURE");
    expect(store.insert).not.toHaveBeenCalled();
    const window = { start: "2026-11-01T00:00:00.000Z", end: "2026-11-14T00:00:00.000Z" };
    const report = await request("/insights", window);
    expect(report.status).toBe(200);
    expect((await report.json()).collectionHealth).toEqual(blocked.collectionHealth);
    expect((await request("/prompt-copies", window)).status).toBe(200);
    expect((await request("/health")).status).toBe(200);
  });

  it("has no arbitrary SQL or unbounded report endpoints", async () => {
    const { request } = await start();
    expect((await request("/sql", { query: "select 1" })).status).toBe(404);
    expect((await request("/insights", { start: "2026-01-01", end: "2026-11-01" })).status).toBe(400);
    expect((await request("/insights", { start: "2026-11-01", end: "2026-11-02", sql: "x" })).status).toBe(400);
    expect((await request("/insights", { start: "2026-11-01", end: "2026-11-02" }, { "Content-Type": "text/plain" })).status).toBe(415);
  });
});

describe("capacity monitor", () => {
  it("coalesces probes and distinguishes warning, database cap and disk pressure", async () => {
    let size = 2 * 1024 ** 3;
    let free = 8 * 1024 ** 3;
    let time = now;
    const store = { health: vi.fn(async () => ({ databaseBytes: size, estimatedRows: 10 })) };
    const readDisk = vi.fn(async () => free);
    const monitor = createCapacityMonitor({ store, readDisk, clock: () => time });
    const reports = await Promise.all([monitor(), monitor()]);
    expect(reports[0].collectionHealth.status).toBe("warning");
    expect(store.health).toHaveBeenCalledTimes(1);
    expect(readDisk).toHaveBeenCalledTimes(1);
    size = 4 * 1024 ** 3;
    time += 10_001;
    expect((await monitor()).collectionHealth.reason).toBe("database_limit");
    expect((await monitor()).collectionHealth.status).toBe("blocked");
    free = 1024 ** 3;
    time += 10_001;
    expect((await monitor()).collectionHealth.reason).toBe("disk_pressure");
  });

  it("does not invent byte counts when a health probe fails", async () => {
    const monitor = createCapacityMonitor({ store: { health: async () => { throw new Error("offline"); } }, readDisk: async () => 42, clock: () => now });
    expect((await monitor()).collectionHealth).toEqual({ status: "blocked", databaseBytes: null, freeDiskBytes: 42, checkedAt: new Date(now).toISOString(), reason: "health_unavailable" });
  });
});

describe("event and SQL boundaries", () => {
  it("matches the browser event allowlist, including no authoritative payment events", async () => {
    const source = await readFile(new URL("../../lib/analytics/event-contract.ts", import.meta.url), "utf8");
    const list = source.match(/export const CLIENT_EVENT_NAMES = \[([\s\S]*?)\] as const/)?.[1];
    const expected = [...list.matchAll(/"([a-z_]+)"/g)].map((item) => item[1]);
    expect([...EVENT_TYPES].sort()).toEqual(["page_view", ...expected].sort());
  });

  it("preserves null identities and rejects drift, bots, malformed engagement and mismatched styles", () => {
    expect(validateEvent({ ...event(), visitor_id: null, session_id: null }, now)).toBe(true);
    expect(validateEvent({ ...event(), created_at: "2026-01-01" }, now)).toBe(false);
    expect(validateEvent({ ...event(), event_data: { ...event().event_data, deviceType: "bot" } }, now)).toBe(false);
    expect(validateEvent({ ...event(), event_type: "style_view", style_slug: "a", event_data: { ...event().event_data, slug: "b" } }, now)).toBe(false);
    expect(validateEvent({ ...event(), event_type: "style_engagement", style_slug: "a", event_data: { ...event().event_data, slug: "a", active_ms: 1e20, max_scroll_percent: 100 } }, now)).toBe(false);
    expect(validateWindow({ start: "bad", end: "2026-01-01" })).toBe(false);
  });

  it("uses fixed parameterized SQL and ignores duplicate event insert counts", async () => {
    const pool = { query: vi.fn().mockResolvedValue({ rows: [] }) };
    const store = createPostgresStore(pool);
    const value = event();
    value.event_data.utm_campaign = "' OR 1=1; --";
    expect(await store.insert(value)).toEqual({ success: true, duplicate: true });
    expect(pool.query.mock.calls[0][0]).not.toContain(value.event_data.utm_campaign);
    expect(pool.query.mock.calls[0][1][4]).toContain(value.event_data.utm_campaign);
    expect(pool.query.mock.calls[0][0]).toContain("on conflict (event_id) do nothing returning event_id");
  });
});
