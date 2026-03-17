import type { Animation } from "../types";

export const pulse: Animation = {
  slug: "pulse",
  name: "脉搏跳动",
  nameEn: "Pulse",
  description: "元素以心跳般的节奏缩放跳动，常用于提示用户注意或表示活跃状态。",
  descriptionEn: "Element pulses with a heartbeat-like rhythm. Used to draw attention or indicate active status.",
  category: "micro-interaction",
  tags: ["pulse", "heartbeat", "attention", "active", "notification"],
  trigger: "continuous",
  difficulty: "beginner",
  duration: "2s",
  easing: "ease-in-out",
  cssProperties: ["transform", "box-shadow"],
  isGPUAccelerated: false,
  previewBg: "light",
  keywords: ["pulse", "heartbeat", "beat", "attention", "notification", "active"],
  useCases: [
    "Notification badge",
    "Active status indicator",
    "CTA attention grabber",
    "Recording indicator",
  ],
  relatedAnimations: ["shake", "hover-glow"],
  recommendedStyles: ["minimalist-flat", "soft-ui", "material-design"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .pulse {
    animation: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Add to your global CSS or Tailwind v4 theme */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
}

@utility animate-pulse-beat {
  animation: pulse 2s ease-in-out infinite;
}

/* Usage: <span class="animate-pulse-beat inline-block rounded-full bg-blue-500 h-3 w-3" /> */

@media (prefers-reduced-motion: reduce) {
  .pulse {
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
// if (reduced) return <div className="static-indicator" />;

<motion.div
  animate={{
    scale: [1, 1.05, 1],
    boxShadow: [
      "0 0 0 0 rgba(59, 130, 246, 0.5)",
      "0 0 0 10px rgba(59, 130, 246, 0)",
      "0 0 0 0 rgba(59, 130, 246, 0)",
    ],
  }}
  transition={{
    duration: 2,
    ease: "easeInOut",
    repeat: Infinity,
  }}
>
  Content
</motion.div>`,
    },
  ],
};
