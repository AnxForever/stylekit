import { beforeEach, describe, expect, it, vi } from "vitest";

const { rpc, getClient, readCache, writeCache } = vi.hoisted(() => ({
  rpc: vi.fn(), getClient: vi.fn(), readCache: vi.fn(), writeCache: vi.fn(),
}));
vi.mock("server-only", () => ({}));
vi.mock("@/lib/supabase/server", () => ({ getSupabaseAdmin: getClient }));
vi.mock("@/lib/admin/analytics-response-cache", () => ({
  readAnalyticsCache: readCache,
  writeAnalyticsCache: writeCache,
  coalesceAnalyticsRequest: (_key: string, load: () => Promise<unknown>) => load(),
}));

import { getStyleInsightsSnapshot } from "@/lib/admin/style-insights-server";

const emptyReport = {
  version: 2, source: "first_party", retentionDays: 90,
  range: { start: "2026-11-01T00:00:00Z", end: "2026-11-08T00:00:00Z", timezone: "Asia/Shanghai" },
  generatedAt: "2026-11-08T00:00:00Z", firstCollectedAt: null,
  traffic: { pageViews: 0, visitors: 0, visits: 0, unidentifiedPageViews: 0 },
  styles: [], sources: [],
};

describe("first-party style insights loading", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("ANALYTICS_BACKEND_URL", "");
    vi.stubEnv("ANALYTICS_BACKEND_TOKEN", "");
    getClient.mockReturnValue({ rpc });
    readCache.mockReturnValue(null);
    rpc.mockResolvedValue({ data: emptyReport, error: null });
  });

  it("reads self-hosted insights using a separate cache namespace and no Supabase client", async () => {
    vi.stubEnv("ANALYTICS_BACKEND_URL", "https://stats.example.test/private");
    vi.stubEnv("ANALYTICS_BACKEND_TOKEN", "test-token");
    getClient.mockReturnValue(null);
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(emptyReport)));
    vi.stubGlobal("fetch", fetchMock);
    expect(await getStyleInsightsSnapshot("7d")).toEqual({ data: emptyReport, cache: "MISS" });
    expect(String(fetchMock.mock.calls[0][0])).toBe("https://stats.example.test/private/insights");
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ start: expect.any(String), end: expect.any(String) });
    expect(getClient).not.toHaveBeenCalled();
    expect(rpc).not.toHaveBeenCalled();
    expect(writeCache).toHaveBeenCalledWith("style-insights:v2:7d:self-hosted", emptyReport);
  });

  it("does not fall back to Supabase after partial backend configuration or backend errors", async () => {
    vi.stubEnv("ANALYTICS_BACKEND_URL", "https://stats.example.test/private");
    expect(await getStyleInsightsSnapshot("7d")).toMatchObject({ data: null, code: "ANALYTICS_BACKEND_CONFIGURATION", status: 503 });
    vi.stubEnv("ANALYTICS_BACKEND_TOKEN", "test-token");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("private provider details")));
    expect(await getStyleInsightsSnapshot("7d")).toMatchObject({ data: null, code: "ANALYTICS_BACKEND_UNAVAILABLE", status: 503 });
    expect(getClient).not.toHaveBeenCalled();
    expect(rpc).not.toHaveBeenCalled();
    expect(writeCache).not.toHaveBeenCalled();
  });

  it("accepts a measured empty window and caches only validated first-party data", async () => {
    const result = await getStyleInsightsSnapshot("7d");
    expect(result).toEqual({ data: emptyReport, cache: "MISS" });
    expect(rpc).toHaveBeenCalledWith("admin_analytics_style_insights", {
      p_start: expect.any(String), p_end: expect.any(String),
    });
    expect(writeCache).toHaveBeenCalledWith("style-insights:v2:7d", emptyReport);
  });

  it("does not report missing migrations as zero traffic", async () => {
    rpc.mockResolvedValue({ data: null, error: { code: "PGRST202" } });
    expect(await getStyleInsightsSnapshot("30d")).toMatchObject({
      data: null, status: 503, code: "ANALYTICS_MIGRATION_REQUIRED",
    });
    expect(writeCache).not.toHaveBeenCalled();
  });

  it("does not substitute session or Umami counts for browser identifiers", async () => {
    rpc.mockResolvedValue({ data: { ...emptyReport, source: "umami" }, error: null });
    expect(await getStyleInsightsSnapshot("24h")).toMatchObject({
      data: null, status: 502, code: "ANALYTICS_INVALID_PAYLOAD",
    });
    expect(writeCache).not.toHaveBeenCalled();
  });

  it("keeps unknown identity separate from measured UV", async () => {
    const report = { ...emptyReport, traffic: { pageViews: 5, visitors: 1, visits: 2, unidentifiedPageViews: 2 } };
    rpc.mockResolvedValue({ data: report, error: null });
    expect((await getStyleInsightsSnapshot("7d")).data?.traffic).toEqual(report.traffic);
  });

  it("returns unavailable for unconfigured storage and handles rejected queries", async () => {
    getClient.mockReturnValue(null);
    expect(await getStyleInsightsSnapshot("7d")).toMatchObject({ data: null, code: "ANALYTICS_UNAVAILABLE" });
    getClient.mockReturnValue({ rpc });
    rpc.mockRejectedValue(new Error("Network unavailable"));
    expect(await getStyleInsightsSnapshot("7d")).toMatchObject({ data: null, code: "ANALYTICS_QUERY_FAILED" });
    expect(writeCache).not.toHaveBeenCalled();
  });
});
