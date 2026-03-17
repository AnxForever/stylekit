import type { Animation } from "../types";

export const staggerChildren: Animation = {
  slug: "stagger-children",
  name: "子元素错开动画",
  nameEn: "Stagger Children",
  description: "子元素依次错开执行入场动画，通过延迟差营造流畅的序列感。",
  descriptionEn: "Child elements animate in sequence with staggered delays, creating a smooth cascading effect.",
  category: "micro-interaction",
  tags: ["stagger", "sequence", "children", "cascade", "list"],
  trigger: "on-mount",
  difficulty: "intermediate",
  duration: "500ms",
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  cssProperties: ["opacity", "transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["stagger", "cascade", "sequence", "children", "list animation", "delay"],
  useCases: [
    "List item entrance",
    "Grid card reveal",
    "Navigation menu items",
    "Dashboard widget loading",
  ],
  relatedAnimations: ["fade-in-up", "scroll-reveal"],
  recommendedStyles: ["bento-grid", "masonry-flow", "card-stack"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes stagger-fade-in {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stagger-children > * {
  will-change: transform, opacity;
  opacity: 0;
  animation: stagger-fade-in 500ms cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--stagger-index, 0) * var(--stagger-delay, 75ms));
}

/* Usage: set --stagger-index on each child via inline style
   <div class="stagger-children">
     <div style="--stagger-index: 0">...</div>
     <div style="--stagger-index: 1">...</div>
     <div style="--stagger-index: 2">...</div>
   </div>
   Override delay: style="--stagger-delay: 100ms" on parent */

@media (prefers-reduced-motion: reduce) {
  .stagger-children {
    animation: none;
    opacity: 1;
    transform: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "tsx",
      code: `// React + Tailwind approach with inline delay
function StaggerList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={item}
          className="animate-fade-in-up opacity-0"
          style={{ animationDelay: \`\${i * 75}ms\`, animationFillMode: "both" }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/* Requires this in your CSS: */
// @keyframes fade-in-up {
//   from { opacity: 0; transform: translateY(15px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// @utility animate-fade-in-up {
//   animation: fade-in-up 500ms cubic-bezier(0.16, 1, 0.3, 1);
// }`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

// Tip: respect user's motion preferences
// import { useReducedMotion } from "framer-motion";
// const reduced = useReducedMotion();
// Use reduced ? { opacity: 0 } : { opacity: 0, y: 15 } for initial

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.075 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map((text) => (
    <motion.li key={text} variants={item}>
      {text}
    </motion.li>
  ))}
</motion.ul>`,
    },
  ],
};
