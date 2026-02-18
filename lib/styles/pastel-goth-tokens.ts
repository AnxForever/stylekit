// Pastel Goth Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const pastelGothTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#d4a5e3]/20",
    radius: "rounded-xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_8px_rgba(212,165,227,0.15)]",
    md: "shadow-[0_0_16px_rgba(212,165,227,0.2)]",
    lg: "shadow-[0_0_24px_rgba(212,165,227,0.3)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_0_24px_rgba(212,165,227,0.4)]",
    focus: "focus:shadow-[0_0_16px_rgba(245,165,184,0.2)]",
    colored: {
      lavender: "shadow-[0_0_20px_rgba(212,165,227,0.3)]",
      teal: "shadow-[0_0_20px_rgba(126,200,200,0.3)]",
      pink: "shadow-[0_0_20px_rgba(245,165,184,0.3)]",
      periwinkle: "shadow-[0_0_20px_rgba(184,165,245,0.3)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-105",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-bold tracking-wide text-[#d4a5e3]",
    body: "font-sans text-[#b8a5f5]/70",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
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
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#1a1225]",
      secondary: "bg-[#2d1b3d]",
      accent: [
        "bg-[#d4a5e3]/10",
        "bg-[#7ec8c8]/10",
        "bg-[#f5a5b8]/10",
        "bg-[#b8a5f5]/10",
      ],
    },
    text: {
      primary: "text-[#d4a5e3]",
      secondary: "text-[#7ec8c8]",
      muted: "text-[#b8a5f5]/50",
    },
    button: {
      primary:
        "bg-[#2d1b3d] text-[#d4a5e3] border border-[#d4a5e3]/30",
      secondary:
        "bg-[#1a1225] text-[#7ec8c8] border border-[#7ec8c8]/20",
      danger: "bg-[#f5a5b8]/20 text-[#f5a5b8]",
    },
  },

  forbidden: {
    classes: [
      "bg-white",
      "bg-gray-50",
      "bg-gray-100",
      "bg-[#faf9f7]",
      "bg-[#fff8e7]",
      "bg-red-500",
      "bg-blue-600",
      "bg-green-500",
      "bg-yellow-300",
      "bg-orange-400",
      "text-[#8b7355]",
      "text-amber-700",
      "rounded-none",
      "text-green-400",
    ],
    patterns: [
      "^bg-(?:white|gray-[1-3]|\\[#(?:faf|fff|f5f))",
      "^bg-(?:red|blue|green|yellow|orange)-[3-6]",
      "^text-(?:amber-|green-[3-5]|\\[#8b7)",
    ],
    reasons: {
      "bg-white":
        "Pastel Goth uses dark purple/near-black backgrounds exclusively",
      "bg-red-500":
        "Pastel Goth uses pastel versions of colors, not pure saturated ones",
      "text-amber-700":
        "Pastel Goth avoids earth tones in favor of cool pastels on dark",
      "rounded-none":
        "Pastel Goth uses soft rounded corners (rounded-xl)",
      "bg-yellow-300":
        "Pastel Goth avoids warm sunny colors; pastels on dark only",
    },
  },

  required: {
    button: [
      "rounded-xl",
      "border border-[#d4a5e3]/30",
      "shadow-[0_0_16px_rgba(212,165,227,0.25)]",
      "font-bold tracking-wide",
      "transition-all duration-300 ease-in-out",
    ],
    card: [
      "rounded-xl",
      "bg-[#1a1225]",
      "border border-[#b8a5f5]/20",
      "shadow-[0_0_20px_rgba(184,165,245,0.15)]",
    ],
    input: [
      "rounded-xl",
      "border border-[#d4a5e3]/20",
      "bg-[#1a1225]",
      "text-[#d4a5e3]",
      "focus:border-[#f5a5b8]/50",
      "focus:shadow-[0_0_16px_rgba(245,165,184,0.2)]",
      "focus:outline-none",
    ],
  },
});
