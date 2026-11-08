import type { DesignSpec } from "../types";

/**
 * Ninth sample: a document tool. Its defining constraint is negative — no
 * translation, no scale, no shadow jumps. A spec that can encode "what not to
 * animate" is a spec that can describe a reading surface.
 */
export const notionStyleSpec: DesignSpec = {
  slug: "notion-style",
  name: "Notion 风格",
  nameEn: "Notion Style",
  cover: "/styles/notion-style.svg",
  theme: "light",
  northStar: {
    zh: "米色纸面上的一篇文档，界面退到看不见，只剩内容。",
    en: "A document on beige paper: the chrome recedes until only the content is left.",
  },
  summary: {
    zh: "Notion 风格是为长时间阅读与写作服务的界面。它用一层米色纸面（#f7f6f3）代替纯白，把文字压到柔和的墨黑（#37352f），所有分隔只用极浅的 1px 线。交互的信噪比被刻意压到最低：hover 只让背景从 #f7f6f3 变到 #efedea，150ms 内完成，没有位移、没有缩放、没有阴影跳变——因为任何漂浮感都会破坏阅读的稳定。标志性的细节是拖拽手柄：hover 时从透明变为可见，提示「这块可以移动」，除此之外不加任何装饰。",
    en: "Notion Style exists for long reading and writing. A sheet of beige paper (#f7f6f3) replaces white, text sits in a soft ink (#37352f), and every separation is a very light 1px line. Interaction is deliberately low signal: hover only shifts the ground from #f7f6f3 to #efedea over 150ms, with no translation, no scale and no shadow jump — any floating sensation would break reading stability. The signature detail is the drag handle, fading from transparent to visible on hover to say 'this block can move', with nothing else added.",
  },
  colors: [
    {
      name: "墨黑",
      nameEn: "Ink",
      value: "#37352f",
      group: "brand",
      role: {
        zh: "正文、标题与图标。Notion 的墨色偏暖，纯黑会让纸面显得脏。",
        en: "Body, headings and icons. The ink is warm on purpose; pure black makes the paper look dirty.",
      },
      token: "--color-ink",
    },
    {
      name: "米纸",
      nameEn: "Paper",
      value: "#f7f6f3",
      group: "surface",
      role: {
        zh: "页面画布。整站默认背景，也是 hover 前后的基准色。",
        en: "Page canvas and the baseline every hover starts from.",
      },
      token: "--color-paper",
    },
    {
      name: "悬停灰",
      nameEn: "Hover Grey",
      value: "#efedea",
      group: "surface",
      role: {
        zh: "hover 与选中底色。只比纸面暗一点，做到「能感觉到但不打扰」。",
        en: "Hover and selection ground, only a shade darker than the paper — felt, not noticed.",
      },
      token: "--color-hover-grey",
    },
    {
      name: "边线",
      nameEn: "Hairline",
      value: "#e9e7e4",
      group: "neutral",
      role: {
        zh: "表格线、分隔线与输入框描边。永远 1px，永远这么浅。",
        en: "Table rules, dividers and input borders. Always 1px, always this light.",
      },
      token: "--color-hairline",
    },
    {
      name: "链接蓝",
      nameEn: "Link Blue",
      value: "#2eaadc",
      group: "accent",
      role: {
        zh: "链接与可点击引用。是整套系统里唯一明确跳出来的颜色。",
        en: "Links and clickable references — the one color that steps forward.",
      },
      token: "--color-link-blue",
    },
    {
      name: "标记红",
      nameEn: "Marker Red",
      value: "#eb5757",
      group: "accent",
      role: {
        zh: "删除与错误提示。出现即表示内容有风险。",
        en: "Deletion and errors. Its presence means content is at risk.",
      },
      token: "--color-marker-red",
    },
  ],
  fonts: [
    {
      family: "ui-sans-serif",
      substitute: "Inter, -apple-system, 'Segoe UI', 'PingFang SC', sans-serif",
      weights: [400, 500, 600],
      sizes: [12, 14, 16, 20, 24, 32],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.6 },
      tracking: { display: "-0.01em", label: "0.02em" },
      role: {
        zh: "全站唯一字体。系统栈优先，因为文档工具最重要的指标是渲染稳定。",
        en: "The only face. A system stack wins here because render stability matters most in a document tool.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 32, lineHeight: 1.2, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", weight: 600, size: 24, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", weight: 500, size: 20, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.02em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],
    maxWidth: 708,
    sectionGap: 48,
    cardPadding: 16,
    elementGap: 8,
  },
  radii: [
    { element: "cards", value: "4px" },
    { element: "buttons", value: "4px" },
    { element: "inputs", value: "4px" },
    { element: "pills", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Paper", value: "#f7f6f3", purpose: "页面画布" },
    { level: 1, name: "White Page", value: "#ffffff", purpose: "文档正文与弹层" },
    { level: 2, name: "Hover Grey", value: "#efedea", purpose: "hover 与选中行" },
  ],
  elevation: [
    { name: "None", value: "none" },
    { name: "Popover", value: "0 8px 24px rgba(15,15,15,0.12)" },
  ],
  components: [
    {
      name: "Block Row",
      role: { zh: "文档块、页面树与设置项", en: "Document blocks, page tree and settings rows" },
      construction: {
        zh: "透明底、无边框、4px 圆角、padding 4px 8px、行高 1.6、14px 字。hover 时背景变 #efedea，150ms 颜色过渡，不做任何位移。左侧拖拽手柄宽 16px，默认透明，hover 与聚焦时可见。",
        en: "Transparent fill, no border, 4px radius, 4px 8px padding, 1.6 line height at 14px. Hover shifts the ground to #efedea over a 150ms color transition with no translation. A 16px drag handle sits on the left, transparent by default and visible on hover or focus.",
      },
      states: "hover: ground #efedea; handle: transparent to visible",
    },
    {
      name: "Ghost Button",
      role: { zh: "工具栏按钮与次级行动", en: "Toolbar buttons and secondary actions" },
      construction: {
        zh: "透明底、无描边、4px 圆角、13px/500 字、padding 4px 8px、图标 16px 线性、与文字间距 6px。hover 背景 #efedea，按下 #e3e1db。禁止上浮与缩放，只变颜色，150ms。",
        en: "Transparent fill, no border, 4px radius, 13px type at weight 500, 4px 8px padding, a 16px line icon 6px from the label. Hover fills #efedea, press fills #e3e1db. No lift, no scale — color only, 150ms.",
      },
      states: "hover: #efedea; active: #e3e1db",
    },
    {
      name: "Inline Input",
      role: { zh: "行内编辑与搜索", en: "Inline editing and search" },
      construction: {
        zh: "透明底、无描边、padding 4px 8px、正文同字号。聚焦时只加一层 1px #e9e7e4 的底边线，不加外环、不改背景。占位符用 60% 墨色。",
        en: "Transparent fill, no border, 4px 8px padding at body size. Focus adds only a 1px #e9e7e4 bottom rule — no outer ring, no background change. Placeholder sits at 60% ink.",
      },
      states: "focus: 1px bottom rule only",
    },
    {
      name: "Callout Block",
      role: { zh: "提示、引用与说明块", en: "Callouts, quotes and notes" },
      construction: {
        zh: "浅灰底（#efedea）、4px 圆角、padding 12px 16px、左侧留 8px 图标位。文字 14px/1.6。允许一种柔和强调底色（蓝、黄、红任选其一），但同一页面只用一种。",
        en: "Pale ground (#efedea), 4px radius, 12px 16px padding, with an 8px icon slot on the left. Text at 14px/1.6. One soft accent ground is allowed — blue, yellow or red — but only one per page.",
      },
    },
  ],
  imagery: {
    zh: "几乎不用装饰性图像。允许内容截图、图表与嵌入的媒体块，且必须与文档同宽、直角或 4px 圆角。不使用背景图、插画与图标墙，它们会把纸面变成海报。",
    en: "Almost no decorative imagery. Content screenshots, charts and embedded media are fine as long as they match the document width and keep square or 4px corners. No background images, illustration or icon walls — those turn the paper into a poster.",
  },
  layout: {
    zh: "单栏、正文宽度 708px 上限、左右内边距 24px 到 96px。区块间距 48px，块内元素间距 8px。所有内容左对齐，标题不居中。允许侧边栏 240px 与正文并列，但正文宽度不随之缩小。",
    en: "Single column capped at 708px, with 24px to 96px of side padding. Sections sit 48px apart, elements inside a block 8px apart. Everything is left-aligned; headings are never centred. A 240px sidebar may sit alongside, but the text column does not shrink for it.",
  },
  dos: [
    {
      zh: "用米纸 #f7f6f3 做画布，正文墨色 #37352f",
      en: "Beige #f7f6f3 canvas, ink #37352f for text",
    },
    {
      zh: "hover 只变背景色，150ms，无位移无缩放",
      en: "Hover changes background color only, over 150ms, with no translation or scale",
    },
    {
      zh: "拖拽手柄 hover 时从透明变可见",
      en: "The drag handle fades from transparent to visible on hover",
    },
    {
      zh: "分隔线一律 1px #e9e7e4",
      en: "Every divider is 1px #e9e7e4",
    },
    {
      zh: "正文宽度 708px 上限，行长不超过 80 字符",
      en: "Cap the text column at 708px and the measure at 80 characters",
    },
    {
      zh: "圆角不超过 4px，除胶囊标签外",
      en: "Radius stays at 4px or below, except pill tags",
    },
  ],
  donts: [
    {
      zh: "不要用渐变背景",
      en: "No gradient backgrounds",
    },
    {
      zh: "不要用重阴影，除弹层外一律无阴影",
      en: "No heavy shadows; everything but popovers stays flat",
    },
    {
      zh: "不要用任何 translate 或 scale 动画",
      en: "No translate or scale animation at all",
    },
    {
      zh: "不要用 hover 边框或阴影跳变",
      en: "No border or shadow jumps on hover",
    },
    {
      zh: "不要用 8px 以上的圆角",
      en: "No radius above 8px",
    },
    {
      zh: "不要给按钮加上浮效果，文档没有漂浮感",
      en: "Never lift a button; a document has no floating",
    },
  ],
  promptGuide: {
    quickColors: {
      text: "#37352f",
      background: "#f7f6f3",
      page: "#ffffff",
      hover: "#efedea",
      border: "#e9e7e4",
      link: "#2eaadc",
    },
    prompts: [
      {
        zh: "做一个文档块列表：每行透明底、4px 圆角、padding 4px 8px、14px 字、行高 1.6。hover 时背景变 #efedea，transition-colors 150ms，不加位移与阴影。行左侧放一个 16px 宽的拖拽手柄（默认透明，hover 时可见）。页面底色 #f7f6f3，正文色 #37352f。",
        en: "Build a document block list: each row transparent, 4px radius, 4px 8px padding, 14px type at 1.6 line height. Hover shifts the background to #efedea with a 150ms color transition and adds no translation or shadow. A 16px drag handle sits on the left, transparent until hover. The page ground is #f7f6f3 with #37352f text.",
      },
    ],
  },
  similar: [
    {
      name: "Bear",
      why: {
        zh: "同样的纸面阅读感与极低对比的交互反馈",
        en: "Same paper reading feel and minimal-contrast interaction feedback",
      },
    },
    {
      name: "Linear",
      why: {
        zh: "同样禁止位移与缩放，但 Linear 用暗色与更强的主色",
        en: "Also forbids translation and scale, though Linear goes dark with a stronger primary",
      },
    },
  ],
  completeness: "full",
};
