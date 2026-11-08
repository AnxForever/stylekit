import type { DesignSpec } from "../types";

export const medievalManuscriptSpec: DesignSpec = {
  slug: "medieval-manuscript",
  name: "中世纪手抄本",
  nameEn: "Medieval Manuscript",
  cover: "/styles/medieval-manuscript.svg",
  theme: "light",
  northStar: {
    zh: "羊皮纸、双线边框、金红首字：一页被手指翻旧的书。",
    en: "Parchment, double-line borders and a gilded initial — a leaf worn by hands.",
  },
  summary: {
    zh: "中世纪手抄本模仿泥金装饰手稿：羊皮纸底（#f0e6d0）、金（#c9a74e）与深红（#8b1a1a）作装饰与标题、深棕（#3d2b1f）作正文，边框用 border-double 或双层实线（外层 3 到 4px、内层 1px）模拟手抄本的双线框，标题首字放大到 5xl 以上做首字下沉，全页衬线保证古典一致。它的层次全靠装饰性边框与首字，不靠阴影与颜色对比。",
    en: "Medieval Manuscript imitates illuminated codices: parchment (#f0e6d0), gold (#c9a74e) and deep red (#8b1a1a) for ornament and headings, deep brown (#3d2b1f) for body, borders built as border-double or a double solid line (3 to 4px outside, 1px inside) to imitate the manuscript frame, headings whose first letter swells past 5xl into a drop cap, and serif throughout for classical consistency. Hierarchy comes entirely from the ornamental frame and the initial, never from shadow or color contrast.",
  },
  colors: [
    {
      name: "羊皮纸",
      nameEn: "Parchment",
      value: "#f0e6d0",
      group: "surface",
      role: {
        zh: "页面底。泛黄的纸，所有内容写在它上面。",
        en: "The page ground — yellowed stock that everything is written on.",
      },
      token: "--color-parchment",
    },
    {
      name: "深红",
      nameEn: "Deep Red",
      value: "#8b1a1a",
      group: "brand",
      role: {
        zh: "标题与重要文字。抄本里的朱砂墨。",
        en: "Headings and important text — the vermilion ink of a codex.",
      },
      token: "--color-deep-red",
    },
    {
      name: "金",
      nameEn: "Gold",
      value: "#c9a74e",
      group: "accent",
      role: {
        zh: "边框、首字底与装饰。泥金装饰的颜色。",
        en: "Frames, initial grounds and ornament — the color of illumination.",
      },
      token: "--color-gold",
    },
    {
      name: "深棕",
      nameEn: "Deep Brown",
      value: "#3d2b1f",
      group: "brand",
      role: {
        zh: "正文与辅助边框。像旧墨水的棕黑。",
        en: "Body text and secondary borders — the brown-black of old ink.",
      },
      token: "--color-deep-brown",
    },
    {
      name: "墨绿",
      nameEn: "Forest",
      value: "#2d4a2d",
      group: "accent",
      role: {
        zh: "藤蔓装饰与次级强调。",
        en: "Vine ornament and secondary emphasis.",
      },
      token: "--color-forest",
    },
    {
      name: "亮绿",
      nameEn: "Bright Green",
      value: "#6bc15e",
      group: "accent",
      role: {
        zh: "首字内部的叶片点缀，出现频率最低。",
        en: "Leaf detail inside an initial, used least.",
      },
      token: "--color-bright-green",
    },
  ],
  fonts: [
    {
      family: "UnifrakturMaguntia",
      substitute: "'Cinzel', Georgia, serif",
      weights: [400],
      sizes: [20, 26, 34, 44, 58, 76],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.7 },
      tracking: { display: "0.02em", label: "0.16em" },
      role: {
        zh: "标题用哥特体或高对比装饰衬线，正文用可读衬线。哥特体只做标题与首字。",
        en: "Headings take blackletter or a high-contrast decorative serif; body stays readable serif. Blackletter is for headings and initials only.",
      },
      token: "--font-display",
    },
    {
      family: "EB Garamond",
      substitute: "Garamond, 'Songti SC', serif",
      weights: [400, 600],
      sizes: [16, 18, 21],
      lineHeight: { display: 1.5, heading: 1.5, body: 1.8 },
      tracking: { display: "0.01em", label: "0.16em" },
      role: {
        zh: "正文与说明。行高 1.8，像手抄本的正文栏。",
        en: "Body and captions at 1.8 leading, like the text column of a manuscript.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", font: "UnifrakturMaguntia", weight: 400, size: 76, lineHeight: 1.15, tracking: "0.02em", token: "--text-display" },
    { role: "heading", font: "UnifrakturMaguntia", weight: 400, size: 58, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", font: "UnifrakturMaguntia", weight: 400, size: 44, lineHeight: 1.25, token: "--text-subheading" },
    { role: "body-lg", font: "EB Garamond", weight: 400, size: 21, lineHeight: 1.75, token: "--text-body-lg" },
    { role: "body", font: "EB Garamond", weight: 400, size: 18, lineHeight: 1.8, token: "--text-body" },
    { role: "label", font: "EB Garamond", weight: 600, size: 16, lineHeight: 1.6, tracking: "0.16em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 960,
    sectionGap: 128,
    cardPadding: 40,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "initials", value: "4px" },
  ],
  surfaces: [
    { level: 0, name: "Parchment", value: "#f0e6d0", purpose: "页面底" },
    { level: 1, name: "Gold Ground", value: "rgba(201,167,78,0.18)", purpose: "首字与装饰底" },
    { level: 2, name: "Ink Block", value: "#3d2b1f", purpose: "深色块" },
  ],
  elevation: [
    { name: "None", value: "none — the double frame carries all depth" },
    { name: "Max allowed", value: "inset 0 0 40px rgba(61,43,31,0.06)" },
  ],
  components: [
    {
      name: "Double Frame",
      role: { zh: "双线边框（核心组件）", en: "The double frame — the core component" },
      construction: {
        zh: "外层 3px 深棕实线、内层 1px 金实线，两层之间留 8px 羊皮纸色空隙（用 padding + 内层描边实现，或双 border 配 outline-offset）。零圆角。四角各放一个 16px 的角饰（几何卷草或十字）。整个内容写在框内，像一页抄本。",
        en: "A 3px deep brown outer rule and a 1px gold inner rule with 8px of parchment between them, built from padding plus an inner stroke or a double border with an outline offset. Zero radius. A 16px corner ornament — geometric scroll or cross — sits at each corner, and the content is written inside like a manuscript leaf.",
      },
    },
    {
      name: "Illuminated Initial",
      role: { zh: "泥金首字（签名）", en: "The illuminated initial — the signature" },
      construction: {
        zh: "段落首字母 float: left、字号为正文的 4 倍、行高对齐三到四行，字体内填金 18% 底、外描 2px 深红、四角各有 2px 的深棕角线。首字内部可放极简的卷草或叶片线条（墨绿）。每个内容区块只允许一次。",
        en: "The paragraph's first letter floats left at four times the body size across three or four lines, its field a 18% gold with a 2px deep red stroke and 2px deep brown corner marks. A minimal scroll or leaf line in forest may sit inside. One per content block.",
      },
    },
    {
      name: "Rubric Label",
      role: { zh: "朱批标签", en: "The rubric label" },
      construction: {
        zh: "16px/600、字距 0.16em、深红文字、无底无边框。它是抄本里用红墨写的小标题，用在区块上方 8px 处与段落之间的批注。",
        en: "16px/600 at 0.16em in deep red, no ground and no border. It is the rubric written in red ink, sitting 8px above a block or between paragraphs as annotation.",
      },
    },
    {
      name: "Parchment Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "羊皮纸填充、深棕文字、零圆角、3px 深棕描边加内层 1px 金线（双层）、16px/600、字距 0.16em、padding 14px 32px，无阴影。hover 时底层填充转金 18%、描边转深红；按下时整体位移 1px 2px。过渡 250ms ease-out。",
        en: "Parchment fill, deep brown text, zero radius, a 3px deep brown border with a 1px gold inner line for the double effect, 16px/600 at 0.16em, 14px 32px padding, no shadow. Hover adds an 18% gold ground and turns the border deep red; press offsets 1px 2px. 250ms ease-out.",
      },
      sizes: "padding 14px 32px; label 16px",
      states: "hover: gold ground, red border; active: offset 1px 2px",
    },
    {
      name: "Margin Vine",
      role: { zh: "页边藤蔓", en: "The margin vine" },
      construction: {
        zh: "沿页边（或区块侧边）垂直延伸的 1px 墨绿藤蔓线，带 6 到 10 片小叶（各 8px）与 2 到 3 朵深红小花。它模拟抄本页边的装饰栏，单屏最多两条。",
        en: "A 1px forest vine running vertically along the page edge or a block's side, carrying six to ten 8px leaves and two or three deep red blossoms. It imitates the marginal decoration of a codex, twice per screen at most.",
      },
    },
  ],
  imagery: {
    zh: "手抄本插图、木刻版画、泥金装饰、羊皮纸纹理。图像必须有平面化的线稿与金红配色，可加金箔底。不使用写实摄影、现代插画与彩色渐变图像。",
    en: "Manuscript illumination, woodcut, gold-leaf ornament, parchment texture. Imagery must be flat line work in gold and red, optionally on a leaf ground. No realistic photography, modern illustration or color-gradient imagery.",
  },
  layout: {
    zh: "上限 960px、容器内边距 32px，区块间距 128px。整页包在一个 Double Frame 里，页边保留装饰栏。正文单栏、行宽不超过 60 字符，像抄本的正文块。",
    en: "Capped at 960px with 32px padding, sections 128px apart. The whole page sits inside a double frame with margins reserved for ornament. Body runs in one column under a sixty-character measure, like a codex text block.",
  },
  dos: [
    { zh: "羊皮纸底配金与深红", en: "Parchment with gold and deep red" },
    { zh: "边框必须是双线（3px 加 1px）", en: "Borders are always double: 3px plus 1px" },
    { zh: "标题首字放大到 4 倍", en: "The initial swells to four times the body" },
    { zh: "全页衬线", en: "Serif throughout" },
    { zh: "页边有藤蔓装饰", en: "The margin carries a vine" },
    { zh: "正文行宽不超过 60 字符", en: "The measure stays under sixty characters" },
  ],
  donts: [
    { zh: "不要用单线边框", en: "No single-line borders" },
    { zh: "不要用哥特体排正文", en: "Never set body copy in blackletter" },
    { zh: "不要用写实摄影", en: "No realistic photography" },
    { zh: "不要用圆角", en: "No rounded corners" },
    { zh: "不要用阴影", en: "No shadows" },
    { zh: "不要每段都有首字下沉", en: "Never drop a cap on every paragraph" },
  ],
  promptGuide: {
    quickColors: {
      text: "#3d2b1f",
      background: "#f0e6d0",
      red: "#8b1a1a",
      gold: "#c9a74e",
      forest: "#2d4a2d",
      brown: "#3d2b1f",
    },
    prompts: [
      {
        zh: "做一个中世纪手抄本版面：羊皮纸底 #f0e6d0、正文 EB Garamond 18px、行高 1.8、色 #3d2b1f。外层 3px solid #3d2b1f 边框加内层 1px solid #c9a74e（两层之间留 8px 空隙），四角各一个 16px 的金色角饰，零圆角。标题用哥特体 58px、色 #8b1a1a。首段首字母放大到 4 倍、金 18% 底、2px 深红描边。区块上方放 16px 字距 0.16em 的深红朱批标签。页边加一条 1px 墨绿藤蔓带小叶片。全页无阴影、无圆角。",
        en: "Build a medieval manuscript page: parchment #f0e6d0 ground with EB Garamond body at 18px on 1.8 leading in #3d2b1f. A 3px solid #3d2b1f outer border sits 8px away from a 1px solid #c9a74e inner border, with a 16px gold corner ornament at each corner and zero radius. Headings run blackletter at 58px in #8b1a1a. The opening letter swells to four times the body on an 18% gold field with a 2px deep red stroke. A 16px rubric label at 0.16em in deep red sits above each block. A 1px forest vine with small leaves runs along the margin. No shadows and no rounded corners anywhere.",
      },
    ],
  },
  similar: [
    { name: "Gothic", why: { zh: "同属中世纪，但哥特式是建筑与拱窗，手抄本是书页与首字", en: "Both medieval, though Gothic is architecture and windows while this is page and initial" } },
    { name: "Dark Academia", why: { zh: "同为旧书气质，但暗黑学院是暗棕底，手抄本是亮羊皮纸", en: "Both old-book, though dark academia is dark brown while this is bright parchment" } },
  ],
  completeness: "full",
};
