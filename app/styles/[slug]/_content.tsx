"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollBackButton } from "@/components/scroll-back-button";
import { ComponentPreview } from "@/components/style-preview/component-preview";
import { ColorPalette } from "@/components/style-preview/color-palette";
import { PromptPairExporter } from "@/components/style-preview/prompt-pair-exporter";
import { CodeBlock } from "@/components/style-preview/code-block";
import { TokensExportButton } from "@/components/tokens-export-button";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import { StylePackExport } from "@/components/style-preview/style-pack-export";
import { ScoreBadge } from "@/components/accessibility/score-badge";
import { ScoreDetail } from "@/components/accessibility/score-detail";
import { IdeExportButtons } from "@/components/export/ide-export-buttons";
import { VersionBadge } from "@/components/styles/version-badge";
import { StyleRating } from "@/components/styles/style-rating";
import { StyleComments } from "@/components/styles/style-comments";
import { StyleSEOSection } from "@/components/style-preview/style-seo-section";
import { useI18n } from "@/lib/i18n/context";
import { localizedString, localizedList } from "@/lib/styles/locale-content";
import type { DesignStyle } from "@/lib/styles";
import type { AccessibilityScore } from "@/lib/accessibility";
import type { StyleVersion } from "@/lib/versioning";
import type { RuntimeStyleSource } from "@/lib/styles/community-runtime";

interface Props {
  style: DesignStyle;
  styleSource?: RuntimeStyleSource;
  compatibleStyles: DesignStyle[];
  compatibleLayouts: DesignStyle[];
  enhancedRules: string | null;
  accessibilityScore: AccessibilityScore | null;
  version?: string;
  changelog?: StyleVersion[];
}

