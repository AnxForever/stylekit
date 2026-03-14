import type { Animation } from "./types";

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
  cssProperties: ["background-position"],
  isGPUAccelerated: false,
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
      code: `@keyframes bg-gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-shift {
  background: linear-gradient(
    -45deg,
    #ee7752, #e73c7e, #23a6d5, #23d5ab
  );
  background-size: 400% 400%;
  animation: bg-gradient-shift 8s ease infinite;
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes bg-gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@utility animate-bg-gradient-shift {
  background: linear-gradient(
    -45deg,
    #ee7752, #e73c7e, #23a6d5, #23d5ab
  );
  background-size: 400% 400%;
  animation: bg-gradient-shift 8s ease infinite;
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
