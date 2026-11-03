// Quantized Line Field Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const quantizedLineFieldRecipes = createStyleRecipes(
  "quantized-line-field",
  "Quantized Line Field",
  {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Quantized Line Field style button",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "rounded-md",
          "border border-[#202220]",
          "transition-colors duration-200",
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
          "bg-[#202220] text-[#fafaf8]",
        ]),
        secondary: variant("secondary", "Secondary", "次要", [
          "bg-[#fafaf8] text-[#202220]",
        ]),
        outline: variant("outline", "Outline", "轮廓", [
          "bg-transparent text-[#202220]",
        ]),
      },
      slots: buttonSlots("Explore"),
      states: {
        hover: ["hover:bg-[#267dff]", "hover:border-[#267dff]", "hover:text-white"],
        active: ["active:translate-y-px"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Quantized Line Field style card",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#fafaf8]",
          "border border-[#d9dbd5]",
          "rounded-md",
          "overflow-hidden",
          "transition-colors duration-200",
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
        scan: variant("scan", "Scan", "扫描", [
          "border-[#267dff]",
          "shadow-[0_0_0_1px_#267dff]",
        ]),
      },
      slots: cardSlots("Card Title", "Card content goes here."),
      states: {
        hover: ["hover:border-[#202220]"],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Quantized Line Field style input",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-[#fafaf8]",
          "border border-[#d9dbd5]",
          "rounded-md",
          "text-[#202220]",
          "font-normal",
          "placeholder:text-[#202220]/40",
          "focus:outline-none",
          "transition-colors duration-200",
        ],
      },
      parameters: [
        sizeParam({
          sm: "px-3 py-2 text-sm",
          md: "px-4 py-2.5 text-base",
          lg: "px-5 py-3.5 text-lg",
        }),
      ],
      variants: {
        default: variant("default", "Default", "默认", []),
      },
      slots: inputSlots("Type here..."),
      states: {
        focus: ["focus:border-[#267dff]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  }
);
