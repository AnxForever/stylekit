import type { Animation } from "../types";

export const textScramble: Animation = {
  slug: "text-scramble",
  name: "文字解密",
  nameEn: "Text Scramble",
  description: "文字以随机字符快速滚动后逐字解密为最终内容，常见于黑客终端和科技品牌网站。",
  descriptionEn: "Characters cycle through random glyphs before resolving into the final text, one character at a time. A staple of hacker terminals and tech brand hero sections.",
  category: "text",
  tags: ["text", "scramble", "decode", "hacker", "sequential"],
  trigger: "on-mount",
  difficulty: "intermediate",
  duration: "1.5s",
  easing: "linear",
  cssProperties: ["content"],
  isGPUAccelerated: false,
  previewBg: "dark",
  keywords: ["scramble", "decode", "cipher", "hacker", "terminal", "reveal text", "random characters"],
  useCases: [
    "Hero headline reveal",
    "Hacker/tech aesthetic landing pages",
    "Portfolio name entrance",
    "Navigation link hover effect",
  ],
  relatedAnimations: ["typewriter", "glitch-text", "text-reveal"],
  recommendedStyles: ["cyberpunk-neon", "sci-fi-hud", "dark-mode", "github-style"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `/* Text scramble relies on JavaScript to swap characters.
   CSS handles the smooth cursor and container styling. */

.text-scramble {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  display: inline-block;
  white-space: pre;
}

.text-scramble-char {
  display: inline-block;
  will-change: opacity;
  transition: opacity 80ms ease-out;
}

.text-scramble-char[data-resolved="false"] {
  opacity: 0.5;
  color: var(--scramble-color, #00ffff);
}

.text-scramble-char[data-resolved="true"] {
  opacity: 1;
  color: inherit;
}

@media (prefers-reduced-motion: reduce) {
  .text-scramble-char {
    transition: none;
    opacity: 1 !important;
    color: inherit !important;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Text scramble — JS-driven, styled with Tailwind utilities */

@utility text-scramble-base {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  display: inline-block;
  white-space: pre;
}

/* Usage:
  <span class="text-scramble-base font-mono text-lg">
    <!-- JS swaps inner chars -->
  </span>
*/`,
    },
    {
      label: "AnimeJS",
      language: "tsx",
      code: `"use client";

import { animate, scrambleText } from "animejs";
import { useEffect, useRef } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
}

export function TextScramble({ text, className }: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.textContent = text;
      return;
    }

    element.textContent = text;

    const animation = animate(element, {
      textContent: scrambleText({
        text,
        chars: "A-Z0-9!%#_",
        override: "A-Z0-9!%#_",
        from: "left",
        cursor: "_",
        revealRate: 42,
        settleDuration: 320,
        settleRate: 28,
      }),
    });

    return () => {
      animation.revert();
      element.textContent = text;
    };
  }, [text]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `"use client";

import { useEffect, useState, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

interface TextScrambleProps {
  text: string;
  /** ms per character resolve */
  speed?: number;
  className?: string;
}

export function TextScramble({ text, speed = 50, className }: TextScrambleProps) {
  const [display, setDisplay] = useState(text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]));
  const [resolved, setResolved] = useState<boolean[]>(new Array(text.length).fill(false));

  const scramble = useCallback(() => {
    let frame = 0;
    const interval = setInterval(() => {
      setDisplay((prev) =>
        prev.map((ch, i) =>
          i <= frame ? text[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
      );
      setResolved((prev) => prev.map((_, i) => i <= frame));
      frame++;
      if (frame >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    const cleanup = scramble();
    return cleanup;
  }, [scramble]);

  return (
    <span className={className} style={{ fontFamily: "monospace" }}>
      {display.map((ch, i) => (
        <span key={i} style={{ opacity: resolved[i] ? 1 : 0.5, color: resolved[i] ? "inherit" : "#00ffff" }}>
          {ch}
        </span>
      ))}
    </span>
  );
}`,
    },
  ],
};
