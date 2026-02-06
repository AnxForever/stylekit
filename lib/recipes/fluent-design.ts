// Fluent Design Component Recipes
import type { StyleRecipes } from "./types";

export const fluentDesignRecipes: StyleRecipes = {
  styleSlug: "fluent-design",
  styleName: "Fluent Design",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Acrylic-style button with subtle shadows, rounded corners and smooth transitions",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-semibold",
          "rounded-md",
          "shadow-[0_1.6px_3.6px_rgba(0,0,0,0.13),0_0.3px_0.9px_rgba(0,0,0,0.1)]",
          "transition-all duration-150 ease-out",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2 md:px-6 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-3 md:px-8 md:py-4 text-base md:text-lg" },
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
            "bg-[#0078d4] text-white",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-white text-[#323130]",
            "border border-[#8a8886]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#0078d4]",
            "border border-[#0078d4]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_3.2px_7.2px_rgba(0,0,0,0.13),0_0.6px_1.8px_rgba(0,0,0,0.1)]",
          "hover:scale-[1.01]",
        ],
        active: ["active:scale-[0.99]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Acrylic surface card with layered depth shadows and subtle borders",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "rounded-md md:rounded-lg",
          "border border-[#e1e1e1]",
          "shadow-[0_1.6px_3.6px_rgba(0,0,0,0.13),0_0.3px_0.9px_rgba(0,0,0,0.1)]",
          "transition-all duration-150 ease-out",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-3 md:p-4" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-4 md:p-5" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-5 md:p-8" },
          ],
          default: "md",
        },
        {
          id: "interactive",
          label: "Interactive",
          labelZh: "可交互",
          type: "boolean",
          default: true,
          trueClasses: "hover:-translate-y-0.5 cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        acrylic: {
          id: "acrylic",
          label: "Acrylic",
          labelZh: "亚克力",
          classes: [
            "bg-white/80",
            "backdrop-blur-md",
          ],
        },
        elevated: {
          id: "elevated",
          label: "Elevated",
          labelZh: "浮起",
          classes: [
            "shadow-[0_6.4px_14.4px_rgba(0,0,0,0.13),0_1.2px_3.6px_rgba(0,0,0,0.1)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_6.4px_14.4px_rgba(0,0,0,0.18),0_1.2px_3.6px_rgba(0,0,0,0.14)]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Clean input field with subtle border and Fluent-style focus indicator",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-md",
          "border border-[#8a8886]",
          "bg-white",
          "font-sans",
          "text-[#323130]",
          "placeholder:text-[#a19f9d]",
          "focus:outline-none",
          "transition-all duration-150 ease-out",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-3 py-2 md:px-4 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-3 md:px-5 md:py-4 text-base md:text-lg" },
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
        filled: {
          id: "filled",
          label: "Filled",
          labelZh: "填充",
          classes: ["bg-[#f3f2f1] border-transparent"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#0078d4]",
          "focus:shadow-[0_0_0_1px_rgba(0,120,212,0.3)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-[#f3f2f1]"],
      },
    },
  },
};
