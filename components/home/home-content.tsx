"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { QuickExport } from "@/components/home/quick-export";
import { StyleCard } from "@/components/home/style-card";
import { FeaturedCarousel } from "@/components/home/featured-carousel";
import { AssetGallery } from "@/components/assets";
import { useAssets } from "@/lib/assets/hooks";
import type { StyleMeta } from "@/lib/styles/meta";

interface HomeContentProps {
  styles: StyleMeta[];
}

export function HomeContent({ styles }: HomeContentProps) {
  const { t } = useI18n();
  const assets = useAssets();
  const featuredAssets = assets.slice(0, 6);
  const featuredStyles = styles.slice(0, 6);

  return (
    <>
      {/* Hero - Magazine Cover Style */}
      <section className="relative border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Title & Intro */}
            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-4">
                {t("home.subtitle")}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
                {t("home.title.line1")}<br />
                {t("home.title.line2")}<br />
                <span className="italic">{t("home.title.line3")}</span>
              </h1>
              <p className="text-lg text-muted leading-relaxed max-w-md mb-8">
                {t("home.description")}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/styles"
                  className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
                >
                  {t("home.browseStyles")}
                </Link>
                <Link
                  href="/assets"
                  className="inline-flex items-center justify-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
                >
                  素材库
                </Link>
                <Link
                  href="/components"
                  className="inline-flex items-center justify-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
                >
                  {t("home.components")}
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm tracking-wide text-muted hover:text-foreground transition-colors"
                >
                  {t("home.learnMore")}
                </Link>
              </div>
            </div>

            {/* Right: Featured Style Preview */}
            <FeaturedCarousel styles={styles} />
          </div>
        </div>
      </section>

      {/* Features + Quick Export Combined */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <div className="p-6 border border-border">
              <p className="text-xs tracking-widest uppercase text-muted mb-3">01</p>
              <h3 className="text-lg mb-2">{t("home.feature.docs.title")}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {t("home.feature.docs.desc")}
              </p>
            </div>
            <div className="p-6 border border-border">
              <p className="text-xs tracking-widest uppercase text-muted mb-3">02</p>
              <h3 className="text-lg mb-2">{t("home.feature.preview.title")}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {t("home.feature.preview.desc")}
              </p>
            </div>
            <div className="p-6 border border-border">
              <p className="text-xs tracking-widest uppercase text-muted mb-3">03</p>
              <h3 className="text-lg mb-2">{t("home.feature.export.title")}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {t("home.feature.export.desc")}
              </p>
            </div>
          </div>

          {/* Quick Export - Compact Horizontal */}
          <QuickExport />
        </div>
      </section>

      {/* Style Catalog - 3-4 Columns */}
      <section>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-2">
                {t("home.styleCollection")}
              </p>
              <h2 className="text-2xl md:text-3xl">{t("home.styleCatalog")}</h2>
            </div>
            <Link
              href="/styles"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {t("home.viewAll")} →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {featuredStyles.map((style) => (
              <StyleCard key={style.slug} style={style} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* Asset Library - Featured Assets */}
      <section className="border-t border-border bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-2">
                素材库
              </p>
              <h2 className="text-2xl md:text-3xl">可爱卡通素材</h2>
            </div>
            <Link
              href="/assets"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              查看全部 →
            </Link>
          </div>

          <p className="text-sm text-muted mb-8 max-w-2xl">
            精选由AI工具生成的高质量卡通图案素材。可用于按钮装饰、页面点缀、徽章标记等多种场景。
          </p>

          <AssetGallery
            assets={featuredAssets}
            showSearch={false}
            showFilter={false}
            variant="mini"
          />
        </div>
      </section>
    </>
  );
}
