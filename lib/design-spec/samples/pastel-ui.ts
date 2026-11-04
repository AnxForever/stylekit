import type { DesignSpec } from "../types";

export const pastelUiSpec: DesignSpec = {
  slug: "pastel-ui",
  name: "粉彩应用风",
  nameEn: "Pastel UI",
  cover: "/styles/pastel-ui.svg",
  theme: "light",
  northStar: {
    zh: "暖奶油底上一层层淡色分组：友好，但每个字都读得清。",
    en: "Layered pastel groups on warm cream — friendly, with every word still legible.",
  },
  summary: {
    zh: "粉彩应用风是为移动端社区与内容应用设计的：暖奶油底（#fff8f0）承载全部内容，粉彩色（淡紫、薄荷、黄油、珊瑚）只用于分组与状态提示，绝不作为大面积装饰。文字用深紫（#66508f）与深灰（#332d3d）保证对比度，卡片与触控控件统一 16 到 24px 圆角。它把实用性写进规范——收藏、评分与快捷反馈必须放在内容决策点附近，触控目标不能过小，不能出现密集的横向表格，也不能让荧光色或高饱和渐变覆盖整页。",
    en: "Pastel UI is built for mobile community and content apps: a warm cream ground (#fff8f0) carries everything, while the pastels (lilac, mint, butter, coral) are used only for grouping and status. Text runs in deep violet (#66508f) and dark grey (#332d3d) to hold contrast, with cards and touch controls sharing 16 to 24px radii. Usability is written into the spec — save, rate and quick feedback sit near the decision point, targets are never too small, dense horizontal tables are excluded, and neither fluorescent color nor saturated gradients may cover the page.",
  },
  colors: [
    {
      name: "深紫",
      nameEn: "Deep Violet",
      value: "#66508f",
      group: "brand",
      role: {
        zh: "主色：主按钮、标签与链接。是粉彩里唯一足够深的颜色。",
        en: "The primary on buttons, labels and links — the only pastel deep enough to carry text.",
      },
      token: "--color-deep-violet",
    },
    {
      name: "暖奶油",
      nameEn: "Cream",
      value: "#fff8f0",
      group: "surface",
      role: {
        zh: "页面底。温暖的白，比纯白柔和。",
        en: "The page ground — a warm white, softer than pure.",
      },
      token: "--color-cream",
    },
    {
      name: "深灰",
      nameEn: "Ink",
      value: "#332d3d",
      group: "brand",
      role: {
        zh: "标题与正文。深到保证 4.5:1 以上的对比。",
        en: "Headings and body, dark enough to hold 4.5:1 or better.",
      },
      token: "--color-ink",
    },
    {
      name: "淡紫",
      nameEn: "Lilac",
      value: "#d9c7ff",
      group: "accent",
      role: {
        zh: "第一分组色，用于「精选」类区块底。",
        en: "The first grouping tone, on featured blocks.",
      },
      token: "--color-lilac",
    },
    {
      name: "薄荷",
      nameEn: "Mint",
      value: "#cbefdf",
      group: "accent",
      role: {
        zh: "第二分组色与成功状态。",
        en: "The second grouping tone and success.",
      },
      token: "--color-mint",
    },
    {
      name: "黄油",
      nameEn: "Butter",
      value: "#ffe49a",
      group: "accent",
      role: {
        zh: "提醒与收藏状态，只在小组件上出现。",
        en: "Reminders and saved states, on small components only.",
      },
      token: "--color-butter",
    },
    {
      name: "珊瑚",
      nameEn: "Coral",
      value: "#ffb5a7",
      group: "accent",
      role: {
        zh: "情感化反馈与聚焦环，出现频率最低。",
        en: "Emotional feedback and focus rings, used least.",
      },
      token: "--color-coral",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'PingFang SC', sans-serif",
      weights: [400, 600, 700],
      sizes: [12, 13, 15, 17, 21, 26],
      lineHeight: { display: 1.25, heading: 1.35, body: 1.6 },
      tracking: { display: "-0.01em", label: "0.16em" },
      role: {
        zh: "全站唯一字体。字级偏移动端（13 到 17px 为主），标签 12px 全大写 0.16em。",
        en: "The only face, sized for mobile at 13 to 17px, with 12px uppercase labels at 0.16em.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "heading", weight: 700, size: 26, lineHeight: 1.3, tracking: "-0.01em", token: "--text-heading" },
    { role: "subheading", weight: 600, size: 21, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 600, size: 17, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 15, lineHeight: 1.6, token: "--text-body" },
    { role: "body-sm", weight: 400, size: 13, lineHeight: 1.55, token: "--text-body-sm" },
    { role: "label", weight: 600, size: 12, lineHeight: 1.4, tracking: "0.16em", token: "--text-label" },
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
    { element: "cards", value: "24px" },
    { element: "buttons", value: "16px" },
    { element: "inputs", value: "16px" },
    { element: "pills", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Cream", value: "#fff8f0", purpose: "页面底" },
    { level: 1, name: "Mint Card", value: "#cbefdf", purpose: "内容卡" },
    { level: 2, name: "Lilac Block", value: "#d9c7ff", purpose: "精选区块" },
  ],
  elevation: [
    { name: "Soft", value: "0 4px 12px rgba(102,80,143,0.10)" },
    { name: "Button", value: "0 6px 16px rgba(102,80,143,0.20)" },
  ],
  components: [
    {
      name: "Pastel Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "深紫填充、白字、16px 圆角、无描边，15px/600、padding 12px 20px，阴影 0 6px 16px 紫 20%。hover 时上浮 2px；按下缩到 0.98。触控高度不小于 44px。过渡 200ms。",
        en: "Deep violet fill, white text, 16px radius, no border, 15px/600, 12px 20px padding, shadow 0 6px 16px at 20% violet. Hover lifts 2px; press scales 0.98. The touch height never drops below 44px. 200ms.",
      },
      sizes: "min-height 44px; padding 12px 20px",
      states: "hover: lift 2px; active: scale 0.98",
    },
    {
      name: "Group Card",
      role: { zh: "内容卡与分组块", en: "Content cards and group blocks" },
      construction: {
        zh: "粉彩填充（薄荷、淡紫或黄油之一）、24px 圆角、1px 深紫 10% 描边、内边距 20px，阴影 0 4px 12px 紫 10%。上方 12px 全大写 0.16em 的深紫 70% 标签，中间 21px/600 深灰标题，下方 13px 正文深灰 80%。一整块只用一种粉彩。",
        en: "A pastel fill (mint, lilac or butter), 24px radius, a 1px violet border at 10%, 20px padding, shadow 0 4px 12px at 10%. A 12px uppercase 0.16em label in 70% violet sits above a 21px/600 ink headline and 13px body in 80% ink. One block, one pastel.",
      },
    },
    {
      name: "Soft Field",
      role: { zh: "搜索与输入", en: "Search and inputs" },
      construction: {
        zh: "奶油填充、16px 圆角、1px 深紫 20% 描边、padding 12px 16px、15px 字，聚焦时加 4px 的珊瑚 40% 外环。占位符深灰 60%。",
        en: "Cream fill, 16px radius, a 1px violet border at 20%, 12px 16px padding at 15px, with focus adding a 4px ring at 40% coral. The placeholder sits at 60% ink.",
      },
    },
    {
      name: "Action Cluster",
      role: { zh: "决策点快捷操作", en: "Quick actions at the decision point" },
      construction: {
        zh: "横向三个 44px 的全圆按钮，间距 12px，分别用淡紫、薄荷、珊瑚的 30% 底配深紫图标。位置固定贴在内容卡的右下角或底部条，保证用户在读完内容时手就在那里。",
        en: "Three 44px circular buttons 12px apart on 30% lilac, mint and coral grounds with violet icons. They anchor to a content card's bottom-right or a bottom bar, so the hand is already there when the reading ends.",
      },
    },
    {
      name: "Bottom Sheet",
      role: { zh: "移动端底部弹层", en: "Mobile bottom sheet" },
      construction: {
        zh: "奶油底、顶部 24px 圆角、顶部 1px 深紫 10% 描边、阴影 0 -12px 40px 深紫 12%。顶部中央 36px × 4px 的深紫 20% 抓手。内边距 20px，最大高度 88vh。",
        en: "Cream fill, a 24px top radius, a 1px violet border at 10% along the top, shadow 0 -12px 40px at 12% violet. A 36px by 4px grabber in 20% violet sits centred at the top. Padding 20px with an 88vh cap.",
      },
    },
  ],
  imagery: {
    zh: "以图标、头像与轻量插画为主。允许粉彩几何图形作为分组标识。不使用深色大图与高饱和摄影，移动端的图像只用于识别而非装饰。",
    en: "Icons, avatars and light illustration lead, with pastel geometry marking groups. No large dark images or saturated photography — on mobile, imagery identifies rather than decorates.",
  },
  layout: {
    zh: "移动优先：单列、上限 480px、内边距 16px、卡片间距 12px、区块间距 32px。桌面端居中一列不加宽。底部固定操作条 64px，内容区留同等底部内边距。禁止横向表格。",
    en: "Mobile first: one column capped at 480px with 16px padding, 12px between cards and 32px between sections. Desktop centres the same column rather than widening it. A fixed 64px action bar sits at the bottom with matching reserved padding, and horizontal tables are excluded.",
  },
  dos: [
    { zh: "暖奶油底承载全部内容", en: "Warm cream carries all content" },
    { zh: "粉彩只用于分组与状态", en: "Pastels only for grouping and status" },
    { zh: "文字用深紫与深灰保证对比", en: "Text in deep violet and ink for contrast" },
    { zh: "触控目标不小于 44px", en: "Touch targets never below 44px" },
    { zh: "快捷操作贴着决策点", en: "Quick actions sit at the decision point" },
    { zh: "圆角 16 到 24px", en: "Radius runs 16 to 24px" },
  ],
  donts: [
    { zh: "不要用荧光色或高饱和渐变覆盖整页", en: "No fluorescent color or saturated gradient over the page" },
    { zh: "不要用过小的触控目标", en: "No undersized touch targets" },
    { zh: "不要用密集的横向表格", en: "No dense horizontal tables" },
    { zh: "不要让粉彩承担正文", en: "Never let a pastel carry body text" },
    { zh: "不要在桌面端加宽成多栏", en: "Do not widen into columns on desktop" },
    { zh: "不要在同一卡混两种粉彩", en: "Never mix two pastels in one card" },
  ],
  promptGuide: {
    quickColors: {
      text: "#332d3d",
      background: "#fff8f0",
      primary: "#66508f",
      lilac: "#d9c7ff",
      mint: "#cbefdf",
      coral: "#ffb5a7",
    },
    prompts: [
      {
        zh: "做一个粉彩应用风卡片：背景 #cbefdf、24px 圆角、1px rgba(102,80,143,0.1) 描边、内边距 20px、阴影 0 4px 12px rgba(102,80,143,0.1)。上方 12px 全大写 0.16em 的 rgba(102,80,143,0.7) 标签，中间 21px/600 #332d3d 标题，下方 13px 正文 rgba(51,45,61,0.8)。主按钮深紫 #66508f 填充、白字、16px 圆角、最小高度 44px。页面底色 #fff8f0，单列上限 480px，底部固定 64px 操作条。",
        en: "Build a pastel app card: #cbefdf fill, 24px radius, a 1px rgba(102,80,143,0.1) border, 20px padding, shadow 0 4px 12px rgba(102,80,143,0.1). A 12px uppercase 0.16em label in rgba(102,80,143,0.7) sits above a 21px/600 #332d3d heading and 13px body in rgba(51,45,61,0.8). The primary button fills #66508f with white text on a 16px radius, 44px minimum height. The page ground is #fff8f0 in one 480px column with a fixed 64px action bar.",
      },
    ],
  },
  similar: [
    { name: "Kawaii Minimal", why: { zh: "同样粉彩友好，但可爱极简更装饰化，粉彩应用更讲可用性", en: "Both pastel and friendly, though kawaii is decorative while pastel UI prioritizes usability" } },
    { name: "Soft Utility", why: { zh: "同为移动工具，但柔和工具用深青压阵，粉彩应用全靠淡色分组", en: "Both mobile tools, though soft utility anchors on deep teal while this groups entirely with pastels" } },
  ],
  completeness: "full",
};
