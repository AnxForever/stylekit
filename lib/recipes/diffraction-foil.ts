// Diffraction Foil Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const diffractionFoilRecipes = createStyleRecipes("diffraction-foil", "Diffraction Foil", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Light silver foil with ink text; the spectrum follows the pointer lamp",
    skeleton: {
      element: "button",
      baseClasses: [
        "relative isolate inline-flex items-center justify-center overflow-hidden",
        "rounded-xl font-sans font-semibold tracking-wide",
        "transition-transform duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9c8d4]",
      ],
    },
    parameters: [
      sizeParam({ sm: "px-4 py-1.5 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-3.5 text-lg" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Foil", "镭射", ["foil foil-light text-[#16151c]", "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_24px_-14px_rgba(0,0,0,0.8)]"]),
      ghost: variant("ghost", "Ghost", "线框", ["bg-transparent text-[#ececf2] border border-white/20 hover:border-white/40"]),
    },
    slots: buttonSlots("Open a pack"),
    states: {
      active: ["active:scale-[0.98]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Dark frame on the print sheet, ready to hold a foil panel",
    skeleton: {
      element: "div",
      baseClasses: ["bg-[#141319]", "border border-white/10", "rounded-2xl", "overflow-hidden", "text-[#ececf2]"],
    },
    parameters: [{
      id: "padding", label: "Padding", labelZh: "内边距", type: "select",
      options: [
        { value: "sm", label: "Small", labelZh: "小", classes: "p-4" },
        { value: "md", label: "Medium", labelZh: "中", classes: "p-5" },
        { value: "lg", label: "Large", labelZh: "大", classes: "p-8" },
      ],
      default: "md",
    }],
    variants: { default: variant("default", "Default", "默认", ["shadow-[0_24px_48px_-28px_rgba(0,0,0,0.9)]"]) },
    slots: cardSlots("Lumen · No. 042", "Hot-stamped diffraction foil"),
    states: { hover: ["hover:border-white/25"] },
  },
  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Dark redeem-code field with spaced monospace text and a silver focus edge",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full", "bg-[#141319]", "border border-white/15", "rounded-xl",
        "font-mono tracking-[0.2em]", "text-[#ececf2]", "placeholder:text-[#6c6b78]",
        "focus:outline-none", "focus:border-[#c9c8d4]", "transition-colors",
      ],
    },
    parameters: [sizeParam({ sm: "px-3 py-2 text-sm", md: "px-4 py-3 text-base", lg: "px-5 py-3.5 text-lg" })],
    variants: { default: variant("default", "Default", "默认", []) },
    slots: inputSlots("XXXX-XXXX-XXXX"),
    states: {
      focus: ["focus-visible:ring-2 focus-visible:ring-[#c9c8d4]/40"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
