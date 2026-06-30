"use client";

import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useI18n } from "@/lib/i18n/context";
import { changelog } from "@/lib/changelog";
import { linkify } from "@/lib/changelog/linkify";
import { RevealOnScroll } from "@/components/home/reveal-on-scroll";
import { FeedbackForm } from "@/components/feedback/feedback-form";
import { githubLinks } from "@/lib/site/support";

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

// Pill badge per change type: text + border + faint tint, keeping the original
// four-color semantics (added=green / changed=blue / fixed=amber / removed=red).
const typeBadge: Record<string, string> = {
  added: "text-green-600 dark:text-green-400 border-green-600/30 bg-green-600/10",
  changed: "text-blue-600 dark:text-blue-400 border-blue-600/30 bg-blue-600/10",
  fixed: "text-amber-600 dark:text-amber-400 border-amber-600/30 bg-amber-600/10",
  removed: "text-red-600 dark:text-red-400 border-red-600/30 bg-red-600/10",
};

// Local copy for the feedback CTA (kept out of translations-*.ts, matching the
// developers page pattern).
const FEEDBACK_COPY = {
  en: {
    eyebrow: "Feedback",
    title: "Have an idea or spotted something off?",
    body: "StyleKit is built in the open. Send a feature idea or a rough edge straight to our inbox — or join the discussion on GitHub.",
    discuss: "Or discuss on GitHub",
  },
  zh: {
    eyebrow: "反馈",
    title: "有想法，或发现了问题？",
    body: "StyleKit 在开放地构建。把功能建议或使用中遇到的小问题直接发到我们邮箱 —— 或者来 GitHub 参与讨论。",
    discuss: "或在 GitHub 参与讨论",
  },
} as const;

export function ChangelogClient() {
  const { t, locale } = useI18n();
  const typeLabel = locale === "zh" ? typeLabelZh : typeLabelEn;
  const fc = FEEDBACK_COPY[locale as keyof typeof FEEDBACK_COPY] ?? FEEDBACK_COPY.en;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <RevealOnScroll variant="soft">
              <p className="text-xs tracking-widest uppercase text-muted mb-4">
                {t("changelog.badge")}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                {t("changelog.heading")}
              </h1>
              <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl">
                {t("changelog.subheading")}
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <section>
          <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <div className="space-y-16">
              {changelog.map((entry) => (
                <RevealOnScroll key={entry.version} variant="up">
                  <article className="relative pl-8 border-l border-border">
                    <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-foreground" />
                    <div className="flex items-baseline gap-3 mb-2">
                      <h2 className="text-xl font-medium">v{entry.version}</h2>
                      <time className="text-sm text-muted" dateTime={entry.date}>
                        {entry.date}
                      </time>
                    </div>
                    <p className="text-sm text-muted mb-5">
                      {locale === "zh" && entry.titleZh ? entry.titleZh : entry.title}
                    </p>
                    <ul className="space-y-3">
                      {entry.changes.map((change, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <span
                            className={`inline-flex items-center justify-center min-w-[60px] rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide shrink-0 mt-0.5 ${typeBadge[change.type]}`}
                          >
                            {typeLabel[change.type]}
                          </span>
                          <span className="text-[15px] leading-relaxed text-foreground/80">
                            {linkify(
                              locale === "zh" && change.descriptionZh
                                ? change.descriptionZh
                                : change.description,
                              locale
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <RevealOnScroll variant="soft">
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted mb-3">
                {fc.eyebrow}
              </p>
              <h2 className="text-2xl md:text-3xl mb-3">{fc.title}</h2>
              <p className="text-base leading-relaxed text-muted max-w-2xl mb-6">
                {fc.body}
              </p>
              <div className="max-w-xl">
                <FeedbackForm />
              </div>
              <a
                href={githubLinks.discussions}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
              >
                {fc.discuss}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </RevealOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
