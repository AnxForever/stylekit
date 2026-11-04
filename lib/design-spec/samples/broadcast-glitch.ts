import type { DesignSpec } from "../types";

export const broadcastGlitchSpec: DesignSpec = {
  slug: "broadcast-glitch",
  name: "故障广播",
  nameEn: "Broadcast Glitch",
  cover: "/styles/broadcast-glitch.svg",
  theme: "dark",
  northStar: {
    zh: "信号正在断：扫描线在爬，RGB 在抖，色条偶尔扫过。",
    en: "The signal is failing — scanlines crawl, RGB jitters, a colour bar sweeps past.",
  },
  summary: {
    zh: "故障广播是 90 年代电视台台标与 VHS 故障艺术的复活，与合成波不同：它不画日落与网格，而是模拟信号本身坏掉的样子。CRT 近黑底（#0b0b0e）上永远覆着一层缓缓滚动的扫描线，只有三支信号色（故障红 #ff2e4c、CRT 青 #00e5d8、测试卡黄 #f5e000），SMPTE 彩条作签名装饰，所有故障动效用 steps() 硬切（帧跳、VHS 横向撕裂、色条横扫），绝不平滑过渡。它明令禁止合成波的紫粉橙日落与地平线网格——那是另一个风格。",
    en: "Broadcast Glitch revives 1990s TV idents and VHS glitch art, and it differs from synthwave in that it never paints a sunset or a grid — it models the signal itself breaking. CRT near-black (#0b0b0e) always carries a slowly crawling scanline layer, only three signal colors exist (glitch red #ff2e4c, CRT cyan #00e5d8, test-card yellow #f5e000), SMPTE color bars serve as the signature ornament, and every glitch move runs on steps() hard cuts — frame jumps, VHS horizontal tearing, bar sweeps — never a smooth transition. Synthwave's violet-pink-orange sunset and horizon grid are explicitly banned as belonging to another style.",
  },
  colors: [
    {
      name: "CRT 黑",
      nameEn: "CRT Black",
      value: "#0b0b0e",
      group: "surface",
      role: {
        zh: "页面底。显像管的黑，永远覆扫描线。",
        en: "The page ground — the black of a picture tube, always under scanlines.",
      },
      token: "--color-crt-black",
    },
    {
      name: "信号白",
      nameEn: "Signal White",
      value: "#ededed",
      group: "brand",
      role: {
        zh: "正文与彩条里的白。略带灰，像老电视的亮。",
        en: "Body text and the white of the bars — faintly grey, like an old set's brightest.",
      },
      token: "--color-signal-white",
    },
    {
      name: "故障红",
      nameEn: "Glitch Red",
      value: "#ff2e4c",
      group: "accent",
      role: {
        zh: "RGB 分离的一侧与警报。取自彩条的红。",
        en: "One side of the RGB split and the alarm — the red of the bars.",
      },
      token: "--color-glitch-red",
    },
    {
      name: "CRT 青",
      nameEn: "CRT Cyan",
      value: "#00e5d8",
      group: "accent",
      role: {
        zh: "RGB 分离的另一侧与状态。",
        en: "The other side of the RGB split and status.",
      },
      token: "--color-crt-cyan",
    },
    {
      name: "测试卡黄",
      nameEn: "Test Card Yellow",
      value: "#f5e000",
      group: "accent",
      role: {
        zh: "高亮与彩条的高光段。",
        en: "Highlights and the brightest stripe of the bars.",
      },
      token: "--color-test-yellow",
    },
  ],
  fonts: [
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400, 700],
      sizes: [11, 13, 16, 22, 32, 48],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.5 },
      tracking: { display: "0.06em", label: "0.16em" },
      role: {
        zh: "等宽字体，全大写。像电视台的字幕机与时间码。",
        en: "Monospace, uppercase — the character generator and timecode of a broadcast house.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 48, lineHeight: 1.1, tracking: "0.06em", token: "--text-display" },
    { role: "heading", weight: 700, size: 32, lineHeight: 1.2, tracking: "0.06em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 22, lineHeight: 1.3, tracking: "0.06em", token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 13, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 400, size: 11, lineHeight: 1.4, tracking: "0.16em", token: "--text-label" },
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
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "CRT Black", value: "#0b0b0e", purpose: "页面底" },
    { level: 1, name: "Signal Panel", value: "#111116", purpose: "面板" },
    { level: 2, name: "Color Bars", value: "SMPTE bars", purpose: "彩条装饰" },
  ],
  elevation: [
    { name: "None", value: "none — this is hard signal, not soft UI" },
    { name: "Channel split", value: "2px 0 #ff2e4c, -2px 0 #00e5d8" },
  ],
  components: [
    {
      name: "Scanline Crawl",
      role: { zh: "滚动扫描线（核心）", en: "The crawling scanline — the core" },
      construction: {
        zh: "全页固定覆盖 repeating-linear-gradient（每 4px 一条 1px 黑 50% 横线），再叠一层同样的图案并用 transform: translateY 在 8 秒内从 0 移到 4px（linear 无限循环），形成「信号在爬」的错觉。绝不改 top 或 height。reduced-motion 时静止。",
        en: "A fixed full-page repeating gradient draws a 1px black line at 50% every 4px, with a second identical layer translated from 0 to 4px over eight seconds on an infinite linear loop, producing the crawl. Never top or height. It holds still under reduced motion.",
      },
      sizes: "4px pitch; 8s linear loop",
    },
    {
      name: "RGB Split Title",
      role: { zh: "通道分离标题", en: "The channel-split title" },
      construction: {
        zh: "标题叠两层副本：一层偏移 2px 用故障红、一层 -2px 用 CRT 青，混合模式 screen。静置时偏移 2px；每 6 秒触发一次 120ms 的 steps(2) 抖动（偏移跳到 4px 再回）。正文层绝不做通道分离——那会让字不可读。",
        en: "Two copies overlay the title — one at 2px in glitch red, one at -2px in CRT cyan, blended in screen. The offset sits at 2px, and every six seconds a 120ms steps(2) jitter pushes it to 4px and back. Body copy never takes the split, or it stops being readable.",
      },
      sizes: "jitter 120ms steps(2), every 6s",
    },
    {
      name: "SMPTE Bars",
      role: { zh: "SMPTE 彩条（签名）", en: "SMPTE bars — the signature" },
      construction: {
        zh: "一条 24 到 48px 高的彩条带，按标准顺序排七段：白、黄、青、绿、品红、红、蓝。它只在页面顶部或区块之间出现，每次恰好一条，用作「信号校准」的装饰。",
        en: "A 24 to 48px band of seven segments in the standard order — white, yellow, cyan, green, magenta, red, blue. It appears only at the page top or between sections, exactly once each time, as signal calibration.",
      },
    },
    {
      name: "Signal Panel",
      role: { zh: "信号面板", en: "Signal panels" },
      construction: {
        zh: "#111116 填充、零圆角、1px 信号白 12% 描边、内边距 24px，无阴影。标题 22px/700 带通道分离，正文 13px 信号白 80%。hover 时描边升到 25% 并让一条 2px 高的色条在 200ms 内横扫一遍（steps(4)）。",
        en: "A #111116 fill, zero radius, a 1px signal white border at 12%, 24px padding, no shadow. The title runs 22px/700 with the channel split, body at 13px in 80% white. Hover raises the border to 25% and sweeps a 2px color bar across in 200ms on steps(4).",
      },
      states: "hover: bar sweep on steps(4)",
    },
    {
      name: "Broadcast Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "透明底、1px 信号白 30% 描边、零圆角、13px/700 全大写 0.16em、padding 10px 24px。hover 时描边转故障红、文字转测试卡黄；按下时整体横向撕裂——clip-path 切出 3 条水平错位（各偏 2 到 4px），并在 80ms 内复位。transition-none 或 80ms steps(2)。",
        en: "Transparent fill, a 1px signal white border at 30%, zero radius, 13px/700 uppercase at 0.16em, 10px 24px padding. Hover turns the border glitch red and the text test-card yellow; press tears the element horizontally — clip-path slices three bands offset 2 to 4px each, resetting within 80ms. transition-none or 80ms steps(2).",
      },
      states: "hover: red border; active: horizontal tear",
    },
  ],
  imagery: {
    zh: "VHS 画面、测试卡、色条、电视噪点、监控画面。必须带扫描线与轻微色偏。允许把照片压成 3 色信号调色板。不使用干净摄影、柔和插画与任何合成波日落。",
    en: "VHS frames, test cards, color bars, TV noise, surveillance footage — all with scanlines and slight color drift. A photo may be crushed into a three-color signal palette. No clean photography, soft illustration or any synthwave sunset.",
  },
  layout: {
    zh: "上限 1240px、容器内边距 16px，区块间距 64px。零圆角贯穿全站。全屏扫描线覆盖所有内容，色条只在顶部出现一次。允许元素每 6 秒抖一次，幅度 2 到 4px，频率极低。",
    en: "Capped at 1240px with 16px padding, sections 64px apart. Zero radius throughout. Scanlines cover all content, and the bars appear once at the top. Elements may jitter 2 to 4px every six seconds — small in amplitude, low in frequency.",
  },
  dos: [
    { zh: "CRT 黑底加滚动扫描线", en: "CRT black under crawling scanlines" },
    { zh: "只用三支信号色", en: "Only three signal colors" },
    { zh: "故障动效用 steps() 硬切", en: "Glitch motion runs on steps()" },
    { zh: "SMPTE 彩条作签名，只一条", en: "One SMPTE bar strip as the signature" },
    { zh: "通道分离只做在标题与装饰", en: "Channel split only on titles and ornament" },
    { zh: "抖动幅度 2 到 4px、频率极低", en: "Jitter stays 2 to 4px and infrequent" },
  ],
  donts: [
    { zh: "不要用合成波的日落渐变与地平线网格", en: "No synthwave sunset or horizon grid" },
    { zh: "不要用圆角、柔光与柔和阴影", en: "No radius, soft glow or soft shadow" },
    { zh: "不要引入第四种颜色", en: "Never introduce a fourth color" },
    { zh: "不要满屏持续抖动", en: "No full-screen constant shaking" },
    { zh: "不要在正文做通道分离", en: "Never split channels on body copy" },
    { zh: "不要动画布局属性", en: "Never animate layout properties" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ededed",
      background: "#0b0b0e",
      red: "#ff2e4c",
      cyan: "#00e5d8",
      yellow: "#f5e000",
      panel: "#111116",
    },
    prompts: [
      {
        zh: "做一个故障广播面板：CRT 黑 #0b0b0e 填充、零圆角、1px rgba(237,237,237,0.12) 描边、内边距 24px、无阴影。标题 22px/700 等宽全大写，叠两层副本做通道分离（一层 text-shadow 2px 0 #ff2e4c、一层 -2px 0 #00e5d8），每 6 秒抖一次 120ms。全页覆 repeating-linear-gradient（每 4px 一条 1px 黑 50%）并叠一层 translateY 0→4px 的 8s linear 滚动。顶部放一条 32px 高的 SMPTE 七段彩条（白黄青绿品红红蓝）。按钮透明底、1px 描边、hover 时描边转 #ff2e4c，active 时用 clip-path 做横向撕裂。全站只用三支信号色，不用合成波日落。",
        en: "Build a broadcast glitch panel: CRT black #0b0b0e fill, zero radius, a 1px rgba(237,237,237,0.12) border, 24px padding, no shadow. The title runs 22px/700 monospace uppercase under two split copies (one text-shadow 2px 0 #ff2e4c, one -2px 0 #00e5d8), jittering 120ms every six seconds. The page carries a repeating gradient of 1px black at 50% every 4px with a second layer translated 0 to 4px over 8s linear. A 32px SMPTE strip of seven segments (white, yellow, cyan, green, magenta, red, blue) sits at the top. The button is transparent with a 1px border, turning #ff2e4c on hover and tearing horizontally via clip-path on press. Only three signal colors, and no synthwave sunset.",
      },
    ],
  },
  similar: [
    { name: "Glitch Art", why: { zh: "同为故障，但故障艺术用 CMY 与屏幕撕裂，故障广播用电视信号与彩条", en: "Both glitch, though glitch art uses CMY and screen tearing while this uses broadcast signal and bars" } },
    { name: "Arcade CRT", why: { zh: "同样有扫描线，但街机 CRT 是游戏画面，故障广播是坏掉的信号", en: "Both use scanlines, though arcade CRT is a game screen while this is a failing signal" } },
  ],
  completeness: "full",
};
