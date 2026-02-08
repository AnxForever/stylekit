// Cottagecore Component Recipes
import type { StyleRecipes } from "./types";

export const cottagecoreRecipes: StyleRecipes = {
  styleSlug: "cottagecore",
  styleName: "Cottagecore",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Warm countryside button with soft serif text, rounded edges, and earthy tones",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "rounded-full",
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
            "bg-[#5a8f5a] text-white",
            "shadow-md",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#f5d75f]/20 text-[#8b7355]",
            "border border-[#8b7355]/40",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#5a8f5a]",
            "border-2 border-[#5a8f5a]/50",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-lg",
          "hover:scale-105",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Warm cottagecore card with linen-like background and floral border accents",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#faf6f0]",
          "rounded-2xl",
          "border border-[#d4a0a0]/40",
          "shadow-md",
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
        floral: {
          id: "floral",
          label: "Floral",
          labelZh: "花朵",
          classes: [
            "border-[#d4a0a0]/60",
            "bg-gradient-to-br from-[#faf6f0] to-[#f5d75f]/10",
          ],
        },
        earthy: {
          id: "earthy",
          label: "Earthy",
          labelZh: "大地",
          classes: [
            "border-[#8b7355]/40",
            "bg-gradient-to-br from-[#faf6f0] to-[#8b7355]/10",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-lg",
          "hover:border-[#d4a0a0]/60",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Warm cottagecore input with soft borders and earthy placeholder tones",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-xl",
          "border border-[#8b7355]/30",
          "bg-[#faf6f0]",
          "text-[#8b7355]",
          "placeholder:text-[#8b7355]/40",
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
        floral: {
          id: "floral",
          label: "Floral",
          labelZh: "花朵",
          classes: [
            "border-[#d4a0a0]/40",
            "placeholder:text-[#d4a0a0]/50",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#5a8f5a]/60",
          "focus:shadow-[0_0_12px_rgba(90,143,90,0.2)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    gardenPanel: {
      id: "gardenPanel",
      name: "Garden Panel",
      nameZh: "花园面板",
      description: "Linen-textured panel with vine border decoration for garden content",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#faf6f0]",
          "rounded-2xl",
          "border-2 border-[#5a8f5a]/30",
          "p-6",
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
        floral: {
          id: "floral",
          label: "Floral",
          labelZh: "花朵",
          classes: ["border-[#d4a0a0]/40"],
        },
        honey: {
          id: "honey",
          label: "Honey",
          labelZh: "蜂蜜",
          classes: ["border-[#f5d75f]/50 bg-[#f5d75f]/5"],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {},
    },

    botanicalBadge: {
      id: "botanicalBadge",
      name: "Botanical Badge",
      nameZh: "植物徽章",
      description: "Circular badge with pressed flower aesthetic for labels and tags",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "w-12 h-12",
          "rounded-full",
          "bg-[#faf6f0]",
          "border-2 border-[#5a8f5a]/40",
          "font-serif text-sm",
          "text-[#5a8f5a]",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "w-8 h-8 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "w-12 h-12 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "w-16 h-16 text-base" },
          ],
          default: "md",
        },
      ],
      variants: {
        leaf: {
          id: "leaf",
          label: "Leaf",
          labelZh: "叶子",
          classes: ["border-[#5a8f5a]/40 text-[#5a8f5a]"],
        },
        flower: {
          id: "flower",
          label: "Flower",
          labelZh: "花朵",
          classes: ["border-[#d4a0a0]/50 text-[#d4a0a0]"],
        },
        berry: {
          id: "berry",
          label: "Berry",
          labelZh: "浆果",
          classes: ["border-[#8b4a5a]/40 text-[#8b4a5a]"],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
      ],
      states: {},
    },

    seedPacketTag: {
      id: "seedPacketTag",
      name: "Seed Packet Tag",
      nameZh: "种子袋标签",
      description: "Rectangular tag styled like vintage seed packet labels",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center gap-1",
          "px-3 py-1.5",
          "bg-[#f5d75f]/20",
          "border border-[#8b7355]/30",
          "rounded-lg",
          "font-serif text-sm",
          "text-[#8b7355]",
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
          classes: ["bg-[#d4a0a0]/20 border-[#d4a0a0]/40 text-[#8b4a5a]"],
        },
        herb: {
          id: "herb",
          label: "Herb",
          labelZh: "草本",
          classes: ["bg-[#5a8f5a]/10 border-[#5a8f5a]/30 text-[#5a8f5a]"],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Lavender", type: "text" },
      ],
      states: {},
    },

    masonJarProgress: {
      id: "masonJarProgress",
      name: "Mason Jar Progress",
      nameZh: "梅森罐进度条",
      description: "Progress bar styled like a mason jar filling up with preserves",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "h-8",
          "bg-[#faf6f0]",
          "border-2 border-[#8b7355]/40",
          "rounded-lg",
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
        honey: {
          id: "honey",
          label: "Honey",
          labelZh: "蜂蜜",
          classes: ["[&>.fill]:bg-gradient-to-t [&>.fill]:from-[#d4a03a] [&>.fill]:to-[#f5d75f]"],
        },
        jam: {
          id: "jam",
          label: "Jam",
          labelZh: "果酱",
          classes: ["[&>.fill]:bg-gradient-to-t [&>.fill]:from-[#8b4a5a] [&>.fill]:to-[#d4a0a0]"],
        },
        herb: {
          id: "herb",
          label: "Herb",
          labelZh: "草本",
          classes: ["[&>.fill]:bg-gradient-to-t [&>.fill]:from-[#3d5c3d] [&>.fill]:to-[#5a8f5a]"],
        },
      },
      slots: [],
      states: {},
    },

    crossStitchDivider: {
      id: "crossStitchDivider",
      name: "Cross Stitch Divider",
      nameZh: "十字绣分隔线",
      description: "Decorative divider with cross-stitch embroidery pattern",
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

    leafCard: {
      id: "leafCard",
      name: "Leaf Card",
      nameZh: "叶子卡片",
      description: "Card with botanical leaf corner decorations",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#faf6f0]",
          "rounded-2xl",
          "border border-[#5a8f5a]/30",
          "p-6",
          "shadow-sm",
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
        autumn: {
          id: "autumn",
          label: "Autumn",
          labelZh: "秋季",
          classes: ["border-[#c9a227]/40"],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {
        hover: ["hover:shadow-md", "hover:border-[#5a8f5a]/50"],
      },
    },

    journalOrnament: {
      id: "journalOrnament",
      name: "Journal Ornament",
      nameZh: "日记装饰",
      description: "Decorative ornament for journal entries with botanical flourishes",
      skeleton: {
        element: "div",
        baseClasses: [
          "flex items-center justify-center",
          "gap-3",
          "text-[#8b7355]/50",
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

    gardenTab: {
      id: "gardenTab",
      name: "Garden Tab",
      nameZh: "花园标签页",
      description: "Tab component with botanical illustration styling",
      skeleton: {
        element: "button",
        baseClasses: [
          "px-4 py-2",
          "font-serif",
          "border-b-2",
          "transition-all duration-200",
          "text-[#8b7355]",
        ],
      },
      parameters: [],
      variants: {
        garden: {
          id: "garden",
          label: "Garden",
          labelZh: "花园",
          classes: ["border-[#5a8f5a]/50"],
        },
        kitchen: {
          id: "kitchen",
          label: "Kitchen",
          labelZh: "厨房",
          classes: ["border-[#f5d75f]/50"],
        },
        craft: {
          id: "craft",
          label: "Craft",
          labelZh: "手工",
          classes: ["border-[#d4a0a0]/50"],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Garden", type: "text" },
      ],
      states: {
        active: [
          "[&.active]:text-[#5a8f5a]",
          "[&.active]:border-[#5a8f5a]",
          "[&.active]:bg-[#5a8f5a]/5",
        ],
        hover: ["hover:bg-[#faf6f0]"],
      },
    },

    wildflowerAlert: {
      id: "wildflowerAlert",
      name: "Wildflower Alert",
      nameZh: "野花提示框",
      description: "Alert boxes with wildflower-themed decorations",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "p-4",
          "rounded-xl",
          "border",
          "font-serif",
        ],
      },
      parameters: [],
      variants: {
        info: {
          id: "info",
          label: "Info",
          labelZh: "信息",
          classes: [
            "bg-[#5a8f5a]/10",
            "border-[#5a8f5a]/30",
            "text-[#5a8f5a]",
          ],
        },
        warning: {
          id: "warning",
          label: "Warning",
          labelZh: "警告",
          classes: [
            "bg-[#f5d75f]/20",
            "border-[#d4a03a]/40",
            "text-[#8b7355]",
          ],
        },
        error: {
          id: "error",
          label: "Error",
          labelZh: "错误",
          classes: [
            "bg-[#d4a0a0]/20",
            "border-[#8b4a5a]/40",
            "text-[#8b4a5a]",
          ],
        },
        success: {
          id: "success",
          label: "Success",
          labelZh: "成功",
          classes: [
            "bg-[#5a8f5a]/15",
            "border-[#5a8f5a]/50",
            "text-[#3d5c3d]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "title", label: "Title", labelZh: "标题", required: false, type: "text" },
        { id: "message", label: "Message", labelZh: "消息", required: true, type: "text" },
      ],
      states: {},
    },

    harvestTable: {
      id: "harvestTable",
      name: "Harvest Table",
      nameZh: "收获表格",
      description: "Table styled like a seed catalog or planting schedule",
      skeleton: {
        element: "div",
        baseClasses: [
          "w-full",
          "font-serif text-sm",
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
  },
};
