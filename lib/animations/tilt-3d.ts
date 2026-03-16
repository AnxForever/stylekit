import type { Animation } from "./types";

export const tilt3d: Animation = {
  slug: "tilt-3d",
  name: "3D 透视倾斜",
  nameEn: "3D Tilt",
  description: "鼠标在卡片上移动时，卡片随鼠标位置产生 3D 透视倾斜效果，营造沉浸式的空间深度感。",
  descriptionEn: "Card tilts in 3D space following cursor position, creating an immersive depth effect with perspective transforms.",
  category: "hover",
  tags: ["3d", "perspective", "tilt", "hover", "mouse-tracking", "interactive"],
  trigger: "on-hover",
  difficulty: "intermediate",
  duration: "continuous",
  easing: "ease-out",
  cssProperties: ["transform", "perspective"],
  isGPUAccelerated: true,
  previewBg: "dark",
  keywords: ["3d tilt", "perspective", "mouse tracking", "card hover", "parallax card", "depth"],
  useCases: [
    "Product showcase cards",
    "Pricing cards",
    "Portfolio project cards",
    "Image gallery thumbnails",
  ],
  relatedAnimations: ["hover-lift", "spotlight-card", "magnetic-hover"],
  recommendedStyles: ["glassmorphism", "dark-mode", "cyberpunk-neon", "apple-style"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `/* 3D Tilt requires JS for mouse tracking.
   CSS sets up the perspective container and smooth transitions. */

.tilt-container {
  perspective: 1000px;
}

.tilt-card {
  transform-style: preserve-3d;
  transition: transform 150ms ease-out;
  will-change: transform;
}

.tilt-card:hover {
  /* JS overrides this with dynamic rotateX/rotateY values */
  transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) scale3d(1.02, 1.02, 1.02);
}

.tilt-card .tilt-shine {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255, 255, 255, 0.15),
    transparent 60%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 150ms ease-out;
}

.tilt-card:hover .tilt-shine {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .tilt-card {
    transition: none;
    transform: none !important;
  }
  .tilt-card .tilt-shine {
    display: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Tailwind v4 — 3D Tilt container and card */

@utility perspective-1000 {
  perspective: 1000px;
}

@utility preserve-3d {
  transform-style: preserve-3d;
}

/* Usage:
  <div class="perspective-1000">
    <div class="preserve-3d transition-transform duration-150 ease-out hover:scale-[1.02]"
         style="transform: rotateX(var(--tilt-x)) rotateY(var(--tilt-y))">
      Card content
    </div>
  </div>
*/`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { type MouseEvent, type ReactNode } from "react";

interface Tilt3DProps {
  children: ReactNode;
  maxTilt?: number;
  className?: string;
}

export function Tilt3D({ children, maxTilt = 15, className }: Tilt3DProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 20 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * maxTilt);
    rotateY.set(x * maxTilt);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}`,
    },
  ],
};
