import type { Animation } from "../types";

export const backgroundGradientShift: Animation = {
  slug: "background-gradient-shift",
  name: "背景渐变流动",
  nameEn: "Background Gradient Shift",
  description: "背景渐变颜色持续缓慢流动变化，营造动态氛围感。",
  descriptionEn: "Background gradient colors shift slowly and continuously, creating a dynamic ambient atmosphere.",
  category: "background",
  tags: ["background", "gradient", "ambient", "continuous"],
  trigger: "continuous",
  difficulty: "beginner",
  duration: "8s",
  easing: "linear",
  cssProperties: ["transform"],
  isGPUAccelerated: true,
  previewBg: "dark",
  keywords: ["background", "gradient", "shift", "ambient", "flow", "color change"],
  useCases: [
    "Hero section background",
    "Landing page atmosphere",
    "Login/auth page background",
    "Ambient decorative element",
  ],
  relatedAnimations: ["text-gradient-flow"],
  recommendedStyles: ["modern-gradient", "dark-mode", "glassmorphism"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `.bg-gradient-shift {
  position: relative;
  overflow: hidden;
}

.bg-gradient-shift::before {
  content: "";
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  will-change: transform;
  animation: bg-gradient-shift 8s ease infinite;
}

@keyframes bg-gradient-shift {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-25%, -10%); }
  50% { transform: translate(-10%, -25%); }
  75% { transform: translate(-25%, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .bg-gradient-shift::before {
    animation: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes bg-gradient-shift {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(-25%, -10%); }
  50% { transform: translate(-10%, -25%); }
  75% { transform: translate(-25%, 0); }
}

@utility animate-bg-gradient-shift {
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    will-change: transform;
    animation: bg-gradient-shift 8s ease infinite;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bg-gradient-shift::before {
    animation: none;
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

// Tip: disable for users who prefer reduced motion
// import { useReducedMotion } from "framer-motion";
// const reduced = useReducedMotion();
// if (reduced) return <div className="static-fallback" />;

<motion.div
  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
  style={{
    background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
    backgroundSize: "400% 400%",
  }}
/>`,
    },
  ],
};
