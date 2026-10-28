import { createRequire } from "node:module";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  ANALYTICS_POLICY_VERSION,
  ANALYTICS_TIMEZONE,
  buildExclusionReasonSql,
} from "./traffic-policy.mjs";

export const RANGE_CONFIG = {
  "24h": { hours: 24, bucket: "hour" },
  "7d": { hours: 24 * 7, bucket: "day" },
  "30d": { hours: 24 * 30, bucket: "day" },
  "90d": { hours: 24 * 90, bucket: "day" },
};

export const HISTORY_CUTOFF = "2026-08-16T02:00:00+08:00";
export const REPORTED_IMPORTED_EVENTS = 232380;

const PG_PACKAGE_MANIFEST = "/www/umami/import/package.json";
const MAX_BREAKDOWN_ROWS = 50;
const STATEMENT_TIMEOUT_MS = 120000;

function quoteSqlIdentifier(identifier) {
  if (!/^[a-z][a-z0-9_]*$/.test(identifier)) {
    throw new Error("Invalid SQL identifier");
  }
  return `"${identifier}"`;
}

const exclusionReasonSql = buildExclusionReasonSql("we", "s");

export const SNAPSHOT_AGGREGATE_SQL = `
WITH clock AS (
  SELECT transaction_timestamp() AS generated_at
), range_config(range_name, hours, grain) AS (
  VALUES
    ('24h'::text, 24::int, 'hour'::text),
    ('7d'::text, 168::int, 'day'::text),
    ('30d'::text, 720::int, 'day'::text),
    ('90d'::text, 2160::int, 'day'::text)
), windows AS (
  SELECT
    r.range_name,
    'current'::text AS period,
    r.hours,
    r.grain,
    c.generated_at - (r.hours * interval '1 hour') AS start_at,
    c.generated_at AS end_at,
    c.generated_at
  FROM range_config r CROSS JOIN clock c
  UNION ALL
  SELECT
    r.range_name,
    'previous'::text AS period,
    r.hours,
    r.grain,
    c.generated_at - (r.hours * 2 * interval '1 hour') AS start_at,
    c.generated_at - (r.hours * interval '1 hour') AS end_at,
    c.generated_at
  FROM range_config r CROSS JOIN clock c
), raw_events AS MATERIALIZED (
  SELECT
    we.event_id,
    we.created_at,
    we.session_id,
    we.visit_id,
    we.hostname,
    we.url_path,
    we.url_query,
    we.referrer_path,
    we.utm_source,
    we.utm_medium,
    we.utm_campaign,
    we.tag,
    s.country,
    s.browser,
    s.os,
    s.device,
    ${exclusionReasonSql} AS exclusion_reason
  FROM website_event we
  LEFT JOIN ${quoteSqlIdentifier("session")} s ON s.session_id = we.session_id
  WHERE we.website_id = $1
    AND we.event_name IS NULL
    AND we.created_at >= (SELECT min(start_at) FROM windows)
    AND we.created_at < (SELECT generated_at FROM clock)
), windowed AS MATERIALIZED (
  SELECT
    w.range_name,
    w.period,
    w.hours,
    w.grain,
    w.start_at,
    w.end_at,
    w.generated_at,
    e.*,
    CASE
      WHEN w.grain = 'hour' THEN floor(extract(epoch FROM (
        date_trunc('hour', e.created_at AT TIME ZONE '${ANALYTICS_TIMEZONE}') -
        date_trunc('hour', w.start_at AT TIME ZONE '${ANALYTICS_TIMEZONE}')
      )) / 3600)::int
      ELSE ((e.created_at AT TIME ZONE '${ANALYTICS_TIMEZONE}')::date -
        (w.start_at AT TIME ZONE '${ANALYTICS_TIMEZONE}')::date)::int
    END AS bucket_index
  FROM raw_events e
  JOIN windows w ON e.created_at >= w.start_at AND e.created_at < w.end_at
), totals AS (
  SELECT
    w.range_name,
    w.period,
    w.hours,
    w.grain,
    w.start_at,
    w.end_at,
    w.generated_at,
    count(e.event_id)::bigint AS raw_page_views,
    count(e.event_id) FILTER (WHERE e.exclusion_reason IS NULL)::bigint AS page_views,
    count(DISTINCT e.session_id) FILTER (WHERE e.exclusion_reason IS NULL)::bigint AS visitors,
    count(DISTINCT e.visit_id) FILTER (WHERE e.exclusion_reason IS NULL)::bigint AS visits,
    count(e.event_id) FILTER (WHERE e.exclusion_reason = 'internal')::bigint AS internal_page_views,
    count(e.event_id) FILTER (WHERE e.exclusion_reason = 'automation')::bigint AS automation_page_views,
    count(e.event_id) FILTER (WHERE e.exclusion_reason = 'non_production')::bigint AS non_production_page_views
  FROM windows w
  LEFT JOIN windowed e ON e.range_name = w.range_name AND e.period = w.period
  GROUP BY w.range_name, w.period, w.hours, w.grain, w.start_at, w.end_at, w.generated_at
), series AS (
  SELECT
    range_name,
    period,
    bucket_index,
    count(event_id) FILTER (WHERE exclusion_reason IS NULL)::bigint AS page_views,
    count(DISTINCT session_id) FILTER (WHERE exclusion_reason IS NULL)::bigint AS visitors
  FROM windowed
  GROUP BY range_name, period, bucket_index
), dimension_values AS (
  SELECT
    e.range_name,
    d.dimension,
    d.value,
    e.session_id
  FROM windowed e
  CROSS JOIN LATERAL (
    VALUES
      ('path'::text, coalesce(nullif(trim(e.url_path), ''), '(unknown)')),
      ('referrer'::text, coalesce(nullif(trim(e.referrer_path), ''), '(direct)')),
      ('country'::text, coalesce(nullif(trim(e.country), ''), '(unknown)')),
      ('browser'::text, coalesce(nullif(trim(e.browser), ''), '(unknown)')),
      ('os'::text, coalesce(nullif(trim(e.os), ''), '(unknown)')),
      ('device'::text, coalesce(nullif(trim(e.device), ''), '(unknown)')),
      ('hostname'::text, regexp_replace(lower(trim(coalesce(e.hostname, ''))), ':[0-9]+$', '')),
      ('utm_source'::text, coalesce(nullif(trim(e.utm_source), ''), '(none)')),
      ('utm_medium'::text, coalesce(nullif(trim(e.utm_medium), ''), '(none)')),
      ('utm_campaign'::text, coalesce(nullif(trim(e.utm_campaign), ''), '(none)'))
  ) AS d(dimension, value)
  WHERE e.period = 'current' AND e.exclusion_reason IS NULL
), breakdown_counts AS (
  SELECT
    range_name,
    dimension,
    value,
    count(*)::bigint AS page_views,
    count(DISTINCT session_id)::bigint AS visitors
  FROM dimension_values
  GROUP BY range_name, dimension, value
), ranked_breakdowns AS (
  SELECT
    *,
    row_number() OVER (
      PARTITION BY range_name, dimension
      ORDER BY page_views DESC, value ASC
    ) AS row_number
  FROM breakdown_counts
), top_breakdowns AS (
  SELECT
    range_name,
    dimension,
    value,
    page_views,
    visitors,
    row_number
  FROM ranked_breakdowns
  WHERE row_number <= ${MAX_BREAKDOWN_ROWS}
), limited_breakdowns AS (
  SELECT
    range_name,
    dimension,
    value,
    page_views,
    visitors,
    round(page_views::numeric * 100 / nullif(sum(page_views) OVER (
      PARTITION BY range_name, dimension
    ), 0), 2)::float8 AS share
  FROM top_breakdowns
)
SELECT
  'total'::text AS kind,
  range_name,
  period,
  NULL::int AS bucket_index,
  NULL::text AS dimension,
  NULL::text AS value,
  raw_page_views,
  page_views,
  visitors,
  visits,
  internal_page_views,
  automation_page_views,
  non_production_page_views,
  NULL::float8 AS share,
  start_at,
  end_at,
  hours,
  grain,
  generated_at
FROM totals
UNION ALL
SELECT
  'series'::text,
  range_name,
  period,
  bucket_index,
  NULL::text,
  NULL::text,
  NULL::bigint,
  page_views,
  visitors,
  NULL::bigint,
  NULL::bigint,
  NULL::bigint,
  NULL::bigint,
  NULL::float8,
  NULL::timestamptz,
  NULL::timestamptz,
  NULL::int,
  NULL::text,
  (SELECT generated_at FROM clock)
FROM series
UNION ALL
SELECT
  'breakdown'::text,
  range_name,
  'current'::text,
  NULL::int,
  dimension,
  value,
  NULL::bigint,
  page_views,
  visitors,
  NULL::bigint,
  NULL::bigint,
  NULL::bigint,
  NULL::bigint,
  share,
  NULL::timestamptz,
  NULL::timestamptz,
  NULL::int,
  NULL::text,
  (SELECT generated_at FROM clock)
FROM limited_breakdowns
ORDER BY kind, range_name, period, bucket_index NULLS FIRST, dimension, value
`;

