// Cyberpunk Neon Component Recipes
import type { StyleRecipes } from "./types";

export const cyberpunkNeonRecipes: StyleRecipes = {
  styleSlug: "cyberpunk-neon",
  styleName: "Cyberpunk Neon",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Neon-glow button with dark background, cyan/magenta accents and sharp edges",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-mono",
          "font-bold",
          "uppercase",
          "tracking-wider",
          "rounded-lg",
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
            "bg-cyan-400 text-black",
            "shadow-[0_0_15px_rgba(0,255,255,0.4)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-transparent text-cyan-400",
            "border border-cyan-400",
            "shadow-[0_0_10px_rgba(0,255,255,0.3)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-fuchsia-500",
            "border border-fuchsia-500",
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
          "hover:shadow-[0_0_30px_rgba(0,255,255,0.6)]",
          "hover:scale-105",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Dark card panel with neon border glow and cyberpunk aesthetic",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-gray-950",
          "border border-cyan-400/30",
          "rounded-lg",
          "transition-all duration-300",
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
          trueClasses: "hover:-translate-y-1 cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "shadow-[0_0_15px_rgba(0,255,255,0.2)]",
          ],
        },
        magenta: {
          id: "magenta",
          label: "Magenta",
          labelZh: "品红",
          classes: [
            "border-fuchsia-500/30",
            "shadow-[0_0_15px_rgba(255,0,255,0.2)]",
          ],
        },
        terminal: {
          id: "terminal",
          label: "Terminal",
          labelZh: "终端",
          classes: [
            "bg-[#0a0a0f]",
            "border-lime-400/30",
            "shadow-[0_0_15px_rgba(132,204,22,0.2)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]",
          "hover:border-cyan-400/50",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Dark neon input with glowing focus state and monospace font",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-gray-950",
          "border border-cyan-400/30",
          "rounded-lg",
          "font-mono",
          "text-cyan-400",
          "placeholder:text-gray-500",
          "focus:outline-none",
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
        magenta: {
          id: "magenta",
          label: "Magenta",
          labelZh: "品红",
          classes: [
            "border-fuchsia-500/30",
            "text-fuchsia-400",
            "placeholder:text-fuchsia-400/40",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-cyan-400",
          "focus:shadow-[0_0_15px_rgba(0,255,255,0.3)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-gray-900"],
      },
    },
  },
};
