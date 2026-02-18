// Scandinavian Minimalism Style Tokens
import { createStyleTokens } from "./token-defaults";

export const scandinavianTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#d4cdc5]/40",
    radius: "rounded-sm",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    none: "shadow-none",
    hover: "hover:shadow-md",
    focus: "focus:ring-2 focus:ring-[#5a7a6b]/30",
    colored: {
      green: "shadow-[0_4px_14px_rgba(90,122,107,0.15)]",
      blue: "shadow-[0_4px_14px_rgba(123,160,184,0.15)]",
    },
  },

  interaction: {
    transition: "transition-colors duration-500",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-light tracking-wide",
    body: "font-light",
    mono: "font-mono font-light",
    sizes: {
      hero: "text-3xl md:text-5xl lg:text-7xl",
      h1: "text-2xl md:text-4xl",
      h2: "text-xl md:text-3xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-20 md:py-28 lg:py-36",
    container: "px-6 md:px-12 lg:px-20",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-4",
      md: "gap-8",
      lg: "gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f5f0eb]",
      secondary: "bg-white/60",
      accent: ["bg-[#5a7a6b]/10", "bg-[#7ba0b8]/10", "bg-[#c9a88c]/10"],
    },
    text: {
      primary: "text-[#3d3d3d]",
      secondary: "text-[#a89279]",
      muted: "text-[#d4cdc5]",
    },
    button: {
      primary: "bg-[#3d3d3d] text-[#f5f0eb]",
      secondary: "bg-transparent border border-[#d4cdc5] text-[#3d3d3d]",
      danger: "bg-[#c17767] text-white",
    },
  },

  forbidden: {
    classes: [
      "bg-black", "bg-gray-900", "bg-slate-900",
      "font-black", "font-extrabold", "font-bold",
      "border-4", "border-[3px]", "border-[4px]",
      "shadow-[4px_4px", "shadow-[8px_8px",
      "rounded-none", "rounded-3xl", "rounded-full",
      "text-5xl", "text-6xl", "text-7xl", "text-8xl",
    ],
    patterns: [
      "^bg-(?:black|gray-9|slate-9)",
      "^font-(?:black|extrabold|bold)$",
      "^border-(?:[3-9]|\\d{2})",
      "^shadow-\\[\\d+px_\\d+px_0",
    ],
    reasons: {
      "bg-black": "Scandinavian style uses warm neutral backgrounds, not pure black",
      "font-black": "Only light and extralight font weights allowed for calm aesthetic",
      "border-4": "Borders must be subtle and thin",
      "rounded-none": "Use rounded-sm for gentle softness",
    },
  },

  required: {
    button: ["transition-colors", "duration-300"],
    card: ["rounded-sm", "transition-colors"],
    input: ["bg-transparent", "focus:outline-none"],
  },
});
