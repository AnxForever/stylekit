// Tropical Paradise Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const tropicalParadiseTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-[#00897b]/20",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_8px_rgba(0,137,123,0.08)]",
    md: "shadow-[0_4px_20px_rgba(0,137,123,0.12)]",
    lg: "shadow-[0_8px_30px_rgba(0,137,123,0.18)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_8px_30px_rgba(0,137,123,0.15)]",
    focus: "focus:shadow-[0_0_0_3px_rgba(0,137,123,0.15)]",
    colored: {
      teal: "shadow-[0_4px_20px_rgba(0,137,123,0.2)]",
      coral: "shadow-[0_4px_20px_rgba(255,111,97,0.2)]",
      mango: "shadow-[0_4px_20px_rgba(255,193,7,0.2)]",
    },
  },

  interaction: {
    hoverScale: "hover:-translate-y-1",
    hoverOpacity: "hover:bg-[#00796b]",
    transition: "transition-all duration-300",
    active: "active:translate-y-0",
  },

  typography: {
    heading: "font-bold tracking-tight",
    body: "font-sans text-gray-600",
    mono: "font-mono text-sm",
    sizes: {
      hero: "text-5xl md:text-6xl lg:text-7xl",
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
      primary: "bg-[#fffde7]",
      secondary: "bg-white",
      accent: ["bg-[#00897b]", "bg-[#ff6f61]", "bg-[#ffc107]", "bg-[#4caf50]"],
    },
    text: {
      primary: "text-[#00897b]",
      secondary: "text-gray-700",
      muted: "text-gray-500",
    },
    button: {
      primary: "bg-[#00897b] text-white",
      secondary: "bg-white text-[#00897b] border-2 border-[#00897b]/20",
    },
  },

  forbidden: {
    classes: [
      "bg-black", "bg-gray-900", "bg-gray-800",
      "rounded-none",
      "text-gray-900",
      "shadow-[0_0_16px_rgba(0,0,0",
      "font-serif",
    ],
    patterns: [
      "^bg-(?:black|gray-[89])",
      "^rounded-none$",
    ],
    reasons: {
      "bg-black": "Tropical Paradise uses warm, sunny backgrounds; dark themes are forbidden",
      "bg-gray-900": "Tropical Paradise uses warm, sunny backgrounds; dark themes are forbidden",
      "rounded-none": "Tropical Paradise uses rounded shapes (rounded-2xl or rounded-full)",
      "font-serif": "Tropical Paradise uses clean sans-serif fonts for a modern, casual feel",
    },
  },

  required: {
    button: [
      "rounded-full",
      "font-bold",
      "shadow-[0_4px_16px_rgba(0,137,123,0.3)]",
      "transition-all duration-300",
    ],
    card: [
      "bg-white",
      "rounded-2xl",
      "shadow-[0_4px_20px_rgba(0,137,123,0.1)]",
    ],
    input: [
      "bg-white",
      "border-2 border-[#00897b]/20",
      "rounded-full",
      "focus:border-[#00897b]",
      "focus:outline-none",
      "transition-all duration-300",
    ],
  },
});
