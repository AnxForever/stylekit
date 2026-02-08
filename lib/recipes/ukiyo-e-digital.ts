// Ukiyo-e Digital Component Recipes
import type { StyleRecipes } from "./types";

export const ukiyoEDigitalRecipes: StyleRecipes = {
  styleSlug: "ukiyo-e-digital",
  styleName: "Ukiyo-e Digital",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Japanese woodblock print inspired button with strong outlines and flat color fills",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-bold",
          "tracking-wider",
          "rounded-sm",
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
            "bg-[#d4553a] text-[#f5f0e1]",
            "border-[#1a3055]",
            "shadow-[3px_3px_0px_#1a3055]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#1a3055] text-[#f5f0e1]",
            "border-[#c9a227]",
            "shadow-[3px_3px_0px_#c9a227]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#1a3055]",
            "border-[#1a3055]",
            "shadow-[3px_3px_0px_#1a3055]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[4px_4px_0px_#1a3055]",
          "hover:-translate-y-0.5",
        ],
        active: ["active:shadow-[1px_1px_0px_#1a3055] active:translate-y-0.5"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Woodblock print style card with strong outlines and flat color areas",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#f5f0e1]",
          "rounded-sm",
          "border-2 border-[#1a3055]",
          "shadow-[4px_4px_0px_#1a3055]",
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
        vermilion: {
          id: "vermilion",
          label: "Vermilion",
          labelZh: "朱红",
          classes: [
            "border-[#d4553a]",
            "shadow-[4px_4px_0px_#d4553a]",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金叶",
          classes: [
            "border-[#c9a227]",
            "shadow-[4px_4px_0px_#c9a227]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[6px_6px_0px_#1a3055]",
          "hover:border-[#d4553a]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Woodblock print inspired input with strong outlines on rice paper background",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-sm",
          "border-2 border-[#1a3055]/60",
          "bg-[#f5f0e1]",
          "text-[#1a3055]",
          "placeholder:text-[#1a3055]/40",
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
            "border-[#d4553a]/60",
            "text-[#d4553a]",
            "placeholder:text-[#d4553a]/40",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#d4553a]",
          "focus:shadow-[2px_2px_0px_#d4553a]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    woodblockPanel: {
      id: "woodblockPanel",
      name: "Woodblock Panel",
      nameZh: "木版画面板",
      description: "Panel with woodblock print aesthetic and strong border outlines",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#f5f0e1]",
          "border-3 border-[#1a3055]",
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
        indigo: {
          id: "indigo",
          label: "Indigo",
          labelZh: "靛蓝",
          classes: ["bg-[#1a3055] text-[#f5f0e1]"],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {},
    },

    hankoSeal: {
      id: "hankoSeal",
      name: "Hanko Seal",
      nameZh: "印章",
      description: "Traditional Japanese hanko (name seal) style badge",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "w-12 h-12",
          "bg-[#d4553a]",
          "border-2 border-[#8b1a1a]",
          "rounded-sm",
          "text-[#f5f0e1]",
          "font-bold text-lg",
          "transform rotate-[-5deg]",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "w-8 h-8 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "w-12 h-12 text-lg" },
            { value: "lg", label: "Large", labelZh: "大", classes: "w-16 h-16 text-xl" },
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
        { id: "character", label: "Character", labelZh: "文字", required: true, default: "印", type: "text" },
      ],
      states: {},
    },

    waveDivider: {
      id: "waveDivider",
      name: "Wave Divider",
      nameZh: "波浪分隔线",
      description: "Decorative divider inspired by ukiyo-e wave patterns",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "w-full h-8",
          "overflow-hidden",
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

    inkProgress: {
      id: "inkProgress",
      name: "Ink Progress",
      nameZh: "墨迹进度条",
      description: "Progress bar with brush stroke ink effect",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "h-4",
          "bg-[#f5f0e1]",
          "border-2 border-[#1a3055]",
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
        indigo: {
          id: "indigo",
          label: "Indigo",
          labelZh: "靛蓝",
          classes: ["[&>.fill]:bg-[#1a3055]"],
        },
        vermilion: {
          id: "vermilion",
          label: "Vermilion",
          labelZh: "朱红",
          classes: ["[&>.fill]:bg-[#d4553a]"],
        },
      },
      slots: [],
      states: {},
    },

    seasonalTab: {
      id: "seasonalTab",
      name: "Seasonal Tab",
      nameZh: "季节标签",
      description: "Tab component with seasonal color themes",
      skeleton: {
        element: "button",
        baseClasses: [
          "px-4 py-2",
          "font-bold tracking-wider",
          "border-b-3",
          "transition-all duration-200",
        ],
      },
      parameters: [],
      variants: {
        spring: {
          id: "spring",
          label: "Spring",
          labelZh: "春",
          classes: ["text-[#e8a0b0] border-[#e8a0b0]"],
        },
        summer: {
          id: "summer",
          label: "Summer",
          labelZh: "夏",
          classes: ["text-[#4a7c59] border-[#4a7c59]"],
        },
        autumn: {
          id: "autumn",
          label: "Autumn",
          labelZh: "秋",
          classes: ["text-[#d4553a] border-[#d4553a]"],
        },
        winter: {
          id: "winter",
          label: "Winter",
          labelZh: "冬",
          classes: ["text-[#1a3055] border-[#1a3055]"],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Tab", type: "text" },
      ],
      states: {
        active: ["[&.active]:bg-[#1a3055]/10"],
      },
    },

    brushHeading: {
      id: "brushHeading",
      name: "Brush Heading",
      nameZh: "毛笔标题",
      description: "Heading with brush stroke underline decoration",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "inline-block",
          "font-bold text-2xl",
          "text-[#1a3055]",
          "pb-2",
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
        { id: "text", label: "Text", labelZh: "文字", required: true, default: "Heading", type: "text" },
      ],
      states: {},
    },

    layeredMountain: {
      id: "layeredMountain",
      name: "Layered Mountain",
      nameZh: "层叠山峦",
      description: "Decorative background element with layered mountain silhouettes",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "w-full h-32",
          "overflow-hidden",
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
