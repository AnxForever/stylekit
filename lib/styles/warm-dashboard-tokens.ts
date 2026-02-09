// Warm Dashboard Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const warmDashboardTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-gray-200/50",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-lg shadow-black/5",
    md: "shadow-xl shadow-black/8",
    lg: "shadow-2xl shadow-black/10",
    none: "shadow-none",
    hover: "hover:shadow-2xl hover:-translate-y-1",
    focus: "focus:ring-2 focus:ring-[#4a9d9a]/30",
    colored: {
      teal: "shadow-lg shadow-[#4a9d9a]/25",
      coral: "shadow-lg shadow-[#c17767]/25",
      gold: "shadow-lg shadow-[#e8b86d]/25",
    },
  },

  interaction: {
    hoverOpacity: "hover:-translate-y-0.5",
    transition: "transition-all duration-200",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-semibold text-gray-800",
    body: "text-gray-600",
    mono: "font-mono text-gray-700",
    sizes: {
      hero: "text-3xl md:text-4xl",
      h1: "text-2xl md:text-3xl",
      h2: "text-xl md:text-2xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-12 md:py-16",
    container: "px-6 md:px-8 lg:px-10",
    card: "p-5 md:p-6 lg:p-8",
    gap: {
      sm: "gap-3",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#d4a088]",
      secondary: "bg-[#faf8f5]",
      accent: [
        "bg-[#4a9d9a]",
        "bg-[#e8b86d]",
        "bg-[#c17767]",
        "bg-[#6b8e8e]",
      ],
    },
    text: {
      primary: "text-gray-800",
      secondary: "text-gray-600",
      muted: "text-gray-400",
    },
    button: {
      primary: "bg-[#4a9d9a] text-white",
      secondary: "bg-white text-gray-700",
    },
  },

  forbidden: {
    classes: [
      // No cold colors for background
      "bg-blue-500", "bg-blue-600", "bg-purple-500", "bg-purple-600",
      // No pure black text
      "text-black",
      // No sharp corners
      "rounded-none", "rounded-sm",
      // No hard shadows
      "shadow-[0px_0px_0px",
      // No thick borders
      "border-2", "border-4",
      // No high saturation neon colors
      "bg-[#00ffff]", "bg-[#ff00ff]", "text-[#00ffff]",
    ],
    patterns: [
      "^rounded-none$",
      "^rounded-sm$",
      "^text-black$",
      "^border-[2-4]$",
    ],
    reasons: {
      "rounded-none": "Warm Dashboard uses large rounded corners (rounded-2xl or rounded-3xl)",
      "rounded-sm": "Warm Dashboard uses large rounded corners (rounded-2xl or rounded-3xl)",
      "text-black": "Warm Dashboard uses text-gray-800 for primary text, not pure black",
      "border-2": "Warm Dashboard uses subtle single-pixel borders",
      "bg-blue-500": "Warm Dashboard uses warm color palette, avoid cold backgrounds",
    },
  },

  required: {
    button: [
      "px-5 py-2.5 md:px-6 md:py-3",
      "rounded-xl",
      "shadow-lg",
      "hover:shadow-xl hover:-translate-y-0.5",
      "transition-all duration-200",
      "font-medium text-sm md:text-base",
    ],
    card: [
      "bg-[#faf8f5]",
      "rounded-2xl md:rounded-3xl",
      "shadow-xl shadow-black/8",
      "p-5 md:p-6 lg:p-8",
      "hover:shadow-2xl hover:-translate-y-1",
      "transition-all duration-300",
    ],
    input: [
      "w-full px-4 py-3",
      "bg-white",
      "border border-gray-200",
      "rounded-xl",
      "text-gray-800",
      "placeholder:text-gray-400",
      "focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30",
      "focus:border-[#4a9d9a]",
      "transition-all duration-200",
    ],
  },
};
