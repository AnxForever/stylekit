import type { AnalyticsMeasurement, AnalyticsOverview } from "./analytics-api-contract";

/** Approximate boundary from the retained backfill log, not row attribution. */
export const ANALYTICS_LEGACY_BOUNDARY = "2026-08-16T02:00:00+08:00";
export const ANALYTICS_REPORTED_BACKFILL_EVENTS = 232380;
export const ANALYTICS_SNAPSHOT_STALE_MS = 20 * 60 * 1000;

export function createAnalyticsMeasurement(
  source: AnalyticsMeasurement["source"],
  start: string,
): AnalyticsMeasurement {
  const knownUmami = source === "umami_api" || source === "umami_snapshot";
  const startAt = Date.parse(start);
  return {
    source,
    visitorMetric: knownUmami
      ? "anonymous_identifiers"
      : source === "internal_events" ? "tab_sessions" : "unknown",
    freshness: "current",
    fallback: source === "internal_events",
    // A successful read does not establish that historical traffic was filtered.
    filtering: "unverified",
    policyVersion: null,
    rawPageViews: null,
    excludedPageViews: null,
    exclusions: [],
    history: {
      status: knownUmami && Number.isFinite(startAt)
        ? startAt <= Date.parse(ANALYTICS_LEGACY_BOUNDARY) ? "mixed_legacy" : "outside_window"
        : "unverified",
      cutoff: knownUmami ? ANALYTICS_LEGACY_BOUNDARY : null,
      reportedImportedEvents: knownUmami ? ANALYTICS_REPORTED_BACKFILL_EVENTS : null,
    },
  };
}

/** Keep the original data timestamp even when serving an emergency cache. */
export function describeAnalyticsOverview(
  overview: AnalyticsOverview,
  source: AnalyticsMeasurement["source"],
  options: { cached?: boolean; fallback?: boolean; now?: number } = {},
): AnalyticsOverview {
  const measurement = overview.measurement ?? createAnalyticsMeasurement(source, overview.range.start);
  const generatedAt = Date.parse(overview.quality.generatedAt);
  const now = options.now ?? Date.now();
  const stale = !Number.isFinite(generatedAt)
    || generatedAt > now + 60_000
    || now - generatedAt > ANALYTICS_SNAPSHOT_STALE_MS;
  return {
    ...overview,
    quality: {
      ...overview.quality,
      status: stale ? "stale"
        : measurement.filtering !== "applied" && overview.quality.status === "complete"
          ? "partial" : overview.quality.status,
    },
    measurement: {
      ...measurement,
      freshness: stale || measurement.freshness === "stale"
        ? "stale" : options.cached ? "cached" : measurement.freshness,
      fallback: options.fallback ?? measurement.fallback,
    },
  };
}
