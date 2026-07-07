// Oversized Typography Component Recipes
import {
  sizeParam,
  fullWidthParam,
  paddingParam,
  interactiveParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const oversizedTypographyRecipes = createStyleRecipes(
  "oversized-typography",
  "Oversized Typography",
  {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Mono uppercase label button with sharp corners; hover flips to international orange",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-mono",
          "uppercase",
          "tracking-widest",
          "rounded-none",
          "transition-colors duration-200",
        ],
      },
      parameters: [
        sizeParam({
          sm: "px-5 py-2.5 text-[10px]",
          md: "px-8 py-4 text-xs",
          lg: "px-10 py-5 text-sm",
        }),
        fullWidthParam,
      ],
      variants: {
        primary: variant("primary", "Primary", "主要", [
          "bg-[#0A0A0A] text-[#FAFAF8]",
          "border border-[#0A0A0A]",
        ]),
        outline: variant("outline", "Outline", "描边", [
          "bg-transparent text-[#0A0A0A]",
          "border border-[#0A0A0A]",
        ]),
        accent: variant("accent", "Accent", "强调", [
          "bg-[#FF4D00] text-[#FAFAF8]",
          "border border-[#FF4D00]",
        ]),
        ghost: variant("ghost", "Ghost", "文字", [
          "bg-transparent text-[#0A0A0A]",
          "border border-transparent",
          "underline underline-offset-8 decoration-2",
        ]),
      },
      slots: buttonSlots("Start a Project"),
      states: {
        hover: ["hover:bg-[#FF4D00]", "hover:border-[#FF4D00]", "hover:text-[#FAFAF8]"],
        active: ["active:bg-[#E64500]"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Index-row card: giant numbered title over a hairline, meta set in mono uppercase",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-transparent",
          "rounded-none",
          "border-t border-[#0A0A0A]/15",
          "transition-colors duration-200",
        ],
      },
      parameters: [
        paddingParam({
          sm: "py-5",
          md: "py-8",
          lg: "py-10 md:py-12",
        }),
        interactiveParam("cursor-pointer group"),
      ],
      variants: {
        default: variant("default", "Index Row", "索引行", []),
        boxed: variant("boxed", "Boxed", "边框", [
          "border border-[#0A0A0A]",
          "px-6",
        ]),
        inverted: variant("inverted", "Inverted", "反色", [
          "bg-[#0A0A0A] text-[#FAFAF8]",
          "border-t-0",
          "px-6",
        ]),
      },
      slots: cardSlots("Brand Identity", "Art Direction — 2026"),
      states: {
        hover: ["hover:text-[#FF4D00]"],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Bare underline input with mono uppercase text; the hairline turns orange on focus",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-transparent",
          "rounded-none",
          "border-0 border-b border-[#0A0A0A]/30",
          "font-mono uppercase tracking-widest",
          "text-[#0A0A0A]",
          "placeholder:text-[#71717A]",
          "focus:outline-none",
          "transition-colors duration-200",
        ],
      },
      parameters: [
        sizeParam({
          sm: "px-0 py-2.5 text-[10px]",
          md: "px-0 py-4 text-xs",
          lg: "px-0 py-5 text-sm",
        }),
      ],
      variants: {
        default: variant("default", "Underline", "下划线", []),
        boxed: variant("boxed", "Boxed", "边框", [
          "border border-[#0A0A0A]/30 px-4",
        ]),
        inverted: variant("inverted", "Inverted", "反色", [
          "border-[#FAFAF8]/30 text-[#FAFAF8] placeholder:text-[#FAFAF8]/40",
        ]),
      },
      slots: inputSlots("YOUR EMAIL"),
      states: {
        focus: ["focus:border-[#FF4D00]", "focus:border-b-2"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
);
