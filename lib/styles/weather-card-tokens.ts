// Weather Card Style Tokens - Atmospheric animations with glassmorphic overlays and poetic weather display
import { createStyleTokens } from "./token-defaults";

export const weatherCardTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-white/20",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_8px_rgba(135,206,235,0.15)]",
    md: "shadow-[0_4px_16px_rgba(135,206,235,0.2)]",
    lg: "shadow-[0_8px_32px_rgba(135,206,235,0.25)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_8px_32px_rgba(255,107,53,0.2)]",
    focus: "focus:shadow-[0_0_0_3px_rgba(135,206,235,0.3)]",
    colored: {
      sky: "shadow-[0_0_20px_rgba(135,206,235,0.3)]",
      sunset: "shadow-[0_0_20px_rgba(255,107,53,0.3)]",
    },
  },

  interaction: {
    hoverOpacity: "hover:bg-white/25",
    transition: "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
    active: "active:scale-[0.97]",
  },

  typography: {
    heading: "font-sans font-semibold text-gray-800",
    body: "font-sans text-gray-600",
    mono: "font-mono text-gray-700",
    sizes: {
      hero: "text-4xl md:text-6xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-6 md:px-8",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-gradient-to-b from-[#87CEEB] to-[#b8e4f9]",
      secondary: "bg-white/40 backdrop-blur-[30px]",
      accent: [
        "bg-gradient-to-br from-[#87CEEB] via-[#a8d8f0] to-[#ff6b35]/20",
        "bg-gradient-to-br from-[#ff6b35]/80 via-[#ff8c5a]/60 to-[#87CEEB]/40",
      ],
    },
    text: {
      primary: "text-gray-800",
      secondary: "text-gray-600",
      muted: "text-gray-400",
    },
    button: {
      primary: "bg-gradient-to-r from-[#87CEEB] to-[#6bb5d6] text-white",
      secondary: "bg-white/50 text-gray-700 backdrop-blur-[20px]",
    },
  },

  forbidden: {
    classes: [
      "bg-black",
      "bg-gray-900",
      "text-white",
      "border-black",
      "rounded-none",
    ],
    patterns: [
      "^bg-black$",
      "^bg-gray-900$",
      "^rounded-none$",
    ],
    reasons: {
      "bg-black": "Weather Card uses light sky-blue backgrounds, not dark",
      "bg-gray-900": "Weather Card uses light atmospheric backgrounds",
      "rounded-none": "Weather Card requires soft rounded corners (rounded-2xl)",
    },
  },

  required: {
    button: [
      "rounded-2xl",
      "transition-all duration-500",
    ],
    card: [
      "backdrop-blur",
      "rounded-2xl",
      "border border-white/20",
    ],
    input: [
      "rounded-2xl",
      "border border-white/30",
      "bg-white/50",
      "backdrop-blur",
    ],
  },
});
