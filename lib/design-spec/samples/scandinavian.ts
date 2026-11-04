import type { DesignSpec } from "../types";

export const scandinavianSpec: DesignSpec = {
  slug: "scandinavian",
  name: "北欧极简风",
  nameEn: "Scandinavian",
  cover: "/styles/scandinavian.svg",
  theme: "light",
  northStar: {
    zh: "暖灰白、细线条、极慢的过渡：把「安静」做成可测量的参数。",
    en: "Warm grey-white, hairline rules and very slow transitions — quietness turned into measurable parameters.",
  },
  summary: {
    zh: "北欧极简风来自 Hygge 的生活观：少、慢、暖。它的所有参数都比常规更收敛——字重只用 200 与 300，圆角只有 2px，边框是 1px 的 30% 透明度，过渡长达 700ms 且必须 ease-in-out。交互刻意做得极轻：hover 只让边框从 30% 变到 80%，按下只改明暗，绝不位移、绝不弹跳。留白不是装饰而是结构，元素之间至少 40px。配色是暖灰白加木色、苔绿与灰蓝，饱和度全部压在 30% 以下。",
    en: "Scandinavian comes from the Hygge outlook: less, slower, warmer. Every parameter runs more restrained than usual — weights only at 200 and 300, radius at 2px, borders 1px at 30% opacity, and transitions of 700ms on an ease-in-out curve. Interaction is deliberately faint: hover moves a border from 30% to 80%, press changes brightness only, and nothing ever translates or bounces. Whitespace is structure, not decoration, with at least 40px between elements. The palette is warm grey-white with wood, moss and grey-blue, all under thirty percent saturation.",
  },
  colors: [
    {
      name: "炭灰",
      nameEn: "Charcoal",
      value: "#3d3d3d",
      group: "brand",
      role: {
        zh: "标题与主按钮底。深而不黑，长看柔和。",
        en: "Headings and the primary button ground — deep without black, gentle over long use.",
      },
      token: "--color-charcoal",
    },
    {
      name: "暖白",
      nameEn: "Warm White",
      value: "#f5f0eb",
      group: "surface",
      role: {
        zh: "页面画布。带木质暖调的米白，比冷白更接近室内墙色。",
        en: "The canvas — a wood-warm off-white, closer to an interior wall than to cool white.",
      },
      token: "--color-warm-white",
    },
    {
      name: "木",
      nameEn: "Wood",
      value: "#a89279",
      group: "accent",
      role: {
        zh: "次级文字与装饰。像浅橡木的色调，是这套风格的温度来源。",
        en: "Secondary text and ornament — a pale oak tone that supplies the warmth.",
      },
      token: "--color-wood",
    },
    {
      name: "苔绿",
      nameEn: "Moss",
      value: "#5a7a6b",
      group: "accent",
      role: {
        zh: "hover 高亮与成功状态，取自室内植物的绿。",
        en: "Hover highlight and success, borrowed from an indoor plant.",
      },
      token: "--color-moss",
    },
    {
      name: "灰蓝",
      nameEn: "Grey Blue",
      value: "#7ba0b8",
      group: "accent",
      role: {
        zh: "链接与冷色平衡，用在需要后退的信息上。",
        en: "Links and cool balance, on information meant to recede.",
      },
      token: "--color-grey-blue",
    },
    {
      name: "沙",
      nameEn: "Sand",
      value: "#c9a88c",
      group: "accent",
      role: {
        zh: "分隔线与图块底，用于在不引入对比的前提下分区。",
        en: "Rules and tile grounds, dividing space without introducing contrast.",
      },
      token: "--color-sand",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Helvetica Neue', system-ui, sans-serif",
      weights: [200, 300, 400],
      sizes: [12, 14, 16, 20, 26, 34],
      lineHeight: { display: 1.2, heading: 1.35, body: 1.8 },
      tracking: { display: "0.01em", label: "0.12em" },
      role: {
        zh: "全站唯一字体，只用极细的 200 与 300。行高 1.8，字距略放开，让文字也「呼吸」。",
        en: "The only face, in extra-light weights only. Leading runs at 1.8 with slightly open tracking so the text breathes too.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 300, size: 34, lineHeight: 1.2, tracking: "0.01em", token: "--text-display" },
    { role: "heading", weight: 300, size: 26, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", weight: 400, size: 20, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", weight: 300, size: 16, lineHeight: 1.8, token: "--text-body-lg" },
    { role: "body", weight: 300, size: 14, lineHeight: 1.8, token: "--text-body" },
    { role: "label", weight: 400, size: 12, lineHeight: 1.5, tracking: "0.12em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 40, 56, 80, 120, 160],
    maxWidth: 1040,
    sectionGap: 160,
    cardPadding: 40,
    elementGap: 40,
  },
  radii: [
    { element: "cards", value: "2px" },
    { element: "buttons", value: "2px" },
    { element: "inputs", value: "2px" },
  ],
  surfaces: [
    { level: 0, name: "Warm White", value: "#f5f0eb", purpose: "页面画布" },
    { level: 1, name: "Soft White", value: "rgba(255,255,255,0.60)", purpose: "卡片" },
  ],
  elevation: [
    { name: "None", value: "none — a 1px border at 30% does the work" },
    { name: "Hover border", value: "1px solid rgba(212,205,197,0.80)" },
  ],
  components: [
    {
      name: "Quiet Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "炭灰填充、暖白文字、2px 圆角、无描边、无阴影。14px/300、0.12em 字距、padding 14px 40px。hover 时填充转苔绿并把亮度降 5%；按下只把填充再压暗一档，绝无缩放与位移。过渡 700ms ease-in-out，这是整套风格的节奏基准。",
        en: "Charcoal fill, warm white text, 2px radius, no border, no shadow. 14px at weight 300, 0.12em tracking, 14px 40px padding. Hover turns the fill moss and drops brightness five percent; press darkens the fill one more step with no scale and no translation. 700ms ease-in-out — the tempo everything else follows.",
      },
      sizes: "padding 14px 40px; label 14px",
      states: "hover: moss fill, brightness 95%; active: darker fill only",
    },
    {
      name: "Hygge Card",
      role: { zh: "内容卡与图块", en: "Content cards and tiles" },
      construction: {
        zh: "白 60% 填充、2px 圆角、1px 沙 30% 描边、内边距 40px，无阴影。标题 26px/300 炭灰，正文 14px/300 木色。hover 时描边升到 80%、底色微亮、标题转苔绿，全部在 700ms 内完成。",
        en: "60% white fill, 2px radius, a 1px sand border at 30%, 40px padding, no shadow. Titles at 26px/300 in charcoal, body at 14px/300 in wood. Hover takes the border to 80%, brightens the ground slightly and shifts the title to moss, all over 700ms.",
      },
    },
    {
      name: "Line Input",
      role: { zh: "表单输入", en: "Form input" },
      construction: {
        zh: "透明底、仅底部 1px 沙 40% 描边、无左右边框、2px 圆角、padding 8px 0、14px/300 字。聚焦时底线转苔绿、宽度不变，不加外环。",
        en: "Transparent fill with a 1px sand rule at 40% along the bottom only, no side borders, 2px radius, 8px 0 padding at 14px/300. Focus turns the rule moss at the same width, with no ring.",
      },
    },
    {
      name: "Breathing Section",
      role: { zh: "区块容器", en: "Section container" },
      construction: {
        zh: "区块之间 160px 间距，标题与内容之间 40px，内容最大行宽 34em。区块间只用 1px 沙 30% 的分隔线，或干脆靠留白分隔。禁止把两个高对比元素并排。",
        en: "Sections sit 160px apart with 40px between heading and body, at a 34em measure. They divide with a 1px sand rule at 30% or by whitespace alone. Never place two high-contrast elements side by side.",
      },
    },
  ],
  imagery: {
    zh: "自然光下的室内摄影：木质家具、亚麻织物、绿植、陶器。低饱和、暖调、大量留白。不使用高对比、冷光与装饰插画。",
    en: "Interior photography in natural light: wood furniture, linen, plants, ceramics. Low saturation, warm cast, generous empty space. No high contrast, cool lighting or decorative illustration.",
  },
  layout: {
    zh: "上限 1040px、容器内边距 40px，区块间距 160px。单栏或非对称两栏（5:7），留白占页面一半以上。元素之间至少 40px，宁可减少模块也不压缩间距。",
    en: "Capped at 1040px with 40px padding, sections 160px apart. One column or an asymmetric 5:7 split, with whitespace filling more than half the page. Elements keep at least 40px between them; drop a module rather than tighten.",
  },
  dos: [
    { zh: "字重只用 200 与 300", en: "Weights only at 200 and 300" },
    { zh: "过渡 700ms ease-in-out", en: "Transitions run 700ms ease-in-out" },
    { zh: "圆角 2px，近乎直角", en: "Radius at 2px, nearly square" },
    { zh: "hover 只改边框与底色", en: "Hover changes only border and ground" },
    { zh: "元素间距至少 40px", en: "At least 40px between elements" },
    { zh: "饱和度全部压在 30% 以下", en: "Keep all saturation under thirty percent" },
  ],
  donts: [
    { zh: "不要用高饱和鲜艳色", en: "No saturated or vivid color" },
    { zh: "不要用粗边框与强阴影", en: "No heavy borders or strong shadows" },
    { zh: "不要密集排列元素", en: "Do not pack elements densely" },
    { zh: "不要用装饰字体或超大字号", en: "No decorative or oversized type" },
    { zh: "不要用弹跳或快速缩放", en: "No bounce or fast scale" },
    { zh: "不要给按下加强烈反馈", en: "Never give press a strong feedback" },
  ],
  promptGuide: {
    quickColors: {
      text: "#3d3d3d",
      background: "#f5f0eb",
      card: "rgba(255,255,255,0.60)",
      accent: "#5a7a6b",
      wood: "#a89279",
      border: "rgba(212,205,197,0.40)",
    },
    prompts: [
      {
        zh: "做一个北欧极简卡片：背景 rgba(255,255,255,0.6)、2px 圆角、1px rgba(212,205,197,0.3) 描边、内边距 40px、无阴影。标题 26px/300 #3d3d3d，正文 14px/300 #a89279、行高 1.8。hover 时描边升到 rgba(212,205,197,0.8)、标题转 #5a7a6b，transition 700ms ease-in-out。页面底色 #f5f0eb。",
        en: "Build a Scandinavian card: background rgba(255,255,255,0.6), 2px radius, a 1px rgba(212,205,197,0.3) border, 40px padding, no shadow. Title at 26px/300 in #3d3d3d, body at 14px/300 in #a89279 on 1.8 leading. Hover raises the border to rgba(212,205,197,0.8) and shifts the title to #5a7a6b over 700ms ease-in-out. The page ground is #f5f0eb.",
      },
    ],
  },
  similar: [
    { name: "Notion Style", why: { zh: "同样低刺激，但 Notion 是文档密度，北欧是留白密度", en: "Also low-stimulus, though Notion is dense while Scandinavian is airy" } },
    { name: "Wabi-Sabi", why: { zh: "同属自然克制的东方版本，但那边更强调残缺与时间", en: "The Eastern counterpart to this restraint, though wabi-sabi emphasises imperfection and time" } },
  ],
  completeness: "full",
};
