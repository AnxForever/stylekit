import type { DesignSpec } from "../types";

export const brutalistWebSpec: DesignSpec = {
  slug: "brutalist-web",
  name: "网页粗野主义",
  nameEn: "Web Brutalism",
  cover: "/styles/brutalist-web.svg",
  theme: "light",
  northStar: {
    zh: "回到 1993 年的 HTML：系统字体、蓝下划线链接、纯白底、零装饰。",
    en: "Back to 1993 HTML: system fonts, blue underlined links, pure white, zero decoration.",
  },
  summary: {
    zh: "网页粗野主义不是「难看」，而是拒绝被设计：纯白底（#ffffff）、系统字体栈（无衬线正文配 Times New Roman 标题）、蓝色 #0000ff 下划线链接作为唯一交互语言、1px 实线边框做结构、零圆角、零阴影、零渐变与背景图、间距压到最小。它的价值判断是内容优先于形式——任何为了好看而增加的东西都被视为负担。这也是它与新野兽派的区别：新野兽派靠粗边与硬阴影造风格，网页粗野主义连风格都不要。",
    en: "Web Brutalism is not ugliness but a refusal to be designed: pure white (#ffffff), system font stacks with a sans body under a Times New Roman heading, blue #0000ff underlined links as the only interaction language, 1px solid borders for structure, zero radius, zero shadow, no gradients or background images, and spacing compressed to a minimum. Its judgment is that content outranks form — anything added to look better counts as a burden. That is also what separates it from neo-brutalism: neo-brutalism manufactures a look from heavy borders and hard shadows, while web brutalism refuses the look entirely.",
  },
  colors: [
    {
      name: "黑",
      nameEn: "Black",
      value: "#000000",
      group: "brand",
      role: {
        zh: "正文与标题。纯黑，不做灰度修饰。",
        en: "Body and headings — pure black with no greyscale softening.",
      },
      token: "--color-black",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "所有区块的底。纯白，绝不用米色或灰白。",
        en: "The ground for every section — pure white, never cream or off-white.",
      },
      token: "--color-white",
    },
    {
      name: "链接蓝",
      nameEn: "Link Blue",
      value: "#0000ff",
      group: "accent",
      role: {
        zh: "唯一的主交互色。未访问链接用它，访问后转 #551a8b。",
        en: "The only interaction color: unvisited links use it, visited links turn #551a8b.",
      },
      token: "--color-link-blue",
    },
    {
      name: "红",
      nameEn: "Red",
      value: "#ff0000",
      group: "accent",
      role: {
        zh: "警告与错误，浏览器默认语义。",
        en: "Warnings and errors — the browser's default semantics.",
      },
      token: "--color-red",
    },
    {
      name: "绿",
      nameEn: "Green",
      value: "#008000",
      group: "accent",
      role: {
        zh: "成功与「OK」，同样来自浏览器默认。",
        en: "Success and OK, again from the browser's defaults.",
      },
      token: "--color-green",
    },
    {
      name: "品红",
      nameEn: "Magenta",
      value: "#d60099",
      group: "accent",
      role: {
        zh: "已访问链接的变体与特殊标记，出现频率极低。",
        en: "A visited-link variant and special marks, used very rarely.",
      },
      token: "--color-magenta",
    },
  ],
  fonts: [
    {
      family: "Times New Roman",
      substitute: "'Songti SC', Georgia, serif",
      weights: [400, 700],
      sizes: [16, 20, 24, 32, 40],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.5 },
      tracking: { display: "0", label: "0" },
      role: {
        zh: "标题用衬线，浏览器默认字体。不加字距、不做字重处理，因为 1993 年没有这些。",
        en: "Headings in a serif — the browser default. No tracking, no weight tuning, since neither existed in 1993.",
      },
      token: "--font-serif",
    },
    {
      family: "system-ui",
      substitute: "'Segoe UI', Arial, Helvetica, sans-serif",
      weights: [400, 700],
      sizes: [14, 16, 18],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.5 },
      tracking: { display: "0", label: "0" },
      role: {
        zh: "正文用系统无衬线栈或等宽。默认、无修饰、随系统变化。",
        en: "Body uses the system sans stack or monospace — default, unadorned, varying by machine.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", font: "Times New Roman", weight: 700, size: 40, lineHeight: 1.15, token: "--text-display" },
    { role: "heading", font: "Times New Roman", weight: 700, size: 32, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", font: "Times New Roman", weight: 700, size: 24, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", font: "system-ui", weight: 400, size: 18, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", font: "system-ui", weight: 400, size: 16, lineHeight: 1.5, token: "--text-body" },
    { role: "label", font: "system-ui", weight: 400, size: 14, lineHeight: 1.4, token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32],
    maxWidth: 720,
    sectionGap: 24,
    cardPadding: 12,
    elementGap: 8,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "White", value: "#ffffff", purpose: "所有区块" },
    { level: 1, name: "Nothing", value: "none", purpose: "没有第二层" },
  ],
  elevation: [{ name: "None", value: "none — shadows are forbidden" }],
  components: [
    {
      name: "Bare Link",
      role: { zh: "链接（唯一交互语言）", en: "The link — the only interaction language" },
      construction: {
        zh: "内联文本、色 #0000ff、带下划线（text-decoration: underline）、无背景无边框无过渡。hover 时保持同样样式（浏览器默认行为即可），不加上划线、不改透明、不做位移。已访问转 #551a8b。",
        en: "Inline text in #0000ff with a real underline, no background, no border, no transition. Hover keeps the same appearance — the browser default is enough — adding no overline, changing no opacity, moving nothing. Visited links turn #551a8b.",
      },
    },
    {
      name: "Bare Button",
      role: { zh: "提交按钮", en: "Submit button" },
      construction: {
        zh: "浏览器默认按钮外观（或 1px 实线黑边加白底）、零圆角、14px 系统字体、padding 4px 12px。不加悬停动画、不加阴影。它的「朴素」是刻意的。",
        en: "The browser's default button appearance, or a 1px solid black border on white, zero radius, 14px system font, 4px 12px padding. No hover animation, no shadow. Its plainness is deliberate.",
      },
      states: "hover: no change; active: default pressed state only",
    },
    {
      name: "Rule Block",
      role: { zh: "1px 边框分区", en: "The 1px border block" },
      construction: {
        zh: "用 1px 实线黑边（#000000 或 50% 灰）画出区块边界，内边距 12px。整页可以有多层嵌套边框，像早期 HTML 的 table 布局。绝不用阴影或底色分区。",
        en: "A 1px solid black border (or 50% grey) draws the block's edge with 12px padding. Borders may nest several layers deep like an early table layout. Never divide with shadow or fill.",
      },
    },
    {
      name: "Default List",
      role: { zh: "列表与表格", en: "Lists and tables" },
      construction: {
        zh: "使用浏览器默认的 ul / ol 缩进与项目符号，表格用 1px 实线边框（border-collapse: collapse）、单元格 padding 4px 8px、无斑马纹无圆角。",
        en: "Keep the browser's default ul and ol indentation and markers. Tables use 1px solid borders with border-collapse and 4px 8px cell padding, no zebra stripe and no radius.",
      },
    },
    {
      name: "Dense Text Column",
      role: { zh: "正文栏", en: "The text column" },
      construction: {
        zh: "最大宽度 720px、行高 1.5（不放大）、段间距 12px、段首不缩进。左对齐，不使用首字下沉或任何排版装饰。密度接近纯文本文件。",
        en: "Capped at 720px with 1.5 leading, 12px between paragraphs, no first-line indent. Flush left with no drop caps or typographic ornament. Density approaches a plain text file.",
      },
    },
  ],
  imagery: {
    zh: "几乎不用图像。允许未优化的原生图片（不做圆角、不加遮罩、不加滤镜），alt 文字必须完整。不使用装饰插画、全幅背景图与任何经过艺术处理的图像。",
    en: "Imagery is nearly absent. Unprocessed native images are fine — no radius, no overlay, no filter — with complete alt text. No decorative illustration, full-bleed backgrounds or artistically treated images.",
  },
  layout: {
    zh: "上限 720px、容器内边距 16px，区块间距 24px。单栏、紧排、不用网格系统。元素之间用 1px 边框分隔而不是留白。整页读起来应该像一个排版良好的纯文本文件。",
    en: "Capped at 720px with 16px padding, sections 24px apart. One column, tightly set, no grid system. Elements divide with 1px borders rather than whitespace. The page should read like a well-set plain text file.",
  },
  dos: [
    { zh: "纯白底，不用米色或灰白", en: "Pure white ground, no cream or off-white" },
    { zh: "系统字体栈，不做字体设计", en: "System font stacks, no type design" },
    { zh: "蓝下划线链接作为主交互", en: "Blue underlined links as the primary interaction" },
    { zh: "1px 实线边框分区", en: "Divide with 1px solid borders" },
    { zh: "零圆角、零阴影、零渐变", en: "Zero radius, zero shadow, zero gradient" },
    { zh: "间距压到最小", en: "Compress spacing to a minimum" },
  ],
  donts: [
    { zh: "不要用任何圆角", en: "No rounded corners at all" },
    { zh: "不要用投影或文字阴影", en: "No shadow or text shadow" },
    { zh: "不要用渐变或背景图", en: "No gradients or background images" },
    { zh: "不要给链接加过渡动画", en: "No transition on links" },
    { zh: "不要用装饰性字体", en: "No decorative typefaces" },
    { zh: "不要为了好看而加元素", en: "Add nothing for looks" },
  ],
  promptGuide: {
    quickColors: {
      text: "#000000",
      background: "#ffffff",
      link: "#0000ff",
      red: "#ff0000",
      green: "#008000",
      visited: "#551a8b",
    },
    prompts: [
      {
        zh: "做一个网页粗野主义的文档页：纯白底 #ffffff、正文 16px 系统无衬线栈、行高 1.5、最大宽度 720px、左对齐、段间距 12px。标题用 Times New Roman 700、32px 与 24px。链接色 #0000ff 带下划线、无过渡、无 hover 变化。区块之间用 1px solid #000 边框分隔，内边距 12px。圆角 0、阴影无、渐变无。",
        en: "Build a web brutalist document page: pure white #ffffff ground, body at 16px system sans on 1.5 leading, capped at 720px, flush left with 12px between paragraphs. Headings use Times New Roman 700 at 32px and 24px. Links are #0000ff with a real underline, no transition and no hover change. Sections divide with 1px solid #000 borders and 12px padding. Radius 0, no shadow, no gradient.",
      },
    ],
  },
  similar: [
    { name: "Neo-Brutalist", why: { zh: "名字相近但方向相反：新野兽派造风格，网页粗野主义拒绝风格", en: "Similar name, opposite intent: neo-brutalism manufactures a look while web brutalism refuses one" } },
    { name: "Minimalist Flat", why: { zh: "同样极简，但极简扁平仍有精心的排版与间距，网页粗野主义用浏览器默认", en: "Both minimal, though flat minimal still tunes type and spacing while this keeps browser defaults" } },
  ],
  completeness: "full",
};
