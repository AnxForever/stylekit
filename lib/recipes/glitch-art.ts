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
      description: "Glitch-style button with RGB channel split shadow and scan line texture",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-mono",
          "font-bold",
          "uppercase",
          "tracking-widest",
          "rounded-none",
          "border border-[#00ffff]/30",
          "transition-all duration-100 ease-in-out",
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
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-3 md:px-10 md:py-4 text-base md:text-lg" },
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
            "shadow-[3px_0_#ff00ff,-3px_0_#ffff00]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#0a0a0a] text-[#00ffff]",
            "border-[#00ffff]/50",
            "shadow-[3px_0_#ff00ff,-3px_0_#ffff00]",
          ],
        },
        magenta: {
          id: "magenta",
          label: "Magenta",
          labelZh: "品红",
          classes: [
            "bg-[#ff00ff] text-white",
            "border-[#ff00ff]/30",
            "shadow-[3px_0_#00ffff,-3px_0_#ffff00]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#ffff00]",
            "border border-[#ffff00]/50",
            "shadow-[2px_0_#ff00ff,-2px_0_#00ffff]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "EXECUTE_", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[6px_0_#ff00ff,-6px_0_#ffff00]",
        ],
        active: ["active:translate-x-[1px] active:translate-y-[1px]"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Corrupted data panel with displacement band border and scan line texture",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#0a0a0a]",
          "rounded-none",
          "border-l-2 border-[#00ffff]/40",
          "transition-all duration-100 ease-in-out",
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
          trueClasses: "cursor-pointer",
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
            "border-l-[#00ffff]/40",
          ],
        },
        magenta: {
          id: "magenta",
          label: "Magenta",
          labelZh: "品红",
          classes: [
            "border-l-[#ff00ff]/40",
          ],
        },
        yellow: {
          id: "yellow",
          label: "Yellow",
          labelZh: "黄色",
          classes: [
            "border-l-[#ffff00]/40",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "SIGNAL", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Data stream intercepted...", type: "children" },
      ],
      states: {
        hover: [
          "hover:bg-[#00ffff]/[0.02]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Terminal-style input with RGB split focus glow and scan line texture",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-none",
          "border border-[#00ffff]/30",
          "bg-[#0a0a0a]",
          "text-[#00ffff]",
          "placeholder:text-[#00ffff]/20",
          "font-mono",
          "focus:outline-none",
          "transition-all duration-100 ease-in-out",
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
            "placeholder:text-[#ff00ff]/20",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "ENTER_DATA...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#00ffff]",
          "focus:shadow-[0_0_10px_#00ffff30,3px_0_#ff00ff20,-3px_0_#ffff0020]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
