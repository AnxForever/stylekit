"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { StyleMeta } from "@/lib/styles/meta";

interface TrendingStylesProps {
  styles: StyleMeta[];
}

interface TopStyle {
  slug: string;
  total: number;
}

export function TrendingStyles({ styles }: TrendingStylesProps) {
  const { t } = useI18n();
  const [topStyles, setTopStyles] = useState<TopStyle[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    fetch("/api/analytics?top=8")
      .then((res) => res.json())
      .then((data) => {
        if (data.top && data.top.length > 0) {
          setTopStyles(data.top);
        } else {
          setUseFallback(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setUseFallback(true);
        setLoading(false);
      });
  }, []);

  // Stable fallback selection — pick evenly spaced styles
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

  if (loading) {
    return null;
  }

  const styleMap = new Map(styles.map((s) => [s.slug, s]));

  // Fallback: show a curated selection when analytics data is unavailable
  if (useFallback && fallbackStyles.length > 0) {
    return (
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-muted" />
                <p className="text-xs tracking-widest uppercase text-muted">
                  {t("analytics.trending.label")}
                </p>
              </div>
              <h2 className="text-2xl md:text-3xl">{t("analytics.trending.title")}</h2>
            </div>
            <Link
              href="/styles"
              className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1"
            >
              {t("home.viewAll")}
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fallbackStyles.map((meta, index) => (
              <Link
                key={meta.slug}
                href={`/styles/${meta.slug}`}
                className="group block p-4 border border-border hover:border-foreground transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted tabular-nums">#{index + 1}</span>
                  <h3 className="text-sm font-medium group-hover:text-accent transition-colors truncate">
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
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-muted" />
              <p className="text-xs tracking-widest uppercase text-muted">
                {t("analytics.trending.label")}
              </p>
            </div>
            <h2 className="text-2xl md:text-3xl">{t("analytics.trending.title")}</h2>
          </div>
          <Link
            href="/styles"
            className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1"
          >
            {t("home.viewAll")}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topStyles.map((top, index) => {
            const meta = styleMap.get(top.slug);
            if (!meta) return null;

            const barWidth = Math.max((top.total / maxCount) * 100, 8);

            return (
              <Link
                key={top.slug}
                href={`/styles/${top.slug}`}
                className="group block p-4 border border-border hover:border-foreground transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted tabular-nums">
                    #{index + 1}
                  </span>
                  <h3 className="text-sm font-medium group-hover:text-accent transition-colors truncate">
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
