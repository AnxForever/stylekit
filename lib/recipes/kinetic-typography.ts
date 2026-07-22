// Kinetic Typography Component Recipes
import {
  createStyleRecipes,
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
} from "./factory";

export const kineticTypographyRecipes = createStyleRecipes("kinetic-typography", "Kinetic Typography", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Sharp uppercase button with signal-orange hover and press scale",
    skeleton: {
      element: "button",
      baseClasses: [
        "uppercase tracking-[0.15em] font-semibold",
        "rounded-none",
        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "active:scale-[0.98]",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-5 py-2.5 text-xs",
        md: "px-7 py-3.5 text-sm",
        lg: "px-9 py-4 text-base",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#FF4D00] text-[#0B0B0C]",
        "hover:bg-[#F4F1EB]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-transparent text-[#F4F1EB]",
        "border border-[#F4F1EB]/25",
        "hover:border-[#FF4D00] hover:text-[#FF4D00]",
      ]),
      ghost: variant("ghost", "Ghost", "幽灵", [
        "bg-transparent text-[#F4F1EB]/60",
        "hover:text-[#F4F1EB]",
      ]),
    },
    slots: buttonSlots("Enter Motion"),
    states: {
      hover: ["hover:-translate-y-0.5"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Numbered editorial row whose headline gains weight on hover",
    skeleton: {
      element: "div",
      baseClasses: [
        "group",
        "border-t border-[#F4F1EB]/15",
        "rounded-none",
        "py-8 px-1",
        "bg-transparent",
        "transition-colors duration-500",
        "hover:border-[#FF4D00]",
      ],
    },
    parameters: [
      {
        id: "padding",
        label: "Padding",
        labelZh: "内边距",
        type: "select",
        options: [
          { value: "sm", label: "Compact", labelZh: "紧凑", classes: "py-5" },
          { value: "md", label: "Default", labelZh: "默认", classes: "py-8" },
          { value: "lg", label: "Roomy", labelZh: "宽松", classes: "py-12" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: variant("default", "Row", "行卡", []),
      raised: variant("raised", "Raised", "抬升", ["bg-[#141416] px-6 border border-[#F4F1EB]/10"]),
    },
    slots: cardSlots("Weight Is Volume", "The headline speaks louder as you approach — no color change, just mass."),
    states: {
      hover: [],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Bare underline field with orange focus baseline",
    skeleton: {
      element: "input",
      baseClasses: [
        "bg-transparent",
        "rounded-none",
        "border-b border-[#F4F1EB]/20",
        "py-3 text-xl",
        "text-[#F4F1EB] placeholder-[#F4F1EB]/25",
        "focus:outline-none focus:border-[#FF4D00]",
        "transition-colors duration-500",
      ],
    },
    parameters: [fullWidthParam],
    variants: {
      default: variant("default", "Underline", "下划线", []),
      boxed: variant("boxed", "Boxed", "边框", [
        "border border-[#F4F1EB]/20 px-4 text-base focus:border-[#FF4D00]",
      ]),
    },
    slots: inputSlots("Type here"),
    states: {
      focus: ["focus:placeholder-[#F4F1EB]/40"],
    },
  },
});
