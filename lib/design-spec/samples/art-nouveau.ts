import type { DesignSpec } from "../types";

export const artNouveauSpec: DesignSpec = {
  slug: "art-nouveau",
  name: "新艺术运动风",
  nameEn: "Art Nouveau",
  cover: "/styles/art-nouveau.svg",
  theme: "light",
  northStar: {
    zh: "没有一条直线：藤蔓、长发、花茎都按植物生长的逻辑弯。",
    en: "Not one straight line: vines, hair and stems all bend the way plants grow.",
  },
  summary: {
    zh: "新艺术运动来自 19 世纪末：一切边缘都必须是曲线，藤蔓与花茎是主要装饰语汇，Mucha 式的海报构图把人物与植物编织进同一个框架。落到界面上，核心纪律是「禁止直角与几何形状」——按钮全圆角、卡片圆角、边框用弧线、分隔线用波浪。字体必须是衬线或装饰性字体，现代无衬线在标题上是被禁的。节奏也要慢：过渡 500 到 700ms 的 ease-in-out，像植物的律动；150 到 200ms 的短促过渡和硬边阴影一同被排除。",
    en: "Art Nouveau arrived at the end of the nineteenth century: every edge curves, vines and stems supply the ornament, and Mucha's poster compositions braid figure and flora into one frame. On screen the core discipline is that right angles and geometric shapes are banned — buttons are fully round, cards rounded, borders drawn as arcs and dividers as waves. Type must be serif or decorative; a modern sans on a heading is refused. Tempo stays slow too, at 500 to 700ms ease-in-out like a plant moving, with 150 to 200ms snaps and hard-edge shadows excluded alongside it.",
  },
  colors: [
    {
      name: "深绿",
      nameEn: "Deep Green",
      value: "#2d5016",
      group: "brand",
      role: {
        zh: "主色：正文、主按钮与深色区块。植物茎叶的绿。",
        en: "The primary on body, primary buttons and dark blocks — the green of stems and leaves.",
      },
      token: "--color-deep-green",
    },
    {
      name: "象牙",
      nameEn: "Ivory",
      value: "#f5f0e1",
      group: "surface",
      role: {
        zh: "页面底与纸面。泛黄的旧海报色。",
        en: "The page ground and paper — the yellowed ivory of an old poster.",
      },
      token: "--color-ivory",
    },
    {
      name: "金",
      nameEn: "Gold",
      value: "#c9a227",
      group: "accent",
      role: {
        zh: "描边与高光，用于勾出曲线的边缘。",
        en: "Strokes and highlights, tracing the edge of every curve.",
      },
      token: "--color-gold",
    },
    {
      name: "紫藤",
      nameEn: "Wisteria",
      value: "#8b6db5",
      group: "accent",
      role: {
        zh: "第二色，用于花朵与情绪化强调。",
        en: "The second color, on blossoms and emotional emphasis.",
      },
      token: "--color-wisteria",
    },
    {
      name: "叶绿",
      nameEn: "Leaf",
      value: "#4a7c3f",
      group: "accent",
      role: {
        zh: "中绿，用于次级区块与藤蔓线条。",
        en: "A middle green for secondary blocks and vine lines.",
      },
      token: "--color-leaf",
    },
    {
      name: "亮绿",
      nameEn: "Bright Green",
      value: "#4bc542",
      group: "accent",
      role: {
        zh: "最小面积的点缀，只用于新芽与「新增」标记。",
        en: "The smallest accent, only on new growth and 'new' marks.",
      },
      token: "--color-bright-green",
    },
  ],
  fonts: [
    {
      family: "Playfair Display",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400, 700],
      sizes: [16, 20, 26, 36, 48, 60],
      lineHeight: { display: 1.1, heading: 1.25, body: 1.8 },
      tracking: { display: "0.01em", label: "0.12em" },
      role: {
        zh: "标题用高对比衬线，带装饰性。正文用同一族但更细的字重，行高 1.8。",
        en: "Headings in a high-contrast decorative serif; body in the same family at a lighter weight on 1.8 leading.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", font: "Playfair Display", weight: 700, size: 60, lineHeight: 1.1, tracking: "0.01em", token: "--text-display" },
    { role: "heading-lg", font: "Playfair Display", weight: 700, size: 48, lineHeight: 1.15, token: "--text-heading-lg" },
    { role: "heading", font: "Playfair Display", weight: 700, size: 36, lineHeight: 1.25, token: "--text-heading" },
    { role: "subheading", font: "Playfair Display", weight: 400, size: 26, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body", font: "Playfair Display", weight: 400, size: 16, lineHeight: 1.8, token: "--text-body" },
    { role: "label", font: "Playfair Display", weight: 400, size: 14, lineHeight: 1.5, tracking: "0.12em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1080,
    sectionGap: 128,
    cardPadding: 36,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "32px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "999px" },
    { element: "frames", value: "48px" },
  ],
  surfaces: [
    { level: 0, name: "Ivory", value: "#f5f0e1", purpose: "页面底" },
    { level: 1, name: "Soft Ivory", value: "#faf7ef", purpose: "卡片" },
    { level: 2, name: "Deep Green", value: "#2d5016", purpose: "深色区块" },
  ],
  elevation: [
    { name: "Soft", value: "0 4px 15px rgba(45,80,22,0.20)" },
    { name: "Soft hover", value: "0 8px 25px rgba(201,162,39,0.40)" },
  ],
  components: [
    {
      name: "Vine Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "深绿填充、象牙文字、1px 金描边、999px 全圆角、衬线 15px、字距 0.12em、padding 16px 32px，阴影 0 4px 15px 绿 20%。hover 时填充换金、文字换深绿、阴影扩到 25px、箭头右移 4px；按下缩到 0.98。过渡 500ms ease-in-out。",
        en: "Deep green fill, ivory text, a 1px gold border, fully rounded, serif at 15px with 0.12em tracking, 16px 32px padding, shadow 0 4px 15px at 20% green. Hover swaps fill to gold and text to deep green, widens the shadow to 25px and moves an arrow 4px right; press scales 0.98. 500ms ease-in-out.",
      },
      sizes: "padding 16px 32px; label 15px",
      states: "hover: gold fill, arrow shifts; active: scale 0.98",
    },
    {
      name: "Vine Card",
      role: { zh: "内容卡与海报块", en: "Content cards and poster blocks" },
      construction: {
        zh: "柔和象牙填充、32px 圆角、1px 金 35% 描边、内边距 36px，阴影 0 4px 15px 绿 20%。顶部或左侧放一条 1px 叶绿的藤蔓曲线（用 SVG 单条 path 画，带两到三片叶子）。hover 时描边升到 60%、阴影扩到 25px、藤蔓整体顺时针旋转 3 度。过渡 700ms ease-in-out。",
        en: "Soft ivory fill, 32px radius, a 1px gold border at 35%, 36px padding, shadow 0 4px 15px at 20% green. A single 1px leaf-green vine path runs along the top or left edge with two or three leaves. Hover raises the border to 60%, widens the shadow to 25px and rotates the vine three degrees clockwise. 700ms ease-in-out.",
      },
    },
    {
      name: "Wave Divider",
      role: { zh: "波浪分隔线", en: "The wave divider" },
      construction: {
        zh: "一条 1px 的金色波浪线（SVG 单周期正弦，振幅 8px、周期 120px），横跨内容宽，中央可放一朵 16px 的紫藤花。替代直线分隔，与藤蔓装饰配套。",
        en: "A 1px gold wave — a single sine period with an 8px amplitude over a 120px wavelength — spanning the content width, optionally carrying a 16px wisteria blossom at its centre. It replaces straight dividers and pairs with the vine ornament.",
      },
    },
    {
      name: "Curved Frame",
      role: { zh: "弧形边框与图片容器", en: "Curved frames and image containers" },
      construction: {
        zh: "图片容器不用矩形，用拱形（border-radius 顶端 999px 而底部 8px）或椭圆裁切。外框 1px 金描边，四角各放一个小卷草纹。不加阴影。",
        en: "Image containers are never rectangular: they take an arch (999px on the top corners, 8px at the bottom) or an elliptical crop. A 1px gold border wraps them with a small scroll leaf at each corner. No shadow.",
      },
    },
    {
      name: "Blossom Mark",
      role: { zh: "花朵标记与徽标", en: "Blossom marks and badges" },
      construction: {
        zh: "五瓣花形（用 SVG path 或 CSS 多圆叠加），32px 到 64px，填紫藤或金色，中心一个 6px 的深色圆点。用于章节标记与「精选」标签，单屏不超过三处。",
        en: "A five-petal blossom (an SVG path or overlapping circles) between 32px and 64px, filled wisteria or gold with a 6px dark centre. It marks chapters and featured items, no more than three per screen.",
      },
    },
  ],
  imagery: {
    zh: "Mucha 式海报插画：长发、花卉、藤蔓边框、单色平涂加细线。允许把照片处理成新艺术风格的双色调后再加曲线边框。不使用几何插画、现代摄影与硬边图形。",
    en: "Mucha-style poster illustration: flowing hair, flowers, vine frames, flat fills with fine line work. A photo may be graded to a Nouveau duotone inside a curved frame. No geometric illustration, modern photography or hard-edged graphics.",
  },
  layout: {
    zh: "上限 1080px、容器内边距 24px，区块间距 128px。允许非对称构图与曲线边界（区块底部可做成弧线）。元素沿植物生长的方向轻微偏移，但正文保持可读的左对齐。",
    en: "Capped at 1080px with 24px padding, sections 128px apart. Asymmetric composition and curved boundaries are welcome — a section may end on an arc — and elements may drift along a growing line while body text keeps a readable left edge.",
  },
  dos: [
    { zh: "所有边缘都是曲线", en: "Every edge is a curve" },
    { zh: "用藤蔓与花朵作装饰", en: "Ornament with vines and blossoms" },
    { zh: "标题用装饰性衬线", en: "Headings in a decorative serif" },
    { zh: "过渡 500 到 700ms ease-in-out", en: "Transitions run 500 to 700ms ease-in-out" },
    { zh: "深绿配金与象牙", en: "Pair deep green with gold and ivory" },
    { zh: "分隔用波浪线", en: "Dividers are waves" },
  ],
  donts: [
    { zh: "不要用生硬直角与几何形状", en: "No rigid right angles or geometric shapes" },
    { zh: "不要用霓虹或高饱和现代色", en: "No neon or saturated modern color" },
    { zh: "不要用粗犷无装饰的设计", en: "No rough undecorated design" },
    { zh: "不要在标题用现代无衬线", en: "No modern sans on headings" },
    { zh: "不要用 150 或 200ms 的短促过渡", en: "No 150 or 200ms snaps" },
    { zh: "不要用硬边阴影", en: "No hard-edge shadows" },
  ],
  promptGuide: {
    quickColors: {
      text: "#2d5016",
      background: "#f5f0e1",
      card: "#faf7ef",
      gold: "#c9a227",
      wisteria: "#8b6db5",
      leaf: "#4a7c3f",
    },
    prompts: [
      {
        zh: "做一个新艺术风格卡片：背景 #faf7ef、32px 圆角、1px rgba(201,162,39,0.35) 描边、内边距 36px、阴影 0 4px 15px rgba(45,80,22,0.2)。左侧放一条 1px #4a7c3f 的藤蔓 SVG 曲线并带两片叶子。标题 36px Playfair Display 700、色 #2d5016；正文 16px 衬线、行高 1.8。卡片下方用一条 1px 金色波浪线（振幅 8px）分隔。hover 时描边升到 rgba(201,162,39,0.6)、藤蔓 rotate(3deg)，transition 700ms ease-in-out。页面底色 #f5f0e1。",
        en: "Build an Art Nouveau card: background #faf7ef, 32px radius, a 1px rgba(201,162,39,0.35) border, 36px padding, shadow 0 4px 15px rgba(45,80,22,0.2). A 1px #4a7c3f vine path runs along the left edge with two leaves. The title runs 36px Playfair Display 700 in #2d5016; body at 16px serif on 1.8 leading. A 1px gold wave at 8px amplitude divides the section below. Hover raises the border to rgba(201,162,39,0.6) and rotates the vine 3 degrees over 700ms ease-in-out. The page ground is #f5f0e1.",
      },
    ],
  },
  similar: [
    { name: "Art Deco", why: { zh: "同属 20 世纪初，但装饰艺术要直线与对称，新艺术要曲线与生长", en: "Both early twentieth century, though Deco demands straight lines and symmetry while Nouveau demands curves and growth" } },
    { name: "Natural Organic", why: { zh: "同一自然取材，但新艺术有明确的装饰性与年代感", en: "Also nature-derived, though Nouveau carries explicit ornament and a period" } },
  ],
  completeness: "full",
};
