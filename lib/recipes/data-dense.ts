// Data Dense Component Recipes
import { createStyleRecipes } from "./factory";

export const dataDenseRecipes = createStyleRecipes("data-dense", "Data Dense", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Compact inline action button for high-density admin panels",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "rounded",
          "transition-colors duration-150",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2 py-0.5 text-[10px]" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-2.5 py-1 text-xs" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-3 py-1.5 text-xs" },
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
            "bg-[#3b82f6] text-white",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-white text-[#64748b]",
            "border border-[#e2e8f0]",
          ],
        },
        danger: {
          id: "danger",
          label: "Danger",
          labelZh: "危险",
          classes: [
            "text-[#ef4444] bg-transparent",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Action", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-[#2563eb]",
        ],
        active: ["active:scale-[0.97]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "KPI Card",
      nameZh: "指标卡片",
      description: "Compact KPI metric card with change indicator",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "rounded",
          "border border-[#e2e8f0]",
          "transition-colors duration-150",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2.5 py-2" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-3 py-2.5" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-3" },
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
        highlighted: {
          id: "highlighted",
          label: "Highlighted",
          labelZh: "高亮",
          classes: [
            "border-[#3b82f6]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Metric Label", labelZh: "指标名", required: false, default: "Revenue", type: "text" },
        { id: "children", label: "Value", labelZh: "数值", required: true, default: "$42,389", type: "children" },
      ],
      states: {
        hover: [
          "hover:bg-[#f8fafc]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Filter Input",
      nameZh: "过滤输入",
      description: "Small filter input for data table toolbars",
      skeleton: {
        element: "input",
        baseClasses: [
          "bg-white",
          "rounded",
          "border border-[#e2e8f0]",
          "text-[#1e293b]",
          "placeholder:text-[#94a3b8]",
          "focus:outline-none",
          "transition-colors duration-150",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2 py-1 text-[10px] w-32" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-2.5 py-1.5 text-xs w-48" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-3 py-2 text-xs w-64" },
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
          classes: ["bg-[#f8fafc] border-[#e2e8f0]"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Filter...", type: "text" },
      ],
      states: {
        focus: [
          "focus:ring-1 focus:ring-[#3b82f6]",
          "focus:border-[#3b82f6]",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-[#f8fafc]"],
      },
    },
});
