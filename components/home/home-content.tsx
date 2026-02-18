"use client";

import Link from "next/link";
import {
  ArrowRight,
  LayoutTemplate,
  type LucideIcon,
  Monitor,
  Rocket,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { StyleCard } from "@/components/home/style-card";
import { FeaturedCarousel } from "@/components/home/featured-carousel";
import { RevealOnScroll } from "@/components/home/reveal-on-scroll";
import { TrendingStyles } from "@/components/home/trending-styles";
import type { StyleMeta } from "@/lib/styles/meta";

interface HomeContentProps {
  styles: StyleMeta[];
}

export function HomeContent({ styles }: HomeContentProps) {
  const { t } = useI18n();
  const featuredStyles = styles
    .filter((style, index, all) => {
      if (!style.slug) return false;
      return all.findIndex((candidate) => candidate.slug === style.slug) === index;
    })
    .slice(0, 8);

  const templateEntrances: Array<{
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
  }> = [
    {
      title: t("templates.typeSaas"),
      description: t("templates.description"),
      href: "/templates?type=saas",
      icon: Rocket,
    },
    {
      title: t("templates.typeDashboard"),
      description: t("templates.description"),
      href: "/templates?type=dashboard",
      icon: Monitor,
    },
    {
      title: t("templates.typeLanding"),
      description: t("templates.description"),
      href: "/templates?type=landing",
      icon: LayoutTemplate,
    },
  ];
  const ctaPrimaryClassName = "inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors";
  const ctaSecondaryClassName = "inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors";
  const smallLinkClassName = "inline-flex items-center gap-1.5 text-xs tracking-wide text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors";
  const sectionLabelClassName = "text-[11px] tracking-[0.16em] uppercase text-muted";
  const sectionTitleClassName = "text-[1.6rem] sm:text-2xl md:text-3xl leading-tight tracking-tight";
  const heroStats = [
    { value: `${styles.length}+`, label: t("home.metricStyles") },
    { value: "2", label: t("nav.templates") },
    { value: String(featuredStyles.length), label: t("analytics.trending.title") },
  ];

  return (
    <>
      <section id="home-hero" className="relative border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 left-[-8rem] h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-[-9rem] right-[-4rem] h-72 w-72 rounded-full bg-foreground/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.04))] dark:bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.04))]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
            <RevealOnScroll instant>
              <p className={`${sectionLabelClassName} mb-4`}>{t("home.subtitle")}</p>
              <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight max-w-[11ch] mb-4 sm:mb-6">
                {t("home.title.line1")}
                <br />
                {t("home.title.line2")}
                <br />
                <span className="italic">{t("home.title.line3")}</span>
              </h1>
              <p className="text-[15px] sm:text-lg text-muted leading-relaxed max-w-lg mb-6 sm:mb-8">{t("home.description")}</p>
              <div className="grid grid-cols-1 gap-2.5 sm:flex sm:flex-row sm:flex-wrap sm:gap-3">
                <Link
                  href="/styles"
                  className={ctaPrimaryClassName}
                >
                  {t("nav.styles")}
                </Link>
                <Link
                  href="/templates"
                  className={ctaSecondaryClassName}
                >
                  {t("nav.templates")}
                </Link>
              </div>

              <ul className="mt-3.5 sm:mt-5 grid grid-cols-3 gap-2 sm:gap-2.5 max-w-md" aria-label={t("home.metricAriaLabel")}>
                {heroStats.map((item) => (
                  <li
                    key={item.label}
                    className="border border-border bg-background/70 px-2.5 sm:px-3 py-2 sm:py-2.5"
                  >
                    <p className="text-sm sm:text-base leading-none mb-1">{item.value}</p>
                    <p className="text-[10px] sm:text-[11px] text-muted leading-tight">{item.label}</p>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>

            <RevealOnScroll instant className="w-full max-w-xl lg:max-w-none lg:justify-self-end">
              <FeaturedCarousel styles={styles} />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section id="home-template-catalog" className="relative border-b border-border scroll-mt-24 bg-zinc-50/40 dark:bg-zinc-900/15">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/70 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-12 md:py-16">
          <RevealOnScroll variant="soft" className="mb-6 sm:mb-8">
            <p className={`${sectionLabelClassName} mb-2`}>{t("templates.subtitle")}</p>
            <div className="flex items-end justify-between gap-3">
              <h2 className={sectionTitleClassName}>{t("templates.title")}</h2>
              <Link href="/templates" className="text-sm text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors flex items-center gap-1">
                {t("home.viewAll")}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <p className="mt-3 text-sm text-muted max-w-2xl">{t("templates.description")}</p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {templateEntrances.map((feature, featureIndex) => {
              const Icon = feature.icon;
              return (
                <RevealOnScroll
                  key={feature.title}
                  variant="upStrong"
                  delayMs={90 + featureIndex * 60}
                  disableDelayOnMobile
                >
                  <article className="group relative overflow-hidden border border-border bg-background/70 p-4 sm:p-5 md:p-6 motion-safe:transition-all motion-safe:duration-200 hover:border-foreground focus-within:border-foreground focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-background motion-safe:hover:-translate-y-0.5">
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-10 h-10 border border-border flex items-center justify-center text-muted group-hover:text-foreground group-hover:border-foreground transition-colors mb-4">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg leading-snug mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted leading-relaxed md:min-h-[4.5rem]">{feature.description}</p>
                    <Link
                      href={feature.href}
                      className={`mt-5 ${smallLinkClassName}`}
                    >
                      {t("templates.openTemplate")}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <TrendingStyles styles={styles} sectionId="home-trending" />

      <section id="home-style-catalog" className="relative scroll-mt-24 bg-zinc-50/35 dark:bg-zinc-900/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.05),transparent_55%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-12 md:py-16">
          <RevealOnScroll variant="soft" className="flex items-end justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <p className={`${sectionLabelClassName} mb-2`}>{t("home.styleCollection")}</p>
              <h2 className={sectionTitleClassName}>{t("home.styleCatalog")}</h2>
            </div>
            <Link href="/styles" className="text-sm text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors flex items-center gap-1">
              {t("home.viewAll")}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 [content-visibility:auto] [contain-intrinsic-size:1px_680px]">
            {featuredStyles.map((style, styleIndex) => (
              <RevealOnScroll key={style.slug} variant="upSubtle" delayMs={60 + styleIndex * 30} disableDelayOnMobile>
                <StyleCard style={style} variant="compact" />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
