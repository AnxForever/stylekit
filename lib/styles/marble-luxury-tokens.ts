// Marble Luxury Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const marbleLuxuryTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#c9a96e]/20",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_1px_10px_rgba(0,0,0,0.03)]",
    md: "shadow-[0_2px_20px_rgba(0,0,0,0.04)]",
    lg: "shadow-[0_4px_30px_rgba(0,0,0,0.06)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_4px_30px_rgba(0,0,0,0.06)]",
    focus: "focus:shadow-none",
  },

  interaction: {
    hoverOpacity: "hover:opacity-90",
    transition: "transition-all duration-500 ease-in-out",
    active: "active:opacity-80",
  },

  typography: {
    heading: "font-serif tracking-wide",
    body: "font-serif leading-relaxed",
    mono: "font-serif text-xs tracking-[0.3em] uppercase",
    sizes: {
      hero: "text-5xl md:text-7xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-20 md:py-32 lg:py-40",
    container: "px-6 md:px-12 lg:px-20",
    card: "p-10 md:p-12",
    gap: {
      sm: "gap-4 md:gap-6",
      md: "gap-6 md:gap-10",
      lg: "gap-10 md:gap-16",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f8f6f3]",
      secondary: "bg-[#1a1a1a]",
      accent: [
        "bg-[#c9a96e]",
        "bg-[#8a7968]",
        "bg-[#e8e0d6]",
      ],
    },
    text: {
      primary: "text-[#1a1a1a]",
      secondary: "text-[#c9a96e]",
      muted: "text-[#8a7968]",
    },
    button: {
      primary:
        "bg-[#1a1a1a] text-[#f8f6f3] border border-[#c9a96e]/40",
      secondary:
        "bg-transparent text-[#1a1a1a] border border-[#1a1a1a]/20",
    },
  },

  forbidden: {
    classes: [
      "bg-white",
      "border-4",
      "border-8",
      "font-black",
      "shadow-[4px_",
      "shadow-[6px_",
      "text-[#ff",
      "text-[#00ff",
      "bg-[#ff",
      "bg-[#00ff",
      "backdrop-blur",
      "rounded-full",
      "rounded-xl",
      "rounded-2xl",
    ],
    patterns: [
      "^bg-white$",
      "^border-[4-8]$",
      "^font-black$",
      "^shadow-\\[\\d+px_\\d+px_0px",
      "^(?:text|bg)-\\[#(?:ff[0-9a-f]{2}[0-9a-f]{2}|00ff)\\]$",
      "^backdrop-blur",
      "^rounded-(?:full|xl|2xl|3xl)$",
    ],
    reasons: {
      "bg-white": "Marble Luxury uses warm marble #f8f6f3, not sterile pure white",
      "border-4": "Marble Luxury uses fine 1px borders, never thick borders",
      "font-black": "Marble Luxury uses elegant light/normal weight, not aggressive bold",
      "shadow-[4px_": "Marble Luxury uses ultra-subtle shadows, not hard offset shadows",
      "rounded-full": "Marble Luxury uses sharp or no rounding for architectural elegance",
    },
  },

  required: {
    button: [
      "rounded-none",
      "font-serif tracking-[0.2em] uppercase",
      "border border-[#c9a96e]/40",
      "transition-all duration-500 ease-in-out",
    ],
    card: [
      "rounded-none",
      "bg-[#f8f6f3]",
      "border border-[#c9a96e]/20",
      "shadow-[0_2px_20px_rgba(0,0,0,0.04)]",
    ],
    input: [
      "bg-transparent",
      "border-b border-[#1a1a1a]/20",
      "text-[#1a1a1a]",
      "font-serif tracking-wide",
      "focus:outline-none",
      "transition-all duration-500",
    ],
  },
});
