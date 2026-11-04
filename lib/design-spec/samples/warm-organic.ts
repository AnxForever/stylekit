import type { DesignSpec } from "../types";

export const warmOrganicSpec: DesignSpec = {
  slug: "warm-organic",
  name: "暖感有机风",
  nameEn: "Warm Organic",
  cover: "/styles/warm-organic.svg",
  theme: "light",
  northStar: {
    zh: "陶土红、橄榄绿、暖白纸：一个像被手摸过的界面。",
    en: "Terracotta, olive and warm paper — an interface that feels handled.",
  },
  summary: {
    zh: "暖感有机风是为建筑师、室内与产品设计师、陶艺家服务的作品集语言：暖白纸底（#f5f0eb）、陶土红（#c86a4a）作唯一主强调、橄榄绿（#7a8b5e）作自然元素、所有中性色必须偏暖（正文上限是 #2d2a24 深褐而不是纯黑）。圆角统一用 rounded-lg，像被水磨圆的鹅卵石而不是人工气球。分割线是暖 hairline（#d4bfa5 的 60%），像纸张叠放的自然阴影；装饰用圆形与有机形状配极细橄榄绿点。它禁止冷灰、禁止霓虹与冷蓝、禁止玻璃拟态、禁止纯黑正文。",
    en: "Warm Organic is the portfolio language of architects, interior and product designers, ceramicists and landscape architects: warm paper (#f5f0eb), terracotta (#c86a4a) as the single primary accent, olive (#7a8b5e) for natural elements, and every neutral leaning warm — body text caps out at #2d2a24 rather than black. Radii stay at rounded-lg, like river-smoothed pebbles rather than artificial bubbles. Dividers are warm hairlines (#d4bfa5 at 60%) like the shadow between stacked sheets, and ornament uses circles and organic forms with hairline olive dots. Cool greys, neon and cold blue, glassmorphism and pure black body text are all refused.",
  },
  colors: [
    {
      name: "深褐",
      nameEn: "Warm Umber",
      value: "#2d2a24",
      group: "brand",
      role: {
        zh: "正文与标题的上限色。绝不用纯黑。",
        en: "The darkest body and heading color — pure black is never used.",
      },
      token: "--color-warm-umber",
    },
    {
      name: "暖白",
      nameEn: "Warm Paper",
      value: "#f5f0eb",
      group: "surface",
      role: {
        zh: "页面底。像纹理纸的暖白。",
        en: "The page ground — a warm white like textured paper.",
      },
      token: "--color-warm-paper",
    },
    {
      name: "陶土红",
      nameEn: "Terracotta",
      value: "#c86a4a",
      group: "accent",
      role: {
        zh: "唯一主强调：链接、CTA 与按钮。",
        en: "The single primary accent on links, CTAs and buttons.",
      },
      token: "--color-terracotta",
    },
    {
      name: "橄榄绿",
      nameEn: "Olive",
      value: "#7a8b5e",
      group: "accent",
      role: {
        zh: "第二强调与自然元素，用于标签与点缀。",
        en: "The second accent and natural element, on tags and accents.",
      },
      token: "--color-olive",
    },
    {
      name: "暖沙",
      nameEn: "Warm Sand",
      value: "#d4bfa5",
      group: "accent",
      role: {
        zh: "hairline 分隔线、装饰圆与卡片衬底。",
        en: "Hairline dividers, decorative circles and card beds.",
      },
      token: "--color-warm-sand",
    },
    {
      name: "浅陶",
      nameEn: "Pale Clay",
      value: "#e8ded1",
      group: "surface",
      role: {
        zh: "卡片与面板底，比页面底暖一档。",
        en: "Cards and panels, one step warmer than the page.",
      },
      token: "--color-pale-clay",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'PingFang SC', sans-serif",
      weights: [300, 400, 500],
      sizes: [13, 15, 17, 22, 30, 40],
      lineHeight: { display: 1.25, heading: 1.35, body: 1.75 },
      tracking: { display: "-0.01em", label: "0.02em" },
      role: {
        zh: "正文用无衬线细体、行高 1.75。标题可用衬线或细无衬线并放宽字距。",
        en: "Body in a light sans at 1.75 leading; headings may take a serif or a light sans on wider tracking.",
      },
      token: "--font-sans",
    },
    {
      family: "Lora",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400, 500],
      sizes: [22, 30, 40],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.7 },
      tracking: { display: "0", label: "0.02em" },
      role: {
        zh: "标题可选衬线，字重 400 到 500。它提供手作感的一侧，与细无衬线正文形成对照。",
        en: "Serif is optional for headings at weight 400 to 500, supplying the hand-made side against the light sans body.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", font: "Lora", weight: 500, size: 40, lineHeight: 1.2, token: "--text-display" },
    { role: "heading", font: "Lora", weight: 500, size: 30, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", font: "Inter", weight: 500, size: 22, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", font: "Inter", weight: 400, size: 17, lineHeight: 1.75, token: "--text-body-lg" },
    { role: "body", font: "Inter", weight: 400, size: 15, lineHeight: 1.75, token: "--text-body" },
    { role: "label", font: "Inter", weight: 500, size: 13, lineHeight: 1.5, tracking: "0.02em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1120,
    sectionGap: 112,
    cardPadding: 28,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "8px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "8px" },
    { element: "ornaments", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Warm Paper", value: "#f5f0eb", purpose: "页面底" },
    { level: 1, name: "Pale Clay", value: "#e8ded1", purpose: "卡片与面板" },
    { level: 2, name: "Translucent White", value: "rgba(255,255,255,0.60)", purpose: "浮层" },
  ],
  elevation: [
    { name: "Soft", value: "0 6px 20px rgba(45,42,36,0.06)" },
    { name: "Soft hover", value: "0 12px 32px rgba(45,42,36,0.10)" },
  ],
  components: [
    {
      name: "Terracotta Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "陶土红填充、暖白文字、8px 圆角、无描边，15px/500、padding 12px 28px，阴影 0 6px 20px 深褐 6%。hover 时填充加深到 #b25c3e、阴影扩到 32px；按下缩放 0.98。过渡 300ms ease-out。",
        en: "Terracotta fill, warm paper text, 8px radius, no border, 15px/500, 12px 28px padding, shadow 0 6px 20px at 6% umber. Hover deepens the fill to #b25c3e and widens the shadow to 32px; press scales 0.98. 300ms ease-out.",
      },
      sizes: "padding 12px 28px; label 15px",
      states: "hover: deeper fill, wider shadow; active: scale 0.98",
    },
    {
      name: "Clay Card",
      role: { zh: "内容卡与作品卡", en: "Content and work cards" },
      construction: {
        zh: "浅陶填充、8px 圆角、无描边（靠暖色分层）、内边距 28px，阴影 0 6px 20px 深褐 6%。标题用衬线 30px/500 深褐，正文 15px/400 行高 1.75。hover 时阴影扩到 32px、上浮 2px。",
        en: "Pale clay fill, 8px radius, no border — the warm layering separates it — 28px padding, shadow 0 6px 20px at 6% umber. The title runs serif 30px/500 in umber with body at 15px/400 on 1.75 leading. Hover widens the shadow to 32px and lifts 2px.",
      },
    },
    {
      name: "Warm Hairline",
      role: { zh: "暖分隔线与叠纸阴影", en: "The warm hairline and paper shadow" },
      construction: {
        zh: "1px、色 #d4bfa5 的 60%，横跨内容宽。它模拟的不是线条而是「两张纸叠在一起时的那道阴影」，所以颜色必须偏暖且半透明。",
        en: "1px in #d4bfa5 at 60%, spanning the content width. It imitates not a drawn line but the shadow where two sheets overlap, which is why it must be warm and translucent.",
      },
    },
    {
      name: "Organic Pebble",
      role: { zh: "有机形状装饰", en: "The organic pebble ornament" },
      construction: {
        zh: "48px 的圆或椭圆（border-radius 取 60% 40% 55% 45% 这类四值），填暖沙 30%，中心放一个 4px 的橄榄绿细点。放在卡片角落或区块之间作为节奏点，单屏最多三处。",
        en: "A 48px circle or ellipse using four-value radii such as 60% 40% 55% 45%, filled with 30% warm sand and carrying a 4px olive dot at its centre. It punctuates a card corner or a gap between sections, three per screen at most.",
      },
    },
    {
      name: "Clay Field",
      role: { zh: "表单输入", en: "Form input" },
      construction: {
        zh: "浅陶 40% 填充、8px 圆角、1px 暖沙描边、padding 12px 16px、15px 字。聚焦时描边转陶土红并加 1px 的陶土红 20% 外环，不改背景。",
        en: "40% pale clay fill, 8px radius, a 1px warm sand border, 12px 16px padding at 15px. Focus turns the border terracotta and adds a 1px ring at 20% without changing the fill.",
      },
    },
  ],
  imagery: {
    zh: "手作与建筑摄影：陶器、木作、亚麻、水泥墙、自然光下的室内。允许纸质纹理叠加。不使用冷调摄影、玻璃与金属高光、霓虹色图像。",
    en: "Craft and architecture photography: ceramics, woodwork, linen, concrete, interiors in natural light, optionally with a paper texture over it. No cool-toned photography, glass and metal highlights, or neon imagery.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 112px。允许非对称双栏（5:7）。留白宽松但不空旷，密度中低。圆角统一 8px，绝不出现大小混用。",
    en: "Capped at 1120px with 24px padding, sections 112px apart. An asymmetric 5:7 pair is welcome. Whitespace runs generous without feeling empty at a low-to-medium density. Radii hold at 8px with no mixing of sizes.",
  },
  dos: [
    { zh: "所有中性色必须偏暖", en: "Every neutral leans warm" },
    { zh: "陶土红与橄榄绿是唯二强调色", en: "Terracotta and olive are the only accents" },
    { zh: "圆角统一 8px，像磨圆的石头", en: "Radius at 8px, like a smoothed stone" },
    { zh: "分割用暖 hairline", en: "Dividers are warm hairlines" },
    { zh: "正文上限深褐 #2d2a24", en: "Body caps at umber #2d2a24" },
    { zh: "装饰用圆与有机形状", en: "Ornament uses circles and organic forms" },
  ],
  donts: [
    { zh: "不要用冷灰作中性色", en: "No cool grey neutrals" },
    { zh: "不要用高饱和霓虹或冷蓝", en: "No saturated neon or cold blue" },
    { zh: "不要用玻璃拟态", en: "No glassmorphism" },
    { zh: "不要用纯黑正文", en: "No pure black body text" },
    { zh: "不要混用不同圆角", en: "Never mix radius sizes" },
    { zh: "不要用过冷或过亮的阴影", en: "No shadow that runs cool or bright" },
  ],
  promptGuide: {
    quickColors: {
      text: "#2d2a24",
      background: "#f5f0eb",
      card: "#e8ded1",
      terracotta: "#c86a4a",
      olive: "#7a8b5e",
      sand: "#d4bfa5",
    },
    prompts: [
      {
        zh: "做一个暖感有机风卡片：浅陶 #e8ded1 填充、8px 圆角、无边框、内边距 28px、阴影 0 6px 20px rgba(45,42,36,0.06)。标题用衬线 30px/500、色 #2d2a24；正文 15px/400、行高 1.75、色 rgba(45,42,36,0.8)。卡片之间用 1px rgba(212,191,165,0.6) 的暖 hairline 分隔。左上角放一个 48px 的有机形状（border-radius 60% 40% 55% 45%）填 rgba(212,191,165,0.3)、中心一个 4px 橄榄绿 #7a8b5e 点。主按钮陶土红 #c86a4a 填充、暖白文字、8px 圆角。页面底色 #f5f0eb。",
        en: "Build a warm organic card: #e8ded1 fill, 8px radius, no border, 28px padding, shadow 0 6px 20px rgba(45,42,36,0.06). The title runs serif 30px/500 in #2d2a24 with body at 15px/400 on 1.75 leading in rgba(45,42,36,0.8). A 1px rgba(212,191,165,0.6) warm hairline divides cards. A 48px organic form (border-radius 60% 40% 55% 45%) sits top-left filled rgba(212,191,165,0.3) with a 4px olive #7a8b5e dot at its centre. The primary button fills terracotta #c86a4a with warm paper text on an 8px radius. The page ground is #f5f0eb.",
      },
    ],
  },
  similar: [
    { name: "Scandinavian", why: { zh: "同样暖调克制，但北欧更冷更灰，暖感有机更偏陶土与橄榄", en: "Both warm and restrained, though Scandinavian is cooler and greyer while this leans terracotta and olive" } },
    { name: "Natural Organic", why: { zh: "同族，但自然有机更强调植物纹样，暖感有机更强调材质与手作", en: "Same family, though natural organic pushes plant pattern while this pushes material and craft" } },
  ],
  completeness: "full",
};
