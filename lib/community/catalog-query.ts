import {
  STYLE_CATEGORIES,
  STYLE_TAGS,
  type StyleCategory,
  type StyleMeta,
  type StyleTag,
} from "@/lib/styles/meta";

export const COMMUNITY_SORTS = ["newest", "popular", "rating", "favorites"] as const;
export type CommunitySort = (typeof COMMUNITY_SORTS)[number];

export interface CommunityCatalogFilters {
  query: string;
  category: StyleCategory | "all";
  tag: StyleTag | "all";
  sort: CommunitySort;
}

function isOption<T extends string>(value: string | null, options: readonly T[]): value is T {
  return value !== null && options.some((option) => option === value);
}

export function readCommunityCatalogFilters(
  params: Pick<URLSearchParams, "get">
): CommunityCatalogFilters {
  const category = params.get("category");
  const tag = params.get("tag");
  const sort = params.get("sort");
  return {
    query: (params.get("q") ?? "").slice(0, 120),
    category: isOption(category, STYLE_CATEGORIES) ? category : "all",
    tag: isOption(tag, STYLE_TAGS) ? tag : "all",
    sort: isOption(sort, COMMUNITY_SORTS) ? sort : "newest",
  };
}

export function updateCommunityCatalogQuery(
  current: URLSearchParams,
  patch: Partial<CommunityCatalogFilters>
): string {
  const next = new URLSearchParams(current);
  const filters = { ...readCommunityCatalogFilters(current), ...patch };
  const values = {
    q: filters.query.trim() ? filters.query.slice(0, 120) : "",
    category: filters.category === "all" ? "" : filters.category,
    tag: filters.tag === "all" ? "" : filters.tag,
    sort: filters.sort === "newest" ? "" : filters.sort,
  };
  for (const [key, value] of Object.entries(values)) {
    if (value) next.set(key, value);
    else next.delete(key);
  }
  return next.toString();
}

export function filterCommunityStyles<T extends StyleMeta>(
  styles: T[],
  filters: CommunityCatalogFilters
): T[] {
  const query = filters.query.trim().toLowerCase();
  return styles.filter((style) => {
    if (filters.category !== "all" && style.category !== filters.category) return false;
    if (filters.tag !== "all" && !style.tags.includes(filters.tag)) return false;
    if (!query) return true;
    return [
      style.name,
      style.nameEn,
      style.description,
      style.descriptionEn,
      style.category,
      ...style.tags,
      ...style.keywords,
    ].join(" ").toLowerCase().includes(query);
  });
}
