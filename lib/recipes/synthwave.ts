// Synthwave Component Recipes
import type { StyleRecipes } from "./types";

export const synthwaveRecipes: StyleRecipes = {
  styleSlug: "synthwave",
  styleName: "Synthwave",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Retro-futuristic button with neon glow, gradient and dark background aesthetic",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-bold",
          "uppercase",
          "tracking-widest",
          "rounded-lg",
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
            "bg-gradient-to-r from-[#ff00ff] to-[#a020f0] text-white",
            "shadow-[0_0_16px_rgba(255,0,255,0.5)] md:shadow-[0_0_24px_rgba(255,0,255,0.5)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#00ffff]/10 text-[#00ffff]",
            "border border-[#00ffff]/50",
            "shadow-[0_0_12px_rgba(0,255,255,0.3)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#ff00ff]",
            "border border-[#ff00ff]/50",
            "shadow-[0_0_10px_rgba(255,0,255,0.3)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_32px_rgba(0,255,255,0.7)]",
          "hover:scale-105",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Dark retro-futuristic card with neon border glow and synthwave palette",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#0a0a1a]/80",
          "rounded-lg",
          "border border-[#ff00ff]/50",
          "shadow-[0_0_16px_rgba(255,0,255,0.5)] md:shadow-[0_0_24px_rgba(255,0,255,0.5)]",
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
        cyan: {
          id: "cyan",
          label: "Cyan",
          labelZh: "青色",
          classes: [
            "border-[#00ffff]/50",
            "shadow-[0_0_16px_rgba(0,255,255,0.4)] md:shadow-[0_0_24px_rgba(0,255,255,0.4)]",
          ],
        },
        sunset: {
          id: "sunset",
          label: "Sunset",
          labelZh: "日落",
          classes: [
            "border-[#ff1493]/50",
            "shadow-[0_0_16px_rgba(255,20,147,0.4)] md:shadow-[0_0_24px_rgba(255,20,147,0.4)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_32px_rgba(255,0,255,0.6)]",
          "hover:border-[#ff00ff]/70",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Neon-glow input on dark surface with synthwave color scheme",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-lg",
          "border border-[#a020f0]/50",
          "bg-[#0a0a1a]/60",
          "text-[#00ffff]",
          "placeholder:text-[#a020f0]/50",
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
        neon: {
          id: "neon",
          label: "Neon",
          labelZh: "霓虹",
          classes: [
            "border-[#ff00ff]/50",
            "text-[#ff00ff]",
            "placeholder:text-[#ff00ff]/40",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#00ffff]",
          "focus:shadow-[0_0_20px_rgba(0,255,255,0.6)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
