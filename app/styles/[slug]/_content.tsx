"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";
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
import { useI18n } from "@/lib/i18n/context";
import { useCommunityFeed } from "@/lib/swr";
import type { DesignStyle } from "@/lib/styles";
import type { AccessibilityScore } from "@/lib/accessibility";
import type { StyleVersion } from "@/lib/versioning";

interface Props {
  style: DesignStyle;
  compatibleStyles: DesignStyle[];
  compatibleLayouts: DesignStyle[];
  enhancedRules: string | null;
  accessibilityScore: AccessibilityScore | null;
  version?: string;
  changelog?: StyleVersion[];
}

export function StyleDetailContent({
  style,
  compatibleStyles,
  compatibleLayouts,
  enhancedRules,
  accessibilityScore,
  version,
  changelog,
}: Props) {
  const { t } = useI18n();
  const { data: communityData } = useCommunityFeed({
    slug: style.slug,
    limit: 1,
    offset: 0,
  });
  const communityAttribution = communityData?.items?.[0] ?? null;

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
                {style.description}
              </p>
              {communityAttribution && (
                <Link
                  href={`/community?slug=${style.slug}`}
                  className="inline-flex items-center gap-3 border border-border bg-background/70 px-3 py-2 mb-6 hover:border-foreground transition-colors"
                >
                  {communityAttribution.author.avatarUrl ? (
                    <Image
                      src={communityAttribution.author.avatarUrl}
                      alt={communityAttribution.author.handle}
                      width={24}
                      height={24}
                      unoptimized
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <span className="w-6 h-6 rounded-full bg-muted/30 inline-flex items-center justify-center text-[11px]">
                      {communityAttribution.author.handle.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="text-sm text-muted">
                    {t("community.by")}
                    {" "}
                    <span className="text-foreground font-medium">
                      @{communityAttribution.author.handle}
                    </span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-muted border border-border px-1.5 py-0.5">
                    {communityAttribution.author.provider}
                  </span>
                </Link>
              )}
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
                  href={`/compare?a=${style.slug}`}
                  className="inline-flex items-center gap-2 justify-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                  {t("styleDetail.compareWith")}
                </Link>
                <TokensExportButton style={style} />
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-4">
                {t("styleDetail.colorPalette")}
              </p>
              <ColorPalette colors={style.colors} />
            </div>
          </div>

        </div>
      </section>

      {/* Prompt Pair Export */}
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
            styleSlug={style.slug}
            aiRules={style.aiRules}
            enhancedRules={enhancedRules}
            doList={style.doList}
            dontList={style.dontList}
            keywords={style.keywords}
          />
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("styleDetail.philosophy")}
          </p>
          <div className="max-w-3xl">
            <div className="prose prose-lg">
              {style.philosophy.split("\n\n").map((paragraph, i) => (
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
                {style.doList.map((item, i) => (
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
                {style.dontList.map((item, i) => (
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
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("styleDetail.componentTemplates")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-8">{t("styleDetail.componentPreview")}</h2>
          <ComponentPreview components={style.components} />
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
      <section className="border-t border-border">
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
    </>
  );
}
