// Medieval Manuscript Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const medievalManuscriptTokens = createStyleTokens({
  border: {
    width: "border-4",
    color: "border-[#c9a74e]",
    radius: "rounded-sm",
    style: "border-double",
  },

  shadow: {
    sm: "shadow-[1px_1px_0px_#3d2b1f]",
    md: "shadow-[2px_2px_0px_#3d2b1f]",
    lg: "shadow-[3px_3px_0px_#3d2b1f]",
    none: "shadow-none",
    hover: "hover:shadow-[1px_1px_0px_#3d2b1f]",
    focus: "focus:shadow-[0_0_8px_rgba(201,167,78,0.2)]",
  },

  interaction: {
    hoverTranslate:
      "hover:translate-x-[1px] hover:translate-y-[1px]",
    transition: "transition-all duration-300",
    active:
      "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  },

  typography: {
    heading: "font-serif font-bold uppercase tracking-wider",
    body: "font-serif leading-relaxed",
    mono: "font-serif text-xs italic tracking-wider",
    sizes: {
      hero: "text-6xl md:text-8xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-14 md:py-24 lg:py-32",
    container: "px-6 md:px-12 lg:px-16",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f0e6d0]",
      secondary: "bg-[#8b1a1a]",
      accent: [
        "bg-[#c9a74e]",
        "bg-[#2d4a2d]",
        "bg-[#3d2b1f]",
      ],
    },
    text: {
      primary: "text-[#3d2b1f]",
      secondary: "text-[#8b1a1a]",
      muted: "text-[#3d2b1f]/60",
    },
    button: {
      primary:
        "bg-[#8b1a1a] text-[#f0e6d0] border-4 border-double border-[#c9a74e] shadow-[2px_2px_0px_#3d2b1f]",
      secondary:
        "bg-[#2d4a2d] text-[#f0e6d0] border-4 border-double border-[#c9a74e] shadow-[2px_2px_0px_#3d2b1f]",
    },
  },

  forbidden: {
    classes: [
      "font-sans",
      "bg-black",
      "bg-white",
      "backdrop-blur",
      "backdrop-blur-sm",
      "backdrop-blur-md",
      "rounded-xl",
      "rounded-2xl",
      "rounded-full",
      "text-[#ff00ff]",
      "text-[#00ffff]",
      "bg-[#ff00ff]",
      "bg-[#00ffff]",
    ],
    patterns: [
      "^font-sans$",
      "^bg-(?:black|white)$",
      "^backdrop-blur",
      "^rounded-(?:xl|2xl|3xl|full)$",
      "^(?:text|bg)-\\[#(?:ff00ff|00ffff|00ff00)\\]$",
    ],
    reasons: {
      "font-sans": "Medieval Manuscript uses serif fonts exclusively for authenticity",
      "bg-black": "Medieval Manuscript uses warm parchment #f0e6d0, not cold black",
      "bg-white": "Medieval Manuscript uses parchment #f0e6d0, not sterile white",
      "backdrop-blur": "Medieval Manuscript is opaque parchment-based, not translucent",
      "rounded-xl": "Medieval Manuscript uses sharp or minimal rounding (rounded-sm)",
    },
  },

  required: {
    button: [
      "rounded-sm",
      "font-serif uppercase tracking-widest",
      "border-4 border-double border-[#c9a74e]",
      "transition-all duration-300",
    ],
    card: [
      "rounded-sm",
      "bg-[#f0e6d0]",
      "border-4 border-double border-[#c9a74e]",
    ],
    input: [
      "rounded-sm",
      "border-2 border-[#3d2b1f]/30",
      "bg-[#f0e6d0]/80",
      "text-[#3d2b1f]",
      "font-serif",
      "focus:border-[#c9a74e]",
      "focus:outline-none",
    ],
  },
});
