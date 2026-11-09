/// <reference types="react/canary" />
"use client";

import { Suspense, useEffect, useRef, useState, useCallback, ViewTransition, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { ScrollBackButton } from "@/components/scroll-back-button";
import { ComponentPreview } from "@/components/style-preview/component-preview";
import { ColorPalette } from "@/components/style-preview/color-palette";
import { CodeBlock } from "@/components/style-preview/code-block";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import { VersionBadge } from "@/components/styles/version-badge";
import { StyleRating } from "@/components/styles/style-rating";
import { StyleRatingBadge } from "@/components/styles/style-rating-badge";
import { StyleComments } from "@/components/styles/style-comments";
import { CollapsibleSection } from "@/components/ui/collapsible-section";
import { useI18n } from "@/lib/i18n/context";
import { localizedString, localizedList } from "@/lib/styles/locale-content";
import { trackEvent } from "@/lib/analytics/events";

import type { DesignStyle } from "@/lib/styles";
import type { StyleVersion } from "@/lib/versioning";
import type { Locale } from "@/lib/i18n/translations";
import {
  getRecipesByLayout,
  getRecipesByVisualStyle,
} from "@/lib/styles/recipe-selectors";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { getRoomBySlug } from "@/components/mouse-interactions/rooms/registry";
import { GenericRoom } from "@/components/mouse-interactions/rooms/generic-room";
import { DesignMdSection } from "@/components/style-preview/design-md-section";

type CompatibleStyleSummary = Pick<DesignStyle, "slug" | "name" | "nameEn">;

/** The nearest sibling, carrying the fields a visible comparison needs. */
export interface ComparisonSibling extends CompatibleStyleSummary {
  colors: DesignStyle["colors"];
  keywords: string[];
  tags: DesignStyle["tags"];
}

interface Props {
  style: DesignStyle;
  compatibleStyles: CompatibleStyleSummary[];
  compatibleLayouts: CompatibleStyleSummary[];
  relatedStyles?: CompatibleStyleSummary[];
  comparison?: ComparisonSibling | null;
  /** Complete design.md for this locale, rendered on the server. */
  designMarkdown: string;
  hasDesignSpec: boolean;
  faqSection?: ReactNode;
  version?: string;
  changelog?: StyleVersion[];
  /** SSR-precomputed locale for server-rendered hero content */
  ssrLocale?: Locale;
}

export function StyleDetailContent({
  style,
  compatibleStyles,
  compatibleLayouts,
  relatedStyles = [],
  comparison = null,
  designMarkdown,
  hasDesignSpec,
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
  const getPrimaryName = (targetStyle: CompatibleStyleSummary) =>
    locale === "zh" ? targetStyle.name : targetStyle.nameEn || targetStyle.name;
  const getSecondaryName = (targetStyle: CompatibleStyleSummary) =>
    locale === "zh" ? targetStyle.nameEn : targetStyle.name;
  const comparisonKeywordsHere = localizedKeywords.slice(0, 3);
  const comparisonTagsHere = comparison
    ? (style.tags ?? []).filter((tag) => !comparison.tags.includes(tag))
    : [];
  const comparisonTagsThere = comparison
    ? comparison.tags.filter((tag) => !(style.tags ?? []).includes(tag))
    : [];
  const detailSections = [
    {
      href: "#style-prompts",
      label: locale === "zh" ? "AI 实现" : "AI Implementation",
    },
    {
      href: "#style-feedback",
      label: t("styleDetail.ratingsFeedback"),
    },
    {
      href: "#style-components",
      label: t("styleDetail.componentPreview"),
    },
    ...(pointerRoom
      ? [{ href: "#style-pointer", label: locale === "zh" ? "指针交互" : "Pointer" }]
      : []),
    ...(faqSection
      ? [{ href: "#style-faq", label: locale === "zh" ? "常见问题" : "FAQ" }]
      : []),
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
          <div className="mb-4">
            <ScrollBackButton label={t("styleDetail.backToCatalog")} href="/styles" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-2">
                {primaryStyleName}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {secondaryStyleName && secondaryStyleName !== primaryStyleName && (
                  <p className="text-xl text-muted">{secondaryStyleName}</p>
                )}
                {version && (
                  <VersionBadge version={version} changelog={changelog} />
                )}
                <StyleRatingBadge slug={style.slug} />
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
                <LocalizedLink
                  href="#style-prompts"
                  className="inline-flex min-h-[48px] items-center justify-center bg-foreground px-5 py-3 text-sm tracking-wide text-background transition-colors hover:bg-foreground/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t("styleDetail.export")}
                </LocalizedLink>
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

      <DesignMdSection
        slug={style.slug}
        styleName={primaryStyleName}
        hasSpec={hasDesignSpec}
        markdown={designMarkdown}
      />

      {/* Community — keep feedback close to the prompt users act on */}
      <section id="style-feedback" className="border-b border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("community.label")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-6">{t("styleDetail.ratingsFeedback")}</h2>
          <div className="mb-8">
            <StyleRating slug={style.slug} />
          </div>
          <Suspense fallback={<p role="status" className="text-sm text-muted">{locale === "zh" ? "正在加载评论…" : "Loading comments…"}</p>}>
            <StyleComments key={style.slug} slug={style.slug} />
          </Suspense>
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
            previewAssets={style.previewAssets}
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

      {/* Related Styles: sideways links to same-category siblings. Many
          localized style pages are known to Google but never crawled, so every
          detail page links to its nearest neighbours. */}
      {relatedStyles.length > 0 && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("seo.relatedStyles")}
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">
              {t("seo.relatedStyles")}
            </h2>
            <p className="text-muted mb-8 max-w-2xl">
              {t("seo.relatedStylesDesc")}
            </p>
            {comparison ? (
              <div className="mb-10 overflow-x-auto">
                <p className="max-w-2xl text-muted mb-4">
                  {locale === "zh"
                    ? `${primaryStyleName} 和 ${getPrimaryName(comparison)} 是最接近的两个方向。下表列出它们在配色、适用场景和标签上的实际差异，选之前先看这一栏。`
                    : `${primaryStyleName} and ${getPrimaryName(comparison)} sit closest to each other. The table below gives the real differences in color, use case, and tags, so the choice between them is made on facts.`}
                </p>
                <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-foreground">
                      <th scope="col" className="py-3 pr-6 font-mono text-[11px] uppercase tracking-wider text-muted">
                        {locale === "zh" ? "维度" : "Attribute"}
                      </th>
                      <th scope="col" className="py-3 pr-6 font-semibold">
                        {primaryStyleName}
                      </th>
                      <th scope="col" className="py-3 font-semibold">
                        {getPrimaryName(comparison)}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        label: locale === "zh" ? "主色" : "Primary color",
                        here: style.colors?.primary,
                        there: comparison.colors?.primary,
                      },
                      {
                        label: locale === "zh" ? "辅助色" : "Secondary color",
                        here: style.colors?.secondary,
                        there: comparison.colors?.secondary,
                      },
                    ].map((row) => (
                      <tr key={row.label} className="border-b border-border">
                        <th scope="row" className="py-3 pr-6 font-normal text-muted">
                          {row.label}
                        </th>
                        {[row.here, row.there].map((color, index) => (
                          <td key={`${row.label}-${index}`} className="py-3 pr-6">
                            <span className="inline-flex items-center gap-2">
                              <span
                                aria-hidden="true"
                                className="inline-block h-4 w-4 border border-border"
                                style={{ backgroundColor: color }}
                              />
                              <span className="font-mono text-xs">{color}</span>
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="border-b border-border">
                      <th scope="row" className="py-3 pr-6 font-normal text-muted">
                        {locale === "zh" ? "适合场景" : "Best for"}
                      </th>
                      <td className="py-3 pr-6">{comparisonKeywordsHere.join(" / ")}</td>
                      <td className="py-3">{comparison.keywords.slice(0, 3).join(" / ")}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="py-3 pr-6 font-normal text-muted">
                        {locale === "zh" ? "独有标签" : "Unique tags"}
                      </th>
                      <td className="py-3 pr-6">{comparisonTagsHere.join(", ") || "—"}</td>
                      <td className="py-3">{comparisonTagsThere.join(", ") || "—"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : null}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedStyles.map((relatedStyle) => (
                <LocalizedLink
                  key={relatedStyle.slug}
                  href={`/styles/${relatedStyle.slug}`}
                  className="group block border border-border hover:border-foreground transition-colors"
                >
                  <div className="aspect-square overflow-hidden">
                    <StyleCoverPreview styleSlug={relatedStyle.slug} />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium group-hover:text-accent transition-colors">
                      {getPrimaryName(relatedStyle)}
                    </p>
                    <p className="text-xs text-muted">{getSecondaryName(relatedStyle)}</p>
                  </div>
                </LocalizedLink>
              ))}
            </div>
          </div>
        </section>
      )}

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
