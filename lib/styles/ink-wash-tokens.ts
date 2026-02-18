// Ink Wash Style Tokens
import { createStyleTokens } from "./token-defaults";

export const inkWashTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#2c2c2c]/20",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-sm",
    lg: "shadow-md",
    none: "shadow-none",
    hover: "hover:shadow-sm",
    focus: "focus:ring-1 focus:ring-[#6b7b6e]/20",
    colored: {},
  },

  interaction: {
    transition: "transition-all duration-700",
    active: "active:opacity-80",
  },

  typography: {
    heading: "font-serif font-light tracking-wide",
    body: "font-serif font-light",
    mono: "font-mono font-light",
    sizes: {
      hero: "text-3xl md:text-5xl lg:text-6xl",
      h1: "text-2xl md:text-4xl",
      h2: "text-xl md:text-2xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-24 md:py-32 lg:py-40",
    container: "px-8 md:px-16 lg:px-24",
    card: "p-8 md:p-10",
    gap: {
      sm: "gap-6",
      md: "gap-10",
      lg: "gap-16",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f8f5f0]",
      secondary: "bg-[#f3efe8]",
      accent: ["bg-[#6b7b6e]/10", "bg-[#a89279]/10", "bg-[#c4b9a8]/10"],
    },
    text: {
      primary: "text-[#2c2c2c]",
      secondary: "text-[#a89279]",
      muted: "text-[#c4b9a8]",
    },
    button: {
      primary: "bg-transparent border-b border-[#2c2c2c]/30 text-[#2c2c2c]",
      secondary: "bg-transparent border-b border-[#c4b9a8] text-[#a89279]",
      danger: "bg-transparent border-b border-[#8b6f4e] text-[#8b6f4e]",
    },
  },

  forbidden: {
    classes: [
      "bg-black", "bg-gray-900", "bg-slate-900",
      "font-black", "font-extrabold", "font-bold",
      "border-4", "border-[3px]", "border-[4px]",
      "shadow-lg", "shadow-xl", "shadow-2xl",
      "rounded-2xl", "rounded-3xl", "rounded-full",
      "bg-gradient-to-r", "bg-gradient-to-b",
      "text-6xl", "text-7xl", "text-8xl",
      "animate-bounce", "animate-spin", "animate-pulse",
      "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
    ],
    patterns: [
      "^bg-(?:black|gray-9|slate-9)",
      "^font-(?:black|extrabold|bold)$",
      "^shadow-(?:lg|xl|2xl)$",
      "^bg-gradient",
      "^animate-(?:bounce|spin|pulse)$",
      "^text-(?:[6-9]xl|\\dxl)$",
      "^bg-(?:red|blue|green|yellow|orange|pink|purple)-[4-9]00$",
    ],
    reasons: {
      "bg-black": "Ink wash uses warm xuan-paper tones, not pure darkness",
      "font-bold": "Only light and extralight weights convey ink wash restraint",
      "shadow-lg": "Shadows must be minimal or absent to preserve ethereal quality",
      "bg-gradient-to-r": "No gradients; use flat ink-gray tones only",
      "animate-bounce": "No energetic animations; only slow ink-diffusion fades allowed",
      "bg-red-500": "No bright saturated colors; ink wash palette is strictly muted grays and naturals",
    },
  },

  required: {
    button: ["bg-transparent", "transition-all", "duration-700"],
    card: ["transition-colors"],
    input: ["bg-transparent", "focus:outline-none"],
  },
});
