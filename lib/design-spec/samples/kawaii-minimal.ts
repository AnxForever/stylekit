import type { DesignSpec } from "../types";

export const kawaiiMinimalSpec: DesignSpec = {
  slug: "kawaii-minimal",
  name: "可爱极简",
  nameEn: "Kawaii Minimal",
  cover: "/styles/kawaii-minimal.svg",
  theme: "light",
  northStar: {
    zh: "圆、粉彩、大留白、一点点弹跳：可爱但不吵。",
    en: "Rounded, pastel, airy, with a small bounce — cute without being loud.",
  },
  summary: {
    zh: "可爱极简把日本 kawaii 文化里的「柔软」与极简主义的「克制」缝在一起：暖白底、粉彩强调、全圆角或 24px 大圆角、柔和阴影、圆润无衬线、极多留白。它允许弹跳——hover 放大到 1.05、按下缩到 0.95，这是它唯一被允许的夸张。禁止深色背景、禁止发光与霓虹、禁止高饱和荧光色、禁止粗黑边框、禁止信息过密。可爱在这里靠比例与温度，不靠堆装饰。",
    en: "Kawaii Minimal stitches the softness of Japanese kawaii culture to the restraint of minimalism: a warm white ground, pastel accents, fully rounded or 24px radii, soft shadows, a rounded sans, and abundant whitespace. It permits bounce — hover scales to 1.05, press to 0.95 — and that is the only exaggeration it allows. Dark grounds, glow and neon, fluorescent saturation, heavy black borders and dense information are all refused. Cuteness here comes from proportion and temperature rather than piled-on ornament.",
  },
  colors: [
    {
      name: "粉",
      nameEn: "Pink",
      value: "#f9a8d4",
      group: "brand",
      role: {
        zh: "主色：主按钮、选中态与图标底。整套风格的可爱感由它承担。",
        en: "The primary on buttons, selection and icon beds — it carries the whole style's charm.",
      },
      token: "--color-pink",
    },
    {
      name: "暖白",
      nameEn: "Warm White",
      value: "#fff7ed",
      group: "surface",
      role: {
        zh: "页面底。带一点橙调的暖白，比纯白更有体温。",
        en: "The page ground — a warm white with an orange cast, warmer than white.",
      },
      token: "--color-warm-white",
    },
    {
      name: "薰衣草",
      nameEn: "Lavender",
      value: "#a78bfa",
      group: "accent",
      role: {
        zh: "第二色，用于次级行动与分类标记。",
        en: "The second color on secondary actions and category marks.",
      },
      token: "--color-lavender",
    },
    {
      name: "天蓝",
      nameEn: "Sky",
      value: "#67e8f9",
      group: "accent",
      role: {
        zh: "信息与「新」标记，是唯一偏冷的粉彩。",
        en: "Information and new marks — the one cool pastel.",
      },
      token: "--color-sky",
    },
    {
      name: "奶油黄",
      nameEn: "Butter",
      value: "#fde68a",
      group: "accent",
      role: {
        zh: "高亮与庆祝状态，面积最小。",
        en: "Highlights and celebratory states at the smallest area.",
      },
      token: "--color-butter",
    },
    {
      name: "深粉",
      nameEn: "Deep Pink",
      value: "#f47abd",
      group: "accent",
      role: {
        zh: "粉色的加深版，用于需要更高对比的文字与图标。",
        en: "A deepened pink for text and icons that need more contrast.",
      },
      token: "--color-deep-pink",
    },
  ],
  fonts: [
    {
      family: "Nunito",
      substitute: "'Segoe UI', 'PingFang SC', system-ui, sans-serif",
      weights: [400, 500, 700],
      sizes: [13, 15, 17, 20, 26, 34],
      lineHeight: { display: 1.25, heading: 1.35, body: 1.7 },
      tracking: { display: "0", label: "0.04em" },
      role: {
        zh: "全站唯一字体。圆润无衬线、字重不超过 700，行高 1.7 保证呼吸。",
        en: "The only face: rounded sans, weights capped at 700, leading at 1.7 for breathing room.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 34, lineHeight: 1.25, token: "--text-display" },
    { role: "heading", weight: 700, size: 26, lineHeight: 1.35, token: "--text-heading" },
    { role: "subheading", weight: 500, size: 20, lineHeight: 1.45, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 17, lineHeight: 1.7, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 15, lineHeight: 1.7, token: "--text-body" },
    { role: "label", weight: 500, size: 13, lineHeight: 1.5, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 960,
    sectionGap: 128,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "panels", value: "32px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Warm White", value: "#fff7ed", purpose: "页面底" },
    { level: 1, name: "White", value: "#ffffff", purpose: "卡片" },
    { level: 2, name: "Pink Wash", value: "rgba(249,168,212,0.14)", purpose: "强调区块" },
  ],
  elevation: [
    { name: "Soft", value: "0 4px 12px rgba(249,168,212,0.18)" },
    { name: "Soft hover", value: "0 8px 24px rgba(249,168,212,0.28)" },
  ],
  components: [
    {
      name: "Bouncy Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "粉色填充、白色文字、999px 全圆角、无描边、17px/700、padding 14px 28px，阴影 0 4px 12px 粉 18%。hover 时放大到 1.05、阴影扩到 24px；按下缩到 0.95。过渡 200ms cubic-bezier(0.34, 1.56, 0.64, 1)，这条带回弹的曲线是这套风格的签名。",
        en: "Pink fill, white text, fully rounded, no border, 17px/700, 14px 28px padding, shadow 0 4px 12px at 18% pink. Hover scales to 1.05 and widens the shadow to 24px; press scales 0.95. 200ms on cubic-bezier(0.34, 1.56, 0.64, 1) — that overshoot curve is the style's signature.",
      },
      sizes: "padding 14px 28px; label 17px",
      states: "hover: scale 1.05; active: scale 0.95",
    },
    {
      name: "Soft Card",
      role: { zh: "内容卡", en: "Content card" },
      construction: {
        zh: "白底、24px 圆角、1px 粉 200（#fbcfe8）描边或无描边、内边距 32px，阴影 0 4px 12px 粉 18%。左上角可放一个 40px 的粉彩图标底（999px 圆角）。hover 时上浮 4px、阴影扩到 24px。",
        en: "White fill, 24px radius, a 1px pink-200 border or none, 32px padding, shadow 0 4px 12px at 18% pink. A 40px pastel icon bed on a fully rounded shape may sit top-left. Hover lifts 4px and widens the shadow to 24px.",
      },
    },
    {
      name: "Pill Input",
      role: { zh: "输入框", en: "Input field" },
      construction: {
        zh: "白底、999px 全圆角、1px 粉 200 描边、padding 12px 20px、15px 字。占位符粉 400（#f9a8d4）的 60%。聚焦时描边转粉 400 并加 3px 的粉 20% 外环。",
        en: "White fill, fully rounded, a 1px pink-200 border, 12px 20px padding at 15px. The placeholder sits at 60% pink-400. Focus turns the border pink-400 and adds a 3px ring at 20%.",
      },
    },
    {
      name: "Pastel Chip",
      role: { zh: "分类与状态标签", en: "Category and status chips" },
      construction: {
        zh: "999px 全圆角、粉彩 15% 底（粉、薰衣草、天蓝或奶油黄）、无描边、13px/500、padding 6px 14px，文字用深粉或深灰而不是白。",
        en: "Fully rounded on a 15% pastel ground (pink, lavender, sky or butter), no border, 13px/500, 6px 14px padding, with deep pink or dark grey text rather than white.",
      },
    },
    {
      name: "Gentle Avatar",
      role: { zh: "头像与图标容器", en: "Avatars and icon containers" },
      construction: {
        zh: "999px 全圆、尺寸 32 到 64px、粉彩底加 1px 白 60% 描边，内放 16 到 24px 的白色或深粉图标。hover 时旋转 6 度并放大 1.08。",
        en: "Fully round at 32 to 64px on a pastel ground with a 1px white border at 60%, holding a 16 to 24px white or deep pink icon. Hover rotates six degrees and scales 1.08.",
      },
    },
  ],
  imagery: {
    zh: "圆润的插画：动物、食物、植物，线条粗而圆、平涂粉彩。允许真实摄影但必须柔和、暖调、高留白。不使用冷硬几何、暗调摄影与写实图标墙。",
    en: "Rounded illustration: animals, food, plants, with thick soft lines and flat pastel fills. Photography works when it stays soft, warm and airy. No cold geometry, dark photography or realistic icon walls.",
  },
  layout: {
    zh: "上限 960px、容器内边距 24px，区块间距 128px。单栏或两列卡片，元素间距至少 24px。留白占比目标五成以上，因为「空」是这套风格可爱的一部分。",
    en: "Capped at 960px with 24px padding, sections 128px apart. One column or two card columns with at least 24px between elements. The target is over fifty percent empty page, since emptiness is part of the charm.",
  },
  dos: [
    { zh: "暖白底，不用深色", en: "Ground in warm white, never dark" },
    { zh: "全圆角或 24px 大圆角", en: "Fully round or 24px radii" },
    { zh: "粉彩强调，每屏不超过两种", en: "Pastel accents, at most two per screen" },
    { zh: "hover 1.05、active 0.95 的弹跳", en: "Bounce: 1.05 on hover, 0.95 on press" },
    { zh: "阴影柔和且带粉色", en: "Shadows stay soft and pink-tinted" },
    { zh: "留白占五成以上", en: "Keep over half the page empty" },
  ],
  donts: [
    { zh: "不要用深色或黑色背景", en: "No dark or black grounds" },
    { zh: "不要用发光与霓虹", en: "No glow or neon" },
    { zh: "不要用高饱和荧光色", en: "No fluorescent saturation" },
    { zh: "不要用粗黑边框", en: "No heavy black borders" },
    { zh: "不要信息过密", en: "Do not pack information densely" },
    { zh: "不要用锐利直角", en: "No sharp right angles" },
  ],
  promptGuide: {
    quickColors: {
      text: "#57534e",
      background: "#fff7ed",
      card: "#ffffff",
      pink: "#f9a8d4",
      lavender: "#a78bfa",
      sky: "#67e8f9",
    },
    prompts: [
      {
        zh: "做一个可爱极简卡片：白底、24px 圆角、1px #fbcfe8 描边、内边距 32px、阴影 0 4px 12px rgba(249,168,212,0.18)。左上角放一个 40px 的粉彩图标圆（bg rgba(249,168,212,0.15)、999px 圆角）。标题 26px/700 #57534e，正文 15px/400、行高 1.7。hover 时 translateY(-4px)、阴影扩到 0 8px 24px rgba(249,168,212,0.28)。主按钮粉色 #f9a8d4、999px 圆角、白字、hover scale(1.05)、active scale(0.95)，transition 200ms cubic-bezier(0.34,1.56,0.64,1)。页面底色 #fff7ed。",
        en: "Build a kawaii minimal card: white fill, 24px radius, a 1px #fbcfe8 border, 32px padding, shadow 0 4px 12px rgba(249,168,212,0.18). A 40px pastel icon circle (rgba(249,168,212,0.15) fill, fully rounded) sits top-left. Title at 26px/700 in #57534e, body at 15px/400 on 1.7 leading. Hover applies translateY(-4px) and widens the shadow to 0 8px 24px rgba(249,168,212,0.28). The primary button fills #f9a8d4, fully rounded, white text, scaling 1.05 on hover and 0.95 on press over 200ms cubic-bezier(0.34,1.56,0.64,1). The page ground is #fff7ed.",
      },
    ],
  },
  similar: [
    { name: "Soft Utility", why: { zh: "同样柔和友好，但可爱极简更粉彩、更少功能密度", en: "Both soft and friendly, though kawaii is more pastel and far less dense" } },
    { name: "Shoujo Manga", why: { zh: "同源于日本可爱文化，但少女漫画有缎带与网点装饰", en: "Both from Japanese cute culture, though shoujo carries ribbons and screentone" } },
  ],
  completeness: "full",
};
