import type { DesignSpec } from "../types";

export const sciFiHudSpec: DesignSpec = {
  slug: "sci-fi-hud",
  name: "科幻 HUD",
  nameEn: "Sci-Fi HUD",
  cover: "/styles/sci-fi-hud.svg",
  theme: "dark",
  northStar: {
    zh: "深空底上的一层发光数据：面板半透明，角标是 L 形，灯一直在脉冲。",
    en: "A layer of glowing data over deep space: translucent panels, L-shaped corner brackets, and lights that never stop pulsing.",
  },
  summary: {
    zh: "科幻 HUD 模拟星舰驾驶舱与战术指挥台的显示层。它的构成是固定的：深空底（#020617），面板以 85% 不透明叠上去并带 20px 发光边，四角用 L 形 2px 边框做框选标记，文字用等宽大写加宽字距，状态灯持续脉冲，进度条用渐变加一道扫描光。它的关键不是装饰而是「系统活着」的感觉——所有交互都必须让某个部件发光或脉冲，普通阴影加深在这里不够用。",
    en: "Sci-Fi HUD models the display layer of a starship cockpit or tactical command table. The composition is fixed: deep space (#020617), panels laid on at 85% opacity with a 20px glow along their edges, L-shaped 2px brackets marking the corners, monospace uppercase on wide tracking, status lights that keep pulsing, and progress bars with a gradient plus a sweeping scan. The point is not decoration but the sense that the system is alive — every interaction must make something glow or pulse, and a plain shadow deepening will not do.",
  },
  colors: [
    {
      name: "深空",
      nameEn: "Deep Space",
      value: "#020617",
      group: "surface",
      role: {
        zh: "页面底。极深的蓝黑，让青光的对比拉到最大。",
        en: "The page ground — a very deep blue-black that maximises the cyan's contrast.",
      },
      token: "--color-deep-space",
    },
    {
      name: "主青",
      nameEn: "Primary Cyan",
      value: "#06b6d4",
      group: "brand",
      role: {
        zh: "边框、发光与主强调。所有「系统在线」的信号都由它发出。",
        en: "Borders, glow and primary emphasis — every 'system online' signal comes from it.",
      },
      token: "--color-cyan",
    },
    {
      name: "扫描蓝",
      nameEn: "Scan Blue",
      value: "#0ea5e9",
      group: "accent",
      role: {
        zh: "雷达扫描、数据流与次级高亮。",
        en: "Radar sweeps, data streams and secondary highlights.",
      },
      token: "--color-scan-blue",
    },
    {
      name: "亮青",
      nameEn: "Bright Cyan",
      value: "#22d3ee",
      group: "accent",
      role: {
        zh: "峰值高光与关键数值，比主青更亮一档。",
        en: "Peak highlights and key figures, one step brighter than the primary.",
      },
      token: "--color-bright-cyan",
    },
    {
      name: "系统绿",
      nameEn: "System Green",
      value: "#22c55e",
      group: "accent",
      role: {
        zh: "正常状态、已锁定与通过检查。是唯一的「安全」色。",
        en: "Nominal status, locked targets and passed checks — the only safe color.",
      },
      token: "--color-system-green",
    },
    {
      name: "共振紫",
      nameEn: "Resonance Violet",
      value: "#9e74ff",
      group: "accent",
      role: {
        zh: "异常读数与需要人工介入的状态，出现频率最低。",
        en: "Anomalous readings and states needing human intervention, used least.",
      },
      token: "--color-violet",
    },
  ],
  fonts: [
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400, 700],
      sizes: [10, 11, 12, 14, 18, 24],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.6 },
      tracking: { display: "0.08em", label: "0.16em" },
      role: {
        zh: "全站唯一字体，全大写、0.08 到 0.16em 字距。等宽让数值列对齐，也让整页像仪表读数。",
        en: "The only face, uppercase at 0.08 to 0.16em. The monospace aligns columns and makes the page read as instrument output.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "heading", weight: 700, size: 24, lineHeight: 1.2, tracking: "0.08em", token: "--text-heading" },
    { role: "subheading", weight: 400, size: 18, lineHeight: 1.3, tracking: "0.08em", token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 14, lineHeight: 1.5, tracking: "0.04em", token: "--text-body-lg" },
    { role: "body", weight: 400, size: 12, lineHeight: 1.6, token: "--text-body" },
    { role: "body-sm", weight: 400, size: 11, lineHeight: 1.55, token: "--text-body-sm" },
    { role: "label", weight: 700, size: 10, lineHeight: 1.4, tracking: "0.16em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32, 48],
    maxWidth: 1600,
    sectionGap: 24,
    cardPadding: 20,
    elementGap: 8,
  },
  radii: [
    { element: "cards", value: "4px" },
    { element: "buttons", value: "2px" },
    { element: "inputs", value: "2px" },
    { element: "dials", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Deep Space", value: "#020617", purpose: "页面底" },
    { level: 1, name: "Panel", value: "rgba(15,23,42,0.85)", purpose: "主要面板" },
    { level: 2, name: "Panel Raised", value: "rgba(30,41,59,0.90)", purpose: "浮层与弹窗" },
  ],
  elevation: [
    { name: "Panel glow", value: "0 0 20px rgba(6,182,212,0.50)" },
    { name: "Active glow", value: "0 0 32px rgba(6,182,212,0.70)" },
    { name: "Text glow", value: "0 0 8px rgba(34,211,238,0.60)" },
  ],
  components: [
    {
      name: "HUD Panel",
      role: { zh: "主面板与数据块", en: "Primary panels and data blocks" },
      construction: {
        zh: "深板岩 85% 填充、20px 模糊、4px 圆角、1px 主青 30% 描边、内边距 20px，外发光 0 0 20px 青 50%。四角各用两个伪元素画 L 形角标（2px 主青、长 16px）。hover 时描边升到 60%、外发光扩到 32px——这就是「系统激活」。",
        en: "85% slate fill, 20px blur, 4px radius, a 1px cyan border at 30%, 20px padding, with a 0 0 20px glow at 50% cyan. Each corner carries an L bracket drawn by two pseudo elements (2px cyan, 16px long). Hover raises the border to 60% and the glow to 32px — that is what system activation looks like.",
      },
      sizes: "padding 20px; radius 4px",
      states: "hover: border 60%, glow 32px",
    },
    {
      name: "Glow Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "透明底、2px 主青描边、2px 圆角、无填充，12px/700 全大写 0.16em、padding 8px 20px，文字亮青。静态时已有 0 0 12px 的发光。hover 时填充青 12%、发光扩到 24px；按下时发光收到 6px 并把填充升到 20%。过渡 120ms。",
        en: "Transparent fill, a 2px cyan border, 2px radius, no fill, 12px/700 uppercase at 0.16em, 8px 20px padding, text in bright cyan. A 0 0 12px glow already exists at rest. Hover fills 12% cyan and widens the glow to 24px; press pulls it to 6px and raises the fill to 20%. 120ms.",
      },
      states: "hover: fill 12%, glow 24px; active: glow 6px",
    },
    {
      name: "Status Light",
      role: { zh: "状态指示灯", en: "Status indicator lights" },
      construction: {
        zh: "8px 圆点，正常绿、预警紫、告警橙。必须持续脉冲：0 到 100% 之间把外发光从 4px 扩到 12px 再收回，周期 2 秒，缓动用 ease-in-out。灯旁边永远配 11px 的等宽状态文字，不只靠颜色。",
        en: "An 8px dot — green for nominal, violet for warning, amber for alarm. It must pulse continuously, expanding the glow from 4px to 12px and back on a two-second ease-in-out cycle. An 11px monospace label always sits beside it so status never rests on color alone.",
      },
    },
    {
      name: "Scan Bar",
      role: { zh: "进度条与扫描指示", en: "Progress bars and scan indicators" },
      construction: {
        zh: "高 6px、2px 圆角，底槽为主青 15%。填充用主青到亮青的横向渐变，并在填充上叠一道 24px 宽的白色 40% 高光，以 3 秒周期从左扫到右。数值以等宽字体放在右侧，单位与数字分开。",
        en: "6px tall on a 2px radius with a 15% cyan track. The fill runs a cyan-to-bright-cyan horizontal gradient with a 24px white highlight at 40% sweeping left to right every three seconds. The figure sits on the right in monospace, unit separated from number.",
      },
    },
    {
      name: "Radar Ring",
      role: { zh: "雷达与环形仪表", en: "Radar and circular gauges" },
      construction: {
        zh: "直径 160px 到 240px 的圆环，2px 主青 30% 描边，内部十字准线 1px 主青 20%，扫描扇区用 conic-gradient 从主青 40% 渐隐到透明，旋转一周 4 秒、线性。中心显示 18px 等宽读数。",
        en: "A ring 160px to 240px across with a 2px cyan border at 30%, a 1px crosshair inside at 20%, and a scanning sector drawn with a conic gradient fading from 40% cyan to transparent, rotating once every four seconds on a linear curve. An 18px monospace readout sits at the centre.",
      },
    },
  ],
  imagery: {
    zh: "以网格、雷达、波形与星图为图像语言，不用摄影。允许深空摄影作为面板底层并压到 20% 不透明度。不使用插画、人物与任何暖色图像。",
    en: "Grids, radar, waveforms and star charts are the imagery; photography is absent, though a deep-space photo may underlay a panel at 20% opacity. No illustration, people or warm-toned images.",
  },
  layout: {
    zh: "上限 1600px、容器内边距 16px，面板间距 8px，形成密集的仪表盘排布。允许面板以 1px 青线拼接成更大的显示区。四角常驻 L 形角标，页面边缘保留 16px 安全区。",
    en: "Capped at 1600px with 16px padding and 8px between panels, producing a dense instrument layout. Panels may join with 1px cyan lines into a larger display. Corner brackets persist, and the page keeps a 16px safe margin.",
  },
  dos: [
    { zh: "面板半透明加深模糊加外发光", en: "Panels are translucent with deep blur and outer glow" },
    { zh: "四角必须有 L 形角标", en: "Every panel carries L-shaped corner brackets" },
    { zh: "等宽大写，字距 0.08 到 0.16em", en: "Monospace uppercase at 0.08 to 0.16em" },
    { zh: "状态灯持续脉冲", en: "Status lights pulse continuously" },
    { zh: "交互必须让某处发光变化", en: "Every interaction changes a glow somewhere" },
    { zh: "暖色只用于警告", en: "Warm color appears only as a warning" },
  ],
  donts: [
    { zh: "不要用浅色或白色背景", en: "No light or white grounds" },
    { zh: "不要用暖色调（警告除外）", en: "No warm tones except warnings" },
    { zh: "不要用衬线字体", en: "No serif type" },
    { zh: "不要用圆润可爱的语言", en: "Nothing round or cute" },
    { zh: "不要用 8px 以上的圆角", en: "No radius above 8px" },
    { zh: "不要让状态灯静止", en: "Never leave a status light static" },
  ],
  promptGuide: {
    quickColors: {
      text: "#e5f2ff",
      background: "#020617",
      panel: "rgba(15,23,42,0.85)",
      accent: "#06b6d4",
      bright: "#22d3ee",
      ok: "#22c55e",
    },
    prompts: [
      {
        zh: "做一个科幻 HUD 面板：背景 rgba(15,23,42,0.85)、backdrop-blur 20px、4px 圆角、1px rgba(6,182,212,0.3) 描边、box-shadow 0 0 20px rgba(6,182,212,0.5)、内边距 20px。四角用 2px solid #06b6d4 的 L 形角标（长 16px）。标题 14px 等宽全大写 0.16em。面板内放一个高 6px 的进度条：底槽 rgba(6,182,212,0.15)、填充 linear-gradient(to right, #06b6d4, #22d3ee)。页面底色 #020617。",
        en: "Build a sci-fi HUD panel: background rgba(15,23,42,0.85), backdrop-blur 20px, 4px radius, a 1px rgba(6,182,212,0.3) border, box-shadow 0 0 20px rgba(6,182,212,0.5), 20px padding. Each corner takes a 2px solid #06b6d4 L bracket 16px long. The heading is 14px monospace uppercase at 0.16em. Inside sits a 6px progress bar with a rgba(6,182,212,0.15) track and a linear-gradient(to right, #06b6d4, #22d3ee) fill. The page ground is #020617.",
      },
    ],
  },
  similar: [
    { name: "Cyberpunk Neon", why: { zh: "同样发光，但那边是街头霓虹，这里是仪表盘与数据层", en: "Also glowing, though that one is street neon while this is instrumentation" } },
    { name: "Data Dense", why: { zh: "同样追求信息密度，但数据密集是中性风格，HUD 全是发光", en: "Also dense, though dense data is neutral while the HUD glows throughout" } },
  ],
  completeness: "full",
};
