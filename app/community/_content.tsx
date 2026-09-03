"use client";

import { useMemo, useState } from "react";
import { StyleCard } from "@/components/home/style-card";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { useStyleStats } from "@/lib/swr";
import {
  isStatsDrivenSort,
  sortCatalogStyles,
  type CatalogSortOption,
} from "@/lib/styles/catalog-sort";
import type { StyleMeta } from "@/lib/styles/meta";

/**
 * Community catalog browser.
 *
 * Deliberately not the curated `StylesContent`: that component fetches
 * `/api/styles` for its own data and carries catalog-only concerns (scenario
 * filters, kit building, visual-baseline hooks). Reusing the sort module and
 * the card keeps the ordering rules identical without dragging that surface in.
 */

// Community entries have no curated registry order to preserve, so
// "recommended" would be meaningless here; newest-first is the honest default.
const SORTS: { value: CommunitySort; en: string; zh: string }[] = [
  { value: "newest", en: "Newest", zh: "最新" },
  { value: "popular", en: "Popular", zh: "热门" },
  { value: "rating", en: "Top rated", zh: "评分" },
  { value: "favorites", en: "Most saved", zh: "收藏" },
];

type CommunitySort = "newest" | "popular" | "rating" | "favorites";

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
  };
}

export function CommunityCatalog({ styles, locale, copy }: Props) {
  const [sort, setSort] = useState<CommunitySort>("newest");

  // Only the stats-driven sorts need the aggregate payload, so the default
  // view costs no extra request.
  const needsStats = sort !== "newest" && isStatsDrivenSort(sort as CatalogSortOption);
  const { data: statsData } = useStyleStats(needsStats);

  const ordered = useMemo(() => {
    if (sort === "newest") {
      return [...styles].sort((left, right) =>
        (right.publishedAt ?? "").localeCompare(left.publishedAt ?? "")
      );
    }
    return sortCatalogStyles(styles, sort as CatalogSortOption, statsData?.stats);
  }, [styles, sort, statsData]);

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
      <div className="mb-6 flex flex-wrap items-center gap-2">
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
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-8 lg:grid-cols-3">
        {ordered.map((style) => (
          <div key={style.slug} className="relative">
            {style.promoted ? (
              <span className="absolute -top-2 left-2 z-20 rounded-full border border-foreground bg-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                {copy.promoted}
              </span>
            ) : null}
            <StyleCard style={style} variant="compact" basePath="/community" />
          </div>
        ))}
      </div>
    </>
  );
}
