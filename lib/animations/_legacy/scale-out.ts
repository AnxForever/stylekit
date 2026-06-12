import type { Animation } from "../types";

export const scaleOut: Animation = {
  slug: "scale-out",
  name: "缩放消失",
  nameEn: "Scale Out",
  description: "元素缩小并淡出，适合弹窗关闭、气泡消失等退场场景。",
  descriptionEn: "Element shrinks and fades out. Ideal for closing modals, dismissing popups and tooltip exits.",
  category: "exit",
  tags: ["scale", "zoom", "exit", "unmount"],
  trigger: "on-click",
  difficulty: "beginner",
  duration: "300ms",
  easing: "cubic-bezier(0.4, 0, 1, 1)",
  cssProperties: ["opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["scale out", "zoom out", "exit", "shrink", "dismiss", "close"],
  useCases: [
    "Modal/dialog closing",
    "Popup dismissal",
    "Tooltip disappearance",
    "Floating action button collapse",
  ],
  relatedAnimations: ["scale-in", "fade-out-down", "collapse"],
  recommendedStyles: ["glassmorphism", "minimalist-flat", "soft-ui"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes scale-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.85);
  }
}

.scale-out {
  --sk-duration: 300ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.4, 0, 1, 1);
  will-change: transform, opacity;
  animation: scale-out var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .scale-out {
    animation: none;
    opacity: 0;
    transform: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes scale-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.85);
  }
}

@utility animate-scale-out {
  --sk-duration: 300ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.4, 0, 1, 1);
  will-change: transform, opacity;
  animation: scale-out var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .scale-out {
    animation: none;
    opacity: 0;
    transform: none;
  }
}`,
    },
    {
      label: "AnimeJS",
      language: "tsx",
      code: `"use client";

import { useEffect, useRef, type ReactNode } from "react";

type AnimeAnimation = {
  cancel(): unknown;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function resetElement(element: HTMLElement) {
  element.style.opacity = "";
  element.style.transform = "";
}

export function ScaleOutCard({ children }: { children: ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimeAnimation | null>(null);

  useEffect(() => {
    return () => {
      animationRef.current?.cancel();
    };
  }, []);

  async function exitCard() {
    const card = cardRef.current;
    if (!card || prefersReducedMotion()) return;

    const { animate } = await import("animejs");
    if (cardRef.current !== card) return;

    animationRef.current?.cancel();
    resetElement(card);

    animationRef.current = animate(card, {
      opacity: [1, 0],
      scale: [1, 0.85],
      duration: 300,
      ease: "in(2)",
      onComplete: () => resetElement(card),
    });
  }

  return (
    <div>
      <button type="button" onClick={() => void exitCard()}>
        Dismiss
      </button>
      <div ref={cardRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.85 }}
  transition={{ duration: 0.3, ease: [0.4, 0, 1, 1] }}
>
  Content
</motion.div>`,
    },
  ],
};
