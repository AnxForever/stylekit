import type { Animation } from "./types";

export const textGradientFlow: Animation = {
  slug: "text-gradient-flow",
  name: "文字渐变流动",
  nameEn: "Text Gradient Flow",
  description: "文字颜色以渐变方式持续流动变化，吸引注意力的标题效果。",
  descriptionEn: "Text color flows continuously through a gradient, creating an eye-catching headline effect.",
  category: "text",
  tags: ["text", "gradient", "flow", "color", "continuous"],
  trigger: "continuous",
  difficulty: "beginner",
  duration: "3s",
  easing: "linear",
  cssProperties: ["background-position"],
  isGPUAccelerated: false,
  previewBg: "dark",
  keywords: ["text gradient", "gradient flow", "animated text", "color shift", "headline"],
  useCases: [
    "Hero headline emphasis",
    "Brand tagline animation",
    "Section title highlight",
    "Special offer text",
  ],
  relatedAnimations: ["typewriter"],
  recommendedStyles: ["vaporwave", "modern-gradient", "cyberpunk-neon"],
  codeSnippets: [
    {
      label: "CSS Keyframes",
      language: "css",
      code: `@keyframes text-gradient-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.text-gradient-flow {
  background: linear-gradient(
    270deg,
    #6366f1, #ec4899, #8b5cf6, #06b6d4, #6366f1
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text-gradient-flow 3s linear infinite;
}`,
    },
    {
      label: "Tailwind CSS",
      language: "css",
      code: `@keyframes text-gradient-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@utility animate-text-gradient-flow {
  background: linear-gradient(
    270deg,
    #6366f1, #ec4899, #8b5cf6, #06b6d4, #6366f1
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text-gradient-flow 3s linear infinite;
}`,
    },
    {
      label: "Framer Motion",
      language: "tsx",
      code: `import { motion } from "framer-motion";

<motion.h1
  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
  style={{
    background: "linear-gradient(270deg, #6366f1, #ec4899, #8b5cf6, #06b6d4, #6366f1)",
    backgroundSize: "300% 300%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  Gradient Text
</motion.h1>`,
    },
  ],
};
