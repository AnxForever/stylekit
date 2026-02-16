// Shoujo Manga Component Recipes
import { createStyleRecipes } from "./factory";

export const shoujoMangaRecipes = createStyleRecipes("shoujo-manga", "Shoujo Manga", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Soft pill-shaped button with pink tones, colored glow shadow, and scale hover",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-sans",
          "font-medium",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2 md:px-7 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-7 py-3 md:px-10 md:py-4 text-base md:text-lg" },
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
          label: "Sakura",
          labelZh: "樱花",
          classes: [
            "bg-[#ffb7c5] text-white",
            "shadow-[0_4px_15px_#ffb7c560]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Lavender",
          labelZh: "薰衣草",
          classes: [
            "bg-[#c4b5fd] text-white",
            "shadow-[0_4px_15px_#c4b5fd60]",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "bg-[#fde68a] text-[#4a5568]",
            "shadow-[0_4px_15px_#fde68a60]",
          ],
        },
        rose: {
          id: "rose",
          label: "Rose",
          labelZh: "玫瑰",
          classes: [
            "bg-[#fecdd3] text-[#4a5568]",
            "shadow-[0_2px_10px_#fecdd320]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#ffb7c5]",
            "border-2 border-[#ffb7c5]/40",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click", type: "text" },
      ],
      states: {
        hover: [
          "hover:scale-105",
          "hover:shadow-[0_6px_20px_#ffb7c580]",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Soft manga panel card with screentone background, flower corner icons, and pink-tinted shadow",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#fff5f7]",
          "rounded-2xl",
          "border-2 border-[#ffb7c5]/20",
          "shadow-[0_4px_20px_#ffb7c520]",
          "transition-all duration-300 ease-in-out",
          "relative overflow-hidden",
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
          id: "screentone",
          label: "Screentone BG",
          labelZh: "网点背景",
          type: "boolean",
          default: false,
          trueClasses: "",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        lavender: {
          id: "lavender",
          label: "Lavender",
          labelZh: "薰衣草",
          classes: [
            "border-[#c4b5fd]/25",
            "shadow-[0_4px_20px_#c4b5fd20]",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "border-[#fde68a]/35",
            "shadow-[0_4px_20px_#fde68a30]",
          ],
        },
        panel: {
          id: "panel",
          label: "Manga Panel",
          labelZh: "漫画面板",
          classes: [
            "bg-white/80",
            "border-2 border-[#ffb7c5]/15",
            "rounded-3xl",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Sakura Card", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "A gentle breeze carries cherry blossoms...", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_8px_30px_#ffb7c540]",
          "hover:border-[#ffb7c5]/35",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Soft pill-shaped input with pink focus glow on pearl background",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-full",
          "border border-[#ffb7c5]/25",
          "bg-[#fff5f7]",
          "text-[#4a5568]",
          "placeholder:text-[#ffb7c5]/40",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2 md:px-5 md:py-3 text-sm md:text-base" },
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
        lavender: {
          id: "lavender",
          label: "Lavender",
          labelZh: "薰衣草",
          classes: [
            "border-[#c4b5fd]/25",
            "placeholder:text-[#c4b5fd]/40",
          ],
        },
        white: {
          id: "white",
          label: "White",
          labelZh: "白色",
          classes: [
            "bg-white",
            "border-[#ffb7c5]/30",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Your name...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#ffb7c5]",
          "focus:shadow-[0_0_12px_#ffb7c540]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    sakuraBadge: {
      id: "sakuraBadge",
      name: "Sakura Badge",
      nameZh: "樱花徽章",
      description: "Circular badge with soft pink gradient and petal-like border",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "[clip-path:polygon(50%_0%,65%_35%,100%_40%,75%_65%,80%_100%,50%_80%,20%_100%,25%_65%,0%_40%,35%_35%)]",
          "font-sans font-medium",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "w-8 h-8 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "w-10 h-10 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "w-14 h-14 text-base" },
          ],
          default: "md",
        },
      ],
      variants: {
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "bg-gradient-to-br from-[#ffb7c5] to-[#fecdd3]",
            "text-white",
            "shadow-[0_2px_10px_#ffb7c540]",
          ],
        },
        lavender: {
          id: "lavender",
          label: "Lavender",
          labelZh: "薰衣草",
          classes: [
            "bg-gradient-to-br from-[#c4b5fd] to-[#ddd6fe]",
            "text-white",
            "shadow-[0_2px_10px_#c4b5fd40]",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "bg-gradient-to-br from-[#fde68a] to-[#fef3c7]",
            "text-[#4a5568]",
            "shadow-[0_2px_10px_#fde68a40]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
      ],
      states: {
        hover: [
          "hover:scale-110",
          "hover:shadow-[0_4px_15px_#ffb7c560]",
        ],
      },
    },

    sparklePanel: {
      id: "sparklePanel",
      name: "Sparkle Panel",
      nameZh: "闪光面板",
      description: "Panel with sparkle/glitter border decoration",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#fff5f7]",
          "rounded-2xl",
          "border-2 border-[#ffb7c5]/25",
          "shadow-[0_0_20px_#ffb7c515,0_0_40px_#c4b5fd10]",
          "bg-[radial-gradient(circle_2px_at_20%_30%,rgba(255,182,193,0.4)_0%,transparent_100%),radial-gradient(circle_1.5px_at_70%_20%,rgba(255,182,193,0.3)_0%,transparent_100%),radial-gradient(circle_2px_at_50%_70%,rgba(255,182,193,0.35)_0%,transparent_100%)]",
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
          classes: [],
        },
        romantic: {
          id: "romantic",
          label: "Romantic",
          labelZh: "浪漫",
          classes: [
            "border-[#fecdd3]/40",
            "shadow-[0_0_20px_#fecdd320,0_0_40px_#ffb7c510]",
          ],
        },
        dreamy: {
          id: "dreamy",
          label: "Dreamy",
          labelZh: "梦幻",
          classes: [
            "border-[#c4b5fd]/30",
            "shadow-[0_0_20px_#c4b5fd20,0_0_40px_#fde68a10]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Sparkle", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Shimmering content...", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_25px_#ffb7c530,0_0_50px_#c4b5fd20]",
          "hover:border-[#ffb7c5]/40",
        ],
      },
    },

    ribbonBanner: {
      id: "ribbonBanner",
      name: "Ribbon Banner",
      nameZh: "丝带横幅",
      description: "Decorative ribbon-shaped banner",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "font-sans font-semibold",
          "px-6 py-2",
          "rounded-none",
          "[clip-path:polygon(8px_0%,calc(100%-8px)_0%,100%_50%,calc(100%-8px)_100%,8px_100%,0%_50%)]",
          "relative",
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
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "bg-[#ffb7c5] text-white",
            "shadow-[0_3px_10px_#ffb7c540]",
            "shadow-[0_3px_0_rgba(0,0,0,0.1)]",
          ],
        },
        lavender: {
          id: "lavender",
          label: "Lavender",
          labelZh: "薰衣草",
          classes: [
            "bg-[#c4b5fd] text-white",
            "shadow-[0_3px_10px_#c4b5fd40]",
            "shadow-[0_3px_0_rgba(0,0,0,0.1)]",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "bg-[#fde68a] text-[#4a5568]",
            "shadow-[0_3px_10px_#fde68a40]",
            "shadow-[0_3px_0_rgba(0,0,0,0.1)]",
          ],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "New!", type: "text" },
      ],
      states: {
        hover: [
          "hover:scale-105",
          "hover:shadow-[0_5px_15px_#ffb7c560]",
        ],
      },
    },

    heartProgress: {
      id: "heartProgress",
      name: "Heart Progress",
      nameZh: "心形进度条",
      description: "Progress bar with heart-shaped fill aesthetic",
      skeleton: {
        element: "div",
        baseClasses: [
          "w-full",
          "h-4",
          "rounded-full",
          "bg-[#fff5f7]",
          "border border-[#ffb7c5]/20",
          "overflow-hidden",
          "relative",
          "bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_8px,rgba(255,182,193,0.2)_8px,rgba(255,182,193,0.2)_10px)]",
          "transition-all duration-300 ease-in-out",
        ],
      },
      parameters: [
        {
          id: "value",
          label: "Value",
          labelZh: "值",
          type: "select",
          options: [
            { value: "25", label: "25%", labelZh: "25%", classes: "[&>div]:w-1/4" },
            { value: "50", label: "50%", labelZh: "50%", classes: "[&>div]:w-1/2" },
            { value: "75", label: "75%", labelZh: "75%", classes: "[&>div]:w-3/4" },
            { value: "100", label: "100%", labelZh: "100%", classes: "[&>div]:w-full" },
          ],
          default: "50",
        },
      ],
      variants: {
        love: {
          id: "love",
          label: "Love",
          labelZh: "爱情",
          classes: [
            "[&>div]:bg-gradient-to-r [&>div]:from-[#ffb7c5] [&>div]:to-[#fecdd3]",
            "shadow-[0_2px_8px_#ffb7c520]",
          ],
        },
        friendship: {
          id: "friendship",
          label: "Friendship",
          labelZh: "友情",
          classes: [
            "[&>div]:bg-gradient-to-r [&>div]:from-[#c4b5fd] [&>div]:to-[#ddd6fe]",
            "shadow-[0_2px_8px_#c4b5fd20]",
          ],
        },
        magic: {
          id: "magic",
          label: "Magic",
          labelZh: "魔法",
          classes: [
            "[&>div]:bg-gradient-to-r [&>div]:from-[#fde68a] [&>div]:to-[#ffb7c5]",
            "shadow-[0_2px_8px_#fde68a20]",
          ],
        },
      },
      slots: [{ id: "children", label: "Content", labelZh: "内容", required: false, type: "children" }],
      states: {},
    },

    flowFrame: {
      id: "flowFrame",
      name: "Flow Frame",
      nameZh: "花卉边框",
      description: "Decorative frame with flowing floral border",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white/60",
          "rounded-3xl",
          "border-2 border-double border-[#ffb7c5]/25",
          "shadow-[0_4px_20px_#ffb7c515,inset_0_0_0_4px_rgba(255,182,193,0.15)]",
          "bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(255,183,197,0.06)_8px,rgba(255,183,197,0.06)_10px)]",
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
          classes: [],
        },
        sakura: {
          id: "sakura",
          label: "Sakura",
          labelZh: "樱花",
          classes: [
            "border-[#ffb7c5]/40",
            "shadow-[0_4px_20px_#ffb7c525]",
          ],
        },
        rose: {
          id: "rose",
          label: "Rose",
          labelZh: "玫瑰",
          classes: [
            "border-[#fecdd3]/50",
            "shadow-[0_4px_20px_#fecdd325]",
          ],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Framed with flowers...", type: "children" },
      ],
      states: {
        hover: [
          "hover:border-[#ffb7c5]/50",
          "hover:shadow-[0_6px_25px_#ffb7c530]",
        ],
      },
    },
});
