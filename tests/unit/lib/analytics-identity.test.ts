// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ANALYTICS_SESSION_KEY,
  ANALYTICS_SESSION_TIMEOUT_MS,
  ANALYTICS_VISITOR_KEY,
  getAnalyticsIdentity,
} from "@/lib/analytics/identity";

beforeEach(() => window.localStorage.clear());
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("browser analytics identity", () => {
  it("shares a stable browser and active session across independently loaded callers", async () => {
    const first = await getAnalyticsIdentity(1000);
    vi.resetModules();
    const secondTab = await import("@/lib/analytics/identity");
    const second = await secondTab.getAnalyticsIdentity(2000);
    expect(first.visitorId).toMatch(/^[0-9a-f-]{36}$/);
    expect(second).toEqual(first);
  });

  it("rotates only the session after 30 minutes of inactivity", async () => {
    const first = await getAnalyticsIdentity(1000);
    const second = await getAnalyticsIdentity(1000 + ANALYTICS_SESSION_TIMEOUT_MS);
    expect(second.visitorId).toBe(first.visitorId);
    expect(second.sessionId).not.toBe(first.sessionId);
    expect(window.localStorage.getItem(ANALYTICS_VISITOR_KEY)).toBe(first.visitorId);
  });

  it("extends the shared session from the most recent activity", async () => {
    const first = await getAnalyticsIdentity(1000);
    await getAnalyticsIdentity(1000 + 20 * 60 * 1000);
    expect(await getAnalyticsIdentity(1000 + 40 * 60 * 1000)).toEqual(first);
  });

  it("does not turn storage failure into a new visitor or a session fallback", async () => {
    vi.stubGlobal("window", { localStorage: { getItem: () => { throw new Error("denied"); } } });
    expect(await getAnalyticsIdentity()).toEqual({ visitorId: null, sessionId: null });
    expect(await getAnalyticsIdentity()).toEqual({ visitorId: null, sessionId: null });
  });

  it("repairs corrupt session data without changing the browser identity", async () => {
    const first = await getAnalyticsIdentity();
    window.localStorage.setItem(ANALYTICS_SESSION_KEY, "malformed");
    const second = await getAnalyticsIdentity();
    expect(second.visitorId).toBe(first.visitorId);
    expect(second.sessionId).not.toBe(first.sessionId);
  });

  it("uses a cross-tab Web Lock during first identity allocation", async () => {
    let pending: Promise<unknown> = Promise.resolve();
    const request = vi.fn((_name: string, callback: () => unknown) => {
      pending = pending.then(callback);
      return pending;
    });
    vi.stubGlobal("navigator", { locks: { request } });
    try {
      const [first, second] = await Promise.all([getAnalyticsIdentity(1000), getAnalyticsIdentity(1000)]);
      expect(request).toHaveBeenCalledTimes(2);
      expect(first).toEqual(second);
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
