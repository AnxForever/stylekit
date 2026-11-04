import type { DesignSpec } from "../types";

export const skeuomorphismSpec: DesignSpec = {
  slug: "skeuomorphism",
  name: "拟物设计",
  nameEn: "Skeuomorphism",
  cover: "/styles/skeuomorphism.svg",
  theme: "light",
  northStar: {
    zh: "每个控件都是一件实物：皮革、木头、金属，有厚度也有高光。",
    en: "Every control is an object: leather, wood, metal — with thickness and a highlight.",
  },
  summary: {
    zh: "拟物设计把界面做成实物：面板像皮革或木纹，按钮像金属片，纸张像米色信纸。它的技术核心是「双内阴影加一段渐变」——顶部 inset 0 1px 0 白色 70% 是受光面，底部 inset 0 -1px 0 黑色 12% 是转折暗线，外阴影提供离地高度，再叠一层 3% 的纹理点阵作为材质。它在新拟物与扁平之间走了第三条路：不靠单色，而靠光与材质。代价是每个组件都需要精细调光，粗糙实现会立刻显得廉价。",
    en: "Skeuomorphism builds the interface out of objects: panels read as leather or wood, buttons as metal plates, paper as cream letter stock. The technical core is a double inner shadow plus one gradient — inset 0 1px 0 white at 70% along the top is the lit face, inset 0 -1px 0 black at 12% along the bottom is the fold, an outer shadow provides altitude, and a 3% dot texture supplies the material. It takes a third path between neumorphism and flat design: not one color, but light and material. The cost is that every component needs careful lighting; a rough implementation reads as cheap immediately.",
  },
  colors: [
    {
      name: "皮革",
      nameEn: "Leather",
      value: "#8b7355",
      group: "brand",
      role: {
        zh: "深色面板与主按钮底，模拟做旧皮革。带细微颗粒纹理。",
        en: "Dark panels and primary button grounds, imitating aged leather with a fine grain.",
      },
      token: "--color-leather",
    },
    {
      name: "木色",
      nameEn: "Wood",
      value: "#d4c4a8",
      group: "surface",
      role: {
        zh: "卡片与浅色面板，模拟浅木与纸板。比皮革亮两档。",
        en: "Cards and light panels, standing in for pale wood and board — two steps above leather.",
      },
      token: "--color-wood",
    },
    {
      name: "金属",
      nameEn: "Metal",
      value: "#c0c0c0",
      group: "surface",
      role: {
        zh: "按钮与滑块的金属面，必须配纵向渐变才有反射感。",
        en: "Button and slider faces; they need a vertical gradient to read as reflective.",
      },
      token: "--color-metal",
    },
    {
      name: "纸",
      nameEn: "Paper",
      value: "#f5f5dc",
      group: "surface",
      role: {
        zh: "页面与信纸底色，模拟米色书写纸。",
        en: "The page and letter-stock ground, imitating cream writing paper.",
      },
      token: "--color-paper",
    },
    {
      name: "黄铜",
      nameEn: "Brass",
      value: "#c9a227",
      group: "accent",
      role: {
        zh: "金属扣件与主强调，用于图标、刻度与选中状态。",
        en: "Metal fittings and primary emphasis, on icons, scales and selection.",
      },
      token: "--color-brass",
    },
    {
      name: "深棕",
      nameEn: "Dark Brown",
      value: "#5c4033",
      group: "accent",
      role: {
        zh: "深色文字与压印凹槽，模拟烧灼与刻痕。",
        en: "Dark text and debossed grooves, imitating burns and engraving.",
      },
      token: "--color-dark-brown",
    },
    {
      name: "森林绿",
      nameEn: "Forest",
      value: "#2e5a3c",
      group: "accent",
      role: {
        zh: "成功与「已启用」状态，像老式仪表的绿色刻度。",
        en: "Success and enabled states, like the green scale on an old gauge.",
      },
      token: "--color-forest",
    },
  ],
  fonts: [
    {
      family: "Georgia",
      substitute: "'Times New Roman', 'Songti SC', serif",
      weights: [400, 700],
      sizes: [13, 15, 17, 22, 30, 40],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.65 },
      tracking: { display: "0", label: "0.1em" },
      role: {
        zh: "标题与带刻度的标签。衬线让文字像被印在材质上而不是浮在屏幕上。",
        en: "Headings and engraved labels — a serif makes text feel printed into the material rather than floating on a screen.",
      },
      token: "--font-serif",
    },
    {
      family: "Verdana",
      substitute: "'Segoe UI', system-ui, sans-serif",
      weights: [400, 700],
      sizes: [12, 14, 16],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.6 },
      tracking: { display: "0", label: "0.1em" },
      role: {
        zh: "界面文字与数值。略带方正的无衬线像老设备的面板字。",
        en: "Interface text and figures — a squarish sans that reads like panel lettering on old equipment.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", font: "Georgia", weight: 700, size: 40, lineHeight: 1.15, token: "--text-display" },
    { role: "heading", font: "Georgia", weight: 700, size: 30, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", font: "Georgia", weight: 400, size: 22, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", font: "Verdana", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", font: "Verdana", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", font: "Verdana", weight: 700, size: 12, lineHeight: 1.4, tracking: "0.1em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1080,
    sectionGap: 64,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "12px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "6px" },
    { element: "knobs", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Paper", value: "#f5f5dc", purpose: "页面底" },
    { level: 1, name: "Wood Panel", value: "#d4c4a8", purpose: "卡片与面板" },
    { level: 2, name: "Leather", value: "#8b7355", purpose: "深色面板与工具栏" },
  ],
  elevation: [
    {
      name: "Raised panel",
      value: "0 8px 16px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.70), inset 0 -1px 0 rgba(0,0,0,0.12)",
    },
    {
      name: "Recessed well",
      value: "inset 0 2px 6px rgba(0,0,0,0.25), inset 0 -1px 0 rgba(255,255,255,0.45)",
    },
    { name: "Metal button", value: "0 3px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.85)" },
  ],
  components: [
    {
      name: "Metal Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "纵向金属渐变（#d8d8d8 到 #a8a8a8）、深棕文字、8px 圆角、1px #7a7a7a 描边，阴影为 0 3px 6px 黑 25% 加 inset 0 1px 0 白 85%，字级 14px/700、字距 0.1em、padding 10px 24px。hover 时渐变整体提亮 6%、外阴影加深；按下时渐变反向（上暗下亮）并换成 inset 0 2px 6px 黑 30%。过渡 150ms。",
        en: "A vertical metal gradient (#d8d8d8 to #a8a8a8), dark brown text, 8px radius, a 1px #7a7a7a border, shadow 0 3px 6px at 25% black plus inset 0 1px 0 white at 85%. 14px type at weight 700, 0.1em tracking, 10px 24px padding. Hover brightens the whole gradient by six percent and deepens the outer shadow; press inverts the gradient and swaps to inset 0 2px 6px at 30% black. 150ms.",
      },
      sizes: "padding 10px 24px; label 14px",
      states: "hover: brighter gradient; active: inverted gradient, inset shadow",
    },
    {
      name: "Leather Panel",
      role: { zh: "深色面板与工具栏", en: "Dark panels and toolbars" },
      construction: {
        zh: "皮革色填充配 3% 点阵纹理（radial-gradient 的 5px 网格）、12px 圆角、内边距 24px，阴影 0 8px 16px 黑 20% 加顶边白 70% 高光与底边黑 12% 暗线。面板内文字用米色，标签 12px/700、0.1em 字距，像刻上去的。",
        en: "Leather fill with a 3% dot texture on a 5px grid, 12px radius, 24px padding, shadow 0 8px 16px at 20% black plus a 70% white top highlight and a 12% black bottom line. Text inside runs cream, with labels at 12px/700 on 0.1em tracking, as if engraved.",
      },
    },
    {
      name: "Inset Well",
      role: { zh: "输入框与凹槽区域", en: "Inputs and recessed areas" },
      construction: {
        zh: "木色填充、6px 圆角、1px #b8a88c 描边，阴影全部朝内：inset 0 2px 6px 黑 25% 加 inset 0 -1px 0 白 45%，形成凹陷。padding 8px 12px、14px 字。聚焦时内阴影加深到 8px 并加 2px 黄铜外环。",
        en: "Wood fill, 6px radius, a 1px #b8a88c border, with every shadow pointing inward: inset 0 2px 6px at 25% black plus inset 0 -1px 0 white at 45%, producing the recess. 8px 12px padding at 14px. Focus deepens the inner shadow to 8px and adds a 2px brass ring.",
      },
    },
    {
      name: "Brass Knob",
      role: { zh: "滑块与旋钮控件", en: "Slider and knob controls" },
      construction: {
        zh: "24px 圆形、镜像径变（linear-gradient 135deg，#e8d48a 到 #9a7a1e）、1px #7a5f14 描边，阴影 0 2px 4px 黑 30% 加 inset 0 1px 1px 白 80% 加 inset 0 -1px 2px 黑 25%。hover 时旋转 8 度；按下时内阴影加深。",
        en: "24px circle with a mirrored gradient (linear-gradient 135deg, #e8d48a to #9a7a1e), a 1px #7a5f14 border, shadow 0 2px 4px at 30% black plus inset 0 1px 1px white at 80% and inset 0 -1px 2px at 25% black. Hover rotates eight degrees; press deepens the inner shadow.",
      },
    },
    {
      name: "Ribbon Header",
      role: { zh: "页头与分区标题条", en: "Header and section title bars" },
      construction: {
        zh: "深棕填充、底部 3px 黄铜边线、无圆角、内边距 12px 24px，顶部 1px 白 15% 高光。标题 22px 衬线、米色、字距 0.1em，左对齐并带 24px 的图标位。",
        en: "Dark brown fill, a 3px brass rule along the bottom, square corners, 12px 24px padding, with a 1px top highlight at 15% white. Titles run 22px serif in cream at 0.1em tracking, flush left with a 24px icon slot.",
      },
    },
  ],
  imagery: {
    zh: "真实材质照片：皮革纹理、木纹、金属拉丝、装订线。允许把纹理以 3% 到 8% 的不透明度叠在面板上。不使用扁平插画与现代渐变，它们会毁掉材质假设。",
    en: "Real material photography: leather grain, wood, brushed metal, stitching. Textures may overlay panels at 3% to 8% opacity. No flat illustration or modern gradients — both destroy the material premise.",
  },
  layout: {
    zh: "上限 1080px、容器内边距 24px，区块间距 64px。整体像一台设备的面板：分区用凹槽与凸起代替留白，工具栏可带皮革底，内容区像纸张。控件之间至少 12px，保证阴影不互相污染。",
    en: "Capped at 1080px with 24px padding, sections 64px apart. The page reads as a device panel: regions divide by recess and relief rather than whitespace, toolbars may sit on leather, and content areas behave like paper. Controls keep at least 12px between them so shadows do not bleed.",
  },
  dos: [
    { zh: "每个控件都要有顶高光与底暗线", en: "Every control carries a top highlight and a bottom line" },
    { zh: "用材质纹理，但不超过 8% 不透明度", en: "Use material texture, never above 8% opacity" },
    { zh: "凸起用外阴影，凹陷用内阴影", en: "Outer shadow for raised, inner shadow for recessed" },
    { zh: "金属面必须有纵向渐变", en: "Metal faces need a vertical gradient" },
    { zh: "文字用衬线，像刻进材质", en: "Set text in serif, as if engraved" },
    { zh: "控件间距至少 12px", en: "Keep at least 12px between controls" },
  ],
  donts: [
    { zh: "不要用纯扁平色块", en: "No flat solid blocks" },
    { zh: "不要省略阴影与高光", en: "Never omit shadow and highlight" },
    { zh: "不要用过简的线条图标", en: "No over-simplified line icons" },
    { zh: "不要用现代渐变与玻璃态", en: "No modern gradients or glass effects" },
    { zh: "不要让纹理超过 8%", en: "Never push texture past 8%" },
    { zh: "不要把凹陷与凸起的阴影混用", en: "Do not mix recessed and raised shadow logic" },
  ],
  promptGuide: {
    quickColors: {
      text: "#5c4033",
      background: "#f5f5dc",
      panel: "#d4c4a8",
      dark: "#8b7355",
      accent: "#c9a227",
      border: "#b8a88c",
    },
    prompts: [
      {
        zh: "做一个拟物金属按钮：background linear-gradient(to bottom, #d8d8d8, #a8a8a8)、文字 #5c4033、8px 圆角、1px #7a7a7a 边框、padding 10px 24px、box-shadow 0 3px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.85)。hover 时渐变提亮 6%；active 时渐变反向并换成 inset 0 2px 6px rgba(0,0,0,0.3)。页面底色 #f5f5dc。",
        en: "Build a skeuomorphic metal button: background linear-gradient(to bottom, #d8d8d8, #a8a8a8), #5c4033 text, 8px radius, a 1px #7a7a7a border, 10px 24px padding, box-shadow 0 3px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.85). Hover brightens the gradient by six percent; active inverts it and swaps to inset 0 2px 6px rgba(0,0,0,0.3). The page ground is #f5f5dc.",
      },
    ],
  },
  similar: [
    { name: "Neumorphism", why: { zh: "同用双阴影，但新拟物单色克制，拟物用真实材质", en: "Both use paired shadows, though neumorphism stays monochrome while skeuomorphism commits to materials" } },
    { name: "Claymorphism", why: { zh: "同样追求体积感，粘土是玩具感，拟物是实物感", en: "Both pursue volume, though clay reads as toy and skeuomorphism as object" } },
  ],
  completeness: "full",
};
