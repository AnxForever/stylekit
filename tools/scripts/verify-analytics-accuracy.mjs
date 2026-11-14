/**
 * Execute the analytics migration against an isolated, in-memory PostgreSQL.
 * Supply a directory with @electric-sql/pglite installed to avoid adding a
 * production dependency: node tools/scripts/verify-analytics-accuracy.mjs <dir>
 */
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const dependencyRoot = path.resolve(process.argv[2] ?? projectRoot);
const requireDependency = createRequire(path.join(dependencyRoot, "package.json"));
const { PGlite } = await import(pathToFileURL(requireDependency.resolve("@electric-sql/pglite")).href);
const db = new PGlite();
const checks = [];
const migrationPath = path.join(projectRoot, "lib/supabase/migrations/044_analytics_accuracy.sql");
const start = "2026-11-01T00:00:00.000Z";
const end = "2026-11-04T00:00:00.000Z";
const baseData = { measurementVersion: 2, environment: "production", deviceType: "desktop" };

async function event(type, options = {}) {
  const data = { ...baseData, ...options.data };
  await db.query(`
    insert into public.analytics_events
      (event_type, event_data, style_slug, session_id, visitor_id, event_id, created_at)
    values ($1, $2::jsonb, $3, $4, $5, $6::uuid, $7::timestamptz)
    on conflict (event_id) do nothing
  `, [type, JSON.stringify(data), options.slug ?? null, options.session ?? null,
    options.visitor ?? null, options.eventId ?? randomUUID(), options.at ?? "2026-11-02T10:00:00.000Z"]);
}

async function report() {
  const result = await db.query("select public.admin_analytics_style_insights($1::timestamptz, $2::timestamptz) as report", [start, end]);
  return result.rows[0].report;
}

