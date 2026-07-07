// Distill Style Component Recipes
import { createStyleRecipes } from "./factory";

export const distillStyleRecipes = createStyleRecipes("distill-style", "Distill Style", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Restrained academic action button with ink background, small radius, and quiet hover",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "rounded-md",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1.5 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2.5 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-3 text-base" },
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
            "bg-[#1F2933] text-white",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-white text-[#1F2933]",
            "border border-[#E5E7EB]",
          ],
        },
        link: {
          id: "link",
          label: "Link",
          labelZh: "链接",
          classes: [
            "bg-transparent text-[#2A7AE2]",
            "underline underline-offset-4 decoration-[#2A7AE2]/40",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Download PDF", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-[#111827]",
        ],
        active: ["active:bg-[#0B1220]"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Paper abstract card with hairline border, serif title, and a metadata footer rule",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "rounded-md",
          "border border-[#E5E7EB]",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5 md:p-6" },
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
          trueClasses: "cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "shadow-none",
          ],
        },
        abstract: {
          id: "abstract",
          label: "Abstract",
          labelZh: "摘要",
          classes: [
            "font-serif",
            "leading-[1.75]",
          ],
        },
        annotated: {
          id: "annotated",
          label: "Annotated",
          labelZh: "批注",
          classes: [
            "border-l-2 border-l-[#2A7AE2]",
            "bg-[#F3F4F6]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Why Momentum Really Works", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "A closed-form view of momentum and its damping behavior across the eigenspace.", type: "children" },
      ],
      states: {
        hover: [
          "hover:border-[#D1D5DB]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Hairline-bordered archive search input with a thin academic-blue focus ring",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white",
          "border border-[#E5E7EB]",
          "rounded-md",
          "font-serif",
          "text-[#1F2933]",
          "placeholder:text-[#9CA3AF]",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1.5 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2.5 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-3 text-base" },
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
        underline: {
          id: "underline",
          label: "Underline",
          labelZh: "下划线",
          classes: [
            "border-0 border-b border-[#E5E7EB] rounded-none px-0 bg-transparent",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Search the archive, e.g. attention", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#2A7AE2]",
          "focus:ring-1 focus:ring-[#2A7AE2]/30",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
});
