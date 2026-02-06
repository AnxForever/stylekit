// Neo-Brutalist Soft Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const neoBrutalistSoftTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-gray-800",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]",
    md: "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]",
    lg: "shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]",
    none: "shadow-none",
    hover: "hover:shadow-none",
    focus: "focus:shadow-[4px_4px_0px_0px_rgba(56,189,248,0.3)]",
    colored: {
      pink: "shadow-[4px_4px_0px_0px_rgba(244,114,182,0.4)]",
      lime: "shadow-[4px_4px_0px_0px_rgba(163,230,53,0.4)]",
      sky: "shadow-[4px_4px_0px_0px_rgba(56,189,248,0.4)]",
      amber: "shadow-[4px_4px_0px_0px_rgba(251,191,36,0.4)]",
    },
  },

  interaction: {
    hoverTranslate: "hover:translate-x-[2px] hover:translate-y-[2px]",
    transition: "transition-all duration-300",
    active: "active:translate-x-[3px] active:translate-y-[3px]",
  },

  typography: {
    heading: "font-bold tracking-tight",
    body: "font-mono",
    mono: "font-mono",
    sizes: {
      hero: "text-3xl md:text-5xl lg:text-7xl",
      h1: "text-3xl md:text-4xl",
      h2: "text-xl md:text-2xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-10 md:py-16 lg:py-24",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f5f5f5]",
      secondary: "bg-white",
      accent: ["bg-[#f472b6]", "bg-[#a3e635]", "bg-[#38bdf8]", "bg-[#fbbf24]"],
    },
    text: {
      primary: "text-gray-800",
      secondary: "text-white",
      muted: "text-gray-600",
    },
    button: {
      primary: "bg-pink-400 text-white",
      secondary: "bg-gray-50 text-gray-800",
      danger: "bg-red-400 text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full",
      "border-black",
      "shadow-sm", "shadow", "shadow-md", "shadow-lg",
      "bg-gradient-to-r", "bg-gradient-to-b",
      "bg-black", "text-black",
      "font-black",
      "backdrop-blur",
    ],
    patterns: [
      "^rounded-(?:sm|md|lg|xl|2xl|3xl|full)$",
      "^shadow-(?:sm|md|lg|xl|2xl)$",
      "^bg-gradient-",
      "^backdrop-blur",
    ],
    reasons: {
      "rounded-lg": "Neo-Brutalist Soft uses sharp corners only (rounded-none)",
      "shadow-md": "Neo-Brutalist Soft uses hard-edge offset shadows with semi-transparency, not blurred",
      "border-black": "Neo-Brutalist Soft uses border-gray-800, not pure black",
      "bg-black": "Neo-Brutalist Soft uses softer tones (gray-800), not pure black",
      "font-black": "Neo-Brutalist Soft uses font-bold, not font-black (softer emphasis)",
    },
  },

  required: {
    button: [
      "rounded-none",
      "border-2 border-gray-800",
      "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]",
      "hover:shadow-none",
      "hover:translate-x-[2px] hover:translate-y-[2px]",
      "transition-all",
      "font-bold",
    ],
    card: [
      "rounded-none",
      "border-2 border-gray-800",
      "bg-white",
      "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)]",
    ],
    input: [
      "rounded-none",
      "border-2 border-gray-800",
      "bg-gray-50",
      "font-mono",
      "text-gray-800",
      "focus:outline-none",
      "focus:shadow-[4px_4px_0px_0px_rgba(56,189,248,0.3)]",
      "transition-shadow",
    ],
  },
};
