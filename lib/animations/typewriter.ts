import type { Animation } from "./types";

export const typewriter: Animation = {
  slug: "typewriter",
  name: "打字机效果",
  nameEn: "Typewriter",
  description: "文字逐字显现并带有闪烁光标，模拟打字机输入效果。",
  descriptionEn: "Text appears character by character with a blinking cursor, simulating typewriter input.",
  category: "text",
  tags: ["text", "typewriter", "cursor", "sequential"],
  trigger: "on-mount",
  difficulty: "intermediate",
  duration: "3s",
  easing: "steps(var(--chars), end)",
  cssProperties: ["width", "border-right-color"],
  isGPUAccelerated: false,
  previewBg: "dark",
  keywords: ["typewriter", "typing", "text reveal", "cursor blink", "sequential text"],
  useCases: [
    "Hero headline animation",
    "Terminal/code simulation",
    "AI chat typing indicator",
    "Portfolio intro text",
  ],
  relatedAnimations: ["text-gradient-flow"],
  recommendedStyles: ["synthwave", "dark-mode", "editorial"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  from, to { border-right-color: transparent; }
  50% { border-right-color: currentColor; }
}

.typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid currentColor;
  animation:
    typewriter 3s steps(var(--typewriter-chars, 20), end) both,
    blink-caret 0.75s step-end infinite;
}

/* Usage: set --typewriter-chars to match text length
   <span class="typewriter" style="--typewriter-chars: 13">Hello, World!</span> */

@media (prefers-reduced-motion: reduce) {
  .typewriter {
    animation: none;
    overflow: visible;
    width: auto;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  from, to { border-right-color: transparent; }
  50% { border-right-color: currentColor; }
}

@utility animate-typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid currentColor;
  animation:
    typewriter 3s steps(var(--typewriter-chars, 20), end) both,
    blink-caret 0.75s step-end infinite;
}

@media (prefers-reduced-motion: reduce) {
  .typewriter {
    animation: none;
    overflow: visible;
    width: auto;
  }
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

// Tip: show full text immediately for reduced motion
// import { useReducedMotion } from "framer-motion";
// const reduced = useReducedMotion();
// if (reduced) return <span>{text}</span>;

const text = "Hello, World!";

<motion.span>
  {text.split("").map((char, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: i * 0.05, duration: 0 }}
    >
      {char}
    </motion.span>
  ))}
</motion.span>`,
    },
  ],
};
