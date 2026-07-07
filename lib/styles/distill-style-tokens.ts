// Distill Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const distillStyleTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#E5E7EB]",
    radius: "rounded-md",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-sm",
    lg: "shadow-sm",
    none: "shadow-none",
    hover: "hover:shadow-sm",
    focus: "focus:shadow-none",
  },

  interaction: {
    hoverOpacity: "hover:bg-[#F3F4F6]",
    transition: "transition-colors duration-150",
    active: "active:bg-[#E5E7EB]",
  },

  typography: {
    heading: "font-serif font-semibold text-[#1F2933] tracking-tight",
    body: "font-serif text-[#1F2933] leading-[1.75]",
    mono: "font-mono text-[#6B7280] text-sm",
    sizes: {
      hero: "text-3xl md:text-4xl lg:text-5xl",
      h1: "text-3xl md:text-4xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-lg md:text-xl",
      body: "text-base md:text-[1.0625rem]",
      small: "text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-16",
    container: "px-4 md:px-6",
    card: "p-5 md:p-6",
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-[#F3F4F6]",
      accent: ["bg-[#2A7AE2]", "bg-[#E4572E]", "bg-[#F3F4F6]", "bg-[#1F2933]"],
    },
    text: {
      primary: "text-[#1F2933]",
      secondary: "text-[#6B7280]",
      muted: "text-[#9CA3AF]",
    },
    button: {
      primary: "bg-[#1F2933] text-white",
      secondary: "bg-white text-[#1F2933] border border-[#E5E7EB]",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg",
      "rounded-xl",
      "rounded-2xl",
      "rounded-3xl",
      "rounded-full",
      "shadow-md",
      "shadow-lg",
      "shadow-xl",
      "shadow-2xl",
      "bg-gradient-to-r",
      "bg-gradient-to-br",
      "bg-gradient-to-b",
    ],
    patterns: [
      "^rounded-(?:lg|xl|2xl|3xl|full)$",
      "^shadow-(?:md|lg|xl|2xl|inner)$",
      "^bg-gradient",
    ],
    reasons: {
      "rounded-xl": "Distill Style caps radii at rounded-md; paper layouts prefer square corners",
      "rounded-full": "Distill Style avoids pill shapes; hierarchy comes from typography, not geometry",
      "shadow-lg": "Distill Style separates regions with hairlines, not elevation",
      "bg-gradient-to-r": "Academic surfaces are flat white or #F3F4F6; gradients are forbidden",
    },
  },

  required: {
    button: [
      "rounded-md",
      "text-sm font-medium",
      "transition-colors duration-150",
    ],
    card: [
      "bg-white",
      "border border-[#E5E7EB]",
      "rounded-md",
    ],
    input: [
      "bg-white",
      "border border-[#E5E7EB]",
      "rounded-md",
      "focus:outline-none focus:border-[#2A7AE2] focus:ring-1 focus:ring-[#2A7AE2]/30",
    ],
  },
});
