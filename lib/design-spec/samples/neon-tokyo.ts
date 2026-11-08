import type { DesignSpec } from "../types";

export const neonTokyoSpec: DesignSpec = {
  slug: "neon-tokyo",
  name: "霓虹东京",
  nameEn: "Neon Tokyo",
  cover: "/styles/neon-tokyo.svg",
  theme: "dark",
  northStar: {
    zh: "雨后的歌舞伎町：招牌一层压一层，光倒映在湿沥青上。",
    en: "Kabukicho after rain — signs stacked on signs, light mirrored in wet asphalt.",
  },
  summary: {
    zh: "霓虹东京与赛博朋克霓虹的区别在于「真实城市」而不是科幻：它模拟歌舞伎町的夜景，招牌一层压一层、多色霓虹边框交替、光晕多层叠加、湿沥青反光。底色是深夜蓝黑（#0a0a1a）到紫黑的渐变，主色霓虹粉（#ff1493），辅以青（#00f0ff）、橙（#ff6b00）与紫（#bc13fe），卡片用 80% 半透明加深模糊模拟玻璃反射，粗体无衬线配日文假名作装饰元素，标题可做粉到青的渐变文字。",
    en: "Neon Tokyo differs from cyberpunk neon by being a real city rather than science fiction: it models Kabukicho at night, with signage stacked over signage, multi-color neon borders alternating, glow layered, and reflections on wet asphalt. The ground runs from night blue-black (#0a0a1a) into violet black, the primary is neon pink (#ff1493) with cyan (#00f0ff), orange (#ff6b00) and violet (#bc13fe) supporting, cards use 80% translucency with a deep blur for glass reflection, bold sans pairs with Japanese kana as ornament, and headlines may take a pink-to-cyan gradient.",
  },
  colors: [
    {
      name: "霓虹粉",
      nameEn: "Neon Pink",
      value: "#ff1493",
      group: "brand",
      role: {
        zh: "主色：招牌、主按钮与最主要的发光。",
        en: "The primary on signage, buttons and the main glow.",
      },
      token: "--color-neon-pink",
    },
    {
      name: "深夜蓝黑",
      nameEn: "Night Blue Black",
      value: "#0a0a1a",
      group: "surface",
      role: {
        zh: "页面底。像雨后没有星星的夜空。",
        en: "The page ground — a night sky after rain with no stars.",
      },
      token: "--color-night-blue",
    },
    {
      name: "霓虹青",
      nameEn: "Neon Cyan",
      value: "#00f0ff",
      group: "accent",
      role: {
        zh: "第二霓虹色：数据、链接与冷侧光。",
        en: "The second neon on data, links and cool light.",
      },
      token: "--color-neon-cyan",
    },
    {
      name: "霓虹橙",
      nameEn: "Neon Orange",
      value: "#ff6b00",
      group: "accent",
      role: {
        zh: "第三霓虹色，模拟暖色招牌与灯笼。",
        en: "The third neon, imitating warm signage and lanterns.",
      },
      token: "--color-neon-orange",
    },
    {
      name: "霓虹紫",
      nameEn: "Neon Violet",
      value: "#bc13fe",
      group: "accent",
      role: {
        zh: "第四霓虹色，用于让招牌层失去统一色。",
        en: "The fourth neon, breaking the signage into mixed color.",
      },
      token: "--color-neon-violet",
    },
    {
      name: "夜蓝",
      nameEn: "Pale Blue",
      value: "#97b6ff",
      group: "accent",
      role: {
        zh: "文字的反光与次级高亮，最柔的一支。",
        en: "Reflected text and secondary highlights — the softest tone.",
      },
      token: "--color-pale-blue",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Hiragino Sans', 'Yu Gothic', system-ui, sans-serif",
      weights: [700, 900],
      sizes: [12, 15, 20, 28, 38, 54],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.6 },
      tracking: { display: "-0.02em", label: "0.16em" },
      role: {
        zh: "粗无衬线，标题 900 字重压紧字距。可与日文假名混排，假名作装饰用。",
        en: "A heavy sans: headings at 900 on tight tracking. Japanese kana may interleave as ornament.",
      },
      token: "--font-display",
    },
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, monospace",
      weights: [400],
      sizes: [11, 13],
      lineHeight: { display: 1.5, heading: 1.5, body: 1.6 },
      tracking: { display: "0.1em", label: "0.16em" },
      role: {
        zh: "数据与坐标，赛博那一侧的字体。",
        en: "Data and coordinates — the cyber side's face.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", font: "Inter", weight: 900, size: 54, lineHeight: 1.1, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", font: "Inter", weight: 900, size: 38, lineHeight: 1.15, tracking: "-0.02em", token: "--text-heading" },
    { role: "subheading", font: "Inter", weight: 700, size: 28, lineHeight: 1.25, token: "--text-subheading" },
    { role: "body-lg", font: "Inter", weight: 700, size: 15, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", font: "Inter", weight: 700, size: 13, lineHeight: 1.6, token: "--text-body" },
    { role: "label", font: "JetBrains Mono", weight: 400, size: 11, lineHeight: 1.5, tracking: "0.16em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "compact",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1240,
    sectionGap: 64,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "8px" },
    { element: "buttons", value: "4px" },
    { element: "signs", value: "2px" },
  ],
  surfaces: [
    { level: 0, name: "Night Gradient", value: "linear-gradient(#0a0a1a, #12041e)", purpose: "页面底" },
    { level: 1, name: "Glass Sign", value: "rgba(10,10,26,0.80)", purpose: "卡片与招牌" },
    { level: 2, name: "Wet Reflection", value: "rgba(255,20,147,0.10)", purpose: "反光层" },
  ],
  elevation: [
    { name: "Sign glow", value: "0 0 12px rgba(255,20,147,0.60), 0 0 28px rgba(255,20,147,0.30)" },
    { name: "Cyan glow", value: "0 0 12px rgba(0,240,255,0.60), 0 0 28px rgba(0,240,255,0.30)" },
    { name: "Mixed glow", value: "0 0 16px rgba(255,20,147,0.50), 0 0 32px rgba(0,240,255,0.30), 0 0 48px rgba(188,19,254,0.20)" },
  ],
  components: [
    {
      name: "Sign Card",
      role: { zh: "招牌卡片（核心组件）", en: "The sign card — the core component" },
      construction: {
        zh: "深夜蓝黑 80% 填充、8px 模糊、8px 圆角、1px 霓虹粉 50% 描边、内边距 24px，多层光晕（粉 12px、粉 28px）。标题 38px/900 霓虹粉并带 0 0 10px 粉 60% 的文字发光；正文 13px 白 80%。hover 时描边换青、光晕转混色（粉加青加紫）。",
        en: "80% night blue fill with an 8px blur, 8px radius, a 1px neon pink border at 50%, 24px padding, and layered glow (pink at 12px and 28px). The title runs 38px/900 in neon pink under a 0 0 10px text glow at 60%, with body at 13px in 80% white. Hover swaps the border to cyan and the glow to the mixed triple.",
      },
      states: "hover: cyan border, mixed glow",
    },
    {
      name: "Gradient Headline",
      role: { zh: "渐变标题", en: "The gradient headline" },
      construction: {
        zh: "背景为粉到青的横向渐变配 background-clip: text 与透明字色，再加 0 0 10px 粉 40% 的文字发光（用 filter: drop-shadow 而不是 text-shadow，因为文字已透明）。只用于首屏标题，单页最多一处。",
        en: "A horizontal pink-to-cyan gradient with background-clip text and a transparent fill, carrying a 0 0 10px glow at 40% pink through filter drop-shadow rather than text-shadow, since the text is transparent. Reserved for the hero headline, once per page.",
      },
    },
    {
      name: "Sign Stack",
      role: { zh: "招牌叠层", en: "The sign stack" },
      construction: {
        zh: "3 到 5 块窄长的招牌（各 120 到 200px 宽、40 到 64px 高）垂直叠放，各自不同底色（粉、青、橙、紫之一）、2px 圆角、不同光晕，块与块之间负边距 -4px 让它们挤在一起。每块里放 12px 全大写的短字。它模拟歌舞伎町的招牌墙。",
        en: "Three to five narrow signs (120 to 200px wide, 40 to 64px tall) stacked vertically, each with a different ground (pink, cyan, orange or violet), 2px radius, its own glow, and -4px margins pulling them flush. Each carries a short 12px uppercase word. It reproduces the signage wall of Kabukicho.",
      },
    },
    {
      name: "Wet Reflection",
      role: { zh: "湿地反光", en: "The wet reflection" },
      construction: {
        zh: "在区块底部放一条 60 到 120px 高的区域，把上方的霓虹色以 10% 到 20% 不透明度垂直翻转模糊地重复一次（用 transform: scaleY(-1) 加 blur 8px 与线性渐变遮罩淡出）。它让页面像刚下过雨。",
        en: "A 60 to 120px band at a section's base repeats the neon above it, flipped vertically at 10% to 20% opacity with an 8px blur and a gradient mask fading out. It makes the page feel recently rained on.",
      },
    },
    {
      name: "Neon Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "透明底、1px 霓虹粉 60% 描边、4px 圆角、11px 等宽全大写 0.16em、padding 10px 24px，光晕 0 0 12px 粉 60%。hover 时填充粉 12%、描边升到 100%、光晕扩到 28px；按下时位移 1px 且光晕收到 6px。过渡 120ms linear。",
        en: "Transparent fill, a 1px neon pink border at 60%, 4px radius, 11px monospace uppercase at 0.16em, 10px 24px padding, glow 0 0 12px at 60% pink. Hover fills 12% pink, takes the border to full and widens the glow to 28px; press translates 1px and pulls the glow to 6px. 120ms linear.",
      },
      sizes: "padding 10px 24px; label 11px",
      states: "hover: fill 12%, glow 28px; active: translate 1px",
    },
  ],
  imagery: {
    zh: "城市夜景摄影：招牌、巷道、雨后的路面、自动贩卖机、霓虹倒影。必须高对比、多色光源。允许把照片压成粉青双色调。不使用白天摄影、自然风景与柔和插画。",
    en: "Urban night photography: signage, alleys, wet pavement, vending machines, neon reflections. High contrast with multiple colored light sources, and a photo may be graded pink and cyan. No daylight photography, natural landscapes or soft illustration.",
  },
  layout: {
    zh: "上限 1240px、容器内边距 16px，区块间距 64px。允许招牌叠层与元素重叠，圆角保持小值（2 到 8px）。整页保持暗场，霓虹只在需要被看到的地方亮。",
    en: "Capped at 1240px with 16px padding, sections 64px apart. Signage stacks and overlapping are welcome, with radii kept small at 2 to 8px. The page stays dark, and neon lights only where attention is wanted.",
  },
  dos: [
    { zh: "深夜蓝黑到紫黑的渐变底", en: "Gradient ground from night blue into violet black" },
    { zh: "多色霓虹边框交替", en: "Multi-color neon borders alternate" },
    { zh: "光晕多层叠加", en: "Glow layers stack" },
    { zh: "招牌叠层模拟招牌墙", en: "Sign stacks imitate a signage wall" },
    { zh: "卡片 80% 半透明加深模糊", en: "Cards are 80% translucent with a deep blur" },
    { zh: "湿沥青反光", en: "Wet asphalt reflects the neon" },
  ],
  donts: [
    { zh: "不要用白天摄影与自然风景", en: "No daylight photography or landscapes" },
    { zh: "不要用大圆角", en: "No large radii" },
    { zh: "不要用柔和插画", en: "No soft illustration" },
    { zh: "不要只用单色霓虹", en: "Never settle for one neon color" },
    { zh: "不要让光晕盖过文字", en: "Never let glow cover the text" },
    { zh: "不要做科幻感的界面元素", en: "No sci-fi interface elements" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ffffff",
      background: "#0a0a1a",
      pink: "#ff1493",
      cyan: "#00f0ff",
      orange: "#ff6b00",
      violet: "#bc13fe",
    },
    prompts: [
      {
        zh: "做一个霓虹东京招牌卡片：背景 rgba(10,10,26,0.8) 加 8px 模糊、8px 圆角、1px rgba(255,20,147,0.5) 描边、内边距 24px、多层光晕 0 0 12px rgba(255,20,147,0.6), 0 0 28px rgba(255,20,147,0.3)。标题 38px/900、色 #ff1493、text-shadow 0 0 10px rgba(255,20,147,0.6)；正文 13px、色 rgba(255,255,255,0.8)。旁边叠 4 块窄长招牌（各 160×48px、2px 圆角、负边距 -4px、分别填 #ff1493/#00f0ff/#ff6b00/#bc13fe、各带光晕）。区块底部加 80px 高的湿地反光层（上方内容 scaleY(-1) + blur 8px + 15% 不透明度 + 渐变遮罩）。页面底色 linear-gradient(#0a0a1a, #12041e)。",
        en: "Build a neon Tokyo sign card: background rgba(10,10,26,0.8) with an 8px blur, 8px radius, a 1px rgba(255,20,147,0.5) border, 24px padding and layered glow 0 0 12px rgba(255,20,147,0.6) plus 0 0 28px rgba(255,20,147,0.3). The title runs 38px/900 in #ff1493 under text-shadow 0 0 10px rgba(255,20,147,0.6), body at 13px in rgba(255,255,255,0.8). Four narrow signs stack beside it (160×48px each, 2px radius, -4px margins, filled #ff1493, #00f0ff, #ff6b00 and #bc13fe with their own glows). An 80px wet reflection band sits at the section's base — the content above flipped with scaleY(-1), blurred 8px, at 15% opacity behind a gradient mask. The page ground is linear-gradient(#0a0a1a, #12041e).",
      },
    ],
  },
  similar: [
    { name: "Cyberpunk Neon", why: { zh: "同为霓虹，但赛博朋克是科幻界面，霓虹东京是真实城市夜景", en: "Both neon, though cyberpunk is sci-fi interface while this is an authentic city night" } },
    { name: "Neon Samurai", why: { zh: "同为东京霓虹，但武士有斩击线与鸟居，东京是招牌与倒影", en: "Both Tokyo neon, though samurai brings slash lines and torii while this is signage and reflection" } },
  ],
  completeness: "full",
};
