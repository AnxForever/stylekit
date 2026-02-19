// Arcade CRT Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const arcadeCrtRecipes = createStyleRecipes("arcade-crt", "Arcade CRT", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Retro arcade button with green CRT glow",
    skeleton: {
      element: "button",
      baseClasses: ["font-mono", "uppercase", "tracking-wider", "border-2", "transition-all duration-200"],
    },
    parameters: [
      sizeParam({ sm: "px-3 py-1.5 text-xs", md: "px-5 py-2 text-sm", lg: "px-7 py-3 text-base" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", ["bg-[#39ff14] text-black border-[#39ff14]", "shadow-[0_0_10px_rgba(57,255,20,0.4)]"]),
      secondary: variant("secondary", "Secondary", "次要", ["bg-transparent text-[#39ff14] border-[#39ff14]/60"]),
    },
    slots: buttonSlots("START"),
    states: {
      hover: ["hover:shadow-[0_0_20px_rgba(57,255,20,0.6)]"],
      active: ["active:scale-[0.97]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Dark CRT screen panel",
    skeleton: {
      element: "div",
      baseClasses: ["bg-[#0a0a0a]", "border border-[#39ff14]/30", "rounded-none", "overflow-hidden"],
    },
    parameters: [{
      id: "padding", label: "Padding", labelZh: "内边距", type: "select",
      options: [
        { value: "sm", label: "Small", labelZh: "小", classes: "p-3" },
        { value: "md", label: "Medium", labelZh: "中", classes: "p-5" },
        { value: "lg", label: "Large", labelZh: "大", classes: "p-7" },
      ],
      default: "md",
    }],
    variants: { default: variant("default", "Default", "默认", []) },
    slots: cardSlots("ARCADE", "INSERT COIN"),
    states: { hover: ["hover:border-[#39ff14]/50"] },
  },
  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "CRT terminal input with green text",
    skeleton: {
      element: "input",
      baseClasses: ["w-full", "bg-[#050505]", "border border-[#39ff14]/40", "text-[#39ff14]", "placeholder:text-[#39ff14]/30", "focus:outline-none", "font-mono", "rounded-none", "transition-all duration-200"],
    },
    parameters: [sizeParam({ sm: "px-3 py-1.5 text-xs", md: "px-4 py-2.5 text-sm", lg: "px-5 py-3 text-base" })],
    variants: { default: variant("default", "Default", "默认", []) },
    slots: inputSlots("> ENTER COMMAND_"),
    states: {
      focus: ["focus:border-[#39ff14] focus:shadow-[0_0_8px_rgba(57,255,20,0.3)]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
