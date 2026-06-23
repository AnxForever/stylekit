"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/translations";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { localizeHref } from "@/lib/i18n/routing";

const currentYear = new Date().getFullYear();

export function Footer() {
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

  return (
    <footer className="border-t border-border mt-auto" data-cursor-aura="off">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div>
            <p className="masthead text-lg mb-4">StyleKit</p>
            <p className="text-sm text-muted leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("footer.navigation")}
            </p>
            <nav className="flex flex-col gap-2">
              <Link
                href={localizeHref("/styles", locale)}
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                {t("nav.styles")}
              </Link>
              <Link
                href={localizeHref("/templates", locale)}
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                {t("nav.templates")}
              </Link>
              <Link
                href={localizeHref("/guide", locale)}
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                {t("nav.guide")}
              </Link>
              <Link
                href={localizeHref("/blog", locale)}
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                {t("nav.blog")}
              </Link>
              <Link
                href={localizeHref("/changelog", locale)}
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                {t("nav.changelog")}
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("footer.resources")}
            </p>
            <nav className="flex flex-col gap-2">
              {promptLinks.map((link) => (
                <Link
                  key={link.href}
                  href={localizeHref(link.href, locale)}
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <a
                href="https://github.com/AnxForever/stylekit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                {t("footer.githubRepo")}
              </a>
            </nav>
          </div>

          <div>
            <NewsletterSignup variant="inline" />
          </div>
        </div>

        <hr className="my-8" />

        <div className="mb-8 flex flex-col gap-4 rounded-[28px] border border-border bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.1),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.08),transparent_38%)] px-5 py-5 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted">
              {t("footer.support.eyebrow")}
            </p>
            <p className="mt-2 text-sm leading-7 text-muted">
              {t("footer.support.body")}
            </p>
          </div>
          <Link
            href={localizeHref("/contact#support-maintenance", locale)}
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-foreground px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"
          >
            {t("footer.support.cta")}
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
          <p>{t("footer.openSource").replace("{year}", String(currentYear))}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {trustLinks.map((link) => (
              <Link
                key={link.href}
                href={localizeHref(link.href, locale)}
                className="hover:text-foreground transition-colors"
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <span>{t("footer.builtWith")}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-xs text-muted">
          <span>{t("footer.icp.label")}</span>
          <a
            href="https://stylekit.top"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            stylekit.top
          </a>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            陕ICP备2025065501号-3
          </a>
        </div>
      </div>
    </footer>
  );
}
