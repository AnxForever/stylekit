import type { Animation } from "./types";

export const elasticScale: Animation = {
  slug: "elastic-scale",
  name: "弹簧缩放",
  nameEn: "Elastic Scale",
  description: "元素以弹簧物理效果入场，多次过冲和回弹后稳定，比 bounce-in 更夸张的弹性感。",
  descriptionEn: "Element enters with spring physics, overshooting and rebounding multiple times. More elastic than bounce-in.",
  category: "entrance",
  tags: ["elastic", "spring", "scale", "entrance", "physics"],
  trigger: "on-mount",
  difficulty: "intermediate",
  duration: "800ms",
  easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  cssProperties: ["opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "gradient",
  keywords: ["elastic", "spring", "bounce", "overshoot", "physics", "entrance", "playful"],
  useCases: [
    "Notification badge pop-in",
    "Achievement unlock animation",
    "Playful button entrance",
    "Game UI element appearance",
  ],
  relatedAnimations: ["bounce-in", "scale-in"],
  recommendedStyles: ["neo-brutalist", "retro-gaming", "soft-ui"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes elastic-scale {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  40% {
    opacity: 1;
    transform: scale(1.16);
  }
  60% {
    transform: scale(0.92);
  }
  75% {
    transform: scale(1.05);
  }
  90% {
    transform: scale(0.98);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.elastic-scale {
  --sk-duration: 800ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, opacity;
  animation: elastic-scale var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .elastic-scale {
    animation: none;
    opacity: 1;
    transform: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes elastic-scale {
  0% { opacity: 0; transform: scale(0); }
  40% { opacity: 1; transform: scale(1.16); }
  60% { transform: scale(0.92); }
  75% { transform: scale(1.05); }
  90% { transform: scale(0.98); }
  100% { opacity: 1; transform: scale(1); }
}

@utility animate-elastic-scale {
  --sk-duration: 800ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, opacity;
  animation: elastic-scale var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .elastic-scale {
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

<motion.div
  initial={{ opacity: 0, scale: 0 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 260,
    damping: 12,
    mass: 0.8,
  }}
>
  Content
</motion.div>`,
    },
  ],
};
