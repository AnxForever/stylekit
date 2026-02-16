// Risograph Component Recipes
import { createStyleRecipes } from "./factory";

export const risographRecipes = createStyleRecipes("risograph", "Risograph", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Print-inspired button with bold flat colors and slight texture feel",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-mono",
          "font-bold",
          "uppercase",
          "tracking-wider",
          "rounded-sm",
          "transition-all duration-200 ease-in-out",
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
            "bg-[#ff6b9d] text-white",
            "shadow-[3px_3px_0px_#2563eb]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#2563eb] text-white",
            "shadow-[3px_3px_0px_#ff6b9d]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#ff6b9d]",
            "border-2 border-[#ff6b9d]",
            "shadow-[2px_2px_0px_#2563eb]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:translate-x-[2px] hover:translate-y-[2px]",
          "hover:shadow-[1px_1px_0px_#2563eb]",
        ],
        active: ["active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Print-aesthetic card with overprint offset shadow and grain texture feel",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#fffbf0]",
          "rounded-sm",
          "border-2 border-[#1a1a1a]",
          "shadow-[4px_4px_0px_#ff6b9d]",
          "transition-all duration-200 ease-in-out",
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
        blue: {
          id: "blue",
          label: "Blue",
          labelZh: "蓝色",
          classes: [
            "shadow-[4px_4px_0px_#2563eb]",
          ],
        },
        green: {
          id: "green",
          label: "Green",
          labelZh: "绿色",
          classes: [
            "shadow-[4px_4px_0px_#22c55e]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[6px_6px_0px_#ff6b9d]",
          "hover:border-[#ff6b9d]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Print-style input with bold borders and monospace typography",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-sm",
          "border-2 border-[#1a1a1a]",
          "bg-[#fffbf0]",
          "text-[#1a1a1a]",
          "placeholder:text-[#1a1a1a]/40",
          "font-mono",
          "focus:outline-none",
          "transition-all duration-200 ease-in-out",
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
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "border-[#ff6b9d]",
            "placeholder:text-[#ff6b9d]/40",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#2563eb]",
          "focus:shadow-[2px_2px_0px_#ff6b9d]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    overprintBadge: {
      id: "overprintBadge",
      name: "Overprint Badge",
      nameZh: "叠印徽章",
      description: "Badge with overprint/misregistration effect and riso color palette",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "font-mono font-bold uppercase tracking-wider",
          "rounded-sm",
          "relative",
          "transition-all duration-200 ease-in-out",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2 py-1 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-3 py-1.5 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-2 text-base" },
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
            "bg-[#ff6b9d] text-white",
            "shadow-[3px_3px_0px_#2563eb]",
          ],
        },
        blue: {
          id: "blue",
          label: "Blue",
          labelZh: "蓝色",
          classes: [
            "bg-[#2563eb] text-white",
            "shadow-[3px_3px_0px_#ff6b9d]",
          ],
        },
        orange: {
          id: "orange",
          label: "Orange",
          labelZh: "橙色",
          classes: [
            "bg-[#f97316] text-white",
            "shadow-[3px_3px_0px_#2563eb]",
          ],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "RISO", type: "text" },
      ],
      states: {
        hover: [
          "hover:translate-x-[2px] hover:translate-y-[2px]",
          "hover:shadow-[1px_1px_0px_#2563eb]",
        ],
      },
    },

    missprintCard: {
      id: "missprintCard",
      name: "Misprint Card",
      nameZh: "错版印刷卡片",
      description: "Card with slight misprint offset aesthetic and riso texture",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#fffbf0]",
          "rounded-sm",
          "border-2 border-[#1a1a1a]",
          "relative",
          "transition-all duration-200 ease-in-out",
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
            "shadow-[4px_4px_0px_#ff6b9d,-2px_-2px_0px_#2563eb]",
          ],
        },
        heavy: {
          id: "heavy",
          label: "Heavy",
          labelZh: "重",
          classes: [
            "shadow-[6px_6px_0px_#ff6b9d,-4px_-4px_0px_#2563eb]",
          ],
        },
        subtle: {
          id: "subtle",
          label: "Subtle",
          labelZh: "细微",
          classes: [
            "shadow-[2px_2px_0px_#ff6b9d,-1px_-1px_0px_#2563eb]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[6px_6px_0px_#ff6b9d,-3px_-3px_0px_#2563eb]",
          "hover:-translate-y-1",
        ],
      },
    },

    noiseOverlay: {
      id: "noiseOverlay",
      name: "Noise Overlay",
      nameZh: "噪点叠层",
      description: "Container with riso noise/grain texture overlay",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#fffbf0]",
          "rounded-sm",
          "border border-[#1a1a1a]/20",
          "relative",
          "p-4 md:p-6",
          "transition-all duration-200 ease-in-out",
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
            "bg-[url('data:image/svg+xml,%3Csvg+viewBox%3D%220+0+256+256%22+xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter+id%3D%22n%22%3E%3CfeTurbulence+baseFrequency%3D%220.7%22%2F%3E%3C%2Ffilter%3E%3Crect+width%3D%22100%25%22+height%3D%22100%25%22+filter%3D%22url%28%23n%29%22+opacity%3D%220.05%22%2F%3E%3C%2Fsvg%3E')]",
          ],
        },
        dense: {
          id: "dense",
          label: "Dense",
          labelZh: "密集",
          classes: [
            "bg-[url('data:image/svg+xml,%3Csvg+viewBox%3D%220+0+256+256%22+xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter+id%3D%22n%22%3E%3CfeTurbulence+baseFrequency%3D%220.9%22%2F%3E%3C%2Ffilter%3E%3Crect+width%3D%22100%25%22+height%3D%22100%25%22+filter%3D%22url%28%23n%29%22+opacity%3D%220.08%22%2F%3E%3C%2Fsvg%3E')]",
          ],
        },
        sparse: {
          id: "sparse",
          label: "Sparse",
          labelZh: "稀疏",
          classes: [
            "bg-[url('data:image/svg+xml,%3Csvg+viewBox%3D%220+0+256+256%22+xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter+id%3D%22n%22%3E%3CfeTurbulence+baseFrequency%3D%220.5%22%2F%3E%3C%2Ffilter%3E%3Crect+width%3D%22100%25%22+height%3D%22100%25%22+filter%3D%22url%28%23n%29%22+opacity%3D%220.03%22%2F%3E%3C%2Fsvg%3E')]",
          ],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Content with grain texture", type: "children" },
      ],
      states: {},
    },
});
