// Comic Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const comicStyleTokens: StyleTokens = {
  border: {
    width: "border-4",
    color: "border-[#1a1a1a]",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] md:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]",
    md: "shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)]",
    lg: "shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] md:shadow-[10px_10px_0px_0px_rgba(26,26,26,1)]",
    none: "shadow-none",
    hover: "hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]",
    focus: "focus:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]",
    colored: {
      red: "shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]",
      blue: "shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]",
      yellow: "shadow-[4px_4px_0px_0px_rgba(250,204,21,1)]",
    },
  },

  interaction: {
    hoverTranslate: "hover:translate-x-[2px] hover:translate-y-[2px]",
    transition: "transition-all duration-150",
    active: "active:translate-x-[4px] active:translate-y-[4px]",
  },

  typography: {
    heading: "font-black uppercase tracking-wide",
    body: "font-sans font-bold",
    mono: "font-mono",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-8xl",
      h1: "text-4xl md:text-5xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-10 md:py-20 lg:py-28",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-2 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#fffef0]",
      secondary: "bg-[#1a1a1a]",
      accent: ["bg-[#ef4444]", "bg-[#3b82f6]", "bg-[#facc15]", "bg-[#22c55e]"],
    },
    text: {
      primary: "text-[#1a1a1a]",
      secondary: "text-white",
      muted: "text-[#4a4a4a]",
    },
    button: {
      primary: "bg-[#ef4444] text-white",
      secondary: "bg-[#3b82f6] text-white",
      danger: "bg-[#1a1a1a] text-white",
    },
  },

  forbidden: {
    classes: [
      "border", "border-[0.5px]",
      "border-gray-200", "border-gray-300", "border-slate-200",
      "shadow-sm", "shadow", "shadow-md",
      "text-gray-400", "text-gray-500", "text-gray-300",
      "bg-gray-50", "bg-gray-100", "bg-slate-50",
      "opacity-50", "opacity-60",
      "font-light", "font-normal",
    ],
    patterns: [
      "^border-(?:gray|slate)-",
      "^shadow-(?:sm|md|lg|xl)$",
      "^text-(?:gray|slate)-(?:[3-5])",
      "^bg-(?:gray|slate)-(?:[1-3])",
      "^font-(?:light|thin|normal)$",
    ],
    reasons: {
      "border-gray-200": "Comic style uses thick black ink borders (border-4 border-[#1a1a1a])",
      "shadow-md": "Comic style uses hard-edge offset shadows, not blurred",
      "text-gray-400": "Comic style uses bold high-contrast text, not subtle muted colors",
      "font-light": "Comic style uses bold/black font weights for impact",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "border-4 border-[#1a1a1a]",
      "shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]",
      "hover:translate-x-[2px] hover:translate-y-[2px]",
      "hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]",
      "transition-all duration-150",
      "font-black uppercase",
    ],
    card: [
      "rounded-lg",
      "border-4 border-[#1a1a1a]",
      "shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]",
      "bg-[#fffef0]",
    ],
    input: [
      "rounded-lg",
      "border-4 border-[#1a1a1a]",
      "font-bold",
      "focus:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]",
      "focus:outline-none",
    ],
  },
};
