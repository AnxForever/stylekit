"use client";

import { useState, useTransition, useDeferredValue, useMemo, useCallback, useRef, useEffect, useId, type ReactNode } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { useFavorites } from "@/lib/favorites/context";
import { StyleCard } from "@/components/home/style-card";
import { Heart, Layers, Paintbrush, Loader2, ChevronDown, Search, X } from "lucide-react";
import type { StyleMeta, StyleType, StyleTag } from "@/lib/styles/meta";
import {
  getScenarioLabel,
  getStyleScenarios,
  STYLE_SCENARIOS,
  type StyleScenario,
} from "@/lib/styles/scenarios";
import { useCatalogStyles } from "@/lib/swr";

type TypeFilter = StyleType | "all";
type SortOption = "recommended" | "name-asc" | "name-desc";

interface StylesContentProps {
  allStyles: StyleMeta[];
}

interface SearchParamsLike {
  get(name: string): string | null;
}

function parseStylesSearchParams(searchParams: SearchParamsLike | null) {
  const typeParam = searchParams?.get("type");
  const type: TypeFilter =
    typeParam === "visual" || typeParam === "layout" ? typeParam : "all";

  const tags = (searchParams?.get("tags") ?? "")
    .split(",")
    .filter(Boolean)
    .filter((tag: string): tag is StyleTag => [
      "modern",
      "expressive",
      "minimal",
      "retro",
      "high-contrast",
      "responsive",
      "brand-inspired",
    ].includes(tag));

  const showFavorites = searchParams?.get("fav") === "1";
  const sortParam = searchParams?.get("sort");
  const sort: SortOption =
    sortParam === "name-asc" || sortParam === "name-desc"
      ? sortParam
      : "recommended";
  const query = searchParams?.get("q") ?? "";
  const scenarioParam = searchParams?.get("scenario");
  const scenario: StyleScenario | "all" = STYLE_SCENARIOS.includes(scenarioParam as StyleScenario)
    ? (scenarioParam as StyleScenario)
    : "all";

  return {
    type,
    tags,
    showFavorites,
    sort,
    query,
    scenario,
  };
}

