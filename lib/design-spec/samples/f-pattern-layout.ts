import type { DesignSpec } from "../types";

export const fPatternLayoutSpec: DesignSpec = {
  slug: "f-pattern-layout",
  name: "F 型布局",
  nameEn: "F-Pattern Layout",
  cover: "/styles/f-pattern-layout.svg",
  theme: "light",
  northStar: {
    zh: "按眼动轨迹排版：先横扫顶部，再下移横扫，最后沿左缘直落。",
    en: "Lay out to the eye: sweep the top, sweep again lower, then drop down the left edge.",
  },
  summary: {
    zh: "F 型布局来自眼动研究：读者先横向扫过顶部，再往下横扫一次，最后沿左边缘纵向跳读，轨迹像字母 F。所以它把最重要的信息放在顶部两行、把关键词放在每段的句首、把行宽压到 65 到 75 字符。视觉上它必须安静：白底、深色标题、极少的强调色，因为任何装饰都会打断扫描。它的价值不在好看，而在让一屏能多读 30% 的内容——适合文档、博客、新闻列表与长页说明。",
    en: "F-Pattern comes from eye-tracking research: readers sweep the top horizontally, sweep again lower, then scan vertically down the left edge, tracing an F. So it puts the most important material in the top two rows, starts every paragraph with its keyword, and caps the measure at 65 to 75 characters. Visually it must stay quiet — a white ground, dark headings and very few accents — because ornament interrupts scanning. Its value is not beauty but throughput: roughly thirty percent more content per screen, which makes it fit documentation, blogs, news lists and long explanations.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#1a1a2e",
      group: "brand",
      role: {
        zh: "标题与正文。深而不黑，长读不刺眼。",
        en: "Headings and body — deep without being black, easier over long reads.",
      },
      token: "--color-ink",
    },
    {
      name: "纸白",
      nameEn: "Paper",
      value: "#f8f9fa",
      group: "surface",
      role: {
        zh: "页面底。极浅的冷白，让文字对比最大化。",
        en: "Page ground — a very pale cool white that maximises text contrast.",
      },
      token: "--color-paper",
    },
    {
      name: "朱",
      nameEn: "Vermilion",
      value: "#e63946",
      group: "accent",
      role: {
        zh: "唯一的高强调，用于关键结论与必须被扫到的词。",
        en: "The single high emphasis, for key conclusions and words that must be caught.",
      },
      token: "--color-vermilion",
    },
    {
      name: "钢蓝",
      nameEn: "Steel Blue",
      value: "#457b9d",
      group: "accent",
      role: {
        zh: "链接与次级标题，扫读时次要但仍需可见。",
        en: "Links and secondary headings — visible during scanning but clearly second tier.",
      },
      token: "--color-steel-blue",
    },
    {
      name: "松绿",
      nameEn: "Pine",
      value: "#2a9d8f",
      group: "accent",
      role: {
        zh: "成功与「可执行」提示，出现频率低。",
        en: "Success and actionable hints, used sparingly.",
      },
      token: "--color-pine",
    },
    {
      name: "沙金",
      nameEn: "Sand",
      value: "#e9c46a",
      group: "accent",
      role: {
        zh: "行内高亮，用于标记一段里的关键短语。",
        en: "Inline highlight, marking the pivotal phrase inside a block.",
      },
      token: "--color-sand",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 14, 16, 20, 28, 36],
      lineHeight: { display: 1.15, heading: 1.3, body: 1.7 },
      tracking: { display: "-0.02em", label: "0.06em" },
      role: {
        zh: "全站唯一字体。层级靠四级字号加两档字重建立，不靠颜色。",
        en: "The only face. Hierarchy comes from four sizes and two weights, never from color.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 36, lineHeight: 1.15, tracking: "-0.02em", token: "--text-display" },
    { role: "heading-lg", weight: 700, size: 28, lineHeight: 1.25, tracking: "-0.01em", token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 20, lineHeight: 1.35, token: "--text-heading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.7, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.7, token: "--text-body" },
    { role: "label", weight: 600, size: 12, lineHeight: 1.4, tracking: "0.06em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "comfortable",
    scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],
    maxWidth: 760,
    sectionGap: 48,
    cardPadding: 20,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "8px" },
    { element: "buttons", value: "6px" },
    { element: "inputs", value: "6px" },
    { element: "tags", value: "4px" },
  ],
  surfaces: [
    { level: 0, name: "Paper", value: "#f8f9fa", purpose: "页面底" },
    { level: 1, name: "White Card", value: "#ffffff", purpose: "列表项与引用块" },
  ],
  elevation: [
    { name: "None", value: "none — separation comes from rules and spacing" },
    { name: "Card hover", value: "0 2px 8px rgba(26,26,46,0.06)" },
  ],
  components: [
    {
      name: "Scan Header",
      role: { zh: "页面顶部标题区（F 的顶横）", en: "The page header — the F's top bar" },
      construction: {
        zh: "标题 36px/700 单行、行宽不超过 34 字符；其下 16px 导语最多两行；再下一条 1px #e2e8f0 横线。整块左对齐，顶部内边距 48px。关键词放在标题前三个词内。",
        en: "A 36px/700 heading on one line, no wider than 34 characters, followed by a 16px standfirst of two lines at most, then a 1px #e2e8f0 rule. The block is flush left with 48px of top padding, and the keyword sits within the first three words.",
      },
    },
    {
      name: "Scan Row",
      role: { zh: "横向扫描行（F 的中横）", en: "A horizontal scan row — the F's middle bar" },
      construction: {
        zh: "三到四项横向排列，每项：12px 全大写标签在上、20px/600 标题在中、14px 摘要在下（最多两行）。项与项之间 32px 间距，整行高度不超过 160px。左对齐，不居中。",
        en: "Three or four items in a row, each carrying a 12px uppercase label above a 20px/600 heading above a 14px summary of two lines at most. Items sit 32px apart and the whole row stays under 160px tall. Flush left, never centred.",
      },
    },
    {
      name: "Article List",
      role: { zh: "纵向列表（F 的竖笔）", en: "The vertical list — the F's stem" },
      construction: {
        zh: "每行左侧有一条 2px 宽、48px 高的强调色竖条（可取朱、钢蓝或松绿），右侧是 16px/600 标题与 14px 摘要。行高 88px、行间 1px #e2e8f0 分隔。hover 时竖条加宽到 4px、背景转白。",
        en: "Each row opens with a 2px accent bar, 48px tall, in vermilion, steel blue or pine, followed by a 16px/600 title and a 14px summary. Rows are 88px tall, divided by 1px #e2e8f0 rules. Hover widens the bar to 4px and turns the ground white.",
      },
      states: "hover: bar 2px→4px, ground white",
    },
    {
      name: "Inline Highlight",
      role: { zh: "行内高亮与关键词标记", en: "Inline highlights and keyword marks" },
      construction: {
        zh: "淡沙金底（#e9c46a 的 35%）、无圆角、padding 0 2px，只在行内使用，不加粗。整篇文章的高亮不超过三处，否则扫读会失去锚点。",
        en: "A pale sand ground (35% #e9c46a), no radius, 0 2px padding, inline only and never bold. No more than three highlights per article, or scanning loses its anchors.",
      },
    },
    {
      name: "Measure Column",
      role: { zh: "正文列宽容器", en: "The reading measure" },
      construction: {
        zh: "最大宽度 760px、正文行宽控制在 65 到 75 字符（约 34em）。左内边距 0、右内边距留白；段间距 20px，段首不缩进。禁止把正文居中。",
        en: "Capped at 760px with the text measure held between 65 and 75 characters (about 34em). No left indent, whitespace to the right, 20px between paragraphs and no first-line indent. Body copy is never centred.",
      },
    },
  ],
  imagery: {
    zh: "以文字为主，图像必须服务于扫读：图表、截图、缩略图（统一 16:10）。不使用装饰性大图与背景图，它们会把 F 的轨迹切断。",
    en: "Text leads, and any image must serve scanning: charts, screenshots, thumbnails at a uniform 16:10. No decorative hero imagery or background images — both cut the F trace.",
  },
  layout: {
    zh: "上限 760px 单栏、容器内边距 24px，区块间距 48px。页面结构固定为：顶横（标题加导语）→ 中横（三到四项）→ 竖笔（列表）。重要内容永远在左上，右下角只放次要信息。",
    en: "A single 760px column with 24px padding, sections 48px apart. The structure is fixed: top bar (heading and standfirst), middle bar (three or four items), then the stem (a list). Important content always sits top-left, and the bottom-right corner carries only secondary material.",
  },
  dos: [
    { zh: "关键词放在标题前三个词", en: "Put the keyword in the first three words of the heading" },
    { zh: "正文行宽 65 到 75 字符", en: "Keep the measure between 65 and 75 characters" },
    { zh: "每段首句承担结论", en: "Let each paragraph's first sentence carry the conclusion" },
    { zh: "强调色只用于必须被扫到的词", en: "Accents go only on words that must be caught" },
    { zh: "重要内容放左上", en: "Important content stays top-left" },
    { zh: "用标题层级、列表与分段提升可扫描性", en: "Use heading levels, lists and short paragraphs for scannability" },
  ],
  donts: [
    { zh: "不要把重要内容放右下角", en: "Never put important content bottom-right" },
    { zh: "不要居中大段文字", en: "Never centre long text" },
    { zh: "不要忽视内容优先级", en: "Do not ignore content priority" },
    { zh: "不要写没有分段的长文", en: "No long unsegmented paragraphs" },
    { zh: "不要在左侧留过多空白", en: "Do not leave excess whitespace on the left" },
    { zh: "不要用超过三处高亮", en: "No more than three highlights" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1a2e",
      background: "#f8f9fa",
      accent: "#e63946",
      link: "#457b9d",
      success: "#2a9d8f",
      highlight: "#e9c46a",
    },
    prompts: [
      {
        zh: "做一个 F 型布局的文章页：单栏上限 760px、正文 16px/1.7、行宽 34em、左对齐。顶部 36px/700 标题（关键词在前三个词）加两行导语加 1px #e2e8f0 横线；中部放三列扫描行（每列 12px 全大写标签 + 20px/600 标题 + 14px 两行摘要）；下部是文章列表，每行左侧 2px 强调色竖条（48px 高）、右侧 16px/600 标题与 14px 摘要，行间 1px 分隔线。",
        en: "Build an F-pattern article page: a single column capped at 760px, body at 16px/1.7 with a 34em measure, flush left. The top holds a 36px/700 heading (keyword first) with a two-line standfirst and a 1px #e2e8f0 rule; the middle is a three-column scan row (12px uppercase label, 20px/600 heading, 14px two-line summary each); below is an article list where every row opens with a 2px accent bar 48px tall beside a 16px/600 title and 14px summary, divided by 1px rules.",
      },
    ],
  },
  similar: [
    { name: "Editorial", why: { zh: "同样重视字号层级与阅读节奏，但编辑风更重视觉表现", en: "Also weights type hierarchy and reading rhythm, though editorial cares more about visual expression" } },
    { name: "Data Dense", why: { zh: "同样追求单位屏信息量，但数据密集靠表格而非扫读轨迹", en: "Also maximises information per screen, though dense data uses tables rather than scan paths" } },
  ],
  completeness: "full",
};
