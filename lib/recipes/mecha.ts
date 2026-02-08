// Mecha Component Recipes
import type { StyleRecipes } from "./types";

export const mechaRecipes: StyleRecipes = {
  styleSlug: "mecha",
  styleName: "Mecha",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Industrial mecha-style button with angular cuts, warning accents, and military feel",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-mono",
          "font-bold",
          "uppercase",
          "tracking-widest",
          "rounded-none",
          "transition-all duration-200 ease-in-out",
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
            "bg-[#fbbf24] text-[#1a2744]",
            "border-2 border-[#1a2744]",
            "shadow-[4px_4px_0px_#1a2744]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#4a5c3a] text-[#fbbf24]",
            "border-2 border-[#fbbf24]/50",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#ef4444]",
            "border-2 border-[#ef4444]",
            "shadow-[3px_3px_0px_#ef4444]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "EXECUTE", type: "text" },
      ],
      states: {
        hover: [
          "hover:translate-x-[2px] hover:translate-y-[2px]",
          "hover:shadow-[2px_2px_0px_#1a2744]",
        ],
        active: ["active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Armored panel card with angular design, tech borders and military color scheme",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#1a2744]",
          "rounded-none",
          "border-2 border-[#4a5c3a]",
          "shadow-[4px_4px_0px_rgba(251,191,36,0.3)]",
          "transition-all duration-200 ease-in-out",
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
        warning: {
          id: "warning",
          label: "Warning",
          labelZh: "警告",
          classes: [
            "border-[#fbbf24]",
            "shadow-[4px_4px_0px_rgba(239,68,68,0.4)]",
          ],
        },
        danger: {
          id: "danger",
          label: "Danger",
          labelZh: "危险",
          classes: [
            "border-[#ef4444]",
            "shadow-[4px_4px_0px_rgba(239,68,68,0.5)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "SYSTEM PANEL", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Panel content", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[6px_6px_0px_rgba(251,191,36,0.5)]",
          "hover:border-[#fbbf24]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Military-styled input with angular design and tech-panel aesthetics",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-none",
          "border-2 border-[#4a5c3a]",
          "bg-[#1a2744]/80",
          "text-[#fbbf24]",
          "placeholder:text-[#4a5c3a]/60",
          "font-mono uppercase",
          "focus:outline-none",
          "transition-all duration-200 ease-in-out",
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
        alert: {
          id: "alert",
          label: "Alert",
          labelZh: "警报",
          classes: [
            "border-[#ef4444]",
            "text-[#ef4444]",
            "placeholder:text-[#ef4444]/40",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "ENTER COMMAND...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#fbbf24]",
          "focus:shadow-[0_0_8px_rgba(251,191,36,0.4)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    hazardStripe: {
      id: "hazardStripe",
      name: "Hazard Stripe",
      nameZh: "警戒条纹",
      description: "Yellow/black diagonal warning stripe decoration for panels",
      skeleton: {
        element: "div",
        baseClasses: [
          "h-2",
          "bg-repeating-linear-gradient",
        ],
      },
      parameters: [
        {
          id: "position",
          label: "Position",
          labelZh: "位置",
          type: "select",
          options: [
            { value: "top", label: "Top", labelZh: "顶部", classes: "" },
            { value: "bottom", label: "Bottom", labelZh: "底部", classes: "" },
            { value: "left", label: "Left", labelZh: "左侧", classes: "w-2 h-full" },
            { value: "right", label: "Right", labelZh: "右侧", classes: "w-2 h-full" },
          ],
          default: "top",
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

    militaryPanel: {
      id: "militaryPanel",
      name: "Military Panel",
      nameZh: "军事面板",
      description: "HUD-style panel with angular corners and optional hazard stripes",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#1a2744]",
          "border-2 border-[#4a5c3a]",
          "p-4",
        ],
      },
      parameters: [
        {
          id: "hasHazardStripe",
          label: "Hazard Stripe",
          labelZh: "警戒条纹",
          type: "boolean",
          default: true,
          trueClasses: "",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: ["border-[#4a5c3a]"],
        },
        warning: {
          id: "warning",
          label: "Warning",
          labelZh: "警告",
          classes: ["border-[#fbbf24]"],
        },
        danger: {
          id: "danger",
          label: "Danger",
          labelZh: "危险",
          classes: ["border-[#ef4444]"],
        },
        info: {
          id: "info",
          label: "Info",
          labelZh: "信息",
          classes: ["border-[#3b82f6]"],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {},
    },

    statusBar: {
      id: "statusBar",
      name: "Status Bar",
      nameZh: "状态条",
      description: "HP/Shield/Energy bar with segmented design and percentage display",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "h-6",
          "bg-[#1a2744]",
          "border border-[#4a5c3a]",
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
        hp: {
          id: "hp",
          label: "HP",
          labelZh: "生命值",
          classes: ["[&>.fill]:bg-[#22c55e]"],
        },
        shield: {
          id: "shield",
          label: "Shield",
          labelZh: "护盾",
          classes: ["[&>.fill]:bg-[#3b82f6]"],
        },
        energy: {
          id: "energy",
          label: "Energy",
          labelZh: "能量",
          classes: ["[&>.fill]:bg-[#fbbf24]"],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "标签", required: false, default: "HP", type: "text" },
      ],
      states: {},
    },

    toggleSwitch: {
      id: "toggleSwitch",
      name: "Toggle Switch",
      nameZh: "开关",
      description: "Chunky military-style toggle switch with power icon",
      skeleton: {
        element: "button",
        baseClasses: [
          "relative",
          "w-16 h-8",
          "bg-[#1a2744]",
          "border-2 border-[#4a5c3a]",
          "rounded-none",
          "transition-all duration-200",
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
          "[&.active]:border-[#22c55e]",
          "[&.active]:shadow-[0_0_8px_rgba(34,197,94,0.5)]",
        ],
      },
    },

    rankBadge: {
      id: "rankBadge",
      name: "Rank Badge",
      nameZh: "军衔徽章",
      description: "Military rank insignia badge with chevron design",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center gap-1",
          "px-3 py-1",
          "font-mono text-xs uppercase tracking-widest",
          "border-2",
        ],
      },
      parameters: [],
      variants: {
        solid: {
          id: "solid",
          label: "Solid",
          labelZh: "实心",
          classes: ["bg-[#fbbf24] text-[#1a2744] border-[#1a2744]"],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "描边",
          classes: ["bg-transparent text-[#fbbf24] border-[#fbbf24]"],
        },
        glow: {
          id: "glow",
          label: "Glow",
          labelZh: "发光",
          classes: ["bg-[#22c55e] text-white border-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.5)]"],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "CPT", type: "text" },
      ],
      states: {},
    },

    diagnosticsRow: {
      id: "diagnosticsRow",
      name: "Diagnostics Row",
      nameZh: "诊断行",
      description: "Table row with status indicator dot for system diagnostics",
      skeleton: {
        element: "div",
        baseClasses: [
          "border-b border-[#4a5c3a]/30",
          "font-mono text-sm",
        ],
      },
      parameters: [],
      variants: {
        online: {
          id: "online",
          label: "Online",
          labelZh: "在线",
          classes: ["[&_.status]:bg-[#22c55e] [&_.status]:animate-pulse"],
        },
        offline: {
          id: "offline",
          label: "Offline",
          labelZh: "离线",
          classes: ["[&_.status]:bg-[#ef4444]"],
        },
        standby: {
          id: "standby",
          label: "Standby",
          labelZh: "待机",
          classes: ["[&_.status]:bg-[#fbbf24]"],
        },
      },
      slots: [
        { id: "system", label: "System", labelZh: "系统", required: true, default: "REACTOR", type: "text" },
        { id: "value", label: "Value", labelZh: "数值", required: true, default: "100%", type: "text" },
      ],
      states: {},
    },

    checkboxArray: {
      id: "checkboxArray",
      name: "Checkbox Array",
      nameZh: "复选框组",
      description: "Military style checkbox group for subsystem toggles",
      skeleton: {
        element: "div",
        baseClasses: [
          "grid grid-cols-2 gap-2",
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
