import { describe, expect, it, vi } from "vitest";
// `server-only` is a compile-time boundary supplied by Next.js; Vitest resolves
// it to a module that throws, so stub it exactly as the other server modules do.
vi.mock("server-only", () => ({}));

import {
  countsAreVisitors,
  mapUmamiBreakdown,
  mapUmamiOverview,
} from "@/lib/admin/analytics-umami-map";
import { getAnalyticsWindow } from "@/lib/admin/analytics-api-contract";

const NOW = new Date("2026-02-01T00:00:00.000Z");
const WINDOW = getAnalyticsWindow("7d", NOW);

const stats = {
  pageviews: 1000,
  visitors: 400,
  visits: 500,
  bounces: 100,
  totaltime: 12345,
  comparison: {
    pageviews: 800,
    visitors: 320,
    visits: 400,
    bounces: 100,
    totaltime: 9000,
  },
};

const pageviews = {
  pageviews: [
    { x: "2026-01-26T00:00:00Z", y: 600 },
    { x: "2026-01-27T00:00:00Z", y: 400 },
  ],
  sessions: [
    { x: "2026-01-26T00:00:00Z", y: 250 },
    { x: "2026-01-27T00:00:00Z", y: 150 },
  ],
  comparison: {
    pageviews: [
      { x: "2026-01-19T00:00:00Z", y: 300 },
      { x: "2026-01-20T00:00:00Z", y: 500 },
    ],
    sessions: [],
  },
};

describe("mapUmamiOverview", () => {
  it("maps current and previous totals onto the admin contract", () => {
    const overview = mapUmamiOverview(stats, pageviews, WINDOW, NOW);

    expect(overview.current).toEqual({
      pageViews: 1000,
      visitors: 400,
      visits: 500,
      engagedVisits: 400,
      bouncedVisits: 100,
      bounceRate: 20,
      viewsPerVisit: 2,
    });
    expect(overview.previous).toEqual({
      pageViews: 800,
      visitors: 320,
      visits: 400,
      bounceRate: 25,
      viewsPerVisit: 2,
    });
    expect(overview.range).toEqual({
      start: WINDOW.start,
      end: WINDOW.end,
      timezone: "Asia/Shanghai",
    });
  });

  it("reads visitors from the session series per bucket", () => {
    const overview = mapUmamiOverview(stats, pageviews, WINDOW, NOW);

    expect(overview.series).toEqual([
      {
        bucket: "2026-01-26T00:00:00Z",
        pageViews: 600,
        visitors: 250,
        // The comparison series carries its own timestamps, so buckets without a
        // matching previous-period point report 0 rather than borrowing a value.
        previousPageViews: 0,
      },
      {
        bucket: "2026-01-27T00:00:00Z",
        pageViews: 400,
        visitors: 150,
        previousPageViews: 0,
      },
    ]);
  });

  it("marks the payload complete because Umami never has anonymous pageviews", () => {
    expect(mapUmamiOverview(stats, pageviews, WINDOW, NOW).quality).toMatchObject({
      status: "complete",
      anonymousPageViews: 0,
      generatedAt: NOW.toISOString(),
    });
  });

  it("returns null ratios instead of dividing by zero on a quiet period", () => {
    const overview = mapUmamiOverview(
      { pageviews: 0, visitors: 0, visits: 0, bounces: 0, totaltime: 0 },
      { pageviews: [], sessions: [] },
      WINDOW,
      NOW
    );

    expect(overview.current.bounceRate).toBeNull();
    expect(overview.current.viewsPerVisit).toBeNull();
    expect(overview.previous.bounceRate).toBeNull();
    expect(overview.series).toEqual([]);
  });

  it("stays valid when Umami omits the comparison block", () => {
    const overview = mapUmamiOverview(
      { pageviews: 10, visitors: 5, visits: 6, bounces: 1, totaltime: 100 },
      { pageviews: [{ x: "2026-01-26T00:00:00Z", y: 10 }], sessions: [] },
      WINDOW,
      NOW
    );

    expect(overview.previous.pageViews).toBe(0);
    expect(overview.previous.bounceRate).toBeNull();
    expect(overview.series[0].previousPageViews).toBe(0);
  });
});

describe("mapUmamiBreakdown", () => {
  it("treats activity dimensions as pageview counts with a share of the total", () => {
    const rows = mapUmamiBreakdown(
      [
        { x: "/styles", y: 75 },
        { x: "/", y: 25 },
      ],
      "path"
    );

    expect(rows).toEqual([
      { value: "/styles", page_views: 75, visitors: 0, share: 75 },
      { value: "/", page_views: 25, visitors: 0, share: 25 },
    ]);
  });

  it("places visitor-dimension counts in the visitor column", () => {
    const rows = mapUmamiBreakdown(
      [
        { x: "US", y: 60 },
        { x: "CN", y: 40 },
      ],
      "country"
    );

    expect(rows).toEqual([
      { value: "US", page_views: 0, visitors: 60, share: 60 },
      { value: "CN", page_views: 0, visitors: 40, share: 40 },
    ]);
  });

  it("labels direct traffic and guards against an empty result set", () => {
    expect(mapUmamiBreakdown([{ x: "", y: 5 }], "referrer")[0]).toMatchObject({
      value: "(direct)",
      page_views: 5,
    });
    expect(mapUmamiBreakdown([], "path")).toEqual([]);
  });

  it("never produces a NaN share", () => {
    const rows = mapUmamiBreakdown([{ x: "direct", y: 0 }], "referrer");
    expect(rows[0].share).toBe(0);
  });

  it("identifies the dimensions Umami counts by visitor", () => {
    expect(countsAreVisitors("country")).toBe(true);
    expect(countsAreVisitors("browser")).toBe(true);
    expect(countsAreVisitors("device")).toBe(true);
    expect(countsAreVisitors("os")).toBe(true);
    expect(countsAreVisitors("path")).toBe(false);
    expect(countsAreVisitors("referrer")).toBe(false);
    expect(countsAreVisitors("utm_source")).toBe(false);
  });
});
