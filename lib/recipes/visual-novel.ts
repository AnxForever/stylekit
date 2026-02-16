// Visual Novel Component Recipes
import { createStyleRecipes } from "./factory";

export const visualNovelRecipes = createStyleRecipes("visual-novel", "Visual Novel", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Visual novel choice button with frosted glass effect and subtle hover glow",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-sans",
          "font-medium",
          "rounded-lg",
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
            "bg-[#6366f1] text-white",
            "shadow-sm",
            "border border-[#6366f1]/20",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-white/[0.06] text-white/70",
            "border border-white/10",
            "backdrop-blur-sm",
          ],
        },
        choice: {
          id: "choice",
          label: "Choice",
          labelZh: "选项",
          classes: [
            "bg-white/50 text-[#4a5568]",
            "border border-[#6366f1]/25",
            "backdrop-blur-sm",
            "text-left",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "bg-[#ec4899] text-white",
            "shadow-sm",
            "border border-[#ec4899]/20",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Continue", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-[#6366f1]/10",
          "hover:border-[#6366f1]/40",
          "hover:shadow-[0_0_15px_#6366f115]",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Semi-transparent dialog panel with frosted glass and optional character nameplate",
      skeleton: {
        element: "div",
        baseClasses: [
          "rounded-lg",
          "backdrop-blur-md",
          "shadow-sm",
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
        {
          id: "interactive",
          label: "Interactive",
          labelZh: "可交互",
          type: "boolean",
          default: true,
          trueClasses: "hover:-translate-y-1 cursor-pointer",
        },
        {
          id: "ornateCorners",
          label: "Ornate Corners",
          labelZh: "装饰边角",
          type: "boolean",
          default: false,
          trueClasses: "",
        },
      ],
      variants: {
        light: {
          id: "light",
          label: "Light",
          labelZh: "亮色",
          classes: [
            "bg-white/70",
            "border border-[#4a5568]/10",
          ],
        },
        dialog: {
          id: "dialog",
          label: "Dialog",
          labelZh: "对话",
          classes: [
            "bg-[#1a202c]/85",
            "border border-[#6366f1]/20",
          ],
        },
        narrator: {
          id: "narrator",
          label: "Narrator",
          labelZh: "旁白",
          classes: [
            "bg-white/50",
            "border border-[#4a5568]/10",
          ],
        },
        scene: {
          id: "scene",
          label: "Scene Card",
          labelZh: "场景卡",
          classes: [
            "bg-white/70",
            "border border-[#6366f1]/15",
            "overflow-hidden",
          ],
        },
      },
      slots: [
        { id: "nameplate", label: "Nameplate", labelZh: "铭牌", required: false, default: "Sakura", type: "text" },
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Chapter 1", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "The story continues...", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-lg",
          "hover:border-[#6366f1]/30",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Clean input with soft focus glow, designed for character name entry and save screen forms",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-lg",
          "font-sans",
          "backdrop-blur-sm",
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
        light: {
          id: "light",
          label: "Light",
          labelZh: "亮色",
          classes: [
            "bg-white/70",
            "border border-[#4a5568]/20",
            "text-[#4a5568]",
            "placeholder:text-[#4a5568]/40",
          ],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "暗色",
          classes: [
            "bg-white/[0.06]",
            "border border-[#6366f1]/20",
            "text-white",
            "placeholder:text-white/25",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "bg-white/[0.06]",
            "border border-[#ec4899]/20",
            "text-white",
            "placeholder:text-white/25",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Enter your name...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#6366f1]/50",
          "focus:shadow-[0_0_12px_#6366f120]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    dialogueBox: {
      id: "dialogueBox",
      name: "Dialogue Box",
      nameZh: "对话框",
      description: "VN-style dialogue box with semi-transparent background",
      skeleton: {
        element: "div",
        baseClasses: [
          "rounded-lg",
          "backdrop-blur-md",
          "p-5 md:p-8",
          "font-sans",
          "transition-all duration-300 ease-in-out",
          "relative",
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
            "bg-[#1a202c]/85",
            "border border-[#6366f1]/20",
            "text-white/90",
          ],
        },
        narrator: {
          id: "narrator",
          label: "Narrator",
          labelZh: "旁白",
          classes: [
            "bg-white/50",
            "border border-[#4a5568]/10",
            "text-[#4a5568]",
            "italic",
          ],
        },
        thought: {
          id: "thought",
          label: "Thought",
          labelZh: "内心独白",
          classes: [
            "bg-[#6366f1]/15",
            "border border-[#6366f1]/25",
            "text-white/80",
            "italic",
          ],
        },
      },
      slots: [
        { id: "speaker", label: "Speaker", labelZh: "说话者", required: false, default: "Sakura", type: "text" },
        { id: "message", label: "Message", labelZh: "消息", required: true, default: "The cherry blossoms are beautiful today...", type: "text" },
      ],
      states: {
        hover: [
          "hover:border-[#6366f1]/35",
        ],
      },
    },

    choicePanel: {
      id: "choicePanel",
      name: "Choice Panel",
      nameZh: "选项面板",
      description: "Choice selection panel with hover highlight",
      skeleton: {
        element: "div",
        baseClasses: [
          "rounded-lg",
          "backdrop-blur-sm",
          "px-5 py-3 md:px-6 md:py-4",
          "font-sans",
          "cursor-pointer",
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
            "bg-white/50 text-[#4a5568]",
            "border border-[#6366f1]/20",
          ],
        },
        highlighted: {
          id: "highlighted",
          label: "Highlighted",
          labelZh: "高亮",
          classes: [
            "bg-[#6366f1]/20 text-white",
            "border border-[#6366f1]/40",
            "shadow-[0_0_15px_#6366f120]",
          ],
        },
        locked: {
          id: "locked",
          label: "Locked",
          labelZh: "锁定",
          classes: [
            "bg-white/20 text-white/40",
            "border border-white/10",
            "cursor-not-allowed",
          ],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Go to the garden", type: "children" },
      ],
      states: {
        hover: [
          "hover:bg-[#6366f1]/15",
          "hover:border-[#6366f1]/35",
          "hover:shadow-[0_0_12px_#6366f115]",
        ],
      },
    },

    characterSlot: {
      id: "characterSlot",
      name: "Character Slot",
      nameZh: "角色槽位",
      description: "Character portrait frame/slot",
      skeleton: {
        element: "div",
        baseClasses: [
          "rounded-lg",
          "overflow-hidden",
          "transition-all duration-500 ease-in-out",
          "relative",
        ],
      },
      parameters: [
        {
          id: "position",
          label: "Position",
          labelZh: "位置",
          type: "select",
          options: [
            { value: "left", label: "Left", labelZh: "左", classes: "self-start" },
            { value: "center", label: "Center", labelZh: "中", classes: "self-center" },
            { value: "right", label: "Right", labelZh: "右", classes: "self-end" },
          ],
          default: "center",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "border-2 border-white/15",
            "shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
          ],
        },
        active: {
          id: "active",
          label: "Active",
          labelZh: "活跃",
          classes: [
            "border-2 border-[#6366f1]/40",
            "shadow-[0_4px_25px_#6366f130]",
            "brightness-110",
          ],
        },
        faded: {
          id: "faded",
          label: "Faded",
          labelZh: "淡出",
          classes: [
            "border-2 border-white/5",
            "opacity-50",
            "grayscale-[30%]",
          ],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Character portrait", type: "children" },
      ],
      states: {
        hover: [
          "hover:border-[#6366f1]/30",
          "hover:shadow-[0_6px_25px_#6366f120]",
        ],
      },
    },

    saveSlotCard: {
      id: "saveSlotCard",
      name: "Save Slot Card",
      nameZh: "存档卡片",
      description: "Save/load slot card with timestamp area",
      skeleton: {
        element: "div",
        baseClasses: [
          "rounded-lg",
          "backdrop-blur-md",
          "p-4 md:p-5",
          "font-sans",
          "cursor-pointer",
          "transition-all duration-300 ease-in-out",
          "relative",
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
            "bg-[#1a202c]/70",
            "border border-[#6366f1]/15",
            "text-white/80",
          ],
        },
        empty: {
          id: "empty",
          label: "Empty",
          labelZh: "空",
          classes: [
            "bg-white/[0.04]",
            "border border-dashed border-white/15",
            "text-white/30",
          ],
        },
        current: {
          id: "current",
          label: "Current",
          labelZh: "当前",
          classes: [
            "bg-[#6366f1]/15",
            "border border-[#6366f1]/30",
            "text-white/90",
            "shadow-[0_0_15px_#6366f115]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Save 01", type: "text" },
        { id: "timestamp", label: "Timestamp", labelZh: "时间戳", required: false, default: "2025-01-15 14:30", type: "text" },
        { id: "preview", label: "Preview", labelZh: "预览", required: false, default: "Chapter 3 - The Garden", type: "text" },
      ],
      states: {
        hover: [
          "hover:border-[#6366f1]/30",
          "hover:shadow-[0_0_12px_#6366f115]",
        ],
      },
    },

    sceneFade: {
      id: "sceneFade",
      name: "Scene Fade",
      nameZh: "场景渐变",
      description: "Scene transition overlay panel",
      skeleton: {
        element: "div",
        baseClasses: [
          "inset-0",
          "flex items-center justify-center",
          "transition-all duration-700 ease-in-out",
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
        fadeBlack: {
          id: "fadeBlack",
          label: "Fade Black",
          labelZh: "黑色渐变",
          classes: [
            "bg-black/80",
            "text-white/60",
          ],
        },
        fadeWhite: {
          id: "fadeWhite",
          label: "Fade White",
          labelZh: "白色渐变",
          classes: [
            "bg-white/90",
            "text-[#4a5568]/60",
          ],
        },
        dissolve: {
          id: "dissolve",
          label: "Dissolve",
          labelZh: "溶解",
          classes: [
            "bg-[#6366f1]/30",
            "backdrop-blur-lg",
            "text-white/70",
          ],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: false, default: "", type: "children" },
      ],
      states: {},
    },
});
