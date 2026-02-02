"use client";

import { useState, useTransition, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { useFavorites } from "@/lib/favorites/context";
import { StyleCard } from "@/components/home/style-card";
import { Heart, Layers, Paintbrush, Loader2 } from "lucide-react";
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
  ];

  const tagLabels: Record<StyleTag, string> = {
    modern: t("styles.tagModern"),
    expressive: t("styles.tagExpressive"),
    minimal: t("styles.tagMinimal"),
    retro: t("styles.tagRetro"),
    "high-contrast": t("styles.tagHighContrast"),
    responsive: t("styles.tagResponsive"),
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

          {/* Tag Filter */}
          <div className="flex flex-wrap items-center gap-2 mb-8 md:mb-12 text-sm">
            <span className="text-muted">{t("styles.tags")}:</span>
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleToggleTag(tag)}
                className={`px-2.5 py-1 text-xs uppercase tracking-wider transition-colors ${
                  activeTags.includes(tag)
                    ? "bg-foreground text-background"
                    : "border border-border hover:border-foreground text-muted"
                }`}
              >
                {tagLabels[tag]}
              </button>
            ))}
            {activeTags.length > 0 && (
              <button
                onClick={handleClearTags}
                className="px-2.5 py-1 text-xs text-muted hover:text-foreground transition-colors"
              >
                {t("styles.clearTags")}
              </button>
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
          <a
            href="https://github.com/AnxForever/stylekit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-border hover:border-foreground transition-colors text-sm tracking-wide"
          >
            {t("styles.submitCta.button")}
          </a>
        </div>
      </section>
    </>
  );
}
