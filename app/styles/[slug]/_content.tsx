"use client";

import Link from "next/link";
import { ScrollBackButton } from "@/components/scroll-back-button";
import { ComponentPreview } from "@/components/style-preview/component-preview";
import { ColorPalette } from "@/components/style-preview/color-palette";
import { RulesExporter } from "@/components/style-preview/rules-exporter";
import { CodeBlock } from "@/components/style-preview/code-block";
import { TokensExportButton } from "@/components/tokens-export-button";
import { ExamplePrompts } from "@/components/style-preview/example-prompts";
import { QuickStartGuide } from "@/components/style-preview/quick-start-guide";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import { StylePackExport } from "@/components/style-preview/style-pack-export";
import { useI18n } from "@/lib/i18n/context";
import type { DesignStyle } from "@/lib/styles";

interface Props {
  style: DesignStyle;
  compatibleStyles: DesignStyle[];
  compatibleLayouts: DesignStyle[];
  enhancedRules: string | null;
}

export function StyleDetailContent({
  style,
  compatibleStyles,
  compatibleLayouts,
  enhancedRules,
}: Props) {
  const { t } = useI18n();

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
              <p className="text-xl text-muted mb-6">{style.nameEn}</p>
              <p className="text-lg text-muted leading-relaxed mb-6">
                {style.description}
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

          {/* Quick Start Guide */}
          <div className="mt-12">
            <QuickStartGuide
              aiRules={style.aiRules}
              styleName={style.name}
            />
          </div>
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
          <h2 className="text-2xl md:text-3xl mb-8">Global CSS</h2>
          <CodeBlock code={style.globalCss} language="css" />
        </div>
      </section>

      {/* Example Prompts */}
      {style.examplePrompts && style.examplePrompts.length > 0 && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("styleDetail.quickStart")}
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">{t("styleDetail.examplePrompts")}</h2>
            <p className="text-muted mb-8 max-w-2xl">
              {t("styleDetail.examplePromptsDesc").replace("{name}", style.name)}
            </p>
            <ExamplePrompts
              prompts={style.examplePrompts}
              styleName={style.name}
              aiRules={style.aiRules}
            />
          </div>
        </section>
      )}

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

      {/* Style Pack Export */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            Style Pack
          </p>
          <h2 className="text-2xl md:text-3xl mb-4">{t("styleDetail.exportStylePack")}</h2>
          <p className="text-muted mb-8 max-w-2xl">
            {t("styleDetail.exportStylePackDesc")}
          </p>
          <StylePackExport style={style} />
        </div>
      </section>

      {/* AI Rules Export */}
      <section>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("styleDetail.export")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-4">AI Rules</h2>
          <p className="text-muted mb-8 max-w-2xl">
            {t("styleDetail.aiRulesDesc").replace("{name}", style.name)}
          </p>
          <RulesExporter
            aiRules={style.aiRules}
            globalCss={style.globalCss}
            styleName={style.name}
            enhancedRules={enhancedRules}
          />
        </div>
      </section>
    </>
  );
}
