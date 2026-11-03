import { beforeEach, describe, expect, it, vi } from "vitest";

const { preloadMock, useSWRMock, cacheGetMock } = vi.hoisted(() => ({
  preloadMock: vi.fn(),
  useSWRMock: vi.fn(),
  cacheGetMock: vi.fn(),
}));

vi.mock("swr", () => ({
  default: useSWRMock,
  preload: preloadMock,
  useSWRConfig: () => ({ cache: { get: cacheGetMock } }),
}));

import {
  useAnalyticsBreakdown,
  useAnalyticsContent,
  useAnalyticsEvents,
  useAnalyticsOverview,
  useAnalyticsRegistrations,
} from "@/lib/swr/hooks";
import { prefetchAnalyticsView } from "@/lib/swr/analytics-prefetch";

describe("analytics data loading", () => {
  beforeEach(() => {
    preloadMock.mockReset().mockResolvedValue(undefined);
    useSWRMock.mockReset();
    cacheGetMock.mockReset().mockReturnValue(undefined);
  });

  it.each([
    ["overview", () => useAnalyticsOverview("7d", { marker: "overview" } as never)],
    ["traffic breakdown", () => useAnalyticsBreakdown("7d", "path", 10, [] as never)],
    ["users", () => useAnalyticsRegistrations("7d", { marker: "users" } as never)],
    ["content", () => useAnalyticsContent("7d", { marker: "content" } as never)],
    ["events", () => useAnalyticsEvents("7d", [{ marker: "events" }] as never)],
  ])("does not remount-fetch server data for %s and never keeps an old range visible", (_name, useHook) => {
    useHook();

    const options = useSWRMock.mock.lastCall?.[1];
    expect(options.revalidateOnMount).toBe(false);
    expect(options.keepPreviousData).toBe(false);
  });

  it("fetches a new range when the new range has no server fallback", () => {
    useAnalyticsOverview("30d");

    expect(useSWRMock).toHaveBeenCalledWith(
      "/api/admin/analytics/overview?range=30d",
      expect.objectContaining({
        fallbackData: undefined,
        revalidateOnMount: true,
        keepPreviousData: false,
      }),
    );
  });

  it("revalidates a matching server fallback if SWR already holds an older copy", () => {
    cacheGetMock.mockReturnValue({ data: { marker: "older cached copy" } });
    useAnalyticsOverview("7d", { marker: "new server result" } as never);

    expect(useSWRMock).toHaveBeenCalledWith(
      "/api/admin/analytics/overview?range=7d",
      expect.objectContaining({
        fallbackData: { marker: "new server result" },
        revalidateOnMount: true,
        keepPreviousData: false,
      }),
    );
  });

  it("preloads only the selected analytics section and includes prompt copies in content", async () => {
    await prefetchAnalyticsView("content", "30d");

    expect(preloadMock.mock.calls.map(([key]) => key)).toEqual([
      "/api/admin/analytics/content?range=30d",
      "/api/admin/analytics/events?range=30d",
      "/api/admin/analytics/prompt-copies?range=30d",
    ]);
    expect(preloadMock.mock.calls.some(([key]) => String(key).includes("breakdown"))).toBe(false);
    expect(preloadMock.mock.calls.some(([key]) => String(key).includes("registrations"))).toBe(false);
  });
});
