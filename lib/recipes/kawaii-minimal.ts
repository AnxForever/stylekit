// Kawaii Minimal Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const kawaiiMinimalRecipes = createStyleRecipes("kawaii-minimal", "Kawaii Minimal", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Cute rounded button with soft pink accents",
    skeleton: {
      element: "button",
      baseClasses: ["font-sans", "font-medium", "rounded-full", "transition-all duration-200"],
    },
    parameters: [
      sizeParam({ sm: "px-4 py-1.5 text-sm", md: "px-6 py-2.5 text-base", lg: "px-8 py-3.5 text-lg" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", ["bg-pink-300 text-white shadow-sm"]),
      secondary: variant("secondary", "Secondary", "次要", ["bg-purple-100 text-purple-600"]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: ["hover:shadow-md hover:brightness-105"],
      active: ["active:scale-[0.97]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Soft warm card with gentle rounded corners",
    skeleton: {
      element: "div",
      baseClasses: ["bg-white", "border border-pink-100", "rounded-2xl", "shadow-sm", "overflow-hidden"],
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
    slots: cardSlots("Kawaii Card", "So cute and minimal"),
    states: { hover: ["hover:shadow-md"] },
  },
  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Soft rounded input with pink focus ring",
    skeleton: {
      element: "input",
      baseClasses: ["w-full", "bg-[#FFF7ED]", "border border-pink-200", "text-gray-800", "placeholder:text-gray-400", "focus:outline-none", "rounded-full", "transition-all duration-200"],
    },
    parameters: [sizeParam({ sm: "px-4 py-1.5 text-sm", md: "px-5 py-2.5 text-base", lg: "px-6 py-3.5 text-lg" })],
    variants: { default: variant("default", "Default", "默认", []) },
    slots: inputSlots("Type something cute..."),
    states: {
      focus: ["focus:border-pink-300 focus:ring-2 focus:ring-pink-200"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
