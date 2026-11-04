import type { DesignSpec } from "../types";

export const swissStyleSpec: DesignSpec = {
  slug: "swiss-style",
  name: "瑞士国际风格",
  nameEn: "Swiss International",
  cover: "/styles/swiss-style.svg",
  theme: "light",
  northStar: {
    zh: "网格、左对齐、无衬线、三原色——让结构本身成为装饰。",
    en: "Grid, flush-left, sans-serif, primaries — let the structure be the ornament.",
  },
  summary: {
    zh: "瑞士国际风格来自 1950 年代的平面设计：一切对齐到一张严格的网格，文字一律左对齐（从不居中），字体只用无衬线的常规与粗体两档，装饰被彻底删掉，只留下黑、白与三原色（红、蓝、黄）。页面的秩序来自栏线与留白的节奏，而不是卡片边框。交互也保持结构感：hover 时左侧的引导线从灰变红、底色轻微变灰，等于把那条结构线「激活」，而不是加阴影或位移。",
    en: "Swiss International comes from 1950s graphic design: everything aligns to a strict grid, type is always flush left (never centred), only two weights of one sans-serif are used, ornament is removed entirely, and the palette is black, white and the primaries — red, blue, yellow. Order comes from column rules and the rhythm of whitespace rather than card borders. Interaction stays structural too: hover turns the leading rule from grey to red and tints the ground slightly, activating the structure instead of adding shadow or translation.",
  },
  colors: [
    {
      name: "黑",
      nameEn: "Black",
      value: "#000000",
      group: "brand",
      role: {
        zh: "正文、标题与栏线。瑞士风格允许纯黑，因为它追求印刷级对比。",
        en: "Body, headings and column rules. Pure black is allowed here because the target is print-level contrast.",
      },
      token: "--color-black",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: { zh: "页面画布，不做任何灰度渐变。", en: "The canvas, with no tonal gradient at all." },
      token: "--color-white",
    },
    {
      name: "红",
      nameEn: "Signal Red",
      value: "#ff0000",
      group: "accent",
      role: {
        zh: "唯一的强调色：编号、激活线、关键数据。面积控制在一个字符宽。",
        en: "The single accent: numerals, activated rules, key figures, never wider than a character.",
      },
      token: "--color-red",
    },
    {
      name: "蓝",
      nameEn: "Ultramarine",
      value: "#0057b8",
      group: "accent",
      role: {
        zh: "链接与可点击标记。与红同屏时只出现一种。",
        en: "Links and clickable markers; only one of red or blue appears per screen.",
      },
      token: "--color-blue",
    },
    {
      name: "黄",
      nameEn: "Cadmium Yellow",
      value: "#ffcc00",
      group: "accent",
      role: {
        zh: "大面积色块与海报式区块，用于分区而非强调。",
        en: "Large poster blocks for zoning rather than emphasis.",
      },
      token: "--color-yellow",
    },
  ],
  fonts: [
    {
      family: "Helvetica Neue",
      substitute: "Inter, Arial, 'Helvetica Neue', sans-serif",
      weights: [400, 700],
      sizes: [11, 13, 15, 20, 32, 56, 88],
      lineHeight: { display: 0.98, heading: 1.05, body: 1.5 },
      tracking: { display: "-0.03em", label: "0.08em" },
      role: {
        zh: "全站唯一字体，只用 400 与 700 两档。层级完全由字号与栏宽承担。",
        en: "The only face, in two weights. Hierarchy is carried entirely by size and column width.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 88, lineHeight: 0.98, tracking: "-0.03em", token: "--text-display" },
    { role: "heading-lg", weight: 700, size: 56, lineHeight: 1, tracking: "-0.02em", token: "--text-heading-lg" },
    { role: "heading", weight: 700, size: 32, lineHeight: 1.05, token: "--text-heading" },
    { role: "body-lg", weight: 400, size: 20, lineHeight: 1.4, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 15, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 700, size: 11, lineHeight: 1.3, tracking: "0.08em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1200,
    sectionGap: 96,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "White", value: "#ffffff", purpose: "页面画布" },
    { level: 1, name: "Black Block", value: "#000000", purpose: "反色区块与栏线" },
    { level: 2, name: "Yellow Block", value: "#ffcc00", purpose: "分区色块" },
  ],
  elevation: [{ name: "None", value: "none" }],
  components: [
    {
      name: "Structural List Row",
      role: { zh: "列表、目录与索引行", en: "Lists, indexes and contents rows" },
      construction: {
        zh: "无背景、无圆角、无阴影。左侧 2px 竖线默认 #d4d4d4，行高 64px，内边距左 16px。编号用 11px/700、0.08em 字距、红色。标题 20px/700 左对齐。hover 时左侧竖线变红、背景变 #f0f0f0，过渡 200ms；不做位移。",
        en: "No background, no radius, no shadow. A 2px rule on the left starts at #d4d4d4; rows are 64px tall with 16px left padding. Numerals use 11px/700 at 0.08em tracking in red. Titles are 20px/700, flush left. Hover turns the rule red and the ground to #f0f0f0 over 200ms, with no translation.",
      },
      states: "hover: rule grey to red, ground #f0f0f0",
    },
    {
      name: "Section Label",
      role: { zh: "栏目编号与分类标签", en: "Section numbering and category labels" },
      construction: {
        zh: "11px、700 字重、0.08em 字距、全大写。编号与标题之间用一条 24px 的黑色短线连接。不接受胶囊形状与圆角。",
        en: "11px at weight 700 with 0.08em tracking, uppercase. A 24px black rule connects the numeral to the title. No pills, no radius.",
      },
    },
    {
      name: "Inline Button",
      role: { zh: "行动按钮与链接按钮", en: "Action and link buttons" },
      construction: {
        zh: "无填充、无描边、无圆角，左对齐，文字 13px/700 全大写 0.08em，下方一条 2px 黑线。hover 时线变红、文字保持黑色，200ms；按下时线加粗到 3px，不做其他变化。",
        en: "No fill, no border, no radius, flush left. Text at 13px/700 uppercase and 0.08em tracking, underlined by a 2px black rule. Hover turns the rule red and leaves the text black, over 200ms; press thickens the rule to 3px with nothing else changing.",
      },
    },
    {
      name: "Color Field",
      role: { zh: "分区色块与海报区", en: "Zoning blocks and poster sections" },
      construction: {
        zh: "整块填充红、蓝或黄，无圆角、无阴影、无渐变。块内文字一律白色或黑色（按对比度选），字号至少 32px/700，左对齐并贴齐色块内边距 48px。色块在一屏内不超过一块。",
        en: "A full block of red, blue or yellow with no radius, shadow or gradient. Text inside is white or black chosen for contrast, at least 32px/700, flush left against 48px padding. One field per screen.",
      },
    },
  ],
  imagery: {
    zh: "黑白摄影、几何构图、大字号排版本身即是图像。允许整版单色块。不使用彩色摄影、插画、图标墙与任何柔和过渡。",
    en: "Black-and-white photography, geometric composition, and type itself as image. Full-bleed color fields are welcome. No color photography, illustration, icon walls or soft transitions.",
  },
  layout: {
    zh: "12 栏、上限 1200px、栏间距 24px。所有内容左对齐、贴齐栏线，标题可跨 8 栏以上。区块间距 96px，允许一条 1px 黑线贯穿整宽作为分隔。页面拒绝居中排版与卡片容器。",
    en: "Twelve columns capped at 1200px with 24px gutters. Everything is flush left against the column rules, and headlines may run eight columns wide. Sections sit 96px apart, often divided by a single full-width 1px black rule. Centred layouts and card containers are refused.",
  },
  dos: [
    { zh: "一切左对齐，永不居中", en: "Flush left everywhere, never centred" },
    { zh: "只用 400 与 700 两档字重", en: "Use only weights 400 and 700" },
    { zh: "红作为唯一强调，控制在一个字符宽", en: "Red is the only accent, no wider than a character" },
    { zh: "分隔用 1px 或 2px 黑线，不用卡片框", en: "Divide with 1px or 2px black rules, not card frames" },
    { zh: "hover 激活结构线，不加阴影与位移", en: "Hover activates a structural rule instead of adding shadow or motion" },
    { zh: "字号跨度大：11px 到 88px", en: "Span sizes widely: 11px to 88px" },
  ],
  donts: [
    { zh: "不要用圆角", en: "No border radius" },
    { zh: "不要用阴影与渐变", en: "No shadow and no gradient" },
    { zh: "不要居中排版", en: "Never centre typography" },
    { zh: "不要让红与蓝同时作为强调", en: "Never use red and blue as accents together" },
    { zh: "不要用超过两档字重", en: "Do not exceed two weights" },
    { zh: "不要用卡片包裹内容", en: "Do not wrap content in cards" },
  ],
  promptGuide: {
    quickColors: {
      text: "#000000",
      background: "#ffffff",
      accent: "#ff0000",
      link: "#0057b8",
      block: "#ffcc00",
      rule: "#d4d4d4",
    },
    prompts: [
      {
        zh: "做一个瑞士风格索引列表：每行无背景、无圆角、高 64px、左侧 2px #d4d4d4 竖线、内边距左 16px。行内左边 11px/700 红色编号（0.08em 字距），右边 20px/700 黑色标题，全部左对齐。hover 时左侧竖线变 #ff0000、背景变 #f0f0f0，transition 200ms，不加位移与阴影。",
        en: "Build a Swiss-style index list: rows have no background, no radius, 64px height, a 2px #d4d4d4 rule on the left and 16px left padding. Inside, an 11px/700 red numeral at 0.08em tracking sits beside a 20px/700 black title, all flush left. Hover turns the rule to #ff0000 and the ground to #f0f0f0 over 200ms, with no translation or shadow.",
      },
    ],
  },
  similar: [
    { name: "Vercel", why: { zh: "同样的左对齐、栏线与零圆角纪律", en: "Same flush-left discipline, rules and refusal of radius" } },
    { name: "Swiss Poster", why: { zh: "同一套网格与字号跨度的海报化版本", en: "The poster-scale version of the same grid and type range" } },
  ],
  completeness: "full",
};
