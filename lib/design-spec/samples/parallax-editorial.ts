import type { DesignSpec } from "../types";

export const parallaxEditorialSpec: DesignSpec = {
  slug: "parallax-editorial",
  name: "视差杂志",
  nameEn: "Parallax Editorial",
  cover: "/styles/parallax-editorial.svg",
  theme: "light",
  northStar: {
    zh: "暖纸上的长文，前后景以不同速度移动，翻页被拉成一段旅程。",
    en: "Long-form text on warm paper where layers travel at different speeds, stretching a page turn into a journey.",
  },
  summary: {
    zh: "视差杂志把编辑排版与物理景深缝起来：暖纸底（#f5f0e6）配近黑墨正文（#1a1712），首字下沉 3 到 4 行高并用砖红，章节号与引文也用同一支砖红，其余全是墨。视差只用 transform 做——绝不能在 scroll 事件里改 top、margin 或 height，那会触发重排并卡顿。景深层级最多三级，因为再多景深就浑浊。正文永远不做视差主体，行宽不超过 75 字符；移动端必须削弱或关闭视差，否则性能和眩晕都会出问题。",
    en: "Parallax Editorial stitches editorial typesetting to physical depth: warm paper (#f5f0e6) under near-black ink (#1a1712), drop caps three or four lines tall in brick red, chapter numbers and pull quotes sharing that brick red, and ink for everything else. Parallax runs through transform alone — never setting top, margin or height inside a scroll handler, which triggers reflow and stutter. Depth stops at three levels, since more turns muddy. Body text is never the parallax subject and stays under a 75-character measure, and mobile must weaken or disable the effect outright.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#1a1712",
      group: "brand",
      role: {
        zh: "正文与标题。带暖调的近黑，像印刷油墨。",
        en: "Body and headings — a warm near-black that reads as printing ink.",
      },
      token: "--color-ink",
    },
    {
      name: "暖纸",
      nameEn: "Warm Paper",
      value: "#f5f0e6",
      group: "surface",
      role: {
        zh: "页面底。偏黄的纸色，绝不能用纯白或冷白。",
        en: "The page ground — a yellow-leaning paper tone; pure or cool white is excluded.",
      },
      token: "--color-warm-paper",
    },
    {
      name: "砖红",
      nameEn: "Brick Red",
      value: "#b3401f",
      group: "accent",
      role: {
        zh: "唯一强调色，只用于首字、章节号、引文与链接。绝不能铺成大色块。",
        en: "The only accent, on drop caps, chapter numbers, pull quotes and links — never flooded as a surface.",
      },
      token: "--color-brick-red",
    },
    {
      name: "深褐",
      nameEn: "Deep Umber",
      value: "#2e2a22",
      group: "accent",
      role: {
        zh: "深色区块与引文底，是墨的暖化版本。",
        en: "Dark blocks and pull-quote grounds — a warmed version of the ink.",
      },
      token: "--color-deep-umber",
    },
    {
      name: "沙",
      nameEn: "Sand",
      value: "#c9bba0",
      group: "accent",
      role: {
        zh: "次级区块与图片衬底，用于在不破坏纸感的前提下分区。",
        en: "Secondary blocks and image beds, dividing space without breaking the paper feel.",
      },
      token: "--color-sand",
    },
  ],
  fonts: [
    {
      family: "Source Serif",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400, 600],
      sizes: [14, 16, 19, 26, 34, 48],
      lineHeight: { display: 1.15, heading: 1.3, body: 1.75 },
      tracking: { display: "-0.01em", label: "0.14em" },
      role: {
        zh: "正文与标题都用衬线。行高 1.75，行长控制在 75 字符以内，这是视差不干扰阅读的前提。",
        en: "Serif for both body and headings. Leading at 1.75 with a measure under 75 characters — the precondition for parallax that does not disturb reading.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", font: "Source Serif", weight: 600, size: 48, lineHeight: 1.15, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", font: "Source Serif", weight: 600, size: 34, lineHeight: 1.25, token: "--text-heading" },
    { role: "subheading", font: "Source Serif", weight: 400, size: 26, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", font: "Source Serif", weight: 400, size: 19, lineHeight: 1.75, token: "--text-body-lg" },
    { role: "body", font: "Source Serif", weight: 400, size: 16, lineHeight: 1.75, token: "--text-body" },
    { role: "label", font: "Source Serif", weight: 600, size: 14, lineHeight: 1.5, tracking: "0.14em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 960,
    sectionGap: 128,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "4px" },
    { element: "buttons", value: "4px" },
    { element: "images", value: "2px" },
  ],
  surfaces: [
    { level: 0, name: "Warm Paper", value: "#f5f0e6", purpose: "页面底" },
    { level: 1, name: "Sand", value: "rgba(201,187,160,0.30)", purpose: "次级区块" },
    { level: 2, name: "Deep Umber", value: "#2e2a22", purpose: "深色区块与引文" },
  ],
  elevation: [
    { name: "None", value: "none — the paper has no thickness" },
    { name: "Image", value: "0 12px 32px rgba(26,23,18,0.10)" },
  ],
  components: [
    {
      name: "Drop Cap",
      role: { zh: "首字下沉（识别核心）", en: "The drop cap — the identifier" },
      construction: {
        zh: "段落首字母 float: left、字号约为正文的 3.4 倍（行高对齐三到四行）、颜色砖红、右与下各留 8px、字体同正文衬线。每个长文区块只允许一次，且仅用于第一个段落。",
        en: "The paragraph's first letter floats left at roughly 3.4x the body size, spanning three or four lines, in brick red, with 8px clear to its right and below, in the same serif. One per long-form block, and only on the opening paragraph.",
      },
    },
    {
      name: "Parallax Layer",
      role: { zh: "视差层", en: "The parallax layer" },
      construction: {
        zh: "滚动时只用 transform: translate3d(0, Ypx, 0) 移动，Y 由滚动进度乘速率得出（背景 0.15，中景 0.30，前景 1.0）。绝不能在 scroll 处理器里读或写布局属性（offsetTop、getBoundingClientRect、top、margin、height）。一屏最多三个速率层级。prefers-reduced-motion 时所有层归零。",
        en: "Movement uses transform: translate3d(0, Ypx, 0) only, with Y derived from scroll progress times a rate (0.15 background, 0.30 mid, 1.0 foreground). The scroll handler never reads or writes layout properties — no offsetTop, getBoundingClientRect, top, margin or height. Three rate levels per screen at most, and every layer returns to zero under reduced motion.",
      },
      sizes: "rates 0.15 / 0.30 / 1.0",
    },
    {
      name: "Sticky Interlock",
      role: { zh: "图文锁定（sticky 交叠）", en: "The sticky image-text interlock" },
      construction: {
        zh: "图片容器 sticky top-24，高度 60vh；右侧正文正常滚动并逐段覆盖图片。图片不缩放、不淡出，只靠位置关系产生「翻页」的错觉。移动端取消 sticky，改为图文上下排列。",
        en: "The image container sticks 96px from the top at 60vh tall while the text column scrolls past and covers it section by section. The image never scales or fades; position alone produces the page-turn illusion. Mobile drops the sticky and stacks image above text.",
      },
    },
    {
      name: "Chapter Number",
      role: { zh: "章节号", en: "The chapter number" },
      construction: {
        zh: "砖红色、14px/600、字距 0.14em、全大写、位于标题上方 16px，格式为「第一章」或「01」。可配一条 24px 的砖红短线在左侧。",
        en: "Brick red at 14px/600 with 0.14em tracking, uppercase, sitting 16px above the heading in the form 'Chapter One' or '01', optionally with a 24px brick-red rule to its left.",
      },
    },
    {
      name: "Pull Quote",
      role: { zh: "引文", en: "The pull quote" },
      construction: {
        zh: "左侧 3px 砖红竖线、内边距 24px 32px、引文 26px/400 衬线斜体、行高 1.5、墨色，下方 14px 的署名。它随正文一起滚动，不参与视差。",
        en: "A 3px brick-red rule on the left, 24px 32px padding, the quote at 26px/400 serif italic on 1.5 leading in ink, with a 14px attribution below. It scrolls with the text and takes no part in the parallax.",
      },
    },
  ],
  imagery: {
    zh: "编辑类摄影：人物、场所、物件，暖调、有纸感、可做轻微颗粒。图片以 4:5 或 3:2 出现，配 sticky 交叠。不使用冷光摄影、纯白背景图与插画。",
    en: "Editorial photography — people, places, objects — warm in cast with a paper feel and light grain, at 4:5 or 3:2, feeding the sticky interlock. No cool-light photography, white-background shots or illustration.",
  },
  layout: {
    zh: "上限 960px、容器内边距 24px，区块间距 128px。正文单栏、行宽不超过 75 字符；图片可跨到 100% 宽但文字不动。章节之间用 64px 的留白加一个砖红章节号。",
    en: "Capped at 960px with 24px padding, sections 128px apart. Body runs in one column under a 75-character measure; images may span the full width while the text stays put. Chapters divide with 64px of space and a brick-red number.",
  },
  dos: [
    { zh: "视差只用 transform", en: "Parallax uses transform only" },
    { zh: "一屏最多三级视差速率", en: "At most three parallax rates per screen" },
    { zh: "正文不做视差主体，行宽不超 75 字符", en: "Body is never the parallax subject; keep the measure under 75" },
    { zh: "砖红只给首字、章节号、引文、链接", en: "Brick red only on drop caps, chapter numbers, quotes, links" },
    { zh: "暖纸底，绝不用纯白", en: "Warm paper ground, never pure white" },
    { zh: "prefers-reduced-motion 时全部归零", en: "Zero everything under reduced motion" },
  ],
  donts: [
    { zh: "不要在 scroll 里改 top/margin/height", en: "Never set top, margin or height in scroll" },
    { zh: "不要超过三级视差", en: "Never exceed three parallax levels" },
    { zh: "不要让视差压过可读性", en: "Never let parallax outrank readability" },
    { zh: "不要在移动端保留强视差", en: "No strong parallax on mobile" },
    { zh: "不要用多个强调色或大面积砖红", en: "No extra accents or flooded brick red" },
    { zh: "不要省略 reduced-motion 降级", en: "Never skip the reduced-motion fallback" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1712",
      background: "#f5f0e6",
      accent: "#b3401f",
      dark: "#2e2a22",
      sand: "#c9bba0",
      border: "rgba(26,23,18,0.15)",
    },
    prompts: [
      {
        zh: "做一个视差杂志文章页：暖纸底 #f5f0e6、正文墨色 #1a1712、16px 衬线、行高 1.75、行宽不超过 75 字符。首段首字母下沉：float left、字号 3.4 倍、色 #b3401f、右侧与下方各留 8px。图片容器 sticky top-24、高度 60vh，正文滚过覆盖它。视差只用 transform: translate3d(0, Ypx, 0)，速率 0.15/0.30/1.0，一屏最多三层；不要在 scroll 事件里读写布局属性。章节号用 14px/600 #b3401f、字距 0.14em。",
        en: "Build a parallax editorial article: warm paper #f5f0e6, ink #1a1712 body at 16px serif on 1.75 leading under a 75-character measure. The opening letter drops: float left at 3.4x size in #b3401f with 8px clear right and below. The image container sticks 96px from the top at 60vh while text scrolls over it. Parallax uses transform: translate3d(0, Ypx, 0) only at rates 0.15, 0.30 and 1.0, three layers at most, and the scroll handler never reads or writes layout properties. Chapter numbers run 14px/600 in #b3401f at 0.14em tracking.",
      },
    ],
  },
  similar: [
    { name: "Editorial", why: { zh: "同为编辑排版，但这里加了物理景深与 sticky 交叠", en: "Both editorial, though this adds physical depth and a sticky interlock" } },
    { name: "Parallax Sections", why: { zh: "同样用视差，但那边是全屏区块的固定背景，这里是长文的层级速度差", en: "Both use parallax, though that one fixes full-screen backdrops while this varies layer speed in long text" } },
  ],
  completeness: "full",
};
