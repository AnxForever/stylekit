import type { Animation } from "./types";

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
  opacity: 0;
  animation: stagger-fade-in 500ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.stagger-children > *:nth-child(1) { animation-delay: 0ms; }
.stagger-children > *:nth-child(2) { animation-delay: 75ms; }
.stagger-children > *:nth-child(3) { animation-delay: 150ms; }
.stagger-children > *:nth-child(4) { animation-delay: 225ms; }
.stagger-children > *:nth-child(5) { animation-delay: 300ms; }
.stagger-children > *:nth-child(6) { animation-delay: 375ms; }

/* Or use CSS custom property for dynamic stagger:
.stagger-children > * {
  animation-delay: calc(var(--index, 0) * 75ms);
} */`,
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
