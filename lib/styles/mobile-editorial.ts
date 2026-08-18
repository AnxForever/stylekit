import type { DesignStyle } from "./types";

export const mobileEditorial: DesignStyle = {
  "slug": "mobile-editorial",
  "name": "移动编辑风",
  "nameEn": "Mobile Editorial",
  "description": "把杂志排版的节奏压缩进手机屏幕，用衬线标题、暖纸张背景和模块化内容卡片打造有内容感的 App。",
  "descriptionEn": "A mobile editorial style that compresses magazine rhythm into a phone screen with serif headlines, warm paper surfaces, and modular content cards.",
  "cover": "/styles/mobile-editorial.svg",
  "styleType": "visual",
  "tags": [
    "responsive",
    "high-contrast"
  ],
  "category": "minimal",
  "colors": {
    "primary": "#24211f",
    "secondary": "#fffdf8",
    "accent": [
      "#e97b61",
      "#c5d8c1",
      "#e9d7a9",
      "#d7c4e8"
    ]
  },
  "keywords": [
    "移动编辑",
    "手机应用",
    "杂志排版",
    "内容社区",
    "衬线标题",
    "暖纸张"
  ],
  "keywordsEn": ["mobile editorial", "content app", "magazine layout", "community", "serif headlines", "warm paper"],
  "philosophy": `Mobile Editorial 把手机 App 当作一本可以被滑动阅读的袖珍杂志。内容不是堆在卡片里，而是通过标题、图片、摘要和留白建立节奏。

核心原则：
- 标题负责个性，正文负责阅读
- 一屏只突出一个主要故事或行动
- 颜色克制，珊瑚色只用于动作和强调
- 评论与收藏作为内容旁注出现
- 用稳定的底部导航保持方向感`,
  "doList": [
    "使用有性格的衬线标题与清晰的无衬线正文搭配",
    "采用暖白纸张背景和细线分割内容层级",
    "移动端使用单列流、横向专题卡和底部导航",
    "使用珊瑚色作为唯一强行动色",
    "让评论、作者和发布时间成为内容旁注",
    "为长内容提供清晰的阅读进度和折叠层级"
  ],
  "dontList": [
    "不要使用过多强调色破坏编辑节奏",
    "不要让标题、按钮和标签争夺同一视觉焦点",
    "不要用大面积渐变替代内容层级",
    "不要在手机端强行塞入桌面多列布局",
    "不要让正文小于 15px 或行高过紧"
  ],
  "components": {
    "button": {
      "name": "Button",
      "description": "Button component in this style.",
      "code": `<button className="px-5 py-3 rounded-full bg-[#e97b61] text-white font-medium hover:bg-[#d9644e] active:scale-[0.98] transition-colors">Read the story</button>`
    },
    "card": {
      "name": "Card",
      "description": "Card component in this style.",
      "code": `<article className="bg-[#fffdf8] border-y border-[#24211f]/15 py-5"><p className="text-xs uppercase tracking-[0.18em] text-[#e97b61] mb-3">Field note · 06 min</p><h3 className="font-serif text-2xl text-[#24211f] mb-2">The quiet power of a good palette</h3><p className="text-sm leading-7 text-[#24211f]/65">A modular story card designed for reading, saving, and returning later.</p></article>`
    },
    "input": {
      "name": "Input",
      "description": "Input component in this style.",
      "code": `<input className="w-full bg-[#fffdf8] border-b border-[#24211f]/25 px-1 py-3 text-[#24211f] placeholder:text-[#24211f]/45 focus:outline-none focus:border-[#e97b61]" placeholder="Search the archive" />`
    }
  },
  "globalCss": `:root { --editorial-paper: #fffdf8; --editorial-ink: #24211f; --editorial-coral: #e97b61; --editorial-line: rgba(36,33,31,0.16); }\n.editorial-reading { text-wrap: balance; }\n.editorial-bottom-nav { padding-bottom: max(0.75rem, env(safe-area-inset-bottom)); border-top: 1px solid var(--editorial-line); }\n@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`,
  "aiRules": `风格：Mobile Editorial\n\n必须使用：\n- 暖纸白背景 #fffdf8 搭配墨色文字 #24211f\n- 有辨识度的衬线展示大标题，搭配易读的无衬线正文\n- 单列的移动端阅读流，标题、摘要、元信息与操作顺序清晰\n- 细线分隔、宽裕的垂直节奏，以及唯一的珊瑚色行动色\n- 评论、作者与收藏操作以内容旁注的形式呈现\n- 稳定的底部导航，保持方向感\n\n必须避免：\n- 多种强调色相互竞争\n- 把桌面端的多列布局硬塞进手机\n- 过小的正文字号或过紧的行高\n- 用装饰性渐变取代编辑层级\n\n交互：\n- 链接使用克制的过渡效果，通过下划线或颜色变化表达\n- 展开评论或详情时保留原有的阅读位置\n- 触屏设备上的操作区域至少保持 44px 高\n\n配色角色：\n- 纸色：#fffdf8\n- 墨色：#24211f\n- 行动色：#e97b61\n- 辅助强调色：#c5d8c1, #e9d7a9, #d7c4e8`,
  "aiRulesEn": `STYLE: Mobile Editorial\n\nMUST USE:\n- Warm paper background #fffdf8 and ink text #24211f\n- Distinctive serif display headlines paired with readable sans-serif body text\n- Single-column mobile reading flow with clear title, summary, metadata, and action order\n- Fine separators, generous vertical rhythm, and one coral action color\n- Comments, author, and save actions presented as content annotations\n- Stable bottom navigation for mobile orientation\n\nMUST AVOID:\n- Multiple competing accent colors\n- Desktop multi-column layouts forced onto phones\n- Tiny body text or compressed line-height\n- Decorative gradients replacing editorial hierarchy\n\nINTERACTION:\n- Use restrained transitions and underline or color changes for links\n- Preserve reading position when expanding comments or details\n- Keep actions at least 44px tall on touch devices\n\nCOLOR ROLES:\n- Paper: #fffdf8\n- Ink: #24211f\n- Action: #e97b61\n- Supporting accents: #c5d8c1, #e9d7a9, #d7c4e8`
};
