// Luxe Lookbook Component Recipes - fashion maison digital flagship
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

export const luxeLookbookRecipes = createStyleRecipes("luxe-lookbook", "Luxe Lookbook", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Squared maison CTA in ink or a hairline outline",
    skeleton: {
      element: "button",
      baseClasses: [
        "inline-flex items-center justify-center",
        "rounded-none",
        "uppercase tracking-[0.2em] text-xs",
        "transition-all duration-500 ease-out",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-6 py-3",
        md: "px-9 py-4",
        lg: "px-12 py-5",
      }),
      fullWidthParam,
    ],
    variants: {
      ink: variant("ink", "Ink", "墨黑", [
        "bg-[#141210] text-[#F7F5F1]",
        "hover:bg-[#9A7B4F]",
      ]),
      outline: variant("outline", "Outline", "描边", [
        "bg-transparent text-[#141210] border border-[#141210]",
        "hover:bg-[#141210] hover:text-[#F7F5F1]",
      ]),
      quiet: variant("quiet", "Quiet", "低调", [
        "bg-transparent text-[#141210]",
        "border-b border-[#141210]/40 hover:border-[#9A7B4F] hover:text-[#9A7B4F]",
      ]),
    },
    slots: buttonSlots("Book an appointment"),
    states: {
      hover: [],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Editorial lookbook card with a portrait plate and hairline caption",
    skeleton: {
      element: "div",
      baseClasses: [
        "rounded-none",
        "bg-[#F7F5F1]",
        "border-t border-[#141210]/15",
      ],
    },
    parameters: [
      paddingParam({
        sm: "pt-5",
        md: "pt-7",
        lg: "pt-10",
      }),
    ],
    variants: {
      look: variant("look", "Lookbook", "画册", []),
      framed: variant("framed", "Framed", "带框", ["border border-[#141210]/15 p-8"]),
    },
    slots: cardSlots("The Camel Coat", "Look 01 - Autumn Maison, cut from double-faced wool."),
    states: {
      hover: [],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Underline field for the newsletter and appointment forms",
    skeleton: {
      element: "input",
      baseClasses: [
        "rounded-none",
        "bg-transparent",
        "border-b border-[#141210]/25",
        "px-0 py-3",
        "text-[#141210] placeholder-[#141210]/40",
        "uppercase tracking-[0.15em] text-xs",
        "focus:outline-none focus:border-[#9A7B4F]",
        "transition-all duration-500",
      ],
    },
    parameters: [fullWidthParam],
    variants: {
      hairline: variant("hairline", "Hairline", "细线", []),
      boxed: variant("boxed", "Boxed", "描边", ["border border-[#141210]/25 px-4"]),
    },
    slots: inputSlots("Your email"),
    states: {
      focus: [],
    },
  },
});
