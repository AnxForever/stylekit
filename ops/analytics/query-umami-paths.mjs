#!/usr/bin/env node
/**
 * Pageview distribution for route decisions.
 *
 * The DESIGN.md pivot turns on one question per route: does it carry traffic?
 * The sitemap answers "is it indexed", this answers "is it used". Run it on the
 * Umami host, where the Postgres instance lives.
 *
 * Read-only: a single SELECT against website_event plus one against website.
 *
 * Usage, on the Umami host (117.72.199.116):
 *   node ops/analytics/query-umami-paths.mjs --days 90 --json /tmp/paths.json
 *
 * DATABASE_URL is read from /www/umami/.env when not set in the environment.
 * pg is resolved from /www/umami/import/node_modules, same as
 * generate-umami-snapshot.mjs, so this file needs no local install.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const APP_ENV_PATH = "/www/umami/.env";
const PG_PACKAGE_MANIFEST = "/www/umami/import/package.json";

function parseArgs(argv) {
  const args = { days: 90, limit: 2000, json: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--days") args.days = Number(argv[++i]);
    else if (argv[i] === "--limit") args.limit = Number(argv[++i]);
    else if (argv[i] === "--json") args.json = argv[++i];
  }
  return args;
}

function readEnvFile(path) {
  const env = {};
  let raw = "";
  try {
    raw = readFileSync(path, "utf8");
  } catch {
    return env;
  }
  for (const line of raw.split(/\r?\n/)) {
    const match = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
    if (match) env[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
  }
  return env;
}

function loadPgClient() {
  const require = createRequire(resolve(PG_PACKAGE_MANIFEST));
  const pg = require("pg");
  if (!pg?.Client) throw new Error("The configured pg package does not expose Client");
  return pg.Client;
}

const args = parseArgs(process.argv.slice(2));
const databaseUrl =
  String(process.env.DATABASE_URL ?? "").trim() || readEnvFile(APP_ENV_PATH).DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is required (environment or /www/umami/.env)");
  process.exit(1);
}

const Client = loadPgClient();
const client = new Client({ connectionString: databaseUrl });
await client.connect();

const websites = await client.query("select website_id, name, domain from website");

const paths = await client.query(
  `select url_path, count(*)::int as views
     from website_event
    where created_at >= now() - ($1 || ' days')::interval
      and event_type = 1
    group by url_path
    order by views desc
    limit $2`,
  [String(args.days), args.limit],
);

const totals = await client.query(
  `select count(*)::int as views, count(distinct url_path)::int as distinct_paths
     from website_event
    where created_at >= now() - ($1 || ' days')::interval
      and event_type = 1`,
  [String(args.days)],
);

await client.end();

const payload = {
  days: args.days,
  generatedAt: new Date().toISOString(),
  websites: websites.rows,
  totals: totals.rows[0],
  paths: paths.rows,
};

if (args.json) {
  writeFileSync(args.json, JSON.stringify(payload, null, 2), "utf8");
  console.log(`wrote ${args.json}`);
}

console.log(`window: ${args.days} days`);
console.log(`views: ${payload.totals.views}, distinct paths: ${payload.totals.distinct_paths}`);
for (const row of paths.rows.slice(0, 30)) {
  console.log(`${String(row.views).padStart(8)}  ${row.url_path}`);
}
