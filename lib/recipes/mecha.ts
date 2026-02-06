// Mecha Component Recipes
import type { StyleRecipes } from "./types";

export const mechaRecipes: StyleRecipes = {
  styleSlug: "mecha",
  styleName: "Mecha",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Industrial mecha-style button with angular cuts, warning accents, and military feel",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-mono",
          "font-bold",
          "uppercase",
          "tracking-widest",
          "rounded-none",
          "transition-all duration-200 ease-in-out",
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
            "bg-[#fbbf24] text-[#1a2744]",
            "border-2 border-[#1a2744]",
            "shadow-[4px_4px_0px_#1a2744]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#4a5c3a] text-[#fbbf24]",
            "border-2 border-[#fbbf24]/50",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#ef4444]",
            "border-2 border-[#ef4444]",
            "shadow-[3px_3px_0px_#ef4444]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:translate-x-[2px] hover:translate-y-[2px]",
          "hover:shadow-[2px_2px_0px_#1a2744]",
        ],
        active: ["active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Armored panel card with angular design, tech borders and military color scheme",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#1a2744]",
          "rounded-none",
          "border-2 border-[#4a5c3a]",
          "shadow-[4px_4px_0px_rgba(251,191,36,0.3)]",
          "transition-all duration-200 ease-in-out",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-3 md:p-5" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5 md:p-8" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-6 md:p-10" },
          ],
          default: "md",
        },
        {
          id: "interactive",
          label: "Interactive",
          labelZh: "可交互",
          type: "boolean",
          default: true,
          trueClasses: "hover:-translate-y-1 cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        warning: {
          id: "warning",
          label: "Warning",
          labelZh: "警告",
          classes: [
            "border-[#fbbf24]",
            "shadow-[4px_4px_0px_rgba(239,68,68,0.4)]",
          ],
        },
        danger: {
          id: "danger",
          label: "Danger",
          labelZh: "危险",
          classes: [
            "border-[#ef4444]",
            "shadow-[4px_4px_0px_rgba(239,68,68,0.5)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[6px_6px_0px_rgba(251,191,36,0.5)]",
          "hover:border-[#fbbf24]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Military-styled input with angular design and tech-panel aesthetics",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-none",
          "border-2 border-[#4a5c3a]",
          "bg-[#1a2744]/80",
          "text-[#fbbf24]",
          "placeholder:text-[#4a5c3a]/60",
          "font-mono",
          "focus:outline-none",
          "transition-all duration-200 ease-in-out",
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
        alert: {
          id: "alert",
          label: "Alert",
          labelZh: "警报",
          classes: [
            "border-[#ef4444]",
            "text-[#ef4444]",
            "placeholder:text-[#ef4444]/40",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#fbbf24]",
          "focus:shadow-[0_0_8px_rgba(251,191,36,0.4)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
