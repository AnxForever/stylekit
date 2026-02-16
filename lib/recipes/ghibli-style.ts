// Ghibli Style Component Recipes
import { createStyleRecipes } from "./factory";

export const ghibliStyleRecipes = createStyleRecipes("ghibli-style", "Ghibli Style", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Soft rounded button with warm tones and gentle shadow inspired by Studio Ghibli",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "rounded-2xl",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base" },
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
            "bg-[#8B7355] text-white",
            "shadow-[0_4px_12px_rgba(139,115,85,0.3)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#B8860B] text-white",
            "shadow-[0_4px_12px_rgba(184,134,11,0.3)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#8B7355]",
            "border-2 border-[#8B7355]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_6px_20px_rgba(139,115,85,0.4)]",
          "hover:brightness-110",
        ],
        active: ["active:scale-[0.97]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Hand-drawn feel card with extra-rounded corners, soft shadow and warm background",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#faf5eb]",
          "rounded-3xl",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4 md:p-5" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5 md:p-7" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-7 md:p-10" },
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
            "shadow-[0_4px_20px_rgba(139,115,85,0.15)]",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#f0e6d3]",
            "shadow-[0_4px_20px_rgba(184,134,11,0.15)]",
          ],
        },
        bordered: {
          id: "bordered",
          label: "Bordered",
          labelZh: "边框",
          classes: [
            "border-2 border-[#8B7355]/30",
            "shadow-[0_4px_20px_rgba(139,115,85,0.1)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_8px_30px_rgba(139,115,85,0.25)]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Rounded input with natural warm colors and soft focus glow",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-xl",
          "border-2 border-[#8B7355]/30",
          "bg-[#faf5eb]",
          "text-[#5a4a3a]",
          "placeholder:text-[#8B7355]/40",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2.5 md:px-5 md:py-3 text-sm md:text-base" },
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
        filled: {
          id: "filled",
          label: "Filled",
          labelZh: "填充",
          classes: ["bg-[#f0e6d3]"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#8B7355]",
          "focus:shadow-[0_0_12px_rgba(139,115,85,0.2)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-gray-100"],
      },
    },

    forestPanel: {
      id: "forestPanel",
      name: "Forest Panel",
      nameZh: "森林面板",
      description: "Panel with Ghibli forest/nature aesthetic and warm earthy tones",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#faf5eb]",
          "rounded-[40%_60%_55%_45%/50%_45%_55%_50%]",
          "border-2 border-[#8B7355]/15",
          "bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,rgba(139,115,85,0.03)_20px,rgba(139,115,85,0.03)_21px)]",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4 md:p-5" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5 md:p-7" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-7 md:p-10" },
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
            "bg-[linear-gradient(180deg,#c8e6c9_0%,#e8f5e9_35%,#faf5eb_100%)]",
            "shadow-[0_8px_32px_rgba(139,115,85,0.12),inset_0_-20px_40px_rgba(139,115,85,0.04)]",
          ],
        },
        enchanted: {
          id: "enchanted",
          label: "Enchanted",
          labelZh: "魔法",
          classes: [
            "bg-[linear-gradient(180deg,#b2dfdb_0%,#e0f2f1_40%,#f1f8e9_100%)]",
            "border-[#4caf50]/20",
            "shadow-[0_8px_32px_rgba(76,175,80,0.15),inset_0_0_60px_rgba(76,175,80,0.05)]",
          ],
        },
        autumn: {
          id: "autumn",
          label: "Autumn",
          labelZh: "秋日",
          classes: [
            "bg-[linear-gradient(180deg,#ffe0b2_0%,#fff3e0_40%,#faf5eb_100%)]",
            "border-[#B8860B]/20",
            "shadow-[0_8px_32px_rgba(184,134,11,0.12),inset_0_-20px_40px_rgba(184,134,11,0.04)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Forest Panel", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Panel content", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_8px_30px_rgba(139,115,85,0.2)]",
        ],
      },
    },

    sootSpriteBadge: {
      id: "sootSpriteBadge",
      name: "Soot Sprite Badge",
      nameZh: "煤球徽章",
      description: "Cute round badge inspired by Ghibli soot sprites",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "rounded-[45%_55%_50%_50%/55%_45%_50%_50%]",
          "border-2 border-dashed border-current/20",
          "shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.1),2px_2px_0_rgba(139,115,85,0.15)]",
          "outline outline-2 outline-offset-2 outline-current/10",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "w-8 h-8 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "w-10 h-10 md:w-12 md:h-12 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "w-12 h-12 md:w-16 md:h-16 text-base" },
          ],
          default: "md",
        },
      ],
      variants: {
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: [
            "bg-[#3a3a3a] text-white",
            "shadow-[0_2px_8px_rgba(0,0,0,0.2)]",
          ],
        },
        dusty: {
          id: "dusty",
          label: "Dusty",
          labelZh: "灰尘",
          classes: [
            "bg-[#8B7355] text-[#faf5eb]",
            "shadow-[0_2px_8px_rgba(139,115,85,0.3)]",
          ],
        },
        sparkle: {
          id: "sparkle",
          label: "Sparkle",
          labelZh: "闪亮",
          classes: [
            "bg-[#B8860B] text-white",
            "shadow-[0_2px_12px_rgba(184,134,11,0.4)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
      ],
      states: {
        hover: [
          "hover:scale-110",
          "hover:shadow-[0_4px_16px_rgba(139,115,85,0.3)]",
        ],
      },
    },

    windAlert: {
      id: "windAlert",
      name: "Wind Alert",
      nameZh: "风之提示",
      description: "Alert with gentle wind/breeze aesthetic inspired by Ghibli",
      skeleton: {
        element: "div",
        baseClasses: [
          "rounded-[4px_20px_4px_20px]",
          "border-l-[3px] border-dashed border-[#8B7355]/25",
          "p-4 md:p-5",
          "transition-all duration-300",
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
        info: {
          id: "info",
          label: "Info",
          labelZh: "信息",
          classes: [
            "bg-[linear-gradient(90deg,#e0f2f1_0%,rgba(224,242,241,0.3)_100%)]",
            "border-[#4caf50]/40",
            "text-[#2e7d32]",
          ],
        },
        gentle: {
          id: "gentle",
          label: "Gentle",
          labelZh: "温和",
          classes: [
            "bg-[linear-gradient(90deg,#faf5eb_0%,rgba(250,245,235,0.3)_100%)]",
            "border-[#8B7355]/30",
            "text-[#5a4a3a]",
          ],
        },
        storm: {
          id: "storm",
          label: "Storm",
          labelZh: "暴风",
          classes: [
            "bg-[linear-gradient(90deg,#eceff1_0%,rgba(236,239,241,0.3)_100%)]",
            "border-[#607d8b]/40",
            "text-[#37474f]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Notice", type: "text" },
        { id: "message", label: "Message", labelZh: "消息", required: true, default: "A gentle breeze carries this message.", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_4px_16px_rgba(139,115,85,0.15)]",
        ],
      },
    },
});