export const SOURCE_INSIGHTS_SQL = {
  totals: `SELECT
      count(*) FILTER (WHERE event_name IS NULL)::int AS pv,
      count(*) FILTER (WHERE event_name IS NOT NULL)::int AS events,
      count(DISTINCT session_id)::int AS sessions
    FROM website_event
    WHERE website_id = $1 AND created_at > transaction_timestamp() - interval '30 days'`,
  topStyles: `SELECT ed.string_value AS slug, count(*)::int AS views
    FROM event_data ed
    JOIN website_event we ON ed.website_event_id = we.event_id
    WHERE we.website_id = $1 AND we.event_name = 'style_view'
      AND ed.data_key = 'slug' AND ed.string_value IS NOT NULL
      AND we.created_at > transaction_timestamp() - interval '30 days'
    GROUP BY 1 ORDER BY 2 DESC LIMIT 30`,
  topExports: `SELECT ed.string_value AS slug, count(*)::int AS exports
    FROM event_data ed
    JOIN website_event we ON ed.website_event_id = we.event_id
    WHERE we.website_id = $1 AND we.event_name = 'style_export'
      AND ed.data_key = 'slug' AND ed.string_value IS NOT NULL
      AND we.created_at > transaction_timestamp() - interval '30 days'
    GROUP BY 1 ORDER BY 2 DESC LIMIT 20`,
  dailyPv: `SELECT to_char(created_at AT TIME ZONE '${ANALYTICS_TIMEZONE}', 'YYYY-MM-DD') AS day,
      count(*)::int AS pv
    FROM website_event
    WHERE website_id = $1 AND event_name IS NULL
      AND created_at > transaction_timestamp() - interval '7 days'
    GROUP BY 1 ORDER BY 1`,
};

