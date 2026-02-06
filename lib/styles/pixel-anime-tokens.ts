// Pixel Anime Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const pixelAnimeTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-[#1a1040]",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[2px_2px_0px_#1a1040]",
    md: "shadow-[4px_4px_0px_#1a1040]",
    lg: "shadow-[6px_6px_0px_#1a1040]",
    none: "shadow-none",
    hover: "hover:shadow-[6px_6px_0px_#1a1040]",
    focus: "focus:shadow-[2px_2px_0px_#4a90d9]",
    colored: {
      blue: "shadow-[4px_4px_0px_#4a90d9]",
      red: "shadow-[4px_4px_0px_#ff6b6b]",
      gold: "shadow-[4px_4px_0px_#ffd93d]",
    },
  },

  interaction: {
    hoverTranslate: "hover:translate-x-[2px] hover:translate-y-[2px]",
    transition: "transition-all duration-150 ease-linear",
    active: "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
  },

  typography: {
    heading: "font-mono font-bold uppercase tracking-wider",
    body: "font-mono text-[#e0e0ff]/80",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-lg md:text-xl",
      body: "text-xs md:text-sm",
      small: "text-[10px] md:text-xs",
    },
  },

  spacing: {
    section: "py-12 md:py-20 lg:py-28",
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
      primary: "bg-[#2d1b69]",
      secondary: "bg-[#1a1040]",
      accent: ["bg-[#4a90d9]", "bg-[#ff6b6b]", "bg-[#ffd93d]", "bg-[#50c878]"],
    },
    text: {
      primary: "text-[#e0e0ff]",
      secondary: "text-[#ffd93d]",
      muted: "text-[#e0e0ff]/50",
    },
    button: {
      primary: "bg-[#4a90d9] text-white shadow-[4px_4px_0px_#1a1040]",
      secondary: "bg-[#ff6b6b] text-white shadow-[4px_4px_0px_#1a1040]",
      danger: "bg-[#ff6b6b] text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full",
      "bg-gradient-to-r", "bg-gradient-to-b", "bg-gradient-to-br",
      "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl",
      "backdrop-blur", "backdrop-blur-sm", "backdrop-blur-md",
      "font-serif",
    ],
    patterns: [
      "^rounded-(?:lg|xl|2xl|full)$",
      "^bg-gradient-",
      "^shadow-(?:sm|md|lg|xl)$",
      "^backdrop-blur",
      "^font-serif$",
    ],
    reasons: {
      "rounded-lg": "Pixel Anime uses sharp corners only for pixel aesthetic",
      "bg-gradient-to-r": "Pixel Anime uses flat solid colors, no smooth gradients",
      "shadow-md": "Pixel Anime uses hard offset shadows only",
      "backdrop-blur": "Pixel Anime avoids blur effects for crisp pixel look",
    },
  },

  required: {
    button: [
      "font-mono font-bold uppercase",
      "border-2 border-[#1a1040]",
      "shadow-[4px_4px_0px_#1a1040]",
      "transition-all duration-150 ease-linear",
    ],
    card: [
      "bg-[#2d1b69]",
      "border-2 border-[#1a1040]",
      "shadow-[4px_4px_0px_#1a1040]",
    ],
    input: [
      "bg-[#1a1040]",
      "border-2 border-[#4a90d9]",
      "font-mono",
      "focus:outline-none",
    ],
  },
};
