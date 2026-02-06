// Glitch Art Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const glitchArtTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#00ffff]/20",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[2px_0_#ff00ff,-2px_0_#ffff00]",
    md: "shadow-[3px_0_#ff00ff,-3px_0_#ffff00]",
    lg: "shadow-[6px_0_#ff00ff,-6px_0_#ffff00]",
    none: "shadow-none",
    hover: "hover:shadow-[6px_0_#ff00ff,-6px_0_#ffff00]",
    focus: "focus:shadow-[0_0_10px_#00ffff30,3px_0_#ff00ff20,-3px_0_#ffff0020]",
    colored: {
      cyan: "shadow-[0_0_15px_#00ffff20]",
      magenta: "shadow-[0_0_15px_#ff00ff20]",
      yellow: "shadow-[0_0_15px_#ffff0020]",
    },
  },

  interaction: {
    hoverTranslate: "hover:translate-x-[1px] hover:translate-y-[1px]",
    transition: "transition-all duration-100 ease-in-out",
    active: "active:translate-x-[1px] active:translate-y-[1px]",
  },

  typography: {
    heading: "font-mono font-bold uppercase tracking-widest",
    body: "font-mono",
    mono: "font-mono",
    sizes: {
      hero: "text-6xl md:text-8xl lg:text-9xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-20 lg:py-28",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-5 md:p-8",
    gap: {
      sm: "gap-1 md:gap-2",
      md: "gap-2 md:gap-4",
      lg: "gap-4 md:gap-6",
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
      muted: "text-[#ffffff]/25",
    },
    button: {
      primary: "bg-[#00ffff] text-[#0a0a0a] shadow-[3px_0_#ff00ff,-3px_0_#ffff00]",
      secondary: "bg-[#0a0a0a] text-[#00ffff] border-[#00ffff] shadow-[3px_0_#ff00ff,-3px_0_#ffff00]",
      danger: "bg-[#ff00ff] text-white shadow-[3px_0_#00ffff,-3px_0_#ffff00]",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full",
      "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl",
      "font-serif", "font-sans",
      "bg-pink-50", "bg-pink-100", "bg-rose-50",
      "text-pink-400", "text-rose-400",
      "backdrop-blur-md", "backdrop-blur-sm",
    ],
    patterns: [
      "^rounded-(?:lg|xl|2xl|full)$",
      "^shadow-(?:sm|md|lg|xl)$",
      "^font-(?:serif|sans)$",
      "^bg-(?:pink|rose)-",
      "^text-(?:green|brown|amber)-",
      "^backdrop-blur-",
    ],
    reasons: {
      "rounded-lg": "Glitch Art uses sharp edges (rounded-none only) for digital corruption aesthetic",
      "shadow-sm": "Glitch Art uses RGB split shadows only, not soft box shadows",
      "font-serif": "Glitch Art uses monospace fonts exclusively for terminal aesthetic",
      "font-sans": "Glitch Art uses monospace fonts exclusively for terminal aesthetic",
      "bg-pink-50": "Glitch Art uses pure black backgrounds with neon CMY accents only",
      "backdrop-blur-md": "Glitch Art avoids frosted glass effects; uses scan lines and noise instead",
    },
  },

  required: {
    button: [
      "rounded-none",
      "font-mono font-bold uppercase tracking-widest",
      "shadow-[3px_0_#ff00ff,-3px_0_#ffff00]",
      "transition-all duration-100 ease-in-out",
    ],
    card: [
      "rounded-none",
      "bg-[#0a0a0a]",
      "border border-[#00ffff]/20",
    ],
    input: [
      "rounded-none",
      "border border-[#00ffff]/30",
      "bg-[#0a0a0a]",
      "font-mono",
      "text-[#00ffff]",
      "focus:outline-none",
    ],
  },
};
