// Surrealism Component Recipes
import { createStyleRecipes } from "./factory";

export const surrealismRecipes = createStyleRecipes("surrealism", "Surrealism", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Dreamlike button with surreal color shifts and unexpected visual combinations",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "italic",
          "tracking-wide",
          "rounded-lg",
          "transition-all duration-500 ease-in-out",
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
            "bg-gradient-to-r from-[#1a1a3e] to-[#c38d94] text-[#f0ece4]",
            "border border-[#d4a574]/50",
            "shadow-lg",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#d4a574]/20 text-[#1a1a3e]",
            "border border-[#1a1a3e]/30",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#c38d94]",
            "border-2 border-[#c38d94]/50",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_8px_30px_rgba(195,141,148,0.4)]",
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
      description: "Dreamscape card with melting form aesthetics and surreal depth",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-gradient-to-br from-[#f0ece4] to-[#f0ece4]/80",
          "rounded-2xl",
          "border border-[#d4a574]/30",
          "shadow-lg",
          "transition-all duration-500 ease-in-out",
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
        midnight: {
          id: "midnight",
          label: "Midnight",
          labelZh: "午夜",
          classes: [
            "bg-gradient-to-br from-[#1a1a3e] to-[#1a1a3e]/90",
            "border-[#c38d94]/30",
            "text-[#f0ece4]",
          ],
        },
        dream: {
          id: "dream",
          label: "Dream",
          labelZh: "梦境",
          classes: [
            "bg-gradient-to-br from-[#c38d94]/20 to-[#d4a574]/20",
            "border-[#c38d94]/40",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_12px_40px_rgba(26,26,62,0.2)]",
          "hover:border-[#d4a574]/60",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Surreal input with dreamlike transitions and soft desert-toned styling",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-lg",
          "border border-[#d4a574]/40",
          "bg-[#f0ece4]",
          "text-[#1a1a3e]",
          "placeholder:text-[#c38d94]/50",
          "focus:outline-none",
          "transition-all duration-500 ease-in-out",
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
            "bg-[#1a1a3e]/90",
            "border-[#c38d94]/40",
            "text-[#f0ece4]",
            "placeholder:text-[#d4a574]/50",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#c38d94]",
          "focus:shadow-[0_0_16px_rgba(195,141,148,0.3)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    meltingFrame: {
      id: "meltingFrame",
      name: "Melting Frame",
      nameZh: "融化边框",
      description: "Frame with melting/dripping edge effect and surreal depth",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-gradient-to-br from-[#f0ece4] to-[#f0ece4]/80",
          "rounded-[1rem_1rem_2rem_0.5rem]",
          "border border-[#d4a574]/30",
          "shadow-lg",
          "transition-all duration-500 ease-in-out",
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
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "shadow-[0_8px_30px_rgba(26,26,62,0.15)]",
          ],
        },
        warm: {
          id: "warm",
          label: "Warm",
          labelZh: "暖色",
          classes: [
            "bg-gradient-to-br from-[#d4a574]/20 to-[#c38d94]/20",
            "border-[#c38d94]/40",
            "shadow-[0_8px_30px_rgba(195,141,148,0.2)]",
          ],
        },
        cool: {
          id: "cool",
          label: "Cool",
          labelZh: "冷色",
          classes: [
            "bg-gradient-to-br from-[#1a1a3e]/10 to-[#c38d94]/10",
            "border-[#1a1a3e]/30",
            "shadow-[0_8px_30px_rgba(26,26,62,0.2)]",
          ],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Melting content", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_12px_40px_rgba(26,26,62,0.25)]",
          "hover:rounded-[1.5rem_0.5rem_2.5rem_1rem]",
        ],
      },
    },

    dreamPanel: {
      id: "dreamPanel",
      name: "Dream Panel",
      nameZh: "梦境面板",
      description: "Panel with dreamy, ethereal background and surreal styling",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-gradient-to-br from-[#f0ece4]/90 to-[#c38d94]/10",
          "rounded-2xl",
          "border border-[#d4a574]/20",
          "backdrop-blur-sm",
          "transition-all duration-500 ease-in-out",
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
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "shadow-[0_4px_20px_rgba(195,141,148,0.15)]",
          ],
        },
        twilight: {
          id: "twilight",
          label: "Twilight",
          labelZh: "暮光",
          classes: [
            "bg-gradient-to-br from-[#1a1a3e]/80 to-[#c38d94]/30",
            "border-[#c38d94]/30",
            "text-[#f0ece4]",
            "shadow-[0_4px_20px_rgba(26,26,62,0.3)]",
          ],
        },
        dawn: {
          id: "dawn",
          label: "Dawn",
          labelZh: "黎明",
          classes: [
            "bg-gradient-to-br from-[#d4a574]/20 to-[#f0ece4]",
            "border-[#d4a574]/30",
            "shadow-[0_4px_20px_rgba(212,165,116,0.2)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Dream Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Ethereal content", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_8px_32px_rgba(195,141,148,0.25)]",
          "hover:border-[#d4a574]/40",
        ],
      },
    },

    eyeBadge: {
      id: "eyeBadge",
      name: "Eye Badge",
      nameZh: "眼睛徽章",
      description: "Badge with surrealist eye motif and dreamlike styling",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "rounded-[50%/40%]",
          "border border-[#d4a574]/40",
          "font-serif italic",
          "transition-all duration-500 ease-in-out",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "w-14 h-10 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "w-20 h-14 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "w-28 h-20 text-base" },
          ],
          default: "md",
        },
      ],
      variants: {
        open: {
          id: "open",
          label: "Open",
          labelZh: "睁开",
          classes: [
            "bg-gradient-to-r from-[#f0ece4] to-[#c38d94]/20",
            "text-[#1a1a3e]",
            "shadow-[0_4px_16px_rgba(195,141,148,0.3)]",
          ],
        },
        closed: {
          id: "closed",
          label: "Closed",
          labelZh: "闭合",
          classes: [
            "bg-[#1a1a3e]",
            "text-[#f0ece4]",
            "border-[#c38d94]/40",
            "shadow-[0_4px_16px_rgba(26,26,62,0.3)]",
          ],
        },
        dreaming: {
          id: "dreaming",
          label: "Dreaming",
          labelZh: "梦境",
          classes: [
            "bg-gradient-to-r from-[#c38d94]/30 to-[#d4a574]/30",
            "text-[#1a1a3e]",
            "border-[#d4a574]/50",
            "shadow-[0_4px_16px_rgba(212,165,116,0.3)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_8px_24px_rgba(195,141,148,0.4)]",
          "hover:scale-110",
        ],
      },
    },
});
