"use client";

import Link from "next/link";
import { useKit } from "@/lib/kit/context";
import { useI18n } from "@/lib/i18n/context";

/**
 * Header entry for the Kit Builder: toolbox icon + item count badge.
 * Links to the /kit workbench page.
 */
export function KitNavButton() {
  const { count } = useKit();
  const { locale } = useI18n();
  const label = locale === "zh" ? "我的工具箱" : "My Kit";

  return (
    <Link
      href="/kit"
      aria-label={`${label}${count > 0 ? ` (${count})` : ""}`}
      className="relative p-2 text-muted hover:text-foreground transition-colors"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9h18v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9Z" />
        <path d="M8 9V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
        <path d="M3 13h18" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-accent text-white text-[10px] leading-none tabular-nums">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
