// Cubism Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const cubismTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-[#5c4033]",
    radius: "rounded-sm",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[3px_3px_0px_#5c4033]",
    md: "shadow-[6px_6px_0px_#5c4033]",
    lg: "shadow-[8px_8px_0px_#5c4033]",
    none: "shadow-none",
    hover: "hover:shadow-[3px_3px_0px_#8b7355]",
    focus: "focus:shadow-[3px_3px_0px_#9b3d25]",
    colored: {
      sienna: "shadow-[6px_6px_0px_#5c4033]",
      khaki: "shadow-[6px_6px_0px_#8b7355]",
      terracotta: "shadow-[6px_6px_0px_#9b3d25]",
    },
  },

  interaction: {
    hoverScale: "hover:translate-x-[2px] hover:translate-y-[2px]",
    transition: "transition-all duration-150",
    active: "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
  },

  typography: {
    heading: "font-bold uppercase tracking-widest",
    body: "font-sans text-[#5c4033]/80",
    mono: "font-mono text-sm",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-8xl",
      h1: "text-4xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-20 lg:py-28",
    container: "px-6 md:px-12 lg:px-16",
    card: "p-5 md:p-6",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#e8dcc8]",
      secondary: "bg-[#ddd0b8]",
      accent: ["bg-[#5c4033]", "bg-[#3d5c6e]", "bg-[#9b3d25]"],
    },
    text: {
      primary: "text-[#5c4033]",
      secondary: "text-[#8b7355]",
      muted: "text-[#5c4033]/50",
    },
    button: {
      primary: "bg-[#5c4033] text-[#e8dcc8] border-2 border-[#8b7355]",
      secondary: "bg-[#e8dcc8] text-[#5c4033] border-2 border-[#5c4033]",
    },
  },

  forbidden: {
    classes: [
      "rounded-2xl", "rounded-3xl", "rounded-full", "rounded-xl",
      "shadow-sm", "shadow-md", "shadow-lg",
      "bg-gradient-to-r", "bg-gradient-to-br",
      "text-[#ff00ff]", "text-[#00ffff]",
      "blur-sm", "blur-md", "blur-lg", "backdrop-blur",
    ],
    patterns: [
      "^rounded-(?:xl|2xl|3xl|full)",
      "^shadow-(?:sm|md|lg|xl)$",
      "^bg-gradient",
      "^blur-",
      "^backdrop-blur",
    ],
    reasons: {
      "rounded-2xl": "Cubism uses sharp angles and minimal rounding (rounded-sm only)",
      "rounded-full": "Cubism rejects organic curves; use angular shapes",
      "shadow-md": "Cubism uses hard-edge shadows (shadow-[Npx_Npx_0px_color]), not soft shadows",
      "bg-gradient-to-r": "Cubism uses flat, opaque color planes without gradients",
      "blur-sm": "Cubism uses crisp, hard edges; blur effects are forbidden",
    },
  },

  required: {
    button: [
      "rounded-sm",
      "font-bold uppercase tracking-widest",
      "border-2",
      "shadow-[4px_4px_0px_#8b7355]",
      "transition-all duration-150",
    ],
    card: [
      "bg-[#e8dcc8]",
      "border-2 border-[#5c4033]",
      "rounded-sm",
      "shadow-[6px_6px_0px_#5c4033]",
    ],
    input: [
      "bg-[#e8dcc8]",
      "border-2 border-[#5c4033]/40",
      "rounded-sm",
      "text-[#5c4033]",
      "focus:border-[#9b3d25]",
      "focus:outline-none",
    ],
  },
});
