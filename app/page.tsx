"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllStylesMeta } from "@/lib/styles";
import { useI18n } from "@/lib/i18n/context";
import { FavoriteButton } from "@/components/favorite-button";

export default function Home() {
  const styles = getAllStylesMeta();
  const featuredStyle = styles[0]; // 第一个作为精选
  const { t } = useI18n();

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
                  <div className="aspect-[4/3] bg-[#ccff00] border-4 border-black flex items-center justify-center p-6 md:p-8">
                    {/* Live Neo-Brutalist Component Preview */}
                    <div className="w-full max-w-sm space-y-4">
                      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4">
                        <h3 className="font-black text-lg mb-2">Neo-Brutalist</h3>
                        <p className="font-mono text-sm text-gray-700 mb-3">
                          大胆的设计风格
                        </p>
                        <button className="bg-[#ff006e] text-white font-black px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm">
                          探索风格
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1 h-3 bg-[#ff006e] border-2 border-black"></div>
                        <div className="flex-1 h-3 bg-[#00d9ff] border-2 border-black"></div>
                        <div className="flex-1 h-3 bg-black"></div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/styles/${featuredStyle.slug}`}
                    className="absolute bottom-0 right-0 bg-black text-white px-4 py-2 text-xs tracking-wide hover:bg-[#ff006e] transition-colors border-t-4 border-l-4 border-black"
                  >
                    {t("home.viewDetails")} →
                  </Link>
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
                <Link
                  key={style.slug}
                  href={`/styles/${style.slug}`}
                  className="group block border border-border hover:border-foreground transition-colors"
                >
                  <div className="aspect-[16/9] bg-zinc-100 relative overflow-hidden">
                    {/* Style color preview */}
                    <div className="absolute inset-0 flex">
                      <div
                        className="flex-1"
                        style={{ backgroundColor: style.colors.primary }}
                      />
                      <div
                        className="flex-1"
                        style={{ backgroundColor: style.colors.secondary }}
                      />
                      {style.colors.accent.slice(0, 2).map((color, i) => (
                        <div
                          key={i}
                          className="flex-1"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="text-white font-serif text-2xl md:text-3xl italic">
                        {style.nameEn}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg md:text-xl group-hover:text-accent transition-colors">
                          {style.name}
                        </h3>
                        <span className="text-sm text-muted">
                          {style.nameEn}
                        </span>
                      </div>
                      <FavoriteButton slug={style.slug} size="sm" />
                    </div>
                    <p className="text-sm text-muted line-clamp-2">
                      {style.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {style.keywords.slice(0, 4).map((keyword) => (
                        <span
                          key={keyword}
                          className="text-xs px-2 py-1 bg-zinc-100 text-muted"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
