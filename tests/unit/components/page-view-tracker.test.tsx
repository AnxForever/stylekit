// @vitest-environment happy-dom
import { StrictMode } from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { trackPageView } from "@/lib/analytics/events";

let pathname = "/en/styles";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));
vi.mock("@/lib/analytics/events", () => ({ trackPageView: vi.fn() }));

beforeEach(() => {
  vi.clearAllMocks();
  pathname = "/en/styles";
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function dispatchPageShow(persisted: boolean) {
  const event = new Event("pageshow");
  Object.defineProperty(event, "persisted", { value: persisted });
  window.dispatchEvent(event);
}

describe("page view lifecycle", () => {
  it("records one immediate view in StrictMode", () => {
    render(<StrictMode><PageViewTracker /></StrictMode>);
    expect(trackPageView).toHaveBeenCalledTimes(1);
    expect(trackPageView).toHaveBeenCalledWith(expect.objectContaining({ path: pathname }));
  });

  it("records rapid pathname changes and revisits without waiting for idle time", () => {
    const view = render(<PageViewTracker />);
    pathname = "/en/styles/neo-brutalist";
    view.rerender(<PageViewTracker />);
    pathname = "/en/styles";
    view.rerender(<PageViewTracker />);
    expect(vi.mocked(trackPageView).mock.calls.map(([payload]) => payload.path)).toEqual([
      "/en/styles", "/en/styles/neo-brutalist", "/en/styles",
    ]);
  });

  it("does not count rerenders or query-only changes as another page", () => {
    const view = render(<PageViewTracker />);
    view.rerender(<PageViewTracker />);
    expect(trackPageView).toHaveBeenCalledTimes(1);
  });

  it("retains a new view on a real document remount", () => {
    render(<PageViewTracker />).unmount();
    render(<PageViewTracker />);
    expect(trackPageView).toHaveBeenCalledTimes(2);
  });

  it("waits for a background tab to become visible before counting it", () => {
    const visibility = vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    render(<StrictMode><PageViewTracker /></StrictMode>);
    expect(trackPageView).not.toHaveBeenCalled();
    visibility.mockReturnValue("visible");
    document.dispatchEvent(new Event("visibilitychange"));
    document.dispatchEvent(new Event("visibilitychange"));
    expect(trackPageView).toHaveBeenCalledTimes(1);
  });

  it("records one fresh arrival after a visible BFCache restoration in StrictMode", () => {
    render(<StrictMode><PageViewTracker /></StrictMode>);
    dispatchPageShow(false);
    expect(trackPageView).toHaveBeenCalledTimes(1);
    dispatchPageShow(true);
    document.dispatchEvent(new Event("visibilitychange"));
    expect(trackPageView).toHaveBeenCalledTimes(2);
  });

  it("defers a hidden BFCache restoration until visible and counts it once", () => {
    const visibility = vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    render(<StrictMode><PageViewTracker /></StrictMode>);
    visibility.mockReturnValue("hidden");
    dispatchPageShow(true);
    expect(trackPageView).toHaveBeenCalledTimes(1);
    visibility.mockReturnValue("visible");
    document.dispatchEvent(new Event("visibilitychange"));
    document.dispatchEvent(new Event("visibilitychange"));
    expect(trackPageView).toHaveBeenCalledTimes(2);
  });
});
