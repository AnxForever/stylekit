"use client";

import Link from "next/link";
import { useState, useTransition, useMemo, useCallback, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { useFavorites } from "@/lib/favorites/context";
import { StyleCard } from "@/components/home/style-card";
import { Heart, Layers, Paintbrush, Loader2, ChevronDown, X } from "lucide-react";
import type { StyleMeta, StyleType, StyleTag } from "@/lib/styles/meta";

type TypeFilter = StyleType | "all";

interface StylesContentProps {
  allStyles: StyleMeta[];
  // 初始值从 URL 参数解析
  initialType: TypeFilter;
  initialTags: StyleTag[];
  initialShowFavorites: boolean;
}

export function StylesContent({
  allStyles,
  initialType,
  initialTags,
  initialShowFavorites,
}: StylesContentProps) {
  const { t } = useI18n();
  const { favorites } = useFavorites();
  const router = useRouter();
  const pathname = usePathname();

  // 客户端状态（即时响应）
  const [activeType, setActiveType] = useState<TypeFilter>(initialType);
  const [activeTags, setActiveTags] = useState<StyleTag[]>(initialTags);
  const [showFavorites, setShowFavorites] = useState(initialShowFavorites);
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

  // URL 同步（不阻塞 UI）
  const syncToUrl = useCallback(
    (type: TypeFilter, tags: StyleTag[], fav: boolean) => {
      const sp = new URLSearchParams();
      if (type && type !== "all") sp.set("type", type);
      if (tags.length > 0) sp.set("tags", tags.join(","));
      if (fav) sp.set("fav", "1");

      const qs = sp.toString();
      const newUrl = qs ? `${pathname}?${qs}` : pathname;

      // 使用 replace 避免产生历史记录
      router.replace(newUrl, { scroll: false });
    },
    [pathname, router]
  );

  // Type filter 配置
  const typeFilters: { key: TypeFilter; label: string; icon?: React.ReactNode }[] = [
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

  // 过滤处理（使用 useTransition 保持响应性）
  const handleTypeChange = (type: TypeFilter) => {
    startTransition(() => {
      setActiveType(type);
      syncToUrl(type, activeTags, showFavorites);
    });
  };

  const handleToggleTag = (tag: StyleTag) => {
    startTransition(() => {
      const newTags = activeTags.includes(tag)
        ? activeTags.filter((t) => t !== tag)
        : [...activeTags, tag];
      setActiveTags(newTags);
      syncToUrl(activeType, newTags, showFavorites);
    });
  };

  const handleClearTags = () => {
    startTransition(() => {
      setActiveTags([]);
      syncToUrl(activeType, [], showFavorites);
    });
  };

  const handleToggleFavorites = () => {
    startTransition(() => {
      const newFav = !showFavorites;
      setShowFavorites(newFav);
      syncToUrl(activeType, activeTags, newFav);
    });
  };

  // 过滤逻辑
  const filteredStyles = useMemo(() => {
    return allStyles
      .filter((s) => !showFavorites || favorites.includes(s.slug))
      .filter((s) => activeType === "all" || s.styleType === activeType)
      .filter(
        (s) =>
          activeTags.length === 0 ||
          activeTags.some((tag) => s.tags?.includes(tag))
      );
  }, [allStyles, showFavorites, favorites, activeType, activeTags]);

  return (
    <>
      {/* Page Header */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("styles.subtitle")}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">
            {t("styles.title")}
          </h1>
          <p className="text-lg text-muted max-w-2xl">
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
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 transition-colors ml-auto ${
                showFavorites
                  ? "bg-foreground text-background"
                  : "border border-border hover:border-foreground"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showFavorites ? "fill-current" : ""}`} />
              <span>({favorites.length})</span>
            </button>
          </div>

          {/* Tag Filter - Dropdown */}
          <div className="flex flex-wrap items-center gap-2 mb-8 md:mb-12 text-sm">
            <span className="text-muted">{t("styles.tags")}:</span>
            <div className="relative">
              <button
                onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
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

      {/* Submit CTA */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl mb-4">
            {t("styles.submitCta.title")}
          </h2>
          <p className="text-muted mb-6">{t("styles.submitCta.desc")}</p>
          <Link
            href="/submit"
            className="inline-flex items-center justify-center px-6 py-3 border border-border hover:border-foreground transition-colors text-sm tracking-wide"
          >
            {t("styles.submitCta.button")}
          </Link>
        </div>
      </section>
    </>
  );
}
