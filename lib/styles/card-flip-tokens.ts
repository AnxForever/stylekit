import { createStyleTokens } from "./token-defaults";

export const cardFlipTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#d4a574]/30",
    radius: "rounded-xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_8px_rgba(212,165,116,0.1)]",
    md: "shadow-[0_4px_16px_rgba(212,165,116,0.15)]",
    lg: "shadow-[0_8px_32px_rgba(212,165,116,0.2)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_8px_32px_rgba(212,165,116,0.25)]",
    focus: "focus:shadow-[0_0_0_3px_rgba(212,165,116,0.3)]",
    colored: {
      gold: "shadow-[0_0_20px_rgba(212,165,116,0.3)]",
    },
  },

  interaction: {
    transition: "transition-all duration-500",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-sans font-bold tracking-tight",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-8xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-4 md:px-8",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0a0e27]",
      secondary: "bg-[#1a1f3a]",
      accent: ["bg-[#d4a574]/10", "bg-[#d4a574]/20"],
    },
    text: {
      primary: "text-white",
      secondary: "text-[#d4a574]",
      muted: "text-white/50",
    },
    button: {
      primary: "bg-[#d4a574] text-[#0a0e27]",
      secondary: "bg-transparent text-[#d4a574] border border-[#d4a574]/40",
    },
  },

  forbidden: {
    classes: [
      "bg-white",
      "bg-gray-50",
      "bg-gray-100",
      "text-gray-900",
      "text-gray-800",
      "text-black",
    ],
    patterns: [
      "^bg-white",
      "^bg-gray-[1-3]",
      "^text-gray-[89]",
    ],
    reasons: {
      "bg-white": "Card Flip requires deep navy backgrounds only",
      "text-gray-900": "Use white or gold text on dark backgrounds",
    },
  },

  required: {
    button: [
      "transition-all",
      "duration-300",
    ],
    card: [
      "bg-[#1a1f3a]",
      "border",
      "border-[#d4a574]/30",
      "rounded-xl",
    ],
    input: [
      "bg-[#0a0e27]",
      "border",
      "border-[#d4a574]/30",
      "text-white",
      "focus:border-[#d4a574]",
    ],
  },
});
