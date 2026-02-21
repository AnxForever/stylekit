"use client";

import { useState, useTransition, useMemo, useCallback, useRef, useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { useFavorites } from "@/lib/favorites/context";
import { StyleCard } from "@/components/home/style-card";
import { Heart, Layers, Paintbrush, Loader2, ChevronDown, X } from "lucide-react";
import type { StyleMeta, StyleType, StyleTag } from "@/lib/styles/meta";

type TypeFilter = StyleType | "all";
type SortOption = "recommended" | "name-asc" | "name-desc";

interface StylesContentProps {
  allStyles: StyleMeta[];
  initialType: TypeFilter;
  initialTags: StyleTag[];
  initialShowFavorites: boolean;
  initialSort: SortOption;
}

export function StylesContent({
  allStyles,
  initialType,
  initialTags,
  initialShowFavorites,
  initialSort,
}: StylesContentProps) {
  const { t } = useI18n();
  const { favorites } = useFavorites();
  const router = useRouter();
  const pathname = usePathname();

  const [activeType, setActiveType] = useState<TypeFilter>(initialType);
  const [activeTags, setActiveTags] = useState<StyleTag[]>(initialTags);
  const [showFavorites, setShowFavorites] = useState(initialShowFavorites);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [isPending, startTransition] = useTransition();
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const tagDropdownRef = useRef<HTMLDivElement>(null);

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

  const syncToUrl = useCallback(
    (type: TypeFilter, tags: StyleTag[], fav: boolean, sort: SortOption) => {
      const sp = new URLSearchParams();
      if (type && type !== "all") sp.set("type", type);
      if (tags.length > 0) sp.set("tags", tags.join(","));
      if (fav) sp.set("fav", "1");
      if (sort !== "recommended") sp.set("sort", sort);

      const qs = sp.toString();
      const newUrl = qs ? `${pathname}?${qs}` : pathname;

      router.replace(newUrl, { scroll: false });
    },
    [pathname, router]
  );

  // Type filter 配置
  const typeFilters: { key: TypeFilter; label: string; icon?: ReactNode }[] = [
    { key: "all", label: t("styles.typeAll") },
    { key: "visual", label: t("styles.typeVisual"), icon: <Paintbrush className="w-3.5 h-3.5" /> },
    { key: "layout", label: t("styles.typeLayout"), icon: <Layers className="w-3.5 h-3.5" /> },
  ];

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

  const tagLabels: Record<StyleTag, string> = {
    modern: t("styles.tagModern"),
    expressive: t("styles.tagExpressive"),
    minimal: t("styles.tagMinimal"),
    retro: t("styles.tagRetro"),
    "high-contrast": t("styles.tagHighContrast"),
    responsive: t("styles.tagResponsive"),
    "brand-inspired": t("styles.tagBrandInspired"),
  };

  const handleTypeChange = (type: TypeFilter) => {
    startTransition(() => {
      setActiveType(type);
      syncToUrl(type, activeTags, showFavorites, sortBy);
    });
  };

  const handleToggleTag = (tag: StyleTag) => {
    startTransition(() => {
      const newTags = activeTags.includes(tag)
        ? activeTags.filter((t) => t !== tag)
        : [...activeTags, tag];
      setActiveTags(newTags);
      syncToUrl(activeType, newTags, showFavorites, sortBy);
    });
  };

  const handleClearTags = () => {
    startTransition(() => {
      setActiveTags([]);
      syncToUrl(activeType, [], showFavorites, sortBy);
    });
  };

  const handleToggleFavorites = () => {
    startTransition(() => {
      const newFav = !showFavorites;
      setShowFavorites(newFav);
      syncToUrl(activeType, activeTags, newFav, sortBy);
    });
  };

  const handleSortChange = (sort: SortOption) => {
    startTransition(() => {
      setSortBy(sort);
      syncToUrl(activeType, activeTags, showFavorites, sort);
    });
  };

  const handleResetFilters = () => {
    startTransition(() => {
      setActiveType("all");
      setActiveTags([]);
      setShowFavorites(false);
      setSortBy("recommended");
      syncToUrl("all", [], false, "recommended");
    });
  };

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  const filteredStyles = useMemo(() => {
    const base = allStyles
      .filter((s) => !showFavorites || favoriteSet.has(s.slug))
      .filter((s) => activeType === "all" || s.styleType === activeType)
      .filter(
        (s) =>
          activeTags.length === 0 ||
          activeTags.some((tag) => s.tags?.includes(tag))
      );

    if (sortBy === "recommended") return base;

    const sorted = [...base].sort((left, right) => {
      const leftName = (left.nameEn || left.name).toLowerCase();
      const rightName = (right.nameEn || right.name).toLowerCase();
      return leftName.localeCompare(rightName);
    });

    if (sortBy === "name-desc") {
      sorted.reverse();
    }

    return sorted;
  }, [allStyles, showFavorites, favoriteSet, activeType, activeTags, sortBy]);

  const hasActiveFilters =
    activeType !== "all" ||
    activeTags.length > 0 ||
    showFavorites ||
    sortBy !== "recommended";

  return (
    <>
      {/* Page Header */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
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
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          {/* Type Filter */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
            <span className="text-muted">{t("styles.type")}:</span>
            {typeFilters.map((type) => (
              <button
                key={type.key}
                onClick={() => handleTypeChange(type.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
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
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 transition-colors ml-auto ${
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
            <div className="relative">
              <button
                onClick={() => setTagDropdownOpen((prev) => !prev)}
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
                  ref={tagDropdownRef}
                  className="absolute top-full left-0 mt-1 w-48 bg-background border border-border shadow-lg z-50"
                >
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
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
                    <button onClick={() => handleToggleTag(tag)} className="hover:opacity-70">
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
            <p className="text-sm text-muted">
              {filteredStyles.length} {t("styles.results")}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="styles-sort" className="text-sm text-muted">
                {t("styles.sort")}:
              </label>
              <select
                id="styles-sort"
                value={sortBy}
                onChange={(event) => handleSortChange(event.target.value as SortOption)}
                className="h-9 px-3 text-sm border border-border bg-background focus:outline-none focus:border-foreground transition-colors"
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
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-opacity ${
              isPending ? "opacity-60" : ""
            }`}
          >
            {isPending && (
              <div className="col-span-full flex justify-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-muted" />
              </div>
            )}
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
              filteredStyles.map((style) => (
                <StyleCard key={style.slug} style={style} variant="compact" />
              ))
            )}
          </div>
        </div>
      </section>

    </>
  );
}
