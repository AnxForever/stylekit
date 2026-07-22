// Scrollytelling Component Recipes
import {
  createStyleRecipes,
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
} from "./factory";

export const scrollytellingRecipes = createStyleRecipes("scrollytelling", "Scrollytelling", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Signal-blue step button with a visible focus ring",
    skeleton: {
      element: "button",
      baseClasses: [
        "inline-flex items-center gap-2 font-semibold",
        "rounded-md",
        "transition-all duration-200 ease-out",
        "active:scale-[0.98]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6FED]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1116]",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-4 py-2 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-7 py-3 text-base",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#2F6FED] text-white",
        "hover:bg-[#2560d4]",
      ]),
      alert: variant("alert", "Alert", "警示", [
        "bg-[#E8503A] text-white",
        "hover:bg-[#d4402c]",
      ]),
      ghost: variant("ghost", "Ghost", "幽灵", [
        "bg-transparent text-[#F7F5F0]/70 border border-white/10",
        "hover:text-[#F7F5F0] hover:border-white/25",
      ]),
    },
    slots: buttonSlots("Next chapter"),
    states: {
      hover: [],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Step narration block with index and current-step accent rail",
    skeleton: {
      element: "div",
      baseClasses: [
        "relative",
        "border-l-2 border-[#2F6FED]",
        "rounded-none",
        "pl-6 py-4",
        "bg-transparent",
      ],
    },
    parameters: [
      {
        id: "padding",
        label: "Padding",
        labelZh: "内边距",
        type: "select",
        options: [
          { value: "sm", label: "Tight", labelZh: "紧凑", classes: "py-3" },
          { value: "md", label: "Default", labelZh: "默认", classes: "py-4" },
          { value: "lg", label: "Roomy", labelZh: "宽松", classes: "py-6" },
        ],
        default: "md",
      },
    ],
    variants: {
      step: variant("step", "Step", "步骤", []),
      surface: variant("surface", "Surface", "面板", ["bg-[#1C2530] rounded-md border-l-2"]),
    },
    slots: cardSlots("The line crosses zero", "As you reach this step, the chart above highlights the moment the trend flips."),
    states: {
      hover: [],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Dark-field input with a blue focus ring",
    skeleton: {
      element: "input",
      baseClasses: [
        "bg-[#1C2530] border border-white/10",
        "rounded-md",
        "px-4 py-2.5",
        "text-[#F7F5F0] placeholder-[#F7F5F0]/30",
        "focus:outline-none focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/30",
        "transition-all duration-200",
      ],
    },
    parameters: [fullWidthParam],
    variants: {
      default: variant("default", "Default", "默认", []),
      ghost: variant("ghost", "Ghost", "幽灵", ["bg-transparent border-white/15"]),
    },
    slots: inputSlots("2024"),
    states: {
      focus: [],
    },
  },
});
