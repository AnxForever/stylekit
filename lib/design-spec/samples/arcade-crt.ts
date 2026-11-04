import type { DesignSpec } from "../types";

export const arcadeCrtSpec: DesignSpec = {
  slug: "arcade-crt",
  name: "街机 CRT",
  nameEn: "Arcade CRT",
  cover: "/styles/arcade-crt.svg",
  theme: "dark",
  northStar: {
    zh: "一块还亮着的街机显示器：扫描线、曲面、荧光与色散。",
    en: "An arcade monitor still glowing: scanlines, curvature, phosphor and chromatic aberration.",
  },
  summary: {
    zh: "街机 CRT 模拟 80 到 90 年代的街机显示器：全屏扫描线覆盖层、桶形曲面（用轻微 scale 与圆角模拟）、高饱和荧光色、以及 RGB 色散造成的边缘彩边。它的技术配方是固定的——所有内容区都必须叠扫描线、字体必须是等宽或像素、只用高饱和荧光色、阴影只能是霓虹光晕、渐变只能是霓虹到暗。禁令同样固定：不许柔和低饱和、不许衬线或常规无衬线正文、不许超过 4px 的圆角、不许细微阴影。",
    en: "Arcade CRT reproduces a 1980s and 90s arcade monitor: a full-screen scanline overlay, barrel curvature faked with a slight scale and radius, saturated phosphor color, and the chromatic fringing of an RGB split. Its recipe is fixed — scanlines over every content area, monospace or pixel type, saturated neon only, shadows that are glow rather than shade, and gradients that only run neon into dark. The prohibitions are equally fixed: no soft or muted color, no serif or conventional sans body, no radius beyond 4px, and no subtle shadows.",
  },
  colors: [
    {
      name: "荧光绿",
      nameEn: "Phosphor Green",
      value: "#39ff14",
      group: "brand",
      role: {
        zh: "主文字与荧光。老式绿磷屏的颜色。",
        en: "Primary text and phosphor — the old green-phosphor screen.",
      },
      token: "--color-phosphor-green",
    },
    {
      name: "屏黑",
      nameEn: "Screen Black",
      value: "#050505",
      group: "surface",
      role: {
        zh: "显示器底。近纯黑，让荧光层看起来在自发光。",
        en: "The monitor ground — near pure black so the phosphor reads as self-lit.",
      },
      token: "--color-screen-black",
    },
    {
      name: "品红",
      nameEn: "Magenta",
      value: "#ff00ff",
      group: "accent",
      role: {
        zh: "RGB 色散的暖侧与「加分」状态。",
        en: "The warm side of the RGB split and score states.",
      },
      token: "--color-magenta",
    },
    {
      name: "青",
      nameEn: "Cyan",
      value: "#00ffff",
      group: "accent",
      role: {
        zh: "RGB 色散的冷侧与数据。",
        en: "The cool side of the RGB split and data.",
      },
      token: "--color-cyan",
    },
    {
      name: "警告红",
      nameEn: "Alert Red",
      value: "#ff2a2a",
      group: "accent",
      role: {
        zh: "生命值与失败，是屏幕上最刺的颜色。",
        en: "Health and failure — the loudest color on the screen.",
      },
      token: "--color-alert-red",
    },
    {
      name: "金币黄",
      nameEn: "Coin Yellow",
      value: "#ffff00",
      group: "accent",
      role: {
        zh: "分数、金币与高亮，用于「闪一下」的地方。",
        en: "Scores, coins and highlights — anywhere that should flash.",
      },
      token: "--color-coin-yellow",
    },
  ],
  fonts: [
    {
      family: "Press Start 2P",
      substitute: "'Courier New', ui-monospace, monospace",
      weights: [400],
      sizes: [10, 12, 14, 18, 26, 36],
      lineHeight: { display: 1.3, heading: 1.4, body: 1.9 },
      tracking: { display: "0.05em", label: "0.12em" },
      role: {
        zh: "像素或等宽，行高必须放到 1.9 否则像素字会粘成一团。",
        en: "Pixel or monospace, with leading opened to 1.9 or the pixel glyphs clump.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", weight: 400, size: 36, lineHeight: 1.35, tracking: "0.05em", token: "--text-display" },
    { role: "heading", weight: 400, size: 26, lineHeight: 1.4, tracking: "0.05em", token: "--text-heading" },
    { role: "subheading", weight: 400, size: 18, lineHeight: 1.5, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 14, lineHeight: 1.9, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 12, lineHeight: 1.9, token: "--text-body" },
    { role: "label", weight: 400, size: 10, lineHeight: 1.6, tracking: "0.12em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
    maxWidth: 1120,
    sectionGap: 64,
    cardPadding: 20,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "4px" },
    { element: "buttons", value: "2px" },
    { element: "inputs", value: "2px" },
    { element: "screen", value: "24px" },
  ],
  surfaces: [
    { level: 0, name: "Screen Black", value: "#050505", purpose: "页面底" },
    { level: 1, name: "Tube Glass", value: "rgba(57,255,20,0.04)", purpose: "面板（绿调半透明）" },
    { level: 2, name: "Scanline", value: "repeating-linear-gradient", purpose: "扫描线覆盖层" },
  ],
  elevation: [
    { name: "Green glow", value: "0 0 20px rgba(57,255,20,0.60)" },
    { name: "Magenta glow", value: "0 0 20px rgba(255,0,255,0.55)" },
    { name: "Text glow", value: "0 0 8px rgba(57,255,20,0.70)" },
  ],
  components: [
    {
      name: "Scanline Overlay",
      role: { zh: "扫描线覆盖层（签名）", en: "The scanline overlay — the signature" },
      construction: {
        zh: "全页固定覆盖一层 repeating-linear-gradient，每 3px 一条 1px 的黑色 45% 横线，pointer-events: none。可选再加一条每 3 秒从上到下扫过的亮带（亮 8%、周期 3s、linear）。这层必须覆盖所有内容区，缺了它就不是 CRT。",
        en: "A fixed full-page repeating gradient draws a 1px black line at 45% every 3px with pointer-events none. An optional bright band may sweep top to bottom every three seconds at 8% brightness on a linear cycle. The layer covers every content area — without it this is not a CRT.",
      },
    },
    {
      name: "Tube Frame",
      role: { zh: "显像管外框", en: "The tube frame" },
      construction: {
        zh: "页面最外层容器：24px 圆角、2px 深灰边框、inset 0 0 80px 黑 60%（模拟显像管暗角）加外层 0 0 120px 荧光绿 8% 的溢出光。内部再套一层 scale(0.995) 的轻微桶形错觉。",
        en: "The outermost container takes a 24px radius, a 2px dark grey border, an inset 0 0 80px shadow at 60% black for the tube's vignette, and an outer 0 0 120px glow at 8% phosphor green. Inside, a slight scale(0.995) suggests the barrel.",
      },
    },
    {
      name: "Neon Panel",
      role: { zh: "内容面板", en: "Content panels" },
      construction: {
        zh: "屏黑 90% 填充、4px 圆角、1px 荧光绿 40% 描边、内边距 20px，外发光 0 0 20px 荧光绿 60%。标题 26px 带 0 0 8px 文字发光，正文 12px 荧光绿 85%。hover 时描边升到 80%、发光扩到 32px。",
        en: "90% screen black fill, 4px radius, a 1px phosphor border at 40%, 20px padding, with a 0 0 20px glow at 60% green. Titles run 26px under a 0 0 8px text glow, body at 12px in 85% green. Hover raises the border to 80% and the glow to 32px.",
      },
    },
    {
      name: "Arcade Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "品红或荧光绿填充、屏黑文字、2px 圆角、12px 全大写 0.12em、padding 10px 20px，外发光 0 0 16px 同色 60%。hover 时发光扩到 28px 并加一道 60ms 的 RGB 色散抖动；按下时位移 1px 且发光收到 8px。过渡 80ms linear。",
        en: "Magenta or green fill, screen-black text, 2px radius, 12px uppercase at 0.12em, 10px 20px padding, with a 0 0 16px glow at 60% in the same hue. Hover widens the glow to 28px with a 60ms RGB split jitter; press translates 1px and pulls the glow to 8px. 80ms linear.",
      },
      states: "hover: glow 28px, RGB jitter; active: translate 1px",
    },
    {
      name: "Score Readout",
      role: { zh: "分数与状态读数", en: "Score and status readouts" },
      construction: {
        zh: "10px 等宽全大写 0.12em，荧光绿或金币黄，带 0 0 8px 文字发光。格式为「SCORE 0012400 / HI 0098000」，数值部分用金币黄。它可以在区块角落常驻，像街机的计分条。",
        en: "10px monospace uppercase at 0.12em in green or coin yellow under a 0 0 8px text glow, in a fixed format like 'SCORE 0012400 / HI 0098000' with the figures in yellow. It may persist in a corner like an arcade scoreboard.",
      },
    },
    {
      name: "Chromatic Edge",
      role: { zh: "色散边缘", en: "The chromatic edge" },
      construction: {
        zh: "给标题或按钮叠两层文本副本：一层偏移 -2px 用品红、一层 +2px 用青，混合模式 screen，不透明度 60%。静置时偏移 2px，hover 时硬切到 3px 并抖动一次。",
        en: "Two text copies overlay a title or button — one at -2px in magenta, one at +2px in cyan, blended in screen at 60% opacity. The offset sits at 2px at rest and cuts to 3px with one jitter on hover.",
      },
    },
  ],
  imagery: {
    zh: "街机与复古游戏的像素图、屏幕截图、低分辨率渲染。图像必须带扫描线与轻微色散。不使用现代高清摄影与平滑插画。",
    en: "Arcade and retro-game pixel art, screen captures, low-resolution renders — all carrying scanlines and slight chromatic split. No modern high-resolution photography or smooth illustration.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 16px，区块间距 64px。整体像一块屏幕内的布局，元素可以贴边。所有内容都在 Tube Frame 之内，外层留出 16 到 24px 的「边框」当作显像管外壳。",
    en: "Capped at 1120px with 16px padding, sections 64px apart. The layout behaves like the inside of a screen where elements may hug the edge. Everything sits inside the tube frame, with 16 to 24px of casing left outside.",
  },
  dos: [
    { zh: "全屏叠扫描线", en: "Scanlines cover the whole screen" },
    { zh: "等宽或像素字体", en: "Monospace or pixel type" },
    { zh: "只用高饱和荧光色", en: "Saturated phosphor color only" },
    { zh: "阴影只能是霓虹光晕", en: "Shadows are glow only" },
    { zh: "渐变只能霓虹到暗", en: "Gradients run neon into dark only" },
    { zh: "圆角不超过 4px（显像管除外）", en: "Radius stays at 4px or under, the tube aside" },
  ],
  donts: [
    { zh: "不要用柔和低饱和色", en: "No soft or muted color" },
    { zh: "不要用衬线或常规无衬线正文", en: "No serif or conventional sans body" },
    { zh: "不要用超过 4px 的圆角", en: "No radius beyond 4px" },
    { zh: "不要用细微阴影", en: "No subtle shadows" },
    { zh: "不要用非霓虹到暗的渐变", en: "No gradient other than neon into dark" },
    { zh: "不要漏掉扫描线", en: "Never omit the scanlines" },
  ],
  promptGuide: {
    quickColors: {
      text: "#39ff14",
      background: "#050505",
      magenta: "#ff00ff",
      cyan: "#00ffff",
      yellow: "#ffff00",
      alert: "#ff2a2a",
    },
    prompts: [
      {
        zh: "做一个街机 CRT 面板：屏黑 #050505 填充、4px 圆角、1px rgba(57,255,20,0.4) 描边、内边距 20px、box-shadow 0 0 20px rgba(57,255,20,0.6)。标题 26px 像素字体、带 0 0 8px rgba(57,255,20,0.7) 文字发光。全页叠一层每 3px 一条 1px 黑色 45% 的扫描线（pointer-events: none），外层容器加 inset 0 0 80px rgba(0,0,0,0.6) 的暗角。按钮品红 #ff00ff 填充、屏黑文字、2px 圆角、外发光 0 0 16px 同色 60%，hover 时发光扩到 28px 并做一次 60ms 的 RGB 色散抖动。",
        en: "Build an arcade CRT panel: #050505 fill, 4px radius, a 1px rgba(57,255,20,0.4) border, 20px padding, box-shadow 0 0 20px rgba(57,255,20,0.6). The title runs 26px pixel type under a 0 0 8px rgba(57,255,20,0.7) text glow. A scanline layer of 1px black at 45% every 3px covers the page with pointer-events none, and the outer container carries an inset 0 0 80px rgba(0,0,0,0.6) vignette. The button fills #ff00ff with screen-black text on a 2px radius and a 0 0 16px glow at 60%, widening to 28px with one 60ms RGB split jitter on hover.",
      },
    ],
  },
  similar: [
    { name: "Pixel Art", why: { zh: "同为 8-bit 语言，但像素艺术是抽帧状态机，CRT 多了扫描线与曲面", en: "Both 8-bit languages, though pixel art is a frame-skipping state machine while CRT adds scanlines and curvature" } },
    { name: "Glitch Art", why: { zh: "同样有色散，但故障艺术追求断裂，CRT 追求稳定的荧光显示", en: "Both use chromatic split, though glitch art pursues rupture while CRT pursues a steady phosphor display" } },
  ],
  completeness: "full",
};
