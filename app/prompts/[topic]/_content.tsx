"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { LocalizedLink } from "@/components/i18n/localized-link";
import type { PromptTopic } from "@/lib/prompts/types";
import type { StyleMeta } from "@/lib/styles/meta";

// ── FAQ Accordion ──────────────────────────────────────

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 text-left hover:text-foreground transition-colors"
      >
        <span className="font-medium text-sm md:text-base pr-4">{question}</span>
        <span
          className={`text-muted shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && (
        <div className="pb-4 text-sm text-muted leading-relaxed">{answer}</div>
      )}
    </div>
  );
}

// ── Prompt Card ────────────────────────────────────────

function PromptCard({
  title,
  tool,
  prompt,
}: {
  title: string;
  tool: string;
  prompt: string;
}) {
  const [copied, setCopied] = useState(false);
  const { t } = useI18n();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const el = document.createElement("textarea");
      el.value = prompt;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toolLabel: Record<string, string> = {
    v0: "v0",
    cursor: "Cursor",
    claude: "Claude",
    general: "General",
  };

  return (
    <div className="border border-border p-4 hover:border-foreground transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h4 className="font-medium text-sm">{title}</h4>
          <span className="inline-block text-[10px] tracking-wider uppercase text-muted mt-1 border border-border px-1.5 py-0.5">
            {toolLabel[tool] || tool}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="shrink-0 px-2 py-1 text-xs border border-border hover:bg-foreground hover:text-background transition-colors"
        >
          {copied ? t("seo.copiedPrompt") : t("seo.copyPrompt")}
        </button>
      </div>
      <div className="text-xs text-muted bg-zinc-50 dark:bg-zinc-900 p-3 mt-3 max-h-32 overflow-y-auto">
        <pre className="whitespace-pre-wrap font-mono">{prompt}</pre>
      </div>
    </div>
  );
}

// ── Main Content ───────────────────────────────────────

interface Props {
  topic: PromptTopic;
  relatedStyles: (StyleMeta | undefined)[];
  topicIndexHref?: string;
  children?: ReactNode;
}

export function PromptTopicContent({
  topic,
  relatedStyles,
  topicIndexHref = "/ui-prompts",
  children,
}: Props) {
  const { locale, t } = useI18n();
  const isZh = locale === "zh";

  const title = isZh ? topic.titleZh : topic.titleEn;
  const description = isZh ? topic.descriptionZh : topic.descriptionEn;
  const intro = isZh ? topic.introZh : topic.introEn;

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <LocalizedLink href="/" className="hover:text-foreground transition-colors">
            {t("seo.breadcrumbHome")}
          </LocalizedLink>
          <span>/</span>
          <LocalizedLink href={topicIndexHref} className="hover:text-foreground transition-colors">
            {t("seo.breadcrumbPrompts")}
          </LocalizedLink>
          <span>/</span>
          <span className="text-foreground">{title}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-lg text-muted max-w-2xl mb-6">{description}</p>
          <div className="flex flex-wrap gap-2">
            {topic.keywords.slice(0, 6).map((kw) => (
              <span
                key={kw}
                className="text-xs border border-border px-2 py-1 text-muted"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Intro / What is this? */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("prompts.intro")}
          </p>
          <div className="text-muted max-w-3xl leading-relaxed">
            <p>{intro}</p>
          </div>
        </div>
      </section>

      {/* Prompt Examples */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("seo.promptExamples")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-4">
            {t("seo.promptExamplesTitle")}
          </h2>
          <p className="text-muted mb-8 max-w-2xl">
            {(t("seo.promptExamplesDesc") as string).replace(
              "{style}",
              isZh ? topic.titleZh : topic.titleEn
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topic.prompts.map((p, i) => (
              <PromptCard
                key={i}
                title={isZh ? p.titleZh : p.titleEn}
                tool={p.tool}
                prompt={p.prompt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Related Styles */}
      {relatedStyles.length > 0 && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("seo.relatedStyles")}
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">
              {t("seo.relatedStyles")}
            </h2>
            <p className="text-muted mb-8 max-w-2xl">
              {t("seo.relatedStylesDesc")}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedStyles.map(
                (style) =>
                  style && (
                    <LocalizedLink
                      key={style.slug}
                      href={`/styles/${style.slug}`}
                      className="group border border-border p-4 hover:border-foreground transition-colors"
                    >
                      <div className="flex gap-2 mb-2">
                        {style.colors.accent.slice(0, 3).map((c, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 border border-border"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <h3 className="text-sm font-medium">
                        {isZh ? style.name : style.nameEn}
                      </h3>
                      <p className="text-xs text-muted mt-1">
                        {style.category} / {style.styleType}
                      </p>
                    </LocalizedLink>
                  )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("seo.useCases")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-4">
            {t("seo.useCasesTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topic.useCases.map((uc, i) => (
              <div
                key={i}
                className="border border-border p-4 hover:border-foreground transition-colors"
              >
                <h4 className="font-medium text-sm mb-2">
                  {isZh ? uc.titleZh : uc.titleEn}
                </h4>
                <p className="text-xs text-muted">
                  {isZh ? uc.descriptionZh : uc.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("seo.faq")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-8">
            {t("seo.faqTitle")}
          </h2>
          <div className="max-w-3xl">
            {topic.faq.map((f, i) => (
              <FAQItem
                key={i}
                question={isZh ? f.questionZh : f.questionEn}
                answer={isZh ? f.answerZh : f.answerEn}
              />
            ))}
          </div>
        </div>
      </section>

      {children}

      {/* CTA */}
      <section>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl mb-4">
            {isZh ? "想要完整的设计系统？" : "Want the complete design system?"}
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            {isZh
              ? "StyleKit 提供 135 种视觉风格，每种都有 design tokens、组件配方和可导出的 AI Rules。"
              : "StyleKit offers 135 visual styles, each with design tokens, component recipes, and exportable AI Rules."}
          </p>
          <div className="flex justify-center gap-4">
            <LocalizedLink
              href="/styles"
              className="inline-block border-2 border-foreground px-6 py-3 font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              {isZh ? "浏览风格库" : "Browse Styles"}
            </LocalizedLink>
            <LocalizedLink
              href={topicIndexHref}
              className="inline-block border border-border px-6 py-3 text-muted hover:border-foreground hover:text-foreground transition-colors"
            >
              {isZh ? "更多提示词主题" : "More Prompt Topics"}
            </LocalizedLink>
          </div>
        </div>
      </section>
    </>
  );
}
