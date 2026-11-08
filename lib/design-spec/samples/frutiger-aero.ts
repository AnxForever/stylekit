import type { DesignSpec } from "../types";

export const frutigerAeroSpec: DesignSpec = {
  slug: "frutiger-aero",
  name: "Frutiger Aero",
  nameEn: "Frutiger Aero",
  cover: "/styles/frutiger-aero.svg",
  theme: "light",
  northStar: {
    zh: "天蓝玻璃、水滴与草叶：一个相信科技会让世界更清透的年代。",
    en: "Sky-blue glass, water droplets and grass blades — an era that believed technology would make the world clearer.",
  },
  summary: {
    zh: "Frutiger Aero 是 2004 到 2012 年的系统美学：Windows Vista、早期 Android、游戏主机的默认皮肤。它的配方固定——天蓝渐变作底（#87CEEB 向 #5FB3CC 过渡），面板是半透明白玻璃配 1px 亮边与顶部高光，圆角大而圆润（16 到 24px），再点缀水滴、气泡、草叶与光晕。按压是要有弹性的：active 时缩到 0.95，像果冻被按了一下，这个「jelly press」是它与后来扁平化最明显的分歧。",
    en: "Frutiger Aero is the system aesthetic of 2004 to 2012: Windows Vista, early Android, console default skins. Its recipe is fixed — a sky-blue gradient ground (#87CEEB into #5FB3CC), panels of translucent white glass with a 1px bright edge and a top highlight, generous rounded corners at 16 to 24px, and water droplets, bubbles, grass blades and lens flares as ornament. Press must be springy: active scales to 0.95 like jelly being prodded, and that jelly press is the clearest break from the flat design that followed.",
  },
  colors: [
    {
      name: "天蓝",
      nameEn: "Sky",
      value: "#87ceeb",
      group: "brand",
      role: {
        zh: "渐变起点与主背景。整套风格的情绪由它决定。",
        en: "The gradient's start and the dominant background — it sets the mood of the whole system.",
      },
      token: "--color-sky",
    },
    {
      name: "深天蓝",
      nameEn: "Deep Sky",
      value: "#5fb3cc",
      group: "brand",
      role: {
        zh: "渐变终点与按钮底。比天蓝低两档，用来压住画面。",
        en: "The gradient's end and the button ground — two steps below sky, holding the surface down.",
      },
      token: "--color-deep-sky",
    },
    {
      name: "玻璃白",
      nameEn: "Glass White",
      value: "rgba(255,255,255,0.55)",
      group: "surface",
      role: {
        zh: "面板填充。必须配 1px 亮边与顶部高光，否则会显得脏。",
        en: "Panel fill. It needs a 1px bright edge and a top highlight or it reads as murky.",
      },
      token: "--color-glass",
    },
    {
      name: "淡蓝雾",
      nameEn: "Pale Mist",
      value: "#e0f2fe",
      group: "surface",
      role: {
        zh: "卡片内层与次级面板，用于在同一玻璃上再分一层。",
        en: "Inner cards and secondary panels, giving a second level within the same glass.",
      },
      token: "--color-pale-mist",
    },
    {
      name: "草绿",
      nameEn: "Grass",
      value: "#34d399",
      group: "accent",
      role: {
        zh: "自然语义与成功状态，也是草叶装饰的颜色。",
        en: "Nature semantics and success — also the color of the grass blade ornament.",
      },
      token: "--color-grass",
    },
    {
      name: "亮蓝",
      nameEn: "Bright Blue",
      value: "#7dd3fc",
      group: "accent",
      role: {
        zh: "高光、链接与光晕，用于让元素显得在发光。",
        en: "Highlights, links and flares, making elements read as lit.",
      },
      token: "--color-bright-blue",
    },
  ],
  fonts: [
    {
      family: "Segoe UI",
      substitute: "Frutiger, 'Helvetica Neue', system-ui, sans-serif",
      weights: [300, 400, 600],
      sizes: [12, 14, 16, 20, 28, 40],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.6 },
      tracking: { display: "-0.01em", label: "0.04em" },
      role: {
        zh: "全站唯一字体，字重偏细（300 到 600）。人文无衬线是这套风格的「清透」来源。",
        en: "The only face, on the lighter side at 300 to 600. The humanist sans is where the clarity comes from.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 40, lineHeight: 1.2, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", weight: 600, size: 28, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", weight: 400, size: 20, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 300, size: 12, lineHeight: 1.4, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1120,
    sectionGap: 80,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "16px" },
    { element: "inputs", value: "16px" },
    { element: "pills", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Sky Gradient", value: "linear-gradient(#a8dcf0, #87ceeb, #5fb3cc)", purpose: "页面底" },
    { level: 1, name: "Glass", value: "rgba(255,255,255,0.55)", purpose: "面板与卡片" },
    { level: 2, name: "Pale Mist", value: "#e0f2fe", purpose: "内层卡片" },
  ],
  elevation: [
    { name: "Glass panel", value: "0 8px 24px rgba(60,130,170,0.22), inset 0 1px 0 rgba(255,255,255,0.90)" },
    { name: "Glass hover", value: "0 12px 32px rgba(60,130,170,0.28), inset 0 1px 0 rgba(255,255,255,0.95)" },
    { name: "Button", value: "0 4px 12px rgba(60,130,170,0.30), inset 0 1px 0 rgba(255,255,255,0.80)" },
  ],
  components: [
    {
      name: "Jelly Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "深天蓝填充、白字、16px 圆角、1px 白 60% 描边，阴影 0 4px 12px 深蓝 30% 加 inset 0 1px 0 白 80%。15px/600、padding 10px 24px。hover 时填充提亮 6%、阴影扩到 16px；按下时缩到 0.95 并压暗填充，这是果冻按压。过渡 200ms ease-out。焦点环用白色 2px 加 2px offset，offset 色取天蓝以在蓝底上可见。",
        en: "Deep sky fill, white text, 16px radius, a 1px white border at 60%, shadow 0 4px 12px at 30% deep blue plus inset 0 1px 0 white at 80%. 15px/600, 10px 24px padding. Hover brightens the fill six percent and widens the shadow to 16px; press scales to 0.95 and darkens the fill — the jelly press. 200ms ease-out. The focus ring is 2px white with a 2px offset painted sky, so it stays visible on blue.",
      },
      sizes: "padding 10px 24px; label 15px",
      states: "hover: brighter, wider shadow; active: scale 0.95, darker fill",
    },
    {
      name: "Aero Panel",
      role: { zh: "卡片与窗口面板", en: "Cards and window panels" },
      construction: {
        zh: "55% 白玻璃填充、24px 圆角、1px 白 60% 描边、内边距 24px，阴影 0 8px 24px 深蓝 22% 加 inset 0 1px 0 白 90%。面板内可再叠一层淡蓝雾色的小卡。hover 时填充升到 65%、阴影扩到 32px。",
        en: "55% white glass fill, 24px radius, a 1px white border at 60%, 24px padding, shadow 0 8px 24px at 22% deep blue plus inset 0 1px 0 white at 90%. A pale mist card may sit inside it as a second layer. Hover raises the fill to 65% and the shadow to 32px.",
      },
    },
    {
      name: "Gloss Input",
      role: { zh: "搜索与表单输入", en: "Search and form input" },
      construction: {
        zh: "白 70% 填充、16px 圆角、1px 白 70% 描边，内阴影 inset 0 2px 4px 深蓝 15% 制造轻微凹陷，padding 10px 16px、14px 字。聚焦时描边转亮蓝并加 2px 亮蓝 40% 外环。",
        en: "70% white fill, 16px radius, a 1px white border at 70%, an inner shadow of inset 0 2px 4px at 15% deep blue for a slight recess, 10px 16px padding at 14px. Focus turns the border bright blue and adds a 2px ring at 40%.",
      },
    },
    {
      name: "Gloss Nav",
      role: { zh: "顶部导航", en: "Top navigation" },
      construction: {
        zh: "高 64px、白 45% 玻璃、16px 模糊、底部 1px 白 40% 描边、无阴影。字标 16px/600，链接 14px、间距 24px，hover 时链接下方出现 2px 亮蓝下划线。右侧放一个果冻按钮。",
        en: "64px tall, 45% white glass with a 16px blur, a 1px white border at 40% along the bottom, no shadow. Wordmark at 16px/600, links at 14px with 24px gaps; hover adds a 2px bright-blue underline. A jelly button sits on the right.",
      },
    },
    {
      name: "Bubble Ornament",
      role: { zh: "水滴与气泡装饰", en: "Water droplet and bubble ornament" },
      construction: {
        zh: "24px 到 96px 的圆，径向渐变从左上白 90% 到亮蓝 20%，加 inset 0 -3px 6px 深蓝 25% 与 inset 0 3px 6px 白 90%，形成透明水泡。斜向置于面板角落，可半透出背景。单屏不超过五个。",
        en: "Circles from 24px to 96px on a radial gradient from 90% white at the top-left into 20% bright blue, with inset 0 -3px 6px at 25% deep blue and inset 0 3px 6px at 90% white to make a clear bubble. They sit at panel corners and may show the background through. No more than five per screen.",
      },
    },
  ],
  imagery: {
    zh: "天空、水面、草叶、玻璃与水滴的高清照片或渲染。允许 40% 到 60% 的不透明度叠在渐变上。不使用深色照片、噪点纹理与扁平插画。",
    en: "High-resolution sky, water, grass, glass and droplets, photographic or rendered, overlayable at 40% to 60% on the gradient. No dark photography, grain textures or flat illustration.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 80px。整页以天蓝渐变铺底，面板浮在上面，允许面板重叠 8px 制造窗口层次。图标与按钮都带光泽，没有纯平的区域。",
    en: "Capped at 1120px with 24px padding, sections 80px apart. The whole page sits on a sky gradient with panels floating above; panels may overlap by 8px for window layering. Icons and buttons all carry gloss, and no region stays matte.",
  },
  dos: [
    { zh: "天蓝渐变铺满整个页面", en: "Run the sky gradient across the whole page" },
    { zh: "玻璃必须配亮边与顶部高光", en: "Glass needs a bright edge and a top highlight" },
    { zh: "圆角 16 到 24px", en: "Radius runs 16 to 24px" },
    { zh: "按压用 0.95 的果冻缩放", en: "Press uses the 0.95 jelly scale" },
    { zh: "焦点环 offset 取底色，保证可见", en: "Paint the focus offset in the ground color so it stays visible" },
    { zh: "用气泡与草叶点缀自然感", en: "Use bubbles and grass to suggest nature" },
  ],
  donts: [
    { zh: "不要用深色或黑色背景", en: "No dark or black grounds" },
    { zh: "不要用锐角与硬边几何", en: "No sharp corners or hard-edged geometry" },
    { zh: "不要用霓虹或刺眼色", en: "No neon or harsh color" },
    { zh: "不要用等宽字体", en: "No monospace type" },
    { zh: "不要用无玻璃效果的哑光面", en: "No matte surfaces without glass" },
    { zh: "不要用 0.98 的轻按压，果冻要更明显", en: "Do not settle for a 0.98 press; jelly needs to be felt" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a4a5e",
      background: "#87ceeb",
      glass: "rgba(255,255,255,0.55)",
      accent: "#34d399",
      highlight: "#7dd3fc",
      border: "rgba(255,255,255,0.60)",
    },
    prompts: [
      {
        zh: "做一个 Frutiger Aero 玻璃面板：背景 rgba(255,255,255,0.55)、24px 圆角、1px rgba(255,255,255,0.6) 描边、内边距 24px、box-shadow 0 8px 24px rgba(60,130,170,0.22), inset 0 1px 0 rgba(255,255,255,0.9)、backdrop-filter blur(12px)。页面底色用 linear-gradient(#a8dcf0, #87ceeb, #5fb3cc)。按钮 active 时 scale(0.95) 做出果冻按压。",
        en: "Build a Frutiger Aero glass panel: background rgba(255,255,255,0.55), 24px radius, a 1px rgba(255,255,255,0.6) border, 24px padding, box-shadow 0 8px 24px rgba(60,130,170,0.22) with inset 0 1px 0 rgba(255,255,255,0.9), and a 12px backdrop blur. The page ground is linear-gradient(#a8dcf0, #87ceeb, #5fb3cc). Buttons scale to 0.95 on active for the jelly press.",
      },
    ],
  },
  similar: [
    { name: "Y2K", why: { zh: "同一时代前后，但千禧更金属、Frutiger 更通透", en: "Neighbouring eras, though Y2K is metallic while Frutiger Aero is clear" } },
    { name: "Liquid Glass", why: { zh: "都做玻璃，但这里的光源在天空而非棱镜边缘", en: "Both work in glass, though the light here comes from a sky rather than a prism rim" } },
  ],
  completeness: "full",
};
