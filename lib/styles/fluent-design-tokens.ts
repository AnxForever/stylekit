// Fluent Design Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const fluentDesignTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#e1e1e1]",
    radius: "rounded-md md:rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_1.6px_3.6px_rgba(0,0,0,0.13),0_0.3px_0.9px_rgba(0,0,0,0.1)]",
    md: "shadow-[0_3.2px_7.2px_rgba(0,0,0,0.13),0_0.6px_1.8px_rgba(0,0,0,0.1)]",
    lg: "shadow-[0_6.4px_14.4px_rgba(0,0,0,0.13),0_1.2px_3.6px_rgba(0,0,0,0.1)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_6.4px_14.4px_rgba(0,0,0,0.18),0_1.2px_3.6px_rgba(0,0,0,0.14)]",
    focus: "focus:shadow-[0_3.2px_7.2px_rgba(0,0,0,0.13),0_0.6px_1.8px_rgba(0,0,0,0.1)]",
    colored: {
      blue: "shadow-[0_3.2px_7.2px_rgba(0,120,212,0.2)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-[1.01]",
    transition: "transition-all duration-150 ease-out",
    active: "active:scale-[0.99]",
  },

  typography: {
    heading: "font-sans font-semibold tracking-tight",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-5xl lg:text-6xl",
      h1: "text-3xl md:text-4xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-10 md:py-16 lg:py-24",
    container: "px-4 md:px-6 lg:px-8",
    card: "p-4 md:p-5",
    gap: {
      sm: "gap-2 md:gap-3",
      md: "gap-3 md:gap-4",
      lg: "gap-4 md:gap-6",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-[#f3f2f1]",
      accent: ["bg-[#0078d4]", "bg-[#106ebe]", "bg-[#005a9e]", "bg-[#deecf9]"],
    },
    text: {
      primary: "text-[#323130]",
      secondary: "text-[#605e5c]",
      muted: "text-[#a19f9d]",
    },
    button: {
      primary: "bg-[#0078d4] text-white",
      secondary: "bg-white text-[#323130] border border-[#8a8886]",
      danger: "bg-[#a4262c] text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "border-black", "border-2", "border-4",
      "shadow-[2px_2px_0px", "shadow-[4px_4px_0px", "shadow-[8px_8px_0px",
      "font-black", "font-serif",
      "bg-black",
    ],
    patterns: [
      "^rounded-none$",
      "^shadow-\\[\\d+px_\\d+px_0px",
      "^border-(?:black|2|4)$",
      "^font-(?:black|serif)$",
    ],
    reasons: {
      "rounded-none": "Fluent Design uses subtle rounding (rounded-md to rounded-lg)",
      "border-4": "Fluent Design uses thin subtle borders (border), not heavy borders",
      "shadow-[4px_4px_0px": "Fluent Design uses soft acrylic-style shadows, not hard-edge",
      "font-serif": "Fluent Design uses Segoe UI-style sans-serif (font-sans)",
    },
  },

  required: {
    button: [
      "rounded-md",
      "shadow-[0_1.6px_3.6px_rgba(0,0,0,0.13),0_0.3px_0.9px_rgba(0,0,0,0.1)]",
      "transition-all duration-150 ease-out",
      "font-semibold",
    ],
    card: [
      "rounded-md md:rounded-lg",
      "border border-[#e1e1e1]",
      "shadow-[0_1.6px_3.6px_rgba(0,0,0,0.13),0_0.3px_0.9px_rgba(0,0,0,0.1)]",
      "bg-white",
    ],
    input: [
      "rounded-md",
      "border border-[#8a8886]",
      "bg-white",
      "font-sans",
      "focus:border-[#0078d4]",
      "focus:outline-none",
    ],
  },
};
