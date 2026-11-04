import type { DesignSpec } from "../types";

export const studioBoldSpec: DesignSpec = {
  slug: "studio-bold",
  name: "创意工作室风",
  nameEn: "Studio Bold",
  cover: "/styles/studio-bold.svg",
  theme: "dark",
  northStar: {
    zh: "字大到撑满屏幕，色块直接切换，直角保持自信。",
    en: "Type big enough to fill the screen, blocks switching directly, square corners holding the confidence.",
  },
  summary: {
    zh: "创意工作室风是设计工作室的作品集语言：hero 标题必须大到自带冲击力（6xl 到 8xl、行高 0.95、紧字距），深色区（#1a1a1a）与浅色区（#f5f5f0）交替，区块之间靠底色切换分隔而不是边框，项目卡零圆角加 hover 放大 1.02，CTA 用一个珊瑚红（#ff6b6b）贯穿全站。它的禁令全部围绕「不许软化」——不许小号 hero、不许圆角、不许衬线、不许细边框分割、不许纯白背景。",
    en: "Studio Bold is the portfolio language of design studios: hero headlines must be large enough to hit on their own (6xl to 8xl at 0.95 leading on tight tracking), dark sections (#1a1a1a) alternate with light ones (#f5f5f0), sections divide by switching ground rather than borders, project cards stay square and scale to 1.02 on hover, and one coral (#ff6b6b) runs through as the CTA. Its prohibitions all guard against softening — no small hero, no radius, no serif, no thin-border dividers, no pure white ground.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#1a1a1a",
      group: "brand",
      role: {
        zh: "深色区块底与浅色区上的文字。整套风格的骨架色。",
        en: "Dark section grounds and light-section type — the structural color.",
      },
      token: "--color-ink",
    },
    {
      name: "纸",
      nameEn: "Paper",
      value: "#f5f5f0",
      group: "surface",
      role: {
        zh: "浅色区块底。比纯白暖，避免与纯白文字混淆。",
        en: "Light section grounds — warmer than white so it never collides with white type.",
      },
      token: "--color-paper",
    },
    {
      name: "珊瑚",
      nameEn: "Coral",
      value: "#ff6b6b",
      group: "accent",
      role: {
        zh: "唯一强调色：CTA、hover 态与 hero 里被高亮的那几个词。",
        en: "The single accent on CTAs, hover states and the highlighted words in a hero.",
      },
      token: "--color-coral",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "只用于文字，绝不作底色。",
        en: "Type only — never a ground.",
      },
      token: "--color-white",
    },
    {
      name: "深灰",
      nameEn: "Graphite",
      value: "#333333",
      group: "neutral",
      role: {
        zh: "深色区里的次级文字与分隔线。",
        en: "Secondary text and dividers inside dark sections.",
      },
      token: "--color-graphite",
    },
    {
      name: "近黑",
      nameEn: "Near Black",
      value: "#0d0d0d",
      group: "surface",
      role: {
        zh: "页头与页脚的更深底，用于在与深色区之间再分一层。",
        en: "A deeper ground for header and footer, adding one layer above the dark sections.",
      },
      token: "--color-near-black",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "Helvetica, 'Arial Black', system-ui, sans-serif",
      weights: [300, 400, 700, 900],
      sizes: [14, 18, 24, 40, 64, 96, 128],
      lineHeight: { display: 0.95, heading: 1.05, body: 1.55 },
      tracking: { display: "-0.04em", label: "0.06em" },
      role: {
        zh: "全站无衬线。标题用 700 到 900 并压到行高 0.95，正文用 300 到 400，两者之间的差距本身就是层级。",
        en: "Sans throughout. Headings at 700 to 900 on 0.95 leading, body at 300 to 400 — the gap between them is the hierarchy.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 128, lineHeight: 0.95, tracking: "-0.04em", token: "--text-display" },
    { role: "heading-lg", weight: 900, size: 96, lineHeight: 0.98, tracking: "-0.04em", token: "--text-heading-lg" },
    { role: "heading", weight: 700, size: 64, lineHeight: 1.02, tracking: "-0.03em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 40, lineHeight: 1.1, tracking: "-0.02em", token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 18, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 300, size: 14, lineHeight: 1.55, token: "--text-body" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1440,
    sectionGap: 128,
    cardPadding: 0,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
    { element: "avatars", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Ink", value: "#1a1a1a", purpose: "深色区块" },
    { level: 1, name: "Paper", value: "#f5f5f0", purpose: "浅色区块" },
    { level: 2, name: "Near Black", value: "#0d0d0d", purpose: "页头与页脚" },
  ],
  elevation: [
    { name: "None", value: "none at rest — blocks do the separating" },
    { name: "Card hover", value: "0 25px 50px rgba(0,0,0,0.25)" },
    { name: "CTA hover", value: "0 20px 40px rgba(255,107,107,0.30)" },
  ],
  components: [
    {
      name: "Hero Display",
      role: { zh: "超大首屏标题（核心）", en: "The oversized hero — the core" },
      construction: {
        zh: "96 到 128px、900 字重、行高 0.95、字距 -0.04em，左对齐并可跨行。其中一到两个关键词用珊瑚色，其余白或墨。绝不小于 48px——小于这个尺寸就失去冲击力。",
        en: "96 to 128px at weight 900, 0.95 leading and -0.04em tracking, flush left and free to break across lines. One or two key words take coral while the rest stay white or ink. It never drops below 48px, since anything smaller loses the impact.",
      },
    },
    {
      name: "Coral CTA",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "珊瑚填充、白字、零圆角、无描边、18px/700、padding 16px 32px，无静态阴影。hover 时填充加深到 #e55a5a、阴影 0 20px 40px 珊瑚 30%、上浮 2px；按下缩放 0.98。过渡 300ms。",
        en: "Coral fill, white text, zero radius, no border, 18px/700, 16px 32px padding, no shadow at rest. Hover deepens the fill to #e55a5a, adds a 0 20px 40px shadow at 30% coral and lifts 2px; press scales 0.98. 300ms.",
      },
      sizes: "padding 16px 32px; label 18px",
      states: "hover: darker fill, lift 2px, shadow; active: scale 0.98",
    },
    {
      name: "Project Card",
      role: { zh: "项目卡", en: "The project card" },
      construction: {
        zh: "浅色纸底、零圆角、overflow hidden、无边框。图片 4:3 或 16:9，文字压在图片下方（不在图上），项目名 24 到 32px/700、客户名 14px/300 灰。hover 时整体放大 1.02 并加 0 25px 50px 阴影，图片再放大 1.04。过渡 300ms。",
        en: "Paper fill, zero radius, overflow hidden, no border. The image sits at 4:3 or 16:9 with text below rather than on it — project name at 24 to 32px/700, client at 14px/300 in grey. Hover scales the card 1.02 with a 0 25px 50px shadow and the image a further 1.04. 300ms.",
      },
      states: "hover: card 1.02, image 1.04, shadow",
    },
    {
      name: "Section Switch",
      role: { zh: "区块底色切换（分隔手段）", en: "The section ground switch — the divider" },
      construction: {
        zh: "区块之间不加边框也不加阴影，直接用底色切换：深（#1a1a1a）→ 浅（#f5f5f0）→ 深。切换本身就是分隔符，而且它比线更有力量。整页通常三到五个色块。",
        en: "Sections meet without borders or shadows, switching ground instead: dark (#1a1a1a) into light (#f5f5f0) and back. The switch is the divider, and it carries more force than a line. A page usually holds three to five blocks.",
      },
    },
    {
      name: "Testimonial Block",
      role: { zh: "客户引文", en: "The client quote" },
      construction: {
        zh: "最大宽度 64rem 居中、内边距 64px 左右 48px、引文 24 到 30px 斜体、行高 1.6、墨色，下方 14px 的姓名与职位。无引号图标、无边框。",
        en: "Capped at 64rem and centred with 48px side padding, the quote at 24 to 30px italic on 1.6 leading in ink, with 14px attribution below. No quote glyph and no border.",
      },
    },
  ],
  imagery: {
    zh: "项目作品图与团队肖像。作品图必须高质、可裁切、不带圆角与边框。允许客户 logo 墙（灰度或单色）。不使用装饰插画与背景纹理。",
    en: "Project work and team portraits. Work images must be high quality and croppable with no radius or border. A client logo wall in greyscale or single color works. No decorative illustration or background texture.",
  },
  layout: {
    zh: "上限 1440px、容器内边距 32px，区块间距 128px。首屏接近满高。允许标题与图片重叠但文字必须在最上层。所有区块零圆角。",
    en: "Capped at 1440px with 32px padding, sections 128px apart. The hero approaches full height. Headlines may overlap imagery as long as type stays on top. Every block is square.",
  },
  dos: [
    { zh: "hero 标题不小于 48px，通常 96 到 128px", en: "Hero headlines start at 48px and usually run 96 to 128px" },
    { zh: "零圆角，头像除外", en: "Zero radius, avatars aside" },
    { zh: "全站无衬线", en: "Sans throughout" },
    { zh: "区块靠底色切换分隔", en: "Sections divide by switching ground" },
    { zh: "珊瑚贯穿全站作唯一强调", en: "One coral runs through as the only accent" },
    { zh: "卡片 hover 放大 1.02", en: "Cards scale to 1.02 on hover" },
  ],
  donts: [
    { zh: "不要用小号或标准字号做 hero", en: "No small or standard hero type" },
    { zh: "不要用圆角", en: "No rounded corners" },
    { zh: "不要用衬线字体", en: "No serif type" },
    { zh: "不要用细边框分割区块", en: "Never divide sections with thin borders" },
    { zh: "不要用纯白背景", en: "No pure white ground" },
    { zh: "不要把文字压在作品图上", en: "Never put type on top of work images" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1a1a",
      background: "#1a1a1a",
      paper: "#f5f5f0",
      accent: "#ff6b6b",
      muted: "#8a8a85",
      dark: "#0d0d0d",
    },
    prompts: [
      {
        zh: "做一个创意工作室首屏：深色区 #1a1a1a 底、白字。标题 128px/900、行高 0.95、字距 -0.04em、左对齐，其中两个关键词用珊瑚 #ff6b6b。CTA 珊瑚填充、白字、零圆角、18px/700、padding 16px 32px，hover 时加深到 #e55a5a 并加 0 20px 40px rgba(255,107,107,0.3) 阴影、上浮 2px。下一区块直接切换到 #f5f5f0 底（不加边框）。项目卡零圆角、hover 放大 1.02 加阴影。全站无衬线，无纯白背景。",
        en: "Build a studio hero: #1a1a1a ground with white type. The headline runs 128px/900 at 0.95 leading and -0.04em tracking, flush left, with two key words in coral #ff6b6b. The CTA fills coral with white text, zero radius, 18px/700, 16px 32px padding, deepening to #e55a5a with a 0 20px 40px rgba(255,107,107,0.3) shadow and a 2px lift on hover. The next section switches straight to #f5f5f0 with no border. Project cards stay square, scaling 1.02 with a shadow on hover. Sans throughout, no pure white ground.",
      },
    ],
  },
  similar: [
    { name: "Swiss Poster", why: { zh: "同样超大标题与色块，但瑞士海报靠网格与 2px 线分隔", en: "Both oversized type and blocks, though Swiss poster uses a grid and 2px rules" } },
    { name: "Corporate Clean", why: { zh: "同样专业，但创意工作室更大胆、更少克制", en: "Both professional, though studio is bolder and far less restrained" } },
  ],
  completeness: "full",
};
