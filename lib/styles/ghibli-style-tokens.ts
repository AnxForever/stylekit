// Ghibli Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const ghibliStyleTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#7cb9a8]/40",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_8px_rgba(124,185,168,0.15)]",
    md: "shadow-[0_4px_16px_rgba(124,185,168,0.2)]",
    lg: "shadow-[0_8px_32px_rgba(124,185,168,0.25)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_8px_24px_rgba(124,185,168,0.3)]",
    focus: "focus:shadow-[0_4px_16px_rgba(124,185,168,0.25)]",
    colored: {
      sage: "shadow-[0_4px_16px_rgba(124,185,168,0.25)]",
      cream: "shadow-[0_4px_16px_rgba(244,228,188,0.3)]",
      brown: "shadow-[0_4px_16px_rgba(139,115,85,0.2)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-[1.02]",
    transition: "transition-all duration-300 ease-out",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-sans font-semibold tracking-normal",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-3xl md:text-5xl lg:text-6xl",
      h1: "text-2xl md:text-4xl",
      h2: "text-xl md:text-3xl",
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
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f4e4bc]",
      secondary: "bg-[#7cb9a8]",
      accent: ["bg-[#7cb9a8]", "bg-[#e8c07a]", "bg-[#d4a574]", "bg-[#8fb996]"],
    },
    text: {
      primary: "text-[#3a3226]",
      secondary: "text-[#5a4f42]",
      muted: "text-[#8a7a6a]",
    },
    button: {
      primary: "bg-[#7cb9a8] text-white",
      secondary: "bg-[#f4e4bc] text-[#3a3226] border border-[#7cb9a8]/40",
      danger: "bg-[#c75050] text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "border-black", "border-2", "border-4",
      "shadow-[2px_2px_0px", "shadow-[4px_4px_0px", "shadow-[8px_8px_0px",
      "bg-[#ff006e]", "bg-[#ff71ce]", "bg-[#01cdfe]", "bg-[#00ff00]",
      "text-[#ff006e]", "text-[#ff71ce]",
      "font-black",
      "bg-black", "bg-[#1a1a2e]",
    ],
    patterns: [
      "^rounded-none$",
      "^shadow-\\[\\d+px_\\d+px_0px",
      "^bg-(?:black|\\[#(?:ff006e|ff71ce|01cdfe|00ff00)\\])",
      "^border-(?:black|4)$",
    ],
    reasons: {
      "rounded-none": "Ghibli style uses soft rounded shapes (rounded-2xl) for a warm feel",
      "border-black": "Ghibli style uses subtle earth-toned borders, not harsh black",
      "shadow-[4px_4px_0px": "Ghibli style uses soft diffused shadows, not hard-edge",
      "bg-[#ff71ce]": "Ghibli style uses warm earth tones (sage, cream), not neon colors",
    },
  },

  required: {
    button: [
      "rounded-2xl",
      "shadow-[0_4px_16px_rgba(124,185,168,0.2)]",
      "hover:scale-[1.02]",
      "transition-all duration-300 ease-out",
      "font-semibold",
    ],
    card: [
      "rounded-2xl",
      "border border-[#7cb9a8]/40",
      "shadow-[0_4px_16px_rgba(124,185,168,0.2)]",
      "bg-[#f4e4bc]",
    ],
    input: [
      "rounded-2xl",
      "border border-[#7cb9a8]/40",
      "bg-[#faf5eb]",
      "text-[#3a3226]",
      "focus:shadow-[0_4px_16px_rgba(124,185,168,0.25)]",
      "focus:outline-none",
    ],
  },
};
