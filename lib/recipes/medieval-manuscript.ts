// Medieval Manuscript Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const medievalManuscriptRecipes = createStyleRecipes("medieval-manuscript", "Medieval Manuscript", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Parchment-styled button with serif fonts, gold accents, and ornate border treatment",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-serif",
        "font-semibold",
        "rounded-sm",
        "border-2",
        "transition-all duration-300 ease-in-out",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5",
        lg: "px-7 py-3.5 text-lg",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#8b1a1a] text-[#f0e6d0]",
        "border-[#c9a74e]",
        "shadow-md shadow-[#8b1a1a]/30",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#f0e6d0] text-[#8b1a1a]",
        "border-[#8b1a1a]/40",
      ]),
      gold: variant("gold", "Gold", "金色", [
        "bg-[#c9a74e] text-[#8b1a1a]",
        "border-[#8b1a1a]",
        "shadow-md shadow-[#c9a74e]/30",
      ]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: [
        "hover:shadow-lg",
        "hover:scale-105",
        "hover:brightness-110",
      ],
      active: ["active:scale-95"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Parchment card with gold-leafed borders and manuscript-style ornamentation",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#f0e6d0]",
        "rounded-sm",
        "border-2 border-[#c9a74e]/60",
        "shadow-lg",
        "font-serif",
        "transition-all duration-300 ease-in-out",
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
      default: variant("default", "Default", "默认", []),
      illuminated: variant("illuminated", "Illuminated", "彩饰", [
        "border-[#c9a74e]",
        "bg-gradient-to-br from-[#f0e6d0] to-[#c9a74e]/15",
      ]),
      crimson: variant("crimson", "Crimson", "深红", [
        "border-[#8b1a1a]/60",
        "bg-gradient-to-br from-[#f0e6d0] to-[#8b1a1a]/10",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: [
        "hover:shadow-xl",
        "hover:border-[#c9a74e]",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Parchment-styled input with serif font, gold-accented focus, and manuscript feel",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "rounded-sm",
        "border-2 border-[#c9a74e]/30",
        "bg-[#f0e6d0]",
        "text-[#8b1a1a]",
        "placeholder:text-[#8b1a1a]/35",
        "font-serif",
        "focus:outline-none",
        "transition-all duration-300 ease-in-out",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5",
        lg: "px-5 py-3.5 text-lg",
      }),
      fullWidthParam,
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
      gilded: variant("gilded", "Gilded", "镀金", [
        "border-[#c9a74e]/50",
        "placeholder:text-[#c9a74e]/40",
      ]),
    },
    slots: inputSlots(),
    states: {
      focus: [
        "focus:border-[#c9a74e]/70",
        "focus:shadow-[0_0_12px_rgba(201,167,78,0.2)]",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
