// Cubism Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const cubismRecipes = createStyleRecipes("cubism", "Cubism", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Fragmented angular button with muted earth tones and geometric offset shadows",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-bold",
        "uppercase",
        "tracking-wider",
        "rounded-none",
        "border-2",
        "skew-x-[-3deg]",
        "transition-all duration-200",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-7 py-3.5 text-lg",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#5c4033] text-[#e8dcc8]",
        "border-[#5c4033]",
        "shadow-[3px_3px_0_#8b7355]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#e8dcc8] text-[#5c4033]",
        "border-[#5c4033]",
        "shadow-[3px_3px_0_#3d5c6e]",
      ]),
      slate: variant("slate", "Slate", "石板", [
        "bg-[#3d5c6e] text-[#e8dcc8]",
        "border-[#3d5c6e]",
        "shadow-[3px_3px_0_#5c4033]",
      ]),
    },
    slots: buttonSlots("Fragment"),
    states: {
      hover: [
        "hover:translate-x-[1px] hover:translate-y-[1px]",
        "hover:shadow-[1px_1px_0_#8b7355]",
      ],
      active: ["active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Fragmented card with angular geometry, muted earth tones, and layered offset borders",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#e8dcc8]",
        "border-2 border-[#5c4033]",
        "rounded-none",
        "text-[#5c4033]",
        "transition-all duration-200",
      ],
    },
    parameters: [
      {
        id: "padding",
        label: "Padding",
        labelZh: "内边距",
        type: "select" as const,
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
        "shadow-[5px_5px_0_#8b7355]",
      ]),
      angular: variant("angular", "Angular", "棱角", [
        "skew-x-[-1deg]",
        "shadow-[5px_5px_0_#3d5c6e]",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: [
        "hover:shadow-[7px_7px_0_#3d5c6e]",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Angular input with earth-toned borders and geometric offset focus state",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#e8dcc8]",
        "border-2 border-[#5c4033]/40",
        "rounded-none",
        "font-bold",
        "text-[#5c4033]",
        "placeholder:text-[#5c4033]/40 placeholder:uppercase",
        "focus:outline-none",
        "transition-all duration-200",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-5 py-3.5 text-lg",
      }),
      fullWidthParam,
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
      slate: variant("slate", "Slate", "石板", [
        "border-[#3d5c6e]/40",
        "text-[#3d5c6e]",
      ]),
    },
    slots: inputSlots("COMPOSE..."),
    states: {
      focus: [
        "focus:border-[#5c4033]",
        "focus:shadow-[3px_3px_0_#8b7355]",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
