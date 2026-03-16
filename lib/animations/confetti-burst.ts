import type { Animation } from "./types";

export const confettiBurst: Animation = {
  slug: "confetti-burst",
  name: "彩纸爆炸",
  nameEn: "Confetti Burst",
  description: "点击时从触发点向四周射出彩色纸片粒子，适合成功状态、庆祝和游戏化场景的视觉反馈。",
  descriptionEn: "Colorful confetti particles burst outward from the click point and float down with gravity. Perfect for success states, celebrations, and gamification feedback.",
  category: "micro-interaction",
  tags: ["confetti", "particle", "celebration", "click", "success", "gamification"],
  trigger: "on-click",
  difficulty: "advanced",
  duration: "1.2s",
  easing: "cubic-bezier(0, 0.9, 0.57, 1)",
  cssProperties: ["transform", "opacity"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["confetti", "celebration", "particle", "burst", "success", "reward", "gamification"],
  useCases: [
    "Form submission success",
    "Achievement unlocked",
    "Payment completed",
    "Goal reached indicator",
  ],
  relatedAnimations: ["ripple-click", "pulse-ring", "elastic-snap"],
  recommendedStyles: ["dopamine-design", "kawaii-minimal", "memphis", "pop-art"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes confetti-fall {
  0% {
    opacity: 1;
    transform: translate(var(--x), var(--y)) rotate(0deg) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(
      calc(var(--x) + var(--drift)),
      calc(var(--y) + 120px)
    ) rotate(var(--spin)) scale(0.4);
  }
}

.confetti-particle {
  position: absolute;
  width: 8px;
  height: 8px;
  will-change: transform, opacity;
  animation: confetti-fall 1.2s cubic-bezier(0, 0.9, 0.57, 1) forwards;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .confetti-particle {
    animation: none;
    display: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Confetti burst — JS generates particles, CSS animates them. */

@keyframes confetti-fall {
  0% {
    opacity: 1;
    transform: translate(var(--x), var(--y)) rotate(0deg) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(
      calc(var(--x) + var(--drift)),
      calc(var(--y) + 120px)
    ) rotate(var(--spin)) scale(0.4);
  }
}

@utility animate-confetti {
  position: absolute;
  width: 8px;
  height: 8px;
  will-change: transform, opacity;
  animation: confetti-fall 1.2s cubic-bezier(0, 0.9, 0.57, 1) forwards;
  pointer-events: none;
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, type MouseEvent } from "react";

const COLORS = ["#ff006e", "#fb5607", "#ffbe0b", "#8338ec", "#3a86ff", "#06d6a0"];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  velocity: number;
}

function spawnParticles(x: number, y: number, count = 20): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: Date.now() + i,
    x,
    y,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    angle: (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5,
    velocity: 60 + Math.random() * 80,
  }));
}

export function ConfettiButton({ children }: { children: React.ReactNode }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setParticles((prev) => [...prev, ...spawnParticles(x, y)]);
  }

  return (
    <button onClick={handleClick} style={{ position: "relative", overflow: "visible" }}>
      {children}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{
              x: p.x,
              y: p.y,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: p.x + Math.cos(p.angle) * p.velocity,
              y: p.y + Math.sin(p.angle) * p.velocity + 120,
              scale: 0.4,
              opacity: 0,
              rotate: Math.random() * 720 - 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0, 0.9, 0.57, 1] }}
            onAnimationComplete={() =>
              setParticles((prev) => prev.filter((pp) => pp.id !== p.id))
            }
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: Math.random() > 0.5 ? "50%" : "1px",
              background: p.color,
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
