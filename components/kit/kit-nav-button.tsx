"use client";

import Link from "next/link";
import { useKit } from "@/lib/kit/context";
import { useI18n } from "@/lib/i18n/context";

/**
 * Header entry for the Kit Builder.
 *
 * The kit is a cart, not a utility: an empty kit has nothing to open, so the
 * entry only appears once the visitor has collected something. A label plus
 * count keeps the state legible without asking people to decode an icon.
 */
export function KitNavButton() {
  const { count } = useKit();
  const { locale } = useI18n();
  if (count === 0) return null;

  const label = locale === "zh" ? "工具箱" : "Kit";

  return (
    <Link
      href="/kit"
      prefetch={false}
      aria-label={`${label} (${count})`}
      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-border px-3 text-[12px] leading-none tracking-[0.01em] text-foreground/80 transition-[background-color,border-color,color] duration-200 hover:border-foreground/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 9h18v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9Z" />
        <path d="M8 9V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
        <path d="M3 13h18" />
      </svg>
      <span>{label}</span>
      <span className="tabular-nums text-foreground">
        {count > 99 ? "99+" : count}
      </span>
    </Link>
  );
}
