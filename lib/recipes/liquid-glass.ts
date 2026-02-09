// Liquid Glass Component Recipes
import type { StyleRecipes } from "./types";

export const liquidGlassRecipes: StyleRecipes = {
  styleSlug: "liquid-glass",
  styleName: "Apple Liquid Glass",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Liquid glass button with rainbow border gradient and fluid press effect",
      skeleton: {
        element: "button",
        baseClasses: [
          "relative",
          "font-medium",
          "backdrop-blur-[40px] backdrop-saturate-[1.8]",
          "rounded-[20px]",
          "text-white",
          "before:absolute before:inset-0 before:rounded-[20px]",
          "before:p-[1px] before:-z-10",
          "before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]",
          "after:absolute after:inset-[1px] after:rounded-[19px] after:-z-10",
          "after:bg-gradient-to-b after:from-white/20 after:to-transparent",
          "transition-all duration-500 ease-out",
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
            "bg-white/10",
            "shadow-lg shadow-black/5",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-white/5",
            "shadow-md shadow-black/5",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#007AFF]/20",
            "shadow-lg shadow-[#007AFF]/20",
            "before:bg-gradient-to-r before:from-[#007AFF] before:to-[#5AC8FA]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent",
            "border border-white/30",
            "before:bg-transparent",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-white/15",
          "hover:shadow-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Liquid glass card with multi-layer depth, rainbow edge refraction and top highlight",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-white/10",
          "backdrop-blur-[40px] backdrop-saturate-[1.8]",
          "rounded-[24px]",
          "shadow-xl shadow-black/10",
          "before:absolute before:inset-0 before:rounded-[24px]",
          "before:p-[1px] before:-z-10",
          "before:bg-gradient-to-br before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]",
          "after:absolute after:inset-[1px] after:rounded-[23px] after:-z-10",
          "after:bg-gradient-to-b after:from-white/15 after:to-transparent",
          "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.4)]",
          "transition-all duration-500 ease-out",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5 md:p-7" },
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
          classes: [],
        },
        light: {
          id: "light",
          label: "Light",
          labelZh: "浅色",
          classes: [
            "bg-white/15",
          ],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: [
            "bg-black/20",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#007AFF]/15",
            "before:bg-gradient-to-br before:from-[#007AFF] before:to-[#5AC8FA]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:bg-white/15",
          "hover:shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Liquid glass input with rainbow focus ring animation",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white/10",
          "backdrop-blur-[40px] backdrop-saturate-[1.8]",
          "rounded-[16px]",
          "border border-white/20",
          "text-white",
          "placeholder:text-white/50",
          "focus:outline-none",
          "transition-all duration-500 ease-out",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2.5 md:px-5 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-3 md:px-6 md:py-4 text-base md:text-lg" },
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
        filled: {
          id: "filled",
          label: "Filled",
          labelZh: "填充",
          classes: ["bg-white/15"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:bg-white/15",
          "focus:border-transparent",
          "focus:shadow-[0_0_0_2px_rgba(168,85,247,0.5),0_0_20px_rgba(168,85,247,0.2)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    glassPanel: {
      id: "glassPanel",
      name: "Glass Panel",
      nameZh: "玻璃面板",
      description: "Large liquid glass panel for sections and containers",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-white/8",
          "backdrop-blur-[40px] backdrop-saturate-[1.8]",
          "rounded-[32px]",
          "shadow-2xl shadow-black/20",
          "before:absolute before:inset-0 before:rounded-[32px]",
          "before:p-[1px] before:-z-10",
          "before:bg-gradient-to-br before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]",
          "after:absolute after:inset-[1px] after:rounded-[31px] after:-z-10",
          "after:bg-gradient-to-b after:from-white/20 after:to-transparent",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-6 md:p-8" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-8 md:p-12" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-10 md:p-16" },
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
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {},
    },

    refractionBadge: {
      id: "refractionBadge",
      name: "Refraction Badge",
      nameZh: "折射徽章",
      description: "Small glass capsule badge with rainbow edge and pulse animation",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative inline-flex items-center gap-1.5",
          "bg-white/15",
          "backdrop-blur-[40px] backdrop-saturate-[1.8]",
          "rounded-full",
          "before:absolute before:inset-0 before:rounded-full",
          "before:p-[1px] before:-z-10",
          "before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]",
          "after:absolute after:inset-[1px] after:rounded-full after:-z-10",
          "after:bg-gradient-to-b after:from-white/30 after:to-transparent",
          "text-white",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2.5 py-1 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-1.5 text-sm" },
          ],
          default: "sm",
        },
        {
          id: "pulse",
          label: "Pulse Animation",
          labelZh: "脉冲动画",
          type: "boolean",
          default: false,
          trueClasses: "animate-pulse",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        success: {
          id: "success",
          label: "Success",
          labelZh: "成功",
          classes: [
            "before:bg-gradient-to-r before:from-[#34C759] before:to-[#30D158]",
          ],
        },
        warning: {
          id: "warning",
          label: "Warning",
          labelZh: "警告",
          classes: [
            "before:bg-gradient-to-r before:from-[#FF9500] before:to-[#FFCC00]",
          ],
        },
        error: {
          id: "error",
          label: "Error",
          labelZh: "错误",
          classes: [
            "before:bg-gradient-to-r before:from-[#FF2D55] before:to-[#FF3B30]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Badge", type: "text" },
      ],
      states: {},
    },

    glassStack: {
      id: "glassStack",
      name: "Glass Stack",
      nameZh: "玻璃堆叠",
      description: "Multiple glass layers stacked with offset for depth effect",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
        ],
      },
      parameters: [
        {
          id: "layers",
          label: "Layers",
          labelZh: "层数",
          type: "select",
          options: [
            { value: "3", label: "3 Layers", labelZh: "3层", classes: "" },
            { value: "4", label: "4 Layers", labelZh: "4层", classes: "" },
            { value: "5", label: "5 Layers", labelZh: "5层", classes: "" },
          ],
          default: "3",
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
        { id: "children", label: "Cards", labelZh: "卡片", required: true, type: "children" },
      ],
      states: {},
    },

    nav: {
      id: "nav",
      name: "Navigation",
      nameZh: "导航栏",
      description: "Fixed liquid glass navigation bar with rainbow bottom edge",
      skeleton: {
        element: "nav",
        baseClasses: [
          "bg-white/5",
          "backdrop-blur-[40px] backdrop-saturate-[1.8]",
          "border-b border-white/10",
          "[box-shadow:0_1px_0_0_rgba(255,255,255,0.1),inset_0_-1px_0_0_rgba(168,85,247,0.2)]",
          "px-4 md:px-8",
          "py-3 md:py-4",
        ],
      },
      parameters: [
        {
          id: "sticky",
          label: "Sticky",
          labelZh: "固定",
          type: "boolean",
          default: false,
          trueClasses: "fixed top-0 left-0 right-0 z-50",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        solid: {
          id: "solid",
          label: "Solid",
          labelZh: "实色",
          classes: ["bg-white/10"],
        },
      },
      slots: [
        { id: "logo", label: "Logo", labelZh: "Logo", required: true, default: "BRAND", type: "text" },
        { id: "children", label: "Links", labelZh: "链接", required: false, type: "children" },
      ],
      states: {},
    },

    toggle: {
      id: "toggle",
      name: "Toggle Switch",
      nameZh: "开关",
      description: "iOS-style liquid glass toggle switch with glow effect",
      skeleton: {
        element: "button",
        baseClasses: [
          "relative",
          "w-12 h-7",
          "bg-white/15",
          "backdrop-blur-[40px] backdrop-saturate-[1.8]",
          "rounded-full",
          "border border-white/20",
          "transition-all duration-500 ease-out",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "w-10 h-6" },
            { value: "md", label: "Medium", labelZh: "中", classes: "w-12 h-7" },
            { value: "lg", label: "Large", labelZh: "大", classes: "w-14 h-8" },
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
        { id: "thumb", label: "Thumb", labelZh: "滑块", required: true, type: "children" },
      ],
      states: {
        active: [
          "[&.active]:bg-[#34C759]/40",
          "[&.active]:border-[#34C759]/50",
          "[&.active]:shadow-[0_0_15px_rgba(52,199,89,0.4)]",
        ],
      },
    },

    slider: {
      id: "slider",
      name: "Slider",
      nameZh: "滑块",
      description: "Liquid glass slider with glowing thumb",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "h-2",
          "bg-white/10",
          "backdrop-blur-[40px]",
          "rounded-full",
          "border border-white/15",
        ],
      },
      parameters: [
        {
          id: "width",
          label: "Width",
          labelZh: "宽度",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "w-32" },
            { value: "md", label: "Medium", labelZh: "中", classes: "w-48" },
            { value: "lg", label: "Large", labelZh: "大", classes: "w-64" },
            { value: "full", label: "Full", labelZh: "全宽", classes: "w-full" },
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
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: ["[&>.fill]:bg-gradient-to-r [&>.fill]:from-[#007AFF] [&>.fill]:to-[#5AC8FA]"],
        },
      },
      slots: [
        { id: "fill", label: "Fill Track", labelZh: "填充轨道", required: true, type: "children" },
      ],
      states: {},
    },
  },
};
