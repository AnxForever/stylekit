// Cel Shading Style Tokens
import { createStyleTokens } from "./token-defaults";

export const celShadingTokens = createStyleTokens({
  border: {
    width: "border-[3px]",
    color: "border-[#1a1a2e]",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[2px_2px_0_#1a1a2e]",
    md: "shadow-[3px_3px_0_#1a1a2e]",
    lg: "shadow-[4px_4px_0_#1a1a2e]",
    none: "shadow-none",
    hover: "hover:shadow-[1px_1px_0_#1a1a2e]",
    focus: "focus:shadow-[3px_3px_0_#1a1a2e]",
    colored: {
      red: "shadow-[3px_3px_0_#e63946]",
      blue: "shadow-[3px_3px_0_#4ea8de]",
      green: "shadow-[3px_3px_0_#2ecc71]",
      yellow: "shadow-[3px_3px_0_#f1c40f]",
    },
  },

  interaction: {
    hoverTranslate: "hover:translate-x-0.5 hover:translate-y-0.5",
    transition: "transition-all duration-150",
    active: "active:translate-x-1 active:translate-y-1 active:shadow-none",
  },

  typography: {
    heading: "font-black uppercase tracking-tight",
    body: "font-bold",
    mono: "font-mono font-bold",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-8xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-4xl",
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
      sm: "gap-3",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#fafaf5]",
      secondary: "bg-white",
      accent: ["bg-[#e63946]", "bg-[#4ea8de]", "bg-[#2ecc71]", "bg-[#f1c40f]"],
    },
    text: {
      primary: "text-[#1a1a2e]",
      secondary: "text-[#1a1a2e]/60",
      muted: "text-[#1a1a2e]/40",
    },
    button: {
      primary: "bg-[#e63946] text-white",
      secondary: "bg-[#4ea8de] text-white",
      danger: "bg-[#1a1a2e] text-white",
    },
  },

  forbidden: {
    classes: [
      "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl",
      "bg-gradient-to-r", "bg-gradient-to-b", "bg-gradient-to-br",
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full",
      "border", "border-[1px]",
      "font-light", "font-extralight", "font-thin",
      "opacity-50", "opacity-30",
    ],
    patterns: [
      "^shadow-(?:sm|md|lg|xl|2xl)$",
      "^bg-gradient",
      "^rounded-(?:lg|xl|2xl|3xl|full)$",
      "^font-(?:light|extralight|thin)$",
    ],
    reasons: {
      "shadow-md": "Only hard offset shadows allowed, no blur shadows",
      "bg-gradient-to-r": "Flat solid colors only, no gradients",
      "rounded-lg": "Sharp corners (rounded-none) for cartoon panel aesthetic",
      "font-light": "Bold and black weights only for impactful text",
    },
  },

  required: {
    button: ["border-[3px]", "border-[#1a1a2e]", "font-black", "uppercase"],
    card: ["border-[3px]", "border-[#1a1a2e]", "shadow-[3px_3px_0_#1a1a2e]"],
    input: ["border-[3px]", "border-[#1a1a2e]", "focus:outline-none"],
  },
});
