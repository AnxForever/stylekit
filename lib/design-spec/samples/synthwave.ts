import type { DesignSpec } from "../types";

export const synthwaveSpec: DesignSpec = {
  slug: "synthwave",
  name: "合成波",
  nameEn: "Synthwave",
  cover: "/styles/synthwave.svg",
  theme: "dark",
  northStar: {
    zh: "日落渐变压在网格地平线上，霓虹从内外两侧同时发光。",
    en: "A sunset gradient over a grid horizon, with neon glowing from inside and outside at once.",
  },
  summary: {
    zh: "合成波是 80 年代合成器音乐的视觉：粉紫青霓虹、橙到粉到紫的日落渐变、向地平线汇聚的透视网格、复古科技字体。它有两条标志性动效规则——第一是 Arcade Pulse，霓虹边框与发光元素在 hover 时脉冲或闪烁，像街机的 CRT 被触碰后通电；第二是 Multidimensional Neon，按钮必须同时有内嵌青光的 inset 阴影与外侧粉光的外阴影，两根霓虹灯管从相反方向发光，hover 时一起加强。单方向发光在这里是错的。",
    en: "Synthwave is the look of 1980s synth music: pink-violet-cyan neon, a sunset gradient from orange through pink into violet, a perspective grid converging on the horizon, and retro-tech type. Two motion rules define it. Arcade Pulse makes neon borders and glows pulse or flicker on hover, as if an arcade CRT energised under a touch. Multidimensional Neon requires a button to carry both an inset cyan glow and an outer pink glow — two neon tubes lighting from opposite directions, intensifying together on hover. A single-direction glow is wrong here.",
  },
  colors: [
    {
      name: "洋红",
      nameEn: "Magenta",
      value: "#ff00ff",
      group: "brand",
      role: {
        zh: "第一霓虹色：外发光的粉侧与主按钮。",
        en: "The first neon on the outer pink glow and primary buttons.",
      },
      token: "--color-magenta",
    },
    {
      name: "青",
      nameEn: "Cyan",
      value: "#00ffff",
      group: "brand",
      role: {
        zh: "第二霓虹色：内发光的青侧与网格线。",
        en: "The second neon on the inner cyan glow and the grid lines.",
      },
      token: "--color-cyan",
    },
    {
      name: "深紫底",
      nameEn: "Deep Violet Base",
      value: "#1a0b2e",
      group: "surface",
      role: {
        zh: "页面底。深到让两层霓虹都能被看见。",
        en: "The page ground — dark enough for both neon layers to register.",
      },
      token: "--color-deep-violet",
    },
    {
      name: "粉",
      nameEn: "Pink",
      value: "#ff6ec7",
      group: "accent",
      role: {
        zh: "日落渐变的中段与次级强调。",
        en: "The middle of the sunset gradient and secondary emphasis.",
      },
      token: "--color-pink",
    },
    {
      name: "紫",
      nameEn: "Violet",
      value: "#7b68ee",
      group: "accent",
      role: {
        zh: "渐变的过渡站，把粉接到深紫。",
        en: "The gradient's transition stop, carrying pink into deep violet.",
      },
      token: "--color-violet",
    },
    {
      name: "落日橙",
      nameEn: "Sunset Orange",
      value: "#f67d50",
      group: "accent",
      role: {
        zh: "渐变顶端与暖侧高光，落日与地平线的交界。",
        en: "The gradient's top and the warm highlight where sun meets horizon.",
      },
      token: "--color-sunset-orange",
    },
  ],
  fonts: [
    {
      family: "Orbitron",
      substitute: "'Arial Black', 'Trebuchet MS', sans-serif",
      weights: [700, 900],
      sizes: [13, 16, 22, 32, 46, 66],
      lineHeight: { display: 1.05, heading: 1.15, body: 1.5 },
      tracking: { display: "0.04em", label: "0.2em" },
      role: {
        zh: "复古科技感的几何无衬线，全大写并放宽字距。标题 46 到 66px 带 0.04em 字距。",
        en: "A retro-tech geometric sans, uppercase on open tracking. Headlines run 46 to 66px at 0.04em.",
      },
      token: "--font-display",
    },
  ],
  typeScale: [
    { role: "display", font: "Orbitron", weight: 900, size: 66, lineHeight: 1.05, tracking: "0.04em", token: "--text-display" },
    { role: "heading", font: "Orbitron", weight: 900, size: 46, lineHeight: 1.1, tracking: "0.04em", token: "--text-heading" },
    { role: "subheading", font: "Orbitron", weight: 700, size: 32, lineHeight: 1.2, token: "--text-subheading" },
    { role: "body-lg", font: "Orbitron", weight: 700, size: 16, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", font: "Orbitron", weight: 700, size: 13, lineHeight: 1.5, token: "--text-body" },
    { role: "label", font: "Orbitron", weight: 700, size: 13, lineHeight: 1.4, tracking: "0.2em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1280,
    sectionGap: 96,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "8px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "8px" },
  ],
  surfaces: [
    { level: 0, name: "Deep Violet Base", value: "#1a0b2e", purpose: "页面底" },
    { level: 1, name: "Sunset Gradient", value: "linear-gradient(#f67d50, #ff6ec7, #7b68ee)", purpose: "日落" },
    { level: 2, name: "Grid Floor", value: "perspective grid", purpose: "地平线网格" },
  ],
  elevation: [
    {
      name: "Multidimensional",
      value: "0 0 15px rgba(255,0,255,0.40), inset 0 0 10px rgba(0,255,255,0.20)",
    },
    {
      name: "Multidimensional strong",
      value: "0 0 30px rgba(255,0,255,0.70), inset 0 0 20px rgba(0,255,255,0.40)",
    },
    { name: "Text glow", value: "0 0 12px rgba(255,0,255,0.70)" },
  ],
  components: [
    {
      name: "Multidimensional Button",
      role: { zh: "主行动按钮（双向霓虹）", en: "The primary button with two-way neon" },
      construction: {
        zh: "深紫填充、白字、8px 圆角、1px 洋红 60% 描边，13px/700 全大写 0.2em、padding 12px 28px。必须同时带 0 0 15px 洋红 40% 的外发光与 inset 0 0 10px 青 20% 的内发光。hover 时两层一起加强到 30px 与 20px，并触发 Arcade Pulse（动画在 1.2s 内往复一次）。过渡 200ms。",
        en: "Deep violet fill, white text, 8px radius, a 1px magenta border at 60%, 13px/700 uppercase at 0.2em, 12px 28px padding. It must carry both a 0 0 15px outer glow at 40% magenta and an inset 0 0 10px inner glow at 20% cyan. Hover intensifies both to 30px and 20px and triggers Arcade Pulse — one cycle within 1.2s. 200ms.",
      },
      sizes: "padding 12px 28px; label 13px",
      states: "hover: both glows intensify, arcade pulse",
    },
    {
      name: "Neon Card",
      role: { zh: "内容卡", en: "Content card" },
      construction: {
        zh: "深紫 80% 填充、8px 圆角、1px 青 35% 描边、内边距 24px，双向外发光（青 12px、洋红 24px）。标题 32px/700 带 0 0 12px 洋红文字发光，正文 13px 白 80%。hover 时描边升到 70% 并触发一次脉冲。",
        en: "80% deep violet fill, 8px radius, a 1px cyan border at 35%, 24px padding, with two glows (cyan at 12px, magenta at 24px). The title runs 32px/700 under a 0 0 12px magenta text glow, body at 13px in 80% white. Hover raises the border to 70% and pulses once.",
      },
      states: "hover: border 70%, pulse once",
    },
    {
      name: "Sunset Horizon",
      role: { zh: "日落与地平线（签名）", en: "The sunset and horizon — the signature" },
      construction: {
        zh: "一条从橙经粉到紫的垂直渐变带，高 240 到 360px，中间放一个 120 到 200px 的圆（橙到粉的径向渐变），圆被 8 到 12 条水平黑线切开形成条纹日落。下方接透视网格（perspective(320px) rotateX(60deg)），网格线用青色 25%。",
        en: "A vertical band from orange through pink into violet, 240 to 360px tall, holding a 120 to 200px circle (radial orange to pink) cut by eight to twelve horizontal black lines for the striped sun. Below it a perspective grid begins (perspective(320px) rotateX(60deg)) with cyan lines at 25%.",
      },
    },
    {
      name: "Virtual Grid",
      role: { zh: "虚拟网格（仅在接近时激活）", en: "The virtual grid, active only on approach" },
      construction: {
        zh: "透视网格铺满区块下缘，默认不透明度 30%、不位移。只有父级 group-hover（或元素进入视口）时才升到 70% 并开始缓慢向前位移（6s linear 循环）。静止状态下网格绝不能有动画——它只在「玩家接近」时激活。",
        en: "A perspective grid fills a block's lower edge at 30% opacity with no motion by default. Only on a parent group-hover, or when the element enters view, does it rise to 70% and begin drifting forward on a six-second linear loop. A static grid must never animate — it energises only when the viewer approaches.",
      },
      states: "group-hover: opacity 70%, forward drift",
    },
    {
      name: "Chip Label",
      role: { zh: "霓虹标签", en: "The neon chip" },
      construction: {
        zh: "透明底、1px 青描边、8px 圆角、13px/700 全大写 0.2em、padding 4px 10px，文字青色带 0 0 8px 青 60% 发光。hover 时描边转洋红、发光换色。",
        en: "Transparent fill, a 1px cyan border, 8px radius, 13px/700 uppercase at 0.2em, 4px 10px padding, with cyan text under a 0 0 8px glow at 60%. Hover turns the border magenta and swaps the glow.",
      },
    },
  ],
  imagery: {
    zh: "合成器视觉：落日、棕榈剪影、跑车、城市天际线、网格地面、复古科技设备。允许把照片压成粉紫双色调。不使用明亮白底、现代摄影与极简构图。",
    en: "Synth visuals: sunsets, palm silhouettes, sports cars, skylines, grid floors, retro tech hardware. A photo may be graded to a pink-violet duotone. No bright white grounds, modern photography or minimal composition.",
  },
  layout: {
    zh: "上限 1280px、容器内边距 24px，区块间距 96px。首屏常为居中的大标题压在日落与网格地平线上。允许元素与网格重叠，但文字必须始终在发光之上保持可读。",
    en: "Capped at 1280px with 24px padding, sections 96px apart. The hero is usually a large centred headline over a sunset and grid horizon. Elements may overlap the grid, while text always sits above the glow and stays readable.",
  },
  dos: [
    { zh: "粉紫青霓虹配色", en: "Pink, violet and cyan neon" },
    { zh: "橙到粉到紫的日落渐变", en: "Sunset gradient from orange through pink into violet" },
    { zh: "霓虹必须双向发光（inset 加 outer）", en: "Neon glows both inside and outside" },
    { zh: "hover 触发 Arcade Pulse", en: "Hover triggers Arcade Pulse" },
    { zh: "网格只在接近时激活", en: "The grid energises only on approach" },
    { zh: "全大写几何科技字体", en: "Uppercase geometric tech type" },
  ],
  donts: [
    { zh: "不要用明亮白色背景", en: "No bright white grounds" },
    { zh: "不要做现代简约风", en: "No modern minimalism" },
    { zh: "不要省略霓虹发光", en: "Never omit the neon glow" },
    { zh: "不要用过于正式的字体", en: "No formal typeface" },
    { zh: "不要用单向霓虹光", en: "Never glow in one direction only" },
    { zh: "不要让网格在静止时移动", en: "Never let the grid move at rest" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ffffff",
      background: "#1a0b2e",
      magenta: "#ff00ff",
      cyan: "#00ffff",
      pink: "#ff6ec7",
      violet: "#7b68ee",
    },
    prompts: [
      {
        zh: "做一个合成波按钮：深紫 #1a0b2e 填充、白字、8px 圆角、1px rgba(255,0,255,0.6) 描边、13px/700 全大写 0.2em 字距、padding 12px 28px、box-shadow 0 0 15px rgba(255,0,255,0.4), inset 0 0 10px rgba(0,255,255,0.2)（双向霓虹）。hover 时两层发光加强到 0 0 30px rgba(255,0,255,0.7), inset 0 0 20px rgba(0,255,255,0.4) 并触发一次脉冲。首屏加一条橙到粉到紫的垂直渐变带与一个被水平黑线切开的圆形落日，下方接 perspective(320px) rotateX(60deg) 的青色网格，仅在 group-hover 时提升不透明度并位移。",
        en: "Build a synthwave button: #1a0b2e fill, white text, 8px radius, a 1px rgba(255,0,255,0.6) border, 13px/700 uppercase at 0.2em, 12px 28px padding, and box-shadow 0 0 15px rgba(255,0,255,0.4) with inset 0 0 10px rgba(0,255,255,0.2) for the two-way neon. Hover intensifies both layers to 0 0 30px rgba(255,0,255,0.7) and inset 0 0 20px rgba(0,255,255,0.4) with one pulse. The hero carries a vertical orange-to-pink-to-violet band with a circular sun cut by horizontal black lines, above a perspective(320px) rotateX(60deg) cyan grid that only raises its opacity and drifts on group-hover.",
      },
    ],
  },
  similar: [
    { name: "Outrun", why: { zh: "同源于 80 年代，但 Outrun 讲速度与冲刺，合成波讲日落与氛围", en: "Both 1980s-derived, though Outrun is about speed while synthwave is about sunset and atmosphere" } },
    { name: "Vaporwave", why: { zh: "同样粉紫，但蒸汽波更慢更怀旧并带双色重影", en: "Both pink and violet, though vaporwave is slower, more nostalgic and ghosted in two colors" } },
  ],
  completeness: "full",
};
