import { describe, expect, it } from "vitest";
import {
  buildSnapshotFromRows,
  HISTORY_CUTOFF,
  makeBucketLabels,
  parseArguments,
  readConfig,
  RANGE_CONFIG,
  SNAPSHOT_AGGREGATE_SQL,
} from "../../../ops/analytics/generate-umami-snapshot.mjs";
import {
  buildExclusionReasonSql,
  classifyPageview,
} from "../../../ops/analytics/traffic-policy.mjs";

const productionHost = "www.stylekit.top";

function pageview(overrides: Record<string, unknown> = {}) {
  return {
    hostname: productionHost,
    url_path: "/styles",
    url_query: "",
    tag: null,
    browser: "chrome",
    ...overrides,
  };
}

describe("Umami pageview exclusion policy", () => {
  it("accepts only canonical production hosts and ignores host casing and port", () => {
    expect(classifyPageview(pageview({ hostname: "STYLEKIT.TOP:443" }))).toBeNull();
    expect(classifyPageview(pageview({ hostname: "preview.stylekit.top" }))).toBe("non_production");
    expect(classifyPageview(pageview({ hostname: "localhost:3000" }))).toBe("non_production");
  });

  it("excludes admin paths with an optional locale and technical endpoints", () => {
    expect(classifyPageview(pageview({ url_path: "/admin/analytics" }))).toBe("internal");
    expect(classifyPageview(pageview({ url_path: "/zh/admin-login" }))).toBe("internal");
    expect(classifyPageview(pageview({ url_path: "/api/health" }))).toBe("non_production");
    expect(classifyPageview(pageview({ url_path: "/apiary" }))).toBeNull();
  });

  it("recognizes only the exact analytics=off QA query marker", () => {
    expect(classifyPageview(pageview({ url_query: "?ref=local&analytics=off" }))).toBe("internal");
    expect(classifyPageview(pageview({ url_query: "analytics=0" }))).toBeNull();
    expect(classifyPageview(pageview({ url_query: "Analytics=off" }))).toBeNull();
  });

  it("uses explicit tags and browser names as evidence of test or automated traffic", () => {
    expect(classifyPageview(pageview({ tag: " QA " }))).toBe("internal");
    expect(classifyPageview(pageview({ tag: "automated-test" }))).toBe("automation");
    expect(classifyPageview(pageview({ browser: "HeadlessChrome" }))).toBe("automation");
    expect(classifyPageview(pageview({ browser: "PhantomJS" }))).toBe("automation");
    expect(classifyPageview(pageview({ browser: "chrome", user_agent: "Googlebot" }))).toBeNull();
  });

  it("keeps high-frequency pageviews unless an explicit exclusion rule matches", () => {
    const repeatedPageviews = Array.from({ length: 204 }, () => pageview());
    expect(repeatedPageviews.every((event) => classifyPageview(event) === null)).toBe(true);
  });

  it("uses the same canonical hosts, markers, and browser fields in SQL", () => {
    const sql = buildExclusionReasonSql("we", "s");
    expect(sql).toContain("we.hostname");
    expect(sql).toContain("we.url_query");
    expect(sql).toContain("we.tag");
    expect(sql).toContain("s.browser");
    expect(sql).toContain("'www.stylekit.top'");
    expect(sql).toContain("analytics=off(&|$)");
    expect(sql).not.toContain("user_agent");
  });
});

