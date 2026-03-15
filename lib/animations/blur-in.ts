import type { Animation } from "./types";

export const blurIn: Animation = {
  slug: "blur-in",
  name: "模糊到清晰",
  nameEn: "Blur In",
  description: "元素从模糊状态逐渐变清晰并淡入，营造柔和的过渡入场效果。",
  descriptionEn: "Element transitions from blurred to sharp while fading in, creating a soft focus entrance effect.",
  category: "transition",
  tags: ["blur", "focus", "entrance", "transition"],
  trigger: "on-mount",
  difficulty: "beginner",
  duration: "500ms",
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  cssProperties: ["opacity", "filter"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["blur", "focus", "sharp", "entrance", "transition", "soft"],
  useCases: [
    "Image reveal",
    "Page transition effect",
    "Modal content entrance",
    "Background image loading",
  ],
  relatedAnimations: ["fade-in-up", "scale-in"],
  recommendedStyles: ["glassmorphism", "soft-ui", "apple-style"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes blur-in {
  from {
    opacity: 0;
    filter: blur(10px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
  }
}

.blur-in {
  --sk-duration: 500ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: filter, opacity;
  animation: blur-in var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .blur-in {
    animation: none;
    opacity: 1;
    transform: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes blur-in {
  from {
    opacity: 0;
    filter: blur(10px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
  }
}

@utility animate-blur-in {
  --sk-duration: 500ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: filter, opacity;
  animation: blur-in var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .blur-in {
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
// Use reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(10px)" } for initial

<motion.div
  initial={{ opacity: 0, filter: "blur(10px)" }}
  animate={{ opacity: 1, filter: "blur(0px)" }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
>
  Content
</motion.div>`,
    },
  ],
};
