// Shoujo Manga Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const shoujoMangaTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#ffb7c5]/30",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_10px_#ffb7c520]",
    md: "shadow-[0_4px_15px_#ffb7c530]",
    lg: "shadow-[0_4px_20px_#ffb7c540]",
    none: "shadow-none",
    hover: "hover:shadow-[0_8px_30px_#ffb7c540]",
    focus: "focus:shadow-[0_0_12px_#ffb7c540]",
    colored: {
      pink: "shadow-[0_4px_15px_#ffb7c560]",
      lavender: "shadow-[0_4px_15px_#c4b5fd60]",
      gold: "shadow-[0_4px_15px_#fde68a60]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-105",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-sans font-bold",
    body: "font-sans leading-relaxed",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
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
      primary: "bg-[#fff5f7]",
      secondary: "bg-white",
      accent: ["bg-[#ffb7c5]", "bg-[#c4b5fd]", "bg-[#fde68a]", "bg-[#fecdd3]"],
    },
    text: {
      primary: "text-[#4a5568]",
      secondary: "text-[#ffb7c5]",
      muted: "text-[#4a5568]/50",
    },
    button: {
      primary: "bg-[#ffb7c5] text-white shadow-[0_4px_15px_#ffb7c560]",
      secondary: "bg-[#c4b5fd] text-white shadow-[0_4px_15px_#c4b5fd60]",
      danger: "bg-[#fecdd3] text-[#4a5568]",
    },
  },

  forbidden: {
    classes: [
      "rounded-none", "rounded-sm",
      "border-2", "border-4",
      "font-mono",
      "bg-black", "bg-[#0a0a0a]", "bg-gray-900", "bg-slate-900",
      "shadow-[3px_3px", "shadow-[4px_4px",
    ],
    patterns: [
      "^rounded-(?:none|sm)$",
      "^border-(?:2|4|8)$",
      "^font-mono$",
      "^bg-(?:black|gray-900|slate-900)",
      "^shadow-\\[\\d+px_\\d+px_0px",
    ],
    reasons: {
      "rounded-none": "Shoujo Manga uses soft, rounded corners (rounded-full, rounded-2xl)",
      "border-2": "Shoujo Manga uses subtle thin borders, not thick ones",
      "font-mono": "Shoujo Manga uses rounded sans-serif fonts, not monospace",
      "bg-black": "Shoujo Manga uses light, pastel backgrounds only",
      "shadow-[3px_3px": "Shoujo Manga uses soft diffused shadows, not hard offset ones",
    },
  },

  required: {
    button: [
      "rounded-full",
      "font-sans font-medium",
      "shadow-[0_4px_15px_#ffb7c560]",
      "transition-all duration-300 ease-in-out",
    ],
    card: [
      "rounded-2xl",
      "bg-[#fff5f7]",
      "border border-[#ffb7c5]/30",
      "shadow-[0_4px_20px_#ffb7c520]",
    ],
    input: [
      "rounded-full",
      "border border-[#ffb7c5]/30",
      "bg-white",
      "font-sans",
      "focus:outline-none",
    ],
  },
};
