"use client";

import { useMemo } from "react";
import { useI18n } from "@/lib/i18n/context";
import { useFavorites } from "@/lib/favorites/context";
import { StyleCard } from "@/components/home/style-card";
import { StylesFilterBar } from "@/components/styles/styles-filter-bar";
import { Heart, Loader2 } from "lucide-react";
import type { StyleMeta, StyleType, StyleTag } from "@/lib/styles/meta";

type TypeFilter = StyleType | "all";

interface StylesContentProps {
  allStyles: StyleMeta[];
  activeType: TypeFilter;
  activeTags: StyleTag[];
  showFavorites: boolean;
}

export function StylesContent({
  allStyles,
  activeType,
  activeTags,
  showFavorites,
}: StylesContentProps) {
  const { t } = useI18n();
  const { favorites } = useFavorites();

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
          <StylesFilterBar
            activeType={activeType}
            activeTags={activeTags}
            showFavorites={showFavorites}
          />

          {/* Styles List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
