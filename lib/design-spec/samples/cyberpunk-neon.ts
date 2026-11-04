import type { DesignSpec } from "../types";

export const cyberpunkNeonSpec: DesignSpec = {
  slug: "cyberpunk-neon",
  name: "赛博朋克霓虹",
  nameEn: "Cyberpunk Neon",
  cover: "/styles/cyberpunk-neon.svg",
  theme: "dark",
  northStar: {
    zh: "近黑底上的霓虹光管：只有发光，没有阴影。",
    en: "Neon tubing on near-black: everything glows, nothing casts a shadow.",
  },
  summary: {
    zh: "赛博朋克霓虹的第一条规则是「禁止普通阴影」——所有纵深都由发光表达，用 0 0 20px 的彩色光晕代替投影。底色近黑（#0a0a0f），扫描线以 4px 间隔叠在上面，暗示 CRT。颜色是高饱和的青、品红、黄、绿，其中青色是主色（界面骨架），品红用于对抗性强调。圆角必须小（不超过 8px），因为霓虹灯管是硬的。字体用等宽加全大写，像终端输出。",
    en: "The first rule of Cyberpunk Neon is that ordinary shadows are forbidden. All depth is expressed as glow — a 0 0 20px colored bloom instead of a cast shadow. The ground is near black (#0a0a0f) with a 4px scanline overlay implying a CRT. Colors are saturated cyan, magenta, yellow and green, with cyan carrying the interface skeleton and magenta reserved for adversarial emphasis. Radius stays small, at 8px or less, because neon tubing is rigid. Type runs monospace and uppercase, like terminal output.",
  },
  colors: [
    {
      name: "近黑",
      nameEn: "Near Black",
      value: "#0a0a0f",
      group: "surface",
      role: {
        zh: "页面底。带一点蓝的极深色，让青光看起来是在发亮而不是发灰。",
        en: "Page ground — a very deep blue-black so cyan reads as emitting rather than reflecting.",
      },
      token: "--color-near-black",
    },
    {
      name: "霓虹青",
      nameEn: "Neon Cyan",
      value: "#00ffff",
      group: "brand",
      role: {
        zh: "主色：边框、主按钮与标题发光。界面骨架全部由它勾出。",
        en: "Primary: borders, primary buttons and headline glow — it traces the interface skeleton.",
      },
      token: "--color-neon-cyan",
    },
    {
      name: "霓虹品红",
      nameEn: "Neon Magenta",
      value: "#ff00ff",
      group: "accent",
      role: {
        zh: "对抗性强调：危险、敌对与第二层级。与青形成经典对位。",
        en: "Adversarial emphasis: danger, hostility and the second tier, set against cyan.",
      },
      token: "--color-neon-magenta",
    },
    {
      name: "霓虹黄",
      nameEn: "Neon Yellow",
      value: "#ffff00",
      group: "accent",
      role: {
        zh: "警告与数据高亮，用于需要穿透暗底的信息。",
        en: "Warnings and data highlights — anything that must cut through the dark.",
      },
      token: "--color-neon-yellow",
    },
    {
      name: "霓虹绿",
      nameEn: "Neon Green",
      value: "#00ff00",
      group: "accent",
      role: {
        zh: "终端成功输出与在线状态，像老式荧光屏。",
        en: "Terminal success and presence, like an old phosphor screen.",
      },
      token: "--color-neon-green",
    },
    {
      name: "警报红",
      nameEn: "Alarm Red",
      value: "#ff0506",
      group: "accent",
      role: {
        zh: "错误与过载，是唯一允许的暖色。",
        en: "Errors and overload — the only warm tone permitted.",
      },
      token: "--color-alarm-red",
    },
  ],
  fonts: [
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400, 700],
      sizes: [11, 12, 14, 18, 24, 40],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.6 },
      tracking: { display: "0.05em", label: "0.14em" },
      role: {
        zh: "全站唯一字体，全大写、宽字距。等宽字体是「这是机器界面」的第一信号。",
        en: "The only face, uppercase and widely tracked — the monospace is the first signal that this is a machine interface.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 40, lineHeight: 1.1, tracking: "0.05em", token: "--text-display" },
    { role: "heading", weight: 700, size: 24, lineHeight: 1.2, tracking: "0.05em", token: "--text-heading" },
    { role: "subheading", weight: 400, size: 18, lineHeight: 1.3, tracking: "0.05em", token: "--text-subheading" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.6, tracking: "0.02em", token: "--text-body" },
    { role: "body-sm", weight: 400, size: 12, lineHeight: 1.55, token: "--text-body-sm" },
    { role: "label", weight: 700, size: 11, lineHeight: 1.4, tracking: "0.14em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
    maxWidth: 1280,
    sectionGap: 64,
    cardPadding: 20,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "4px" },
    { element: "buttons", value: "2px" },
    { element: "inputs", value: "2px" },
    { element: "panels", value: "8px" },
  ],
  surfaces: [
    { level: 0, name: "Near Black", value: "#0a0a0f", purpose: "页面底" },
    { level: 1, name: "Panel", value: "rgba(0,255,255,0.04)", purpose: "卡片与面板（青色调）" },
    { level: 2, name: "Scanline Overlay", value: "repeating-linear-gradient(0deg, rgba(0,255,255,0.04) 0 1px, transparent 1px 4px)", purpose: "全屏扫描线" },
  ],
  elevation: [
    { name: "Cyan glow", value: "0 0 20px rgba(0,255,255,0.50)" },
    { name: "Magenta glow", value: "0 0 20px rgba(255,0,255,0.45)" },
    { name: "Text glow", value: "0 0 8px rgba(0,255,255,0.60)" },
  ],
  components: [
    {
      name: "Neon Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "透明底、2px 霓虹青描边、2px 圆角、无阴影色块。字级 12px、700 字重、全大写、0.14em 字距、padding 10px 24px，颜色霓虹青。静态时带 0 0 12px 青色光晕。hover 时填充青 12%、光晕扩到 24px；按下时光晕收到 6px 并让填充升到 20%。过渡 150ms。",
        en: "Transparent fill, a 2px cyan border, 2px radius, no solid shadow. 12px type at weight 700, uppercase, 0.14em tracking, 10px 24px padding, colored cyan. At rest it carries a 0 0 12px cyan glow. Hover fills 12% cyan and widens the glow to 24px; press pulls the glow back to 6px and raises the fill to 20%. 150ms.",
      },
      sizes: "padding 10px 24px; label 12px",
      states: "hover: fill 12%, glow 24px; active: glow 6px, fill 20%",
    },
    {
      name: "Data Panel",
      role: { zh: "卡片与数据面板", en: "Cards and data panels" },
      construction: {
        zh: "青 4% 填充、1px 青 30% 描边、4px 圆角、内边距 20px、无阴影。标题 18px 青色带 0 0 8px 文字光晕，正文 14px 白 70%。左上角可加 8px 的直角切角（clip-path）制造硬件感。hover 时描边升到 60%、填充升到 8%、光晕 0 0 16px。",
        en: "4% cyan fill, a 1px cyan border at 30%, 4px radius, 20px padding, no shadow. Titles at 18px cyan with a 0 0 8px text glow, body at 14px in 70% white. An 8px corner chamfer via clip-path may sit top-left for a hardware feel. Hover raises the border to 60%, the fill to 8% and adds a 0 0 16px glow.",
      },
      states: "hover: border 60%, fill 8%, glow 16px",
    },
    {
      name: "Terminal Input",
      role: { zh: "输入与命令行", en: "Input and command line" },
      construction: {
        zh: "近黑底、1px 青 40% 描边、2px 圆角、padding 8px 12px、14px 等宽。左侧加一个闪烁的青色方块光标（1 Hz、steps 缓动）。聚焦时描边升到 100% 并加 0 0 12px 光晕。",
        en: "Near-black fill, a 1px cyan border at 40%, 2px radius, 8px 12px padding at 14px monospace. A blinking 1Hz cyan block cursor with step easing sits on the left. Focus takes the border to 100% and adds a 0 0 12px glow.",
      },
    },
    {
      name: "Scanline Overlay",
      role: { zh: "全屏 CRT 纹理", en: "Full-screen CRT texture" },
      construction: {
        zh: "固定覆盖层，repeating-linear-gradient 每 4px 一条 1px 的青色 4% 横线，pointer-events: none，z-index 在内容之下或之上均可但不能影响点击。整个覆盖层不透明度 60%。",
        en: "A fixed overlay whose repeating gradient draws a 1px cyan line at 4% every 4px, with pointer-events none. It may sit above or below content as long as clicks pass through, and the whole layer runs at 60% opacity.",
      },
    },
    {
      name: "Glitch Heading",
      role: { zh: "故障效果标题", en: "Glitch headline" },
      construction: {
        zh: "标题文字用青色，叠两个伪元素副本：一个偏移 -2px 用红色、一个偏移 2px 用青色，混合模式 screen，不透明度 70%。仅在 hover 或每 6 秒一次做 60ms 的位移抖动，其余时间静止。",
        en: "Cyan headline text with two pseudo-element copies: one offset -2px in red, one offset 2px in cyan, blended with screen at 70% opacity. They jitter for 60ms on hover or once every six seconds, and stay still otherwise.",
      },
    },
  ],
  imagery: {
    zh: "夜景城市、电路纹理、扫描线与全息投影。允许把照片压成高对比双色调后叠青色光晕。不使用白天摄影、柔和渐变与暖色插画。",
    en: "Night cityscapes, circuit textures, scanlines and holograms. A photo may be flattened to a high-contrast duotone and overlaid with cyan glow. No daylight photography, soft gradients or warm illustration.",
  },
  layout: {
    zh: "上限 1280px、容器内边距 16px，区块间距 64px。允许全宽数据条与边框网格：用 1px 青 20% 的线把页面切成仪表盘式分区。密集度接近 HUD，信息可以挤，但每条都要有发光层级。",
    en: "Capped at 1280px with 16px padding, sections 64px apart. Full-width data strips and bordered grids are welcome — 1px lines at 20% cyan cut the page into HUD-style zones. Density approaches a heads-up display; information may crowd as long as every block has a glow level.",
  },
  dos: [
    { zh: "用发光表达纵深，禁用普通阴影", en: "Express depth as glow; ordinary shadows are banned" },
    { zh: "近黑底，不用纯黑", en: "Ground in near black, not pure black" },
    { zh: "圆角不超过 8px", en: "Radius stays at 8px or below" },
    { zh: "青色为主，品红为对抗", en: "Cyan leads, magenta opposes" },
    { zh: "叠一层 4px 扫描线", en: "Layer a 4px scanline overlay" },
    { zh: "全大写等宽，宽字距", en: "Uppercase monospace on wide tracking" },
  ],
  donts: [
    { zh: "不要用浅色或白色背景", en: "No light or white grounds" },
    { zh: "不要用低饱和色", en: "No desaturated color" },
    { zh: "不要用普通投影（shadow-md 一类）", en: "No ordinary shadows such as shadow-md" },
    { zh: "不要用暖色，除警报红外", en: "No warm tones beyond alarm red" },
    { zh: "不要用大圆角", en: "No large radii" },
    { zh: "不要用柔和温暖的设计语言", en: "No soft or warm design language" },
  ],
  promptGuide: {
    quickColors: {
      text: "#e0ffff",
      background: "#0a0a0f",
      cyan: "#00ffff",
      magenta: "#ff00ff",
      yellow: "#ffff00",
      border: "rgba(0,255,255,0.30)",
    },
    prompts: [
      {
        zh: "做一个霓虹按钮：透明底、2px solid #00ffff 描边、border-radius 2px、12px 700 全大写 0.14em 字距、padding 10px 24px、文字 #00ffff、box-shadow 0 0 12px rgba(0,255,255,0.5)。hover 时背景 rgba(0,255,255,0.12)、box-shadow 扩到 0 0 24px rgba(0,255,255,0.5)；active 时 box-shadow 收到 0 0 6px。页面底色 #0a0a0f，可叠一层 4px 间隔的青色 4% 扫描线。",
        en: "Build a neon button: transparent fill, a 2px solid #00ffff border, border-radius 2px, 12px weight 700 uppercase at 0.14em tracking, 10px 24px padding, #00ffff text and box-shadow 0 0 12px rgba(0,255,255,0.5). Hover fills rgba(0,255,255,0.12) and widens the glow to 0 0 24px; active pulls it back to 0 0 6px. The page ground is #0a0a0f with a 4px-spaced cyan scanline layer at 4%.",
      },
    ],
  },
  similar: [
    { name: "Neon Tokyo", why: { zh: "同属霓虹，但更偏城市招牌与日文排版", en: "Also neon, though closer to city signage and Japanese typesetting" } },
    { name: "Sci-Fi HUD", why: { zh: "同样的机器界面感，那边用细线与数据密度而非发光", en: "Same machine-interface feel, though that one uses hairlines and data density instead of glow" } },
  ],
  completeness: "full",
};
