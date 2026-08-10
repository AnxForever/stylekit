import type { DesignStyle } from "./types";

export const softUtility: DesignStyle = {
  "slug": "soft-utility",
  "name": "柔和工具风",
  "nameEn": "Soft Utility",
  "description": "面向高频使用的手机工具 App，使用浅色背景、清晰状态色和柔和层级，在效率与亲和力之间取得平衡。",
  "descriptionEn": "A soft utility style for frequently used mobile tools, balancing efficiency and warmth with calm surfaces, clear state colors, and friendly hierarchy.",
  "cover": "/styles/soft-utility.svg",
  "styleType": "visual",
  "tags": [
    "responsive",
    "high-contrast"
  ],
  "category": "modern",
  "colors": {
    "primary": "#2d5b63",
    "secondary": "#f4f8f6",
    "accent": [
      "#a9d8cc",
      "#f3c98b",
      "#e6b7b0",
      "#b8c9ed"
    ]
  },
  "keywords": [
    "工具应用",
    "手机应用",
    "效率",
    "状态色",
    "柔和层级",
    "高频使用"
  ],
  "keywordsEn": ["utility app", "mobile app", "productivity", "status colors", "soft hierarchy", "frequent use"],
  "philosophy": `Soft Utility 面向每天都会打开的工具型 App。它保留柔和色彩和圆润触感，但让状态、输入、筛选和确认拥有比装饰更高的权重。

核心原则：
- 先让用户完成任务，再表达风格
- 颜色承担状态，不用颜色替代文字
- 控件有明确的默认、聚焦、完成和错误状态
- 主要动作固定在拇指容易到达的位置
- 信息密度适中，避免空洞的装饰`,
  "doList": [
    "使用深青色作为主行动色，保证按钮和正文可读",
    "用薄荷、杏色、蓝色区分状态和模块，而不是装饰性铺色",
    "在移动端采用底部操作栏和清晰的返回路径",
    "所有输入控件提供 focus、error、success 和 disabled 状态",
    "使用 rounded-xl 到 rounded-2xl，保持密度而不过度可爱",
    "为常用操作提供一键完成和可撤销反馈"
  ],
  "dontList": [
    "不要用低对比度文字承载关键任务信息",
    "不要为了柔和而移除边界、分隔和状态反馈",
    "不要把工具型页面做成纯展示卡片墙",
    "不要使用过度弹跳或影响效率的动画",
    "不要让主操作在不同页面随意改变位置"
  ],
  "components": {
    "button": {
      "name": "Button",
      "description": "Button component in this style.",
      "code": `<button className="px-5 py-3 rounded-2xl bg-[#2d5b63] text-white font-semibold shadow-md shadow-[#2d5b63]/20 hover:bg-[#234b52] active:scale-[0.98] transition-colors">Complete task</button>`
    },
    "card": {
      "name": "Card",
      "description": "Card component in this style.",
      "code": `<section className="rounded-2xl bg-[#f4f8f6] border border-[#2d5b63]/15 p-5"><div className="flex items-center gap-3 mb-4"><span className="h-10 w-10 rounded-xl bg-[#a9d8cc]" /><div><h3 className="font-semibold text-[#203b40]">Today’s focus</h3><p className="text-xs text-[#557077]">3 tasks remaining</p></div></div><div className="h-2 rounded-full bg-[#d9e8e3] overflow-hidden"><div className="h-full w-2/3 rounded-full bg-[#2d5b63]" /></div></section>`
    },
    "input": {
      "name": "Input",
      "description": "Input component in this style.",
      "code": `<input className="w-full rounded-2xl bg-white border border-[#2d5b63]/20 px-4 py-3 text-[#203b40] placeholder:text-[#557077]/60 focus:outline-none focus:ring-4 focus:ring-[#a9d8cc]/50" placeholder="Add a task" />`
    }
  },
  "globalCss": `:root { --utility-surface: #f4f8f6; --utility-ink: #203b40; --utility-primary: #2d5b63; --utility-mint: #a9d8cc; --utility-apricot: #f3c98b; }\n.utility-status { min-height: 0.5rem; border-radius: 9999px; }\n.utility-bottom-bar { padding-bottom: max(0.75rem, env(safe-area-inset-bottom)); }\n@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`,
  "aiRules": `STYLE: Soft Utility\n\nMUST USE:\n- Deep teal primary actions with pale surfaces and distinct state colors\n- Rounded-xl to rounded-2xl controls that preserve information density\n- Mobile-first bottom action bars and thumb-reachable primary actions\n- Explicit default, focus, success, error, disabled, and loading states\n- Status colors paired with text or icons; never communicate meaning by color alone\n- Fast, restrained motion that supports task completion\n\nMUST AVOID:\n- Low-contrast text for task-critical information\n- Turning a tool screen into a decorative card gallery\n- Removing boundaries or state feedback in the name of softness\n- Bouncy animations that slow down repeated actions\n\nINTERACTION:\n- Use 160-240ms transitions and scale-[0.98] on press\n- Keep primary controls in a consistent location across screens\n- Provide undo or confirmation for destructive actions\n\nCOLOR ROLES:\n- Surface: #f4f8f6\n- Text: #203b40\n- Primary: #2d5b63\n- Success/support: #a9d8cc\n- Notice: #f3c98b\n- Secondary states: #e6b7b0 and #b8c9ed`,
  "aiRulesEn": `STYLE: Soft Utility\n\nMUST USE:\n- Deep teal primary actions with pale surfaces and distinct state colors\n- Rounded-xl to rounded-2xl controls that preserve information density\n- Mobile-first bottom action bars and thumb-reachable primary actions\n- Explicit default, focus, success, error, disabled, and loading states\n- Status colors paired with text or icons; never communicate meaning by color alone\n- Fast, restrained motion that supports task completion\n\nMUST AVOID:\n- Low-contrast text for task-critical information\n- Turning a tool screen into a decorative card gallery\n- Removing boundaries or state feedback in the name of softness\n- Bouncy animations that slow down repeated actions\n\nINTERACTION:\n- Use 160-240ms transitions and scale-[0.98] on press\n- Keep primary controls in a consistent location across screens\n- Provide undo or confirmation for destructive actions\n\nCOLOR ROLES:\n- Surface: #f4f8f6\n- Text: #203b40\n- Primary: #2d5b63\n- Success/support: #a9d8cc\n- Notice: #f3c98b\n- Secondary states: #e6b7b0 and #b8c9ed`
};
