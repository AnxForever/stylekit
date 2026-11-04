import type { DesignSpec } from "../types";

export const impressionistOilSpec: DesignSpec = {
  slug: "impressionist-oil",
  name: "油画印象派风",
  nameEn: "Impressionist Oil",
  cover: "/styles/impressionist-oil.svg",
  theme: "light",
  northStar: {
    zh: "厚涂的颜料与斑驳的光：界面像一张还没干的画布。",
    en: "Thick paint and dappled light — an interface like a canvas still wet.",
  },
  summary: {
    zh: "油画印象派风借鉴莫奈与雷诺阿：暖画布底（#f5f0e1）、粗笔触纹理、斑驳的光影、点彩式的杂色、以及厚涂的体积感。技术上靠三件事——按钮用线性渐变模拟颜料从管里挤出的走向，卡片用 repeating-linear-gradient 做出笔触方向的纹理，阴影用「实色底加模糊扩散」的双层组合模拟厚涂堆起的高度。它禁止纯平色块、禁止霓虹荧光、禁止等宽字体、禁止全大写，而且按钮按下必须下沉 3px，因为实色阴影不做陷入感就会失真。",
    en: "Impressionist Oil borrows from Monet and Renoir: a warm canvas (#f5f0e1), heavy brush texture, dappled light, pointillist color mixing, and the volume of impasto. Three techniques carry it — buttons use a linear gradient to imitate the direction paint leaves the tube, cards use a repeating gradient to texture the brush direction, and shadows pair a solid base with a blurred spread to fake the height of thick paint. Flat blocks, neon and fluorescent color, monospace and uppercase are all refused, and a button press must sink 3px, because a solid shadow without the sink reads as broken.",
  },
  colors: [
    {
      name: "画布",
      nameEn: "Canvas",
      value: "#f5f0e1",
      group: "surface",
      role: {
        zh: "页面底。亚麻画布的暖米色，所有笔触画在它上面。",
        en: "The page ground — warm linen that every stroke sits on.",
      },
      token: "--color-canvas",
    },
    {
      name: "暖赭",
      nameEn: "Warm Ochre",
      value: "#e8a87c",
      group: "brand",
      role: {
        zh: "主色：日落、肤色与主按钮。印象派最常用的暖调。",
        en: "The primary on sunset, skin and buttons — the Impressionists' favourite warmth.",
      },
      token: "--color-warm-ochre",
    },
    {
      name: "朱红",
      nameEn: "Vermilion",
      value: "#c0392b",
      group: "accent",
      role: {
        zh: "强调与花的红，出现在小面积但极醒目。",
        en: "Emphasis and the red of flowers — small in area, impossible to miss.",
      },
      token: "--color-vermilion",
    },
    {
      name: "深蓝",
      nameEn: "Deep Blue",
      value: "#2c3e50",
      group: "brand",
      role: {
        zh: "文字与阴影。印象派从不用纯黑，用深蓝作暗部。",
        en: "Text and shadow — the Impressionists never used black, they used deep blue.",
      },
      token: "--color-deep-blue",
    },
    {
      name: "青绿",
      nameEn: "Teal",
      value: "#1abc9c",
      group: "accent",
      role: {
        zh: "水与叶的冷侧，与朱红形成点彩式对比。",
        en: "Water and foliage on the cool side, contrasting the vermilion pointillist style.",
      },
      token: "--color-teal",
    },
    {
      name: "日黄",
      nameEn: "Sunlight",
      value: "#f5d88a",
      group: "accent",
      role: {
        zh: "光斑与高光，是画面里最亮的笔触。",
        en: "Dappled light and highlights — the brightest stroke in the frame.",
      },
      token: "--color-sunlight",
    },
  ],
  fonts: [
    {
      family: "Lora",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400, 700],
      sizes: [15, 18, 22, 30, 40, 54],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.75 },
      tracking: { display: "0.01em", label: "0.06em" },
      role: {
        zh: "粗衬线，字重 700 用于标题。绝不用等宽，也绝不用全大写——印象派是柔的。",
        en: "A heavy serif at 700 for headings. Never monospace, never uppercase — Impressionism is soft.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 54, lineHeight: 1.2, tracking: "0.01em", token: "--text-display" },
    { role: "heading", weight: 700, size: 40, lineHeight: 1.25, token: "--text-heading" },
    { role: "subheading", weight: 400, size: 30, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 22, lineHeight: 1.7, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 18, lineHeight: 1.75, token: "--text-body" },
    { role: "label", weight: 700, size: 15, lineHeight: 1.5, tracking: "0.06em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1080,
    sectionGap: 112,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "10px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "8px" },
  ],
  surfaces: [
    { level: 0, name: "Canvas", value: "#f5f0e1", purpose: "页面底（带亚麻纹理）" },
    { level: 1, name: "Warm Wash", value: "rgba(232,168,124,0.14)", purpose: "暖色区块" },
    { level: 2, name: "Cool Wash", value: "rgba(26,188,156,0.10)", purpose: "冷色区块" },
  ],
  elevation: [
    { name: "Impasto", value: "0 4px 0 rgba(44,62,80,0.18), 0 12px 28px rgba(44,62,80,0.14)" },
    { name: "Impasto hover", value: "0 6px 0 rgba(44,62,80,0.20), 0 18px 36px rgba(44,62,80,0.18)" },
    { name: "Pressed", value: "0 1px 0 rgba(44,62,80,0.18)" },
  ],
  components: [
    {
      name: "Paint Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "暖赭上下渐变（#f0b98f 到 #d99a6d）、画布色文字或深蓝文字、8px 圆角、无描边、18px/700、padding 14px 32px，厚涂阴影 0 4px 0 深蓝 18% 加 0 12px 28px 深蓝 14%。hover 时渐变提亮、阴影扩到 36px；按下时 translateY(3px) 且阴影收到 1px——这是颜料被压下去的感觉。焦点环必须带画布色 offset。",
        en: "A warm ochre gradient (#f0b98f to #d99a6d), canvas or deep blue text, 8px radius, no border, 18px/700, 14px 32px padding, and an impasto shadow of 0 4px 0 at 18% deep blue plus 0 12px 28px at 14%. Hover brightens the gradient and widens the shadow to 36px; press applies translateY(3px) and pulls the shadow to 1px — paint being pressed. The focus ring must carry a canvas-colored offset.",
      },
      sizes: "padding 14px 32px; label 18px",
      states: "hover: brighter gradient; active: sink 3px, shadow 1px",
    },
    {
      name: "Brushstroke Card",
      role: { zh: "笔触卡片（核心组件）", en: "The brushstroke card — the core component" },
      construction: {
        zh: "画布色填充并叠一层 repeating-linear-gradient 笔触纹理（8px 间隔、深蓝 3%、角度 -12 度，模拟笔刷方向），10px 圆角、1px 深蓝 12% 描边、内边距 32px，厚涂阴影。标题 40px/700 深蓝，正文 18px 深蓝 75%。hover 时阴影加深加厚。",
        en: "A canvas fill under a repeating linear gradient of brushstrokes (8px intervals, 3% deep blue, angled -12 degrees to imitate the brush), 10px radius, a 1px deep blue border at 12%, 32px padding and the impasto shadow. The title runs 40px/700 in deep blue with body at 18px in 75%. Hover deepens and thickens the shadow.",
      },
    },
    {
      name: "Dab Light",
      role: { zh: "光斑与点彩", en: "Dappled light and dabs" },
      construction: {
        zh: "一组 6 到 14 个半径 12 到 32px 的圆形，颜色取日黄、青绿或朱红并降到 20% 到 35%，绝对定位在区块上，允许互相重叠、互相柔化。它们模拟穿过树叶的光斑，单屏 2 到 3 组。",
        en: "A cluster of six to fourteen circles between 12 and 32px in radius, colored sunlight, teal or vermilion at 20% to 35%, absolutely positioned over a section and free to overlap and soften each other. They imitate light through leaves, two or three clusters per screen.",
      },
    },
    {
      name: "Mixed Hue Edge",
      role: { zh: "混色边缘", en: "The mixed-hue edge" },
      construction: {
        zh: "边框不用单一颜色，而用两层错开的描边：底层朱红 25%、上层青绿 20%，各偏移 1px，读起来像颜料在边界处混在了一起。它替代纯色描边。",
        en: "Rather than one color, a border uses two offset strokes — vermilion at 25% beneath teal at 20%, each shifted 1px — so the edge reads as paint mixed at the boundary. It replaces the solid border.",
      },
    },
    {
      name: "Canvas Field",
      role: { zh: "暗场输入", en: "Input field" },
      construction: {
        zh: "画布色填充、8px 圆角、1px 深蓝 20% 描边、padding 12px 16px、18px 衬线。聚焦时描边转暖赭并加 2px 的暖赭 25% 外环，外环 offset 取画布色。",
        en: "A canvas fill, 8px radius, a 1px deep blue border at 20%, 12px 16px padding at 18px serif. Focus turns the border warm ochre and adds a 2px ring at 25% with the offset in canvas color.",
      },
    },
  ],
  imagery: {
    zh: "印象派油画：风景、花园、水面、人物小景。必须可见笔触与混色，暖调、柔光。允许把照片处理成油画笔触。不使用纯平色块、霓虹图像与高清写实摄影。",
    en: "Impressionist oil painting: landscapes, gardens, water, small figures. Brushstroke and mixed color must remain visible, warm in cast with soft light. A photo may be rendered into brushstrokes. No flat blocks, neon imagery or high-resolution realistic photography.",
  },
  layout: {
    zh: "上限 1080px、容器内边距 24px，区块间距 112px。允许元素重叠与柔化边缘。整页保留画布纹理，色块像薄涂一样半透明。",
    en: "Capped at 1080px with 24px padding, sections 112px apart. Elements may overlap and soften at their edges. The canvas texture shows through everywhere, with blocks behaving like thin glazes.",
  },
  dos: [
    { zh: "暖画布底加亚麻纹理", en: "Warm canvas ground with linen texture" },
    { zh: "按钮用渐变模拟颜料挤出", en: "Buttons use a gradient like paint from a tube" },
    { zh: "卡片叠笔触方向的纹理", en: "Cards carry brush-direction texture" },
    { zh: "阴影用实色底加模糊扩散", en: "Shadows pair a solid base with a blurred spread" },
    { zh: "按下必须下沉 3px", en: "Press must sink 3px" },
    { zh: "焦点环带画布色 offset", en: "Focus rings carry a canvas-colored offset" },
  ],
  donts: [
    { zh: "不要用纯平色块", en: "No flat blocks" },
    { zh: "不要用霓虹或荧光色", en: "No neon or fluorescent color" },
    { zh: "不要用等宽字体", en: "No monospace type" },
    { zh: "不要用全大写文字", en: "No uppercase text" },
    { zh: "不要让按钮按下不下沉", en: "Never skip the press sink" },
    { zh: "不要让焦点环贴住元素", en: "Never let the focus ring touch the element" },
  ],
  promptGuide: {
    quickColors: {
      text: "#2c3e50",
      background: "#f5f0e1",
      ochre: "#e8a87c",
      vermilion: "#c0392b",
      teal: "#1abc9c",
      sunlight: "#f5d88a",
    },
    prompts: [
      {
        zh: "做一个油画印象派卡片：画布色 #f5f0e1 填充、叠一层 repeating-linear-gradient 笔触纹理（8px 间隔、rgba(44,62,80,0.03)、角度 -12deg）、10px 圆角、1px rgba(44,62,80,0.12) 描边、内边距 32px、box-shadow 0 4px 0 rgba(44,62,80,0.18), 0 12px 28px rgba(44,62,80,0.14)。标题 40px/700 Lora、色 #2c3e50；正文 18px、行高 1.75。按钮暖赭渐变 linear-gradient(#f0b98f, #d99a6d)、8px 圆角、18px/700、padding 14px 32px，hover 提亮，active 时 translateY(3px) 且阴影收到 1px。页面底色 #f5f0e1。",
        en: "Build an Impressionist card: canvas #f5f0e1 fill under a repeating linear gradient of brushstrokes (8px intervals, rgba(44,62,80,0.03), -12 degrees), 10px radius, a 1px rgba(44,62,80,0.12) border, 32px padding, box-shadow 0 4px 0 rgba(44,62,80,0.18) and 0 12px 28px rgba(44,62,80,0.14). The title runs 40px/700 Lora in #2c3e50 with body at 18px on 1.75 leading. The button takes a warm ochre gradient linear-gradient(#f0b98f, #d99a6d) on an 8px radius, 18px/700, 14px 32px padding, brightening on hover and applying translateY(3px) with the shadow pulled to 1px on press. The page ground is #f5f0e1.",
      },
    ],
  },
  similar: [
    { name: "Watercolor Art", why: { zh: "同为绘画语言，但水彩是渗化薄涂，油画是厚涂笔触", en: "Both painterly, though watercolor bleeds thin while oil builds thick strokes" } },
    { name: "Natural Organic", why: { zh: "同样暖调自然，但自然有机是极简，印象派是纹理密集", en: "Both warm and natural, though natural organic is minimal while Impressionism is texture-dense" } },
  ],
  completeness: "full",
};
