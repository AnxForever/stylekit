import type { DesignSpec } from "../types";

export const cyberChineseSpec: DesignSpec = {
  slug: "cyber-chinese",
  name: "赛博中华风",
  nameEn: "Cyber Chinese",
  cover: "/styles/cyber-chinese.svg",
  theme: "dark",
  northStar: {
    zh: "朱红与金压在霓虹青紫上：灯笼挂在赛博街道。",
    en: "Vermilion and gold over neon cyan and violet — lanterns hanging over a cyber street.",
  },
  summary: {
    zh: "赛博中华风是两套语言的碰撞：朱红（#d4553a）与金黄（#c9a227）来自传统，霓虹蓝（#00d4ff）与霓虹紫（#a020f0）来自赛博，底是近黑（#0a0a0a）。造型一律直角无圆角，让它显得锐利；霓虹发光绝不可省略，但发光必须与朱红金箔共存而不是取代它们。交互反馈带东方赛博的特质——hover 时一道短促的扫描光带或云纹流光掠过，绝不用弹簧回弹、俏皮抖动或大幅缩放，控件过渡不超过 400ms。",
    en: "Cyber Chinese is a collision of two languages: vermilion (#d4553a) and gold (#c9a227) from tradition against neon cyan (#00d4ff) and violet (#a020f0) from cyber, on a near-black ground (#0a0a0a). Forms stay sharply right-angled throughout. Neon glow may never be omitted, yet it must coexist with the vermilion and gold rather than replace them. Interaction carries an Eastern-cyber signature — a brief scan band or cloud-motif shimmer sweeps past on hover — and never a spring, a playful wobble or a large scale change, with control transitions capped at 400ms.",
  },
  colors: [
    {
      name: "朱红",
      nameEn: "Vermilion",
      value: "#d4553a",
      group: "brand",
      role: {
        zh: "主色：印章、主按钮与关键强调。传统那一侧的重心。",
        en: "The primary on seals, buttons and key emphasis — the weight of the traditional side.",
      },
      token: "--color-vermilion",
    },
    {
      name: "金黄",
      nameEn: "Gold",
      value: "#c9a227",
      group: "brand",
      role: {
        zh: "第二主色：金箔、描边与贵重标记。",
        en: "The second primary on leaf, strokes and precious marks.",
      },
      token: "--color-gold",
    },
    {
      name: "近黑",
      nameEn: "Near Black",
      value: "#0a0a0a",
      group: "surface",
      role: {
        zh: "页面底。深到让霓虹与朱红同时发光。",
        en: "The page ground — dark enough to let neon and vermilion glow together.",
      },
      token: "--color-near-black",
    },
    {
      name: "霓虹青",
      nameEn: "Neon Cyan",
      value: "#00d4ff",
      group: "accent",
      role: {
        zh: "赛博那一侧的主色：扫描光带、数据与链接。",
        en: "The cyber side's primary on scan bands, data and links.",
      },
      token: "--color-neon-cyan",
    },
    {
      name: "霓虹紫",
      nameEn: "Neon Violet",
      value: "#a020f0",
      group: "accent",
      role: {
        zh: "第二霓虹色，用于层叠光晕与云纹流光。",
        en: "The second neon, on layered glow and cloud shimmer.",
      },
      token: "--color-neon-violet",
    },
    {
      name: "淡紫",
      nameEn: "Pale Violet",
      value: "#9f9aff",
      group: "accent",
      role: {
        zh: "高光与文字反光，最亮的一站。",
        en: "Highlights and reflected text — the brightest stop.",
      },
      token: "--color-pale-violet",
    },
  ],
  fonts: [
    {
      family: "Noto Serif SC",
      substitute: "'Songti SC', Georgia, serif",
      weights: [600, 700],
      sizes: [16, 20, 26, 34, 46],
      lineHeight: { display: 1.2, heading: 1.35, body: 1.7 },
      tracking: { display: "0.04em", label: "0.24em" },
      role: {
        zh: "标题用粗衬线加宽字距，像匾额；正文同族更细，保证长读。",
        en: "Headings in heavy serif on wide tracking like a plaque; body in the same family lighter for long reading.",
      },
      token: "--font-serif",
    },
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400, 700],
      sizes: [11, 13, 15],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.6 },
      tracking: { display: "0.06em", label: "0.2em" },
      role: {
        zh: "数据、坐标与状态码，是赛博那一侧的字体。",
        en: "Data, coordinates and status codes — the cyber side's face.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", font: "Noto Serif SC", weight: 700, size: 46, lineHeight: 1.2, tracking: "0.04em", token: "--text-display" },
    { role: "heading", font: "Noto Serif SC", weight: 700, size: 34, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", font: "Noto Serif SC", weight: 600, size: 26, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", font: "Noto Serif SC", weight: 600, size: 20, lineHeight: 1.65, token: "--text-body-lg" },
    { role: "body", font: "Noto Serif SC", weight: 600, size: 16, lineHeight: 1.7, token: "--text-body" },
    { role: "label", font: "JetBrains Mono", weight: 400, size: 13, lineHeight: 1.4, tracking: "0.2em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "comfortable",
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
    maxWidth: 1280,
    sectionGap: 64,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Near Black", value: "#0a0a0a", purpose: "页面底" },
    { level: 1, name: "Panel", value: "rgba(212,85,58,0.06)", purpose: "面板（朱红调半透明）" },
    { level: 2, name: "Gold Frame", value: "rgba(201,162,39,0.12)", purpose: "金框区块" },
  ],
  elevation: [
    { name: "Dual neon", value: "0 0 16px rgba(0,212,255,0.45), 0 0 40px rgba(160,32,240,0.30)" },
    { name: "Gold rim", value: "inset 0 0 0 1px rgba(201,162,39,0.60)" },
    { name: "Amplified", value: "0 0 24px rgba(0,212,255,0.65), 0 0 64px rgba(160,32,240,0.45)" },
  ],
  components: [
    {
      name: "Lattice Panel",
      role: { zh: "格窗面板（核心组件）", en: "The lattice panel — the core component" },
      construction: {
        zh: "朱红 6% 填充、零圆角、1px 金黄 45% 描边、内边距 24px，双色霓虹外发光（青 16px 加紫 40px）。四角各放一个 12px 的金黄直角角标（像窗棂收头）。hover 时一道 40px 宽、青色 25% 的斜向扫描光带从左掠到右（400ms linear），同时发光 amplify。",
        en: "6% vermilion fill, zero radius, a 1px gold border at 45%, 24px padding, with dual neon glow (cyan at 16px, violet at 40px). A 12px gold corner bracket marks each corner like the end of a lattice mullion. Hover sweeps a 40px band of 25% cyan diagonally from left to right over 400ms linear while the glow amplifies.",
      },
      states: "hover: scan band sweep, glow amplified",
    },
    {
      name: "Vermilion Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "朱红填充、近黑文字、零圆角、1px 金黄 70% 描边，14px/700、字距 0.2em、padding 12px 28px，外发光 0 0 20px 朱红 40%。hover 时描边升到 100% 并加青色扫描光带，发光转青；按下时填充压暗并缩到 0.98。过渡 240ms。",
        en: "Vermilion fill, near-black text, zero radius, a 1px gold border at 70%, 14px/700 at 0.2em, 12px 28px padding, with a 0 0 20px glow at 40% vermilion. Hover takes the border to full, adds a cyan scan band and turns the glow cyan; press darkens the fill and scales 0.98. 240ms.",
      },
      sizes: "padding 12px 28px; label 14px",
      states: "hover: cyan scan, gold border full; active: scale 0.98",
    },
    {
      name: "Cloud Motif",
      role: { zh: "云纹流光装饰", en: "The cloud-motif shimmer" },
      construction: {
        zh: "用重复的回纹或云纹 path（stroke 1px、金黄 40%），沿区块边缘流动：用 background-position 或 clip-path 上的遮罩从左到右扫过，周期 3 秒、linear。仅用于装饰，单屏不超过两处。",
        en: "Repeating cloud or fret paths (1px stroke, 40% gold) run along a section edge, animated by shifting background-position or a clip-path mask from left to right on a three-second linear cycle. Decorative only, at most twice per screen.",
      },
    },
    {
      name: "Seal Stamp",
      role: { zh: "印章标记", en: "The seal mark" },
      construction: {
        zh: "32px 见方朱红方块、零圆角、内嵌 20px 近黑衬线单字，外带 0 0 12px 朱红 50% 的发光。边缘做 1px 残缺（mask 切角）。用于标记章节与「已核」。",
        en: "A 32px square in vermilion with zero radius, holding a 20px near-black serif character, glowing 0 0 12px at 50%. A 1px chipped edge comes from a mask. It marks chapters and verified states.",
      },
    },
    {
      name: "Neon Data Row",
      role: { zh: "霓虹数据行", en: "The neon data row" },
      construction: {
        zh: "等宽 13px、字距 0.06em，左侧标签用金黄、右侧数值用霓虹青并带文字发光 0 0 8px 青 50%。行高 32px，行间 1px 金黄 15% 分隔。数值必须以静态文本存在。",
        en: "13px monospace at 0.06em, with gold labels on the left and cyan figures on the right under a 0 0 8px text glow at 50%. Rows are 32px tall, divided by 1px gold rules at 15%. Figures must exist as static text.",
      },
    },
  ],
  imagery: {
    zh: "东方赛博插画：龙纹与电路混合、霓虹灯笼、飞檐上的广告屏、印章与全息投影。允许把传统纹样（云纹、回纹）叠加在发光层下。不使用明亮白底、柔和插画与纯西式装饰。",
    en: "Eastern cyber illustration: dragons fused with circuitry, neon lanterns, advertising screens on temple eaves, seals and holograms. Traditional patterns such as cloud and fret motifs may sit beneath glowing layers. No bright white grounds, soft illustration or purely Western ornament.",
  },
  layout: {
    zh: "上限 1280px、容器内边距 16px，面板间距 12px。允许面板以 1px 金线拼接成格窗式大屏。零圆角贯穿全站，控件过渡不超过 400ms。",
    en: "Capped at 1280px with 16px padding and 12px between panels. Panels may join on 1px gold lines into a lattice screen. Zero radius runs throughout, and control transitions never exceed 400ms.",
  },
  dos: [
    { zh: "朱红与金黄配霓虹青紫", en: "Pair vermilion and gold with neon cyan and violet" },
    { zh: "直角无圆角，造型锐利", en: "Sharp right angles, no radius" },
    { zh: "霓虹发光不可省略", en: "Neon glow is never omitted" },
    { zh: "hover 用扫描光带或云纹流光", en: "Hover uses a scan band or cloud shimmer" },
    { zh: "控件过渡不超过 400ms", en: "Control transitions stay under 400ms" },
    { zh: "数值用等宽并带文字发光", en: "Figures run monospace with a text glow" },
  ],
  donts: [
    { zh: "不要用明亮白色背景", en: "No bright white grounds" },
    { zh: "不要用柔和圆润造型", en: "No soft rounded forms" },
    { zh: "不要省略霓虹发光", en: "Never omit the neon glow" },
    { zh: "不要用纯西式装饰元素", en: "No purely Western ornament" },
    { zh: "不要用弹簧回弹或俏皮抖动", en: "No spring rebound or playful wobble" },
    { zh: "不要用超过 400ms 的控件过渡", en: "No control transition beyond 400ms" },
  ],
  promptGuide: {
    quickColors: {
      text: "#f5f0e1",
      background: "#0a0a0a",
      vermilion: "#d4553a",
      gold: "#c9a227",
      cyan: "#00d4ff",
      violet: "#a020f0",
    },
    prompts: [
      {
        zh: "做一个赛博中华风面板：背景 rgba(212,85,58,0.06)、零圆角、1px rgba(201,162,39,0.45) 描边、内边距 24px、box-shadow 0 0 16px rgba(0,212,255,0.45), 0 0 40px rgba(160,32,240,0.3)。标题 34px 粗衬线、字距 0.04em、色 #f5f0e1；标签用 13px 等宽金黄 0.2em。hover 时一道 40px 宽、rgba(0,212,255,0.25) 的斜向光带从左掠到右（400ms linear），发光 amplify 到 24px/64px。主按钮朱红填充、近黑文字、零圆角、1px 金黄描边。页面底色 #0a0a0a。",
        en: "Build a cyber Chinese panel: background rgba(212,85,58,0.06), zero radius, a 1px rgba(201,162,39,0.45) border, 24px padding, box-shadow 0 0 16px rgba(0,212,255,0.45) and 0 0 40px rgba(160,32,240,0.3). The heading runs 34px heavy serif at 0.04em in #f5f0e1, with 13px monospace gold labels at 0.2em. Hover sweeps a 40px band of rgba(0,212,255,0.25) diagonally left to right over 400ms linear while the glow amplifies to 24px and 64px. The primary button fills vermilion with near-black text, zero radius and a 1px gold border. The page ground is #0a0a0a.",
      },
    ],
  },
  similar: [
    { name: "Ukiyo-e Digital", why: { zh: "同属东方传统，但浮世绘是木版套色，赛博中华是霓虹叠加", en: "Both Eastern tradition, though ukiyo-e is woodblock color while cyber Chinese layers neon on top" } },
    { name: "Cyberpunk Neon", why: { zh: "同为霓虹，但赛博朋克是街头，赛博中华有格窗与印章", en: "Both neon, though cyberpunk is street signage while this carries lattice and seals" } },
  ],
  completeness: "full",
};
