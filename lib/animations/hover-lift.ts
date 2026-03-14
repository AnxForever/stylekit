import type { Animation } from "./types";

export const hoverLift: Animation = {
  slug: "hover-lift",
  name: "悬浮抬升",
  nameEn: "Hover Lift",
  description: "鼠标悬停时元素向上移动并加深阴影，营造悬浮立体感。",
  descriptionEn: "Element lifts upward with enhanced shadow on hover, creating a floating 3D effect.",
  category: "hover",
  tags: ["hover", "lift", "shadow", "interactive"],
  trigger: "on-hover",
  difficulty: "beginner",
  duration: "200ms",
  easing: "cubic-bezier(0.33, 1, 0.68, 1)",
  cssProperties: ["transform", "box-shadow"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["hover", "lift", "float", "shadow", "card hover", "elevation"],
  useCases: [
    "Card hover effect",
    "Button hover state",
    "Clickable list items",
    "Product grid items",
  ],
  relatedAnimations: ["hover-glow"],
  recommendedStyles: ["neo-brutalist", "material-design", "corporate-clean"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `.hover-lift {
  will-change: transform, box-shadow;
  transition: transform 200ms cubic-bezier(0.33, 1, 0.68, 1),
              box-shadow 200ms cubic-bezier(0.33, 1, 0.68, 1);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow:
    0 12px 20px -8px rgba(0, 0, 0, 0.15),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Use Tailwind utility classes directly */
/* <div class="transition-all duration-200 ease-out
              hover:-translate-y-1
              hover:shadow-lg"> */

/* Or define a custom utility in Tailwind v4 */
@utility hover-lift {
  will-change: transform, box-shadow;
  transition: transform 200ms cubic-bezier(0.33, 1, 0.68, 1),
              box-shadow 200ms cubic-bezier(0.33, 1, 0.68, 1);
  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 12px 20px -8px rgba(0, 0, 0, 0.15),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

// Tip: consider disabling for reduced motion users
// import { useReducedMotion } from "framer-motion";

<motion.div
  whileHover={{ y: -4, boxShadow: "0 12px 20px -8px rgba(0,0,0,0.15)" }}
  transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
>
  Hover me
</motion.div>`,
    },
  ],
};
