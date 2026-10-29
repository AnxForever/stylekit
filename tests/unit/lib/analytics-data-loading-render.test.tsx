// @vitest-environment happy-dom

import "@testing-library/jest-dom/vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { SWRConfig, useSWRConfig } from "swr";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useAnalyticsOverview } from "@/lib/swr/hooks";
import type { AnalyticsOverview } from "@/lib/admin/analytics-api-contract";

function overview(marker: string): AnalyticsOverview {
  return {
    range: { start: "2026-10-20T00:00:00.000Z", end: "2026-10-27T00:00:00.000Z", timezone: "Asia/Shanghai" },
    current: { pageViews: 0, visitors: 0, visits: 0, engagedVisits: 0, bouncedVisits: 0, bounceRate: null, viewsPerVisit: null },
    previous: { pageViews: 0, visitors: 0, visits: 0, bounceRate: null, viewsPerVisit: null },
    series: [],
    quality: { status: "complete", anonymousPageViews: 0, countryCoveragePct: null, generatedAt: marker },
  };
}

afterEach(() => vi.unstubAllGlobals());

describe("SSR analytics data in a real SWR provider", () => {
  it("uses cold SSR data without a fetch, fetches a new range, then refreshes a cached range", async () => {
    const cacheKey7d = "/api/admin/analytics/overview?range=7d";
    const cacheKey30d = "/api/admin/analytics/overview?range=30d";
    const stale30d = overview("2026-10-29T09:00:00.000Z");
    const fresh30d = overview("2026-10-29T09:05:00.000Z");
    const fetchMock = vi.fn(async (key: string) => {
      if (key === cacheKey30d) return fresh30d;
      return overview("fetched-7d");
    });
    vi.stubGlobal("fetch", fetchMock);

    let providerCache: ReturnType<typeof useSWRConfig>["cache"] | undefined;
    function CacheCapture({ children }: React.PropsWithChildren) {
      providerCache = useSWRConfig().cache;
      return children;
    }
    const wrapper = ({ children }: React.PropsWithChildren) => (
      <SWRConfig value={{ fetcher: fetchMock, dedupingInterval: 0, revalidateOnFocus: false }}>
        <CacheCapture>{children}</CacheCapture>
      </SWRConfig>
    );

    const initial7d = overview("server-7d");
    const { result, rerender } = renderHook(
      ({ range, initialData }: { range: "7d" | "30d"; initialData?: AnalyticsOverview }) =>
        useAnalyticsOverview(range, initialData),
      { initialProps: { range: "7d", initialData: initial7d }, wrapper },
    );

    expect(result.current.data).toEqual(initial7d);
    expect(fetchMock).not.toHaveBeenCalled();

    await act(async () => {
      providerCache?.set(cacheKey30d, { data: stale30d });
    });
    rerender({ range: "30d", initialData: stale30d });

    await waitFor(() => expect(result.current.data).toEqual(fresh30d));
    expect(fetchMock).toHaveBeenCalledExactlyOnceWith(cacheKey30d);

    const new7d = overview("new-server-7d");
    await act(async () => {
      providerCache?.set(cacheKey7d, { data: initial7d });
    });
    rerender({ range: "7d", initialData: new7d });

    await waitFor(() => expect(result.current.data).toEqual(overview("fetched-7d")));
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
