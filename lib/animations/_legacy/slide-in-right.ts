import type { Animation } from "../types";

export const slideInRight: Animation = {
  slug: "slide-in-right",
  name: "右侧滑入",
  nameEn: "Slide In Right",
  description: "元素从右侧滑入视口，适合侧面板、抽屉菜单和分屏布局的入场效果。",
  descriptionEn: "Element slides in from the right side. Ideal for side panels, drawer menus, and split-screen layouts.",
  category: "entrance",
  tags: ["slide", "entrance", "horizontal", "panel"],
  trigger: "on-mount",
  difficulty: "beginner",
  duration: "500ms",
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  cssProperties: ["opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["slide", "right", "entrance", "panel", "drawer", "horizontal"],
  useCases: [
    "Right-side drawer panel",
    "Split-screen content reveal",
    "Carousel slide transition",
    "Notification panel entrance",
  ],
  relatedAnimations: ["slide-in-left", "fade-in-up"],
  recommendedStyles: ["split-screen", "sidebar-fixed", "magazine-grid"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in-right {
  --sk-duration: 500ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  animation: slide-in-right var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

/* Staggered variant using CSS custom property */
.slide-in-right-stagger {
  --sk-duration: 500ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  animation: slide-in-right var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
  animation-delay: calc(var(--stagger-index, 0) * 80ms);
}

@media (prefers-reduced-motion: reduce) {
  .slide-in-right {
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
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@utility animate-slide-in-right {
  --sk-duration: 500ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  animation: slide-in-right var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .slide-in-right {
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
// Use reduced ? { opacity: 0 } : { opacity: 0, x: 30 } for initial

<motion.div
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
>
  Content
</motion.div>`,
    },
  ],
};
