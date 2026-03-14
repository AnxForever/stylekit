import type { Animation } from "./types";

export const counterRoll: Animation = {
  slug: "counter-roll",
  name: "数字滚动",
  nameEn: "Counter Roll",
  description: "数字通过垂直滚动方式从 0 滚动至目标值，适合数据面板和统计展示。",
  descriptionEn: "Digits scroll vertically from 0 to a target value. Ideal for dashboards, stats, and data visualization sections.",
  category: "text",
  tags: ["counter", "number", "scroll", "data", "stats"],
  trigger: "on-scroll",
  difficulty: "intermediate",
  duration: "2s",
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  cssProperties: ["transform"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["counter", "number", "roll", "count up", "statistics", "dashboard"],
  useCases: [
    "Dashboard stat counters",
    "Landing page metrics",
    "Achievement milestones",
    "Pricing page numbers",
  ],
  relatedAnimations: ["typewriter", "text-gradient-flow"],
  recommendedStyles: ["corporate-clean", "minimalist-flat", "dark-mode"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes counter-roll {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(var(--counter-target, -9) * -1em));
  }
}

.counter-roll-container {
  display: inline-flex;
  overflow: hidden;
  height: 1em;
  line-height: 1;
}

.counter-roll-digit {
  will-change: transform;
  animation: counter-roll 2s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--digit-index, 0) * 150ms);
}

/* Each digit column contains 0-9 stacked vertically */
.counter-roll-column {
  display: flex;
  flex-direction: column;
}

.counter-roll-column span {
  height: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Add to your global CSS or Tailwind v4 theme */
@keyframes counter-roll {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(var(--counter-target, -9) * -1em));
  }
}

@utility counter-roll-container {
  display: inline-flex;
  overflow: hidden;
  height: 1em;
  line-height: 1;
}

@utility animate-counter-roll {
  will-change: transform;
  animation: counter-roll 2s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--digit-index, 0) * 150ms);
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Tip: respect user's motion preferences
// import { useReducedMotion } from "framer-motion";
// const reduced = useReducedMotion();
// If reduced, show final number immediately without rolling

function CounterRoll({ target }: { target: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const digits = String(target).split("");

  return (
    <div ref={ref} style={{ display: "inline-flex", overflow: "hidden", height: "1em" }}>
      {digits.map((digit, i) => (
        <div key={i} style={{ overflow: "hidden", height: "1em" }}>
          <motion.div
            initial={{ y: 0 }}
            animate={isInView ? { y: \`\${-Number(digit)}em\` } : {}}
            transition={{
              duration: 2,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.15,
            }}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <span key={n} style={{ height: "1em", display: "flex", alignItems: "center" }}>
                {n}
              </span>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}`,
    },
  ],
};
