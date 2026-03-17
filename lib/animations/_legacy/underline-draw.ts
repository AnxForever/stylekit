import type { Animation } from "../types";

export const underlineDraw: Animation = {
  slug: "underline-draw",
  name: "下划线绘制",
  nameEn: "Underline Draw",
  description: "鼠标悬停时下划线从左到右绘制展开，离开时反向收回，经典的导航链接交互效果。",
  descriptionEn: "Underline draws from left to right on hover and retracts on leave. A classic navigation link interaction.",
  category: "hover",
  tags: ["hover", "underline", "draw", "link", "navigation"],
  trigger: "on-hover",
  difficulty: "beginner",
  duration: "300ms",
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  cssProperties: ["transform", "transform-origin"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["underline", "draw", "hover link", "navigation", "text decoration", "line animation"],
  useCases: [
    "Navigation link hover",
    "Footer link interaction",
    "Text link emphasis",
    "Menu item hover state",
  ],
  relatedAnimations: ["hover-glow", "hover-lift"],
  recommendedStyles: ["minimalist-flat", "editorial", "corporate-clean"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `.underline-draw {
  position: relative;
  display: inline-block;
}

.underline-draw::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.underline-draw:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

@media (prefers-reduced-motion: reduce) {
  .underline-draw::after {
    transition: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@utility underline-draw {
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  .underline-draw::after {
    transition: none;
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

function UnderlineLink({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <motion.span
        className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-current"
        initial={{ scaleX: 0, originX: 1 }}
        whileHover={{ scaleX: 1, originX: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
    </span>
  );
}`,
    },
  ],
};
