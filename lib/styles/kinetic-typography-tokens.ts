// Kinetic Typography Style Tokens - type is the interface, the variable font is the engine
import { createStyleTokens } from "./token-defaults";

export const kineticTypographyTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#F4F1EB]/20",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "hover:shadow-none",
    focus: "focus:shadow-[0_0_0_2px_rgba(255,77,0,0.4)]",
  },

  interaction: {
    hoverOpacity: "hover:text-[#F4F1EB]",
    transition: "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-bold text-[#F4F1EB] tracking-tight leading-[0.95]",
    body: "text-[#F4F1EB]/70",
    mono: "font-mono text-[#F4F1EB]/50 uppercase tracking-[0.25em]",
    sizes: {
      hero: "text-[clamp(3rem,10vw,9rem)]",
      h1: "text-5xl md:text-7xl",
      h2: "text-3xl md:text-5xl",
      h3: "text-2xl md:text-3xl",
      body: "text-sm md:text-base",
      small: "text-[11px]",
    },
  },

  spacing: {
    section: "py-20 md:py-32",
    container: "px-6 md:px-10",
    card: "py-8 px-1",
    gap: {
      sm: "gap-3",
      md: "gap-6",
      lg: "gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0B0B0C]",
      secondary: "bg-[#141416]",
      accent: ["bg-[#FF4D00]"],
    },
    text: {
      primary: "text-[#F4F1EB]",
      secondary: "text-[#F4F1EB]/70",
      muted: "text-[#F4F1EB]/45",
    },
    button: {
      primary: "bg-[#FF4D00] text-[#0B0B0C]",
      secondary: "bg-transparent text-[#F4F1EB] border border-[#F4F1EB]/25",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full",
      "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl",
      "bg-gradient-to-r", "bg-gradient-to-br",
      "from-indigo-600", "via-purple-600", "to-pink-500",
      "duration-100", "duration-2000",
      "ease-linear",
      "italic",
    ],
    patterns: [
      "^rounded-(lg|xl|2xl|3xl|full)$",
      "^shadow-(md|lg|xl|2xl)$",
      "^bg-gradient-",
      "^duration-(100|150|2000)$",
      "^ease-linear$",
    ],
    reasons: {
      "rounded-lg": "Kinetic typography uses sharp editorial edges (rounded-none)",
      "rounded-full": "Sharp editorial edges only; pills soften the type stage",
      "shadow-lg": "Depth comes from type contrast, never drop shadows",
      "bg-gradient-to-r": "The stage is flat ink; gradients dilute the type",
      "from-indigo-600": "No AI-cliche gradients; ink, bone and one signal orange only",
      "duration-100": "Motion needs room to breathe: 300-900ms with expo-out",
      "duration-2000": "Animations over 1.2s drag; keep entrances under 0.9s",
      "ease-linear": "Linear easing is lifeless; use cubic-bezier(0.22,1,0.36,1)",
      "italic": "Emphasis comes from weight and width axes, not slant",
    },
  },

  required: {
    button: [
      "uppercase tracking-[0.15em] text-sm font-semibold",
      "border border-[#F4F1EB]/25",
      "rounded-none",
      "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
      "hover:border-[#FF4D00]",
      "active:scale-[0.98]",
    ],
    card: [
      "border-t border-[#F4F1EB]/15",
      "rounded-none",
      "hover:border-[#FF4D00]",
      "transition-colors duration-500",
    ],
    input: [
      "bg-transparent",
      "border-b border-[#F4F1EB]/20",
      "rounded-none",
      "text-[#F4F1EB] placeholder-[#F4F1EB]/25",
      "focus:outline-none",
    ],
  },
});
