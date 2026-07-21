"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics/events";
import { localizeHref } from "@/lib/i18n/routing";

interface MobileHomeSummarySectionProps {
  locale: "en" | "zh";
  stats: {
    styles: number;
    animations: number;
    templates: number;
  };
}

/**
 * Compact stats + secondary-links section shown under the hero on
 * mobile viewports. Mirrors the same numbers used in the desktop
 * "Built for" section so the two readouts stay consistent.
 */
export function MobileHomeSummarySection({
  locale,
  stats,
}: MobileHomeSummarySectionProps) {
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
              <p className="font-mono text-base tabular-nums leading-none">{item.value}</p>
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