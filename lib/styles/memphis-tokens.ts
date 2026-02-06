// Memphis Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const memphisTokens: StyleTokens = {
  border: {
    width: "border-4",
    color: "border-black",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]",
    md: "shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    lg: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
    none: "shadow-none",
    hover: "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    focus: "focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]",
    colored: {
      coral: "shadow-[5px_5px_0px_0px_rgba(255,107,107,1)]",
      yellow: "shadow-[5px_5px_0px_0px_rgba(254,202,87,1)]",
      teal: "shadow-[5px_5px_0px_0px_rgba(72,219,251,1)]",
    },
  },

  interaction: {
    hoverTranslate: "hover:translate-x-[3px] hover:translate-y-[3px]",
    transition: "transition-all duration-200",
    active: "active:translate-x-[5px] active:translate-y-[5px]",
  },

  typography: {
    heading: "font-black tracking-tight",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-9xl",
      h1: "text-4xl md:text-6xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-24 lg:py-32",
    container: "px-4 md:px-8 lg:px-16",
    card: "p-5 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#fef9ef]",
      secondary: "bg-black",
      accent: ["bg-[#ff6b6b]", "bg-[#feca57]", "bg-[#48dbfb]", "bg-[#ff9ff3]"],
    },
    text: {
      primary: "text-black",
      secondary: "text-white",
      muted: "text-gray-600",
    },
    button: {
      primary: "bg-[#ff6b6b] text-black",
      secondary: "bg-[#feca57] text-black",
      danger: "bg-red-600 text-white",
    },
  },

  forbidden: {
    classes: [
      "border", "border-[0.5px]",
      "border-gray-200", "border-gray-300", "border-slate-200",
      "bg-gray-50", "bg-gray-100", "bg-slate-50",
      "text-gray-400", "text-gray-500",
      "shadow-sm", "shadow", "shadow-md",
      "opacity-50", "opacity-60",
    ],
    patterns: [
      "^border-(?:gray|slate)-",
      "^shadow-(?!\\[|none)",
      "^bg-(?:gray|slate)-(?:[1-3])",
      "^text-(?:gray|slate)-(?:[3-5])",
    ],
    reasons: {
      "border-gray-200": "Memphis uses thick black borders (border-4 border-black), not subtle grays",
      "shadow-md": "Memphis uses hard-edge offset shadows, not blurred shadows",
      "bg-gray-50": "Memphis uses bold vivid colors (coral, yellow, teal), not muted grays",
      "text-gray-400": "Memphis uses high-contrast text, not subtle muted text",
    },
  },

  required: {
    button: [
      "border-4",
      "border-black",
      "shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]",
      "hover:translate-x-[3px] hover:translate-y-[3px]",
      "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      "transition-all duration-200",
      "font-black",
    ],
    card: [
      "border-4",
      "border-black",
      "shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]",
      "bg-[#fef9ef]",
    ],
    input: [
      "border-4",
      "border-black",
      "font-sans",
      "focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]",
      "focus:outline-none",
    ],
  },
};
