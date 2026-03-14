"use client";

import { useState, useCallback, useMemo } from "react";
import { RotateCcw, Copy, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { Animation } from "@/lib/animations/types";

interface AnimationPlaygroundProps {
  animation: Animation;
}

const easingPresets: { label: string; value: string }[] = [
  { label: "ease", value: "ease" },
  { label: "ease-in", value: "ease-in" },
  { label: "ease-out", value: "ease-out" },
  { label: "ease-in-out", value: "ease-in-out" },
  { label: "Expo Out", value: "cubic-bezier(0.16, 1, 0.3, 1)" },
  { label: "Quart Out", value: "cubic-bezier(0.33, 1, 0.68, 1)" },
  { label: "linear", value: "linear" },
];

function getKeyframeName(slug: string): string {
  return slug.replace(/-/g, "-");
}

function getKeyframesCSS(slug: string): string {
  const map: Record<string, string> = {
    "fade-in-up": `@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`,
    "fade-in-down": `@keyframes fade-in-down {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}`,
    "scale-in": `@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}`,
    "slide-in-left": `@keyframes slide-in-left {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}`,
    "blur-in": `@keyframes blur-in {
  from { opacity: 0; filter: blur(10px); }
  to { opacity: 1; filter: blur(0px); }
}`,
    "skeleton-pulse": `@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}`,
    "spinner-dots": `@keyframes spinner-dot-bounce {
  0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}`,
    "background-gradient-shift": `@keyframes bg-gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
    "text-gradient-flow": `@keyframes text-gradient-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
    "stagger-children": `@keyframes stagger-fade-in {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}`,
  };
  return map[slug] || `@keyframes ${getKeyframeName(slug)} {
  from { opacity: 0; }
  to { opacity: 1; }
}`;
}

// Which animations support the playground (keyframe-based, not hover/scroll)
const playgroundSupported = new Set([
  "fade-in-up", "fade-in-down", "scale-in", "slide-in-left",
  "blur-in", "skeleton-pulse", "stagger-children",
  "background-gradient-shift", "text-gradient-flow",
]);

export function AnimationPlayground({ animation }: AnimationPlaygroundProps) {
  const { t } = useI18n();
  const isSupported = playgroundSupported.has(animation.slug);

  const defaultDuration = parseInt(animation.duration) || 500;
  const [duration, setDuration] = useState(defaultDuration);
  const [easingIndex, setEasingIndex] = useState(
    easingPresets.findIndex((p) => p.value === animation.easing) >= 0
      ? easingPresets.findIndex((p) => p.value === animation.easing)
      : 4 // default to Expo Out
  );
  const [delay, setDelay] = useState(0);
  const [playKey, setPlayKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const easing = easingPresets[easingIndex]?.value || "ease";
  const isContinuous = animation.trigger === "continuous";

  const replay = useCallback(() => setPlayKey((k) => k + 1), []);

  const generatedCSS = useMemo(() => {
    const kfName = getKeyframeName(animation.slug);
    const kf = getKeyframesCSS(animation.slug);
    const iterationCount = isContinuous ? "infinite" : "both";
    return `${kf}

.${kfName} {
  animation: ${kfName} ${duration}ms ${easing} ${delay}ms ${iterationCount};
}`;
  }, [animation.slug, duration, easing, delay, isContinuous]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedCSS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent fail
    }
  }, [generatedCSS]);

  if (!isSupported) return null;

  const animationStyle = {
    animation: `${getKeyframeName(animation.slug)} ${duration}ms ${easing} ${delay}ms ${isContinuous ? "infinite" : "both"}`,
  };

  return (
    <div className="mb-12">
      <h2 className="text-xs tracking-widest uppercase text-muted mb-4">
        {t("animations.playground")}
      </h2>

      <div className="border border-border overflow-hidden">
        {/* Preview area */}
        <div className="relative bg-muted/30 p-8 flex items-center justify-center min-h-[160px]">
          <style>{getKeyframesCSS(animation.slug)}</style>
          <div
            key={playKey}
            className="w-24 h-16 bg-gradient-to-br from-blue-500 to-purple-500 shadow-md"
            style={animationStyle}
          />
          <button
            type="button"
            onClick={replay}
            className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-background/80 border border-border text-muted backdrop-blur-sm hover:text-foreground hover:border-foreground transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            {t("animations.replay")}
          </button>
        </div>

        {/* Controls */}
        <div className="border-t border-border p-4 space-y-4">
          {/* Duration */}
          <div className="flex items-center gap-4">
            <label className="text-[10px] uppercase tracking-wider text-muted w-20 shrink-0">
              {t("animations.playgroundDuration")}
            </label>
            <input
              type="range"
              min={100}
              max={3000}
              step={50}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="flex-1 h-1 bg-border appearance-none cursor-pointer accent-foreground"
            />
            <span className="text-xs font-mono text-muted w-16 text-right">
              {duration}ms
            </span>
          </div>

          {/* Easing */}
          <div className="flex items-center gap-4">
            <label className="text-[10px] uppercase tracking-wider text-muted w-20 shrink-0">
              {t("animations.playgroundEasing")}
            </label>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {easingPresets.map((preset, i) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setEasingIndex(i)}
                  className={`px-2.5 py-1 text-[11px] transition-colors ${
                    easingIndex === i
                      ? "bg-foreground text-background"
                      : "border border-border text-muted hover:border-foreground"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Delay */}
          <div className="flex items-center gap-4">
            <label className="text-[10px] uppercase tracking-wider text-muted w-20 shrink-0">
              {t("animations.playgroundDelay")}
            </label>
            <input
              type="range"
              min={0}
              max={1000}
              step={50}
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
              className="flex-1 h-1 bg-border appearance-none cursor-pointer accent-foreground"
            />
            <span className="text-xs font-mono text-muted w-16 text-right">
              {delay}ms
            </span>
          </div>
        </div>

        {/* Generated code */}
        <div className="border-t border-border">
          <div className="flex items-center justify-between px-4 py-2 bg-muted/30">
            <span className="text-[10px] uppercase tracking-wider text-muted">
              Generated CSS
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  {t("animations.copied")}
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  {t("animations.copyCode")}
                </>
              )}
            </button>
          </div>
          <div className="bg-zinc-950 p-4 overflow-x-auto">
            <pre className="text-sm leading-relaxed">
              <code className="text-zinc-300">{generatedCSS}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
