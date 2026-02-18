// Tropical Paradise Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const tropicalParadiseRecipes = createStyleRecipes("tropical-paradise", "Tropical Paradise", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Bright tropical button with warm colors, rounded corners, and playful shadows",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-bold",
        "tracking-wide",
        "rounded-full",
        "transition-all duration-300",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#00897b] text-white",
        "shadow-lg shadow-[#00897b]/30",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#ff6f61] text-white",
        "shadow-lg shadow-[#ff6f61]/30",
      ]),
      sunny: variant("sunny", "Sunny", "阳光", [
        "bg-[#ffc107] text-[#1a1a1a]",
        "shadow-lg shadow-[#ffc107]/30",
      ]),
    },
    slots: buttonSlots("Let's Go"),
    states: {
      hover: [
        "hover:scale-105",
        "hover:shadow-xl",
      ],
      active: ["active:scale-[0.97]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Warm tropical card with soft rounded corners, sunny background, and colorful accents",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#fffde7]",
        "border border-[#00897b]/20",
        "rounded-2xl",
        "text-[#1a1a1a]",
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
          { value: "sm", label: "Small", labelZh: "小", classes: "p-4" },
          { value: "md", label: "Medium", labelZh: "中", classes: "p-6" },
          { value: "lg", label: "Large", labelZh: "大", classes: "p-8" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: variant("default", "Default", "默认", [
        "shadow-md",
      ]),
      coral: variant("coral", "Coral", "珊瑚", [
        "border-[#ff6f61]/30",
        "shadow-lg shadow-[#ff6f61]/10",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: [
        "hover:shadow-xl",
        "hover:-translate-y-1",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Warm rounded input with tropical teal focus ring and sunny background",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-white",
        "border-2 border-[#00897b]/20",
        "rounded-full",
        "text-[#1a1a1a]",
        "placeholder:text-[#00897b]/40",
        "focus:outline-none",
        "transition-all duration-300",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-4 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-6 py-3.5 text-lg",
      }),
      fullWidthParam,
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
      coral: variant("coral", "Coral", "珊瑚", [
        "border-[#ff6f61]/30",
        "placeholder:text-[#ff6f61]/40",
      ]),
    },
    slots: inputSlots("Search paradise..."),
    states: {
      focus: [
        "focus:border-[#00897b]",
        "focus:shadow-[0_0_0_3px_rgba(0,137,123,0.2)]",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
