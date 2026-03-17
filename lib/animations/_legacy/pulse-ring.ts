import type { Animation } from "../types";

export const pulseRing: Animation = {
  slug: "pulse-ring",
  name: "脉冲光环",
  nameEn: "Pulse Ring",
  description: "从元素中心向外扩散的脉冲圆环效果，适合状态指示器、在线标志和注意力引导。",
  descriptionEn: "Concentric rings pulse outward from the element center. Ideal for status indicators, online badges, and attention cues.",
  category: "micro-interaction",
  tags: ["pulse", "ring", "status", "attention", "continuous"],
  trigger: "continuous",
  difficulty: "beginner",
  duration: "2s",
  easing: "ease-out",
  cssProperties: ["box-shadow", "opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "dark",
  keywords: ["pulse", "ring", "beacon", "status indicator", "online", "notification", "ping"],
  useCases: [
    "Online/active status indicator",
    "Notification attention beacon",
    "Live streaming indicator",
    "New feature highlight dot",
  ],
  relatedAnimations: ["hover-glow", "ripple-click"],
  recommendedStyles: ["cyberpunk-neon", "dark-mode", "minimalist-flat"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes pulse-ring {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

.pulse-ring {
  --sk-color: rgba(34, 197, 94, 0.5);
  --sk-duration: 2s;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse-ring var(--sk-duration) ease-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .pulse-ring {
    animation: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes pulse-ring {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

@utility animate-pulse-ring {
  --sk-duration: 2s;
  animation: pulse-ring var(--sk-duration) ease-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-pulse-ring {
    animation: none;
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

<div className="relative">
  <motion.span
    className="absolute inset-0 rounded-full bg-green-500"
    animate={{
      boxShadow: [
        "0 0 0 0 rgba(34,197,94,0.5)",
        "0 0 0 10px rgba(34,197,94,0)",
        "0 0 0 0 rgba(34,197,94,0)",
      ],
    }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
  />
  <span className="relative h-3 w-3 rounded-full bg-green-500 block" />
</div>`,
    },
  ],
};
