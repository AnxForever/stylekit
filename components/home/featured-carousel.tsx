"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import { useI18n } from "@/lib/i18n/context";
import type { StyleMeta } from "@/lib/styles/meta";

interface FeaturedCarouselProps {
  styles: StyleMeta[];
}

export function FeaturedCarousel({ styles }: FeaturedCarouselProps) {
  const { t } = useI18n();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredStyle = styles.length > 0 ? styles[featuredIndex] : null;

  const nextStyle = useCallback(() => {
    if (styles.length > 0) {
      setFeaturedIndex((i) => (i + 1) % styles.length);
    }
  }, [styles.length]);

  const prevStyle = useCallback(() => {
    if (styles.length > 0) {
      setFeaturedIndex((i) => (i - 1 + styles.length) % styles.length);
    }
  }, [styles.length]);

  const handleContainerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextStyle();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prevStyle();
    }
  };

  if (!featuredStyle) {
    return null;
  }

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={t("home.featuredRegionLabel")}
      onKeyDown={handleContainerKeyDown}
      className="relative outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Link
        href={`/styles/${featuredStyle.slug}`}
        className="block aspect-[16/11] sm:aspect-[4/3] border border-border overflow-hidden motion-safe:transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <StyleCoverPreview styleSlug={featuredStyle.slug} />
      </Link>

      <div className="flex items-center justify-between mt-3">
        <Link
          href={`/styles/${featuredStyle.slug}`}
          className="group min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-sm font-medium group-hover:text-accent transition-colors truncate">
            {featuredStyle.name}
          </p>
          <p className="text-xs text-muted truncate">{featuredStyle.nameEn}</p>
        </Link>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={prevStyle}
            className="w-9 h-9 flex items-center justify-center border border-border hover:border-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background transition-colors"
            aria-label={t("home.featuredPrevStyle")}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-muted tabular-nums min-w-[3.5rem] text-center" aria-live="polite" aria-atomic="true">
            {featuredIndex + 1} / {styles.length}
          </span>
          <button
            type="button"
            onClick={nextStyle}
            className="w-9 h-9 flex items-center justify-center border border-border hover:border-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background transition-colors"
            aria-label={t("home.featuredNextStyle")}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {styles.length > 1 && (
        <div className="mt-3 flex items-center gap-1.5" role="group" aria-label={t("home.featuredSlideNav")}>
          {styles.map((style, index) => {
            const isActive = index === featuredIndex;
            return (
              <button
                key={style.slug}
                type="button"
                aria-pressed={isActive}
                aria-label={`${t("home.featuredSlide")} ${index + 1}`}
                onClick={() => setFeaturedIndex(index)}
                className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
                  isActive
                    ? "w-8 bg-foreground"
                    : "w-3 bg-foreground/25 hover:bg-foreground/45"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
