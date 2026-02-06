// Japanese Fresh Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const japaneseFreshTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#d4d4cf]",
    radius: "rounded-xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-[0_1px_3px_rgba(0,0,0,0.03)]",
    lg: "shadow-[0_2px_6px_rgba(0,0,0,0.04)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
    focus: "focus:shadow-[0_0_0_2px_rgba(100,181,246,0.08)]",
    colored: {
      blue: "shadow-[0_1px_4px_rgba(100,181,246,0.1)]",
      mint: "shadow-[0_1px_4px_rgba(152,216,200,0.1)]",
      pink: "shadow-[0_1px_4px_rgba(255,183,197,0.1)]",
    },
  },

  interaction: {
    hoverScale: "hover:brightness-[1.02]",
    hoverTranslate: "hover:-translate-y-px",
    transition: "transition-all duration-500 ease-in-out",
    active: "active:scale-[0.99]",
  },

  typography: {
    heading: "font-sans font-extralight text-[#4a5568] tracking-wide",
    body: "font-sans font-light text-[#6b7280] leading-relaxed",
    mono: "font-mono",
    sizes: {
      hero: "text-3xl md:text-5xl lg:text-6xl",
      h1: "text-2xl md:text-4xl",
      h2: "text-xl md:text-2xl",
      h3: "text-base md:text-lg",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-24 md:py-32 lg:py-40",
    container: "px-8 md:px-12 lg:px-20",
    card: "p-8 md:p-10",
    gap: {
      sm: "gap-4 md:gap-6",
      md: "gap-8 md:gap-12",
      lg: "gap-12 md:gap-20",
    },
  },

  colors: {
    background: {
      primary: "bg-[#fafaf8]",
      secondary: "bg-white",
      accent: ["bg-[#64b5f6]", "bg-[#98d8c8]", "bg-[#ffb7c5]", "bg-[#b8d4e3]"],
    },
    text: {
      primary: "text-[#4a5568]",
      secondary: "text-[#7a8a9e]",
      muted: "text-[#b0b8c4]",
    },
    button: {
      primary: "bg-[#64b5f6]/90 text-white",
      secondary: "bg-white text-[#7a8a9e] border-[#d4d4cf]",
      danger: "bg-[#ffb7c5]/80 text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-none", "rounded-sm",
      "border-2", "border-4",
      "font-bold", "font-black", "font-extrabold",
      "bg-[#0f0f1a]", "bg-black", "bg-[#1a1a1a]",
      "shadow-[0_0_", "text-[#ff006e]",
      "uppercase",
      "shadow-lg", "shadow-xl", "shadow-2xl",
      "tracking-widest",
    ],
    patterns: [
      "^rounded-(?:none|sm)$",
      "^border-[2-9]$",
      "^font-(?:bold|black|extrabold|semibold)$",
      "^bg-(?:black|\\[#0)",
      "^uppercase$",
      "^shadow-(?:lg|xl|2xl)$",
    ],
    reasons: {
      "rounded-none": "Japanese Fresh uses gentle curves inspired by natural forms, never sharp corners",
      "border-2": "Japanese Fresh uses only hairline borders (0.5-1px) for wabi-sabi delicacy",
      "font-bold": "Japanese Fresh uses light/extralight font weights to embody Ma and restraint",
      "bg-black": "Japanese Fresh uses warm off-white and natural tones only, darkness disrupts serenity",
      "uppercase": "Japanese Fresh avoids uppercase for a quieter, more contemplative reading experience",
      "shadow-lg": "Japanese Fresh avoids visible shadows; forms float in whitespace without weight",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "font-sans font-light",
      "border border-[#d4d4cf]/40",
      "transition-all duration-500 ease-in-out",
    ],
    card: [
      "bg-white",
      "rounded-xl",
      "border border-[#d4d4cf]/30",
    ],
    input: [
      "border-b border-[#d4d4cf]",
      "bg-transparent",
      "font-sans font-light",
      "focus:outline-none",
    ],
  },
};
