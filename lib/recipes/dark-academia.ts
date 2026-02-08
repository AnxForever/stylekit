// Dark Academia Component Recipes
import type { StyleRecipes } from "./types";

export const darkAcademiaRecipes: StyleRecipes = {
  styleSlug: "dark-academia",
  styleName: "Dark Academia",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Scholarly button with serif typography, muted earth tones and warm academic aesthetic",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "tracking-wide",
          "rounded",
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
            "bg-[#3d2b1f] text-[#f5f0e1]",
            "border-[#8b7355]/60",
            "shadow-sm",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#2d4a3e] text-[#f5f0e1]",
            "border-[#2d4a3e]/60",
            "shadow-sm",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#3d2b1f]",
            "border-[#3d2b1f]/40",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Read More", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-md",
          "hover:border-[#8b7355]",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Warm scholarly card with parchment tones and subtle borders",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#f5f0e1]",
          "rounded",
          "border border-[#8b7355]/30",
          "shadow-sm",
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
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: [
            "bg-[#3d2b1f] text-[#f5f0e1]",
            "border-[#8b7355]/40",
          ],
        },
        green: {
          id: "green",
          label: "Green",
          labelZh: "墨绿",
          classes: [
            "bg-[#2d4a3e] text-[#f5f0e1]",
            "border-[#2d4a3e]/40",
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
          "hover:border-[#8b7355]/50",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Warm scholarly input with parchment background and muted border",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded",
          "border border-[#8b7355]/30",
          "bg-[#f5f0e1]/80",
          "text-[#3d2b1f]",
          "placeholder:text-[#8b7355]/50",
          "font-serif",
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
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: [
            "bg-[#3d2b1f]/20",
            "border-[#3d2b1f]/30",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Search the archives...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#8b7355]",
          "focus:shadow-[0_0_8px_rgba(139,115,85,0.2)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    leatherPanel: {
      id: "leatherPanel",
      name: "Leather Panel",
      nameZh: "皮革面板",
      description: "Panel styled to look like aged leather binding",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-gradient-to-b from-[#5c4033] to-[#3d2b1f]",
          "border-2 border-[#8b7355]/50",
          "rounded",
          "p-6",
          "shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.2)]",
        ],
      },
      parameters: [],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        green: {
          id: "green",
          label: "Green",
          labelZh: "绿色",
          classes: ["from-[#3d5c4a] to-[#2d4a3e]"],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {},
    },

    waxSealBadge: {
      id: "waxSealBadge",
      name: "Wax Seal Badge",
      nameZh: "火漆封印徽章",
      description: "Circular badge styled as a wax seal",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "w-14 h-14",
          "rounded-full",
          "bg-[#8b1a1a]",
          "text-[#f5f0e1]",
          "font-serif font-bold",
          "shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.3)]",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "w-10 h-10 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "w-14 h-14 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "w-18 h-18 text-base" },
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
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
      ],
      states: {},
    },

    bookSpineTab: {
      id: "bookSpineTab",
      name: "Book Spine Tab",
      nameZh: "书脊标签",
      description: "Tab styled like a book spine label",
      skeleton: {
        element: "button",
        baseClasses: [
          "px-4 py-3",
          "font-serif tracking-wide",
          "bg-[#3d2b1f]",
          "text-[#c9a227]",
          "border-l-4",
          "transition-all duration-200",
        ],
      },
      parameters: [],
      variants: {
        brown: {
          id: "brown",
          label: "Brown",
          labelZh: "棕色",
          classes: ["bg-[#3d2b1f] border-[#c9a227]"],
        },
        green: {
          id: "green",
          label: "Green",
          labelZh: "绿色",
          classes: ["bg-[#2d4a3e] border-[#8b7355]"],
        },
        burgundy: {
          id: "burgundy",
          label: "Burgundy",
          labelZh: "酒红",
          classes: ["bg-[#5c2a2a] border-[#c9a227]"],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Chapter I", type: "text" },
      ],
      states: {
        active: ["[&.active]:bg-[#5c4033]"],
        hover: ["hover:bg-[#5c4033]"],
      },
    },

    fleuronDivider: {
      id: "fleuronDivider",
      name: "Fleuron Divider",
      nameZh: "花饰分隔线",
      description: "Decorative divider with fleuron (typographic ornament)",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "w-full h-6",
          "flex items-center justify-center",
        ],
      },
      parameters: [],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
      },
      slots: [],
      states: {},
    },

    readingProgress: {
      id: "readingProgress",
      name: "Reading Progress",
      nameZh: "阅读进度",
      description: "Progress bar styled like a page marker bookmark",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "h-2",
          "bg-[#3d2b1f]/20",
          "rounded-full",
          "overflow-hidden",
        ],
      },
      parameters: [
        {
          id: "value",
          label: "Value",
          labelZh: "数值",
          type: "select",
          options: [
            { value: "25", label: "25%", labelZh: "25%", classes: "" },
            { value: "50", label: "50%", labelZh: "50%", classes: "" },
            { value: "75", label: "75%", labelZh: "75%", classes: "" },
            { value: "100", label: "100%", labelZh: "100%", classes: "" },
          ],
          default: "75",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
      },
      slots: [],
      states: {},
    },

    manuscriptCard: {
      id: "manuscriptCard",
      name: "Manuscript Card",
      nameZh: "手稿卡片",
      description: "Card with lined paper effect like a manuscript page",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#f5f0e1]",
          "p-6",
          "border border-[#8b7355]/30",
          "shadow-sm",
        ],
      },
      parameters: [],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {},
    },

    candleGlow: {
      id: "candleGlow",
      name: "Candle Glow",
      nameZh: "烛光效果",
      description: "Decorative candle with animated glow effect",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "w-6",
          "flex flex-col items-center",
        ],
      },
      parameters: [],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
      },
      slots: [],
      states: {},
    },
  },
};
