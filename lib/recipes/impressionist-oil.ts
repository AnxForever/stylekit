// Impressionist Oil Component Recipes
import { createStyleRecipes } from "./factory";

export const impressionistOilRecipes = createStyleRecipes("impressionist-oil", "Impressionist Oil", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description:
        "Impasto paint-tube button with linear-gradient fill simulating thick paint, layered bottom shadow for dimensional depth, and brushstroke texture background",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "font-bold",
          "tracking-wide",
          "rounded-lg",
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
            {
              value: "sm",
              label: "Small",
              labelZh: "小",
              classes: "px-5 py-2 text-sm",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "px-7 py-3 md:px-8 md:py-3.5 text-sm md:text-base",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "px-8 py-4 md:px-10 md:py-4.5 text-base md:text-lg",
            },
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
          label: "Warm Orange",
          labelZh: "暖橙",
          classes: [
            "bg-[#e8a87c] text-[#2c3e50]",
            "shadow-[0_4px_0_#c0392b,0_6px_16px_rgba(232,168,124,0.30)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Deep Blue",
          labelZh: "深蓝",
          classes: [
            "bg-[#2c3e50] text-[#f5f0e1]",
            "shadow-[0_4px_0_#1abc9c,0_6px_16px_rgba(44,62,80,0.30)]",
          ],
        },
        vermillion: {
          id: "vermillion",
          label: "Vermillion",
          labelZh: "朱红",
          classes: [
            "bg-[#c0392b] text-[#f5f0e1]",
            "shadow-[0_4px_0_#2c3e50,0_6px_16px_rgba(192,57,43,0.30)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#e8a87c]",
            "border-2 border-[#e8a87c]",
          ],
        },
      },
      slots: [
        {
          id: "icon",
          label: "Icon",
          labelZh: "图标",
          required: false,
          type: "icon",
        },
        {
          id: "label",
          label: "Label",
          labelZh: "文字",
          required: true,
          default: "Paint",
          type: "text",
        },
      ],
      states: {
        hover: [
          "hover:brightness-110",
        ],
        active: [
          "active:translate-y-[2px]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description:
        "Canvas-textured card with repeating-linear-gradient brushstroke overlay, dappled light radial-gradient spot, and layered impasto box-shadow depth",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#f5f0e1]",
          "rounded-lg",
          "border border-[#e8a87c]/25",
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
            {
              value: "sm",
              label: "Small",
              labelZh: "小",
              classes: "p-5 md:p-6",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "p-6 md:p-8",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "p-8 md:p-10",
            },
          ],
          default: "md",
        },
        {
          id: "interactive",
          label: "Interactive",
          labelZh: "可交互",
          type: "boolean",
          default: true,
          trueClasses: "cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "shadow-[0_3px_0_rgba(192,57,43,0.12),0_8px_24px_rgba(44,62,80,0.08)]",
          ],
        },
        warm: {
          id: "warm",
          label: "Warm Tone",
          labelZh: "暖调",
          classes: [
            "border-[#c0392b]/15",
            "shadow-[0_3px_0_rgba(44,62,80,0.10),0_6px_16px_rgba(192,57,43,0.06)]",
          ],
        },
        cool: {
          id: "cool",
          label: "Cool Tone",
          labelZh: "冷调",
          classes: [
            "border-[#1abc9c]/15",
            "shadow-[0_3px_0_rgba(26,188,156,0.15),0_6px_16px_rgba(26,188,156,0.06)]",
          ],
        },
      },
      slots: [
        {
          id: "title",
          label: "Title",
          labelZh: "标题",
          required: false,
          default: "Impression",
          type: "text",
        },
        {
          id: "children",
          label: "Content",
          labelZh: "内容",
          required: true,
          default: "Light dances across the canvas",
          type: "children",
        },
      ],
      states: {
        hover: [
          "hover:border-[#e8a87c]/40",
          "hover:shadow-[0_4px_0_rgba(192,57,43,0.15),0_10px_28px_rgba(44,62,80,0.12)]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description:
        "Canvas-surface input with warm inset shadow simulating paint indentation, serif typography, and impasto focus glow",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-lg",
          "border-2 border-[#e8a87c]/25",
          "bg-[#f5f0e1]",
          "text-[#2c3e50]",
          "placeholder:text-[#2c3e50]/30",
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
            {
              value: "sm",
              label: "Small",
              labelZh: "小",
              classes: "px-4 py-2.5 text-sm",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "px-5 py-3 md:py-3.5 text-sm md:text-base",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "px-6 py-4 text-base md:text-lg",
            },
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
            "shadow-[inset_0_2px_4px_rgba(44,62,80,0.04)]",
          ],
        },
        warm: {
          id: "warm",
          label: "Warm",
          labelZh: "暖调",
          classes: [
            "border-[#e8a87c]/40",
            "placeholder:text-[#e8a87c]/30",
          ],
        },
        turquoise: {
          id: "turquoise",
          label: "Turquoise",
          labelZh: "青绿",
          classes: [
            "border-[#1abc9c]/25",
            "placeholder:text-[#1abc9c]/30",
          ],
        },
      },
      slots: [
        {
          id: "placeholder",
          label: "Placeholder",
          labelZh: "占位符",
          required: false,
          default: "Your brushstroke...",
          type: "text",
        },
      ],
      states: {
        focus: [
          "focus:border-[#e8a87c]",
          "focus:shadow-[0_0_0_3px_rgba(232,168,124,0.12)]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    canvasPanel: {
      id: "canvasPanel",
      name: "Canvas Panel",
      nameZh: "画布面板",
      description: "Panel with canvas/linen texture background",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#f5f0e1]",
          "rounded-lg",
          "border border-[#e8a87c]/20",
          "font-serif",
          "transition-all duration-300 ease-in-out",
          "relative",
          "bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_3px,rgba(232,168,124,0.03)_3px,rgba(232,168,124,0.03)_4px)]",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-5 md:p-6" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-6 md:p-8" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-8 md:p-10" },
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
            "shadow-[0_3px_0_rgba(192,57,43,0.08),0_6px_16px_rgba(44,62,80,0.06)]",
          ],
        },
        warm: {
          id: "warm",
          label: "Warm",
          labelZh: "暖调",
          classes: [
            "border-[#e8a87c]/30",
            "shadow-[0_3px_0_rgba(232,168,124,0.12),0_6px_16px_rgba(232,168,124,0.06)]",
          ],
        },
        cool: {
          id: "cool",
          label: "Cool",
          labelZh: "冷调",
          classes: [
            "border-[#1abc9c]/20",
            "shadow-[0_3px_0_rgba(26,188,156,0.12),0_6px_16px_rgba(26,188,156,0.06)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Canvas", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Painted with light...", type: "children" },
      ],
      states: {
        hover: [
          "hover:border-[#e8a87c]/35",
          "hover:shadow-[0_4px_0_rgba(192,57,43,0.12),0_8px_20px_rgba(44,62,80,0.10)]",
        ],
      },
    },

    brushstrokeBadge: {
      id: "brushstrokeBadge",
      name: "Brushstroke Badge",
      nameZh: "笔触徽章",
      description: "Badge with brushstroke-shaped background",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "rounded-[60%_40%_50%_50%/40%_60%_50%_50%]",
          "font-serif font-bold",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-1.5 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-2 text-base" },
          ],
          default: "md",
        },
      ],
      variants: {
        warm: {
          id: "warm",
          label: "Warm",
          labelZh: "暖调",
          classes: [
            "bg-[#e8a87c] text-[#2c3e50]",
            "shadow-[0_2px_0_#c0392b,0_4px_10px_rgba(232,168,124,0.25)]",
          ],
        },
        cool: {
          id: "cool",
          label: "Cool",
          labelZh: "冷调",
          classes: [
            "bg-[#1abc9c] text-[#f5f0e1]",
            "shadow-[0_2px_0_#2c3e50,0_4px_10px_rgba(26,188,156,0.25)]",
          ],
        },
        earth: {
          id: "earth",
          label: "Earth",
          labelZh: "大地",
          classes: [
            "bg-[#2c3e50] text-[#f5f0e1]",
            "shadow-[0_2px_0_#c0392b,0_4px_10px_rgba(44,62,80,0.25)]",
          ],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Oil", type: "text" },
      ],
      states: {
        hover: [
          "hover:brightness-110",
          "hover:scale-105",
        ],
      },
    },

    paletteNav: {
      id: "paletteNav",
      name: "Palette Nav",
      nameZh: "调色板导航",
      description: "Navigation styled like a painter's palette",
      skeleton: {
        element: "nav",
        baseClasses: [
          "bg-[#f5f0e1]",
          "rounded-[50%_50%_50%_50%/60%_60%_40%_40%]",
          "border border-[#e8a87c]/20",
          "px-4 py-2 md:px-6 md:py-3",
          "flex items-center gap-2",
          "font-serif",
          "transition-all duration-300 ease-in-out",
        ],
      },
      parameters: [
        {
          id: "visible",
          label: "Visible",
          labelZh: "可见",
          type: "boolean",
          default: true,
          trueClasses: "opacity-100",
          falseClasses: "opacity-0",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "shadow-[0_2px_0_rgba(192,57,43,0.08),0_4px_12px_rgba(44,62,80,0.06)]",
          ],
        },
        warm: {
          id: "warm",
          label: "Warm",
          labelZh: "暖调",
          classes: [
            "border-[#e8a87c]/30",
            "shadow-[0_2px_0_rgba(232,168,124,0.12),0_4px_12px_rgba(232,168,124,0.08)]",
          ],
        },
        cool: {
          id: "cool",
          label: "Cool",
          labelZh: "冷调",
          classes: [
            "border-[#1abc9c]/20",
            "shadow-[0_2px_0_rgba(26,188,156,0.10),0_4px_12px_rgba(26,188,156,0.06)]",
          ],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Nav items", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_3px_0_rgba(192,57,43,0.12),0_6px_16px_rgba(44,62,80,0.10)]",
        ],
      },
    },

    galleryFrame: {
      id: "galleryFrame",
      name: "Gallery Frame",
      nameZh: "画廊相框",
      description: "Ornate gallery-style frame for content",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#f5f0e1]",
          "rounded-sm",
          "transition-all duration-300 ease-in-out",
          "relative",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5 md:p-8" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-8 md:p-10" },
          ],
          default: "md",
        },
      ],
      variants: {
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "border-4 border-[#e8a87c]",
            "shadow-[inset_0_0_0_2px_#f5f0e1,inset_0_0_0_4px_#e8a87c/40,0_4px_16px_rgba(232,168,124,0.20)]",
          ],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: [
            "border-4 border-[#2c3e50]",
            "shadow-[inset_0_0_0_2px_#f5f0e1,inset_0_0_0_4px_#2c3e50/30,0_4px_16px_rgba(44,62,80,0.20)]",
          ],
        },
        minimal: {
          id: "minimal",
          label: "Minimal",
          labelZh: "极简",
          classes: [
            "border-2 border-[#e8a87c]/30",
            "shadow-[0_3px_12px_rgba(44,62,80,0.08)]",
          ],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Masterpiece", type: "children" },
        { id: "caption", label: "Caption", labelZh: "标题", required: false, default: "Untitled, 1874", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[inset_0_0_0_2px_#f5f0e1,inset_0_0_0_4px_#e8a87c/50,0_6px_20px_rgba(232,168,124,0.25)]",
        ],
      },
    },

    impastoAlert: {
      id: "impastoAlert",
      name: "Impasto Alert",
      nameZh: "厚涂提示",
      description: "Alert with thick impasto texture border",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#f5f0e1]",
          "rounded-lg",
          "border-l-4",
          "p-4 md:p-5",
          "font-serif",
          "transition-all duration-300 ease-in-out",
        ],
      },
      parameters: [
        {
          id: "visible",
          label: "Visible",
          labelZh: "可见",
          type: "boolean",
          default: true,
          trueClasses: "opacity-100",
          falseClasses: "opacity-0",
        },
      ],
      variants: {
        info: {
          id: "info",
          label: "Info",
          labelZh: "信息",
          classes: [
            "border-l-[#1abc9c]",
            "shadow-[0_2px_0_rgba(26,188,156,0.15),0_4px_12px_rgba(26,188,156,0.06)]",
          ],
        },
        warning: {
          id: "warning",
          label: "Warning",
          labelZh: "警告",
          classes: [
            "border-l-[#e8a87c]",
            "shadow-[0_2px_0_rgba(232,168,124,0.15),0_4px_12px_rgba(232,168,124,0.06)]",
          ],
        },
        success: {
          id: "success",
          label: "Success",
          labelZh: "成功",
          classes: [
            "border-l-[#2c3e50]",
            "shadow-[0_2px_0_rgba(44,62,80,0.10),0_4px_12px_rgba(44,62,80,0.06)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Notice", type: "text" },
        { id: "message", label: "Message", labelZh: "消息", required: true, default: "A brushstroke of information", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_3px_0_rgba(192,57,43,0.12),0_6px_16px_rgba(44,62,80,0.10)]",
        ],
      },
    },
});
