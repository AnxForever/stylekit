// Stripe Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const stripeStyleTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-gray-200",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
    md: "shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]",
    lg: "shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.1)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.1)]",
    focus: "focus:shadow-[0_0_0_3px_rgba(99,91,255,0.3)]",
    colored: {
      purple: "shadow-[0_2px_4px_rgba(99,91,255,0.2),0_4px_8px_rgba(99,91,255,0.2)]",
    },
  },

  interaction: {
    hoverTranslate: "hover:-translate-y-0.5",
    transition: "transition-all duration-200",
  },

  typography: {
    heading: "font-semibold text-[#0a2540]",
    body: "text-gray-600",
    mono: "font-mono text-sm",
    sizes: {
      hero: "text-5xl md:text-7xl",
      h1: "text-4xl md:text-5xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-base",
      small: "text-sm",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-6 md:px-8",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-[#f6f9fc]",
      accent: ["bg-[#635bff]", "bg-[#0a2540]", "bg-gradient-to-r from-[#635bff] to-[#00d4ff]"],
    },
    text: {
      primary: "text-[#0a2540]",
      secondary: "text-gray-600",
      muted: "text-gray-400",
    },
    button: {
      primary: "bg-[#635bff] text-white",
      secondary: "bg-white text-[#0a2540]",
    },
  },

  forbidden: {
    classes: [
      "rounded-3xl",
      "shadow-inner",
      "bg-gradient-to-br from-pink",
      "text-pink",
    ],
    patterns: [
      "^rounded-3xl",
      "^shadow-inner",
      "^bg-(?:pink|red|yellow)-",
    ],
    reasons: {
      "rounded-3xl": "Stripe style uses moderate rounded corners (rounded-lg or rounded-xl)",
      "shadow-inner": "Stripe style uses outward shadows, not inset shadows",
      "bg-pink": "Stripe style uses professional colors (purple, blue, gray)",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "bg-[#635bff]",
      "rounded-lg",
      "text-white font-medium",
      "shadow-[0_2px_4px_rgba(99,91,255,0.2),0_4px_8px_rgba(99,91,255,0.2)]",
      "hover:-translate-y-0.5",
      "transition-all duration-200",
    ],
    card: [
      "bg-white",
      "rounded-xl",
      "shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]",
    ],
    input: [
      "bg-white",
      "border border-gray-300",
      "rounded-lg",
      "text-[#0a2540] placeholder-gray-400",
      "shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
      "focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent",
      "transition-all",
    ],
  },
};
