import type { Animation } from "./types";

export const zoomIn: Animation = {
  slug: "zoom-in",
  name: "远景拉近",
  nameEn: "Zoom In",
  description: "元素从远处快速拉近至原始尺寸，带有强烈的纵深感和冲击力。",
  descriptionEn: "Element zooms in from a distance to its original size with a strong sense of depth.",
  category: "entrance",
  tags: ["zoom", "scale", "entrance", "depth"],
  trigger: "on-mount",
  difficulty: "beginner",
  duration: "500ms",
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  cssProperties: ["opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["zoom", "scale up", "entrance", "depth", "camera"],
  useCases: [
    "Hero image entrance",
    "Lightbox open",
    "Image gallery focus",
    "Feature highlight",
  ],
  relatedAnimations: ["scale-in", "blur-in"],
  recommendedStyles: ["dark-mode", "modern-gradient", "glassmorphism"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes zoom-in {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.zoom-in {
  --sk-duration: 500ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  animation: zoom-in var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .zoom-in {
    animation: none;
    opacity: 1;
    transform: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Add to your global CSS or Tailwind v4 theme */
@keyframes zoom-in {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@utility animate-zoom-in {
  --sk-duration: 500ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  animation: zoom-in var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .zoom-in {
    animation: none;
    opacity: 1;
    transform: none;
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

// Tip: respect user's motion preferences
// import { useReducedMotion } from "framer-motion";
// const reduced = useReducedMotion();
// Use reduced ? { opacity: 0 } : { opacity: 0, scale: 0.5 } for initial

<motion.div
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
>
  Content
</motion.div>`,
    },
  ],
};
