"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { StyleCard } from "@/components/home/style-card";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { Input } from "@/components/ui/input";
import { useStyleStats } from "@/lib/swr";
import {
  isStatsDrivenSort,
  sortCatalogStyles,
  type CatalogSortOption,
} from "@/lib/styles/catalog-sort";
import type { StyleCategory, StyleMeta, StyleTag } from "@/lib/styles/meta";

/**
 * Community catalog browser.
 *
 * The initial list remains server-rendered and linkable for crawlers. Search
 * and taxonomy filters are progressive enhancement for readers who already
 * have the catalog in the browser; they do not hide the underlying content
 * from search engines.
 */

const SORTS: { value: CommunitySort; en: string; zh: string }[] = [
  { value: "newest", en: "Newest", zh: "最新" },
  { value: "popular", en: "Popular", zh: "热门" },
  { value: "rating", en: "Top rated", zh: "评分" },
  { value: "favorites", en: "Most saved", zh: "收藏" },
];

type CommunitySort = "newest" | "popular" | "rating" | "favorites";

const CATEGORY_LABELS: Record<StyleCategory, { en: string; zh: string }> = {
  modern: { en: "Modern", zh: "现代" },
  retro: { en: "Retro", zh: "复古" },
  minimal: { en: "Minimal", zh: "极简" },
  expressive: { en: "Expressive", zh: "表现力" },
};

const TAG_LABELS: Partial<Record<StyleTag, { en: string; zh: string }>> = {
  "high-contrast": { en: "High contrast", zh: "高对比" },
  responsive: { en: "Responsive", zh: "响应式" },
  "brand-inspired": { en: "Brand-inspired", zh: "品牌灵感" },
  "dark-theme": { en: "Dark theme", zh: "深色主题" },
  colorful: { en: "Colorful", zh: "多彩" },
  "hand-drawn": { en: "Hand-drawn", zh: "手绘" },
  glassmorphic: { en: "Glassmorphic", zh: "玻璃拟态" },
  gradient: { en: "Gradient", zh: "渐变" },
  geometric: { en: "Geometric", zh: "几何" },
  "game-ui": { en: "Game UI", zh: "游戏 UI" },
  "anime-aesthetic": { en: "Anime aesthetic", zh: "动漫美学" },
  "texture-heavy": { en: "Texture-heavy", zh: "高纹理" },
  retro: { en: "Retro", zh: "复古" },
};

function labelForTag(tag: StyleTag, locale: "en" | "zh"): string {
  return TAG_LABELS[tag]?.[locale] ?? tag.replaceAll("-", " ");
}

export interface CommunityStyleItem extends StyleMeta {
  /** Review timestamp, used for the newest-first default. */
  publishedAt?: string;
  promoted?: boolean;
}

interface Props {
  styles: CommunityStyleItem[];
  locale: "en" | "zh";
  copy: {
    submit: string;
    emptyTitle: string;
    emptyBody: string;
    sortLabel: string;
    promoted: string;
    searchLabel: string;
    searchPlaceholder: string;
    categoryLabel: string;
    tagLabel: string;
    all: string;
    clearFilters: string;
    resultCount: (n: number) => string;
    filteredEmptyTitle: string;
    filteredEmptyBody: string;
  };
}

