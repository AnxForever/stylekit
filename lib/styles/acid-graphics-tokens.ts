// Acid Graphics Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const acidGraphicsTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-[#39ff14]",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[2px_2px_0px_#a020f0]",
    md: "shadow-[4px_4px_0px_#a020f0]",
    lg: "shadow-[5px_5px_0px_#a020f0]",
    none: "shadow-none",
    hover: "hover:shadow-[8px_8px_0px_#a020f0]",
    focus: "focus:shadow-[3px_3px_0px_#a020f0]",
    colored: {
      green: "shadow-[4px_4px_0px_#39ff14]",
      purple: "shadow-[4px_4px_0px_#a020f0]",
      pink: "shadow-[4px_4px_0px_#ff6ec7]",
      yellow: "shadow-[4px_4px_0px_#e6ff00]",
    },
  },

  interaction: {
    hoverTranslate: "hover:translate-x-[2px] hover:translate-y-[2px]",
    transition: "transition-all duration-150 ease-out",
    active: "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
  },

  typography: {
    heading: "font-mono font-black uppercase tracking-widest",
    body: "font-mono",
    mono: "font-mono",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-9xl",
      h1: "text-4xl md:text-6xl",
      h2: "text-3xl md:text-5xl",
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
      primary: "bg-[#0a0a0a]",
      secondary: "bg-[#111111]",
      accent: ["bg-[#39ff14]", "bg-[#e6ff00]", "bg-[#a020f0]", "bg-[#ff6ec7]"],
    },
    text: {
      primary: "text-[#39ff14]",
      secondary: "text-[#a020f0]",
      muted: "text-[#39ff14]/50",
    },
    button: {
      primary: "bg-[#39ff14] text-[#0a0a0a] shadow-[4px_4px_0px_#a020f0]",
      secondary: "bg-[#a020f0] text-[#39ff14] shadow-[4px_4px_0px_#e6ff00]",
      danger: "bg-[#ff6ec7] text-[#0a0a0a]",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full",
      "bg-gradient-to-r", "bg-gradient-to-b", "bg-gradient-to-br",
      "shadow-md", "shadow-lg", "shadow-xl",
      "backdrop-blur",
      "font-serif",
      "rounded-md",
    ],
    patterns: [
      "^rounded-(?:md|lg|xl|2xl|full)$",
      "^bg-gradient-",
      "^shadow-(?:md|lg|xl)$",
      "^backdrop-blur",
      "^font-serif$",
    ],
    reasons: {
      "rounded-lg": "Acid Graphics uses sharp edges only (rounded-none)",
      "bg-gradient-to-r": "Acid Graphics uses flat fluorescent colors, no gradients",
      "shadow-md": "Acid Graphics uses hard offset shadows, not soft ones",
      "backdrop-blur": "Acid Graphics is opaque and harsh, no blur/glass effects",
      "font-serif": "Acid Graphics uses mono/sans-serif only",
    },
  },

  required: {
    button: [
      "rounded-none",
      "font-mono font-bold uppercase",
      "border-2",
      "transition-all duration-150 ease-out",
    ],
    card: [
      "rounded-none",
      "bg-[#0a0a0a]",
      "border-2 border-[#39ff14]",
      "shadow-[5px_5px_0px_#a020f0]",
    ],
    input: [
      "rounded-none",
      "border-2 border-[#39ff14]/60",
      "bg-[#0a0a0a]",
      "font-mono",
      "focus:outline-none",
    ],
  },
};
