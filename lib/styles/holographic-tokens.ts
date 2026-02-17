// Holographic Style Tokens
import { createStyleTokens } from "./token-defaults";

export const holographicTokens = createStyleTokens({
  border: {
    radius: "rounded-2xl",
    width: "border",
    color: "border-white/10",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_15px_rgba(147,51,234,0.2)]",
    md: "shadow-[0_0_25px_rgba(147,51,234,0.4)]",
    lg: "shadow-[0_0_50px_rgba(147,51,234,0.6)]",
    none: "shadow-none",
    hover: "shadow-[0_0_30px_rgba(147,51,234,0.4)]",
    focus: "shadow-[0_0_20px_rgba(147,51,234,0.4)]",
    colored: {
      purple: "shadow-[0_0_20px_rgba(147,51,234,0.5)]",
      pink: "shadow-[0_0_20px_rgba(255,0,128,0.5)]",
      cyan: "shadow-[0_0_20px_rgba(0,212,255,0.5)]",
    },
  },

  interaction: {
    hoverScale:
      "hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:border-purple-400/30 hover:scale-[1.02]",
    transition: "transition-all duration-500",
  },

  typography: {
    heading: "font-sans font-bold",
    body: "font-sans text-sm",
    mono: "font-mono",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-8xl",
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
    card: "p-6",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0a0a1f]",
      secondary: "bg-[#1a0b2e]",
      accent: ["bg-purple-500/10", "bg-pink-500/10", "bg-cyan-500/10"],
    },
    text: {
      primary: "text-white",
      secondary: "text-white/70",
      muted: "text-white/40",
    },
    button: {
      primary:
        "bg-gradient-to-r from-[#ff0080] via-[#7928ca] to-[#00d4ff] text-white",
      secondary: "bg-white/10 text-white border border-white/20",
      danger: "bg-red-500/80 text-white",
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
      "text-gray-900",
      "text-black",
      "rounded-none",
      "border-black",
      "border-gray-300",
    ],
    patterns: [
      "^bg-white",
      "^bg-gray-[1-3]",
      "^bg-slate-[1-3]",
      "^shadow-(?!\\[)",
    ],
    reasons: {
      "bg-white":
        "Holographic style requires dark backgrounds to make prismatic effects pop",
      "shadow-md":
        "Use prismatic glow shadows: shadow-[0_0_20px_rgba(147,51,234,0.5)]",
      "text-black": "Use text-white or gradient text on dark backgrounds",
    },
  },

  required: {
    button: [
      "rounded-",
      "bg-gradient-",
      "transition-all",
      "shadow-[0_0_",
    ],
    card: ["backdrop-blur", "bg-white/", "rounded-", "border"],
    input: [
      "backdrop-blur",
      "bg-white/",
      "rounded-",
      "focus:border-purple",
      "focus:shadow-[0_0_",
    ],
  },
});
