// Graffiti Street Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const graffitiStreetRecipes = createStyleRecipes("graffiti-street", "Graffiti Street", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Urban spray-paint button with neon accents and bold uppercase text on dark surfaces",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-black",
        "uppercase",
        "tracking-widest",
        "rounded-none",
        "border-2",
        "skew-x-[-2deg]",
        "transition-all duration-200",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-7 py-3.5 text-lg",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#ff2d55] text-white",
        "border-[#ff2d55]",
        "shadow-[4px_4px_0_#00e5ff]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#1c1c1e] text-[#00e5ff]",
        "border-[#00e5ff]",
        "shadow-[4px_4px_0_#ffea00]",
      ]),
      accent: variant("accent", "Accent", "强调", [
        "bg-[#ffea00] text-[#1c1c1e]",
        "border-[#1c1c1e]",
        "shadow-[4px_4px_0_#ff2d55]",
      ]),
    },
    slots: buttonSlots("SPRAY"),
    states: {
      hover: [
        "hover:translate-x-[2px] hover:translate-y-[2px]",
        "hover:shadow-none",
      ],
      active: ["active:scale-[0.97]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Dark urban card with spray-paint drip borders and neon accent highlights",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#1c1c1e]",
        "border-2 border-[#ff2d55]",
        "rounded-none",
        "text-white",
        "transition-all duration-300",
      ],
    },
    parameters: [
      {
        id: "padding",
        label: "Padding",
        labelZh: "内边距",
        type: "select" as const,
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "p-3" },
          { value: "md", label: "Medium", labelZh: "中", classes: "p-5" },
          { value: "lg", label: "Large", labelZh: "大", classes: "p-8" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: variant("default", "Default", "默认", [
        "shadow-[6px_6px_0_#00e5ff]",
      ]),
      neon: variant("neon", "Neon", "霓虹", [
        "border-[#00e5ff]",
        "shadow-[0_0_20px_rgba(0,229,255,0.3)]",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: [
        "hover:shadow-[8px_8px_0_#ffea00]",
        "hover:border-[#ffea00]",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Dark street-style input with neon underline focus and bold placeholder",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#1c1c1e]",
        "border-2 border-gray-700",
        "rounded-none",
        "font-bold",
        "text-white",
        "placeholder:text-gray-500 placeholder:uppercase placeholder:tracking-wider",
        "focus:outline-none",
        "transition-all duration-200",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-5 py-3.5 text-lg",
      }),
      fullWidthParam,
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
      neon: variant("neon", "Neon", "霓虹", [
        "border-[#00e5ff]/50",
        "text-[#00e5ff]",
      ]),
    },
    slots: inputSlots("TAG HERE..."),
    states: {
      focus: [
        "focus:border-[#ff2d55]",
        "focus:shadow-[0_4px_0_#ff2d55]",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
