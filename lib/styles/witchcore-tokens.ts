// Witchcore Style Tokens
import { createStyleTokens } from "./token-defaults";

export const witchcoreTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#c9a74e]/30",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_8px_rgba(13,11,20,0.6)]",
    md: "shadow-[0_4px_16px_rgba(13,11,20,0.7)]",
    lg: "shadow-[0_8px_30px_rgba(13,11,20,0.8)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_0_25px_rgba(201,167,78,0.2)]",
    focus: "focus:shadow-[0_0_15px_rgba(201,167,78,0.15)]",
    colored: {
      gold: "shadow-[0_0_20px_rgba(201,167,78,0.3)]",
      amethyst: "shadow-[0_0_20px_rgba(123,104,174,0.3)]",
      herb: "shadow-[0_0_20px_rgba(61,139,110,0.3)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-[1.01]",
    transition: "transition-all duration-500 ease-in-out",
  },

  typography: {
    heading: "font-serif tracking-wider uppercase",
    body: "font-serif",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-8xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-4 md:px-8",
    card: "p-8",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0d0b14]",
      secondary: "bg-[#4a1942]",
      accent: ["bg-[#c9a74e]", "bg-[#7b68ae]", "bg-[#3d8b6e]"],
    },
    text: {
      primary: "text-[#c9a74e]",
      secondary: "text-[#7b68ae]",
      muted: "text-[#c9a74e]/50",
    },
    button: {
      primary: "bg-[#4a1942] text-[#c9a74e] border border-[#c9a74e]/50",
      secondary: "bg-transparent text-[#7b68ae] border border-[#7b68ae]/50",
      danger: "bg-[#8b1a1a] text-[#c9a74e]",
    },
  },

  forbidden: {
    classes: [
      "bg-white",
      "bg-gray-50",
      "bg-gray-100",
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
      "rounded-full",
      "rounded-2xl",
      "rounded-3xl",
      "text-cyan-",
      "text-lime-",
      "text-pink-",
      "bg-cyan-",
      "bg-lime-",
    ],
    patterns: [
      "^bg-(?:white|gray-[1-3])",
      "^shadow-(?!\\[|none)",
      "^rounded-(?:full|2xl|3xl)",
      "^text-(?:cyan|lime|pink)-",
      "^bg-(?:cyan|lime|pink)-",
    ],
    reasons: {
      "bg-white": "Witchcore uses dark backgrounds only",
      "shadow-md": "Use glowing shadows: shadow-[0_0_20px_rgba(201,167,78,0.3)]",
      "rounded-full": "Witchcore uses sharp edges, not rounded shapes",
      "text-cyan-": "Use gold (#c9a74e) or amethyst (#7b68ae) instead of neon colors",
    },
  },

  required: {
    button: [
      "px-8 py-3",
      "font-serif",
      "uppercase tracking-widest",
      "transition-all duration-500",
    ],
    card: [
      "bg-[#0d0b14]/90",
      "border border-[#c9a74e]/30",
    ],
    input: [
      "bg-[#0d0b14]/80",
      "border border-[#c9a74e]/20",
      "text-[#c9a74e]",
      "font-serif",
      "focus:border-[#c9a74e]/60",
      "focus:outline-none",
    ],
  },
});
