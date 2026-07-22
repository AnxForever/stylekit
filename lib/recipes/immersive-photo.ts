// Immersive Photo Component Recipes
import {
  createStyleRecipes,
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
} from "./factory";

export const immersivePhotoRecipes = createStyleRecipes("immersive-photo", "Immersive Photo", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Frosted button that stays legible over any photograph",
    skeleton: {
      element: "button",
      baseClasses: [
        "inline-flex items-center gap-2",
        "rounded-full",
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
      frost: variant("frost", "Frosted", "毛玻璃", [
        "bg-white/12 backdrop-blur-md border border-white/30 text-white",
        "hover:bg-white/20 hover:border-white/50",
      ]),
      amber: variant("amber", "Amber", "琥珀", [
        "bg-[#E8B04B] text-[#0C0D10] font-semibold",
        "hover:bg-[#f0bd5f]",
      ]),
      ghost: variant("ghost", "Ghost", "幽灵", [
        "bg-transparent text-white/80 border border-white/20",
        "hover:text-white hover:border-white/40",
      ]),
    },
    slots: buttonSlots("View the series"),
    states: {
      hover: [],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Full-bleed photo card with a gradient scrim caption",
    skeleton: {
      element: "div",
      baseClasses: [
        "relative overflow-hidden",
        "rounded-2xl",
        "bg-[#1A1C22]",
      ],
    },
    parameters: [
      {
        id: "padding",
        label: "Ratio",
        labelZh: "比例",
        type: "select",
        options: [
          { value: "portrait", label: "Portrait", labelZh: "竖幅", classes: "aspect-[4/5]" },
          { value: "landscape", label: "Landscape", labelZh: "横幅", classes: "aspect-[16/10]" },
          { value: "square", label: "Square", labelZh: "方形", classes: "aspect-square" },
        ],
        default: "portrait",
      },
    ],
    variants: {
      photo: variant("photo", "Photo", "照片", []),
      framed: variant("framed", "Framed", "带框", ["border border-white/15 p-1"]),
    },
    slots: cardSlots("First light on the ridge", "Field notes from the dawn ascent."),
    states: {
      hover: [],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Frosted field readable over imagery",
    skeleton: {
      element: "input",
      baseClasses: [
        "bg-white/10 backdrop-blur-md",
        "border border-white/25",
        "rounded-full",
        "px-5 py-3",
        "text-white placeholder-white/50",
        "focus:outline-none focus:border-white/60 focus:bg-white/15",
        "transition-all duration-300",
      ],
    },
    parameters: [fullWidthParam],
    variants: {
      frost: variant("frost", "Frosted", "毛玻璃", []),
      solid: variant("solid", "Solid", "实底", ["bg-[#1A1C22] border-white/15 backdrop-blur-none"]),
    },
    slots: inputSlots("Your email"),
    states: {
      focus: [],
    },
  },
});
