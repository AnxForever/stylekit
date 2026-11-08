import type { DesignSpec } from "../types";

export const magazineGridSpec: DesignSpec = {
  slug: "magazine-grid",
  name: "杂志网格布局",
  nameEn: "Magazine Grid",
  cover: "/styles/magazine-grid.svg",
  theme: "light",
  northStar: {
    zh: "版面自己会说话：大块讲主故事，小块填次要，尺寸就是优先级。",
    en: "The layout does the talking: big blocks carry the lead story, small ones fill in, and size is priority.",
  },
  summary: {
    zh: "杂志网格把印刷版的版面逻辑搬到网页：用 grid-template-areas 画出不等大的区块，头条占 2×2，次条占 2×1，短讯占 1×1，读者一眼就知道什么最重要。它的三条纪律是——所有块不能同尺寸（那等于没有层级）、图片裁切比例必须统一（否则网格会歪）、正文段落绝不能加位移动画（阅读稳定性优先）。标题的 hover 只允许直接换色，不允许发光或阴影。",
    en: "Magazine Grid carries print layout logic onto the page: grid-template-areas draws blocks of unequal size, the lead takes 2×2, the second feature 2×1, briefs 1×1, and importance is legible at a glance. Three rules hold it — no two blocks may share a size, since that erases hierarchy; image crops must stay consistent or the grid warps; and body paragraphs never take displacement animation, because reading stability outranks flourish. Title hover only changes color, never glow or shadow.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#1a1a1a",
      group: "brand",
      role: {
        zh: "标题与正文。报纸式的深灰，长读不累。",
        en: "Headings and body — a newsprint dark grey, easy over long reading.",
      },
      token: "--color-ink",
    },
    {
      name: "纸",
      nameEn: "Paper",
      value: "#fafafa",
      group: "surface",
      role: {
        zh: "页面底。近白但不刺眼，让图片承担对比。",
        en: "The page ground — near white without glare, letting images carry contrast.",
      },
      token: "--color-paper",
    },
    {
      name: "正红",
      nameEn: "Red",
      value: "#e63946",
      group: "accent",
      role: {
        zh: "头条标记与栏目标签，是版面上最抢眼的色。",
        en: "Lead markers and section labels — the loudest color on the page.",
      },
      token: "--color-red",
    },
    {
      name: "青",
      nameEn: "Teal",
      value: "#2a9d8f",
      group: "accent",
      role: {
        zh: "次级分类与文化栏目。",
        en: "Secondary categories and culture sections.",
      },
      token: "--color-teal",
    },
    {
      name: "金",
      nameEn: "Gold",
      value: "#e9c46a",
      group: "accent",
      role: {
        zh: "引文底与高亮，用于标记值得单独读的一段。",
        en: "Pull-quote grounds and highlights, marking a passage worth reading alone.",
      },
      token: "--color-gold",
    },
    {
      name: "深蓝",
      nameEn: "Navy",
      value: "#264653",
      group: "accent",
      role: {
        zh: "深度报道与专题标签，出现频率低于红与青。",
        en: "Long reads and feature labels, used less than red and teal.",
      },
      token: "--color-navy",
    },
  ],
  fonts: [
    {
      family: "Playfair Display",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400, 700, 900],
      sizes: [16, 20, 28, 40, 56],
      lineHeight: { display: 1.05, heading: 1.15, body: 1.7 },
      tracking: { display: "-0.02em", label: "0.1em" },
      role: {
        zh: "标题用衬线。版面层级主要靠字号与栏宽，字体只需提供印刷感。",
        en: "Headings in serif. Hierarchy comes from size and column width; the face only supplies the print feel.",
      },
      token: "--font-serif",
    },
    {
      family: "Inter",
      substitute: "system-ui, 'Segoe UI', sans-serif",
      weights: [400, 500],
      sizes: [12, 13, 15],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.7 },
      tracking: { display: "0", label: "0.1em" },
      role: {
        zh: "正文、标签与元数据。无衬线正文与衬线标题的对照是杂志感的关键。",
        en: "Body, labels and metadata — the sans body against the serif heading is where the magazine feel lives.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", font: "Playfair Display", weight: 900, size: 56, lineHeight: 1.05, tracking: "-0.02em", token: "--text-display" },
    { role: "heading-lg", font: "Playfair Display", weight: 700, size: 40, lineHeight: 1.1, token: "--text-heading-lg" },
    { role: "heading", font: "Playfair Display", weight: 700, size: 28, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", font: "Playfair Display", weight: 400, size: 20, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body", font: "Inter", weight: 400, size: 15, lineHeight: 1.7, token: "--text-body" },
    { role: "label", font: "Inter", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.1em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1280,
    sectionGap: 64,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "8px" },
    { element: "buttons", value: "4px" },
    { element: "images", value: "4px" },
  ],
  surfaces: [
    { level: 0, name: "Paper", value: "#fafafa", purpose: "页面底" },
    { level: 1, name: "Card White", value: "#ffffff", purpose: "内容块" },
    { level: 2, name: "Gold Quote", value: "#e9c46a", purpose: "引文块" },
  ],
  elevation: [
    { name: "None", value: "none — the grid does the separating" },
    { name: "Card hover", value: "0 4px 16px rgba(26,26,26,0.08)" },
  ],
  components: [
    {
      name: "Lead Block",
      role: { zh: "头条区块（2×2）", en: "The lead block at 2×2" },
      construction: {
        zh: "占两列两行，含一张 16:9 大图（4px 圆角、固定裁切）与下方 40px/700 衬线标题、20px 导语（最多两行）。左上角放一个 12px 全大写 0.1em 的红色栏目标签。整块不加阴影。",
        en: "Two columns by two rows, holding a 16:9 image on a 4px radius with a fixed crop, then a 40px/700 serif headline and a 20px standfirst of two lines at most. A 12px uppercase 0.1em red section label sits top-left. No shadow anywhere on the block.",
      },
    },
    {
      name: "Brick Block",
      role: { zh: "次条与短讯区块", en: "Secondary and brief blocks" },
      construction: {
        zh: "1×1 或 2×1，图片固定 1:1 或 4:3（同尺寸块必须同比例）。标题 28px/700（1×1）或 28px/700（2×1），说明 15px、行高 1.7、最多三行。标签颜色按栏目固定：文化用青、深度用深蓝。",
        en: "1×1 or 2×1 with images locked to 1:1 or 4:3 — equal-sized blocks must share a ratio. Headline at 28px/700 in both cases, description at 15px on 1.7 leading, three lines at most. Label color is fixed by section: teal for culture, navy for long reads.",
      },
    },
    {
      name: "Pull Quote",
      role: { zh: "引文块", en: "The pull quote" },
      construction: {
        zh: "金色底（#e9c46a 的 25%）或纯金色块、4px 圆角、内边距 24px，引文用 28px 衬线斜体、行高 1.4，下方 13px 无衬线署名。只用于整版最值得单独读的一段，每屏最多一处。",
        en: "A gold ground (25% #e9c46a) or a solid gold block on a 4px radius with 24px padding. The quote runs 28px serif italic at 1.4 leading, with a 13px sans attribution beneath. Reserved for the one passage worth reading on its own, at most one per screen.",
      },
    },
    {
      name: "Section Label",
      role: { zh: "栏目与分类标签", en: "Section and category labels" },
      construction: {
        zh: "12px/500、全大写、字距 0.1em、无底无边框。颜色按栏目固定且全站不得混用：头条红、文化青、深度深蓝、评论墨。标签永远在标题上方 8px。",
        en: "12px/500, uppercase, 0.1em tracking, no ground and no border. Colors are fixed per section and never swapped: red for leads, teal for culture, navy for long reads, ink for opinion. The label always sits 8px above the headline.",
      },
    },
    {
      name: "Title Hover",
      role: { zh: "标题的 hover 规则", en: "The title hover rule" },
      construction: {
        zh: "hover 时只把标题颜色换成该栏目的强调色，过渡 120ms，不加下划线、不加阴影、不加发光、不做位移。这是整套风格对「利落」的定义。",
        en: "Hover changes the headline to its section's accent in 120ms — no underline, no shadow, no glow, no movement. That is this style's definition of crisp.",
      },
    },
  ],
  imagery: {
    zh: "新闻摄影与编辑类图像，必须统一裁切比例（大图 16:9、小图 1:1 或 4:3）。允许人物、场景与图表。不使用插画与装饰图形。",
    en: "News and editorial photography with locked crop ratios (16:9 for leads, 1:1 or 4:3 for small blocks). People, scenes and charts all work. No illustration or decorative graphics.",
  },
  layout: {
    zh: "上限 1280px、容器内边距 24px，主网格 4 列、间距 24px，用 grid-template-areas 显式定义版面。区块间距 64px。小于 1024px 时降到 2 列，小于 768px 时全部单列且头条不再跨列。",
    en: "Capped at 1280px with 24px padding over a four-column grid at 24px gutters, with grid-template-areas spelling out the layout. Sections sit 64px apart. Below 1024px it drops to two columns, and below 768px everything stacks with the lead no longer spanning.",
  },
  dos: [
    { zh: "用不等大的区块建立层级", en: "Build hierarchy with unequal blocks" },
    { zh: "同尺寸块必须同图片比例", en: "Equal blocks share one image ratio" },
    { zh: "标签颜色按栏目固定", en: "Fix label color per section" },
    { zh: "标题 hover 只换色，120ms", en: "Title hover changes color only, in 120ms" },
    { zh: "正文行高 1.7，段间 16px", en: "Body at 1.7 leading with 16px between paragraphs" },
    { zh: "移动端降列数并取消跨列", en: "Reduce columns on mobile and drop spans" },
  ],
  donts: [
    { zh: "不要让所有块同尺寸", en: "Never give every block one size" },
    { zh: "不要忽略移动端适配", en: "Do not skip mobile adaptation" },
    { zh: "不要拥挤到没有留白", en: "Do not overcrowd the grid" },
    { zh: "不要混用栏目标签颜色", en: "Do not mix section label colors" },
    { zh: "不要忽略图片裁切比例", en: "Do not ignore crop ratios" },
    { zh: "不要给正文加位移动画", en: "Never animate body text displacement" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1a1a",
      background: "#fafafa",
      card: "#ffffff",
      red: "#e63946",
      teal: "#2a9d8f",
      gold: "#e9c46a",
    },
    prompts: [
      {
        zh: "做一个杂志网格版面：4 列 grid、间距 24px、用 grid-template-areas 定义。头条占 2×2（16:9 大图 + 40px/700 衬线标题 + 两行 20px 导语 + 12px 全大写 0.1em 红色栏目标签）。其余为 1×1 或 2×1 的小块（1:1 或 4:3 图 + 28px/700 标题 + 15px/1.7 说明）。另放一个金色底（#e9c46a 25%）的引文块，28px 衬线斜体。标题 hover 只把颜色换成栏目强调色，transition 120ms，不加阴影不发散。",
        en: "Build a magazine grid: four columns at 24px gutters defined with grid-template-areas. The lead spans 2×2 (a 16:9 image, a 40px/700 serif headline, a two-line 20px standfirst, and a 12px uppercase 0.1em red section label). Remaining blocks are 1×1 or 2×1 (1:1 or 4:3 image, 28px/700 headline, 15px body on 1.7 leading). Add a pull quote on a 25% #e9c46a ground in 28px serif italic. Title hover changes only the color to its section accent over 120ms, with no shadow and no glow.",
      },
    ],
  },
  similar: [
    { name: "Editorial", why: { zh: "同为印刷来源，但编辑风更讲留白与单篇节奏，杂志网格更讲版面分配", en: "Both print-derived, though editorial emphasizes whitespace and single-article rhythm while this allocates a whole page" } },
    { name: "Bento Grid", why: { zh: "同样用不等大格子，但便当盒是现代产品语言，杂志是新闻编辑", en: "Both use unequal cells, though bento is modern product language while this is newsroom editing" } },
  ],
  completeness: "full",
};
