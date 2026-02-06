// Japanese Fresh Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const japaneseFreshTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#e8e8e4]",
    radius: "rounded-xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
    lg: "shadow-md",
    none: "shadow-none",
    hover: "hover:shadow-md",
    focus: "focus:shadow-[0_0_0_3px_rgba(100,181,246,0.1)]",
    colored: {
      blue: "shadow-[0_2px_8px_rgba(100,181,246,0.15)]",
      mint: "shadow-[0_2px_8px_rgba(152,216,200,0.15)]",
      pink: "shadow-[0_2px_8px_rgba(255,183,197,0.15)]",
    },
  },

  interaction: {
    hoverScale: "hover:brightness-105",
    hoverTranslate: "hover:-translate-y-0.5",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-sans font-light text-[#4a5568]",
    body: "font-sans font-light text-[#4a5568]",
    mono: "font-mono",
    sizes: {
      hero: "text-3xl md:text-5xl lg:text-6xl",
      h1: "text-2xl md:text-4xl",
      h2: "text-xl md:text-2xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-16 md:py-24 lg:py-32",
    container: "px-6 md:px-10 lg:px-16",
    card: "p-5 md:p-7",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-5 md:gap-7",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#fafaf8]",
      secondary: "bg-white",
      accent: ["bg-[#64b5f6]", "bg-[#98d8c8]", "bg-[#ffb7c5]", "bg-[#b8d4e3]"],
    },
    text: {
      primary: "text-[#4a5568]",
      secondary: "text-[#64b5f6]",
      muted: "text-[#a0aec0]",
    },
    button: {
      primary: "bg-[#64b5f6] text-white shadow-sm",
      secondary: "bg-white text-[#5a8fa8] border-[#b8d4e3]",
      danger: "bg-[#ffb7c5] text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-none", "rounded-sm",
      "border-2", "border-4",
      "font-bold", "font-black", "font-extrabold",
      "bg-[#0f0f1a]", "bg-black", "bg-[#1a1a1a]",
      "shadow-[0_0_", "text-[#ff006e]",
      "uppercase",
    ],
    patterns: [
      "^rounded-(?:none|sm)$",
      "^border-[2-9]$",
      "^font-(?:bold|black|extrabold)$",
      "^bg-(?:black|\\[#0)",
      "^uppercase$",
    ],
    reasons: {
      "rounded-none": "Japanese Fresh uses gentle rounded corners, never sharp",
      "border-2": "Japanese Fresh uses thin single borders only",
      "font-bold": "Japanese Fresh uses light/normal font weights for gentleness",
      "bg-black": "Japanese Fresh uses light, warm backgrounds only",
      "uppercase": "Japanese Fresh avoids uppercase for a softer, more approachable feel",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "font-sans font-light",
      "border border-[#b8d4e3]/50",
      "transition-all duration-300 ease-in-out",
    ],
    card: [
      "bg-white",
      "rounded-xl",
      "border border-[#e8e8e4]",
      "shadow-sm",
    ],
    input: [
      "rounded-lg",
      "border border-[#e8e8e4]",
      "bg-white",
      "font-sans font-light",
      "focus:outline-none",
    ],
  },
};