describe("Umami snapshot assembly", () => {
  it("requires connection and website configuration without credential defaults", () => {
    expect(() => readConfig({ NODE_ENV: "test" }, { dryRun: true, outputPath: null })).toThrow(
      "DATABASE_URL is required"
    );
    expect(() =>
      readConfig(
        { NODE_ENV: "test", DATABASE_URL: "postgres://example" },
        { dryRun: true, outputPath: null }
      )
    ).toThrow("WEBSITE_ID is required");
    expect(() =>
      readConfig(
        { NODE_ENV: "test", DATABASE_URL: "postgres://example", WEBSITE_ID: "site" },
        { dryRun: false, outputPath: null }
      )
    ).toThrow("OUTPUT_PATH");
    expect(
      readConfig(
        { NODE_ENV: "test", DATABASE_URL: "postgres://example", WEBSITE_ID: "site" },
        { dryRun: true, outputPath: null }
      )
    ).toMatchObject({ dryRun: true, outputPath: null, websiteId: "site" });
  });

  it("parses a dry run and rejects unrecognized command-line options", () => {
    expect(parseArguments(["--dry-run"])).toEqual({ dryRun: true, outputPath: null });
    expect(parseArguments(["--output", "snapshot.json"])).toEqual({
      dryRun: false,
      outputPath: "snapshot.json",
    });
    expect(() => parseArguments(["--write-anywhere"])).toThrow("Unknown argument");
  });

  it("generates relative bucket labels across empty calendar buckets", () => {
    const start = new Date("2026-10-15T14:30:00.000Z");
    const end = new Date("2026-10-16T14:30:00.000Z");
    const hourly = makeBucketLabels(start, end, "hour");
    expect(hourly).toHaveLength(25);
    expect(hourly[0]).toBe("2026-10-15T22:00");
    expect(hourly[24]).toBe("2026-10-16T22:00");

    const daily = makeBucketLabels(start, new Date("2026-10-22T14:30:00.000Z"), "day");
    expect(daily).toHaveLength(8);
    expect(daily[0]).toBe("2026-10-15");
    expect(daily[7]).toBe("2026-10-22");
  });

  it("keeps raw counts, exclusions, provenance, and relative comparison buckets", () => {
    const generatedAt = new Date("2026-10-22T12:00:00.000Z");
    const rows: Array<Record<string, unknown>> = [];

    for (const [range, config] of Object.entries(RANGE_CONFIG)) {
      const currentStart = new Date(generatedAt.getTime() - config.hours * 60 * 60 * 1000);
      const previousStart = new Date(generatedAt.getTime() - config.hours * 2 * 60 * 60 * 1000);
      for (const [period, start, end] of [
        ["current", currentStart, generatedAt],
        ["previous", previousStart, currentStart],
      ] as const) {
        rows.push({
          kind: "total",
          range_name: range,
          period,
          hours: config.hours,
          grain: config.bucket,
          start_at: start,
          end_at: end,
          generated_at: generatedAt,
          raw_page_views: period === "current" ? 10 : 8,
          page_views: period === "current" ? 7 : 6,
          visitors: period === "current" ? 3 : 2,
          visits: period === "current" ? 4 : 3,
          internal_page_views: 1,
          automation_page_views: 1,
          non_production_page_views: period === "current" ? 1 : 0,
        });
      }
    }

    rows.push(
      { kind: "series", range_name: "24h", period: "current", bucket_index: 0, page_views: 2, visitors: 1 },
      { kind: "series", range_name: "24h", period: "current", bucket_index: 2, page_views: 5, visitors: 2 },
      { kind: "series", range_name: "24h", period: "previous", bucket_index: 0, page_views: 3, visitors: 1 },
      { kind: "series", range_name: "24h", period: "previous", bucket_index: 2, page_views: 4, visitors: 1 },
      {
        kind: "breakdown",
        range_name: "24h",
        dimension: "path",
        value: "/styles",
        page_views: 7,
        visitors: 3,
        share: 100,
      }
    );

    const snapshot = buildSnapshotFromRows(
      rows,
      { totals: { pv: 1 }, topStyles: [], topExports: [], dailyPv: [] },
      generatedAt.toISOString()
    );
    const overview = snapshot.overview["24h"];

    expect(overview.current.pageViews).toBe(7);
    expect(overview.current.visitors).toBe(3);
    expect(overview.measurement).toMatchObject({
      source: "umami_snapshot",
      visitorMetric: "anonymous_identifiers",
      filtering: "applied",
      rawPageViews: 10,
      excludedPageViews: 3,
      history: {
        cutoff: HISTORY_CUTOFF,
        reportedImportedEvents: 232380,
        status: "outside_window",
      },
    });
    expect(overview.series[0].previousPageViews).toBe(3);
    expect(overview.series[1]).toMatchObject({ pageViews: 0, previousPageViews: 0 });
    expect(overview.series[2].previousPageViews).toBe(4);
    expect(snapshot.breakdowns["24h"].path).toEqual([
      { value: "/styles", page_views: 7, visitors: 3, share: 100 },
    ]);
    expect(snapshot.overview["90d"].measurement.history.status).toBe("mixed_legacy");
    expect(snapshot.overview["90d"].previous).not.toHaveProperty("measurement");
  });

  it("queries pageviews, bounded breakdowns, and visitor counts from the filtered rows", () => {
    expect(SNAPSHOT_AGGREGATE_SQL).toContain("we.event_name IS NULL");
    expect(SNAPSHOT_AGGREGATE_SQL).toContain("count(DISTINCT e.session_id) FILTER (WHERE e.exclusion_reason IS NULL)");
    expect(SNAPSHOT_AGGREGATE_SQL).toContain("WHERE row_number <= 50");
    expect(SNAPSHOT_AGGREGATE_SQL).toContain("('utm_campaign'::text");
    expect(SNAPSHOT_AGGREGATE_SQL).toContain("s.session_id = we.session_id");
  });
});
