import type { DesignSpec } from "../types";

export const islamicGeometricSpec: DesignSpec = {
  slug: "islamic-geometric",
  name: "伊斯兰几何",
  nameEn: "Islamic Geometric",
  cover: "/styles/islamic-geometric.svg",
  theme: "light",
  northStar: {
    zh: "无限延展的镶嵌图案、金与深蓝、严格的对称：装饰即秩序。",
    en: "Infinitely repeating tessellation in gold and deep blue, strictly symmetrical — ornament as order.",
  },
  summary: {
    zh: "伊斯兰几何来自清真寺与经书的装饰传统：用精确的镶嵌图案（八芒星、六边形、几何交织）构成无限延展的边框与底纹，配色是深蓝（#1a3a5c）、金（#c9a74e）与象牙白（#f5ecd7）的经典组合，辅以墨绿（#2d7d46）与绛红（#8b2332）。布局严格对称并居中，边框用 2px 金线，阴影是极淡的金色扩散。它禁止荧光与霓虹、禁止不对称的混乱布局、禁止极简无装饰（适度装饰才是核心）、禁止手写与卡通字体。",
    en: "Islamic Geometric comes from the ornament of mosques and manuscripts: precise tessellation — eight-pointed stars, hexagons, interlaced geometry — forming borders and grounds that extend indefinitely, in the classic pairing of deep blue (#1a3a5c), gold (#c9a74e) and ivory (#f5ecd7), supported by forest (#2d7d46) and crimson (#8b2332). Layout is strictly symmetrical and centred, borders run 2px gold, and shadows are a faint gold diffusion. Fluorescent and neon color, asymmetric disorder, minimalism without ornament, and handwritten or cartoon faces are all refused.",
  },
  colors: [
    {
      name: "深蓝",
      nameEn: "Deep Blue",
      value: "#1a3a5c",
      group: "brand",
      role: {
        zh: "主色：深色区块与图案底。瓷砖的蓝。",
        en: "The primary on dark blocks and pattern grounds — tile blue.",
      },
      token: "--color-deep-blue",
    },
    {
      name: "象牙",
      nameEn: "Ivory",
      value: "#f5ecd7",
      group: "surface",
      role: {
        zh: "页面底与图文的纸色。",
        en: "The page ground and the stock for text and image.",
      },
      token: "--color-ivory",
    },
    {
      name: "金",
      nameEn: "Gold",
      value: "#c9a74e",
      group: "accent",
      role: {
        zh: "所有描边、图案线与强调。装饰的主要载体。",
        en: "Every stroke, pattern line and emphasis — the main carrier of ornament.",
      },
      token: "--color-gold",
    },
    {
      name: "墨绿",
      nameEn: "Forest",
      value: "#2d7d46",
      group: "accent",
      role: {
        zh: "第二辅色，用于植物纹样与次级区块。",
        en: "The second support on arabesque foliage and secondary blocks.",
      },
      token: "--color-forest",
    },
    {
      name: "绛红",
      nameEn: "Crimson",
      value: "#8b2332",
      group: "accent",
      role: {
        zh: "第三辅色，用于强调与需要跳出的细节。",
        en: "The third support on emphasis and detail that must jump.",
      },
      token: "--color-crimson",
    },
    {
      name: "亮绿",
      nameEn: "Bright Green",
      value: "#6bc15e",
      group: "accent",
      role: {
        zh: "最亮的一支，只在图案的小面积出现。",
        en: "The brightest tone, appearing only in small areas of a pattern.",
      },
      token: "--color-bright-green",
    },
  ],
  fonts: [
    {
      family: "Cormorant Garamond",
      substitute: "'EB Garamond', Georgia, 'Songti SC', serif",
      weights: [400, 600],
      sizes: [15, 18, 22, 30, 40, 54],
      lineHeight: { display: 1.2, heading: 1.35, body: 1.75 },
      tracking: { display: "0.02em", label: "0.2em" },
      role: {
        zh: "优雅衬线，标题居中并加宽字距。行高 1.75 让文字也有装饰的从容。",
        en: "An elegant serif, headings centred on wide tracking, body at 1.75 leading so the text shares the ornament's poise.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 54, lineHeight: 1.2, tracking: "0.02em", token: "--text-display" },
    { role: "heading", weight: 600, size: 40, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", weight: 400, size: 30, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 22, lineHeight: 1.7, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 18, lineHeight: 1.75, token: "--text-body" },
    { role: "label", weight: 600, size: 15, lineHeight: 1.55, tracking: "0.2em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1080,
    sectionGap: 128,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "12px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "8px" },
    { element: "arches", value: "50% 50% 0 0" },
  ],
  surfaces: [
    { level: 0, name: "Ivory", value: "#f5ecd7", purpose: "页面底" },
    { level: 1, name: "Deep Blue", value: "#1a3a5c", purpose: "深色区块" },
    { level: 2, name: "Gold Line", value: "rgba(201,167,78,0.20)", purpose: "图案线" },
  ],
  elevation: [
    { name: "Gold soft", value: "0 4px 12px rgba(201,167,78,0.20)" },
    { name: "Gold stronger", value: "0 8px 24px rgba(201,167,78,0.28)" },
  ],
  components: [
    {
      name: "Tessellation Border",
      role: { zh: "镶嵌边框（核心组件）", en: "The tessellation border — the core component" },
      construction: {
        zh: "用 SVG pattern 或重复的 conic-gradient 做出八芒星与六边形的交织图案，线宽 1px、色金 70%，单元尺寸 48px。作为区块边框（宽 24 到 48px）或底纹（不透明度降到 8%）。图案必须严格重复、无缝衔接。",
        en: "An SVG pattern or repeated conic gradients weave eight-pointed stars and hexagons at a 1px stroke in 70% gold with 48px cells. It serves as a section border 24 to 48px wide, or as a ground dropped to 8% opacity. The pattern must repeat exactly and join seamlessly.",
      },
    },
    {
      name: "Arch Frame",
      role: { zh: "拱形框", en: "The arch frame" },
      construction: {
        zh: "卡片顶部用 border-radius: 50% 50% 0 0 做出尖拱或半圆拱、2px 金描边、内部填深蓝或象牙、内边距 32px。四角各加一个 12px 的几何角饰（四分之一星）。",
        en: "A card's top takes border-radius 50% 50% 0 0 for a pointed or round arch, a 2px gold stroke, filled deep blue or ivory at 32px padding, with a 12px quarter-star at each corner.",
      },
    },
    {
      name: "Gold Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "金填充、深蓝文字、8px 圆角、1px 深蓝 30% 描边、15px/600、字距 0.2em、padding 14px 32px，阴影 0 4px 12px 金 20%。hover 时填充提亮 6%、阴影扩到 24px；按下缩放 0.98。四角可加 4px 的几何切角。",
        en: "Gold fill, deep blue text, 8px radius, a 1px deep blue border at 30%, 15px/600 at 0.2em, 14px 32px padding, shadow 0 4px 12px at 20% gold. Hover brightens the fill six percent and widens the shadow to 24px; press scales 0.98. A 4px geometric chamfer may cut each corner.",
      },
      sizes: "padding 14px 32px; label 15px",
      states: "hover: brighter, shadow 24px; active: scale 0.98",
    },
    {
      name: "Arabesque Divider",
      role: { zh: "植物纹分隔", en: "The arabesque divider" },
      construction: {
        zh: "一条 1px 金线的横线，中央嵌入一个 32px 的对称卷草纹（用 SVG path 画），左右各延伸一段交织的藤蔓。它替代普通分隔线，是版面上最典型的装饰语汇。",
        en: "A 1px gold rule with a 32px symmetrical scroll embedded at its centre, drawn as an SVG path, trailing interlaced vine to either side. It replaces the ordinary divider and is the page's most characteristic ornament.",
      },
    },
    {
      name: "Star Medallion",
      role: { zh: "星形徽章", en: "The star medallion" },
      construction: {
        zh: "48 到 120px 的八芒星或十六芒星（两个正方形叠转 45 度），1px 金描边填深蓝或绛红，中心一个 8px 的亮绿或金圆点。放在区块中央或标题上方，单屏 1 到 2 处。",
        en: "An eight- or sixteen-pointed star 48 to 120px across (two squares rotated 45 degrees apart) with a 1px gold stroke on deep blue or crimson, carrying an 8px bright green or gold dot at the centre. It sits at a section's centre or above a heading, once or twice per screen.",
      },
    },
  ],
  imagery: {
    zh: "建筑与装饰摄影：清真寺瓷砖、穹顶、木雕、经书页。必须有图案细节与对称构图。允许把照片处理成深蓝金双色调。不使用写实人物摄影、霓虹图像与不对称构图。",
    en: "Architectural and decorative photography: mosque tilework, domes, wood carving, manuscript pages. It needs pattern detail and a symmetrical frame. A photo may be graded to deep blue and gold. No portrait photography, neon imagery or asymmetric composition.",
  },
  layout: {
    zh: "上限 1080px、容器内边距 24px，区块间距 128px。严格对称并居中——这是整套风格不可协商的部分。所有区块四边可加镶嵌边框，但同一屏不超过两处，否则会拥挤。",
    en: "Capped at 1080px with 24px padding, sections 128px apart. Strict symmetry and centring are non-negotiable here. Any section may take a tessellation border, but no more than two per screen or it crowds.",
  },
  dos: [
    { zh: "深蓝、金、象牙的经典三色", en: "The classic trio: deep blue, gold, ivory" },
    { zh: "镶嵌图案必须无缝且精确重复", en: "Tessellation must be seamless and exact" },
    { zh: "布局严格对称并居中", en: "Layout is strictly symmetrical and centred" },
    { zh: "边框 2px 金线加几何角饰", en: "2px gold borders with geometric corner marks" },
    { zh: "阴影是极淡的金色扩散", en: "Shadows are a faint gold diffusion" },
    { zh: "植物纹用对称卷草", en: "Foliage takes symmetrical scrollwork" },
  ],
  donts: [
    { zh: "不要用荧光或霓虹色", en: "No fluorescent or neon color" },
    { zh: "不要用不对称的混乱布局", en: "No asymmetric disorder" },
    { zh: "不要极简无装饰", en: "Never go minimal without ornament" },
    { zh: "不要用手写或卡通字体", en: "No handwritten or cartoon faces" },
    { zh: "不要让图案失准", en: "Never let the pattern drift out of register" },
    { zh: "不要在一屏放两处以上镶嵌边框", en: "No more than two tessellation borders per screen" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a3a5c",
      background: "#f5ecd7",
      gold: "#c9a74e",
      forest: "#2d7d46",
      crimson: "#8b2332",
      blue: "#1a3a5c",
    },
    prompts: [
      {
        zh: "做一个伊斯兰几何卡片：象牙 #f5ecd7 填充、顶部 border-radius 50% 50% 0 0 做出拱形、2px solid #c9a74e 描边、内边距 32px、box-shadow 0 4px 12px rgba(201,167,78,0.2)。上方居中放一个 64px 的八芒星（两个正方形叠转 45 度、1px 金描边、填 #1a3a5c）。标题 40px/600 Cormorant Garamond、居中、字距 0.02em、色 #1a3a5c；正文 18px、行高 1.75。卡片下方用一条 1px 金线加中央 32px 对称卷草纹分隔。全部对称居中，零荧光色。",
        en: "Build an Islamic geometric card: ivory #f5ecd7 fill with a border-radius 50% 50% 0 0 arch at the top, a 2px solid #c9a74e border, 32px padding, box-shadow 0 4px 12px rgba(201,167,78,0.2). A 64px eight-pointed star (two squares rotated 45 degrees apart, 1px gold stroke on #1a3a5c) sits centred above. The heading runs 40px/600 Cormorant Garamond, centred at 0.02em in #1a3a5c, body at 18px on 1.75 leading. A 1px gold rule with a 32px symmetrical scroll at its centre divides the section below. Everything is symmetrical and centred, with no fluorescent color.",
      },
    ],
  },
  similar: [
    { name: "Art Deco", why: { zh: "同样金线与几何，但装饰艺术是机器时代的直线，伊斯兰几何是交织的镶嵌", en: "Both gold line and geometry, though Art Deco is machine-age straight line while this is interlaced tessellation" } },
    { name: "Gothic", why: { zh: "同为宗教装饰传统，但哥特是尖拱与彩窗，伊斯兰是无限重复的图案", en: "Both sacred ornament traditions, though Gothic is pointed arch and glass while this is infinite repetition" } },
  ],
  completeness: "full",
};
