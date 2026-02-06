// Dashboard Layout Style Tokens - Data-focused, dark sidebar, compact functional utility
import type { StyleTokens } from "./tokens";

export const dashboardLayoutTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-gray-200",
    radius: "rounded-xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-sm",
    lg: "shadow-md",
    none: "shadow-none",
    hover: "hover:shadow-md",
    focus: "focus:shadow-sm",
  },

  interaction: {
    hoverOpacity: "hover:opacity-90",
    transition: "transition-colors duration-200",
  },

  typography: {
    heading: "font-semibold tracking-tight",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-2xl md:text-3xl",
      h1: "text-xl md:text-2xl",
      h2: "text-lg md:text-xl",
      h3: "text-sm md:text-base",
      body: "text-sm",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-4 md:py-6",
    container: "px-4 md:px-6",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-2 md:gap-3",
      md: "gap-3 md:gap-4",
      lg: "gap-4 md:gap-6",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f9fafb]",
      secondary: "bg-white",
      accent: ["bg-[#6366f1]", "bg-[#10b981]", "bg-[#f59e0b]", "bg-[#ef4444]"],
    },
    text: {
      primary: "text-[#111827]",
      secondary: "text-gray-500",
      muted: "text-gray-400",
    },
    button: {
      primary: "bg-[#6366f1] text-white",
      secondary: "bg-gray-100 text-gray-700",
      danger: "bg-[#ef4444] text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "shadow-2xl",
      "font-black", "font-extrabold",
      "text-5xl", "text-6xl", "text-7xl", "text-8xl",
      "rounded-3xl", "rounded-full",
    ],
    patterns: [
      "^rounded-(?:none|3xl|full)",
      "^shadow-2xl",
      "^text-[5-8]xl",
    ],
    reasons: {
      "rounded-none": "Dashboard Layout uses rounded-xl for a modern data panel aesthetic",
      "shadow-2xl": "Dashboard Layout uses minimal shadows to keep data focused",
      "text-6xl": "Dashboard Layout uses compact typography for data-dense screens",
      "rounded-full": "Dashboard Layout uses consistent rounded-xl panels, not pill shapes",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "font-medium text-sm",
      "transition-colors",
    ],
    card: [
      "bg-white",
      "rounded-xl",
      "shadow-sm",
      "border border-gray-100",
    ],
    input: [
      "bg-gray-50",
      "border border-gray-200",
      "rounded-lg",
      "text-sm",
      "focus:outline-none",
      "focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1]",
      "transition-all",
    ],
  },
};
