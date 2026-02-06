// Dashboard Layout Component Recipes
import type { StyleRecipes } from "./types";

export const dashboardLayoutRecipes: StyleRecipes = {
  styleSlug: "dashboard-layout",
  styleName: "Dashboard Layout",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Compact functional button for data-focused dashboard interfaces",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "rounded-lg",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1.5 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2 md:px-5 md:py-2.5 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base" },
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
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-gray-100 text-[#111827]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#111827]",
            "border border-gray-200",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Export Data", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-[#4f46e5]",
        ],
        active: ["active:bg-[#4338ca]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "KPI metric card with subtle border for data dashboard panels",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "rounded-xl",
          "border border-gray-100",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "p-3 md:p-4" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-4 md:p-6" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-6 md:p-8" },
          ],
          default: "md",
        },
        {
          id: "interactive",
          label: "Interactive",
          labelZh: "可交互",
          type: "boolean",
          default: false,
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
          ],
        },
        kpi: {
          id: "kpi",
          label: "KPI",
          labelZh: "指标",
          classes: [
            "shadow-sm",
            "border-l-4 border-l-[#6366f1]",
          ],
        },
        chart: {
          id: "chart",
          label: "Chart",
          labelZh: "图表",
          classes: [
            "shadow-sm",
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
      description: "Compact search input for dashboard toolbar and filter panels",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-gray-50",
          "border border-gray-200",
          "rounded-lg",
          "text-sm text-[#111827]",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2.5 py-1.5 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-3 py-2 md:px-4 md:py-2 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-2.5 md:px-5 md:py-3 text-sm md:text-base" },
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
        white: {
          id: "white",
          label: "White",
          labelZh: "白色",
          classes: ["bg-white"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Search...", type: "text" },
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