try {
  await db.exec(`
    create role anon;
    create role authenticated;
    create role service_role;
    create schema private;
    create table public.analytics_events (
      id uuid primary key default gen_random_uuid(),
      event_type text not null,
      event_data jsonb not null default '{}',
      style_slug text,
      session_id text,
      created_at timestamptz not null default now()
    );
  `);
  const migration = await readFile(migrationPath, "utf8");
  await db.exec(migration);
  await db.exec(migration);
  checks.push("migration executes and can be applied twice");

  const empty = await report();
  assert.deepEqual(empty.traffic, { pageViews: 0, visitors: 0, visits: 0, unidentifiedPageViews: 0 });
  assert.deepEqual(empty.styles, []);
  assert.deepEqual(empty.sources, []);
  assert.equal(empty.firstCollectedAt, null);
  checks.push("empty dataset is a valid empty report");

  const repeatedEventId = randomUUID();
  await event("page_view", { eventId: repeatedEventId, visitor: "visitor-a", session: "session-a", at: "2026-11-01T12:00:00Z" });
  await event("page_view", { eventId: repeatedEventId, visitor: "visitor-a", session: "session-a", at: "2026-11-01T12:00:00Z" });
  await event("page_view", { visitor: "visitor-a", session: "session-b", at: "2026-11-03T12:00:00Z" });
  await event("page_view", { session: "unidentified-session" });
  await event("page_view", { visitor: "bot", session: "bot", data: { deviceType: "bot" } });
  await event("page_view", { visitor: "preview", session: "preview", data: { environment: "preview" } });
  await event("page_view", { visitor: "legacy", session: "legacy", data: { measurementVersion: 1 } });
  // Events outside the requested half-open interval must not influence UV.
  await event("page_view", { visitor: "boundary", session: "boundary", at: end });
  assert.deepEqual((await report()).traffic, { pageViews: 3, visitors: 1, visits: 3, unidentifiedPageViews: 1 });
  checks.push("event UUID replay is idempotent; cross-session and cross-day browser UV deduplicates");
  checks.push("null identity, legacy, bots, preview and half-open range boundaries remain distinct");

  const slug = "neo-brutalist";
  const visitor = "visitor-a";
  await event("catalog_impression", { slug, visitor, at: "2026-11-02T10:00:00Z", data: { surface: "styles_catalog", rank: 1 } });
  await event("catalog_impression", { slug, visitor, at: "2026-11-02T10:01:00Z", data: { surface: "styles_catalog", rank: 3 } });
  await event("catalog_click", { slug, visitor, at: "2026-11-02T10:02:00Z", data: { surface: "styles_catalog", rank: 3 } });
  await event("style_view", { slug, visitor, at: "2026-11-02T10:03:00Z" });
  await event("showcase_view", { slug, visitor, at: "2026-11-02T10:04:00Z" });
  await event("prompt_copy", { slug, visitor, at: "2026-11-02T10:05:00Z", data: { prompt_type: "hard" } });
  await event("prompt_copy", { slug, visitor, at: "2026-11-02T10:06:00Z", data: { prompt_type: "project-brief" } });
  await event("project_brief_copy", { slug, visitor, at: "2026-11-02T10:06:00Z" });
  await event("style_export", { slug, visitor, at: "2026-11-02T10:07:00Z" });
  await event("style_favorite", { slug, visitor, data: { action: "add", storage: "local" } });
  await event("style_favorite", { slug, visitor, data: { action: "remove", storage: "local" } });
  await event("style_favorite", { slug, visitor, data: { action: "add", storage: "account" } });
  await event("style_engagement", { slug, visitor, data: { active_ms: 6000, max_scroll_percent: 25 } });
  await event("style_engagement", { slug, visitor, data: { active_ms: 5000, max_scroll_percent: 75 } });
  await event("style_engagement", { slug, visitor, data: { active_ms: "invalid", max_scroll_percent: "invalid" } });
  await event("style_view", { slug });

  // A separate browser clicks/copies before it sees this style. Those actions
  // are counted, but they do not qualify for an ordered matched conversion.
  await event("catalog_click", { slug, visitor: "reverse", at: "2026-11-02T09:00:00Z", data: { surface: "styles_catalog", rank: 2 } });
  await event("code_copy", { slug, visitor: "reverse", at: "2026-11-02T09:01:00Z" });
  await event("catalog_impression", { slug, visitor: "reverse", at: "2026-11-02T11:00:00Z", data: { surface: "styles_catalog", rank: 2 } });
  await event("style_view", { slug, visitor: "reverse", at: "2026-11-02T11:01:00Z" });
  const data = await report();
  const row = data.styles.find((item) => item.slug === slug);
  assert.equal(row.impressions, 3);
  assert.equal(row.exposedVisitors, 2);
  assert.equal(row.clicks, 2);
  assert.equal(row.clickVisitors, 2);
  assert.equal(row.detailViews, 3);
  assert.equal(row.detailVisitors, 2);
  assert.equal(row.showcaseViews, 1);
  assert.equal(row.showcaseVisitors, 1);
  assert.equal(row.viewVisitors, 2);
  assert.equal(row.copies, 3);
  assert.equal(row.copyVisitors, 2);
  assert.equal(row.exports, 1);
  assert.equal(row.exportVisitors, 1);
  assert.equal(row.favoriteAdds, 2);
  assert.equal(row.favoriteRemoves, 1);
  assert.equal(row.favoriteVisitors, 1);
  assert.equal(row.accountFavoriteAdds, 1);
  assert.equal(row.localFavoriteAdds, 1);
  assert.equal(row.matchedClickVisitors, 1);
  assert.equal(row.matchedUseVisitors, 1);
  assert.equal(row.activeMs, 11000);
  assert.equal(row.engagedVisitors, 1);
  assert.equal(row.maxScrollPercent, 75);
  assert.equal(row.unidentifiedEvents, 1);
  assert.equal(data.sources[0].averageRank, 2);
  checks.push("style stage counts, union visitor denominator and ordered funnel conversions");
  checks.push("project brief duplicate event vocabulary counts one successful copy");
  checks.push("favorite add/remove activity and storage remain distinct from current saved inventory");
  checks.push("engagement sums deltas, malformed fields do not break aggregation, rank averages remain correct");

  await db.exec("set role anon");
  await assert.rejects(report(), /permission denied/);
  await db.exec("reset role; set role authenticated");
  await assert.rejects(report(), /permission denied/);
  await db.exec("reset role; set role service_role");
  assert.equal((await report()).version, 2);
  await db.exec("reset role");
  checks.push("only service_role can execute the security-definer report");

  await assert.rejects(db.query("select public.admin_analytics_style_insights($1::timestamptz, $2::timestamptz)", [end, start]), /window must be positive/);
  await assert.rejects(db.query("select public.admin_analytics_style_insights($1::timestamptz, $2::timestamptz)", ["2026-01-01", end]), /at most 90 days/);
  checks.push("invalid and oversized windows are rejected");

  if (!migration.includes("cleanup_analytics_events")) {
    throw new Error("Retention replacement not yet present in migration; rerun after parent finishes it.");
  }
  await db.exec("truncate public.analytics_events");
  await db.exec(`
    insert into public.analytics_events(event_type, event_data, created_at) values
      ('page_view', '{"measurementVersion":2}', now() - interval '8 days'),
      ('page_view', '{"measurementVersion":2}', now() - interval '89 days'),
      ('page_view', '{"measurementVersion":2}', now() - interval '91 days'),
      ('page_view', '{}', now() - interval '8 days'),
      ('page_view', '{}', now() - interval '6 days');
  `);
  const deleted = await db.query("select private.cleanup_analytics_events() as deleted");
  assert.equal(deleted.rows[0].deleted, 2);
  const retained = await db.query("select count(*)::int as count from public.analytics_events");
  assert.equal(retained.rows[0].count, 3);
  checks.push("retention keeps v2 for 90 days while retaining the legacy 7-day default");

  await assert.rejects(db.query("select private.cleanup_analytics_events(null, 10)"), /retention must be positive/);
  await assert.rejects(db.query("select private.cleanup_analytics_events(interval '7 days', 50001)"), /batch size/);
  await db.exec("truncate public.analytics_events");
  await db.exec(`
    insert into public.analytics_events(event_type, event_data, created_at) values
      ('page_view', '{"measurementVersion":2}', now() - interval '89 days'),
      ('page_view', '{"measurementVersion":2}', now() - interval '91 days'),
      ('page_view', '{"measurementVersion":2}', now() - interval '121 days'),
      ('page_view', '{}', now() - interval '121 days');
  `);
  // Explicit longer retention is respected; a shorter parameter may not
  // silently erase v2 history inside the dashboard's 90-day window.
  const longerRetention = await db.query("select private.cleanup_analytics_events(interval '120 days', 1) as deleted");
  assert.equal(longerRetention.rows[0].deleted, 1);
  assert.equal((await db.query("select count(*)::int as count from public.analytics_events")).rows[0].count, 3);
  const shorterRetention = await db.query("select private.cleanup_analytics_events(interval '1 day') as deleted");
  assert.equal(shorterRetention.rows[0].deleted, 2);
  assert.equal((await db.query("select count(*)::int as count from public.analytics_events")).rows[0].count, 1);
  await db.exec("set role service_role");
  await assert.rejects(db.query("select private.cleanup_analytics_events()"), /permission denied/);
  await db.exec("reset role");
  checks.push("retention validates parameters, honors bounded batches and longer policy, prevents short-policy loss and denies application cleanup");

  process.stdout.write(`${JSON.stringify({ status: "passed", checks, count: checks.length }, null, 2)}\n`);
} finally {
  await db.close();
}
