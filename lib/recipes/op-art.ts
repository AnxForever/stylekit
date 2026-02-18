// Op Art Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const opArtRecipes = createStyleRecipes("op-art", "Op Art", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "High contrast black/white button with optical illusion patterns",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-sans",
        "font-extrabold",
        "uppercase",
        "tracking-wider",
        "rounded-none",
        "border-4 border-[#000000]",
        "transition-all duration-100",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-7 py-3.5 text-base",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#000000] text-[#ffffff]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#ffffff] text-[#000000]",
      ]),
      accent: variant("accent", "Accent", "强调", [
        "bg-[#ff3300] text-[#ffffff] border-[#ff3300]",
      ]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: ["hover:invert"],
      active: ["active:scale-95"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "High contrast card with bold borders and optical patterns",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#ffffff]",
        "border-4 border-[#000000]",
        "rounded-none",
        "shadow-[6px_6px_0_#000000]",
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
      inverted: variant("inverted", "Inverted", "反转", [
        "bg-[#000000] text-[#ffffff] border-[#ffffff]",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: ["hover:shadow-[8px_8px_0_#ff3300]"],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "High contrast input with bold black/white optical styling",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#ffffff]",
        "border-4 border-[#000000]",
        "rounded-none",
        "font-sans",
        "font-bold",
        "text-[#000000]",
        "placeholder:text-[#000000]/30",
        "focus:outline-none",
        "transition-all duration-100",
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
    },
    slots: inputSlots(),
    states: {
      focus: ["focus:border-[#ff3300] focus:shadow-[4px_4px_0_#ff3300]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
