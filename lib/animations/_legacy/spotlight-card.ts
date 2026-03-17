import type { Animation } from "../types";

export const spotlightCard: Animation = {
  slug: "spotlight-card",
  name: "聚光灯卡片",
  nameEn: "Spotlight Card",
  description: "鼠标在卡片上方移动时，呈现手电筒照亮卡片局部的光影跟随效果。",
  descriptionEn: "A flashlight-like spotlight follows the cursor when hovering over the card.",
  category: "micro-interaction",
  tags: ["hover", "spotlight", "glow", "mouse-tracking"],
  trigger: "on-hover",
  difficulty: "advanced",
  duration: "continuous",
  easing: "linear",
  cssProperties: ["background-image"],
  isGPUAccelerated: true,
  previewBg: "dark",
  keywords: ["spotlight", "mouse tracking", "glow", "card effect", "lighting"],
  useCases: [
    "Pricing feature cards",
    "Bento grid items",
    "Portfolio project showcase",
  ],
  relatedAnimations: ["hover-glow"],
  recommendedStyles: ["glassmorphism", "dark-mode", "modern-gradient"],
  codeSnippets: [
    {
      label: "Tailwind CSS + React",
      language: "tsx",
      code: `import { useRef, useState } from "react";

export function SpotlightCard({ children }: { children: React.ReactNode }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative overflow-hidden border border-white/10 bg-black/20 p-8"
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: \`radial-gradient(600px circle at \${position.x}px \${position.y}px, rgba(255,255,255,0.1), transparent 40%)\`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Tip: consider disabling for reduced motion users
// import { useReducedMotion } from "framer-motion";

export function SpotlightCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => opacity.set(1)}
      onMouseLeave={() => opacity.set(0)}
      className="relative overflow-hidden border border-white/10 bg-black/20 p-8"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px"
        style={{
          opacity,
          background: \`radial-gradient(600px circle at \${smoothX}px \${smoothY}px, rgba(255,255,255,0.1), transparent 40%)\`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}`,
    },
  ],
};
