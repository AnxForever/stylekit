import { createStyleRecipes, sizeParam, paddingParam, fullWidthParam, buttonSlots, cardSlots, inputSlots, variant } from "./factory";

export const quantizedLineFieldRecipes = createStyleRecipes("quantized-line-field", "Quantized Line Field", {
  button: {
    id: "button", name: "Source button", nameZh: "来源按钮", description: "Quiet outlined action with a precise blue focus ring.",
    skeleton: { element: "button", baseClasses: ["rounded-full", "border", "font-sans", "text-sm", "transition-colors duration-200", "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#267dff]"] },
    parameters: [sizeParam({ sm: "px-3 py-2", md: "px-5 py-2.5", lg: "px-7 py-3" }), fullWidthParam],
    variants: {
      primary: variant("primary", "Ink", "墨色", ["bg-[#202220] text-[#fafaf8] border-[#202220] hover:bg-[#363934]"]),
      outline: variant("outline", "Outline", "轮廓", ["bg-transparent text-[#202220] border-[#d9dbd5] hover:border-[#267dff]"]),
      blue: variant("blue", "Cobalt", "钴蓝", ["bg-[#2152e7] text-[#f7faff] border-[#2152e7] hover:bg-[#1944c4]"]),
      ghost: variant("ghost", "Text", "文字", ["bg-transparent text-[#202220] border-transparent underline underline-offset-4 hover:text-[#2152e7]"]),
    },
    slots: buttonSlots("Reveal the source →"),
    states: { active: ["active:opacity-80"], disabled: ["disabled:opacity-40 disabled:cursor-not-allowed"] },
  },
  card: {
    id: "card", name: "Identity surface", nameZh: "身份卡片", description: "Static container for a line-field canvas; the complete prompt supplies its rendering and interaction rules.",
    skeleton: { element: "div", baseClasses: ["relative isolate", "overflow-hidden", "rounded-[17px]", "font-sans"] },
    parameters: [paddingParam({ sm: "p-5", md: "p-7", lg: "p-9" })],
    variants: {
      default: variant("default", "Graphite", "石墨", ["bg-[#eeeeeb] text-[#202220]"]),
      blue: variant("blue", "Cobalt", "钴蓝", ["bg-[#2152e7] text-[#f7faff]"]),
      dark: variant("dark", "Carbon", "炭黑", ["bg-[#111212] text-[#f5f3ef]"]),
    },
    slots: cardSlots("Identity, in lines.", "One path. Four line weights."),
    states: { focus: ["focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#267dff]"] },
  },
  input: {
    id: "input", name: "Parameter input", nameZh: "参数输入框", description: "Clear field with a quiet border and blue focus.",
    skeleton: { element: "input", baseClasses: ["w-full rounded-xl", "border border-[#d9dbd5]", "bg-[#fafaf8] text-[#202220]", "font-sans text-sm", "placeholder:text-[#73766e]", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#267dff]"] },
    parameters: [sizeParam({ sm: "px-3 py-2", md: "px-4 py-3", lg: "px-5 py-4" })],
    variants: { default: variant("default", "Paper", "纸面", []) },
    slots: inputSlots("Your next identity"),
    states: { disabled: ["disabled:opacity-40 disabled:cursor-not-allowed"] },
  },
});
