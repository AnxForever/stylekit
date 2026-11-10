// Liquid Glass Component Recipes
import { createStyleRecipes } from "./factory";

// Recipes stay CSS-only for portability: blur and tint are the fallback material.
// On compatible engines, the shared LiquidGlass renderer is REQUIRED for the
// complete material. The recipe schema only emits HTML/classes; it does not
// generate an optical map or replace the renderer documented in the full design.md.
export const liquidGlassRecipes = createStyleRecipes("liquid-glass", "Liquid Glass", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "CSS fallback skin for a tinted pill; pair with LiquidGlass for real edge refraction, a sharp label, and tactile press",
      skeleton: {
        element: "button",
        baseClasses: [
          "relative",
          "isolate inline-flex items-center justify-center gap-2 select-none",
          "min-h-[44px] min-w-[44px]",
          "font-medium",
          "backdrop-blur-[10px] rounded-full border text-white",
          "shadow-[0_4px_16px_rgba(8,24,50,0.16)]",
          "transition-[transform,background-color,border-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          "active:duration-[110ms] active:scale-[0.985] active:translate-y-px",
          "motion-reduce:transition-none motion-reduce:active:duration-0 motion-reduce:active:scale-100 motion-reduce:active:translate-y-0",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#557b79] dark:focus-visible:ring-[#c7e4e5]",
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
          label: "Tinted",
          labelZh: "柔色玻璃",
          classes: [
            "bg-white/12 border-white/25",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Clear",
          labelZh: "清透玻璃",
          classes: [
            "bg-white/5 border-white/25",
          ],
        },
        accent: {
          id: "accent",
          label: "Solid",
          labelZh: "实色",
          classes: [
            "bg-[#25414a] border-white/28",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent",
            "border-white/45",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-white/16 hover:border-white/40 hover:shadow-[0_8px_22px_rgba(8,24,50,0.18)]",
        ],
        active: ["active:duration-[110ms] active:scale-[0.985] active:translate-y-px"],
        focus: ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#557b79] dark:focus-visible:ring-[#c7e4e5]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Solid reading card; clear/tinted variants are CSS fallback skins and require the shared LiquidGlass renderer for live curved-rim refraction",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "rounded-[24px] border",
          "shadow-[0_12px_32px_rgba(8,24,50,0.12)]",
          "transition-[transform,background-color,border-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none",
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
          trueClasses: "motion-safe:hover:-translate-y-0.5 cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Solid",
          labelZh: "实色",
          classes: ["bg-[#f3f2ed] border-[#557b79]/18 text-[#202929]"],
        },
        light: {
          id: "light",
          label: "Clear",
          labelZh: "清透玻璃",
          classes: [
            "bg-white/10 border-white/35 text-white backdrop-blur-[8px]",
          ],
        },
        dark: {
          id: "dark",
          label: "Tinted",
          labelZh: "柔色玻璃",
          classes: [
            "bg-[#202929]/78 border-white/24 text-white backdrop-blur-[12px]",
          ],
        },
        accent: {
          id: "accent",
          label: "Deep Teal",
          labelZh: "深青玻璃",
          classes: [
            "bg-[#25414a]/86 border-white/28 text-white backdrop-blur-[12px]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "motion-safe:hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(8,24,50,0.16)]",
        ],
        active: ["active:duration-[110ms] active:scale-[0.995] active:translate-y-px motion-reduce:active:scale-100 motion-reduce:active:translate-y-0"],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "CSS fallback skin for a tinted search field; the outer LiquidGlass renderer supplies refraction while input text stays sharp",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "min-h-[44px]",
          "backdrop-blur-[12px]",
          "rounded-full border",
          "focus:outline-none",
          "transition-[background-color,border-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-2 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2.5 md:px-5 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-3 md:px-6 md:py-4 text-base md:text-lg" },
          ],
          default: "md",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Tinted",
          labelZh: "柔色玻璃",
          classes: ["bg-white/12 border-white/24 text-white placeholder:text-white/60"],
        },
        filled: {
          id: "filled",
          label: "Solid",
          labelZh: "实色",
          classes: ["bg-[#f3f2ed] border-[#557b79]/24 text-[#202929] placeholder:text-[#557b79]"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Search...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#557b79] focus-visible:ring-2 focus-visible:ring-[#557b79] dark:focus-visible:border-[#c7e4e5] dark:focus-visible:ring-[#c7e4e5]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    glassPanel: {
      id: "glassPanel",
      name: "Glass Panel",
      nameZh: "玻璃面板",
      description: "Tinted fallback panel for controls and popovers; the shared LiquidGlass renderer is required on compatible engines",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#202929]/78 backdrop-blur-[12px]",
          "rounded-[28px] border border-white/24 text-white",
          "shadow-[0_12px_36px_rgba(8,24,50,0.14)]",
          "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.38)]",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-6 md:p-8" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-8 md:p-12" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-10 md:p-16" },
          ],
          default: "md",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Tinted",
          labelZh: "柔色玻璃",
          classes: [],
        },
      },
      slots: [
        { id: "children", label: "Content", labelZh: "内容", required: true, type: "children" },
      ],
      states: {},
    },

    refractionBadge: {
      id: "refractionBadge",
      name: "Refraction Badge",
      nameZh: "折射徽章",
      description: "CSS fallback badge skin with status tint; use LiquidGlass for optical refraction, and keep this noninteractive label separate from control hit areas",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative inline-flex items-center gap-1.5",
          "backdrop-blur-[8px] rounded-full border text-white",
          "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.42)]",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2.5 py-1 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-1.5 text-sm" },
          ],
          default: "sm",
        },
        {
          id: "pulse",
          label: "Pulse Animation",
          labelZh: "脉冲动画",
          type: "boolean",
          default: false,
          trueClasses: "motion-safe:animate-[pulse_420ms_ease-out_1]",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Clear",
          labelZh: "清透玻璃",
          classes: ["bg-white/12 border-white/24"],
        },
        success: {
          id: "success",
          label: "Success",
          labelZh: "成功",
          classes: [
            "bg-[#35675c]/42 border-[#c7e4e5]/35",
          ],
        },
        warning: {
          id: "warning",
          label: "Warning",
          labelZh: "警告",
          classes: [
            "bg-[#85714d]/50 border-[#e8dcc3]/40",
          ],
        },
        error: {
          id: "error",
          label: "Error",
          labelZh: "错误",
          classes: [
            "bg-[#7b4844]/48 border-[#efd2ca]/38",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Badge", type: "text" },
      ],
      states: {},
    },

    glassStack: {
      id: "glassStack",
      name: "Glass Stack",
      nameZh: "玻璃堆叠",
      description: "Layout-only fallback composition for stable content and one optical control layer; supply the LiquidGlass renderer for the glass layer",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
        ],
      },
      parameters: [
        {
          id: "layers",
          label: "Layers",
          labelZh: "层数",
          type: "select",
          options: [
            { value: "3", label: "3 Layers", labelZh: "3层", classes: "" },
            { value: "4", label: "4 Layers", labelZh: "4层", classes: "" },
            { value: "5", label: "5 Layers", labelZh: "5层", classes: "" },
          ],
          default: "3",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
      },
      slots: [
        { id: "children", label: "Cards", labelZh: "卡片", required: true, type: "children" },
      ],
      states: {},
    },

    nav: {
      id: "nav",
      name: "Navigation",
      nameZh: "导航栏",
      description: "Fallback navigation skin; wrap the navigation in LiquidGlass so compatible engines show real rim refraction",
      skeleton: {
        element: "nav",
        baseClasses: [
          "mx-auto inline-flex w-fit max-w-full items-center gap-1 rounded-full",
          "backdrop-blur-[8px] border px-2 py-1.5",
          "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.48),0_6px_22px_rgba(8,24,50,0.16)]",
        ],
      },
      parameters: [
        {
          id: "sticky",
          label: "Sticky",
          labelZh: "固定",
          type: "boolean",
          default: false,
          trueClasses: "fixed top-0 left-0 right-0 z-50",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Clear",
          labelZh: "清透玻璃",
          classes: ["bg-white/10 border-white/26 text-white"],
        },
        solid: {
          id: "solid",
          label: "Solid",
          labelZh: "实色",
          classes: ["bg-[#f3f2ed]/95 border-[#557b79]/18 text-[#202929]"],
        },
      },
      slots: [
        { id: "logo", label: "Logo", labelZh: "Logo", required: true, default: "BRAND", type: "text" },
        { id: "children", label: "Links", labelZh: "链接", required: false, type: "children" },
      ],
      states: {},
    },

    toggle: {
      id: "toggle",
      name: "Toggle Switch",
      nameZh: "开关",
      description: "CSS fallback toggle skin with a 44px minimum button hit area around a smaller visual track; wire aria-pressed and onClick, and use LiquidGlass for optical refraction",
      skeleton: {
        element: "button",
        baseClasses: [
          "relative",
          "inline-grid min-h-[44px] min-w-[44px] place-items-center rounded-full border-0 bg-transparent p-0 text-white",
          "before:pointer-events-none before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
          "before:w-[var(--toggle-track-width)] before:h-[var(--toggle-track-height)] before:rounded-full before:border before:border-white/24 before:bg-white/12 before:backdrop-blur-[8px]",
          "[&>*]:pointer-events-none [&>*]:absolute [&>*]:top-1/2 [&>*]:-translate-y-1/2 [&>*]:left-[calc((100%-var(--toggle-track-width))/2+2px)]",
          "transition-[transform,background-color,border-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          "active:duration-[110ms] active:scale-[0.98] active:translate-y-px",
          "motion-reduce:transition-none motion-reduce:active:duration-0 motion-reduce:active:scale-100 motion-reduce:active:translate-y-0",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#557b79] dark:focus-visible:ring-[#c7e4e5]",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "w-10 [--toggle-track-width:40px] [--toggle-track-height:24px]" },
            { value: "md", label: "Medium", labelZh: "中", classes: "w-12 [--toggle-track-width:48px] [--toggle-track-height:28px]" },
            { value: "lg", label: "Large", labelZh: "大", classes: "w-14 [--toggle-track-width:56px] [--toggle-track-height:32px]" },
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
      },
      slots: [
        { id: "thumb", label: "Thumb", labelZh: "滑块", required: true, type: "children" },
      ],
      states: {
        active: [
          "[&.active]:before:bg-[#557b79]/82 [&[aria-pressed=true]]:before:bg-[#557b79]/82",
          "[&.active]:before:border-[#c7e4e5]/72 [&[aria-pressed=true]]:before:border-[#c7e4e5]/72",
          "[&.active>*]:translate-x-[calc(var(--toggle-track-width)-var(--toggle-track-height))] [&[aria-pressed=true]>*]:translate-x-[calc(var(--toggle-track-width)-var(--toggle-track-height))]",
        ],
      },
    },

    slider: {
      id: "slider",
      name: "Slider",
      nameZh: "滑块",
      description: "CSS fallback visual track only; pair with a keyboard-accessible range input and at least a 44px hit area, and use LiquidGlass where optical refraction is needed",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "h-2",
          "bg-white/12 backdrop-blur-[8px]",
          "rounded-full",
          "border border-white/22",
          "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.42)]",
        ],
      },
      parameters: [
        {
          id: "width",
          label: "Width",
          labelZh: "宽度",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "w-32" },
            { value: "md", label: "Medium", labelZh: "中", classes: "w-48" },
            { value: "lg", label: "Large", labelZh: "大", classes: "w-64" },
            { value: "full", label: "Full", labelZh: "全宽", classes: "w-full" },
          ],
          default: "md",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Clear",
          labelZh: "清透玻璃",
          classes: [],
        },
        accent: {
          id: "accent",
          label: "Tinted",
          labelZh: "柔色玻璃",
          classes: ["[&>.fill]:bg-[#c7e4e5]"],
        },
      },
      slots: [
        { id: "fill", label: "Fill Track", labelZh: "填充轨道", required: true, type: "children" },
      ],
      states: {},
    },
});
