// Broadcast Glitch Style Tokens - a broken CRT signal, hard and flat
import { createStyleTokens } from "./token-defaults";

export const broadcastGlitchTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-[#EDEDED]/30",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "hover:shadow-none",
    focus: "focus:shadow-none",
  },

  interaction: {
    hoverOpacity: "hover:[text-shadow:2px_0_#00E5D8,-2px_0_#FF2E4C]",
    transition: "transition-transform duration-100",
    active: "active:translate-y-0.5",
  },

  typography: {
    heading: "font-mono font-bold uppercase text-[#EDEDED] tracking-tight",
    body: "font-mono text-[#EDEDED]/70",
    mono: "font-mono uppercase tracking-[0.2em] text-[#00E5D8]",
    sizes: {
      hero: "text-[clamp(3rem,12vw,9rem)]",
      h1: "text-5xl md:text-7xl",
      h2: "text-3xl md:text-5xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-[11px]",
    },
  },

  spacing: {
    section: "py-20 md:py-28",
    container: "px-6 md:px-10",
    card: "p-6",
    gap: {
      sm: "gap-3",
      md: "gap-6",
      lg: "gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0B0B0E]",
      secondary: "bg-[#101014]",
      accent: ["bg-[#FF2E4C]", "bg-[#00E5D8]", "bg-[#F5E000]"],
    },
    text: {
      primary: "text-[#EDEDED]",
      secondary: "text-[#EDEDED]/70",
      muted: "text-[#EDEDED]/45",
    },
    button: {
      primary: "bg-[#FF2E4C] text-[#0B0B0E]",
      secondary: "bg-transparent text-[#EDEDED] border-2 border-[#EDEDED]/40",
    },
  },

  forbidden: {
    classes: [
      "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full",
      "bg-gradient-to-r", "bg-gradient-to-br", "bg-gradient-to-b", "bg-gradient-to-t",
      "from-purple-500", "via-pink-500", "to-orange-400", "from-fuchsia-500", "to-amber-400",
      "blur-sm", "blur-md", "blur-lg",
      "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl",
      "drop-shadow-lg",
    ],
    patterns: [
      "^rounded-(md|lg|xl|2xl|3xl|full)$",
      "^bg-gradient-",
      "^blur-",
      "^shadow-(md|lg|xl|2xl)$",
    ],
    reasons: {
      "rounded-lg": "A CRT signal is hard-edged; use rounded-none (square corners only)",
      "bg-gradient-to-r": "Flat signal color only; gradients belong to synthwave, not a broken broadcast",
      "from-purple-500": "The purple-pink-orange sunset is outrun/synthwave — a different style; use glitch red/CRT cyan/test yellow",
      "blur-md": "No soft light or blur; the signal is sharp and electronic",
      "shadow-lg": "No soft shadows; depth is the scanline overlay and channel split, not elevation",
    },
  },

  required: {
    button: [
      "rounded-none",
      "border-2",
      "font-mono font-bold uppercase tracking-[0.15em]",
      "transition-transform duration-100",
      "active:translate-y-0.5",
    ],
    card: [
      "bg-[#101014]",
      "border-2 border-[#EDEDED]/30",
      "rounded-none",
    ],
    input: [
      "bg-[#101014]",
      "rounded-none",
      "border-2 border-[#EDEDED]/30",
      "font-mono text-[#00E5D8] placeholder-[#EDEDED]/25",
      "focus:outline-none focus:border-[#00E5D8]",
    ],
  },
});
