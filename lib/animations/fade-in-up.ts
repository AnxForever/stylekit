import type { Animation } from "./types";

export const fadeInUp: Animation = {
  slug: "fade-in-up",
  name: "淡入上滑",
  nameEn: "Fade In Up",
  description: "元素从下方淡入并向上滑动，最常见的入场动画之一。",
  descriptionEn: "Element fades in while sliding upward. One of the most common entrance animations.",
  category: "entrance",
  tags: ["fade", "slide", "entrance", "mount"],
  trigger: "on-mount",
  difficulty: "beginner",
  duration: "600ms",
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  cssProperties: ["opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["fade in", "slide up", "entrance", "appear", "mount animation"],
  useCases: [
    "Page section entrance",
    "Card list staggered reveal",
    "Modal content appearance",
    "Hero text entrance",
  ],
  relatedAnimations: ["fade-in-down", "scale-in", "blur-in"],
  recommendedStyles: ["glassmorphism", "minimalist-flat", "soft-ui"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  --sk-duration: 600ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  animation: fade-in-up var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .fade-in-up {
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
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@utility animate-fade-in-up {
  --sk-duration: 600ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  animation: fade-in-up var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .fade-in-up {
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
// Use reduced ? { opacity: 0 } : { opacity: 0, y: 20 } for initial

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
  Content
</motion.div>`,
    },
  ],
};
