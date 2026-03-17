"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useI18n } from "@/lib/i18n/context";
import { changelog } from "@/lib/changelog";

const typeLabelEn: Record<string, string> = {
  added: "Added",
  changed: "Changed",
  fixed: "Fixed",
  removed: "Removed",
};

const typeLabelZh: Record<string, string> = {
  added: "新增",
  changed: "变更",
  fixed: "修复",
  removed: "移除",
};

const typeColor: Record<string, string> = {
  added: "text-green-600 dark:text-green-400",
  changed: "text-blue-600 dark:text-blue-400",
  fixed: "text-amber-600 dark:text-amber-400",
  removed: "text-red-600 dark:text-red-400",
};

export function ChangelogClient() {
  const { t, locale } = useI18n();
  const typeLabel = locale === "zh" ? typeLabelZh : typeLabelEn;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("changelog.badge")}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              {t("changelog.heading")}
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl">
              {t("changelog.subheading")}
            </p>
          </div>
        </section>

        <section>
          <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <div className="space-y-12">
              {changelog.map((entry) => (
                <article key={entry.version} className="relative pl-8 border-l border-border">
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-foreground" />
                  <div className="flex items-baseline gap-3 mb-2">
                    <h2 className="text-xl font-medium">v{entry.version}</h2>
                    <time className="text-sm text-muted" dateTime={entry.date}>
                      {entry.date}
                    </time>
                  </div>
                  <p className="text-sm text-muted mb-4">{locale === "zh" && entry.titleZh ? entry.titleZh : entry.title}</p>
                  <ul className="space-y-2">
                    {entry.changes.map((change, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className={`text-xs font-medium uppercase tracking-wide mt-0.5 ${typeColor[change.type]}`}>
                          {typeLabel[change.type]}
                        </span>
                        <span className="text-muted">{locale === "zh" && change.descriptionZh ? change.descriptionZh : change.description}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
