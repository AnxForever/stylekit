"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Heart } from "lucide-react";
import { trackEvent } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

export interface SupportPreviewItem {
  src: string;
  title: string;
  hint: string;
}

interface HomeSupportCardProps {
  locale: "en" | "zh";
  href: string;
  items: SupportPreviewItem[];
  variant: "desktop" | "mobile";
}

/**
 * QR-code support card shown on the home page. The desktop variant
 * renders all codes side-by-side; the mobile variant collapses to
 * one code at a time with chip-style switches. Both variants share
 * the same outer chrome, copy, and analytics events so the only
 * difference is the inner layout.
 *
 * Extracted from home-content.tsx so the home page orchestrator
 * doesn't have to keep the desktop/mobile branching and analytics
 * boilerplate inline.
 */
export function HomeSupportCard({
  locale,
  href,
  items,
  variant,
}: HomeSupportCardProps) {
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

          <div className="mt-4 grid gap-2.5 grid-cols-2">
            {items.map((item) => (
              <Link
                key={item.src}
                href={href}
                onClick={() => trackEvent("cta_click", { label: item.title, location: `home_support_${variant}` })}
                className="group rounded-[22px] border border-border bg-background/90 p-2.5 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-foreground"
              >
                <div className="relative aspect-square overflow-hidden rounded-[16px] border border-border bg-white">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="190px"
                    unoptimized
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
                  unoptimized
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