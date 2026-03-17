import type { Animation } from "../types";

export const shake: Animation = {
  slug: "shake",
  name: "抖动提示",
  nameEn: "Shake",
  description: "元素在水平方向快速抖动，常用于表单校验失败或错误提示的视觉反馈。",
  descriptionEn: "Element shakes horizontally with decreasing amplitude. Commonly used for form validation errors or attention-grabbing feedback.",
  category: "micro-interaction",
  tags: ["shake", "error", "feedback", "attention", "click"],
  trigger: "on-click",
  difficulty: "beginner",
  duration: "500ms",
  easing: "ease-in-out",
  cssProperties: ["transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["shake", "vibrate", "error", "validation", "feedback", "attention"],
  useCases: [
    "Form validation error feedback",
    "Wrong password indication",
    "Attention-grabbing notification",
    "Interactive button feedback",
  ],
  relatedAnimations: ["hover-lift", "bounce-in"],
  recommendedStyles: ["neo-brutalist", "modern-gradient", "minimalist-flat"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 50% {
    transform: translateX(-10px);
  }
  20%, 60% {
    transform: translateX(10px);
  }
  30%, 70% {
    transform: translateX(-8px);
  }
  40%, 80% {
    transform: translateX(6px);
  }
  90% {
    transform: translateX(-4px);
  }
}

.shake {
  will-change: transform;
  animation: shake 500ms ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .shake {
    animation: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Add to your global CSS or Tailwind v4 theme */
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 50% {
    transform: translateX(-10px);
  }
  20%, 60% {
    transform: translateX(10px);
  }
  30%, 70% {
    transform: translateX(-8px);
  }
  40%, 80% {
    transform: translateX(6px);
  }
  90% {
    transform: translateX(-4px);
  }
}

@utility animate-shake {
  will-change: transform;
  animation: shake 500ms ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .shake {
    animation: none;
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
// Skip shake animation entirely when reduced is true

<motion.div
  animate={{
    x: [0, -10, 10, -8, 6, -4, 0],
  }}
  transition={{
    duration: 0.5,
    ease: "easeInOut",
    times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1],
  }}
>
  Content
</motion.div>`,
    },
  ],
};
