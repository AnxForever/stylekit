import type { DesignSpec } from "../types";

/**
 * Seventh sample: a native desktop register. It is the only spec here that
 * mixes a serif headline face into a dark UI, and the only one where motion is
 * restricted to colour changes. Both facts have to be visible in the tokens.
 */
export const macosVibrancySpec: DesignSpec = {
  slug: "macos-vibrancy",
  name: "macOS 毛玻璃",
  nameEn: "macOS Vibrancy",
  cover: "/styles/macos-vibrancy.svg",
  theme: "dark",
  northStar: {
    zh: "三层深灰、系统级模糊、几乎没有装饰——像一台安静的桌面应用。",
    en: "Three greys, system-level blur and almost no ornament — the calm of a desktop app.",
  },
  summary: {
    zh: "这套风格模仿 macOS 的原生材质：窗口是三层深浅不同的深灰（#1c1c1e 最深、#2c2c2e 中间、#3a3a3c 最浅），侧边栏用 80% 不透明的深灰配大半径 backdrop-blur 做出通透感，所有分隔线都是 1px 白色 8% 到 12%，绝不加粗。标题用衬线体（Georgia）与正文的无衬线形成对话，这是它与普通暗色仪表盘的区别。动效只允许变颜色，200ms ease-out；任何位移或缩放都会让人意识到这是网页而不是系统。",
    en: "This style reproduces native macOS material: a window built from three greys (#1c1c1e deepest, #2c2c2e middle, #3a3a3c lightest), a sidebar at 80% opacity with a large backdrop blur for vibrancy, and every divider a 1px white line at 8% to 12% — never thicker. Serif headlines (Georgia) converse with a sans body, which is what separates it from a generic dark dashboard. Motion may only change color, over 200ms ease-out; any translation or scale reminds the eye this is a web page.",
  },
  colors: [
    {
      name: "最深灰",
      nameEn: "Deepest Grey",
      value: "#1c1c1e",
      group: "surface",
      role: {
        zh: "窗口底与侧边栏基色。整页最深的一层，其他灰都压在它上面。",
        en: "Window ground and sidebar base. The deepest layer; every other grey stacks above it.",
      },
      token: "--color-deepest",
    },
    {
      name: "中间灰",
      nameEn: "Mid Grey",
      value: "#2c2c2e",
      group: "surface",
      role: {
        zh: "内容区与列表行。与最深灰差一档，用来区分侧边栏与主区。",
        en: "Content area and list rows, one step above the deepest grey to separate sidebar from canvas.",
      },
      token: "--color-mid",
    },
    {
      name: "浅灰",
      nameEn: "Light Grey",
      value: "#3a3a3c",
      group: "surface",
      role: {
        zh: "工具栏、悬浮面板与需要再靠近观者一层的表面。",
        en: "Toolbars, floating panels and any surface that should sit one layer closer to the viewer.",
      },
      token: "--color-light-grey",
    },
    {
      name: "系统蓝",
      nameEn: "System Blue",
      value: "#0a84ff",
      group: "brand",
      role: {
        zh: "选中项、链接与主按钮。等同于 macOS 的系统强调色，只此一支。",
        en: "Selection, links and the primary button — the system accent, and the only one.",
      },
      token: "--color-system-blue",
    },
    {
      name: "系统绿",
      nameEn: "System Green",
      value: "#30d158",
      group: "accent",
      role: {
        zh: "成功、在线、已完成。与系统蓝同屏时只做小面积标记。",
        en: "Success, presence and completion; small marks only when blue is also on screen.",
      },
      token: "--color-system-green",
    },
    {
      name: "系统橙",
      nameEn: "System Orange",
      value: "#ff9f0a",
      group: "accent",
      role: {
        zh: "警告与待处理。表示「需要你看一眼」，不表示失败。",
        en: "Warnings and pending items — 'look at this', not 'this failed'.",
      },
      token: "--color-system-orange",
    },
    {
      name: "系统红",
      nameEn: "System Red",
      value: "#ff453a",
      group: "accent",
      role: {
        zh: "删除与不可逆操作。出现即意味着有代价。",
        en: "Destructive and irreversible actions. Its presence implies a cost.",
      },
      token: "--color-system-red",
    },
  ],
  fonts: [
    {
      family: "Georgia",
      substitute: "'New York', 'Times New Roman', serif",
      weights: [400, 700],
      sizes: [24, 32, 40],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.6 },
      tracking: { display: "-0.01em", label: "0.02em" },
      role: {
        zh: "窗口标题与大标题。衬线是这套暗色界面唯一的「人味」，缺了它就像普通仪表盘。",
        en: "Window titles and large headings. The serif is the only human touch in this dark UI; without it the page reads as a generic dashboard.",
      },
      token: "--font-serif",
    },
    {
      family: "SF Pro Text",
      substitute: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
      weights: [400, 500, 600],
      sizes: [11, 12, 13, 15, 17],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.5 },
      tracking: { display: "-0.01em", label: "0.02em" },
      role: {
        zh: "正文、控件与菜单。字级偏小（11 到 17px），这是桌面应用的密度，不是网页。",
        en: "Body, controls and menus at desktop density — 11 to 17px, not web scale.",
      },
      token: "--font-sans",
    },
    {
      family: "SF Mono",
      substitute: "ui-monospace, SFMono-Regular, Menlo, monospace",
      weights: [400, 500],
      sizes: [12, 13],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.6 },
      tracking: { display: "0", label: "0.02em" },
      role: {
        zh: "代码块、路径与数值。用于所有等宽内容，不做装饰用途。",
        en: "Code blocks, paths and figures. Used for all monospaced content and nothing decorative.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", font: "Georgia", weight: 700, size: 40, lineHeight: 1.15, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", font: "Georgia", weight: 400, size: 32, lineHeight: 1.25, token: "--text-heading" },
    { role: "subheading", font: "SF Pro Text", weight: 600, size: 17, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body", font: "SF Pro Text", weight: 400, size: 15, lineHeight: 1.5, token: "--text-body" },
    { role: "body-sm", font: "SF Pro Text", weight: 400, size: 13, lineHeight: 1.5, token: "--text-body-sm" },
    { role: "label", font: "SF Pro Text", weight: 500, size: 11, lineHeight: 1.4, tracking: "0.02em", token: "--text-label" },
    { role: "code", font: "SF Mono", weight: 400, size: 13, lineHeight: 1.6, token: "--text-code" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
    maxWidth: 1280,
    sectionGap: 48,
    cardPadding: 16,
    elementGap: 8,
  },
  radii: [
    { element: "cards", value: "10px" },
    { element: "buttons", value: "6px" },
    { element: "inputs", value: "6px" },
    { element: "panels", value: "14px" },
    { element: "pills", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Deepest", value: "#1c1c1e", purpose: "窗口底与侧边栏" },
    { level: 1, name: "Mid", value: "#2c2c2e", purpose: "内容区与列表行" },
    { level: 2, name: "Light Grey", value: "#3a3a3c", purpose: "工具栏与浮动面板" },
    { level: 3, name: "Vibrancy", value: "rgba(28,28,30,0.8)", purpose: "配 backdrop-blur 的通透层" },
  ],
  elevation: [
    { name: "Panel", value: "0 1px 0 rgba(255,255,255,0.08) inset, 0 20px 48px rgba(0,0,0,0.5)" },
    { name: "Popover", value: "0 12px 32px rgba(0,0,0,0.55)" },
  ],
  components: [
    {
      name: "Vibrancy Sidebar",
      role: { zh: "侧边栏与浮层背景", en: "Sidebar and overlay background" },
      construction: {
        zh: "深灰 80% 不透明填充、backdrop-blur 40px、仅右侧 1px 白色 10% 描边。宽 240px，内边距 12px。选中项用系统蓝 18% 底、圆角 6px；hover 用白色 8% 底。不做位移与缩放。",
        en: "80%-opaque deep grey with a 40px backdrop blur and a single 1px white border at 10% on the right edge. 240px wide, 12px padding. Selected items take 18% system blue on a 6px radius; hover uses 8% white. No translation and no scaling.",
      },
      states: "hover: white 8%; selected: blue 18%",
    },
    {
      name: "System Button",
      role: { zh: "主按钮与工具栏按钮", en: "Primary and toolbar buttons" },
      construction: {
        zh: "系统蓝填充、白字、6px 圆角、无描边、字级 13px/500、padding 6px 14px。hover 只把填充亮度提高 8%，按下降低 10%，过渡 200ms 且只动颜色。禁用态用白色 12% 填充配 40% 文字。",
        en: "System blue fill, white text, 6px radius, no border, 13px type at weight 500, 6px 14px padding. Hover brightens the fill by 8% and press dims it by 10%, over 200ms with color as the only animated property. Disabled uses a 12% white fill with text at 40%.",
      },
      states: "hover: +8% brightness; active: -10%; disabled: 12% white fill",
    },
    {
      name: "List Row",
      role: { zh: "设置项、文件列表与消息列表", en: "Settings, file and message rows" },
      construction: {
        zh: "高 44px、水平内边距 12px、圆角 6px、无背景。行与行之间用 1px 白色 8% 分隔线。hover 填充白色 6%，选中填充系统蓝 18%。左侧图标 16px、右侧说明文字 13px 白色 60%。",
        en: "44px tall, 12px horizontal padding, 6px radius, no background. Rows separate with a 1px white line at 8%. Hover fills 6% white; selection fills 18% system blue. The leading icon is 16px and the trailing note is 13px at 60% white.",
      },
    },
    {
      name: "Segmented Control",
      role: { zh: "视图切换与筛选", en: "View switch and filters" },
      construction: {
        zh: "轨道为白色 6% 填充、8px 圆角、高 28px；选中段为浅灰 #3a3a3c 填充、6px 圆角、内阴影 0 1px 0 白色 6%。字体 11px/500。切换只做颜色与位置过渡，200ms。",
        en: "The track is 6% white on an 8px radius, 28px tall; the selected segment fills light grey #3a3a3c on a 6px radius with an inset 0 1px 0 at 6% white. Type is 11px at weight 500. Switching animates color and position only, over 200ms.",
      },
    },
    {
      name: "Vibrancy Toolbar",
      role: { zh: "窗口工具栏", en: "Window toolbar" },
      construction: {
        zh: "高 52px、浅灰 #3a3a3c 填充、底部 1px 白色 10% 描边、无阴影。左侧窗口控件三个 12px 圆点（红黄绿），中间标题用衬线 13px，右侧放工具按钮。标题居中而非左对齐。",
        en: "52px tall, light grey #3a3a3c fill, a 1px white border at 10% along the bottom, no shadow. Three 12px traffic-light dots sit on the left, a 13px serif title is centred, and tool buttons sit on the right. The title is centred, not left-aligned.",
      },
    },
  ],
  imagery: {
    zh: "以应用截图与窗口截图为主，浅色壁纸做窗口背景时才有通透感。允许网格与列表的真实密度。不使用插画、卡通图标或高饱和摄影。",
    en: "App and window screenshots, with a light wallpaper behind them so vibrancy has something to pick up. Real interface density — grids and lists — is welcome. No illustration, cartoon icons or saturated photography.",
  },
  layout: {
    zh: "上限 1280px，左侧 240px 固定侧边栏加右侧内容区。行高 44px、区块间距 48px、内边距 16px，密度明显高于网页。工具栏固定顶部，内容区可独立滚动，侧边栏不随内容滚动。",
    en: "Capped at 1280px with a fixed 240px sidebar beside the content column. Rows are 44px, sections 48px apart, padding 16px — noticeably denser than the web. The toolbar stays pinned; the content column scrolls on its own while the sidebar does not.",
  },
  dos: [
    {
      zh: "只用三层深灰，层级靠明度差而不是描边",
      en: "Use only three greys; hierarchy comes from luminance, not borders",
    },
    {
      zh: "侧边栏与浮层用 80% 不透明加深模糊做通透",
      en: "Sidebars and overlays get vibrancy through 80% opacity plus deep blur",
    },
    {
      zh: "所有分隔线都是 1px 白色 8% 到 12%",
      en: "Every divider is a 1px white line at 8% to 12%",
    },
    {
      zh: "标题用衬线，正文用系统无衬线",
      en: "Serif for titles, system sans for body",
    },
    {
      zh: "动效 200ms，只改颜色",
      en: "Motion is 200ms and only changes color",
    },
    {
      zh: "密度按桌面应用设定：行高 44px、字级 11 到 17px",
      en: "Density follows the desktop: 44px rows, type between 11 and 17px",
    },
  ],
  donts: [
    {
      zh: "不要用超过 1px 的描边",
      en: "No border thicker than 1px",
    },
    {
      zh: "不要在动效里加位移或缩放",
      en: "Never add translation or scale to a transition",
    },
    {
      zh: "不要用玻璃拟态那种高饱和光斑，这里是系统材质不是装饰",
      en: "No saturated light blobs as in glassmorphism; this is system material, not decoration",
    },
    {
      zh: "不要把强调色用于大面积填充",
      en: "Never fill large areas with an accent color",
    },
    {
      zh: "不要用网页级的大字号破坏桌面密度",
      en: "Do not break desktop density with web-scale type",
    },
    {
      zh: "不要给面板加圆角超过 14px",
      en: "No panel radius above 14px",
    },
  ],
  promptGuide: {
    quickColors: {
      text: "rgba(255,255,255,0.92)",
      background: "#1c1c1e",
      panel: "#2c2c2e",
      toolbar: "#3a3a3c",
      accent: "#0a84ff",
      border: "rgba(255,255,255,0.10)",
    },
    prompts: [
      {
        zh: "做一个 macOS 风格侧边栏：宽 240px，背景 rgba(28,28,30,0.8)，backdrop-filter: blur(40px)，右侧 1px rgba(255,255,255,0.10) 描边。列表行高 44px、圆角 6px、内边距 12px，hover 填充 rgba(255,255,255,0.08)，选中填充 rgba(10,132,255,0.18)。所有过渡 200ms 且只改颜色。",
        en: "Build a macOS-style sidebar: 240px wide, background rgba(28,28,30,0.8), backdrop-filter blur(40px), and a 1px rgba(255,255,255,0.10) border on the right. Rows are 44px tall on a 6px radius with 12px padding; hover fills rgba(255,255,255,0.08) and selection fills rgba(10,132,255,0.18). Every transition is 200ms and animates color only.",
      },
    ],
  },
  similar: [
    {
      name: "Linear",
      why: {
        zh: "同属暗色桌面气质，但 Linear 允许位移与更强的发光强调",
        en: "Shares the dark desktop register, though Linear allows translation and stronger glow",
      },
    },
    {
      name: "Apple",
      why: {
        zh: "同一套系统材质与衬线标题的组合，这里是它的网页化版本",
        en: "Same system material and serif titles, translated to the web",
      },
    },
  ],
  completeness: "full",
};
