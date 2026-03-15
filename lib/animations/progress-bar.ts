import type { Animation } from "./types";

export const progressBar: Animation = {
  slug: "progress-bar",
  name: "进度条加载",
  nameEn: "Progress Bar",
  description: "进度条从左到右填充并带有光泽扫过效果，适合加载状态和进度指示场景。",
  descriptionEn: "Progress bar fills from left to right with a shimmer sweep effect. Ideal for loading states and progress indicators.",
  category: "loading",
  tags: ["loading", "progress", "bar", "shimmer"],
  trigger: "continuous",
  difficulty: "beginner",
  duration: "2s",
  easing: "ease-in-out",
  cssProperties: ["width", "background-position"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["progress bar", "loading bar", "shimmer", "fill", "indicator", "status"],
  useCases: [
    "File upload progress",
    "Page loading indicator",
    "Step completion progress",
    "Data processing feedback",
  ],
  relatedAnimations: ["skeleton-pulse", "spinner-dots"],
  recommendedStyles: ["minimalist-flat", "corporate-clean", "soft-ui"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes progress-fill {
  from { width: 0%; }
  to { width: 100%; }
}

@keyframes progress-shimmer {
  from { background-position: -200% 0; }
  to { background-position: 200% 0; }
}

.progress-bar {
  height: 4px;
  border-radius: 9999px;
  background: #e5e7eb;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 9999px;
  background: linear-gradient(
    90deg,
    #6366f1 0%,
    #818cf8 50%,
    #6366f1 100%
  );
  background-size: 200% 100%;
  animation:
    progress-fill 2s ease-in-out both,
    progress-shimmer 1.5s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .progress-bar-fill {
    animation: none;
    width: 100%;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes progress-fill {
  from { width: 0%; }
  to { width: 100%; }
}

@keyframes progress-shimmer {
  from { background-position: -200% 0; }
  to { background-position: 200% 0; }
}

@utility animate-progress-fill {
  animation:
    progress-fill 2s ease-in-out both,
    progress-shimmer 1.5s linear infinite;
  background: linear-gradient(90deg, #6366f1, #818cf8, #6366f1);
  background-size: 200% 100%;
}

@media (prefers-reduced-motion: reduce) {
  .animate-progress-fill {
    animation: none;
    width: 100%;
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

<div className="h-1 w-full rounded-full bg-gray-200">
  <motion.div
    className="h-full rounded-full bg-indigo-500"
    initial={{ width: "0%" }}
    animate={{ width: "100%" }}
    transition={{ duration: 2, ease: "easeInOut" }}
  />
</div>`,
    },
  ],
};
