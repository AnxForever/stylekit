import type { Animation } from "../types";

export const slideOutRight: Animation = {
  slug: "slide-out-right",
  name: "右侧滑出",
  nameEn: "Slide Out Right",
  description: "元素向右侧滑出视口并消失，适合侧面板关闭、抽屉菜单收起等退场效果。",
  descriptionEn: "Element slides out to the right and disappears. Perfect for closing side panels, drawers, and split-screen exits.",
  category: "exit",
  tags: ["slide", "exit", "horizontal", "panel"],
  trigger: "on-click",
  difficulty: "beginner",
  duration: "400ms",
  easing: "cubic-bezier(0.4, 0, 1, 1)",
  cssProperties: ["opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["slide out", "right", "exit", "panel close", "drawer", "dismiss"],
  useCases: [
    "Side panel closing",
    "Drawer menu dismiss",
    "Card swipe-to-dismiss",
    "Page transition exit",
  ],
  relatedAnimations: ["slide-in-left", "slide-in-right", "fade-out-down"],
  recommendedStyles: ["minimalist-flat", "corporate-clean", "soft-ui"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes slide-out-right {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

.slide-out-right {
  --sk-duration: 400ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.4, 0, 1, 1);
  will-change: transform, opacity;
  animation: slide-out-right var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .slide-out-right {
    animation: none;
    opacity: 0;
    transform: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes slide-out-right {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

@utility animate-slide-out-right {
  --sk-duration: 400ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.4, 0, 1, 1);
  will-change: transform, opacity;
  animation: slide-out-right var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .slide-out-right {
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

export function SlideOutPanel({ children }: { children: ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimeAnimation | null>(null);

  useEffect(() => {
    return () => {
      animationRef.current?.cancel();
    };
  }, []);

  async function closePanel() {
    const panel = panelRef.current;
    if (!panel || prefersReducedMotion()) return;

    const { animate } = await import("animejs");
    if (panelRef.current !== panel) return;

    animationRef.current?.cancel();
    resetElement(panel);

    animationRef.current = animate(panel, {
      opacity: [1, 0],
      x: ["0%", "100%"],
      duration: 400,
      ease: "in(2)",
      onComplete: () => resetElement(panel),
    });
  }

  return (
    <div>
      <button type="button" onClick={() => void closePanel()}>
        Close
      </button>
      <div ref={panelRef} className="will-change-transform">
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
  initial={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: "100%" }}
  transition={{ duration: 0.4, ease: [0.4, 0, 1, 1] }}
>
  Content
</motion.div>`,
    },
  ],
};
