"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { LocalizedLink } from "@/components/i18n/localized-link";
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
import { CollapsibleSection } from "@/components/ui/collapsible-section";
import { LazySection } from "@/components/ui/lazy-section";
import { useI18n } from "@/lib/i18n/context";
import { localizedString, localizedList } from "@/lib/styles/locale-content";
import { trackEvent } from "@/lib/analytics/events";

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
  const showcaseContainerRef = useRef<HTMLDivElement>(null);
  const [showcaseScale, setShowcaseScale] = useState(0);

  const updateShowcaseScale = useCallback(() => {
    const el = showcaseContainerRef.current;
    if (el) setShowcaseScale(el.offsetWidth / 1280);
  }, []);

  useEffect(() => {
    updateShowcaseScale();
    let rafId = 0;
    const throttledUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateShowcaseScale);
    };
    window.addEventListener("resize", throttledUpdate);
    return () => {
      window.removeEventListener("resize", throttledUpdate);
      cancelAnimationFrame(rafId);
    };
  }, [updateShowcaseScale]);
  const localizedDescription = localizedString(
    locale,
    style.description,
    style.descriptionEn
  );
  const localizedPhilosophy = localizedString(
    locale,
    style.philosophy,
    style.philosophyEn
  );
  const localizedDos = localizedList(locale, style.doList, style.doListEn);
  const localizedDonts = localizedList(locale, style.dontList, style.dontListEn);
  const detailSections = [
    {
      href: "#style-prompts",
      label: locale === "zh" ? "提示词" : "Prompts",
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
  const summaryCards = [
    {
      label: locale === "zh" ? "适合场景" : "Best For",
      value:
        style.keywords.length > 0
          ? style.keywords.slice(0, 3).join(" / ")
          : localizedDescription,
    },
    {
      label: locale === "zh" ? "设计重点" : "Primary Move",
      value: localizedDos[0] ?? localizedPhilosophy.split("\n\n")[0] ?? localizedDescription,
    },
    {
      label: locale === "zh" ? "注意事项" : "Watch Out",
      value: localizedDonts[0] ?? localizedDescription,
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
      trackEvent("style_view", { slug: style.slug, source: "page" });
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
        <div className="max-w-7xl mx-auto px-4 sm:px-4 sm:px-6 md:px-12 py-8 md:py-20">
          <div className="flex items-center gap-4 mb-4">
            <ScrollBackButton label={t("styleDetail.backToCatalog")} href="/styles" />
            <div className="flex items-center gap-2 text-sm text-muted">
              <LocalizedLink href="/styles" className="hover:text-foreground transition-colors">
                {t("styleDetail.catalog")}
              </LocalizedLink>
              <span>/</span>
              <span>{style.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
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
                {localizedDescription}
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

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-6">
                <LocalizedLink
                  href={`/styles/${style.slug}/showcase`}
                  className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
                >
                  {t("styleDetail.viewShowcase")}
                </LocalizedLink>
                <LocalizedLink
                  href={`/templates?style=${style.slug}`}
                  className="inline-flex items-center gap-2 justify-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  {t("nav.templates")}
                </LocalizedLink>
                <TokensExportButton style={style} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-8">
                {summaryCards.map((card) => (
                  <article
                    key={card.label}
                    className="border border-border bg-background/60 px-4 py-4 md:px-5 md:py-5"
                  >
                    <p className="text-[10px] tracking-[0.16em] uppercase text-muted mb-2">
                      {card.label}
                    </p>
                    <p className="text-sm leading-relaxed line-clamp-3">
                      {card.value}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-4">
                  {locale === "zh" ? "Showcase 入口" : "Showcase Entry"}
                </p>
                <LocalizedLink
                  href={`/styles/${style.slug}/showcase`}
                  className="group block border border-border overflow-hidden hover:border-foreground transition-colors"
                >
                  {/* Mobile: static cover image */}
                  <div className="md:hidden aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                    <StyleCoverPreview styleSlug={style.slug} />
                  </div>
                  {/* Desktop: live iframe preview */}
                  <div
                    ref={showcaseContainerRef}
                    className="hidden md:block aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative"
                  >
                    {showcaseScale > 0 && (
                      <iframe
                        src={`/styles/${style.slug}/showcase`}
                        title={`${style.nameEn} Showcase Preview`}
                        className="absolute top-0 left-0 w-[1280px] h-[800px] origin-top-left border-0 pointer-events-none select-none"
                        style={{ transform: `scale(${showcaseScale})` }}
                        tabIndex={-1}
                        loading="lazy"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-4 p-4 border-t border-border">
                    <div>
                      <p className="text-sm">
                        {locale === "zh"
                          ? "Showcase 页面的实时预览，点击查看完整体验。"
                          : "Live preview of the showcase page. Click to explore the full experience."}
                      </p>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1 text-xs tracking-wide text-muted group-hover:text-foreground transition-colors">
                      {t("styleDetail.viewShowcase")}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </LocalizedLink>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3">
          <nav
            aria-label={locale === "zh" ? "详情页导航" : "Detail page navigation"}
            className="flex gap-2 overflow-x-auto scrollbar-hide"
          >
            {detailSections.map((section) => (
              <LocalizedLink
                key={section.href}
                href={section.href}
                className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2.5 min-h-[44px] sm:min-h-0 text-xs tracking-wide border border-border text-muted hover:text-foreground hover:border-foreground transition-colors whitespace-nowrap"
              >
                {section.label}
              </LocalizedLink>
            ))}
          </nav>
        </div>
      </section>

      {/* Prompt Pair Export — PRIMARY ACTION */}
      <section id="style-prompts" className="border-b border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
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
            aiRulesEn={style.aiRulesEn}
            enhancedRules={enhancedRules}
            doList={style.doList}
            doListEn={style.doListEn}
            dontList={style.dontList}
            dontListEn={style.dontListEn}
            keywords={style.keywords}
            keywordsEn={style.keywordsEn}
          />
        </div>
      </section>

      {/* Component Preview */}
      <section id="style-components" className="border-b border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("styleDetail.componentTemplates")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-8">{t("styleDetail.componentPreview")}</h2>
          <ComponentPreview components={style.components} defaultShowCode={false} />
        </div>
      </section>

      {/* Global CSS */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
          <CollapsibleSection title={t("styleDetail.globalStyles")}>
            <h2 className="text-2xl md:text-3xl mb-8">{t("styleDetail.globalCssTitle")}</h2>
            <CodeBlock code={style.globalCss} language="css" slug={style.slug} />
          </CollapsibleSection>
        </div>
      </section>

      {/* Compatible Styles (for layout patterns only) */}
      {style.styleType === "layout" && compatibleStyles.length > 0 && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("styleDetail.compatibleVisual")}
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">{t("styleDetail.tryPairing")}</h2>
            <p className="text-muted mb-8 max-w-2xl">
              {t("styleDetail.compatibleVisualDesc").replace("{name}", style.name)}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {compatibleStyles.map((compatStyle) => (
                <LocalizedLink
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
                </LocalizedLink>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Compatible Layouts (for visual styles only) */}
      {style.styleType === "visual" && compatibleLayouts.length > 0 && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("styleDetail.compatibleLayout")}
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">{t("styleDetail.recommendedLayouts")}</h2>
            <p className="text-muted mb-8 max-w-2xl">
              {t("styleDetail.compatibleLayoutDesc").replace("{name}", style.name)}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {compatibleLayouts.map((layoutStyle) => (
                <LocalizedLink
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
                </LocalizedLink>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Export Tools */}
      <section id="style-exports" className="border-b border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
          {styleSource === "static" && (
            <div className="mb-12">
              <p className="text-xs tracking-widest uppercase text-muted mb-4">
                {t("ideExport.section")}
              </p>
              <h2 className="text-2xl md:text-3xl mb-4">{t("ideExport.title")}</h2>
              <p className="text-muted mb-8 max-w-2xl">
                {t("ideExport.description")}
              </p>
              <IdeExportButtons slug={style.slug} />
            </div>
          )}
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("styleDetail.stylePackLabel")}
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">{t("styleDetail.exportStylePack")}</h2>
            <p className="text-muted mb-8 max-w-2xl">
              {t("styleDetail.exportStylePackDesc")}
            </p>
            <StylePackExport style={style} />
          </div>
        </div>
      </section>

      {/* Community */}
      <LazySection>
        <section id="style-feedback" className="border-b border-border scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
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
      </LazySection>

      {/* Philosophy — condensed, collapsed */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
          <CollapsibleSection title={t("styleDetail.philosophy")}>
            <p className="text-muted leading-relaxed max-w-3xl">
              {localizedPhilosophy.split("\n\n")[0]}
            </p>
          </CollapsibleSection>
        </div>
      </section>

      {/* Accessibility Score */}
      {accessibilityScore && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
            <CollapsibleSection title={t("a11y.section")}>
              <h2 className="text-2xl md:text-3xl mb-4">{t("a11y.title")}</h2>
              <p className="text-muted mb-8 max-w-2xl">
                {t("a11y.description")}
              </p>
              <ScoreDetail score={accessibilityScore} />
            </CollapsibleSection>
          </div>
        </section>
      )}

      {/* SEO Extended */}
      <section id="style-seo" className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
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
