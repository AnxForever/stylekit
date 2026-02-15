// Acid Graphics Component Recipes
import type { StyleRecipes } from "./types";

export const acidGraphicsRecipes: StyleRecipes = {
  styleSlug: "acid-graphics",
  styleName: "Acid Graphics",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Fluorescent button with hard offset shadow and terminal-style mono type",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-mono",
          "font-bold",
          "uppercase",
          "tracking-widest",
          "rounded-none",
          "transition-all duration-150 ease-out",
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
          label: "Neon Green",
          labelZh: "荧光绿",
          classes: [
            "bg-[#39ff14] text-[#0a0a0a]",
            "border-2 border-[#39ff14]",
            "shadow-[4px_4px_0px_#a020f0]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Electric Purple",
          labelZh: "电紫",
          classes: [
            "bg-[#a020f0] text-[#39ff14]",
            "border-2 border-[#a020f0]",
            "shadow-[4px_4px_0px_#e6ff00]",
          ],
        },
        pink: {
          id: "pink",
          label: "Cyber Pink",
          labelZh: "赛博粉",
          classes: [
            "bg-[#ff6ec7] text-[#0a0a0a]",
            "border-2 border-[#ff6ec7]",
            "shadow-[4px_4px_0px_#39ff14]",
          ],
        },
        outline: {
          id: "outline",
          label: "Wireframe",
          labelZh: "线框",
          classes: [
            "bg-transparent text-[#39ff14]",
            "border-2 border-[#39ff14]",
            "shadow-[3px_3px_0px_#ff6ec7]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "ACTIVATE", type: "text" },
      ],
      states: {
        hover: [
          "hover:translate-x-[2px] hover:translate-y-[2px]",
          "hover:shadow-[2px_2px_0px_#a020f0]",
          "hover:brightness-110",
        ],
        active: ["active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"],
        disabled: ["opacity-40 cursor-not-allowed grayscale"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Dark card with fluorescent border, hard offset shadow, and scanline-ready surface",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#0a0a0a]",
          "rounded-none",
          "border-2 border-[#39ff14]",
          "shadow-[5px_5px_0px_#a020f0]",
          "transition-all duration-150 ease-out",
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
          id: "skewed",
          label: "Skewed",
          labelZh: "倾斜",
          type: "boolean",
          default: false,
          trueClasses: "skew-y-[-1deg]",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        purple: {
          id: "purple",
          label: "Purple Glow",
          labelZh: "紫色",
          classes: [
            "border-[#a020f0]",
            "shadow-[5px_5px_0px_#39ff14]",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink Glow",
          labelZh: "粉色",
          classes: [
            "border-[#ff6ec7]",
            "shadow-[5px_5px_0px_#e6ff00]",
          ],
        },
        yellow: {
          id: "yellow",
          label: "Acid Yellow",
          labelZh: "酸黄",
          classes: [
            "border-[#e6ff00]",
            "shadow-[5px_5px_0px_#ff6ec7]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "ACID_ZONE", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Distorted reality interface", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[8px_8px_0px_#a020f0]",
          "hover:border-[#e6ff00]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Terminal-style input with fluorescent text cursor and dark field",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-none",
          "border-2 border-[#39ff14]/60",
          "bg-[#0a0a0a]",
          "text-[#39ff14]",
          "placeholder:text-[#39ff14]/25",
          "font-mono",
          "focus:outline-none",
          "transition-all duration-150 ease-out",
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
        purple: {
          id: "purple",
          label: "Purple",
          labelZh: "紫色",
          classes: [
            "border-[#a020f0]/60",
            "text-[#a020f0]",
            "placeholder:text-[#a020f0]/25",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "border-[#ff6ec7]/60",
            "text-[#ff6ec7]",
            "placeholder:text-[#ff6ec7]/25",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "ENTER_DATA>_", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#39ff14]",
          "focus:shadow-[3px_3px_0px_#a020f0]",
          "focus:bg-[#0a0a0a]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    warpedBanner: {
      id: "warpedBanner",
      name: "Warped Banner",
      nameZh: "扭曲横幅",
      description: "Full-width banner with skewed transform and fluorescent gradient background",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "w-full",
          "py-6 px-8",
          "bg-gradient-to-r from-[#39ff14] via-[#a020f0] to-[#ff6ec7]",
          "skew-y-[-2deg]",
          "rounded-none",
          "font-mono",
          "uppercase",
          "tracking-widest",
          "[text-shadow:2px_0_#ff0000,-2px_0_#00ffff]",
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
        purple: {
          id: "purple",
          label: "Purple",
          labelZh: "紫色",
          classes: [
            "from-[#a020f0] via-[#ff6ec7] to-[#e6ff00]",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "from-[#ff6ec7] via-[#e6ff00] to-[#39ff14]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: true, default: "ACID_ZONE", type: "text" },
        { id: "subtitle", label: "Subtitle", labelZh: "副标题", required: false, default: "ENTER THE VOID", type: "text" },
      ],
      states: {},
    },

    scanlineOverlay: {
      id: "scanlineOverlay",
      name: "Scanline Overlay",
      nameZh: "扫描线覆盖层",
      description: "Decorative overlay panel with CSS scanline effect for retro CRT feel",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#0a0a0a]",
          "border-2 border-[#39ff14]/30",
          "rounded-none",
          "overflow-hidden",
          "p-6",
          "bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(57,255,20,0.03)_2px,rgba(57,255,20,0.03)_4px)]",
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
        dense: {
          id: "dense",
          label: "Dense",
          labelZh: "密集",
          classes: [
            "bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(57,255,20,0.05)_1px,rgba(57,255,20,0.05)_2px)]",
          ],
        },
        subtle: {
          id: "subtle",
          label: "Subtle",
          labelZh: "微妙",
          classes: [
            "bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,rgba(57,255,20,0.02)_4px,rgba(57,255,20,0.02)_8px)]",
          ],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {},
    },

    glitchBadge: {
      id: "glitchBadge",
      name: "Glitch Badge",
      nameZh: "故障徽章",
      description: "Small inline badge with offset shadow and monospace text",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "font-mono",
          "font-bold",
          "uppercase",
          "tracking-wider",
          "rounded-none",
          "bg-[#0a0a0a]",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2 py-0.5 text-[10px]" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-3 py-1 text-xs" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-1.5 text-sm" },
          ],
          default: "md",
        },
      ],
      variants: {
        green: {
          id: "green",
          label: "Green",
          labelZh: "绿色",
          classes: [
            "text-[#39ff14]",
            "border border-[#39ff14]",
            "shadow-[2px_2px_0px_#a020f0]",
            "[text-shadow:2px_1px_#ff0000,-2px_-1px_#0000ff]",
          ],
        },
        purple: {
          id: "purple",
          label: "Purple",
          labelZh: "紫色",
          classes: [
            "text-[#a020f0]",
            "border border-[#a020f0]",
            "shadow-[2px_2px_0px_#39ff14]",
            "[text-shadow:2px_1px_#39ff14,-2px_-1px_#ff6ec7]",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "text-[#ff6ec7]",
            "border border-[#ff6ec7]",
            "shadow-[2px_2px_0px_#e6ff00]",
            "[text-shadow:2px_1px_#a020f0,-2px_-1px_#39ff14]",
          ],
        },
        yellow: {
          id: "yellow",
          label: "Yellow",
          labelZh: "黄色",
          classes: [
            "text-[#e6ff00]",
            "border border-[#e6ff00]",
            "shadow-[2px_2px_0px_#ff6ec7]",
            "[text-shadow:2px_1px_#ff6ec7,-2px_-1px_#a020f0]",
          ],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "ACID", type: "text" },
      ],
      states: {},
    },

    acidProgress: {
      id: "acidProgress",
      name: "Acid Progress",
      nameZh: "酸性进度条",
      description: "Progress bar with fluorescent fill and hard edges",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "h-6",
          "bg-[#0a0a0a]",
          "border-2 border-[#39ff14]/40",
          "rounded-none",
          "overflow-hidden",
          "[&>.fill]:mix-blend-screen",
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
        green: {
          id: "green",
          label: "Green",
          labelZh: "绿色",
          classes: ["[&>.fill]:bg-[repeating-linear-gradient(90deg,#39ff14_0px,#39ff14_4px,#0a0a0a_4px,#0a0a0a_6px)]"],
        },
        purple: {
          id: "purple",
          label: "Purple",
          labelZh: "紫色",
          classes: ["[&>.fill]:bg-[repeating-linear-gradient(90deg,#a020f0_0px,#a020f0_4px,#0a0a0a_4px,#0a0a0a_6px)]"],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: ["[&>.fill]:bg-[repeating-linear-gradient(90deg,#ff6ec7_0px,#ff6ec7_4px,#0a0a0a_4px,#0a0a0a_6px)]"],
        },
      },
      slots: [{ id: "children", label: "Content", labelZh: "内容", required: false, type: "children" }],
      states: {},
    },

    distortionDivider: {
      id: "distortionDivider",
      name: "Distortion Divider",
      nameZh: "扭曲分隔线",
      description: "Horizontal divider with zigzag distortion pattern",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "w-full h-6",
          "flex items-center justify-center",
          "bg-[linear-gradient(90deg,#39ff14,#a020f0,#ff6ec7,#e6ff00)]",
          "[clip-path:polygon(0_40%,5%_60%,10%_35%,15%_55%,20%_30%,25%_65%,30%_40%,35%_60%,40%_25%,45%_70%,50%_35%,55%_55%,60%_30%,65%_65%,70%_45%,75%_55%,80%_30%,85%_60%,90%_40%,95%_55%,100%_35%,100%_65%,95%_45%,90%_60%,85%_40%,80%_70%,75%_45%,70%_55%,65%_35%,60%_70%,55%_45%,50%_65%,45%_30%,40%_75%,35%_40%,30%_60%,25%_35%,20%_70%,15%_45%,10%_65%,5%_40%,0_60%)]",
          "shadow-[2px_0_#ff0000,-2px_0_#00ffff]",
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
        thick: {
          id: "thick",
          label: "Thick",
          labelZh: "粗",
          classes: ["bg-[length:100%_4px]"],
        },
        dotted: {
          id: "dotted",
          label: "Dotted",
          labelZh: "点状",
          classes: [
            "bg-[repeating-linear-gradient(90deg,#39ff14_0px,#39ff14_4px,transparent_4px,transparent_8px,#ff6ec7_8px,#ff6ec7_12px,transparent_12px,transparent_16px)]",
          ],
        },
      },
      slots: [{ id: "children", label: "Content", labelZh: "内容", required: false, type: "children" }],
      states: {},
    },
  },
};
