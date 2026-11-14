// @vitest-environment happy-dom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackEvent } from "@/lib/analytics/events";

vi.mock("@/lib/analytics/utm", () => ({ getUtmParams: () => null }));
vi.mock("@/lib/analytics/collection-policy", () => ({ canCollectClientAnalytics: () => true }));

const properties = {
  slug: "neo-brutalist",
  prompt_type: "hard",
  source: "hero",
  locale: "zh",
} as const;

beforeEach(() => {
  vi.stubEnv("NODE_ENV", "production");
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("prompt analytics delivery", () => {
  it("falls back to a keepalive request when the browser refuses to queue a beacon", async () => {
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    const sendBeacon = vi.fn().mockReturnValue(false);
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("navigator", { sendBeacon });
    vi.stubGlobal("fetch", fetchMock);

    trackEvent("prompt_copy", properties);
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    expect(sendBeacon).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/analytics", expect.objectContaining({
      method: "POST",
      keepalive: true,
    }));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      eventType: "prompt_copy",
      eventData: properties,
    });
  });

  it("does not duplicate an event already queued by sendBeacon", async () => {
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    const sendBeacon = vi.fn().mockReturnValue(true);
    vi.stubGlobal("navigator", { sendBeacon });
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    trackEvent("prompt_copy", properties);
    // A hidden-page send must be queued synchronously, before document unload.
    expect(sendBeacon).toHaveBeenCalledTimes(1);
    await vi.waitFor(() => expect(sendBeacon).toHaveBeenCalledTimes(1));

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("contains a failed request without rejecting the copy action", async () => {
    vi.stubGlobal("navigator", {});
    const fetchMock = vi.fn().mockRejectedValue(new Error("offline"));
    vi.stubGlobal("fetch", fetchMock);
    expect(() => trackEvent("prompt_copy", properties)).not.toThrow();
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  });

  it("retries one transient failure with exactly the same event ID and body", async () => {
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    const fetchMock = vi.fn().mockResolvedValueOnce({ ok: false, status: 503 })
      .mockResolvedValueOnce({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);
    trackEvent("prompt_copy", properties);
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(fetchMock.mock.calls[0][1].body).toBe(fetchMock.mock.calls[1][1].body);
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).eventId).toMatch(/^[0-9a-f-]{36}$/);
  });

  it.each([400, 403, 429])("does not retry a rejected request (%i)", async (status) => {
    vi.useFakeTimers();
    try {
      const fetchMock = vi.fn().mockResolvedValue({ ok: false, status });
      vi.stubGlobal("fetch", fetchMock);
      trackEvent("prompt_copy", properties);
      await vi.runAllTimersAsync();
      expect(fetchMock).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });
});
