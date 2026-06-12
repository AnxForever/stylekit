import type { Animation } from "../types";

export const magneticHover: Animation = {
  slug: "magnetic-hover",
  name: "磁吸悬浮",
  nameEn: "Magnetic Hover",
  description: "鼠标靠近目标元素时，元素会像被磁铁吸引一样向鼠标指针方向产生弹性位移。",
  descriptionEn: "Element attracts towards the mouse cursor like a magnet with a spring physics effect.",
  category: "micro-interaction",
  tags: ["hover", "magnetic", "physics", "interactive"],
  trigger: "on-hover",
  difficulty: "intermediate",
  duration: "continuous",
  easing: "spring",
  cssProperties: ["transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["magnetic", "spring", "button hover", "physics", "attract"],
  useCases: [
    "Navigation bar icons",
    "Floating Action Buttons (FAB)",
    "Call-to-action buttons",
  ],
  relatedAnimations: ["hover-lift"],
  recommendedStyles: ["minimalist-flat", "apple-style", "neo-brutalist"],
  codeSnippets: [
    {
      label: "Tailwind CSS + React",
      language: "tsx",
      code: `import { useRef, useState } from "react";

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setTransform(\`translate(\${x}px, \${y}px)\`);
  };

  const reset = () => setTransform("");

  return (
    <button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className="px-6 py-3 bg-foreground text-background transition-transform duration-200 ease-out will-change-transform"
      style={{ transform }}
    >
      {children}
    </button>
  );
}`,
    },
    {
      label: "AnimeJS",
      language: "tsx",
      code: `"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

type AnimeModule = typeof import("animejs");
type AnimeAnimation = {
  cancel(): unknown;
  revert(): unknown;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MagneticButton({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const animeRef = useRef<Promise<AnimeModule> | null>(null);
  const animationRef = useRef<AnimeAnimation | null>(null);

  useEffect(() => {
    return () => {
      animationRef.current?.revert();
    };
  }, []);

  function getAnime() {
    animeRef.current ??= import("animejs");
    return animeRef.current;
  }

  async function moveTo(x: number, y: number, duration = 180) {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    const { animate } = await getAnime();
    if (ref.current !== element) return;

    animationRef.current?.cancel();
    animationRef.current = animate(element, {
      x,
      y,
      duration,
      ease: "out(3)",
    });
  }

  function handleMouseMove(event: MouseEvent<HTMLButtonElement>) {
    const element = ref.current;
    if (!element) return;

    const { clientX, clientY } = event;
    const { height, width, left, top } = element.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    void moveTo(x, y);
  }

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => void moveTo(0, 0, 420)}
      className="px-6 py-3 bg-foreground text-background will-change-transform"
    >
      {children}
    </button>
  );
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { useRef, useState } from "react";
import { motion } from "framer-motion";

// Tip: consider disabling for reduced motion users
// import { useReducedMotion } from "framer-motion";

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="px-6 py-3 bg-foreground text-background"
    >
      {children}
    </motion.button>
  );
}`,
    },
  ],
};
