import type { Animation } from "./types";

export const bounceIn: Animation = {
  slug: "bounce-in",
  name: "弹性入场",
  nameEn: "Bounce In",
  description: "元素以弹性缩放方式入场，从小尺寸弹跳过冲后稳定在原始大小，充满活力感。",
  descriptionEn: "Element enters with an elastic bounce scale effect, overshooting slightly before settling at its original size.",
  category: "entrance",
  tags: ["bounce", "scale", "entrance", "elastic", "mount"],
  trigger: "on-mount",
  difficulty: "beginner",
  duration: "600ms",
  easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  cssProperties: ["opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["bounce", "elastic", "spring", "entrance", "scale", "overshoot"],
  useCases: [
    "Notification badge appearance",
    "Toast message entrance",
    "Icon pop-in effect",
    "Call-to-action button reveal",
  ],
  relatedAnimations: ["scale-in", "fade-in-up"],
  recommendedStyles: ["soft-ui", "playful-pop", "glassmorphism"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.08);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.bounce-in {
  will-change: transform, opacity;
  animation: bounce-in 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Add to your global CSS or Tailwind v4 theme */
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.08);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@utility animate-bounce-in {
  will-change: transform, opacity;
  animation: bounce-in 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

// Tip: respect user's motion preferences
// import { useReducedMotion } from "framer-motion";
// const reduced = useReducedMotion();
// Use reduced ? { opacity: 0 } : { opacity: 0, scale: 0.3 } for initial

<motion.div
  initial={{ opacity: 0, scale: 0.3 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    duration: 0.6,
    ease: [0.34, 1.56, 0.64, 1],
    scale: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  }}
>
  Content
</motion.div>`,
    },
  ],
};
