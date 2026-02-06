// Glitch Art Component Recipes
import type { StyleRecipes } from "./types";

export const glitchArtRecipes: StyleRecipes = {
  styleSlug: "glitch-art",
  styleName: "Glitch Art",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Glitch-style button with RGB separation and scan line effects",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-mono",
          "font-bold",
          "uppercase",
          "tracking-widest",
          "rounded-sm",
          "border border-[#00ffff]/30",
          "transition-all duration-150 ease-in-out",
          "relative overflow-hidden",
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
            "bg-[#00ffff] text-[#0a0a0a]",
            "shadow-[2px_0_#ff00ff,-2px_0_#ffff00]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#0a0a0a] text-[#00ffff]",
            "border-[#00ffff]",
            "shadow-[2px_0_#ff00ff,-2px_0_#ffff00]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#00ffff]",
            "border border-[#00ffff]",
            "shadow-[1px_0_#ff00ff,-1px_0_#ffff00]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "EXECUTE", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[4px_0_#ff00ff,-4px_0_#ffff00]",
          "hover:text-shadow-[0_0_8px_#00ffff]",
        ],
        active: ["active:translate-x-[1px] active:translate-y-[1px]"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Glitch-style card with scan lines and RGB displacement border",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#0a0a0a]",
          "rounded-sm",
          "border border-[#00ffff]/20",
          "transition-all duration-150 ease-in-out",
          "relative overflow-hidden",
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
            "border-[#00ffff]/40",
            "shadow-[0_0_15px_#00ffff20]",
          ],
        },
        magenta: {
          id: "magenta",
          label: "Magenta",
          labelZh: "品红",
          classes: [
            "border-[#ff00ff]/40",
            "shadow-[0_0_15px_#ff00ff20]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "DATA_BLOCK", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Signal corrupted...", type: "children" },
      ],
      states: {
        hover: [
          "hover:border-[#00ffff]/50",
          "hover:shadow-[0_0_20px_#00ffff30,2px_0_#ff00ff20,-2px_0_#ffff0020]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Glitch-style input with mono font and neon focus glow",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-sm",
          "border border-[#00ffff]/30",
          "bg-[#0a0a0a]",
          "text-[#00ffff]",
          "placeholder:text-[#00ffff]/30",
          "font-mono",
          "focus:outline-none",
          "transition-all duration-150 ease-in-out",
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
            "border-[#ff00ff]/30",
            "text-[#ff00ff]",
            "placeholder:text-[#ff00ff]/30",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "INPUT_DATA...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#00ffff]",
          "focus:shadow-[0_0_10px_#00ffff40,2px_0_#ff00ff20,-2px_0_#ffff0020]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