export function StylesContent({ allStyles }: StylesContentProps) {
  const { t, locale } = useI18n();
  const tagTriggerId = useId();
  const tagListboxId = useId();
  const { favorites } = useFavorites();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const parsedSearchParams = useMemo(
    () => parseStylesSearchParams(searchParams),
    [searchParams]
  );
  const { data: catalogStylesData } = useCatalogStyles();
  const catalogStyles: StyleMeta[] = catalogStylesData?.styles ?? allStyles;
  const searchInputRef = useRef<HTMLInputElement>(null);
  const hasMountedQuerySyncRef = useRef(false);

  const [activeType, setActiveType] = useState<TypeFilter>(parsedSearchParams.type);
  const [activeTags, setActiveTags] = useState<StyleTag[]>(parsedSearchParams.tags);
  const [showFavorites, setShowFavorites] = useState(parsedSearchParams.showFavorites);
  const [sortBy, setSortBy] = useState<SortOption>(parsedSearchParams.sort);
  const [searchQuery, setSearchQuery] = useState(parsedSearchParams.query);
  const [activeScenario, setActiveScenario] = useState<StyleScenario | "all">(parsedSearchParams.scenario);
  const [isPending, startTransition] = useTransition();
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const tagDropdownRef = useRef<HTMLDivElement>(null);
  const activeTagsKey = activeTags.join(",");
  const deferredActiveType = useDeferredValue(activeType);
  const deferredShowFavorites = useDeferredValue(showFavorites);
  const deferredSortBy = useDeferredValue(sortBy);
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const deferredActiveScenario = useDeferredValue(activeScenario);
  const trimmedSearchQuery = searchQuery.trim();
  const trimmedDeferredSearchQuery = deferredSearchQuery.trim().toLowerCase();
  const deferredActiveTagsKey = useDeferredValue(activeTagsKey);
  const deferredActiveTags = useMemo(
    () => (
      deferredActiveTagsKey.length > 0
        ? (deferredActiveTagsKey.split(",") as StyleTag[])
        : []
    ),
    [deferredActiveTagsKey]
  );
  const styleScenarios = useMemo(
    () => new Map(catalogStyles.map((style) => [style.slug, getStyleScenarios(style)])),
    [catalogStyles]
  );

  useEffect(() => {
    setActiveType(parsedSearchParams.type);
    setActiveTags(parsedSearchParams.tags);
    setShowFavorites(parsedSearchParams.showFavorites);
    setSortBy(parsedSearchParams.sort);
    setSearchQuery(parsedSearchParams.query);
    setActiveScenario(parsedSearchParams.scenario);
  }, [parsedSearchParams]);

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target as Node)) {
        setTagDropdownOpen(false);
      }
    };
    if (tagDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [tagDropdownOpen]);

  // 页面加载时恢复滚动位置
  // 重要：在 state 状态确定后才恢复滚动，避免state改变时被打断
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("styles-scroll-position");
    if (savedScroll) {
      const y = parseInt(savedScroll, 10);
      // 使用更大的延迟以确保：
      // 1. DOM 完全渲染
      // 2. 所有state都已稳定
      // 3. 列表已根据filter重新排列
      setTimeout(() => {
        window.scrollTo({ top: y, behavior: "instant" });
      }, 150);
      // 恢复后清除，避免刷新页面也滚动
      sessionStorage.removeItem("styles-scroll-position");
    }
  }, []);

  // 兜底恢复 filter 状态：当从 showcase 直接跳到 /styles 时（绕过 ScrollBackButton）
  useEffect(() => {
    const savedUrl = sessionStorage.getItem("styles-return-url");
    if (savedUrl) {
      const current = window.location.search;
      if (!current) {
        try {
          const url = new URL(savedUrl);
          if (url.search) {
            sessionStorage.removeItem("styles-return-url");
            router.replace(url.pathname + url.search, { scroll: false });
          }
        } catch {
          // ignore invalid URL
        }
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleGlobalSearchShortcut = (event: KeyboardEvent) => {
      if (event.key !== "/") return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      event.preventDefault();
      searchInputRef.current?.focus();
    };

    window.addEventListener("keydown", handleGlobalSearchShortcut);
    return () => window.removeEventListener("keydown", handleGlobalSearchShortcut);
  }, []);

  const syncToUrl = useCallback(
    (
      type: TypeFilter,
      tags: StyleTag[],
      fav: boolean,
      sort: SortOption,
      query: string,
      scenario: StyleScenario | "all"
    ) => {
      const sp = new URLSearchParams();
      if (type && type !== "all") sp.set("type", type);
      if (tags.length > 0) sp.set("tags", tags.join(","));
      if (fav) sp.set("fav", "1");
      if (sort !== "recommended") sp.set("sort", sort);
      if (query.trim().length > 0) sp.set("q", query.trim());
      if (scenario !== "all") sp.set("scenario", scenario);

      const qs = sp.toString();
      const newUrl = qs ? `${pathname}?${qs}` : pathname;

      router.replace(newUrl, { scroll: false });
    },
    [pathname, router]
  );

  // Type filter 配置
  const typeFilters: { key: TypeFilter; label: string; icon?: ReactNode }[] = useMemo(
    () => [
      { key: "all", label: t("styles.typeAll") },
      { key: "visual", label: t("styles.typeVisual"), icon: <Paintbrush className="w-3.5 h-3.5" /> },
      { key: "layout", label: t("styles.typeLayout"), icon: <Layers className="w-3.5 h-3.5" /> },
    ],
    [t]
  );

  // Tag filter 配置
  const availableTags: StyleTag[] = [
    "modern",
    "expressive",
    "minimal",
    "retro",
    "high-contrast",
    "responsive",
    "brand-inspired",
  ];

  const tagLabels: Record<StyleTag, string> = useMemo(
    () => ({
      modern: t("styles.tagModern"),
      expressive: t("styles.tagExpressive"),
      minimal: t("styles.tagMinimal"),
      retro: t("styles.tagRetro"),
      "high-contrast": t("styles.tagHighContrast"),
      responsive: t("styles.tagResponsive"),
      "brand-inspired": t("styles.tagBrandInspired"),
    }),
    [t]
  );
  const activeFilterSummary = useMemo(() => {
    const parts: string[] = [];

    if (activeScenario !== "all") {
      parts.push(`${locale === "zh" ? "场景" : "Scenario"}: ${getScenarioLabel(activeScenario, locale)}`);
    }

    if (activeType !== "all") {
      parts.push(`${t("styles.type")}: ${typeFilters.find((item) => item.key === activeType)?.label ?? activeType}`);
    }

    if (activeTags.length > 0) {
      parts.push(
        `${t("styles.tags")}: ${activeTags.map((tag) => tagLabels[tag]).join(", ")}`
      );
    }

    if (showFavorites) {
      parts.push(t("styles.favorites"));
    }

    if (sortBy !== "recommended") {
      const sortLabel = sortBy === "name-asc"
        ? t("styles.sortNameAsc")
        : t("styles.sortNameDesc");
      parts.push(`${t("styles.sort")}: ${sortLabel}`);
    }

    if (trimmedSearchQuery.length > 0) {
      parts.push(`${t("nav.search")}: ${trimmedSearchQuery}`);
    }

    return parts.join(" · ");
  }, [
    activeScenario,
    activeTags,
    activeType,
    locale,
    showFavorites,
    sortBy,
    t,
    tagLabels,
    trimmedSearchQuery,
    typeFilters,
  ]);

  const handleTypeChange = (type: TypeFilter) => {
    startTransition(() => {
      setActiveType(type);
      syncToUrl(type, activeTags, showFavorites, sortBy, searchQuery, activeScenario);
    });
  };

  const handleToggleTag = (tag: StyleTag) => {
    startTransition(() => {
      const newTags = activeTags.includes(tag)
        ? activeTags.filter((t) => t !== tag)
        : [...activeTags, tag];
      setActiveTags(newTags);
      syncToUrl(activeType, newTags, showFavorites, sortBy, searchQuery, activeScenario);
    });
  };

  const handleClearTags = () => {
    startTransition(() => {
      setActiveTags([]);
      syncToUrl(activeType, [], showFavorites, sortBy, searchQuery, activeScenario);
    });
  };

  const handleToggleFavorites = () => {
    startTransition(() => {
      const newFav = !showFavorites;
      setShowFavorites(newFav);
      syncToUrl(activeType, activeTags, newFav, sortBy, searchQuery, activeScenario);
    });
  };

  const handleSortChange = (sort: SortOption) => {
    startTransition(() => {
      setSortBy(sort);
      syncToUrl(activeType, activeTags, showFavorites, sort, searchQuery, activeScenario);
    });
  };

  const handleScenarioChange = (scenario: StyleScenario | "all") => {
    startTransition(() => {
      setActiveScenario(scenario);
      syncToUrl(activeType, activeTags, showFavorites, sortBy, searchQuery, scenario);
    });
  };

  const handleResetFilters = () => {
    startTransition(() => {
      setActiveType("all");
      setActiveTags([]);
      setShowFavorites(false);
      setSortBy("recommended");
      setSearchQuery("");
      setActiveScenario("all");
      syncToUrl("all", [], false, "recommended", "", "all");
    });
  };

  useEffect(() => {
    if (!hasMountedQuerySyncRef.current) {
      hasMountedQuerySyncRef.current = true;
      return;
    }

    const timer = window.setTimeout(() => {
      syncToUrl(activeType, activeTags, showFavorites, sortBy, searchQuery, activeScenario);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [activeScenario, activeType, activeTags, searchQuery, showFavorites, sortBy, syncToUrl]);

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  const filteredStyles = useMemo(() => {
    const base = catalogStyles
      .filter((style: StyleMeta, index: number, collection: StyleMeta[]) => (
        collection.findIndex((candidate: StyleMeta) => candidate.slug === style.slug) === index
      ))
      .filter((s: StyleMeta) => !deferredShowFavorites || favoriteSet.has(s.slug))
      .filter((s: StyleMeta) => deferredActiveType === "all" || s.styleType === deferredActiveType)
      .filter(
        (s: StyleMeta) =>
          deferredActiveTags.length === 0 ||
          deferredActiveTags.some((tag) => s.tags?.includes(tag))
      )
      .filter((style: StyleMeta) => (
        deferredActiveScenario === "all" ||
        (styleScenarios.get(style.slug) ?? []).includes(deferredActiveScenario)
      ))
      .filter((style: StyleMeta) => {
        if (!trimmedDeferredSearchQuery) return true;

        const searchableText = [
          style.slug,
          style.name,
          style.nameEn,
          style.description,
          style.styleType,
          style.category,
          ...style.tags,
          ...style.keywords,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(trimmedDeferredSearchQuery);
      });

    if (deferredSortBy === "recommended") return base;

    const sorted = [...base].sort((left, right) => {
      const leftName = (left.nameEn || left.name).toLowerCase();
      const rightName = (right.nameEn || right.name).toLowerCase();
      return leftName.localeCompare(rightName);
    });

    if (deferredSortBy === "name-desc") {
      sorted.reverse();
    }

    return sorted;
  }, [
    catalogStyles,
    deferredActiveTags,
    deferredActiveScenario,
    deferredActiveType,
    deferredShowFavorites,
    deferredSortBy,
    favoriteSet,
    styleScenarios,
    trimmedDeferredSearchQuery,
  ]);

  const hasActiveFilters =
    activeScenario !== "all" ||
    activeType !== "all" ||
    activeTags.length > 0 ||
    showFavorites ||
    sortBy !== "recommended" ||
    trimmedSearchQuery.length > 0;
  const isFiltering =
    isPending ||
    activeScenario !== deferredActiveScenario ||
    searchQuery !== deferredSearchQuery ||
    activeType !== deferredActiveType ||
    showFavorites !== deferredShowFavorites ||
    sortBy !== deferredSortBy ||
    activeTagsKey !== deferredActiveTagsKey;

  return (
    <>
      {/* Page Header */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-12">
          <p className="text-xs tracking-widest uppercase text-muted mb-3">
            {t("styles.subtitle")}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-3">
            {t("styles.title")}
          </h1>
          <p className="text-base text-muted max-w-2xl">
            {t("styles.description")}
          </p>
        </div>
      </section>

      {/* Style Grid */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
          <div className="mb-5 md:mb-7 space-y-3">
            <label htmlFor="styles-search" className="sr-only">
              {t("nav.search")}
            </label>
            <div className="relative w-full md:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted" />
              <input
                ref={searchInputRef}
                id="styles-search"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setSearchQuery("");
                  }
                }}
                aria-keyshortcuts="/"
                placeholder={
                  locale === "zh"
                    ? "按名称、关键词或场景搜索风格"
                    : "Search styles by name, keyword, or use case"
                }
                className="w-full h-10 pl-10 pr-3 text-sm border border-border bg-background focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
            <p className="hidden sm:block text-xs text-muted">
              {locale === "zh"
                ? "提示：按 / 可快速聚焦搜索，按 Esc 可清空。"
                : "Tip: press / to focus search, and Esc to clear."}
            </p>
            <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-2 md:flex-wrap md:overflow-visible items-center">
              <span className="text-[11px] tracking-[0.16em] uppercase text-muted shrink-0">
                {locale === "zh" ? "按场景进入" : "Explore by goal"}
              </span>
              <button
                type="button"
                onClick={() => handleScenarioChange("all")}
                className={`shrink-0 px-3 py-1.5 md:px-4 md:py-2.5 min-h-[44px] sm:min-h-0 text-xs tracking-wide border transition-colors ${
                  activeScenario === "all"
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted hover:text-foreground hover:border-foreground"
                }`}
              >
                {locale === "zh" ? "全部" : "All"}
              </button>
              {STYLE_SCENARIOS.map((scenario) => {
                const isActive = activeScenario === scenario;

                return (
                  <button
                    key={scenario}
                    type="button"
                    onClick={() => handleScenarioChange(isActive ? "all" : scenario)}
                    className={`shrink-0 px-3 py-1.5 md:px-4 md:py-2.5 min-h-[44px] sm:min-h-0 text-xs tracking-wide border transition-colors ${
                      isActive
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted hover:text-foreground hover:border-foreground"
                    }`}
                  >
                    {getScenarioLabel(scenario, locale)}
                  </button>
                );
              })}
            </div>
              {(trimmedSearchQuery.length > 0 || activeScenario !== "all") && (
                <button
                  type="button"
                  onClick={() => startTransition(() => {
                    setSearchQuery("");
                    setActiveScenario("all");
                    syncToUrl(activeType, activeTags, showFavorites, sortBy, "", "all");
                  })}
                  className="text-xs text-muted hover:text-foreground transition-colors"
                >
                  {locale === "zh" ? "清空搜索" : "Clear Search"}
              </button>
            )}
            {hasActiveFilters && activeFilterSummary.length > 0 && (
              <p className="text-xs text-muted">
                {locale === "zh" ? "当前筛选" : "Active filters"}: {activeFilterSummary}
              </p>
            )}
          </div>

          {/* Type Filter */}
          <div className="flex flex-nowrap overflow-x-auto scrollbar-hide md:flex-wrap md:overflow-visible items-center gap-3 mb-4 text-sm">
            <span className="text-muted shrink-0">{t("styles.type")}:</span>
            {typeFilters.map((type) => (
              <button
                key={type.key}
                onClick={() => handleTypeChange(type.key)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] sm:min-h-0 transition-colors ${
                  activeType === type.key
                    ? "bg-foreground text-background"
                    : "border border-border hover:border-foreground"
                }`}
              >
                {type.icon}
                {type.label}
              </button>
            ))}

            {/* Favorites toggle */}
            <button
              onClick={handleToggleFavorites}
              aria-label={t("styles.favorites")}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] sm:min-h-0 transition-colors ml-auto ${
                showFavorites
                  ? "bg-foreground text-background"
                  : "border border-border hover:border-foreground"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showFavorites ? "fill-current" : ""}`} />
              <span>{t("styles.favorites")}</span>
              <span>({favorites.length})</span>
            </button>
          </div>

          {/* Tag Filter - Dropdown */}
          <div className="flex flex-wrap items-center gap-2 mb-8 md:mb-12 text-sm">
            <span className="text-muted">{t("styles.tags")}:</span>
            <div ref={tagDropdownRef} className="relative">
              <button
                id={tagTriggerId}
                type="button"
                onClick={() => setTagDropdownOpen((prev) => !prev)}
                aria-expanded={tagDropdownOpen}
                aria-haspopup="listbox"
                aria-controls={tagDropdownOpen ? tagListboxId : undefined}
                className="inline-flex items-center gap-2 px-3 py-1.5 border border-border hover:border-foreground transition-colors"
              >
                {activeTags.length === 0 ? (
                  <span className="text-muted">{t("styles.selectTags")}</span>
                ) : (
                  <span>{activeTags.length} {t("styles.tagsSelected")}</span>
                )}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${tagDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {tagDropdownOpen && (
                <div
                  id={tagListboxId}
                  role="listbox"
                  aria-labelledby={tagTriggerId}
                  aria-multiselectable="true"
                  className="absolute top-full left-0 mt-1 w-48 bg-background border border-border shadow-lg z-50"
                >
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      role="option"
                      aria-selected={activeTags.includes(tag)}
                      onClick={() => handleToggleTag(tag)}
                      className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
                        activeTags.includes(tag) ? "bg-zinc-50 dark:bg-zinc-900" : ""
                      }`}
                    >
                      <span>{tagLabels[tag]}</span>
                      {activeTags.includes(tag) && (
                        <span className="w-2 h-2 bg-foreground rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Selected tags display */}
            {activeTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                {activeTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-foreground text-background text-xs"
                  >
                    {tagLabels[tag]}
                    <button
                      type="button"
                      aria-label={`${t("styles.clearTags")} ${tagLabels[tag]}`}
                      onClick={() => handleToggleTag(tag)}
                      className="hover:opacity-70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={handleClearTags}
                  className="px-2 py-0.5 text-xs text-muted hover:text-foreground transition-colors"
                >
                  {t("styles.clearTags")}
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted">
                {filteredStyles.length} {t("styles.results")}
              </p>
              {isFiltering && (
                <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="styles-sort" className="text-sm text-muted">
                {t("styles.sort")}:
              </label>
              <select
                id="styles-sort"
                value={sortBy}
                onChange={(event) => handleSortChange(event.target.value as SortOption)}
                className="h-9 md:h-11 px-3 text-sm border border-border bg-background focus:outline-none focus:border-foreground transition-colors"
              >
                <option value="recommended">{t("styles.sortRecommended")}</option>
                <option value="name-asc">{t("styles.sortNameAsc")}</option>
                <option value="name-desc">{t("styles.sortNameDesc")}</option>
              </select>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
                >
                  {t("styles.resetFilters")}
                </button>
              )}
            </div>
          </div>

          {/* Styles List with loading indicator */}
          <div
            className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-8 transition-opacity ${
              isFiltering ? "opacity-70" : ""
            }`}
          >
            {filteredStyles.length === 0 ? (
              <div className="col-span-full py-12 text-center text-muted">
                {showFavorites && favorites.length === 0 ? (
                  <span className="inline-flex items-center gap-1">
                    {t("styles.noFavorites")} <Heart className="w-4 h-4" />
                  </span>
                ) : (
                  t("common.noResults")
                )}
              </div>
            ) : (
              filteredStyles.map((style: StyleMeta) => (
                <div
                  key={style.slug}
                  className="[content-visibility:auto] [contain-intrinsic-size:1px_540px]"
                >
                  <StyleCard style={style} variant="compact" />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

    </>
  );
}
