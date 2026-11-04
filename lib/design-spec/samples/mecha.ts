import type { DesignSpec } from "../types";

export const mechaSpec: DesignSpec = {
  slug: "mecha",
  name: "机甲风",
  nameEn: "Mecha",
  cover: "/styles/mecha.svg",
  theme: "dark",
  northStar: {
    zh: "驾驶舱面板：切角金属、粗边框、警告黄与军绿。",
    en: "A cockpit panel: chamfered metal, heavy borders, hazard yellow over military green.",
  },
  summary: {
    zh: "机甲风来自高达与 EVA 的机设语言：军绿与深蓝海军作底，警告黄与危险红作强调，界面像一块被切角、铆接、贴了警示标的面板。它的技术特征是切角（clip-path polygon 切掉一角或两角）、粗边框（2px 起，左侧常加一条 4px 的强调边）、以及零模糊的硬阴影。字体必须等宽大写并放宽字距，因为这是设备铭牌。禁止柔和圆角、禁止粉色与浅色调、禁止花哨渐变与毛玻璃、禁止手写体。",
    en: "Mecha draws on the design language of Gundam and EVA: military green and navy underneath, hazard yellow and danger red on top, and an interface that reads like a chamfered, riveted, stencilled panel. Its technical signatures are the cut corner (clip-path polygon removing one or two), heavy borders from 2px with a 4px accent edge on the left, and hard zero-blur shadows. Type must be monospace uppercase on wide tracking, because this is equipment stencilling. Soft radii, pink and pale tones, flashy gradients, frosted glass and script faces are all excluded.",
  },
  colors: [
    {
      name: "海军蓝",
      nameEn: "Navy",
      value: "#1a2744",
      group: "surface",
      role: {
        zh: "主底与深色面板。机体涂装的主色。",
        en: "The main ground and dark panels — the primary livery color.",
      },
      token: "--color-navy",
    },
    {
      name: "军绿",
      nameEn: "Military Green",
      value: "#4a5c3a",
      group: "surface",
      role: {
        zh: "次级面板与边框。装甲板的哑光绿。",
        en: "Secondary panels and borders — the matte green of armour plate.",
      },
      token: "--color-military-green",
    },
    {
      name: "警告黄",
      nameEn: "Hazard Yellow",
      value: "#fbbf24",
      group: "accent",
      role: {
        zh: "主强调：左侧边条、按钮文字与关键读数。工业警示色。",
        en: "The primary accent on left edges, button text and key readouts — industrial hazard color.",
      },
      token: "--color-hazard-yellow",
    },
    {
      name: "危险红",
      nameEn: "Danger Red",
      value: "#ef4444",
      group: "accent",
      role: {
        zh: "警报、过载与删除。出现即表示状态异常。",
        en: "Alarms, overload and deletion — its presence marks an abnormal state.",
      },
      token: "--color-danger-red",
    },
    {
      name: "荧光绿",
      nameEn: "Signal Green",
      value: "#56ed40",
      group: "accent",
      role: {
        zh: "正常运转与「系统在线」，像仪表上的指示灯。",
        en: "Nominal operation and system online, like an indicator lamp on a gauge.",
      },
      token: "--color-signal-green",
    },
    {
      name: "深绿",
      nameEn: "Deep Green",
      value: "#069006",
      group: "accent",
      role: {
        zh: "绿色的暗部，用于压在亮绿上的文字与图表第二序列。",
        en: "The green's shadow side, for text on signal green and the second chart series.",
      },
      token: "--color-deep-green",
    },
  ],
  fonts: [
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400, 700],
      sizes: [10, 11, 13, 15, 20, 28],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.6 },
      tracking: { display: "0.08em", label: "0.16em" },
      role: {
        zh: "全站等宽大写。字距 0.08 到 0.16em，像喷在装甲上的编号。",
        en: "Monospace uppercase throughout, tracked 0.08 to 0.16em like a hull number stencilled on armour.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "heading", weight: 700, size: 28, lineHeight: 1.2, tracking: "0.08em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 20, lineHeight: 1.3, tracking: "0.08em", token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 15, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 13, lineHeight: 1.6, token: "--text-body" },
    { role: "body-sm", weight: 400, size: 11, lineHeight: 1.55, token: "--text-body-sm" },
    { role: "label", weight: 700, size: 10, lineHeight: 1.4, tracking: "0.16em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32, 48],
    maxWidth: 1360,
    sectionGap: 32,
    cardPadding: 24,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
    { element: "dials", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Navy", value: "#1a2744", purpose: "页面底" },
    { level: 1, name: "Panel", value: "#22283a", purpose: "面板" },
    { level: 2, name: "Armor", value: "#4a5c3a", purpose: "次级区块" },
  ],
  elevation: [
    { name: "Hard drop", value: "4px 4px 0 #1a2744" },
    { name: "Hard drop yellow", value: "4px 4px 0 rgba(251,191,36,0.30)" },
    { name: "Pressed", value: "2px 2px 0 #1a2744" },
  ],
  components: [
    {
      name: "Armor Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "深灰填充、警告黄文字、2px 警告黄 60% 描边、零圆角、4px 4px 0 海军蓝硬阴影，等宽 11px/700、全大写、字距 0.16em、padding 12px 32px。用 clip-path 切掉左上与右下各 14px 形成切角。hover 时填充硬切到警告黄、文字转海军蓝；按下位移 2px 2px 且阴影缩到 2px。过渡 100ms linear。",
        en: "Dark grey fill, hazard yellow text, a 2px yellow border at 60%, zero radius, a 4px 4px 0 navy hard shadow, monospace 11px/700 uppercase at 0.16em, 12px 32px padding. clip-path removes 14px from the top-left and bottom-right for the chamfer. Hover cuts the fill to hazard yellow and the text to navy; press translates 2px 2px and shrinks the shadow to 2px. 100ms linear.",
      },
      sizes: "padding 12px 32px; label 11px",
      states: "hover: yellow fill; active: translate 2px",
    },
    {
      name: "Armor Panel",
      role: { zh: "卡片与仪表面板", en: "Cards and instrument panels" },
      construction: {
        zh: "海军蓝填充、2px 军绿描边、左侧 4px 警告黄边条、零圆角、内边距 24px，硬阴影 4px 4px 0 警告黄 30%。右下角用 clip-path 切掉 20px。右上角放一个 32px 的 L 形角标（2px 警告黄 40%），hover 时角标向内侧移动 2px 并升到 100%。hover 时左边条从 4px 增宽到 10px，过渡 150ms linear。",
        en: "Navy fill, a 2px military green border, a 4px hazard yellow edge on the left, zero radius, 24px padding, hard shadow 4px 4px 0 at 30% yellow. clip-path removes 20px from the bottom-right, and a 32px L bracket in 40% yellow sits top-right, moving 2px inward and reaching full opacity on hover. The left edge widens from 4px to 10px over 150ms linear.",
      },
      states: "hover: left edge 4px→10px, bracket brightens",
    },
    {
      name: "Hazard Stripe",
      role: { zh: "警示条纹", en: "The hazard stripe" },
      construction: {
        zh: "高 8px 的斜条纹带：45 度重复的警告黄与海军蓝（各 12px 宽），用于面板顶部或区块之间。它不带圆角、不带阴影，是纯平面的工业标记。",
        en: "An 8px band of 45-degree repeating hazard yellow and navy, 12px each, used along a panel's top or between sections. It takes no radius and no shadow — a flat industrial marking.",
      },
    },
    {
      name: "Readout Gauge",
      role: { zh: "读数与状态仪表", en: "Readouts and status gauges" },
      construction: {
        zh: "12px 高的分段条，分成 10 格、每格间隔 2px、零圆角，底槽为军绿 30%。填充按状态取荧光绿（正常）、警告黄（注意）、危险红（过载）。左侧 10px 全大写标签，右侧等宽数值，中间用 1px 军绿分隔。",
        en: "A 12px segmented bar of ten cells with 2px gaps and zero radius on a 30% military green track. Fills run signal green for nominal, hazard yellow for caution and danger red for overload. A 10px uppercase label sits left and a monospace figure right, divided by a 1px military green rule.",
      },
    },
    {
      name: "Cockpit Frame",
      role: { zh: "页头与座舱框架", en: "The header and cockpit frame" },
      construction: {
        zh: "高 64px、海军蓝底、底部 2px 军绿描边、顶部 8px 警示条纹。左侧 20px 等宽大写字标，中部放三到四个系统的状态灯（8px 圆点加 10px 标签），右侧一个 Armor Button。整体零圆角。",
        en: "64px tall on navy with a 2px military green border along the bottom and the 8px hazard stripe on top. A 20px monospace uppercase wordmark sits left, three or four system status lights (8px dots with 10px labels) in the middle, and an armor button on the right. Zero radius throughout.",
      },
    },
  ],
  imagery: {
    zh: "机甲线稿、装甲板纹理、警示标与仪表盘。允许把照片处理成军绿双色调后叠网纹。不使用柔和插画、粉色系图像与毛玻璃图层。",
    en: "Mecha line art, armour plating texture, warning stencils and instrument dials. A photo may be graded to military duotone under a grid. No soft illustration, pink imagery or frosted layers.",
  },
  layout: {
    zh: "上限 1360px、容器内边距 16px，面板间距 12px，形成密集的舱内排布。面板可用 2px 军绿线拼接成大屏。所有尺寸取 4 的倍数，切角统一 14px 或 20px。",
    en: "Capped at 1360px with 16px padding and 12px between panels, producing a dense cockpit arrangement. Panels may join with 2px military green lines into a larger screen. Dimensions are multiples of four, with chamfers fixed at 14px or 20px.",
  },
  dos: [
    { zh: "切角用 clip-path，不用圆角", en: "Chamfer with clip-path, never radius" },
    { zh: "面板左侧 4px 警告黄边条", en: "Give panels a 4px hazard yellow left edge" },
    { zh: "等宽大写、字距 0.08 到 0.16em", en: "Monospace uppercase at 0.08 to 0.16em" },
    { zh: "硬阴影零模糊", en: "Shadows are hard with zero blur" },
    { zh: "军绿配海军蓝，警告黄作强调", en: "Military green on navy with hazard yellow" },
    { zh: "所有尺寸取 4 的倍数", en: "Every dimension is a multiple of four" },
  ],
  donts: [
    { zh: "不要用柔和的圆角", en: "No soft rounded corners" },
    { zh: "不要用粉色或浅色调", en: "No pink or pale tones" },
    { zh: "不要用花哨渐变与毛玻璃", en: "No flashy gradients or frosted glass" },
    { zh: "不要用手写体或花体字", en: "No script or decorative faces" },
    { zh: "不要用模糊阴影", en: "No blurred shadows" },
    { zh: "不要在同一屏混两种切角尺寸", en: "Never mix two chamfer sizes on one screen" },
  ],
  promptGuide: {
    quickColors: {
      text: "#fbbf24",
      background: "#1a2744",
      panel: "#22283a",
      green: "#4a5c3a",
      danger: "#ef4444",
      signal: "#56ed40",
    },
    prompts: [
      {
        zh: "做一个机甲风按钮：背景 #2b2b2b、文字 #fbbf24、2px solid rgba(251,191,36,0.6) 边框、零圆角、box-shadow 4px 4px 0 #1a2744、等宽 11px/700 全大写 0.16em 字距、padding 12px 32px、clip-path: polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)。hover 时背景 #fbbf24、文字 #1a2744；active 时 translate(2px,2px)、阴影缩到 2px 2px 0，transition 100ms linear。页面底色 #1a2744。",
        en: "Build a mecha button: #2b2b2b fill, #fbbf24 text, a 2px solid rgba(251,191,36,0.6) border, zero radius, box-shadow 4px 4px 0 #1a2744, monospace 11px/700 uppercase at 0.16em, 12px 32px padding, and clip-path: polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px). Hover fills #fbbf24 with #1a2744 text; active applies translate(2px,2px) and shrinks the shadow to 2px 2px 0 over 100ms linear. The page ground is #1a2744.",
      },
    ],
  },
  similar: [
    { name: "Sci-Fi HUD", why: { zh: "同为机械界面，但 HUD 是发光显示层，机甲是装甲与铭牌", en: "Both machine interfaces, though the HUD is a glowing display while mecha is armour and stencilling" } },
    { name: "Neo-Brutalist", why: { zh: "同样硬边与零圆角，但机甲有切角与军规配色", en: "Both hard-edged with zero radius, though mecha adds chamfers and military palettes" } },
  ],
  completeness: "full",
};
