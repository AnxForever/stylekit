// Graffiti Street Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const graffitiStreetTokens = createStyleTokens({
  border: {
    width: "border-4",
    color: "border-[#ff2d55]",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[3px_3px_0px_#00e5ff]",
    md: "shadow-[4px_4px_0px_#00e5ff]",
    lg: "shadow-[6px_6px_0px_#00e5ff]",
    none: "shadow-none",
    hover: "hover:shadow-[2px_2px_0px_#00e5ff]",
    focus: "focus:shadow-[0_0_12px_rgba(0,229,255,0.3)]",
    colored: {
      red: "shadow-[4px_4px_0px_#ff2d55]",
      cyan: "shadow-[4px_4px_0px_#00e5ff]",
      yellow: "shadow-[4px_4px_0px_#ffea00]",
      purple: "shadow-[4px_4px_0px_#b620e0]",
      orange: "shadow-[4px_4px_0px_#ff6d00]",
    },
  },

  interaction: {
    hoverTranslate:
      "hover:translate-x-[2px] hover:translate-y-[2px]",
    transition: "transition-all duration-150",
    active:
      "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
  },

  typography: {
    heading: "font-black uppercase tracking-wider",
    body: "font-bold",
    mono: "font-mono font-bold uppercase tracking-widest",
    sizes: {
      hero: "text-7xl md:text-9xl",
      h1: "text-5xl md:text-7xl",
      h2: "text-3xl md:text-5xl",
      h3: "text-2xl md:text-3xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-12 md:py-20 lg:py-28",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#1c1c1e]",
      secondary: "bg-[#ff2d55]",
      accent: [
        "bg-[#00e5ff]",
        "bg-[#ffea00]",
        "bg-[#b620e0]",
        "bg-[#ff6d00]",
      ],
    },
    text: {
      primary: "text-white",
      secondary: "text-[#00e5ff]",
      muted: "text-white/60",
    },
    button: {
      primary:
        "bg-[#ff2d55] text-white border-4 border-[#1c1c1e] shadow-[4px_4px_0px_#00e5ff]",
      secondary:
        "bg-transparent text-[#ffea00] border-4 border-[#ffea00] shadow-[4px_4px_0px_#b620e0]",
      danger:
        "bg-[#ff6d00] text-white border-4 border-[#1c1c1e] shadow-[4px_4px_0px_#ff2d55]",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg",
      "rounded-xl",
      "rounded-2xl",
      "rounded-full",
      "font-light",
      "font-thin",
      "font-normal",
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
      "backdrop-blur",
      "backdrop-blur-sm",
      "backdrop-blur-md",
    ],
    patterns: [
      "^rounded-(?:lg|xl|2xl|3xl|full)$",
      "^font-(?:light|thin|normal)$",
      "^shadow-(?:sm|md|lg|xl)$",
      "^backdrop-blur",
      "^(?:bg|text)-(?:pink|blue|green)-[1-3]00$",
    ],
    reasons: {
      "rounded-lg": "Graffiti uses sharp edges (rounded-none), never soft corners",
      "font-light": "Graffiti uses font-black/font-bold exclusively, never thin fonts",
      "shadow-md": "Graffiti uses hard offset shadows (Npx_Npx_0px), not soft blur",
      "backdrop-blur": "Graffiti is opaque and raw, not translucent glass",
    },
  },

  required: {
    button: [
      "rounded-none",
      "font-black uppercase tracking-wider",
      "border-4",
      "transition-all duration-150",
    ],
    card: [
      "rounded-none",
      "bg-[#1c1c1e]",
      "border-4",
    ],
    input: [
      "rounded-none",
      "border-4",
      "bg-[#1c1c1e]/80",
      "text-white",
      "font-bold uppercase",
      "focus:outline-none",
    ],
  },
});
