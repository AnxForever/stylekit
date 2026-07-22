// Parallax Editorial Component Recipes
import {
  createStyleRecipes,
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
} from "./factory";

export const parallaxEditorialRecipes = createStyleRecipes("parallax-editorial", "Parallax Editorial", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Editorial serif link-button with a brick underline sweep",
    skeleton: {
      element: "button",
      baseClasses: [
        "group inline-flex items-center gap-2",
        "font-serif",
        "rounded-none",
        "transition-colors duration-300 ease-out",
        "active:opacity-80",
      ],
    },
    parameters: [
      sizeParam({
        sm: "text-base",
        md: "text-lg",
        lg: "text-xl",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#1A1712] text-[#F5F0E6] px-6 py-3",
        "hover:bg-[#B3401F]",
      ]),
      link: variant("link", "Link", "链接", [
        "text-[#1A1712]",
        "hover:text-[#B3401F]",
      ]),
      quiet: variant("quiet", "Quiet", "低调", [
        "text-[#1A1712]/60",
        "hover:text-[#1A1712]",
      ]),
    },
    slots: buttonSlots("Read the chapter"),
    states: {
      hover: [],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Chapter card with serif number and top rule",
    skeleton: {
      element: "div",
      baseClasses: [
        "border-t border-[#1A1712]/20",
        "rounded-none",
        "pt-5",
        "bg-transparent",
      ],
    },
    parameters: [
      {
        id: "padding",
        label: "Padding",
        labelZh: "内边距",
        type: "select",
        options: [
          { value: "sm", label: "Tight", labelZh: "紧凑", classes: "pt-4" },
          { value: "md", label: "Default", labelZh: "默认", classes: "pt-5" },
          { value: "lg", label: "Spacious", labelZh: "宽松", classes: "pt-8" },
        ],
        default: "md",
      },
    ],
    variants: {
      chapter: variant("chapter", "Chapter", "章节", []),
      inset: variant("inset", "Inset", "嵌入", ["bg-[#EBE3D3] p-6 border-t-0"]),
    },
    slots: cardSlots("The Register Shift", "When foreground and background slide out of register, the page gains the thickness of paper."),
    states: {
      hover: [],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Paper underline field with a brick focus rule",
    skeleton: {
      element: "input",
      baseClasses: [
        "bg-transparent",
        "rounded-none",
        "border-b border-[#1A1712]/25",
        "py-2.5 text-lg",
        "text-[#1A1712] placeholder-[#1A1712]/30",
        "focus:outline-none focus:border-[#B3401F]",
        "transition-colors duration-300",
      ],
    },
    parameters: [fullWidthParam],
    variants: {
      default: variant("default", "Underline", "下划线", []),
      boxed: variant("boxed", "Boxed", "边框", [
        "border border-[#1A1712]/25 px-4 text-base focus:border-[#B3401F]",
      ]),
    },
    slots: inputSlots("reader@paper.press"),
    states: {
      focus: [],
    },
  },
});
