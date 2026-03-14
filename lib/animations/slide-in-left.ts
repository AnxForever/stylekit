import type { Animation } from "./types";

export const slideInLeft: Animation = {
  slug: "slide-in-left",
  name: "左侧滑入",
  nameEn: "Slide In Left",
  description: "元素从左侧滑入视口，适合侧边栏、抽屉菜单等组件。",
  descriptionEn: "Element slides in from the left side. Great for sidebars, drawer menus, and panel reveals.",
  category: "entrance",
  tags: ["slide", "entrance", "horizontal", "sidebar"],
  trigger: "on-mount",
  difficulty: "beginner",
  duration: "500ms",
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  cssProperties: ["opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["slide", "left", "entrance", "sidebar", "drawer", "panel"],
  useCases: [
    "Sidebar/drawer open",
    "Off-canvas menu",
    "Panel reveal",
    "Carousel slide transition",
  ],
  relatedAnimations: ["fade-in-up", "fade-in-down"],
  recommendedStyles: ["split-screen", "sidebar-fixed", "magazine-grid"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in-left {
  will-change: transform, opacity;
  animation: slide-in-left 500ms cubic-bezier(0.16, 1, 0.3, 1) both;
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@utility animate-slide-in-left {
  will-change: transform, opacity;
  animation: slide-in-left 500ms cubic-bezier(0.16, 1, 0.3, 1) both;
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

// Tip: respect user's motion preferences
// import { useReducedMotion } from "framer-motion";
// const reduced = useReducedMotion();
// Use reduced ? { opacity: 0 } : { opacity: 0, x: -30 } for initial

<motion.div
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
>
  Content
</motion.div>`,
    },
  ],
};