export function StyleDetailContent({
  style,
  styleSource = "static",
  compatibleStyles,
  compatibleLayouts,
  enhancedRules,
  accessibilityScore,
  version,
  changelog,
}: Props) {
  const { t, locale } = useI18n();
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);
  const detailSections = [
    {
      href: "#style-overview",
      label: locale === "zh" ? "风格概览" : "Overview",
    },
    {
      href: "#style-components",
      label: t("styleDetail.componentPreview"),
    },
    {
      href: "#style-exports",
      label: locale === "zh" ? "导出工具" : "Exports",
    },
    {
      href: "#style-feedback",
      label: t("styleDetail.ratingsFeedback"),
    },
  ];

  useEffect(() => {
    const sendAnalytics = () => {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: style.slug, source: "page" }),
      }).catch(() => {
        // Analytics failure is non-blocking
      });
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(sendAnalytics);
      return () => window.cancelIdleCallback(id);
    } else {
      const id = setTimeout(sendAnalytics, 1);
      return () => clearTimeout(id);
    }
  }, [style.slug]);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <div className="flex items-center gap-4 mb-4">
            <ScrollBackButton label={t("styleDetail.backToCatalog")} href="/styles" />
            <div className="flex items-center gap-2 text-sm text-muted">
              <Link href="/styles" className="hover:text-foreground transition-colors">
                {t("styleDetail.catalog")}
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
              <div className="flex items-center gap-3 mb-6">
                <p className="text-xl text-muted">{style.nameEn}</p>
                {version && (
                  <VersionBadge version={version} changelog={changelog} />
                )}
                {accessibilityScore && (
                  <ScoreBadge score={accessibilityScore} />
                )}
              </div>
              <p className="text-lg text-muted leading-relaxed mb-6">
                {localizedString(locale, style.description, style.descriptionEn)}
              </p>
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

              <div className="flex flex-wrap gap-4 mt-6">
                <Link
                  href={`/styles/${style.slug}/showcase`}
                  className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
                >
                  {t("styleDetail.viewShowcase")}
                </Link>
                <Link
                  href={`/templates?style=${style.slug}`}
                  className="inline-flex items-center gap-2 justify-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  {t("nav.templates")}
                </Link>
                <TokensExportButton style={style} />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-4">
                  {locale === "zh" ? "Showcase 预览" : "Showcase Preview"}
                </p>
                <Link
                  href={`/styles/${style.slug}/showcase`}
                  className="group block border border-border overflow-hidden hover:border-foreground transition-colors"
                >
                  <div className="aspect-[16/10] bg-zinc-100 dark:bg-zinc-900">
                    <StyleCoverPreview styleSlug={style.slug} />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-4 border-t border-border">
                    <div>
                      <p className="text-sm">
                        {locale === "zh"
                          ? "先看完整示例页面，再决定要不要深入规范与导出。"
                          : "Preview the full-page example before diving into specs and exports."}
                      </p>
                      <p className="text-xs text-muted mt-1">
                        {locale === "zh"
                          ? "更适合快速判断这个风格是否适合你的项目。"
                          : "The fastest way to judge whether this style fits your project."}
                      </p>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1 text-xs tracking-wide text-muted group-hover:text-foreground transition-colors">
                      {t("styleDetail.viewShowcase")}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </div>

              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-4">
                  {t("styleDetail.colorPalette")}
                </p>
                <ColorPalette colors={style.colors} />
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="sticky top-0 z-20 border-b border-border bg-background/95 supports-[backdrop-filter]:bg-background/75 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-3">
          <nav
            aria-label={locale === "zh" ? "详情页导航" : "Detail page navigation"}
            className="flex gap-2 overflow-x-auto scrollbar-hide"
          >
            {detailSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="inline-flex items-center px-3 py-1.5 text-xs tracking-wide border border-border text-muted hover:text-foreground hover:border-foreground transition-colors whitespace-nowrap"
              >
                {section.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Philosophy */}
      <section id="style-overview" className="border-b border-border scroll-mt-24">
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

      {/* Do's and Don'ts */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
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
          </div>
        </div>
      </section>

      {/* Component Preview */}
      <section id="style-components" className="border-b border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("styleDetail.componentTemplates")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-8">{t("styleDetail.componentPreview")}</h2>
          <ComponentPreview components={style.components} />
        </div>
      </section>

      {/* Prompt Pair Export */}
      <section id="style-exports" className="border-b border-border scroll-mt-24">
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
            styleSlug={style.slug}
            aiRules={style.aiRules}
            enhancedRules={enhancedRules}
            doList={style.doList}
            dontList={style.dontList}
            keywords={style.keywords}
          />
        </div>
      </section>

      {/* Global CSS */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("styleDetail.globalStyles")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-8">{t("styleDetail.globalCssTitle")}</h2>
          <CodeBlock code={style.globalCss} language="css" />
        </div>
      </section>

      {/* Compatible Styles (for layout patterns only) */}
      {style.styleType === "layout" && compatibleStyles.length > 0 && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("styleDetail.compatibleVisual")}
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">{t("styleDetail.tryPairing")}</h2>
            <p className="text-muted mb-8 max-w-2xl">
              {t("styleDetail.compatibleVisualDesc").replace("{name}", style.name)}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {compatibleStyles.map((compatStyle) => (
                <Link
                  key={compatStyle.slug}
                  href={`/styles/${compatStyle.slug}`}
                  className="group block border border-border hover:border-foreground transition-colors"
                >
                  <div className="aspect-square overflow-hidden">
                    <StyleCoverPreview styleSlug={compatStyle.slug} />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium group-hover:text-accent transition-colors">
                      {compatStyle.name}
                    </p>
                    <p className="text-xs text-muted">{compatStyle.nameEn}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Compatible Layouts (for visual styles only) */}
      {style.styleType === "visual" && compatibleLayouts.length > 0 && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("styleDetail.compatibleLayout")}
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">{t("styleDetail.recommendedLayouts")}</h2>
            <p className="text-muted mb-8 max-w-2xl">
              {t("styleDetail.compatibleLayoutDesc").replace("{name}", style.name)}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {compatibleLayouts.map((layoutStyle) => (
                <Link
                  key={layoutStyle.slug}
                  href={`/styles/${layoutStyle.slug}`}
                  className="group block border border-border hover:border-foreground transition-colors"
                >
                  <div className="aspect-square overflow-hidden">
                    <StyleCoverPreview styleSlug={layoutStyle.slug} />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium group-hover:text-accent transition-colors">
                      {layoutStyle.name}
                    </p>
                    <p className="text-xs text-muted">{layoutStyle.nameEn}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Accessibility Score */}
      {accessibilityScore && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("a11y.section")}
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">{t("a11y.title")}</h2>
            <p className="text-muted mb-8 max-w-2xl">
              {t("a11y.description")}
            </p>
            <ScoreDetail score={accessibilityScore} />
          </div>
        </section>
      )}

      {/* IDE Config Export */}
      {styleSource === "static" && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("ideExport.section")}
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">{t("ideExport.title")}</h2>
            <p className="text-muted mb-8 max-w-2xl">
              {t("ideExport.description")}
            </p>
            <IdeExportButtons slug={style.slug} />
          </div>
        </section>
      )}

      {/* Style Pack Export */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("styleDetail.stylePackLabel")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-4">{t("styleDetail.exportStylePack")}</h2>
          <p className="text-muted mb-8 max-w-2xl">
            {t("styleDetail.exportStylePackDesc")}
          </p>
          <StylePackExport style={style} />
        </div>
      </section>

      {/* Community */}
      <section id="style-feedback" className="border-t border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("community.label")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-6">{t("styleDetail.ratingsFeedback")}</h2>
          <div className="mb-8">
            <StyleRating slug={style.slug} />
          </div>
          <StyleComments slug={style.slug} />
        </div>
      </section>

      <section id="style-seo" className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-4">
                {locale === "zh" ? "延伸阅读" : "Further Reading"}
              </p>
              <h2 className="text-2xl md:text-3xl mb-3">
                {locale === "zh"
                  ? "更完整的提示词、FAQ 与适用场景"
                  : "Prompt examples, FAQ, and extended use cases"}
              </h2>
              <p className="text-muted max-w-2xl">
                {locale === "zh"
                  ? "这部分更适合已经确定方向、准备继续深挖这个风格的人。"
                  : "This section is better for readers who already like the direction and want more depth."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsSeoExpanded((current) => !current)}
              className="inline-flex items-center justify-center px-4 py-2 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
            >
              {isSeoExpanded
                ? (locale === "zh" ? "收起延伸内容" : "Hide extended content")
                : (locale === "zh" ? "展开延伸内容" : "Show extended content")}
            </button>
          </div>
        </div>
      </section>

      {isSeoExpanded && (
        <StyleSEOSection
          styleName={style.name}
          styleNameEn={style.nameEn}
          styleSlug={style.slug}
          description={style.description}
          keywords={style.keywords}
        />
      )}
    </>
  );
}
