import type { Animation } from "./types";

export const glitchText: Animation = {
  slug: "glitch-text",
  name: "故障文字",
  nameEn: "Glitch Text",
  description: "文字以数字故障风格闪烁和偏移，带有赛博朋克美学的视觉冲击力。",
  descriptionEn: "Text flickers and shifts with a digital glitch aesthetic, creating a cyberpunk visual impact.",
  category: "text",
  tags: ["glitch", "distortion", "cyberpunk", "effect", "text"],
  trigger: "continuous",
  difficulty: "advanced",
  duration: "3s",
  easing: "steps(2, end)",
  cssProperties: ["transform", "clip-path"],
  isGPUAccelerated: true,
  previewBg: "dark",
  keywords: ["glitch", "distortion", "cyberpunk", "retro", "vhs", "noise"],
  useCases: [
    "Hero title effect",
    "Error/404 page",
    "Gaming UI",
    "Tech/hacker aesthetic",
  ],
  relatedAnimations: ["typewriter", "text-gradient-flow"],
  recommendedStyles: ["cyberpunk", "dark-mode", "retro-pixel"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `/* 3-layer glitch: original text + 2 pseudo-element copies */
@keyframes glitch-1 {
  0% {
    clip-path: inset(40% 0 61% 0);
    transform: translate(-2px, 2px);
  }
  20% {
    clip-path: inset(92% 0 1% 0);
    transform: translate(1px, -1px);
  }
  40% {
    clip-path: inset(43% 0 1% 0);
    transform: translate(-1px, 3px);
  }
  60% {
    clip-path: inset(25% 0 58% 0);
    transform: translate(3px, 1px);
  }
  80% {
    clip-path: inset(54% 0 7% 0);
    transform: translate(-3px, -2px);
  }
  100% {
    clip-path: inset(58% 0 43% 0);
    transform: translate(2px, -3px);
  }
}

@keyframes glitch-2 {
  0% {
    clip-path: inset(65% 0 13% 0);
    transform: translate(3px, -1px);
  }
  20% {
    clip-path: inset(15% 0 72% 0);
    transform: translate(-2px, 3px);
  }
  40% {
    clip-path: inset(80% 0 5% 0);
    transform: translate(1px, -2px);
  }
  60% {
    clip-path: inset(10% 0 65% 0);
    transform: translate(-3px, 1px);
  }
  80% {
    clip-path: inset(35% 0 30% 0);
    transform: translate(2px, 2px);
  }
  100% {
    clip-path: inset(2% 0 90% 0);
    transform: translate(-1px, -1px);
  }
}

.glitch-text {
  position: relative;
  will-change: transform;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform, clip-path;
}

.glitch-text::before {
  color: #ff00ff;
  animation: glitch-1 3s steps(2, end) infinite;
}

.glitch-text::after {
  color: #00ffff;
  animation: glitch-2 3s steps(2, end) infinite reverse;
}

/* Usage: <h1 class="glitch-text" data-text="GLITCH">GLITCH</h1> */

@media (prefers-reduced-motion: reduce) {
  .glitch-text::before,
  .glitch-text::after {
    animation: none;
    display: none;
  }
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `/* Add to your global CSS or Tailwind v4 theme */
@keyframes glitch-1 {
  0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 2px); }
  20% { clip-path: inset(92% 0 1% 0); transform: translate(1px, -1px); }
  40% { clip-path: inset(43% 0 1% 0); transform: translate(-1px, 3px); }
  60% { clip-path: inset(25% 0 58% 0); transform: translate(3px, 1px); }
  80% { clip-path: inset(54% 0 7% 0); transform: translate(-3px, -2px); }
  100% { clip-path: inset(58% 0 43% 0); transform: translate(2px, -3px); }
}

@keyframes glitch-2 {
  0% { clip-path: inset(65% 0 13% 0); transform: translate(3px, -1px); }
  20% { clip-path: inset(15% 0 72% 0); transform: translate(-2px, 3px); }
  40% { clip-path: inset(80% 0 5% 0); transform: translate(1px, -2px); }
  60% { clip-path: inset(10% 0 65% 0); transform: translate(-3px, 1px); }
  80% { clip-path: inset(35% 0 30% 0); transform: translate(2px, 2px); }
  100% { clip-path: inset(2% 0 90% 0); transform: translate(-1px, -1px); }
}

@utility animate-glitch-text {
  position: relative;
  will-change: transform;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    will-change: transform, clip-path;
  }

  &::before {
    color: #ff00ff;
    animation: glitch-1 3s steps(2, end) infinite;
  }

  &::after {
    color: #00ffff;
    animation: glitch-2 3s steps(2, end) infinite reverse;
  }
}

/* Usage: <h1 class="animate-glitch-text" data-text="GLITCH">GLITCH</h1> */

@media (prefers-reduced-motion: reduce) {
  .glitch-text::before,
  .glitch-text::after {
    animation: none;
    display: none;
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
// if (reduced) return <h1>{text}</h1>;

function GlitchText({ text }: { text: string }) {
  const glitchVariants = {
    animate: {
      x: [0, -2, 1, -1, 3, -3, 2, 0],
      y: [0, 2, -1, 3, 1, -2, -3, 0],
      textShadow: [
        "0 0 0 transparent",
        "-2px 2px 0 #ff00ff, 2px -2px 0 #00ffff",
        "1px -1px 0 #ff00ff, -1px 1px 0 #00ffff",
        "-3px 1px 0 #ff00ff, 3px -1px 0 #00ffff",
        "2px 2px 0 #ff00ff, -2px -2px 0 #00ffff",
        "0 0 0 transparent",
      ],
    },
  };

  return (
    <motion.h1
      variants={glitchVariants}
      animate="animate"
      transition={{
        duration: 3,
        ease: "linear",
        repeat: Infinity,
        times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
      }}
    >
      {text}
    </motion.h1>
  );
}`,
    },
  ],
};
