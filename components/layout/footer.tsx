"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";

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

  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
                href="/styles"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                {t("nav.styles")}
              </Link>
              <Link
                href="/templates"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                {t("nav.templates")}
              </Link>
              <Link
                href="/guide"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                {t("nav.guide")}
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
                  href={link.href}
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
        </div>

        <hr className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
          <p>{t("footer.openSource").replace("{year}", String(currentYear))}</p>
          <p>{t("footer.builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}
