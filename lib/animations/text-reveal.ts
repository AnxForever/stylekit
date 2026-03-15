import type { Animation } from "./types";

export const textReveal: Animation = {
  slug: "text-reveal",
  name: "文字揭示",
  nameEn: "Text Reveal",
  description: "文字通过遮罩从下方逐行揭示显现，常用于英雄区标题和关键文案的戏剧性入场。",
  descriptionEn: "Text reveals line by line from behind a mask, creating a dramatic entrance for hero titles and key copy.",
  category: "text",
  tags: ["text", "reveal", "mask", "clip", "scroll"],
  trigger: "on-scroll",
  difficulty: "intermediate",
  duration: "800ms",
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  cssProperties: ["clip-path", "transform", "opacity"],
  isGPUAccelerated: true,
  previewBg: "dark",
  keywords: ["text reveal", "mask", "clip path", "hero text", "headline animation", "scroll text"],
  useCases: [
    "Hero section headline entrance",
    "Landing page key messaging",
    "Section title scroll reveal",
    "Award-winning editorial layouts",
  ],
  relatedAnimations: ["typewriter", "text-gradient-flow", "scroll-reveal"],
  recommendedStyles: ["editorial", "minimalist-flat", "dark-mode"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes text-reveal {
  from {
    clip-path: inset(100% 0 0 0);
    transform: translateY(12px);
    opacity: 0;
  }
  to {
    clip-path: inset(0 0 0 0);
    transform: translateY(0);
    opacity: 1;
  }
}

.text-reveal {
  --sk-duration: 800ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  animation: text-reveal var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

/* Stagger each line */
.text-reveal:nth-child(2) { --sk-delay: 120ms; }
.text-reveal:nth-child(3) { --sk-delay: 240ms; }

@media (prefers-reduced-motion: reduce) {
  .text-reveal {
    animation: none;
    clip-path: none;
    opacity: 1;
    transform: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes text-reveal {
  from {
    clip-path: inset(100% 0 0 0);
    transform: translateY(12px);
    opacity: 0;
  }
  to {
    clip-path: inset(0 0 0 0);
    transform: translateY(0);
    opacity: 1;
  }
}

@utility animate-text-reveal {
  --sk-duration: 800ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  animation: text-reveal var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .text-reveal {
    animation: none;
    clip-path: none;
    opacity: 1;
    transform: none;
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

const lineVariants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    y: 12,
    opacity: 0,
  },
  visible: (i: number) => ({
    clipPath: "inset(0 0 0 0)",
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

{lines.map((line, i) => (
  <motion.span
    key={i}
    custom={i}
    variants={lineVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="block"
  >
    {line}
  </motion.span>
))}`,
    },
  ],
};
