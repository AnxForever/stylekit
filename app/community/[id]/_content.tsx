"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollBackButton } from "@/components/scroll-back-button";
import { ColorPalette } from "@/components/style-preview/color-palette";
import { ComponentPreview } from "@/components/style-preview/component-preview";
import { PromptPairExporter } from "@/components/style-preview/prompt-pair-exporter";
import { ExamplePrompts } from "@/components/style-preview/example-prompts";
import { CodeBlock } from "@/components/style-preview/code-block";
import { useI18n } from "@/lib/i18n/context";
import { localizedString, localizedList } from "@/lib/styles/locale-content";
import type { SubmissionRecord } from "@/lib/submit/reviewer";
import type { DesignStyle } from "@/lib/styles";

interface Props {
  submission: SubmissionRecord;
  style: DesignStyle;
}

function parseAuthor(
  formData: Record<string, unknown>
): { handle: string; avatarUrl: string | null; provider: string } {
  const meta = formData.__author;
  if (meta && typeof meta === "object" && !Array.isArray(meta)) {
    const m = meta as Record<string, unknown>;
    const handle =
      typeof m.handle === "string" && m.handle.trim()
        ? m.handle.trim().replace(/^@+/, "")
        : "anonymous";
    const avatarUrl = typeof m.avatarUrl === "string" ? m.avatarUrl : null;
    const provider = typeof m.provider === "string" ? m.provider : "unknown";
    return { handle, avatarUrl, provider };
  }
  const authorName =
    typeof formData.authorName === "string" ? formData.authorName.trim() : "";
  return {
    handle: authorName.replace(/^@+/, "") || "anonymous",
    avatarUrl: null,
    provider: "unknown",
  };
}

function formatDate(iso: string, locale: "zh" | "en"): string {
  const dateLocale = locale === "zh" ? "zh-CN" : "en-US";
  return new Date(iso).toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function CommunitySubmissionContent({ submission, style }: Props) {
  const { t, locale } = useI18n();
  const author = parseAuthor(submission.formData);
  const backHref = `/community?slug=${submission.slug}`;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <div className="flex items-center gap-4 mb-4">
            <ScrollBackButton
              label={t("community.label")}
              href={backHref}
              savedReturnUrlKey="community-return-url"
              fallbackHref={backHref}
            />
            <div className="flex items-center gap-2 text-sm text-muted">
              <Link
                href="/community"
                className="hover:text-foreground transition-colors"
              >
                {t("community.label")}
              </Link>
              <span>/</span>
              <span>{style.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-2">
                {style.name}
              </h1>
              {style.nameEn && style.nameEn !== style.name && (
                <p className="text-xl text-muted mb-6">{style.nameEn}</p>
              )}
              {style.description && (
                <p className="text-lg text-muted leading-relaxed mb-6">
                  {localizedString(locale, style.description, style.descriptionEn)}
                </p>
              )}

              {/* Author attribution */}
              <div className="inline-flex items-center gap-3 border border-border bg-background/70 px-3 py-2 mb-6">
                {author.avatarUrl ? (
                  <Image
                    src={author.avatarUrl}
                    alt={author.handle}
                    width={24}
                    height={24}
                    unoptimized
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <span className="w-6 h-6 rounded-full bg-muted/30 inline-flex items-center justify-center text-[11px] text-foreground">
                    {author.handle.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="text-sm text-muted">
                  {t("community.by")}{" "}
                  <span className="text-foreground font-medium">
                    @{author.handle}
                  </span>
                </span>
                {author.provider !== "unknown" && (
                  <span className="text-[10px] uppercase tracking-wider text-muted border border-border px-1.5 py-0.5">
                    {author.provider}
                  </span>
                )}
                <time
                  dateTime={submission.submittedAt}
                  className="text-xs text-muted ml-2"
                >
                  {formatDate(submission.submittedAt, locale)}
                </time>
              </div>

              {/* Keywords */}
              {style.keywords && style.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {style.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs px-3 py-1 bg-zinc-100 text-muted"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              {style.components && Object.values(style.components).some((c) => c.code) && (
                <div className="flex flex-wrap gap-4 mt-6">
                  <Link
                    href={`/styles/${submission.slug}/showcase`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
                  >
                    {t("styleDetail.viewShowcase")}
                  </Link>
                </div>
              )}
            </div>

            {/* Color Palette / Cover */}
            <div>
              {style.cover?.startsWith("data:") && (
                <div className="border border-border overflow-hidden mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={style.cover}
                    alt={`${style.name} cover`}
                    className="w-full h-auto"
                  />
                </div>
              )}
              <p className="text-xs tracking-widest uppercase text-muted mb-4">
                {t("styleDetail.colorPalette")}
              </p>
              <ColorPalette colors={style.colors} />
            </div>
          </div>
        </div>
      </section>

      {/* Prompt Pair Export */}
      {style.aiRules && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("promptPair.sectionLabel")}
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">{t("promptPair.title")}</h2>
            <p className="text-muted mb-8 max-w-2xl">
              {t("promptPair.description").replace("{name}", style.name)}
            </p>
            <PromptPairExporter
              styleName={style.name}
              styleSlug={submission.slug}
              aiRules={style.aiRules}
              doList={style.doList}
              dontList={style.dontList}
              keywords={style.keywords}
            />
          </div>
        </section>
      )}

      {/* Philosophy */}
      {style.philosophy && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("styleDetail.philosophy")}
            </p>
            <div className="max-w-3xl">
              <div className="prose prose-lg">
                {localizedString(locale, style.philosophy, style.philosophyEn).split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-muted leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Do's and Don'ts */}
      {((style.doList && style.doList.length > 0) || (style.dontList && style.dontList.length > 0)) && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {style.doList && style.doList.length > 0 && (
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted mb-4">
                    {t("styleDetail.dos")}
                  </p>
                  <ul className="space-y-3">
                    {localizedList(locale, style.doList, style.doListEn).map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center text-white text-xs mt-0.5">+</span>
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {style.dontList && style.dontList.length > 0 && (
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted mb-4">
                    {t("styleDetail.donts")}
                  </p>
                  <ul className="space-y-3">
                    {localizedList(locale, style.dontList, style.dontListEn).map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-white text-xs mt-0.5">-</span>
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Component Preview */}
      {style.components && Object.values(style.components).some((c) => c.code) && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("styleDetail.componentTemplates")}
            </p>
            <h2 className="text-2xl md:text-3xl mb-8">{t("styleDetail.componentPreview")}</h2>
            <ComponentPreview components={style.components} />
          </div>
        </section>
      )}

      {/* Global CSS */}
      {style.globalCss && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("styleDetail.globalStyles")}
            </p>
            <h2 className="text-2xl md:text-3xl mb-8">{t("styleDetail.globalCssTitle")}</h2>
            <CodeBlock code={style.globalCss} language="css" />
          </div>
        </section>
      )}

      {/* Example Prompts */}
      {style.examplePrompts && style.examplePrompts.length > 0 && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("styleDetail.examplePrompts")}
            </p>
            <ExamplePrompts
              prompts={style.examplePrompts}
              styleName={style.name}
              styleSlug={submission.slug}
              aiRules={style.aiRules}
            />
          </div>
        </section>
      )}

      {/* View all versions footer */}
      <section>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <Link
            href={backHref}
            className="text-sm underline underline-offset-4 hover:no-underline text-muted hover:text-foreground"
          >
            {t("styleDetail.viewAllCommunityVersions")}
          </Link>
        </div>
      </section>
    </>
  );
}
