// Voice Recorder Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const voiceRecorderRecipes = createStyleRecipes(
  "voice-recorder",
  "Voice Recorder",
  {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Terminal button with matrix green glow",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-mono",
          "uppercase",
          "tracking-wider",
          "border",
          "transition-all duration-150",
        ],
      },
      parameters: [
        sizeParam({
          sm: "px-3 py-1.5 text-xs",
          md: "px-5 py-2 text-sm",
          lg: "px-7 py-3 text-base",
        }),
        fullWidthParam,
      ],
      variants: {
        primary: variant("primary", "Primary", "主要", [
          "bg-[#00ff41] text-[#0d1117] border-[#00ff41]",
          "shadow-[0_0_8px_rgba(0,255,65,0.3)]",
        ]),
        secondary: variant("secondary", "Secondary", "次要", [
          "bg-transparent text-[#00ff41] border-[#00ff41]/40",
        ]),
      },
      slots: buttonSlots("REC"),
      states: {
        hover: ["hover:shadow-[0_0_20px_rgba(0,255,65,0.5)]"],
        active: ["active:translate-y-[2px]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Dark terminal panel with scanline overlay",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#0d1117]",
          "border border-[#00ff41]/20",
          "rounded-none",
          "overflow-hidden",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-7" },
          ],
          default: "md",
        },
      ],
      variants: { default: variant("default", "Default", "默认", []) },
      slots: cardSlots("TERMINAL", "Signal processing active"),
      states: { hover: ["hover:border-[#00ff41]/40"] },
    },
    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Command-line input with green text",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-[#080b10]",
          "border border-[#00ff41]/30",
          "text-[#00ff41]",
          "placeholder:text-[#00ff41]/20",
          "focus:outline-none",
          "font-mono",
          "rounded-none",
          "transition-all duration-150",
        ],
      },
      parameters: [
        sizeParam({
          sm: "px-3 py-1.5 text-xs",
          md: "px-4 py-2.5 text-sm",
          lg: "px-5 py-3 text-base",
        }),
      ],
      variants: { default: variant("default", "Default", "默认", []) },
      slots: inputSlots("$ enter command_"),
      states: {
        focus: [
          "focus:border-[#00ff41] focus:shadow-[0_0_10px_rgba(0,255,65,0.2)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  }
);
