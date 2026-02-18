// Wabi-Sabi Style Tokens
import { createStyleTokens } from "./token-defaults";

export const wabiSabiTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#d4cdc5]/30",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-sm",
    lg: "shadow-md",
    none: "shadow-none",
    hover: "hover:shadow-sm",
    focus: "focus:ring-1 focus:ring-[#8a9a7b]/20",
    colored: {},
  },

  interaction: {
    transition: "transition-opacity duration-1000",
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
      primary: "bg-[#f7f3ec]",
      secondary: "bg-[#f2ede4]",
      accent: ["bg-[#8a9a7b]/10", "bg-[#b5a78c]/10", "bg-[#8b6f4e]/10"],
    },
    text: {
      primary: "text-[#3a3a3a]",
      secondary: "text-[#8a8278]",
      muted: "text-[#b5a78c]",
    },
    button: {
      primary: "bg-transparent border-b border-[#3a3a3a]/30 text-[#3a3a3a]",
      secondary: "bg-transparent border-b border-[#d4cdc5] text-[#8a8278]",
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
    ],
    patterns: [
      "^bg-(?:black|gray-9|slate-9)",
      "^font-(?:black|extrabold|bold)$",
      "^shadow-(?:lg|xl|2xl)$",
      "^bg-gradient",
      "^animate-(?:bounce|spin|pulse)$",
      "^text-(?:[6-9]xl|\\dxl)$",
    ],
    reasons: {
      "bg-black": "Wabi-sabi uses warm paper tones, not pure darkness",
      "font-black": "Only light and extralight weights convey wabi-sabi restraint",
      "shadow-lg": "Shadows must be minimal or absent for quiet aesthetic",
      "bg-gradient-to-r": "No gradients; use flat, natural tones",
      "animate-bounce": "No energetic animations; only slow fades allowed",
    },
  },

  required: {
    button: ["bg-transparent", "transition-colors", "duration-500"],
    card: ["transition-colors"],
    input: ["bg-transparent", "focus:outline-none"],
  },
});
