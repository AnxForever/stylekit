"use client";

import { useState, useCallback, useMemo } from "react";
import { RotateCcw, Copy, Check, Code } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { extractKeyframeName, extractKeyframesBlock, buildAnimationCSS } from "@/lib/animations/parse-keyframes";
import type { Animation } from "@/lib/animations/types";

interface AnimationPlaygroundProps {
  animation: Animation;
  /** When true, omits the section header and outer margin (used inside sandbox). */
  embedded?: boolean;
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

/** Find the CSS Keyframes snippet from an animation's codeSnippets. */
function findCSSSnippet(animation: Animation): string | null {
  const snippet = animation.codeSnippets.find(
    (s) => s.label === "CSS Keyframes" && s.language === "css"
  );
  return snippet?.code ?? null;
}

export function AnimationPlayground({ animation, embedded = false }: AnimationPlaygroundProps) {
  const { t } = useI18n();
  const mode = animation.playgroundMode ?? "keyframe";

  // Parse keyframe data from the CSS snippet
  const cssSnippet = useMemo(() => findCSSSnippet(animation), [animation]);
  const keyframeName = useMemo(
    () => (cssSnippet ? extractKeyframeName(cssSnippet) : null),
    [cssSnippet]
  );
  const keyframesBlock = useMemo(
    () => (cssSnippet ? extractKeyframesBlock(cssSnippet) : null),
    [cssSnippet]
  );

  const isPlayable = mode === "keyframe" && keyframeName && keyframesBlock;

  const defaultDuration = parseInt(animation.duration) || 500;
  const [duration, setDuration] = useState(defaultDuration);
  const [easingIndex, setEasingIndex] = useState(
    easingPresets.findIndex((p) => p.value === animation.easing) >= 0
      ? easingPresets.findIndex((p) => p.value === animation.easing)
      : 4
  );
  const [delay, setDelay] = useState(0);
  const [playKey, setPlayKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const easing = easingPresets[easingIndex]?.value || "ease";
  const isContinuous = animation.trigger === "continuous";

  const replay = useCallback(() => setPlayKey((k) => k + 1), []);

  const generatedCSS = useMemo(() => {
    if (!isPlayable) return "";
    const shorthand = buildAnimationCSS(keyframeName, duration, easing, delay, isContinuous);
    return `${keyframesBlock}\n\n.${keyframeName} {\n  animation: ${shorthand};\n}`;
  }, [isPlayable, keyframeName, keyframesBlock, duration, easing, delay, isContinuous]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedCSS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent fail
    }
  }, [generatedCSS]);

  // --- JS-driven / scroll-driven fallback ---
  if (mode === "js-driven" || mode === "scroll-driven") {
    const messageKey = mode === "js-driven" ? "animations.jsDriven" : "animations.scrollDriven";
    return (
      <div className={embedded ? "" : "mb-12"}>
        {!embedded && (
          <h2 className="text-xs tracking-widest uppercase text-muted mb-4">
            {t("animations.playground")}
          </h2>
        )}
        <div className={`${embedded ? "" : "border border-border "}p-6 flex flex-col items-center justify-center gap-3 min-h-[120px] text-center`}>
          <Code className="w-5 h-5 text-muted" />
          <p className="text-sm text-muted">
            {t(messageKey as Parameters<typeof t>[0])}
          </p>
          <button
            type="button"
            onClick={() => {
              const codeSection = document.querySelector("[data-sandbox-tab='code']");
              if (codeSection instanceof HTMLElement) codeSection.click();
            }}
            className="text-xs text-foreground underline underline-offset-4 hover:text-muted transition-colors"
          >
            {t("animations.viewCode")}
          </button>
        </div>
      </div>
    );
  }

  // --- No parseable keyframes ---
  if (!isPlayable) return null;

  const animationStyle = {
    animation: buildAnimationCSS(keyframeName, duration, easing, delay, isContinuous),
  };

  return (
    <div className={embedded ? "" : "mb-12"}>
      {!embedded && (
        <h2 className="text-xs tracking-widest uppercase text-muted mb-4">
          {t("animations.playground")}
        </h2>
      )}

      <div className={`${embedded ? "" : "border border-border "}overflow-hidden`}>
        {/* Preview area */}
        <div className="relative bg-muted/30 p-8 flex items-center justify-center min-h-[160px]">
          <style>{keyframesBlock}</style>
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
