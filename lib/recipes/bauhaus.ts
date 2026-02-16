// Bauhaus Component Recipes
import { createStyleRecipes } from "./factory";

export const bauhausRecipes = createStyleRecipes("bauhaus", "Bauhaus", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Geometric button with primary colors, sharp edges and sans-serif typography",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-sans",
          "font-bold",
          "uppercase",
          "tracking-widest",
          "border-2 border-black",
          "rounded-none",
          "transition-opacity duration-200",
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
            "bg-[#dd0000] text-white",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-black text-white",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-black",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: ["hover:opacity-80"],
        active: ["active:opacity-70"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Geometric card with strict primary color accents and no shadows",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "border-2 border-black",
          "rounded-none",
          "transition-opacity duration-200",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-3 md:p-4" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-4 md:p-6" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-6 md:p-8" },
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
          classes: [],
        },
        red: {
          id: "red",
          label: "Red Accent",
          labelZh: "红色强调",
          classes: [
            "border-l-8 border-l-[#dd0000]",
          ],
        },
        blue: {
          id: "blue",
          label: "Blue Accent",
          labelZh: "蓝色强调",
          classes: [
            "border-l-8 border-l-[#0057b8]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: ["hover:opacity-90"],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Geometric input with sharp edges and functional Bauhaus aesthetics",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "border-2 border-black",
          "rounded-none",
          "bg-white",
          "font-sans",
          "text-black",
          "placeholder:text-gray-500",
          "focus:outline-none",
          "transition-all duration-200",
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
        filled: {
          id: "filled",
          label: "Filled",
          labelZh: "填充",
          classes: ["bg-[#ffd700]/10"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#0057b8]",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-gray-100"],
      },
    },

    geometricDecorator: {
      id: "geometricDecorator",
      name: "Geometric Decorator",
      nameZh: "几何装饰",
      description: "Decorative element with primary color geometric shapes following Bauhaus principles",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "border-2 border-black",
          "transition-opacity duration-200",
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
        circle: {
          id: "circle",
          label: "Circle",
          labelZh: "圆形",
          classes: [
            "w-16 h-16 md:w-20 md:h-20 rounded-full",
            "bg-[#dd0000]",
          ],
        },
        triangle: {
          id: "triangle",
          label: "Triangle",
          labelZh: "三角形",
          classes: [
            "w-0 h-0",
            "border-l-[32px] border-l-transparent",
            "border-r-[32px] border-r-transparent",
            "border-b-[56px] border-b-[#ffd700]",
            "border-t-0 border-black/0",
          ],
        },
        square: {
          id: "square",
          label: "Square",
          labelZh: "方形",
          classes: [
            "w-16 h-16 md:w-20 md:h-20 rounded-none",
            "bg-[#0057b8]",
          ],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: false, default: "", type: "children" },
      ],
      states: {
        hover: ["hover:opacity-80"],
      },
    },

    gridModule: {
      id: "gridModule",
      name: "Grid Module",
      nameZh: "网格模块",
      description: "Grid-based content module following Bauhaus grid principles",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "border-2 border-black",
          "rounded-none",
          "font-sans",
          "transition-opacity duration-200",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-3 md:p-4" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-4 md:p-6" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-6 md:p-8" },
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
        compact: {
          id: "compact",
          label: "Compact",
          labelZh: "紧凑",
          classes: [
            "border-l-8 border-l-[#dd0000]",
          ],
        },
        wide: {
          id: "wide",
          label: "Wide",
          labelZh: "宽",
          classes: [
            "border-t-8 border-t-[#0057b8]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Module Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Module content", type: "children" },
      ],
      states: {
        hover: ["hover:opacity-90"],
      },
    },

    functionBadge: {
      id: "functionBadge",
      name: "Function Badge",
      nameZh: "功能徽章",
      description: "Minimal badge following Bauhaus 'form follows function' principle",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "font-sans",
          "font-bold",
          "uppercase",
          "tracking-widest",
          "border-2 border-black",
          "rounded-none",
          "transition-opacity duration-200",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2 py-0.5 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-3 py-1 text-xs md:text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-1.5 text-sm md:text-base" },
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
            "bg-[#dd0000] text-white",
          ],
        },
        blue: {
          id: "blue",
          label: "Blue",
          labelZh: "蓝色",
          classes: [
            "bg-[#0057b8] text-white",
          ],
        },
        yellow: {
          id: "yellow",
          label: "Yellow",
          labelZh: "黄色",
          classes: [
            "bg-[#ffd700] text-black",
          ],
        },
        black: {
          id: "black",
          label: "Black",
          labelZh: "黑色",
          classes: [
            "bg-black text-white",
          ],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Badge", type: "text" },
      ],
      states: {
        hover: ["hover:opacity-80"],
      },
    },
});
