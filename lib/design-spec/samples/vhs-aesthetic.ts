import type { DesignSpec } from "../types";

export const vhsAestheticSpec: DesignSpec = {
  slug: "vhs-aesthetic",
  name: "VHS 美学",
  nameEn: "VHS Aesthetic",
  cover: "/styles/vhs-aesthetic.svg",
  theme: "dark",
  northStar: {
    zh: "一盘看了二十年的录像带：色偏、噪点、时间码在闪。",
    en: "A tape played for twenty years — color drift, noise, a timecode blinking.",
  },
  summary: {
    zh: "VHS 美学模拟 80 到 90 年代录像带的画面缺陷：文字用洋红与青的双向偏移做 RGB 分离，全站等宽字体，深黑或深紫底（#000000 或 #1a0a2e），标签全大写加宽字距，画面叠扫描线与噪点，右下角常驻一个闪烁的时间码。它与故障艺术的区别在于「这不是故障而是介质」——VHS 的失真是一贯的、温柔的、整体的，而不是突发撕裂。它禁止干净锐利的排版，因为那正是 VHS 没有的东西。",
    en: "VHS Aesthetic reproduces the flaws of an 80s or 90s tape: text split by magenta and cyan offsets, monospace throughout, a black or deep violet ground (#000000 or #1a0a2e), uppercase labels on wide tracking, scanlines and noise over the frame, and a blinking timecode in the corner. What separates it from glitch art is that this is the medium rather than a fault — the distortion is constant, gentle and total, not a sudden tear. Clean, crisp typography is refused outright, because that is precisely what VHS never had.",
  },
  colors: [
    {
      name: "洋红",
      nameEn: "Magenta",
      value: "#ff00ff",
      group: "brand",
      role: {
        zh: "RGB 分离的暖侧，也是主文字色。",
        en: "The warm side of the split and the primary text color.",
      },
      token: "--color-magenta",
    },
    {
      name: "黑",
      nameEn: "Black",
      value: "#000000",
      group: "surface",
      role: {
        zh: "页面底。录像带的黑场。",
        en: "The page ground — tape black.",
      },
      token: "--color-black",
    },
    {
      name: "青",
      nameEn: "Cyan",
      value: "#00ffff",
      group: "accent",
      role: {
        zh: "RGB 分离的冷侧。与洋红永远成对。",
        en: "The cool side of the split, always paired with magenta.",
      },
      token: "--color-cyan",
    },
    {
      name: "黄",
      nameEn: "Yellow",
      value: "#ffff00",
      group: "accent",
      role: {
        zh: "时间码、录制标记与高亮。",
        en: "Timecode, recording marks and highlights.",
      },
      token: "--color-yellow",
    },
    {
      name: "绿",
      nameEn: "Green",
      value: "#00ff00",
      group: "accent",
      role: {
        zh: "「PLAY」指示与状态，出现频率较低。",
        en: "The PLAY indicator and status, used less often.",
      },
      token: "--color-green",
    },
    {
      name: "深紫",
      nameEn: "Deep Violet",
      value: "#1a0a2e",
      group: "surface",
      role: {
        zh: "次级底与渐变的一端，让黑不那么死。",
        en: "Secondary grounds and one end of the gradient, keeping the black from going dead.",
      },
      token: "--color-deep-violet",
    },
  ],
  fonts: [
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400, 700],
      sizes: [11, 13, 16, 22, 32, 44],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.55 },
      tracking: { display: "0.06em", label: "0.18em" },
      role: {
        zh: "全站等宽。标签全大写加 0.18em 字距，像录像机的屏幕字符。",
        en: "Monospace throughout: labels uppercase at 0.18em, like a VCR's on-screen display.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 44, lineHeight: 1.15, tracking: "0.06em", token: "--text-display" },
    { role: "heading", weight: 700, size: 32, lineHeight: 1.2, tracking: "0.06em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 22, lineHeight: 1.3, tracking: "0.06em", token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 13, lineHeight: 1.55, token: "--text-body" },
    { role: "label", weight: 400, size: 11, lineHeight: 1.45, tracking: "0.18em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1160,
    sectionGap: 80,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "4px" },
    { element: "buttons", value: "2px" },
    { element: "inputs", value: "2px" },
  ],
  surfaces: [
    { level: 0, name: "Black", value: "#000000", purpose: "页面底" },
    { level: 1, name: "Deep Violet", value: "#1a0a2e", purpose: "面板" },
    { level: 2, name: "Noise Overlay", value: "grain + scanlines", purpose: "噪点层" },
  ],
  elevation: [
    { name: "RGB split", value: "2px 0 #ff00ff, -2px 0 #00ffff" },
    { name: "Text glow", value: "0 0 8px rgba(255,0,255,0.55)" },
    { name: "Never", value: "no standard drop shadows" },
  ],
  components: [
    {
      name: "Split Title",
      role: { zh: "RGB 分离标题（核心）", en: "The split title — the core" },
      construction: {
        zh: "等宽 700 全大写，主色洋红，叠两层文本副本：一层偏移 2px 用青、一层偏移 -2px 用洋红，混合模式 screen。静置时偏移 2px，每 8 秒触发一次 200ms 的步进抖动（steps(3)）让偏移跳到 4px 再回。正文绝不做分离。",
        en: "Monospace 700 uppercase in magenta with two copies overlaid — one offset 2px in cyan, one -2px in magenta, blended in screen. The offset sits at 2px, and every eight seconds a 200ms steps(3) jitter pushes it to 4px and back. Body copy never takes the split.",
      },
      sizes: "jitter 200ms steps(3), every 8s",
    },
    {
      name: "Tape Panel",
      role: { zh: "录像面板", en: "The tape panel" },
      construction: {
        zh: "深紫填充、4px 圆角、1px 洋红 25% 描边、内边距 24px。标题 22px/700 带分离，正文 13px 白 80%。左上角放「● REC」指示（绿点带 1s 闪烁），右下角放时间码（黄，如 00:12:47）。hover 时描边升到 50% 并加一条 2px 高的白 30% 横线扫过（180ms steps(3)）。",
        en: "Deep violet fill, 4px radius, a 1px magenta border at 25%, 24px padding. The title runs 22px/700 with the split, body at 13px in 80% white. A ● REC indicator (a green dot blinking at 1Hz) sits top-left with a yellow timecode like 00:12:47 bottom-right. Hover raises the border to 50% and sweeps a 2px white bar at 30% across in 180ms on steps(3).",
      },
      states: "hover: border 50%, tracking bar sweep",
    },
    {
      name: "Scanline Bed",
      role: { zh: "扫描线与噪点底", en: "The scanline and noise bed" },
      construction: {
        zh: "固定覆盖两层：一层 repeating-linear-gradient（每 3px 一条 1px 黑 40% 横线），一层噪点（base64 颗粒或 feTurbulence，不透明度 6%）。再叠一层极缓的垂直滚动（每 12 秒偏移 3px，linear）。pointer-events: none。",
        en: "Two fixed layers: a repeating gradient of 1px black at 40% every 3px, and grain (base64 or feTurbulence) at 6%. A very slow vertical drift of 3px every twelve seconds sits on top. All of it is pointer-events none.",
      },
    },
    {
      name: "Play Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "透明底、1px 洋红 40% 描边、2px 圆角、11px 等宽全大写 0.18em、padding 10px 24px，文字洋红带 0 0 8px 微光。hover 时描边升到 100%、文字转黄；按下时整体横向位移 2px 并做一次 60ms 的色偏。过渡 80ms linear。",
        en: "Transparent fill, a 1px magenta border at 40%, 2px radius, 11px monospace uppercase at 0.18em, 10px 24px padding, with magenta text under a 0 0 8px shimmer. Hover takes the border to full and the text to yellow; press shifts the element 2px and fires a 60ms color drift. 80ms linear.",
      },
      sizes: "padding 10px 24px; label 11px",
      states: "hover: yellow text; active: shift 2px, color drift",
    },
    {
      name: "OSD Label",
      role: { zh: "屏幕字符标签", en: "The on-screen display label" },
      construction: {
        zh: "11px 等宽全大写 0.18em，色黄或绿，可带 1px 黑描边保证在亮画面上可读。格式固定为「SP · 00:12:47」或「PLAY」。它是录像机叠加在画面上的信息，常驻角落。",
        en: "11px monospace uppercase at 0.18em in yellow or green, optionally carrying a 1px black stroke so it stays readable over bright footage. The format is fixed as SP · 00:12:47 or PLAY. It is the VCR's overlay, resident in a corner.",
      },
    },
  ],
  imagery: {
    zh: "录像带画面：家庭录像、老广告、监控、低分辨率素材。必须带扫描线、色偏与噪点。允许把现代照片做 VHS 化处理（色度位移、降采样、加噪）。不使用高清干净摄影与现代插画。",
    en: "Tape footage: home video, old adverts, surveillance, low-resolution material, all carrying scanlines, color drift and noise. A modern photo may be VHS-treated with chroma shift, downsampling and grain. No high-resolution clean photography or modern illustration.",
  },
  layout: {
    zh: "上限 1160px、容器内边距 16px，区块间距 80px。允许画面轻微偏移与整体抖动（每 8 秒 2 到 4px）。小圆角（2 到 4px）贯穿全站。所有文字都在 OSD 层之上保持可读。",
    en: "Capped at 1160px with 16px padding, sections 80px apart. The frame may shift slightly and jitter 2 to 4px every eight seconds. Small radii of 2 to 4px run throughout, and all text stays readable above the OSD layer.",
  },
  dos: [
    { zh: "文字用洋红青双向偏移", en: "Text splits between magenta and cyan" },
    { zh: "全站等宽字体", en: "Monospace throughout" },
    { zh: "深黑或深紫底", en: "Black or deep violet ground" },
    { zh: "叠扫描线与噪点", en: "Layer scanlines and grain" },
    { zh: "常驻时间码与 REC 指示", en: "A timecode and REC indicator persist" },
    { zh: "抖动幅度 2 到 4px、每 8 秒一次", en: "Jitter 2 to 4px, once every eight seconds" },
  ],
  donts: [
    { zh: "不要用干净锐利的排版", en: "No clean crisp typography" },
    { zh: "不要在正文做 RGB 分离", en: "Never split body copy" },
    { zh: "不要用高清干净摄影", en: "No high-resolution clean photography" },
    { zh: "不要用大圆角", en: "No large radii" },
    { zh: "不要用标准投影", en: "No standard drop shadows" },
    { zh: "不要让噪点压过文字", en: "Never let grain overpower the text" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ff00ff",
      background: "#000000",
      cyan: "#00ffff",
      yellow: "#ffff00",
      green: "#00ff00",
      violet: "#1a0a2e",
    },
    prompts: [
      {
        zh: "做一个 VHS 美学面板：深紫 #1a0a2e 填充、4px 圆角、1px rgba(255,0,255,0.25) 描边、内边距 24px。标题 22px/700 等宽全大写，叠两层文本副本做 RGB 分离（一层 text-shadow 2px 0 #00ffff、一层 -2px 0 #ff00ff），每 8 秒抖一次 200ms。左上角「● REC」绿点（#00ff00、1s 闪烁），右下角黄色时间码「00:12:47」（11px 等宽 0.18em）。全页覆 repeating-linear-gradient（每 3px 一条 1px 黑 40%）加 6% 噪点。按钮透明底、1px 洋红描边、11px 等宽全大写 0.18em，hover 时文字转黄。页面底色 #000000。",
        en: "Build a VHS panel: deep violet #1a0a2e fill, 4px radius, a 1px rgba(255,0,255,0.25) border, 24px padding. The title runs 22px/700 monospace uppercase under two split copies (text-shadow 2px 0 #00ffff and -2px 0 #ff00ff), jittering 200ms every eight seconds. A green ● REC dot blinks at 1Hz top-left with a yellow 00:12:47 timecode in 11px monospace at 0.18em bottom-right. The page carries a repeating gradient of 1px black at 40% every 3px plus 6% grain. The button is transparent with a 1px magenta border, 11px monospace uppercase at 0.18em, turning its text yellow on hover. The page ground is #000000.",
      },
    ],
  },
  similar: [
    { name: "Broadcast Glitch", why: { zh: "同为电视信号，但故障广播是信号在断，VHS 是磁带在老化", en: "Both broadcast-derived, though broadcast glitch is a failing signal while VHS is an aging tape" } },
    { name: "Glitch Art", why: { zh: "同为故障感，但故障艺术是突发撕裂，VHS 是一贯的介质失真", en: "Both glitchy, though glitch art is sudden rupture while VHS is constant medium distortion" } },
  ],
  completeness: "full",
};
