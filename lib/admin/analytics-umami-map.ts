/**
 * Map Umami Cloud responses onto the admin analytics contract.
 *
 * The admin surfaces were designed against the self-built RPCs, which exposed
 * one metric the hosted API does not return: session identifiers on pageviews.
 * Every other number has a direct Umami counterpart, so the mapping keeps the
 * UI unchanged and only labels the quality of what it received.
 */

import type {
  AnalyticsBreakdown,
  AnalyticsBreakdownDimension,
  AnalyticsOverview,
  getAnalyticsWindow,
} from "@/lib/admin/analytics-api-contract";
import { analyticsBreakdownSchema, analyticsOverviewSchema } from "@/lib/admin/analytics-api-contract";
import { UMAMI_TIMEZONE } from "@/lib/analytics/umami-constants";
import type {
  UmamiMetricDimension,
  UmamiMetricRow,
  UmamiPageviews,
  UmamiStats,
} from "@/lib/analytics/umami-api";
import { countsAreVisitors } from "./analytics-breakdown";
import { createAnalyticsMeasurement } from "./analytics-measurement";

export { countsAreVisitors, getBreakdownCount } from "./analytics-breakdown";

/** The time window an overview describes, matching getAnalyticsWindow's shape. */
type AnalyticsWindow = ReturnType<typeof getAnalyticsWindow>;

function ratio(numerator: number, denominator: number): number | null {
  if (denominator <= 0) return null;
  return numerator / denominator;
}

/**
 * Bounce rate as a percentage. The contract renders it with a `%` suffix, so
 * it is stored on a 0-100 scale rather than as a 0-1 fraction.
 */
function bounceRatePct(bounces: number, visits: number): number | null {
  const value = ratio(bounces, visits);
  return value == null ? null : value * 100;
}

/** Build a lookup from bucket timestamp to value for the comparison series. */
function toSeriesMap(points: Array<{ x: string; y: number }>): Map<string, number> {
  return new Map(points.map((point) => [point.x, point.y]));
}

export function mapUmamiOverview(
  stats: UmamiStats,
  pageviews: UmamiPageviews,
  window: AnalyticsWindow,
  now: Date = new Date()
): AnalyticsOverview {
  const durationMs = Date.parse(window.end) - Date.parse(window.start);
  // Compare the same relative bucket in the preceding period. Current and
  // previous timestamps are different; missing buckets must not shift indexes.
  const previousPageViews = new Map(
    (pageviews.comparison?.pageviews ?? []).map((point) => [
      Date.parse(point.x) + durationMs,
      point.y,
    ]),
  );
  // Session counts come from the same series as pageviews, so equal indices
  // already describe the same time bucket and no re-alignment is needed.
  const sessionsByBucket = toSeriesMap(pageviews.sessions);

  return analyticsOverviewSchema.parse({
    range: {
      start: window.start,
      end: window.end,
      timezone: UMAMI_TIMEZONE,
    },
    current: {
      pageViews: stats.pageviews,
      visitors: stats.visitors,
      visits: stats.visits,
      // Umami counts a bounce as a visit with a single pageview, so every
      // other visit is an engaged one.
      engagedVisits: Math.max(0, stats.visits - stats.bounces),
      bouncedVisits: stats.bounces,
      bounceRate: bounceRatePct(stats.bounces, stats.visits),
      viewsPerVisit: ratio(stats.pageviews, stats.visits),
    },
    previous: {
      pageViews: stats.comparison?.pageviews ?? 0,
      visitors: stats.comparison?.visitors ?? 0,
      visits: stats.comparison?.visits ?? 0,
      bounceRate: stats.comparison
        ? bounceRatePct(stats.comparison.bounces, stats.comparison.visits)
        : null,
      viewsPerVisit: stats.comparison
        ? ratio(stats.comparison.pageviews, stats.comparison.visits)
        : null,
    },
    series: pageviews.pageviews.map((point) => ({
      bucket: point.x,
      pageViews: point.y,
      visitors: sessionsByBucket.get(point.x) ?? 0,
      previousPageViews: previousPageViews.get(Date.parse(point.x)) ?? 0,
    })),
    quality: {
      // API success cannot verify blocked browsers, bot share, or legacy import
      // attribution. Completeness of returned rows is not audience authenticity.
      status: "partial",
      anonymousPageViews: 0,
      countryCoveragePct: null,
      generatedAt: now.toISOString(),
    },
    measurement: createAnalyticsMeasurement("umami_api", window.start),
  });
}

/**
 * Umami's `metrics` endpoint returns a single count per row. Activity
 * dimensions (paths, referrers, hostnames) count pageviews; visitor dimensions
 * (country, browser, os, device) count unique visitors. The breakdown contract
 * has both columns, so only the column the dimension actually measures is
 * filled and the other is left at zero rather than duplicated.
 */
export function mapUmamiBreakdown(
  rows: UmamiMetricRow[],
  dimension: AnalyticsBreakdownDimension
): AnalyticsBreakdown {
  const total = rows.reduce((sum, row) => sum + row.y, 0);
  const byVisitors = countsAreVisitors(dimension);

  return analyticsBreakdownSchema.parse(
    rows.map((row) => ({
      // Umami reports an empty string for direct traffic and unknown values;
      // the UI renders it as a row label, so give it a readable name.
      value: row.x.trim() || "(direct)",
      page_views: byVisitors ? 0 : row.y,
      visitors: byVisitors ? row.y : 0,
      share: total > 0 ? (row.y / total) * 100 : 0,
    }))
  );
}


/** Every breakdown dimension the admin traffic view requests. */
export const UMAMI_BREAKDOWN_DIMENSIONS: readonly AnalyticsBreakdownDimension[] = [
  "path",
  "referrer",
  "country",
  "browser",
  "os",
  "device",
  "hostname",
  "utm_source",
  "utm_medium",
  "utm_campaign",
];

export function isUmamiMetricDimension(
  dimension: AnalyticsBreakdownDimension
): dimension is UmamiMetricDimension & AnalyticsBreakdownDimension {
  return (UMAMI_BREAKDOWN_DIMENSIONS as readonly string[]).includes(dimension);
}
