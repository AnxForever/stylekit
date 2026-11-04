import type { DesignSpec } from "../types";

export const neonSamuraiSpec: DesignSpec = {
  slug: "neon-samurai",
  name: "霓虹武士风",
  nameEn: "Neon Samurai",
  cover: "/styles/neon-samurai.svg",
  theme: "dark",
  northStar: {
    zh: "一刀的斜线、朱红鸟居、霓虹发光：浮世绘撞进了霓虹街。",
    en: "A single slash, a vermilion torii, neon glow — ukiyo-e colliding with a neon street.",
  },
  summary: {
    zh: "霓虹武士把武士美学与赛博霓虹缝在一起：深海军底（#080818）上，朱红（#dc2626）作主色，紫（#a020f0）与天蓝（#38bdf8）作双色霓虹，金（#fbbf24）作刀光高光。图形语汇是固定的四件——刀的斜斩线（一条 2 到 4px 的斜向长线，末端收细）、鸟居作区块框架、甲片式的多边角卡片、书法笔触作分隔线（带霓虹发光）。它禁止常规投影，纵深只能靠发光表达。",
    en: "Neon Samurai stitches samurai aesthetics to cyber neon: vermilion (#dc2626) leads on deep navy (#080818), with violet (#a020f0) and sky (#38bdf8) as the dual neon and gold (#fbbf24) as the blade's highlight. Four graphics carry it — the katana slash (a 2 to 4px diagonal line tapering at the end), the torii as a section frame, armour-plate polygonal cards, and calligraphic brush dividers under a neon glow. Conventional drop shadows are refused; depth comes from glow alone.",
  },
  colors: [
    {
      name: "朱红",
      nameEn: "Vermilion",
      value: "#dc2626",
      group: "brand",
      role: {
        zh: "主色：鸟居、斩击线与主按钮。武士的赤。",
        en: "The primary on torii, slash lines and buttons — the samurai red.",
      },
      token: "--color-vermilion",
    },
    {
      name: "深海军",
      nameEn: "Deep Navy",
      value: "#080818",
      group: "surface",
      role: {
        zh: "页面底。深到让朱红与双色霓虹同时发亮。",
        en: "The page ground — dark enough to light vermilion and dual neon at once.",
      },
      token: "--color-deep-navy",
    },
    {
      name: "霓虹紫",
      nameEn: "Neon Violet",
      value: "#a020f0",
      group: "accent",
      role: {
        zh: "第一霓虹色：甲片边缘与 hover 光晕。",
        en: "The first neon on armour edges and hover glow.",
      },
      token: "--color-neon-violet",
    },
    {
      name: "天蓝",
      nameEn: "Sky",
      value: "#38bdf8",
      group: "accent",
      role: {
        zh: "第二霓虹色：数据、刀光冷侧与链接。",
        en: "The second neon on data, the blade's cool side and links.",
      },
      token: "--color-sky",
    },
    {
      name: "金",
      nameEn: "Gold",
      value: "#fbbf24",
      group: "accent",
      role: {
        zh: "刀光与高光，是画面里唯一的暖光。",
        en: "Blade light and highlights — the only warm light in the frame.",
      },
      token: "--color-gold",
    },
    {
      name: "荧光粉",
      nameEn: "Neon Pink",
      value: "#ff1253",
      group: "accent",
      role: {
        zh: "警示与溅射特效，出现频率最低。",
        en: "Alerts and splatter effects, used least.",
      },
      token: "--color-neon-pink",
    },
  ],
  fonts: [
    {
      family: "Cinzel",
      substitute: "'Noto Serif SC', Georgia, serif",
      weights: [400, 700],
      sizes: [12, 15, 20, 28, 38, 52],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.65 },
      tracking: { display: "0.06em", label: "0.22em" },
      role: {
        zh: "纪念碑式衬线，标题加 0.06em 字距、标签 0.22em。字形带刀锋般的锐利感。",
        en: "A monumental serif: headings at 0.06em, labels at 0.22em. The letterforms carry a blade's sharpness.",
      },
      token: "--font-display",
    },
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400],
      sizes: [11, 13],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.5 },
      tracking: { display: "0.08em", label: "0.22em" },
      role: {
        zh: "数据与坐标。赛博那一侧的字体。",
        en: "Data and coordinates — the cyber side's face.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", font: "Cinzel", weight: 700, size: 52, lineHeight: 1.15, tracking: "0.06em", token: "--text-display" },
    { role: "heading", font: "Cinzel", weight: 700, size: 38, lineHeight: 1.2, tracking: "0.06em", token: "--text-heading" },
    { role: "subheading", font: "Cinzel", weight: 400, size: 28, lineHeight: 1.3, tracking: "0.04em", token: "--text-subheading" },
    { role: "body", font: "Cinzel", weight: 400, size: 15, lineHeight: 1.65, token: "--text-body" },
    { role: "body-sm", font: "Cinzel", weight: 400, size: 13, lineHeight: 1.6, token: "--text-body-sm" },
    { role: "label", font: "JetBrains Mono", weight: 400, size: 12, lineHeight: 1.4, tracking: "0.22em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1240,
    sectionGap: 96,
    cardPadding: 28,
    elementGap: 20,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Deep Navy", value: "#080818", purpose: "页面底" },
    { level: 1, name: "Armor Plate", value: "rgba(220,38,38,0.08)", purpose: "卡片（赤调半透明）" },
    { level: 2, name: "Blade Edge", value: "rgba(251,191,36,0.20)", purpose: "刀光层" },
  ],
  elevation: [
    { name: "Dual neon", value: "0 0 20px rgba(220,38,38,0.45), 0 0 40px rgba(160,32,240,0.25)" },
    { name: "Blade glow", value: "0 0 16px rgba(251,191,36,0.50)" },
    { name: "Never", value: "standard drop shadows are forbidden" },
  ],
  components: [
    {
      name: "Slash Line",
      role: { zh: "斩击线（签名图形）", en: "The slash line — the signature graphic" },
      construction: {
        zh: "一条 2 到 4px 的斜向长线（角度 -20 到 -35 度），从 4px 收细到 1px，颜色朱红或金并带 0 0 16px 发光。横跨区块并允许溢出容器。它是最能标识这套风格的元素，单屏一到两条，绝不多。",
        en: "A 2 to 4px diagonal line at -20 to -35 degrees, tapering from 4px to 1px, in vermilion or gold under a 0 0 16px glow. It spans a section and may bleed past the container. It identifies the style more than anything else and appears once or twice per screen, never more.",
      },
    },
    {
      name: "Armor Card",
      role: { zh: "甲片卡片（核心组件）", en: "The armour-plate card — the core component" },
      construction: {
        zh: "赤 8% 填充、零圆角、1px 朱红 40% 描边、内边距 28px，四角用 clip-path 切出不等边的斜角（右上 16px、左下 16px），外带双色霓虹发光（赤 20px 加紫 40px）。hover 时发光扩到 32/64px 并让溅射墨点爆发一次（8 个 4px 的赤色圆点在 300ms 内散开并淡出）。",
        en: "8% vermilion fill, zero radius, a 1px vermilion border at 40%, 28px padding, with unequal chamfers cut by clip-path (16px top-right, 16px bottom-left) and a dual neon glow (red at 20px, violet at 40px). Hover widens the glow to 32 and 64px and bursts ink once — eight 4px vermilion dots scattering and fading over 300ms.",
      },
      states: "hover: glow widens, ink splatter burst",
    },
    {
      name: "Torii Frame",
      role: { zh: "鸟居框架", en: "The torii frame" },
      construction: {
        zh: "区块顶部一条水平朱红梁（高 10px、两端各外伸 32px、带 0 0 20px 发光）加两根立柱（各 6px 宽、向下延伸 40 到 64px），构成鸟居轮廓。它作为区块的框架边界，每屏最多两处。",
        en: "A horizontal vermilion beam (10px tall, overhanging 32px at each end, with a 0 0 20px glow) plus two 6px posts falling 40 to 64px, tracing a torii. It frames a section's boundary, at most twice per screen.",
      },
    },
    {
      name: "Brush Divider",
      role: { zh: "书法分隔线", en: "The brush divider" },
      construction: {
        zh: "一条 2 到 6px 的横向不规则笔触（用 clip-path 或 SVG path 做出起笔粗、收笔细的效果），颜色朱红或金并带霓虹发光。它替代普通分隔线，暗示书法的一横。",
        en: "A 2 to 6px horizontal stroke with irregular edges (clip-path or an SVG path) going from thick at the entry to thin at the exit, in vermilion or gold under a neon glow. It replaces the ordinary divider and reads as one calligraphic horizontal.",
      },
    },
    {
      name: "Neon Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "深海军填充、朱红文字、零圆角、1px 朱红 60% 描边、12px 等宽全大写 0.22em、padding 12px 28px，双色外发光。hover 时描边升到 100%、发光转紫加天蓝；按下时位移 1px 并让光晕收到 8px。过渡 200ms。",
        en: "Deep navy fill, vermilion text, zero radius, a 1px vermilion border at 60%, 12px monospace uppercase at 0.22em, 12px 28px padding, with dual neon glow. Hover takes the border to full and shifts the glow to violet plus sky; press translates 1px and pulls the glow to 8px. 200ms.",
      },
      sizes: "padding 12px 28px; label 12px",
      states: "hover: violet-sky glow; active: translate 1px",
    },
  ],
  imagery: {
    zh: "武士与刀、鸟居、甲片、书法笔触、霓虹街景。允许把浮世绘或书法扫描件叠霓虹发光。不使用西方肖像、柔和插画与无发光的写实摄影。",
    en: "Samurai and blade, torii, armour plate, calligraphic strokes, neon streets. A ukiyo-e or calligraphy scan may carry a neon glow. No Western portraiture, soft illustration or unlit realistic photography.",
  },
  layout: {
    zh: "上限 1240px、容器内边距 24px，区块间距 96px。允许斩击线溢出容器、鸟居框架跨区块。零圆角贯穿全站，切角固定 16px。所有纵深由发光提供，绝不用常规投影。",
    en: "Capped at 1240px with 24px padding, sections 96px apart. Slash lines may bleed and torii frames may span sections. Zero radius runs throughout with chamfers fixed at 16px. All depth comes from glow; conventional shadow never appears.",
  },
  dos: [
    { zh: "朱红配深海军与双色霓虹", en: "Vermilion on deep navy with dual neon" },
    { zh: "斩击线单屏一到两条", en: "One or two slash lines per screen" },
    { zh: "鸟居作区块框架，最多两处", en: "Torii frames sections, twice at most" },
    { zh: "甲片用 16px 不等边切角", en: "Armour plates use 16px unequal chamfers" },
    { zh: "书法笔触作分隔线", en: "Brush strokes serve as dividers" },
    { zh: "纵深只用发光，不用投影", en: "Depth via glow only, never drop shadow" },
  ],
  donts: [
    { zh: "不要用常规投影", en: "No conventional drop shadows" },
    { zh: "不要用圆角", en: "No rounded corners" },
    { zh: "不要让斩击线超过两条", en: "Never more than two slash lines" },
    { zh: "不要用西方肖像", en: "No Western portraiture" },
    { zh: "不要让发光失去克制", en: "Never let the glow lose restraint" },
    { zh: "不要混用两种切角尺寸", en: "Never mix two chamfer sizes" },
  ],
  promptGuide: {
    quickColors: {
      text: "#dc2626",
      background: "#080818",
      vermilion: "#dc2626",
      violet: "#a020f0",
      sky: "#38bdf8",
      gold: "#fbbf24",
    },
    prompts: [
      {
        zh: "做一个霓虹武士卡片：深海军 #080818 底、赤 8% 填充、零圆角、1px rgba(220,38,38,0.4) 描边、内边距 28px、clip-path 切右上与左下各 16px、box-shadow 0 0 20px rgba(220,38,38,0.45), 0 0 40px rgba(160,32,240,0.25)。标题 38px/700 Cinzel、字距 0.06em、赤红。一条 3px 的斩击线（角度 -28 度、从 4px 收细到 1px、金色 #fbbf24、带 0 0 16px 发光）斜穿区块并溢出容器。区块顶部放鸟居横梁（10px 高、两端外伸 32px、赤红、带发光）。全站零圆角、零常规投影，纵深只用霓虹发光。",
        en: "Build a neon samurai card: deep navy #080818 ground with an 8% vermilion fill, zero radius, a 1px rgba(220,38,38,0.4) border, 28px padding, clip-path chamfers of 16px at top-right and bottom-left, and box-shadow 0 0 20px rgba(220,38,38,0.45) plus 0 0 40px rgba(160,32,240,0.25). The headline runs 38px/700 Cinzel at 0.06em in vermilion. A 3px slash line (at -28 degrees, tapering from 4px to 1px, gold #fbbf24 with a 0 0 16px glow) cuts across the block and past the container. A vermilion torii beam (10px tall, overhanging 32px at each end, glowing) caps the section. Zero radius and no conventional shadow anywhere — depth comes from neon glow alone.",
      },
    ],
  },
  similar: [
    { name: "Cyber Wafuu", why: { zh: "同为和风赛博，但那边是障子与金缮，这边是刀与鸟居", en: "Both Japanese cyber, though that one is shoji and kintsugi while this is blade and torii" } },
    { name: "Cyber Chinese", why: { zh: "同为东方赛博，但中式是格窗与印章，武士是斩击与甲片", en: "Both Eastern cyber, though Chinese uses lattice and seal while samurai uses slash and armour" } },
  ],
  completeness: "full",
};
