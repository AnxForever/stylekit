import type { Animation } from "../types";

export const morphTransition: Animation = {
  slug: "morph-transition",
  name: "形态过渡",
  nameEn: "Morph Transition",
  description: "元素在两种形态之间平滑过渡，包括尺寸、圆角、颜色等属性的同步变化。",
  descriptionEn: "Element smoothly morphs between two states, transitioning size, border-radius, and color simultaneously.",
  category: "transition",
  tags: ["morph", "transition", "shape", "state"],
  trigger: "continuous",
  difficulty: "advanced",
  duration: "600ms",
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  cssProperties: ["border-radius", "width", "height", "background-color"],
  isGPUAccelerated: false,
  previewBg: "gradient",
  keywords: ["morph", "shape shift", "state transition", "layout animation", "FLIP"],
  useCases: [
    "Button state transitions",
    "Card expand/collapse morph",
    "Navigation indicator morph",
    "Toggle switch animation",
  ],
  relatedAnimations: ["crossfade", "morph-shape", "blur-in"],
  recommendedStyles: ["glassmorphism", "soft-ui", "neo-brutalist"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes morph-transition {
  0%, 100% {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #6366f1;
  }
  50% {
    width: 120px;
    height: 40px;
    border-radius: 12px;
    background-color: #ec4899;
  }
}

.morph-transition {
  --sk-duration: 2.4s;
  --sk-ease: cubic-bezier(0.4, 0, 0.2, 1);
  animation: morph-transition var(--sk-duration) var(--sk-ease) infinite;
}

@media (prefers-reduced-motion: reduce) {
  .morph-transition {
    animation: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes morph-transition {
  0%, 100% {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #6366f1;
  }
  50% {
    width: 120px;
    height: 40px;
    border-radius: 12px;
    background-color: #ec4899;
  }
}

@utility animate-morph-transition {
  --sk-duration: 2.4s;
  --sk-ease: cubic-bezier(0.4, 0, 0.2, 1);
  animation: morph-transition var(--sk-duration) var(--sk-ease) infinite;
}

@media (prefers-reduced-motion: reduce) {
  .morph-transition {
    animation: none;
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

// Use layout animations for automatic morph transitions
<motion.div
  layout
  animate={isExpanded ? {
    width: 120,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#ec4899",
  } : {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#6366f1",
  }}
  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
/>`,
    },
  ],
};
