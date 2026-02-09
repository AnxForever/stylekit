// Warm Dashboard Component Recipes
import type { StyleRecipes } from "./types";

export const warmDashboardRecipes: StyleRecipes = {
  styleSlug: "warm-dashboard",
  styleName: "Warm Dashboard",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Warm dashboard button with soft shadow and rounded corners",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "rounded-xl",
          "shadow-lg",
          "transition-all duration-200",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-2 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base" },
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
            "bg-[#4a9d9a] text-white",
            "shadow-lg shadow-[#4a9d9a]/25",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-white text-gray-700",
            "shadow-lg shadow-black/5",
          ],
        },
        coral: {
          id: "coral",
          label: "Coral",
          labelZh: "珊瑚",
          classes: [
            "bg-[#c17767] text-white",
            "shadow-lg shadow-[#c17767]/25",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "bg-[#e8b86d] text-gray-800",
            "shadow-lg shadow-[#e8b86d]/25",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "View Report", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-xl",
          "hover:-translate-y-0.5",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Cream-colored card with soft shadow for dashboard data display",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#faf8f5]",
          "rounded-2xl md:rounded-3xl",
          "shadow-xl shadow-black/8",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4 md:p-5" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5 md:p-6" },
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
          trueClasses: "hover:shadow-2xl hover:-translate-y-1 cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        stat: {
          id: "stat",
          label: "Statistic",
          labelZh: "统计",
          classes: [],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Views", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "27,6m", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-2xl",
          "hover:-translate-y-1",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Clean input with subtle border and teal focus ring",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white",
          "border border-gray-200",
          "rounded-xl",
          "text-gray-800",
          "placeholder:text-gray-400",
          "focus:outline-none",
          "transition-all duration-200",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-2 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-4 text-base md:text-lg" },
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
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Search reports...", type: "text" },
      ],
      states: {
        focus: [
          "focus:ring-2 focus:ring-[#4a9d9a]/30",
          "focus:border-[#4a9d9a]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    sidebar: {
      id: "sidebar",
      name: "Sidebar",
      nameZh: "侧边栏",
      description: "Semi-transparent white sidebar with blur effect",
      skeleton: {
        element: "nav",
        baseClasses: [
          "w-60 h-screen",
          "bg-white/80 backdrop-blur-xl",
          "border-r border-gray-200/50",
          "p-6",
          "flex flex-col",
        ],
      },
      parameters: [
        {
          id: "width",
          label: "Width",
          labelZh: "宽度",
          type: "select",
          options: [
            { value: "sm", label: "Narrow", labelZh: "窄", classes: "w-48" },
            { value: "md", label: "Medium", labelZh: "中", classes: "w-60" },
            { value: "lg", label: "Wide", labelZh: "宽", classes: "w-72" },
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
        { id: "logo", label: "Logo", labelZh: "Logo", required: true, default: "Crowz", type: "text" },
        { id: "children", label: "Navigation", labelZh: "导航", required: true, type: "children" },
      ],
      states: {},
    },

    statCard: {
      id: "statCard",
      name: "Stat Card",
      nameZh: "统计卡片",
      description: "Dashboard statistic card with label, value and trend",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#faf8f5]",
          "rounded-2xl",
          "p-6",
          "shadow-xl shadow-black/8",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-6" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-8" },
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
        withIndicator: {
          id: "withIndicator",
          label: "With Indicator",
          labelZh: "带指示器",
          classes: [],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "标签", required: true, default: "Views", type: "text" },
        { id: "value", label: "Value", labelZh: "数值", required: true, default: "27,6m", type: "text" },
        { id: "trend", label: "Trend", labelZh: "趋势", required: false, default: "+12%", type: "text" },
      ],
      states: {},
    },

    navItem: {
      id: "navItem",
      name: "Nav Item",
      nameZh: "导航项",
      description: "Sidebar navigation item with active state",
      skeleton: {
        element: "a",
        baseClasses: [
          "flex items-center gap-3 px-4 py-3",
          "rounded-xl",
          "transition-colors duration-200",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-2 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-3 text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-4 text-lg" },
          ],
          default: "md",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "text-gray-500",
            "hover:bg-[#faf8f5] hover:text-gray-800",
          ],
        },
        active: {
          id: "active",
          label: "Active",
          labelZh: "激活",
          classes: [
            "bg-[#faf8f5]",
            "text-gray-800 font-medium",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Dashboard", type: "text" },
      ],
      states: {
        hover: ["hover:bg-[#faf8f5] hover:text-gray-800"],
      },
    },

    channelCard: {
      id: "channelCard",
      name: "Channel Card",
      nameZh: "渠道卡片",
      description: "Bottom channel statistics card with gradient background",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-gradient-to-r from-[#e8f4f4] to-[#f0f7f7]",
          "rounded-2xl md:rounded-3xl",
          "p-5 md:p-6",
          "shadow-lg shadow-black/5",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5 md:p-6" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-6 md:p-8" },
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
        { id: "title", label: "Title", labelZh: "标题", required: true, default: "Channels", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {},
    },
  },
};
