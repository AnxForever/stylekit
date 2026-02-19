// African Textile Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const africanTextileRecipes = createStyleRecipes("african-textile", "African Textile", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Bold button with warm earth tones, strong borders, and textile-inspired patterns",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-bold",
        "uppercase",
        "tracking-wider",
        "rounded-none",
        "border-3",
        "transition-all duration-300 ease-in-out",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5",
        lg: "px-7 py-3.5 text-lg",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#c4501f] text-[#f0c75e]",
        "border-[#f0c75e]",
        "shadow-md shadow-[#c4501f]/30",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#2c1810] text-[#f0c75e]",
        "border-[#c4501f]",
      ]),
      forest: variant("forest", "Forest", "森林", [
        "bg-[#1a5632] text-[#f0c75e]",
        "border-[#f0c75e]",
        "shadow-md shadow-[#1a5632]/30",
      ]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: [
        "hover:shadow-lg",
        "hover:scale-105",
        "hover:brightness-110",
      ],
      active: ["active:scale-95"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Dark card with warm earth-toned borders evoking African textile patterns",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#2c1810]",
        "rounded-none",
        "border-4 border-[#c4501f]",
        "shadow-lg",
        "transition-all duration-300 ease-in-out",
      ],
    },
    parameters: [
      {
        id: "padding",
        label: "Padding",
        labelZh: "内边距",
        type: "select",
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "p-3" },
          { value: "md", label: "Medium", labelZh: "中", classes: "p-5" },
          { value: "lg", label: "Large", labelZh: "大", classes: "p-8" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
      kente: variant("kente", "Kente", "肯特", [
        "border-[#f0c75e]",
        "bg-gradient-to-br from-[#2c1810] to-[#c4501f]/20",
      ]),
      forest: variant("forest", "Forest", "森林", [
        "border-[#1a5632]",
        "bg-gradient-to-br from-[#2c1810] to-[#1a5632]/20",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: [
        "hover:shadow-xl",
        "hover:border-[#f0c75e]",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Input with dark background, bold borders, and warm earth-toned accents",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "rounded-none",
        "border-2 border-[#c4501f]/50",
        "bg-[#2c1810]",
        "text-[#f0c75e]",
        "placeholder:text-[#f0c75e]/40",
        "font-bold",
        "tracking-wide",
        "focus:outline-none",
        "transition-all duration-300 ease-in-out",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5",
        lg: "px-5 py-3.5 text-lg",
      }),
      fullWidthParam,
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
      kente: variant("kente", "Kente", "肯特", [
        "border-[#f0c75e]/50",
        "placeholder:text-[#c4501f]/50",
      ]),
    },
    slots: inputSlots(),
    states: {
      focus: [
        "focus:border-[#f0c75e]",
        "focus:shadow-[0_0_12px_rgba(240,199,94,0.25)]",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
