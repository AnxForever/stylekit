"use client";

import { animate, scrambleText } from "animejs";
import { useEffect, useRef } from "react";
import { PreviewContainer, ReplayButton, useReplay } from "../previews/_shared";

const CHARS = "A-Z0-9!%#_";
const TARGET = "STYLEKIT";

function ScrambleText({ text, triggerKey }: { text: string; triggerKey: number }) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      element.textContent = text;
      return;
    }

    element.textContent = text;
    element.dataset.scrambling = "true";

    const animation = animate(element, {
      textContent: scrambleText({
        text,
        chars: CHARS,
        override: CHARS,
        from: "left",
        cursor: "_",
        revealRate: 42,
        settleDuration: 320,
        settleRate: 28,
        seed: triggerKey + 1,
      }),
      onComplete: () => {
        element.dataset.scrambling = "false";
      },
    });

    return () => {
      animation.revert();
      element.textContent = text;
      element.dataset.scrambling = "false";
    };
  }, [text, triggerKey]);

  return (
    <span
      ref={elementRef}
      className="font-mono text-2xl font-bold tracking-widest text-white transition-colors duration-200 data-[scrambling=true]:text-cyan-200 data-[scrambling=true]:drop-shadow-[0_0_12px_rgba(34,211,238,0.55)]"
    >
      {text}
    </span>
  );
}

export function TextScramblePreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="dark">
      <ReplayButton onReplay={replay} />
      <ScrambleText text={TARGET} triggerKey={key} />
    </PreviewContainer>
  );
}
