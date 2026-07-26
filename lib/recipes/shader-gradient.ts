// Shader Gradient Component Recipes
import {
  createStyleRecipes,
  sizeParam,
  paddingParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
} from "./factory";

export const shaderGradientRecipes = createStyleRecipes("shader-gradient", "Shader Gradient", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Violet accent CTA and frosted-glass secondary",
    skeleton: {
      element: "button",
      baseClasses: [
        "inline-flex items-center gap-2",
        "rounded-xl font-medium",
        "transition-all duration-300 ease-out",
        "active:scale-[0.98]",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
      }),
      fullWidthParam,
    ],
    variants: {
      accent: variant("accent", "Accent", "强调", [
        "bg-[#7C5CFF] text-white",
        "shadow-[0_8px_30px_rgba(124,92,255,0.35)]",
        "hover:bg-[#8f72ff]",
      ]),
      glass: variant("glass", "Glass", "毛玻璃", [
        "bg-white/8 backdrop-blur-xl border border-white/12 text-white",
        "hover:bg-white/12 hover:border-white/20",
      ]),
      ghost: variant("ghost", "Ghost", "幽灵", [
        "bg-transparent text-white/70",
        "hover:text-white",
      ]),
    },
    slots: buttonSlots("Start building"),
    states: {
      hover: [],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Frosted-glass panel floating over the shader field",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-white/[0.06] backdrop-blur-2xl",
        "border border-white/10",
        "rounded-2xl",
        "shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
      ],
    },
    parameters: [
      paddingParam({
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      }),
    ],
    variants: {
      glass: variant("glass", "Glass", "毛玻璃", []),
      glow: variant("glow", "Glow", "辉光", [
        "border-[#7C5CFF]/25 shadow-[0_20px_60px_rgba(124,92,255,0.2)]",
      ]),
    },
    slots: cardSlots("Realtime by default", "Every frame is computed on the GPU. Nothing is baked."),
    states: {
      hover: [],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Frosted field legible over the gradient",
    skeleton: {
      element: "input",
      baseClasses: [
        "bg-white/[0.06] backdrop-blur-xl",
        "border border-white/12",
        "rounded-xl",
        "px-4 py-3",
        "text-white placeholder-white/40",
        "focus:outline-none focus:border-[#7C5CFF]/70 focus:bg-white/[0.09] focus:ring-2 focus:ring-[#7C5CFF]/25",
        "transition-all duration-300",
      ],
    },
    parameters: [fullWidthParam],
    variants: {
      glass: variant("glass", "Glass", "毛玻璃", []),
      solid: variant("solid", "Solid", "实底", ["bg-[#12131A] border-white/10 backdrop-blur-none"]),
    },
    slots: inputSlots("you@company.com"),
    states: {
      focus: [],
    },
  },
});
