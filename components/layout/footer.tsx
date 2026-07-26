"use client";

import Link from "next/link";
import { ArrowRight, Github, Heart, MessageSquareText } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/translations";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { localizeHref } from "@/lib/i18n/routing";

const currentYear = new Date().getFullYear();

export function Footer({ compact = false }: { compact?: boolean }) {
  const { t, locale } = useI18n();
  const promptLinks: { href: string; labelKey: TranslationKey }[] = [
    { href: "/ui-prompts", labelKey: "footer.prompts.uiDesign" },
    { href: "/landing-page-prompts", labelKey: "footer.prompts.landingPage" },
    { href: "/dashboard-prompts", labelKey: "footer.prompts.dashboard" },
    { href: "/tailwind-ui-prompts", labelKey: "footer.prompts.tailwindUi" },
    { href: "/dark-mode-ui-prompts", labelKey: "footer.prompts.darkMode" },
  ];
  const trustLinks: { href: string; labelKey: TranslationKey }[] = [
    { href: "/about", labelKey: "footer.trust.about" },
    { href: "/contact", labelKey: "footer.trust.contact" },
    { href: "/privacy", labelKey: "footer.trust.privacy" },
    { href: "/terms", labelKey: "footer.trust.terms" },
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
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-12 md:py-14">
        <div className="grid grid-cols-1 gap-10 border-b border-white/15 pb-10 md:grid-cols-[1.35fr_0.75fr_0.95fr_1.35fr] md:gap-10 md:pb-14">
          <div className="max-w-sm">
            <p className="masthead text-xl text-white">StyleKit</p>
            <p className="mt-5 text-sm leading-7 text-zinc-400">{t("footer.tagline")}</p>
            <a
              href="https://github.com/AnxForever/stylekit"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-white"
            >
              <Github className="h-4 w-4" />
              {t("footer.githubRepo")}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              {t("footer.navigation")}
            </p>
            <nav className="flex flex-col gap-3">
              <Link
                href={localizeHref("/styles", locale)}
                prefetch={false}
                className="text-sm text-zinc-300 transition-colors hover:text-white"
              >
                {t("nav.styles")}
              </Link>
              <Link
                href={localizeHref("/colors", locale)}
                prefetch={false}
                className="text-sm text-zinc-300 transition-colors hover:text-white"
              >
                {locale === "zh" ? "配色" : "Colors"}
              </Link>
              <Link
                href={localizeHref("/collections", locale)}
                prefetch={false}
                className="text-sm text-zinc-300 transition-colors hover:text-white"
              >
                {locale === "zh" ? "主题合集" : "Collections"}
              </Link>
              <Link
                href={localizeHref("/templates", locale)}
                prefetch={false}
                className="text-sm text-zinc-300 transition-colors hover:text-white"
              >
                {t("nav.templates")}
              </Link>
              <Link
                href={localizeHref("/guide", locale)}
                prefetch={false}
                className="text-sm text-zinc-300 transition-colors hover:text-white"
              >
                {t("nav.guide")}
              </Link>
              <Link
                href="https://anxforever.cn"
                prefetch={false}
                className="text-sm text-zinc-300 transition-colors hover:text-white"
              >
                {t("nav.blog")}
              </Link>
              <Link
                href={localizeHref("/changelog", locale)}
                prefetch={false}
                className="text-sm text-zinc-300 transition-colors hover:text-white"
              >
                {t("nav.changelog")}
              </Link>
            </nav>
          </div>

          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              {t("footer.resources")}
            </p>
            <nav className="flex flex-col gap-3">
              {promptLinks.map((link) => (
                <Link
                  key={link.href}
                  href={localizeHref(link.href, locale)}
                  prefetch={false}
                  className="text-sm text-zinc-300 transition-colors hover:text-white"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-white/15 md:border-l md:pl-8">
            <NewsletterSignup variant="inline" />
          </div>
        </div>

        <div className="grid border-b border-white/15 md:grid-cols-2">
          <Link
            href={localizeHref("/contact#feedback", locale)}
            prefetch={false}
            className="group flex items-center gap-4 border-b border-white/15 py-6 transition-colors hover:bg-white/[0.04] md:border-b-0 md:border-r md:px-6 md:first:pl-0"
          >
            <MessageSquareText className="h-5 w-5 shrink-0 text-zinc-500 transition-colors group-hover:text-white" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-white">{locale === "zh" ? "反馈与建议" : "Feedback"}</span>
              <span className="mt-1 block text-xs leading-5 text-zinc-500">{locale === "zh" ? "告诉我们哪里还可以更好" : "Tell us what could work better"}</span>
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={localizeHref("/contact#support-maintenance", locale)}
            prefetch={false}
            className="group flex items-center gap-4 py-6 transition-colors hover:bg-white/[0.04] md:px-6 md:last:pr-0"
          >
            <Heart className="h-5 w-5 shrink-0 text-zinc-500 transition-colors group-hover:text-white" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-white">{t("footer.support.eyebrow")}</span>
              <span className="mt-1 block text-xs leading-5 text-zinc-500">{t("footer.support.body")}</span>
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-7 text-xs text-zinc-500 md:flex-row md:items-center">
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
            <span>{t("footer.builtWith")}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600 md:justify-end">
          <span>{t("footer.icp.label")}</span>
          <a
            href="https://stylekit.top"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            stylekit.top
          </a>
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
    </footer>
  );
}
