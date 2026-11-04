import type { DesignSpec } from "../types";

export const cyberWafuuSpec: DesignSpec = {
  slug: "cyber-wafuu",
  name: "赛博和风",
  nameEn: "Cyber Wafuu",
  cover: "/styles/cyber-wafuu.svg",
  theme: "dark",
  northStar: {
    zh: "青海波与电路同源，金缮的裂纹成了发光的边框。",
    en: "Seigaiha waves and circuit traces share a source; kintsugi cracks become glowing borders.",
  },
  summary: {
    zh: "赛博和风让传统日本纹样被技术「黑」进来：青海波（seigaiha）与电路走线合流，麻叶纹（asanoha）作网格，障子（shoji）格栅作卡片边框，鸟居作导航框架，金缮（kintsugi）的金色裂纹作描边与强调。底是深靛（#080814），主色是藏青（#1e3a5f），辅以朱红（#c41e3a）、金（#c9a227）与电路青（#38bdf8）。交互极克制——hover 只上浮 1 到 2px 并让光晕增强，绝不夸张。",
    en: "Cyber Wafuu lets traditional Japanese pattern be hacked by technology: seigaiha waves merge with circuit traces, asanoha hemp leaf supplies the grid, the shoji lattice frames cards, a torii shapes navigation, and kintsugi gold cracks carry the borders and accents. The ground is deep indigo (#080814) with navy (#1e3a5f) as the primary, supported by vermilion (#c41e3a), gold (#c9a227) and circuit cyan (#38bdf8). Interaction stays extremely restrained — hover lifts 1 to 2px and amplifies the glow, nothing more.",
  },
  colors: [
    {
      name: "深靛",
      nameEn: "Deep Indigo",
      value: "#080814",
      group: "surface",
      role: {
        zh: "页面底。深到让金线与电路青同时发光。",
        en: "The page ground — dark enough for both gold line and circuit cyan to glow.",
      },
      token: "--color-deep-indigo",
    },
    {
      name: "藏青",
      nameEn: "Navy",
      value: "#1e3a5f",
      group: "brand",
      role: {
        zh: "主色：面板、按钮与障子格栅。",
        en: "The primary on panels, buttons and the shoji lattice.",
      },
      token: "--color-navy",
    },
    {
      name: "朱红",
      nameEn: "Vermilion",
      value: "#c41e3a",
      group: "accent",
      role: {
        zh: "鸟居与印章的红，是画面里唯一的暖重音。",
        en: "The red of the torii and the seal — the one warm accent in the frame.",
      },
      token: "--color-vermilion",
    },
    {
      name: "金",
      nameEn: "Kintsugi Gold",
      value: "#c9a227",
      group: "accent",
      role: {
        zh: "金缮裂纹与描边，让「修补」成为装饰。",
        en: "Kintsugi cracks and strokes, turning repair into ornament.",
      },
      token: "--color-kintsugi-gold",
    },
    {
      name: "电路青",
      nameEn: "Circuit Cyan",
      value: "#38bdf8",
      group: "accent",
      role: {
        zh: "走线、hover 光晕与数据。技术那一侧的颜色。",
        en: "Traces, hover glow and data — the color of the technological side.",
      },
      token: "--color-circuit-cyan",
    },
    {
      name: "赭",
      nameEn: "Ochre",
      value: "#7c3e00",
      group: "accent",
      role: {
        zh: "压在金上的文字色，也是旧木的暗调。",
        en: "A text tone for use on gold, and the deep tone of old wood.",
      },
      token: "--color-ochre",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Hiragino Sans', 'PingFang SC', system-ui, sans-serif",
      weights: [400, 600, 700],
      sizes: [11, 13, 16, 22, 30, 42],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.65 },
      tracking: { display: "0.04em", label: "0.18em" },
      role: {
        zh: "无衬线，标题加 0.04em 字距，小标签 11px 全大写 0.18em。",
        en: "Sans throughout: headings at 0.04em, small labels at 11px uppercase on 0.18em.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 42, lineHeight: 1.2, tracking: "0.04em", token: "--text-display" },
    { role: "heading", weight: 700, size: 30, lineHeight: 1.3, tracking: "0.04em", token: "--text-heading" },
    { role: "subheading", weight: 600, size: 22, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 13, lineHeight: 1.65, token: "--text-body" },
    { role: "label", weight: 600, size: 11, lineHeight: 1.45, tracking: "0.18em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1240,
    sectionGap: 96,
    cardPadding: 32,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
    { element: "seals", value: "4px" },
  ],
  surfaces: [
    { level: 0, name: "Deep Indigo", value: "#080814", purpose: "页面底" },
    { level: 1, name: "Navy Panel", value: "rgba(30,58,95,0.30)", purpose: "面板" },
    { level: 2, name: "Circuit Trace", value: "rgba(56,189,248,0.20)", purpose: "走线层" },
  ],
  elevation: [
    { name: "Navy glow", value: "0 0 15px rgba(30,58,95,0.20)" },
    {
      name: "Dual amp",
      value: "0 0 24px rgba(56,189,248,0.35), 0 0 36px rgba(201,162,39,0.16)",
    },
    { name: "Pressed", value: "0 0 12px rgba(56,189,248,0.28)" },
  ],
  components: [
    {
      name: "Shoji Card",
      role: { zh: "障子格栅卡片（核心组件）", en: "The shoji lattice card — the core component" },
      construction: {
        zh: "深靛填充、零圆角、1px 藏青 30% 描边、内边距 32px。内部用 1px 藏青 20% 的线画出障子格栅（横 2 条、竖 2 到 3 条，等分），格栅线穿过内容但 opacity 低到不干扰阅读。左上或右下叠一条 2px 的金缮裂纹（折线 path，带 0 0 12px 金 40% 的发光）。hover 时上浮 2px、光晕转电路青加金双色。",
        en: "Deep indigo fill, zero radius, a 1px navy border at 30%, 32px padding. Inside, 1px navy lines at 20% draw the shoji lattice — two horizontal and two or three vertical, evenly divided — passing behind content at an opacity that never disturbs reading. A 2px kintsugi crack (a polyline path with a 0 0 12px gold glow at 40%) crosses one corner. Hover lifts 2px and shifts the glow to cyan plus gold.",
      },
      states: "hover: lift 2px, dual glow",
    },
    {
      name: "Torii Nav",
      role: { zh: "鸟居导航框", en: "The torii navigation frame" },
      construction: {
        zh: "页面顶部一条横梁（高 12px、朱红填充、两端各外伸 24px）加两根立柱（各 8px 宽、从横梁垂到内容区顶部），形成鸟居的轮廓。导航项放在横梁下方。鸟居本身就是容器边界，绝不与其它边框重复。",
        en: "A 12px beam across the top (vermilion fill, overhanging 24px at each end) with two 8px posts falling from it to the content's top edge, tracing a torii. Navigation items sit beneath the beam. The torii is itself the container boundary and is never doubled with another border.",
      },
    },
    {
      name: "Kintsugi Border",
      role: { zh: "金缮裂纹边框", en: "The kintsugi crack border" },
      construction: {
        zh: "用 SVG 折线沿着容器的一边（或四边）画一条不规则的裂纹，2px 金描边、带 0 0 12px 金 40% 发光，转折处角度 100 到 140 度。它替代普通描边，并暗示这件东西是被修好的。同一屏最多三处。",
        en: "An SVG polyline traces an irregular crack along one side (or all four) at a 2px gold stroke with a 0 0 12px glow at 40%, its corners between 100 and 140 degrees. It replaces an ordinary stroke and implies the object was mended. Three per screen at most.",
      },
    },
    {
      name: "Seigaiha Ground",
      role: { zh: "青海波底纹", en: "The seigaiha wave ground" },
      construction: {
        zh: "用重复的同心半圆（radial-gradient 或 SVG pattern）画青海波，单元 32px、线宽 1px、色电路青 10% 或金 8%。它可与电路走线叠加（走线用直线折角 90 度），形成「传统纹样被电路穿过」的效果。",
        en: "Repeating concentric semicircles (a radial gradient or SVG pattern) draw seigaiha at 32px cells, 1px lines in 10% circuit cyan or 8% gold. It may layer with circuit traces — right-angled polylines — so the traditional pattern appears threaded by circuitry.",
      },
    },
    {
      name: "Execute Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "藏青填充、银灰文字、零圆角、1px 藏青 60% 描边、13px/600、字距 0.18em、padding 12px 24px，外发光 0 0 12px 藏青 40%。hover 时上浮 1px、描边转电路青 60%、光晕转电路青加金；按下时下沉 1px 且光晕收回。过渡 250ms ease-out。",
        en: "Navy fill, silver text, zero radius, a 1px navy border at 60%, 13px/600 at 0.18em, 12px 24px padding, glow 0 0 12px at 40% navy. Hover lifts 1px, turns the border to 60% circuit cyan and shifts the glow to cyan plus gold; press sinks 1px and pulls the glow back. 250ms ease-out.",
      },
      sizes: "padding 12px 24px; label 13px",
      states: "hover: lift 1px, cyan glow; active: sink 1px",
    },
  ],
  imagery: {
    zh: "和风影像与纹样：障子门、鸟居、枯山水、金缮陶器、青海波织物。必须暗调、可叠电路纹理。允许把照片处理成靛蓝双色调。不使用明亮摄影、卡通插画与高饱和图像。",
    en: "Japanese imagery and pattern: shoji screens, torii, dry gardens, kintsugi pottery, seigaiha textiles. It must stay dark and can carry a circuit overlay, and a photo may be graded indigo. No bright photography, cartoon illustration or saturated imagery.",
  },
  layout: {
    zh: "上限 1240px、容器内边距 24px，区块间距 96px。零圆角贯穿全站。允许面板以 1px 藏青线拼接，形成障子式的格栅分区。鸟居只在页头出现一次。",
    en: "Capped at 1240px with 24px padding, sections 96px apart. Zero radius runs throughout. Panels may join on 1px navy lines into a shoji-like lattice division, and the torii appears once, at the header.",
  },
  dos: [
    { zh: "青海波与电路合流", en: "Seigaiha merges with circuit traces" },
    { zh: "障子格栅作卡片结构", en: "The shoji lattice structures cards" },
    { zh: "金缮裂纹作边框与强调", en: "Kintsugi cracks carry borders and accents" },
    { zh: "鸟居作导航框架，只一次", en: "A torii frames the navigation, once" },
    { zh: "hover 只上浮 1 到 2px", en: "Hover lifts only 1 to 2px" },
    { zh: "零圆角，全站直角", en: "Zero radius, right angles throughout" },
  ],
  donts: [
    { zh: "不要用明亮或高饱和图像", en: "No bright or saturated imagery" },
    { zh: "不要用圆角", en: "No rounded corners" },
    { zh: "不要让纹样抢过内容", en: "Never let pattern overpower content" },
    { zh: "不要重复鸟居框架", en: "Never repeat the torii frame" },
    { zh: "不要用夸张的位移动效", en: "No exaggerated displacement" },
    { zh: "不要在一屏放三处以上金缮", en: "No more than three kintsugi marks per screen" },
  ],
  promptGuide: {
    quickColors: {
      text: "#e2e8f0",
      background: "#080814",
      navy: "#1e3a5f",
      vermilion: "#c41e3a",
      gold: "#c9a227",
      cyan: "#38bdf8",
    },
    prompts: [
      {
        zh: "做一个赛博和风卡片：深靛 #080814 填充、零圆角、1px rgba(30,58,95,0.3) 描边、内边距 32px、box-shadow 0 0 15px rgba(30,58,95,0.2)。内部用 1px rgba(30,58,95,0.2) 画障子格栅（横 2 条竖 3 条等分）。右下叠一条 2px 金 #c9a227 的折线裂纹（带 0 0 12px rgba(201,162,39,0.4) 发光）。背景可叠 32px 单元的青海波（1px 电路青 #38bdf8 10%）与 90 度折角的电路走线。hover 时上浮 2px、光晕转 0 0 24px rgba(56,189,248,0.35), 0 0 36px rgba(201,162,39,0.16)。页面底色 #080814。",
        en: "Build a cyber wafuu card: #080814 fill, zero radius, a 1px rgba(30,58,95,0.3) border, 32px padding, box-shadow 0 0 15px rgba(30,58,95,0.2). Inside, 1px rgba(30,58,95,0.2) lines draw a shoji lattice of two horizontal and three vertical divisions. A 2px gold #c9a227 polyline crack with a 0 0 12px rgba(201,162,39,0.4) glow crosses the bottom-right. The ground may carry 32px seigaiha cells (1px circuit cyan #38bdf8 at 10%) with right-angled circuit traces. Hover lifts 2px and shifts the glow to 0 0 24px rgba(56,189,248,0.35) plus 0 0 36px rgba(201,162,39,0.16). The page ground is #080814.",
      },
    ],
  },
  similar: [
    { name: "Cyber Chinese", why: { zh: "同为东方赛博，但中式的格窗与印章换成障子与金缮", en: "Both Eastern cyber, though lattice windows and seals give way to shoji and kintsugi here" } },
    { name: "Ukiyo-e Digital", why: { zh: "同为日本传统，但浮世绘是木版套色，赛博和风是电路发光", en: "Both Japanese tradition, though ukiyo-e is woodblock color while this glows with circuitry" } },
  ],
  completeness: "full",
};
