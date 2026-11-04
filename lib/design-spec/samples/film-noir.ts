import type { DesignSpec } from "../types";

export const filmNoirSpec: DesignSpec = {
  slug: "film-noir",
  name: "黑色电影",
  nameEn: "Film Noir",
  cover: "/styles/film-noir.svg",
  theme: "dark",
  northStar: {
    zh: "一束斜光切开黑房间：其余全部藏在阴影里。",
    en: "One shaft of light cutting a black room — everything else stays in shadow.",
  },
  summary: {
    zh: "黑色电影来自 1940 到 50 年代的黑色片：极端明暗对比、深灰阶分层、斜向光影、以及只在必要时出现的一抹猩红（#c41e3a）。它不用颜色造层次而用亮度——卡片之间靠 #1a1a1a 与 #262626 这类极微妙的灰差区分，光影用线性渐变模拟，hover 只改亮度不改色相。标题用衬线斜体，像片头字幕。禁令是：不许彩色背景、不许高饱和色（猩红只作点缀）、不许大圆角。",
    en: "Film Noir comes from the noir pictures of the 1940s and 50s: extreme light-dark contrast, deep greyscale layering, diagonal light, and a crimson (#c41e3a) that appears only when necessary. It builds depth from luminance rather than color — cards separate through the faintest grey difference like #1a1a1a against #262626, light and shadow are faked with linear gradients, and hover changes brightness rather than hue. Headings take a serif italic like opening credits. Colorful grounds, saturated color beyond the crimson accent, and large radii are refused.",
  },
  colors: [
    {
      name: "胶片黑",
      nameEn: "Film Black",
      value: "#0a0a0a",
      group: "surface",
      role: {
        zh: "页面底与最深的阴影。近纯黑，让光看起来是打上去的。",
        en: "The page ground and the deepest shadow — near pure so light reads as cast.",
      },
      token: "--color-film-black",
    },
    {
      name: "幕灰",
      nameEn: "Screen Grey",
      value: "#1a1a1a",
      group: "surface",
      role: {
        zh: "第一层抬升面。只比底色亮一档。",
        en: "The first raised surface, a single step above the ground.",
      },
      token: "--color-screen-grey",
    },
    {
      name: "第二灰",
      nameEn: "Second Grey",
      value: "#262626",
      group: "surface",
      role: {
        zh: "第二层抬升面与卡片内部。",
        en: "The second raised surface and card interiors.",
      },
      token: "--color-second-grey",
    },
    {
      name: "烟白",
      nameEn: "Smoke White",
      value: "#f5f5f0",
      group: "brand",
      role: {
        zh: "标题与主要文字。略带暖的灰白，像旧拷贝。",
        en: "Headings and primary text — a faintly warm grey-white, like an old print.",
      },
      token: "--color-smoke-white",
    },
    {
      name: "猩红",
      nameEn: "Crimson",
      value: "#c41e3a",
      group: "accent",
      role: {
        zh: "唯一的彩色，只作点缀：一个标记、一条线、一次警告。",
        en: "The only color, purely an accent: one mark, one rule, one warning.",
      },
      token: "--color-crimson",
    },
    {
      name: "黄铜",
      nameEn: "Brass",
      value: "#d4af37",
      group: "accent",
      role: {
        zh: "极少量用于「贵」的暗示，如奖项与年份。",
        en: "Used sparingly to imply value, on awards and years.",
      },
      token: "--color-brass",
    },
  ],
  fonts: [
    {
      family: "Playfair Display",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400, 700],
      sizes: [20, 28, 38, 52, 72],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.6 },
      tracking: { display: "-0.01em", label: "0.14em" },
      role: {
        zh: "标题用衬线斜体，像 1940 年代的片头字幕。正文用同族正体，行高 1.7。",
        en: "Headings take the serif italic like 1940s title cards; body uses the same family upright at 1.7 leading.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", font: "Playfair Display", weight: 700, size: 72, lineHeight: 1.1, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", font: "Playfair Display", weight: 700, size: 52, lineHeight: 1.15, token: "--text-heading" },
    { role: "subheading", font: "Playfair Display", weight: 400, size: 38, lineHeight: 1.25, token: "--text-subheading" },
    { role: "body-lg", font: "Playfair Display", weight: 400, size: 28, lineHeight: 1.4, token: "--text-body-lg" },
    { role: "body", font: "Playfair Display", weight: 400, size: 20, lineHeight: 1.7, token: "--text-body" },
    { role: "label", font: "Playfair Display", weight: 700, size: 20, lineHeight: 1.4, tracking: "0.14em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1120,
    sectionGap: 128,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "4px" },
    { element: "buttons", value: "2px" },
    { element: "inputs", value: "2px" },
  ],
  surfaces: [
    { level: 0, name: "Film Black", value: "#0a0a0a", purpose: "页面底" },
    { level: 1, name: "Screen Grey", value: "#1a1a1a", purpose: "第一层" },
    { level: 2, name: "Second Grey", value: "#262626", purpose: "第二层" },
  ],
  elevation: [
    { name: "None", value: "none — light is faked with gradients" },
    { name: "Card", value: "0 24px 60px rgba(0,0,0,0.70)" },
  ],
  components: [
    {
      name: "Shaft Card",
      role: { zh: "斜光卡片（核心组件）", en: "The shaft-of-light card — the core component" },
      construction: {
        zh: "#1a1a1a 填充、4px 圆角、1px #2e2e2e 描边、内边距 32px。关键是用一层线性渐变模拟斜光：linear-gradient(115deg, rgba(255,255,255,0.08) 0%, transparent 45%)，从左上打入。标题 38px 衬线斜体烟白，正文 20px 烟白 70%。hover 时整体亮度升 8%（filter: brightness），绝不改色相。",
        en: "A #1a1a1a fill, 4px radius, a 1px #2e2e2e border, 32px padding. The point is the shaft: linear-gradient(115deg, rgba(255,255,255,0.08) 0%, transparent 45%) entering from top-left. The title runs 38px serif italic in smoke white with body at 20px in 70%. Hover raises overall brightness eight percent via filter — the hue never changes.",
      },
      states: "hover: brightness +8%",
    },
    {
      name: "Noir Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "透明底、1px 烟白 30% 描边、2px 圆角、20px/700、字距 0.14em、padding 12px 32px。hover 时描边升到 70%、文字从 85% 升到 100%、背景加烟白 4%；按下时亮度降 10%。过渡 400ms ease-out。",
        en: "Transparent fill, a 1px smoke white border at 30%, 2px radius, 20px/700 at 0.14em, 12px 32px padding. Hover takes the border to 70%, the text from 85% to full, and adds a 4% smoke ground; press drops brightness ten percent. 400ms ease-out.",
      },
      sizes: "padding 12px 32px; label 20px",
      states: "hover: border 70%, brighter text; active: brightness -10%",
    },
    {
      name: "Crimson Mark",
      role: { zh: "猩红标记", en: "The crimson mark" },
      construction: {
        zh: "一条 2px、长 32 到 64px 的猩红横线，或一个 8px 的猩红圆点，或一行猩红文字。全页只允许出现一到两处，它是画面的「出血点」。绝不铺成色块。",
        en: "A 2px crimson rule 32 to 64px long, an 8px crimson dot, or one line of crimson text. The page holds one or two at most — it is the frame's point of bleeding. It is never flooded into a block.",
      },
    },
    {
      name: "Diagonal Shadow",
      role: { zh: "斜向阴影带", en: "The diagonal shadow band" },
      construction: {
        zh: "一个绝对定位的斜向条带（rotate(-18deg)）、宽 200 到 400px、填黑 60% 并加 120px 模糊，压在内容上但 pointer-events: none。它模拟百叶窗或门框投下的影，单屏最多两处。",
        en: "An absolutely positioned band rotated -18 degrees, 200 to 400px wide, filled 60% black with a 120px blur, laid over content while staying pointer-events none. It imitates a blind or doorway shadow, twice per screen at most.",
      },
    },
    {
      name: "Smoke Field",
      role: { zh: "暗场输入", en: "Dark input field" },
      construction: {
        zh: "#1a1a1a 填充、2px 圆角、1px #2e2e2e 描边、padding 12px 16px、20px 衬线。占位符烟白 35%。聚焦时描边转烟白 50% 并加 1px 外环。",
        en: "A #1a1a1a fill, 2px radius, a 1px #2e2e2e border, 12px 16px padding at 20px serif. The placeholder sits at 35% smoke white. Focus turns the border to 50% and adds a 1px ring.",
      },
    },
  ],
  imagery: {
    zh: "黑白摄影：人物侧影、百叶窗光、雨夜街道、烟雾、烟头特写。必须有强方向光与深阴影。允许把彩色照片转成高对比黑白。不使用彩色图像、平光摄影与柔和插画。",
    en: "Black-and-white photography: profiles, blind shadows, rain-soaked streets, smoke, a cigarette close-up. It needs hard directional light and deep shadow. A color photo may be converted to high-contrast monochrome. No color imagery, flat lighting or soft illustration.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 128px。允许斜向构图与元素错位。整页以黑为主，靠不同层的暗灰区分区域，几乎不用留白做分隔。",
    en: "Capped at 1120px with 24px padding, sections 128px apart. Diagonals and offset elements are welcome. The page is mostly black, its regions separated by shifting greys rather than whitespace.",
  },
  dos: [
    { zh: "极端明暗对比，深灰阶分层", en: "Extreme contrast with deep greyscale layering" },
    { zh: "用线性渐变模拟斜光", en: "Fake the shaft of light with a linear gradient" },
    { zh: "hover 只改亮度不改色相", en: "Hover changes brightness, never hue" },
    { zh: "标题用衬线斜体", en: "Headings take serif italic" },
    { zh: "猩红只作点缀，一到两处", en: "Crimson appears once or twice as accent only" },
    { zh: "圆角不超过 4px", en: "Radius stays at 4px or under" },
  ],
  donts: [
    { zh: "不要用彩色背景", en: "No colorful grounds" },
    { zh: "不要用高饱和色（猩红除外）", en: "No saturated color beyond the crimson" },
    { zh: "不要用大圆角", en: "No large radii" },
    { zh: "不要把猩红铺成色块", en: "Never flood the crimson into a block" },
    { zh: "不要用平光摄影", en: "No flat lighting photography" },
    { zh: "不要用彩色图像", en: "No color imagery" },
  ],
  promptGuide: {
    quickColors: {
      text: "#f5f5f0",
      background: "#0a0a0a",
      raised: "#1a1a1a",
      higher: "#262626",
      crimson: "#c41e3a",
      brass: "#d4af37",
    },
    prompts: [
      {
        zh: "做一个黑色电影风格卡片：#1a1a1a 填充、4px 圆角、1px #2e2e2e 描边、内边距 32px。叠一层对角线光：background-image linear-gradient(115deg, rgba(255,255,255,0.08) 0%, transparent 45%)。标题 38px Playfair Display 斜体、色 #f5f5f0；正文 20px 衬线、行高 1.7、色 rgba(245,245,240,0.7)。左下角放一条 2px、48px 长的猩红 #c41e3a 横线作为唯一彩色。hover 时整体 filter: brightness(1.08)，不改色相。页面底色 #0a0a0a。",
        en: "Build a film noir card: #1a1a1a fill, 4px radius, a 1px #2e2e2e border, 32px padding, with a diagonal shaft layered on via background-image linear-gradient(115deg, rgba(255,255,255,0.08) 0%, transparent 45%). The title runs 38px Playfair Display italic in #f5f5f0 with body at 20px serif on 1.7 leading in rgba(245,245,240,0.7). A 2px crimson #c41e3a rule 48px long sits bottom-left as the only color. Hover applies filter brightness(1.08) without changing hue. The page ground is #0a0a0a.",
      },
    ],
  },
  similar: [
    { name: "Gallery Dark", why: { zh: "同为暗场，但画廊以照片为主体，黑色电影以光影为主体", en: "Both dark, though the gallery centers photographs while noir centers light and shadow" } },
    { name: "Dark Academia", why: { zh: "同为暗调叙事，但暗黑学院是暖棕，黑色电影是灰阶加猩红", en: "Both dark narratives, though dark academia is warm brown while noir is greyscale with crimson" } },
  ],
  completeness: "full",
};
