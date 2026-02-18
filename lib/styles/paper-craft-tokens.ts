// Paper Craft Style Tokens
import { createStyleTokens } from "./token-defaults";

export const paperCraftTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-[#e0d8cc]",
    radius: "rounded-xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[2px_2px_0px_rgba(0,0,0,0.06)]",
    md: "shadow-[4px_4px_0px_rgba(0,0,0,0.08)]",
    lg: "shadow-[6px_6px_0px_rgba(0,0,0,0.1)]",
    none: "shadow-none",
    hover: "hover:shadow-[5px_5px_0px_rgba(0,0,0,0.12)]",
    focus: "focus:shadow-[0_0_0_3px_rgba(232,93,117,0.15)]",
    colored: {
      red: "shadow-[4px_4px_0px_rgba(232,93,117,0.2)]",
      teal: "shadow-[4px_4px_0px_rgba(92,184,165,0.2)]",
      yellow: "shadow-[4px_4px_0px_rgba(245,192,64,0.2)]",
    },
  },

  interaction: {
    hoverScale: "hover:-translate-y-0.5",
    transition: "transition-all duration-200",
    active: "active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,0.06)]",
  },

  typography: {
    heading: "font-bold",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-12 md:py-20",
    container: "px-4 md:px-8",
    card: "p-6",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#fdf6ee]",
      secondary: "bg-white",
      accent: ["bg-[#e85d75]", "bg-[#5cb8a5]", "bg-[#f5c040]", "bg-[#6b7fb5]"],
    },
    text: {
      primary: "text-[#2d2d2d]",
      secondary: "text-[#666666]",
      muted: "text-[#b0a898]",
    },
    button: {
      primary: "bg-[#e85d75] text-white",
      secondary: "bg-white text-[#2d2d2d] border-2 border-[#2d2d2d]",
      danger: "bg-red-500 text-white",
    },
  },

  forbidden: {
    classes: [
      "bg-black",
      "bg-gray-900",
      "bg-gray-950",
      "text-white",
      "shadow-[0_0_",
      "text-cyan-",
      "text-fuchsia-",
      "bg-cyan-",
      "bg-fuchsia-",
    ],
    patterns: [
      "^bg-(?:black|gray-[89])",
      "^shadow-\\[0_0_.*rgba",
      "^text-(?:cyan|fuchsia)-",
      "^bg-(?:cyan|fuchsia)-",
    ],
    reasons: {
      "bg-black": "Paper Craft uses warm light backgrounds, never dark",
      "shadow-[0_0_": "Use offset paper shadows (shadow-[4px_4px_...]), not glows",
      "text-cyan-": "Use craft colors (#e85d75, #5cb8a5, #f5c040) not neon",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "font-bold",
      "rounded-xl",
      "shadow-[3px_3px_0px_rgba(0,0,0,0.1)]",
      "transition-all duration-200",
    ],
    card: [
      "bg-white",
      "rounded-2xl",
      "shadow-[4px_4px_0px_rgba(0,0,0,0.08)]",
    ],
    input: [
      "bg-white",
      "border-2 border-[#e0d8cc]",
      "rounded-xl",
      "text-[#2d2d2d]",
      "focus:border-[#e85d75]",
      "focus:outline-none",
    ],
  },
});
