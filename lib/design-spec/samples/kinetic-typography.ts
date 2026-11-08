import type { DesignSpec } from "../types";

export const kineticTypographySpec: DesignSpec = {
  slug: "kinetic-typography",
  name: "动力学排印",
  nameEn: "Kinetic Typography",
  cover: "/styles/kinetic-typography.svg",
  theme: "dark",
  northStar: {
    zh: "字就是界面：它逐个到场、字重会呼吸、宽度跟着滚动速度伸展。",
    en: "The type is the interface: letters arrive one by one, weights breathe, widths stretch with scroll velocity.",
  },
  summary: {
    zh: "动力学排印把可变字体当成动画本体：近黑舞台（#0b0b0c）配暖骨白文字（#f4f1eb），字母逐个入场、字重呼吸、宽度随滚动速度伸展，唯一的强调色是信号橙（#ff4d00），只落在主 CTA、关键词与 hover 态。它的技术纪律比视觉更硬——只许动 transform、opacity 与 font-variation-settings，绝不动 top、left、width、height（那会重排卡顿）；离散入场用 expo-out 0.7 到 0.9 秒，hover 用 0.3 到 0.5 秒，超过 1.2 秒或对一次性过渡用 linear 都算错；一屏只能有一个主导动效（一次一个主角）。",
    en: "Kinetic Typography makes the variable font the animation itself: a near-black stage (#0b0b0c) under warm bone text (#f4f1eb), letters arriving one at a time, weights breathing, widths stretching with scroll velocity, and one signal orange (#ff4d00) reserved for the primary CTA, key words and hover. Its technical discipline outranks its look — only transform, opacity and font-variation-settings may animate; top, left, width and height are forbidden because they reflow. Discrete entrances run expo-out over 0.7 to 0.9 seconds, hover over 0.3 to 0.5, and anything past 1.2 seconds or linear on a one-shot transition is wrong. One screen carries one lead animation — one protagonist at a time.",
  },
  colors: [
    {
      name: "墨黑",
      nameEn: "Ink Black",
      value: "#0b0b0c",
      group: "surface",
      role: {
        zh: "舞台底。近黑，让骨白文字与橙色跳跃。",
        en: "The stage — near black, letting bone text and orange jump.",
      },
      token: "--color-ink-black",
    },
    {
      name: "骨白",
      nameEn: "Bone",
      value: "#f4f1eb",
      group: "brand",
      role: {
        zh: "全部文字。微暖的白，在深底上不刺眼。",
        en: "All type — a faintly warm white that does not sting on the dark.",
      },
      token: "--color-bone",
    },
    {
      name: "信号橙",
      nameEn: "Signal Orange",
      value: "#ff4d00",
      group: "accent",
      role: {
        zh: "唯一强调色：主 CTA、关键词与 hover。绝不作大面积底色。",
        en: "The only accent on the primary CTA, key words and hover — never a surface.",
      },
      token: "--color-signal-orange",
    },
    {
      name: "面板",
      nameEn: "Panel",
      value: "#141416",
      group: "surface",
      role: {
        zh: "卡片与浮层，只比底色亮一档。",
        en: "Cards and overlays, one step above the stage.",
      },
      token: "--color-panel",
    },
    {
      name: "灰字",
      nameEn: "Muted Grey",
      value: "#8a857b",
      group: "neutral",
      role: {
        zh: "次级文字、元数据与时间戳。",
        en: "Secondary text, metadata and timestamps.",
      },
      token: "--color-muted-grey",
    },
  ],
  fonts: [
    {
      family: "Inter Variable",
      substitute: "'Helvetica Neue', system-ui, sans-serif",
      weights: [300, 500, 700, 900],
      sizes: [14, 18, 26, 40, 64, 96, 132],
      lineHeight: { display: 0.92, heading: 1, body: 1.5 },
      tracking: { display: "-0.04em", label: "0.12em" },
      role: {
        zh: "可变字体是这套风格的动画引擎：字重与字宽随滚动与交互实时变化，标题 96 到 132px。",
        en: "The variable font is the animation engine — weight and width shift live with scroll and interaction, headlines running 96 to 132px.",
      },
      token: "--font-display",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 132, lineHeight: 0.92, tracking: "-0.04em", token: "--text-display" },
    { role: "heading-lg", weight: 900, size: 96, lineHeight: 0.95, tracking: "-0.03em", token: "--text-heading-lg" },
    { role: "heading", weight: 700, size: 64, lineHeight: 1, tracking: "-0.03em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 40, lineHeight: 1.05, token: "--text-subheading" },
    { role: "body-lg", weight: 500, size: 18, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 300, size: 14, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 500, size: 14, lineHeight: 1.4, tracking: "0.12em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 160],
    maxWidth: 1360,
    sectionGap: 160,
    cardPadding: 24,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "2px" },
    { element: "buttons", value: "2px" },
    { element: "inputs", value: "2px" },
  ],
  surfaces: [
    { level: 0, name: "Ink Black", value: "#0b0b0c", purpose: "舞台" },
    { level: 1, name: "Panel", value: "#141416", purpose: "卡片" },
  ],
  elevation: [
    { name: "None", value: "none — the type carries the depth" },
    { name: "Panel", value: "0 24px 60px rgba(0,0,0,0.60)" },
  ],
  components: [
    {
      name: "Letter Stagger",
      role: { zh: "字母逐个入场（核心动效）", en: "Letter-by-letter entrance — the core motion" },
      construction: {
        zh: "标题按字符拆成 span，每个字符初始 translateY(110%) 加 opacity 0，进入视口时按 30 到 40ms 间隔依次回到 0 与 1，缓动 cubic-bezier(0.22, 1, 0.36, 1)（expo-out），单字符时长 0.7 到 0.9 秒。父容器加 overflow hidden 形成遮罩上升，绝不用纯 opacity 淡入代替。prefers-reduced-motion 时直接显示终态。",
        en: "The headline splits into per-character spans, each starting at translateY(110%) with opacity 0, resolving in sequence at 30 to 40ms intervals on cubic-bezier(0.22, 1, 0.36, 1) at 0.7 to 0.9 seconds each. The parent clips with overflow hidden so the letters rise through a mask — a plain opacity fade is not an acceptable substitute. Reduced motion shows the final state immediately.",
      },
      sizes: "stagger 30–40ms; per-letter 0.7–0.9s",
    },
    {
      name: "Variable Breath",
      role: { zh: "字重与字宽呼吸", en: "Weight and width breathing" },
      construction: {
        zh: "用 font-variation-settings 在 2.4 秒内循环改变 wght（300 到 900）与 wdth（85 到 100），缓动 ease-in-out。连续装饰循环不受一次性过渡的 1.2 秒上限约束。单屏最多一个元素在做呼吸，否则会互相打架。",
        en: "font-variation-settings cycles wght from 300 to 900 and wdth from 85 to 100 over 2.4 seconds on ease-in-out. Continuous decorative loops sit outside the 1.2-second ceiling for one-shot transitions. Only one element breathes per screen, or they fight.",
      },
      sizes: "2.4s ease-in-out loop",
    },
    {
      name: "Scroll Marquee",
      role: { zh: "跑马灯", en: "The marquee" },
      construction: {
        zh: "内容复制两份、容器 overflow hidden，用 translateX 从 0 到 -50% 的 24 秒 linear 无缝循环。hover 时暂停。自动播放超过 5 秒且与其他内容并列时，必须提供可持续使用的暂停／停止／隐藏控制，不能只靠 hover。",
        en: "The content is duplicated twice inside an overflow-hidden container, looping translateX from 0 to -50% over 24 seconds linear and seamlessly. It pauses on hover. Where autoplay runs past five seconds beside other content, a persistent pause, stop or hide control is mandatory — hover alone will not do.",
      },
      sizes: "24s linear, seamless",
    },
    {
      name: "Signal CTA",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "信号橙填充、墨黑文字、2px 圆角、无描边，18px/700、padding 14px 32px。hover 时填充提亮 8% 并把文字变成可变字重的 900（0.4 秒 expo-out）；按下缩放 0.98。过渡只动 opacity、transform 与 font-variation-settings。",
        en: "Signal orange fill, ink text, 2px radius, no border, 18px/700, 14px 32px padding. Hover brightens the fill eight percent and drives the label's variable weight to 900 over 0.4 seconds expo-out; press scales 0.98. Only opacity, transform and font-variation-settings animate.",
      },
      sizes: "padding 14px 32px; label 18px",
      states: "hover: weight to 900, brighter; active: scale 0.98",
    },
    {
      name: "Velocity Widen",
      role: { zh: "随滚动速度改变字宽", en: "Width following scroll velocity" },
      construction: {
        zh: "读取滚动速度（在 rAF 内计算两帧 scrollY 差值并缓存），映射到 font-variation-settings 的 wdth（85 到 100）与 letter-spacing（-0.04em 到 -0.02em）。速度衰减用 0.3 秒的阻尼，静止时回到默认值。禁止在 scroll 事件里读布局属性。",
        en: "Scroll velocity is computed inside requestAnimationFrame from the delta between frames and cached, then mapped to wdth on font-variation-settings (85 to 100) and letter-spacing (-0.04em to -0.02em). Velocity decays with a 0.3-second damp and returns to default at rest. The scroll handler never reads layout properties.",
      },
    },
  ],
  imagery: {
    zh: "几乎没有图像——文字就是图像。允许极低不透明度的噪点或网格作为舞台纹理。不使用插画与摄影，任何有形象的图像都会抢走字的戏。",
    en: "Almost no imagery — the type is the image. A very low-opacity noise or grid may texture the stage. No illustration or photography; any figurative image steals the scene from the words.",
  },
  layout: {
    zh: "上限 1360px、容器内边距 32px，区块间距 160px。字可以极大并跨越整个宽度，允许与容器边缘齐平或溢出。一屏只安排一个主导动效，其余元素保持静止。",
    en: "Capped at 1360px with 32px padding, sections 160px apart. Type may run enormous and span the full width, flush with the edge or bleeding past. One screen holds one lead animation; everything else stays still.",
  },
  dos: [
    { zh: "只动 transform、opacity、font-variation-settings", en: "Animate only transform, opacity and font-variation-settings" },
    { zh: "入场用 expo-out 0.7 到 0.9 秒", en: "Entrances use expo-out at 0.7 to 0.9 seconds" },
    { zh: "一屏只有一个主导动效", en: "One lead animation per screen" },
    { zh: "跑马灯用 24 秒 linear 无缝循环", en: "Marquees loop seamlessly at 24 seconds linear" },
    { zh: "自动播放超过 5 秒必须提供暂停控制", en: "Autoplay past five seconds needs a pause control" },
    { zh: "信号橙只给 CTA、关键词与 hover", en: "Signal orange only on CTAs, key words and hover" },
  ],
  donts: [
    { zh: "不要动布局属性（top/left/width/height）", en: "Never animate layout properties" },
    { zh: "不要一屏跑多个主效", en: "Never run multiple lead effects at once" },
    { zh: "不要让图像抢戏", en: "Never let imagery steal the scene" },
    { zh: "不要超过一个强调色", en: "Never use more than one accent" },
    { zh: "不要用纯 opacity 淡入代替遮罩上升", en: "Never substitute a plain opacity fade for the mask rise" },
    { zh: "不要让一次性过渡超过 1.2 秒或用 linear", en: "Never push a one-shot transition past 1.2s or use linear" },
  ],
  promptGuide: {
    quickColors: {
      text: "#f4f1eb",
      background: "#0b0b0c",
      accent: "#ff4d00",
      panel: "#141416",
      muted: "#8a857b",
      border: "rgba(244,241,235,0.12)",
    },
    prompts: [
      {
        zh: "做一个动力学排印首屏：舞台底 #0b0b0c、文字 #f4f1eb。标题 132px/900、行高 0.92、字距 -0.04em，按字符拆成 span，每个初始 translateY(110%)、opacity 0，进入视口时按 35ms 间隔依次回到原位，单字符 0.8s cubic-bezier(0.22,1,0.36,1)，父容器 overflow hidden。主 CTA 用 #ff4d00 填充、墨黑文字、2px 圆角。跑马灯复制两份内容、translateX 0 → -50%、24s linear 无缝循环、hover 暂停。全站只动 transform、opacity 与 font-variation-settings，一屏只一个主导动效。",
        en: "Build a kinetic typography hero: stage #0b0b0c with #f4f1eb text. The headline runs 132px/900 at 0.92 leading and -0.04em tracking, split into per-character spans each starting at translateY(110%) and opacity 0, resolving 35ms apart over 0.8s cubic-bezier(0.22,1,0.36,1) inside an overflow-hidden parent. The primary CTA fills #ff4d00 with ink text on a 2px radius. A marquee duplicates its content twice, looping translateX 0 to -50% over 24s linear and seamless, pausing on hover. Only transform, opacity and font-variation-settings animate, with one lead effect per screen.",
      },
    ],
  },
  similar: [
    { name: "Swiss Poster", why: { zh: "同样以字为主体，但瑞士海报是静止的版面，这里是运动的字", en: "Both make type the subject, though Swiss poster is a still composition while this is type in motion" } },
    { name: "Launch Keynote", why: { zh: "同样一屏一主角，但发布会靠画布动画，这里靠字体变量", en: "Both hold one protagonist per screen, though keynote animates a canvas while this animates font axes" } },
  ],
  completeness: "full",
};
