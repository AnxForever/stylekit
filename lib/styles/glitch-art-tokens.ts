// Glitch Art Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const glitchArtTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#00ffff]/20",
    radius: "rounded-sm",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[1px_0_#ff00ff,-1px_0_#ffff00]",
    md: "shadow-[2px_0_#ff00ff,-2px_0_#ffff00]",
    lg: "shadow-[4px_0_#ff00ff,-4px_0_#ffff00]",
    none: "shadow-none",
    hover: "hover:shadow-[4px_0_#ff00ff,-4px_0_#ffff00]",
    focus: "focus:shadow-[0_0_10px_#00ffff40]",
    colored: {
      cyan: "shadow-[0_0_15px_#00ffff20]",
      magenta: "shadow-[0_0_15px_#ff00ff20]",
      yellow: "shadow-[0_0_15px_#ffff0020]",
    },
  },

  interaction: {
    hoverTranslate: "hover:translate-x-[1px] hover:translate-y-[1px]",
    transition: "transition-all duration-150 ease-in-out",
    active: "active:translate-x-[1px] active:translate-y-[1px]",
  },

  typography: {
    heading: "font-mono font-bold uppercase tracking-widest",
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
      primary: "bg-[#0a0a0a]",
      secondary: "bg-[#111111]",
      accent: ["bg-[#00ffff]", "bg-[#ff00ff]", "bg-[#ffff00]"],
    },
    text: {
      primary: "text-[#00ffff]",
      secondary: "text-[#ff00ff]",
      muted: "text-[#ffffff]/40",
    },
    button: {
      primary: "bg-[#00ffff] text-[#0a0a0a] shadow-[2px_0_#ff00ff,-2px_0_#ffff00]",
      secondary: "bg-[#0a0a0a] text-[#00ffff] border-[#00ffff] shadow-[2px_0_#ff00ff,-2px_0_#ffff00]",
      danger: "bg-[#ff00ff] text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full",
      "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl",
      "font-serif",
      "bg-pink-50", "bg-pink-100", "bg-rose-50",
      "text-pink-400", "text-rose-400",
    ],
    patterns: [
      "^rounded-(?:lg|xl|2xl|full)$",
      "^shadow-(?:sm|md|lg|xl)$",
      "^font-serif$",
      "^bg-(?:pink|rose)-",
      "^text-(?:green|brown|amber)-",
    ],
    reasons: {
      "rounded-lg": "Glitch Art uses sharp edges (rounded-sm only) for digital aesthetic",
      "shadow-sm": "Glitch Art uses RGB split shadows, not soft ones",
      "font-serif": "Glitch Art uses monospace fonts exclusively",
      "bg-pink-50": "Glitch Art uses dark backgrounds with neon accents, not pastels",
    },
  },

  required: {
    button: [
      "rounded-sm",
      "font-mono font-bold uppercase",
      "shadow-[2px_0_#ff00ff,-2px_0_#ffff00]",
      "transition-all duration-150 ease-in-out",
    ],
    card: [
      "rounded-sm",
      "bg-[#0a0a0a]",
      "border border-[#00ffff]/20",
    ],
    input: [
      "rounded-sm",
      "border border-[#00ffff]/30",
      "bg-[#0a0a0a]",
      "font-mono",
      "text-[#00ffff]",
      "focus:outline-none",
    ],
  },
};
