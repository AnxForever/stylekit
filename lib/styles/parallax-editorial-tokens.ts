// Parallax Editorial Style Tokens - magazine layout with physical depth on warm paper
import { createStyleTokens } from "./token-defaults";

export const parallaxEditorialTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#1A1712]/20",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-[0_24px_60px_rgba(26,23,18,0.12)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_30px_70px_rgba(26,23,18,0.16)]",
    focus: "focus:shadow-none",
  },

  interaction: {
    hoverOpacity: "hover:text-[#B3401F]",
    transition: "transition-colors duration-300 ease-out",
    active: "active:opacity-80",
  },

  typography: {
    heading: "font-serif text-[#1A1712]",
    body: "text-[#1A1712]/75 leading-relaxed",
    mono: "font-mono text-[#1A1712]/55",
    sizes: {
      hero: "text-6xl md:text-8xl",
      h1: "text-4xl md:text-6xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-2xl md:text-3xl",
      body: "text-base md:text-lg",
      small: "text-sm",
    },
  },

  spacing: {
    section: "py-20 md:py-32",
    container: "px-6 md:px-8",
    card: "pt-5",
    gap: {
      sm: "gap-4",
      md: "gap-8",
      lg: "gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#F5F0E6]",
      secondary: "bg-[#EBE3D3]",
      accent: ["bg-[#1A1712]"],
    },
    text: {
      primary: "text-[#1A1712]",
      secondary: "text-[#1A1712]/75",
      muted: "text-[#1A1712]/50",
    },
    button: {
      primary: "bg-[#1A1712] text-[#F5F0E6]",
      secondary: "bg-transparent text-[#1A1712] border-b border-[#1A1712]/30",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full",
      "bg-white", "bg-black", "bg-slate-900", "bg-gray-900",
      "bg-gradient-to-r", "from-indigo-600", "via-purple-600", "to-pink-500",
      "font-sans",
    ],
    patterns: [
      "^rounded-(lg|xl|2xl|3xl|full)$",
      "^bg-(white|black)$",
      "^bg-gradient-",
      "^bg-(slate|gray|zinc|blue|indigo)-(800|900)$",
    ],
    reasons: {
      "rounded-full": "Editorial layout uses sharp printed edges, not pills",
      "bg-white": "Use warm paper #F5F0E6, never sterile pure white",
      "bg-black": "Use warm ink #1A1712 on paper, not flat black surfaces",
      "bg-gradient-to-r": "Depth comes from parallax layers, not gradients",
      "from-indigo-600": "No AI-cliche gradients; warm paper, ink and one brick-red accent",
      "font-sans": "Headings and structure lean on a serif display face",
    },
  },

  required: {
    button: [
      "font-serif",
      "transition-colors duration-300",
      "hover:text-[#B3401F]",
    ],
    card: [
      "border-t border-[#1A1712]/20",
      "rounded-none",
      "pt-5",
    ],
    input: [
      "bg-transparent",
      "border-b border-[#1A1712]/25",
      "rounded-none",
      "text-[#1A1712] placeholder-[#1A1712]/30",
      "focus:outline-none focus:border-[#B3401F]",
      "transition-colors duration-300",
    ],
  },
});
