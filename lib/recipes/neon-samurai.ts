// Neon Samurai Component Recipes
import { createStyleRecipes } from "./factory";

export const neonSamuraiRecipes = createStyleRecipes("neon-samurai", "Neon Samurai", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Sharp-edged button with katana slash corner marks and dual-color neon glow",
      skeleton: {
        element: "button",
        baseClasses: [
          "relative",
          "font-sans",
          "font-bold",
          "uppercase",
          "tracking-widest",
          "border border-[#dc2626]/60",
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
        {
          id: "slashCorners",
          label: "Slash Corner Marks",
          labelZh: "斜切角标",
          type: "boolean",
          default: true,
          trueClasses: "before:content-[''] before:absolute before:top-0 before:right-0 before:w-3 before:h-3 before:border-t before:border-r before:border-[#a020f0] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-3 after:h-3 after:border-b after:border-l after:border-[#a020f0]",
        },
      ],
      variants: {
        primary: {
          id: "primary",
          label: "Primary",
          labelZh: "主要",
          classes: [
            "bg-[#dc2626] text-white",
            "shadow-[0_0_15px_rgba(220,38,38,0.5)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#080818] text-[#dc2626]",
            "border-[#dc2626]",
            "shadow-[0_0_10px_rgba(220,38,38,0.3)]",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#a020f0] text-white",
            "border-[#a020f0]/60",
            "shadow-[0_0_15px_rgba(160,32,240,0.5)]",
          ],
        },
        dualGlow: {
          id: "dualGlow",
          label: "Dual Glow",
          labelZh: "双色辉光",
          classes: [
            "bg-[#080818] text-[#a020f0]",
            "border-[#a020f0]/50",
            "shadow-[0_0_15px_rgba(56,189,248,0.4)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Strike", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]",
          "hover:border-[#dc2626]",
        ],
        active: ["active:scale-95 active:shadow-[0_0_8px_rgba(220,38,38,0.4)]"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Armor-plate styled card with angular clip-path and neon edge glow",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#080818]",
          "border border-[#dc2626]/30",
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
        {
          id: "armorClip",
          label: "Armor Plate Clip",
          labelZh: "甲板裁切",
          type: "boolean",
          default: false,
          trueClasses: "[clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))]",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        neonRed: {
          id: "neonRed",
          label: "Neon Red",
          labelZh: "霓虹红",
          classes: [
            "shadow-[0_0_15px_rgba(220,38,38,0.3)]",
          ],
        },
        neonPurple: {
          id: "neonPurple",
          label: "Neon Purple",
          labelZh: "霓虹紫",
          classes: [
            "border-[#a020f0]/30",
            "shadow-[0_0_15px_rgba(160,32,240,0.3)]",
          ],
        },
        dualGlow: {
          id: "dualGlow",
          label: "Dual Glow",
          labelZh: "双色辉光",
          classes: [
            "border-[#a020f0]/30",
            "shadow-[0_0_15px_rgba(56,189,248,0.25)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]",
          "hover:border-[#dc2626]/60",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Brush-stroke underline input with dual-color neon glow focus",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "border-b-2 border-[#dc2626]/30",
          "bg-transparent",
          "text-white",
          "placeholder:text-white/25",
          "font-sans",
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
        neon: {
          id: "neon",
          label: "Neon",
          labelZh: "霓虹",
          classes: [
            "border-[#dc2626]/40",
          ],
        },
        purple: {
          id: "purple",
          label: "Purple",
          labelZh: "紫色",
          classes: [
            "border-[#a020f0]/30",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Enter command...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#dc2626]",
          "focus:shadow-[0_2px_15px_rgba(56,189,248,0.4)]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    katanaSlash: {
      id: "katanaSlash",
      name: "Katana Slash",
      nameZh: "刀斩分割线",
      description: "Decorative divider with diagonal slash line and neon glow, evoking a katana cut",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "w-full",
          "h-3",
          "my-6",
          "rotate-[-2deg]",
          "bg-[linear-gradient(105deg,#e2e8f0_0%,#94a3b8_30%,#e2e8f0_50%,#64748b_70%,#e2e8f0_100%)]",
          "[clip-path:polygon(0_30%,10%_60%,20%_20%,30%_50%,40%_10%,50%_40%,60%_5%,70%_35%,80%_15%,90%_45%,100%_25%,100%_75%,90%_55%,80%_85%,70%_65%,60%_95%,50%_60%,40%_90%,30%_50%,20%_80%,10%_40%,0_70%)]",
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
        red: {
          id: "red",
          label: "Red",
          labelZh: "赤红",
          classes: [
            "bg-[#dc2626]",
            "shadow-[0_0_12px_rgba(220,38,38,0.6),0_0_4px_rgba(220,38,38,0.8)]",
          ],
        },
        purple: {
          id: "purple",
          label: "Purple",
          labelZh: "紫色",
          classes: [
            "bg-[#a020f0]",
            "shadow-[0_0_12px_rgba(160,32,240,0.6),0_0_4px_rgba(160,32,240,0.8)]",
          ],
        },
        blue: {
          id: "blue",
          label: "Blue",
          labelZh: "蓝色",
          classes: [
            "bg-[#38bdf8]",
            "shadow-[0_0_12px_rgba(56,189,248,0.6),0_0_4px_rgba(56,189,248,0.8)]",
          ],
        },
      },
      slots: [{ id: "children", label: "Content", labelZh: "内容", required: false, type: "children" }],
      states: {
        hover: [
          "hover:shadow-[0_0_20px_rgba(220,38,38,0.8)]",
          "hover:scale-x-105",
        ],
      },
    },

    kamonBadge: {
      id: "kamonBadge",
      name: "Kamon Badge",
      nameZh: "家纹徽章",
      description: "Circular badge styled like a Japanese family crest with neon outline",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex",
          "items-center",
          "justify-center",
          "rounded-full",
          "border-2",
          "outline outline-2 outline-offset-4",
          "shadow-[0_0_0_6px_#080818,0_0_0_8px_currentColor]",
          "bg-[radial-gradient(circle,transparent_30%,currentColor_31%,currentColor_33%,transparent_34%)]",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "w-10 h-10 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "w-14 h-14 text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "w-20 h-20 text-lg" },
          ],
          default: "md",
        },
      ],
      variants: {
        fire: {
          id: "fire",
          label: "Fire",
          labelZh: "火",
          classes: [
            "bg-[#080818]",
            "border-[#dc2626]",
            "text-[#dc2626]",
            "outline-[#dc2626]",
            "shadow-[0_0_15px_rgba(220,38,38,0.5)]",
          ],
        },
        water: {
          id: "water",
          label: "Water",
          labelZh: "水",
          classes: [
            "bg-[#080818]",
            "border-[#38bdf8]",
            "text-[#38bdf8]",
            "outline-[#38bdf8]",
            "shadow-[0_0_15px_rgba(56,189,248,0.5)]",
          ],
        },
        wind: {
          id: "wind",
          label: "Wind",
          labelZh: "风",
          classes: [
            "bg-[#080818]",
            "border-[#a020f0]",
            "text-[#a020f0]",
            "outline-[#a020f0]",
            "shadow-[0_0_15px_rgba(160,32,240,0.5)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_25px_rgba(220,38,38,0.7)]",
          "hover:scale-110",
        ],
      },
    },

    dojoPanel: {
      id: "dojoPanel",
      name: "Dojo Panel",
      nameZh: "道场面板",
      description: "Panel with traditional dojo aesthetic and neon accents",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#1a0f0a]",
          "bg-[repeating-linear-gradient(180deg,transparent,transparent_12px,rgba(139,90,43,0.08)_12px,rgba(139,90,43,0.08)_24px)]",
          "border border-[#dc2626]/20",
          "border-b-4 border-b-[#dc2626]/30",
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
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "border-[#dc2626]/20",
            "shadow-[0_0_10px_rgba(220,38,38,0.15)]",
          ],
        },
        combat: {
          id: "combat",
          label: "Combat",
          labelZh: "战斗",
          classes: [
            "border-[#dc2626]/50",
            "shadow-[0_0_20px_rgba(220,38,38,0.4)]",
            "bg-[#1a0f0a]/95",
            "bg-[repeating-linear-gradient(180deg,transparent,transparent_12px,rgba(139,90,43,0.08)_12px,rgba(139,90,43,0.08)_24px)]",
          ],
        },
        meditation: {
          id: "meditation",
          label: "Meditation",
          labelZh: "冥想",
          classes: [
            "border-[#a020f0]/30",
            "shadow-[0_0_15px_rgba(160,32,240,0.2)]",
            "bg-[#12080a]/90",
            "bg-[repeating-linear-gradient(180deg,transparent,transparent_12px,rgba(139,90,43,0.06)_12px,rgba(139,90,43,0.06)_24px)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Dojo", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Panel content", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]",
          "hover:border-[#dc2626]/40",
        ],
      },
    },

    bushidoAlert: {
      id: "bushidoAlert",
      name: "Bushido Alert",
      nameZh: "武士道警告",
      description: "Alert box with samurai honor code aesthetic and neon accents",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "border-l-4",
          "border-t-2 border-t-[#dc2626]/20",
          "bg-[#080818]/90",
          "font-serif",
          "tracking-[0.15em]",
          "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#dc2626]/30 before:to-transparent",
          "transition-all duration-300 ease-in-out",
          "p-4 md:p-6",
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
        honor: {
          id: "honor",
          label: "Honor",
          labelZh: "荣誉",
          classes: [
            "border-l-[#38bdf8]",
            "shadow-[0_0_12px_rgba(56,189,248,0.3)]",
            "text-[#38bdf8]",
          ],
        },
        warning: {
          id: "warning",
          label: "Warning",
          labelZh: "警告",
          classes: [
            "border-l-[#dc2626]",
            "shadow-[0_0_12px_rgba(220,38,38,0.3)]",
            "text-[#dc2626]",
          ],
        },
        defeat: {
          id: "defeat",
          label: "Defeat",
          labelZh: "败北",
          classes: [
            "border-l-[#a020f0]",
            "shadow-[0_0_12px_rgba(160,32,240,0.3)]",
            "text-[#a020f0]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Alert", type: "text" },
        { id: "message", label: "Message", labelZh: "消息", required: true, default: "Alert message", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]",
        ],
      },
    },

    bladeProgress: {
      id: "bladeProgress",
      name: "Blade Progress",
      nameZh: "刀刃进度条",
      description: "Progress bar styled like a katana blade being drawn from its sheath",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "w-full",
          "h-2",
          "bg-[#080818]",
          "border border-[#dc2626]/20",
          "overflow-hidden",
          "shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]",
          "transition-all duration-300 ease-in-out",
        ],
      },
      parameters: [
        {
          id: "value",
          label: "Value",
          labelZh: "进度值",
          type: "select",
          options: [
            { value: "25", label: "25%", labelZh: "25%", classes: "after:content-[''] after:absolute after:inset-y-0 after:left-0 after:w-1/4" },
            { value: "50", label: "50%", labelZh: "50%", classes: "after:content-[''] after:absolute after:inset-y-0 after:left-0 after:w-1/2" },
            { value: "75", label: "75%", labelZh: "75%", classes: "after:content-[''] after:absolute after:inset-y-0 after:left-0 after:w-3/4" },
            { value: "100", label: "100%", labelZh: "100%", classes: "after:content-[''] after:absolute after:inset-y-0 after:left-0 after:w-full" },
          ],
          default: "50",
        },
      ],
      variants: {
        steel: {
          id: "steel",
          label: "Steel",
          labelZh: "钢铁",
          classes: [
            "after:bg-[linear-gradient(105deg,#e2e8f0_0%,#cbd5e1_20%,#f1f5f9_40%,#94a3b8_60%,#e2e8f0_80%,#cbd5e1_100%)]",
            "shadow-[0_0_8px_rgba(226,232,240,0.3)]",
          ],
        },
        flame: {
          id: "flame",
          label: "Flame",
          labelZh: "烈焰",
          classes: [
            "after:bg-[linear-gradient(105deg,#dc2626_0%,#f97316_30%,#dc2626_50%,#ef4444_70%,#f97316_100%)]",
            "shadow-[0_0_8px_rgba(220,38,38,0.4)]",
          ],
        },
        lightning: {
          id: "lightning",
          label: "Lightning",
          labelZh: "雷电",
          classes: [
            "after:bg-[linear-gradient(105deg,#a020f0_0%,#38bdf8_30%,#a020f0_50%,#818cf8_70%,#38bdf8_100%)]",
            "shadow-[0_0_8px_rgba(160,32,240,0.4)]",
          ],
        },
      },
      slots: [{ id: "children", label: "Content", labelZh: "内容", required: false, type: "children" }],
      states: {
        hover: [
          "hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]",
        ],
      },
    },
});
