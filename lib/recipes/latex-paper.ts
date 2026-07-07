// LaTeX Paper Component Recipes
import {
  sizeParam,
  fullWidthParam,
  paddingParam,
  buttonSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const latexPaperRecipes = createStyleRecipes("latex-paper", "LaTeX Paper", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Paper-context action: solid ink, thin ruled outline, or hyperref-blue citation link",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-serif",
        "tracking-tight",
        "rounded-none",
        "transition-colors duration-200",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5 text-sm",
        lg: "px-8 py-3 text-base",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#111111] text-[#FFFFFF]",
        "border border-[#111111]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-transparent text-[#111111]",
        "border border-[#111111]",
      ]),
      citation: variant("citation", "Citation", "引用", [
        "bg-transparent text-[#0B5394]",
        "border border-transparent",
        "underline-offset-2",
      ]),
    },
    slots: buttonSlots("Download PDF"),
    states: {
      hover: ["hover:bg-[#F5F5F0]"],
      active: ["active:bg-[#D4D4D0]/40"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Theorem environment: bold label plus italic body on a light fill with a left rule",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#F5F5F0]",
        "border-l-2 border-[#111111]",
        "rounded-none",
        "font-serif",
      ],
    },
    parameters: [
      paddingParam({
        sm: "px-4 py-3",
        md: "px-6 py-5",
        lg: "px-8 py-6",
      }),
      {
        id: "interactive",
        label: "Interactive",
        labelZh: "可交互",
        type: "boolean",
        default: false,
        trueClasses: "cursor-pointer",
      },
    ],
    variants: {
      theorem: variant("theorem", "Theorem", "定理", []),
      definition: variant("definition", "Definition", "定义", [
        "bg-[#FFFFFF]",
        "border border-[#111111] border-l-2",
      ]),
      remark: variant("remark", "Remark", "注记", [
        "bg-[#FFFFFF]",
        "border-l-2 border-[#D4D4D0]",
      ]),
    },
    slots: [
      { id: "title", label: "Label", labelZh: "标签", required: false, default: "Theorem 1.", type: "text" },
      { id: "children", label: "Body", labelZh: "正文", required: true, default: "Order, once visible, reads as credibility.", type: "children" },
    ],
    states: {
      hover: ["hover:border-l-[#0B5394]"],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Manuscript field: thin rule border that turns to ink on focus, no rings",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#FFFFFF]",
        "font-serif",
        "text-[#111111]",
        "placeholder:text-[#6B6B66] placeholder:italic",
        "rounded-none",
        "focus:outline-none",
        "transition-colors duration-200",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-2.5 py-1.5 text-sm",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-2.5 text-base",
      }),
    ],
    variants: {
      default: variant("default", "Default", "默认", [
        "border border-[#D4D4D0]",
      ]),
      underline: variant("underline", "Underline", "下划线", [
        "border-0 border-b border-[#111111]",
        "px-0",
      ]),
    },
    slots: inputSlots("name@university.edu"),
    states: {
      focus: ["focus:border-[#111111]"],
      disabled: ["opacity-50 cursor-not-allowed bg-[#F5F5F0]"],
    },
  },
});
