import type { DesignSpec } from "../types";

export const outrunSpec: DesignSpec = {
  slug: "outrun",
  name: "Outrun 复古未来",
  nameEn: "Outrun",
  cover: "/styles/outrun.svg",
  theme: "dark",
  northStar: {
    zh: "洋红与青的落日、椰树剪影、向地平线冲刺的透视网格。",
    en: "A magenta-and-cyan sunset, palm silhouettes, and a perspective grid rushing at the horizon.",
  },
  summary: {
    zh: "Outrun 是 80 年代赛车与合成器美学：洋红（#ff006e）与紫（#a020f0）的霓虹、青（#00d4ff）的天空、近黑底、透视网格地面、椰树与跑车剪影。它有两条必须遵守的动效规则——第一，发光必须是双色的（洋红加青），单色发光在它看来是「不够 Outrun」；第二，网格背景绝不能静止，必须用 background-position 的位移制造向地平线冲刺的速度幻觉，缺了它整个风格就失去核心。",
    en: "Outrun is the aesthetic of 1980s racing and synth: magenta (#ff006e) and violet (#a020f0) neon, a cyan (#00d4ff) sky, a near-black ground, a perspective grid floor, and palm or sports-car silhouettes. Two motion rules are mandatory. First, glow must be dual-colored — magenta plus cyan — since a single-color glow reads as insufficiently Outrun. Second, the grid may never sit still; background-position must shift to create the illusion of rushing toward the horizon, and without it the style loses its core.",
  },
  colors: [
    {
      name: "洋红",
      nameEn: "Magenta",
      value: "#ff006e",
      group: "brand",
      role: {
        zh: "第一霓虹色：主按钮、地平线与关键强调。",
        en: "The first neon on buttons, the horizon line and key emphasis.",
      },
      token: "--color-magenta",
    },
    {
      name: "紫",
      nameEn: "Violet",
      value: "#a020f0",
      group: "brand",
      role: {
        zh: "第二霓虹色，用于层叠光晕与天空渐变。",
        en: "The second neon, on layered glow and the sky gradient.",
      },
      token: "--color-violet",
    },
    {
      name: "霓虹青",
      nameEn: "Neon Cyan",
      value: "#00d4ff",
      group: "accent",
      role: {
        zh: "天空、网格线与数据。与洋红构成色散关系。",
        en: "The sky, the grid lines and data — dispersing against magenta.",
      },
      token: "--color-cyan",
    },
    {
      name: "近黑",
      nameEn: "Near Black",
      value: "#0a0a0a",
      group: "surface",
      role: {
        zh: "页面底与剪影。让霓虹有地方发光。",
        en: "The page ground and silhouettes — somewhere for the neon to glow.",
      },
      token: "--color-near-black",
    },
    {
      name: "落日橙",
      nameEn: "Sunset Orange",
      value: "#ff6b35",
      group: "accent",
      role: {
        zh: "落日与暖侧高光，用于渐变的中段。",
        en: "The sun and warm highlight, used in the gradient's middle.",
      },
      token: "--color-sunset-orange",
    },
    {
      name: "淡紫",
      nameEn: "Pale Violet",
      value: "#9f9aff",
      group: "accent",
      role: {
        zh: "文字反光与最高光，最亮的一站。",
        en: "Reflected text and peak highlight — the brightest stop.",
      },
      token: "--color-pale-violet",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Arial Black', Helvetica, sans-serif",
      weights: [700, 900],
      sizes: [14, 18, 24, 34, 48, 68],
      lineHeight: { display: 1.05, heading: 1.15, body: 1.55 },
      tracking: { display: "-0.02em", label: "0.22em" },
      role: {
        zh: "粗无衬线，标题 900 字重并有紧字距；小标签全大写加 0.22em 宽字距，是 80 年代的做法。",
        en: "Heavy sans: headings at 900 on tight tracking, with small labels uppercase at 0.22em — the 1980s way.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 68, lineHeight: 1.05, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 900, size: 48, lineHeight: 1.1, tracking: "-0.02em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 34, lineHeight: 1.2, token: "--text-subheading" },
    { role: "body-lg", weight: 700, size: 18, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 700, size: 14, lineHeight: 1.55, token: "--text-body" },
    { role: "label", weight: 700, size: 14, lineHeight: 1.4, tracking: "0.22em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1240,
    sectionGap: 96,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "4px" },
    { element: "buttons", value: "4px" },
    { element: "inputs", value: "4px" },
  ],
  surfaces: [
    { level: 0, name: "Near Black", value: "#0a0a0a", purpose: "页面底" },
    { level: 1, name: "Sky Gradient", value: "linear-gradient(#0a0a0a, #a020f0, #ff006e)", purpose: "天空" },
    { level: 2, name: "Grid Floor", value: "perspective grid", purpose: "透视地面" },
  ],
  elevation: [
    { name: "Dual neon", value: "0 0 20px #ff006e, 0 0 40px #00d4ff" },
    { name: "Dual neon strong", value: "0 0 28px #ff006e, 0 0 60px #00d4ff" },
    { name: "Text glow", value: "0 0 10px rgba(255,0,110,0.70)" },
  ],
  components: [
    {
      name: "Outrun Button",
      role: { zh: "行动按钮", en: "Primary action" },
      construction: {
        zh: "洋红填充、白字、4px 圆角、无描边、14px/700 全大写 0.22em、padding 12px 28px，静态带 0 0 12px 洋红。hover 时叠加双霓虹光晕 0 0 20px 洋红 与 0 0 40px 青（Dual Neon Glow），并上浮 2px；按下时缩到 0.97 且光晕收到 8px。过渡 200ms。",
        en: "Magenta fill, white text, 4px radius, no border, 14px/700 uppercase at 0.22em, 12px 28px padding, with a 0 0 12px magenta at rest. Hover layers the dual neon glow — 0 0 20px magenta and 0 0 40px cyan — and lifts 2px; press scales 0.97 and pulls the glow to 8px. 200ms.",
      },
      sizes: "padding 12px 28px; label 14px",
      states: "hover: dual neon glow, lift 2px; active: scale 0.97",
    },
    {
      name: "Chrome Card",
      role: { zh: "内容卡", en: "Content card" },
      construction: {
        zh: "近黑 80% 填充、4px 圆角、1px 洋红 35% 描边、内边距 24px，外发光 0 0 20px 洋红 40%。标题用洋红到淡紫的横向渐变文字（background-clip: text），正文白 75%。hover 时双霓虹光晕启动，过渡 300ms。",
        en: "80% near-black fill, 4px radius, a 1px magenta border at 35%, 24px padding, glow 0 0 20px at 40% magenta. The title uses a horizontal magenta-to-pale-violet gradient via background-clip, with body at 75% white. Hover fires the dual neon glow over 300ms.",
      },
    },
    {
      name: "Perspective Grid",
      role: { zh: "透视网格地面（签名组件）", en: "The perspective grid floor — the signature" },
      construction: {
        zh: "一个 transform: perspective(320px) rotateX(62deg) 的平面，铺 40px 间隔的青 20% 网格线。必须用 background-position 的 Y 轴位移让它向观察者冲来（周期 2s、linear、无限循环），完全静止就失去了风格核心。prefers-reduced-motion 时静止。",
        en: "A plane under transform: perspective(320px) rotateX(62deg) carrying cyan grid lines every 40px at 20%. background-position must shift along the Y axis so the grid rushes toward the viewer on a two-second linear infinite loop — a static grid loses the style's core. It holds still under reduced motion.",
      },
      sizes: "cell 40px; loop 2s linear",
    },
    {
      name: "Sunset Band",
      role: { zh: "落日条带", en: "The sunset band" },
      construction: {
        zh: "高 160 到 240px 的横向色带，从近黑经紫到洋红再到落日橙，中间放一个 120px 的圆形落日（洋红到橙的径向渐变）并叠 8 条水平黑线把它切开（模拟 80 年代落日条纹）。无边框无圆角。",
        en: "A 160 to 240px horizontal band running from near black through violet into magenta and sunset orange, with a 120px circular sun (radial magenta to orange) cut by eight horizontal black lines for the striped 1980s sunset. No border, no radius.",
      },
    },
    {
      name: "Palm Silhouette",
      role: { zh: "椰树与跑车剪影", en: "Palm and car silhouettes" },
      construction: {
        zh: "纯黑剪影（单色 path），放在地平线两侧，高度 120 到 280px，边缘可以有 1px 的洋红描边作为霓虹轮廓。纯装饰，不承载交互。",
        en: "Pure black silhouettes (single-color paths) flanking the horizon at 120 to 280px tall, optionally outlined in 1px magenta for a neon rim. Purely decorative, never interactive.",
      },
    },
  ],
  imagery: {
    zh: "80 年代合成器视觉：落日、椰树、跑车、城市天际线、网格地面。允许把照片处理成双色调剪影。不使用明亮白底、现代摄影与柔和渐变。",
    en: "1980s synth visuals: sunsets, palms, sports cars, city skylines, grid floors. A photo may be reduced to a duotone silhouette. No bright white grounds, modern photography or soft gradients.",
  },
  layout: {
    zh: "上限 1240px、容器内边距 24px，区块间距 96px。首屏常为透视网格地面加落日加居中的大标题。允许元素与网格重叠，但文字必须始终在光晕之上保持可读。",
    en: "Capped at 1240px with 24px padding, sections 96px apart. The hero is usually a grid floor under a sunset with a large centred headline. Elements may overlap the grid, while text always sits above the glow and stays readable.",
  },
  dos: [
    { zh: "洋红、紫、青三色霓虹", en: "Magenta, violet and cyan neon" },
    { zh: "发光必须双色（洋红加青）", en: "Glow must be dual: magenta plus cyan" },
    { zh: "透视网格必须持续移动", en: "The perspective grid never stops moving" },
    { zh: "粗无衬线加宽字距标签", en: "Heavy sans with wide-tracked labels" },
    { zh: "近黑底，不用亮白", en: "Near-black ground, never bright white" },
    { zh: "落日条带带水平切纹", en: "Sunset bands carry horizontal cuts" },
  ],
  donts: [
    { zh: "不要用明亮白色背景", en: "No bright white grounds" },
    { zh: "不要做现代简约风", en: "No modern minimalism" },
    { zh: "不要省略霓虹发光", en: "Never omit the neon glow" },
    { zh: "不要用柔和低饱和配色", en: "No soft desaturated palettes" },
    { zh: "不要只用单色发光", en: "Never glow in one color only" },
    { zh: "不要让网格背景完全静止", en: "Never let the grid sit still" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ffffff",
      background: "#0a0a0a",
      magenta: "#ff006e",
      violet: "#a020f0",
      cyan: "#00d4ff",
      orange: "#ff6b35",
    },
    prompts: [
      {
        zh: "做一个 Outrun 风格按钮：背景 #ff006e、白字、4px 圆角、14px/700 全大写 0.22em 字距、padding 12px 28px、静态 box-shadow 0 0 12px #ff006e。hover 时叠加双霓虹 0 0 20px #ff006e, 0 0 40px #00d4ff 并 translateY(-2px)；active 时 scale(0.97)、光晕收到 8px，transition 200ms。首屏加一个 perspective(320px) rotateX(62deg) 的网格地面（40px 间隔、1px #00d4ff 20%），用 background-position 每 2s linear 循环位移制造冲刺感。页面底色 #0a0a0a。",
        en: "Build an Outrun button: background #ff006e, white text, 4px radius, 14px/700 uppercase at 0.22em, 12px 28px padding, static box-shadow 0 0 12px #ff006e. Hover layers 0 0 20px #ff006e and 0 0 40px #00d4ff with translateY(-2px); active scales 0.97 and pulls the glow to 8px over 200ms. The hero adds a grid floor under perspective(320px) rotateX(62deg) at 40px spacing in 1px #00d4ff at 20%, with background-position looping every two seconds linearly for the rush. The page ground is #0a0a0a.",
      },
    ],
  },
  similar: [
    { name: "Vaporwave", why: { zh: "同源于 80 年代，但蒸汽波更慢更怀旧，Outrun 讲速度", en: "Both 1980s-derived, though vaporwave is slower and nostalgic while Outrun is about speed" } },
    { name: "Cyberpunk Neon", why: { zh: "同为霓虹，但赛博朋克是城市夜景，Outrun 是落日公路", en: "Both neon, though cyberpunk is a city at night while Outrun is a highway at sunset" } },
  ],
  completeness: "full",
};
