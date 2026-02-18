// Zen Garden (Karesansui) Style Tokens
import { createStyleTokens } from "./token-defaults";

export const zenGardenTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#c4bba8]/30",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-sm",
    lg: "shadow-sm",
    none: "shadow-none",
    hover: "hover:shadow-sm",
    focus: "focus:ring-1 focus:ring-[#8a9a7b]/20",
    colored: {},
  },

  interaction: {
    transition: "transition-colors duration-700",
    active: "active:opacity-80",
  },

  typography: {
    heading: "font-serif font-light tracking-wide",
    body: "font-serif font-light",
    mono: "font-mono font-light",
    sizes: {
      hero: "text-3xl md:text-5xl lg:text-6xl",
      h1: "text-2xl md:text-4xl",
      h2: "text-xl md:text-2xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-24 md:py-32 lg:py-40",
    container: "px-8 md:px-16 lg:px-24",
    card: "p-8 md:p-10",
    gap: {
      sm: "gap-6",
      md: "gap-10",
      lg: "gap-16",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f5f3ee]",
      secondary: "bg-[#ede9e1]",
      accent: ["bg-[#8a9a7b]/10", "bg-[#c4bba8]/10", "bg-[#7a7062]/10"],
    },
    text: {
      primary: "text-[#4a5548]",
      secondary: "text-[#7a7062]",
      muted: "text-[#c4bba8]",
    },
    button: {
      primary: "bg-transparent border-b border-[#4a5548]/25 text-[#4a5548]",
      secondary: "bg-transparent border-b border-[#c4bba8] text-[#7a7062]",
      danger: "bg-transparent border-b border-[#7a7062] text-[#7a7062]",
    },
  },

  forbidden: {
    classes: [
      "bg-black", "bg-gray-900", "bg-slate-900",
      "font-black", "font-extrabold", "font-bold",
      "border-2", "border-4", "border-[3px]", "border-[4px]",
      "shadow-lg", "shadow-xl", "shadow-2xl",
      "rounded-2xl", "rounded-3xl", "rounded-full",
      "bg-gradient-to-r", "bg-gradient-to-b",
      "text-6xl", "text-7xl", "text-8xl",
      "animate-bounce", "animate-spin", "animate-pulse",
      "bg-red-500", "bg-blue-500", "bg-yellow-500", "bg-pink-500",
    ],
    patterns: [
      "^bg-(?:black|gray-9|slate-9)",
      "^font-(?:black|extrabold|bold)$",
      "^shadow-(?:lg|xl|2xl)$",
      "^bg-gradient",
      "^animate-(?:bounce|spin|pulse)$",
      "^text-(?:[6-9]xl|\\dxl)$",
      "^border-(?:[2-9]|\\[\\d+px\\])$",
      "^bg-(?:red|blue|yellow|pink|orange|purple)-",
    ],
    reasons: {
      "bg-black": "Zen garden uses natural sand/stone tones, not darkness",
      "font-bold": "Only light and extralight weights convey meditative calm",
      "shadow-lg": "Shadows must be minimal or absent for quiet aesthetic",
      "bg-gradient-to-r": "No gradients; use flat, natural tones only",
      "animate-bounce": "No energetic animations; only very slow transitions allowed",
      "border-2": "Thick borders disrupt the delicate zen garden balance",
      "bg-red-500": "Bright colors violate the muted natural palette",
    },
  },

  required: {
    button: ["bg-transparent", "transition-colors", "duration-700"],
    card: ["transition-colors"],
    input: ["bg-transparent", "focus:outline-none"],
  },
});
