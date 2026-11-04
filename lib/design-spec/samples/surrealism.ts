import type { DesignSpec } from "../types";

export const surrealismSpec: DesignSpec = {
  slug: "surrealism",
  name: "超现实主义风",
  nameEn: "Surrealism",
  cover: "/styles/surrealism.svg",
  theme: "dark",
  northStar: {
    zh: "梦境里的时间：一切都慢，一切都稍微歪着，光从不该来的方向来。",
    en: "Dream time: everything slow, everything slightly wrong, light arriving from where it should not.",
  },
  summary: {
    zh: "超现实主义借用达利的语汇：午夜蓝与沙漠金的意外配色、不合逻辑的空间关系、融化与变形的形状、以及从不该来的方向打来的光。它有两条独有的时间与位移规则——第一，所有过渡必须是 700 到 1000ms 的 ease-in-out（Timeless Easing），因为梦境的时间是弹性的；第二，hover 绝不允许 scale，只能用 skew 与 rotate 扭曲现实。阴影也不能是黑色，必须用玫瑰或金色的漫射光晕，黑色阴影会瞬间把梦叫醒。",
    en: "Surrealism borrows Dalí's vocabulary: unexpected pairings of midnight blue with desert gold, illogical spatial relationships, melting and morphing forms, and light arriving from the wrong direction. Two rules govern time and movement. First, every transition runs 700 to 1000ms ease-in-out (Timeless Easing), because dream time is elastic. Second, hover never scales — it skews and rotates to distort reality. Shadows may never be black either; they must be diffuse rose or gold halos, since a black shadow wakes the dream instantly.",
  },
  colors: [
    {
      name: "午夜蓝",
      nameEn: "Midnight Blue",
      value: "#1a1a3e",
      group: "surface",
      role: {
        zh: "页面底与主色。深到接近黑，但仍保留蓝的呼吸。",
        en: "The page ground and primary — dark enough to read as black while keeping a blue breath.",
      },
      token: "--color-midnight",
    },
    {
      name: "米白",
      nameEn: "Bone",
      value: "#f0ece4",
      group: "surface",
      role: {
        zh: "文字与浅色块。像梦里发灰的骨白。",
        en: "Text and light blocks — a bone white that has already greyed in the dream.",
      },
      token: "--color-bone",
    },
    {
      name: "沙漠金",
      nameEn: "Desert Gold",
      value: "#d4a574",
      group: "accent",
      role: {
        zh: "暖侧强调与光晕色。天上那束不该存在的阳光。",
        en: "The warm accent and halo color — the sunlight that should not be there.",
      },
      token: "--color-desert-gold",
    },
    {
      name: "灰玫瑰",
      nameEn: "Dusty Rose",
      value: "#c38d94",
      group: "accent",
      role: {
        zh: "第二强调与阴影的替代色。所有投影都用它而不是黑。",
        en: "The second accent and substitute for shadow — every cast glow uses this instead of black.",
      },
      token: "--color-dusty-rose",
    },
    {
      name: "紫罗兰",
      nameEn: "Violet",
      value: "#4a3f6b",
      group: "accent",
      role: {
        zh: "深紫用于融化的形体与层叠阴影。",
        en: "Deep violet for melting forms and layered shade.",
      },
      token: "--color-violet",
    },
    {
      name: "苔绿",
      nameEn: "Moss",
      value: "#90ba6d",
      group: "accent",
      role: {
        zh: "唯一的一抹生机，出现频率最低，用来打破梦的窒息感。",
        en: "The one note of life, used least, breaking the dream's suffocation.",
      },
      token: "--color-moss",
    },
  ],
  fonts: [
    {
      family: "Cormorant Garamond",
      substitute: "'EB Garamond', Georgia, 'Songti SC', serif",
      weights: [300, 400, 600],
      sizes: [15, 18, 22, 30, 42, 58],
      lineHeight: { display: 1.1, heading: 1.25, body: 1.8 },
      tracking: { display: "0.01em", label: "0.1em" },
      role: {
        zh: "全站衬线，标题允许斜体。细笔画的衬线在深底上像被手写上去的。",
        en: "Serif throughout, with italic allowed on headings. Its thin strokes read as hand-written on the dark.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", font: "Cormorant Garamond", weight: 300, size: 58, lineHeight: 1.1, tracking: "0.01em", token: "--text-display" },
    { role: "heading", font: "Cormorant Garamond", weight: 400, size: 42, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", font: "Cormorant Garamond", weight: 400, size: 30, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", font: "Cormorant Garamond", weight: 400, size: 22, lineHeight: 1.7, token: "--text-body-lg" },
    { role: "body", font: "Cormorant Garamond", weight: 400, size: 18, lineHeight: 1.8, token: "--text-body" },
    { role: "label", font: "Cormorant Garamond", weight: 600, size: 15, lineHeight: 1.5, tracking: "0.1em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 144],
    maxWidth: 1120,
    sectionGap: 144,
    cardPadding: 36,
    elementGap: 28,
  },
  radii: [
    { element: "cards", value: "32px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "24px" },
    { element: "orbs", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Midnight", value: "#1a1a3e", purpose: "页面底" },
    { level: 1, name: "Melting Panel", value: "rgba(74,63,107,0.40)", purpose: "卡片（半透明紫）" },
    { level: 2, name: "Bone Patch", value: "#f0ece4", purpose: "浅色反差点" },
  ],
  elevation: [
    { name: "Abyssal glow", value: "0 24px 60px rgba(195,141,148,0.22)" },
    { name: "Gold halo", value: "0 12px 40px rgba(212,165,116,0.28)" },
    { name: "Never", value: "black shadows are forbidden" },
  ],
  components: [
    {
      name: "Melting Panel",
      role: { zh: "卡片与内容面板", en: "Cards and content panels" },
      construction: {
        zh: "紫色 40% 填充、32px 圆角、1px 沙漠金 20% 描边、内边距 36px，外加一层玫瑰色漫射光晕（0 24px 60px 玫瑰 22%），绝不使用黑色阴影。默认整体旋转 -1 度并轻微 skewX(-1.5deg)。hover 时旋转到 1 度、skew 归零、光晕扩到 80px，过渡 1000ms ease-in-out。",
        en: "40% violet fill, 32px radius, a 1px desert gold border at 20%, 36px padding, and a diffuse rose halo at 0 24px 60px 22% instead of any black shadow. It sits rotated -1 degree with a slight skewX(-1.5deg). Hover rotates to 1 degree, returns the skew to zero and widens the halo to 80px over 1000ms ease-in-out.",
      },
      states: "hover: rotate to 1deg, halo 80px",
    },
    {
      name: "Distorted Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "沙漠金填充、午夜蓝文字、999px 全圆角、无描边，18px/600、0.1em 字距、padding 14px 36px，光晕 0 12px 40px 金 28%。hover 时 skewX(-6deg) 并 rotate(-2deg)、光晕扩到 60px，绝不允许 scale。按下时 skew 归零并整体下沉 2px。过渡 700ms ease-in-out。",
        en: "Desert gold fill, midnight text, fully rounded, no border, 18px/600 at 0.1em tracking, 14px 36px padding, halo 0 12px 40px at 28% gold. Hover applies skewX(-6deg) and rotate(-2deg) with the halo widened to 60px, and never scales. Press zeroes the skew and sinks 2px. 700ms ease-in-out.",
      },
      states: "hover: skew and rotate, no scale; active: skew 0, sink 2px",
    },
    {
      name: "Color Orb",
      role: { zh: "装饰光球", en: "Decorative color orbs" },
      construction: {
        zh: "24px 到 160px 的圆形，径向渐变从沙漠金或玫瑰的中心渐隐到透明，无边框，绝对定位在卡片边缘并允许溢出 20% 到 40%。颜色在 2000ms 内缓慢扩散与收缩（Color Melting），绝不允许 transition-none。单屏最多四个。",
        en: "Circles from 24px to 160px on a radial gradient fading from desert gold or rose at the centre to transparent, with no border, absolutely positioned at card edges and allowed to bleed twenty to forty percent. Their color diffuses and contracts over 2000ms (Color Melting); transition-none is forbidden. Four per screen at most.",
      },
    },
    {
      name: "Soft Field",
      role: { zh: "输入框", en: "Input field" },
      construction: {
        zh: "午夜蓝 60% 填充、24px 圆角、1px 紫罗兰 40% 描边、padding 14px 20px、18px 衬线。聚焦时描边转沙漠金 60% 并加 0 0 0 3px 的金 15% 外环，过渡 700ms。",
        en: "60% midnight fill, 24px radius, a 1px violet border at 40%, 14px 20px padding at 18px serif. Focus turns the border to 60% gold and adds a 3px ring at 15%, over 700ms.",
      },
    },
    {
      name: "Floating Epoch",
      role: { zh: "漂浮的层级错位", en: "Floating displaced layers" },
      construction: {
        zh: "把同一内容复制成两到三层，每层偏移 8 到 16px、各自不同透明度（100%、45%、20%）与不同角度（-3、0、+4 度）。仅用于标题或首屏主视觉，营造「同一个东西在时间里被看见三次」的错觉。",
        en: "Duplicate a single element into two or three layers offset by 8 to 16px, each at a different opacity (100, 45, 20%) and angle (-3, 0, +4 degrees). Reserved for a headline or the hero, producing the illusion of one thing seen three times in time.",
      },
    },
  ],
  imagery: {
    zh: "融化的钟表、漂浮的石头、室内长出的海、比例错位的物体。图像必须带不合逻辑的空间关系与来自错误方向的投影。不使用写实纪实摄影与扁平图标。",
    en: "Melting clocks, floating stones, a sea growing indoors, objects at the wrong scale. Imagery must hold an illogical spatial relationship and light arriving from the wrong direction. No documentary photography or flat icons.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 144px。严禁严格对称网格：允许元素偏离网格 16 到 48px、允许重叠、允许旋转 -3 到 3 度。但阅读顺序必须仍然清晰——梦境可以歪，不能读不懂。",
    en: "Capped at 1120px with 24px padding, sections 144px apart. Strict symmetry is banned: elements may leave the grid by 16 to 48px, overlap, and rotate between -3 and 3 degrees. Reading order must stay clear regardless — a dream may tilt, it may not become unreadable.",
  },
  dos: [
    { zh: "所有过渡 700 到 1000ms ease-in-out", en: "Every transition runs 700 to 1000ms ease-in-out" },
    { zh: "hover 用 skew 与 rotate，不用 scale", en: "Hover skews and rotates, never scales" },
    { zh: "阴影一律用玫瑰或金色光晕", en: "Shadows are always rose or gold halos" },
    { zh: "午夜蓝配沙漠金的反常配色", en: "Pair midnight blue with desert gold" },
    { zh: "形状允许融化与变形", en: "Let forms melt and morph" },
    { zh: "标题可用斜体衬线", en: "Headlines may take serif italic" },
  ],
  donts: [
    { zh: "不要用过于明亮的纯色", en: "No overly bright pure color" },
    { zh: "不要用严格对称的网格", en: "No strictly symmetrical grids" },
    { zh: "不要做现代极简的无装饰设计", en: "No modern minimal undecorated design" },
    { zh: "不要用刺眼的霓虹", en: "No harsh neon" },
    { zh: "不要用 hover:scale-105", en: "Never use hover scale" },
    { zh: "不要用黑色投影", en: "No black shadows" },
  ],
  promptGuide: {
    quickColors: {
      text: "#f0ece4",
      background: "#1a1a3e",
      panel: "rgba(74,63,107,0.40)",
      gold: "#d4a574",
      rose: "#c38d94",
      moss: "#90ba6d",
    },
    prompts: [
      {
        zh: "做一个超现实主义卡片：背景 rgba(74,63,107,0.4)、32px 圆角、1px rgba(212,165,116,0.2) 描边、内边距 36px、box-shadow 0 24px 60px rgba(195,141,148,0.22)（绝不用黑色阴影）。整卡 rotate(-1deg) skewX(-1.5deg)。标题 42px 衬线 300 字重、色 #f0ece4；正文 18px 衬线、行高 1.8。hover 时 rotate(1deg) skewX(0)、光晕扩到 80px，transition 1000ms ease-in-out。页面底色 #1a1a3e，可在边缘放两个径向渐变的沙漠金光球，颜色在 2000ms 内缓慢扩散。",
        en: "Build a surrealist card: background rgba(74,63,107,0.4), 32px radius, a 1px rgba(212,165,116,0.2) border, 36px padding, box-shadow 0 24px 60px rgba(195,141,148,0.22) — never a black shadow. The card sits at rotate(-1deg) skewX(-1.5deg). The title runs 42px serif at weight 300 in #f0ece4; body at 18px serif on 1.8 leading. Hover applies rotate(1deg) with skewX(0) and widens the halo to 80px over 1000ms ease-in-out. The page ground is #1a1a3e, and two radial desert-gold orbs at the edges may diffuse over 2000ms.",
      },
    ],
  },
  similar: [
    { name: "Memphis", why: { zh: "同样打破网格，但孟菲斯是喧闹的游乐场，超现实是安静的梦", en: "Both break the grid, though Memphis is a loud playground while surrealism is a quiet dream" } },
    { name: "Dark Academia", why: { zh: "同样慢节奏，但暗黑学院讲秩序与古典，超现实讲失真与时间弹性", en: "Both are slow, though dark academia is ordered and classical while surrealism distorts and stretches time" } },
  ],
  completeness: "full",
};
