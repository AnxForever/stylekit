// Developer Terminal Component Recipes
import {
  sizeParam,
  fullWidthParam,
  paddingParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const developerTerminalRecipes = createStyleRecipes(
  "developer-terminal",
  "Developer Terminal",
  {
    button: {
      id: "button",
      name: "Command Button",
      nameZh: "命令按钮",
      description: "Button styled as an executable shell command",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-mono",
          "rounded-sm",
          "transition-colors duration-150",
        ],
      },
      parameters: [
        sizeParam({
          sm: "px-2.5 py-1 text-xs",
          md: "px-4 py-1.5 text-sm",
          lg: "px-5 py-2 text-sm",
        }),
        fullWidthParam,
      ],
      variants: {
        primary: variant("primary", "Primary", "主要", [
          "bg-[#4AF626] text-[#0A0E12] font-bold",
        ]),
        secondary: variant("secondary", "Secondary", "次要", [
          "bg-transparent text-[#4AF626]",
          "border border-[#1F2937]",
        ]),
        command: variant("command", "Command", "命令", [
          "bg-transparent text-[#8BE9FD]",
          "border border-[#8BE9FD]/40",
        ]),
        danger: variant("danger", "Danger", "危险", [
          "bg-transparent text-[#FF79C6]",
          "border border-[#FF79C6]/40",
        ]),
      },
      slots: buttonSlots("./run --now"),
      states: {
        hover: ["hover:bg-[#4AF626]/10"],
        active: ["active:translate-y-px"],
        focus: ["focus:outline-none focus:ring-1 focus:ring-[#4AF626]/60"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Output Panel",
      nameZh: "输出面板",
      description: "Command output panel with thin border and near-black surface",
      skeleton: {
        element: "div",
        baseClasses: [
          "font-mono",
          "bg-[#0D141B]",
          "border border-[#1F2937]",
          "rounded-sm",
          "transition-colors duration-150",
        ],
      },
      parameters: [
        paddingParam({
          sm: "p-3",
          md: "p-4",
          lg: "p-5",
        }),
      ],
      variants: {
        default: variant("default", "Default", "默认", []),
        stdout: variant("stdout", "Stdout", "标准输出", [
          "border-[#4AF626]/40",
        ]),
        stderr: variant("stderr", "Stderr", "错误输出", [
          "border-[#FF79C6]/40",
        ]),
        comment: variant("comment", "Comment", "注释", [
          "border-dashed border-[#6272A4]/50",
        ]),
      },
      slots: cardSlots("$ whoami", "name: developer / stack: [ts, react, node]"),
      states: {
        hover: ["hover:border-[#4AF626]/40"],
      },
    },

    input: {
      id: "input",
      name: "Prompt Input",
      nameZh: "Prompt 输入行",
      description: "Terminal prompt line input with green caret",
      skeleton: {
        element: "input",
        baseClasses: [
          "font-mono",
          "bg-[#0A0E12]",
          "border border-[#1F2937]",
          "rounded-sm",
          "text-[#4AF626]",
          "caret-[#4AF626]",
          "placeholder:text-[#6272A4]",
          "focus:outline-none",
          "transition-colors duration-150",
        ],
      },
      parameters: [
        sizeParam({
          sm: "px-3 py-1.5 text-xs w-48",
          md: "px-4 py-2 text-sm w-64",
          lg: "px-4 py-2.5 text-sm w-80",
        }),
      ],
      variants: {
        default: variant("default", "Default", "默认", []),
        session: variant("session", "Session", "会话", [
          "bg-[#0D141B]",
        ]),
      },
      slots: inputSlots("type a command..."),
      states: {
        focus: ["focus:border-[#4AF626]/60", "focus:ring-1 focus:ring-[#4AF626]/30"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
);
