import type { Animation } from "./types";

export const crossfade: Animation = {
  slug: "crossfade",
  name: "交叉淡化",
  nameEn: "Crossfade",
  description: "两个元素交叉切换：一个淡出的同时另一个淡入，实现平滑的内容过渡。",
  descriptionEn: "Two elements cross-dissolve: one fades out while the other fades in, creating a smooth content transition.",
  category: "transition",
  tags: ["fade", "crossfade", "transition", "swap"],
  trigger: "manual",
  difficulty: "intermediate",
  duration: "500ms",
  easing: "ease-in-out",
  cssProperties: ["opacity"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["crossfade", "dissolve", "swap", "transition", "toggle", "tab switch"],
  useCases: [
    "Tab content switching",
    "Image carousel transition",
    "Content toggle animation",
    "Step wizard transition",
  ],
  relatedAnimations: ["slide-swap", "blur-in", "morph-transition"],
  recommendedStyles: ["minimalist-flat", "glassmorphism", "soft-ui"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes crossfade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes crossfade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

.crossfade-container {
  position: relative;
}

.crossfade-enter {
  --sk-duration: 500ms;
  --sk-ease: ease-in-out;
  animation: crossfade-in var(--sk-duration) var(--sk-ease) both;
}

.crossfade-exit {
  --sk-duration: 500ms;
  --sk-ease: ease-in-out;
  position: absolute;
  inset: 0;
  animation: crossfade-out var(--sk-duration) var(--sk-ease) both;
}

@media (prefers-reduced-motion: reduce) {
  .crossfade-enter,
  .crossfade-exit {
    animation: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes crossfade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes crossfade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@utility animate-crossfade-in {
  --sk-duration: 500ms;
  --sk-ease: ease-in-out;
  animation: crossfade-in var(--sk-duration) var(--sk-ease) both;
}

@utility animate-crossfade-out {
  --sk-duration: 500ms;
  --sk-ease: ease-in-out;
  position: absolute;
  inset: 0;
  animation: crossfade-out var(--sk-duration) var(--sk-ease) both;
}

@media (prefers-reduced-motion: reduce) {
  .crossfade-enter,
  .crossfade-exit {
    animation: none;
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion, AnimatePresence } from "framer-motion";

<AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    {content}
  </motion.div>
</AnimatePresence>`,
    },
  ],
};
