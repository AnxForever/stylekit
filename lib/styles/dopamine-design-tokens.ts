// Dopamine Design Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const dopamineDesignTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-[#ff006e]/20",
    radius: "rounded-3xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_4px_15px_rgba(255,0,110,0.25)]",
    md: "shadow-[0_8px_30px_rgba(255,0,110,0.4)]",
    lg: "shadow-[0_12px_40px_rgba(131,56,236,0.5)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_12px_40px_rgba(255,0,110,0.6)]",
    focus: "focus:shadow-[0_0_0_4px_rgba(255,0,110,0.15)]",
    colored: {
      pink: "shadow-[0_8px_30px_rgba(255,0,110,0.4)]",
      purple: "shadow-[0_8px_30px_rgba(131,56,236,0.35)]",
      blue: "shadow-[0_8px_30px_rgba(58,134,255,0.3)]",
    },
  },

  interaction: {
    hoverTranslate: "hover:scale-105 hover:-translate-y-0.5",
    transition: "transition-all duration-300",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-sans font-black tracking-tight",
    body: "font-sans text-base font-medium",
    mono: "font-mono",
    sizes: {
      hero: "text-5xl md:text-7xl font-black tracking-tight leading-[0.95]",
      h1: "text-3xl md:text-5xl font-extrabold tracking-tight",
      h2: "text-xl md:text-2xl font-bold",
      h3: "text-lg font-bold",
      body: "text-base font-medium",
      small: "text-sm font-semibold",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-6 md:px-8",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-3",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-[#f8f0ff]",
      accent: ["bg-[#ff006e]", "bg-[#8338ec]", "bg-[#3a86ff]"],
    },
    text: {
      primary: "text-[#1a1a2e]",
      secondary: "text-[#1a1a2e]/70",
      muted: "text-[#1a1a2e]/50",
    },
    button: {
      primary: "bg-[#ff006e] text-white shadow-[0_8px_30px_rgba(255,0,110,0.4)]",
      secondary: "bg-[#8338ec] text-white shadow-[0_8px_30px_rgba(131,56,236,0.35)]",
      danger: "bg-[#fb5607] text-white shadow-[0_8px_30px_rgba(251,86,7,0.35)]",
    },
  },

  forbidden: {
    classes: [
      "text-gray-500", "text-gray-400", "text-gray-300",
      "bg-gray-100", "bg-gray-50", "bg-gray-200",
      "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl",
      "rounded-sm", "rounded-md", "rounded-none",
      "font-serif", "font-mono",
      "font-normal", "font-light", "font-thin",
    ],
    patterns: [
      "^text-gray-\\d+$",
      "^bg-gray-\\d+$",
      "^shadow-(sm|md|lg|xl)$",
      "^rounded-(none|sm|md)$",
      "^font-(serif|mono|normal|light|thin)$",
    ],
    reasons: {
      "text-gray-*": "Dopamine Design never uses gray text — use colored or #1a1a2e",
      "bg-gray-*": "Replace gray surfaces with tinted pastels (pink-50, purple-50)",
      "shadow-sm": "Use colored shadows only (pink, purple, blue glows)",
      "rounded-sm": "Minimum radius is rounded-2xl; buttons must be rounded-full",
      "font-serif": "Sans-serif only (Inter preferred)",
      "font-normal": "Minimum weight is font-semibold for body, font-black for headings",
    },
  },

  required: {
    button: [
      "rounded-full",
      "font-bold",
      "shadow-[0_8px_30px_rgba(255,0,110,0.4)]",
      "hover:scale-105",
      "active:scale-95",
      "transition-all duration-300",
    ],
    card: [
      "rounded-3xl",
    ],
    input: [
      "rounded-2xl",
      "border-2",
      "focus:outline-none",
    ],
  },
});
