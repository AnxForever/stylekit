// Kinetic Constructivism Style Tokens - geometry as a machine, flat ink on paper
import { createStyleTokens } from "./token-defaults";

export const kineticConstructivismTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-[#17130E]",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "hover:shadow-none",
    focus: "focus:shadow-[0_0_0_3px_#E0231B]",
  },

  interaction: {
    hoverOpacity: "hover:text-[#E0231B]",
    transition: "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-extrabold uppercase text-[#17130E] tracking-tight leading-[0.9]",
    body: "text-[#17130E]/80",
    mono: "font-mono uppercase tracking-[0.25em] text-[#17130E]/60 tabular-nums",
    sizes: {
      hero: "text-[clamp(3rem,11vw,9rem)]",
      h1: "text-5xl md:text-7xl",
      h2: "text-3xl md:text-5xl",
      h3: "text-2xl md:text-3xl",
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
      primary: "bg-[#EFE9DC]",
      secondary: "bg-[#17130E]",
      accent: ["bg-[#E0231B]", "bg-[#1C4A87]", "bg-[#F4B301]"],
    },
    text: {
      primary: "text-[#17130E]",
      secondary: "text-[#17130E]/70",
      muted: "text-[#17130E]/50",
    },
    button: {
      primary: "bg-[#E0231B] text-[#EFE9DC]",
      secondary: "bg-transparent text-[#17130E] border-2 border-[#17130E]",
    },
  },

  forbidden: {
    classes: [
      "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full",
      "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl",
      "bg-gradient-to-r", "bg-gradient-to-br", "bg-gradient-to-b",
      "from-indigo-600", "via-purple-600", "to-pink-500",
      "blur-sm", "blur-md", "blur-lg",
      "drop-shadow-lg", "drop-shadow-xl",
      "ease-linear",
    ],
    patterns: [
      "^rounded-(md|lg|xl|2xl|3xl|full)$",
      "^shadow-(md|lg|xl|2xl)$",
      "^bg-gradient-",
      "^blur-",
      "^drop-shadow-",
    ],
    reasons: {
      "rounded-lg": "Constructivism is knife-cut hard edges; use rounded-none",
      "rounded-full": "Discs are drawn as full circles by intent, not via softened UI corners; structural edges stay square",
      "shadow-lg": "Flat poster printing has no drop shadows; depth comes from color-block layering",
      "bg-gradient-to-r": "Flat solid fills only; gradients dilute the constructivist color signal",
      "from-indigo-600": "Only red/blue/yellow + ink + paper; no AI-cliche gradient hues",
      "blur-md": "No blur or glow; every edge is sharp",
      "drop-shadow-lg": "No soft shadows; the composition is flat and printed",
      "ease-linear": "Linear easing is lifeless for entrances; use expo-out cubic-bezier(0.16,1,0.3,1) (linear is allowed only for constant-speed gear/orbit loops)",
    },
  },

  required: {
    button: [
      "uppercase font-extrabold tracking-[0.12em] text-sm",
      "border-2 border-[#17130E]",
      "rounded-none",
      "transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
      "active:scale-[0.98]",
    ],
    card: [
      "bg-[#EFE9DC]",
      "border-2 border-[#17130E]",
      "rounded-none",
    ],
    input: [
      "bg-transparent",
      "border-2 border-[#17130E]",
      "rounded-none",
      "text-[#17130E] placeholder-[#17130E]/30",
      "focus:outline-none",
    ],
  },
});
