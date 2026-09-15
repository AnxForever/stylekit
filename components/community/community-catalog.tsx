"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
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
import {
  filterCommunityStyles,
  readCommunityCatalogFilters,
  updateCommunityCatalogQuery,
  type CommunityCatalogFilters,
  type CommunitySort,
} from "@/lib/community/catalog-query";
import { getCommunityStyleBasePath } from "@/lib/community/style-path";

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
  curated?: boolean;
  authorName?: string;
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
    curated: string;
    searchLabel: string;
    searchPlaceholder: string;
    categoryLabel: string;
    tagLabel: string;
    all: string;
    clearFilters: string;
    filteredEmptyTitle: string;
    filteredEmptyBody: string;
  };
}

export function CommunityCatalog({ styles, locale, copy }: Props) {
  const searchParams = useSearchParams();
  const filters = readCommunityCatalogFilters(searchParams);
  const { sort, query, category, tag } = filters;

  function updateFilters(patch: Partial<CommunityCatalogFilters>, replace = false) {
    const next = updateCommunityCatalogQuery(new URLSearchParams(window.location.search), patch);
    const href = `${window.location.pathname}${next ? `?${next}` : ""}${window.location.hash}`;
    if (replace) window.history.replaceState(null, "", href);
    else window.history.pushState(null, "", href);
  }

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

  const filtered = filterCommunityStyles(styles, filters);

  // Only the stats-driven sorts need the aggregate payload, so the default
  // view costs no extra request.
  const needsStats = sort !== "newest" && isStatsDrivenSort(sort as CatalogSortOption);
  const { data: statsData, error: statsError, isLoading: statsLoading, mutate: retryStats } = useStyleStats(needsStats);

  const ordered = useMemo(() => {
    if (sort === "newest") {
      return [...filtered].sort((left, right) =>
        (right.publishedAt ?? "").localeCompare(left.publishedAt ?? "")
      );
    }
    return sortCatalogStyles(filtered, sort as CatalogSortOption, statsData?.stats);
  }, [filtered, sort, statsData]);

  function clearFilters() {
    updateFilters({ query: "", category: "all", tag: "all" });
  }

  // Kept in the client component: a copy function passed from a server
  // component cannot be serialized across the RSC boundary.
  const resultCountLabel =
    locale === "zh"
      ? `${ordered.length} 个结果`
      : `${ordered.length} ${ordered.length === 1 ? "result" : "results"}`;

  if (styles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border px-6 py-10 text-center">
        <h3 className="font-serif text-xl">{copy.emptyTitle}</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
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
            className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted"
          >
            {copy.searchLabel}
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            />
            <Input
              id="community-style-search"
              type="search"
              maxLength={120}
              value={query}
              onChange={(event) => updateFilters({ query: event.target.value }, true)}
              placeholder={copy.searchPlaceholder}
              className="pl-9 pr-10"
            />
            {query ? (
              <button
                type="button"
                aria-label={copy.clearFilters}
                onClick={() => updateFilters({ query: "" }, true)}
                className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted transition-colors hover:bg-muted/30 hover:text-foreground"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2" aria-label={copy.categoryLabel}>
          <span className="mr-1 font-mono text-xs uppercase tracking-[0.15em] text-muted">
            {copy.categoryLabel}
          </span>
          <button
            type="button"
            onClick={() => updateFilters({ category: "all" })}
            aria-pressed={category === "all"}
            className={`min-h-10 rounded-md border px-3 text-xs transition-colors ${
              category === "all"
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted hover:border-foreground hover:text-foreground"
            }`}
          >
            {copy.all}
          </button>
          {categories.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateFilters({ category: option })}
              aria-pressed={category === option}
              className={`min-h-10 rounded-md border px-3 text-xs transition-colors ${
                category === option
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-foreground hover:text-foreground"
              }`}
            >
              {CATEGORY_LABELS[option][locale]}
            </button>
          ))}
        </div>

        {tags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2" aria-label={copy.tagLabel}>
            <span className="mr-1 font-mono text-xs uppercase tracking-[0.15em] text-muted">
              {copy.tagLabel}
            </span>
            <button
              type="button"
              onClick={() => updateFilters({ tag: "all" })}
              aria-pressed={tag === "all"}
              className={`min-h-10 rounded-md border px-3 text-xs transition-colors ${
                tag === "all"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-foreground hover:text-foreground"
              }`}
            >
              {copy.all}
            </button>
            {tags.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => updateFilters({ tag: option })}
                aria-pressed={tag === option}
                className={`min-h-10 rounded-md border px-3 text-xs transition-colors ${
                  tag === option
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted hover:border-foreground hover:text-foreground"
                }`}
              >
                {labelForTag(option, locale)}
              </button>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
            {copy.sortLabel}
          </span>
          {SORTS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateFilters({ sort: option.value })}
              aria-pressed={sort === option.value}
              className={`min-h-10 rounded-md border px-3 text-xs transition-colors ${
                sort === option.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-foreground hover:text-foreground"
              }`}
            >
              {locale === "zh" ? option.zh : option.en}
            </button>
          ))}
          <span role="status" aria-live="polite" aria-atomic="true" className="ml-auto text-xs text-muted">
            {resultCountLabel}
          </span>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="min-h-10 rounded-md px-2 text-xs text-muted underline-offset-4 hover:text-foreground hover:underline"
            >
              {copy.clearFilters}
            </button>
          ) : null}
        </div>
      </div>

      {needsStats && statsLoading ? (
        <p role="status" className="mb-4 text-sm text-muted">{locale === "zh" ? "正在加载排序数据…" : "Loading ranking data…"}</p>
      ) : null}
      {needsStats && statsError ? (
        <div role="status" className="mb-5 flex flex-wrap items-center gap-3 text-sm text-muted">
          <p>{locale === "zh" ? "排序数据暂时不可用，当前顺序不代表热度或评分。" : "Ranking data is unavailable. This order does not represent popularity or ratings."}</p>
          <button type="button" onClick={() => void retryStats()} className="min-h-10 px-2 text-foreground underline underline-offset-4">
            {locale === "zh" ? "重试" : "Retry"}
          </button>
        </div>
      ) : null}

      {ordered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border px-6 py-10 text-center">
          <h3 className="font-serif text-xl">{copy.filteredEmptyTitle}</h3>
          <p className="mt-2 max-w-sm text-sm text-muted">
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
          {ordered.map((style) => {
            const published = style.publishedAt && Number.isFinite(Date.parse(style.publishedAt))
              ? new Date(style.publishedAt)
              : null;
            return (
              <div key={style.slug} className="min-w-0">
                <StyleCard
                  style={style}
                  variant="compact"
                  basePath={getCommunityStyleBasePath(style)}
                  badge={style.curated ? copy.curated : style.promoted ? copy.promoted : undefined}
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-muted">
                  <span className="min-w-0 break-words">{style.authorName || (locale === "zh" ? "社区贡献者" : "Community contributor")}</span>
                  {published ? (
                    <time dateTime={published.toISOString()}>
                      {new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
                        year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
                      }).format(published)}
                    </time>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
