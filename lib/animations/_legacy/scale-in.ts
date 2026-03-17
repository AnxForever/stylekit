import type { Animation } from "../types";

export const scaleIn: Animation = {
  slug: "scale-in",
  name: "缩放淡入",
  nameEn: "Scale In",
  description: "元素从缩小状态放大至原始尺寸并淡入，适合卡片、弹窗等组件入场。",
  descriptionEn: "Element scales up from a smaller size while fading in. Great for cards, modals, and tooltips.",
  category: "entrance",
  tags: ["scale", "zoom", "entrance", "mount"],
  trigger: "on-mount",
  difficulty: "beginner",
  duration: "400ms",
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  cssProperties: ["opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["scale", "zoom in", "entrance", "grow", "expand"],
  useCases: [
    "Modal/dialog entrance",
    "Tooltip appearance",
    "Image gallery reveal",
    "Notification popup",
  ],
  relatedAnimations: ["fade-in-up", "blur-in"],
  recommendedStyles: ["neumorphism", "soft-ui", "claymorphism"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  --sk-duration: 400ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  animation: scale-in var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .scale-in {
    animation: none;
    opacity: 1;
    transform: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@utility animate-scale-in {
  --sk-duration: 400ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  animation: scale-in var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .scale-in {
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
// Use reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 } for initial

<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
>
  Content
</motion.div>`,
    },
  ],
};
