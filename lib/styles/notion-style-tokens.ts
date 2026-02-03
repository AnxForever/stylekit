// Notion Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const notionStyleTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-gray-200",
    radius: "rounded-md",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    none: "shadow-none",
    hover: "hover:shadow-md",
    focus: "focus:shadow-sm",
  },

  interaction: {
    hoverOpacity: "hover:bg-gray-100",
    transition: "transition-colors duration-150",
  },

  typography: {
    heading: "font-semibold text-gray-900",
    body: "text-gray-700",
    mono: "font-mono text-gray-600 text-sm",
    sizes: {
      hero: "text-4xl md:text-5xl",
      h1: "text-3xl md:text-4xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-base",
      small: "text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-16",
    container: "px-4 md:px-6",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-[#f7f6f3]",
      accent: ["bg-blue-50", "bg-red-50", "bg-green-50", "bg-yellow-50"],
    },
    text: {
      primary: "text-[#37352f]",
      secondary: "text-gray-600",
      muted: "text-gray-400",
    },
    button: {
      primary: "bg-[#2eaadc] text-white",
      secondary: "bg-gray-100 text-gray-700",
    },
  },

  forbidden: {
    classes: [
      "rounded-2xl",
      "rounded-3xl",
      "rounded-full",
      "shadow-2xl",
      "bg-gradient-to-r",
      "bg-gradient-to-br",
    ],
    patterns: [
      "^rounded-(?:2xl|3xl|full)",
      "^shadow-(?:2xl|inner)",
      "^bg-gradient",
    ],
    reasons: {
      "rounded-2xl": "Notion style uses subtle rounded corners (rounded-md or rounded-lg)",
      "rounded-full": "Notion style avoids pill-shaped elements except for avatars",
      "shadow-2xl": "Notion style uses minimal, subtle shadows",
      "bg-gradient-to-r": "Notion style uses flat, solid colors without gradients",
    },
  },

  required: {
    button: [
      "px-3 py-1.5",
      "rounded-md",
      "text-sm font-medium",
      "hover:bg-gray-100",
      "transition-colors duration-150",
    ],
    card: [
      "bg-white",
      "border border-gray-200",
      "rounded-lg",
      "shadow-sm",
    ],
    input: [
      "bg-white",
      "border border-gray-200",
      "rounded-md",
      "text-gray-900 placeholder-gray-400",
      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      "transition-all",
    ],
  },
};
