// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { trackEventMock } = vi.hoisted(() => ({
  trackEventMock: vi.fn(),
}));

vi.mock("@/lib/analytics/events", () => ({
  trackEvent: trackEventMock,
}));

import { observeCatalogImpressions } from "@/lib/analytics/catalog-impressions";

class IntersectionObserverMock {
  static instances: IntersectionObserverMock[] = [];

  readonly observed = new Set<Element>();
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    IntersectionObserverMock.instances.push(this);
  }

  observe(element: Element) {
    this.observed.add(element);
  }

  unobserve(element: Element) {
    this.observed.delete(element);
  }

  disconnect() {
    this.observed.clear();
  }

  trigger(element: Element, intersectionRatio: number) {
    this.callback(
      [
        {
          target: element,
          isIntersecting: intersectionRatio > 0,
          intersectionRatio,
        } as IntersectionObserverEntry,
      ],
      this as unknown as IntersectionObserver,
    );
  }
}

describe("catalog impressions", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
    trackEventMock.mockReset();
    IntersectionObserverMock.instances = [];
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  });

  afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

  it("tracks a visible card with rank context without the raw search query", () => {
    const root = document.createElement("div");
    root.innerHTML =
      '<div data-catalog-style-slug="corporate-clean" data-catalog-style-rank="3"></div>';
    const card = root.firstElementChild as HTMLElement;

    observeCatalogImpressions(
      root,
      {
        contextKey: "professional-query",
        sort: "recommended",
        filterCount: 2,
        queryPresent: true,
      },
      new Set(),
    );

    const observer = IntersectionObserverMock.instances[0];
    observer.trigger(card, 0.49);
    expect(trackEventMock).not.toHaveBeenCalled();

    observer.trigger(card, 0.5);
    vi.advanceTimersByTime(999);
    expect(trackEventMock).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(trackEventMock).toHaveBeenCalledWith("catalog_impression", {
      slug: "corporate-clean",
      rank: 3,
      surface: "styles_catalog",
      page: 1,
      sort: "recommended",
      collection_slug: null,
      filter_count: 2,
      query_present: true,
    });
    expect(JSON.stringify(trackEventMock.mock.calls)).not.toContain("professional-query");
  });

  it("deduplicates the same style, rank, and local context", () => {
    const root = document.createElement("div");
    root.innerHTML =
      '<div data-catalog-style-slug="corporate-clean" data-catalog-style-rank="1"></div>';
    const card = root.firstElementChild as HTMLElement;
    const seen = new Set<string>();
    const context = {
      contextKey: "default",
      sort: "recommended",
      filterCount: 0,
      queryPresent: false,
    };

    observeCatalogImpressions(root, context, seen);
    IntersectionObserverMock.instances[0].trigger(card, 1);
    vi.advanceTimersByTime(1_000);
    observeCatalogImpressions(root, context, seen);
    IntersectionObserverMock.instances[1].trigger(card, 1);
    vi.advanceTimersByTime(1_000);

    expect(trackEventMock).toHaveBeenCalledTimes(1);
  });

  it("requires continuous foreground visibility and cancels on cleanup", () => {
    const root = document.createElement("div");
    root.innerHTML = '<div data-catalog-style-slug="corporate-clean" data-catalog-style-rank="1"></div>';
    const card = root.firstElementChild as HTMLElement;
    const stop = observeCatalogImpressions(root, { contextKey: "x", sort: null, filterCount: 0, queryPresent: false }, new Set());
    const observer = IntersectionObserverMock.instances[0];
    observer.trigger(card, 1);
    vi.advanceTimersByTime(500);
    observer.trigger(card, 0.4);
    vi.advanceTimersByTime(1_000);
    expect(trackEventMock).not.toHaveBeenCalled();
    observer.trigger(card, 1);
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
    document.dispatchEvent(new Event("visibilitychange"));
    vi.advanceTimersByTime(5_000);
    expect(trackEventMock).not.toHaveBeenCalled();
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
    document.dispatchEvent(new Event("visibilitychange"));
    vi.advanceTimersByTime(500);
    stop();
    vi.advanceTimersByTime(5_000);
    expect(trackEventMock).not.toHaveBeenCalled();
  });

  it("attributes navigation clicks but ignores favorite controls", () => {
    const root = document.createElement("div");
    root.innerHTML = '<div data-catalog-style-slug="corporate-clean" data-catalog-style-rank="2"><a href="/en/styles/corporate-clean">Details</a><button>Favorite</button></div>';
    const stop = observeCatalogImpressions(root, { contextKey: "dark", surface: "collection", collectionSlug: "dark-mode", sort: null, filterCount: 0, queryPresent: false }, new Set());
    root.querySelector("button")!.click();
    expect(trackEventMock).not.toHaveBeenCalled();
    root.querySelector("a")!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(trackEventMock).toHaveBeenCalledWith("catalog_click", expect.objectContaining({ slug: "corporate-clean", rank: 2, surface: "collection", collection_slug: "dark-mode" }));
    stop();
  });
});
