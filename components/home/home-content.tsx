"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { HomeStyleCard } from "@/components/home/home-style-card";
import { FeaturedCarousel } from "@/components/home/featured-carousel";
import { RevealOnScroll } from "@/components/home/reveal-on-scroll";
import { GitHubStarButton } from "@/components/github-star-button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { trackEvent } from "@/lib/analytics/events";
import { HomeSupportCard, type SupportPreviewItem } from "./_support-card";
import { MobileHomeSummarySection } from "./_mobile-summary";
import { TrendingStylesSkeleton } from "./_skeletons";
import { ThankYouModal } from "@/components/home/thank-you-modal";
import { FriendPromoBanner } from "@/components/home/friend-promo-banner";

const BuiltForSection = dynamic(
  () => import("@/components/home/built-for-section").then((m) => ({ default: m.BuiltForSection })),
  { ssr: true }
);

import type { StyleMeta } from "@/lib/styles/meta";
import {
  getScenarioLabel,
  getStyleScenarios,
  type StyleScenario,
} from "@/lib/styles/scenarios";
import { cn } from "@/lib/utils";
import { localizeHref } from "@/lib/i18n/routing";
import type { ThankYouEntry } from "@/lib/site/support";

interface HomeContentProps {
  styles: StyleMeta[];
  stats: {
    styles: number;
    animations: number;
    templates: number;
  };
  thankYouEntries: ThankYouEntry[];
}

const HERO_SCENARIO_ORDER: StyleScenario[] = [
  "saas",
  "dashboard",
  "portfolio",
  "blog",
  "marketing",
  "creative",
];

const TrendingStyles = dynamic(
  () => import("@/components/home/trending-styles").then((m) => ({ default: m.TrendingStyles })),
  {
    ssr: false,
    loading: () => <TrendingStylesSkeleton />,
  }
);

