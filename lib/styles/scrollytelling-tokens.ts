// Scrollytelling Style Tokens - scroll-driven data narrative with a sticky canvas
import { createStyleTokens } from "./token-defaults";

export const scrollytellingTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-white/10",
    radius: "rounded-md",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_1px_2px_rgba(0,0,0,0.4)]",
    md: "shadow-[0_4px_16px_rgba(0,0,0,0.5)]",
    lg: "shadow-[0_16px_48px_rgba(0,0,0,0.6)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_8px_28px_rgba(47,111,237,0.25)]",
    focus: "focus-visible:ring-2 focus-visible:ring-[#2F6FED]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1116]",
  },

  interaction: {
    hoverOpacity: "hover:bg-[#2560d4]",
    transition: "transition-all duration-200 ease-out",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-bold text-[#F7F5F0] tracking-tight",
    body: "text-[#F7F5F0]/70 leading-relaxed",
    mono: "font-mono text-[#2F6FED] uppercase tracking-widest",
    sizes: {
      hero: "text-5xl md:text-7xl",
      h1: "text-4xl md:text-5xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-base md:text-lg",
      small: "text-sm",
    },
  },

  spacing: {
    section: "py-20 md:py-28",
    container: "px-6 md:px-8",
    card: "py-4 pl-6",
    gap: {
      sm: "gap-4",
      md: "gap-8",
      lg: "gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0E1116]",
      secondary: "bg-[#1C2530]",
      accent: ["bg-[#2F6FED]"],
    },
    text: {
      primary: "text-[#F7F5F0]",
      secondary: "text-[#F7F5F0]/70",
      muted: "text-[#F7F5F0]/45",
    },
    button: {
      primary: "bg-[#2F6FED] text-white",
      secondary: "bg-[#1C2530] text-[#F7F5F0] border border-white/10",
    },
  },

  forbidden: {
    classes: [
      "bg-white", "bg-gray-100",
      "bg-gradient-to-r", "from-indigo-600", "via-purple-600", "to-pink-500",
      "rounded-full",
      "duration-1000",
    ],
    patterns: [
      "^bg-gradient-",
      "^bg-white$",
      "^from-(indigo|purple|pink|fuchsia)-",
    ],
    reasons: {
      "bg-white": "Scrollytelling uses a dark data-feature base #0E1116 (or a controlled paper variant)",
      "bg-gradient-to-r": "The stage is flat; focus comes from signal-blue highlights, not gradients",
      "from-indigo-600": "No AI-cliche gradients; one signal blue and one vermilion accent only",
      "rounded-full": "Chart/data UI reads better with restrained rounded-md, not pills",
      "duration-1000": "Step transitions stay 0.5-0.8s so the narrative keeps pace",
    },
  },

  required: {
    button: [
      "bg-[#2F6FED] text-white font-semibold",
      "rounded-md",
      "hover:bg-[#2560d4] active:scale-[0.98]",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6FED]/50",
      "transition-all duration-200",
    ],
    card: [
      "border-l-2 border-[#2F6FED]",
      "pl-6 py-4",
      "bg-transparent",
    ],
    input: [
      "bg-[#1C2530] border border-white/10",
      "rounded-md",
      "text-[#F7F5F0] placeholder-[#F7F5F0]/30",
      "focus:outline-none focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/30",
      "transition-all duration-200",
    ],
  },
});
