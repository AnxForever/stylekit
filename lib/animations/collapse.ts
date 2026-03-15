import type { Animation } from "./types";

export const collapse: Animation = {
  slug: "collapse",
  name: "折叠收起",
  nameEn: "Collapse",
  description: "元素高度从完整状态收缩至零并淡出，适合手风琴、FAQ 折叠面板等场景。",
  descriptionEn: "Element height shrinks to zero while fading out. Ideal for accordions, FAQ panels, and collapsible sections.",
  category: "exit",
  tags: ["collapse", "height", "exit", "accordion"],
  trigger: "on-click",
  difficulty: "intermediate",
  duration: "350ms",
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  cssProperties: ["max-height", "opacity", "padding"],
  isGPUAccelerated: false,
  previewBg: "light",
  keywords: ["collapse", "accordion", "fold", "shrink height", "toggle", "expand"],
  useCases: [
    "Accordion panel collapse",
    "FAQ section toggle",
    "Expandable card content",
    "Sidebar section folding",
  ],
  relatedAnimations: ["fade-out-down", "scale-out"],
  recommendedStyles: ["minimalist-flat", "corporate-clean"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes collapse {
  from {
    max-height: var(--sk-content-height, 200px);
    opacity: 1;
    padding-top: var(--sk-padding, 16px);
    padding-bottom: var(--sk-padding, 16px);
  }
  to {
    max-height: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
}

.collapse {
  --sk-duration: 350ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  animation: collapse var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .collapse {
    animation: none;
    max-height: 0;
    opacity: 0;
    padding: 0;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes collapse {
  from {
    max-height: var(--sk-content-height, 200px);
    opacity: 1;
    padding-top: var(--sk-padding, 16px);
    padding-bottom: var(--sk-padding, 16px);
  }
  to {
    max-height: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
}

@utility animate-collapse {
  --sk-duration: 350ms;
  --sk-delay: 0ms;
  --sk-ease: cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  animation: collapse var(--sk-duration) var(--sk-ease) var(--sk-delay) both;
}

@media (prefers-reduced-motion: reduce) {
  .collapse {
    animation: none;
    max-height: 0;
    opacity: 0;
    padding: 0;
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion, AnimatePresence } from "framer-motion";

<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      style={{ overflow: "hidden" }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>`,
    },
  ],
};
