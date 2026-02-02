"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllStylesMeta } from "@/lib/styles";
import { useI18n } from "@/lib/i18n/context";
import { QuickExport } from "@/components/home/quick-export";
import { StyleCard } from "@/components/home/style-card";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const styles = getAllStylesMeta();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredStyle = styles.length > 0 ? styles[featuredIndex] : null;
  const { t } = useI18n();

  const nextStyle = () => {
    if (styles.length > 0) {
      setFeaturedIndex((i) => (i + 1) % styles.length);
    }
  };
  const prevStyle = () => {
    if (styles.length > 0) {
      setFeaturedIndex((i) => (i - 1 + styles.length) % styles.length);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero - Magazine Cover Style */}
        <section className="relative border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              {/* Left: Title & Intro */}
              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-4">
                  {t("home.subtitle")}
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
                  {t("home.title.line1")}<br />
                  {t("home.title.line2")}<br />
                  <span className="italic">{t("home.title.line3")}</span>
                </h1>
                <p className="text-lg md:text-xl text-muted leading-relaxed max-w-md mb-8">
                  {t("home.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/styles"
                    className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
                  >
                    {t("home.browseStyles")}
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
              {featuredStyle && (
                <div className="relative">
                  <Link
                    href={`/styles/${featuredStyle.slug}`}
                    className="block aspect-[4/3] border border-border overflow-hidden hover:border-foreground transition-colors"
                  >
                    <StyleCoverPreview styleSlug={featuredStyle.slug} />
                  </Link>
                  {/* Style name + navigation */}
                  <div className="flex items-center justify-between mt-3">
                    <Link href={`/styles/${featuredStyle.slug}`} className="group">
                      <p className="text-sm font-medium group-hover:text-accent transition-colors">{featuredStyle.name}</p>
                      <p className="text-xs text-muted">{featuredStyle.nameEn}</p>
                    </Link>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={prevStyle}
                        className="w-8 h-8 flex items-center justify-center border border-border hover:border-foreground transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-muted tabular-nums">
                        {featuredIndex + 1}/{styles.length}
                      </span>
                      <button
                        onClick={nextStyle}
                        className="w-8 h-8 flex items-center justify-center border border-border hover:border-foreground transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <p className="text-xs tracking-widest uppercase text-muted mb-8">
              {t("home.coreFeatures")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div>
                <h3 className="text-xl md:text-2xl mb-3">{t("home.feature.docs.title")}</h3>
                <p className="text-muted leading-relaxed">
                  {t("home.feature.docs.desc")}
                </p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl mb-3">{t("home.feature.preview.title")}</h3>
                <p className="text-muted leading-relaxed">
                  {t("home.feature.preview.desc")}
                </p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl mb-3">{t("home.feature.export.title")}</h3>
                <p className="text-muted leading-relaxed">
                  {t("home.feature.export.desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Export */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-4">
                  {t("quickExport.label")}
                </p>
                <h2 className="text-2xl md:text-3xl mb-4">
                  {t("quickExport.title")}
                </h2>
                <p className="text-muted leading-relaxed">
                  {t("quickExport.description")}
                </p>
              </div>
              <QuickExport />
            </div>
          </div>
        </section>

        {/* Style Preview List */}
        <section>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="flex items-end justify-between mb-8 md:mb-12">
              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-2">
                  {t("home.styleCollection")}
                </p>
                <h2 className="text-3xl md:text-4xl">{t("home.styleCatalog")}</h2>
              </div>
              <Link
                href="/styles"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {t("home.viewAll")} →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {styles.map((style) => (
                <StyleCard key={style.slug} style={style} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
