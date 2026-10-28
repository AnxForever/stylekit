import { describe, expect, it } from "vitest";
import {
  createAnalyticsMeasurement,
  describeAnalyticsOverview,
} from "@/lib/admin/analytics-measurement";
import type { AnalyticsOverview } from "@/lib/admin/analytics-api-contract";

const NOW = Date.parse("2026-10-22T14:00:00Z");
function overview(generatedAt = "2026-10-22T13:55:00Z"): AnalyticsOverview {
  return {
    range: { start: "2026-10-15T14:00:00Z", end: "2026-10-22T14:00:00Z", timezone: "Asia/Shanghai" },
    current: { pageViews: 100, visitors: 20, visits: 25, engagedVisits: 0, bouncedVisits: 0, bounceRate: null, viewsPerVisit: 4 },
    previous: { pageViews: 80, visitors: 10, visits: 20, bounceRate: null, viewsPerVisit: 4 },
    series: [],
    quality: { status: "complete", anonymousPageViews: 0, countryCoveragePct: null, generatedAt },
  };
}

describe("analytics measurement provenance", () => {
  it("does not interpret metadata-free legacy data as Umami or verified people", () => {
    const value = describeAnalyticsOverview(overview(), "legacy_snapshot", { now: NOW });
    expect(value.measurement).toMatchObject({ source: "legacy_snapshot", visitorMetric: "unknown", filtering: "unverified" });
    expect(value.quality.status).toBe("partial");
  });

  it("keeps internal tab sessions distinct from anonymous Umami identifiers", () => {
    expect(createAnalyticsMeasurement("internal_events", overview().range.start)).toMatchObject({ visitorMetric: "tab_sessions", fallback: true });
    expect(createAnalyticsMeasurement("umami_api", overview().range.start)).toMatchObject({ visitorMetric: "anonymous_identifiers", filtering: "unverified" });
  });

  it("marks the historical window as potentially mixed without assigning rows", () => {
    expect(createAnalyticsMeasurement("umami_snapshot", "2026-07-22T00:00:00Z").history).toMatchObject({ status: "mixed_legacy", reportedImportedEvents: 232380 });
    expect(createAnalyticsMeasurement("umami_snapshot", "2026-10-21T00:00:00Z").history.status).toBe("outside_window");
  });

  it("retains the original generatedAt and filtered source during a stale fallback", () => {
    const data = overview("2026-10-21T14:00:00Z");
    data.measurement = { ...createAnalyticsMeasurement("umami_snapshot", data.range.start), filtering: "applied" };
    const value = describeAnalyticsOverview(data, "legacy_snapshot", { cached: true, fallback: true, now: NOW });
    expect(value.measurement).toMatchObject({ source: "umami_snapshot", freshness: "stale", fallback: true, filtering: "applied" });
    expect(value.quality).toMatchObject({ status: "stale", generatedAt: "2026-10-21T14:00:00Z" });
    expect(data.measurement.freshness).toBe("current");
  });

  it.each(["not-a-date", "2026-10-23T14:00:00Z"])("does not label invalid/future clocks current: %s", (timestamp) => {
    expect(describeAnalyticsOverview(overview(timestamp), "umami_snapshot", { now: NOW }).measurement?.freshness).toBe("stale");
  });
});