export function HomeContent({ styles, stats, thankYouEntries }: HomeContentProps) {
  const { t, locale } = useI18n();
  const heroTitleLine1 = t("home.title.line1");
  const [heroTitleBeforeAi, heroTitleAfterAi] = heroTitleLine1.split("AI");
  const [activeQuickLink, setActiveQuickLink] = useState("#home-style-catalog");
  const [homeScrollProgress, setHomeScrollProgress] = useState(0);
  const [isMobileQuickJumpVisible, setIsMobileQuickJumpVisible] = useState(false);
  const [isMobileScrollDown, setIsMobileScrollDown] = useState(true);
  const mobileQuickJumpRef = useRef<HTMLDivElement>(null);
  const mobileQuickLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const lastScrollYRef = useRef(0);
  const featuredStyles = useMemo(
    () =>
      styles
        .filter((style, index, all) => {
          if (!style.slug) return false;
          return all.findIndex((candidate) => candidate.slug === style.slug) === index;
        })
        .slice(0, 8),
    [styles]
  );
  const mobileFeaturedStyles = useMemo(() => featuredStyles.slice(0, 4), [featuredStyles]);

  // The Style Catalog renders two lists at once — a mobile carousel and a
  // desktop grid — whose leading slugs overlap. Two <ViewTransition> boundaries
  // sharing a name mounted together make React abort the shared-element morph,
  // so only the list visible at the current breakpoint owns the boundary.
  // Toggling <ViewTransition> emits no DOM node, so this stays hydration-safe.
  const [isDesktopViewport, setIsDesktopViewport] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : true
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktopViewport(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const smallLinkClassName = "inline-flex items-center gap-1.5 text-xs tracking-wide text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors";
  const quickJumpLinkClassName = "inline-flex items-center gap-1.5 px-2.5 py-1.5 md:px-3.5 md:py-2.5 text-[11px] md:text-xs border border-border text-muted hover:text-foreground hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-[color,border-color,background-color,transform,box-shadow] duration-200 ease-out";
  const sectionLabelClassName = "text-[11px] tracking-[0.16em] uppercase text-muted";
  const sectionTitleClassName = "text-[1.6rem] sm:text-2xl md:text-3xl leading-tight tracking-tight";
  const deferredBelowFoldClassName =
    "[content-visibility:auto] [contain-intrinsic-size:auto_720px]";
  const quickLinkTargets = useMemo(
    () => ["#home-style-catalog", "#home-trending"],
    []
  );
  const heroStats = useMemo(
    () => [{ value: `${styles.length}+`, label: t("home.metricStyles") }],
    [styles.length, t]
  );
  const quickLinks = useMemo(
    () => [
      { href: quickLinkTargets[0], label: t("home.styleCatalog") },
      { href: quickLinkTargets[1], label: t("analytics.trending.title") },
    ],
    [quickLinkTargets, t]
  );
  const supportHref = localizeHref("/contact#support-maintenance", locale);
  const supportPreviewItems: SupportPreviewItem[] = useMemo(
    () => [
      {
        src: "/support/wechat-qr.png",
        title: locale === "zh" ? "微信赞赏码" : "WeChat Tipping",
        hint: locale === "zh" ? "微信赞赏" : "Tip via WeChat",
      },
      {
        src: "/support/alipay-qr.png",
        title: locale === "zh" ? "支付宝" : "Alipay",
        hint: locale === "zh" ? "支付宝扫码" : "Scan with Alipay",
      },
    ],
    [locale]
  );
  const heroScenarioEntries = useMemo(
    () => HERO_SCENARIO_ORDER
      .map((scenario) => ({
        scenario,
        label: getScenarioLabel(scenario, locale),
        count: styles.filter((style) => getStyleScenarios(style).includes(scenario)).length,
      }))
      .filter((item) => item.count > 0),
    [locale, styles]
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
        startTransition(() => {
          setActiveQuickLink((current) => (current === currentHash ? current : currentHash));
        });
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
        startTransition(() => {
          setActiveQuickLink((current) => (current === nextHref ? current : nextHref));
        });
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
      const startSection = document.getElementById("home-style-catalog");
      const endSection = document.getElementById("home-trending");
      if (heroSection && isMobileViewport) {
        const revealThreshold = Math.max(heroSection.offsetTop + heroSection.offsetHeight - 72, 0);
        const shouldShowQuickJump = currentY >= revealThreshold;

        startTransition(() => {
          setIsMobileQuickJumpVisible((current) => (
            current === shouldShowQuickJump ? current : shouldShowQuickJump
          ));
        });
      } else {
        startTransition(() => {
          setIsMobileQuickJumpVisible((current) => (current ? false : current));
        });
      }

      if (isMobileViewport) {
        const deltaY = currentY - lastScrollYRef.current;
        if (Math.abs(deltaY) >= 6) {
          const nextIsScrollingDown = deltaY > 0;
          startTransition(() => {
            setIsMobileScrollDown((current) => (
              current === nextIsScrollingDown ? current : nextIsScrollingDown
            ));
          });
        }
      } else {
        startTransition(() => {
          setIsMobileScrollDown((current) => (current ? current : true));
        });
      }
      lastScrollYRef.current = currentY;
      if (!startSection || !endSection) return;

      const startY = startSection.offsetTop;
      const endY = endSection.offsetTop + endSection.offsetHeight - window.innerHeight;
      const range = Math.max(endY - startY, 1);
      const rawProgress = ((currentY - startY) / range) * 100;
      const nextProgress = Math.max(0, Math.min(100, rawProgress));

      startTransition(() => {
        setHomeScrollProgress((current) => (
          Math.abs(current - nextProgress) >= minDeltaToUpdate ? nextProgress : current
        ));
      });
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
      <ThankYouModal showOnHomepageOnly={true} entries={thankYouEntries} />
      <FriendPromoBanner />
      <section id="home-hero" className="home-hero-surface relative overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-28 left-[-8rem] h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-[-9rem] right-[-4rem] h-72 w-72 rounded-full bg-foreground/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.04))] dark:bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.04))]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-10 sm:pt-16 md:pt-20">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] gap-9 sm:gap-12 md:gap-14 lg:gap-20 items-center">
            <RevealOnScroll instant>
              <div className="mb-5 flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-accent" />
                <p className={sectionLabelClassName}>{t("home.subtitle")}</p>
              </div>
              <h1
                className={cn(
                  "text-[2.4rem] sm:text-5xl md:text-[3.4rem] lg:text-[4.2rem] leading-[0.98] tracking-tight mb-5 sm:mb-7",
                  locale === "en" ? "home-hero-title-en max-w-[17ch]" : "max-w-[11ch]"
                )}
              >
                {locale === "en" ? (
                  <span className="home-hero-editorial-line-en">{heroTitleLine1}</span>
                ) : locale === "zh" && heroTitleAfterAi !== undefined ? (
                  <>
                    {heroTitleBeforeAi}
                    <span className="home-hero-ai-zh">AI</span>
                    {heroTitleAfterAi}
                  </>
                ) : (
                  heroTitleLine1
                )}
                <br />
                {locale === "en" ? (
                  <span className="home-hero-editorial-line-en">{t("home.title.line2")}</span>
                ) : (
                  t("home.title.line2")
                )}
                <br />
                <span className={cn("italic", locale === "en" && "home-hero-editorial-accent-en")}>
                  {t("home.title.line3")}
                </span>
              </h1>
              <p className="max-w-[34rem] text-[15px] sm:text-[17px] text-muted leading-7 sm:leading-8 mb-7 sm:mb-9">{t("home.description")}</p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={localizeHref("/styles", locale)}
                  onClick={() => trackEvent("cta_click", { label: "browse_styles", location: "home_hero" })}
                  className="group inline-flex min-h-11 items-center justify-center gap-2 bg-foreground px-5 text-sm tracking-wide text-background transition-colors hover:bg-accent"
                >
                  {t("nav.styles")}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href={localizeHref("/templates", locale)}
                  onClick={() => trackEvent("cta_click", { label: "browse_templates", location: "home_hero" })}
                  className="inline-flex min-h-11 items-center justify-center border border-foreground/30 px-5 text-sm tracking-wide transition-colors hover:border-foreground hover:bg-background"
                >
                  {t("nav.templates")}
                </Link>
                <Link
                  href={localizeHref("/guide", locale)}
                  onClick={() => trackEvent("cta_click", { label: "open_guide", location: "home_hero" })}
                  className={smallLinkClassName}
                >
                  {t("nav.guide")}
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href={localizeHref("/launch", locale)}
                  onClick={() => trackEvent("cta_click", { label: "open_launch", location: "home_hero" })}
                  className={smallLinkClassName}
                >
                  {t("home.launch")}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <ul className="mt-7 flex flex-wrap items-center gap-4" aria-label={t("home.metricAriaLabel")}>
                {heroStats.map((item) => (
                  <li key={item.label} className="flex items-baseline gap-2">
                    <p className="font-mono text-lg leading-none tabular-nums tracking-tight">{item.value}</p>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-muted">{item.label}</p>
                  </li>
                ))}
                <li aria-hidden className="h-4 w-px bg-border" />
                <li className="hidden sm:block"><GitHubStarButton /></li>
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

            <RevealOnScroll instant className="w-full max-w-xl md:max-w-none md:justify-self-end">
              <div className="relative">
                <FeaturedCarousel styles={featuredStyles} />
                <div className="mt-4 flex justify-end lg:hidden">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-foreground bg-background/90 px-4 py-2 text-sm shadow-[0_14px_40px_-24px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-colors hover:bg-foreground hover:text-background"
                      >
                        <Heart className="h-4 w-4" />
                        {locale === "zh" ? "支持维护" : "Support"}
                      </button>
                    </DrawerTrigger>
                    <DrawerContent
                      side="bottom"
                      className="max-h-[88vh] overflow-y-auto rounded-t-[28px] px-4 pb-4 pt-8"
                    >
                      <DrawerHeader className="sr-only">
                        <DrawerTitle>
                          {locale === "zh" ? "支持维护" : "Support Maintenance"}
                        </DrawerTitle>
                        <DrawerDescription>
                          {locale === "zh"
                            ? "扫码支持 StyleKit 的服务器、域名和后续维护。"
                            : "Scan to support StyleKit server, domain, and maintenance costs."}
                        </DrawerDescription>
                      </DrawerHeader>
                      <HomeSupportCard
                        locale={locale}
                        href={supportHref}
                        items={supportPreviewItems}
                        variant="mobile"
                      />
                    </DrawerContent>
                  </Drawer>
                </div>
                <div className="mt-4 hidden lg:flex justify-end">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-foreground bg-background/90 px-4 py-2 text-sm shadow-[0_14px_40px_-24px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-colors hover:bg-foreground hover:text-background"
                      >
                        <Heart className="h-4 w-4" />
                        {locale === "zh" ? "支持维护" : "Support"}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      side="top"
                      sideOffset={12}
                      className="w-[28rem] border-0 bg-transparent p-0 shadow-none"
                    >
                      <HomeSupportCard
                        locale={locale}
                        href={supportHref}
                        items={supportPreviewItems}
                        variant="desktop"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <nav className="mt-10 border-t border-border/80 sm:mt-14 md:mt-20" aria-label={locale === "zh" ? "按场景浏览" : "Browse by scenario"}>
            <div className="flex overflow-x-auto scrollbar-hide">
              <div className="flex min-w-max items-center border-r border-border/80 px-4 py-4 pl-0 sm:py-5">
                <p className={sectionLabelClassName}>{locale === "zh" ? "按场景浏览" : "Browse by scenario"}</p>
              </div>
              {heroScenarioEntries.map((item, index) => (
                <Link
                  key={item.scenario}
                  href={localizeHref(`/styles?scenario=${item.scenario}`, locale)}
                  onClick={() => trackEvent("cta_click", { label: `scenario_${item.scenario}`, location: "home_scenarios" })}
                  className="group flex min-w-[8.5rem] items-center justify-between gap-5 border-r border-border/80 px-4 py-4 text-sm transition-colors hover:bg-foreground hover:text-background sm:min-w-[9.5rem] sm:py-5"
                >
                  <span><span className="mr-2 text-[10px] tabular-nums text-muted group-hover:text-background/60">0{index + 1}</span>{item.label}</span>
                  <span className="text-[10px] tabular-nums text-muted group-hover:text-background/60">{item.count}</span>
                </Link>
              ))}
            </div>
          </nav>
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
            <div aria-hidden className="mt-2 grid grid-cols-2 gap-1">
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


      <section
        id="home-style-catalog"
        className={cn(
          "relative scroll-mt-24 bg-zinc-50/35 dark:bg-zinc-900/10",
          deferredBelowFoldClassName
        )}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.05),transparent_55%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-7 sm:py-12 md:py-16">
          <RevealOnScroll variant="soft" className="flex items-end justify-between gap-3 mb-5 sm:mb-8">
            <div>
              <p className={`${sectionLabelClassName} mb-2`}>{t("home.styleCollection")}</p>
              <h2 className={sectionTitleClassName}>{t("home.styleCatalog")}</h2>
            </div>
            <Link href={localizeHref("/styles", locale)} className="text-sm text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors flex items-center gap-1">
              {t("home.viewAll")}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>

          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide md:hidden [content-visibility:auto] [contain-intrinsic-size:1px_320px]">
            {mobileFeaturedStyles.map((style, styleIndex) => (
              <RevealOnScroll
                key={style.slug}
                variant="upSubtle"
                delayMs={40 + styleIndex * 20}
                disableDelayOnMobile
                className="w-[min(19rem,calc(100vw-2.5rem))] shrink-0 snap-start"
              >
                <HomeStyleCard style={style} enableViewTransition={!isDesktopViewport} />
              </RevealOnScroll>
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 [content-visibility:auto] [contain-intrinsic-size:1px_680px]">
            {featuredStyles.map((style, styleIndex) => (
              <RevealOnScroll key={style.slug} variant="upSubtle" delayMs={60 + styleIndex * 30} disableDelayOnMobile>
                <HomeStyleCard style={style} enableViewTransition={isDesktopViewport} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <div className={deferredBelowFoldClassName}>
        <TrendingStyles styles={styles} sectionId="home-trending" />
      </div>

      <div className={cn("md:hidden", deferredBelowFoldClassName)}>
        <MobileHomeSummarySection locale={locale} stats={stats} />
      </div>

      <div className={cn("hidden md:block", deferredBelowFoldClassName)}>
        <BuiltForSection />
      </div>
    </>
  );
}
