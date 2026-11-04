import type { DesignSpec } from "../types";

export const distillStyleSpec: DesignSpec = {
  slug: "distill-style",
  name: "学术科普风",
  nameEn: "Distill Style",
  cover: "/styles/distill-style.svg",
  theme: "light",
  northStar: {
    zh: "一条窄衬线栏讲论证，边注放旁白，图表突破版心放证据。",
    en: "A narrow serif column carries the argument, sidenotes carry asides, figures break the measure to carry evidence.",
  },
  summary: {
    zh: "学术科普风以 Distill.pub 为范式：正文是 42rem 宽的窄衬线栏、行高 1.75，边注（sidenote）在大屏上绝对定位悬浮到右缘、小屏折叠为浅灰内联块，图表则突破版心到 64rem 居中展示证据。它的规则严格到近乎期刊——分割只用 1px 的 hairline，表格用 booktabs 风格（上下两条粗横线加表头细线，绝无竖线与斑马纹），引用用上标编号配参考文献，颜色只有两种职能：学术蓝给链接与引用，图表橙给数据强调。",
    en: "Distill Style takes Distill.pub as its model: a 42rem serif column at 1.75 leading, sidenotes absolutely positioned into the right margin on wide screens and collapsed to inline grey blocks on narrow ones, and figures breaking the measure to 64rem where the evidence sits. Its rules approach a journal's — separation uses 1px hairlines only, tables follow booktabs (two heavy top and bottom rules plus a thin header line, never verticals or zebra striping), citations run as superscript numbers resolved in a reference list, and color has two jobs only: academic blue for links and citations, chart orange for data emphasis.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#1f2933",
      group: "brand",
      role: {
        zh: "正文与标题。深灰蓝，比纯黑更适合长文。",
        en: "Body and headings — deep grey-blue, better than black for long text.",
      },
      token: "--color-ink",
    },
    {
      name: "纸白",
      nameEn: "Paper",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "页面底。纯白无纹理，论文不需要气氛。",
        en: "The page ground — pure white and untextured, since a paper needs no atmosphere.",
      },
      token: "--color-paper",
    },
    {
      name: "学术蓝",
      nameEn: "Academic Blue",
      value: "#2a7ae2",
      group: "accent",
      role: {
        zh: "链接、上标引用与关键强调。只有这三个用途。",
        en: "Links, superscript citations and key emphasis — only these three uses.",
      },
      token: "--color-academic-blue",
    },
    {
      name: "图表橙",
      nameEn: "Chart Orange",
      value: "#e4572e",
      group: "accent",
      role: {
        zh: "数据强调与图表主序列，绝不用于界面装饰。",
        en: "Data emphasis and the lead chart series — never on interface decoration.",
      },
      token: "--color-chart-orange",
    },
    {
      name: "次灰",
      nameEn: "Muted Grey",
      value: "#6b7280",
      group: "neutral",
      role: {
        zh: "图注、边注与元信息。永远是第三层级。",
        en: "Captions, sidenotes and metadata — always the third tier.",
      },
      token: "--color-muted-grey",
    },
    {
      name: "浅灰块",
      nameEn: "Grey Block",
      value: "#f3f4f6",
      group: "surface",
      role: {
        zh: "小屏的边注折叠块与代码块底。",
        en: "Collapsed sidenote blocks on narrow screens, and code grounds.",
      },
      token: "--color-grey-block",
    },
  ],
  fonts: [
    {
      family: "Source Serif",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400, 600],
      sizes: [13, 15, 17, 21, 28, 36],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.75 },
      tracking: { display: "-0.01em", label: "0.06em" },
      role: {
        zh: "正文与标题必须衬线。行高 1.75 是长文可读性的下限，不可压缩。",
        en: "Body and headings must be serif. The 1.75 leading is the floor for long reading and never compresses.",
      },
      token: "--font-serif",
    },
    {
      family: "Inter",
      substitute: "system-ui, sans-serif",
      weights: [400, 500],
      sizes: [12, 13],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.6 },
      tracking: { display: "0", label: "0.06em" },
      role: {
        zh: "仅用于 UI 控件标签与元信息。正文绝不使用无衬线。",
        en: "Confined to UI control labels and metadata. Body copy never goes sans.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", font: "Source Serif", weight: 600, size: 36, lineHeight: 1.2, tracking: "-0.01em", token: "--text-display" },
    { role: "heading-lg", font: "Source Serif", weight: 600, size: 28, lineHeight: 1.25, token: "--text-heading-lg" },
    { role: "heading", font: "Source Serif", weight: 600, size: 21, lineHeight: 1.35, token: "--text-heading" },
    { role: "body-lg", font: "Source Serif", weight: 400, size: 17, lineHeight: 1.75, token: "--text-body-lg" },
    { role: "body", font: "Source Serif", weight: 400, size: 15, lineHeight: 1.75, token: "--text-body" },
    { role: "label", font: "Inter", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.06em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "comfortable",
    scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],
    maxWidth: 672,
    sectionGap: 64,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "6px" },
    { element: "buttons", value: "4px" },
    { element: "figures", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Paper", value: "#ffffff", purpose: "页面底" },
    { level: 1, name: "Grey Block", value: "#f3f4f6", purpose: "代码与折叠边注" },
  ],
  elevation: [
    { name: "None", value: "none — hairlines and whitespace do the work" },
    { name: "Max allowed", value: "0 1px 2px rgba(31,41,51,0.05)" },
  ],
  components: [
    {
      name: "Reading Column",
      role: { zh: "正文窄栏（核心结构）", en: "The reading column — the core structure" },
      construction: {
        zh: "max-width 42rem（672px）、左右各 24px 内边距、居中。正文 17px 衬线、行高 1.75、段间距 24px、段首不缩进。绝不允许正文全宽铺满——全宽只属于图表。",
        en: "max-width 42rem (672px) centred with 24px side padding. Body at 17px serif on 1.75 leading, 24px between paragraphs, no first-line indent. Body copy never runs full width — full width belongs to figures.",
      },
      sizes: "42rem measure",
    },
    {
      name: "Sidenote",
      role: { zh: "边注（旁白）", en: "The sidenote aside" },
      construction: {
        zh: "大屏（1280px 以上）绝对定位到正文右缘外侧 24px、宽 200px、12px 灰字、行高 1.5；小屏折叠为正文内的浅灰块（#f3f4f6）、4px 圆角、内边距 12px、12px 灰字。锚点用上标数字。",
        en: "Above 1280px it positions absolutely 24px outside the column's right edge at 200px wide in 12px grey on 1.5 leading; on narrow screens it collapses into an inline grey block (#f3f4f6) on a 4px radius with 12px padding. A superscript number anchors it.",
      },
    },
    {
      name: "Evidence Figure",
      role: { zh: "图表（突破版心）", en: "The figure that breaks the measure" },
      construction: {
        zh: "max-width 64rem（1024px）、居中，比正文宽出一倍。图注 13px 灰、以「图 N：」开头，与图之间 12px。图表区域零圆角、无边框。这是唯一允许突破版心的元素。",
        en: "max-width 64rem (1024px), centred, twice the column's width. The caption runs 13px grey, opening with 'Figure N:' and sitting 12px under the figure. The figure area takes zero radius and no border. It is the only element allowed to break the measure.",
      },
    },
    {
      name: "Booktabs Table",
      role: { zh: "booktabs 风格表格", en: "A booktabs table" },
      construction: {
        zh: "顶部 2px 墨色横线、表头下 1px 墨色横线、底部 2px 墨色横线，中间绝无竖线与斑马纹。单元格内边距 8px 12px、14px 衬线，数值列右对齐并用等宽数字。",
        en: "A 2px ink rule on top, a 1px rule under the header, a 2px rule at the bottom, and absolutely no verticals or zebra striping between them. Cells pad 8px 12px at 14px serif, with numeric columns right-aligned in tabular figures.",
      },
    },
    {
      name: "Citation Sup",
      role: { zh: "上标引用", en: "The superscript citation" },
      construction: {
        zh: "正文后跟 12px 上标数字（学术蓝、不换行、与正文间距 2px），文末参考文献列按编号排列，每条 13px、含标题与出处。点击上标跳转到条目并高亮 2 秒。",
        en: "A 12px superscript number in academic blue, non-breaking, 2px off the preceding word, resolved in a numbered reference list at the end where each entry runs 13px with title and source. Clicking scrolls to the entry and highlights it for two seconds.",
      },
    },
  ],
  imagery: {
    zh: "图表即图像：散点、折线、网络、注意力热图，必须带坐标轴与图注。允许作者照片。不使用装饰摄影、插画与背景图，气氛在这套语言里没有位置。",
    en: "Charts are the imagery: scatter, line, network, attention heatmaps, each with axes and a caption. Author photos are fine. No decorative photography, illustration or backgrounds — atmosphere has no standing here.",
  },
  layout: {
    zh: "正文版心 42rem、图表 64rem、页面上限 1024px。区块间距 64px，标题上方留 48px。分割一律 1px #e5e7eb 的 hairline。整页单栏，不做侧栏导航。",
    en: "A 42rem text measure, 64rem figures, and a 1024px page cap. Sections sit 64px apart with 48px above each heading. Every separation is a 1px #e5e7eb hairline. The page is one column with no side navigation.",
  },
  dos: [
    { zh: "正文窄栏 42rem、行高 1.75", en: "A 42rem text column at 1.75 leading" },
    { zh: "正文必须衬线，无衬线只给 UI", en: "Body must be serif; sans only for UI" },
    { zh: "边注在大屏浮到右缘、小屏折叠", en: "Sidenotes float right when wide, collapse when narrow" },
    { zh: "图表突破版心到 64rem", en: "Figures break out to 64rem" },
    { zh: "表格用 booktabs，无竖线无斑马纹", en: "Booktabs tables with no verticals or stripes" },
    { zh: "分割只用 1px hairline", en: "Separation uses 1px hairlines only" },
  ],
  donts: [
    { zh: "不要用任何渐变", en: "No gradients anywhere" },
    { zh: "不要用重阴影", en: "No heavy shadows" },
    { zh: "不要用大圆角", en: "No large radii" },
    { zh: "不要让正文全宽铺满", en: "Never run body copy full width" },
    { zh: "不要用多彩装饰与大色块", en: "No colorful decoration or large blocks" },
    { zh: "不要给表格加竖线与斑马纹", en: "Never add verticals or zebra striping to tables" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1f2933",
      background: "#ffffff",
      accent: "#2a7ae2",
      chart: "#e4572e",
      muted: "#6b7280",
      rule: "#e5e7eb",
    },
    prompts: [
      {
        zh: "做一个学术科普页面：正文栏 max-width 42rem、居中、17px 衬线、行高 1.75、段间距 24px。标题层级 36px/28px/21px 衬线。图表区 max-width 64rem 居中、零圆角，图注 13px #6b7280、以「图 N：」开头。表格用 booktabs：顶部 2px、表头下 1px、底部 2px 的 #1f2933 横线，无竖线无斑马纹。上标引用用 12px #2a7ae2。所有分割用 1px #e5e7eb。页面底色 #ffffff。",
        en: "Build an academic explainer page: a 42rem body column, centred, 17px serif on 1.75 leading with 24px between paragraphs. Headings run 36, 28 and 21px serif. Figures cap at 64rem centred with zero radius and a 13px #6b7280 caption opening with 'Figure N:'. Tables follow booktabs: 2px top, 1px under the header, 2px bottom, all in #1f2933, with no verticals or stripes. Citations are 12px superscript in #2a7ae2. Every separation is a 1px #e5e7eb hairline. The page ground is #ffffff.",
      },
    ],
  },
  similar: [
    { name: "Editorial", why: { zh: "同为衬线阅读体验，但编辑风更重视觉表现，学术风更重证据结构", en: "Both serif reading experiences, though editorial cares about visual expression while this cares about evidence" } },
    { name: "F-Pattern Layout", why: { zh: "同样服务长文扫读，但 F 型用层级压缩，学术风用窄栏与边注", en: "Both serve long-form scanning, though F-pattern compresses hierarchy while this uses measure and sidenotes" } },
  ],
  completeness: "full",
};
