import type { Animation } from "./types";

export const morphShape: Animation = {
  slug: "morph-shape",
  name: "形状变形",
  nameEn: "Morph Shape",
  description: "通过 border-radius 过渡实现有机的 blob 形状连续变形，适合装饰性背景元素。",
  descriptionEn: "Organic blob shape morphing through border-radius transitions. Perfect for decorative background elements and ambient visuals.",
  category: "background",
  tags: ["morph", "blob", "organic", "background", "continuous"],
  trigger: "continuous",
  difficulty: "advanced",
  duration: "8s",
  easing: "ease-in-out",
  cssProperties: ["border-radius"],
  isGPUAccelerated: false,
  previewBg: "light",
  keywords: ["morph", "blob", "shape", "organic", "border-radius", "ambient", "background"],
  useCases: [
    "Hero section decorative background",
    "Ambient blob ornaments",
    "Abstract art backgrounds",
    "Creative landing page accents",
  ],
  relatedAnimations: ["background-gradient-shift", "parallax-float"],
  recommendedStyles: ["soft-ui", "glassmorphism", "modern-gradient"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes morph-shape {
  0%, 100% {
    border-radius: 40% 60% 70% 30% / 40% 30% 60% 70%;
  }
  25% {
    border-radius: 70% 30% 50% 50% / 30% 50% 70% 40%;
  }
  50% {
    border-radius: 60% 40% 30% 70% / 60% 70% 40% 30%;
  }
  75% {
    border-radius: 30% 60% 60% 40% / 50% 40% 50% 60%;
  }
}

.morph-shape {
  width: 300px;
  height: 300px;
  background: var(--morph-gradient, linear-gradient(135deg, hsl(220 70% 60%), hsl(280 70% 60%)));
  animation: morph-shape 8s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .morph-shape {
    animation: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Add to your global CSS or Tailwind v4 theme */
@keyframes morph-shape {
  0%, 100% {
    border-radius: 40% 60% 70% 30% / 40% 30% 60% 70%;
  }
  25% {
    border-radius: 70% 30% 50% 50% / 30% 50% 70% 40%;
  }
  50% {
    border-radius: 60% 40% 30% 70% / 60% 70% 40% 30%;
  }
  75% {
    border-radius: 30% 60% 60% 40% / 50% 40% 50% 60%;
  }
}

@utility animate-morph-shape {
  animation: morph-shape 8s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .morph-shape {
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
// If reduced, use a static border-radius without animation

const blobKeyframes = [
  "40% 60% 70% 30% / 40% 30% 60% 70%",
  "70% 30% 50% 50% / 30% 50% 70% 40%",
  "60% 40% 30% 70% / 60% 70% 40% 30%",
  "30% 60% 60% 40% / 50% 40% 50% 60%",
  "40% 60% 70% 30% / 40% 30% 60% 70%",
];

<motion.div
  animate={{ borderRadius: blobKeyframes }}
  transition={{
    duration: 8,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop",
  }}
  style={{
    width: 300,
    height: 300,
    background: "linear-gradient(135deg, hsl(220 70% 60%), hsl(280 70% 60%))",
  }}
/>`,
    },
  ],
};
