"use client";

import Link from "next/link";
import { Layers } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { usePopularCombos } from "@/lib/swr";

export function PopularCombos() {
  const { t } = useI18n();
  const { data, isLoading } = usePopularCombos();
  const combos = data?.combinations?.slice(0, 5) ?? [];

  if (isLoading || combos.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-muted" />
            <p className="text-xs tracking-widest uppercase text-muted">
              {t("analytics.combos.label")}
            </p>
          </div>
          <h2 className="text-2xl md:text-3xl">{t("analytics.combos.title")}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {combos.map((combo) => (
            <div
              key={combo.pair.join("+")}
              className="p-4 border border-border space-y-3"
            >
              <div className="flex items-center gap-2">
                {combo.pair.map((slug) => (
                  <Link
                    key={slug}
                    href={`/styles/${slug}`}
                    className="text-sm hover:text-accent transition-colors"
                  >
                    {slug}
                  </Link>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted">
                <span>{t("analytics.combos.usedTogether")}</span>
                <span className="tabular-nums">{combo.count}x</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
