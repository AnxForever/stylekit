import type { Animation } from "../types";

export const borderTrace: Animation = {
  slug: "border-trace",
  name: "边框描边",
  nameEn: "Border Trace",
  description: "边框像被画笔描绘一样逐渐显现，从一角开始沿四边绘制完成。",
  descriptionEn: "Border draws itself progressively like a pen tracing the outline from one corner.",
  category: "hover",
  tags: ["border", "draw", "trace", "outline", "svg"],
  trigger: "on-hover",
  difficulty: "advanced",
  duration: "600ms",
  easing: "ease-in-out",
  cssProperties: ["stroke-dashoffset"],
  isGPUAccelerated: false,
  previewBg: "light",
  keywords: ["border", "draw", "trace", "outline", "stroke", "pen"],
  useCases: [
    "Button hover effect",
    "Card focus state",
    "Navigation link highlight",
    "Feature box reveal",
  ],
  relatedAnimations: ["hover-glow", "flip-card"],
  recommendedStyles: ["minimalist-flat", "line-art", "neo-brutalist"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `/* Approach 1: Gradient border with background-size animation */
@keyframes border-trace {
  0% {
    background-size: 0 2px, 2px 0, 0 2px, 2px 0;
  }
  25% {
    background-size: 100% 2px, 2px 0, 0 2px, 2px 0;
  }
  50% {
    background-size: 100% 2px, 2px 100%, 0 2px, 2px 0;
  }
  75% {
    background-size: 100% 2px, 2px 100%, 100% 2px, 2px 0;
  }
  100% {
    background-size: 100% 2px, 2px 100%, 100% 2px, 2px 100%;
  }
}

.border-trace {
  position: relative;
  background:
    linear-gradient(currentColor, currentColor) top left / 0 2px no-repeat,
    linear-gradient(currentColor, currentColor) top right / 2px 0 no-repeat,
    linear-gradient(currentColor, currentColor) bottom right / 0 2px no-repeat,
    linear-gradient(currentColor, currentColor) bottom left / 2px 0 no-repeat;
  transition: background-size 600ms ease-in-out;
}

.border-trace:hover {
  background-size: 100% 2px, 2px 100%, 100% 2px, 2px 100%;
}

@media (prefers-reduced-motion: reduce) {
  .border-trace {
    transition: none;
    border: 2px solid currentColor;
  }
  .border-trace:hover {
    background: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Add to your global CSS or Tailwind v4 theme */

/* Approach 2: SVG stroke-dashoffset for precise control */
@utility animate-border-trace {
  & svg rect {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    transition: stroke-dashoffset 600ms ease-in-out;
  }
}

/* Usage with SVG overlay:
  <div class="relative animate-border-trace group">
    <svg class="absolute inset-0 w-full h-full pointer-events-none">
      <rect
        x="1" y="1" rx="8"
        width="calc(100% - 2px)" height="calc(100% - 2px)"
        fill="none" stroke="currentColor" stroke-width="2"
        class="group-hover:[stroke-dashoffset:0]"
      />
    </svg>
    Content
  </div>
*/

@media (prefers-reduced-motion: reduce) {
  .border-trace svg rect {
    transition: none;
    stroke-dashoffset: 0;
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

// Tip: respect user's motion preferences
// import { useReducedMotion } from "framer-motion";
// const reduced = useReducedMotion();
// if (reduced) return <div style={{ border: "2px solid" }}>{children}</div>;

function BorderTrace({ children }: { children: React.ReactNode }) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  };

  return (
    <div style={{ position: "relative", padding: "1rem" }}>
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <motion.rect
          x="1" y="1" rx="8"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          variants={pathVariants}
          initial="hidden"
          whileHover="visible"
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </svg>
      {children}
    </div>
  );
}`,
    },
  ],
};
