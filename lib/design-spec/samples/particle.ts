import type { DesignSpec } from "../types";

export const particleSpec: DesignSpec = {
  slug: "particle",
  name: "粒子系统",
  nameEn: "Particle System",
  cover: "/styles/particle.svg",
  theme: "dark",
  northStar: {
    zh: "深空里漂浮的点与连线：数据在流动，界面只是玻璃。",
    en: "Points and lines drifting through deep space — data in motion, with glass as the only interface.",
  },
  summary: {
    zh: "粒子系统用一层漂浮的点与连接线表达「数据在流动」：深蓝黑底（#0a0e1a）、冷调强调色（蓝、青绿、紫）、粒子之间按距离阈值连线、靠近时脉冲加亮。界面本身要退到玻璃卡后面——半透明白加背景模糊，让粒子从卡片后面透出来。它的禁令很具体：不用暖色与土色、不用粗边框、不用与粒子动画抢视觉的图案、不用常规投影（阴影改用光晕）。粒子层必须尊重 reduced-motion 并在离屏时暂停。",
    en: "Particle System expresses motion of data through drifting points and connecting lines: a blue-black ground (#0a0e1a), cool accents in blue, teal and violet, lines drawn between particles under a distance threshold, and a pulse that brightens as they near. The interface itself recedes behind glass — translucent white with a background blur, so particles show through. Its prohibitions are specific: no warm or earthy colors, no heavy borders, no patterns competing with the animation, and no conventional drop shadows, since glow replaces them. The particle layer must honour reduced motion and pause offscreen.",
  },
  colors: [
    {
      name: "深蓝黑",
      nameEn: "Blue Black",
      value: "#0a0e1a",
      group: "surface",
      role: {
        zh: "页面底。带的略偏蓝，让粒子与连线在暗处仍有层次。",
        en: "The page ground — faintly blue, so particles and links keep layering in the dark.",
      },
      token: "--color-blue-black",
    },
    {
      name: "墨青",
      nameEn: "Ink Teal",
      value: "#0f1419",
      group: "surface",
      role: {
        zh: "次级区块与玻璃卡的衬底，比底色再深一点。",
        en: "Secondary sections and the bed behind glass cards, a step darker than the ground.",
      },
      token: "--color-ink-teal",
    },
    {
      name: "雾白",
      nameEn: "Mist",
      value: "#e0e8ff",
      group: "brand",
      role: {
        zh: "主文字与最亮的粒子。带蓝调的近白。",
        en: "Primary text and the brightest particles — a blue-cast near white.",
      },
      token: "--color-mist",
    },
    {
      name: "数据蓝",
      nameEn: "Data Blue",
      value: "#64c8ff",
      group: "accent",
      role: {
        zh: "连接线与粒子主色，是「数据流动」的视觉主体。",
        en: "The link lines and the particles' main color — the visual subject of data flow.",
      },
      token: "--color-data-blue",
    },
    {
      name: "脉冲青",
      nameEn: "Pulse Teal",
      value: "#64ffc8",
      group: "accent",
      role: {
        zh: "脉冲与「命中」反馈，比数据蓝更亮一档。",
        en: "Pulses and hit feedback, one step brighter than data blue.",
      },
      token: "--color-pulse-teal",
    },
    {
      name: "星云紫",
      nameEn: "Nebula Violet",
      value: "#a78bfa",
      group: "accent",
      role: {
        zh: "远层粒子与次级强调，制造纵深。",
        en: "Distant particles and secondary emphasis, manufacturing depth.",
      },
      token: "--color-nebula-violet",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "-apple-system, 'Helvetica Neue', system-ui, sans-serif",
      weights: [400, 500, 600],
      sizes: [12, 14, 17, 24, 36, 48],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.6 },
      tracking: { display: "-0.02em", label: "0.14em" },
      role: {
        zh: "全站唯一字体。界面文字要保持克制，因为视觉主体是粒子层。",
        en: "The only face. Interface text stays restrained because the particles are the subject.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 48, lineHeight: 1.1, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 600, size: 36, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", weight: 500, size: 24, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 17, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.14em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1200,
    sectionGap: 112,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "16px" },
    { element: "buttons", value: "12px" },
    { element: "inputs", value: "12px" },
    { element: "particles", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Blue Black", value: "#0a0e1a", purpose: "页面底" },
    { level: 1, name: "Glass", value: "rgba(224,232,255,0.06)", purpose: "卡片与面板" },
    { level: 2, name: "Glass Raised", value: "rgba(224,232,255,0.10)", purpose: "hover 与浮层" },
  ],
  elevation: [
    { name: "Glow", value: "0 0 40px rgba(100,200,255,0.25)" },
    { name: "Glow strong", value: "0 0 60px rgba(100,200,255,0.40)" },
    { name: "Never", value: "conventional box shadows are forbidden" },
  ],
  components: [
    {
      name: "Particle Canvas",
      role: { zh: "粒子层（签名组件）", en: "The particle layer — the signature" },
      construction: {
        zh: "一个满幅 canvas 固定在内容之后、页面底之上。粒子数按面积计算（每 10000px² 一个，上限 120 个），半径 1 到 3px，颜色取数据蓝或星云紫并带 8px 光晕。两粒子距离小于 140px 时连线，线宽 1px、不透明度按距离线性衰减到 0。靠近指针的粒子在 200px 半径内轻微外推。所有绘制在 requestAnimationFrame 内完成，离屏时用 IntersectionObserver 暂停，prefers-reduced-motion 时画一帧静态分布。",
        en: "One full-bleed canvas fixed behind content and above the ground. Density is one particle per 10000px² capped at 120, radius 1 to 3px, colored data blue or nebula violet with an 8px glow. Two particles under 140px apart connect with a 1px line whose opacity fades linearly to zero with distance. Particles within 200px of the pointer push outward slightly. All drawing happens inside requestAnimationFrame, pausing offscreen via IntersectionObserver, and reduced motion renders a single static frame.",
      },
      sizes: "density 1 / 10000px², max 120",
    },
    {
      name: "Glass Card",
      role: { zh: "内容卡与数据面板", en: "Content cards and data panels" },
      construction: {
        zh: "雾白 6% 填充、16px 圆角、1px 雾白 12% 描边、内边距 24px，20px 背景模糊，外发光 0 0 40px 数据蓝 25%——绝不用常规投影。标题 24px/600 雾白，正文 14px 雾白 70%。hover 时填充升到 10%、发光扩到 60px。",
        en: "6% mist fill, 16px radius, a 1px mist border at 12%, 24px padding, a 20px backdrop blur, and a 0 0 40px glow at 25% data blue instead of any drop shadow. Title at 24px/600 in mist, body at 14px in 70% mist. Hover raises the fill to 10% and the glow to 60px.",
      },
    },
    {
      name: "Glow Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "数据蓝 12% 填充、1px 数据蓝 40% 描边、12px 圆角、雾白文字 15px/500、padding 12px 24px，外发光 0 0 24px 数据蓝 30%。hover 时填充升到 20%、发光扩到 40px、文字转纯白。过渡 200ms。",
        en: "12% data blue fill, a 1px data blue border at 40%, 12px radius, mist text at 15px/500, 12px 24px padding, with a 0 0 24px glow at 30%. Hover raises the fill to 20%, widens the glow to 40px and turns the text pure white. 200ms.",
      },
      states: "hover: fill 20%, glow 40px",
    },
    {
      name: "Pulse Ring",
      role: { zh: "脉冲指示与选中反馈", en: "Pulse indicators and selection feedback" },
      construction: {
        zh: "以元素中心为原点，扩散一圈 1px 的脉冲青环：半径从 8px 扩到 48px、不透明度从 100% 降到 0，时长 1.2s ease-out，循环或在点击时触发一次。同一屏最多三处同时脉冲。",
        en: "A 1px pulse teal ring expanding from an element's centre: radius from 8px to 48px with opacity falling from 100% to zero over 1.2s ease-out, either looping or fired once on click. At most three pulsing at a time.",
      },
    },
    {
      name: "Nebula Field",
      role: { zh: "远层星云背景", en: "The distant nebula bed" },
      construction: {
        zh: "在粒子层之后再叠一层径向渐变（星云紫 8% 与数据蓝 6% 各一团，模糊 120px），位置随机但固定在首次渲染时，不随滚动移动。它提供纵深，不与粒子抢运动。",
        en: "Behind the canvas sits a radial gradient layer — one bloom of 8% nebula violet and one of 6% data blue, blurred 120px, positioned randomly but fixed at first render and never moving with scroll. It supplies depth without competing with the motion.",
      },
    },
  ],
  imagery: {
    zh: "图像即粒子层本身，不用摄影与插画。允许数据可视化（网络图、流向图）作为卡片内容。不使用静态背景图与几何装饰，它们会与粒子抢注意力。",
    en: "The particle layer is the imagery; photography and illustration are absent. Data visualizations such as network and flow diagrams may fill a card. No static background images or geometric ornament, which would compete with the motion.",
  },
  layout: {
    zh: "上限 1200px、容器内边距 24px，区块间距 112px。内容全部压在玻璃卡上，卡与卡之间留出 64px 让粒子层可见。首屏常为左文右空，让粒子在空白处流动。",
    en: "Capped at 1200px with 24px padding, sections 112px apart. All content sits on glass cards, with 64px between them so the particle layer stays visible. The hero usually sets text left and leaves the right open for particles to drift.",
  },
  dos: [
    { zh: "深蓝黑底配冷调强调", en: "Blue-black ground with cool accents" },
    { zh: "粒子层离屏时暂停", en: "Pause particles offscreen" },
    { zh: "连线透明度按距离衰减", en: "Fade link opacity with distance" },
    { zh: "纵深用光晕，不用常规阴影", en: "Depth via glow, never conventional shadow" },
    { zh: "内容压在玻璃卡上", en: "Content always sits on glass" },
    { zh: "尊重 reduced-motion", en: "Honour reduced motion" },
  ],
  donts: [
    { zh: "不要用暖色或土色作主调", en: "No warm or earthy palettes" },
    { zh: "不要用粗边框", en: "No heavy borders" },
    { zh: "不要用与粒子竞争的图案", en: "No patterns competing with the particles" },
    { zh: "不要用浅色背景", en: "No light grounds" },
    { zh: "不要用常规投影", en: "No conventional drop shadows" },
    { zh: "不要超过三个同时脉冲", en: "Never more than three simultaneous pulses" },
  ],
  promptGuide: {
    quickColors: {
      text: "#e0e8ff",
      background: "#0a0e1a",
      glass: "rgba(224,232,255,0.06)",
      blue: "#64c8ff",
      teal: "#64ffc8",
      violet: "#a78bfa",
    },
    prompts: [
      {
        zh: "做一个粒子系统首屏：页面底 #0a0e1a，底层一个满幅 canvas 画漂浮粒子（半径 1-3px、色 #64c8ff 带 8px 光晕），两粒子距离小于 140px 时连 1px 线并按距离衰减透明度，用 requestAnimationFrame 绘制、离屏时暂停、reduced-motion 时只画一帧。上层放一块玻璃卡：rgba(224,232,255,0.06) 填充、16px 圆角、1px rgba(224,232,255,0.12) 描边、24px 模糊、内边距 24px、box-shadow 0 0 40px rgba(100,200,255,0.25)。",
        en: "Build a particle hero: page ground #0a0e1a with a full-bleed canvas painting drifting particles (1 to 3px radius in #64c8ff with an 8px glow), connecting any two under 140px with a 1px line whose opacity fades with distance, drawn inside requestAnimationFrame, paused offscreen, and reduced to a single frame under reduced motion. Above it a glass card: rgba(224,232,255,0.06) fill, 16px radius, a 1px rgba(224,232,255,0.12) border, 24px blur, 24px padding, box-shadow 0 0 40px rgba(100,200,255,0.25).",
      },
    ],
  },
  similar: [
    { name: "Shader Gradient", why: { zh: "同属实时渲染背景，但着色器画渐变场，粒子画点与连线", en: "Both render backgrounds live, though a shader paints a gradient field while particles draw points and links" } },
    { name: "Sci-Fi HUD", why: { zh: "同为暗色科技，但粒子层是背景氛围，HUD 是仪表界面", en: "Both dark and technical, though particles supply atmosphere while the HUD is instrumentation" } },
  ],
  completeness: "full",
};
