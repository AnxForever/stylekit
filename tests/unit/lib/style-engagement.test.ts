// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const { trackEvent } = vi.hoisted(() => ({ trackEvent: vi.fn() }));
vi.mock("@/lib/analytics/events", () => ({ trackEvent }));
import { observeStyleEngagement, readStylePage } from "@/lib/analytics/style-engagement";

describe("style engagement", () => {
  let now = 0;
  beforeEach(() => {
    vi.useFakeTimers();
    trackEvent.mockReset();
    now = 0;
    vi.spyOn(performance, "now").mockImplementation(() => now);
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
  });
  afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });
  const visibility = (value: string) => {
    Object.defineProperty(document, "visibilityState", { configurable: true, value });
    document.dispatchEvent(new Event("visibilitychange"));
  };
  it("recognizes direct and localized detail/showcase routes without catalog routes", () => {
    expect(readStylePage("/en/styles/corporate-clean/showcase")).toEqual({ slug: "corporate-clean", surface: "showcase" });
    expect(readStylePage("/styles/corporate-clean")).toEqual({ slug: "corporate-clean", surface: "detail" });
    expect(readStylePage("/styles")).toBeNull();
    expect(readStylePage("/styles/corporate-clean/unknown")).toBeNull();
  });
  it("excludes hidden time and does not double count visibility/pagehide/unmount", () => {
    const stop = observeStyleEngagement("corporate-clean", "showcase");
    now = 4_000;
    visibility("hidden");
    window.dispatchEvent(new Event("pagehide"));
    expect(trackEvent).toHaveBeenCalledTimes(1);
    expect(trackEvent).toHaveBeenLastCalledWith("style_engagement", expect.objectContaining({ active_ms: 4_000 }));
    now = 99_000;
    visibility("visible");
    now = 102_000;
    stop();
    expect(trackEvent).toHaveBeenCalledTimes(2);
    expect(trackEvent).toHaveBeenLastCalledWith("style_engagement", expect.objectContaining({ active_ms: 3_000 }));
  });
  it("sends deltas at heartbeat and only the remaining duration on navigation", () => {
    const stop = observeStyleEngagement("corporate-clean", "detail");
    now = 30_000;
    vi.advanceTimersByTime(30_000);
    now = 33_500;
    stop();
    expect(trackEvent.mock.calls.map((call) => call[1].active_ms)).toEqual([30_000, 3_500]);
  });
  it("resumes engagement after BFCache without counting cached elapsed time", () => {
    const stop = observeStyleEngagement("corporate-clean", "showcase");
    now = 4_000;
    window.dispatchEvent(new PageTransitionEvent("pagehide", { persisted: true }));
    now = 104_000;
    window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true }));
    now = 107_000;
    stop();
    expect(trackEvent.mock.calls.map((call) => call[1].active_ms)).toEqual([4_000, 3_000]);
  });
});
