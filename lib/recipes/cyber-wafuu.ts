// Cyber Wafuu Component Recipes
import type { StyleRecipes } from "./types";

export const cyberWafuuRecipes: StyleRecipes = {
  styleSlug: "cyber-wafuu",
  styleName: "Cyber Wafuu",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Seigaiha-patterned button with circuit trace glow and shoji-grid geometry",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-sans",
          "font-semibold",
          "tracking-wider",
          "border border-[#1e3a5f]/60",
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
            "bg-[#1e3a5f] text-[#e2e8f0]",
            "shadow-[0_0_12px_rgba(30,58,95,0.4)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#080814] text-[#38bdf8]",
            "border-[#38bdf8]/40",
            "shadow-[0_0_10px_rgba(56,189,248,0.2)]",
          ],
        },
        vermillion: {
          id: "vermillion",
          label: "Vermillion",
          labelZh: "朱红",
          classes: [
            "bg-[#c41e3a] text-white",
            "border-[#c41e3a]/60",
            "shadow-[0_0_12px_rgba(196,30,58,0.4)]",
          ],
        },
        kintsugi: {
          id: "kintsugi",
          label: "Kintsugi Gold",
          labelZh: "金继",
          classes: [
            "bg-[#080814] text-[#c9a227]",
            "border-[#c9a227]/40",
            "shadow-[0_0_10px_rgba(201,162,39,0.25)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Execute", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]",
          "hover:border-[#38bdf8]/60",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Shoji screen grid frame card with kintsugi gold crack accents and circuit overlays",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#080814]",
          "border border-[#1e3a5f]/30",
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
        {
          id: "shojiGrid",
          label: "Shoji Grid Overlay",
          labelZh: "障子格栅",
          type: "boolean",
          default: false,
          trueClasses: "before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(to_right,rgba(30,58,95,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,58,95,0.1)_1px,transparent_1px)] before:bg-[size:33.33%_50%] before:pointer-events-none",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        indigo: {
          id: "indigo",
          label: "Indigo",
          labelZh: "靛蓝",
          classes: [
            "shadow-[0_0_15px_rgba(30,58,95,0.3)]",
          ],
        },
        vermillion: {
          id: "vermillion",
          label: "Vermillion",
          labelZh: "朱红",
          classes: [
            "border-[#c41e3a]/30",
            "shadow-[0_0_15px_rgba(196,30,58,0.2)]",
          ],
        },
        kintsugi: {
          id: "kintsugi",
          label: "Kintsugi Gold",
          labelZh: "金继",
          classes: [
            "border-[#c9a227]/20",
            "shadow-[0_0_12px_rgba(201,162,39,0.15)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]",
          "hover:border-[#38bdf8]/40",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Wave-pattern underline input with circuit trace focus glow",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "border border-[#1e3a5f]/30",
          "bg-[#080814]",
          "text-[#e2e8f0]",
          "placeholder:text-[#e2e8f0]/20",
          "font-sans",
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
        electric: {
          id: "electric",
          label: "Electric",
          labelZh: "电蓝",
          classes: [
            "border-[#38bdf8]/30",
          ],
        },
        vermillion: {
          id: "vermillion",
          label: "Vermillion",
          labelZh: "朱红",
          classes: [
            "border-[#c41e3a]/20",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Input...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#38bdf8]/60",
          "focus:shadow-[0_0_12px_rgba(56,189,248,0.3)]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
