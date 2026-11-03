import { describe, expect, it, vi } from "vitest";
import {
  coalesceAnalyticsRequest,
  readAnalyticsCache,
  writeAnalyticsCache,
} from "@/lib/admin/analytics-response-cache";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

describe("analytics response cache", () => {
  it("coalesces ten concurrent requests with the same key into one loader", async () => {
    const gate = deferred<{ count: number }>();
    const loader = vi.fn(() => gate.promise);
    const requests = Array.from({ length: 10 }, () =>
      coalesceAnalyticsRequest("coalesce-test", loader),
    );

    await Promise.resolve();
    expect(loader).toHaveBeenCalledTimes(1);
    gate.resolve({ count: 10 });
    await expect(Promise.all(requests)).resolves.toEqual(
      Array.from({ length: 10 }, () => ({ count: 10 })),
    );
  });

  it("removes rejected flights so the next request can retry", async () => {
    const loader = vi.fn()
      .mockRejectedValueOnce(new Error("database unavailable"))
      .mockResolvedValueOnce({ count: 2 });

    await expect(coalesceAnalyticsRequest("retry-test", loader)).rejects.toThrow(
      "database unavailable",
    );
    await expect(coalesceAnalyticsRequest("retry-test", loader)).resolves.toEqual({
      count: 2,
    });
    expect(loader).toHaveBeenCalledTimes(2);
  });

  it("expires cached values after the short response-cache window", () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date("2026-10-29T00:00:00Z"));
      writeAnalyticsCache("expiry-test", { count: 1 });
      expect(readAnalyticsCache("expiry-test")).toEqual({ count: 1 });
      vi.advanceTimersByTime(60_001);
      expect(readAnalyticsCache("expiry-test")).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });
});
