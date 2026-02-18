// Constructivism Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const constructivismTokens = createStyleTokens({
  border: {
    width: "border-4",
    color: "border-[#1a1a1a]",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[2px_2px_0_#1a1a1a]",
    md: "shadow-[4px_4px_0_#1a1a1a]",
    lg: "shadow-[6px_6px_0_#1a1a1a]",
    none: "shadow-none",
    hover: "hover:shadow-[2px_2px_0_#1a1a1a]",
    focus: "focus:shadow-[0_0_0_2px_#cc0000]",
    colored: {
      red: "shadow-[4px_4px_0_#cc0000]",
      gold: "shadow-[4px_4px_0_#d4a843]",
    },
  },

  interaction: {
    hoverOpacity: "hover:opacity-95",
    transition: "transition-all duration-150",
    active: "active:translate-x-[4px] active:translate-y-[4px]",
  },

  typography: {
    heading: "font-sans font-black uppercase tracking-widest",
    body: "font-sans font-bold",
    mono: "font-mono font-bold",
    sizes: {
      hero: "text-6xl md:text-8xl lg:text-9xl",
      h1: "text-4xl md:text-6xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-20 lg:py-28",
    container: "px-6 md:px-12 lg:px-16",
    card: "p-0",
    gap: {
      sm: "gap-2 md:gap-3",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f2e8d5]",
      secondary: "bg-[#cc0000]",
      accent: ["bg-[#1a1a1a]", "bg-[#d4a843]", "bg-[#8b4513]"],
    },
    text: {
      primary: "text-[#1a1a1a]",
      secondary: "text-[#f2e8d5]",
      muted: "text-[#8b4513]",
    },
    button: {
      primary: "bg-[#cc0000] text-[#f2e8d5]",
      secondary: "bg-[#1a1a1a] text-[#f2e8d5]",
      danger: "bg-[#cc0000] text-[#f2e8d5] border-4 border-[#1a1a1a]",
    },
  },

  forbidden: {
    classes: [
      "font-serif",
      "font-light", "font-normal", "font-medium",
      "rounded-sm", "rounded", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full",
      "shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl",
      "bg-gradient-to-r", "bg-gradient-to-l", "bg-gradient-to-b", "bg-gradient-to-t",
      "italic",
    ],
    patterns: [
      "^font-(?:serif|light|normal|medium)$",
      "^rounded-(?!none)",
      "^shadow-(?:sm|md|lg|xl|2xl)$",
      "^bg-gradient-",
      "^italic$",
    ],
    reasons: {
      "font-serif": "Constructivism uses bold sans-serif industrial typography (font-sans font-black)",
      "rounded-lg": "Constructivism demands sharp geometric edges (rounded-none)",
      "shadow-md": "Constructivism uses hard offset shadows, not soft diffused ones",
      "bg-gradient-to-r": "Constructivism uses flat solid color blocks, no gradients",
      "font-light": "Constructivism requires heavy bold weights for propaganda impact",
    },
  },

  required: {
    button: [
      "rounded-none",
      "border-4 border-[#1a1a1a]",
      "font-sans font-black uppercase tracking-widest",
      "shadow-[4px_4px_0_#1a1a1a]",
      "transition-all duration-150",
    ],
    card: [
      "rounded-none",
      "border-4 border-[#1a1a1a]",
      "shadow-[6px_6px_0_#1a1a1a]",
      "overflow-hidden",
    ],
    input: [
      "rounded-none",
      "border-4 border-[#1a1a1a]",
      "bg-[#f2e8d5]",
      "text-[#1a1a1a]",
      "font-sans font-bold uppercase tracking-wider",
      "focus:border-[#cc0000]",
      "focus:outline-none",
    ],
  },
});
