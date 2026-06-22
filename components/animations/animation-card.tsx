"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import type { AnimationMeta } from "@/lib/animations/types";
import { MiniPreview, MiniPreviewStyles } from "./mini-preview";

interface AnimationCardProps {
  animation: AnimationMeta;
}

/** Category accent colors for the color bar */
const categoryAccentColor: Record<string, string> = {
  entrance: "#3b82f6",
  exit: "#ef4444",
  hover: "#f59e0b",
  pointer: "#06b6d4",
  scroll: "#22c55e",
  text: "#a855f7",
  loading: "#06b6d4",
  background: "#ec4899",
  transition: "#6366f1",
  "micro-interaction": "#14b8a6",
};

const categoryI18nMap: Record<string, string> = {
  entrance: "animations.categoryEntrance",
  exit: "animations.categoryExit",
  hover: "animations.categoryHover",
  pointer: "animations.categoryPointer",
  scroll: "animations.categoryScroll",
  text: "animations.categoryText",
  loading: "animations.categoryLoading",
  background: "animations.categoryBackground",
  transition: "animations.categoryTransition",
  "micro-interaction": "animations.categoryMicroInteraction",
};

const difficultyI18nMap: Record<string, string> = {
  beginner: "animations.difficultyBeginner",
  intermediate: "animations.difficultyIntermediate",
  advanced: "animations.difficultyAdvanced",
};

const triggerI18nMap: Record<string, string> = {
  "on-mount": "animations.triggerOnMount",
  "on-scroll": "animations.triggerOnScroll",
  "on-hover": "animations.triggerOnHover",
  "on-click": "animations.triggerOnClick",
  continuous: "animations.triggerContinuous",
  manual: "animations.triggerManual",
};

const previewFrameClass =
  "relative flex h-[74px] w-full max-w-[176px] items-center justify-center overflow-hidden border border-black/10 bg-white/80 shadow-[0_16px_32px_-26px_rgba(15,23,42,0.95)] backdrop-blur-sm dark:border-white/10 dark:bg-zinc-950/80";

// Re-export for backward compatibility with anything that imported
// AnimationCardPreviewStyles. The actual definitions now live in
// ./mini-preview so they can be reused by the vocabulary page.
export { MiniPreviewStyles as AnimationCardPreviewStyles };

export function AnimationCard({ animation }: AnimationCardProps) {
  const { t, locale } = useI18n();

  const accentColor = categoryAccentColor[animation.category] || "#71717a";
  const categoryLabel = t(categoryI18nMap[animation.category] as Parameters<typeof t>[0]);
  const difficultyLabel = t(difficultyI18nMap[animation.difficulty] as Parameters<typeof t>[0]);
  const triggerLabel = t(triggerI18nMap[animation.trigger] as Parameters<typeof t>[0]);

  return (
    <Link
      href={`/animations/${animation.slug}`}
      className="group block overflow-hidden border border-border bg-background motion-safe:transition-[border-color,transform,box-shadow] motion-safe:duration-300 hover:border-foreground/80 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_20px_40px_-28px_rgba(15,23,42,0.45)]"
    >
      <div className="relative h-32 overflow-hidden border-b border-border/70 bg-muted/[0.28]">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `radial-gradient(circle at 18% 18%, ${accentColor}22 0%, transparent 34%), radial-gradient(circle at 82% 84%, ${accentColor}12 0%, transparent 36%)`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_48%,rgba(0,0,0,0.04))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_42%,rgba(0,0,0,0.2))]" />
        <div className="absolute left-3 top-3">
          <span
            className="inline-flex items-center border border-black/10 bg-background/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-muted backdrop-blur-sm dark:border-white/10 dark:bg-black/35"
            style={{ boxShadow: `inset 2px 0 0 ${accentColor}` }}
          >
            {categoryLabel}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <span className="inline-flex items-center border border-black/10 bg-background/85 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted backdrop-blur-sm dark:border-white/10 dark:bg-black/30">
            {animation.duration}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-5 pb-4 pt-7">
          <div className={previewFrameClass}>
            <div className="absolute inset-x-4 top-2 h-px bg-black/8 dark:bg-white/8" />
            <div className="absolute inset-x-4 bottom-2 h-px bg-black/6 dark:bg-white/6" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.38),transparent_40%,rgba(15,23,42,0.04))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_36%,rgba(0,0,0,0.24))]" />
            <MiniPreview slug={animation.slug} />
          </div>
        </div>
      </div>

      <div className="p-4 md:p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base leading-snug motion-safe:transition-colors md:text-lg">
              {locale === "zh" ? animation.name : animation.nameEn}
            </h3>
            <p className="mt-1 truncate text-xs uppercase tracking-[0.16em] text-muted">
              {locale === "zh" ? animation.nameEn : animation.name}
            </p>
          </div>
          <span
            className="mt-0.5 inline-flex h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        </div>
        <p className="mb-3 line-clamp-2 text-sm text-muted">
          {animation.description}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center border border-border px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted">
            {difficultyLabel}
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted">
            {triggerLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
 * CSS-only mini preview for card thumbnails.
 * Lightweight looping animations without importing full preview components.
 */
