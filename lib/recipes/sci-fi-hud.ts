// Sci-Fi HUD Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const sciFiHudRecipes = createStyleRecipes("sci-fi-hud", "Sci-Fi HUD", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Tech HUD button with cyan glow and monospace text",
    skeleton: {
      element: "button",
      baseClasses: ["font-mono", "uppercase", "tracking-widest", "border", "transition-all duration-200"],
    },
    parameters: [
      sizeParam({ sm: "px-3 py-1.5 text-[11px]", md: "px-4 py-2 text-xs", lg: "px-5 py-2.5 text-sm" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", ["bg-cyan-500/10 text-cyan-400 border-cyan-500/40", "shadow-[0_0_12px_rgba(34,211,238,0.2)]"]),
      ghost: variant("ghost", "Ghost", "幽灵", ["bg-transparent text-cyan-300 border-cyan-500/30"]),
    },
    slots: buttonSlots("ENGAGE"),
    states: {
      hover: ["hover:bg-cyan-500/20 hover:border-cyan-400/60"],
      active: ["active:scale-[0.98]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Dark HUD panel with cyan border glow",
    skeleton: {
      element: "div",
      baseClasses: ["bg-slate-900/85", "border border-cyan-500/25", "rounded-lg"],
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
    slots: cardSlots("HUD Panel", "System status nominal"),
    states: { hover: ["hover:border-cyan-400/45"] },
  },
  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Dark terminal input with cyan focus glow",
    skeleton: {
      element: "input",
      baseClasses: ["w-full", "bg-[#020617]/90", "border border-cyan-500/35", "text-cyan-100", "placeholder:text-cyan-400/40", "focus:outline-none", "font-mono", "rounded-md", "transition-all duration-200"],
    },
    parameters: [sizeParam({ sm: "px-3 py-2 text-xs", md: "px-4 py-2.5 text-sm", lg: "px-5 py-3 text-base" })],
    variants: { default: variant("default", "Default", "默认", []) },
    slots: inputSlots("Search node..."),
    states: {
      focus: ["focus:border-cyan-300 focus:shadow-[0_0_12px_rgba(34,211,238,0.25)]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
