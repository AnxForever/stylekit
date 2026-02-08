// Gothic Component Recipes
import type { StyleRecipes } from "./types";

export const gothicRecipes: StyleRecipes = {
  styleSlug: "gothic",
  styleName: "Gothic",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Gothic button with ornate borders, deep purple tones and cathedral-inspired aesthetic",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "uppercase",
          "tracking-widest",
          "border-2",
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
            "bg-[#2d1b4e] text-[#c9a227]",
            "border-[#c9a227]/60",
            "shadow-[0_4px_16px_rgba(45,27,78,0.6)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#0a0a0a] text-[#8b1a1a]",
            "border-[#8b1a1a]/60",
            "shadow-[0_4px_12px_rgba(139,26,26,0.4)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#c9a227]",
            "border-[#c9a227]/50",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Enter", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_6px_24px_rgba(201,162,39,0.4)]",
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
      description: "Dark gothic card with ornate borders and cathedral-window aesthetic",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#0a0a0a]/90",
          "border-2 border-[#c9a227]/40",
          "shadow-[0_4px_20px_rgba(10,10,10,0.8)]",
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
        blood: {
          id: "blood",
          label: "Blood",
          labelZh: "血色",
          classes: [
            "border-[#8b1a1a]/50",
            "shadow-[0_4px_20px_rgba(139,26,26,0.3)]",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "border-[#c9a227]/60",
            "shadow-[0_4px_20px_rgba(201,162,39,0.3)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_8px_30px_rgba(201,162,39,0.3)]",
          "hover:border-[#c9a227]/60",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Gothic-styled input with ornate border and dark surface",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "border-2 border-[#c9a227]/30",
          "bg-[#0a0a0a]/80",
          "text-[#c9a227]",
          "placeholder:text-[#c9a227]/30",
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
        blood: {
          id: "blood",
          label: "Blood",
          labelZh: "血色",
          classes: [
            "border-[#8b1a1a]/50",
            "text-[#8b1a1a]",
            "placeholder:text-[#8b1a1a]/30",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#c9a227]",
          "focus:shadow-[0_0_16px_rgba(201,162,39,0.3)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    stonePanel: {
      id: "stonePanel",
      name: "Stone Panel",
      nameZh: "石材面板",
      description: "Medieval stone-textured panel with carved edge effect",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]",
          "border-4 border-[#3a3a3a]",
          "shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.3)]",
          "p-6",
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
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: ["from-[#1a1a1a] to-[#0a0a0a]"],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {},
    },

    shieldBadge: {
      id: "shieldBadge",
      name: "Shield Badge",
      nameZh: "盾牌徽章",
      description: "Heraldic shield-shaped badge for status or labels",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "px-4 py-2",
          "bg-[#2d1b4e]",
          "text-[#c9a227]",
          "font-serif uppercase tracking-wider text-sm",
          "clip-path-shield",
        ],
      },
      parameters: [],
      variants: {
        purple: {
          id: "purple",
          label: "Purple",
          labelZh: "紫色",
          classes: ["bg-[#2d1b4e]"],
        },
        blood: {
          id: "blood",
          label: "Blood",
          labelZh: "血色",
          classes: ["bg-[#8b1a1a]"],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: ["bg-[#c9a227] text-[#0a0a0a]"],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Knight", type: "text" },
      ],
      states: {},
    },

    waxSeal: {
      id: "waxSeal",
      name: "Wax Seal",
      nameZh: "火漆印章",
      description: "Circular wax seal decoration with embossed effect",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "w-16 h-16",
          "rounded-full",
          "bg-[#8b1a1a]",
          "shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.5)]",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "w-12 h-12" },
            { value: "md", label: "Medium", labelZh: "中", classes: "w-16 h-16" },
            { value: "lg", label: "Large", labelZh: "大", classes: "w-20 h-20" },
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

    traceryDivider: {
      id: "traceryDivider",
      name: "Tracery Divider",
      nameZh: "花窗分隔线",
      description: "Gothic tracery-inspired decorative divider",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "w-full h-8",
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

    illuminatedInitial: {
      id: "illuminatedInitial",
      name: "Illuminated Initial",
      nameZh: "装饰首字母",
      description: "Medieval illuminated manuscript style decorative initial letter",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-block",
          "text-6xl font-serif font-bold",
          "text-[#c9a227]",
          "float-left mr-2",
          "leading-none",
        ],
      },
      parameters: [],
      variants: {
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: ["text-[#c9a227] drop-shadow-[0_2px_4px_rgba(201,162,39,0.5)]"],
        },
        blood: {
          id: "blood",
          label: "Blood",
          labelZh: "血色",
          classes: ["text-[#8b1a1a] drop-shadow-[0_2px_4px_rgba(139,26,26,0.5)]"],
        },
      },
      slots: [
        { id: "letter", label: "Letter", labelZh: "字母", required: true, default: "T", type: "text" },
      ],
      states: {},
    },

    parchmentCard: {
      id: "parchmentCard",
      name: "Parchment Card",
      nameZh: "羊皮纸卡片",
      description: "Card styled to look like aged parchment with burnt edges",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-gradient-to-br from-[#f5f0e1] to-[#e5d9c3]",
          "p-6",
          "shadow-lg",
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
        aged: {
          id: "aged",
          label: "Aged",
          labelZh: "陈旧",
          classes: ["from-[#e5d9c3] to-[#d4c4a8]"],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {},
    },
  },
};
