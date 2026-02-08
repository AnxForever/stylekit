// Asymmetric Grid Layout Tokens - Broken symmetry, visual tension, overlapping elements
import type { StyleTokens } from "./tokens";

export const asymmetricGridTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-[#0f0f0f]",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-[4px_4px_0px_#0f0f0f]",
    lg: "shadow-[8px_8px_0px_#ff3366]",
    none: "shadow-none",
    hover: "hover:shadow-[4px_4px_0px_#ff3366]",
    focus: "focus:shadow-[4px_4px_0px_#00d4ff]",
  },

  interaction: {
    hoverOpacity: "hover:opacity-100",
    transition: "transition-all duration-200",
  },

  typography: {
    heading: "font-bold tracking-tight",
    body: "font-sans",
    mono: "font-mono uppercase tracking-widest",
    sizes: {
      hero: "text-7xl md:text-9xl",
      h1: "text-5xl md:text-7xl",
      h2: "text-3xl md:text-5xl",
      h3: "text-xl md:text-2xl",
      body: "text-base",
      small: "text-xs uppercase tracking-widest",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-6 md:px-12",
    card: "p-6 md:p-10",
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-[#0f0f0f]",
      accent: ["bg-[#ff3366]", "bg-[#00d4ff]", "bg-[#ffcc00]"],
    },
    text: {
      primary: "text-[#0f0f0f]",
      secondary: "text-white",
      muted: "text-gray-500",
    },
    button: {
      primary: "bg-[#0f0f0f] text-white",
      secondary: "bg-white text-[#0f0f0f] border-2 border-[#0f0f0f]",
      danger: "bg-[#ff3366] text-white",
    },
  },

  required: {
    button: ["font-bold", "uppercase", "tracking-widest"],
    card: ["border-2", "border-[#0f0f0f]"],
    input: ["border-2", "border-[#0f0f0f]"],
  },

  forbidden: {
    classes: [
      "rounded-lg",
      "rounded-xl",
      "rounded-2xl",
      "rounded-full",
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
      "shadow-xl",
    ],
    patterns: [
      "^rounded-(?:lg|xl|2xl|full)",
      "^shadow-(?:sm|md|lg|xl)",
    ],
    reasons: {
      "rounded-lg": "Asymmetric Grid uses sharp edges only",
      "shadow-sm": "Asymmetric Grid uses offset shadows, not soft shadows",
    },
  },
};
