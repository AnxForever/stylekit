"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { useI18n } from "@/lib/i18n/context";
import type { StyleMeta } from "@/lib/styles/meta";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";

interface FeaturedCarouselProps {
  styles: StyleMeta[];
}

export function FeaturedCarousel({ styles }: FeaturedCarouselProps) {
  const { t } = useI18n();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const normalizedIndex = styles.length > 0 ? featuredIndex % styles.length : 0;
  const featuredStyle = styles.length > 0 ? styles[normalizedIndex] : null;
  const progressPercent = styles.length > 0 ? ((normalizedIndex + 1) / styles.length) * 100 : 0;

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
  const shouldAutoPlay =
    styles.length > 1 && !isHovered && !isFocusWithin && !isDocumentHidden && !reducedMotion;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => {
      setReducedMotion(mediaQuery.matches);
    };

    handleMotionChange();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleVisibilityChange = () => {
      setIsDocumentHidden(document.hidden);
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!shouldAutoPlay) return;

    const timer = window.setInterval(() => {
      nextStyle();
    }, 5600);

    return () => {
      window.clearInterval(timer);
    };
  }, [nextStyle, shouldAutoPlay]);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsFocusWithin(false);
        }
      }}
      className="group/feature relative outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="mb-3 flex items-center justify-between border-b border-border pb-3">
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted">{t("home.featuredRegionLabel")}</p>
        <span className="font-mono text-[10px] tabular-nums text-muted">SK / {String(normalizedIndex + 1).padStart(2, "0")}</span>
      </div>
      <LocalizedLink
        href={`/styles/${featuredStyle.slug}`}
        className="relative block aspect-[16/11] overflow-hidden border border-foreground/20 bg-background p-2 shadow-[10px_10px_0_color-mix(in_srgb,var(--foreground)_7%,transparent)] motion-safe:transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-foreground hover:shadow-[14px_14px_0_color-mix(in_srgb,var(--foreground)_9%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:aspect-[4/3] sm:p-3"
      >
        <div key={featuredStyle.slug} className="h-full overflow-hidden border border-border motion-safe:animate-home-feature-swap">
          <StyleCoverPreview styleSlug={featuredStyle.slug} />
        </div>
        <span className="absolute bottom-4 right-4 bg-background px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-foreground shadow-surface sm:bottom-5 sm:right-5">
          Live preview
        </span>
      </LocalizedLink>

      <div className="mt-5 flex items-end justify-between gap-4">
        <LocalizedLink
          href={`/styles/${featuredStyle.slug}`}
          className="group min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-live={isFocusWithin ? "polite" : "off"}
          aria-atomic="true"
        >
          <div key={featuredStyle.slug} className="motion-safe:animate-home-feature-swap-soft">
            <p className="font-serif text-xl leading-none transition-colors group-hover:text-accent sm:text-2xl">
              {featuredStyle.name}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-muted truncate">{featuredStyle.nameEn}</p>
          </div>
        </LocalizedLink>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={prevStyle}
            className="w-9 h-9 flex items-center justify-center border border-border hover:border-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background motion-safe:transition-[transform,border-color,background-color] motion-safe:duration-150 motion-safe:active:scale-[0.96]"
            aria-label={t("home.featuredPrevStyle")}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextStyle}
            className="w-9 h-9 flex items-center justify-center border border-border hover:border-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background motion-safe:transition-[transform,border-color,background-color] motion-safe:duration-150 motion-safe:active:scale-[0.96]"
            aria-label={t("home.featuredNextStyle")}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {styles.length > 1 && (
        <div className="mt-4 flex items-center gap-4">
          <div className="h-px flex-1 overflow-hidden bg-border" aria-hidden="true">
            <div
              className="h-full bg-accent transition-[width] duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="min-w-[3rem] text-right font-mono text-[10px] tabular-nums text-muted" aria-live={isFocusWithin ? "polite" : "off"}>
            {String(normalizedIndex + 1).padStart(2, "0")} / {String(styles.length).padStart(2, "0")}
          </span>
          <div className="sr-only" role="group" aria-label={t("home.featuredSlideNav")}>
            {styles.map((style, index) => {
              const isActive = index === normalizedIndex;
              return (
                <button
                  key={style.slug}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`${t("home.featuredSlide")} ${index + 1}`}
                  onClick={() => setFeaturedIndex(index)}
                  className={`h-2 rounded-full transition-[width,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
                    isActive
                      ? "w-8 bg-foreground"
                      : "w-3 bg-foreground/25 hover:bg-foreground/45"
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
