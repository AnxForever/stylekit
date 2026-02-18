"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { useI18n } from "@/lib/i18n/context";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import { Plus, Palette } from "lucide-react";
import type { DesignStyle } from "@/lib/styles";
import type { StoredCustomStyle } from "@/lib/style-creator/types";

interface StyleStepProps {
  styles: DesignStyle[];
  customStyles: StoredCustomStyle[];
  selectedSlug: string | null;
  selectedCustomId: string | null;
  onSelect: (slug: string, isCustom: boolean) => void;
}

type BuiltinStyleView = "featured" | "recent" | "all";

const RECENT_STYLES_STORAGE_KEY = "stylekit-generator-recent-styles";
const MAX_RECENT_STYLES = 8;
const FEATURED_STYLE_SLUGS = [
  "liquid-glass",
  "neo-brutalist",
  "glassmorphism",
  "editorial",
  "warm-dashboard",
  "minimalist-flat",
  "swiss-poster",
  "memphis",
] as const;

export function StyleStep({
  styles,
  customStyles,
  selectedSlug,
  selectedCustomId,
  onSelect,
}: StyleStepProps) {
  const { t, locale } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [builtinView, setBuiltinView] = useState<BuiltinStyleView>("featured");
  const [recentStyleSlugs, setRecentStyleSlugs] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(RECENT_STYLES_STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        const validSlugs = parsed.filter((item): item is string => typeof item === "string");
        // eslint-disable-next-line react-hooks/set-state-in-effect -- restore persisted recents after hydration
        setRecentStyleSlugs(validSlugs.slice(0, MAX_RECENT_STYLES));
      }
    } catch {
      setRecentStyleSlugs([]);
    }
  }, []);

  const persistRecentStyle = useCallback((slug: string) => {
    setRecentStyleSlugs((prev) => {
      const next = [slug, ...prev.filter((item) => item !== slug)].slice(0, MAX_RECENT_STYLES);
      if (typeof window !== "undefined") {
        localStorage.setItem(RECENT_STYLES_STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const featuredStyles = useMemo(() => {
    const bySlug = new Map(styles.map((style) => [style.slug, style]));
    const featured = FEATURED_STYLE_SLUGS
      .map((slug) => bySlug.get(slug))
      .filter((style): style is DesignStyle => !!style);

    if (featured.length >= 12) return featured.slice(0, 12);

    const featuredSlugSet = new Set(featured.map((style) => style.slug));
    const fallback = styles.filter((style) => !featuredSlugSet.has(style.slug)).slice(0, 12 - featured.length);
    return [...featured, ...fallback];
  }, [styles]);

  const recentStyles = useMemo(() => {
    const bySlug = new Map(styles.map((style) => [style.slug, style]));
    return recentStyleSlugs
      .map((slug) => bySlug.get(slug))
      .filter((style): style is DesignStyle => !!style);
  }, [recentStyleSlugs, styles]);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchedStyles = useMemo(() => {
    if (!normalizedQuery) return styles;
    return styles.filter((style) => {
      const searchableText = [
        style.name,
        style.nameEn,
        style.slug,
        style.description,
        ...style.keywords,
      ]
        .join(" ")
        .toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [styles, normalizedQuery]);

  const visibleBuiltinStyles = useMemo(() => {
    const base = normalizedQuery
      ? searchedStyles
      : builtinView === "recent"
        ? recentStyles
        : builtinView === "all"
          ? styles
          : featuredStyles;

    if (!selectedSlug || base.some((style) => style.slug === selectedSlug)) {
      return base;
    }

    const selectedStyle = styles.find((style) => style.slug === selectedSlug);
    return selectedStyle ? [selectedStyle, ...base] : base;
  }, [normalizedQuery, searchedStyles, builtinView, recentStyles, styles, featuredStyles, selectedSlug]);

  const handleSelectBuiltinStyle = useCallback(
    (slug: string) => {
      onSelect(slug, false);
      persistRecentStyle(slug);
    },
    [onSelect, persistRecentStyle]
  );

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, slug: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelectBuiltinStyle(slug);
    }
  };

  const viewOptions: { key: BuiltinStyleView; label: string }[] = [
    { key: "featured", label: t("generator.viewFeatured") },
    { key: "recent", label: t("generator.viewRecent") },
    { key: "all", label: t("generator.viewAll") },
  ];

  return (
    <div>
      <h2 className="text-xl md:text-2xl mb-2">{t("generator.selectStyle")}</h2>

      {customStyles.length > 0 && (
        <div className="mb-8">
          <p className="text-muted mb-4">{t("generator.customStyles")}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {customStyles.map((style) => {
              const isSelected = style.id === selectedCustomId;

              return (
                <button
                  key={style.id}
                  onClick={() => onSelect(style.id, true)}
                  className={`group text-left border transition-all ${
                    isSelected
                      ? "border-foreground ring-2 ring-foreground ring-offset-2"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  <div
                    className="aspect-[4/3] flex items-center justify-center relative"
                    style={{ backgroundColor: style.definition.colors.background }}
                  >
                    <div className="text-center">
                      <div
                        className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                        style={{ backgroundColor: style.definition.colors.primary }}
                      >
                        <Palette
                          className="w-6 h-6"
                          style={{ color: style.definition.colors.background }}
                        />
                      </div>
                      <p
                        className="text-xs font-medium"
                        style={{ color: style.definition.colors.foreground }}
                      >
                        {locale === "zh" ? "自定义" : "Custom"}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="h-1 flex">
                    <div
                      className="flex-1"
                      style={{ backgroundColor: style.definition.colors.primary }}
                    />
                    <div
                      className="flex-1"
                      style={{ backgroundColor: style.definition.colors.secondary }}
                    />
                    {style.definition.colors.accent.slice(0, 2).map((color, index) => (
                      <div key={index} className="flex-1" style={{ backgroundColor: color }} />
                    ))}
                  </div>

                  <div className="p-3">
                    <p className="font-medium text-sm group-hover:text-accent transition-colors">
                      {locale === "zh" ? style.name : style.nameEn}
                    </p>
                    <p className="text-xs text-muted">
                      {locale === "zh" ? style.nameEn : style.name}
                    </p>
                  </div>
                </button>
              );
            })}

            <Link
              href="/create-style"
              className="group flex flex-col items-center justify-center border border-dashed border-border hover:border-foreground transition-colors aspect-[4/3] text-muted hover:text-foreground"
            >
              <Plus className="w-8 h-8 mb-2" />
              <span className="text-sm">{t("generator.createStyle")}</span>
            </Link>
          </div>
        </div>
      )}

      <p className="text-muted mb-4">
        {t("generator.builtinStyles")}
        {customStyles.length === 0 && (
          <Link
            href="/create-style"
            className="ml-2 text-sm underline hover:text-foreground transition-colors"
          >
            {t("generator.createStyle")}
          </Link>
        )}
      </p>

      <div className="mb-5 space-y-3">
        <label htmlFor="generator-style-search" className="sr-only">
          {t("nav.search")}
        </label>
        <input
          id="generator-style-search"
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={t("generator.searchStyles")}
          className="w-full md:max-w-md px-3 py-2 text-sm border border-border bg-background focus:outline-none focus:border-foreground transition-colors"
        />

        <div className="flex flex-wrap items-center gap-2">
          {viewOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setBuiltinView(option.key)}
              className={`px-3 py-1.5 text-xs tracking-wide transition-colors ${
                builtinView === option.key
                  ? "bg-foreground text-background"
                  : "border border-border hover:border-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}

          <span className="text-xs text-muted ml-auto">
            {visibleBuiltinStyles.length} {t("generator.results")}
          </span>
        </div>

        {!normalizedQuery && builtinView === "featured" && (
          <p className="text-xs text-muted">{t("generator.featuredHint")}</p>
        )}
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        role="radiogroup"
        aria-label={t("generator.selectStyle")}
      >
        {visibleBuiltinStyles.length === 0 ? (
          <div className="col-span-full border border-dashed border-border p-6 text-sm text-muted text-center">
            {normalizedQuery ? t("common.noResults") : t("generator.recentEmpty")}
          </div>
        ) : (
          visibleBuiltinStyles.map((style, index) => {
            const isSelected = style.slug === selectedSlug && !selectedCustomId;

            return (
              <div
                key={style.slug}
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected || (!selectedSlug && index === 0) ? 0 : -1}
                onClick={() => handleSelectBuiltinStyle(style.slug)}
                onKeyDown={(event) => handleCardKeyDown(event, style.slug)}
                className={`group text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "border-foreground ring-2 ring-foreground ring-offset-2"
                    : "border-border hover:border-foreground"
                }`}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <StyleCoverPreview styleSlug={style.slug} />
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="h-1 flex">
                  <div className="flex-1" style={{ backgroundColor: style.colors.primary }} />
                  <div className="flex-1" style={{ backgroundColor: style.colors.secondary }} />
                  {style.colors.accent.slice(0, 2).map((color, colorIndex) => (
                    <div key={colorIndex} className="flex-1" style={{ backgroundColor: color }} />
                  ))}
                </div>

                <div className="p-3">
                  <p className="font-medium text-sm group-hover:text-accent transition-colors">
                    {locale === "zh" ? style.name : style.nameEn}
                  </p>
                  <p className="text-xs text-muted">
                    {locale === "zh" ? style.slug : style.name}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
