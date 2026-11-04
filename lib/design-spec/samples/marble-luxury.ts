import type { DesignSpec } from "../types";

export const marbleLuxurySpec: DesignSpec = {
  slug: "marble-luxury",
  name: "大理石奢华",
  nameEn: "Marble Luxury",
  cover: "/styles/marble-luxury.svg",
  theme: "light",
  northStar: {
    zh: "大理石白、古金细线、极细衬线：一切都在说「不急」。",
    en: "Marble white, antique gold hairlines, a hairline serif — everything says there is no hurry.",
  },
  summary: {
    zh: "大理石奢华是高端酒店与地产的语言：大理石白底（#f8f6f3）、纯黑文字（#1a1a1a）、古金（#c9a96e）只作 1px 分隔线与细边框、衬线字体保持细字重、字距放到 0.2em 以上。它的奢侈感来自「少而精」——没有阴影、没有渐变、没有装饰图形，只有比例、留白与那一根金线。石材纹理作为极淡的底纹（不透明度 5% 到 8%）出现，绝不做成抢眼的大理石贴图。",
    en: "Marble Luxury is the language of high-end hotels and real estate: marble white (#f8f6f3), pure black type (#1a1a1a), antique gold (#c9a96e) confined to 1px dividers and fine borders, a serif held at a light weight, and tracking opened past 0.2em. Its luxury comes from restraint — no shadow, no gradient, no decorative graphic, only proportion, emptiness and that one gold line. Stone texture appears as a very faint ground at 5% to 8%, never as a loud marble decal.",
  },
  colors: [
    {
      name: "大理石白",
      nameEn: "Marble White",
      value: "#f8f6f3",
      group: "surface",
      role: {
        zh: "页面底。带一丝暖的白，像抛光石材。",
        en: "The page ground — a warm-leaning white like polished stone.",
      },
      token: "--color-marble-white",
    },
    {
      name: "黑",
      nameEn: "Black",
      value: "#1a1a1a",
      group: "brand",
      role: {
        zh: "全部文字。纯黑，不掺灰。",
        en: "All type — pure black with no grey mixed in.",
      },
      token: "--color-black",
    },
    {
      name: "古金",
      nameEn: "Antique Gold",
      value: "#c9a96e",
      group: "accent",
      role: {
        zh: "唯一强调色：1px 分隔线、细边框与小标记。",
        en: "The only accent on 1px dividers, fine borders and small marks.",
      },
      token: "--color-antique-gold",
    },
    {
      name: "石纹灰",
      nameEn: "Stone Grey",
      value: "#8a7968",
      group: "neutral",
      role: {
        zh: "次级文字与纹理的暗线。",
        en: "Secondary text and the dark veins of the texture.",
      },
      token: "--color-stone-grey",
    },
    {
      name: "浅石",
      nameEn: "Pale Stone",
      value: "#e8e0d6",
      group: "surface",
      role: {
        zh: "次级区块与卡片衬底，只比底色深一档。",
        en: "Secondary sections and card beds, one step below the ground.",
      },
      token: "--color-pale-stone",
    },
    {
      name: "玉绿",
      nameEn: "Jade",
      value: "#85bd73",
      group: "accent",
      role: {
        zh: "极少量用于「自然」「园林」语义，出现频率最低。",
        en: "Used very sparingly on nature and garden semantics.",
      },
      token: "--color-jade",
    },
  ],
  fonts: [
    {
      family: "Cormorant Garamond",
      substitute: "'EB Garamond', Georgia, 'Songti SC', serif",
      weights: [300, 400],
      sizes: [13, 15, 18, 24, 34, 48],
      lineHeight: { display: 1.2, heading: 1.35, body: 1.85 },
      tracking: { display: "0.04em", label: "0.28em" },
      role: {
        zh: "细衬线，只用 300 与 400。标题字距 0.04em、标签 0.28em，行高 1.85——慢是它的语法。",
        en: "A light serif in 300 and 400 only. Headings at 0.04em, labels at 0.28em, body at 1.85 leading — slowness is the grammar.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", weight: 300, size: 48, lineHeight: 1.2, tracking: "0.04em", token: "--text-display" },
    { role: "heading", weight: 300, size: 34, lineHeight: 1.3, tracking: "0.04em", token: "--text-heading" },
    { role: "subheading", weight: 400, size: 24, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", weight: 300, size: 18, lineHeight: 1.8, token: "--text-body-lg" },
    { role: "body", weight: 300, size: 15, lineHeight: 1.85, token: "--text-body" },
    { role: "label", weight: 400, size: 13, lineHeight: 1.6, tracking: "0.28em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 160, 240],
    maxWidth: 1120,
    sectionGap: 240,
    cardPadding: 48,
    elementGap: 40,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Marble White", value: "#f8f6f3", purpose: "页面底" },
    { level: 1, name: "Pale Stone", value: "#e8e0d6", purpose: "次级区块" },
  ],
  elevation: [{ name: "None", value: "none — flat stone, no shadow" }],
  components: [
    {
      name: "Gold Rule",
      role: { zh: "古金分隔线（核心结构）", en: "The gold rule — the core structure" },
      construction: {
        zh: "1px、色古金 30%，横跨内容宽并在两端各收进 5%。它替代所有其它分隔手段——不用阴影、不用底色块、不用留白条。奢华感的全部重量在这根线上。",
        en: "1px in antique gold at 30%, spanning the content width with 5% clear at each end. It replaces every other divider — no shadow, no filled block, no spacer. The whole weight of the luxury rests on this line.",
      },
    },
    {
      name: "Marble Card",
      role: { zh: "内容卡", en: "The content card" },
      construction: {
        zh: "大理石白或浅石填充、零圆角、1px 古金 20% 描边、内边距 48px，无阴影。标题 34px/300 黑、字距 0.04em；正文 15px/300 行高 1.85。hover 时只把描边升到 40%，其余不变。",
        en: "Marble white or pale stone fill, zero radius, a 1px antique gold border at 20%, 48px padding, no shadow. The title runs 34px/300 in black at 0.04em with body at 15px/300 on 1.85 leading. Hover raises only the border, to 40%.",
      },
    },
    {
      name: "Quiet Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "透明底、1px 黑 40% 描边、零圆角、13px/400、字距 0.28em、padding 18px 40px，无阴影。hover 时描边转古金 100%、文字转古金；按下时描边升到 2px 但位置不变。过渡 500ms ease-out。",
        en: "Transparent fill, a 1px black border at 40%, zero radius, 13px/400 at 0.28em, 18px 40px padding, no shadow. Hover turns the border gold at full and the text with it; press thickens the border to 2px without moving. 500ms ease-out.",
      },
      sizes: "padding 18px 40px; label 13px",
      states: "hover: gold border and text; active: border 2px",
    },
    {
      name: "Stone Vein",
      role: { zh: "石纹底", en: "The stone vein ground" },
      construction: {
        zh: "用 SVG 的 feTurbulence 加 feDisplacementMap（极低频、细线）生成几缕不规则石纹，颜色石纹灰、不透明度 5% 到 8%，只出现在大区块的背景。它的存在应该几乎察觉不到——察觉到了就太重。",
        en: "feTurbulence with feDisplacementMap at very low frequency and thin lines produces a few irregular veins in stone grey at 5% to 8%, appearing only behind large sections. It should be barely perceptible — if it registers, it is too heavy.",
      },
    },
    {
      name: "Index Mark",
      role: { zh: "序号与小标记", en: "Index numbers and small marks" },
      construction: {
        zh: "13px/400、字距 0.28em、古金或石纹灰。格式为「01 — 04」或「EST. 1987」。它是页面上除标题外唯一的「小字」，也是唯一允许的装饰性文字。",
        en: "13px/400 at 0.28em in gold or stone grey, in forms like 01 — 04 or EST. 1987. It is the only small type besides headings and the only decorative text the style permits.",
      },
    },
  ],
  imagery: {
    zh: "建筑与室内摄影：石材、金属、玻璃、比例精确的空间。必须自然光、低饱和、构图克制。允许把照片处理成暖灰单色。不使用高饱和摄影、装饰插画与人像特写。",
    en: "Architecture and interior photography: stone, metal, glass, precisely proportioned space. Natural light, low saturation, restrained framing. A photo may be graded warm monochrome. No saturated photography, decorative illustration or portrait close-ups.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 32px，区块间距 240px。留白占页面六成以上。单栏或克制双栏，一切左对齐或严格居中，禁止错位与旋转。",
    en: "Capped at 1120px with 32px padding, sections 240px apart. Over sixty percent of the page stays empty. One column or a restrained pair, everything flush left or strictly centred — no offsets and no rotation.",
  },
  dos: [
    { zh: "大理石白底配纯黑文字", en: "Marble white ground with pure black type" },
    { zh: "古金只作 1px 线与细边框", en: "Gold appears only as 1px rules and fine borders" },
    { zh: "衬线只用 300 与 400 字重", en: "Serif in 300 and 400 only" },
    { zh: "字距 0.2em 以上", en: "Tracking past 0.2em" },
    { zh: "零圆角零阴影", en: "Zero radius, zero shadow" },
    { zh: "留白占六成以上", en: "Over sixty percent empty" },
  ],
  donts: [
    { zh: "不要用阴影", en: "No shadows" },
    { zh: "不要用渐变", en: "No gradients" },
    { zh: "不要把金铺成面", en: "Never flood the gold as a surface" },
    { zh: "不要用粗边框", en: "No thick borders" },
    { zh: "不要用装饰图形", en: "No decorative graphics" },
    { zh: "不要让石纹抢眼", en: "Never let the stone texture register" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1a1a",
      background: "#f8f6f3",
      gold: "#c9a96e",
      stone: "#8a7968",
      pale: "#e8e0d6",
      jade: "#85bd73",
    },
    prompts: [
      {
        zh: "做一个大理石奢华卡片：大理石白 #f8f6f3 填充、零圆角、1px rgba(201,169,110,0.2) 描边、内边距 48px、无阴影。标题 34px/300 Cormorant Garamond、字距 0.04em、色 #1a1a1a；正文 15px/300、行高 1.85。卡片之间用 1px rgba(201,169,110,0.3) 的古金线分隔，两端各收进 5%。页边留白 240px，背景可叠 5% 不透明度的细石纹（feTurbulence）。按钮透明底、1px 黑 40% 描边、零圆角、13px 字距 0.28em、padding 18px 40px，hover 时描边与文字转 #c9a96e。页面底色 #f8f6f3。",
        en: "Build a marble luxury card: #f8f6f3 fill, zero radius, a 1px rgba(201,169,110,0.2) border, 48px padding, no shadow. The title runs 34px/300 Cormorant Garamond at 0.04em in #1a1a1a; body at 15px/300 on 1.85 leading. A 1px rgba(201,169,110,0.3) gold rule divides cards, inset 5% at each end. Sections sit 240px apart with a 5% opacity stone vein (feTurbulence) behind. The button is transparent with a 1px black border at 40%, zero radius, 13px text at 0.28em and 18px 40px padding, turning its border and text to #c9a96e on hover. The page ground is #f8f6f3.",
      },
    ],
  },
  similar: [
    { name: "Luxe Lookbook", why: { zh: "同属奢侈，但画册是时装影像，大理石是建筑与材质", en: "Both luxury, though the lookbook is fashion imagery while marble is architecture and material" } },
    { name: "Art Deco", why: { zh: "同样用金，但装饰艺术是几何与金块，大理石只有金线", en: "Both use gold, though Art Deco adds geometry and blocks while marble keeps only the line" } },
  ],
  completeness: "full",
};
