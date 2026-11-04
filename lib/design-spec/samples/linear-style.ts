import type { DesignSpec } from "../types";

export const linearStyleSpec: DesignSpec = {
  slug: "linear-style",
  name: "Linear 风格",
  nameEn: "Linear Style",
  cover: "/styles/linear-style.svg",
  theme: "dark",
  northStar: {
    zh: "近黑底、1px 白线、一支靛紫渐变：精密仪器般的工作界面。",
    en: "A near-black ground, 1px white rules and one indigo gradient — an interface built like a precision instrument.",
  },
  summary: {
    zh: "Linear 风格是近年产品界被模仿最多的暗色系统。它的层次极薄：底色近黑（#0a0a0b），面板只提亮 3% 到 6%，边框一律 1px 白色 10%，几乎没有阴影。唯一的颜色是靛紫到紫的渐变，只出现在主按钮与品牌标记上。交互的核心纪律是「只用不透明度」——hover 不改颜色，只把文字从 70% 提到 100%，把面板从 3% 提到 6%，过渡 150ms。这套克制让高密度的产品界面读起来安静。",
    en: "Linear is the most imitated dark system of the last few years. Its layers are extremely thin: a near-black ground (#0a0a0b), panels only three to six percent brighter, borders always 1px white at 10%, and almost no shadow. The only color is an indigo-to-violet gradient, reserved for the primary button and the mark. The interaction discipline is opacity only — hover never changes hue, it lifts text from 70% to 100% and a panel from 3% to 6%, over 150ms. That restraint is what makes a dense product surface read as quiet.",
  },
  colors: [
    {
      name: "近黑",
      nameEn: "Near Black",
      value: "#0a0a0b",
      group: "surface",
      role: {
        zh: "页面底。不用纯黑，否则面板提亮时没有对比空间。",
        en: "Page ground — not pure black, or brightened panels have nothing to move against.",
      },
      token: "--color-near-black",
    },
    {
      name: "面板",
      nameEn: "Panel",
      value: "rgba(255,255,255,0.03)",
      group: "surface",
      role: {
        zh: "卡片与行容器，hover 时升到 6%。全站唯一的分层手段。",
        en: "Cards and row containers, rising to 6% on hover — the only layering device in the system.",
      },
      token: "--color-panel",
    },
    {
      name: "靛紫",
      nameEn: "Indigo",
      value: "#5e6ad2",
      group: "brand",
      role: {
        zh: "主按钮起点、选中态与链接。全局唯一的品牌色。",
        en: "The primary button's start, selection and links — the single brand tone.",
      },
      token: "--color-indigo",
    },
    {
      name: "紫",
      nameEn: "Violet",
      value: "#8b5cf6",
      group: "brand",
      role: {
        zh: "渐变的终点。只与靛紫成对出现，不单独使用。",
        en: "The gradient's far end, appearing only alongside indigo.",
      },
      token: "--color-violet",
    },
    {
      name: "黄",
      nameEn: "Amber",
      value: "#f2c94c",
      group: "accent",
      role: {
        zh: "优先级与阻塞状态，只用于 8px 圆点与短标签。",
        en: "Priority and blocked states, on 8px dots and short labels only.",
      },
      token: "--color-amber",
    },
    {
      name: "绿",
      nameEn: "Green",
      value: "#27ae60",
      group: "accent",
      role: {
        zh: "已完成与在线，用于状态点。",
        en: "Done and presence, on status dots.",
      },
      token: "--color-green",
    },
    {
      name: "红",
      nameEn: "Red",
      value: "#eb5757",
      group: "accent",
      role: {
        zh: "紧急与错误，出现在状态点与删除动作上。",
        en: "Urgent and error, on status dots and destructive actions.",
      },
      token: "--color-red",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "-apple-system, 'SF Pro Text', system-ui, sans-serif",
      weights: [400, 500, 600],
      sizes: [11, 12, 13, 14, 16, 20, 24],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.5 },
      tracking: { display: "-0.01em", label: "0.02em" },
      role: {
        zh: "全站唯一字体，字级极小（11 到 14px）并统一 -0.01em 字距。密而清晰是这套风格的语气。",
        en: "The only face, running tiny at 11 to 14px with -0.01em tracking throughout. Dense yet clear is the tone.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "heading", weight: 600, size: 24, lineHeight: 1.25, tracking: "-0.01em", token: "--text-heading" },
    { role: "subheading", weight: 600, size: 20, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", weight: 500, size: 16, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 13, lineHeight: 1.5, token: "--text-body" },
    { role: "body-sm", weight: 400, size: 12, lineHeight: 1.45, token: "--text-body-sm" },
    { role: "label", weight: 500, size: 11, lineHeight: 1.4, tracking: "0.02em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 20, 24, 32, 48],
    maxWidth: 1280,
    sectionGap: 32,
    cardPadding: 20,
    elementGap: 8,
  },
  radii: [
    { element: "cards", value: "8px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "8px" },
    { element: "pills", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Near Black", value: "#0a0a0b", purpose: "页面底" },
    { level: 1, name: "Panel 3%", value: "rgba(255,255,255,0.03)", purpose: "卡片与行" },
    { level: 2, name: "Panel 6%", value: "rgba(255,255,255,0.06)", purpose: "hover 与浮层" },
  ],
  elevation: [
    { name: "None", value: "none — 1px borders only" },
    { name: "Flyout", value: "0 12px 32px rgba(0,0,0,0.55)" },
  ],
  components: [
    {
      name: "Gradient Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "靛紫到紫的横向渐变、白字、8px 圆角、无描边。字级 14px、字重 500、padding 8px 16px。hover 不换色，只把整体不透明度降到 90%；按下降到 80%。过渡 150ms，只动 opacity。",
        en: "A horizontal indigo-to-violet gradient, white text, 8px radius, no border. 14px type at weight 500, 8px 16px padding. Hover does not change hue — it drops the whole element to 90% opacity, and press to 80%. 150ms, animating opacity only.",
      },
      sizes: "padding 8px 16px; label 14px",
      states: "hover: opacity 90%; active: opacity 80%",
    },
    {
      name: "Issue Card",
      role: { zh: "卡片、列表行与看板项", en: "Cards, list rows and board items" },
      construction: {
        zh: "白 3% 填充、1px 白 10% 描边、8px 圆角、内边距 20px，无阴影。标题 14px/500 纯白，说明 12px 白 50%，时间戳 11px 白 40%。左侧放一个 16px 的状态圆环（2px 描边、按状态取色）。hover 时填充升到 6%，过渡 150ms。",
        en: "3% white fill, a 1px white border at 10%, 8px radius, 20px padding, no shadow. Title at 14px/500 in pure white, description at 12px in 50% white, timestamp at 11px in 40%. A 16px status ring with a 2px stroke sits on the left, colored by state. Hover raises the fill to 6% over 150ms.",
      },
      states: "hover: fill 3%→6%",
    },
    {
      name: "Dark Input",
      role: { zh: "表单与搜索", en: "Forms and search" },
      construction: {
        zh: "白 3% 填充、1px 白 10% 描边、8px 圆角、padding 8px 12px、13px 字。标签 12px 白 60%。聚焦时描边转靛紫 50%、填充升到 5%，不加外环。过渡 150ms。",
        en: "3% white fill, a 1px white border at 10%, 8px radius, 8px 12px padding at 13px. The label sits at 12px in 60% white. Focus turns the border to 50% indigo and the fill to 5%, with no outer ring. 150ms.",
      },
      states: "focus: border indigo 50%, fill 5%",
    },
    {
      name: "Command Bar",
      role: { zh: "顶部命令栏与浮层", en: "The top command bar and its flyout" },
      construction: {
        zh: "白 4% 填充、1px 白 10% 描边、12px 圆角、12px 模糊、内边距 8px。左侧搜索图标 16px、占位文字 13px 白 50%、右侧放一个 ⌘K 提示（11px、白 30%）。展开时容器高度 360px、选项行高 36px、hover 行填充白 6%。",
        en: "4% white fill, a 1px white border at 10%, 12px radius, 12px blur, 8px padding. A 16px search icon sits left, placeholder at 13px in 50% white, and a ⌘K hint at 11px in 30% on the right. Expanded, the container reaches 360px with 36px option rows hovering to a 6% white fill.",
      },
    },
  ],
  imagery: {
    zh: "几乎不用图像。允许头像 16px、状态圆点、极小的品牌标记。不使用摄影、插画与背景图，任何图像都会破坏这套系统的密度感。",
    en: "Almost no imagery: 16px avatars, status dots and a small brand mark. No photography, illustration or background images — any image breaks the density this system depends on.",
  },
  layout: {
    zh: "上限 1280px、容器内边距 16px，区块间距 32px，卡片间距 8px。左侧 240px 导航加右侧列表，列表行高 56px。整体密度接近桌面应用，留白只出现在区块之间。",
    en: "Capped at 1280px with 16px padding, sections 32px apart and 8px between cards. A 240px rail sits beside a list whose rows run 56px. Density approaches a desktop application; whitespace appears only between sections.",
  },
  dos: [
    { zh: "近黑底，不用纯黑", en: "Ground in near black, never pure black" },
    { zh: "分层只靠白 3% 与 6% 两档填充", en: "Layer with two fills only: 3% and 6% white" },
    { zh: "边框一律 1px 白 10%", en: "Borders are always 1px white at 10%" },
    { zh: "hover 只改不透明度，不改颜色", en: "Hover changes opacity, never hue" },
    { zh: "唯一渐变只给主按钮", en: "The one gradient belongs to the primary button" },
    { zh: "字级 11 到 14px，统一 -0.01em 字距", en: "Type runs 11 to 14px on -0.01em tracking" },
  ],
  donts: [
    { zh: "不要用浅色背景", en: "No light grounds" },
    { zh: "不要用彩色阴影或大面积阴影", en: "No colored shadows or large shadow spreads" },
    { zh: "不要引入第二种字体", en: "Never add a second typeface" },
    { zh: "不要用高饱和色，除品牌紫外", en: "No saturated color beyond the brand violet" },
    { zh: "不要靠阴影分层", en: "Do not layer with shadow" },
    { zh: "不要用超过 150ms 的动效", en: "No motion longer than 150ms" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ffffff",
      background: "#0a0a0b",
      panel: "rgba(255,255,255,0.03)",
      accent: "#5e6ad2",
      muted: "#8a8a94",
      border: "rgba(255,255,255,0.10)",
    },
    prompts: [
      {
        zh: "做一个 Linear 风格卡片：背景 rgba(255,255,255,0.03)、1px rgba(255,255,255,0.1) 描边、8px 圆角、内边距 20px、无阴影。标题 14px/500 纯白，说明 12px rgba(255,255,255,0.5)。hover 时背景升到 rgba(255,255,255,0.06)，transition 150ms。页面底色 #0a0a0b，主按钮用 linear-gradient(to right, #5e6ad2, #8b5cf6)。",
        en: "Build a Linear-style card: background rgba(255,255,255,0.03), 1px rgba(255,255,255,0.1) border, 8px radius, 20px padding, no shadow. Title at 14px/500 in pure white, description at 12px in rgba(255,255,255,0.5). Hover raises the background to rgba(255,255,255,0.06) over 150ms. The page ground is #0a0a0b and the primary button uses linear-gradient(to right, #5e6ad2, #8b5cf6).",
      },
    ],
  },
  similar: [
    { name: "Dark Mode", why: { zh: "同为暗色系统，但 Linear 更薄、更依赖不透明度", en: "Also dark, though Linear is thinner and leans entirely on opacity" } },
    { name: "macOS Vibrancy", why: { zh: "同样追求精密感，那边用系统材质与衬线标题", en: "Also pursues precision, though that one uses system material and serif titles" } },
  ],
  completeness: "full",
};
