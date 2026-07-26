// Launch Keynote Component Recipes
import {
  createStyleRecipes,
  sizeParam,
  paddingParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
} from "./factory";

export const launchKeynoteRecipes = createStyleRecipes("launch-keynote", "Launch Keynote", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Electric-blue pill CTA and a hairline secondary",
    skeleton: {
      element: "button",
      baseClasses: [
        "inline-flex items-center gap-1.5",
        "rounded-full font-medium tracking-tight",
        "transition-all duration-300 ease-out",
        "active:scale-[0.98]",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-5 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      }),
      fullWidthParam,
    ],
    variants: {
      blue: variant("blue", "Electric Blue", "电蓝", [
        "bg-[#2997FF] text-white",
        "hover:bg-[#0071E3]",
      ]),
      surface: variant("surface", "Surface", "面板", [
        "bg-[#1D1D1F] text-[#F5F5F7] border border-white/10",
        "hover:border-white/25",
      ]),
      link: variant("link", "Text Link", "文字链接", [
        "bg-transparent text-[#2997FF] px-0",
        "hover:underline underline-offset-4",
      ]),
    },
    slots: buttonSlots("Buy"),
    states: {
      hover: [],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Elevated dark panel that floats on the black stage",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#1D1D1F]",
        "rounded-2xl",
      ],
    },
    parameters: [
      paddingParam({
        sm: "p-6",
        md: "p-8",
        lg: "p-10",
      }),
    ],
    variants: {
      spec: variant("spec", "Spec", "规格", []),
      framed: variant("framed", "Framed", "带框", ["border border-white/10"]),
      hero: variant("hero", "Hero", "主图", ["rounded-3xl overflow-hidden"]),
    },
    slots: cardSlots("A17 performance", "The fastest ever, and it is only getting started."),
    states: {
      hover: [],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Minimal field that reads clearly on the dark stage",
    skeleton: {
      element: "input",
      baseClasses: [
        "bg-[#1D1D1F]",
        "border border-white/10",
        "rounded-xl",
        "px-5 py-3",
        "text-[#F5F5F7] placeholder-[#86868B]",
        "focus:outline-none focus:border-[#2997FF]",
        "transition-colors duration-300",
      ],
    },
    parameters: [fullWidthParam],
    variants: {
      panel: variant("panel", "Panel", "面板", []),
      bare: variant("bare", "Bare", "极简", ["bg-transparent border-white/15"]),
    },
    slots: inputSlots("Email for launch updates"),
    states: {
      focus: [],
    },
  },
});
