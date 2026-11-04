import type { DesignSpec } from "../types";

/**
 * Sixth sample: the friendly consumer register. Every edge is large, every
 * shadow is coloured and blurred, and the layout breathes. The spec's job here
 * is to make "soft" measurable — a radius floor, a blur floor and a saturation
 * ceiling — instead of leaving it to taste.
 */
export const softUiSpec: DesignSpec = {
  slug: "soft-ui",
  name: "柔和界面风",
  nameEn: "Soft UI",
  cover: "/styles/soft-ui.svg",
  theme: "light",
  northStar: {
    zh: "大圆角、彩色柔光阴影、低饱和配色，让人第一眼就想点。",
    en: "Large radii, coloured soft shadows and low-saturation color — an interface that invites a tap.",
  },
  summary: {
    zh: "柔和界面风服务消费级产品：社交、生活方式、面向普通用户的工具。它的做法是把所有硬的东西变软——圆角从 16px 起、卡片 24px；阴影不只是暗，而是带主色相的彩色柔光（靛蓝 25% 透明度、24px 以上模糊）；颜色一律低饱和，纯黑和纯饱和色都被排除。交互靠浮起表达：hover 时元素上移、阴影扩大、主色加深，按下时先落回再轻微内凹。动效允许慢到 300 至 500ms，因为柔和本身就是被感知的时长。",
    en: "Soft UI serves consumer products: social apps, lifestyle tools, anything used by people who are not designers. It works by softening every hard edge — radius starts at 16px and cards take 24px; shadows are not just dark but coloured soft light (indigo at 25%, blurred past 24px); all color is low-saturation, with pure black and pure saturation excluded. Interaction is expressed by floating: hover lifts the element, widens the shadow and deepens the primary, while press settles it back with a slight inner recess. Motion may run 300 to 500ms, because softness is felt in duration.",
  },
  colors: [
    {
      name: "靛蓝",
      nameEn: "Indigo",
      value: "#6366f1",
      group: "brand",
      role: {
        zh: "主行动、选中态与链接。柔和不等于没有主色，它需要一支明确的品牌色。",
        en: "Primary actions, selection and links. Soft does not mean colourless; the system needs one clear brand tone.",
      },
      token: "--color-indigo",
    },
    {
      name: "雾灰",
      nameEn: "Mist",
      value: "#f1f5f9",
      group: "surface",
      role: {
        zh: "页面画布与输入框底。比白更柔，让白色卡片有依托。",
        en: "Page canvas and input beds. Softer than white, giving white cards something to sit on.",
      },
      token: "--color-mist",
    },
    {
      name: "云白",
      nameEn: "Cloud White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "卡片与浮层填充。柔和风格里最亮的一层，但不刺眼，因为阴影把它托起来。",
        en: "Card and overlay fill — the brightest layer, kept from glare by the shadow that lifts it.",
      },
      token: "--color-cloud",
    },
    {
      name: "粉",
      nameEn: "Blossom",
      value: "#ec4899",
      group: "accent",
      role: {
        zh: "情绪化强调：收藏、喜欢、社区反馈。不与靛蓝同时作为主色。",
        en: "Emotional emphasis: favourites, likes, community reactions. Never primary alongside indigo.",
      },
      token: "--color-blossom",
    },
    {
      name: "薄荷绿",
      nameEn: "Mint",
      value: "#10b981",
      group: "accent",
      role: {
        zh: "成功与完成状态。用于进度、勾选、已保存。",
        en: "Success and completion: progress, checks, saved states.",
      },
      token: "--color-mint",
    },
    {
      name: "琥珀",
      nameEn: "Amber",
      value: "#f59e0b",
      group: "accent",
      role: {
        zh: "提醒与待办。出现频率最低，靠面积小来控制存在感。",
        en: "Nudges and pending items, the least frequent accent, kept small so it never dominates.",
      },
      token: "--color-amber",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "Nunito, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 14, 16, 20, 28, 36],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.65 },
      tracking: { display: "-0.01em", label: "0.02em" },
      role: {
        zh: "全站唯一字体。字重 600 承担亲和型标题，700 只用于数字与强调。",
        en: "The only face. Weight 600 carries friendly headings; 700 is reserved for figures and emphasis.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 36, lineHeight: 1.2, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", weight: 600, size: 28, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", weight: 600, size: 20, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.65, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.65, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.02em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1200,
    sectionGap: 96,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "16px" },
    { element: "inputs", value: "16px" },
    { element: "icons", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Mist", value: "#f1f5f9", purpose: "页面画布" },
    { level: 1, name: "Cloud White", value: "#ffffff", purpose: "卡片与浮层" },
  ],
  elevation: [
    { name: "Card rest", value: "0 12px 32px rgba(148,163,184,0.25)" },
    { name: "Card hover", value: "0 24px 48px rgba(99,102,241,0.20)" },
    { name: "Button rest", value: "0 10px 24px rgba(99,102,241,0.25)" },
    { name: "Button hover", value: "0 18px 32px rgba(99,102,241,0.35)" },
    { name: "Button pressed", value: "inset 0 4px 10px rgba(67,56,202,0.28)" },
  ],
  components: [
    {
      name: "Soft Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "靛蓝填充、白字、16px 圆角、无描边。字级 16px、字重 500、padding 12px 24px。静态阴影为 0 10px 24px 靛蓝 25%。hover 上浮 4px、阴影扩到 0 18px 32px 35%；按下回落并换成 inset 0 4px 10px 主色深 28%，同时缩放 0.96。过渡 300ms ease-in-out。",
        en: "Indigo fill, white text, 16px radius, no border. 16px type at weight 500, 12px 24px padding. The resting shadow is 0 10px 24px at 25% indigo. Hover lifts 4px and widens to 0 18px 32px at 35%; press drops back, swaps to inset 0 4px 10px at 28% of a deeper indigo, and scales to 0.96. 300ms ease-in-out.",
      },
      sizes: "padding 12px 24px; label 16px",
      states: "hover: lift 4px, shadow up; active: inset shadow, scale 0.96",
    },
    {
      name: "Soft Card",
      role: { zh: "功能卡与内容卡", en: "Feature and content card" },
      construction: {
        zh: "白底、24px 圆角、无描边、内边距 32px，阴影 0 12px 32px 石板灰 25%。图标块 56px 见方、16px 圆角、靛蓝 10% 底；hover 时卡片上浮 8px、阴影转靛蓝 20%、图标块放大 1.1 且底色变浅。过渡 500ms。",
        en: "White fill, 24px radius, no border, 32px padding, shadow 0 12px 32px at 25% slate. The icon tile is 56px square with a 16px radius on 10% indigo; on hover the card lifts 8px, the shadow turns to 20% indigo, and the tile scales to 1.1 on a lighter ground. 500ms.",
      },
      states: "hover: lift 8px, shadow tinted indigo, icon 1.1",
    },
    {
      name: "Soft Input",
      role: { zh: "表单输入", en: "Form input" },
      construction: {
        zh: "雾灰底、无描边、16px 圆角、padding 14px 20px。聚焦时底色转白、加一圈 4px 靛蓝 20% 的外环，并补一层 0 10px 26px 靛蓝 14% 的柔光。过渡 300ms，不改变尺寸。",
        en: "Mist fill, no border, 16px radius, 14px 20px padding. Focus switches the fill to white, adds a 4px ring at 20% indigo and a 0 10px 26px glow at 14% indigo. 300ms, no size change.",
      },
      states: "focus: white fill, 4px ring, soft glow",
    },
    {
      name: "Icon Chip",
      role: { zh: "功能图标与状态标记", en: "Feature icon and status marker" },
      construction: {
        zh: "圆形（999px）、40px 或 56px 直径、主色 10% 底、图标用主色本身。不做边框与阴影，靠底色区分。hover 时底色升到 16%，图标不动。",
        en: "Circular at 999px, 40px or 56px across, a 10% primary ground with the icon in full primary. No border, no shadow; the ground carries the distinction. Hover raises the ground to 16% and leaves the glyph alone.",
      },
    },
  ],
  imagery: {
    zh: "明亮、低饱和的摄影与 3D 柔光图形。人物可用，但必须温和、日常、无强对比。允许渐变色块作为背景柔光。不使用硬边插画、纯黑背景或高饱和摄影。",
    en: "Bright, low-saturation photography and soft-lit 3D shapes. People are welcome as long as the image reads calm and everyday. Gradient blobs may act as background light. No hard-edged illustration, pure black grounds or saturated photography.",
  },
  layout: {
    zh: "12 栏、上限 1200px，容器内边距 24px。区块间距 96px，卡片间距 24px，元素间距 24px。留白是风格的一部分：宁可少放一个模块，也不要压缩间距。卡片可以错落，但每行不超过三张。",
    en: "Twelve columns capped at 1200px, container padding 24px. Section rhythm 96px, 24px between cards and elements. Whitespace is part of the style: drop a module rather than tighten the gaps. Cards may stagger, but never more than three per row.",
  },
  dos: [
    {
      zh: "圆角 16px 起，卡片 24px",
      en: "Radius starts at 16px; cards take 24px",
    },
    {
      zh: "阴影带主色相而不是纯黑，模糊 24px 以上",
      en: "Tint shadows with the primary instead of black, and blur past 24px",
    },
    {
      zh: "配色一律低饱和，排除纯黑与纯饱和色",
      en: "Keep all color low-saturation; exclude pure black and pure saturation",
    },
    {
      zh: "hover 上浮 4px 到 8px，按下回落并内凹",
      en: "Hover lifts 4px to 8px; press settles back and recesses",
    },
    {
      zh: "卡片间距至少 24px，宁可减少模块",
      en: "Keep at least 24px between cards; drop a module before compressing",
    },
    {
      zh: "动效 300ms 起，500ms 用于卡片级位移",
      en: "Motion starts at 300ms, with 500ms for card-level movement",
    },
  ],
  donts: [
    {
      zh: "不要用直角或小于 16px 的圆角",
      en: "No square corners and no radius under 16px",
    },
    {
      zh: "不要用纯黑文字 #000000",
      en: "Never use pure black #000000 for text",
    },
    {
      zh: "不要用无模糊的硬阴影",
      en: "No hard, unblurred shadows",
    },
    {
      zh: "不要用 1px 实色描边切分区块",
      en: "Do not divide sections with 1px solid borders",
    },
    {
      zh: "不要用高饱和纯色做大面积填充",
      en: "No large fills in highly saturated pure color",
    },
    {
      zh: "不要压缩间距换取信息密度",
      en: "Never compress spacing to gain density",
    },
  ],
  promptGuide: {
    quickColors: {
      text: "#1f2937",
      background: "#f1f5f9",
      card: "#ffffff",
      primary: "#6366f1",
      muted: "#64748b",
      accent: "#ec4899",
    },
    prompts: [
      {
        zh: "做一个柔和风格的功能卡：白底、24px 圆角、无边框、内边距 32px、阴影 0 12px 32px rgba(148,163,184,0.25)。左上放 56px 圆形图标块（靛蓝 10% 底、图标 #6366f1），下面是 20px/600 标题和 14px #64748b 正文。hover 时卡片上浮 8px、阴影改成 rgba(99,102,241,0.2)、图标放大 1.1，过渡 500ms。",
        en: "Build a soft feature card: white fill, 24px radius, no border, 32px padding, shadow 0 12px 32px rgba(148,163,184,0.25). A 56px circular icon chip sits top-left (10% indigo ground, #6366f1 glyph) above a 20px/600 title and 14px body in #64748b. On hover the card lifts 8px, the shadow becomes rgba(99,102,241,0.2) and the icon scales to 1.1, over 500ms.",
      },
    ],
  },
  similar: [
    {
      name: "Notion",
      why: {
        zh: "同样的低饱和与宽松间距，但更克制，不用彩色柔光",
        en: "Same low saturation and generous spacing, though more restrained and without coloured glow",
      },
    },
    {
      name: "Duolingo",
      why: {
        zh: "大圆角与亲和型动效，但饱和度更高、更有游戏感",
        en: "Large radii and friendly motion, though louder and more game-like",
      },
    },
  ],
  completeness: "full",
};
