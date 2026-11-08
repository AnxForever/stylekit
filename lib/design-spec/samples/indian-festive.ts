import type { DesignSpec } from "../types";

export const indianFestiveSpec: DesignSpec = {
  slug: "indian-festive",
  name: "印度节庆",
  nameEn: "Indian Festive",
  cover: "/styles/indian-festive.svg",
  theme: "light",
  northStar: {
    zh: "朱红、藏红花橙、金线曼陀罗：排灯节的一盏灯。",
    en: "Vermilion, saffron and a gold mandala — one lamp on a Diwali night.",
  },
  summary: {
    zh: "印度节庆来自排灯节与洒红节的视觉：象牙白底（#fff8e7）、朱红（#e63946）与藏红花橙（#ff9f1c）作主强调、金（#d4af37）大量用于装饰线与光晕、皇家紫（#7b2d8e）与孔雀绿（#2a9d8f）作辅色。曼陀罗、油灯（diya）、花瓣与珠宝纹样是主要图形，圆角取 12px 传达柔和，标题粗体加宽字距。与伊斯兰几何的精密不同，这里允许铺满与重叠——节庆本身就是密的。",
    en: "Indian Festive comes from Diwali and Holi: an ivory ground (#fff8e7), vermilion (#e63946) and saffron (#ff9f1c) as the primary emphasis, gold (#d4af37) used generously on ornament lines and glow, and royal violet (#7b2d8e) with peacock teal (#2a9d8f) supporting. Mandalas, oil lamps (diya), petals and jewel motifs carry the graphics, radii hold at 12px for softness, and headings run bold on wide tracking. Unlike the precision of Islamic geometry, this style allows fullness and overlap — a festival is dense by nature.",
  },
  colors: [
    {
      name: "朱红",
      nameEn: "Vermilion",
      value: "#e63946",
      group: "brand",
      role: {
        zh: "主色：主按钮、纱丽红与最抢眼的区块。",
        en: "The primary on buttons, sari red and the loudest blocks.",
      },
      token: "--color-vermilion",
    },
    {
      name: "象牙",
      nameEn: "Ivory",
      value: "#fff8e7",
      group: "surface",
      role: {
        zh: "页面底。暖白，像节日里的灯光照在墙上。",
        en: "The page ground — warm white, like festival light on a wall.",
      },
      token: "--color-ivory",
    },
    {
      name: "藏红花橙",
      nameEn: "Saffron",
      value: "#ff9f1c",
      group: "accent",
      role: {
        zh: "第二强调：花瓣、油灯火与渐变的一极。",
        en: "The second emphasis on petals, lamp flame and one pole of a gradient.",
      },
      token: "--color-saffron",
    },
    {
      name: "金",
      nameEn: "Gold",
      value: "#d4af37",
      group: "accent",
      role: {
        zh: "装饰线、描边与光晕。节庆感的来源，可大量使用。",
        en: "Ornament lines, strokes and glow — the source of the festive feel, used generously.",
      },
      token: "--color-gold",
    },
    {
      name: "皇家紫",
      nameEn: "Royal Violet",
      value: "#7b2d8e",
      group: "accent",
      role: {
        zh: "辅色与深色区块，用于压低整体的暖度。",
        en: "A support color and dark blocks, cooling the overall warmth.",
      },
      token: "--color-royal-violet",
    },
    {
      name: "孔雀绿",
      nameEn: "Peacock Teal",
      value: "#2a9d8f",
      group: "accent",
      role: {
        zh: "辅色与「成功」语义，是画面里唯一偏冷的色。",
        en: "A support color and success semantics — the one cool tone in the frame.",
      },
      token: "--color-peacock-teal",
    },
  ],
  fonts: [
    {
      family: "Cormorant Garamond",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400, 700],
      sizes: [14, 17, 22, 30, 40, 54],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.7 },
      tracking: { display: "0.02em", label: "0.16em" },
      role: {
        zh: "衬线体，标题 700 加宽字距。装饰性来自字形而不是额外的字族。",
        en: "Serif type with headings at 700 on wide tracking. The decoration comes from the letterforms, not extra families.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 54, lineHeight: 1.2, tracking: "0.02em", token: "--text-display" },
    { role: "heading", weight: 700, size: 40, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", weight: 400, size: 30, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 22, lineHeight: 1.65, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 17, lineHeight: 1.7, token: "--text-body" },
    { role: "label", weight: 700, size: 14, lineHeight: 1.5, tracking: "0.16em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1120,
    sectionGap: 96,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "12px" },
    { element: "buttons", value: "12px" },
    { element: "inputs", value: "12px" },
    { element: "medallions", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Ivory", value: "#fff8e7", purpose: "页面底" },
    { level: 1, name: "White Card", value: "#ffffff", purpose: "卡片" },
    { level: 2, name: "Gold Ground", value: "rgba(212,175,55,0.16)", purpose: "金色装饰底" },
  ],
  elevation: [
    { name: "Gold glow", value: "0 0 20px rgba(212,175,55,0.35)" },
    { name: "Warm lift", value: "0 8px 24px rgba(230,57,70,0.14)" },
  ],
  components: [
    {
      name: "Mandala Card",
      role: { zh: "曼陀罗卡片（核心组件）", en: "The mandala card — the core component" },
      construction: {
        zh: "白或象牙填充、12px 圆角、1px 金 50% 描边、内边距 32px，外带 0 0 20px 金 35% 的柔光。顶部中央放一个 96 到 160px 的曼陀罗（同心圆加 8 到 16 片对称花瓣，1px 金线绘制，中心一个朱红点）。标题 40px/700 朱红，正文 17px 暖灰。",
        en: "White or ivory fill, 12px radius, a 1px gold border at 50%, 32px padding, and a 0 0 20px soft glow at 35% gold. A 96 to 160px mandala centres at the top — concentric circles with eight to sixteen symmetrical petals drawn in 1px gold, a vermilion dot at the core. Title at 40px/700 in vermilion, body at 17px in warm grey.",
      },
    },
    {
      name: "Festive Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "朱红填充、象牙文字、12px 圆角、1px 金 60% 描边、17px/700、字距 0.16em、padding 14px 32px，外带 0 0 20px 金 35% 柔光。hover 时填充转藏红花橙、描边升到 100%；按下缩放 0.98。过渡 250ms ease-out。",
        en: "Vermilion fill, ivory text, 12px radius, a 1px gold border at 60%, 17px/700 at 0.16em, 14px 32px padding, with a 0 0 20px soft glow at 35% gold. Hover moves the fill to saffron and the border to full; press scales 0.98. 250ms ease-out.",
      },
      sizes: "padding 14px 32px; label 17px",
      states: "hover: saffron fill, gold border full; active: scale 0.98",
    },
    {
      name: "Diya Lamp",
      role: { zh: "油灯装饰", en: "The diya lamp ornament" },
      construction: {
        zh: "一个 32 到 64px 的陶碗形（border-radius 40% 40% 50% 50%），填朱红或金，碗口上方放一个 16px 的水滴形火焰（藏红花橙到黄的径向渐变）并带 0 0 16px 橙 60% 的柔光。它是最能标识节庆的元素，单屏 2 到 4 盏。",
        en: "A 32 to 64px lamp bowl (border-radius 40% 40% 50% 50%) in vermilion or gold, with a 16px teardrop flame above the rim (a radial saffron-to-yellow gradient) under a 0 0 16px soft glow at 60% orange. It identifies the festival more than anything else — two to four per screen.",
      },
    },
    {
      name: "Jewel Gradient",
      role: { zh: "珠宝色渐变带", en: "The jewel-tone gradient band" },
      construction: {
        zh: "一条横向渐变带（朱红经藏红花到金，或紫经孔雀绿到金），高 8 到 16px，用于区块之间或卡片顶部。渐变必须平滑且只有三站，越界会变成浑浊。",
        en: "A horizontal gradient band running vermilion through saffron into gold, or violet through peacock teal into gold, 8 to 16px tall, used between sections or along a card top. The gradient stays smooth with exactly three stops; more turns muddy.",
      },
    },
    {
      name: "Petal Scatter",
      role: { zh: "花瓣散落装饰", en: "Scattered petals" },
      construction: {
        zh: "8 到 20 片小的花瓣或圆形（各 8 到 16px），颜色取藏红花、朱红或金，不透明度 40% 到 80%，随机散布在区块上并各自旋转 0 到 90 度。它模拟洒红节的彩粉与花瓣，单屏 1 到 2 组。",
        en: "Eight to twenty small petals or circles of 8 to 16px in saffron, vermilion or gold at 40% to 80% opacity, scattered randomly across a section and each rotated between zero and ninety degrees. They evoke the powder and petals of Holi, one or two clusters per screen.",
      },
    },
  ],
  imagery: {
    zh: "节庆摄影与装饰图：油灯、花瓣、纱丽纹样、珠宝、曼陀罗、彩粉。必须暖调、饱和、可见金色。允许把照片处理成暖金调。不使用冷调摄影、极简构图与无装饰图像。",
    en: "Festival photography and ornament: lamps, petals, sari pattern, jewellery, mandalas, colored powder. Warm, saturated, with visible gold, and a photo may be graded warm gold. No cool-toned photography, minimal composition or unornamented imagery.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 96px。允许装饰铺满与重叠——节庆的密度是内容的一部分。标题常居中，正文可左对齐。",
    en: "Capped at 1120px with 24px padding, sections 96px apart. Ornament may fill and overlap — a festival's density is part of its content. Headings often centre while body stays left-aligned.",
  },
  dos: [
    { zh: "象牙底配朱红与藏红花橙", en: "Ivory ground with vermilion and saffron" },
    { zh: "金可大量用于装饰线与光晕", en: "Gold may be used generously on line and glow" },
    { zh: "曼陀罗与油灯作图形语汇", en: "Mandalas and oil lamps carry the graphics" },
    { zh: "圆角 12px", en: "Radius holds at 12px" },
    { zh: "渐变带恰好三站", en: "Gradient bands take exactly three stops" },
    { zh: "允许装饰铺满与重叠", en: "Ornament may fill and overlap" },
  ],
  donts: [
    { zh: "不要用冷调摄影", en: "No cool-toned photography" },
    { zh: "不要用极简构图", en: "No minimal composition" },
    { zh: "不要让渐变超过三站", en: "Never exceed three gradient stops" },
    { zh: "不要用锐角", en: "No sharp right angles" },
    { zh: "不要让装饰压过文字", en: "Never let ornament overpower text" },
    { zh: "不要混用两套圆角", en: "Never mix two radius systems" },
  ],
  promptGuide: {
    quickColors: {
      text: "#e63946",
      background: "#fff8e7",
      saffron: "#ff9f1c",
      gold: "#d4af37",
      violet: "#7b2d8e",
      teal: "#2a9d8f",
    },
    prompts: [
      {
        zh: "做一个印度节庆卡片：白或象牙 #fff8e7 填充、12px 圆角、1px rgba(212,175,55,0.5) 描边、内边距 32px、box-shadow 0 0 20px rgba(212,175,55,0.35)。顶部居中放一个 120px 的曼陀罗（同心圆加 12 片对称花瓣、1px 金线、中心一个朱红 #e63946 点）。标题 40px/700 Cormorant Garamond、色 #e63946、字距 0.02em；正文 17px、色 #5a4a3a。按钮 #e63946 填充、象牙文字、12px 圆角、1px 金描边、padding 14px 32px、金柔光，hover 时填充转 #ff9f1c。区块顶部加一条 12px 的三站渐变带（#e63946 → #ff9f1c → #d4af37）。页面底色 #fff8e7。",
        en: "Build an Indian festive card: white or ivory #fff8e7 fill, 12px radius, a 1px rgba(212,175,55,0.5) border, 32px padding, box-shadow 0 0 20px rgba(212,175,55,0.35). A 120px mandala centres at the top — concentric circles with twelve symmetrical petals in 1px gold around a vermilion #e63946 dot. The title runs 40px/700 Cormorant Garamond at 0.02em in #e63946 with body at 17px in #5a4a3a. The button fills #e63946 with ivory text on a 12px radius, a 1px gold border, 14px 32px padding and a gold glow, moving to #ff9f1c on hover. A 12px three-stop gradient band (#e63946 to #ff9f1c to #d4af37) caps the section. The page ground is #fff8e7.",
      },
    ],
  },
  similar: [
    { name: "Islamic Geometric", why: { zh: "同为金色装饰传统，但伊斯兰禁具象且极精密，节庆允许具象与铺满", en: "Both gold ornament traditions, though Islamic forbids figuration and demands precision while this allows figures and fullness" } },
    { name: "Art Deco", why: { zh: "同样用金线，但装饰艺术是几何机器时代，节庆是花卉与宗教", en: "Both use gold line, though Art Deco is machine-age geometry while this is floral and devotional" } },
  ],
  completeness: "full",
};
