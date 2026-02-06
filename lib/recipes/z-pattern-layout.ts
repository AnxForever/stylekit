// Z-Pattern Layout Component Recipes
import type { StyleRecipes } from "./types";

export const zPatternLayoutRecipes: StyleRecipes = {
  styleSlug: "z-pattern-layout",
  styleName: "Z-Pattern Layout",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "CTA-focused button with gradient shadow for Z-pattern conversion points",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-semibold",
          "rounded-xl",
          "transition-all duration-300",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-2 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-6 py-3 md:px-8 md:py-4 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-8 py-4 md:px-10 md:py-5 text-base md:text-lg" },
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
            "bg-[#6366f1] text-white",
            "shadow-lg shadow-[#6366f1]/25",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#0f172a] text-white",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#0f172a]",
            "border border-gray-200",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Get Started", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-xl hover:shadow-[#6366f1]/30",
          "hover:-translate-y-0.5",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Clean center-aligned feature card for Z-pattern diagonal content",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "rounded-2xl",
          "text-center",
          "transition-shadow duration-200",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4 md:p-6" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-6 md:p-8" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-8 md:p-10" },
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
          classes: [
            "shadow-sm",
            "border border-gray-100",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "shadow-sm",
            "border border-[#6366f1]/20",
          ],
        },
        gradient: {
          id: "gradient",
          label: "Gradient",
          labelZh: "渐变",
          classes: [
            "bg-gradient-to-br from-white to-indigo-50",
            "shadow-sm border border-gray-100",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-md",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Rounded input for Z-pattern email subscription and lead capture",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white",
          "border border-gray-200",
          "rounded-xl",
          "text-[#0f172a]",
          "placeholder:text-gray-400",
          "focus:outline-none",
          "transition-all duration-200",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2.5 md:px-4 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-3 md:px-6 md:py-4 text-base md:text-lg" },
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
          classes: ["bg-gray-50"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Enter your email...", type: "text" },
      ],
      states: {
        focus: [
          "focus:ring-2 focus:ring-[#6366f1]/20",
          "focus:border-[#6366f1]",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-gray-100"],
      },
    },
  },
};
