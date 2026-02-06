// Timeline Vertical Component Recipes
import type { StyleRecipes } from "./types";

export const timelineVerticalRecipes: StyleRecipes = {
  styleSlug: "timeline-vertical",
  styleName: "Timeline Vertical",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Subtle inline button for timeline node actions",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "inline-flex items-center gap-2",
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
            "bg-blue-500 text-white",
            "rounded-lg",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-slate-100 text-slate-700",
            "rounded-lg",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-blue-600",
            "hover:underline",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "View Details", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-blue-600",
        ],
        active: ["active:bg-blue-700"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Timeline node card with left border and connector-ready positioning",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "rounded-xl",
          "border border-zinc-100",
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
          default: true,
          trueClasses: "cursor-pointer",
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
        highlighted: {
          id: "highlighted",
          label: "Highlighted",
          labelZh: "高亮",
          classes: [
            "shadow-sm",
            "border-l-4 border-l-blue-500",
          ],
        },
        muted: {
          id: "muted",
          label: "Muted",
          labelZh: "柔和",
          classes: [
            "bg-slate-50",
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
      description: "Clean bordered input for timeline date filtering",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white",
          "border border-zinc-200",
          "rounded-lg",
          "text-slate-900",
          "placeholder:text-zinc-400",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2.5 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-2.5 md:px-5 md:py-3 text-base md:text-lg" },
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
          classes: ["bg-slate-50 border-slate-200"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Filter by date...", type: "text" },
      ],
      states: {
        focus: [
          "focus:ring-2 focus:ring-blue-500/20",
          "focus:border-blue-500",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-zinc-50"],
      },
    },
  },
};
