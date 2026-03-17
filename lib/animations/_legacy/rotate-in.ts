import type { Animation } from "../types";

export const rotateIn: Animation = {
  slug: "rotate-in",
  name: "旋转入场",
  nameEn: "Rotate In",
  description: "元素从反向旋转并透明的状态旋转至正位并淡入，适合图标和趣味性入场。",
  descriptionEn: "Element rotates from -180deg with zero opacity to its final position. Great for icons and playful entrances.",
  category: "entrance",
  tags: ["rotate", "spin", "entrance", "mount"],
  trigger: "on-mount",
  difficulty: "intermediate",
  duration: "500ms",
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  cssProperties: ["opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["rotate", "spin", "entrance", "turn", "twist", "icon animation"],
  useCases: [
    "Icon entrance animation",
    "Logo reveal effect",
    "Playful element appearance",
    "Achievement badge reveal",
  ],
  relatedAnimations: ["scale-in", "bounce-in"],
  recommendedStyles: ["playful-pop", "retro-pixel", "neo-brutalist"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes rotate-in {
  from {
    opacity: 0;
    transform: rotate(-180deg);
  }
  to {
    opacity: 1;
    transform: rotate(0deg);
  }
}

.rotate-in {
  --sk-duration: 500ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  animation: rotate-in var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .rotate-in {
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
@keyframes rotate-in {
  from {
    opacity: 0;
    transform: rotate(-180deg);
  }
  to {
    opacity: 1;
    transform: rotate(0deg);
  }
}

@utility animate-rotate-in {
  --sk-duration: 500ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  animation: rotate-in var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .rotate-in {
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
// Use reduced ? { opacity: 0 } : { opacity: 0, rotate: -180 } for initial

<motion.div
  initial={{ opacity: 0, rotate: -180 }}
  animate={{ opacity: 1, rotate: 0 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
>
  Content
</motion.div>`,
    },
  ],
};
