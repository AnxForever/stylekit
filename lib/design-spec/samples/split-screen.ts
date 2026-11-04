import type { DesignSpec } from "../types";

export const splitScreenSpec: DesignSpec = {
  slug: "split-screen",
  name: "分屏布局",
  nameEn: "Split Screen",
  cover: "/styles/split-screen.svg",
  theme: "light",
  northStar: {
    zh: "两块内容各占一半，靠对比产生张力，靠平衡避免刺眼。",
    en: "Two halves, each holding its ground — tension from contrast, comfort from balance.",
  },
  summary: {
    zh: "分屏布局用一条中缝把视口切成两半，两侧放互相映照的内容：图与文、旧与新、问题与答案。它的规则全是平衡问题——两侧内容绝不能完全相同（那是无意义分屏），视觉重量不能严重失衡（一边满页面一边空白），阅读顺序不能被中缝切断，分割线不能突兀到抢戏。移动端必须放弃分屏转为上下堆叠，否则每侧只有 180px 宽。允许非对称分屏（如 40:60）来表达主次。",
    en: "Split Screen divides the viewport down the middle with two halves that mirror each other: image and text, old and new, problem and answer. Every rule is about balance — the two sides must never hold identical content, since that is a pointless split; visual weight cannot collapse to one side; the seam must not cut the reading order; and the divider must not shout. Mobile abandons the split for stacking, or each half ends up 180px wide. Asymmetric splits such as 40:60 are allowed to express rank.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#0f0f0f",
      group: "brand",
      role: {
        zh: "深色一侧的底与文字。用于制造两侧的最大对比。",
        en: "The dark half's ground and text — the source of the split's maximum contrast.",
      },
      token: "--color-ink",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "浅色一侧的底。与墨成对，构成整页的基本张力。",
        en: "The light half's ground, paired with ink to form the page's basic tension.",
      },
      token: "--color-white",
    },
    {
      name: "红",
      nameEn: "Red",
      value: "#ff4757",
      group: "accent",
      role: {
        zh: "「之后」「新」这一侧的强调，与蓝形成对立。",
        en: "Emphasis on the 'after' or 'new' side, opposing blue.",
      },
      token: "--color-red",
    },
    {
      name: "绿",
      nameEn: "Green",
      value: "#2ed573",
      group: "accent",
      role: {
        zh: "正向结果与成功对比项。",
        en: "Positive outcomes and the winning side of a comparison.",
      },
      token: "--color-green",
    },
    {
      name: "蓝",
      nameEn: "Blue",
      value: "#1e90ff",
      group: "accent",
      role: {
        zh: "「之前」「旧」这一侧的强调，与红形成对立。",
        en: "Emphasis on the 'before' or 'old' side, opposing red.",
      },
      token: "--color-blue",
    },
    {
      name: "橙",
      nameEn: "Amber",
      value: "#ffa502",
      group: "accent",
      role: {
        zh: "需要注意的差异项与高亮。",
        en: "Differences worth noticing, and highlights.",
      },
      token: "--color-amber",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 500, 700],
      sizes: [12, 14, 16, 22, 32, 44],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.55 },
      tracking: { display: "-0.02em", label: "0.08em" },
      role: {
        zh: "全站唯一字体。两侧标题必须同级同字号，否则视觉重量会失衡。",
        en: "The only face. Both halves use the same heading size, or the visual weight tips.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 44, lineHeight: 1.1, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 700, size: 32, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", weight: 500, size: 22, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.55, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.08em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1440,
    sectionGap: 0,
    cardPadding: 48,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "16px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "8px" },
  ],
  surfaces: [
    { level: 0, name: "Ink Half", value: "#0f0f0f", purpose: "深色一侧" },
    { level: 1, name: "White Half", value: "#ffffff", purpose: "浅色一侧" },
    { level: 2, name: "Image Half", value: "full-bleed photo", purpose: "图像一侧" },
  ],
  elevation: [
    { name: "Panel", value: "0 12px 32px rgba(15,15,15,0.10)" },
    { name: "Button", value: "0 4px 12px rgba(15,15,15,0.15)" },
  ],
  components: [
    {
      name: "Split Panel",
      role: { zh: "分屏容器", en: "The split container" },
      construction: {
        zh: "grid-template-columns 取 1fr 1fr（对称）或 0.8fr 1.2fr（非对称），最小高度 100vh（首屏）或 600px（内容区）。每侧内边距 48px、内容垂直居中、单列、行宽不超过 34em。中缝用 1px 深色 10% 的线或干脆留 48px 空白。",
        en: "grid-template-columns runs 1fr 1fr for symmetry or 0.8fr 1.2fr for asymmetry, with a minimum height of 100vh in heroes or 600px in content blocks. Each half takes 48px padding with vertically centred, single-column content at a thirty-four-character measure. The seam is either a 1px line at 10% or nothing but 48px of space.",
      },
      sizes: "100vh hero; 600px content",
    },
    {
      name: "Contrast Pair",
      role: { zh: "两侧的成对内容", en: "The paired content on both sides" },
      construction: {
        zh: "两侧必须构成对照而不是重复：一图一文、一暗一亮、一问题一答案。标签（如「之前」「之后」）用 12px 全大写 0.08em，分别取蓝与红。两侧标题字号必须相同。",
        en: "The halves must contrast rather than repeat: image against text, dark against light, problem against answer. Labels such as before and after sit at 12px uppercase 0.08em in blue and red respectively. Both headline sizes must match exactly.",
      },
    },
    {
      name: "Split CTA",
      role: { zh: "每侧的独立行动", en: "A per-side call to action" },
      construction: {
        zh: "8px 圆角、16px/500、padding 12px 24px。深色侧用白底墨字，浅色侧用墨底白字——按钮必须与所在侧反色，否则会失去分离感。hover 时只改亮度，不做位移。",
        en: "8px radius, 16px/500, 12px 24px padding. The dark half takes a white button with ink text; the light half inverts it. Each button must oppose its own side or the separation is lost. Hover changes brightness only, never position.",
      },
    },
    {
      name: "Seam Divider",
      role: { zh: "中缝分隔", en: "The centre seam" },
      construction: {
        zh: "优先用留白（48px 间隙）而不是线。需要线时用 1px 深色 10%，不贯穿全高（上下各留 15%），避免把版面切成两块互不相关的图。",
        en: "Whitespace of 48px is preferred over a line. Where a line is needed it is 1px at 10%, running only 70% of the height with 15% clear at each end, so the page never reads as two unrelated images.",
      },
    },
    {
      name: "Compare Row",
      role: { zh: "对比行（移动端保留的对照结构）", en: "The comparison row kept on mobile" },
      construction: {
        zh: "移动端放弃左右分屏，改为上下堆叠，但对照关系必须保留：每项上方用 12px 标签标明「之前」「之后」，并保持颜色对应（蓝对红）。堆叠顺序与阅读顺序一致。",
        en: "Mobile drops the split for a stack while keeping the contrast: each item carries a 12px before or after label with the color pairing intact (blue against red). The stack follows the reading order.",
      },
    },
  ],
  imagery: {
    zh: "一张对比性强的照片或截图占一侧，另一侧是文字或纯色块。图像比例固定（1:1 或 4:5），允许裁切但不允许拉伸。不使用两侧都放图像的对称布局，除非两张图构成明确对照。",
    en: "One strongly contrasting photo or screenshot holds a side while the other carries text or a solid block. Image ratios lock to 1:1 or 4:5 — cropping is fine, stretching is not. Two images only when they form an explicit comparison.",
  },
  layout: {
    zh: "上限 1440px，首屏 100vh 分两半。内容区可用 40:60 的非对称比例表达主次。中缝对齐整页网格。移动端（小于 768px）转为单列堆叠，每侧内边距降到 24px。",
    en: "Capped at 1440px with a 100vh split hero. Content blocks may use a 40:60 asymmetry to rank the halves. The seam aligns with the page grid. Below 768px the layout stacks into one column with padding down to 24px.",
  },
  dos: [
    { zh: "两侧内容必须构成对照", en: "The two halves must contrast" },
    { zh: "两侧标题同字号", en: "Both headlines share one size" },
    { zh: "允许 40:60 非对称分屏", en: "Asymmetry at 40:60 is allowed" },
    { zh: "中缝优先用留白", en: "Prefer whitespace at the seam" },
    { zh: "按钮与所在侧反色", en: "Buttons invert against their own side" },
    { zh: "移动端转单列堆叠并保留标签", en: "Stack on mobile, keeping the labels" },
  ],
  donts: [
    { zh: "不要让两侧内容完全相同", en: "Never put identical content on both sides" },
    { zh: "不要在移动端保持分屏", en: "Do not keep the split on mobile" },
    { zh: "不要让视觉重量严重失衡", en: "No severe imbalance in visual weight" },
    { zh: "不要切断阅读顺序", en: "Do not cut the reading order at the seam" },
    { zh: "不要让分割线突兀", en: "Do not let the divider shout" },
    { zh: "不要在 hover 时位移按钮", en: "Never translate a button on hover" },
  ],
  promptGuide: {
    quickColors: {
      text: "#0f0f0f",
      dark: "#0f0f0f",
      light: "#ffffff",
      before: "#1e90ff",
      after: "#ff4757",
      muted: "#6b7280",
    },
    prompts: [
      {
        zh: "做一个分屏首屏：外层 grid grid-cols-2、min-height 100vh。左半深色 #0f0f0f，内含 12px 全大写 0.08em 的 #1e90ff 标签（BEFORE）、44px/700 白色标题与一段 16px 说明，底部一个白底墨字按钮。右半白色，标签用 #ff4757（AFTER），标题同字号但墨色，按钮墨底白字。两侧各内边距 48px、内容垂直居中。移动端改为单列堆叠，顺序与阅读一致。",
        en: "Build a split hero: an outer grid with two columns at a 100vh minimum. The left half is #0f0f0f with a 12px uppercase 0.08em label in #1e90ff (BEFORE), a 44px/700 white headline, 16px copy, and a white button with ink text at the bottom. The right half is white with an #ff4757 label (AFTER), a headline at the same size in ink, and an ink button with white text. Each half takes 48px padding with content centred vertically. On mobile it stacks into one column in reading order.",
      },
    ],
  },
  similar: [
    { name: "Holy Grail Layout", why: { zh: "同为多栏结构，但圣杯是三栏信息分区，分屏是两半对照", en: "Both multi-column, though holy grail splits information across three columns while this contrasts two halves" } },
    { name: "Z-Pattern Layout", why: { zh: "同样服务转化，但 Z 型靠视线路径，分屏靠对比张力", en: "Both serve conversion, though Z-pattern moves the eye while the split builds tension" } },
  ],
  completeness: "full",
};
