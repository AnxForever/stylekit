import type { Animation } from "../types";

export const spinnerDots: Animation = {
  slug: "spinner-dots",
  name: "三点弹跳加载",
  nameEn: "Spinner Dots",
  description: "三个圆点依次弹跳的加载指示器，轻量且易于实现。",
  descriptionEn: "Three dots bouncing in sequence as a loading indicator. Lightweight and easy to implement.",
  category: "loading",
  tags: ["loading", "spinner", "dots", "bounce"],
  trigger: "continuous",
  difficulty: "beginner",
  duration: "1.4s",
  easing: "ease-in-out",
  cssProperties: ["transform", "opacity"],
  isGPUAccelerated: true,
  previewBg: "light",
  keywords: ["spinner", "dots", "loading", "bounce", "indicator", "three dots"],
  useCases: [
    "Button loading state",
    "Chat message typing indicator",
    "Content loading placeholder",
    "Form submission feedback",
  ],
  relatedAnimations: ["skeleton-pulse"],
  recommendedStyles: ["minimalist-flat", "soft-ui", "fluent-design"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes spinner-dot-bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.spinner-dots {
  will-change: transform, opacity;
  display: inline-flex;
  gap: 4px;
}

.spinner-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
  animation: spinner-dot-bounce 1.4s ease-in-out infinite both;
}

.spinner-dots span:nth-child(1) { animation-delay: -0.32s; }
.spinner-dots span:nth-child(2) { animation-delay: -0.16s; }
.spinner-dots span:nth-child(3) { animation-delay: 0s; }

@media (prefers-reduced-motion: reduce) {
  .spinner-dots {
    animation: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes spinner-dot-bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@utility animate-spinner-dot {
  will-change: transform, opacity;
  animation: spinner-dot-bounce 1.4s ease-in-out infinite both;
}

/* Usage:
<div class="inline-flex gap-1">
  <span class="w-2 h-2 rounded-full bg-current animate-spinner-dot [animation-delay:-0.32s]" />
  <span class="w-2 h-2 rounded-full bg-current animate-spinner-dot [animation-delay:-0.16s]" />
  <span class="w-2 h-2 rounded-full bg-current animate-spinner-dot" />
</div>
*/

@media (prefers-reduced-motion: reduce) {
  .spinner-dots {
    animation: none;
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

// Tip: disable for users who prefer reduced motion
// import { useReducedMotion } from "framer-motion";
// const reduced = useReducedMotion();
// if (reduced) return <div className="static-fallback" />;

const dots = [0, 1, 2];

<div style={{ display: "flex", gap: 4 }}>
  {dots.map((i) => (
    <motion.span
      key={i}
      animate={{ scale: [0, 1, 0], opacity: [0.5, 1, 0.5] }}
      transition={{
        duration: 1.4,
        repeat: Infinity,
        delay: i * 0.16,
        ease: "easeInOut",
      }}
      style={{ width: 8, height: 8, borderRadius: "50%", background: "currentColor" }}
    />
  ))}
</div>`,
    },
  ],
};
