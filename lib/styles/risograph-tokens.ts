// Risograph Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const risographTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-[#1a1a1a]",
    radius: "rounded-sm",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[2px_2px_0px_#ff6b9d]",
    md: "shadow-[3px_3px_0px_#ff6b9d]",
    lg: "shadow-[4px_4px_0px_#ff6b9d]",
    none: "shadow-none",
    hover: "hover:shadow-[6px_6px_0px_#ff6b9d]",
    focus: "focus:shadow-[2px_2px_0px_#ff6b9d]",
    colored: {
      pink: "shadow-[4px_4px_0px_#ff6b9d]",
      blue: "shadow-[4px_4px_0px_#2563eb]",
      orange: "shadow-[4px_4px_0px_#ff8a00]",
    },
  },

  interaction: {
    hoverTranslate: "hover:translate-x-[2px] hover:translate-y-[2px]",
    transition: "transition-all duration-200 ease-in-out",
    active: "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
  },

  typography: {
    heading: "font-mono font-bold uppercase tracking-wider",
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
    section: "py-12 md:py-20 lg:py-28",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-5 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#fffbf0]",
      secondary: "bg-[#f5f0e6]",
      accent: ["bg-[#ff6b9d]", "bg-[#2563eb]", "bg-[#ff8a00]", "bg-[#22c55e]"],
    },
    text: {
      primary: "text-[#1a1a1a]",
      secondary: "text-[#2563eb]",
      muted: "text-[#1a1a1a]/60",
    },
    button: {
      primary: "bg-[#ff6b9d] text-white shadow-[3px_3px_0px_#2563eb]",
      secondary: "bg-[#2563eb] text-white shadow-[3px_3px_0px_#ff6b9d]",
      danger: "bg-[#ff8a00] text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full",
      "bg-gradient-to-r", "bg-gradient-to-b", "bg-gradient-to-br",
      "shadow-md", "shadow-lg", "shadow-xl",
      "backdrop-blur",
      "bg-[#0a0a1a]", "bg-black",
    ],
    patterns: [
      "^rounded-(?:lg|xl|2xl|full)$",
      "^bg-gradient-",
      "^shadow-(?:md|lg|xl)$",
      "^backdrop-blur",
    ],
    reasons: {
      "rounded-lg": "Risograph uses minimal rounding (rounded-sm only) for a print-like feel",
      "bg-gradient-to-r": "Risograph uses flat solid colors, no gradients",
      "shadow-md": "Risograph uses hard offset shadows, not soft ones",
      "backdrop-blur": "Risograph style is flat and opaque, no blur/glass effects",
    },
  },

  required: {
    button: [
      "rounded-sm",
      "font-mono font-bold uppercase",
      "shadow-[3px_3px_0px_#2563eb]",
      "transition-all duration-200 ease-in-out",
    ],
    card: [
      "rounded-sm",
      "bg-[#fffbf0]",
      "border-2 border-[#1a1a1a]",
      "shadow-[4px_4px_0px_#ff6b9d]",
    ],
    input: [
      "rounded-sm",
      "border-2 border-[#1a1a1a]",
      "bg-[#fffbf0]",
      "font-mono",
      "focus:outline-none",
    ],
  },
};