function toNumber(value) {
  if (value == null) return 0;
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function dateValue(value) {
  return value instanceof Date ? value : new Date(value);
}

function toIso(value) {
  return dateValue(value).toISOString();
}

function localWallClockMs(value) {
  const date = dateValue(value);
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: ANALYTICS_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  return Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"));
}

function formatWallClock(value, grain) {
  const date = new Date(value);
  const year = String(date.getUTCFullYear()).padStart(4, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  if (grain === "hour") {
    const hour = String(date.getUTCHours()).padStart(2, "0");
    return `${year}-${month}-${day}T${hour}:00`;
  }
  return `${year}-${month}-${day}`;
}

export function makeBucketLabels(start, end, grain) {
  const bucketMs = grain === "hour" ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  const firstBucket = Math.floor(localWallClockMs(start) / bucketMs) * bucketMs;
  const lastBucket = Math.floor(localWallClockMs(dateValue(end).getTime() - 1) / bucketMs) * bucketMs;
  const labels = [];
  for (let wallClock = firstBucket; wallClock <= lastBucket; wallClock += bucketMs) {
    labels.push(formatWallClock(wallClock, grain));
  }
  return labels;
}

function historyStatus(start, end) {
  const cutoff = Date.parse(HISTORY_CUTOFF);
  const startMs = dateValue(start).getTime();
  const endMs = dateValue(end).getTime();
  if (startMs < cutoff && endMs > cutoff) return "mixed_legacy";
  if (endMs <= cutoff) return "unverified";
  return "outside_window";
}

export function buildMeasurement({ start, end, rawPageViews, exclusions }) {
  const normalizedExclusions = ["internal", "automation", "non_production"].map((reason) => ({
    reason,
    pageViews: toNumber(exclusions?.[reason]),
  }));
  return {
    source: "umami_snapshot",
    visitorMetric: "anonymous_identifiers",
    freshness: "current",
    fallback: false,
    filtering: "applied",
    policyVersion: ANALYTICS_POLICY_VERSION,
    rawPageViews: toNumber(rawPageViews),
    excludedPageViews: normalizedExclusions.reduce((sum, exclusion) => sum + exclusion.pageViews, 0),
    exclusions: normalizedExclusions,
    history: {
      status: historyStatus(start, end),
      cutoff: HISTORY_CUTOFF,
      reportedImportedEvents: REPORTED_IMPORTED_EVENTS,
    },
  };
}

function ratio(numerator, denominator) {
  return denominator > 0 ? numerator / denominator : null;
}

function totalsForOverview(row) {
  const rawPageViews = toNumber(row.raw_page_views);
  const exclusions = {
    internal: toNumber(row.internal_page_views),
    automation: toNumber(row.automation_page_views),
    non_production: toNumber(row.non_production_page_views),
  };
  const pageViews = toNumber(row.page_views);
  const visitors = toNumber(row.visitors);
  const visits = toNumber(row.visits);
  return {
    pageViews,
    visitors,
    visits,
    engagedVisits: 0,
    bouncedVisits: 0,
    bounceRate: null,
    viewsPerVisit: ratio(pageViews, visits),
    measurement: buildMeasurement({
      start: row.start_at,
      end: row.end_at,
      rawPageViews,
      exclusions,
    }),
  };
}

function buildOverview(range, totalRows, seriesRows, generatedAt) {
  const currentRow = totalRows.find((row) => row.period === "current");
  const previousRow = totalRows.find((row) => row.period === "previous");
  if (!currentRow || !previousRow) {
    throw new Error(`Missing current or previous totals for ${range}`);
  }

  const current = totalsForOverview(currentRow);
  const previous = totalsForOverview(previousRow);
  const seriesByPeriod = new Map();
  for (const row of seriesRows) {
    const map = seriesByPeriod.get(row.period) ?? new Map();
    map.set(toNumber(row.bucket_index), row);
    seriesByPeriod.set(row.period, map);
  }
  const currentSeries = seriesByPeriod.get("current") ?? new Map();
  const previousSeries = seriesByPeriod.get("previous") ?? new Map();
  const labels = makeBucketLabels(currentRow.start_at, currentRow.end_at, currentRow.grain);

  return {
    range: {
      start: toIso(currentRow.start_at),
      end: toIso(currentRow.end_at),
      timezone: ANALYTICS_TIMEZONE,
    },
    current: {
      pageViews: current.pageViews,
      visitors: current.visitors,
      visits: current.visits,
      engagedVisits: 0,
      bouncedVisits: 0,
      bounceRate: null,
      viewsPerVisit: current.viewsPerVisit,
    },
    previous: {
      pageViews: previous.pageViews,
      visitors: previous.visitors,
      visits: previous.visits,
      bounceRate: null,
      viewsPerVisit: previous.viewsPerVisit,
    },
    series: labels.map((bucket, bucketIndex) => ({
      bucket,
      pageViews: toNumber(currentSeries.get(bucketIndex)?.page_views),
      visitors: toNumber(currentSeries.get(bucketIndex)?.visitors),
      // Relative bucket indices align comparison values even when either
      // interval contains an empty calendar bucket.
      previousPageViews: toNumber(previousSeries.get(bucketIndex)?.page_views),
    })),
    quality: {
      status: "partial",
      anonymousPageViews: 0,
      countryCoveragePct: null,
      generatedAt,
    },
    measurement: current.measurement,
  };
}

function createEmptyBreakdowns() {
  return {
    path: [],
    referrer: [],
    country: [],
    browser: [],
    os: [],
    device: [],
    hostname: [],
    utm_source: [],
    utm_medium: [],
    utm_campaign: [],
  };
}

export function buildSnapshotFromRows(rows, insights, generatedAt) {
  const totalsByRange = new Map();
  const seriesByRange = new Map();
  const breakdowns = Object.fromEntries(Object.keys(RANGE_CONFIG).map((range) => [range, createEmptyBreakdowns()]));

  for (const row of rows) {
    if (row.kind === "total") {
      const list = totalsByRange.get(row.range_name) ?? [];
      list.push(row);
      totalsByRange.set(row.range_name, list);
    } else if (row.kind === "series") {
      const list = seriesByRange.get(row.range_name) ?? [];
      list.push(row);
      seriesByRange.set(row.range_name, list);
    } else if (row.kind === "breakdown" && breakdowns[row.range_name]?.[row.dimension]) {
      breakdowns[row.range_name][row.dimension].push({
        value: row.value,
        page_views: toNumber(row.page_views),
        visitors: toNumber(row.visitors),
        share: toNumber(row.share),
      });
    }
  }

  const overview = Object.fromEntries(
    Object.keys(RANGE_CONFIG).map((range) => [
      range,
      buildOverview(
        range,
        totalsByRange.get(range) ?? [],
        seriesByRange.get(range) ?? [],
        generatedAt
      ),
    ])
  );

  return {
    generatedAt,
    windowDays: 30,
    totals: insights.totals,
    topStyles: insights.topStyles,
    topExports: insights.topExports,
    dailyPv: insights.dailyPv,
    overview,
    breakdowns,
  };
}

export function parseArguments(argv) {
  const args = { dryRun: false, outputPath: null };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--dry-run") {
      args.dryRun = true;
    } else if (value === "--output") {
      const outputPath = argv[index + 1];
      if (!outputPath || outputPath.startsWith("--") || !outputPath.trim()) {
        throw new Error("--output requires a path");
      }
      args.outputPath = outputPath;
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${value}`);
    }
  }
  return args;
}

export function readConfig(env = process.env, args = { dryRun: false, outputPath: null }) {
  const databaseUrl = String(env.DATABASE_URL ?? "").trim();
  const websiteId = String(env.WEBSITE_ID ?? "").trim();
  const outputPath = String(args.outputPath ?? env.OUTPUT_PATH ?? "").trim();

  if (!databaseUrl) throw new Error("DATABASE_URL is required");
  if (!websiteId) throw new Error("WEBSITE_ID is required");
  if (!args.dryRun && !outputPath) {
    throw new Error("Set OUTPUT_PATH or pass --output when not using --dry-run");
  }

  return {
    databaseUrl,
    websiteId,
    outputPath: outputPath ? resolve(outputPath) : null,
    dryRun: args.dryRun === true,
    pgPackageManifest: env.PG_PACKAGE_MANIFEST || PG_PACKAGE_MANIFEST,
    statementTimeoutMs: STATEMENT_TIMEOUT_MS,
  };
}

function loadPgClient(pgPackageManifest) {
  const require = createRequire(resolve(pgPackageManifest));
  const pg = require("pg");
  if (!pg?.Client) throw new Error("The configured pg package does not expose Client");
  return pg.Client;
}

async function readSourceInsights(client, websiteId) {
  const [totals, topStyles, topExports, dailyPv] = await Promise.all([
    client.query(SOURCE_INSIGHTS_SQL.totals, [websiteId]),
    client.query(SOURCE_INSIGHTS_SQL.topStyles, [websiteId]),
    client.query(SOURCE_INSIGHTS_SQL.topExports, [websiteId]),
    client.query(SOURCE_INSIGHTS_SQL.dailyPv, [websiteId]),
  ]);
  return {
    totals: totals.rows[0],
    topStyles: topStyles.rows,
    topExports: topExports.rows,
    dailyPv: dailyPv.rows,
  };
}

function dryRunSummary(snapshot) {
  return {
    dryRun: true,
    source: "umami_snapshot",
    generatedAt: snapshot.generatedAt,
    ranges: Object.fromEntries(
      Object.entries(snapshot.overview).map(([range, overview]) => [
        range,
        {
          rawPageViews: overview.measurement.rawPageViews,
          pageViews: overview.current.pageViews,
          visitors: overview.current.visitors,
          excludedPageViews: overview.measurement.excludedPageViews,
          exclusions: overview.measurement.exclusions,
        },
      ])
    ),
  };
}

async function writeSnapshot(outputPath, snapshot) {
  await mkdir(dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.${process.pid}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(snapshot)}\n`, { encoding: "utf8", mode: 0o600 });
  await rename(temporaryPath, outputPath);
}

async function generateSnapshot(config) {
  const Client = loadPgClient(config.pgPackageManifest);
  const client = new Client({ connectionString: config.databaseUrl });
  let inTransaction = false;

  try {
    await client.connect();
    await client.query("BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY");
    inTransaction = true;
    await client.query("SELECT set_config('statement_timeout', $1, true)", [
      `${config.statementTimeoutMs}ms`,
    ]);
    const aggregate = await client.query(SNAPSHOT_AGGREGATE_SQL, [config.websiteId]);
    const generatedAt = toIso(aggregate.rows.find((row) => row.kind === "total")?.generated_at ?? new Date());
    const insights = await readSourceInsights(client, config.websiteId);
    const snapshot = buildSnapshotFromRows(aggregate.rows, insights, generatedAt);
    await client.query("COMMIT");
    inTransaction = false;
    return snapshot;
  } catch (error) {
    if (inTransaction) {
      await client.query("ROLLBACK").catch(() => undefined);
    }
    throw error;
  } finally {
    await client.end().catch(() => undefined);
  }
}

export async function main(argv = process.argv.slice(2), env = process.env) {
  const args = parseArguments(argv);
  const config = readConfig(env, args);
  const snapshot = await generateSnapshot(config);

  if (config.dryRun) {
    process.stdout.write(`${JSON.stringify(dryRunSummary(snapshot), null, 2)}\n`);
    return;
  }

  await writeSnapshot(config.outputPath, snapshot);
  process.stdout.write(
    `UMAMI_SNAPSHOT_OK generatedAt=${snapshot.generatedAt} ranges=${Object.keys(snapshot.overview).length}\n`
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    const databaseUrl = String(process.env.DATABASE_URL ?? "");
    const message = String(error?.message ?? "Unknown error").split(databaseUrl).join("[DATABASE_URL]");
    process.stderr.write(`UMAMI_SNAPSHOT_FAIL ${message}\n`);
    process.exitCode = 1;
  });
}
