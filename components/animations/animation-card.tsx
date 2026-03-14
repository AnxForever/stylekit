"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import type { AnimationMeta } from "@/lib/animations/types";

interface AnimationCardProps {
  animation: AnimationMeta;
}

/** Category accent colors for the color bar */
const categoryAccentColor: Record<string, string> = {
  entrance: "#3b82f6",
  exit: "#ef4444",
  hover: "#f59e0b",
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

const previewPanelClass =
  "sk-mini-anim relative overflow-hidden border border-black/10 shadow-[0_14px_30px_-22px_rgba(15,23,42,0.9)] dark:border-white/10";

export function AnimationCardPreviewStyles() {
  return (
    <style>{`
      @media (prefers-reduced-motion: reduce) {
        .sk-mini-anim {
          animation: none !important;
          transition: none !important;
        }
      }

      @keyframes sk-mini-fade-up {
        0%, 100% { opacity: 0; transform: translateY(10px) scale(0.96); }
        18%, 78% { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes sk-mini-scale-in {
        0%, 100% { opacity: 0; transform: scale(0.82); }
        18%, 78% { opacity: 1; transform: scale(1); }
      }

      @keyframes sk-mini-hover-lift {
        0%, 100% { transform: translateY(0); box-shadow: 0 10px 24px -22px rgba(15, 23, 42, 0.8); }
        50% { transform: translateY(-5px); box-shadow: 0 24px 36px -24px rgba(15, 23, 42, 0.85); }
      }

      @keyframes sk-mini-type {
        0% { width: 0; }
        45%, 80% { width: 5.2ch; }
        100% { width: 0; }
      }

      @keyframes sk-mini-blink {
        0%, 100% { border-color: transparent; }
        50% { border-color: currentColor; }
      }

      @keyframes sk-mini-fade-down {
        0%, 100% { opacity: 0; transform: translateY(-10px) scale(0.96); }
        18%, 78% { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes sk-mini-slide-left {
        0%, 100% { opacity: 0; transform: translateX(-14px); }
        18%, 78% { opacity: 1; transform: translateX(0); }
      }

      @keyframes sk-mini-glow {
        0%, 100% { box-shadow: 0 0 0 rgba(99,102,241,0); }
        50% { box-shadow: 0 0 14px rgba(99,102,241,0.45), 0 0 28px rgba(99,102,241,0.18); }
      }

      @keyframes sk-mini-reveal {
        0%, 100% { opacity: 0; transform: translateY(6px); }
        28%, 78% { opacity: 1; transform: translateY(0); }
      }

      @keyframes sk-mini-float-a {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }

      @keyframes sk-mini-float-b {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      @keyframes sk-mini-gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes sk-mini-dot {
        0%, 80%, 100% { transform: scale(0.4); opacity: 0.35; }
        40% { transform: scale(1); opacity: 1; }
      }

      @keyframes sk-mini-bg-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes sk-mini-stagger {
        0%, 100% { opacity: 0; transform: translateY(5px); }
        18%, 78% { opacity: 1; transform: translateY(0); }
      }

      @keyframes sk-mini-blur-in {
        0%, 100% { opacity: 0; filter: blur(6px); transform: scale(0.98); }
        18%, 78% { opacity: 1; filter: blur(0); transform: scale(1); }
      }

      @keyframes sk-mini-spotlight {
        0%, 100% { transform: translate3d(-16%, 0, 0); opacity: 0.24; }
        50% { transform: translate3d(20%, 0, 0); opacity: 0.48; }
      }

      @keyframes sk-mini-magnetic {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(3px, -2px); }
        50% { transform: translate(-2px, 3px); }
        75% { transform: translate(2px, 1px); }
      }

      .sk-mini-fade-up { animation: sk-mini-fade-up 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      .sk-mini-scale-in { animation: sk-mini-scale-in 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      .sk-mini-hover-lift { animation: sk-mini-hover-lift 2.2s ease-in-out infinite; }
      .sk-mini-type { animation: sk-mini-type 3s steps(5, end) infinite; }
      .sk-mini-blink { animation: sk-mini-blink 0.8s step-end infinite; }
      .sk-mini-fade-down { animation: sk-mini-fade-down 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      .sk-mini-slide-left { animation: sk-mini-slide-left 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      .sk-mini-glow { animation: sk-mini-glow 2.1s ease-in-out infinite; }
      .sk-mini-reveal { animation: sk-mini-reveal 2.8s ease-in-out infinite; }
      .sk-mini-float-a { animation: sk-mini-float-a 3s ease-in-out infinite; }
      .sk-mini-float-b { animation: sk-mini-float-b 2.5s ease-in-out infinite; }
      .sk-mini-gradient { animation: sk-mini-gradient 3s linear infinite; }
      .sk-mini-dot { animation: sk-mini-dot 1.4s ease-in-out infinite both; }
      .sk-mini-bg-shift { animation: sk-mini-bg-shift 4.2s ease infinite; }
      .sk-mini-stagger { animation: sk-mini-stagger 2.5s ease-in-out infinite; }
      .sk-mini-blur-in { animation: sk-mini-blur-in 3s ease-in-out infinite; }
      .sk-mini-spotlight { animation: sk-mini-spotlight 3s ease-in-out infinite; }
      .sk-mini-magnetic { animation: sk-mini-magnetic 2.5s ease-in-out infinite; }
    `}</style>
  );
}

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
function MiniPreview({ slug }: { slug: string }) {
  switch (slug) {
    case "fade-in-up":
      return (
        <div className={`${previewPanelClass} sk-mini-fade-up h-10 w-14 rounded-[14px] bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-500/30 dark:to-sky-700/25`}>
          <div className="absolute left-2 right-2 top-2 h-1 rounded-full bg-white/65 dark:bg-white/15" />
          <div className="absolute bottom-2 left-2 h-1.5 w-7 rounded-full bg-white/55 dark:bg-white/10" />
        </div>
      );
    case "scale-in":
      return (
        <div className={`${previewPanelClass} sk-mini-scale-in flex h-11 w-11 items-center justify-center rounded-[16px] bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-500/28 dark:to-fuchsia-500/18`}>
          <div className="h-4 w-4 rounded-full border border-white/70 bg-white/60 dark:border-white/20 dark:bg-white/10" />
        </div>
      );
    case "hover-lift":
      return (
        <div className={`${previewPanelClass} sk-mini-hover-lift h-9 w-14 rounded-[14px] bg-gradient-to-b from-amber-100 to-orange-100 dark:from-amber-500/28 dark:to-orange-500/22`} />
      );
    case "typewriter":
      return (
        <div className="overflow-hidden rounded-[14px] border border-emerald-500/15 bg-[#08110d] px-3 py-2 shadow-[0_18px_34px_-26px_rgba(5,150,105,0.8)]">
          <span className="sk-mini-type sk-mini-blink block overflow-hidden whitespace-nowrap border-r-2 border-current font-mono text-[12px] text-emerald-400">
            Hello
          </span>
        </div>
      );
    case "skeleton-pulse":
      return (
        <div className="w-full max-w-[112px] space-y-1.5 px-4">
          <div className="h-2 rounded-full bg-zinc-200/90 animate-pulse dark:bg-zinc-700/80" />
          <div className="h-2 w-4/5 rounded-full bg-zinc-200/90 animate-pulse dark:bg-zinc-700/80" />
          <div className="h-2 w-2/3 rounded-full bg-zinc-200/90 animate-pulse dark:bg-zinc-700/80" />
        </div>
      );
    case "fade-in-down":
      return (
        <div className={`${previewPanelClass} sk-mini-fade-down h-10 w-14 rounded-[14px] bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-500/28 dark:to-cyan-500/20`}>
          <div className="absolute left-2 right-2 bottom-2 h-1 rounded-full bg-white/65 dark:bg-white/12" />
        </div>
      );
    case "slide-in-left":
      return (
        <div className={`${previewPanelClass} sk-mini-slide-left h-9 w-14 rounded-[14px] bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-500/25 dark:to-teal-500/18`}>
          <div className="absolute inset-y-2 left-2 w-1 rounded-full bg-white/60 dark:bg-white/12" />
        </div>
      );
    case "hover-glow":
      return (
        <div className="sk-mini-anim sk-mini-glow rounded-full bg-indigo-500 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white shadow-[0_12px_28px_-24px_rgba(79,70,229,0.9)]">
          Glow
        </div>
      );
    case "scroll-reveal":
      return (
        <div className="space-y-1.5">
            {[0, 0.3, 0.6].map((d) => (
              <div
                key={d}
                className="sk-mini-anim sk-mini-reveal h-2 w-16 rounded-full bg-green-200/90 dark:bg-green-500/25"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
        </div>
      );
    case "parallax-float":
      return (
        <div className="relative h-14 w-20">
          <div className="sk-mini-anim sk-mini-float-a absolute left-1 top-1 h-7 w-7 rounded-full bg-violet-200/90 shadow-[0_18px_26px_-24px_rgba(124,58,237,0.9)] dark:bg-violet-500/25" />
          <div className="sk-mini-anim sk-mini-float-b absolute right-1 top-5 h-4 w-4 rounded-[8px] bg-pink-200/90 shadow-[0_18px_26px_-24px_rgba(236,72,153,0.9)] dark:bg-pink-500/25" />
        </div>
      );
    case "text-gradient-flow":
      return (
        <span
          className="sk-mini-anim sk-mini-gradient text-sm font-semibold tracking-tight"
          style={{
            background: "linear-gradient(270deg, #6366f1, #ec4899, #8b5cf6, #06b6d4, #6366f1)",
            backgroundSize: "300% 300%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Gradient
        </span>
      );
    case "spinner-dots":
      return (
        <div className="inline-flex gap-1.5">
            {["-0.32s", "-0.16s", "0s"].map((d) => (
              <span
                key={d}
                className="sk-mini-anim sk-mini-dot h-2.5 w-2.5 rounded-full bg-zinc-800 dark:bg-zinc-200"
                style={{ animationDelay: d }}
              />
            ))}
        </div>
      );
    case "background-gradient-shift":
      return (
        <div
          className="sk-mini-anim sk-mini-bg-shift h-12 w-20 rounded-[16px] border border-white/40 shadow-[0_18px_32px_-24px_rgba(15,23,42,0.9)] dark:border-white/10"
          style={{
            background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
            backgroundSize: "400% 400%",
          }}
        />
      );
    case "stagger-children":
      return (
        <div className="space-y-1">
            {[0, 0.15, 0.3, 0.45].map((d) => (
              <div
                key={d}
                className="sk-mini-anim sk-mini-stagger h-2 w-16 rounded-full bg-teal-200/90 dark:bg-teal-500/22"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
        </div>
      );
    case "blur-in":
      return (
        <div className={`${previewPanelClass} sk-mini-blur-in h-10 w-14 rounded-[14px] bg-gradient-to-br from-indigo-100 to-slate-100 dark:from-indigo-500/28 dark:to-slate-500/20`} />
      );
    case "spotlight-card":
      return (
        <div className="relative h-12 w-20 overflow-hidden rounded-[16px] border border-white/10 bg-zinc-900 shadow-[0_20px_32px_-26px_rgba(0,0,0,0.95)]">
          <div className="absolute inset-x-2 top-2 h-px bg-white/10" />
            <div
              className="sk-mini-anim sk-mini-spotlight absolute inset-y-0 -left-8 w-20"
              style={{
                background: "radial-gradient(circle at center, rgba(255,255,255,0.24), transparent 60%)",
              }}
            />
        </div>
      );
    case "magnetic-hover":
      return (
          <div
            className="sk-mini-anim sk-mini-magnetic rounded-full bg-foreground px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-background shadow-[0_16px_28px_-24px_rgba(15,23,42,0.9)]"
          />
      );
    default:
      return (
        <div className="h-10 w-10 rounded-full bg-zinc-200 animate-pulse dark:bg-zinc-700" />
      );
  }
}
