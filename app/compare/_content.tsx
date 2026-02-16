"use client";

import { useI18n } from "@/lib/i18n/context";
import { CompareContainer } from "@/components/compare/compare-container";

export function CompareContent() {
  const { t } = useI18n();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest text-muted uppercase mb-3">
            {t("compare.badge")}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
            {t("compare.title")}
          </h1>
          <p className="text-muted text-sm md:text-base max-w-2xl">
            {t("compare.description")}
          </p>
        </div>
      </section>

      {/* Compare tool */}
      <CompareContainer />
    </>
  );
}
