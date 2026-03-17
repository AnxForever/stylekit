import type { Animation } from "../types";

export const fadeOutDown: Animation = {
  slug: "fade-out-down",
  name: "淡出下滑",
  nameEn: "Fade Out Down",
  description: "元素向下滑动并逐渐消失，最常见的退场动画之一。",
  descriptionEn: "Element fades out while sliding downward. One of the most common exit animations.",
  category: "exit",
  tags: ["fade", "slide", "exit", "unmount"],
  trigger: "manual",
  difficulty: "beginner",
  duration: "400ms",
  easing: "cubic-bezier(0.4, 0, 1, 1)",
  cssProperties: ["opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["fade out", "slide down", "exit", "leave", "unmount animation"],
  useCases: [
    "Modal dismiss",
    "Toast notification exit",
    "Dropdown close",
    "Card removal",
  ],
  relatedAnimations: ["fade-in-up", "fade-in-down"],
  recommendedStyles: ["glassmorphism", "minimalist-flat", "soft-ui"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes fade-out-down {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}

.fade-out-down {
  --sk-duration: 400ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.4, 0, 1, 1);
  will-change: transform, opacity;
  animation: fade-out-down var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .fade-out-down {
    animation: none;
    opacity: 0;
    transform: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Add to your global CSS or Tailwind v4 theme */
@keyframes fade-out-down {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}

@utility animate-fade-out-down {
  --sk-duration: 400ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.4, 0, 1, 1);
  will-change: transform, opacity;
  animation: fade-out-down var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .fade-out-down {
    animation: none;
    opacity: 0;
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
// Use reduced ? { opacity: 0 } : { opacity: 0, y: 20 } for exit

<motion.div
  initial={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  transition={{ duration: 0.4, ease: [0.4, 0, 1, 1] }}
>
  Content
</motion.div>`,
    },
  ],
};
