// Shopify Clean Style Tokens
import { createStyleTokens } from "./token-defaults";

export const shopifyCleanTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#e3e3e3]",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    none: "shadow-none",
    hover: "shadow-md",
    focus: "ring-2 ring-[#008060]/20",
  },

  interaction: {
    hoverScale: "hover:shadow-md",
    transition: "transition-all duration-200",
  },

  typography: {
    heading: "font-semibold tracking-tight",
    body: "font-normal",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-5xl lg:text-6xl",
      h1: "text-3xl md:text-4xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-12 md:py-16 lg:py-20",
    container: "px-4 md:px-6 lg:px-8",
    card: "p-4",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-[#f7f7f8]",
      accent: ["bg-[#008060]", "bg-[#1a1a1a]"],
    },
    text: {
      primary: "text-[#1a1a1a]",
      secondary: "text-[#6b7280]",
      muted: "text-[#9ca3af]",
    },
    button: {
      primary: "bg-[#008060] text-white hover:bg-[#006e52]",
      secondary: "bg-white text-[#1a1a1a] border border-[#e3e3e3]",
      danger: "bg-red-600 text-white hover:bg-red-700",
    },
  },

  forbidden: {
    classes: [
      "rounded-2xl",
      "shadow-2xl",
      "bg-gradient-to-r",
      "border-4",
    ],
    patterns: [
      "^shadow-2xl",
      "^bg-gradient-",
      "^border-[48]",
      "^rounded-(2xl|3xl|full)",
    ],
    reasons: {
      "rounded-2xl": "Shopify Clean uses rounded-lg maximum on cards",
      "shadow-2xl": "Shadows should be subtle (shadow-sm to shadow-md)",
      "bg-gradient-to-r": "Use solid colors for clean product display",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "rounded-lg",
      "font-medium",
      "transition-colors duration-200",
    ],
    card: [
      "bg-white",
      "rounded-lg",
      "border border-[#e3e3e3]",
    ],
    input: [
      "px-4 py-3",
      "border border-[#e3e3e3]",
      "rounded-lg",
      "focus:ring-2 focus:ring-[#008060]/20",
      "focus:border-[#008060]",
    ],
  },
});
