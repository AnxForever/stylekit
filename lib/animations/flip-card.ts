import type { Animation } from "./types";

export const flipCard: Animation = {
  slug: "flip-card",
  name: "3D 卡片翻转",
  nameEn: "Flip Card",
  description: "卡片沿 Y 轴进行 3D 翻转，显示背面内容，需要透视容器和 backface-visibility 控制。",
  descriptionEn: "Card flips along the Y-axis in 3D space to reveal back content. Requires a perspective container and backface-visibility control.",
  category: "hover",
  tags: ["flip", "3d", "card", "hover", "perspective"],
  trigger: "on-hover",
  difficulty: "advanced",
  duration: "600ms",
  easing: "ease-in-out",
  cssProperties: ["transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["flip", "card", "3d", "rotate", "perspective", "backface", "two-sided"],
  useCases: [
    "Team member profile cards",
    "Product feature reveal",
    "FAQ toggle cards",
    "Interactive info cards",
  ],
  relatedAnimations: ["hover-lift", "hover-glow"],
  recommendedStyles: ["glassmorphism", "modern-gradient", "dark-mode"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `.flip-card {
  perspective: 1000px;
  width: 300px;
  height: 200px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: transform 600ms ease-in-out;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 12px;
}

.flip-card-front {
  background: var(--card-bg, hsl(0 0% 100%));
}

.flip-card-back {
  background: var(--card-bg-alt, hsl(0 0% 96%));
  transform: rotateY(180deg);
}

@media (prefers-reduced-motion: reduce) {
  .flip-card {
    animation: none;
    transition: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Add to your global CSS or Tailwind v4 theme */
@utility flip-card {
  perspective: 1000px;
}

@utility flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: transform 600ms ease-in-out;
  transform-style: preserve-3d;
}

@utility flip-card-inner-flipped {
  transform: rotateY(180deg);
}

@utility flip-card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: var(--radius-lg, 12px);
}

@utility flip-card-back {
  transform: rotateY(180deg);
}

@media (prefers-reduced-motion: reduce) {
  .flip-card {
    animation: none;
    transition: none;
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

// Tip: consider disabling for reduced motion users
// import { useReducedMotion } from "framer-motion";

<div style={{ perspective: "800px" }}>
  <motion.div
    style={{ transformStyle: "preserve-3d" }}
    whileHover={{ rotateY: 180 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
  >
    {/* Front face */}
    <div style={{ backfaceVisibility: "hidden" }}>
      Front Content
    </div>
    {/* Back face */}
    <div style={{
      backfaceVisibility: "hidden",
      transform: "rotateY(180deg)",
      position: "absolute",
      inset: 0,
    }}>
      Back Content
    </div>
  </motion.div>
</div>`,
    },
  ],
};
