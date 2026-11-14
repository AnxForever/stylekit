import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { extractFunction, loadSchema } from "./schema.mjs";

const requireDependency = createRequire(path.join(path.resolve(process.argv[2] ?? process.cwd()), "package.json"));
const { PGlite } = await import(pathToFileURL(requireDependency.resolve("@electric-sql/pglite")).href);
const db = new PGlite();
const checks = [];
const baseData = { measurementVersion: 2, environment: "production", deviceType: "desktop" };
const visitor = randomUUID();
const session = randomUUID();
const eventId = randomUUID();
const now = new Date();
const start = new Date(now.getTime() - 86_400_000).toISOString();
const end = new Date(now.getTime() + 86_400_000).toISOString();

async function insert(type = "page_view", options = {}) {
  return db.query(`insert into public.analytics_events
    (event_id, visitor_id, session_id, event_type, event_data, style_slug, created_at)
    values ($1, $2, $3, $4, $5::jsonb, $6, $7::timestamptz)
    on conflict(event_id) do nothing returning event_id`, [
    options.eventId ?? randomUUID(), options.visitor ?? visitor, session,
    type, JSON.stringify({ ...baseData, ...options.data }), options.slug ?? null,
    options.at ?? now.toISOString(),
  ]);
}

try {
  assert.throws(() => extractFunction("select 1;", "public.missing"), /Expected one/);
  await db.exec("create role stylekit_analytics_runtime; create role unrelated_role;");
  const productionSchema = await loadSchema();
  const databaseGuard = "current_database() <> 'stylekit_analytics'";
  assert.equal(productionSchema.split(databaseGuard).length, 2);
  await assert.rejects(db.exec(productionSchema), /Bootstrap requires the dedicated stylekit_analytics database/);
  await db.exec("rollback;");
  // PGlite fixes its current database name to postgres. Only this executable
  // fixture adjusts the guard; the production generator has no override.
  const schema = productionSchema.replace(databaseGuard, "current_database() <> 'postgres'");
  checks.push("production bootstrap rejects any database other than stylekit_analytics before mutation");
  assert.ok(!schema.includes("to service_role"));
  assert.ok(!schema.includes("from public, anon"));
  await db.exec(schema);
  await db.exec(schema);
  checks.push("generated bootstrap applies twice without Supabase roles or tables");

  await db.exec("set role stylekit_analytics_runtime;");
  const first = await insert("page_view", { eventId });
  const replay = await insert("page_view", { eventId });
  assert.equal(first.rows.length, 1);
  assert.equal(replay.rows.length, 0);
  checks.push("runtime can insert and idempotently replay a UUID using only column privileges");

  for (const query of [
    "select * from public.analytics_events",
    "select event_data from public.analytics_events",
    "update public.analytics_events set visitor_id = 'tamper'",
    "delete from public.analytics_events",
    "select private.cleanup_analytics_events()",
    "create table public.tamper(id int)",
  ]) await assert.rejects(db.query(query), /permission denied/);
  checks.push("runtime cannot read raw rows, mutate records, run retention or create objects");

  await insert("style_view", { slug: "neo-brutalist" });
  await insert("prompt_copy", { slug: "neo-brutalist", data: { prompt_type: "hard" } });
  const report = (await db.query("select public.admin_analytics_style_insights($1::timestamptz,$2::timestamptz) as data", [start, end])).rows[0].data;
  assert.deepEqual(report.traffic, { pageViews: 1, visitors: 1, visits: 1, unidentifiedPageViews: 0 });
  assert.equal(report.retentionDays, 90);
  assert.equal(report.styles[0].matchedUseVisitors, 1);
  const copies = (await db.query("select public.admin_analytics_prompt_copies($1::timestamptz,$2::timestamptz) as data", [start, end])).rows[0].data;
  assert.equal(copies.totalCopies, 1);
  assert.equal(copies.styles[0].hard, 1);
  const health = (await db.query("select public.analytics_storage_health() as data")).rows[0].data;
  assert.ok(health.databaseBytes > 0);
  assert.equal(health.oldestEventAt, health.newestEventAt);
  checks.push("runtime reports and health use owner functions with unchanged report contracts");

  await assert.rejects(insert("page_view", { data: { measurementVersion: 1 } }), /check constraint/);
  await assert.rejects(insert("page_view", { data: { environment: "preview" } }), /check constraint/);
  await assert.rejects(insert("page_view", { data: { measurementVersion: undefined } }), /check constraint/);
  checks.push("database rejects legacy and nonproduction events");

  await db.exec("reset role; set role unrelated_role;");
  for (const query of [
    "select public.analytics_storage_health()",
    `select public.admin_analytics_style_insights('${start}','${end}')`,
    `select public.admin_analytics_prompt_copies('${start}','${end}')`,
  ]) await assert.rejects(db.query(query), /permission denied/);
  checks.push("unrelated roles cannot call reports or health");

  await db.exec("reset role;");
  const retained = randomUUID();
  const expired = randomUUID();
  await insert("page_view", { eventId: retained, at: new Date(now.getTime() - 89 * 86_400_000).toISOString() });
  await insert("page_view", { eventId: expired, at: new Date(now.getTime() - 91 * 86_400_000).toISOString() });
  assert.equal((await db.query("select private.cleanup_analytics_events(interval '1 day', 50000) as deleted")).rows[0].deleted, 1);
  assert.equal((await db.query("select event_id from public.analytics_events where event_id=$1", [retained])).rows.length, 1);
  assert.equal((await db.query("select event_id from public.analytics_events where event_id=$1", [expired])).rows.length, 0);
  checks.push("owner retention preserves 89-day v2 data even with a shorter requested policy");

  process.stdout.write(JSON.stringify({ status: "passed", count: checks.length, checks }, null, 2) + "\n");
} finally {
  await db.close();
}
