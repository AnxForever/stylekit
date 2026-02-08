// Gothic Lolita Component Recipes
import type { StyleRecipes } from "./types";

export const gothicLolitaRecipes: StyleRecipes = {
  styleSlug: "gothic-lolita",
  styleName: "Gothic Lolita",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Dark Victorian button with lace-inspired borders, ornate serif text and elegant hover effects",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "tracking-wide",
          "rounded-sm",
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
            "bg-[#4a1a4a] text-[#e5e5e5]",
            "border-[#8b1a2a]/60",
            "shadow-[0_2px_8px_rgba(75,26,75,0.5)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#0a0a0a] text-[#e5e5e5]",
            "border-[#4a1a4a]/60",
            "shadow-[0_2px_8px_rgba(10,10,10,0.5)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#8b1a2a]",
            "border-[#8b1a2a]/50",
            "shadow-[0_1px_4px_rgba(139,26,42,0.3)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_4px_16px_rgba(139,26,42,0.5)]",
          "hover:border-[#8b1a2a]",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Dark Victorian card with ornate lace-like borders and deep purple accents",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#0a0a0a]/90",
          "rounded-sm",
          "border border-[#4a1a4a]/50",
          "shadow-[0_4px_16px_rgba(74,26,74,0.4)]",
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
        rose: {
          id: "rose",
          label: "Rose",
          labelZh: "玫瑰",
          classes: [
            "border-[#8b1a2a]/50",
            "shadow-[0_4px_16px_rgba(139,26,42,0.3)]",
          ],
        },
        silver: {
          id: "silver",
          label: "Silver",
          labelZh: "银白",
          classes: [
            "border-[#e5e5e5]/30",
            "shadow-[0_4px_16px_rgba(229,229,229,0.15)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_8px_24px_rgba(139,26,42,0.4)]",
          "hover:border-[#8b1a2a]/60",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Dark elegant input with ornate border styling and Victorian aesthetic",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-sm",
          "border border-[#4a1a4a]/50",
          "bg-[#0a0a0a]/80",
          "text-[#e5e5e5]",
          "placeholder:text-[#4a1a4a]/60",
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
        rose: {
          id: "rose",
          label: "Rose",
          labelZh: "玫瑰",
          classes: [
            "border-[#8b1a2a]/50",
            "text-[#e5e5e5]",
            "placeholder:text-[#8b1a2a]/40",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#8b1a2a]",
          "focus:shadow-[0_0_12px_rgba(139,26,42,0.4)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    lacePanel: {
      id: "lacePanel",
      name: "Lace Panel",
      nameZh: "蕾丝面板",
      description: "Decorative panel with lace-like border pattern and corner rose ornaments",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#0a0a0a]/95",
          "border-2 border-[#4a1a4a]",
          "p-6",
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
        rose: {
          id: "rose",
          label: "Rose",
          labelZh: "玫瑰",
          classes: ["border-[#8b1a2a]"],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {},
    },

    ribbonBadge: {
      id: "ribbonBadge",
      name: "Ribbon Badge",
      nameZh: "丝带徽章",
      description: "Elegant ribbon-shaped badge with Victorian styling",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center",
          "px-4 py-1",
          "bg-[#4a1a4a]",
          "text-[#e5e5e5]",
          "font-serif text-sm",
          "relative",
        ],
      },
      parameters: [],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: ["bg-[#4a1a4a]"],
        },
        rose: {
          id: "rose",
          label: "Rose",
          labelZh: "玫瑰",
          classes: ["bg-[#8b1a2a]"],
        },
        silver: {
          id: "silver",
          label: "Silver",
          labelZh: "银白",
          classes: ["bg-[#e5e5e5]/20 border border-[#e5e5e5]/40"],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Badge", type: "text" },
      ],
      states: {},
    },

    rosetteBadge: {
      id: "rosetteBadge",
      name: "Rosette Badge",
      nameZh: "玫瑰花结徽章",
      description: "Circular rosette badge with scalloped edges",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "w-16 h-16",
          "rounded-full",
          "bg-[#8b1a2a]",
          "text-[#e5e5e5]",
          "font-serif font-bold",
          "shadow-[0_0_0_4px_#4a1a4a,0_0_0_6px_#8b1a2a]",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "w-12 h-12 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "w-16 h-16 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "w-20 h-20 text-base" },
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
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "NEW", type: "text" },
      ],
      states: {},
    },

    rosaryProgress: {
      id: "rosaryProgress",
      name: "Rosary Progress",
      nameZh: "念珠进度条",
      description: "Progress indicator styled as a string of rosary beads",
      skeleton: {
        element: "div",
        baseClasses: [
          "flex items-center gap-2",
        ],
      },
      parameters: [
        {
          id: "steps",
          label: "Steps",
          labelZh: "步数",
          type: "select",
          options: [
            { value: "3", label: "3 Steps", labelZh: "3步", classes: "" },
            { value: "5", label: "5 Steps", labelZh: "5步", classes: "" },
            { value: "7", label: "7 Steps", labelZh: "7步", classes: "" },
          ],
          default: "5",
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

    laceDivider: {
      id: "laceDivider",
      name: "Lace Divider",
      nameZh: "蕾丝分隔线",
      description: "Decorative horizontal divider with lace pattern",
      skeleton: {
        element: "div",
        baseClasses: [
          "w-full h-px",
          "bg-gradient-to-r from-transparent via-[#4a1a4a] to-transparent",
          "relative",
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
        rose: {
          id: "rose",
          label: "Rose",
          labelZh: "玫瑰",
          classes: ["via-[#8b1a2a]"],
        },
      },
      slots: [],
      states: {},
    },

    ornateDropdown: {
      id: "ornateDropdown",
      name: "Ornate Dropdown",
      nameZh: "华丽下拉菜单",
      description: "Victorian-styled dropdown menu with decorative borders",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#0a0a0a]",
          "border border-[#4a1a4a]",
          "shadow-[0_4px_16px_rgba(74,26,74,0.4)]",
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
        { id: "trigger", label: "Trigger", labelZh: "触发器", required: true, type: "children" },
        { id: "content", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {
        hover: ["hover:border-[#8b1a2a]"],
      },
    },
  },
};
