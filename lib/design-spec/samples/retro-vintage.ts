import type { DesignSpec } from "../types";

export const retroVintageSpec: DesignSpec = {
  slug: "retro-vintage",
  name: "复古怀旧风",
  nameEn: "Retro Vintage",
  cover: "/styles/retro-vintage.svg",
  theme: "light",
  northStar: {
    zh: "旧纸张不会浮起：一切安静地待着，只有颜色在缓慢氧化。",
    en: "Old paper does not lift: everything stays put, and only the colors slowly oxidise.",
  },
  summary: {
    zh: "复古怀旧风模拟的是印刷品的年代感：棕褐主色、奶油纸底、粗边框、老式排版（全大写加宽字距的衬线标题）。它有两条几乎所有其它风格都没有的禁令——第一，任何元素都不做 scale 或 translate-y，因为旧纸张不会浮起（Antique Stillness）；第二，过渡时长不得快于 150ms，因为氧化是地质过程（Slow Passage）。颜色全部低饱和、偏黄，四支辅色（砖红、深绿、沙、橄榄）来自 70 年代的印刷油墨。",
    en: "Retro Vintage reproduces the age of print: a sepia primary, a cream paper ground, heavy borders and old-style typography — uppercase headings on widely tracked serifs. It carries two prohibitions almost no other style has. First, nothing scales or translates on the y-axis, because old paper does not lift (Antique Stillness). Second, no transition may run faster than 150ms, because oxidation is geological (Slow Passage). Every color is desaturated and yellow-shifted, and the four supporting tones — brick, forest, sand, olive — come from 1970s printing inks.",
  },
  colors: [
    {
      name: "棕褐",
      nameEn: "Sepia",
      value: "#8b4513",
      group: "brand",
      role: {
        zh: "标题、边框与主强调。整套系统的年代感全部来自这支棕。",
        en: "Headings, borders and primary emphasis — the entire period feel comes from this brown.",
      },
      token: "--color-sepia",
    },
    {
      name: "奶油纸",
      nameEn: "Cream",
      value: "#f5e6d3",
      group: "surface",
      role: {
        zh: "页面画布。模拟泛黄的纸，比纯白暖两档。",
        en: "The canvas, standing in for yellowed paper — two steps warmer than white.",
      },
      token: "--color-cream",
    },
    {
      name: "砖红",
      nameEn: "Brick",
      value: "#c94c4c",
      group: "accent",
      role: {
        zh: "警示与重点标记，用印刷红而非屏幕红。",
        en: "Alerts and highlights, in printing red rather than screen red.",
      },
      token: "--color-brick",
    },
    {
      name: "深林绿",
      nameEn: "Forest",
      value: "#2e4a3f",
      group: "accent",
      role: {
        zh: "次级强调与深色区块。七十年代常见的包装绿。",
        en: "Secondary emphasis and dark blocks — a packaging green straight out of the seventies.",
      },
      token: "--color-forest",
    },
    {
      name: "沙",
      nameEn: "Sand",
      value: "#d4a373",
      group: "accent",
      role: {
        zh: "暖色区块与分隔，用于让层次不依赖对比。",
        en: "Warm blocks and dividers, letting hierarchy work without contrast.",
      },
      token: "--color-sand",
    },
    {
      name: "橄榄",
      nameEn: "Olive",
      value: "#816904",
      group: "accent",
      role: {
        zh: "标签与邮戳式装饰，出现频率最低。",
        en: "Labels and postmark-style ornament, the least used tone.",
      },
      token: "--color-olive",
    },
  ],
  fonts: [
    {
      family: "Playfair Display",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400, 700, 900],
      sizes: [16, 20, 28, 40, 56],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.65 },
      tracking: { display: "0.01em", label: "0.16em" },
      role: {
        zh: "标题与字标，多用全大写与 0.16em 宽字距。衬线的笔画对比是复古印刷的关键。",
        en: "Headings and the wordmark, usually uppercase at 0.16em tracking. The serif's stroke contrast is what makes it read as letterpress.",
      },
      token: "--font-serif",
    },
    {
      family: "Inter",
      substitute: "'Courier New', system-ui, sans-serif",
      weights: [400, 500],
      sizes: [13, 15, 17],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.65 },
      tracking: { display: "0", label: "0.16em" },
      role: {
        zh: "正文与说明，保持中性。行高拉高，模拟旧书的排字。",
        en: "Body and captions, kept neutral with generous leading to imitate old book setting.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", font: "Playfair Display", weight: 900, size: 56, lineHeight: 1.1, tracking: "0.01em", token: "--text-display" },
    { role: "heading", font: "Playfair Display", weight: 700, size: 40, lineHeight: 1.15, tracking: "0.01em", token: "--text-heading" },
    { role: "subheading", font: "Playfair Display", weight: 400, size: 28, lineHeight: 1.25, token: "--text-subheading" },
    { role: "body-lg", font: "Inter", weight: 400, size: 17, lineHeight: 1.65, token: "--text-body-lg" },
    { role: "body", font: "Inter", weight: 400, size: 15, lineHeight: 1.65, token: "--text-body" },
    { role: "label", font: "Inter", weight: 500, size: 13, lineHeight: 1.4, tracking: "0.16em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1120,
    sectionGap: 96,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "4px" },
    { element: "buttons", value: "4px" },
    { element: "inputs", value: "4px" },
    { element: "stamps", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Cream", value: "#f5e6d3", purpose: "页面画布" },
    { level: 1, name: "Lifted Cream", value: "#faf0e2", purpose: "卡片与面板" },
    { level: 2, name: "Forest Block", value: "#2e4a3f", purpose: "深色区块与页脚" },
  ],
  elevation: [
    { name: "None", value: "none — everything sits flat on the paper" },
    { name: "Inset rule", value: "inset 0 0 0 1px rgba(139,69,19,0.25)" },
  ],
  components: [
    {
      name: "Letterpress Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "棕褐填充、奶油文字、2px 同色描边、4px 圆角、无阴影。15px/500、全大写、0.16em 字距、padding 14px 28px。hover 时填充换成深一档的棕并保持位置不变（不位移不缩放）；按下时改为 2px 描边的透明按钮。过渡 300ms ease-out，绝不快于 150ms。",
        en: "Sepia fill, cream text, a 2px border in the same hue, 4px radius, no shadow. 15px at weight 500, uppercase, 0.16em tracking, 14px 28px padding. Hover deepens the fill and stays exactly in place — no translation, no scale. Press switches to a transparent button with a 2px border. 300ms ease-out, never faster than 150ms.",
      },
      sizes: "padding 14px 28px; label 15px",
      states: "hover: deeper fill, no movement; active: outlined",
    },
    {
      name: "Paper Card",
      role: { zh: "内容卡与菜单卡", en: "Content and menu cards" },
      construction: {
        zh: "奶油底提亮一档、2px 棕褐 25% 描边、4px 圆角、内边距 32px。内部可加 1px 的虚线分隔（模拟票券）。标题用衬线 28px 全大写 0.16em，正文 15px、行高 1.65。hover 只加深描边到 40%，元素不动。",
        en: "A cream ground one step lifted, a 2px sepia border at 25%, 4px radius, 32px padding. A 1px dashed rule may divide it like a ticket stub. Titles run 28px serif uppercase at 0.16em; body at 15px on 1.65 leading. Hover only deepens the border to 40% — the card does not move.",
      },
    },
    {
      name: "Stamp Badge",
      role: { zh: "标签与邮戳式标记", en: "Tags and postmark-style marks" },
      construction: {
        zh: "橄榄或砖红填充、奶油文字、999px 全圆角、无描边，12px/500、全大写、0.16em 字距、padding 4px 12px。可叠一层内阴影模拟压印（inset 0 1px 0 白 30%）。",
        en: "Olive or brick fill, cream text, fully rounded, no border. 12px at weight 500, uppercase, 0.16em tracking, 4px 12px padding. An inset 0 1px 0 highlight at 30% white can imitate an embossed stamp.",
      },
    },
    {
      name: "Ticker Rule",
      role: { zh: "分隔与装饰横条", en: "Dividers and decorative rules" },
      construction: {
        zh: "高 32px，棕褐底上重复小花纹（圆点或斜线），或 2px 纯棕褐实线。用于区块之间，替代大片留白，页边宽度 24px。不做滚动动画。",
        en: "32px tall, repeating a small ornament (dots or diagonals) on a sepia ground, or a plain 2px sepia rule. It separates sections in place of large whitespace, with 24px page margins. No scrolling animation.",
      },
    },
  ],
  imagery: {
    zh: "老照片、印刷品扫描、木刻版画。允许叠一层纸纹与 5% 的泛黄。图像边缘可以是粗描边框或邮票齿孔。不使用现代摄影、3D 渲染与高饱和色。",
    en: "Old photographs, print scans and woodcut engravings, optionally layered with paper grain and a 5% yellow cast. Edges may take a heavy border or a stamp perforation. No modern photography, 3D renders or saturated color.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 32px，区块间距 96px。允许居中的老式对称版面（这与现代左对齐不同），标题常与细线装饰成组。信息可以密，但每块之间用装饰横条隔开。",
    en: "Capped at 1120px with 32px padding, sections 96px apart. Centred symmetrical layouts are allowed here — unlike modern left-aligned systems — and headings often pair with a decorative rule. Density is welcome as long as blocks are divided by ornamented rules.",
  },
  dos: [
    { zh: "所有元素保持静止，不做位移与缩放", en: "Everything stays still; no translation or scale" },
    { zh: "过渡不短于 150ms", en: "Transitions never run faster than 150ms" },
    { zh: "标题全大写、0.16em 宽字距", en: "Headings uppercase at 0.16em tracking" },
    { zh: "边框 2px 起，用棕色系", en: "Borders start at 2px, in the brown family" },
    { zh: "配色全部低饱和偏黄", en: "Every color is desaturated and yellow-shifted" },
    { zh: "用纸纹与压印暗示年代", en: "Use paper grain and embossing to imply age" },
  ],
  donts: [
    { zh: "不要用任何 scale 或 translate-y", en: "No scale or translate-y anywhere" },
    { zh: "不要用快于 150ms 的过渡", en: "No transition under 150ms" },
    { zh: "不要用现代渐变与玻璃态", en: "No modern gradients or glass effects" },
    { zh: "不要用霓虹或高饱和色", en: "No neon or saturated color" },
    { zh: "不要用极简扁平语言", en: "Do not fall into flat minimalism" },
    { zh: "不要用大圆角", en: "No large radii" },
  ],
  promptGuide: {
    quickColors: {
      text: "#8b4513",
      background: "#f5e6d3",
      card: "#faf0e2",
      brick: "#c94c4c",
      forest: "#2e4a3f",
      olive: "#816904",
    },
    prompts: [
      {
        zh: "做一个复古风格卡片：背景 #faf0e2、2px solid rgba(139,69,19,0.25) 描边、4px 圆角、内边距 32px、无阴影。标题用衬线 28px 全大写 0.16em 字距、色 #8b4513；正文 15px、行高 1.65。hover 时只把描边加深到 rgba(139,69,19,0.4)，transition 300ms ease-out，不位移不缩放。页面底色 #f5e6d3。",
        en: "Build a vintage card: background #faf0e2, a 2px solid rgba(139,69,19,0.25) border, 4px radius, 32px padding, no shadow. The title runs 28px serif uppercase at 0.16em in #8b4513; body at 15px on 1.65 leading. Hover only deepens the border to rgba(139,69,19,0.4) over 300ms ease-out, with no translation or scale. The page ground is #f5e6d3.",
      },
    ],
  },
  similar: [
    { name: "Latex Paper", why: { zh: "同样以纸感与排版年代感为主，但更偏学术排版", en: "Also paper-led and typographically dated, though closer to academic setting" } },
    { name: "Editorial", why: { zh: "同为印刷来源，但编辑风是现代的、克制的", en: "Also print-derived, though editorial is contemporary and restrained" } },
  ],
  completeness: "full",
};
