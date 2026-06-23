"use client";

import { useI18n } from "@/lib/i18n/context";
import { LocalizedLink } from "@/components/i18n/localized-link";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <span className="inline-block text-8xl md:text-9xl font-black tracking-tighter">
            404
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl mb-4">{t("notFound.title")}</h1>
        <p className="text-muted mb-8">
          {t("notFound.description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LocalizedLink
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
          >
            {t("notFound.backHome")}
          </LocalizedLink>
          <LocalizedLink
            href="/styles"
            className="inline-flex items-center justify-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
          >
            {t("notFound.browseStyles")}
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
}
