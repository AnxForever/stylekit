import { trackEvent, type EventProperties } from "@/lib/analytics/events";

export interface CatalogImpressionContext {
  contextKey: string;
  sort: string | null;
  filterCount: number;
  queryPresent: boolean;
  surface?: EventProperties<"catalog_impression">["surface"];
  collectionSlug?: string | null;
}

const IMPRESSION_SELECTOR = "[data-catalog-style-slug][data-catalog-style-rank]";
const MINIMUM_VISIBLE_RATIO = 0.5;
const MINIMUM_VISIBLE_MS = 1_000;

export function observeCatalogImpressions(
  root: HTMLElement,
  context: CatalogImpressionContext,
  seen: Set<string>,
): () => void {
  const timers = new Map<HTMLElement, ReturnType<typeof setTimeout>>();
  const visible = new Set<HTMLElement>();
  const properties = (element: HTMLElement): EventProperties<"catalog_impression"> | null => {
    const slug = element.dataset.catalogStyleSlug?.trim();
    const rank = Number(element.dataset.catalogStyleRank);
    if (!slug || !Number.isInteger(rank) || rank < 1) return null;
    return {
      slug, rank, surface: context.surface ?? "styles_catalog", page: 1,
      sort: context.sort, collection_slug: context.collectionSlug ?? null,
      filter_count: context.filterCount, query_present: context.queryPresent,
    };
  };
  const stop = (element: HTMLElement) => {
    clearTimeout(timers.get(element));
    timers.delete(element);
  };
  const start = (element: HTMLElement) => {
    if (document.visibilityState === "hidden" || timers.has(element)) return;
    const data = properties(element);
    if (!data) return;
    const key = `${context.contextKey}:${data.slug}:${data.rank}`;
    if (seen.has(key)) return;
    timers.set(element, setTimeout(() => {
      timers.delete(element);
      if (document.visibilityState === "hidden" || !visible.has(element) || seen.has(key)) return;
      seen.add(key);
      trackEvent("catalog_impression", data);
      observer?.unobserve(element);
      visible.delete(element);
    }, MINIMUM_VISIBLE_MS));
  };
  const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const element = entry.target as HTMLElement;
      if (entry.isIntersecting && entry.intersectionRatio >= MINIMUM_VISIBLE_RATIO) {
        visible.add(element);
        start(element);
      } else {
        visible.delete(element);
        stop(element);
      }
    }
  }, { threshold: MINIMUM_VISIBLE_RATIO });
  const onVisibility = () => {
    for (const element of visible) {
      if (document.visibilityState === "hidden") stop(element);
      else start(element);
    }
  };
  const onClick = (event: MouseEvent) => {
    if (event.type === "auxclick" && event.button !== 1) return;
    const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
    const card = anchor?.closest<HTMLElement>(IMPRESSION_SELECTOR);
    if (!anchor || !card || !root.contains(card)) return;
    const data = properties(card);
    const target = new URL((anchor as HTMLAnchorElement).href, location.href);
    const match = target.pathname.match(/^(?:\/(?:zh|en))?\/styles\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/);
    // Ignore favorite/kit actions and links to other resources inside a card.
    if (!data || target.origin !== location.origin || match?.[1] !== data.slug) return;
    trackEvent("catalog_click", data);
  };
  root.querySelectorAll<HTMLElement>(IMPRESSION_SELECTOR).forEach((element) => observer?.observe(element));
  document.addEventListener("visibilitychange", onVisibility);
  root.addEventListener("click", onClick, true);
  root.addEventListener("auxclick", onClick, true);
  return () => {
    observer?.disconnect();
    for (const timer of timers.values()) clearTimeout(timer);
    document.removeEventListener("visibilitychange", onVisibility);
    root.removeEventListener("click", onClick, true);
    root.removeEventListener("auxclick", onClick, true);
  };
}
