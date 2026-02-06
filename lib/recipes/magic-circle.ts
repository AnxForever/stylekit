// Magic Circle Component Recipes
import type { StyleRecipes } from "./types";

export const magicCircleRecipes: StyleRecipes = {
  styleSlug: "magic-circle",
  styleName: "Magic Circle",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Mystical button with elegant glow and arcane styling",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "font-semibold",
          "tracking-wide",
          "border border-[#fbbf24]/30",
          "transition-all duration-400 ease-in-out",
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
            "bg-[#1e1b4b] text-[#fbbf24]",
            "shadow-[0_0_20px_rgba(251,191,36,0.2)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#0f0e2e] text-[#e2e8f0]",
            "border-[#818cf8]/30",
            "shadow-[0_0_15px_rgba(129,140,248,0.2)]",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0f0e2e]",
            "border-[#fbbf24]/60",
            "shadow-[0_0_20px_rgba(251,191,36,0.3)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Invoke", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]",
          "hover:border-[#fbbf24]/60",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Arcane card with subtle glow borders and mystical feel",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#0f0e2e]",
          "border border-[#fbbf24]/15",
          "rounded-sm",
          "transition-all duration-400 ease-in-out",
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
        gold: {
          id: "gold",
          label: "Gold Glow",
          labelZh: "金色辉光",
          classes: [
            "shadow-[0_0_20px_rgba(251,191,36,0.15)]",
          ],
        },
        indigo: {
          id: "indigo",
          label: "Indigo Glow",
          labelZh: "靛蓝辉光",
          classes: [
            "border-[#818cf8]/20",
            "shadow-[0_0_20px_rgba(129,140,248,0.15)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_30px_rgba(251,191,36,0.25)]",
          "hover:border-[#fbbf24]/30",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Mystical input with golden glow focus",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-sm",
          "border border-[#fbbf24]/15",
          "bg-[#0f0e2e]",
          "text-[#e2e8f0]",
          "placeholder:text-[#e2e8f0]/30",
          "font-sans",
          "focus:outline-none",
          "transition-all duration-400 ease-in-out",
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
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "border-[#fbbf24]/25",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Enter rune...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#fbbf24]/50",
          "focus:shadow-[0_0_15px_rgba(251,191,36,0.2)]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
