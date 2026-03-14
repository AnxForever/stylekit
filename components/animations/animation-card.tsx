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

export function AnimationCard({ animation }: AnimationCardProps) {
  const { t, locale } = useI18n();

  const accentColor = categoryAccentColor[animation.category] || "#71717a";

  return (
    <Link
      href={`/animations/${animation.slug}`}
      className="group block border border-border overflow-hidden motion-safe:transition-[border-color,transform,box-shadow] motion-safe:duration-200 hover:border-foreground motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md"
    >
      {/* CSS-only preview area */}
      <div className="relative aspect-[16/9] bg-muted/30 flex items-center justify-center overflow-hidden">
        <MiniPreview slug={animation.slug} />
      </div>

      {/* Color accent bar */}
      <div className="h-1 flex">
        <div className="flex-1" style={{ backgroundColor: accentColor }} />
        <div className="flex-1" style={{ backgroundColor: accentColor, opacity: 0.5 }} />
        <div className="flex-1" style={{ backgroundColor: accentColor, opacity: 0.2 }} />
      </div>

      {/* Card content */}
      <div className="p-4 md:p-5">
        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="text-base md:text-lg group-hover:text-accent transition-colors truncate leading-snug">
            {locale === "zh" ? animation.name : animation.nameEn}
          </h3>
          <span className="text-xs text-muted shrink-0">
            {locale === "zh" ? animation.nameEn : animation.name}
          </span>
        </div>
        <p className="text-sm text-muted line-clamp-2 mb-3">
          {animation.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] uppercase tracking-wider text-muted">
            {t(categoryI18nMap[animation.category] as Parameters<typeof t>[0])}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted">
            {t(difficultyI18nMap[animation.difficulty] as Parameters<typeof t>[0])}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted">
            {animation.duration}
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
        <>
          <style>{`
            @keyframes mini-fade-in-up {
              0%, 100% { opacity: 0; transform: translateY(10px); }
              20%, 80% { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div
            className="w-16 h-10 rounded bg-blue-200 dark:bg-blue-800"
            style={{ animation: "mini-fade-in-up 2.5s ease-in-out infinite" }}
          />
        </>
      );
    case "scale-in":
      return (
        <>
          <style>{`
            @keyframes mini-scale-in {
              0%, 100% { opacity: 0; transform: scale(0.8); }
              20%, 80% { opacity: 1; transform: scale(1); }
            }
          `}</style>
          <div
            className="w-12 h-12 rounded-lg bg-purple-200 dark:bg-purple-800"
            style={{ animation: "mini-scale-in 2.5s ease-in-out infinite" }}
          />
        </>
      );
    case "hover-lift":
      return (
        <>
          <style>{`
            @keyframes mini-hover-lift {
              0%, 100% { transform: translateY(0); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
              50% { transform: translateY(-4px); box-shadow: 0 8px 16px rgba(0,0,0,0.15); }
            }
          `}</style>
          <div
            className="w-16 h-10 rounded bg-amber-200 dark:bg-amber-800"
            style={{ animation: "mini-hover-lift 2s ease-in-out infinite" }}
          />
        </>
      );
    case "typewriter":
      return (
        <>
          <style>{`
            @keyframes mini-typewriter {
              0% { width: 0; }
              50%, 80% { width: 5ch; }
              100% { width: 0; }
            }
            @keyframes mini-blink {
              0%, 100% { border-color: transparent; }
              50% { border-color: currentColor; }
            }
          `}</style>
          <span
            className="font-mono text-sm text-green-600 dark:text-green-400 overflow-hidden whitespace-nowrap border-r-2 border-current"
            style={{ animation: "mini-typewriter 3s steps(5) infinite, mini-blink 0.8s step-end infinite" }}
          >
            Hello
          </span>
        </>
      );
    case "skeleton-pulse":
      return (
        <div className="w-full max-w-[120px] space-y-2 px-4">
          <div className="h-2 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
          <div className="h-2 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse w-3/4" />
          <div className="h-2 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse w-1/2" />
        </div>
      );
    case "fade-in-down":
      return (
        <>
          <style>{`
            @keyframes mini-fade-in-down {
              0%, 100% { opacity: 0; transform: translateY(-10px); }
              20%, 80% { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div
            className="w-16 h-10 rounded bg-blue-200 dark:bg-blue-800"
            style={{ animation: "mini-fade-in-down 2.5s ease-in-out infinite" }}
          />
        </>
      );
    case "slide-in-left":
      return (
        <>
          <style>{`
            @keyframes mini-slide-left {
              0%, 100% { opacity: 0; transform: translateX(-15px); }
              20%, 80% { opacity: 1; transform: translateX(0); }
            }
          `}</style>
          <div
            className="w-14 h-10 rounded bg-emerald-200 dark:bg-emerald-800"
            style={{ animation: "mini-slide-left 2.5s ease-in-out infinite" }}
          />
        </>
      );
    case "hover-glow":
      return (
        <>
          <style>{`
            @keyframes mini-glow {
              0%, 100% { box-shadow: 0 0 0 rgba(99,102,241,0); }
              50% { box-shadow: 0 0 12px rgba(99,102,241,0.5), 0 0 24px rgba(99,102,241,0.2); }
            }
          `}</style>
          <div
            className="w-14 h-8 rounded-md bg-indigo-500"
            style={{ animation: "mini-glow 2s ease-in-out infinite" }}
          />
        </>
      );
    case "scroll-reveal":
      return (
        <>
          <style>{`
            @keyframes mini-reveal {
              0%, 100% { opacity: 0; transform: translateY(8px); }
              30%, 70% { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div className="space-y-1.5">
            {[0, 0.3, 0.6].map((d) => (
              <div
                key={d}
                className="h-2 w-16 rounded bg-green-200 dark:bg-green-800"
                style={{ animation: `mini-reveal 3s ease-in-out ${d}s infinite` }}
              />
            ))}
          </div>
        </>
      );
    case "parallax-float":
      return (
        <>
          <style>{`
            @keyframes mini-float-a { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
            @keyframes mini-float-b { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          `}</style>
          <div className="relative w-20 h-16">
            <div className="absolute top-0 left-1 w-6 h-6 rounded-full bg-purple-200 dark:bg-purple-800" style={{ animation: "mini-float-a 3s ease-in-out infinite" }} />
            <div className="absolute top-4 right-1 w-4 h-4 rounded bg-pink-200 dark:bg-pink-800" style={{ animation: "mini-float-b 2.5s ease-in-out 0.5s infinite" }} />
          </div>
        </>
      );
    case "text-gradient-flow":
      return (
        <>
          <style>{`
            @keyframes mini-gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
          <span
            className="text-sm font-bold"
            style={{
              background: "linear-gradient(270deg, #6366f1, #ec4899, #8b5cf6, #06b6d4, #6366f1)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "mini-gradient 3s linear infinite",
            }}
          >
            Gradient
          </span>
        </>
      );
    case "spinner-dots":
      return (
        <>
          <style>{`
            @keyframes mini-dot { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
          `}</style>
          <div className="inline-flex gap-1">
            {["-0.32s", "-0.16s", "0s"].map((d) => (
              <span
                key={d}
                className="w-2 h-2 rounded-full bg-zinc-800 dark:bg-zinc-200"
                style={{ animation: `mini-dot 1.4s ease-in-out ${d} infinite both` }}
              />
            ))}
          </div>
        </>
      );
    case "background-gradient-shift":
      return (
        <>
          <style>{`
            @keyframes mini-bg-shift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
          <div
            className="w-20 h-14 rounded-md"
            style={{
              background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
              backgroundSize: "400% 400%",
              animation: "mini-bg-shift 4s ease infinite",
            }}
          />
        </>
      );
    case "stagger-children":
      return (
        <>
          <style>{`
            @keyframes mini-stagger {
              0%, 100% { opacity: 0; transform: translateY(4px); }
              20%, 80% { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div className="space-y-1">
            {[0, 0.15, 0.3, 0.45].map((d) => (
              <div
                key={d}
                className="h-2 w-16 rounded bg-teal-200 dark:bg-teal-800"
                style={{ animation: `mini-stagger 2.5s ease-in-out ${d}s infinite` }}
              />
            ))}
          </div>
        </>
      );
    case "blur-in":
      return (
        <>
          <style>{`
            @keyframes mini-blur-in {
              0%, 100% { opacity: 0; filter: blur(6px); }
              20%, 80% { opacity: 1; filter: blur(0); }
            }
          `}</style>
          <div
            className="w-16 h-10 rounded-lg bg-indigo-200 dark:bg-indigo-800"
            style={{ animation: "mini-blur-in 3s ease-in-out infinite" }}
          />
        </>
      );
    default:
      return (
        <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
      );
  }
}
