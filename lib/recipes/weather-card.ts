// Weather Card Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const weatherCardRecipes = createStyleRecipes("weather-card", "Weather Card", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Sky gradient button with soft glow and sunset accent",
    skeleton: {
      element: "button",
      baseClasses: ["font-sans", "font-medium", "rounded-2xl", "border", "border-white/30", "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"],
    },
    parameters: [
      sizeParam({ sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Sky", "天空", ["bg-gradient-to-r from-[#87CEEB] to-[#6bb5d6] text-white", "shadow-[0_4px_16px_rgba(135,206,235,0.3)]"]),
      secondary: variant("secondary", "Sunset", "日落", ["bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white", "shadow-[0_4px_16px_rgba(255,107,53,0.3)]"]),
    },
    slots: buttonSlots("Check Weather"),
    states: {
      hover: ["hover:shadow-[0_8px_32px_rgba(135,206,235,0.4)]", "hover:-translate-y-0.5"],
      active: ["active:scale-[0.97]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Glassmorphic weather card with atmospheric backdrop",
    skeleton: {
      element: "div",
      baseClasses: ["bg-white/40", "backdrop-blur-[30px]", "border border-white/30", "rounded-2xl", "overflow-hidden"],
    },
    parameters: [{
      id: "padding", label: "Padding", labelZh: "内边距", type: "select",
      options: [
        { value: "sm", label: "Small", labelZh: "小", classes: "p-4" },
        { value: "md", label: "Medium", labelZh: "中", classes: "p-6" },
        { value: "lg", label: "Large", labelZh: "大", classes: "p-8" },
      ],
      default: "md",
    }],
    variants: { default: variant("default", "Default", "默认", ["shadow-[0_4px_16px_rgba(135,206,235,0.2)]"]) },
    slots: cardSlots("Weather", "Partly cloudy, 22C"),
    states: { hover: ["hover:shadow-[0_8px_32px_rgba(135,206,235,0.3)]", "hover:-translate-y-1"] },
  },
  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Soft cloud-like input with glassmorphic background",
    skeleton: {
      element: "input",
      baseClasses: ["w-full", "bg-white/50", "backdrop-blur-[20px]", "border border-white/30", "text-gray-700", "placeholder:text-gray-400", "focus:outline-none", "font-sans", "rounded-2xl", "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"],
    },
    parameters: [sizeParam({ sm: "px-3 py-2 text-sm", md: "px-4 py-3 text-base", lg: "px-5 py-4 text-lg" })],
    variants: { default: variant("default", "Default", "默认", []) },
    slots: inputSlots("Search location..."),
    states: {
      focus: ["focus:border-[#87CEEB] focus:shadow-[0_0_0_3px_rgba(135,206,235,0.3)]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
