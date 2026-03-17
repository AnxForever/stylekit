// Luxury Retail Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const luxuryRetailTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#e8e0d4]",
    radius: "rounded-sm",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "hover:shadow-none",
    focus: "focus:shadow-none",
  },

  interaction: {
    hoverOpacity: "hover:opacity-80",
    transition: "transition-all duration-300",
  },

  typography: {
    heading: "font-serif text-[#1a1a1a] tracking-wide",
    body: "text-[#8b7355] tracking-wide leading-relaxed",
    mono: "font-mono text-sm",
    sizes: {
      hero: "text-4xl md:text-5xl lg:text-6xl",
      h1: "text-3xl md:text-4xl lg:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-6 md:px-8",
    card: "p-0",
    gap: {
      sm: "gap-4",
      md: "gap-8",
      lg: "gap-16",
    },
  },

  colors: {
    background: {
      primary: "bg-[#faf9f6]",
      secondary: "bg-[#f0ece4]",
      accent: ["bg-[#1a1a1a]", "bg-[#c9a96e]"],
    },
    text: {
      primary: "text-[#1a1a1a]",
      secondary: "text-[#8b7355]",
      muted: "text-[#c9a96e]",
    },
    button: {
      primary: "border border-[#1a1a1a] text-[#1a1a1a] bg-transparent",
      secondary: "bg-[#1a1a1a] text-[#faf9f6]",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg",
      "rounded-xl",
      "rounded-2xl",
      "rounded-full",
      "bg-blue-500",
      "bg-red-500",
      "shadow-2xl",
    ],
    patterns: [
      "^rounded-(?:lg|xl|2xl|3xl|full)",
      "^bg-(?:blue|red|green|yellow|purple|pink)-\\d+",
      "^shadow-(?:lg|xl|2xl)",
    ],
    reasons: {
      "rounded-lg": "Luxury style uses sharp or micro-rounded corners (rounded-sm max)",
      "bg-blue-500": "Luxury style avoids saturated colors; use gold #c9a96e or muted tones",
      "shadow-2xl": "Luxury style avoids heavy shadows; uses clean lines and borders",
    },
  },

  required: {
    button: [
      "border border-[#1a1a1a]",
      "bg-transparent",
      "text-[#1a1a1a]",
      "text-xs tracking-[0.2em] uppercase",
      "hover:bg-[#1a1a1a] hover:text-[#faf9f6]",
      "transition-all duration-300",
    ],
    card: [
      "bg-[#faf9f6]",
      "rounded-sm",
    ],
    input: [
      "bg-transparent",
      "border-b border-[#c9a96e]",
      "text-[#1a1a1a]",
      "placeholder:text-[#8b7355]",
      "focus:outline-none focus:border-[#1a1a1a]",
      "tracking-wide",
    ],
  },
});
