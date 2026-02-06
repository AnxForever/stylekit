// Cyber Chinese Component Recipes
import type { StyleRecipes } from "./types";

export const cyberChineseRecipes: StyleRecipes = {
  styleSlug: "cyber-chinese",
  styleName: "Cyber Chinese",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Cyberpunk-infused Chinese button with neon accents, vermilion tones and angular design",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-bold",
          "tracking-wider",
          "rounded-none",
          "border",
          "transition-all duration-300 ease-in-out",
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
            "bg-[#d4553a] text-white",
            "border-[#c9a227]",
            "shadow-[0_0_16px_rgba(212,85,58,0.5)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#0a0a0a] text-[#00d4ff]",
            "border-[#00d4ff]/50",
            "shadow-[0_0_12px_rgba(0,212,255,0.3)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#d4553a]",
            "border-[#d4553a]/50",
            "shadow-[0_0_10px_rgba(212,85,58,0.3)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_24px_rgba(201,162,39,0.6)]",
          "hover:border-[#c9a227]",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Cyberpunk Chinese card with neon border glow and traditional-meets-futuristic palette",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#0a0a0a]/90",
          "rounded-none",
          "border border-[#d4553a]/40",
          "shadow-[0_0_16px_rgba(212,85,58,0.3)]",
          "transition-all duration-300 ease-in-out",
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
        neon: {
          id: "neon",
          label: "Neon",
          labelZh: "霓虹",
          classes: [
            "border-[#00d4ff]/50",
            "shadow-[0_0_16px_rgba(0,212,255,0.3)]",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "border-[#c9a227]/50",
            "shadow-[0_0_16px_rgba(201,162,39,0.3)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_24px_rgba(212,85,58,0.5)]",
          "hover:border-[#d4553a]/60",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Cyberpunk Chinese input with angular design and neon focus states",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-none",
          "border border-[#c9a227]/40",
          "bg-[#0a0a0a]/80",
          "text-[#00d4ff]",
          "placeholder:text-[#c9a227]/40",
          "focus:outline-none",
          "transition-all duration-300 ease-in-out",
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
        vermilion: {
          id: "vermilion",
          label: "Vermilion",
          labelZh: "朱红",
          classes: [
            "border-[#d4553a]/50",
            "text-[#d4553a]",
            "placeholder:text-[#d4553a]/30",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#00d4ff]",
          "focus:shadow-[0_0_16px_rgba(0,212,255,0.5)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
