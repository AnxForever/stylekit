import type { DesignSpec } from "../types";

export const githubStyleSpec: DesignSpec = {
  slug: "github-style",
  name: "GitHub 风格",
  nameEn: "GitHub Style",
  cover: "/styles/github-style.svg",
  theme: "light",
  northStar: {
    zh: "灰度做结构，蓝只做交互，颜色永远带语义。",
    en: "Greyscale builds the structure, blue handles interaction, and color always carries meaning.",
  },
  summary: {
    zh: "GitHub 风格是开发者工具的默认语言：绝大部分界面由灰阶组成（白、#f6f8fa、#d0d7de、#656d76、#1f2328 五档），蓝色 #0969da 只用于可点击的东西，绿黄红三色只有语义（通过、警告、失败）。圆角统一 6px，边框统一 1px #d0d7de，阴影几乎为零。代码块用等宽字体加浅灰底，是它最重要的识别元素。它禁止渐变、禁止重阴影、禁止非语义的装饰色、禁止衬线字体、也禁止动感十足的动画。",
    en: "GitHub Style is the default language of developer tooling: most of the surface is greyscale (white, #f6f8fa, #d0d7de, #656d76, #1f2328 across five steps), blue #0969da appears only on things you can click, and green, yellow and red exist only as semantics — pass, warning, failure. Radius is uniformly 6px, borders are 1px #d0d7de, and shadow is nearly absent. Code blocks in monospace on a light grey ground are its most recognisable element. Gradients, heavy shadows, non-semantic decorative color, serif type and lively animation are all refused.",
  },
  colors: [
    {
      name: "交互蓝",
      nameEn: "Link Blue",
      value: "#0969da",
      group: "brand",
      role: {
        zh: "唯一的主色，只用于链接、主按钮与选中状态。",
        en: "The only primary, used strictly on links, primary buttons and selection.",
      },
      token: "--color-link-blue",
    },
    {
      name: "纯白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "卡片与内容区底。与浅灰底形成唯一的分层手段。",
        en: "Cards and content grounds — the only layering device against the light grey page.",
      },
      token: "--color-white",
    },
    {
      name: "浅灰底",
      nameEn: "Canvas Grey",
      value: "#f6f8fa",
      group: "surface",
      role: {
        zh: "页面底与代码块底。整套界面的地基。",
        en: "The page canvas and code-block ground — the foundation of the whole interface.",
      },
      token: "--color-canvas-grey",
    },
    {
      name: "边框灰",
      nameEn: "Border Grey",
      value: "#d0d7de",
      group: "neutral",
      role: {
        zh: "所有 1px 边框与分隔线，统一只用这一个值。",
        en: "Every 1px border and divider — this one value and nothing else.",
      },
      token: "--color-border-grey",
    },
    {
      name: "次文字灰",
      nameEn: "Muted Grey",
      value: "#656d76",
      group: "neutral",
      role: {
        zh: "元数据、时间戳与说明文字。",
        en: "Metadata, timestamps and captions.",
      },
      token: "--color-muted-grey",
    },
    {
      name: "主文字",
      nameEn: "Ink",
      value: "#1f2328",
      group: "brand",
      role: {
        zh: "标题与正文。带一点蓝的深灰，比纯黑柔和。",
        en: "Headings and body — a blue-cast dark grey, softer than pure black.",
      },
      token: "--color-ink",
    },
    {
      name: "通过绿",
      nameEn: "Success",
      value: "#1f883d",
      group: "accent",
      role: {
        zh: "通过、已合并、成功，语义专用。",
        en: "Passing, merged, success — semantic only.",
      },
      token: "--color-success",
    },
    {
      name: "警告黄",
      nameEn: "Warning",
      value: "#9a6700",
      group: "accent",
      role: {
        zh: "待处理与需要注意，语义专用。",
        en: "Pending and needs attention — semantic only.",
      },
      token: "--color-warning",
    },
    {
      name: "失败红",
      nameEn: "Danger",
      value: "#cf222e",
      group: "accent",
      role: {
        zh: "失败、删除与冲突，语义专用。",
        en: "Failure, deletion and conflict — semantic only.",
      },
      token: "--color-danger",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "-apple-system, 'Segoe UI', system-ui, sans-serif",
      weights: [400, 500, 600],
      sizes: [12, 13, 14, 16, 20, 24],
      lineHeight: { display: 1.25, heading: 1.3, body: 1.5 },
      tracking: { display: "-0.01em", label: "0.02em" },
      role: {
        zh: "界面文字，字级偏小（12 到 16px 为主），极少超过 24px。",
        en: "Interface text at small sizes, mostly 12 to 16px and rarely above 24px.",
      },
      token: "--font-sans",
    },
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, SFMono-Regular, Menlo, monospace",
      weights: [400, 500],
      sizes: [12, 13, 14],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.5 },
      tracking: { display: "0", label: "0.02em" },
      role: {
        zh: "代码块、分支名、commit hash 与命令行。等宽是这套风格的识别核心。",
        en: "Code blocks, branch names, commit hashes and command lines — the monospace is its core identifier.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "heading-lg", weight: 600, size: 24, lineHeight: 1.25, token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 20, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", weight: 600, size: 16, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.5, token: "--text-body" },
    { role: "body-sm", weight: 400, size: 13, lineHeight: 1.5, token: "--text-body-sm" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.02em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32, 48],
    maxWidth: 1280,
    sectionGap: 24,
    cardPadding: 16,
    elementGap: 8,
  },
  radii: [
    { element: "cards", value: "6px" },
    { element: "buttons", value: "6px" },
    { element: "inputs", value: "6px" },
    { element: "pills", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Canvas Grey", value: "#f6f8fa", purpose: "页面底" },
    { level: 1, name: "White", value: "#ffffff", purpose: "卡片与列表容器" },
  ],
  elevation: [
    { name: "None", value: "none — 1px #d0d7de borders only" },
    { name: "Overlay", value: "0 8px 24px rgba(31,35,40,0.12)" },
  ],
  components: [
    {
      name: "Primary Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "通过绿 #1f883d 填充、白字、6px 圆角、1px rgba(31,35,40,0.15) 描边、无阴影，14px/500、padding 5px 16px。hover 时填充加深到 #1a7f37；按下内阴影 inset 0 1px 0 rgba(31,35,40,0.10)。过渡 80ms。注意主按钮是绿色而链接是蓝色，两者分工不混。",
        en: "Success green #1f883d fill, white text, 6px radius, a 1px rgba(31,35,40,0.15) border, no shadow, 14px/500, 5px 16px padding. Hover deepens the fill to #1a7f37; press adds an inset 0 1px 0 shadow at 10%. 80ms. The primary button is green while links are blue, and the two never swap roles.",
      },
      sizes: "padding 5px 16px; label 14px",
      states: "hover: darker fill; active: inset shadow",
    },
    {
      name: "Repo Card",
      role: { zh: "仓库卡与内容卡", en: "Repository and content cards" },
      construction: {
        zh: "白底、6px 圆角、1px #d0d7de 描边、内边距 16px、无阴影。标题 16px/600 用交互蓝（可点击），描述 14px 主文字，底部一行 12px 次灰放语言色点、star 数与更新时间。hover 时描边颜色不变，只让标题加下划线。",
        en: "White fill, 6px radius, a 1px #d0d7de border, 16px padding, no shadow. The title runs 16px/600 in link blue as the clickable element, description at 14px ink, and a 12px muted line below with a language dot, star count and update time. Hover leaves the border alone and simply underlines the title.",
      },
    },
    {
      name: "Code Block",
      role: { zh: "代码块（识别核心）", en: "The code block, the identifying element" },
      construction: {
        zh: "浅灰 #f6f8fa 底、6px 圆角、1px #d0d7de 描边、内边距 16px，字体 JetBrains Mono 13px、行高 1.5、可横向滚动。语法高亮只用五到六种色，且不改变字重。右上角可放一个复制按钮（12px、次灰）。",
        en: "A #f6f8fa ground, 6px radius, a 1px #d0d7de border, 16px padding, JetBrains Mono at 13px on 1.5 leading, horizontally scrollable. Syntax highlighting uses five or six colors and never changes weight. A 12px muted copy button may sit top-right.",
      },
    },
    {
      name: "State Label",
      role: { zh: "状态标签与徽标", en: "State labels and badges" },
      construction: {
        zh: "999px 全圆角、语义色 10% 底、语义色文字、1px 同色 25% 描边、12px/500、padding 2px 10px。通过用绿、待处理用黄、失败用红、信息用蓝。每个标签必须带文字，颜色只是辅助。",
        en: "Fully rounded on a 10% semantic ground with semantic text and a 1px border at 25%, 12px/500, 2px 10px padding. Green for passing, yellow for pending, red for failure, blue for info. Every label carries text; color only assists.",
      },
    },
    {
      name: "Side Nav",
      role: { zh: "侧边导航与筛选", en: "Side navigation and filters" },
      construction: {
        zh: "白底或透明、宽 240px、无右边框。项目高 32px、6px 圆角、14px 字，选中项用 #f6f8fa 底加 2px 交互蓝左边条。分组标题 12px/600 次灰，上方间距 16px。",
        en: "White or transparent at 240px wide with no right border. Items are 32px tall on a 6px radius at 14px, with selection using a #f6f8fa ground plus a 2px link-blue left bar. Group headings sit 16px above at 12px/600 in muted grey.",
      },
    },
  ],
  imagery: {
    zh: "几乎没有图像。允许头像 20 到 40px、图标 16px、语言色点 8px。不使用插画、摄影与背景图，界面本身就是内容。",
    en: "Almost no imagery: avatars at 20 to 40px, 16px icons, 8px language dots. No illustration, photography or backgrounds — the interface is the content.",
  },
  layout: {
    zh: "上限 1280px、容器内边距 16px，区块间距 24px，卡片间距 16px。典型结构是左侧 240px 导航加右侧内容区，内容区里列表项行高 56px。密度接近桌面应用，留白只出现在区块之间。",
    en: "Capped at 1280px with 16px padding, 24px between sections and 16px between cards. The structure is a 240px rail beside a content area whose list rows run 56px. Density approaches a desktop application, with whitespace only between sections.",
  },
  dos: [
    { zh: "五档灰阶承担结构", en: "Five greyscale steps carry the structure" },
    { zh: "蓝色只用于可点击元素", en: "Blue appears only on clickable elements" },
    { zh: "绿黄红只表达语义", en: "Green, yellow and red express semantics only" },
    { zh: "圆角统一 6px，边框统一 #d0d7de", en: "Radius is always 6px, borders always #d0d7de" },
    { zh: "代码块用等宽加浅灰底", en: "Code blocks use monospace on a light grey ground" },
    { zh: "动效 80ms 以内，无弹跳", en: "Motion stays under 80ms with no bounce" },
  ],
  donts: [
    { zh: "不要用渐变背景或彩色装饰", en: "No gradient backgrounds or colorful decoration" },
    { zh: "不要用重阴影", en: "No heavy shadows" },
    { zh: "不要用非语义的装饰色", en: "No non-semantic decorative color" },
    { zh: "不要用衬线字体", en: "No serif type" },
    { zh: "不要用过大字号或过宽间距", en: "No oversized type or excessive spacing" },
    { zh: "不要用动感十足的动画", en: "No lively animation" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1f2328",
      background: "#f6f8fa",
      card: "#ffffff",
      primary: "#0969da",
      border: "#d0d7de",
      muted: "#656d76",
    },
    prompts: [
      {
        zh: "做一个 GitHub 风格仓库卡：白底、6px 圆角、1px #d0d7de 描边、内边距 16px、无阴影。标题 16px/600 #0969da，描述 14px #1f2328，底部一行 12px #656d76 放语言色点、star 数与更新时间。hover 时只给标题加下划线。页面底色 #f6f8fa。代码块用 #f6f8fa 底、13px 等宽字体、1px #d0d7de 描边、6px 圆角。",
        en: "Build a GitHub-style repository card: white fill, 6px radius, a 1px #d0d7de border, 16px padding, no shadow. Title at 16px/600 in #0969da, description at 14px #1f2328, and a 12px #656d76 line below with a language dot, star count and update time. Hover only underlines the title. The page ground is #f6f8fa, and code blocks use a #f6f8fa ground with 13px monospace, a 1px #d0d7de border and a 6px radius.",
      },
    ],
  },
  similar: [
    { name: "Notion Style", why: { zh: "同样低刺激，但 Notion 更偏文档，GitHub 更偏代码与状态", en: "Both low-stimulus, though Notion leans documents while GitHub leans code and state" } },
    { name: "Linear Style", why: { zh: "同为工具界面，但 Linear 是暗色、GitHub 是灰阶亮色", en: "Both tool interfaces, though Linear is dark while GitHub is light greyscale" } },
  ],
  completeness: "full",
};
