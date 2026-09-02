// Kinetic Constructivism Component Recipes
import {
  sizeParam,
  paddingParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const kineticConstructivismRecipes = createStyleRecipes(
  "kinetic-constructivism",
  "Kinetic Constructivism",
  {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Hard-edged constructivist block button with mechanical press",
      skeleton: {
        element: "button",
        baseClasses: [
          "inline-flex items-center justify-center gap-2",
          "uppercase font-extrabold tracking-[0.12em]",
          "border-2 border-[#17130E]",
          "rounded-none",
          "transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        ],
      },
      parameters: [
        sizeParam({ sm: "px-4 py-2 text-xs", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" }),
        fullWidthParam,
      ],
      variants: {
        primary: variant("primary", "Red", "红", ["bg-[#E0231B]", "text-[#EFE9DC]"]),
        ink: variant("ink", "Ink", "墨", ["bg-[#17130E]", "text-[#EFE9DC]"]),
        outline: variant("outline", "Outline", "描边", ["bg-transparent", "text-[#17130E]"]),
      },
      slots: buttonSlots("Build Forward"),
      states: {
        hover: ["hover:bg-[#17130E]", "hover:text-[#EFE9DC]"],
        active: ["active:scale-[0.98]"],
        focus: ["focus:outline-none", "focus:shadow-[0_0_0_3px_#E0231B]"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Boxed constructivist card with a thick top color rule",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative bg-[#EFE9DC]",
          "border-2 border-[#17130E]",
          "rounded-none",
        ],
      },
      parameters: [paddingParam({ sm: "p-4", md: "p-6", lg: "p-8" })],
      variants: {
        red: variant("red", "Red rule", "红条", ["border-t-[6px]", "border-t-[#E0231B]"]),
        blue: variant("blue", "Blue rule", "蓝条", ["border-t-[6px]", "border-t-[#1C4A87]"]),
        yellow: variant("yellow", "Yellow rule", "黄条", ["border-t-[6px]", "border-t-[#F4B301]"]),
      },
      slots: cardSlots("Motion Is Structure", "The disc does not decorate — it turns. Every part carries a force."),
      states: {
        hover: ["hover:-translate-y-0.5"],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Boxed field whose red baseline drives in on focus",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full bg-transparent px-3",
          "border-2 border-[#17130E]",
          "rounded-none",
          "text-[#17130E] placeholder-[#17130E]/30",
          "focus:outline-none",
          "transition-colors duration-300",
        ],
      },
      parameters: [
        sizeParam({ sm: "py-2 text-sm", md: "py-3 text-base", lg: "py-4 text-lg" }),
        fullWidthParam,
      ],
      variants: {
        default: variant("default", "Default", "默认", ["focus:border-[#E0231B]"]),
      },
      slots: inputSlots("Type here"),
      states: {
        focus: ["focus:border-[#E0231B]"],
      },
    },
  },
);
