import type { DesignSpec } from "../types";

export const softUtilitySpec: DesignSpec = {
  slug: "soft-utility",
  name: "柔和工具风",
  nameEn: "Soft Utility",
  cover: "/styles/soft-utility.svg",
  theme: "light",
  northStar: {
    zh: "效率工具也可以温和：深青压住信息，柔色安抚手感。",
    en: "A utility can still be gentle: deep teal holds the information, soft tones calm the hand.",
  },
  summary: {
    zh: "柔和工具风服务于高频使用的移动端工具：待办、记账、健康打卡。它要在「效率」与「温和」之间取平衡——主色用深青（#2d5b63）保证按钮和正文的可读，其余颜色全部是低饱和的薄荷、杏、粉与淡蓝，只用于分类和状态。圆角取 12 到 16px，比消费级产品克制、比企业产品柔软。动效刻意不做弹跳，因为日常工具里任何夸张动作都会变成打断。",
    en: "Soft Utility serves the high-frequency mobile tools: to-dos, budgeting, habit tracking. It balances efficiency against warmth — a deep teal (#2d5b63) carries actions and body copy so they stay legible, while every other color is a low-saturation mint, apricot, blush or pale blue used only for categories and states. Radius runs 12 to 16px, restrained next to consumer products and softer than enterprise. Motion deliberately avoids bounce, because in a tool used daily any exaggerated movement becomes an interruption.",
  },
  colors: [
    {
      name: "深青",
      nameEn: "Deep Teal",
      value: "#2d5b63",
      group: "brand",
      role: {
        zh: "主行动、标题、进度条与选中态。是整套系统唯一的高对比色。",
        en: "Primary actions, headings, progress bars and selection — the one high-contrast tone here.",
      },
      token: "--color-deep-teal",
    },
    {
      name: "雾绿白",
      nameEn: "Mist",
      value: "#f4f8f6",
      group: "surface",
      role: {
        zh: "页面与卡片底色。带一点绿的暖白，比纯白柔和。",
        en: "Page and card ground — a green-leaning white, softer than pure white.",
      },
      token: "--color-mist",
    },
    {
      name: "墨青",
      nameEn: "Ink Teal",
      value: "#203b40",
      group: "brand",
      role: {
        zh: "正文与标题文字。比主色更深，保证长段落可读。",
        en: "Body and heading text — deeper than the primary, keeping long passages readable.",
      },
      token: "--color-ink-teal",
    },
    {
      name: "薄荷",
      nameEn: "Mint",
      value: "#a9d8cc",
      group: "accent",
      role: {
        zh: "分类色与图标底，表示「生活 / 完成」类语义。",
        en: "Category color and icon bed, signalling lifestyle and completion.",
      },
      token: "--color-mint",
    },
    {
      name: "杏",
      nameEn: "Apricot",
      value: "#f3c98b",
      group: "accent",
      role: {
        zh: "提醒与截止语义，暖色里最显眼的一支。",
        en: "Reminders and deadlines — the most visible of the warm tones.",
      },
      token: "--color-apricot",
    },
    {
      name: "藕粉",
      nameEn: "Blush",
      value: "#e6b7b0",
      group: "accent",
      role: {
        zh: "情感与个人类分类，面积小、频率低。",
        en: "Emotional and personal categories, small area and low frequency.",
      },
      token: "--color-blush",
    },
    {
      name: "淡蓝",
      nameEn: "Pale Blue",
      value: "#b8c9ed",
      group: "accent",
      role: {
        zh: "信息与日程类分类，是唯一偏冷的柔色。",
        en: "Informational and scheduling categories — the one cool soft tone.",
      },
      token: "--color-pale-blue",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'PingFang SC', sans-serif",
      weights: [400, 500, 600],
      sizes: [12, 13, 15, 17, 22, 28],
      lineHeight: { display: 1.25, heading: 1.35, body: 1.6 },
      tracking: { display: "-0.01em", label: "0.04em" },
      role: {
        zh: "全站唯一字体。字级偏移动端（13 到 17px 为主），字重不超过 600，避免压过柔色。",
        en: "The only face, sized for mobile at 13 to 17px with weights capped at 600 so type never overwhelms the soft palette.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "heading", weight: 600, size: 28, lineHeight: 1.3, tracking: "-0.01em", token: "--text-heading" },
    { role: "subheading", weight: 600, size: 22, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 600, size: 17, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 15, lineHeight: 1.6, token: "--text-body" },
    { role: "body-sm", weight: 400, size: 13, lineHeight: 1.55, token: "--text-body-sm" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "comfortable",
    scale: [4, 8, 12, 16, 20, 24, 32, 48],
    maxWidth: 480,
    sectionGap: 32,
    cardPadding: 20,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "16px" },
    { element: "buttons", value: "16px" },
    { element: "inputs", value: "16px" },
    { element: "icons", value: "12px" },
    { element: "pills", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Mist", value: "#f4f8f6", purpose: "页面与卡片底" },
    { level: 1, name: "White", value: "#ffffff", purpose: "输入框与浮层" },
    { level: 2, name: "Mint Bed", value: "#a9d8cc", purpose: "图标与分类块" },
  ],
  elevation: [
    { name: "Button", value: "0 6px 16px rgba(45,91,99,0.20)" },
    { name: "Card", value: "none — 1px border carries it" },
    { name: "Sheet", value: "0 -12px 40px rgba(32,59,64,0.12)" },
  ],
  components: [
    {
      name: "Primary Action",
      role: { zh: "主行动按钮（例：完成任务）", en: "Primary action, e.g. complete a task" },
      construction: {
        zh: "深青填充、白字、16px 圆角、无描边，字级 17px、字重 600、padding 12px 20px，阴影 0 6px 16px 主色 20%。hover 时填充加深到 #234b52；按下缩放 0.98。过渡只改颜色，200ms。",
        en: "Deep teal fill, white text, 16px radius, no border, 17px type at weight 600, 12px 20px padding, shadow 0 6px 16px at 20% primary. Hover deepens the fill to #234b52; press scales 0.98. Color-only transition, 200ms.",
      },
      sizes: "padding 12px 20px; label 17px",
      states: "hover: darker fill; active: scale 0.98",
    },
    {
      name: "Task Card",
      role: { zh: "任务卡与进度块", en: "Task cards and progress blocks" },
      construction: {
        zh: "雾绿白填充、1px 主色 15% 描边、16px 圆角、内边距 20px，无阴影。左上 40px 薄荷图标块（12px 圆角），标题 17px/600 墨青，说明 12px 灰。底部进度条高 8px、全圆角、底槽 #d9e8e3、填充深青。",
        en: "Mist fill, a 1px border at 15% primary, 16px radius, 20px padding, no shadow. A 40px mint icon tile on a 12px radius sits top-left above a 17px/600 ink-teal title and 12px grey caption. The progress bar below is 8px tall, fully rounded, on a #d9e8e3 track with a deep teal fill.",
      },
    },
    {
      name: "Soft Input",
      role: { zh: "添加任务与搜索", en: "Add-task fields and search" },
      construction: {
        zh: "白底、1px 主色 20% 描边、16px 圆角、padding 12px 16px、15px 字。占位符用灰 60%。聚焦时加 4px 的薄荷 50% 外环，不改变描边宽度。",
        en: "White fill, a 1px border at 20% primary, 16px radius, 12px 16px padding at 15px. The placeholder sits at 60% grey. Focus adds a 4px ring at 50% mint without changing the border width.",
      },
      states: "focus: 4px mint ring",
    },
    {
      name: "Category Chip",
      role: { zh: "分类与筛选标记", en: "Category and filter chips" },
      construction: {
        zh: "全圆角、padding 6px 12px、12px/500。四个分类各用一支柔色作 20% 底配主色文字：薄荷=生活、杏=截止、藕粉=个人、淡蓝=日程。选中态底色升到 100% 并保持深色文字。",
        en: "Fully rounded, 6px 12px padding at 12px/500. Each of four categories takes one soft tone as a 20% ground with dark text: mint for lifestyle, apricot for deadlines, blush for personal, pale blue for scheduling. Selection raises the ground to full while keeping dark text.",
      },
    },
    {
      name: "Bottom Sheet",
      role: { zh: "移动端底部弹层", en: "Mobile bottom sheet" },
      construction: {
        zh: "白底、顶部 20px 圆角、顶部 1px 主色 10% 描边、阴影 0 -12px 40px 墨青 12%。顶部中央放一个 36px × 4px 的灰色抓手。内边距 20px，内容区可滚动，最大高度 88vh。",
        en: "White fill, a 20px top radius, a 1px border at 10% primary along the top, shadow 0 -12px 40px at 12% ink teal. A 36px by 4px grey grabber sits centred at the top. Padding 20px, with a scrollable body capped at 88vh.",
      },
    },
  ],
  imagery: {
    zh: "以图标与少量插画为主。允许柔色几何图形作为分类标识。不使用摄影与背景图，移动工具里图像会挤掉信息。",
    en: "Icons and light illustration lead. Soft geometric shapes may serve as category markers. No photography or background images — in a mobile utility, imagery crowds out information.",
  },
  layout: {
    zh: "移动优先：单栏、上限 480px、内边距 20px、卡片间距 12px。桌面端居中为一列，宽度不超过 560px。底部固定操作条高 64px，内容区留出同等底部内边距。",
    en: "Mobile first: a single column capped at 480px with 20px padding and 12px between cards. On desktop it centres as one column no wider than 560px. A fixed 64px action bar sits at the bottom, with matching bottom padding reserved in the content.",
  },
  dos: [
    { zh: "主色深青，只用它承担行动与正文", en: "Deep teal carries actions and body copy, nothing else" },
    { zh: "圆角 12 到 16px", en: "Radius runs 12 to 16px" },
    { zh: "柔色只用于分类与状态", en: "Soft tones belong to categories and states" },
    { zh: "字重不超过 600", en: "Weights stay at 600 or below" },
    { zh: "动效 200ms，只改颜色", en: "Motion runs 200ms and changes color only" },
    { zh: "移动端单栏，上限 480px", en: "Single column on mobile, capped at 480px" },
  ],
  donts: [
    { zh: "不要用弹跳或夸张动效", en: "No bounce or exaggerated motion" },
    { zh: "不要让柔色承担正文", en: "Never let soft color carry body text" },
    { zh: "不要用超过 20px 的圆角", en: "No radius above 20px" },
    { zh: "不要用重阴影", en: "No heavy shadows" },
    { zh: "不要在同一屏用超过三种分类色", en: "No more than three category colors per screen" },
    { zh: "不要在移动端上多栏", en: "No multi-column layouts on mobile" },
  ],
  promptGuide: {
    quickColors: {
      text: "#203b40",
      background: "#f4f8f6",
      primary: "#2d5b63",
      mint: "#a9d8cc",
      apricot: "#f3c98b",
      muted: "#557077",
    },
    prompts: [
      {
        zh: "做一个柔和工具风任务卡：背景 #f4f8f6、1px rgba(45,91,99,0.15) 描边、16px 圆角、内边距 20px。左上 40px 见方的 #a9d8cc 图标块（12px 圆角），标题 17px/600 #203b40，说明 12px #557077。底部进度条高 8px、全圆角、底槽 #d9e8e3、填充 #2d5b63、宽度 66%。页面底色 #f4f8f6。",
        en: "Build a soft utility task card: background #f4f8f6, a 1px rgba(45,91,99,0.15) border, 16px radius, 20px padding. A 40px #a9d8cc icon tile on a 12px radius sits top-left above a 17px/600 title in #203b40 and a 12px caption in #557077. The progress bar below is 8px tall, fully rounded, on a #d9e8e3 track with a #2d5b63 fill at 66%. The page ground is #f4f8f6.",
      },
    ],
  },
  similar: [
    { name: "Soft UI", why: { zh: "同样柔软亲和，但 Soft UI 更装饰化、圆角更大", en: "Also soft and friendly, though Soft UI is more decorative with larger radii" } },
    { name: "Notion Style", why: { zh: "同为工具型，但 Notion 是文档而这里是移动效率", en: "Also a tool, though Notion is a document while this is a mobile utility" } },
  ],
  completeness: "full",
};
