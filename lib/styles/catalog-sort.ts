import type { StyleStatsEntry } from "./catalog-stats";

/**
 * Catalog sort options and the pure comparators behind them.
 *
 * Kept free of React so the ordering rules - especially the smoothed rating
 * score - can be unit tested without rendering the catalog.
 */

export type CatalogSortOption =
  | "recommended"
  | "name-asc"
  | "name-desc"
  | "popular"
  | "favorites"
  | "rating";

export const CATALOG_SORT_OPTIONS: readonly CatalogSortOption[] = [
  "recommended",
  "name-asc",
  "name-desc",
  "popular",
  "favorites",
  "rating",
];

/** Sorts that need the aggregate stats payload before they can order anything. */
export const STATS_DRIVEN_SORTS: readonly CatalogSortOption[] = [
  "popular",
  "favorites",
  "rating",
];

/**
 * Votes required before a style's own average outweighs the catalog average.
 * Low enough to let real signal surface, high enough that a single 5-star vote
 * cannot top the chart while the rating pool is still tiny.
 */
export const RATING_CONFIDENCE_VOTES = 5;
/** Prior used when nothing has been rated yet. */
export const RATING_FALLBACK_MEAN = 3.5;

export type CatalogStats = Record<string, StyleStatsEntry>;

interface SortableStyle {
  slug: string;
  name: string;
  nameEn?: string;
}

export function isStatsDrivenSort(sort: CatalogSortOption): boolean {
  return STATS_DRIVEN_SORTS.includes(sort);
}

export function parseCatalogSort(value: string | null | undefined): CatalogSortOption {
  return CATALOG_SORT_OPTIONS.includes(value as CatalogSortOption)
    ? (value as CatalogSortOption)
    : "recommended";
}

/** Mean rating across styles that have at least one vote. */
export function catalogRatingMean(stats: CatalogStats | undefined): number {
  if (!stats) return RATING_FALLBACK_MEAN;

  let weightedTotal = 0;
  let votes = 0;

  for (const entry of Object.values(stats)) {
    if (!entry || entry.totalRatings <= 0) continue;
    weightedTotal += entry.averageRating * entry.totalRatings;
    votes += entry.totalRatings;
  }

  return votes > 0 ? weightedTotal / votes : RATING_FALLBACK_MEAN;
}

/**
 * Bayesian-smoothed rating (the IMDb weighted-rating formula). Pulls sparse
 * averages toward the catalog mean so ordering stays sane at six total votes
 * and sharpens on its own as votes accumulate.
 */
export function smoothedRating(
  entry: StyleStatsEntry | undefined,
  catalogMean: number
): number {
  const votes = entry?.totalRatings ?? 0;
  const average = entry?.averageRating ?? 0;
  if (votes <= 0) return catalogMean;

  const weight = votes / (votes + RATING_CONFIDENCE_VOTES);
  return weight * average + (1 - weight) * catalogMean;
}

function compareName(left: SortableStyle, right: SortableStyle): number {
  const leftName = (left.nameEn || left.name).toLowerCase();
  const rightName = (right.nameEn || right.name).toLowerCase();
  return leftName.localeCompare(rightName);
}

/**
 * Order the catalog. `recommended` preserves the curated registry order, so it
 * returns the input array untouched; every other option returns a new array.
 */
export function sortCatalogStyles<T extends SortableStyle>(
  styles: T[],
  sort: CatalogSortOption,
  stats?: CatalogStats
): T[] {
  if (sort === "recommended") return styles;

  if (sort === "name-asc" || sort === "name-desc") {
    const byName = [...styles].sort(compareName);
    return sort === "name-desc" ? byName.reverse() : byName;
  }

  const catalogMean = catalogRatingMean(stats);

  return [...styles].sort((left, right) => {
    const leftStats = stats?.[left.slug];
    const rightStats = stats?.[right.slug];

    if (sort === "popular") {
      const byUsage = (rightStats?.usage ?? 0) - (leftStats?.usage ?? 0);
      if (byUsage !== 0) return byUsage;
      const byViews = (rightStats?.views ?? 0) - (leftStats?.views ?? 0);
      if (byViews !== 0) return byViews;
      return compareName(left, right);
    }

    if (sort === "favorites") {
      const byFavorites = (rightStats?.favorites ?? 0) - (leftStats?.favorites ?? 0);
      if (byFavorites !== 0) return byFavorites;
      const byUsage = (rightStats?.usage ?? 0) - (leftStats?.usage ?? 0);
      if (byUsage !== 0) return byUsage;
      return compareName(left, right);
    }

    const byScore =
      smoothedRating(rightStats, catalogMean) - smoothedRating(leftStats, catalogMean);
    if (Math.abs(byScore) > Number.EPSILON) return byScore;
    const byVotes = (rightStats?.totalRatings ?? 0) - (leftStats?.totalRatings ?? 0);
    if (byVotes !== 0) return byVotes;
    const byUsage = (rightStats?.usage ?? 0) - (leftStats?.usage ?? 0);
    if (byUsage !== 0) return byUsage;
    return compareName(left, right);
  });
}
