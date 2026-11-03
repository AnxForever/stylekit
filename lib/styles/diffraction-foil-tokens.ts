// Diffraction Foil Style Tokens
import { createStyleTokens } from "./token-defaults";

export const diffractionFoilTokens = createStyleTokens({
  border: {
    radius: "rounded-xl",
    width: "border",
    color: "border-white/10",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_8px_18px_-12px_rgba(0,0,0,0.8)]",
    md: "shadow-[0_16px_32px_-18px_rgba(0,0,0,0.85)]",
    lg: "shadow-[0_24px_48px_-28px_rgba(0,0,0,0.9)]",
    none: "shadow-none",
    hover: "shadow-[0_20px_40px_-22px_rgba(0,0,0,0.9)]",
    focus: "shadow-[0_0_0_2px_rgba(201,200,212,0.5)]",
  },

  interaction: {
    hoverScale: "hover:border-white/25",
    transition: "transition-colors duration-200",
  },

  typography: {
    heading: "font-sans font-extrabold tracking-tight",
    body: "font-sans text-base",
    mono: "font-mono",
    sizes: {
      hero: "text-5xl md:text-7xl",
      h1: "text-4xl md:text-6xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-16 px-6 md:px-8",
    container: "px-4 md:px-8",
    card: "p-5",
    gap: {
      sm: "gap-3",
      md: "gap-5",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0c0b10]",
      secondary: "bg-[#141319]",
      accent: ["bg-[#1d1c24]", "bg-[#26252e]"],
    },
    text: {
      primary: "text-[#ececf2]",
      secondary: "text-[#a9a8b6]",
      muted: "text-[#8a8996]",
    },
    button: {
      primary: "bg-[#e3e2ea] text-[#16151c]",
      secondary: "bg-[#141319] text-[#ececf2] border border-white/15",
      danger: "bg-[#c4314b] text-white",
    },
  },

  forbidden: {
    classes: [
      "bg-white",
      "bg-gray-50",
      "bg-gray-100",
      "text-black",
      "animate-pulse",
      "hue-rotate-15",
      "hue-rotate-30",
      "hue-rotate-60",
      "hue-rotate-90",
      "hue-rotate-180",
    ],
    patterns: [
      "^hue-rotate-",
      "^bg-gray-[1-3]",
      "^bg-slate-[1-3]",
    ],
    reasons: {
      "bg-white":
        "Diffraction foil needs a near-black print sheet; use bg-[#0c0b10] and put light foil on elements, not the page",
      "hue-rotate-90":
        "Foil color comes from the grating and the lamp angle; cycling hue-rotate reads as a rainbow effect, not metal",
      "text-black": "Use ink text-[#16151c] on foil-light, or text-[#ececf2] on the dark sheet",
    },
  },

  required: {
    button: [
      "focus-visible:outline-[#c9c8d4]",
    ],
    card: [
      "border",
    ],
    input: [
      "focus:border-[#c9c8d4]",
    ],
  },
});
