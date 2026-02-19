// VHS Aesthetic Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const vhsAestheticRecipes = createStyleRecipes("vhs-aesthetic", "VHS Aesthetic", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Retro VHS tape button with scan line feel, monospace font and glitch accents",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-mono",
        "font-bold",
        "uppercase",
        "tracking-widest",
        "rounded-sm",
        "border",
        "transition-all duration-200",
      ],
    },
    parameters: [
      sizeParam({ sm: "px-3 py-1.5 text-xs", md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#ff00ff] text-black border-[#ff00ff]",
        "shadow-[2px_2px_0px_0px_#00ffff]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-transparent text-[#00ffff] border-[#00ffff]",
        "shadow-[2px_2px_0px_0px_#ff00ff]",
      ]),
      ghost: variant("ghost", "Ghost", "幽灵", [
        "bg-transparent text-white/70 border-white/30",
      ]),
    },
    slots: buttonSlots("PLAY"),
    states: {
      hover: [
        "hover:shadow-[4px_4px_0px_0px_#00ffff,-2px_-2px_0px_0px_#ff00ff]",
        "hover:text-white",
      ],
      active: ["active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"],
      disabled: ["opacity-40 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Dark card with VHS tape aesthetic, scan line overlay and retro glow",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-black",
        "border border-white/20",
        "rounded-sm",
        "overflow-hidden",
        "transition-all duration-300",
      ],
    },
    parameters: [
      {
        id: "padding",
        label: "Padding",
        labelZh: "内边距",
        type: "select",
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "p-3" },
          { value: "md", label: "Medium", labelZh: "中", classes: "p-5" },
          { value: "lg", label: "Large", labelZh: "大", classes: "p-8" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: variant("default", "Default", "默认", [
        "shadow-[0_0_10px_rgba(255,0,255,0.15)]",
      ]),
      magenta: variant("magenta", "Magenta", "品红", [
        "border-[#ff00ff]/40",
        "shadow-[0_0_15px_rgba(255,0,255,0.25)]",
      ]),
      cyan: variant("cyan", "Cyan", "青色", [
        "border-[#00ffff]/40",
        "shadow-[0_0_15px_rgba(0,255,255,0.25)]",
      ]),
    },
    slots: cardSlots("REC 00:00:00", "Tape content loading..."),
    states: {
      hover: [
        "hover:border-[#ff00ff]/50",
        "hover:shadow-[0_0_20px_rgba(255,0,255,0.3),0_0_20px_rgba(0,255,255,0.15)]",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "VHS-style input with monospace font, retro glow and scan line feel",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-black",
        "border border-white/20",
        "rounded-sm",
        "font-mono",
        "text-white",
        "placeholder:text-white/30",
        "focus:outline-none",
        "transition-all duration-200",
      ],
    },
    parameters: [
      sizeParam({ sm: "px-3 py-1.5 text-xs", md: "px-4 py-2.5 text-sm", lg: "px-5 py-3.5 text-base" }),
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
      magenta: variant("magenta", "Magenta", "品红", [
        "border-[#ff00ff]/40",
        "text-[#ff00ff]",
        "placeholder:text-[#ff00ff]/30",
      ]),
      cyan: variant("cyan", "Cyan", "青色", [
        "border-[#00ffff]/40",
        "text-[#00ffff]",
        "placeholder:text-[#00ffff]/30",
      ]),
    },
    slots: inputSlots("SEARCH TAPE..."),
    states: {
      focus: [
        "focus:border-[#ff00ff]",
        "focus:shadow-[0_0_10px_rgba(255,0,255,0.3)]",
      ],
      disabled: ["opacity-40 cursor-not-allowed"],
    },
  },
});
