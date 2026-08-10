import type { DesignStyle } from "./types";

export const pastelUi: DesignStyle = {
  "slug": "pastel-ui",
  "name": "粉彩应用风",
  "nameEn": "Pastel App UI",
  "description": "为手机应用设计的温柔粉彩界面，以暖奶油底色、淡紫、薄荷绿和珊瑚色建立轻松但清晰的社区与内容体验。",
  "descriptionEn": "A mobile-first pastel interface for community and content apps, using warm cream, lilac, mint, butter yellow, and coral to create a friendly but legible experience.",
  "cover": "/styles/pastel-ui.svg",
  "styleType": "visual",
  "tags": [
    "responsive",
    "colorful"
  ],
  "category": "modern",
  "colors": {
    "primary": "#66508f",
    "secondary": "#fff8f0",
    "accent": [
      "#d9c7ff",
      "#cbefdf",
      "#ffe49a",
      "#ffb5a7"
    ]
  },
  "keywords": [
    "粉彩",
    "手机应用",
    "社区",
    "柔和",
    "高可读性",
    "圆角卡片",
    "快捷反馈"
  ],
  "keywordsEn": ["pastel app", "mobile-first", "community", "soft UI", "high readability", "rounded cards", "quick feedback"],
  "philosophy": `Pastel App UI 不追求把所有元素都染成浅色，而是用暖奶油色托住内容，用少量粉彩色提示状态与情绪。它适合风格发现、生活方式、收藏和社区类手机应用。

核心原则：
- 颜色表达情绪，深色文字表达结构
- 卡片适合触摸，按钮拥有明确主次
- 评分、收藏和快捷反馈在首屏附近可见
- 移动端优先，底部导航保持稳定
- 柔和不等于低对比，正文和控件保持可读`,
  "doList": [
    "使用暖奶油色作为主背景，粉彩色只承担分组和状态提示",
    "使用 rounded-2xl 到 rounded-3xl 的卡片与触控控件",
    "移动端优先设计底部导航、单列信息流和拇指可达操作",
    "将收藏、使用、评分和快捷反馈放在内容决策点附近",
    "使用深灰或深紫文字保证正文对比度",
    "用细边框和柔和阴影区分层级，避免大面积玻璃效果"
  ],
  "dontList": [
    "不要让浅色文字放在浅色背景上",
    "不要使用荧光色或高饱和渐变覆盖整个页面",
    "不要把所有卡片做成同一颜色和同一层级",
    "不要把关键操作藏在页面最底部",
    "不要使用过小的触控目标或密集的横向表格"
  ],
  "components": {
    "button": {
      "name": "Button",
      "description": "Button component in this style.",
      "code": `<button className="px-5 py-3 rounded-2xl bg-[#66508f] text-white font-semibold shadow-lg shadow-[#66508f]/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all">Use this style</button>`
    },
    "card": {
      "name": "Card",
      "description": "Card component in this style.",
      "code": `<article className="rounded-3xl bg-[#cbefdf] p-5 border border-[#66508f]/10 shadow-sm"><p className="text-xs uppercase tracking-[0.16em] text-[#66508f]/70 mb-3">Featured</p><h3 className="text-xl font-semibold text-[#332d3d] mb-2">Calm discovery</h3><p className="text-sm leading-relaxed text-[#5b5364]">Soft color, clear hierarchy, and a friendly rhythm for mobile exploration.</p></article>`
    },
    "input": {
      "name": "Input",
      "description": "Input component in this style.",
      "code": `<input className="w-full rounded-2xl bg-[#fff8f0] border border-[#66508f]/20 px-4 py-3 text-[#332d3d] placeholder:text-[#5b5364]/60 focus:outline-none focus:ring-4 focus:ring-[#ffb5a7]/40" placeholder="Search styles" />`
    }
  },
  "globalCss": `:root { --pastel-cream: #fff8f0; --pastel-lilac: #d9c7ff; --pastel-mint: #cbefdf; --pastel-butter: #ffe49a; --pastel-coral: #ffb5a7; --pastel-ink: #332d3d; }\n.pastel-surface { background: var(--pastel-cream); color: var(--pastel-ink); }\n.pastel-bottom-nav { padding-bottom: max(0.75rem, env(safe-area-inset-bottom)); }\n@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`,
  "aiRules": `STYLE: Pastel App UI\n\nMUST USE:\n- Warm cream backgrounds with pastel accents reserved for grouping and state\n- Deep plum or charcoal text for readable headings and body copy\n- rounded-2xl to rounded-3xl touch surfaces\n- Mobile-first single-column flows and a stable bottom navigation\n- Visible save, use, rating, and quick-feedback actions near the decision point\n- Soft borders and tinted shadows instead of heavy glass panels\n\nMUST AVOID:\n- Low-contrast light text on pastel backgrounds\n- Full-page neon gradients or excessive glassmorphism\n- Tiny touch targets and dense desktop tables on mobile\n- Hiding core actions at the bottom of a long detail page\n\nINTERACTION:\n- Use 200-300ms transitions, subtle lift on hover, and scale-[0.98] on press\n- Respect prefers-reduced-motion\n- Keep the primary action reachable by the thumb\n\nCOLOR ROLES:\n- Background: #fff8f0\n- Primary action: #66508f\n- Soft surfaces: #d9c7ff and #cbefdf\n- Emotional accents: #ffe49a and #ffb5a7\n- Text: #332d3d`,
  "aiRulesEn": `STYLE: Pastel App UI\n\nMUST USE:\n- Warm cream backgrounds with pastel accents reserved for grouping and state\n- Deep plum or charcoal text for readable headings and body copy\n- rounded-2xl to rounded-3xl touch surfaces\n- Mobile-first single-column flows and a stable bottom navigation\n- Visible save, use, rating, and quick-feedback actions near the decision point\n- Soft borders and tinted shadows instead of heavy glass panels\n\nMUST AVOID:\n- Low-contrast light text on pastel backgrounds\n- Full-page neon gradients or excessive glassmorphism\n- Tiny touch targets and dense desktop tables on mobile\n- Hiding core actions at the bottom of a long detail page\n\nINTERACTION:\n- Use 200-300ms transitions, subtle lift on hover, and scale-[0.98] on press\n- Respect prefers-reduced-motion\n- Keep the primary action reachable by the thumb\n\nCOLOR ROLES:\n- Background: #fff8f0\n- Primary action: #66508f\n- Soft surfaces: #d9c7ff and #cbefdf\n- Emotional accents: #ffe49a and #ffb5a7\n- Text: #332d3d`
};
