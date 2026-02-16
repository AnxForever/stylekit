// Cyber Anime Component Recipes
import { createStyleRecipes } from "./factory";

export const cyberAnimeRecipes = createStyleRecipes("cyber-anime", "Cyber Anime", {
    button: {
      id: "button",
      name: "Holographic Button",
      nameZh: "全息按钮",
      description:
        "Cockpit control button with vertical scan line texture overlay, multi-layer neon glow, and HUD-style border",
      skeleton: {
        element: "button",
        baseClasses: [
          "relative overflow-hidden",
          "font-sans",
          "font-bold",
          "uppercase",
          "tracking-widest",
          "border",
          "border-[#06d6a0]/50",
          "transition-all duration-300 ease-out",
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
              classes: "px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-sm",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "px-7 py-3 md:px-8 md:py-4 text-sm md:text-base",
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
          id: "scanLines",
          label: "Scan Lines",
          labelZh: "扫描线",
          type: "boolean",
          default: true,
          trueClasses: "ca-scanlines",
        },
      ],
      variants: {
        primary: {
          id: "primary",
          label: "Primary",
          labelZh: "主要",
          classes: [
            "bg-[#7c3aed] text-white",
            "shadow-[0_0_10px_rgba(124,58,237,0.3),0_0_20px_rgba(124,58,237,0.15)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-transparent text-[#06d6a0]",
            "border-[#06d6a0]",
            "shadow-[0_0_10px_rgba(6,214,160,0.3),0_0_20px_rgba(6,214,160,0.15)]",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#ff006e] text-white",
            "border-[#ff006e]/60",
            "shadow-[0_0_10px_rgba(255,0,110,0.3),0_0_20px_rgba(255,0,110,0.15)]",
          ],
        },
        holographic: {
          id: "holographic",
          label: "Holographic",
          labelZh: "全息",
          classes: [
            "bg-gradient-to-r from-[#7c3aed]/80 via-[#38bdf8]/80 to-[#06d6a0]/80 text-white",
            "border-[#06d6a0]/40",
            "shadow-[0_0_15px_rgba(124,58,237,0.3),0_0_30px_rgba(6,214,160,0.1)]",
          ],
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
          default: "EXECUTE",
          type: "text",
        },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_20px_rgba(124,58,237,0.5),0_0_40px_rgba(124,58,237,0.2)]",
          "hover:border-[#06d6a0]",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "HUD Panel",
      nameZh: "HUD面板",
      description:
        "Mecha cockpit data panel with angled clip-path corners, HUD corner frame decorations, scan line overlay, and multi-layer neon glow",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative overflow-hidden",
          "bg-[#0f0f1a]/90",
          "border border-[#7c3aed]/30",
          "backdrop-blur-sm",
          "transition-all duration-300 ease-out",
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
              classes: "p-6 md:p-8",
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
          id: "hudCorners",
          label: "HUD Corners",
          labelZh: "HUD边角",
          type: "boolean",
          default: true,
          trueClasses: "ca-hud-frame",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "shadow-[0_0_20px_rgba(124,58,237,0.2)]",
          ],
        },
        cyan: {
          id: "cyan",
          label: "Cyan",
          labelZh: "青色",
          classes: [
            "border-[#06d6a0]/40",
            "shadow-[0_0_20px_rgba(6,214,160,0.2)]",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "border-[#ff006e]/30",
            "shadow-[0_0_20px_rgba(255,0,110,0.15)]",
          ],
        },
        holographic: {
          id: "holographic",
          label: "Holographic",
          labelZh: "全息",
          classes: [
            "border-[#7c3aed]/40",
            "shadow-[0_0_15px_rgba(124,58,237,0.2),0_0_30px_rgba(6,214,160,0.1)]",
            "ca-scanlines",
          ],
        },
      },
      slots: [
        {
          id: "title",
          label: "Title",
          labelZh: "标题",
          required: false,
          default: "DATA PANEL",
          type: "text",
        },
        {
          id: "children",
          label: "Content",
          labelZh: "内容",
          required: true,
          default: "System status nominal",
          type: "children",
        },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_30px_rgba(124,58,237,0.4),0_0_60px_rgba(124,58,237,0.1)]",
          "hover:border-[#7c3aed]/60",
        ],
      },
    },

    input: {
      id: "input",
      name: "Terminal Input",
      nameZh: "终端输入框",
      description:
        "Terminal-style command input with blinking cursor, monospace font, and neon focus glow. Includes a > prompt prefix indicator",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-[#0f0f1a]/80",
          "border border-[#7c3aed]/30",
          "text-[#e0e0ff]",
          "placeholder:text-[#e0e0ff]/30",
          "font-mono",
          "caret-[#06d6a0]",
          "focus:outline-none",
          "transition-all duration-300 ease-out",
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
              classes: "pl-7 pr-3 py-1.5 text-xs",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "pl-8 pr-4 py-2.5 md:py-3 text-xs md:text-sm",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "pl-9 pr-5 py-3 md:py-4 text-sm md:text-base",
            },
          ],
          default: "md",
        },
        {
          id: "promptPrefix",
          label: "Show Prompt",
          labelZh: "显示提示符",
          type: "boolean",
          default: true,
          trueClasses: "ca-terminal-prompt",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        cyan: {
          id: "cyan",
          label: "Cyan",
          labelZh: "青色",
          classes: [
            "border-[#06d6a0]/40",
            "placeholder:text-[#06d6a0]/30",
            "caret-[#06d6a0]",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "border-[#ff006e]/30",
            "placeholder:text-[#ff006e]/30",
            "caret-[#ff006e]",
          ],
        },
      },
      slots: [
        {
          id: "placeholder",
          label: "Placeholder",
          labelZh: "占位符",
          required: false,
          default: "Enter command...",
          type: "text",
        },
      ],
      states: {
        focus: [
          "focus:border-[#06d6a0]",
          "focus:shadow-[0_0_15px_rgba(6,214,160,0.3),0_0_30px_rgba(6,214,160,0.1)]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    hudStatusBar: {
      id: "hudStatusBar",
      name: "HUD Status Bar",
      nameZh: "HUD状态栏",
      description: "Horizontal status bar with segmented indicators and neon glow",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "flex items-center gap-2",
          "bg-[#0f0f1a]/90",
          "border border-[#7c3aed]/30",
          "px-4 py-2",
          "font-mono",
          "text-xs",
          "uppercase",
          "tracking-wider",
        ],
      },
      parameters: [
        {
          id: "segments",
          label: "Segments",
          labelZh: "分段数",
          type: "select",
          options: [
            { value: "3", label: "3 Segments", labelZh: "3段", classes: "" },
            { value: "5", label: "5 Segments", labelZh: "5段", classes: "" },
            { value: "7", label: "7 Segments", labelZh: "7段", classes: "" },
          ],
          default: "5",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "text-[#7c3aed]",
            "shadow-[0_0_10px_rgba(124,58,237,0.2)]",
          ],
        },
        alert: {
          id: "alert",
          label: "Alert",
          labelZh: "警报",
          classes: [
            "text-[#ff006e]",
            "border-[#ff006e]/40",
            "shadow-[0_0_10px_rgba(255,0,110,0.2)]",
          ],
        },
        success: {
          id: "success",
          label: "Success",
          labelZh: "成功",
          classes: [
            "text-[#06d6a0]",
            "border-[#06d6a0]/40",
            "shadow-[0_0_10px_rgba(6,214,160,0.2)]",
          ],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "标签", required: true, default: "SYS_STATUS", type: "text" },
        { id: "value", label: "Value", labelZh: "数值", required: false, default: "NOMINAL", type: "text" },
      ],
      states: {},
    },

    hologramPanel: {
      id: "hologramPanel",
      name: "Hologram Panel",
      nameZh: "全息面板",
      description: "Translucent panel with holographic shimmer border effect",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#0f0f1a]/60",
          "backdrop-blur-md",
          "border border-[#7c3aed]/20",
          "overflow-hidden",
          "bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(124,58,237,0.03)_2px,rgba(124,58,237,0.03)_4px)]",
          "transition-all duration-300 ease-out",
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
          classes: [
            "shadow-[0_0_20px_rgba(124,58,237,0.15)]",
          ],
        },
        cyan: {
          id: "cyan",
          label: "Cyan",
          labelZh: "青色",
          classes: [
            "border-[#06d6a0]/30",
            "shadow-[0_0_20px_rgba(6,214,160,0.15)]",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "border-[#ff006e]/25",
            "shadow-[0_0_20px_rgba(255,0,110,0.15)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "HOLO_PANEL", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]",
          "hover:border-[#7c3aed]/40",
        ],
      },
    },

    cockpitNav: {
      id: "cockpitNav",
      name: "Cockpit Nav",
      nameZh: "驾驶舱导航",
      description: "Navigation bar styled like mecha cockpit controls",
      skeleton: {
        element: "nav",
        baseClasses: [
          "flex items-center gap-1",
          "bg-[#0f0f1a]/95",
          "border-b border-[#7c3aed]/30",
          "px-4 py-2",
          "font-mono",
          "text-xs",
          "uppercase",
          "tracking-widest",
          "text-[#e0e0ff]/70",
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
            "shadow-[0_2px_15px_rgba(124,58,237,0.15)]",
          ],
        },
        compact: {
          id: "compact",
          label: "Compact",
          labelZh: "紧凑",
          classes: [
            "py-1 gap-0.5 text-[10px]",
          ],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {},
    },

    dataStream: {
      id: "dataStream",
      name: "Data Stream",
      nameZh: "数据流",
      description: "Vertical data stream display with monospace scrolling text feel",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#0f0f1a]",
          "border-l-2 border-[#7c3aed]/40",
          "p-4",
          "font-mono",
          "text-xs",
          "leading-relaxed",
          "overflow-hidden",
          "bg-[linear-gradient(180deg,rgba(124,58,237,0.08)_0%,transparent_15%,transparent_85%,rgba(124,58,237,0.08)_100%)]",
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
          classes: ["text-[#7c3aed]/80"],
        },
        cyan: {
          id: "cyan",
          label: "Cyan",
          labelZh: "青色",
          classes: [
            "text-[#06d6a0]/80",
            "border-l-[#06d6a0]/40",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "text-[#ff006e]/80",
            "border-l-[#ff006e]/40",
          ],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {},
    },

    missionBriefing: {
      id: "missionBriefing",
      name: "Mission Briefing",
      nameZh: "任务简报",
      description: "Alert/notification panel with military briefing aesthetic",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#0f0f1a]/90",
          "border border-[#7c3aed]/30",
          "p-4",
          "font-mono",
          "text-sm",
          "[clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%-8px))]",
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
            "border-[#38bdf8]/40",
            "text-[#38bdf8]",
            "shadow-[0_0_10px_rgba(56,189,248,0.1)]",
          ],
        },
        warning: {
          id: "warning",
          label: "Warning",
          labelZh: "警告",
          classes: [
            "border-[#fbbf24]/40",
            "text-[#fbbf24]",
            "shadow-[0_0_10px_rgba(251,191,36,0.1)]",
          ],
        },
        critical: {
          id: "critical",
          label: "Critical",
          labelZh: "紧急",
          classes: [
            "border-[#ff006e]/50",
            "text-[#ff006e]",
            "shadow-[0_0_15px_rgba(255,0,110,0.2)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: true, default: "MISSION_BRIEF", type: "text" },
        { id: "message", label: "Message", labelZh: "消息", required: true, default: "Incoming transmission...", type: "text" },
      ],
      states: {},
    },
});
