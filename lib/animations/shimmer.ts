import type { Animation } from "./types";

export const shimmer: Animation = {
  slug: "shimmer",
  name: "微光扫过",
  nameEn: "Shimmer",
  description: "光线从左到右扫过元素表面，Apple 风格的加载占位符效果。",
  descriptionEn: "A light sweep moves across the element surface from left to right. Apple-style loading placeholder.",
  category: "loading",
  tags: ["shimmer", "shine", "loading", "skeleton", "apple"],
  trigger: "continuous",
  difficulty: "beginner",
  duration: "2s",
  easing: "linear",
  cssProperties: ["background-position"],
  isGPUAccelerated: false,
  previewBg: "light",
  keywords: ["shimmer", "shine", "skeleton", "loading", "placeholder", "apple"],
  useCases: [
    "Content loading placeholder",
    "Image loading state",
    "Card skeleton",
    "List loading",
  ],
  relatedAnimations: ["skeleton-pulse", "spinner-dots"],
  recommendedStyles: ["apple-style", "minimalist-flat", "soft-ui"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes shimmer {
  from {
    background-position: -200% 0;
  }
  to {
    background-position: 200% 0;
  }
}

.shimmer {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 37%,
    #f0f0f0 63%
  );
  background-size: 200% 100%;
  animation: shimmer 2s linear infinite;
  border-radius: 0.375rem;
}

@media (prefers-reduced-motion: reduce) {
  .shimmer {
    animation: none;
    background: #e5e7eb;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Add to your global CSS or Tailwind v4 theme */
@keyframes shimmer {
  from {
    background-position: -200% 0;
  }
  to {
    background-position: 200% 0;
  }
}

@utility animate-shimmer {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 37%,
    #f0f0f0 63%
  );
  background-size: 200% 100%;
  animation: shimmer 2s linear infinite;
}

/* Usage: <div class="animate-shimmer h-4 w-3/4 rounded-md" /> */

@media (prefers-reduced-motion: reduce) {
  .shimmer {
    animation: none;
    background: #e5e7eb;
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
// if (reduced) return <div className="bg-gray-200 rounded-md" />;

<motion.div
  style={{
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)",
    backgroundSize: "200% 100%",
    borderRadius: "0.375rem",
  }}
  animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
  transition={{
    duration: 2,
    ease: "linear",
    repeat: Infinity,
  }}
  className="h-4 w-3/4"
/>`,
    },
  ],
};
