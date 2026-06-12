import type { Animation } from "../types";

export const rippleClick: Animation = {
  slug: "ripple-click",
  name: "涟漪点击",
  nameEn: "Ripple Click",
  description: "点击时从触发点产生向外扩散的圆形涟漪效果，Material Design 风格的经典交互反馈。",
  descriptionEn: "A circular ripple expands outward from the click point and fades out. Classic Material Design interaction feedback.",
  category: "micro-interaction",
  tags: ["ripple", "click", "material", "feedback", "interactive"],
  trigger: "on-click",
  difficulty: "intermediate",
  duration: "600ms",
  easing: "ease-out",
  cssProperties: ["transform", "opacity"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["ripple", "click", "material design", "wave", "touch feedback", "button click"],
  useCases: [
    "Button click feedback",
    "List item tap effect",
    "Material Design interactions",
    "Touch-friendly UI elements",
  ],
  relatedAnimations: ["shake", "magnetic-hover"],
  recommendedStyles: ["material-design", "minimalist-flat", "soft-ui"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes ripple-click {
  from {
    opacity: 0.6;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(4);
  }
}

.ripple-container {
  position: relative;
  overflow: hidden;
}

.ripple-effect {
  position: absolute;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-top: -20px;
  margin-left: -20px;
  background: var(--ripple-color, hsl(0 0% 0% / 0.15));
  will-change: transform, opacity;
  animation: ripple-click 600ms ease-out forwards;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .ripple-effect {
    animation: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Add to your global CSS or Tailwind v4 theme */
@keyframes ripple-click {
  from {
    opacity: 0.6;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(4);
  }
}

@utility ripple-container {
  position: relative;
  overflow: hidden;
}

@utility animate-ripple-click {
  position: absolute;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-top: -20px;
  margin-left: -20px;
  background: var(--ripple-color, hsl(0 0% 0% / 0.15));
  will-change: transform, opacity;
  animation: ripple-click 600ms ease-out forwards;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .ripple-effect {
    animation: none;
  }
}`,
    },
    {
      label: "AnimeJS",
      language: "tsx",
      code: `"use client";

import { useCallback, useEffect, useRef, type MouseEvent, type ReactNode } from "react";

type AnimeModule = typeof import("animejs");
type AnimeAnimation = {
  cancel(): unknown;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function RippleButton({ children }: { children: ReactNode }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animeRef = useRef<Promise<AnimeModule> | null>(null);
  const activeRipplesRef = useRef<Array<{ animation: AnimeAnimation; element: HTMLSpanElement }>>([]);

  useEffect(() => {
    return () => {
      activeRipplesRef.current.forEach(({ animation, element }) => {
        animation.cancel();
        element.remove();
      });
      activeRipplesRef.current = [];
    };
  }, []);

  const getAnime = useCallback(() => {
    animeRef.current ??= import("animejs");
    return animeRef.current;
  }, []);

  const removeRipple = useCallback((ripple: HTMLSpanElement) => {
    activeRipplesRef.current = activeRipplesRef.current.filter(
      (entry) => entry.element !== ripple
    );
    ripple.remove();
  }, []);

  const spawnRipple = useCallback(
    async (x: number, y: number) => {
      const button = buttonRef.current;
      if (!button || prefersReducedMotion()) return;

      const { animate } = await getAnime();
      if (buttonRef.current !== button) return;

      const ripple = document.createElement("span");
      ripple.style.cssText =
        "position:absolute;left:" + (x - 12) + "px;top:" + (y - 12) + "px;width:24px;height:24px;border-radius:9999px;background:currentColor;opacity:0.45;pointer-events:none;will-change:transform;";
      button.appendChild(ripple);

      const animation = animate(ripple, {
        scale: [0, 16],
        opacity: [0.45, 0],
        duration: 650,
        ease: "out(2)",
        onComplete: () => removeRipple(ripple),
      });

      activeRipplesRef.current.push({ animation, element: ripple });
    },
    [getAnime, removeRipple]
  );

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    void spawnRipple(event.clientX - rect.left, event.clientY - rect.top);
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="relative overflow-hidden px-6 py-3 bg-indigo-500 text-white"
    >
      <span className="relative z-10 pointer-events-none">{children}</span>
    </button>
  );
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion, AnimatePresence } from "framer-motion";
import { useState, type MouseEvent } from "react";

// Tip: respect user's motion preferences
// import { useReducedMotion } from "framer-motion";
// const reduced = useReducedMotion();
// If reduced, skip ripple and rely on :active state change

function RippleButton({ children }: { children: React.ReactNode }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples((prev) => [
      ...prev,
      { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() },
    ]);
  }

  return (
    <button onClick={handleClick} style={{ position: "relative", overflow: "hidden" }}>
      {children}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() =>
              setRipples((prev) => prev.filter((p) => p.id !== r.id))
            }
            style={{
              position: "absolute",
              left: r.x - 20,
              top: r.y - 20,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "currentColor",
              opacity: 0.15,
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
}`,
    },
  ],
};
