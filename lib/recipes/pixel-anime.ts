// Pixel Anime Component Recipes
import { createStyleRecipes } from "./factory";

export const pixelAnimeRecipes = createStyleRecipes("pixel-anime", "Pixel Anime", {
    button: {
      id: "button",
      name: "RPG Menu Button",
      nameZh: "RPG菜单按钮",
      description:
        "Classic JRPG menu button with corner block decorations, pixel-perfect 2px borders, hard offset shadow, and step-based hover translation",
      skeleton: {
        element: "button",
        baseClasses: [
          "relative",
          "font-mono",
          "font-bold",
          "uppercase",
          "tracking-wider",
          "border-2 border-[#1a1040]",
          "shadow-[4px_4px_0px_#1a1040]",
          "transition-all duration-150 ease-linear",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            {
              value: "sm",
              label: "Small",
              labelZh: "小",
              classes: "px-3 py-1.5 text-xs",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "px-6 py-3 md:px-8 md:py-4 text-sm md:text-base",
            },
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
        {
          id: "cornerBlocks",
          label: "Corner Blocks",
          labelZh: "角块装饰",
          type: "boolean",
          default: false,
          trueClasses: "pa-corner-blocks",
        },
      ],
      variants: {
        primary: {
          id: "primary",
          label: "Primary",
          labelZh: "主要",
          classes: ["bg-[#4a90d9] text-white"],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: ["bg-[#ff6b6b] text-white"],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "bg-transparent text-[#ffd93d]",
            "border-2 border-[#ffd93d]",
            "shadow-[3px_3px_0px_#1a1040]",
          ],
        },
        green: {
          id: "green",
          label: "Green",
          labelZh: "绿色",
          classes: ["bg-[#50c878] text-white"],
        },
      },
      slots: [
        {
          id: "icon",
          label: "Icon",
          labelZh: "图标",
          required: false,
          type: "icon",
        },
        {
          id: "label",
          label: "Label",
          labelZh: "文字",
          required: true,
          default: "ATTACK",
          type: "text",
        },
      ],
      states: {
        hover: [
          "hover:translate-x-[2px] hover:translate-y-[2px]",
          "hover:shadow-[2px_2px_0px_#1a1040]",
        ],
        active: [
          "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "RPG Dialogue Box",
      nameZh: "RPG对话框",
      description:
        "Classic JRPG dialogue window with pixel frame border, inner double-border effect, and four corner block decorations at 8x8px. Referencing Final Fantasy and Dragon Quest menu systems",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#1a1040]",
          "border-2 border-[#4a90d9]",
          "shadow-[4px_4px_0px_#1a1040]",
          "transition-all duration-150 ease-linear",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            {
              value: "sm",
              label: "Small",
              labelZh: "小",
              classes: "p-3 md:p-4",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "p-4 md:p-6",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "p-5 md:p-8",
            },
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
          id: "cornerBlocks",
          label: "Corner Blocks",
          labelZh: "角块装饰",
          type: "boolean",
          default: true,
          trueClasses: "pa-dialog-frame",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: ["border-[#4a90d9]"],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: ["border-[#ffd93d]"],
        },
        red: {
          id: "red",
          label: "Red",
          labelZh: "红色",
          classes: ["border-[#ff6b6b]"],
        },
        green: {
          id: "green",
          label: "Green",
          labelZh: "绿色",
          classes: ["border-[#50c878]"],
        },
      },
      slots: [
        {
          id: "title",
          label: "Title",
          labelZh: "标题",
          required: false,
          default: "QUEST LOG",
          type: "text",
        },
        {
          id: "children",
          label: "Content",
          labelZh: "内容",
          required: true,
          default: "Adventure awaits!",
          type: "children",
        },
      ],
      states: {
        hover: [
          "hover:shadow-[6px_6px_0px_#1a1040]",
          "hover:border-[#ffd93d]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Pixel Input",
      nameZh: "像素输入框",
      description:
        "Pixel-art game input with 2px stepped border, monospace font, pixel-aligned focus shadow, and blinking gold caret",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-[#1a1040]",
          "border-2 border-[#4a90d9]",
          "text-[#e0e0ff]",
          "placeholder:text-[#e0e0ff]/40",
          "placeholder:uppercase",
          "font-mono",
          "caret-[#ffd93d]",
          "focus:outline-none",
          "transition-all duration-150 ease-linear",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            {
              value: "sm",
              label: "Small",
              labelZh: "小",
              classes: "px-2 py-1.5 text-xs",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "px-4 py-3 md:px-5 md:py-4 text-sm md:text-base",
            },
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
            "border-[#ffd93d]",
            "placeholder:text-[#ffd93d]/40",
          ],
        },
        red: {
          id: "red",
          label: "Red",
          labelZh: "红色",
          classes: [
            "border-[#ff6b6b]",
            "placeholder:text-[#ff6b6b]/40",
          ],
        },
      },
      slots: [
        {
          id: "placeholder",
          label: "Placeholder",
          labelZh: "占位符",
          required: false,
          default: "ENTER NAME...",
          type: "text",
        },
      ],
      states: {
        focus: [
          "focus:border-[#ffd93d]",
          "focus:shadow-[2px_2px_0px_#4a90d9]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    spriteFrame: {
      id: "spriteFrame",
      name: "Sprite Frame",
      nameZh: "精灵画框",
      description: "Card with pixel-art border, stepped corners, no border-radius",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#1a1040]",
          "border-2 border-[#4a90d9]",
          "outline outline-2 outline-offset-2 outline-[#4a90d9]/40",
          "shadow-[4px_4px_0px_#1a1040]",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-3" },
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
        golden: {
          id: "golden",
          label: "Golden",
          labelZh: "金色",
          classes: [
            "border-[#ffd93d]",
            "shadow-[4px_4px_0px_#8b6914]",
          ],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "暗色",
          classes: [
            "bg-[#0f0a2a]",
            "border-[#2d1b69]",
            "shadow-[4px_4px_0px_#0a0520]",
          ],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[6px_6px_0px_#1a1040]",
        ],
      },
    },

    dialogueBox: {
      id: "dialogueBox",
      name: "Dialogue Box",
      nameZh: "对话框",
      description: "RPG-style dialogue box with pixel border",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#1a1040]",
          "border-2 border-[#4a90d9]",
          "p-4",
          "pb-6",
          "font-mono",
          "text-sm",
          "text-[#e0e0ff]",
          "after:content-['']",
          "after:absolute",
          "after:bottom-[-8px]",
          "after:left-4",
          "after:w-0",
          "after:h-0",
          "after:border-l-[8px] after:border-l-transparent",
          "after:border-r-[8px] after:border-r-transparent",
          "after:border-t-[8px] after:border-t-[#4a90d9]",
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
        npc: {
          id: "npc",
          label: "NPC",
          labelZh: "NPC",
          classes: [
            "border-[#50c878]",
          ],
        },
        system: {
          id: "system",
          label: "System",
          labelZh: "系统",
          classes: [
            "border-[#ffd93d]",
            "text-[#ffd93d]",
          ],
        },
      },
      slots: [
        { id: "speaker", label: "Speaker", labelZh: "说话者", required: false, default: "HERO", type: "text" },
        { id: "message", label: "Message", labelZh: "消息", required: true, default: "The adventure begins!", type: "text" },
      ],
      states: {},
    },

    pixelBadge: {
      id: "pixelBadge",
      name: "Pixel Badge",
      nameZh: "像素徽章",
      description: "Small pixel-art badge/tag with hard borders",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "font-mono",
          "font-bold",
          "uppercase",
          "tracking-wider",
          "border-2",
          "bg-[#1a1040]",
          "outline outline-1 outline-offset-1 outline-current/30",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-1.5 py-0.5 text-[10px]" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-2.5 py-1 text-xs" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-3.5 py-1.5 text-sm" },
          ],
          default: "md",
        },
      ],
      variants: {
        blue: {
          id: "blue",
          label: "Blue",
          labelZh: "蓝色",
          classes: [
            "text-[#4a90d9]",
            "border-[#4a90d9]",
            "shadow-[2px_2px_0px_#1a1040]",
          ],
        },
        red: {
          id: "red",
          label: "Red",
          labelZh: "红色",
          classes: [
            "text-[#ff6b6b]",
            "border-[#ff6b6b]",
            "shadow-[2px_2px_0px_#1a1040]",
          ],
        },
        yellow: {
          id: "yellow",
          label: "Yellow",
          labelZh: "黄色",
          classes: [
            "text-[#ffd93d]",
            "border-[#ffd93d]",
            "shadow-[2px_2px_0px_#1a1040]",
          ],
        },
        green: {
          id: "green",
          label: "Green",
          labelZh: "绿色",
          classes: [
            "text-[#50c878]",
            "border-[#50c878]",
            "shadow-[2px_2px_0px_#1a1040]",
          ],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "LV.1", type: "text" },
      ],
      states: {},
    },

    hpBar: {
      id: "hpBar",
      name: "HP Bar",
      nameZh: "生命值条",
      description: "HP/health bar with stepped pixel segments",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "h-5",
          "bg-[#1a1040]",
          "border-2 border-[#4a90d9]",
          "overflow-hidden",
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
        hp: {
          id: "hp",
          label: "HP",
          labelZh: "生命",
          classes: [
            "[&>.fill]:bg-[#ff6b6b]",
            "border-[#ff6b6b]",
          ],
        },
        mp: {
          id: "mp",
          label: "MP",
          labelZh: "魔力",
          classes: [
            "[&>.fill]:bg-[#4a90d9]",
            "border-[#4a90d9]",
          ],
        },
        exp: {
          id: "exp",
          label: "EXP",
          labelZh: "经验",
          classes: [
            "[&>.fill]:bg-[#ffd93d]",
            "border-[#ffd93d]",
          ],
        },
      },
      slots: [{ id: "children", label: "Content", labelZh: "内容", required: false, type: "children" }],
      states: {},
    },

    menuPanel: {
      id: "menuPanel",
      name: "Menu Panel",
      nameZh: "菜单面板",
      description: "RPG menu panel with pixel-art frame",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#1a1040]",
          "border-2 border-[#4a90d9]",
          "shadow-[4px_4px_0px_#1a1040]",
          "font-mono",
          "text-[#e0e0ff]",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-3" },
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
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "暗色",
          classes: [
            "bg-[#0f0a2a]",
            "border-[#2d1b69]",
          ],
        },
        golden: {
          id: "golden",
          label: "Golden",
          labelZh: "金色",
          classes: [
            "border-[#ffd93d]",
            "shadow-[4px_4px_0px_#8b6914]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "MENU", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[6px_6px_0px_#1a1040]",
        ],
      },
    },
});
