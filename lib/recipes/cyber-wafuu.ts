// Cyber Wafuu Component Recipes
import { createStyleRecipes } from "./factory";

export const cyberWafuuRecipes = createStyleRecipes("cyber-wafuu", "Cyber Wafuu", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Seigaiha-patterned button with circuit trace glow and shoji-grid geometry",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-sans",
          "font-semibold",
          "tracking-wider",
          "border border-[#1e3a5f]/60",
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
            "bg-[#1e3a5f] text-[#e2e8f0]",
            "shadow-[0_0_12px_rgba(30,58,95,0.4)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#080814] text-[#38bdf8]",
            "border-[#38bdf8]/40",
            "shadow-[0_0_10px_rgba(56,189,248,0.2)]",
          ],
        },
        vermillion: {
          id: "vermillion",
          label: "Vermillion",
          labelZh: "朱红",
          classes: [
            "bg-[#c41e3a] text-white",
            "border-[#c41e3a]/60",
            "shadow-[0_0_12px_rgba(196,30,58,0.4)]",
          ],
        },
        kintsugi: {
          id: "kintsugi",
          label: "Kintsugi Gold",
          labelZh: "金继",
          classes: [
            "bg-[#080814] text-[#c9a227]",
            "border-[#c9a227]/40",
            "shadow-[0_0_10px_rgba(201,162,39,0.25)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Execute", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]",
          "hover:border-[#38bdf8]/60",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Shoji screen grid frame card with kintsugi gold crack accents and circuit overlays",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#080814]",
          "border border-[#1e3a5f]/30",
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
          id: "shojiGrid",
          label: "Shoji Grid Overlay",
          labelZh: "障子格栅",
          type: "boolean",
          default: false,
          trueClasses: "before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(to_right,rgba(30,58,95,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,58,95,0.1)_1px,transparent_1px)] before:bg-[size:33.33%_50%] before:pointer-events-none",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        indigo: {
          id: "indigo",
          label: "Indigo",
          labelZh: "靛蓝",
          classes: [
            "shadow-[0_0_15px_rgba(30,58,95,0.3)]",
          ],
        },
        vermillion: {
          id: "vermillion",
          label: "Vermillion",
          labelZh: "朱红",
          classes: [
            "border-[#c41e3a]/30",
            "shadow-[0_0_15px_rgba(196,30,58,0.2)]",
          ],
        },
        kintsugi: {
          id: "kintsugi",
          label: "Kintsugi Gold",
          labelZh: "金继",
          classes: [
            "border-[#c9a227]/20",
            "shadow-[0_0_12px_rgba(201,162,39,0.15)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]",
          "hover:border-[#38bdf8]/40",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Wave-pattern underline input with circuit trace focus glow",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "border border-[#1e3a5f]/30",
          "bg-[#080814]",
          "text-[#e2e8f0]",
          "placeholder:text-[#e2e8f0]/20",
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
        electric: {
          id: "electric",
          label: "Electric",
          labelZh: "电蓝",
          classes: [
            "border-[#38bdf8]/30",
          ],
        },
        vermillion: {
          id: "vermillion",
          label: "Vermillion",
          labelZh: "朱红",
          classes: [
            "border-[#c41e3a]/20",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Input...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#38bdf8]/60",
          "focus:shadow-[0_0_12px_rgba(56,189,248,0.3)]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    shojiScreen: {
      id: "shojiScreen",
      name: "Shoji Screen",
      nameZh: "障子屏风",
      description: "Panel styled like a shoji sliding door with circuit pattern overlay",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#080814]/95",
          "border border-[#1e3a5f]/30",
          "before:content-['']",
          "before:absolute",
          "before:inset-0",
          "before:bg-[linear-gradient(to_right,rgba(30,58,95,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,58,95,0.08)_1px,transparent_1px)]",
          "before:bg-[size:25%_33.33%]",
          "before:pointer-events-none",
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
            "shadow-[0_0_10px_rgba(30,58,95,0.2)]",
          ],
        },
        illuminated: {
          id: "illuminated",
          label: "Illuminated",
          labelZh: "照明",
          classes: [
            "bg-[#0c0c1a]/90",
            "border-[#38bdf8]/20",
            "shadow-[0_0_15px_rgba(56,189,248,0.2)]",
          ],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "暗色",
          classes: [
            "bg-[#040408]",
            "border-[#1e3a5f]/15",
            "shadow-[0_0_8px_rgba(30,58,95,0.1)]",
          ],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Screen content", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]",
          "hover:border-[#38bdf8]/30",
        ],
      },
    },

    seigaihaBanner: {
      id: "seigaihaBanner",
      name: "Seigaiha Banner",
      nameZh: "青海波横幅",
      description: "Banner with seigaiha wave pattern border accents",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#080814]",
          "border-t-2 border-b-2",
          "py-4 px-6",
          "text-center",
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
            "border-[#1e3a5f]/40",
            "text-[#e2e8f0]",
            "shadow-[0_0_10px_rgba(30,58,95,0.2)]",
          ],
        },
        golden: {
          id: "golden",
          label: "Golden",
          labelZh: "金色",
          classes: [
            "border-[#c9a227]/40",
            "text-[#c9a227]",
            "shadow-[0_0_10px_rgba(201,162,39,0.2)]",
          ],
        },
        cyan: {
          id: "cyan",
          label: "Cyan",
          labelZh: "青色",
          classes: [
            "border-[#38bdf8]/40",
            "text-[#38bdf8]",
            "shadow-[0_0_10px_rgba(56,189,248,0.2)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: true, default: "Banner Title", type: "text" },
        { id: "subtitle", label: "Subtitle", labelZh: "副标题", required: false, default: "Subtitle text", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_18px_rgba(56,189,248,0.3)]",
        ],
      },
    },

    origamiCard: {
      id: "origamiCard",
      name: "Origami Card",
      nameZh: "折纸卡片",
      description: "Card with folded paper aesthetic and digital circuit accents",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#080814]",
          "border border-[#1e3a5f]/25",
          "before:content-['']",
          "before:absolute",
          "before:top-0",
          "before:right-0",
          "before:w-0",
          "before:h-0",
          "before:border-t-[20px]",
          "before:border-t-[#1e3a5f]/20",
          "before:border-l-[20px]",
          "before:border-l-transparent",
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
            "shadow-[0_0_10px_rgba(30,58,95,0.15)]",
          ],
        },
        crane: {
          id: "crane",
          label: "Crane",
          labelZh: "鹤",
          classes: [
            "border-[#c9a227]/20",
            "before:border-t-[#c9a227]/20",
            "shadow-[0_0_12px_rgba(201,162,39,0.15)]",
          ],
        },
        lotus: {
          id: "lotus",
          label: "Lotus",
          labelZh: "莲",
          classes: [
            "border-[#c41e3a]/20",
            "before:border-t-[#c41e3a]/20",
            "shadow-[0_0_12px_rgba(196,30,58,0.15)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Origami", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]",
          "hover:border-[#38bdf8]/30",
        ],
      },
    },

    toriiDivider: {
      id: "toriiDivider",
      name: "Torii Divider",
      nameZh: "鸟居分割线",
      description: "Horizontal divider styled like a torii gate silhouette",
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
          "before:-top-2",
          "before:w-12",
          "before:h-1",
          "before:rounded-full",
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
            "bg-[#1e3a5f]/30",
            "before:bg-[#1e3a5f]/50",
            "shadow-[0_0_6px_rgba(30,58,95,0.2)]",
          ],
        },
        golden: {
          id: "golden",
          label: "Golden",
          labelZh: "金色",
          classes: [
            "bg-[#c9a227]/30",
            "before:bg-[#c9a227]/50",
            "shadow-[0_0_6px_rgba(201,162,39,0.2)]",
          ],
        },
        neon: {
          id: "neon",
          label: "Neon",
          labelZh: "霓虹",
          classes: [
            "bg-[#38bdf8]/30",
            "before:bg-[#38bdf8]/50",
            "shadow-[0_0_8px_rgba(56,189,248,0.3)]",
          ],
        },
      },
      slots: [{ id: "children", label: "Content", labelZh: "内容", required: false, type: "children" }],
      states: {
        hover: [
          "hover:shadow-[0_0_12px_rgba(56,189,248,0.4)]",
        ],
      },
    },

    furoshikiWrap: {
      id: "furoshikiWrap",
      name: "Furoshiki Wrap",
      nameZh: "风吕敷容器",
      description: "Container with wrapping cloth aesthetic and tied corner accents",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#080814]",
          "border border-[#1e3a5f]/20",
          "rounded-sm",
          "before:content-['']",
          "before:absolute",
          "before:-top-1",
          "before:-right-1",
          "before:w-3",
          "before:h-3",
          "before:rounded-full",
          "after:content-['']",
          "after:absolute",
          "after:-bottom-1",
          "after:-left-1",
          "after:w-3",
          "after:h-3",
          "after:rounded-full",
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
            "before:bg-[#1e3a5f]/40",
            "after:bg-[#1e3a5f]/40",
            "shadow-[0_0_10px_rgba(30,58,95,0.15)]",
          ],
        },
        silk: {
          id: "silk",
          label: "Silk",
          labelZh: "丝绸",
          classes: [
            "border-[#c9a227]/15",
            "before:bg-[#c9a227]/40",
            "after:bg-[#c9a227]/40",
            "shadow-[0_0_10px_rgba(201,162,39,0.15)]",
          ],
        },
        digital: {
          id: "digital",
          label: "Digital",
          labelZh: "数字",
          classes: [
            "border-[#38bdf8]/15",
            "before:bg-[#38bdf8]/40",
            "after:bg-[#38bdf8]/40",
            "shadow-[0_0_10px_rgba(56,189,248,0.2)]",
          ],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Wrapped content", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_18px_rgba(56,189,248,0.3)]",
          "hover:border-[#38bdf8]/25",
        ],
      },
    },
});
