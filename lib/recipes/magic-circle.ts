// Magic Circle Component Recipes
import { createStyleRecipes } from "./factory";

export const magicCircleRecipes = createStyleRecipes("magic-circle", "Magic Circle", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Hexagon-bordered button with golden glow radiation hover effect",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "font-semibold",
          "tracking-wide",
          "border border-[#fbbf24]/30",
          "rounded-sm",
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
            "bg-[#1e1b4b] text-[#fbbf24]",
            "shadow-[0_0_20px_rgba(251,191,36,0.2)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#0a0920] text-[#e2e8f0]",
            "border-[#818cf8]/30",
            "shadow-[0_0_15px_rgba(129,140,248,0.2)]",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0920]",
            "border-[#fbbf24]/60",
            "shadow-[0_0_20px_rgba(251,191,36,0.3)]",
          ],
        },
        runic: {
          id: "runic",
          label: "Runic",
          labelZh: "符文",
          classes: [
            "bg-[#0a0920] text-[#fbbf24]",
            "border-[#fbbf24]/20",
            "shadow-[0_0_15px_rgba(251,191,36,0.15)]",
            "font-mono tracking-widest",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Invoke", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_35px_rgba(251,191,36,0.5)]",
          "hover:border-[#fbbf24]/60",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Arcane card with concentric ring border decorations and runic edge marks",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#0a0920]",
          "border border-[#fbbf24]/15",
          "rounded-sm",
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
        {
          id: "centerGlow",
          label: "Center Glow",
          labelZh: "中心辉光",
          type: "boolean",
          default: false,
          trueClasses: "bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.06)_0%,transparent_70%)]",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        gold: {
          id: "gold",
          label: "Gold Glow",
          labelZh: "金色辉光",
          classes: [
            "shadow-[0_0_20px_rgba(251,191,36,0.15)]",
          ],
        },
        indigo: {
          id: "indigo",
          label: "Indigo Glow",
          labelZh: "靛蓝辉光",
          classes: [
            "border-[#818cf8]/20",
            "shadow-[0_0_20px_rgba(129,140,248,0.15)]",
          ],
        },
        sacred: {
          id: "sacred",
          label: "Sacred Geometry",
          labelZh: "神圣几何",
          classes: [
            "shadow-[0_0_25px_rgba(251,191,36,0.2)]",
            "border-[#fbbf24]/25",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]",
          "hover:border-[#fbbf24]/30",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Geometric frame input with golden glow focus and runic aesthetics",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-sm",
          "border border-[#fbbf24]/15",
          "bg-[#0a0920]",
          "text-[#e2e8f0]",
          "placeholder:text-[#e2e8f0]/25",
          "font-sans",
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
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "border-[#fbbf24]/25",
          ],
        },
        indigo: {
          id: "indigo",
          label: "Indigo",
          labelZh: "靛蓝",
          classes: [
            "border-[#818cf8]/20",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Enter rune...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#fbbf24]/50",
          "focus:shadow-[0_0_20px_rgba(251,191,36,0.25)]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    runeGlyph: {
      id: "runeGlyph",
      name: "Rune Glyph",
      nameZh: "符文徽记",
      description: "Circular glyph badge with golden border and mystical feel",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "rounded-full",
          "bg-[#0a0920]",
          "border-2",
          "font-serif",
          "outline outline-2 outline-offset-4 outline-[#fbbf24]/20",
          "shadow-[0_0_15px_rgba(251,191,36,0.15),inset_0_0_10px_rgba(251,191,36,0.1)]",
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
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "border-[#fbbf24]/50",
            "text-[#fbbf24]",
            "shadow-[0_0_15px_rgba(251,191,36,0.2)]",
          ],
        },
        silver: {
          id: "silver",
          label: "Silver",
          labelZh: "银色",
          classes: [
            "border-[#e2e8f0]/40",
            "text-[#e2e8f0]",
            "shadow-[0_0_15px_rgba(226,232,240,0.15)]",
          ],
        },
        indigo: {
          id: "indigo",
          label: "Indigo",
          labelZh: "靛蓝",
          classes: [
            "border-[#818cf8]/40",
            "text-[#818cf8]",
            "shadow-[0_0_15px_rgba(129,140,248,0.2)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
      ],
      states: {},
    },

    summoningPanel: {
      id: "summoningPanel",
      name: "Summoning Panel",
      nameZh: "召唤面板",
      description: "Panel with concentric circle border decoration",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#0a0920]",
          "border border-[#fbbf24]/15",
          "rounded-sm",
          "overflow-hidden",
          "transition-all duration-500 ease-in-out",
          "bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.04)_0%,transparent_50%)]",
          "outline outline-1 outline-offset-4 outline-[#fbbf24]/10",
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
          classes: [
            "shadow-[0_0_20px_rgba(251,191,36,0.1)]",
          ],
        },
        golden: {
          id: "golden",
          label: "Golden",
          labelZh: "金色",
          classes: [
            "border-[#fbbf24]/30",
            "shadow-[0_0_30px_rgba(251,191,36,0.2)]",
            "bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.04)_0%,transparent_70%)]",
          ],
        },
        ethereal: {
          id: "ethereal",
          label: "Ethereal",
          labelZh: "空灵",
          classes: [
            "border-[#818cf8]/25",
            "shadow-[0_0_25px_rgba(129,140,248,0.15)]",
            "bg-[radial-gradient(circle_at_50%_50%,rgba(129,140,248,0.04)_0%,transparent_70%)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Summoning Circle", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]",
          "hover:border-[#fbbf24]/30",
        ],
      },
    },

    spellbookTab: {
      id: "spellbookTab",
      name: "Spellbook Tab",
      nameZh: "魔法书标签",
      description: "Tab button with arcane styling",
      skeleton: {
        element: "button",
        baseClasses: [
          "px-4 py-2",
          "font-serif",
          "text-sm",
          "border-b-2 border-transparent",
          "transition-all duration-300",
          "text-[#e2e8f0]/60",
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
        active: {
          id: "active",
          label: "Active",
          labelZh: "激活",
          classes: [
            "text-[#fbbf24]",
            "border-b-[#fbbf24]",
            "shadow-[0_2px_0_#fbbf24,0_4px_0_rgba(251,191,36,0.3)]",
            "[text-shadow:0_0_8px_rgba(251,191,36,0.4)]",
          ],
        },
        inactive: {
          id: "inactive",
          label: "Inactive",
          labelZh: "未激活",
          classes: [
            "text-[#e2e8f0]/40",
            "border-b-transparent",
          ],
        },
        locked: {
          id: "locked",
          label: "Locked",
          labelZh: "锁定",
          classes: [
            "text-[#e2e8f0]/20",
            "border-b-transparent",
            "cursor-not-allowed opacity-50",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Arcane", type: "text" },
      ],
      states: {
        hover: [
          "hover:text-[#fbbf24]/80",
        ],
      },
    },

    manaBar: {
      id: "manaBar",
      name: "Mana Bar",
      nameZh: "魔力条",
      description: "Magical energy bar with gradient fill and glow",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "h-5",
          "bg-[#0a0920]",
          "border border-[#fbbf24]/20",
          "rounded-sm",
          "overflow-hidden",
          "outline outline-1 outline-offset-2 outline-[#fbbf24]/15",
          "shadow-[0_0_8px_rgba(251,191,36,0.1)]",
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
        mana: {
          id: "mana",
          label: "Mana",
          labelZh: "魔力",
          classes: [
            "[&>.fill]:bg-gradient-to-r [&>.fill]:from-[#818cf8] [&>.fill]:to-[#6366f1]",
            "shadow-[0_0_10px_rgba(129,140,248,0.2)]",
          ],
        },
        health: {
          id: "health",
          label: "Health",
          labelZh: "生命",
          classes: [
            "[&>.fill]:bg-gradient-to-r [&>.fill]:from-[#ef4444] [&>.fill]:to-[#dc2626]",
            "shadow-[0_0_10px_rgba(239,68,68,0.2)]",
          ],
        },
        stamina: {
          id: "stamina",
          label: "Stamina",
          labelZh: "耐力",
          classes: [
            "[&>.fill]:bg-gradient-to-r [&>.fill]:from-[#fbbf24] [&>.fill]:to-[#f59e0b]",
            "shadow-[0_0_10px_rgba(251,191,36,0.2)]",
          ],
        },
      },
      slots: [{ id: "children", label: "Content", labelZh: "内容", required: false, type: "children" }],
      states: {},
    },

    enchantmentAlert: {
      id: "enchantmentAlert",
      name: "Enchantment Alert",
      nameZh: "附魔提示",
      description: "Alert box with mystical border and glow effects",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#0a0920]",
          "border-l-2 border-l-[#fbbf24]/30",
          "rounded-sm",
          "p-4",
          "font-serif",
          "text-sm",
          "shadow-[-6px_0_0_-2px_rgba(251,191,36,0.15)]",
          "bg-[radial-gradient(circle_at_0%_50%,rgba(251,191,36,0.04)_0%,transparent_50%)]",
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
        blessing: {
          id: "blessing",
          label: "Blessing",
          labelZh: "祝福",
          classes: [
            "border-[#fbbf24]/30",
            "text-[#fbbf24]",
            "shadow-[0_0_15px_rgba(251,191,36,0.15)]",
          ],
        },
        curse: {
          id: "curse",
          label: "Curse",
          labelZh: "诅咒",
          classes: [
            "border-[#818cf8]/30",
            "text-[#818cf8]",
            "shadow-[0_0_15px_rgba(129,140,248,0.15)]",
          ],
        },
        neutral: {
          id: "neutral",
          label: "Neutral",
          labelZh: "中性",
          classes: [
            "border-[#e2e8f0]/20",
            "text-[#e2e8f0]",
            "shadow-[0_0_10px_rgba(226,232,240,0.1)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: true, default: "Enchantment", type: "text" },
        { id: "message", label: "Message", labelZh: "消息", required: true, default: "A mystical aura surrounds you...", type: "text" },
      ],
      states: {},
    },
});
