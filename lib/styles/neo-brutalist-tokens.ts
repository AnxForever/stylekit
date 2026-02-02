// Neo-Brutalist Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const neoBrutalistTokens: StyleTokens = {
  border: {
    width: "border-2 md:border-4",
    color: "border-black",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    md: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    lg: "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
    none: "shadow-none",
    hover: "hover:shadow-none",
    focus: "focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    colored: {
      pink: "shadow-[4px_4px_0px_0px_rgba(255,0,110,1)] md:shadow-[8px_8px_0px_0px_rgba(255,0,110,1)]",
      green: "shadow-[4px_4px_0px_0px_rgba(204,255,0,1)] md:shadow-[8px_8px_0px_0px_rgba(204,255,0,1)]",
      blue: "shadow-[4px_4px_0px_0px_rgba(0,217,255,1)] md:shadow-[8px_8px_0px_0px_rgba(0,217,255,1)]",
    },
  },

  interaction: {
    hoverTranslate: "hover:translate-x-[2px] hover:translate-y-[2px] md:hover:translate-x-1 md:hover:translate-y-1",
    transition: "transition-all duration-200",
    active: "active:translate-x-[4px] active:translate-y-[4px]",
  },

  typography: {
    heading: "font-black tracking-tight",
    body: "font-mono",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-8xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-24 lg:py-32",
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
      primary: "bg-white",
      secondary: "bg-black",
      accent: ["bg-[#ff006e]", "bg-[#ccff00]", "bg-[#00d9ff]", "bg-[#ff9500]"],
    },
    text: {
      primary: "text-black",
      secondary: "text-white",
      muted: "text-gray-700",
    },
    button: {
      primary: "bg-[#ff006e] text-white",
      secondary: "bg-black text-white",
      danger: "bg-red-500 text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-sm", "rounded", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl",
      "shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl",
      "border-gray-100", "border-gray-200", "border-gray-300", "border-gray-400", "border-gray-500",
      "border-slate-100", "border-slate-200", "border-slate-300", "border-slate-400", "border-slate-500",
      "opacity-50", "opacity-75",
    ],
    patterns: [
      "^rounded-(?!none)",           // Any rounded except rounded-none
      "^shadow-(?!\\[|none)",        // Any shadow except [...] or none
      "^bg-gradient-",               // Any gradient
      "^border-gray-",               // Any gray border
      "^border-slate-",              // Any slate border
    ],
    reasons: {
      "rounded-lg": "Neo-Brutalist uses sharp corners only (rounded-none)",
      "shadow-lg": "Neo-Brutalist uses hard-edge shadows only (shadow-[Xpx_Xpx_0px_0px_...])",
      "bg-gradient-to-r": "Neo-Brutalist uses solid colors, no gradients",
      "border-gray-300": "Neo-Brutalist uses pure black borders (border-black)",
    },
  },

  required: {
    button: [
      "rounded-none",
      "border-2 md:border-4",
      "border-black",
      "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
      "hover:shadow-none",
      "hover:translate-x-[2px] hover:translate-y-[2px]",
      "transition-all duration-200",
      "font-black",
    ],
    card: [
      "rounded-none",
      "border-2 md:border-4",
      "border-black",
      "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
      "bg-white",
    ],
    input: [
      "rounded-none",
      "border-2 md:border-4",
      "border-black",
      "font-mono",
      "focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
      "focus:outline-none",
    ],
  },
};
