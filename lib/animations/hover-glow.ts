import type { Animation } from "./types";

export const hoverGlow: Animation = {
  slug: "hover-glow",
  name: "悬浮发光",
  nameEn: "Hover Glow",
  description: "鼠标悬停时元素边框发出柔和光晕，适合 CTA 按钮和交互卡片。",
  descriptionEn: "Element gains a soft glowing border on hover. Perfect for CTA buttons and interactive cards.",
  category: "hover",
  tags: ["hover", "glow", "border", "interactive"],
  trigger: "on-hover",
  difficulty: "beginner",
  duration: "300ms",
  easing: "ease-out",
  cssProperties: ["box-shadow", "opacity"],
  isGPUAccelerated: true,
  previewBg: "dark",
  keywords: ["hover", "glow", "border glow", "neon", "CTA", "button hover"],
  useCases: [
    "CTA button hover",
    "Interactive card highlight",
    "Navigation link emphasis",
    "Feature highlight on hover",
  ],
  relatedAnimations: ["hover-lift"],
  recommendedStyles: ["cyberpunk-neon", "synthwave", "dark-mode"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `.hover-glow {
  position: relative;
}

.hover-glow::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.4), 0 0 30px rgba(99, 102, 241, 0.2);
  opacity: 0;
  transition: opacity 300ms ease-out;
  pointer-events: none;
  z-index: -1;
}

.hover-glow:hover::before {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .hover-glow {
    animation: none;
    transition: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* GPU-optimized: animates opacity on pseudo-element instead of box-shadow */
@utility hover-glow {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.4), 0 0 30px rgba(99, 102, 241, 0.2);
    opacity: 0;
    transition: opacity 300ms ease-out;
    pointer-events: none;
    z-index: -1;
  }

  &:hover::before {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hover-glow {
    animation: none;
    transition: none;
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

// Tip: consider disabling for reduced motion users
// import { useReducedMotion } from "framer-motion";

<motion.button
  whileHover={{
    boxShadow: "0 0 15px rgba(99,102,241,0.4), 0 0 30px rgba(99,102,241,0.2), 0 0 45px rgba(99,102,241,0.1)",
  }}
  transition={{ duration: 0.3 }}
>
  Click me
</motion.button>`,
    },
  ],
};
