import type { Animation } from "./types";

export const skeletonPulse: Animation = {
  slug: "skeleton-pulse",
  name: "骨架屏脉冲",
  nameEn: "Skeleton Pulse",
  description: "骨架屏加载占位符的脉冲闪烁效果，提示用户内容正在加载中。",
  descriptionEn: "Skeleton loading placeholder with a pulsing shimmer effect, indicating content is loading.",
  category: "loading",
  tags: ["loading", "skeleton", "pulse", "placeholder"],
  trigger: "continuous",
  difficulty: "beginner",
  duration: "2s",
  easing: "cubic-bezier(0.4, 0, 0.6, 1)",
  cssProperties: ["opacity"],
  isGPUAccelerated: false,
  previewBg: "light",
  keywords: ["skeleton", "loading", "pulse", "shimmer", "placeholder", "content loading"],
  useCases: [
    "Data loading states",
    "Image placeholders",
    "Table row loading",
    "Profile card loading",
  ],
  relatedAnimations: ["spinner-dots"],
  recommendedStyles: ["corporate-clean", "material-design", "notion-style"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.skeleton-pulse {
  background-color: #e5e7eb;
  border-radius: 0.375rem;
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Tailwind has a built-in animate-pulse utility */
/* <div class="animate-pulse bg-gray-200 rounded-md h-4 w-3/4"></div> */

/* Custom variant with different timing */
@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@utility animate-skeleton-pulse {
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
  animate={{ opacity: [1, 0.4, 1] }}
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  className="h-4 w-3/4 rounded bg-gray-200"
/>`,
    },
  ],
};
