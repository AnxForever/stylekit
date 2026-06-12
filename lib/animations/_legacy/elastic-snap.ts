import type { Animation } from "../types";

export const elasticSnap: Animation = {
  slug: "elastic-snap",
  name: "弹性回弹",
  nameEn: "Elastic Snap",
  description: "元素被拉伸后像橡皮筋一样弹性回弹到原位，充满物理质感的趣味交互。",
  descriptionEn: "Element stretches and snaps back like a rubber band with satisfying elastic physics.",
  category: "micro-interaction",
  tags: ["elastic", "spring", "rubber", "physics", "snap"],
  trigger: "on-click",
  difficulty: "intermediate",
  duration: "800ms",
  easing: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
  cssProperties: ["transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["elastic", "spring", "rubber band", "snap", "physics", "stretch"],
  useCases: [
    "Button press feedback",
    "Toggle switch animation",
    "Pull-to-refresh indicator",
    "Game UI interactions",
  ],
  relatedAnimations: ["bounce-in", "shake"],
  recommendedStyles: ["playful-pop", "soft-ui", "neo-brutalist"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes elastic-snap {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scaleX(1.2) scaleY(0.8);
  }
  50% {
    transform: scaleX(0.9) scaleY(1.1);
  }
  70% {
    transform: scaleX(1.05) scaleY(0.95);
  }
  100% {
    transform: scale(1);
  }
}

.elastic-snap {
  will-change: transform;
  animation: elastic-snap 800ms cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

/* Trigger on click via JS: element.classList.add("elastic-snap") */

@media (prefers-reduced-motion: reduce) {
  .elastic-snap {
    animation: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Add to your global CSS or Tailwind v4 theme */
@keyframes elastic-snap {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scaleX(1.2) scaleY(0.8);
  }
  50% {
    transform: scaleX(0.9) scaleY(1.1);
  }
  70% {
    transform: scaleX(1.05) scaleY(0.95);
  }
  100% {
    transform: scale(1);
  }
}

@utility animate-elastic-snap {
  will-change: transform;
  animation: elastic-snap 800ms cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

@media (prefers-reduced-motion: reduce) {
  .elastic-snap {
    animation: none;
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

export function ElasticSnapButton({ children }: { children: ReactNode }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<AnimeAnimation | null>(null);

  useEffect(() => {
    return () => {
      animationRef.current?.cancel();
    };
  }, []);

  async function triggerSnap() {
    const button = buttonRef.current;
    if (!button || prefersReducedMotion()) return;

    const { animate } = await import("animejs");
    if (buttonRef.current !== button) return;

    animationRef.current?.cancel();
    button.style.transform = "";

    animationRef.current = animate(button, {
      scaleX: [1, 1.25, 0.9, 1.08, 0.97, 1],
      scaleY: [1, 0.9, 1.08, 0.96, 1.02, 1],
      duration: 800,
      ease: "outElastic(1, .55)",
    });
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => void triggerSnap()}
      className="will-change-transform"
    >
      {children}
    </button>
  );
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

// Tip: respect user's motion preferences
// import { useReducedMotion } from "framer-motion";
// const reduced = useReducedMotion();
// Skip elastic animation entirely when reduced is true

<motion.button
  whileTap={{
    scaleX: [1, 1.2, 0.9, 1.05, 1],
    scaleY: [1, 0.8, 1.1, 0.95, 1],
  }}
  transition={{
    duration: 0.8,
    ease: [0.68, -0.55, 0.27, 1.55],
    times: [0, 0.3, 0.5, 0.7, 1],
  }}
>
  Click me
</motion.button>`,
    },
  ],
};
