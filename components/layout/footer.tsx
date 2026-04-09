"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { localizeHref } from "@/lib/i18n/routing";

const currentYear = new Date().getFullYear();

export function Footer() {
  const { t, locale } = useI18n();
  const promptLinks = locale === "zh"
    ? [
        { href: "/ui-prompts", label: "UI 设计提示词" },
        { href: "/landing-page-prompts", label: "落地页提示词" },
        { href: "/dashboard-prompts", label: "Dashboard 提示词" },
        { href: "/tailwind-ui-prompts", label: "Tailwind UI 提示词" },
        { href: "/dark-mode-ui-prompts", label: "暗黑模式提示词" },
      ]
    : [
        { href: "/ui-prompts", label: "UI Design Prompts" },
        { href: "/landing-page-prompts", label: "Landing Page Prompts" },
        { href: "/dashboard-prompts", label: "Dashboard Prompts" },
        { href: "/tailwind-ui-prompts", label: "Tailwind UI Prompts" },
        { href: "/dark-mode-ui-prompts", label: "Dark Mode UI Prompts" },
      ];
  const trustLinks = locale === "zh"
    ? [
        { href: "/about", label: "关于" },
        { href: "/contact", label: "联系与支持" },
        { href: "/privacy", label: "隐私政策" },
        { href: "/terms", label: "服务条款" },
      ]
    : [
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
      ];

  return (
    <footer className="border-t border-border mt-auto">
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
                  {link.label}
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

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
          <p>{t("footer.openSource").replace("{year}", String(currentYear))}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {trustLinks.map((link) => (
              <Link
                key={link.href}
                href={localizeHref(link.href, locale)}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <span>{t("footer.builtWith")}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-xs text-muted">
          <span>Stylekit前端样式库</span>
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
