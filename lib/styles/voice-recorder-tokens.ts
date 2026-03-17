// Voice Recorder Style Tokens
import { createStyleTokens } from "./token-defaults";

export const voiceRecorderTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#00ff41]/30",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_8px_rgba(0,255,65,0.2)]",
    md: "shadow-[0_0_16px_rgba(0,255,65,0.3)]",
    lg: "shadow-[0_0_32px_rgba(0,255,65,0.4)]",
    none: "shadow-none",
    hover: "shadow-[0_0_24px_rgba(0,255,65,0.4)]",
    focus: "shadow-[0_0_12px_rgba(0,255,65,0.3)]",
    colored: {
      green: "shadow-[0_0_20px_rgba(0,255,65,0.4)]",
    },
  },

  interaction: {
    hoverScale:
      "hover:shadow-[0_0_24px_rgba(0,255,65,0.4)] hover:border-[#00ff41]",
    transition: "transition-all duration-150",
    active: "active:translate-y-[2px]",
  },

  typography: {
    heading: "font-mono font-bold uppercase tracking-[0.15em]",
    body: "font-mono text-sm",
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
    card: "p-6",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0d1117]",
      secondary: "bg-[#080b10]",
      accent: ["bg-[#00ff41]/10", "bg-[#00ff41]/5"],
    },
    text: {
      primary: "text-[#00ff41]",
      secondary: "text-[#00ff41]/70",
      muted: "text-[#00ff41]/40",
    },
    button: {
      primary: "bg-[#00ff41] text-[#0d1117]",
      secondary:
        "bg-transparent text-[#00ff41] border border-[#00ff41]/40",
    },
  },

  forbidden: {
    classes: [
      "bg-white",
      "bg-gray-50",
      "bg-gray-100",
      "rounded-xl",
      "rounded-2xl",
      "rounded-3xl",
      "rounded-full",
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
      "font-serif",
      "font-sans",
      "text-gray-900",
      "text-gray-800",
    ],
    patterns: [
      "^bg-white",
      "^bg-gray-[1-3]",
      "^shadow-(?!\\[)",
      "^rounded-[23]xl",
      "^rounded-full",
      "^font-serif",
      "^font-sans",
    ],
    reasons: {
      "bg-white": "Voice Recorder requires ultra-dark backgrounds only",
      "shadow-md":
        "Use green glow shadows: shadow-[0_0_16px_rgba(0,255,65,0.3)]",
      "rounded-2xl": "Terminal aesthetic requires sharp edges (rounded-none)",
      "font-sans": "Use monospace fonts only for terminal aesthetic",
      "font-serif": "Use monospace fonts only for terminal aesthetic",
    },
  },

  required: {
    button: [
      "font-mono",
      "uppercase",
      "tracking-[0.2em]",
      "border",
      "transition-all duration-150",
    ],
    card: ["bg-[#0d1117]", "border"],
    input: [
      "bg-[#080b10]",
      "border",
      "text-[#00ff41]",
      "font-mono",
      "focus:border-[#00ff41]",
      "focus:shadow-[0_0_12px_rgba(0,255,65,0.2)]",
    ],
  },
});
