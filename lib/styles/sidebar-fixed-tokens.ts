// Sidebar Fixed Style Tokens - Dashboard with dark sidebar, compact and functional
import type { StyleTokens } from "./tokens";

export const sidebarFixedTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-zinc-200",
    radius: "rounded-lg",
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
      h3: "text-base md:text-lg",
      body: "text-sm",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-6 md:py-8",
    container: "px-4 md:px-6 lg:px-8",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-2 md:gap-3",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-zinc-50",
      secondary: "bg-white",
      accent: ["bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-red-500"],
    },
    text: {
      primary: "text-zinc-900",
      secondary: "text-zinc-600",
      muted: "text-zinc-400",
    },
    button: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-zinc-100 text-zinc-700",
      danger: "bg-red-500 text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-2xl", "rounded-3xl", "rounded-full",
      "shadow-2xl",
      "font-black", "font-extrabold",
      "text-4xl", "text-5xl", "text-6xl",
    ],
    patterns: [
      "^rounded-(?:2xl|3xl|full)",
      "^shadow-2xl",
      "^text-[456]xl",
    ],
    reasons: {
      "rounded-2xl": "Sidebar Fixed uses compact rounded-lg for functional UI elements",
      "shadow-2xl": "Sidebar Fixed uses subtle shadows for a clean dashboard feel",
      "text-5xl": "Sidebar Fixed uses compact typography appropriate for data-dense layouts",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "text-sm font-medium",
      "transition-colors",
    ],
    card: [
      "bg-white",
      "rounded-xl",
      "border border-zinc-200",
      "shadow-sm",
    ],
    input: [
      "bg-zinc-100",
      "border-0",
      "rounded-lg",
      "text-sm",
      "focus:outline-none focus:ring-2 focus:ring-blue-500/30",
    ],
  },
};
