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
  cssProperties: ["box-shadow"],
  isGPUAccelerated: false,
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
  transition: box-shadow 300ms ease-out;
}

.hover-glow:hover {
  box-shadow:
    0 0 15px rgba(99, 102, 241, 0.4),
    0 0 30px rgba(99, 102, 241, 0.2),
    0 0 45px rgba(99, 102, 241, 0.1);
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Use with Tailwind utilities */
/* <button class="transition-shadow duration-300
                  hover:shadow-[0_0_15px_rgba(99,102,241,0.4),0_0_30px_rgba(99,102,241,0.2)]">
     Click me
   </button> */

/* Or define a custom utility in Tailwind v4 */
@utility hover-glow {
  transition: box-shadow 300ms ease-out;
  &:hover {
    box-shadow:
      0 0 15px rgba(99, 102, 241, 0.4),
      0 0 30px rgba(99, 102, 241, 0.2),
      0 0 45px rgba(99, 102, 241, 0.1);
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
