// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from "vitest";

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
    trackEventMock.mockReset();
    IntersectionObserverMock.instances = [];
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  });

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
    observeCatalogImpressions(root, context, seen);
    IntersectionObserverMock.instances[1].trigger(card, 1);

    expect(trackEventMock).toHaveBeenCalledTimes(1);
  });
});