export function CommunityCatalog({ styles, locale, copy }: Props) {
  const [sort, setSort] = useState<CommunitySort>("newest");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<StyleCategory | "all">("all");
  const [tag, setTag] = useState<StyleTag | "all">("all");

  const categories = useMemo(
    () =>
      Array.from(new Set(styles.map((style) => style.category))).sort(),
    [styles]
  );
  const tags = useMemo(
    () =>
      Array.from(new Set(styles.flatMap((style) => style.tags))).sort(),
    [styles]
  );
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const hasFilters = Boolean(normalizedQuery) || category !== "all" || tag !== "all";

  const filtered = useMemo(() => {
    return styles.filter((style) => {
      if (category !== "all" && style.category !== category) return false;
      if (tag !== "all" && !style.tags.includes(tag)) return false;
      if (!normalizedQuery) return true;

      const searchable = [
        style.name,
        style.nameEn,
        style.description,
        style.descriptionEn,
        style.category,
        ...style.tags,
        ...style.keywords,
      ]
        .join(" ")
        .toLocaleLowerCase();
      return searchable.includes(normalizedQuery);
    });
  }, [category, normalizedQuery, styles, tag]);

  // Only the stats-driven sorts need the aggregate payload, so the default
  // view costs no extra request.
  const needsStats = sort !== "newest" && isStatsDrivenSort(sort as CatalogSortOption);
  const { data: statsData } = useStyleStats(needsStats);

  const ordered = useMemo(() => {
    if (sort === "newest") {
      return [...filtered].sort((left, right) =>
        (right.publishedAt ?? "").localeCompare(left.publishedAt ?? "")
      );
    }
    return sortCatalogStyles(filtered, sort as CatalogSortOption, statsData?.stats);
  }, [filtered, sort, statsData]);

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setTag("all");
  }

  if (styles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center">
        <h2 className="font-serif text-xl">{copy.emptyTitle}</h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {copy.emptyBody}
        </p>
        <LocalizedLink
          href="/submit"
          className="mt-6 inline-flex h-10 items-center rounded-md border border-foreground px-4 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
        >
          {copy.submit}
        </LocalizedLink>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="max-w-xl">
          <label
            htmlFor="community-style-search"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            {copy.searchLabel}
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="community-style-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.searchPlaceholder}
              className="pl-9 pr-10"
            />
            {query ? (
              <button
                type="button"
                aria-label={copy.clearFilters}
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2" aria-label={copy.categoryLabel}>
          <span className="mr-1 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {copy.categoryLabel}
          </span>
          <button
            type="button"
            onClick={() => setCategory("all")}
            aria-pressed={category === "all"}
            className={`h-8 rounded-md border px-3 text-xs transition-colors ${
              category === "all"
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            {copy.all}
          </button>
          {categories.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              aria-pressed={category === option}
              className={`h-8 rounded-md border px-3 text-xs transition-colors ${
                category === option
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {CATEGORY_LABELS[option][locale]}
            </button>
          ))}
        </div>

        {tags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2" aria-label={copy.tagLabel}>
            <span className="mr-1 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {copy.tagLabel}
            </span>
            <button
              type="button"
              onClick={() => setTag("all")}
              aria-pressed={tag === "all"}
              className={`h-8 rounded-md border px-3 text-xs transition-colors ${
                tag === "all"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {copy.all}
            </button>
            {tags.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTag(option)}
                aria-pressed={tag === option}
                className={`h-8 rounded-md border px-3 text-xs transition-colors ${
                  tag === option
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {labelForTag(option, locale)}
              </button>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {copy.sortLabel}
          </span>
          {SORTS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSort(option.value)}
              aria-pressed={sort === option.value}
              className={`h-8 rounded-md border px-3 text-xs transition-colors ${
                sort === option.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {locale === "zh" ? option.zh : option.en}
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-muted-foreground">
            {copy.resultCount(ordered.length)}
          </span>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="h-8 rounded-md px-2 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              {copy.clearFilters}
            </button>
          ) : null}
        </div>
      </div>

      {ordered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center">
          <h2 className="font-serif text-xl">{copy.filteredEmptyTitle}</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {copy.filteredEmptyBody}
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 inline-flex h-10 items-center rounded-md border border-foreground px-4 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
          >
            {copy.clearFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-8 lg:grid-cols-3">
          {ordered.map((style) => (
            <StyleCard
              key={style.slug}
              style={style}
              variant="compact"
              basePath="/community"
              badge={style.promoted ? copy.promoted : undefined}
            />
          ))}
        </div>
      )}
    </>
  );
}
