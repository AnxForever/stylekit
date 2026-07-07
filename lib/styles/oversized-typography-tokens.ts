// Oversized Typography Style Tokens
import { createStyleTokens } from "./token-defaults";

export const oversizedTypographyTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#0A0A0A]/15",
    radius: "rounded-none",
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
    hoverOpacity: "hover:text-[#FF4D00]",
    transition: "transition-colors duration-200",
    active: "active:text-[#FF4D00]",
  },

  typography: {
    heading: "font-black uppercase tracking-tighter leading-[0.85]",
    subtitle: "font-mono text-xs uppercase tracking-widest",
    body: "font-sans text-sm leading-relaxed",
    mono: "font-mono uppercase tracking-widest",
    sizes: {
      hero: "text-[clamp(3rem,12vw,10rem)]",
      h1: "text-[clamp(2.5rem,8vw,6rem)]",
      h2: "text-[clamp(2rem,5vw,4rem)]",
      h3: "text-[clamp(1.5rem,3vw,2.5rem)]",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-16 md:py-24 lg:py-32",
    container: "px-4 md:px-8 lg:px-12",
    card: "py-8 md:py-10",
    gap: {
      sm: "gap-4",
      md: "gap-8",
      lg: "gap-16",
    },
  },

  colors: {
    background: {
      primary: "bg-[#FAFAF8]",
      secondary: "bg-[#0A0A0A]",
      accent: ["bg-[#FF4D00]", "bg-[#18181B]"],
    },
    text: {
      primary: "text-[#0A0A0A]",
      secondary: "text-[#71717A]",
      muted: "text-[#71717A]/70",
    },
    button: {
      primary: "bg-[#0A0A0A] text-[#FAFAF8] hover:bg-[#FF4D00]",
      secondary: "bg-transparent text-[#0A0A0A] border border-[#0A0A0A]",
      danger: "bg-[#FF4D00] text-[#FAFAF8]",
    },
  },

  forbidden: {
    classes: [
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
      "shadow-xl",
      "shadow-2xl",
      "bg-gradient-to-r",
      "bg-gradient-to-br",
      "rounded-md",
      "rounded-lg",
      "rounded-xl",
      "rounded-2xl",
      "rounded-full",
      "text-center",
    ],
    patterns: [
      "^shadow-(?!none)",
      "^bg-gradient-",
      "^rounded-(md|lg|xl|2xl|3xl|full)",
      "^drop-shadow-",
    ],
    reasons: {
      "shadow-md": "Oversized Typography builds hierarchy with size and whitespace, never shadows",
      "bg-gradient-to-r": "Solid #0A0A0A / #FAFAF8 / #FF4D00 only; gradients dilute the type",
      "rounded-lg": "Corners stay sharp: rounded-none or rounded-sm at most",
      "rounded-full": "Pill shapes soften the layout; keep everything rectangular",
      "text-center": "Display type is left-aligned; centering is reserved for marquee strips",
    },
  },

  required: {
    button: [
      "font-mono",
      "uppercase",
      "tracking-widest",
      "rounded-none",
      "transition-colors duration-200",
    ],
    card: [
      "border-t border-[#0A0A0A]/15",
      "rounded-none",
      "bg-transparent",
    ],
    input: [
      "bg-transparent",
      "border-0 border-b border-[#0A0A0A]/30",
      "rounded-none",
      "font-mono uppercase tracking-widest",
      "focus:border-[#FF4D00]",
    ],
  },
});
