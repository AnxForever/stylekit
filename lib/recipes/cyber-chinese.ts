// Cyber Chinese Component Recipes
import { createStyleRecipes } from "./factory";

export const cyberChineseRecipes = createStyleRecipes("cyber-chinese", "Cyber Chinese", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Cyberpunk-infused Chinese button with neon accents, vermilion tones and angular design",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-bold",
          "tracking-wider",
          "rounded-none",
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
            "bg-[#d4553a] text-white",
            "border-[#c9a227]",
            "shadow-[0_0_16px_rgba(212,85,58,0.5)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#0a0a0a] text-[#00d4ff]",
            "border-[#00d4ff]/50",
            "shadow-[0_0_12px_rgba(0,212,255,0.3)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#d4553a]",
            "border-[#d4553a]/50",
            "shadow-[0_0_10px_rgba(212,85,58,0.3)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_24px_rgba(201,162,39,0.6)]",
          "hover:border-[#c9a227]",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Cyberpunk Chinese card with neon border glow and traditional-meets-futuristic palette",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#0a0a0a]/90",
          "rounded-none",
          "border border-[#d4553a]/40",
          "shadow-[0_0_16px_rgba(212,85,58,0.3)]",
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
        neon: {
          id: "neon",
          label: "Neon",
          labelZh: "霓虹",
          classes: [
            "border-[#00d4ff]/50",
            "shadow-[0_0_16px_rgba(0,212,255,0.3)]",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "border-[#c9a227]/50",
            "shadow-[0_0_16px_rgba(201,162,39,0.3)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_24px_rgba(212,85,58,0.5)]",
          "hover:border-[#d4553a]/60",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Cyberpunk Chinese input with angular design and neon focus states",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-none",
          "border border-[#c9a227]/40",
          "bg-[#0a0a0a]/80",
          "text-[#00d4ff]",
          "placeholder:text-[#c9a227]/40",
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
            "border-[#d4553a]/50",
            "text-[#d4553a]",
            "placeholder:text-[#d4553a]/30",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#00d4ff]",
          "focus:shadow-[0_0_16px_rgba(0,212,255,0.5)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    lanternBadge: {
      id: "lanternBadge",
      name: "Lantern Badge",
      nameZh: "灯笼徽章",
      description: "Badge styled like a Chinese lantern with neon glow",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex",
          "items-center",
          "justify-center",
          "rounded-[15%_15%_40%_40%]",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "w-10 h-10 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "w-14 h-14 text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "w-20 h-20 text-lg" },
          ],
          default: "md",
        },
      ],
      variants: {
        red: {
          id: "red",
          label: "Red",
          labelZh: "红色",
          classes: [
            "bg-[#d4553a]/20",
            "border-[#d4553a]",
            "text-[#d4553a]",
            "shadow-[0_0_16px_rgba(212,85,58,0.5)]",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "bg-[#c9a227]/20",
            "border-[#c9a227]",
            "text-[#c9a227]",
            "shadow-[0_0_16px_rgba(201,162,39,0.5)]",
          ],
        },
        jade: {
          id: "jade",
          label: "Jade",
          labelZh: "翡翠",
          classes: [
            "bg-[#00d4ff]/10",
            "border-[#00d4ff]",
            "text-[#00d4ff]",
            "shadow-[0_0_16px_rgba(0,212,255,0.5)]",
          ],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: false, default: "福", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_24px_rgba(212,85,58,0.7)]",
          "hover:scale-110",
        ],
      },
    },

    dragonScroll: {
      id: "dragonScroll",
      name: "Dragon Scroll",
      nameZh: "龙纹卷轴",
      description: "Scroll-shaped panel with dragon motif border and neon accents",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#0a0a0a]/90",
          "border border-[#c9a227]/30",
          "rounded-sm",
          "before:content-['']",
          "before:absolute",
          "before:top-0",
          "before:left-0",
          "before:right-0",
          "before:h-1",
          "before:bg-gradient-to-r",
          "before:from-transparent",
          "before:via-[#c9a227]/50",
          "before:to-transparent",
          "after:content-['']",
          "after:absolute",
          "after:bottom-0",
          "after:left-0",
          "after:right-0",
          "after:h-1",
          "after:bg-gradient-to-r",
          "after:from-transparent",
          "after:via-[#c9a227]/50",
          "after:to-transparent",
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
            "shadow-[0_0_12px_rgba(201,162,39,0.2)]",
          ],
        },
        imperial: {
          id: "imperial",
          label: "Imperial",
          labelZh: "帝王",
          classes: [
            "border-[#d4553a]/40",
            "before:via-[#d4553a]/50",
            "after:via-[#d4553a]/50",
            "shadow-[0_0_16px_rgba(212,85,58,0.3)]",
          ],
        },
        jade: {
          id: "jade",
          label: "Jade",
          labelZh: "翡翠",
          classes: [
            "border-[#00d4ff]/30",
            "before:via-[#00d4ff]/40",
            "after:via-[#00d4ff]/40",
            "shadow-[0_0_16px_rgba(0,212,255,0.2)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Scroll Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Scroll content", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_24px_rgba(201,162,39,0.4)]",
          "hover:border-[#c9a227]/50",
        ],
      },
    },

    sealStamp: {
      id: "sealStamp",
      name: "Seal Stamp",
      nameZh: "印章",
      description: "Square seal/stamp badge in Chinese chop style with neon glow",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex",
          "items-center",
          "justify-center",
          "border-2",
          "rounded-none",
          "font-bold",
          "rotate-[-2deg]",
          "shadow-[inset_1px_1px_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_rgba(0,0,0,0.2)]",
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
            { value: "lg", label: "Large", labelZh: "大", classes: "w-20 h-20 text-xl" },
          ],
          default: "md",
        },
      ],
      variants: {
        red: {
          id: "red",
          label: "Red",
          labelZh: "红色",
          classes: [
            "bg-[#d4553a]/15",
            "border-[#d4553a]",
            "text-[#d4553a]",
            "shadow-[0_0_12px_rgba(212,85,58,0.4)]",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "bg-[#c9a227]/15",
            "border-[#c9a227]",
            "text-[#c9a227]",
            "shadow-[0_0_12px_rgba(201,162,39,0.4)]",
          ],
        },
        jade: {
          id: "jade",
          label: "Jade",
          labelZh: "翡翠",
          classes: [
            "bg-[#00d4ff]/10",
            "border-[#00d4ff]",
            "text-[#00d4ff]",
            "shadow-[0_0_12px_rgba(0,212,255,0.4)]",
          ],
        },
      },
      slots: [
        { id: "character", label: "Character", labelZh: "文字", required: false, default: "印", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_20px_rgba(212,85,58,0.6)]",
          "hover:scale-105",
        ],
      },
    },

    pagodaPanel: {
      id: "pagodaPanel",
      name: "Pagoda Panel",
      nameZh: "宝塔面板",
      description: "Panel with pagoda-inspired tiered header and neon accents",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#0a0a0a]/90",
          "border border-[#c9a227]/25",
          "rounded-none",
          "before:content-['']",
          "before:absolute",
          "before:top-0",
          "before:left-[10%]",
          "before:right-[10%]",
          "before:h-1",
          "before:bg-gradient-to-r",
          "before:from-transparent",
          "before:via-[#c9a227]/60",
          "before:to-transparent",
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
            "shadow-[0_0_10px_rgba(201,162,39,0.15)]",
          ],
        },
        imperial: {
          id: "imperial",
          label: "Imperial",
          labelZh: "帝王",
          classes: [
            "border-[#d4553a]/30",
            "before:via-[#d4553a]/60",
            "shadow-[0_0_16px_rgba(212,85,58,0.3)]",
          ],
        },
        night: {
          id: "night",
          label: "Night",
          labelZh: "夜色",
          classes: [
            "border-[#00d4ff]/20",
            "before:via-[#00d4ff]/50",
            "shadow-[0_0_16px_rgba(0,212,255,0.2)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Panel Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Panel content", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_24px_rgba(201,162,39,0.4)]",
          "hover:border-[#c9a227]/40",
        ],
      },
    },

    cloudMotif: {
      id: "cloudMotif",
      name: "Cloud Motif",
      nameZh: "祥云纹饰",
      description: "Decorative divider with traditional Chinese cloud pattern styling",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "w-full",
          "h-px",
          "my-6",
          "before:content-['']",
          "before:absolute",
          "before:left-1/2",
          "before:-translate-x-1/2",
          "before:-top-1.5",
          "before:w-8",
          "before:h-3",
          "before:rounded-[50%_50%_50%_50%/60%_60%_40%_40%]",
          "before:shadow-[12px_-1px_0_4px_currentColor/10,-12px_-1px_0_4px_currentColor/10]",
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
            "bg-[#c9a227]/30",
            "before:bg-[#c9a227]/20",
            "before:shadow-[0_0_8px_rgba(201,162,39,0.3)]",
            "shadow-[0_0_6px_rgba(201,162,39,0.2)]",
          ],
        },
        golden: {
          id: "golden",
          label: "Golden",
          labelZh: "金色",
          classes: [
            "bg-[#c9a227]/50",
            "before:bg-[#c9a227]/30",
            "before:shadow-[0_0_10px_rgba(201,162,39,0.5)]",
            "shadow-[0_0_8px_rgba(201,162,39,0.3)]",
          ],
        },
        jade: {
          id: "jade",
          label: "Jade",
          labelZh: "翡翠",
          classes: [
            "bg-[#00d4ff]/30",
            "before:bg-[#00d4ff]/20",
            "before:shadow-[0_0_10px_rgba(0,212,255,0.4)]",
            "shadow-[0_0_6px_rgba(0,212,255,0.2)]",
          ],
        },
      },
      slots: [{ id: "children", label: "Content", labelZh: "内容", required: false, type: "children" }],
      states: {
        hover: [
          "hover:shadow-[0_0_12px_rgba(201,162,39,0.4)]",
        ],
      },
    },
});
