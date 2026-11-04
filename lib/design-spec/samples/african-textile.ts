import type { DesignSpec } from "../types";

export const africanTextileSpec: DesignSpec = {
  slug: "african-textile",
  name: "非洲纺织",
  nameEn: "African Textile",
  cover: "/styles/african-textile.svg",
  theme: "dark",
  northStar: {
    zh: "肯特布的经纬、阿迪雷的染痕：颜色与结构一起织出来。",
    en: "Kente warp and weft, adire dye marks — color and structure woven together.",
  },
  summary: {
    zh: "非洲纺织来自西非的肯特布（Kente）与阿迪雷扎染（Adire）：深木色底（#2c1810）传达厚重感，肯特橙（#c4501f）与金（#f0c75e）作强调，沙（#e8d5b5）作卡片与辅助底，森林绿（#1a5632）作文字与装饰。核心图形是几何织纹——条纹、棋盘与菱形的交替重复，像布上的经纬；边框用 2 到 4px 的粗线传达织物结构；圆角保持 8px，手工但不粗糙；标题粗体全大写加宽字距，有庄重感。",
    en: "African Textile draws on West African Kente cloth and adire resist dye: a dark wood ground (#2c1810) for weight, Kente orange (#c4501f) and gold (#f0c75e) for emphasis, sand (#e8d5b5) for cards and secondary grounds, and forest green (#1a5632) for text and ornament. The core graphic is woven geometry — stripes, checks and diamonds repeating in alternation like warp and weft. Borders run 2 to 4px to carry the cloth's structure, radii hold at 8px so the work stays handmade rather than crude, and headings are bold uppercase on wide tracking for gravity.",
  },
  colors: [
    {
      name: "肯特橙",
      nameEn: "Kente Orange",
      value: "#c4501f",
      group: "brand",
      role: {
        zh: "第一主色：主按钮、条纹与最抢眼的织纹带。",
        en: "The first primary on buttons, stripes and the loudest woven band.",
      },
      token: "--color-kente-orange",
    },
    {
      name: "深木",
      nameEn: "Dark Wood",
      value: "#2c1810",
      group: "surface",
      role: {
        zh: "页面底。深到让橙与金都显暖。",
        en: "The page ground — dark enough to warm both the orange and the gold.",
      },
      token: "--color-dark-wood",
    },
    {
      name: "金",
      nameEn: "Gold",
      value: "#f0c75e",
      group: "accent",
      role: {
        zh: "第二主色：织纹里的亮线、高光与徽标。",
        en: "The second primary on bright threads, highlights and badges.",
      },
      token: "--color-gold",
    },
    {
      name: "森林绿",
      nameEn: "Forest",
      value: "#1a5632",
      group: "brand",
      role: {
        zh: "文字与装饰色，也是织纹的第三支。",
        en: "Text and ornament — the third thread of the weave.",
      },
      token: "--color-forest",
    },
    {
      name: "沙",
      nameEn: "Sand",
      value: "#e8d5b5",
      group: "surface",
      role: {
        zh: "卡片与浅色区块底。对深木的平衡。",
        en: "Cards and light blocks, balancing the dark wood.",
      },
      token: "--color-sand",
    },
    {
      name: "嫩绿",
      nameEn: "Sprout",
      value: "#80e671",
      group: "accent",
      role: {
        zh: "最亮的一支，只在极小面积出现作点缀。",
        en: "The brightest tone, appearing only in very small areas.",
      },
      token: "--color-sprout",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Arial Black', Helvetica, sans-serif",
      weights: [700, 900],
      sizes: [13, 16, 21, 28, 36, 48],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.6 },
      tracking: { display: "0.02em", label: "0.24em" },
      role: {
        zh: "粗无衬线，标题 900 字重、全大写、字距 0.24em。宽字距像织物的经线间距。",
        en: "A heavy sans: headings at 900, uppercase, at 0.24em tracking. The wide spacing echoes the warp of the cloth.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 48, lineHeight: 1.15, tracking: "0.02em", token: "--text-display" },
    { role: "heading", weight: 900, size: 36, lineHeight: 1.2, tracking: "0.02em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 28, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", weight: 700, size: 21, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 700, size: 16, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 900, size: 13, lineHeight: 1.4, tracking: "0.24em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1160,
    sectionGap: 96,
    cardPadding: 28,
    elementGap: 20,
  },
  radii: [
    { element: "cards", value: "8px" },
    { element: "buttons", value: "6px" },
    { element: "inputs", value: "6px" },
  ],
  surfaces: [
    { level: 0, name: "Dark Wood", value: "#2c1810", purpose: "页面底" },
    { level: 1, name: "Sand Card", value: "#e8d5b5", purpose: "卡片" },
    { level: 2, name: "Woven Band", value: "#c4501f", purpose: "织纹带" },
  ],
  elevation: [
    { name: "Cloth lift", value: "0 4px 0 rgba(44,24,16,0.60)" },
    { name: "Cloth depth", value: "0 8px 24px rgba(44,24,16,0.50)" },
  ],
  components: [
    {
      name: "Kente Band",
      role: { zh: "肯特织纹带（签名）", en: "The Kente band — the signature" },
      construction: {
        zh: "一条 24 到 64px 高的织纹带，用 repeating-linear-gradient 交替排列四种色（橙、金、森林绿、沙）的竖条纹，条纹宽 8 到 16px 且不均匀（宽窄交替）。带内每 3 条加一个菱形或棋盘小格。它出现在页头、区块之间或卡片顶部。",
        en: "A 24 to 64px band woven from a repeating gradient alternating four colors — orange, gold, forest, sand — in stripes 8 to 16px wide and deliberately uneven. Every third stripe carries a diamond or check. It appears at the header, between sections, or at a card's top.",
      },
    },
    {
      name: "Woven Card",
      role: { zh: "织物卡片（核心组件）", en: "The woven card — the core component" },
      construction: {
        zh: "沙色填充、8px 圆角、4px 深木描边、内边距 28px，顶部接一条 12px 的肯特织纹带。标题 36px/900 全大写森林绿、字距 0.02em，正文 16px 深木 85%。hover 时描边换肯特橙、整体上浮 2px。",
        en: "Sand fill, 8px radius, a 4px dark wood border, 28px padding, with a 12px Kente band along the top. The title runs 36px/900 uppercase in forest at 0.02em with body at 16px in 85% dark wood. Hover swaps the border to Kente orange and lifts 2px.",
      },
      states: "hover: orange border, lift 2px",
    },
    {
      name: "Weave Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "肯特橙填充、金色文字、6px 圆角、2px 深木描边、13px/900 全大写、字距 0.24em、padding 14px 32px，硬阴影 0 4px 0 深木 60%。hover 时填充转金、文字转深木；按下时位移 4px 4px 且阴影归零。过渡 120ms linear。",
        en: "Kente orange fill, gold text, 6px radius, a 2px dark wood border, 13px/900 uppercase at 0.24em, 14px 32px padding, hard shadow 0 4px 0 at 60% dark wood. Hover flips the fill to gold and the text to dark wood; press translates 4px 4px and zeroes the shadow. 120ms linear.",
      },
      sizes: "padding 14px 32px; label 13px",
      states: "hover: inverted; active: translate 4px",
    },
    {
      name: "Adire Wash",
      role: { zh: "扎染纹理底", en: "The adire dye wash" },
      construction: {
        zh: "用多层 radial-gradient（8 到 16px 的圆、随机错位）在底色上叠出扎染的不规则圆斑，色取金或橙、不透明度 8% 到 15%。它必须是「不均匀的重复」，规则的点阵会立刻看起来像 UI 而不是布。",
        en: "Layered radial gradients — 8 to 16px circles, irregularly offset — scatter resist-dye marks in gold or orange at 8% to 15%. It must repeat unevenly; an even dot field immediately reads as UI rather than cloth.",
      },
    },
    {
      name: "Diamond Motif",
      role: { zh: "菱形与棋盘装饰", en: "The diamond and check ornament" },
      construction: {
        zh: "24 到 48px 的实心菱形（rotate 45 度的方块）或 2×2 棋盘，填金、橙或森林绿，成组排列（2 到 4 个）。它们模拟织物上的符号纹样，放在卡片角落或分区之间，单屏 2 到 3 组。",
        en: "A 24 to 48px solid diamond (a square at 45 degrees) or a 2×2 check in gold, orange or forest, arranged in clusters of two to four. They imitate the symbolic motifs of the cloth and sit at card corners or between regions, two to three clusters per screen.",
      },
    },
  ],
  imagery: {
    zh: "织物与手工艺摄影：肯特布、扎染、编织篮、陶罐、市场场景。必须暖调、高对比、可见织纹。允许把照片裁成条带嵌入织纹结构。不使用冷调摄影、现代极简与无织纹的图像。",
    en: "Textile and craft photography: Kente cloth, resist dye, woven baskets, pottery, markets. Warm, high-contrast, with visible weave, and a photo may be cropped into strips set into the woven structure. No cool-toned photography, modern minimalism or imagery without texture.",
  },
  layout: {
    zh: "上限 1160px、容器内边距 24px，区块间距 96px。织纹带作为分区手段（替代普通分隔线）。允许卡片以不同宽度错落排列，像布的拼缝。",
    en: "Capped at 1160px with 24px padding, sections 96px apart. Woven bands divide sections in place of ordinary rules, and cards may stagger in width like seams in cloth.",
  },
  dos: [
    { zh: "深木底配肯特橙与金", en: "Dark wood with Kente orange and gold" },
    { zh: "织纹带用交替条纹加小格", en: "Woven bands alternate stripes and checks" },
    { zh: "边框 2 到 4px 传达织物结构", en: "Borders run 2 to 4px for cloth structure" },
    { zh: "标题全大写加宽字距", en: "Headings uppercase on wide tracking" },
    { zh: "圆角 8px，手工但不粗糙", en: "Radius 8px — handmade, not crude" },
    { zh: "扎染纹理必须不均匀", en: "The dye wash must repeat unevenly" },
  ],
  donts: [
    { zh: "不要用冷调摄影", en: "No cool-toned photography" },
    { zh: "不要用规则点阵冒充织纹", en: "Never pass an even dot field off as weave" },
    { zh: "不要用细边框", en: "No thin borders" },
    { zh: "不要用大圆角", en: "No large radii" },
    { zh: "不要用现代极简", en: "No modern minimalism" },
    { zh: "不要让织纹抢过内容", en: "Never let the weave overpower content" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a5632",
      background: "#2c1810",
      orange: "#c4501f",
      gold: "#f0c75e",
      sand: "#e8d5b5",
      forest: "#1a5632",
    },
    prompts: [
      {
        zh: "做一个非洲纺织卡片：沙色 #e8d5b5 填充、8px 圆角、4px solid #2c1810 描边、内边距 28px。顶部接一条 12px 高的肯特织纹带：用 repeating-linear-gradient 交替 #c4501f、#f0c75e、#1a5632、#e8d5b5 的竖条纹，条纹宽窄交替（8px 与 16px），每三条加一个菱形小格。标题 36px/900 Inter 全大写、字距 0.02em、色 #1a5632；正文 16px、色 rgba(44,24,16,0.85)。按钮 #c4501f 填充、金色文字、6px 圆角、2px 深木描边、硬阴影 0 4px 0 rgba(44,24,16,0.6)，hover 时填充转 #f0c75e、文字转深木。页面底色 #2c1810。",
        en: "Build an African textile card: sand #e8d5b5 fill, 8px radius, a 4px solid #2c1810 border, 28px padding. A 12px Kente band caps the top: a repeating linear gradient alternating #c4501f, #f0c75e, #1a5632 and #e8d5b5 in unequal vertical stripes of 8px and 16px, with a diamond every third stripe. The title runs 36px/900 Inter uppercase at 0.02em in #1a5632 with body at 16px in rgba(44,24,16,0.85). The button fills #c4501f with gold text on a 6px radius, a 2px dark wood border and a hard shadow of 0 4px 0 rgba(44,24,16,0.6), flipping to #f0c75e with dark wood text on hover. The page ground is #2c1810.",
      },
    ],
  },
  similar: [
    { name: "Islamic Geometric", why: { zh: "同为几何织纹，但伊斯兰是精密镶嵌，非洲纺织是手工条纹", en: "Both geometric weave, though Islamic is precise tessellation while this is hand-woven stripe" } },
    { name: "Maximalism", why: { zh: "同样高饱和并列，但极繁无织纹结构，非洲纺织有经纬秩序", en: "Both saturated and layered, though maximalism has no weave structure while this keeps warp and weft" } },
  ],
  completeness: "full",
};
