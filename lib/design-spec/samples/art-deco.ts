import type { DesignSpec } from "../types";

export const artDecoSpec: DesignSpec = {
  slug: "art-deco",
  name: "装饰艺术风格",
  nameEn: "Art Deco",
  cover: "/styles/art-deco.svg",
  theme: "dark",
  northStar: {
    zh: "金色几何线条压在深底上，对称到近乎仪式感。",
    en: "Gold geometric lines over a dark ground, symmetrical to the point of ritual.",
  },
  summary: {
    zh: "装饰艺术来自 1920 到 30 年代：金色、深蓝黑、严格的轴对称、几何化的装饰线条（放射、阶梯、扇形）。它的规则是三条禁令——不许鲜艳的现代配色、不许不对称的混乱布局、不许现代无衬线字体，也不许省略装饰元素。界面上最有效的做法是：深底（#1a1a2e）配金色描边（#d4af37 的 1px 或 2px），标题用衬线加大字距，装饰用 1px 的金线构成上下对称的边框。",
    en: "Art Deco comes from the 1920s and 30s: gold, deep blue-black, strict axial symmetry, and geometric ornament — sunbursts, stepped forms, fans. Its rules are prohibitions: no vibrant modern palettes, no asymmetric chaos, no modern sans, and ornament may never be omitted. What works on screen is a dark ground (#1a1a2e) with gold hairlines at 1px or 2px, serif headings on wide tracking, and ornament built from 1px gold rules forming symmetrical top-and-bottom frames.",
  },
  colors: [
    {
      name: "金",
      nameEn: "Gold",
      value: "#d4af37",
      group: "brand",
      role: {
        zh: "描边、标题与小面积装饰。整套风格的奢华感全部来自它。",
        en: "Strokes, headings and small ornament — all the luxury comes from this gold.",
      },
      token: "--color-gold",
    },
    {
      name: "深夜蓝",
      nameEn: "Midnight",
      value: "#1a1a2e",
      group: "surface",
      role: {
        zh: "页面底。深蓝黑而不是纯黑，让金色显得更暖。",
        en: "The page ground — deep blue-black rather than pure black, warming the gold.",
      },
      token: "--color-midnight",
    },
    {
      name: "暗金",
      nameEn: "Antique Gold",
      value: "#c9a227",
      group: "accent",
      role: {
        zh: "次级描边与压印效果，比主金暗一档。",
        en: "Secondary strokes and embossing, one step darker than the primary gold.",
      },
      token: "--color-antique-gold",
    },
    {
      name: "石板蓝",
      nameEn: "Slate Navy",
      value: "#2d2d44",
      group: "surface",
      role: {
        zh: "卡片与面板。只比底色亮一点，保持整体的沉。",
        en: "Cards and panels — barely above the ground, keeping the whole page heavy.",
      },
      token: "--color-slate-navy",
    },
    {
      name: "象牙",
      nameEn: "Ivory",
      value: "#f5f5dc",
      group: "surface",
      role: {
        zh: "正文与浅色区块。比纯白柔，像旧信纸。",
        en: "Body text and light sections — softer than white, like old letter paper.",
      },
      token: "--color-ivory",
    },
    {
      name: "祖母绿",
      nameEn: "Emerald",
      value: "#4bc542",
      group: "accent",
      role: {
        zh: "唯一的第二色，只用于极小的宝石式点缀。",
        en: "The one secondary color, reserved for jewelled accents at the smallest scale.",
      },
      token: "--color-emerald",
    },
  ],
  fonts: [
    {
      family: "Cinzel",
      substitute: "'Trajan Pro', Georgia, serif",
      weights: [400, 700],
      sizes: [14, 18, 24, 36, 48, 64],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.7 },
      tracking: { display: "0.12em", label: "0.2em" },
      role: {
        zh: "标题与字标。全大写、字距 0.12 到 0.2em，字形本身带 20 年代的纪念碑感。",
        en: "Headings and wordmark, uppercase at 0.12 to 0.2em tracking — the letterforms carry the era's monumental feel.",
      },
      token: "--font-display",
    },
    {
      family: "Georgia",
      substitute: "'Songti SC', serif",
      weights: [400, 700],
      sizes: [14, 16, 18],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.7 },
      tracking: { display: "0.01em", label: "0.2em" },
      role: {
        zh: "正文。衬线是唯一合法的正文字体，无衬线在这套语言里是不合时代的。",
        en: "Body copy. Serif is the only legal body face; a sans would break the period.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", font: "Cinzel", weight: 700, size: 64, lineHeight: 1.1, tracking: "0.12em", token: "--text-display" },
    { role: "heading-lg", font: "Cinzel", weight: 700, size: 48, lineHeight: 1.15, tracking: "0.12em", token: "--text-heading-lg" },
    { role: "heading", font: "Cinzel", weight: 400, size: 36, lineHeight: 1.2, tracking: "0.1em", token: "--text-heading" },
    { role: "subheading", font: "Cinzel", weight: 400, size: 24, lineHeight: 1.3, tracking: "0.08em", token: "--text-subheading" },
    { role: "body", font: "Georgia", weight: 400, size: 16, lineHeight: 1.7, token: "--text-body" },
    { role: "label", font: "Cinzel", weight: 400, size: 14, lineHeight: 1.5, tracking: "0.2em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1080,
    sectionGap: 128,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
    { element: "medallions", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Midnight", value: "#1a1a2e", purpose: "页面底" },
    { level: 1, name: "Slate Navy", value: "#2d2d44", purpose: "卡片与面板" },
    { level: 2, name: "Ivory", value: "#f5f5dc", purpose: "浅色区块" },
  ],
  elevation: [
    { name: "None", value: "none — 1px gold lines do the separating" },
    { name: "Gold glow", value: "0 0 12px rgba(212,175,55,0.35)" },
  ],
  components: [
    {
      name: "Gold Frame",
      role: { zh: "对称金线边框（识别核心）", en: "The symmetrical gold frame — the identifier" },
      construction: {
        zh: "在内容块外侧用两层 1px 金线（#d4af37）：外层距边 0，内层距边 8px，四角各加一个 12px 的 45 度短斜线作为角饰。上下边框比左右粗一档（2px 对 1px），强化 20 年代的框式构图。框内保持纯粹，不加其他装饰。",
        en: "Wrap a block in two 1px gold rules: the outer at the edge, the inner 8px in, plus a 12px 45-degree tick at each corner. Top and bottom run 2px against 1px on the sides, reinforcing the era's framed composition. The interior stays clean with no further ornament.",
      },
    },
    {
      name: "Deco Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "透明底、1px 金描边、零圆角、金色文字全大写、14px/400、字距 0.2em、padding 14px 36px。hover 时填充金 12%、文字转象牙、外发光 0 0 12px 金 35%；按下时填充升到 20%。过渡 250ms ease-out。",
        en: "Transparent fill, a 1px gold border, zero radius, gold uppercase text at 14px/400 with 0.2em tracking, 14px 36px padding. Hover fills 12% gold, turns the text ivory and adds a 0 0 12px glow at 35%; press raises the fill to 20%. 250ms ease-out.",
      },
      sizes: "padding 14px 36px; label 14px",
      states: "hover: fill 12%, ivory text, glow; active: fill 20%",
    },
    {
      name: "Deco Card",
      role: { zh: "内容卡与菜单卡", en: "Content and menu cards" },
      construction: {
        zh: "石板蓝底、零圆角、1px 暗金 60% 描边、内边距 32px。顶部居中放一个 24px 的几何装饰（扇形或放射线，用 1px 金线画），标题 24px/400 全大写 0.08em 居中，正文 16px 衬线象牙。整卡上下留 32px 金线分隔。",
        en: "Slate navy fill, zero radius, a 1px antique gold border at 60%, 32px padding. A 24px geometric ornament (fan or sunburst drawn in 1px gold) sits centred at the top, above a 24px/400 uppercase headline at 0.08em and 16px serif ivory body. Gold rules 32px above and below close the card.",
      },
    },
    {
      name: "Sunburst Divider",
      role: { zh: "放射状分隔装饰", en: "The sunburst divider" },
      construction: {
        zh: "由一条水平金线与 7 到 9 条向下辐射的短线（各 8 到 12px，间隔 12 度）组成，线宽 1px，宽 120 到 200px，居中置于区块之间。它是这套风格的签名装饰，单屏最多两处。",
        en: "A horizontal gold rule with seven to nine short rays descending at twelve-degree intervals, each 8 to 12px, all at 1px in a 120 to 200px span, centred between sections. It is the style's signature and appears at most twice per screen.",
      },
    },
    {
      name: "Ivory Panel",
      role: { zh: "浅色区块", en: "Light sections" },
      construction: {
        zh: "象牙底、零圆角、四边各 1px 暗金描边、内边距 48px，内部文字转深夜蓝。用于打破全暗的页面，但整页不超过一块。",
        en: "Ivory fill, zero radius, a 1px antique gold border on all four sides, 48px padding, with text switching to midnight. It breaks an otherwise dark page, and no page carries more than one.",
      },
    },
  ],
  imagery: {
    zh: "黑白摄影与几何装饰图形：放射线、阶梯形、扇形、对称花纹。允许把照片处理成金调双色调。不使用彩色摄影、现代插画与不对称构图。",
    en: "Black-and-white photography and geometric ornament: sunbursts, stepped forms, fans, symmetrical patterns. A photo may be graded to a gold duotone. No color photography, modern illustration or asymmetric composition.",
  },
  layout: {
    zh: "上限 1080px、容器内边距 24px，区块间距 128px。一切严格居中对称，标题与内容都走中轴线。装饰线从页面边缘延伸到内容边缘，形成框式构图。禁止左对齐的偏置布局。",
    en: "Capped at 1080px with 24px padding, sections 128px apart. Everything centres on the axis — headings and content alike. Ornamental rules run from the page edge to the content edge to form a frame. Off-centre layouts are refused.",
  },
  dos: [
    { zh: "严格轴对称，一切居中", en: "Strict axial symmetry, everything centred" },
    { zh: "金色只用 1px 与 2px 细线", en: "Gold appears as 1px and 2px hairline rules" },
    { zh: "标题衬线、全大写、宽字距", en: "Serif uppercase headings on wide tracking" },
    { zh: "装饰必须有：角饰、放射、扇形", en: "Ornament is mandatory: corner ticks, sunbursts, fans" },
    { zh: "零圆角，只用直角", en: "Zero radius, right angles only" },
    { zh: "深底配象牙文字", en: "Dark grounds with ivory text" },
  ],
  donts: [
    { zh: "不要用鲜艳的现代配色", en: "No vibrant modern palette" },
    { zh: "不要用不对称的混乱布局", en: "No asymmetric chaotic layout" },
    { zh: "不要用现代无衬线字体", en: "No modern sans typeface" },
    { zh: "不要省略装饰元素", en: "Never omit the ornament" },
    { zh: "不要用大圆角", en: "No large radii" },
    { zh: "不要一屏放两块象牙面板", en: "Never two ivory panels on one screen" },
  ],
  promptGuide: {
    quickColors: {
      text: "#f5f5dc",
      background: "#1a1a2e",
      card: "#2d2d44",
      gold: "#d4af37",
      antique: "#c9a227",
      emerald: "#4bc542",
    },
    prompts: [
      {
        zh: "做一个装饰艺术风格卡片：背景 #2d2d44、零圆角、1px rgba(201,162,39,0.6) 描边、内边距 32px。顶部居中放一个用 1px #d4af37 画的扇形装饰（24px 高）。标题 24px Cinzel 全大写 0.08em 居中、色 #d4af37；正文 16px 衬线、行高 1.7、色 #f5f5dc。整卡上下各留 32px 的 1px 金线。页面底色 #1a1a2e。",
        en: "Build an Art Deco card: background #2d2d44, zero radius, a 1px rgba(201,162,39,0.6) border, 32px padding. A 24px fan ornament drawn in 1px #d4af37 sits centred at the top. The headline runs 24px Cinzel uppercase at 0.08em centred in #d4af37; body at 16px serif on 1.7 leading in #f5f5dc. A 1px gold rule closes the card 32px above and below. The page ground is #1a1a2e.",
      },
    ],
  },
  similar: [
    { name: "Gatsby", why: { zh: "同源的 20 年代奢华，但盖茨比更偏派对色彩与装饰密度", en: "Shares the 1920s luxury, though Gatsby leans into party color and denser ornament" } },
    { name: "Retro Vintage", why: { zh: "同为年代感，但复古怀旧是 70 年代印刷，装饰艺术是 20 年代几何", en: "Both period pieces, though retro vintage is 1970s print while Art Deco is 1920s geometry" } },
  ],
  completeness: "full",
};
