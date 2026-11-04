import type { DesignSpec } from "../types";

export const tropicalParadiseSpec: DesignSpec = {
  slug: "tropical-paradise",
  name: "热带天堂",
  nameEn: "Tropical Paradise",
  cover: "/styles/tropical-paradise.svg",
  theme: "light",
  northStar: {
    zh: "棕榈叶、芒果黄、珊瑚红：一张度假村的海报。",
    en: "Palm leaves, mango yellow and coral — a resort poster you can almost smell.",
  },
  summary: {
    zh: "热带天堂来自度假村的视觉：暖黄底（#fffde7）、蓝绿主色（#00897b）、珊瑚红（#ff6f61）与芒果黄（#ffc107）作强调、叶绿（#4caf50）作植物。圆角放大到 16 至 24px 甚至全圆，传达柔和的度假感；阴影带颜色（蓝绿 20%）而不是灰；标题用圆润的大字并压紧字距；hover 用明快的亮色变化。棕榈叶与花瓣是主要图形，允许大面积遮挡构图。",
    en: "Tropical Paradise comes from resort visuals: a warm yellow ground (#fffde7), teal (#00897b) leading, coral (#ff6f61) and mango (#ffc107) as accents, and leaf green (#4caf50) for foliage. Radii open to 16 or 24px or full round for the soft resort feel, shadows carry color at 20% teal rather than grey, headlines run large and rounded on tight tracking, and hover brings a bright color shift. Palm fronds and petals supply the graphics, and large-scale occlusion is welcome.",
  },
  colors: [
    {
      name: "蓝绿",
      nameEn: "Teal",
      value: "#00897b",
      group: "brand",
      role: {
        zh: "主色：主按钮、文字与海水的语义。",
        en: "The primary on buttons, type and the sense of sea.",
      },
      token: "--color-teal",
    },
    {
      name: "暖黄底",
      nameEn: "Warm Yellow",
      value: "#fffde7",
      group: "surface",
      role: {
        zh: "页面底。像阳光下的沙地。",
        en: "The page ground — sand under sunlight.",
      },
      token: "--color-warm-yellow",
    },
    {
      name: "珊瑚红",
      nameEn: "Coral",
      value: "#ff6f61",
      group: "accent",
      role: {
        zh: "第一强调：主 CTA 与花。",
        en: "The first accent on the primary CTA and on blossoms.",
      },
      token: "--color-coral",
    },
    {
      name: "芒果黄",
      nameEn: "Mango",
      value: "#ffc107",
      group: "accent",
      role: {
        zh: "第二强调与高亮，像果肉与阳光。",
        en: "The second accent and highlights — fruit flesh and sunlight.",
      },
      token: "--color-mango",
    },
    {
      name: "叶绿",
      nameEn: "Leaf",
      value: "#4caf50",
      group: "accent",
      role: {
        zh: "棕榈叶与植物语义。",
        en: "Palm fronds and plant semantics.",
      },
      token: "--color-leaf",
    },
    {
      name: "橄榄",
      nameEn: "Olive",
      value: "#a09314",
      group: "accent",
      role: {
        zh: "压在黄上的文字，也是沙的暗部。",
        en: "A text tone for use on yellow, and the shadow of sand.",
      },
      token: "--color-olive",
    },
  ],
  fonts: [
    {
      family: "Nunito",
      substitute: "'Trebuchet MS', 'PingFang SC', system-ui, sans-serif",
      weights: [400, 700, 800],
      sizes: [13, 16, 20, 28, 38, 52],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.65 },
      tracking: { display: "-0.02em", label: "0.06em" },
      role: {
        zh: "圆润无衬线，标题用 800 并压紧字距到 -0.02em。字形不能尖，度假不该有棱角。",
        en: "A rounded sans: headings at 800 with tracking tightened to -0.02em. Nothing pointed — a resort has no edges.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 800, size: 52, lineHeight: 1.2, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 800, size: 38, lineHeight: 1.25, tracking: "-0.02em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 28, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 20, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 16, lineHeight: 1.65, token: "--text-body" },
    { role: "label", weight: 700, size: 13, lineHeight: 1.45, tracking: "0.06em", token: "--text-label" },
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
    { element: "cards", value: "24px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "16px" },
    { element: "images", value: "24px" },
  ],
  surfaces: [
    { level: 0, name: "Warm Yellow", value: "#fffde7", purpose: "页面底" },
    { level: 1, name: "White", value: "#ffffff", purpose: "卡片" },
    { level: 2, name: "Teal Wash", value: "rgba(0,137,123,0.10)", purpose: "区块底" },
  ],
  elevation: [
    { name: "Teal soft", value: "0 4px 20px rgba(0,137,123,0.20)" },
    { name: "Teal hover", value: "0 10px 32px rgba(0,137,123,0.28)" },
  ],
  components: [
    {
      name: "Island Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "珊瑚红填充、白字、999px 全圆角、无描边、16px/700、padding 14px 32px，彩色阴影 0 4px 20px 蓝绿 20%。hover 时填充转芒果黄、文字转橄榄、阴影扩到 32px；按下缩放 0.97。过渡 180ms ease-out。",
        en: "Coral fill, white text, fully rounded, no border, 16px/700, 14px 32px padding, with a colored 0 4px 20px shadow at 20% teal. Hover moves the fill to mango and the text to olive while the shadow widens to 32px; press scales 0.97. 180ms ease-out.",
      },
      sizes: "padding 14px 32px; label 16px",
      states: "hover: mango fill, wider shadow; active: scale 0.97",
    },
    {
      name: "Resort Card",
      role: { zh: "内容卡与行程卡", en: "Content and itinerary cards" },
      construction: {
        zh: "白底、24px 圆角、无描边、内边距 28px，彩色阴影 0 4px 20px 蓝绿 20%。标题 28px/700 蓝绿，正文 16px 行高 1.65。图片 24px 圆角铺满卡宽、4:3。hover 时阴影扩到 32px、上浮 4px，图片放大 1.03。",
        en: "White fill, 24px radius, no border, 28px padding, colored shadow 0 4px 20px at 20% teal. The title runs 28px/700 in teal with body at 16px on 1.65 leading. The image takes a 24px radius at full width and 4:3. Hover widens the shadow to 32px, lifts 4px and scales the image 1.03.",
      },
    },
    {
      name: "Palm Frond",
      role: { zh: "棕榈叶装饰（签名）", en: "The palm frond — the signature" },
      construction: {
        zh: "一片 160 到 400px 的棕榈叶（用 SVG path 画 8 到 12 片羽状小叶），填叶绿的 60% 到 100%，允许从页面角上斜插进来并遮挡部分内容。它是最能标识这套风格的图形，单屏 1 到 2 片。",
        en: "A palm frond 160 to 400px across (an SVG path with eight to twelve leaflets) filled leaf green at 60% to 100%, allowed to enter diagonally from a page corner and cover part of the content. It identifies the style more than anything else, once or twice per screen.",
      },
    },
    {
      name: "Sun Circle",
      role: { zh: "太阳与光斑", en: "The sun and its light" },
      construction: {
        zh: "一个 120 到 240px 的圆，填芒果黄到珊瑚红的径向渐变，不透明度 70%，配 3 到 5 个更小的光斑（各 24 到 48px、20% 不透明度）。放在区块角落作为氛围，不做动画或只做极慢的明暗呼吸。",
        en: "A 120 to 240px circle on a radial gradient from mango into coral at 70% opacity, with three to five smaller flares of 24 to 48px at 20%. It sits at a section corner for atmosphere, either static or breathing very slowly.",
      },
    },
    {
      name: "Pill Field",
      role: { zh: "表单输入", en: "Input field" },
      construction: {
        zh: "白底、999px 全圆角、1px 蓝绿 25% 描边、padding 12px 22px、16px 字。占位符蓝绿 50%。聚焦时描边转蓝绿 80% 并加 3px 的蓝绿 15% 外环。",
        en: "White fill, fully rounded, a 1px teal border at 25%, 12px 22px padding at 16px. The placeholder sits at 50% teal. Focus turns the border to 80% and adds a 3px ring at 15%.",
      },
    },
  ],
  imagery: {
    zh: "度假场景摄影：海滩、棕榈、水果、泳池、热带植物。必须高亮、暖调、饱和。允许俯拍平铺。不使用暗调摄影、冷色图像与写实人物特写。",
    en: "Resort photography: beaches, palms, fruit, pools, tropical plants. Bright, warm and saturated, with flat-lay overheads welcome. No dark photography, cool imagery or realistic portrait close-ups.",
  },
  layout: {
    zh: "上限 1160px、容器内边距 24px，区块间距 96px。允许棕榈叶与光斑大面积遮挡构图。圆角统一偏好大值（16 到 24px 或全圆），绝不低于 12px。",
    en: "Capped at 1160px with 24px padding, sections 96px apart. Palm fronds and flares may occlude the composition at scale. Radii favour the larger values — 16 to 24px or fully round — and never drop below 12px.",
  },
  dos: [
    { zh: "暖黄底配蓝绿与珊瑚红", en: "Warm yellow ground with teal and coral" },
    { zh: "圆角 16 到 24px 或全圆", en: "Radius 16 to 24px or fully round" },
    { zh: "阴影带蓝绿颜色而不是灰", en: "Shadows carry teal rather than grey" },
    { zh: "棕榈叶大面积遮挡构图", en: "Palm fronds occlude the composition" },
    { zh: "标题圆润大字并压紧字距", en: "Rounded large headlines on tight tracking" },
    { zh: "hover 用明快亮色变化", en: "Hover brings a bright color shift" },
  ],
  donts: [
    { zh: "不要用暗调或冷色摄影", en: "No dark or cool-toned photography" },
    { zh: "不要用锐利直角", en: "No sharp right angles" },
    { zh: "不要用灰黑阴影", en: "No grey-black shadow" },
    { zh: "不要用小于 12px 的圆角", en: "No radius below 12px" },
    { zh: "不要用衬线字体", en: "No serif type" },
    { zh: "不要超过两片棕榈叶", en: "Never more than two palm fronds" },
  ],
  promptGuide: {
    quickColors: {
      text: "#00897b",
      background: "#fffde7",
      coral: "#ff6f61",
      mango: "#ffc107",
      leaf: "#4caf50",
      olive: "#a09314",
    },
    prompts: [
      {
        zh: "做一个热带天堂卡片：白底、24px 圆角、无边框、内边距 28px、box-shadow 0 4px 20px rgba(0,137,123,0.2)。标题 28px/700 Nunito、色 #00897b、字距 -0.02em；正文 16px、行高 1.65、色 #2f3e3c。图片 4:3、24px 圆角。左上角斜插一片 240px 的棕榈叶（SVG path、填 #4caf50、不透明度 80%），可遮挡部分内容。主按钮 #ff6f61 填充、白字、999px 全圆角、padding 14px 32px、彩色阴影，hover 时填充转 #ffc107、文字转 #a09314。页面底色 #fffde7，全站圆角不小于 12px。",
        en: "Build a tropical paradise card: white fill, 24px radius, no border, 28px padding, box-shadow 0 4px 20px rgba(0,137,123,0.2). The title runs 28px/700 Nunito at -0.02em in #00897b with body at 16px on 1.65 leading in #2f3e3c. The image takes a 4:3 ratio on a 24px radius. A 240px palm frond (SVG path, filled #4caf50 at 80%) enters diagonally from the top-left and may cover part of the content. The primary button fills #ff6f61 with white text, fully rounded, 14px 32px padding and the colored shadow, moving to #ffc107 with #a09314 text on hover. The page ground is #fffde7, with no radius below 12px anywhere.",
      },
    ],
  },
  similar: [
    { name: "Solarpunk", why: { zh: "同为绿色乐观，但太阳朋克讲生态未来，热带天堂讲度假", en: "Both green and optimistic, though solarpunk is ecological future while this is holiday" } },
    { name: "Fresh Market", why: { zh: "同样暖亮，但鲜活市集偏生鲜零售，热带天堂偏旅行业", en: "Both warm and bright, though fresh market is grocery while this is travel" } },
  ],
  completeness: "full",
};
