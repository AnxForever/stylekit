// @vitest-environment happy-dom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackEvent } from "@/lib/analytics/events";

vi.mock("@/lib/analytics/utm", () => ({ getUtmParams: () => null }));

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
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("prompt analytics delivery", () => {
  it("falls back to a keepalive request when the browser refuses to queue a beacon", () => {
    const sendBeacon = vi.fn().mockReturnValue(false);
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("navigator", { sendBeacon });
    vi.stubGlobal("fetch", fetchMock);

    trackEvent("prompt_copy", properties);

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

  it("does not duplicate an event already queued by sendBeacon", () => {
    vi.stubGlobal("navigator", { sendBeacon: vi.fn().mockReturnValue(true) });
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    trackEvent("prompt_copy", properties);

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("contains a failed request without rejecting the copy action", async () => {
    vi.stubGlobal("navigator", {});
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    expect(() => trackEvent("prompt_copy", properties)).not.toThrow();
    await Promise.resolve();
  });
});
