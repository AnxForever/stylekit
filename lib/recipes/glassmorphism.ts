// Liquid Glass Component Recipes
import type { StyleRecipes } from "./types";

export const glassmorphismRecipes: StyleRecipes = {
  styleSlug: "glassmorphism",
  styleName: "Liquid Glass",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Liquid glass button with edge highlight, saturation boost and fluid transition",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "backdrop-blur-2xl backdrop-saturate-150",
          "rounded-2xl",
          "border border-white/40",
          "ring-1 ring-inset ring-white/20",
          "transition-all duration-300 ease-out",
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
            "bg-white/25 text-white",
            "shadow-lg shadow-black/5",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-white/15 text-white",
            "shadow-md shadow-black/5",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#007AFF]/30 text-white",
            "shadow-lg shadow-[#007AFF]/20",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-white",
            "border-white/50",
            "ring-white/30",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-white/35",
          "hover:ring-white/30",
          "hover:shadow-xl hover:shadow-black/10",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Liquid glass card with multi-layer depth, edge refraction and top highlight gradient",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white/20",
          "backdrop-blur-3xl backdrop-saturate-150",
          "rounded-3xl",
          "border border-white/30",
          "ring-1 ring-inset ring-white/25",
          "shadow-xl shadow-black/10",
          "[background-image:linear-gradient(to_bottom,rgba(255,255,255,0.15),transparent)]",
          "transition-all duration-300 ease-out",
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
            "bg-white/30",
            "ring-white/30",
          ],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: [
            "bg-black/20",
            "border-white/20",
            "ring-white/15",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#007AFF]/20",
            "border-[#007AFF]/30",
            "ring-[#007AFF]/20",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:bg-white/25",
          "hover:ring-white/35",
          "hover:shadow-2xl hover:shadow-black/15",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Liquid glass input with enhanced focus glow and edge highlights",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white/15",
          "backdrop-blur-2xl backdrop-saturate-150",
          "rounded-2xl",
          "border border-white/30",
          "ring-1 ring-inset ring-white/20",
          "text-white",
          "placeholder:text-white/50",
          "focus:outline-none",
          "transition-all duration-300 ease-out",
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
          classes: ["bg-white/25"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:bg-white/25",
          "focus:border-white/50",
          "focus:ring-white/40",
          "focus:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    modal: {
      id: "modal",
      name: "Modal",
      nameZh: "模态框",
      description: "Liquid glass modal with inner glow border and depth shadow",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white/20",
          "backdrop-blur-3xl backdrop-saturate-150",
          "rounded-3xl",
          "border border-white/30",
          "ring-1 ring-inset ring-white/25",
          "shadow-2xl shadow-black/20",
          "[background-image:linear-gradient(to_bottom,rgba(255,255,255,0.15),transparent)]",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "max-w-sm p-5" },
            { value: "md", label: "Medium", labelZh: "中", classes: "max-w-md p-6" },
            { value: "lg", label: "Large", labelZh: "大", classes: "max-w-lg p-8" },
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
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Modal Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {},
    },

    pill: {
      id: "pill",
      name: "Pill Badge",
      nameZh: "胶囊徽章",
      description: "Capsule-shaped liquid glass badge with inner shadow highlight",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center gap-1.5",
          "bg-white/20",
          "backdrop-blur-xl backdrop-saturate-150",
          "rounded-full",
          "border border-white/30",
          "ring-1 ring-inset ring-white/20",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]",
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
          classes: ["bg-[#34C759]/25 border-[#34C759]/40"],
        },
        warning: {
          id: "warning",
          label: "Warning",
          labelZh: "警告",
          classes: ["bg-[#FF9500]/25 border-[#FF9500]/40"],
        },
        error: {
          id: "error",
          label: "Error",
          labelZh: "错误",
          classes: ["bg-[#FF2D55]/25 border-[#FF2D55]/40"],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Badge", type: "text" },
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
          "bg-white/20",
          "backdrop-blur-xl backdrop-saturate-150",
          "rounded-full",
          "border border-white/30",
          "ring-1 ring-inset ring-white/15",
          "transition-all duration-300 ease-out",
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
      states: {
        active: [
          "[&.active]:bg-[#34C759]/40",
          "[&.active]:border-[#34C759]/50",
          "[&.active]:ring-[#34C759]/30",
          "[&.active]:shadow-[0_0_12px_rgba(52,199,89,0.4)]",
        ],
      },
    },

    nav: {
      id: "nav",
      name: "Navigation",
      nameZh: "导航栏",
      description: "Fixed liquid glass navigation bar with bottom highlight edge",
      skeleton: {
        element: "nav",
        baseClasses: [
          "bg-white/10",
          "backdrop-blur-3xl backdrop-saturate-150",
          "border-b border-white/20",
          "shadow-[0_1px_0_0_rgba(255,255,255,0.1)]",
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
          classes: ["bg-white/20"],
        },
      },
      slots: [
        { id: "logo", label: "Logo", labelZh: "Logo", required: true, default: "BRAND", type: "text" },
        { id: "children", label: "Links", labelZh: "链接", required: false, type: "children" },
      ],
      states: {},
    },

    slider: {
      id: "slider",
      name: "Slider",
      nameZh: "滑块",
      description: "Liquid glass slider with glowing thumb and translucent track",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "h-2",
          "bg-white/15",
          "backdrop-blur-xl",
          "rounded-full",
          "ring-1 ring-inset ring-white/20",
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
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: ["[&>.fill]:bg-[#007AFF]/60"],
        },
      },
      slots: [],
      states: {},
    },

    controlGrid: {
      id: "controlGrid",
      name: "Control Grid",
      nameZh: "控制网格",
      description: "iOS Control Center style grid of liquid glass controls",
      skeleton: {
        element: "div",
        baseClasses: [
          "grid grid-cols-2 gap-3",
          "p-4",
          "bg-white/15",
          "backdrop-blur-3xl backdrop-saturate-150",
          "rounded-3xl",
          "border border-white/20",
          "ring-1 ring-inset ring-white/15",
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
        { id: "children", label: "Controls", labelZh: "控制项", required: true, type: "children" },
      ],
      states: {},
    },

    controlTile: {
      id: "controlTile",
      name: "Control Tile",
      nameZh: "控制磁贴",
      description: "Single control tile for Control Center style grids",
      skeleton: {
        element: "button",
        baseClasses: [
          "flex flex-col items-center justify-center",
          "aspect-square",
          "bg-white/20",
          "backdrop-blur-xl backdrop-saturate-150",
          "rounded-2xl",
          "border border-white/25",
          "ring-1 ring-inset ring-white/20",
          "text-white",
          "transition-all duration-300 ease-out",
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
        active: {
          id: "active",
          label: "Active",
          labelZh: "激活",
          classes: [
            "bg-[#007AFF]/40",
            "border-[#007AFF]/50",
            "ring-[#007AFF]/30",
            "shadow-[0_0_16px_rgba(0,122,255,0.4)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: true, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: false, default: "Control", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-white/30",
          "hover:ring-white/30",
        ],
        active: ["active:scale-[0.95]"],
      },
    },
  },
};
