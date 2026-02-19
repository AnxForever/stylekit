// Anti Design Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const antiDesignRecipes = createStyleRecipes("anti-design", "Anti Design", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Intentionally chaotic button breaking design rules",
    skeleton: {
      element: "button",
      baseClasses: ["font-mono", "font-black", "uppercase", "rounded-none", "transition-all duration-100"],
    },
    parameters: [
      sizeParam({ sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-base", lg: "px-7 py-3.5 text-lg" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", ["bg-[#FF0000] text-white border-4 border-black"]),
      yellow: variant("yellow", "Yellow", "黄色", ["bg-[#FFFF00] text-black border-4 border-black"]),
    },
    slots: buttonSlots("CLICK!!!"),
    states: {
      hover: ["hover:rotate-1 hover:scale-105"],
      active: ["active:scale-95"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Mismatched chaotic card",
    skeleton: {
      element: "div",
      baseClasses: ["bg-[#FFFF00]", "border-4 border-black", "rounded-none", "overflow-hidden"],
    },
    parameters: [{
      id: "padding", label: "Padding", labelZh: "内边距", type: "select",
      options: [
        { value: "sm", label: "Small", labelZh: "小", classes: "p-3" },
        { value: "md", label: "Medium", labelZh: "中", classes: "p-5" },
        { value: "lg", label: "Large", labelZh: "大", classes: "p-8" },
      ],
      default: "md",
    }],
    variants: { default: variant("default", "Default", "默认", []) },
    slots: cardSlots("ANTI DESIGN", "Rules are meant to be broken"),
    states: { hover: ["hover:-rotate-1"] },
  },
  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Deliberately ugly input",
    skeleton: {
      element: "input",
      baseClasses: ["w-full", "bg-white", "border-4 border-black", "text-black", "placeholder:text-black/40", "focus:outline-none", "font-mono", "font-black", "rounded-none", "transition-all duration-100"],
    },
    parameters: [sizeParam({ sm: "px-3 py-1.5 text-sm", md: "px-4 py-2.5 text-base", lg: "px-5 py-3 text-lg" })],
    variants: { default: variant("default", "Default", "默认", []) },
    slots: inputSlots("TYPE HERE!!!"),
    states: {
      focus: ["focus:bg-[#FFFF00] focus:border-[#FF0000]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
