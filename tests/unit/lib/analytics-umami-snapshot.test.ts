import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { createAnalyticsMeasurement } from "@/lib/admin/analytics-measurement";

const fetchMock = vi.fn();
const snapshotOverview = () => ({
  range: { start: "2026-10-15T14:00:00Z", end: "2026-10-22T14:00:00Z", timezone: "Asia/Shanghai" },
  current: { pageViews: 100, visitors: 20, visits: 25, engagedVisits: 0, bouncedVisits: 0, bounceRate: null, viewsPerVisit: 4 },
  previous: { pageViews: 80, visitors: 10, visits: 20, bounceRate: null, viewsPerVisit: 4 },
  series: [],
  quality: { status: "partial", anonymousPageViews: 0, countryCoveragePct: null, generatedAt: new Date().toISOString() },
});

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("UMAMI_INSIGHTS_URL", "https://stats.example.test/private-snapshot.json");
  vi.stubEnv("NEXT_PUBLIC_UMAMI_INSIGHTS_URL", "");
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockReset();
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

describe("curated Umami snapshot reader", () => {
  it("labels old snapshots unknown instead of inventing a verified source", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ overview: { "7d": snapshotOverview() } })));
    const { readUmamiSnapshotOverview } = await import("@/lib/admin/analytics-umami-snapshot");
    expect((await readUmamiSnapshotOverview("7d"))?.measurement).toMatchObject({ source: "legacy_snapshot", visitorMetric: "unknown", filtering: "unverified" });
  });

  it("shares one snapshot for overview and filtered rankings and recomputes listed share", async () => {
    const overview = snapshotOverview();
    const measurement = { ...createAnalyticsMeasurement("umami_snapshot", overview.range.start), filtering: "applied" };
    fetchMock.mockResolvedValue(new Response(JSON.stringify({
      overview: { "7d": { ...overview, measurement } },
      breakdowns: { "7d": { path: [
        { value: "/zh", page_views: 30, visitors: 10, share: 30 },
        { value: "/en", page_views: 10, visitors: 5, share: 10 },
        { value: "/styles", page_views: 60, visitors: 15, share: 60 },
      ] } },
    })));
    const reader = await import("@/lib/admin/analytics-umami-snapshot");
    const [data, rows] = await Promise.all([reader.readUmamiSnapshotOverview("7d"), reader.readUmamiSnapshotBreakdown("7d", "path", 2)]);
    expect(data?.measurement?.source).toBe("umami_snapshot");
    expect(rows?.map((row) => row.share)).toEqual([75, 25]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][1]).toMatchObject({ cache: "no-store" });
  });

  it("does not mix unfiltered rankings into a curated overview", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ overview: { "7d": snapshotOverview() }, breakdowns: { "7d": { path: [] } } })));
    const reader = await import("@/lib/admin/analytics-umami-snapshot");
    expect(await reader.readUmamiSnapshotBreakdown("7d", "path", 10)).toBeNull();
  });

  it("recovers on the next attempt after a primary source failure", async () => {
    fetchMock.mockRejectedValueOnce(new Error("offline"));
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ overview: { "7d": snapshotOverview() } })));
    const reader = await import("@/lib/admin/analytics-umami-snapshot");
    expect(await reader.readUmamiSnapshotOverview("7d")).toBeNull();
    expect(await reader.readUmamiSnapshotOverview("7d")).not.toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
