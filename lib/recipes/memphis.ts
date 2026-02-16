// Memphis Component Recipes
import { createStyleRecipes } from "./factory";

export const memphisRecipes = createStyleRecipes("memphis", "Memphis", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Bold Memphis button with thick border, hard shadow, and bright colors",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-black",
          "uppercase",
          "border-4 border-black",
          "transition-all duration-150",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-6 py-3 md:px-8 md:py-4 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-8 py-4 md:px-10 md:py-5 text-base md:text-lg" },
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
            "bg-yellow-400 text-black",
            "shadow-[6px_6px_0px_#000]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#ff6b6b] text-white",
            "shadow-[6px_6px_0px_#000]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-white text-black",
            "shadow-[6px_6px_0px_#48dbfb]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[3px_3px_0px_#000]",
          "hover:translate-x-[3px] hover:translate-y-[3px]",
        ],
        active: ["active:shadow-none active:translate-x-[6px] active:translate-y-[6px]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Colorful Memphis card with thick border and hard offset shadow",
      skeleton: {
        element: "div",
        baseClasses: [
          "border-4 border-black",
          "relative",
          "transition-all duration-200",
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
          classes: [
            "bg-pink-300",
            "shadow-[8px_8px_0px_#000]",
          ],
        },
        yellow: {
          id: "yellow",
          label: "Yellow",
          labelZh: "黄色",
          classes: [
            "bg-yellow-300",
            "shadow-[8px_8px_0px_#000]",
          ],
        },
        cyan: {
          id: "cyan",
          label: "Cyan",
          labelZh: "青色",
          classes: [
            "bg-[#48dbfb]",
            "shadow-[8px_8px_0px_#000]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[10px_10px_0px_#000]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Memphis-style input with thick border and colored offset shadow",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white",
          "border-4 border-black",
          "text-black",
          "font-bold",
          "placeholder:text-gray-400",
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
          classes: [
            "shadow-[4px_4px_0px_#48dbfb]",
          ],
        },
        red: {
          id: "red",
          label: "Red Shadow",
          labelZh: "红色阴影",
          classes: [
            "shadow-[4px_4px_0px_#ff6b6b]",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:shadow-[4px_4px_0px_#ff6b6b]",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-gray-100"],
      },
    },

    squiggleDivider: {
      id: "squiggleDivider",
      name: "Squiggle Divider",
      nameZh: "波浪分隔线",
      description: "Divider with Memphis-style squiggly line pattern",
      skeleton: {
        element: "div",
        baseClasses: [
          "w-full",
          "h-3",
          "bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2212%22%3E%3Cpath%20d%3D%22M0%206c5%200%205-6%2010-6s5%206%2010%206%205-6%2010-6%205%206%2010%206%22%20fill%3D%22none%22%20stroke%3D%22%23000%22%20stroke-width%3D%223%22%2F%3E%3C%2Fsvg%3E')]",
          "bg-repeat-x bg-center",
          "my-4 md:my-6",
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
          classes: [],
        },
        colorful: {
          id: "colorful",
          label: "Colorful",
          labelZh: "彩色",
          classes: [
            "bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2212%22%3E%3Cpath%20d%3D%22M0%206c5%200%205-6%2010-6s5%206%2010%206%205-6%2010-6%205%206%2010%206%22%20fill%3D%22none%22%20stroke%3D%22%23ff6b6b%22%20stroke-width%3D%223%22%2F%3E%3C%2Fsvg%3E')]",
            "shadow-[0_4px_0px_#48dbfb]",
          ],
        },
        bold: {
          id: "bold",
          label: "Bold",
          labelZh: "粗体",
          classes: [
            "h-4",
            "bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2212%22%3E%3Cpath%20d%3D%22M0%206c5%200%205-6%2010-6s5%206%2010%206%205-6%2010-6%205%206%2010%206%22%20fill%3D%22none%22%20stroke%3D%22%23000%22%20stroke-width%3D%225%22%2F%3E%3C%2Fsvg%3E')]",
            "shadow-[0_4px_0px_#ffd700]",
          ],
        },
      },
      slots: [{ id: "children", label: "Content", labelZh: "内容", required: false, type: "children" }],
      states: {},
    },

    shapeCard: {
      id: "shapeCard",
      name: "Shape Card",
      nameZh: "几何卡片",
      description: "Card decorated with random Memphis geometric shapes",
      skeleton: {
        element: "div",
        baseClasses: [
          "border-4 border-black",
          "relative",
          "overflow-visible",
          "transition-all duration-200",
          "before:content-[''] before:absolute before:top-[-12px] before:right-[-12px] before:w-10 before:h-10 before:bg-[#48dbfb] before:rounded-full before:border-4 before:border-black before:z-10",
          "after:content-[''] after:absolute after:bottom-[-8px] after:left-4 after:w-0 after:h-0 after:border-l-[16px] after:border-l-transparent after:border-r-[16px] after:border-r-transparent after:border-t-[20px] after:border-t-[#ff6b6b] after:z-10",
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
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "bg-white",
            "shadow-[8px_8px_0px_#000]",
          ],
        },
        pastel: {
          id: "pastel",
          label: "Pastel",
          labelZh: "柔和",
          classes: [
            "bg-pink-100",
            "shadow-[8px_8px_0px_#48dbfb]",
            "before:bg-pink-300",
            "after:border-t-yellow-400",
          ],
        },
        bold: {
          id: "bold",
          label: "Bold",
          labelZh: "大胆",
          classes: [
            "bg-yellow-300",
            "shadow-[8px_8px_0px_#ff6b6b]",
            "before:bg-[#ff6b6b]",
            "after:border-t-[#48dbfb]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Shape Card", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[10px_10px_0px_#000]",
          "hover:-translate-y-1",
        ],
      },
    },

    patternBadge: {
      id: "patternBadge",
      name: "Pattern Badge",
      nameZh: "图案徽章",
      description: "Badge with Memphis pattern background",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "font-black",
          "uppercase",
          "border-4 border-black",
          "transition-all duration-150",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-1.5 text-xs md:text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-2 text-sm md:text-base" },
          ],
          default: "md",
        },
      ],
      variants: {
        dots: {
          id: "dots",
          label: "Dots",
          labelZh: "圆点",
          classes: [
            "bg-[radial-gradient(circle,#000_1.5px,transparent_1.5px)] bg-[size:8px_8px] bg-yellow-400 text-black",
            "shadow-[4px_4px_0px_#000]",
          ],
        },
        stripes: {
          id: "stripes",
          label: "Stripes",
          labelZh: "条纹",
          classes: [
            "bg-[repeating-linear-gradient(45deg,#ff6b6b,#ff6b6b_4px,#ff8e8e_4px,#ff8e8e_8px)] text-white",
            "shadow-[4px_4px_0px_#000]",
          ],
        },
        zigzag: {
          id: "zigzag",
          label: "Zigzag",
          labelZh: "锯齿",
          classes: [
            "bg-[repeating-linear-gradient(135deg,#48dbfb,#48dbfb_5px,#7ae7ff_5px,#7ae7ff_10px)] text-black",
            "shadow-[4px_4px_0px_#000]",
          ],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Badge", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[2px_2px_0px_#000]",
          "hover:translate-x-[2px] hover:translate-y-[2px]",
        ],
      },
    },
});
