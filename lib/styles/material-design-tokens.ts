// Material Design Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const materialDesignTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#e0e0e0]",
    radius: "rounded-md",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.14)]",
    md: "shadow-[0_3px_6px_rgba(0,0,0,0.15),0_2px_4px_rgba(0,0,0,0.12)]",
    lg: "shadow-[0_10px_20px_rgba(0,0,0,0.15),0_3px_6px_rgba(0,0,0,0.1)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_14px_28px_rgba(0,0,0,0.18),0_5px_10px_rgba(0,0,0,0.12)]",
    focus: "focus:shadow-[0_3px_6px_rgba(0,0,0,0.15),0_2px_4px_rgba(0,0,0,0.12)]",
    colored: {
      purple: "shadow-[0_3px_6px_rgba(98,0,238,0.25)]",
      teal: "shadow-[0_3px_6px_rgba(3,218,198,0.25)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-[1.01]",
    transition: "transition-all duration-200 ease-in-out",
    active: "active:scale-[0.99]",
  },

  typography: {
    heading: "font-sans font-medium tracking-tight",
    body: "font-sans",
    mono: "font-mono",
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
    section: "py-10 md:py-16 lg:py-24",
    container: "px-4 md:px-6 lg:px-8",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-2 md:gap-3",
      md: "gap-3 md:gap-4",
      lg: "gap-4 md:gap-6",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-[#f5f5f5]",
      accent: ["bg-[#6200ee]", "bg-[#03dac6]", "bg-[#018786]", "bg-[#bb86fc]"],
    },
    text: {
      primary: "text-[#212121]",
      secondary: "text-[#757575]",
      muted: "text-[#9e9e9e]",
    },
    button: {
      primary: "bg-[#6200ee] text-white",
      secondary: "bg-transparent text-[#6200ee] border border-[#6200ee]",
      danger: "bg-[#b00020] text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "border-black", "border-4",
      "shadow-[2px_2px_0px", "shadow-[4px_4px_0px", "shadow-[8px_8px_0px",
      "font-black", "font-serif",
      "bg-gradient-to-r", "bg-gradient-to-l",
    ],
    patterns: [
      "^rounded-none$",
      "^shadow-\\[\\d+px_\\d+px_0px",
      "^font-(?:black|serif)$",
      "^border-(?:black|4)$",
    ],
    reasons: {
      "rounded-none": "Material Design uses subtle rounding (rounded-md) for card elevation",
      "shadow-[4px_4px_0px": "Material Design uses elevation-based blur shadows, not hard-edge",
      "border-black": "Material Design uses subtle gray borders or relies on elevation shadows",
      "font-serif": "Material Design uses clean sans-serif typography (Roboto-style)",
    },
  },

  required: {
    button: [
      "rounded-md",
      "shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.14)]",
      "hover:shadow-[0_14px_28px_rgba(0,0,0,0.18),0_5px_10px_rgba(0,0,0,0.12)]",
      "transition-all duration-200 ease-in-out",
      "font-medium",
    ],
    card: [
      "rounded-md",
      "shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.14)]",
      "bg-white",
    ],
    input: [
      "rounded-md",
      "border border-[#e0e0e0]",
      "bg-white",
      "font-sans",
      "focus:border-[#6200ee]",
      "focus:outline-none",
    ],
  },
};
