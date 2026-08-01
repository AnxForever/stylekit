"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Check, ClipboardCopy } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { AnimationMeta } from "@/lib/animations/types";
import { MiniPreview, MiniPreviewStyles } from "./mini-preview";
import { AddToKitButton } from "@/components/kit/add-to-kit-button";

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

const triggerI18nMap: Record<string, string> = {
  "on-mount": "animations.triggerOnMount",
  "on-scroll": "animations.triggerOnScroll",
  "on-hover": "animations.triggerOnHover",
  "on-click": "animations.triggerOnClick",
  continuous: "animations.triggerContinuous",
  manual: "animations.triggerManual",
};

export { MiniPreviewStyles as AnimationCardPreviewStyles };

export function AnimationCard({ animation }: AnimationCardProps) {
  const { t, locale } = useI18n();
  const [copied, setCopied] = useState(false);
  // Remounting the preview on pointer enter restarts one-shot animations,
  // so hovering a card doubles as "replay".
  const [replayKey, setReplayKey] = useState(0);

  const accentColor = categoryAccentColor[animation.category] || "#71717a";
  const name = locale === "zh" ? animation.name : animation.nameEn;
  const secondaryName = locale === "zh" ? animation.nameEn : animation.name;

  const handleCopyCss = useCallback(async () => {
    // Full definitions (code snippets) are intentionally kept out of the list
    // bundle; load them on demand only when someone actually copies.
    const { getAnimationBySlug } = await import("@/lib/animations");
    const full = getAnimationBySlug(animation.slug);
    const snippet =
      full?.codeSnippets.find((s) => s.language === "css") ?? full?.codeSnippets[0];
    if (!snippet) return;
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable; leave the button state untouched
    }
  }, [animation.slug]);

  return (
    <div
      className="group border border-border bg-background transition-colors hover:border-foreground focus-within:border-foreground"
      onMouseEnter={() => setReplayKey((k) => k + 1)}
    >
      <Link
        href={`/animations/${animation.slug}`}
        aria-label={name}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="sk-preview-canvas relative aspect-[4/3] overflow-hidden border-b border-border">
          <div className="absolute inset-0 flex items-center justify-center">
            <div key={replayKey} className="scale-[1.75]">
              <MiniPreview slug={animation.slug} />
            </div>
          </div>

          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-0.5"
            style={{ backgroundColor: accentColor }}
          />
          <span className="absolute right-2.5 top-2.5 font-mono text-[10px] tabular-nums tracking-wide text-muted">
            {animation.duration}
          </span>
        </div>

        <div className="min-w-0 px-3 pb-0 pt-2.5 md:px-3.5">
          <h3 className="truncate text-sm leading-snug group-hover:text-accent transition-colors">
            {name}
          </h3>
          <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {secondaryName}
          </p>
        </div>
      </Link>

      <div className="flex items-center justify-between px-3 pb-2.5 pt-1.5 md:px-3.5">
        <span className="text-[10px] uppercase tracking-[0.16em] text-muted">
          {copied
            ? t("animations.copied")
            : t(triggerI18nMap[animation.trigger] as Parameters<typeof t>[0])}
        </span>
        <div className="flex items-center gap-1.5">
          <AddToKitButton type="animation" slug={animation.slug} variant="labeled" />
          <button
            type="button"
            onClick={handleCopyCss}
            title={t("animations.copyCss")}
            aria-label={`${t("animations.copyCss")} - ${name}`}
            className="inline-flex items-center gap-1.5 border border-border px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-foreground hover:text-foreground"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
            ) : (
              <ClipboardCopy className="h-3 w-3" />
            )}
            CSS
          </button>
        </div>
      </div>
    </div>
  );
}
