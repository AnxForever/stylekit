"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpenText, Component, Heart, Sparkles, type LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { HomeStyleCard } from "@/components/home/home-style-card";
import { FeaturedCarousel } from "@/components/home/featured-carousel";
import { RevealOnScroll } from "@/components/home/reveal-on-scroll";
import { GitHubStarButton } from "@/components/github-star-button";
import { ThankYouModal } from "@/components/home/thank-you-modal";
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

const HowItWorks = dynamic(
  () => import("@/components/home/how-it-works").then((m) => ({ default: m.HowItWorks })),
  { ssr: true }
);

const CTABanner = dynamic(
  () => import("@/components/home/cta-banner").then((m) => ({ default: m.CTABanner })),
  { ssr: true }
);

const BuiltForSection = dynamic(
  () => import("@/components/home/built-for-section").then((m) => ({ default: m.BuiltForSection })),
  { ssr: true }
);

const RecipeShowcase = dynamic(
  () => import("@/components/recipes/recipe-showcase").then((m) => ({ default: m.RecipeShowcase })),
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

interface HomeContentProps {
  styles: StyleMeta[];
  stats: {
    styles: number;
    animations: number;
    templates: number;
  };
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

type SupportPreviewItem = {
  src: string;
  title: string;
  hint: string;
};

export function HomeContent({ styles, stats }: HomeContentProps) {
  const { t, locale } = useI18n();
  const [activeQuickLink, setActiveQuickLink] = useState("#home-catalog-guide");
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

  const coreFeatures: Array<{
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
  }> = [
    {
      title: t("nav.styles"),
      description:
        locale === "zh"
          ? "先从风格目录开始，按关键词、标签和布局方向筛选成熟方案。"
          : "Start in the style catalog and narrow by keywords, tags, and layout direction.",
      href: "/styles",
      icon: Sparkles,
    },
    {
      title: t("nav.templates"),
      description:
        locale === "zh"
          ? "直接查看可落地的页面模板，优先走已经打磨完成的参考路径。"
          : "Open production-ready page templates instead of jumping into unfinished flows.",
      href: "/templates",
      icon: Component,
    },
    {
      title: t("home.feature.docs.title"),
      description: t("home.feature.docs.desc"),
      href: "/guide",
      icon: BookOpenText,
    },
  ];
  const smallLinkClassName = "inline-flex items-center gap-1.5 text-xs tracking-wide text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors";
  const quickJumpLinkClassName = "inline-flex items-center gap-1.5 px-2.5 py-1.5 md:px-3.5 md:py-2.5 text-[11px] md:text-xs border border-border text-muted hover:text-foreground hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-[color,border-color,background-color,transform,box-shadow] duration-200 ease-out";
  const sectionLabelClassName = "text-[11px] tracking-[0.16em] uppercase text-muted";
  const sectionTitleClassName = "text-[1.6rem] sm:text-2xl md:text-3xl leading-tight tracking-tight";
  const quickLinkTargets = useMemo(
    () => ["#home-catalog-guide", "#home-style-catalog", "#home-trending"],
    []
  );
  const heroStats = useMemo(
    () => [{ value: `${styles.length}+`, label: t("home.metricStyles") }],
    [styles.length, t]
  );
  const supportHref = localizeHref("/contact#support-maintenance", locale);
  const supportPreviewItems: SupportPreviewItem[] = useMemo(
    () => [
      {
        src: "/wechat-qr.png",
        title: locale === "zh" ? "微信支付" : "WeChat Pay",
        hint: locale === "zh" ? "微信扫码" : "Scan with WeChat",
      },
      {
        src: "/alipay-qr.jpg",
        title: locale === "zh" ? "支付宝" : "Alipay",
        hint: locale === "zh" ? "支付宝扫码" : "Scan with Alipay",
      },
    ],
    [locale]
  );
  const quickLinks = useMemo(
    () => [
      { href: quickLinkTargets[0], label: locale === "zh" ? "选择路径" : "Choose Path" },
      { href: quickLinkTargets[1], label: t("home.styleCatalog") },
      { href: quickLinkTargets[2], label: t("analytics.trending.title") },
    ],
    [locale, quickLinkTargets, t]
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
      const startSection = document.getElementById("home-catalog-guide");
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
      <ThankYouModal showOnHomepageOnly={true} />
      <section id="home-hero" className="relative border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 left-[-8rem] h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-[-9rem] right-[-4rem] h-72 w-72 rounded-full bg-foreground/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.04))] dark:bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.04))]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
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
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={localizeHref("/styles", locale)}
                  onClick={() => trackEvent("cta_click", { label: "browse_styles", location: "home_hero" })}
                  className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
                >
                  {t("nav.styles")}
                </Link>
                <Link
                  href={localizeHref("/templates", locale)}
                  onClick={() => trackEvent("cta_click", { label: "browse_templates", location: "home_hero" })}
                  className="inline-flex items-center justify-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
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
              </div>
              <div className="mt-5">
                <p className={`${sectionLabelClassName} mb-2`}>
                  {locale === "zh" ? "按场景开始" : "Start by Scenario"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {heroScenarioEntries.map((item) => (
                    <Link
                      key={item.scenario}
                      href={localizeHref(`/styles?scenario=${item.scenario}`, locale)}
                      onClick={() => trackEvent("cta_click", { label: `scenario_${item.scenario}`, location: "home_scenarios" })}
                      className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2.5 text-xs border border-border text-muted hover:text-foreground hover:border-foreground transition-colors"
                    >
                      <span>{item.label}</span>
                      <span className="text-[10px] text-muted tabular-nums">
                        {item.count}
                      </span>
                    </Link>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted">
                  {locale === "zh"
                    ? "模板页也已接入同一套场景筛选。"
                    : "Templates now follow the same scenario filters."}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <GitHubStarButton />
                <p className="text-sm text-muted">{locale === "zh" ? "开源仓库会持续更新，但对外入口先聚焦已打磨完成的浏览与参考链路。" : "The repo keeps evolving, but public entry points now focus on the polished browse-and-reference flows."}</p>
              </div>

              <div className="mt-4 md:hidden">
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

            <RevealOnScroll instant className="w-full max-w-xl md:max-w-none md:justify-self-end">
              <div className="relative">
                <FeaturedCarousel styles={featuredStyles} />
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
                      className="w-[22rem] border-0 bg-transparent p-0 shadow-none"
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

      <section id="home-catalog-guide" className="border-b border-border scroll-mt-24 bg-zinc-50/35 dark:bg-zinc-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4 md:py-8">
          <div className="grid gap-3 md:gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <RevealOnScroll variant="soft" className="min-w-0">
              <p className={`${sectionLabelClassName} mb-1.5 md:mb-2`}>
                {locale === "zh" ? "进入目录前" : "Before the Catalog"}
              </p>
              <h2 className="text-lg leading-tight md:text-2xl">
                {locale === "zh" ? "先选路径，再看风格。" : "Pick a path, then scan styles."}
              </h2>
              <p className="mt-2 hidden max-w-xl text-sm leading-relaxed text-muted md:block">
                {locale === "zh"
                  ? "把原来分散的说明收成一条导览：目录、模板、文档三个入口足够覆盖主要决策。"
                  : "The old explanation blocks are collapsed into three routes: catalog, templates, and docs."}
              </p>
            </RevealOnScroll>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {coreFeatures.map((feature, featureIndex) => {
                const Icon = feature.icon;
                return (
                  <RevealOnScroll
                    key={feature.title}
                    variant="upSubtle"
                    delayMs={60 + featureIndex * 45}
                    disableDelayOnMobile
                  >
                    <Link
                      href={localizeHref(feature.href, locale)}
                      className="group flex h-full min-h-[5.5rem] flex-col items-center justify-center gap-2 border border-border bg-background/85 px-2 py-3 text-center transition-[border-color,transform] duration-200 hover:border-foreground motion-safe:hover:-translate-y-0.5 md:min-h-0 md:flex-row md:items-start md:justify-start md:gap-3 md:px-4 md:py-4 md:text-left"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-border text-muted transition-colors group-hover:border-foreground group-hover:text-foreground md:mt-0.5 md:h-9 md:w-9">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs leading-4 transition-colors group-hover:text-accent sm:text-sm sm:leading-5">
                          {feature.title}
                        </span>
                        <span className="mt-1 hidden text-xs leading-5 text-muted md:line-clamp-2 md:block">
                          {feature.description}
                        </span>
                      </span>
                    </Link>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>

          <dl className="mt-4 hidden grid-cols-3 border border-border bg-background/80 md:grid md:max-w-xl">
            {[
              { value: `${stats.styles}+`, label: locale === "zh" ? "风格" : "Styles" },
              { value: `${stats.animations}+`, label: locale === "zh" ? "动画" : "Animations" },
              { value: `${stats.templates}+`, label: locale === "zh" ? "模板" : "Templates" },
            ].map((item) => (
              <div key={item.label} className="border-r border-border px-3 py-2.5 text-center last:border-r-0">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-muted">{item.label}</dt>
                <dd className="mt-1 text-base leading-none tabular-nums md:text-lg">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="home-style-catalog" className="relative scroll-mt-24 bg-zinc-50/35 dark:bg-zinc-900/10">
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
                <HomeStyleCard style={style} />
              </RevealOnScroll>
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 [content-visibility:auto] [contain-intrinsic-size:1px_680px]">
            {featuredStyles.map((style, styleIndex) => (
              <RevealOnScroll key={style.slug} variant="upSubtle" delayMs={60 + styleIndex * 30} disableDelayOnMobile>
                <HomeStyleCard style={style} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <TrendingStyles styles={styles} sectionId="home-trending" />

      <HowItWorks />

      <div className="md:hidden">
        <MobileHomeSummarySection locale={locale} stats={stats} />
      </div>

      <div className="hidden md:block">
        <RecipeShowcase variant="home" maxItems={6} />
      </div>

      <div className="hidden md:block">
        <CTABanner />
      </div>

      <div className="hidden md:block">
        <BuiltForSection />
      </div>
    </>
  );
}

function TrendingStylesSkeleton() {
  return (
    <section id="home-trending" className="border-b border-border scroll-mt-24" aria-busy="true">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-12 md:py-16">
        <div className="mb-6 sm:mb-8 space-y-2">
          <div className="h-3 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />
          <h2 className="sr-only">Trending</h2>
          <div className="h-8 w-48 rounded bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 [content-visibility:auto] [contain-intrinsic-size:1px_560px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="border border-border p-3 sm:p-4 animate-pulse">
              <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800 mb-3" />
              <div className="h-1.5 bg-zinc-100 dark:bg-zinc-900 mb-3" />
              <div className="h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800 mb-3" />
              <div className="h-1.5 rounded bg-zinc-100 dark:bg-zinc-900" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeSupportCard({
  locale,
  href,
  items,
  variant,
}: {
  locale: "en" | "zh";
  href: string;
  items: SupportPreviewItem[];
  variant: "desktop" | "mobile";
}) {
  const isDesktop = variant === "desktop";
  const [activeMobileMethod, setActiveMobileMethod] = useState(items[0]?.src ?? "");
  const activeMobileItem = items.find((item) => item.src === activeMobileMethod) ?? items[0];

  return (
    <div
      className={cn(
        "rounded-[28px] border border-border bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.12),transparent_42%)] shadow-[0_24px_70px_-34px_rgba(0,0,0,0.45)]",
        isDesktop ? "backdrop-blur-sm bg-background/95 p-4" : "p-4 sm:p-5"
      )}
    >
      {isDesktop ? (
        <>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted">
                {locale === "zh" ? "支持维护" : "Support Maintenance"}
              </p>
              <p className="mt-2 max-w-sm text-sm leading-7 text-muted">
                {locale === "zh"
                  ? "如果 StyleKit 恰好帮到了你，那我真挺开心的。欢迎扫码支持我把它继续做下去，金额随意，你的每一份心意，都是对我很大的鼓励。"
                  : "If StyleKit helps your workflow, you can support it here to help cover servers, domains, and ongoing upkeep."}
              </p>
              <p className="mt-2 max-w-sm text-xs leading-6 text-muted">
                {locale === "zh"
                  ? "收到的支持会优先拿来给 StyleKit 续上服务器、域名和后续维护成本，也算是给我继续折腾它攒一点动力。"
                  : "Support is prioritized for server renewals, domain renewals, and day-to-day maintenance of the public site."}
              </p>
            </div>
            <Link
              href={href}
              onClick={() => trackEvent("cta_click", { label: "support_maintenance", location: `home_${variant}` })}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-foreground px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"
            >
              <Heart className="h-4 w-4" />
              {locale === "zh" ? "扫码支持 / 查看全部方式" : "Scan to support / View all options"}
            </Link>
          </div>

          <div className="mt-4 grid gap-3 grid-cols-2">
            {items.map((item) => (
              <Link
                key={item.src}
                href={href}
                onClick={() => trackEvent("cta_click", { label: item.title, location: `home_support_${variant}` })}
                className="group rounded-[22px] border border-border bg-background/90 p-3 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-foreground"
              >
                <div className="relative aspect-square overflow-hidden rounded-[16px] border border-border bg-white">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="180px"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm">{item.title}</p>
                    <p className="text-[11px] text-muted">{item.hint}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted">
            <span>
              {locale === "zh" ? "也可通过 GitHub 查看赞助入口和说明。" : "You can also use the GitHub repo funding entry."}
            </span>
            <a
              href="https://github.com/AnxForever/stylekit"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("cta_click", { label: "support_github_repo", location: `home_support_${variant}` })}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted">
                {locale === "zh" ? "支持维护" : "Support Maintenance"}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {locale === "zh"
                  ? "支持会优先用于服务器、域名和持续维护。手机端只展示一个二维码，切换更快。"
                  : "Support helps cover hosting, domains, and upkeep. Mobile shows one code at a time to stay compact."}
              </p>
            </div>
            <Link
              href={href}
              onClick={() => trackEvent("cta_click", { label: "support_maintenance", location: `home_${variant}` })}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-foreground px-3 py-2 text-xs transition-colors hover:bg-foreground hover:text-background"
            >
              <Heart className="h-3.5 w-3.5" />
              {locale === "zh" ? "全部方式" : "All options"}
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {items.map((item) => {
              const isActive = item.src === activeMobileItem?.src;
              return (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => {
                    setActiveMobileMethod(item.src);
                    trackEvent("cta_click", { label: `${item.title}_switch`, location: "home_support_mobile" });
                  }}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs transition-colors",
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background/80 text-muted hover:border-foreground hover:text-foreground"
                  )}
                >
                  <span>{item.title}</span>
                  <span className={cn("text-[10px]", isActive ? "text-background/70" : "text-muted")}>
                    {item.hint}
                  </span>
                </button>
              );
            })}
          </div>

          {activeMobileItem ? (
            <div className="mt-4 rounded-[22px] border border-border bg-background/90 p-3">
              <div className="relative aspect-square overflow-hidden rounded-[16px] border border-border bg-white">
                <Image
                  src={activeMobileItem.src}
                  alt={activeMobileItem.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 70vw, 320px"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm">{activeMobileItem.title}</p>
                  <p className="text-[11px] text-muted">
                    {locale === "zh" ? "切换上方按钮即可查看另一种方式" : "Use the chips above to switch methods."}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted" />
              </div>
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-3 text-xs text-muted">
            <span>
              {locale === "zh" ? "也可走 GitHub 入口。" : "GitHub funding entry is also available."}
            </span>
            <a
              href="https://github.com/AnxForever/stylekit"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("cta_click", { label: "support_github_repo", location: `home_support_${variant}` })}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </>
      )}
    </div>
  );
}

function MobileHomeSummarySection({
  locale,
  stats,
}: {
  locale: "en" | "zh";
  stats: {
    styles: number;
    animations: number;
    templates: number;
  };
}) {
  const summaryLinks = [
    {
      href: localizeHref("/recipes", locale),
      label: locale === "zh" ? "设计配方" : "Recipes",
      description: locale === "zh" ? "更完整的组合方案，单独看更轻松。" : "Browse full recipe combos on a dedicated page.",
    },
    {
      href: localizeHref("/contact", locale),
      label: locale === "zh" ? "支持与联系" : "Support",
      description: locale === "zh" ? "问题反馈、支持方式和联系入口统一放这里。" : "Feedback, support options, and contact details in one place.",
    },
  ];

  const statItems = [
    { value: `${stats.styles}+`, label: locale === "zh" ? "风格" : "Styles" },
    { value: `${stats.animations}+`, label: locale === "zh" ? "动画" : "Animations" },
    { value: `${stats.templates}+`, label: locale === "zh" ? "模板" : "Templates" },
  ];

  return (
    <section className="border-b border-border bg-zinc-50/35 dark:bg-zinc-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-3 gap-2">
          {statItems.map((item) => (
            <div key={item.label} className="rounded-[18px] border border-border bg-background/80 px-3 py-3 text-center">
              <p className="text-base tabular-nums leading-none">{item.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted">
            {locale === "zh" ? "继续浏览" : "Keep browsing"}
          </p>
          <div className="mt-3 grid gap-3">
            {summaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => trackEvent("cta_click", { label: item.label, location: "home_mobile_summary" })}
                className="flex items-center justify-between gap-3 rounded-[20px] border border-border bg-background/90 px-4 py-4 transition-colors hover:border-foreground"
              >
                <div className="min-w-0">
                  <p className="text-sm">{item.label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">{item.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted" />
              </Link>
            ))}

            <a
              href="https://github.com/AnxForever/stylekit"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("cta_click", { label: "github_repo", location: "home_mobile_summary" })}
              className="flex items-center justify-between gap-3 rounded-[20px] border border-border bg-background/90 px-4 py-4 transition-colors hover:border-foreground"
            >
              <div className="min-w-0">
                <p className="text-sm">GitHub</p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  {locale === "zh" ? "源码、更新和开源动态都在这里。" : "Source code, updates, and open-source context."}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
