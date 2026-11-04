import type { DesignSpec } from "../types";

export const maximalismSpec: DesignSpec = {
  slug: "maximalism",
  name: "极繁主义",
  nameEn: "Maximalism",
  cover: "/styles/maximalism.svg",
  theme: "dark",
  northStar: {
    zh: "多就是多：撞色、双层边框、多层阴影、图案叠图案。",
    en: "More is more — clashing color, double borders, stacked shadows, pattern on pattern.",
  },
  summary: {
    zh: "极繁主义是对极简的正面反抗：深紫底（#1a0a2e）上铺满高饱和撞色（玫红 #d4145a、金黄 #ffbe0b、蓝 #3a86ff、紫 #8338ec、薄荷 #06d6a0），边框用 border-double 或虚线粗边，阴影是多层错位的实色（4px 金黄加 8px 蓝），背景可叠对角渐变，标题用 6xl 以上的全大写加宽字距，元素允许 rotate 与 skew。它禁止灰度中性色作主色——灰在极繁里等于缺席。唯一的克制是「每一层都必须可见且不互相糊掉」。",
    en: "Maximalism is a direct rebuttal of minimalism: high-saturation clashes (rose #d4145a, gold #ffbe0b, blue #3a86ff, violet #8338ec, mint #06d6a0) packed over a deep violet ground (#1a0a2e), borders in double or heavy dashed form, shadows stacked as offset solids (4px gold plus 8px blue), diagonal gradients underneath, headlines above 6xl in uppercase on wide tracking, and elements free to rotate and skew. Grey neutrals may not lead — in maximalism grey means absence. The one restraint is that each layer must stay visible without smearing into the next.",
  },
  colors: [
    {
      name: "玫红",
      nameEn: "Rose",
      value: "#d4145a",
      group: "brand",
      role: {
        zh: "第一撞色：主区块与最抢眼的标题。",
        en: "The first clash on main blocks and the loudest headline.",
      },
      token: "--color-rose",
    },
    {
      name: "深紫底",
      nameEn: "Deep Violet Base",
      value: "#1a0a2e",
      group: "surface",
      role: {
        zh: "页面底。深到能让五支撞色同时跳出来。",
        en: "The page ground — dark enough to float all five clashes at once.",
      },
      token: "--color-deep-violet",
    },
    {
      name: "金黄",
      nameEn: "Gold",
      value: "#ffbe0b",
      group: "accent",
      role: {
        zh: "第一层阴影与高亮，是撞色里最亮的一支。",
        en: "The first shadow layer and highlights — the brightest of the clashes.",
      },
      token: "--color-gold",
    },
    {
      name: "蓝",
      nameEn: "Blue",
      value: "#3a86ff",
      group: "accent",
      role: {
        zh: "第二层阴影与冷侧色块。",
        en: "The second shadow layer and the cool block.",
      },
      token: "--color-blue",
    },
    {
      name: "紫",
      nameEn: "Violet",
      value: "#8338ec",
      group: "accent",
      role: {
        zh: "渐变的中间站与第三撞色。",
        en: "The gradient's middle stop and the third clash.",
      },
      token: "--color-violet",
    },
    {
      name: "薄荷",
      nameEn: "Mint",
      value: "#06d6a0",
      group: "accent",
      role: {
        zh: "第四撞色与成功状态。",
        en: "The fourth clash and success states.",
      },
      token: "--color-mint",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Arial Black', Helvetica, sans-serif",
      weights: [700, 900],
      sizes: [14, 20, 28, 40, 60, 88],
      lineHeight: { display: 0.95, heading: 1.05, body: 1.5 },
      tracking: { display: "-0.02em", label: "0.24em" },
      role: {
        zh: "粗无衬线，标题 6xl 以上、全大写、字距 0.24em。大与小之间的落差本身是装饰。",
        en: "A heavy sans: headlines above 6xl, uppercase, at 0.24em tracking. The jump between large and small is itself the ornament.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 88, lineHeight: 0.95, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 900, size: 60, lineHeight: 1, tracking: "-0.02em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 40, lineHeight: 1.1, token: "--text-subheading" },
    { role: "body-lg", weight: 700, size: 28, lineHeight: 1.35, token: "--text-body-lg" },
    { role: "body", weight: 700, size: 20, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 900, size: 14, lineHeight: 1.4, tracking: "0.24em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "compact",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1280,
    sectionGap: 64,
    cardPadding: 28,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "stickers", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Deep Violet", value: "#1a0a2e", purpose: "页面底" },
    { level: 1, name: "Gradient", value: "linear-gradient rose→violet→blue", purpose: "渐变区块" },
    { level: 2, name: "Rose Solid", value: "#d4145a", purpose: "撞色块" },
  ],
  elevation: [
    { name: "Double stack", value: "4px 4px 0 #ffbe0b, 8px 8px 0 #3a86ff" },
    { name: "Triple stack", value: "4px 4px 0 #ffbe0b, 8px 8px 0 #3a86ff, 12px 12px 0 #8338ec" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Layered Panel",
      role: { zh: "多层面板（核心组件）", en: "The layered panel — the core component" },
      construction: {
        zh: "撞色填充、零圆角、4px 金与蓝的双层描边（border-double 或两层 box-shadow inset）、内边距 28px，外阴影 4px 金黄加 8px 蓝。整体 rotate(-1deg)。内部再叠一层对角渐变（玫红→紫→蓝，不透明度 25%）与一层图案（点或斜线，不透明度 10%）。hover 时阴影扩到三层（加 12px 紫）。",
        en: "A clash fill, zero radius, a double border in gold and blue (border-double or two inset shadows), 28px padding, and an outer shadow of 4px gold plus 8px blue. It sits at rotate(-1deg). Inside, a diagonal gradient (rose into violet into blue at 25%) layers with a pattern at 10%. Hover extends the shadow to three layers by adding 12px violet.",
      },
      states: "hover: third shadow layer",
    },
    {
      name: "Stacked Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "玫红填充、金黄文字、零圆角、3px 虚线金黄描边、20px/900 全大写、字距 0.24em、padding 14px 32px，外阴影 4px 金黄加 8px 蓝。hover 时填充硬切到紫、阴影扩到 12px；按下时位移 8px 8px 且阴影收到 4px。过渡 120ms linear。",
        en: "Rose fill, gold text, zero radius, a 3px dashed gold border, 20px/900 uppercase at 0.24em, 14px 32px padding, and an outer shadow of 4px gold plus 8px blue. Hover cuts the fill to violet and widens the shadow to 12px; press translates 8px 8px and pulls the shadow to 4px. 120ms linear.",
      },
      sizes: "padding 14px 32px; label 20px",
      states: "hover: violet fill, shadow 12px; active: translate 8px",
    },
    {
      name: "Pattern Overlay",
      role: { zh: "图案叠层", en: "The pattern overlay" },
      construction: {
        zh: "用 repeating-linear-gradient（45 度斜线，8px 间隔）或 radial-gradient（6px 点阵）叠在区块上，颜色取一支撞色、不透明度 8% 到 12%。图案层永远不承载内容，它的职责是让平面不平。",
        en: "A repeating linear gradient of 45-degree stripes at 8px, or a 6px dot field, laid over a block in one clash color at 8% to 12%. The pattern layer never carries content; its job is to make the plane stop being flat.",
      },
    },
    {
      name: "Sticker Badge",
      role: { zh: "贴纸徽章", en: "The sticker badge" },
      construction: {
        zh: "48 到 72px 的全圆或星形，填一支撞色、2px 金黄描边、旋转 -8 到 8 度，压在卡片边缘并跨出 12px。里面放 11px 全大写的两行字（如「NEW / 2026」）。单屏 3 到 5 个。",
        en: "A 48 to 72px circle or star in one clash color with a 2px gold border, rotated between -8 and 8 degrees, sitting on a card edge and overhanging by 12px. Two lines of 11px uppercase sit inside, such as NEW / 2026. Three to five per screen.",
      },
    },
    {
      name: "Mixed Type Block",
      role: { zh: "混合字体块", en: "The mixed type block" },
      construction: {
        zh: "同一区块内故意混用尺寸与朝向：88px 的标题、28px 的副标、14px 的标签，各自带不同的旋转（-3、0、+2 度）与不同底色条。文字不是被排版，而是被贴上墙。",
        en: "One block deliberately mixes scale and angle: an 88px headline, a 28px subhead and a 14px label, each at its own rotation (-3, 0, +2 degrees) on its own background strip. The type is not typeset but pasted onto a wall.",
      },
    },
  ],
  imagery: {
    zh: "高饱和拼贴：图案、插画、照片、贴纸全部混用，且必须互相重叠。允许把照片压成高饱和双色调再叠图案。不使用灰度摄影、极简构图与留白式的图像。",
    en: "High-saturation collage: pattern, illustration, photography and stickers all mixed and overlapping. A photo may be crushed to a saturated duotone and patterned over. No greyscale photography, minimal composition or images that rely on emptiness.",
  },
  layout: {
    zh: "上限 1280px、容器内边距 24px，区块间距 64px。允许大量重叠、旋转与溢出。混乱必须有节奏：大块撞色与小贴纸交替出现，视线不至于无处可落。",
    en: "Capped at 1280px with 24px padding, sections 64px apart. Overlap, rotation and bleed are encouraged. The chaos needs rhythm — large clash blocks alternating with small stickers, so the eye always has somewhere to land.",
  },
  dos: [
    { zh: "五支高饱和撞色并用", en: "Five saturated clashes at once" },
    { zh: "双层或虚线粗边框", en: "Double or heavy dashed borders" },
    { zh: "多层错位实色阴影", en: "Stacked offset solid shadows" },
    { zh: "图案叠图案", en: "Pattern over pattern" },
    { zh: "标题 6xl 以上全大写", en: "Headlines above 6xl, uppercase" },
    { zh: "允许 rotate 与 skew", en: "Rotation and skew are allowed" },
  ],
  donts: [
    { zh: "不要用灰度中性色作主色", en: "Grey neutrals may not lead" },
    { zh: "不要让层与层糊在一起", en: "Never let layers smear together" },
    { zh: "不要用极简留白", en: "No minimal emptiness" },
    { zh: "不要用单层阴影", en: "No single-layer shadow" },
    { zh: "不要用圆角", en: "No rounded corners" },
    { zh: "不要只用一个强调色", en: "Never settle for one accent" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ffbe0b",
      background: "#1a0a2e",
      rose: "#d4145a",
      blue: "#3a86ff",
      violet: "#8338ec",
      mint: "#06d6a0",
    },
    prompts: [
      {
        zh: "做一个极繁主义面板：深紫 #1a0a2e 底、玫红 #d4145a 填充的区块、零圆角、border: 4px double #ffbe0b、box-shadow 4px 4px 0 #ffbe0b, 8px 8px 0 #3a86ff、transform rotate(-1deg)、内边距 28px。内部叠一层对角渐变 linear-gradient(135deg, rgba(212,20,90,0.25), rgba(131,56,236,0.25), rgba(58,134,255,0.25)) 与一层 45 度斜线图案（rgba(6,214,160,0.10)）。标题 88px/900 全大写、字距 -0.02em；标签 14px 全大写 0.24em 金黄。按钮玫红填充、金字、3px dashed #ffbe0b 描边、双层阴影，hover 时填充硬切到 #8338ec、阴影扩到 12px。",
        en: "Build a maximalist panel: deep violet #1a0a2e ground with a rose #d4145a block, zero radius, border 4px double #ffbe0b, box-shadow 4px 4px 0 #ffbe0b plus 8px 8px 0 #3a86ff, transform rotate(-1deg) and 28px padding. Inside, layer a diagonal gradient linear-gradient(135deg, rgba(212,20,90,0.25), rgba(131,56,236,0.25), rgba(58,134,255,0.25)) with 45-degree stripes at rgba(6,214,160,0.10). The headline runs 88px/900 uppercase at -0.02em, labels 14px uppercase at 0.24em in gold. The button fills rose with gold text, a 3px dashed #ffbe0b border and the double shadow, cutting to #8338ec with a 12px shadow on hover.",
      },
    ],
  },
  similar: [
    { name: "Dopamine Design", why: { zh: "同样高饱和，但多巴胺更圆润友好，极繁更硬边且层数更多", en: "Both saturated, though dopamine is rounder and friendlier while maximalism is harder and denser" } },
    { name: "Memphis", why: { zh: "同为图案与撞色，但孟菲斯有严格的几何语法，极繁没有", en: "Both pattern and clash, though Memphis keeps a strict geometric grammar that maximalism abandons" } },
  ],
  completeness: "full",
};
