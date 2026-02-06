// Magazine Grid Component Recipes
import type { StyleRecipes } from "./types";

export const magazineGridRecipes: StyleRecipes = {
  styleSlug: "magazine-grid",
  styleName: "Magazine Grid",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Editorial-style button with serif influence and thin borders",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-semibold",
          "uppercase tracking-wider",
          "text-xs",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-2.5 md:px-6 md:py-3 text-sm" },
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
            "bg-[#e63946] text-white",
            "rounded",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#1a1a1a] text-white",
            "rounded",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#1a1a1a]",
            "border border-zinc-300",
            "rounded",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Read More", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-[#c1121f]",
        ],
        active: ["active:bg-[#a40e19]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Magazine article card with editorial typography and reading-focused layout",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "group",
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
            "border-b border-zinc-200",
          ],
        },
        featured: {
          id: "featured",
          label: "Featured",
          labelZh: "特色",
          classes: [
            "rounded-xl overflow-hidden",
            "shadow-sm",
          ],
        },
        compact: {
          id: "compact",
          label: "Compact",
          labelZh: "紧凑",
          classes: [
            "border-b border-zinc-100",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:bg-zinc-50",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Clean search input for magazine article filtering",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-zinc-100",
          "border-0",
          "rounded-lg",
          "text-zinc-900",
          "placeholder:text-zinc-500",
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
        underline: {
          id: "underline",
          label: "Underline",
          labelZh: "下划线",
          classes: ["bg-transparent border-b border-zinc-300 rounded-none"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Search articles...", type: "text" },
      ],
      states: {
        focus: [
          "focus:ring-2 focus:ring-[#e63946]/20",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
