import { trackEvent } from "@/lib/analytics/events";

export interface CatalogImpressionContext {
  contextKey: string;
  sort: string | null;
  filterCount: number;
  queryPresent: boolean;
}

const IMPRESSION_SELECTOR = "[data-catalog-style-slug][data-catalog-style-rank]";
const MINIMUM_VISIBLE_RATIO = 0.5;

export function observeCatalogImpressions(
  root: HTMLElement,
  context: CatalogImpressionContext,
  seen: Set<string>,
): () => void {
  if (typeof IntersectionObserver === "undefined") {
    return () => undefined;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < MINIMUM_VISIBLE_RATIO) {
          continue;
        }

        const element = entry.target as HTMLElement;
        const slug = element.dataset.catalogStyleSlug?.trim();
        const rank = Number.parseInt(element.dataset.catalogStyleRank ?? "", 10);
        if (!slug || !Number.isInteger(rank) || rank < 1) {
          observer.unobserve(element);
          continue;
        }

        const impressionKey = `${context.contextKey}:${slug}:${rank}`;
        if (!seen.has(impressionKey)) {
          seen.add(impressionKey);
          trackEvent("catalog_impression", {
            slug,
            rank,
            surface: "styles_catalog",
            page: 1,
            sort: context.sort,
            collection_slug: null,
            filter_count: context.filterCount,
            query_present: context.queryPresent,
          });
        }

        observer.unobserve(element);
      }
    },
    { threshold: MINIMUM_VISIBLE_RATIO },
  );

  root.querySelectorAll<HTMLElement>(IMPRESSION_SELECTOR).forEach((element) => {
    observer.observe(element);
  });

  return () => observer.disconnect();
}
