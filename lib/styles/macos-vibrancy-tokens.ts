// macOS Vibrancy Style Tokens - Native dark with subtle translucency
import { createStyleTokens } from "./token-defaults";

export const macosVibrancyTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-white/10",
    radius: "rounded-xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-[0_1px_0_rgba(255,255,255,0.05)]",
    lg: "shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
    none: "shadow-none",
    hover: "hover:shadow-none",
    focus: "focus:shadow-[0_0_0_2px_rgba(100,100,255,0.3)]",
    colored: {
      inner: "shadow-none",
      glow: "shadow-none",
      blue: "shadow-[0_0_0_2px_rgba(50,130,246,0.4)]",
      green: "shadow-[0_0_0_2px_rgba(52,199,89,0.4)]",
    },
  },

  interaction: {
    hoverOpacity: "hover:bg-white/8",
    transition: "transition-colors duration-200 ease-out",
    active: "active:opacity-80",
  },

  typography: {
    heading: "font-serif font-semibold text-white/95",
    body: "text-white/70",
    mono: "font-mono text-white/80",
    sizes: {
      hero: "text-3xl md:text-5xl",
      h1: "text-2xl md:text-4xl",
      h2: "text-xl md:text-2xl",
      h3: "text-lg md:text-xl",
      body: "text-sm",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-12 md:py-16",
    container: "px-4 md:px-6",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
  },

  colors: {
    background: {
      primary: "bg-[#1c1c1e]",
      secondary: "bg-[#2c2c2e]",
      accent: [
        "bg-[#3a3a3c]",
        "bg-blue-600",
        "bg-indigo-600",
      ],
    },
    text: {
      primary: "text-white/95",
      secondary: "text-white/70",
      muted: "text-white/40",
    },
    button: {
      primary: "bg-[#3a3a3c] text-white/90",
      secondary: "bg-transparent text-white/70 border border-white/12",
    },
  },

  forbidden: {
    classes: [
      "bg-gradient-to-r", "bg-gradient-to-br", "bg-gradient-to-l",
      "shadow-xl", "shadow-2xl", "shadow-lg",
      "rounded-3xl", "rounded-full",
      "text-yellow-400", "text-pink-500", "text-green-400",
      "animate-pulse", "animate-bounce",
      "border-2", "border-4",
    ],
    patterns: [
      "^bg-gradient",
      "^shadow-(xl|2xl|lg)$",
      "^rounded-(3xl|full)$",
      "^animate-",
      "^border-[2-9]$",
    ],
    reasons: {
      "bg-gradient-to-r": "macOS Vibrancy uses solid dark backgrounds, not gradients",
      "shadow-xl": "macOS Vibrancy uses minimal shadows, depth comes from background layers",
      "rounded-3xl": "macOS Vibrancy uses moderate rounding (rounded-lg to rounded-xl)",
      "animate-pulse": "macOS Vibrancy avoids decorative animations",
      "border-2": "macOS Vibrancy uses 1px borders only",
    },
  },

  required: {
    button: [
      "bg-[#3a3a3c] text-white/90",
      "rounded-lg",
      "transition-colors duration-200",
    ],
    card: [
      "bg-[#2c2c2e]",
      "border border-white/8",
      "rounded-xl",
    ],
    input: [
      "bg-[#1c1c1e]",
      "border border-white/10",
      "rounded-lg",
      "text-white/90 placeholder-white/30",
      "focus:outline-none focus:border-white/25",
      "transition-colors duration-200",
    ],
  },
});
