"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github, Heart, MessageSquareText } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/translations";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { localizeHref } from "@/lib/i18n/routing";

const currentYear = new Date().getFullYear();

const sectionLabelClassName =
  "font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500";

const footerLinkClassName =
  "text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white";

export function Footer({ compact = false }: { compact?: boolean }) {
  const { t, locale } = useI18n();
  const trustLinks: { href: string; labelKey: TranslationKey }[] = [
    { href: "/about", labelKey: "footer.trust.about" },
    { href: "/contact", labelKey: "footer.trust.contact" },
    { href: "/privacy", labelKey: "footer.trust.privacy" },
    { href: "/terms", labelKey: "footer.trust.terms" },
    { href: "/support", labelKey: "footer.trust.support" },
    { href: "/refunds", labelKey: "footer.trust.refunds" },
  ];
  // Footer navigation, rebuilt for less density: two lean columns instead of
  // four packed ones. Explore = product surfaces; Learn = reading + updates.
  const exploreLinks: { href: string; label: string; external?: boolean }[] = [
    { href: "/styles", label: t("nav.styles") },
    { href: "/templates", label: t("nav.templates") },
    { href: "/animations", label: t("nav.animations") },
    { href: "/resources", label: t("nav.resourceLibrary") },
    { href: "/ui-prompts", label: locale === "zh" ? "提示词库" : "Prompts" },
    { href: "/collections", label: locale === "zh" ? "主题合集" : "Collections" },
  ];
  const learnLinks: { href: string; label: string; external?: boolean }[] = [
    { href: "/learn", label: t("nav.learn") },
    { href: "/guide", label: t("nav.guide") },
    { href: "/recipes", label: t("nav.recipes") },
    { href: "/changelog", label: t("nav.changelog") },
    { href: "https://anxforever.cn", label: t("nav.blog"), external: true },
  ];

  if (compact) {
    return (
      <footer
        className="mt-auto border-t border-border"
        data-cursor-aura="off"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 text-xs text-muted sm:px-6 md:flex-row md:items-center md:px-12">
          <p>{t("footer.openSource").replace("{year}", String(currentYear))}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {trustLinks.map((link) => (
              <Link
                key={link.href}
                href={localizeHref(link.href, locale)}
                prefetch={false}
                className="transition-colors hover:text-foreground"
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              陕ICP备2025065501号-3
            </a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className="mt-auto border-t border-zinc-800 bg-zinc-950 text-zinc-100 [--background:#18181b] [--border:#3f3f46] [--foreground:#fafafa] [--muted:#a1a1aa] dark:bg-black dark:[--background:#09090b]"
      data-cursor-aura="off"
    >
      {/* Mobile footer: keep the first view compact and move secondary links
          into native disclosure groups so the page does not end in a wall of links. */}
      <div className="mx-auto max-w-7xl px-4 py-7 md:hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="masthead text-lg text-white">StyleKit</p>
            <p className="mt-2 max-w-[18rem] text-xs leading-relaxed text-zinc-400">
              {t("footer.tagline")}
            </p>
          </div>
          <a
            href="https://github.com/AnxForever/stylekit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("footer.githubRepo")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-zinc-400 transition-colors hover:border-white/40 hover:text-white"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <Link
            href={localizeHref("/contact#feedback", locale)}
            prefetch={false}
            className="flex min-h-10 items-center justify-center rounded-lg border border-white/10 px-3 text-xs text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
          >
            {locale === "zh" ? "反馈建议" : "Feedback"}
          </Link>
          <Link
            href={localizeHref("/contact#support-maintenance", locale)}
            prefetch={false}
            className="flex min-h-10 items-center justify-center rounded-lg border border-white/10 px-3 text-xs text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
          >
            {t("footer.support.eyebrow")}
          </Link>
        </div>

        <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 marker:hidden">
              {locale === "zh" ? "浏览" : "Explore"}
              <span className="text-base leading-none text-zinc-600 transition-transform group-open:rotate-45">+</span>
            </summary>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2 pb-4">
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={localizeHref(link.href, locale)}
                  prefetch={false}
                  className="py-1 text-xs text-zinc-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 marker:hidden">
              {locale === "zh" ? "学习与更新" : "Learn"}
              <span className="text-base leading-none text-zinc-600 transition-transform group-open:rotate-45">+</span>
            </summary>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2 pb-4">
              {learnLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1 text-xs text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={localizeHref(link.href, locale)}
                    prefetch={false}
                    className="py-1 text-xs text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 marker:hidden">
              {locale === "zh" ? "关于与政策" : "Trust"}
              <span className="text-base leading-none text-zinc-600 transition-transform group-open:rotate-45">+</span>
            </summary>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2 pb-4">
              {trustLinks.map((link) => (
                <Link
                  key={link.href}
                  href={localizeHref(link.href, locale)}
                  prefetch={false}
                  className="py-1 text-xs text-zinc-400 transition-colors hover:text-white"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </details>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 font-mono text-[10px] text-zinc-600">
          <p>{t("footer.openSource").replace("{year}", String(currentYear))}</p>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            闄旾CP澶?025065501鍙?3
          </a>
        </div>
      </div>

      <div className="hidden md:block">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        {/* Colophon strip */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-white/10 py-4">
          <p className={sectionLabelClassName}>
            {locale === "zh" ? "刊末信息" : "Colophon"}
            <span className="mx-2 text-zinc-700">/</span>
            <span className="tabular-nums">SK — {currentYear}</span>
          </p>
          <p className={sectionLabelClassName}>{t("footer.builtWith")}</p>
        </div>

        {/* Index rows */}
        <div className="grid border-b border-white/10 md:grid-cols-2">
          <Link
            href={localizeHref("/contact#feedback", locale)}
            prefetch={false}
            className="group flex items-center gap-5 border-b border-white/10 py-7 transition-colors hover:bg-white/[0.04] md:border-b-0 md:border-r md:pr-8"
          >
            <span className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-zinc-600 transition-colors group-hover:text-zinc-400">
              01
            </span>
            <MessageSquareText className="h-[18px] w-[18px] shrink-0 text-zinc-500 transition-colors group-hover:text-white" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-white">
                {locale === "zh" ? "反馈与建议" : "Feedback"}
              </span>
              <span className="mt-1 block text-xs leading-5 text-zinc-500">
                {locale === "zh" ? "告诉我们哪里还可以更好" : "Tell us what could work better"}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 text-zinc-500 transition-all duration-200 ease-out group-hover:translate-x-1 group-hover:text-white" />
          </Link>
          <Link
            href={localizeHref("/contact#support-maintenance", locale)}
            prefetch={false}
            className="group flex items-center gap-5 py-7 transition-colors hover:bg-white/[0.04] md:pl-8"
          >
            <span className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-zinc-600 transition-colors group-hover:text-zinc-400">
              02
            </span>
            <Heart className="h-[18px] w-[18px] shrink-0 text-zinc-500 transition-colors group-hover:text-white" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-white">{t("footer.support.eyebrow")}</span>
              <span className="mt-1 block text-xs leading-5 text-zinc-500">
                {t("footer.support.body")}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 text-zinc-500 transition-all duration-200 ease-out group-hover:translate-x-1 group-hover:text-white" />
          </Link>
        </div>

        {/* Editorial grid */}
        <div className="grid border-b border-white/10 md:grid-cols-12">
          <div className="py-8 md:col-span-4 md:py-12 md:pr-10">
            <p className="masthead text-lg text-white">StyleKit</p>
            <p className="mt-6 font-serif text-[1.45rem] italic leading-[1.45] text-zinc-200 md:text-[1.6rem]">
              {t("footer.tagline")}
            </p>
            <a
              href="https://github.com/AnxForever/stylekit"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400 transition-colors hover:text-white"
            >
              <Github className="h-4 w-4" />
              {t("footer.githubRepo")}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="border-t border-white/10 py-8 md:col-span-2 md:border-l md:border-t-0 md:py-12 md:pl-8">
            <p className={sectionLabelClassName}>
              {locale === "zh" ? "浏览" : "Explore"}
            </p>
            <nav className="mt-6 flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={localizeHref(link.href, locale)}
                  prefetch={false}
                  className={footerLinkClassName}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t border-white/10 py-8 md:col-span-2 md:border-l md:border-t-0 md:py-12 md:pl-8">
            <p className={sectionLabelClassName}>
              {locale === "zh" ? "学习与动态" : "Learn"}
            </p>
            <nav className="mt-6 flex flex-col gap-3">
              {learnLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLinkClassName}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={localizeHref(link.href, locale)}
                    prefetch={false}
                    className={footerLinkClassName}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          <div className="border-t border-white/10 py-8 md:col-span-4 md:border-l md:border-t-0 md:py-12 md:pl-8">
            <p className={sectionLabelClassName}>
              {locale === "zh" ? "订阅动态" : "Dispatch"}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 max-w-xs">
              {locale === "zh"
                ? "新风格、模板与工具上线时，第一时间收到通知。"
                : "Get notified when new styles, templates and tools ship."}
            </p>
            <div className="mt-5 max-w-sm">
              <NewsletterSignup variant="inline" />
            </div>
          </div>
        </div>

        {/* Baseline */}
        <div className="flex flex-col items-start justify-between gap-x-6 gap-y-2 py-6 font-mono text-[11px] text-zinc-500 md:flex-row md:items-center">
          <p>{t("footer.openSource").replace("{year}", String(currentYear))}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {trustLinks.map((link) => (
              <Link
                key={link.href}
                href={localizeHref(link.href, locale)}
                prefetch={false}
                className="transition-colors hover:text-white"
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <span className="text-zinc-700">/</span>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              陕ICP备2025065501号-3
            </a>
          </div>
        </div>
      </div>

      {/* Ghost masthead */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden border-t border-white/10">
        <p
          className="whitespace-nowrap text-center font-serif uppercase leading-[0.72] tracking-[0.1em] text-white/[0.05]"
          style={{
            fontSize: "clamp(4.25rem, 15.5vw, 13.5rem)",
            transform: "translateY(26%)",
            WebkitTextStroke: "1px rgba(255,255,255,0.13)",
          }}
        >
          StyleKit
        </p>
      </div>
      </div>
    </footer>
  );
}
