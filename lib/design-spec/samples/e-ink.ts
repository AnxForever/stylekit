import type { DesignSpec } from "../types";

export const eInkSpec: DesignSpec = {
  slug: "e-ink",
  name: "电子纸",
  nameEn: "E-Ink",
  sourceUrl: "https://trmnl.com/framework/docs/3.4/open_source",
  cover: "/styles/e-ink.svg",
  theme: "light",
  northStar: {
    zh: "暖纸白承载墨色信息，灰阶和点阵只在需要分组的地方出现。",
    en: "Warm paper carries clear ink; grayscale and halftone appear only where they help organize information.",
  },
  summary: {
    zh: "电子纸风格把读屏、列表和简单数据面板当作一张克制的印刷页来排：暖纸白为底，墨色文字作主层级，四档中性灰负责分区、标注与图表。重点是数字列对齐、短标签、细规则与阅读顺序。局部点阵可以提示选中区或呈现灰阶图表，但正文一直保持纯色和高对比度。配色只有一个色相端点以外的温暖纸底；状态使用文字和形状共同表达。布局对窄屏、键盘焦点和减少动态效果有明确规则。它是一种面向浏览器UI的视觉风格参考，不是电子纸硬件模拟，也不代表某种屏幕刷新率或位深已经验证。",
    en: "E-Ink treats a reading view, list or small data panel like a restrained printed page: warm paper beneath ink, with a few neutral grays for grouping, annotation and charts. The characteristic details are aligned numeric columns, short labels, fine rules and a deliberate reading order. Local halftone may mark a selected region or chart fill; body text stays solid and high-contrast. Status uses words and shapes together. Responsive layout, keyboard focus and reduced-motion preferences are stated explicitly. This is a web UI visual reference, not a hardware simulation or a claim that any screen refresh rate or bit depth has been tested.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#20211e",
      group: "brand",
      role: {
        zh: "正文、标题、主要操作和焦点轮廓。最重的线与字。",
        en: "Body copy, headings, primary actions and focus outlines. The darkest strokes in the system.",
      },
      token: "--e-ink-text",
    },
    {
      name: "暖纸",
      nameEn: "Warm Paper",
      value: "#f5f3ea",
      group: "surface",
      role: {
        zh: "页面底色和输入框填充。它不是泛黄滤镜，所有正文都要在这里保持清楚。",
        en: "Page ground and input fill. It is not a sepia filter; all body copy must remain clear against it.",
      },
      token: "--e-ink-paper",
    },
    {
      name: "石墨",
      nameEn: "Graphite",
      value: "#555750",
      group: "neutral",
      role: {
        zh: "次级正文、图表线、元数据和简短标签。它仍须有足够对比度。",
        en: "Secondary copy, chart strokes, metadata and short labels, while retaining readable contrast.",
      },
      token: "--e-ink-muted",
    },
    {
      name: "细线灰",
      nameEn: "Rule Gray",
      value: "#bab9b0",
      group: "neutral",
      role: {
        zh: "卡片边框、分隔线和非关键网格。不用它写正文。",
        en: "Card borders, dividers and non-critical grids. Never use it for body text.",
      },
      token: "--e-ink-rule",
    },
    {
      name: "阅读面",
      nameEn: "Reading Surface",
      value: "#e6e4da",
      group: "surface",
      role: {
        zh: "列表分组、表格行或被选中的阅读卡片。",
        en: "A quiet surface for list groups, table rows or a selected reading card.",
      },
      token: "--e-ink-panel",
    },
  ],
  fonts: [
    {
      family: "Public Sans",
      substitute: "Inter, system-ui, sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 13, 16, 20, 28, 36],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.55 },
      tracking: { display: "-0.02em", label: "0.06em" },
      role: {
        zh: "沿用系统里已有的无衬线字体，正文保持常规字重，标题最多到 700，不引入专有屏幕字体。",
        en: "Use the existing UI sans-serif stack. Keep body copy at regular weight, headings at 700 or below, and avoid introducing a proprietary display font.",
      },
      token: "--font-sans",
    },
    {
      family: "System Mono",
      substitute: "ui-monospace, SFMono-Regular, Consolas, monospace",
      weights: [400, 600],
      sizes: [11, 12, 14, 16, 24],
      lineHeight: { display: 1.2, heading: 1.35, body: 1.45 },
      tracking: { display: "0", label: "0.04em" },
      role: {
        zh: "日期、时间、数值、单位和简短状态。只在需要对齐的字段使用。",
        en: "Reserve it for dates, times, values, units and short states where alignment matters.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", font: "sans", weight: 600, size: 36, lineHeight: 1.2, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", font: "sans", weight: 600, size: 28, lineHeight: 1.3, tracking: "-0.01em", token: "--text-heading" },
    { role: "subheading", font: "sans", weight: 500, size: 20, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body", font: "sans", weight: 400, size: 16, lineHeight: 1.55, token: "--text-body" },
    { role: "body-compact", font: "sans", weight: 400, size: 13, lineHeight: 1.5, token: "--text-body-compact" },
    { role: "data", font: "mono", weight: 600, size: 16, lineHeight: 1.35, tracking: "0", token: "--text-data" },
    { role: "label", font: "sans", weight: 600, size: 12, lineHeight: 1.4, tracking: "0.06em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "comfortable",
    scale: [4, 8, 12, 16, 20, 24, 32, 48],
    maxWidth: 1120,
    sectionGap: 40,
    cardPadding: 20,
    elementGap: 8,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
    { element: "badges", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Warm Paper", value: "#f5f3ea", purpose: "Page background, long-form reading surface." },
    { level: 1, name: "Reading Surface", value: "#e6e4da", purpose: "Grouped list rows, static cards and table cells." },
    { level: 2, name: "Pressed Area", value: "#bab9b0", purpose: "Pressed state, chart marker and secondary rule, with a text or shape cue." },
  ],
  elevation: [
    { name: "Flat", value: "none; use a single divider or offset hatch." },
    { name: "Selected", value: "none; use a 2px ink outline and a text marker." },
  ],
  components: [
    {
      name: "Ink Action",
      role: { zh: "页面的单一主要行动", en: "The screen's primary action" },
      construction: {
        zh: "纸底上的墨色填充，零圆角，12–16px 内边距。标签用 14px/600；键盘焦点用 2px 墨色轮廓并与边缘保留 2px 间隔。不要加入图标当作唯一提示。",
        en: "Ink fill on paper, square corners and 12–16px padding. Set the label at 14px/600; keyboard focus uses a 2px ink outline offset by 2px. Do not make an icon the sole cue.",
      },
      sizes: "min-height 44px; horizontal padding 12–24px",
      states: "default: ink on paper; hover: panel gray; active: pressed gray; disabled: 60% opacity plus disabled semantics; focus-visible: 2px ink outline",
    },
    {
      name: "Reading Row",
      role: { zh: "书目、列表和摘要项", en: "A reading list row or summary item" },
      construction: {
        zh: "每行用一条 1px 细线分隔，序号与数字用等宽字体；次级描述换行，不缩到 12px 以下。选中行同时显示“当前”标签和左侧墨色条。",
        en: "Separate rows with one 1px rule; set indexes and numeric values in mono. Wrap supporting copy instead of shrinking below 12px. A selected row carries both a word label and an ink rule on the left.",
      },
      states: "default: paper surface; selected: reading gray, ink rule and label; offline: explicit text plus a hollow marker",
    },
    {
      name: "Paper Field",
      role: { zh: "搜索、筛选和短文本输入", en: "Search, filter and short-form input" },
      construction: {
        zh: "暖纸填充，1px 中性边框，最小高度 44px；占位文字仍用可读灰度，不能把提示做成近乎消失的浅灰。提供可见 label 和 2px 键盘焦点轮廓。",
        en: "Warm-paper fill, a 1px neutral rule and a 44px minimum height. Keep placeholder contrast readable, provide a visible label and show a 2px keyboard focus outline.",
      },
      states: "default: paper fill; focus-visible: 2px ink outline; disabled: explicit disabled semantics and 60% opacity",
    },
    {
      name: "Halftone Mark",
      role: { zh: "示例背景纹理或有限灰阶图表填充", en: "A decorative background or grayscale chart fill" },
      construction: {
        zh: "只把小点阵用于装饰性图块或图表区域，点距至少 5px；文字与可交互元素保持纯色，避免灰点破坏字符边缘。需要深浅层次时，应同时保留标注和图例。",
        en: "Limit the halftone to decorative blocks or chart fills, with dots at least 5px apart. Keep text and controls solid so the pattern cannot break letter edges. Retain labels and a legend whenever shades encode different values.",
      },
    },
    {
      name: "Status Marker",
      role: { zh: "进度、在线状态与提醒", en: "Progress, connectivity and alerts" },
      construction: {
        zh: "灰阶色块与实心/空心几何标记配合，旁边有“完成”“离线”等文字。圆点不是唯一状态载体，错误或警告不借用未定义的颜色。",
        en: "Pair a grayscale mark with a filled or hollow shape and an adjacent word such as “Done” or “Offline”. A dot is never the only status carrier; errors and warnings do not invent a new hue.",
      },
    },
  ],
  imagery: {
    zh: "优先使用留白、可读数据表与少量线性图形。点阵只用于局部图表，不复制 TRMNL 品牌标识、第三方字体、设备外壳或宣传图像。需要预览真实图像时，提示代理先确认许可，并保留原始来源。",
    en: "Prefer whitespace, readable tables and a few line drawings. Limit halftone to local chart fills. Do not copy TRMNL marks, third-party fonts, device shells or promotional images. Ask the agent to verify image rights and retain source attribution when actual imagery is needed.",
  },
  layout: {
    zh: "常规桌面内容上限 1120px；读屏数据面板按示例 800×480 比例组织，窄屏切为单列和明确的阅读顺序。优先一至两列对齐网格，关键数字用等宽字体；表格提供窄屏卡片/滚动策略，而不是挤压正文。",
    en: "Cap regular desktop content at 1120px. Use an 800×480 preview ratio only as an example canvas for e-paper screens, then collapse to one readable column on narrow screens. Prefer aligned one- or two-column grids and mono values; give dense tables an explicit small-screen collapse or scroll strategy instead of squeezing copy.",
  },
  dos: [
    { zh: "先写屏幕目的，再选最少的卡片、状态或数据。", en: "Name the screen's job before choosing the fewest useful rows and panels." },
    { zh: "数字列、单位和日期保持对齐；数字标清单位。", en: "Align numeric columns, dates and their explicit units." },
    { zh: "每个状态同时给出形状或文字，不靠颜色。", en: "Give each state a shape or word instead of relying on color." },
    { zh: "用细规则和局部点阵分组，把纹理留在正文之外。", en: "Group with fine rules and local halftone; keep texture off body copy." },
    { zh: "为交互控件保留至少 44px 触控高度和明显键盘焦点。", en: "Keep interactive targets at least 44px tall with visible keyboard focus." },
    { zh: "在窄屏按阅读顺序合并列并保留可读字号。", en: "Collapse columns in reading order on narrow screens while preserving readable type." },
    { zh: "数据示例、占位图和硬件信息明确标注来源或示例状态。", en: "Label sample values, placeholders and device claims with their source or example status." },
  ],
  donts: [
    { zh: "不要把屏幕截图、传感器数值或演示内容说成实时硬件数据。", en: "Do not present screenshots, sample readings or demo content as live hardware data." },
    { zh: "不要把重要文字放进点阵、背景纹理或低对比度灰色。", en: "Do not place essential text in halftone, texture or low-contrast gray." },
    { zh: "不要只用灰阶深浅表示错误、警告、离线或已选状态。", en: "Do not encode error, warning, offline or selected state through shade alone." },
    { zh: "不要使用发光、玻璃模糊、连续闪烁或大范围渐变。", en: "Avoid glow, glass blur, continuous flicker and broad gradients." },
    { zh: "不要假定 1-bit 量化、文字锐化或屏幕刷新已经完成。", en: "Do not assume 1-bit quantization, pixel-perfect text or display refresh has been implemented." },
    { zh: "不要引入未确认许可证的像素字体、图标或设备品牌图。", en: "Do not add pixel fonts, icons or device branding without verified licenses." },
  ],
  promptGuide: {
    quickColors: {
      ink: "#20211e",
      paper: "#f5f3ea",
      graphite: "#555750",
      rule: "#bab9b0",
      readingSurface: "#e6e4da",
    },
    prompts: [
      {
        zh: "先读取仓库现有组件与 design.md，再为目标页面挑选必要的数据行。使用暖纸 #f5f3ea、墨色 #20211e 和规范中定义的灰阶，不加新依赖或假传感器数据；要示例时清楚标注 SAMPLE。以 800×480 面板作为设计参考，但实际网页仍须桌面分列、手机单列。将数字、单位、日期对齐，把纹理只留给图表底纹；离线、警告和选中状态同时显示文字或几何标记。给交互提供 44px 触控高度、键盘焦点样式和 prefers-reduced-motion 降级。除非接入真实设备并测试，不声称电子纸、1-bit 阈值或刷新能力已验证。",
        en: "Read the repository's existing components and design.md first, then include only the rows this screen needs. Use warm paper #f5f3ea, ink #20211e and the documented grayscale values; add no dependency or fictitious sensor data, and label any fixture SAMPLE. Use an 800×480 panel only as an art-direction reference while keeping the web page multi-column on desktop and single-column on phones. Align values, units and dates. Limit halftone to chart fills. Give offline, warning and selection states both a word or geometric mark. Keep targets at least 44px, add keyboard focus and honor prefers-reduced-motion. Do not claim e-paper hardware, 1-bit thresholds or refresh support without connecting and testing a real device.",
      },
      {
        zh: "实现样例设备状态时，请提供纯 HTML 示例数据而不是运行中硬件 API。添加“数据示例”标记；每列包含名称、数值、单位、状态和更新时间；一条细规则分组；仪表不能只用颜色或点阵表示。验证 390px 窄屏、键盘顺序和减弱动态效果偏好，不覆盖已有仓库组件。",
        en: "For a sample device-status view, use fixture HTML instead of calling a live hardware API and add an explicit “SAMPLE DATA” label. Each row carries a name, value, unit, state and timestamp; thin rules group the entries; no meter relies on color or halftone alone. Check a 390px viewport, keyboard order and reduced-motion preferences, and reuse the repository's existing components.",
      },
    ],
  },
  similar: [
    { name: "Monochrome", slug: "monochrome", why: { zh: "共享无色相灰阶；电子纸风额外强调数字列、设备状态与纸张阅读密度。", en: "Both avoid hue. E-Ink adds device status, aligned data and a reading-oriented density." } },
    { name: "Data Dense", slug: "data-dense", why: { zh: "都处理信息密度；电子纸风用更少字段、纸面分组与非颜色状态标记。", en: "Both handle dense information. E-Ink uses fewer fields, paper grouping and non-color state cues." } },
    { name: "Blueprint", slug: "blueprint", why: { zh: "同样使用技术注记；蓝图在深蓝底上画施工尺寸，电子纸在暖纸底上读列表与状态。", en: "Both annotate technical content. Blueprint drafts on blue; E-Ink reads on paper." } },
  ],
  customSections: [
    {
      title: { zh: "设备边界", en: "Device boundary" },
      body: { zh: "本规范描述网页的视觉层，不包含 TRMNL runtime、电子墨水控制指令、色阶量化算法或厂商字体。真实屏幕预览必须连接目标设备、记录型号与色深，并独立检查文字边缘、分页与刷新行为。", en: "This specification describes web art direction. It does not include the TRMNL runtime, e-paper control instructions, tone-quantization algorithms or vendor fonts. A real-screen preview must connect a target device, name its model and color depth, and separately inspect text edges, pagination and refresh behavior." },
    },
    {
      title: { zh: "数据来源", en: "Data provenance" },
      body: { zh: "预览数据如果没有来自已接入设备，必须标为示例数据；不要编造温度、在线状态或更新时间并暗示它正在采集。", en: "If preview values do not come from a connected device, label them as examples; do not invent temperatures, online state or update times and imply they are being collected." },
    },
  ],
  completeness: "full",
};
