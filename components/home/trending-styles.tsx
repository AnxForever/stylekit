"use client";

import { useMemo } from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/home/reveal-on-scroll";
import { useI18n } from "@/lib/i18n/context";
import { useTrendingStyles } from "@/lib/swr";
import type { StyleMeta } from "@/lib/styles/meta";

interface TrendingStylesProps {
  styles: StyleMeta[];
  sectionId?: string;
}

export function TrendingStyles({ styles, sectionId = "home-trending" }: TrendingStylesProps) {
  const { t } = useI18n();
  const { data, isLoading } = useTrendingStyles(8);
  const topStyles = data?.top ?? [];
  const useFallback = !isLoading && (!data?.top || data.top.length === 0);
  const sectionLinkClassName = "text-sm text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors flex items-center gap-1";
  const cardClassName = "group block border border-border motion-safe:transition-all motion-safe:duration-200 hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-y-0.5";
  const gridClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 [content-visibility:auto] [contain-intrinsic-size:1px_560px]";
  const sectionLabelClassName = "text-[11px] tracking-[0.16em] uppercase text-muted";
  const sectionTitleClassName = "text-[1.6rem] sm:text-2xl md:text-3xl leading-tight tracking-tight";

  // Stable fallback selection: pick evenly spaced styles.
  const fallbackStyles = useMemo(() => {
    if (!useFallback || styles.length === 0) return [];
    const count = Math.min(8, styles.length);
    const step = Math.max(1, Math.floor(styles.length / count));
    const result: StyleMeta[] = [];
    for (let i = 0; result.length < count && i < styles.length; i += step) {
      result.push(styles[i]);
    }
    return result;
  }, [useFallback, styles]);
  const styleMap = useMemo(() => new Map(styles.map((style) => [style.slug, style])), [styles]);

  if (isLoading) {
    return (
      <section id={sectionId} className="border-b border-border scroll-mt-24" aria-busy="true">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-12 md:py-16">
          <div className="flex items-end justify-between mb-6 sm:mb-8">
            <RevealOnScroll variant="soft" className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-muted" />
                <p className={sectionLabelClassName}>
                  {t("analytics.trending.label")}
                </p>
              </div>
              <h2 className={sectionTitleClassName}>{t("analytics.trending.title")}</h2>
            </RevealOnScroll>
          </div>

          <div className={gridClassName}>
            {Array.from({ length: 4 }).map((_, index) => (
              <RevealOnScroll key={index} variant="upSubtle" delayMs={index * 35} disableDelayOnMobile>
                <div className="p-3 sm:p-4 border border-border animate-pulse">
                  <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded mb-3" />
                  <div className="h-1.5 bg-zinc-100 dark:bg-zinc-900 mb-3" />
                  <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded mb-3" />
                  <div className="h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded" />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Fallback: show a curated selection when analytics data is unavailable
  if (useFallback && fallbackStyles.length > 0) {
    return (
      <section id={sectionId} className="border-b border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-12 md:py-16">
          <div className="flex items-end justify-between mb-6 sm:mb-8">
            <RevealOnScroll variant="soft" className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-muted" />
                <p className={sectionLabelClassName}>
                  {t("analytics.trending.label")}
                </p>
              </div>
              <h2 className={sectionTitleClassName}>{t("analytics.trending.title")}</h2>
            </RevealOnScroll>
            <Link
              href="/styles"
              className={sectionLinkClassName}
            >
              {t("home.viewAll")}
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className={gridClassName}>
            {fallbackStyles.map((meta, index) => (
              <RevealOnScroll key={meta.slug} variant="upSubtle" delayMs={70 + index * 35} disableDelayOnMobile>
                <Link
                  href={`/styles/${meta.slug}`}
                  className={`${cardClassName} p-3 sm:p-4`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-muted tabular-nums">#{index + 1}</span>
                    <h3 className="text-sm font-medium group-hover:text-accent group-focus-visible:text-accent transition-colors truncate">
                      {meta.name}
                    </h3>
                  </div>
                  {meta.colors && (
                    <div className="h-1 flex mb-3">
                      <div className="flex-1" style={{ backgroundColor: meta.colors.primary }} />
                      <div className="flex-1" style={{ backgroundColor: meta.colors.secondary }} />
                    </div>
                  )}
                  <div className="text-xs text-muted">{meta.nameEn}</div>
                  {meta.category && (
                    <span className="inline-block mt-3 text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted uppercase tracking-wider">
                      {meta.category}
                    </span>
                  )}
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (topStyles.length === 0) {
    return null;
  }

  const maxCount = topStyles[0]?.total || 1;

  return (
    <section id={sectionId} className="border-b border-border scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-12 md:py-16">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <RevealOnScroll variant="soft" className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-muted" />
              <p className={sectionLabelClassName}>
                {t("analytics.trending.label")}
              </p>
            </div>
            <h2 className={sectionTitleClassName}>{t("analytics.trending.title")}</h2>
          </RevealOnScroll>
          <Link
            href="/styles"
            className={sectionLinkClassName}
          >
            {t("home.viewAll")}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className={gridClassName}>
          {topStyles.map((top, index) => {
            const meta = styleMap.get(top.slug);
            if (!meta) return null;

            const barWidth = Math.max((top.total / maxCount) * 100, 8);

            return (
              <RevealOnScroll key={top.slug} variant="upSubtle" delayMs={80 + index * 35} disableDelayOnMobile>
                <Link
                  href={`/styles/${top.slug}`}
                  className={`${cardClassName} p-3 sm:p-4`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-muted tabular-nums">
                      #{index + 1}
                    </span>
                    <h3 className="text-sm font-medium group-hover:text-accent group-focus-visible:text-accent transition-colors truncate">
                      {meta.name}
                    </h3>
                  </div>

                  {meta.colors && (
                    <div className="h-1 flex mb-3">
                      <div
                        className="flex-1"
                        style={{ backgroundColor: meta.colors.primary }}
                      />
                      <div
                        className="flex-1"
                        style={{ backgroundColor: meta.colors.secondary }}
                      />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>{meta.nameEn}</span>
                      <span className="tabular-nums">{top.total}</span>
                    </div>
                    <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800">
                      <div
                        className="h-full bg-foreground/60 transition-all duration-500"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>

                  {meta.category && (
                    <span className="inline-block mt-3 text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted uppercase tracking-wider">
                      {meta.category}
                    </span>
                  )}
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
