// Gothic Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const gothicTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-[#c9a227]/40",
    radius: "rounded-none",
  },

  shadow: {
    sm: "shadow-[0_2px_8px_rgba(10,10,10,0.6)]",
    md: "shadow-[0_4px_16px_rgba(10,10,10,0.7)]",
    lg: "shadow-[0_8px_30px_rgba(10,10,10,0.8)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_6px_24px_rgba(201,162,39,0.4)]",
    focus: "focus:shadow-[0_0_16px_rgba(201,162,39,0.3)]",
    colored: {
      gold: "shadow-[0_4px_20px_rgba(201,162,39,0.3)]",
      blood: "shadow-[0_4px_20px_rgba(139,26,26,0.3)]",
      purple: "shadow-[0_4px_20px_rgba(45,27,78,0.4)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-[1.02]",
    transition: "transition-all duration-300 ease-in-out",
  },

  typography: {
    heading: "font-serif tracking-wider uppercase",
    body: "font-serif",
  },

  // spacing: uses defaults (py-12 md:py-20 lg:py-28, etc.)

  colors: {
    background: {
      primary: "bg-[#0a0a0a]",
      secondary: "bg-[#2d1b4e]",
      accent: ["bg-[#8b1a1a]", "bg-[#c9a227]", "bg-[#4a2d6e]"],
    },
    text: {
      primary: "text-[#c9a227]",
      secondary: "text-[#8b1a1a]",
      muted: "text-[#c9a227]/50",
    },
    button: {
      primary: "bg-[#2d1b4e] text-[#c9a227] border-2 border-[#c9a227]/60",
      secondary: "bg-[#0a0a0a] text-[#8b1a1a] border-2 border-[#8b1a1a]/60",
      danger: "bg-[#8b1a1a] text-[#c9a227]",
    },
  },

  forbidden: {
    classes: [
      "rounded-full", "rounded-xl", "rounded-2xl", "rounded-3xl",
      "bg-white", "bg-gray-50", "bg-gray-100",
      "text-pink-", "text-green-", "text-blue-",
      "bg-pink-", "bg-green-", "bg-blue-",
      "shadow-[0_0_",
    ],
    patterns: [
      "^rounded-(?:full|xl|2xl|3xl)$",
      "^bg-(?:white|gray-|pink-|green-|blue-)",
      "^text-(?:pink-|green-|blue-)",
    ],
    reasons: {
      "rounded-full": "Gothic uses sharp angular edges, not rounded shapes",
      "bg-white": "Gothic uses dark backgrounds, never bright white",
      "text-pink-": "Gothic uses gold, blood red, and deep purple, not pink",
    },
  },

  required: {
    button: [
      "border-2",
      "border-[#c9a227]/60",
      "font-serif",
      "transition-all duration-300 ease-in-out",
    ],
    card: [
      "bg-[#0a0a0a]/90",
      "border-2 border-[#c9a227]/40",
      "shadow-[0_4px_20px_rgba(10,10,10,0.8)]",
    ],
    input: [
      "border-2 border-[#c9a227]/30",
      "bg-[#0a0a0a]/80",
      "text-[#c9a227]",
      "font-serif",
      "focus:border-[#c9a227]",
      "focus:outline-none",
    ],
  },
});
