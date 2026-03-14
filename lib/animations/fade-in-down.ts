import type { Animation } from "./types";

export const fadeInDown: Animation = {
  slug: "fade-in-down",
  name: "淡入下滑",
  nameEn: "Fade In Down",
  description: "元素从上方淡入并向下滑动，常用于导航栏、下拉菜单入场。",
  descriptionEn: "Element fades in while sliding downward. Commonly used for navbars and dropdown menus.",
  category: "entrance",
  tags: ["fade", "slide", "entrance", "dropdown"],
  trigger: "on-mount",
  difficulty: "beginner",
  duration: "600ms",
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  cssProperties: ["opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["fade in", "slide down", "entrance", "dropdown", "navbar"],
  useCases: [
    "Dropdown menu appearance",
    "Notification banner slide-in",
    "Top navigation reveal",
    "Toast notification from top",
  ],
  relatedAnimations: ["fade-in-up", "scale-in"],
  recommendedStyles: ["glassmorphism", "corporate-clean", "notion-style"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-down {
  animation: fade-in-down 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@utility animate-fade-in-down {
  animation: fade-in-down 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
  Content
</motion.div>`,
    },
  ],
};
