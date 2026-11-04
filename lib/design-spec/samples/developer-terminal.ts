import type { DesignSpec } from "../types";

export const developerTerminalSpec: DesignSpec = {
  slug: "developer-terminal",
  name: "终端风",
  nameEn: "Developer Terminal",
  cover: "/styles/developer-terminal.svg",
  theme: "dark",
  northStar: {
    zh: "整个网站就是一次终端会话：命令、输出、注释、状态栏。",
    en: "The whole site is one terminal session: command, output, comment, status bar.",
  },
  summary: {
    zh: "终端风把界面完全按 shell 会话组织：荧光绿等宽文字压在近黑底上，内容永远是「命令 + 输出」的成对结构，注释行以 # 开头并用蓝灰，列表按 ls -la 对齐，表格带 ps aux 式表头，页面底部有 tmux 状态栏，输入位有闪烁光标块。它的禁令非常彻底——不允许任何无衬线或衬线字体、不允许浅底、不允许渐变与玻璃态、不允许摄影与插画、不允许超过四种强调色、不允许厚阴影。终端里只有字符。",
    en: "Developer Terminal organizes the whole interface as a shell session: phosphor-green monospace on near black, content always structured as paired command and output, comments prefixed with # in blue-grey, lists aligned like ls -la, tables with ps aux headers, a tmux status bar at the bottom, and a blinking cursor block at input points. Its prohibitions are thorough — no sans or serif faces anywhere, no light grounds, no gradients or glass, no photography or illustration, no more than four accents, no heavy shadow. Inside a terminal there are only characters.",
  },
  colors: [
    {
      name: "荧光绿",
      nameEn: "Phosphor Green",
      value: "#4af626",
      group: "brand",
      role: {
        zh: "主文字与光标。整套风格唯一的识别色，像老 CRT 的磷光。",
        en: "Primary text and the cursor — the only identifier, like a CRT's phosphor.",
      },
      token: "--color-phosphor",
    },
    {
      name: "近黑",
      nameEn: "Terminal Black",
      value: "#0a0e12",
      group: "surface",
      role: {
        zh: "页面底。极深的蓝黑，让绿色看起来在发光而不是在反光。",
        en: "The page ground — a deep blue-black that makes green read as emitting rather than reflecting.",
      },
      token: "--color-terminal-black",
    },
    {
      name: "青",
      nameEn: "Cyan",
      value: "#8be9fd",
      group: "accent",
      role: {
        zh: "第一强调：路径、链接与关键词。语法高亮里的字符串色。",
        en: "The first accent on paths, links and keywords — the string color in syntax highlighting.",
      },
      token: "--color-cyan",
    },
    {
      name: "品红",
      nameEn: "Magenta",
      value: "#ff79c6",
      group: "accent",
      role: {
        zh: "第二强调：函数名与命令。",
        en: "The second accent on function names and commands.",
      },
      token: "--color-magenta",
    },
    {
      name: "琥珀",
      nameEn: "Amber",
      value: "#ffb86c",
      group: "accent",
      role: {
        zh: "第三强调：警告与参数。终端里最多用到这一档。",
        en: "The third accent on warnings and arguments — the last one a terminal needs.",
      },
      token: "--color-amber",
    },
    {
      name: "蓝灰",
      nameEn: "Comment Grey",
      value: "#6272a4",
      group: "neutral",
      role: {
        zh: "注释、元数据与禁用状态。永远比正文暗一档。",
        en: "Comments, metadata and disabled states — always one step dimmer than the text.",
      },
      token: "--color-comment-grey",
    },
  ],
  fonts: [
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'SF Mono', Menlo, monospace",
      weights: [400, 700],
      sizes: [12, 13, 14, 16, 20, 28],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.6 },
      tracking: { display: "0", label: "0.08em" },
      role: {
        zh: "全站唯一字体，无一例外。所有层级靠字号与颜色区分，不靠字族。",
        en: "The only face, without exception. Every level is distinguished by size and color, never by family.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "heading", weight: 700, size: 28, lineHeight: 1.25, token: "--text-heading" },
    { role: "subheading", weight: 700, size: 20, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "body-sm", weight: 400, size: 13, lineHeight: 1.55, token: "--text-body-sm" },
    { role: "label", weight: 400, size: 12, lineHeight: 1.4, tracking: "0.08em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32, 48],
    maxWidth: 1100,
    sectionGap: 32,
    cardPadding: 16,
    elementGap: 8,
  },
  radii: [
    { element: "cards", value: "2px" },
    { element: "buttons", value: "2px" },
    { element: "inputs", value: "2px" },
  ],
  surfaces: [
    { level: 0, name: "Terminal Black", value: "#0a0e12", purpose: "页面底" },
    { level: 1, name: "Panel", value: "#0f141a", purpose: "面板与卡片" },
  ],
  elevation: [
    { name: "None", value: "none — the terminal is flat" },
    { name: "Focus glow", value: "0 0 0 1px #4af626" },
  ],
  components: [
    {
      name: "Command Block",
      role: { zh: "命令与输出的成对结构（核心组件）", en: "The command-and-output pair — the core component" },
      construction: {
        zh: "命令行以 $ 开头，$ 与命令之间 8px，命令用白色或荧光绿；输出行缩进 16px、颜色稍暗。命令与输出之间无空行，两组之间空 16px。整块用 13px 等宽、行高 1.6，无需边框与背景。",
        en: "The command line opens with $, spaced 8px from the command in white or phosphor green; output lines indent 16px in a dimmer tone. No blank line sits between command and output, while 16px separate one pair from the next. Everything runs 13px monospace on 1.6 leading with no border or ground.",
      },
    },
    {
      name: "Terminal Panel",
      role: { zh: "面板与分区块", en: "Panels and divided regions" },
      construction: {
        zh: "#0f141a 填充、2px 圆角、1px #1f2937 描边、内边距 16px，无阴影。面板顶部可放一行 12px 蓝灰的路径标头（如 ~/projects）。面板之间 16px。",
        en: "A #0f141a fill, 2px radius, a 1px #1f2937 border, 16px padding, no shadow. A 12px blue-grey path header such as ~/projects may cap the panel. Panels sit 16px apart.",
      },
    },
    {
      name: "Cursor Block",
      role: { zh: "闪烁光标", en: "The blinking cursor" },
      construction: {
        zh: "8px × 16px 的荧光绿实体块，跟在标题末尾或输入位的文字之后，每 1 秒以 steps(1) 硬切显示与隐藏（不做淡入淡出）。同一屏最多出现一个。",
        en: "An 8px by 16px phosphor-green block trailing a heading or input text, toggling visibility every second on steps(1) with no fade. One per screen at most.",
      },
    },
    {
      name: "Status Bar",
      role: { zh: "tmux 式状态栏", en: "The tmux-style status bar" },
      construction: {
        zh: "固定在视口底部、高 24px、荧光绿 15% 底、顶部 1px #1f2937 描边。左侧显示会话名与分支（12px 全大写 0.08em），右侧显示时间与 CPU 占位。整条不加圆角。",
        en: "Pinned to the bottom at 24px tall on a 15% phosphor ground with a 1px #1f2937 top border. The left shows session and branch at 12px uppercase 0.08em; the right shows time and a CPU placeholder. No radius anywhere on the bar.",
      },
    },
    {
      name: "Aligned List",
      role: { zh: "ls 式对齐列表与表格", en: "ls-style lists and tables" },
      construction: {
        zh: "列表用等宽对齐成三到四列（权限/大小/时间/名称），列间用 8px 稳定间隔，不靠 tab 而是靠固定列宽。表头用蓝灰全大写 12px，下方一条 1px #1f2937 分隔线。行高 24px。",
        en: "Lists align into three or four monospace columns (permissions, size, time, name) separated by fixed widths rather than tabs. Headers sit in 12px uppercase blue-grey above a 1px #1f2937 rule. Row height is 24px.",
      },
    },
  ],
  imagery: {
    zh: "没有图像。只有字符、ASCII 图形与块字符进度条。允许把进度条做成 ███░░ 式的字符画。不使用图标（会破坏纯字符假设），需要指示时用 → 与 » 这类字符。",
    en: "No imagery. Only characters, ASCII art and block-character progress bars such as ███░░. Icons are excluded because they break the pure-text premise; use characters like → and » instead.",
  },
  layout: {
    zh: "上限 1100px、容器内边距 16px，区块间距 32px。整页像一次滚动的会话记录：从 $ 命令开始，向下是输出、注释、下一组命令。行宽控制在 100 字符以内，保持终端阅读习惯。",
    en: "Capped at 1100px with 16px padding, sections 32px apart. The page reads as a scrolling session log: a $ command, then output, then comments, then the next command. Measure stays under one hundred characters to match terminal reading.",
  },
  dos: [
    { zh: "全站等宽字体，无例外", en: "Monospace everywhere, no exceptions" },
    { zh: "近黑底配荧光绿文字", en: "Near-black ground with phosphor-green text" },
    { zh: "内容是命令加输出的成对结构", en: "Content is paired command and output" },
    { zh: "注释以 # 开头并用蓝灰", en: "Comments start with # and use blue-grey" },
    { zh: "列表按列宽对齐", en: "Align lists by fixed column widths" },
    { zh: "光标用 steps(1) 硬切闪烁", en: "The cursor blinks on steps(1)" },
  ],
  donts: [
    { zh: "不要用无衬线或衬线字体", en: "No sans or serif faces" },
    { zh: "不要用白色或浅色背景", en: "No white or light grounds" },
    { zh: "不要用渐变与玻璃态", en: "No gradients or glassmorphism" },
    { zh: "不要用摄影与插画", en: "No photography or illustration" },
    { zh: "不要超过四种强调色", en: "No more than four accents" },
    { zh: "不要用厚阴影", en: "No heavy shadows" },
  ],
  promptGuide: {
    quickColors: {
      text: "#4af626",
      background: "#0a0e12",
      panel: "#0f141a",
      cyan: "#8be9fd",
      magenta: "#ff79c6",
      comment: "#6272a4",
    },
    prompts: [
      {
        zh: "做一个终端风面板：背景 #0f141a、2px 圆角、1px #1f2937 描边、内边距 16px、无阴影。顶部一行 12px #6272a4 的路径标头（如 ~/projects）。内容用 13px 等宽字体、行高 1.6：命令行以 $ 开头、色 #4af626，输出行缩进 16px、色 rgba(74,246,38,0.8)，注释行以 # 开头、色 #6272a4。页面底色 #0a0e12，底部固定一条 24px 高、荧光绿 15% 底的状态栏。",
        en: "Build a terminal panel: background #0f141a, 2px radius, a 1px #1f2937 border, 16px padding, no shadow. A 12px #6272a4 path header such as ~/projects caps it. Content runs 13px monospace on 1.6 leading: command lines open with $ in #4af626, output indents 16px in rgba(74,246,38,0.8), and comments start with # in #6272a4. The page ground is #0a0e12 with a fixed 24px status bar on a 15% phosphor ground at the bottom.",
      },
    ],
  },
  similar: [
    { name: "Cyberpunk Neon", why: { zh: "同为暗色科技感，但赛博朋克靠霓虹发光，终端靠磷光字符", en: "Both dark and technical, though cyberpunk glows neon while the terminal is phosphor text" } },
    { name: "Data Dense", why: { zh: "同样追求密度，但数据密集用表格与卡片，终端只有字符", en: "Both chase density, though dense data uses tables and cards while the terminal has only characters" } },
  ],
  completeness: "full",
};
