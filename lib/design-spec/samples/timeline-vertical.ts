import type { DesignSpec } from "../types";

export const timelineVerticalSpec: DesignSpec = {
  slug: "timeline-vertical",
  name: "垂直时间线布局",
  nameEn: "Vertical Timeline",
  cover: "/styles/timeline-vertical.svg",
  theme: "light",
  northStar: {
    zh: "一条贯穿的线，把时间钉在上面：左右交替，节奏由节点控制。",
    en: "One continuous line with time pinned to it — alternating sides, rhythm set by the nodes.",
  },
  summary: {
    zh: "垂直时间线是把「先后」变成「上下」的布局：一条 2px 的连接线居中贯穿，节点按时间顺序排列，桌面上左右交替，移动端收成单侧。它有三条技术纪律——连接线不能断、节点尺寸必须一致、移动端必须放弃双侧交替。视觉上连接线要足够弱（板岩 25%），让节点和卡片承担注意力；节点 hover 时圆环放大并填充主色，卡片同时抬升，两者必须联动而不是只有卡片动。",
    en: "A vertical timeline turns sequence into vertical position: a 2px connector runs down the centre with nodes ordered in time, alternating left and right on desktop and collapsing to one side on mobile. Three rules hold it together — the line never breaks, node sizes never vary, and mobile abandons the alternation entirely. The line stays weak (slate at 25%) so nodes and cards carry attention; hovering a node scales its ring and fills it with the primary while the card lifts, and the two must move together rather than the card alone.",
  },
  colors: [
    {
      name: "板岩",
      nameEn: "Slate",
      value: "#1e293b",
      group: "brand",
      role: {
        zh: "标题与主文字。连接线也用它，但只有 25% 不透明度。",
        en: "Headings and primary text — the connector uses the same tone at just 25% opacity.",
      },
      token: "--color-slate",
    },
    {
      name: "浅雾",
      nameEn: "Haze",
      value: "#f8fafc",
      group: "surface",
      role: {
        zh: "页面底与交替区块。让白卡片浮起来。",
        en: "Page ground and alternating sections, giving white cards something to lift from.",
      },
      token: "--color-haze",
    },
    {
      name: "主蓝",
      nameEn: "Primary Blue",
      value: "#3b82f6",
      group: "accent",
      role: {
        zh: "当前节点、主按钮与链接。时间线里表示「你在这里」。",
        en: "The current node, primary buttons and links — the timeline's 'you are here'.",
      },
      token: "--color-primary-blue",
    },
    {
      name: "完成绿",
      nameEn: "Done Green",
      value: "#10b981",
      group: "accent",
      role: {
        zh: "已经过去的节点与已完成里程碑。",
        en: "Past nodes and completed milestones.",
      },
      token: "--color-done-green",
    },
    {
      name: "待办橙",
      nameEn: "Pending Amber",
      value: "#f59e0b",
      group: "accent",
      role: {
        zh: "即将到来与需要注意的节点。",
        en: "Upcoming nodes and those needing attention.",
      },
      token: "--color-pending-amber",
    },
    {
      name: "异常红",
      nameEn: "Alert Red",
      value: "#ef4444",
      group: "accent",
      role: {
        zh: "延期与失败的节点，出现即表示时间线有断点。",
        en: "Delayed and failed nodes — its presence marks a break in the sequence.",
      },
      token: "--color-alert-red",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 13, 15, 18, 22, 28],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.6 },
      tracking: { display: "-0.01em", label: "0.06em" },
      role: {
        zh: "全站唯一字体。时间与序号用 12px 全大写加宽字距，正文 15px。",
        en: "The only face. Times and sequence numbers run 12px uppercase on wide tracking; body sits at 15px.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 28, lineHeight: 1.2, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", weight: 600, size: 22, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", weight: 600, size: 18, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 500, size: 15, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 13, lineHeight: 1.55, token: "--text-body" },
    { role: "label", weight: 600, size: 12, lineHeight: 1.4, tracking: "0.06em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 960,
    sectionGap: 48,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "12px" },
    { element: "buttons", value: "8px" },
    { element: "nodes", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Haze", value: "#f8fafc", purpose: "页面底" },
    { level: 1, name: "Card White", value: "#ffffff", purpose: "节点卡片" },
  ],
  elevation: [
    { name: "Card", value: "0 2px 8px rgba(15,23,42,0.06)" },
    { name: "Card hover", value: "0 8px 24px rgba(15,23,42,0.10)" },
    { name: "Current node", value: "0 0 0 4px rgba(59,130,246,0.20)" },
  ],
  components: [
    {
      name: "Timeline Node",
      role: { zh: "时间线上的节点圆环", en: "The node ring on the line" },
      construction: {
        zh: "20px 圆、2px 板岩 30% 描边、白底，垂直对齐连接线。当前节点填主蓝并加 4px 的主蓝 20% 外环；过去节点填完成绿；待办保持白底。hover 时圆环放大到 1.25 并填充主色，与卡片联动（卡片同时上浮 2px）。过渡 150ms。",
        en: "A 20px circle with a 2px slate border at 30% on white, aligned to the connector. The current node fills primary and carries a 4px ring at 20%; past nodes fill done green; upcoming nodes stay white. Hover scales the ring to 1.25 and fills it primary, in lockstep with the card, which lifts 2px. 150ms.",
      },
      sizes: "20px diameter",
      states: "hover: scale 1.25, fill primary, card lifts",
    },
    {
      name: "Timeline Card",
      role: { zh: "时间节点卡片", en: "The node card" },
      construction: {
        zh: "白底、12px 圆角、1px #e2e8f0 描边、内边距 24px，阴影 0 2px 8px。卡片宽度占单侧栏的 100%，与节点之间留 24px。上方 12px 全大写时间标签（灰色），下方 18px/600 标题与 13px 正文。hover 时上浮 2px、阴影扩到 24px。",
        en: "White fill, 12px radius, a 1px #e2e8f0 border, 24px padding, shadow 0 2px 8px. The card fills its column and sits 24px from the node. A 12px uppercase time label in grey sits above an 18px/600 title and 13px body. Hover lifts 2px and widens the shadow to 24px.",
      },
    },
    {
      name: "Connector Line",
      role: { zh: "中央连接线", en: "The centre connector" },
      construction: {
        zh: "2px 宽、板岩 25%、居中贯穿整个时间线，用伪元素从第一节点画到最后一个节点，不允许断裂。若两个节点间距超过 96px，说明内容过长，应拆分而不是拉长线。",
        en: "2px wide in slate at 25%, running down the centre from the first node to the last via pseudo elements, never breaking. If two nodes sit more than 96px apart, the content is too long — split it rather than stretch the line.",
      },
    },
    {
      name: "Time Filter",
      role: { zh: "时间筛选器", en: "Time filters" },
      construction: {
        zh: "横向一排胶囊按钮，高 32px、padding 0 14px、12px/600。默认白底 1px 描边，选中态主蓝填白字。用于按年或阶段筛选节点，切换时节点列表做 200ms 的错峰淡入。",
        en: "A row of pill buttons, 32px tall, 0 14px padding at 12px/600. Default is a white fill with a 1px border; selection fills primary with white text. They filter nodes by year or phase, and switching staggers the node list in over 200ms.",
      },
    },
  ],
  imagery: {
    zh: "以图标与头像为主，允许每个节点配一张 16:10 的小图。不使用全幅背景图，时间线需要干净的纵向空间。",
    en: "Icons and avatars lead, with an optional 16:10 thumbnail per node. No full-bleed backgrounds — the timeline needs a clean vertical channel.",
  },
  layout: {
    zh: "上限 960px。桌面为中央线加左右交替（各 44% 宽、间隙 12%），节点在每张卡片靠近中线的一侧。移动端收成单侧左对齐，线移到最左 16px 处。节点之间至少 48px，最多不超过 96px。",
    en: "Capped at 960px. Desktop uses a centre line with alternating sides at 44% each and a 12% gap, with each node on the card's inner edge. Mobile collapses to a single left-aligned column with the line at 16px from the edge. Nodes sit at least 48px apart and never more than 96px.",
  },
  dos: [
    { zh: "连接线不许断裂或错位", en: "The connector never breaks or misaligns" },
    { zh: "节点尺寸全部一致", en: "Every node is the same size" },
    { zh: "移动端收成单侧", en: "Collapse to one side on mobile" },
    { zh: "每个节点必须有时间或序号", en: "Every node carries a time or sequence label" },
    { zh: "节点与卡片交互联动", en: "Node and card interact together" },
    { zh: "节点间距 48 到 96px", en: "Nodes sit 48 to 96px apart" },
  ],
  donts: [
    { zh: "不要让连接线断开", en: "Do not break the connector" },
    { zh: "不要用不一致的节点尺寸", en: "No inconsistent node sizes" },
    { zh: "不要在移动端保留双侧交替", en: "Do not keep alternation on mobile" },
    { zh: "不要省略时间标识", en: "Never omit the time label" },
    { zh: "不要让内容过长拉长连接线", en: "Do not stretch the line with overlong content" },
    { zh: "不要只让卡片动而节点不动", en: "Do not animate the card while the node stays still" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1e293b",
      background: "#f8fafc",
      card: "#ffffff",
      accent: "#3b82f6",
      done: "#10b981",
      border: "#e2e8f0",
    },
    prompts: [
      {
        zh: "做一个垂直时间线：中央 2px rgba(30,41,59,0.25) 连接线贯穿，节点为 20px 圆（2px rgba(30,41,59,0.3) 描边、白底），当前节点填 #3b82f6 并加 4px 的 rgba(59,130,246,0.2) 外环。卡片白底、12px 圆角、1px #e2e8f0 描边、内边距 24px、阴影 0 2px 8px rgba(15,23,42,0.06)。桌面左右交替（各 44% 宽、间隙 12%），移动端单侧左对齐。",
        en: "Build a vertical timeline: a 2px rgba(30,41,59,0.25) connector down the centre with 20px circular nodes (2px rgba(30,41,59,0.3) border on white). The current node fills #3b82f6 with a 4px rgba(59,130,246,0.2) ring. Cards are white with a 12px radius, 1px #e2e8f0 border, 24px padding and a shadow of 0 2px 8px rgba(15,23,42,0.06). Desktop alternates at 44% each with a 12% gap; mobile collapses to one left-aligned column.",
      },
    ],
  },
  similar: [
    { name: "F-Pattern Layout", why: { zh: "同样以读序为布局依据，但 F 型是横竖扫描，时间线是纵向序列", en: "Both let reading order drive layout, though F-pattern scans and the timeline sequences" } },
    { name: "Sidebar Fixed", why: { zh: "同样有常驻纵轴，但那条轴是导航而非时间", en: "Both keep a persistent vertical axis, though that one is navigation rather than time" } },
  ],
  completeness: "full",
};
