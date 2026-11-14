// @vitest-environment happy-dom
import { StrictMode } from "react";
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ pathname: "/en/styles/corporate-clean/showcase", trackEvent: vi.fn(), observe: vi.fn(), stop: vi.fn() }));
vi.mock("next/navigation", () => ({ usePathname: () => state.pathname }));
vi.mock("@/lib/analytics/events", () => ({ trackEvent: state.trackEvent }));
vi.mock("@/lib/analytics/style-engagement", async (original) => ({
  ...await original<typeof import("@/lib/analytics/style-engagement")>(),
  observeStyleEngagement: state.observe,
}));
import { StylePageTracker } from "@/components/analytics/style-page-tracker";

describe("style arrivals", () => {
  const pageShow = (persisted: boolean) => {
    // happy-dom exposes PageTransitionEvent without the persisted option.
    const event = new Event("pageshow");
    Object.defineProperty(event, "persisted", { value: persisted });
    window.dispatchEvent(event);
  };
  beforeEach(() => {
    vi.useFakeTimers();
    state.pathname = "/en/styles/corporate-clean/showcase";
    state.trackEvent.mockReset();
    state.observe.mockReset().mockReturnValue(state.stop);
    state.stop.mockReset();
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
  });
  afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); });
  it("records a direct showcase arrival once through strict effect remounts", () => {
    render(<StrictMode><StylePageTracker /></StrictMode>);
    act(() => vi.advanceTimersByTime(1));
    expect(state.trackEvent).toHaveBeenCalledTimes(1);
    expect(state.trackEvent).toHaveBeenCalledWith("showcase_view", { slug: "corporate-clean", source: "page" });
    expect(state.observe).toHaveBeenCalledWith("corporate-clean", "showcase");
  });
  it("waits for visibility and flushes engagement on SPA navigation", () => {
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
    const view = render(<StylePageTracker />);
    act(() => vi.advanceTimersByTime(1));
    expect(state.trackEvent).not.toHaveBeenCalled();
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    state.pathname = "/styles/editorial";
    view.rerender(<StylePageTracker />);
    act(() => vi.advanceTimersByTime(1));
    expect(state.stop).toHaveBeenCalledTimes(1);
    expect(state.trackEvent).toHaveBeenLastCalledWith("style_view", { slug: "editorial", source: "page" });
  });
  it("counts each visible BFCache restore once without duplicating engagement listeners", () => {
    render(<StylePageTracker />);
    act(() => vi.advanceTimersByTime(1));
    act(() => pageShow(false));
    expect(state.trackEvent).toHaveBeenCalledTimes(1);
    act(() => pageShow(true));
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(state.trackEvent).toHaveBeenCalledTimes(2);
    expect(state.observe).toHaveBeenCalledTimes(1);
  });
  it("defers a hidden BFCache restore until visible without a second engagement observer", () => {
    render(<StylePageTracker />);
    act(() => vi.advanceTimersByTime(1));
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
    act(() => pageShow(true));
    expect(state.trackEvent).toHaveBeenCalledTimes(1);
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(state.trackEvent).toHaveBeenCalledTimes(2);
    expect(state.observe).toHaveBeenCalledTimes(1);
  });
});
