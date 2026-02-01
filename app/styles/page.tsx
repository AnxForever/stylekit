"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllStylesMeta, StyleCategory } from "@/lib/styles";
import { useI18n } from "@/lib/i18n/context";
import { FavoriteButton } from "@/components/favorite-button";
import { useFavorites } from "@/lib/favorites/context";

type FilterType = StyleCategory | "all" | "favorites";

export default function StylesPage() {
  const allStyles = getAllStylesMeta();
  const [activeCategory, setActiveCategory] = useState<FilterType>("all");
  const { t } = useI18n();
  const { favorites } = useFavorites();

  const categories: { key: FilterType; label: string }[] = [
    { key: "all", label: t("styles.filterAll") },
    { key: "favorites", label: `❤️ (${favorites.length})` },
    { key: "modern", label: t("styles.filterModern") },
    { key: "expressive", label: t("styles.filterExpressive") },
    { key: "minimal", label: t("styles.filterMinimal") },
    { key: "retro", label: t("styles.filterRetro") },
  ];

  const filteredStyles = activeCategory === "all"
    ? allStyles
    : activeCategory === "favorites"
    ? allStyles.filter((style) => favorites.includes(style.slug))
    : allStyles.filter((style) => style.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
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
            {/* Filter */}
            <div className="flex flex-wrap items-center gap-4 mb-8 md:mb-12 text-sm">
              <span className="text-muted">{t("styles.filter")}：</span>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3 py-1 transition-colors ${
                    activeCategory === cat.key
                      ? "bg-foreground text-background"
                      : "border border-border hover:border-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Styles List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredStyles.length === 0 ? (
                <div className="col-span-full py-12 text-center text-muted">
                  {activeCategory === "favorites"
                    ? "还没有收藏任何风格，点击 ❤️ 按钮添加收藏"
                    : t("common.noResults")}
                </div>
              ) : (
                filteredStyles.map((style) => (
                  <Link
                    key={style.slug}
                    href={`/styles/${style.slug}`}
                    className="group block border border-border hover:border-foreground transition-colors"
                  >
                    {/* Preview */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      {/* Color blocks preview */}
                      <div className="absolute inset-0 grid grid-cols-4">
                        <div style={{ backgroundColor: style.colors.primary }} />
                        <div style={{ backgroundColor: style.colors.secondary }} />
                        {style.colors.accent.slice(0, 2).map((color, i) => (
                          <div key={i} style={{ backgroundColor: color }} />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <span className="text-white font-serif text-2xl italic">
                          {style.nameEn}
                        </span>
                      </div>
                      {/* Favorite button */}
                      <div className="absolute top-2 right-2">
                        <FavoriteButton
                          slug={style.slug}
                          size="md"
                          className="bg-white/80 dark:bg-black/50 backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 md:p-5">
                      <div className="flex items-baseline gap-2 mb-2">
                        <h2 className="text-lg font-serif group-hover:text-accent transition-colors">
                          {style.name}
                        </h2>
                        <span className="text-xs text-muted">
                          {style.nameEn}
                        </span>
                      </div>
                      <p className="text-sm text-muted line-clamp-2 mb-3">
                        {style.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {style.keywords.slice(0, 3).map((keyword) => (
                          <span
                            key={keyword}
                            className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
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
            <p className="text-muted mb-6">
              {t("styles.submitCta.desc")}
            </p>
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
      </main>

      <Footer />
    </div>
  );
}
