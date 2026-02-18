// Victorian Botanical Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const victorianBotanicalTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#2d4a2d]/20",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_1px_4px_rgba(45,74,45,0.06)]",
    md: "shadow-[0_2px_8px_rgba(45,74,45,0.1)]",
    lg: "shadow-[0_4px_16px_rgba(45,74,45,0.12)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_4px_12px_rgba(139,105,20,0.12)]",
    focus: "focus:shadow-[0_0_0_2px_rgba(139,105,20,0.1)]",
    colored: {
      gold: "shadow-[0_2px_12px_rgba(139,105,20,0.15)]",
      green: "shadow-[0_2px_12px_rgba(45,74,45,0.12)]",
    },
  },

  interaction: {
    hoverOpacity: "hover:border-[#8b6914]/40",
    transition: "transition-all duration-300",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-serif tracking-wide",
    body: "font-serif",
    mono: "font-mono text-sm",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-20 lg:py-28",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-5 md:p-6",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#faf5ef]",
      secondary: "bg-[#f4ede3]",
      accent: ["bg-[#2d4a2d]", "bg-[#8b6914]", "bg-[#6b3a3a]"],
    },
    text: {
      primary: "text-[#2d4a2d]",
      secondary: "text-[#8b6914]",
      muted: "text-[#2d4a2d]/50",
    },
    button: {
      primary: "bg-[#2d4a2d] text-[#faf5ef] border border-[#8b6914]/60",
      secondary: "bg-[#faf5ef] text-[#2d4a2d] border border-[#2d4a2d]/20",
    },
  },

  forbidden: {
    classes: [
      "rounded-full",
      "bg-black", "bg-gray-900",
      "text-[#ff00ff]", "text-[#00ffff]", "text-[#ff6b6b]",
      "bg-gradient-to-r", "bg-gradient-to-br",
      "shadow-xl", "shadow-2xl",
      "font-sans",
      "neon", "glow",
    ],
    patterns: [
      "^bg-(?:black|gray-9)",
      "^bg-gradient",
      "^shadow-(?:xl|2xl)",
      "^text-\\[#(?:ff00ff|00ffff)",
    ],
    reasons: {
      "rounded-full": "Victorian Botanical uses restrained rounded-lg corners, not pill shapes",
      "bg-black": "Victorian Botanical uses warm cream backgrounds, not dark themes",
      "bg-gradient-to-r": "Victorian Botanical uses flat, parchment-like backgrounds without gradients",
      "shadow-xl": "Victorian Botanical uses subtle, warm-toned shadows only",
      "font-sans": "Victorian Botanical requires serif typography for headings",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "font-serif tracking-wide",
      "border border-[#8b6914]/60",
      "transition-all duration-300",
    ],
    card: [
      "bg-[#faf5ef]",
      "border border-[#2d4a2d]/20",
      "rounded-lg",
      "shadow-[0_2px_8px_rgba(45,74,45,0.08)]",
    ],
    input: [
      "bg-[#faf5ef]",
      "border border-[#2d4a2d]/20",
      "rounded-lg",
      "text-[#2d4a2d]",
      "focus:border-[#8b6914]/60",
      "focus:outline-none",
    ],
  },
});
