"use client";

import { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { useFavorites } from "@/lib/favorites/context";
import { Heart, Layers, Paintbrush } from "lucide-react";
import type { StyleType, StyleTag } from "@/lib/styles/meta";

type TypeFilter = StyleType | "all";

interface StylesFilterBarProps {
  activeType: TypeFilter;
  activeTags: StyleTag[];
  showFavorites: boolean;
}

export function StylesFilterBar({
  activeType,
  activeTags,
  showFavorites,
}: StylesFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useI18n();
  const { favorites } = useFavorites();

  const buildUrl = useCallback(
    (params: { type?: string; tags?: string[]; fav?: boolean }) => {
      const sp = new URLSearchParams();
      const type = params.type ?? activeType;
      const tags = params.tags ?? activeTags;
      const fav = params.fav ?? showFavorites;

      if (type && type !== "all") sp.set("type", type);
      if (tags.length > 0) sp.set("tags", tags.join(","));
      if (fav) sp.set("fav", "1");

      const qs = sp.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [activeType, activeTags, showFavorites, pathname]
  );

  const typeFilters: { key: TypeFilter; label: string; icon?: React.ReactNode }[] = [
    { key: "all", label: t("styles.typeAll") },
    { key: "visual", label: t("styles.typeVisual"), icon: <Paintbrush className="w-3.5 h-3.5" /> },
    { key: "layout", label: t("styles.typeLayout"), icon: <Layers className="w-3.5 h-3.5" /> },
  ];

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

  const handleTypeChange = (type: TypeFilter) => {
    router.push(buildUrl({ type }), { scroll: false });
  };

  const handleToggleTag = (tag: StyleTag) => {
    const newTags = activeTags.includes(tag)
      ? activeTags.filter((t) => t !== tag)
      : [...activeTags, tag];
    router.push(buildUrl({ tags: newTags }), { scroll: false });
  };

  const handleClearTags = () => {
    router.push(buildUrl({ tags: [] }), { scroll: false });
  };

  const handleToggleFavorites = () => {
    router.push(buildUrl({ fav: !showFavorites }), { scroll: false });
  };

  return (
    <>
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
    </>
  );
}
