"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, BookOpenText, Component, Sparkles, type LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { StyleCard } from "@/components/home/style-card";
import { FeaturedCarousel } from "@/components/home/featured-carousel";
import { RevealOnScroll } from "@/components/home/reveal-on-scroll";
import { TrendingStyles } from "@/components/home/trending-styles";
import type { StyleMeta } from "@/lib/styles/meta";
import { cn } from "@/lib/utils";

interface HomeContentProps {
  styles: StyleMeta[];
}

export function HomeContent({ styles }: HomeContentProps) {
  const { t } = useI18n();
  const [activeQuickLink, setActiveQuickLink] = useState("#home-core-features");
  const [homeScrollProgress, setHomeScrollProgress] = useState(0);
  const [isMobileQuickJumpVisible, setIsMobileQuickJumpVisible] = useState(false);
  const [isMobileScrollDown, setIsMobileScrollDown] = useState(true);
  const mobileQuickJumpRef = useRef<HTMLDivElement>(null);
  const mobileQuickLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const lastScrollYRef = useRef(0);
  const featuredStyles = styles
    .filter((style, index, all) => {
      if (!style.slug) return false;
      return all.findIndex((candidate) => candidate.slug === style.slug) === index;
    })
    .slice(0, 8);

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
  const quickJumpLinkClassName = "inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] border border-border text-muted hover:text-foreground hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-[color,border-color,background-color,transform,box-shadow] duration-200 ease-out";
  const sectionLabelClassName = "text-[11px] tracking-[0.16em] uppercase text-muted";
  const sectionTitleClassName = "text-[1.6rem] sm:text-2xl md:text-3xl leading-tight tracking-tight";
  const quickLinkTargets = useMemo(
    () => ["#home-core-features", "#home-trending", "#home-style-catalog"],
    []
  );
  const heroStats = [
    { value: `${styles.length}+`, label: t("home.metricStyles") },
  ];
  const quickLinks = useMemo(
    () => [
      { href: quickLinkTargets[0], label: t("home.coreFeatures") },
      { href: quickLinkTargets[1], label: t("analytics.trending.title") },
      { href: quickLinkTargets[2], label: t("home.styleCatalog") },
    ],
    [quickLinkTargets, t]
  );
  const activeQuickLinkIndex = useMemo(
    () => Math.max(quickLinkTargets.findIndex((href) => href === activeQuickLink), 0),
    [activeQuickLink, quickLinkTargets]
  );
  const activeQuickLinkItem = quickLinks[activeQuickLinkIndex] ?? quickLinks[0];
  const isMobileQuickJumpCompact = isMobileQuickJumpVisible && !isMobileScrollDown;
  const segmentedProgress = useMemo(() => {
    const segmentSize = 100 / quickLinkTargets.length;

    return quickLinkTargets.map((_, index) => {
      const start = segmentSize * index;
      const raw = (homeScrollProgress - start) / segmentSize;
      return Math.max(0, Math.min(1, raw));
    });
  }, [homeScrollProgress, quickLinkTargets]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashChange = () => {
      const currentHash = window.location.hash;
      if (quickLinkTargets.some((href) => href === currentHash)) {
        setActiveQuickLink((current) => (current === currentHash ? current : currentHash));
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [quickLinkTargets]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;

    const sectionElements = quickLinkTargets
      .map((href) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topEntry = visibleEntries[0];

        if (!topEntry?.target.id) return;
        const nextHref = `#${topEntry.target.id}`;
        setActiveQuickLink((current) => (current === nextHref ? current : nextHref));
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: "-25% 0px -55% 0px",
      }
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [quickLinkTargets]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const container = mobileQuickJumpRef.current;
    const target = mobileQuickLinkRefs.current[activeQuickLink];
    if (!container || !target) return;

    const idealLeft = target.offsetLeft - (container.clientWidth - target.clientWidth) / 2;
    const maxLeft = Math.max(container.scrollWidth - container.clientWidth, 0);
    const boundedLeft = Math.max(0, Math.min(idealLeft, maxLeft));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    container.scrollTo({
      left: boundedLeft,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [activeQuickLink]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let frameId: number | null = null;
    const minDeltaToUpdate = 0.4;

    const updateProgress = () => {
      const currentY = window.scrollY;
      const isMobileViewport = window.innerWidth < 768;
      const heroSection = document.getElementById("home-hero");
      const startSection = document.getElementById("home-core-features");
      const endSection = document.getElementById("home-style-catalog");
      if (heroSection && isMobileViewport) {
        const revealThreshold = Math.max(heroSection.offsetTop + heroSection.offsetHeight - 72, 0);
        const shouldShowQuickJump = currentY >= revealThreshold;

        setIsMobileQuickJumpVisible((current) => (
          current === shouldShowQuickJump ? current : shouldShowQuickJump
        ));
      } else {
        setIsMobileQuickJumpVisible((current) => (current ? false : current));
      }

      if (isMobileViewport) {
        const deltaY = currentY - lastScrollYRef.current;
        if (Math.abs(deltaY) >= 6) {
          const nextIsScrollingDown = deltaY > 0;
          setIsMobileScrollDown((current) => (
            current === nextIsScrollingDown ? current : nextIsScrollingDown
          ));
        }
      } else {
        setIsMobileScrollDown((current) => (current ? current : true));
      }
      lastScrollYRef.current = currentY;
      if (!startSection || !endSection) return;

      const startY = startSection.offsetTop;
      const endY = endSection.offsetTop + endSection.offsetHeight - window.innerHeight;
      const range = Math.max(endY - startY, 1);
      const rawProgress = ((currentY - startY) / range) * 100;
      const nextProgress = Math.max(0, Math.min(100, rawProgress));

      setHomeScrollProgress((current) => (
        Math.abs(current - nextProgress) >= minDeltaToUpdate ? nextProgress : current
      ));
    };

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateProgress();
      });
    };

    lastScrollYRef.current = window.scrollY;
    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

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
              <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-row sm:flex-wrap sm:gap-3">
                <Link
                  href="/create-style"
                  className={`${ctaPrimaryClassName} col-span-2`}
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

              <ul className="mt-3.5 sm:mt-5 flex flex-wrap gap-2 sm:gap-2.5 max-w-md" aria-label={t("home.metricAriaLabel")}>
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

              <nav className="mt-5 sm:mt-6 hidden md:block" aria-label={t("home.quickJump")}>
                <p className={`${sectionLabelClassName} mb-2`}>{t("home.quickJump")}</p>
                <div className="flex gap-2 overflow-x-auto pb-1 pr-2 scrollbar-hide lg:flex-wrap lg:overflow-visible lg:pb-0 lg:pr-0">
                  {quickLinks.map((item) => {
                    const isActive = activeQuickLink === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          quickJumpLinkClassName,
                          isActive
                            ? "text-foreground border-foreground bg-foreground/5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] motion-safe:-translate-y-px"
                            : "bg-transparent"
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "h-1.5 rounded-full transition-[width,opacity] duration-300 ease-out",
                            isActive
                              ? "w-1.5 opacity-100 bg-foreground motion-safe:animate-home-segment-pulse"
                              : "w-0 opacity-0"
                          )}
                        />
                        {item.label}
                        <ArrowRight className={cn("w-3 h-3 transition-transform duration-200 ease-out", isActive && "motion-safe:translate-x-0.5")} />
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </RevealOnScroll>

            <RevealOnScroll instant className="w-full max-w-xl lg:max-w-none lg:justify-self-end">
              <FeaturedCarousel styles={styles} />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section
        aria-hidden={!isMobileQuickJumpVisible}
        className={cn(
          "md:hidden sticky top-0 z-30 border-b bg-background/95 supports-[backdrop-filter]:bg-background/75 backdrop-blur overflow-hidden motion-safe:transition-[max-height,opacity,transform,border-color] duration-300 ease-out",
          isMobileQuickJumpVisible
            ? isMobileQuickJumpCompact
              ? "max-h-16 translate-y-0 border-border"
              : "max-h-24 translate-y-0 border-border"
            : "max-h-0 opacity-0 -translate-y-1 border-transparent pointer-events-none",
          isMobileQuickJumpVisible && (isMobileScrollDown ? "opacity-100" : "opacity-90"),
          isMobileQuickJumpVisible && "motion-safe:animate-home-quick-jump-pop"
        )}
      >
        <nav className={cn("max-w-7xl mx-auto px-4 sm:px-6 transition-[padding] duration-200 ease-out", isMobileQuickJumpCompact ? "py-2" : "py-2.5")} aria-label={t("home.quickJump")}>
          <div ref={mobileQuickJumpRef} className={cn("pr-2 scrollbar-hide", isMobileQuickJumpCompact ? "flex" : "flex gap-2 overflow-x-auto")}>
            {isMobileQuickJumpCompact ? (
              <Link
                href={activeQuickLinkItem.href}
                ref={(element) => {
                  mobileQuickLinkRefs.current[activeQuickLinkItem.href] = element;
                }}
                aria-current="location"
                tabIndex={isMobileQuickJumpVisible ? undefined : -1}
                className={cn(
                  quickJumpLinkClassName,
                  "text-foreground border-foreground bg-foreground/5 motion-safe:-translate-y-px"
                )}
              >
                <span
                  aria-hidden
                  className="w-1.5 h-1.5 rounded-full opacity-100 bg-foreground motion-safe:animate-home-segment-pulse"
                />
                {activeQuickLinkItem.label}
                <ArrowRight className="w-3 h-3 transition-transform duration-200 ease-out motion-safe:translate-x-0.5" />
              </Link>
            ) : (
              quickLinks.map((item) => {
                const isActive = activeQuickLink === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    ref={(element) => {
                      mobileQuickLinkRefs.current[item.href] = element;
                    }}
                    aria-current={isActive ? "location" : undefined}
                    tabIndex={isMobileQuickJumpVisible ? undefined : -1}
                    className={cn(
                      quickJumpLinkClassName,
                      isActive
                        ? "text-foreground border-foreground bg-foreground/5 motion-safe:-translate-y-px"
                        : "bg-transparent"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "h-1.5 rounded-full transition-[width,opacity] duration-300 ease-out",
                        isActive
                          ? "w-1.5 opacity-100 bg-foreground motion-safe:animate-home-segment-pulse"
                          : "w-0 opacity-0"
                      )}
                    />
                    {item.label}
                    <ArrowRight className={cn("w-3 h-3 transition-transform duration-200 ease-out", isActive && "motion-safe:translate-x-0.5")} />
                  </Link>
                );
              })
            )}
          </div>
          {!isMobileQuickJumpCompact && (
            <div aria-hidden className="mt-2 grid grid-cols-4 gap-1">
              {quickLinkTargets.map((href, index) => (
                <div
                  key={href}
                  className={cn(
                    "relative h-0.5 bg-border/70 overflow-hidden transition-colors",
                    activeQuickLinkIndex === index && "bg-border"
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 bg-foreground/70 transition-[width] duration-200 ease-out",
                      activeQuickLinkIndex === index && "motion-safe:animate-home-segment-pulse"
                    )}
                    style={{ width: `${segmentedProgress[index] * 100}%` }}
                  />
                </div>
              ))}
            </div>
          )}
        </nav>
      </section>

      <section id="home-core-features" className="relative border-b border-border scroll-mt-24 bg-zinc-50/40 dark:bg-zinc-900/15">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/70 to-transparent" />
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
