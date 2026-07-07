// Dark Gallery Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const galleryDarkTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#2A2A2A]",
    radius: "rounded-sm",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "shadow-none",
    focus: "shadow-none",
  },

  interaction: {
    hoverOpacity: "hover:opacity-90",
    transition: "transition-all duration-300",
    active: "active:opacity-80",
  },

  typography: {
    heading: "font-sans font-light tracking-tight text-white",
    body: "font-sans font-light text-white leading-relaxed",
    mono: "font-mono text-[#C4956A] text-sm",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-8xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-16 md:py-24 lg:py-32",
    container: "px-6 md:px-8 lg:px-12",
    card: "p-0",
    gap: {
      sm: "gap-2 md:gap-3",
      md: "gap-4 md:gap-6",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0A0A0A]",
      secondary: "bg-[#1A1A1A]",
      accent: ["bg-[#C4956A]", "bg-white", "bg-[#2A2A2A]", "bg-[#1A1A1A]"],
    },
    text: {
      primary: "text-white",
      secondary: "text-[#666666]",
      muted: "text-[#4A4A4A]",
    },
    button: {
      primary: "bg-[#1A1A1A] text-white border border-[#2A2A2A]",
      secondary: "bg-transparent text-white border border-[#2A2A2A]",
      danger: "bg-[#1A1A1A] text-[#C4956A] border border-[#C4956A]/30",
    },
  },

  forbidden: {
    classes: [
      "rounded-md",
      "rounded-lg",
      "rounded-xl",
      "rounded-2xl",
      "rounded-3xl",
      "rounded-full",
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
      "shadow-xl",
      "shadow-2xl",
      "bg-white",
      "bg-gray-50",
      "bg-gray-100",
      "font-serif",
      "font-bold",
      "font-semibold",
    ],
    patterns: [
      "^rounded-(?:md|lg|xl|2xl|3xl|full)$",
      "^shadow-(?:sm|md|lg|xl|2xl|inner)$",
      "^bg-gradient",
    ],
    reasons: {
      "rounded-md": "Dark Gallery caps radii at rounded-sm; full-bleed images must be square-cornered",
      "rounded-lg": "Dark Gallery avoids rounded corners; images require sharp edges",
      "rounded-full": "Dark Gallery never uses pill shapes; geometry must remain minimal",
      "shadow-sm": "Dark Gallery surfaces are flat; depth comes from grayscale stacking, not elevation",
      "shadow-lg": "Dark Gallery has no shadows in the dark field; elevation breaks immersion",
      "bg-white": "White backgrounds puncture the immersive dark; use bg-[#0A0A0A] instead",
      "bg-gray-50": "Light grays destroy the gallery atmosphere; use bg-[#1A1A1A] for elevated surfaces",
      "font-serif": "Dark Gallery is contemporary sans-serif; serif belongs in academic contexts",
      "font-bold": "Dark Gallery uses light weights only (font-light); bold is too aggressive for the aesthetic",
    },
  },

  required: {
    button: [
      "border border-[#2A2A2A]",
      "rounded-sm",
      "font-light",
      "tracking-wider",
      "transition-all duration-300",
    ],
    card: [
      "bg-[#0A0A0A]",
      "border border-[#2A2A2A]",
      "rounded-sm",
    ],
    input: [
      "bg-[#0A0A0A]",
      "border border-[#2A2A2A]",
      "rounded-sm",
      "font-light",
      "text-white",
      "focus:outline-none focus:border-[#C4956A] focus:ring-1 focus:ring-[#C4956A]/30",
    ],
  },
});
