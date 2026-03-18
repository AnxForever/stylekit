"use client";

import { LocalizedLink } from "@/components/i18n/localized-link";
import { useI18n } from "@/lib/i18n/context";

export function AboutContent() {
  const { t } = useI18n();

  return (
    <main className="flex-1">
      <section className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("about.hero.badge")}
          </p>
          <h1 className="text-4xl md:text-6xl leading-tight mb-6">
            {t("about.hero.heading1")}
            <br />
            <span className="italic">{t("about.hero.heading2")}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
            {t("about.hero.description")}
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs tracking-widest uppercase text-muted mb-8">
            {t("about.philosophy.badge")}
          </p>
          <div className="grid gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl mb-4">{t("about.philosophy.constraint.title")}</h2>
              <p className="text-muted leading-relaxed">
                {t("about.philosophy.constraint.desc")}
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl mb-4">{t("about.philosophy.ai.title")}</h2>
              <p className="text-muted leading-relaxed">
                {t("about.philosophy.ai.desc")}
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl mb-4">{t("about.philosophy.components.title")}</h2>
              <p className="text-muted leading-relaxed">
                {t("about.philosophy.components.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs tracking-widest uppercase text-muted mb-8">
            {t("about.useCases.badge")}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-border p-6">
              <h3 className="text-xl mb-3">{t("about.useCases.prototype.title")}</h3>
              <p className="text-sm text-muted">
                {t("about.useCases.prototype.desc")}
              </p>
            </div>
            <div className="border border-border p-6">
              <h3 className="text-xl mb-3">{t("about.useCases.specs.title")}</h3>
              <p className="text-sm text-muted">
                {t("about.useCases.specs.desc")}
              </p>
            </div>
            <div className="border border-border p-6">
              <h3 className="text-xl mb-3">{t("about.useCases.learning.title")}</h3>
              <p className="text-sm text-muted">
                {t("about.useCases.learning.desc")}
              </p>
            </div>
            <div className="border border-border p-6">
              <h3 className="text-xl mb-3">{t("about.useCases.components.title")}</h3>
              <p className="text-sm text-muted">
                {t("about.useCases.components.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">{t("about.cta.title")}</h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            {t("about.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocalizedLink
              href="/styles"
              className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
            >
              {t("about.cta.browseStyles")}
            </LocalizedLink>
            <LocalizedLink
              href="/components"
              className="inline-flex items-center justify-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
            >
              {t("about.cta.viewComponents")}
            </LocalizedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
