"use client";

import Link from "next/link";
import { ArrowRight, BookOpenText, Component, Sparkles, type LucideIcon } from "lucide-react";
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

  const workflows = [
    {
      badge: t("home.pathA.badge"),
      title: t("home.pathA.title"),
      description: t("home.pathA.desc"),
      steps: [t("home.pathA.step1"), t("home.pathA.step2"), t("home.pathA.step3")],
      links: [
        { href: "/create-style", label: t("home.pathA.link1") },
        { href: "/generate", label: t("home.pathA.link2") },
      ],
    },
    {
      badge: t("home.pathB.badge"),
      title: t("home.pathB.title"),
      description: t("home.pathB.desc"),
      steps: [t("home.pathB.step1"), t("home.pathB.step2"), t("home.pathB.step3")],
      links: [
        { href: "/styles", label: t("home.pathB.link1") },
        { href: "/generate", label: t("home.pathB.link2") },
      ],
    },
  ] as const;
  const coreFeatures: Array<{
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
  }> = [
    {
      title: t("home.feature.docs.title"),
      description: t("home.feature.docs.desc"),
      href: "/guide",
      icon: BookOpenText,
    },
    {
      title: t("home.feature.preview.title"),
      description: t("home.feature.preview.desc"),
      href: "/components",
      icon: Component,
    },
    {
      title: t("home.feature.export.title"),
      description: t("home.feature.export.desc"),
      href: "/generate",
      icon: Sparkles,
    },
  ];
  const ctaPrimaryClassName = "inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors";
  const ctaSecondaryClassName = "inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors";
  const smallLinkClassName = "inline-flex items-center gap-1.5 text-xs tracking-wide text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors";
  const quickJumpLinkClassName = "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] border border-border text-muted hover:text-foreground hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors";
  const sectionLabelClassName = "text-[11px] tracking-[0.16em] uppercase text-muted";
  const sectionTitleClassName = "text-[1.6rem] sm:text-2xl md:text-3xl leading-tight tracking-tight";
  const heroStats = [
    { value: `${styles.length}+`, label: t("home.metricStyles") },
    { value: String(workflows.length), label: t("home.metricPaths") },
    { value: String(workflows.reduce((sum, workflow) => sum + workflow.steps.length, 0)), label: t("home.metricSteps") },
  ];
  const quickLinks = [
    { href: "#home-core-features", label: t("home.coreFeatures") },
    { href: "#home-flow", label: t("home.flowLabel") },
    { href: "#home-trending", label: t("analytics.trending.title") },
    { href: "#home-style-catalog", label: t("home.styleCatalog") },
  ];

  return (
    <>
      <section className="relative border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 left-[-8rem] h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-[-9rem] right-[-4rem] h-72 w-72 rounded-full bg-foreground/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.04))] dark:bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.04))]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
            <RevealOnScroll instant>
              <p className={`${sectionLabelClassName} mb-4`}>{t("home.subtitle")}</p>
              <h1 className="text-[2.15rem] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight max-w-[11ch] mb-5 sm:mb-6">
                {t("home.title.line1")}
                <br />
                {t("home.title.line2")}
                <br />
                <span className="italic">{t("home.title.line3")}</span>
              </h1>
              <p className="text-base sm:text-lg text-muted leading-relaxed max-w-lg mb-7 sm:mb-8">{t("home.description")}</p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3">
                <Link
                  href="/create-style"
                  className={ctaPrimaryClassName}
                >
                  {t("home.ctaPathA")}
                </Link>
                <Link
                  href="/styles"
                  className={ctaSecondaryClassName}
                >
                  {t("home.ctaPathB")}
                </Link>
                <Link
                  href="/generate"
                  className={ctaSecondaryClassName}
                >
                  {t("home.ctaGenerate")}
                </Link>
              </div>

              <ul className="mt-4 sm:mt-5 grid grid-cols-3 gap-2 sm:gap-2.5 max-w-md" aria-label={t("home.metricAriaLabel")}>
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

              <nav className="mt-5 sm:mt-6" aria-label={t("home.quickJump")}>
                <p className={`${sectionLabelClassName} mb-2`}>{t("home.quickJump")}</p>
                <div className="flex gap-2 overflow-x-auto pb-1 pr-2 scrollbar-hide lg:flex-wrap lg:overflow-visible lg:pb-0 lg:pr-0">
                  {quickLinks.map((item) => (
                    <Link key={item.href} href={item.href} className={quickJumpLinkClassName}>
                      {item.label}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              </nav>
            </RevealOnScroll>

            <RevealOnScroll instant className="w-full max-w-xl lg:max-w-none lg:justify-self-end">
              <FeaturedCarousel styles={styles} />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section id="home-core-features" className="border-b border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-12 md:py-16">
          <RevealOnScroll variant="soft" className="mb-6 sm:mb-8">
            <h2 className={sectionTitleClassName}>{t("home.coreFeatures")}</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {coreFeatures.map((feature, featureIndex) => {
              const Icon = feature.icon;
              return (
                <RevealOnScroll
                  key={feature.title}
                  variant="upStrong"
                  delayMs={100 + featureIndex * 70}
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
                      {t("home.viewDetails")}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <section id="home-flow" className="border-b border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-12 md:py-16">
          <RevealOnScroll variant="soft" className="mb-6 sm:mb-8 space-y-2">
            <p className={sectionLabelClassName}>{t("home.flowLabel")}</p>
            <h2 className={`${sectionTitleClassName} max-w-3xl`}>{t("home.flowTitle")}</h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {workflows.map((workflow, workflowIndex) => (
              <RevealOnScroll
                key={`${workflowIndex}-${workflow.title}`}
                variant="upSubtle"
                delayMs={90 + workflowIndex * 55}
                disableDelayOnMobile
              >
                <article className="group relative overflow-hidden border border-border bg-background/70 p-4 sm:p-5 md:p-6 space-y-4 transition-colors hover:border-foreground focus-within:border-foreground focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-background motion-safe:hover:-translate-y-0.5">
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs tracking-widest uppercase text-muted">{workflow.badge}</p>
                    <span className="inline-flex items-center justify-center min-w-7 h-7 px-2 text-[10px] tracking-widest border border-border text-muted">
                      PATH {workflowIndex === 0 ? "A" : "B"}
                    </span>
                  </div>
                  <h3 className="text-lg">{workflow.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{workflow.description}</p>
                  <ol className="space-y-2.5 text-sm text-muted">
                    {workflow.steps.map((step, stepIndex) => {
                      const isLastStep = stepIndex === workflow.steps.length - 1;

                      return (
                        <li key={`${workflowIndex}-${stepIndex}`} className="relative pl-8">
                          {!isLastStep && (
                            <span aria-hidden className="absolute left-[9px] top-5 h-[calc(100%-0.25rem)] w-px bg-border/80" />
                          )}
                          <span className="absolute left-0 top-0 w-5 h-5 inline-flex items-center justify-center text-[11px] border border-border text-foreground/80 bg-background">
                            {stepIndex + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      );
                    })}
                  </ol>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {workflow.links.map((link, linkIndex) => (
                      <Link
                        key={`${workflowIndex}-${link.href}-${linkIndex}`}
                        href={link.href}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs border border-border hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
                      >
                        {link.label}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <TrendingStyles styles={styles} sectionId="home-trending" />

      <section id="home-style-catalog" className="scroll-mt-24">
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
