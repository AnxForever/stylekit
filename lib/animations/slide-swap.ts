import type { Animation } from "./types";

export const slideSwap: Animation = {
  slug: "slide-swap",
  name: "滑动切换",
  nameEn: "Slide Swap",
  description: "新旧内容以水平滑动方式交替切换，旧内容滑出左侧的同时新内容从右侧滑入。",
  descriptionEn: "Content swaps with a horizontal slide: old slides out left while new slides in from the right.",
  category: "transition",
  tags: ["slide", "swap", "transition", "horizontal"],
  trigger: "manual",
  difficulty: "intermediate",
  duration: "400ms",
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  cssProperties: ["opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["slide swap", "horizontal transition", "tab slide", "page transition", "carousel"],
  useCases: [
    "Step wizard navigation",
    "Carousel slide transition",
    "Tab panel switching",
    "Onboarding flow steps",
  ],
  relatedAnimations: ["crossfade", "slide-in-left", "slide-in-right"],
  recommendedStyles: ["minimalist-flat", "corporate-clean"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes slide-in-from-right {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-out-to-left {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-30px);
  }
}

.slide-swap-enter {
  --sk-duration: 400ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  animation: slide-in-from-right var(--sk-duration) var(--sk-ease) both;
}

.slide-swap-exit {
  --sk-duration: 400ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  position: absolute;
  inset: 0;
  animation: slide-out-to-left var(--sk-duration) var(--sk-ease) both;
}

@media (prefers-reduced-motion: reduce) {
  .slide-swap-enter,
  .slide-swap-exit {
    animation: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes slide-in-from-right {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slide-out-to-left {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-30px); }
}

@utility animate-slide-swap-in {
  --sk-duration: 400ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  animation: slide-in-from-right var(--sk-duration) var(--sk-ease) both;
}

@utility animate-slide-swap-out {
  --sk-duration: 400ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  animation: slide-out-to-left var(--sk-duration) var(--sk-ease) both;
}

@media (prefers-reduced-motion: reduce) {
  .slide-swap-enter,
  .slide-swap-exit {
    animation: none;
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion, AnimatePresence } from "framer-motion";

const variants = {
  enter: { x: 30, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -30, opacity: 0 },
};

<AnimatePresence mode="wait">
  <motion.div
    key={step}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
  >
    {content}
  </motion.div>
</AnimatePresence>`,
    },
  ],
};
