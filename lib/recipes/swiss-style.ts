// Swiss Style Component Recipes
import type { StyleRecipes } from "./types";

export const swissStyleRecipes: StyleRecipes = {
  styleSlug: "swiss-style",
  styleName: "Swiss Style",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Swiss-style button with strict alignment, black/white/red palette and minimal rounding",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-sans",
          "font-bold",
          "uppercase",
          "tracking-widest",
          "rounded-sm",
          "transition-all duration-150",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-1.5 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2 md:px-6 md:py-2.5 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-3 md:px-8 md:py-3.5 text-base" },
          ],
          default: "md",
        },
        {
          id: "fullWidth",
          label: "Full Width",
          labelZh: "全宽",
          type: "boolean",
          default: false,
          trueClasses: "w-full",
        },
      ],
      variants: {
        primary: {
          id: "primary",
          label: "Primary",
          labelZh: "主要",
          classes: [
            "bg-black text-white",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#e30613] text-white",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-black",
            "border-2 border-black",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "BUTTON", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-[#e30613] hover:text-white",
        ],
        active: ["active:opacity-80"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Grid-aligned card with minimal black border and clean spacing",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "border border-black",
          "font-sans",
          "transition-all duration-200",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-6 md:p-8" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-8 md:p-12" },
          ],
          default: "md",
        },
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
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "border-l-4 border-l-[#e30613]",
          ],
        },
        inverted: {
          id: "inverted",
          label: "Inverted",
          labelZh: "反色",
          classes: [
            "bg-black text-white border-black",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:border-[#e30613]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Clean bottom-line input with Helvetica/sans-serif typography",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "border-0 border-b-2 border-black",
          "rounded-none",
          "bg-transparent",
          "font-sans",
          "text-black",
          "placeholder:text-gray-400",
          "focus:outline-none",
          "transition-colors duration-200",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "py-2 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "py-3 md:py-4 text-base md:text-lg" },
          ],
          default: "md",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: ["border-[#e30613]"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#e30613]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
