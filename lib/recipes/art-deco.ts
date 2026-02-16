// Art Deco Component Recipes
import { createStyleRecipes } from "./factory";

export const artDecoRecipes = createStyleRecipes("art-deco", "Art Deco", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Elegant Art Deco button with gold accents, serif font, and wide tracking",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "font-semibold",
          "uppercase",
          "tracking-[0.3em]",
          "border border-[#D4AF37]",
          "transition-all duration-300",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-5 py-2 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-8 py-3 md:px-10 md:py-4 text-xs md:text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-10 py-4 md:px-12 md:py-5 text-sm md:text-base" },
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
            "bg-transparent text-[#D4AF37]",
            "border-2 border-[#D4AF37]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#D4AF37] text-gray-900",
            "shadow-[0_0_20px_rgba(212,175,55,0.3)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#D4AF37]/70",
            "border border-[#D4AF37]/50",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-[#D4AF37] hover:text-gray-900",
          "hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]",
        ],
        active: ["active:bg-[#c9a227]"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Dark elegant card with gold border accents and serif typography",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-gray-900",
          "border border-[#D4AF37]/50",
          "relative",
          "transition-all duration-300",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4 md:p-6" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-6 md:p-8" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-8 md:p-12" },
          ],
          default: "md",
        },
        {
          id: "interactive",
          label: "Interactive",
          labelZh: "可交互",
          type: "boolean",
          default: false,
          trueClasses: "cursor-pointer",
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
          label: "Gold Border",
          labelZh: "金色边框",
          classes: [
            "border-2 border-[#D4AF37]",
          ],
        },
        gradient: {
          id: "gradient",
          label: "Gradient",
          labelZh: "渐变",
          classes: [
            "bg-gradient-to-b from-gray-900 to-gray-800",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:border-[#D4AF37]",
          "hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Dark Art Deco input with gold border and serif placeholder",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-gray-900",
          "border border-[#D4AF37]/50",
          "text-[#f5f5dc]",
          "font-serif",
          "tracking-wider",
          "placeholder:text-[#D4AF37]/40",
          "focus:outline-none",
          "transition-all duration-300",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-3 md:px-6 md:py-4 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-4 md:px-7 md:py-5 text-base md:text-lg" },
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
          label: "Gold Border",
          labelZh: "金色边框",
          classes: ["border-[#D4AF37]"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#D4AF37]",
          "focus:shadow-[0_0_15px_rgba(212,175,55,0.2)]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    ornateFrame: {
      id: "ornateFrame",
      name: "Ornate Frame",
      nameZh: "装饰框架",
      description: "Frame with Art Deco geometric border pattern and gold accents",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-gray-900",
          "border-2 border-[#D4AF37]",
          "relative",
          "font-serif",
          "transition-all duration-300",
          "overflow-hidden",
          "bg-[repeating-linear-gradient(135deg,transparent,transparent_8px,rgba(212,175,55,0.15)_8px,rgba(212,175,55,0.15)_9px)]",
          "before:content-[''] before:absolute before:top-2 before:left-2 before:w-6 before:h-6 before:border-t-2 before:border-l-2 before:border-[#D4AF37]",
          "after:content-[''] after:absolute after:bottom-2 after:right-2 after:w-6 after:h-6 after:border-b-2 after:border-r-2 after:border-[#D4AF37]",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4 md:p-6" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-6 md:p-8" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-8 md:p-12" },
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
            "border-[#D4AF37]",
            "shadow-[inset_0_0_0_4px_rgba(212,175,55,0.15),0_0_20px_rgba(212,175,55,0.1)]",
          ],
        },
        silver: {
          id: "silver",
          label: "Silver",
          labelZh: "银色",
          classes: [
            "border-[#C0C0C0]",
            "shadow-[inset_0_0_0_4px_rgba(192,192,192,0.15),0_0_20px_rgba(192,192,192,0.1)]",
          ],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: [
            "bg-black border-[#D4AF37]/60",
            "shadow-[inset_0_0_0_4px_rgba(212,175,55,0.1)]",
          ],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Framed content", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[inset_0_0_0_4px_rgba(212,175,55,0.25),0_0_30px_rgba(212,175,55,0.2)]",
        ],
      },
    },

    decoSeparator: {
      id: "decoSeparator",
      name: "Deco Separator",
      nameZh: "装饰分隔线",
      description: "Decorative separator with Art Deco fan/sunburst motif",
      skeleton: {
        element: "div",
        baseClasses: [
          "w-full",
          "h-8",
          "bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent",
          "relative",
          "my-4 md:my-6",
          "flex items-center justify-center",
          "overflow-hidden",
          "before:content-[''] before:absolute before:w-8 before:h-8 before:bg-[conic-gradient(from_0deg,transparent_0deg,#D4AF37_10deg,transparent_20deg,transparent_40deg,#D4AF37_50deg,transparent_60deg,transparent_80deg,#D4AF37_90deg,transparent_100deg,transparent_120deg,#D4AF37_130deg,transparent_140deg,transparent_160deg,#D4AF37_170deg,transparent_180deg,transparent_200deg,#D4AF37_210deg,transparent_220deg,transparent_240deg,#D4AF37_250deg,transparent_260deg,transparent_280deg,#D4AF37_290deg,transparent_300deg,transparent_320deg,#D4AF37_330deg,transparent_340deg,transparent_360deg)] before:rounded-full before:opacity-60",
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
            "h-8",
          ],
        },
        wide: {
          id: "wide",
          label: "Wide",
          labelZh: "宽",
          classes: [
            "h-10 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent",
            "before:w-10 before:h-10 before:opacity-80",
          ],
        },
        narrow: {
          id: "narrow",
          label: "Narrow",
          labelZh: "窄",
          classes: [
            "h-6 max-w-xs mx-auto",
            "before:w-5 before:h-5",
          ],
        },
      },
      slots: [{ id: "children", label: "Content", labelZh: "内容", required: false, type: "children" }],
      states: {},
    },

    goldAccentBadge: {
      id: "goldAccentBadge",
      name: "Gold Accent Badge",
      nameZh: "金色徽章",
      description: "Badge with gold accent and geometric Art Deco shape",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "font-serif",
          "uppercase",
          "tracking-[0.2em]",
          "border border-[#D4AF37]",
          "bg-gray-900",
          "text-[#D4AF37]",
          "transition-all duration-300",
          "[clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]",
          "bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(212,175,55,0.1)_3px,rgba(212,175,55,0.1)_4px)]",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-5 py-2 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-6 py-3 text-xs md:text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-8 py-4 text-sm md:text-base" },
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
            "border-[#D4AF37] text-[#D4AF37]",
            "shadow-[0_0_10px_rgba(212,175,55,0.2)]",
          ],
        },
        silver: {
          id: "silver",
          label: "Silver",
          labelZh: "银色",
          classes: [
            "border-[#C0C0C0] text-[#C0C0C0]",
            "shadow-[0_0_10px_rgba(192,192,192,0.2)]",
          ],
        },
        bronze: {
          id: "bronze",
          label: "Bronze",
          labelZh: "铜色",
          classes: [
            "border-[#CD7F32] text-[#CD7F32]",
            "shadow-[0_0_10px_rgba(205,127,50,0.2)]",
          ],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Badge", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]",
        ],
      },
    },
});
