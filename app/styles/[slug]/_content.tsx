/// <reference types="react/canary" />
"use client";

import { useEffect, useRef, useState, useCallback, useMemo, ViewTransition, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { ScrollBackButton } from "@/components/scroll-back-button";
import { ComponentPreview } from "@/components/style-preview/component-preview";
import { ColorPalette } from "@/components/style-preview/color-palette";
import { AiImplementationPanel } from "@/components/style-preview/ai-implementation-panel";
import { HardPromptCopyButton } from "@/components/style-preview/hard-prompt-copy-button";
import { CodeBlock } from "@/components/style-preview/code-block";
import { TokensExportButton } from "@/components/tokens-export-button";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import { StyleUsePanel } from "@/components/style-preview/style-use-panel";
import { getCollectionsForTags } from "@/lib/styles/collections";
import { getStyleMetaBySlug } from "@/lib/styles/meta";
import { ScoreBadge } from "@/components/accessibility/score-badge";
import { ScoreDetail } from "@/components/accessibility/score-detail";
import { IdeExportButtons } from "@/components/export/ide-export-buttons";
import { VersionBadge } from "@/components/styles/version-badge";
import { StyleRating } from "@/components/styles/style-rating";
import { StyleComments } from "@/components/styles/style-comments";
import { CollapsibleSection } from "@/components/ui/collapsible-section";
import { LazySection } from "@/components/ui/lazy-section";
import { useI18n } from "@/lib/i18n/context";
import { localizedString, localizedList } from "@/lib/styles/locale-content";
import { buildPromptPair } from "@/lib/styles/prompt-pair";
import { trackEvent } from "@/lib/analytics/events";
import { addPromptPurpose } from "@/components/style-preview/_prompt-builders";

import type { DesignStyle } from "@/lib/styles";
import type { AccessibilityScore } from "@/lib/accessibility";
import type { StyleVersion } from "@/lib/versioning";
import type { Locale } from "@/lib/i18n/translations";
import {
  getRecipesByLayout,
  getRecipesByVisualStyle,
} from "@/lib/styles/recipe-selectors";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { getRoomBySlug } from "@/components/mouse-interactions/rooms/registry";
import { GenericRoom } from "@/components/mouse-interactions/rooms/generic-room";

// StylePackExport statically fans out to the full design-token registry
// (every *-tokens.ts) plus JSZip. Loading it via next/dynamic keeps that
// subtree out of the page's synchronous first-load bundle; SSR output is
// unchanged because the component still renders on the server.
const StylePackExport = dynamic(
  () =>
    import("@/components/style-preview/style-pack-export").then(
      (m) => m.StylePackExport
    ),
  { ssr: true }
);

type CompatibleStyleSummary = Pick<DesignStyle, "slug" | "name" | "nameEn">;

interface Props {
  style: DesignStyle;
  hasIdeExports?: boolean;
  compatibleStyles: CompatibleStyleSummary[];
  compatibleLayouts: CompatibleStyleSummary[];
  enhancedRules: string | null;
  accessibilityScore: AccessibilityScore | null;
  readinessSection: ReactNode;
  faqSection?: ReactNode;
  version?: string;
  changelog?: StyleVersion[];
  /** SSR-precomputed locale for server-rendered hero content */
  ssrLocale?: Locale;
}

export function StyleDetailContent({
  style,
  hasIdeExports = true,
  compatibleStyles,
  compatibleLayouts,
  enhancedRules,
  accessibilityScore,
  readinessSection,
  faqSection,
  version,
  changelog,
  ssrLocale,
}: Props) {
  const { t, locale: clientLocale } = useI18n();
  const locale = ssrLocale ?? clientLocale;
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
  // Get related recipes
  const relatedRecipes = style.styleType === "layout"
    ? getRecipesByLayout(style.slug).slice(0, 3)
    : getRecipesByVisualStyle(style.slug).slice(0, 3);
  const pointerRoom = getRoomBySlug(style.slug) ?? null;

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
  const localizedKeywords = localizedList(locale, style.keywords, style.keywordsEn);
  const primaryStyleName = locale === "zh" ? style.name : style.nameEn || style.name;
  const secondaryStyleName = locale === "zh" ? style.nameEn : style.name;
  const hardPromptContent = useMemo(() => {
    const promptInput = {
      styleName: primaryStyleName,
      styleSlug: style.slug,
      aiRules: style.aiRules,
      aiRulesEn: style.aiRulesEn,
      enhancedRules,
      doList: style.doList,
      doListEn: style.doListEn,
      dontList: style.dontList,
      dontListEn: style.dontListEn,
      keywords: style.keywords,
      keywordsEn: style.keywordsEn,
    };

    return addPromptPurpose({
      locale,
      kind: "hard",
      content: buildPromptPair(promptInput, locale).hardPrompt,
    });
  }, [enhancedRules, locale, primaryStyleName, style]);
  const getPrimaryName = (targetStyle: CompatibleStyleSummary) =>
    locale === "zh" ? targetStyle.name : targetStyle.nameEn || targetStyle.name;
  const getSecondaryName = (targetStyle: CompatibleStyleSummary) =>
    locale === "zh" ? targetStyle.nameEn : targetStyle.name;
  const detailSections = [
    {
      href: "#style-prompts",
      label: locale === "zh" ? "AI 实现" : "AI Implementation",
    },
    {
      href: "#style-components",
      label: t("styleDetail.componentPreview"),
    },
    ...(pointerRoom
      ? [{ href: "#style-pointer", label: locale === "zh" ? "指针交互" : "Pointer" }]
      : []),
    {
      href: "#frontend-readiness",
      label: locale === "zh" ? "完成度" : "Readiness",
    },
    ...(faqSection
      ? [{ href: "#style-faq", label: locale === "zh" ? "常见问题" : "FAQ" }]
      : []),
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
        localizedKeywords.length > 0
          ? localizedKeywords.slice(0, 3).join(" / ")
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
              <span>{primaryStyleName}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-2">
                {primaryStyleName}
              </h1>
              <div className="flex items-center gap-3 mb-6">
                {secondaryStyleName && secondaryStyleName !== primaryStyleName && (
                  <p className="text-xl text-muted">{secondaryStyleName}</p>
                )}
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
                {localizedKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="text-xs px-3 py-1 bg-zinc-100 text-muted"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-6">
                <HardPromptCopyButton
                  content={hardPromptContent}
                  locale={locale}
                  slug={style.slug}
                />
                <LocalizedLink
                  href={`/styles/${style.slug}/showcase`}
                  onClick={() =>
                    trackEvent("showcase_open", { slug: style.slug, source: "hero" })
                  }
                  className="inline-flex min-h-[48px] items-center justify-center border border-border px-6 py-3 text-sm tracking-wide transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
                  onClick={() =>
                    trackEvent("showcase_open", {
                      slug: style.slug,
                      source: "preview_card",
                    })
                  }
                  className="group block border border-border overflow-hidden hover:border-foreground transition-colors"
                >
                  {/*
                    Shared-element transition: pairs with the list card cover
                    (same style-cover-<slug> name). The plain wrapper div gives
                    the boundary a single always-rendered DOM child; only the
                    responsive cover inside it is visible at a given viewport.
                  */}
                  <ViewTransition
                    name={`style-cover-${style.slug}`}
                    enter="none"
                    exit="none"
                    update="none"
                  >
                    <div>
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
                            title={`${primaryStyleName} Showcase Preview`}
                            className="absolute top-0 left-0 w-[1280px] h-[800px] origin-top-left border-0 pointer-events-none select-none"
                            style={{ transform: `scale(${showcaseScale})` }}
                            tabIndex={-1}
                            loading="lazy"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>
                  </ViewTransition>
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

      {/* AI implementation documents */}
      <section id="style-prompts" className="border-b border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {locale === "zh" ? "AI 实现文档" : "AI Implementation"}
          </p>
          <h2 className="text-2xl md:text-3xl mb-4">
            {locale === "zh"
              ? "先复制硬性提示词，需要时再看设计规范"
              : "Copy the Hard Prompt first, then use the spec when needed"}
          </h2>
          <p className="text-muted mb-8 max-w-2xl">
            {locale === "zh"
              ? `默认用硬性提示词让 AI 直接生成前端；Design Spec 用来理解、改写和审核风格；Creative Brief 用来早期探索方向。`
              : `Use the Hard Prompt by default to generate UI. Use the Design Spec to understand, modify, and review the style. Use the Creative Brief for early exploration.`}
          </p>
          <AiImplementationPanel
            styleName={primaryStyleName}
            styleSlug={style.slug}
            description={localizedDescription}
            philosophy={localizedPhilosophy}
            colors={style.colors}
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

      {/* Use this style — conversion: registry / CLI / MCP */}
      <section className="border-b border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
          <StyleUsePanel slug={style.slug} name={style.name} nameEn={style.nameEn} />
          {(() => {
            const relatedCollections = getCollectionsForTags(
              getStyleMetaBySlug(style.slug)?.tags
            );
            if (relatedCollections.length === 0) return null;
            return (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-muted">
                  {locale === "zh" ? "所属合集" : "Part of"}
                </span>
                {relatedCollections.map((collection) => (
                  <LocalizedLink
                    key={collection.slug}
                    href={`/collections/${collection.slug}`}
                    className="border border-border px-3 py-1.5 text-sm transition-colors hover:border-foreground hover:text-foreground"
                  >
                    {locale === "zh" ? collection.titleZh : collection.titleEn}
                  </LocalizedLink>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Component Preview */}
      <section id="style-components" className="border-b border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("styleDetail.componentTemplates")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-8">{t("styleDetail.componentPreview")}</h2>
          <ComponentPreview
            components={style.components}
            defaultShowCode={false}
            styleSlug={style.slug}
          />
        </div>
      </section>

      {/* Pointer Interactions — 仅定制动效的风格渲染 */}
      {pointerRoom ? (
        <section id="style-pointer" className="border-b border-border scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {locale === "zh" ? "指针交互气质" : "Pointer Interactions"}
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">
              {locale === "zh"
                ? `${primaryStyleName}的鼠标交互`
                : `How ${primaryStyleName} moves`}
            </h2>
            <p className="text-muted mb-8 max-w-2xl">
              {locale === "zh"
                ? "这套风格定制的指针交互——同一个光标,完全不同的性格。在舞台上移动鼠标感受它。"
                : "Pointer interactions tailored to this style — same cursor, completely different character. Move around the stage to feel it."}
            </p>
            <div className="overflow-hidden rounded-lg border border-border">
              {pointerRoom.Component ? (
                <pointerRoom.Component showHeader={false} />
              ) : (
                <GenericRoom config={pointerRoom} showHeader={false} />
              )}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {pointerRoom.effects[locale === "zh" ? "zh" : "en"].map((effect) => (
                <span key={effect} className="border border-border px-3 py-1 text-xs text-muted">
                  {effect}
                </span>
              ))}
              <LocalizedLink
                href="/mouse-interactions"
                className="ml-auto inline-flex items-center gap-1 text-xs text-muted hover:text-foreground transition-colors"
              >
                {locale === "zh" ? "在 Cursor Lab 查看全部房间" : "Explore all rooms in Cursor Lab"}
                <ArrowRight className="w-3 h-3" />
              </LocalizedLink>
            </div>
          </div>
        </section>
      ) : null}

      {/* Frontend Readiness */}
      {readinessSection}

      {faqSection}

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
              {t("styleDetail.compatibleVisualDesc").replace("{name}", primaryStyleName)}
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
                      {getPrimaryName(compatStyle)}
                    </p>
                    <p className="text-xs text-muted">{getSecondaryName(compatStyle)}</p>
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
              {t("styleDetail.compatibleLayoutDesc").replace("{name}", primaryStyleName)}
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
                      {getPrimaryName(layoutStyle)}
                    </p>
                    <p className="text-xs text-muted">{getSecondaryName(layoutStyle)}</p>
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
          {hasIdeExports && (
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
            <StylePackExport style={style} version={version} />
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

      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {locale === "zh" ? "设计配方" : "Design Recipes"}
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">
              {locale === "zh"
                ? `使用 ${primaryStyleName} 的推荐组合`
                : `Recommended Combinations with ${primaryStyleName}`}
            </h2>
            <p className="text-muted mb-8 max-w-2xl">
              {locale === "zh"
                ? "这些精选配方将此风格与布局和动画组合，针对特定场景优化。"
                : "These curated recipes combine this style with layouts and animations, optimized for specific use cases."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
