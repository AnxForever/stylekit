import type { DesignSpec } from "../types";

/**
 * Source: lib/styles/diffraction-foil.ts, lib/styles/diffraction-foil-tokens.ts,
 * lib/styles/diffraction-foil-art.ts, and components/styles/diffraction-foil/
 * (showcase, CSS fallback, and lamp runtime). The same documented material is
 * used by the style page and its single complete design.md export.
 */
export const diffractionFoilSpec: DesignSpec = {
  slug: "diffraction-foil",
  name: "镭射箔",
  nameEn: "Diffraction Foil",
  sourceUrl: "https://yophon.github.io/1001-pages/holo.html",
  cover: "/styles/diffraction-foil.svg",
  theme: "dark",
  northStar: {
    zh: "光就是油墨：让银箔按光栅方程响应一盏共享的灯。",
    en: "Light is the ink: let silver foil answer one shared lamp through a diffraction grating.",
  },
  summary: {
    zh: "镭射箔的虹彩不是一条平移的彩虹渐变，而是刻槽衍射后算出的颜色。1500 nm 光栅在约 300 px 的离屏灯光下产生光谱；法线和灯的相对角度决定波长，银色仍然是大部分表面。第 1、2、3 级按 1、0.5、0.3 加权。用近黑印张和细裁切线衬托浮雕箔片，结构克制，材质负责表达。可交互版本整页共享一个 WebGL2 上下文，并提供跟随同一盏灯的 CSS 平替。",
    en: "The iridescence is not a rainbow gradient sliding over the page: it is computed from light diffracting through etched grooves. A 1500 nm grating under one lamp about 300 px above the screen produces the spectrum; wavelength follows the relative surface normal and lamp angle, while most of the surface stays silver. Diffraction orders 1, 2 and 3 are weighted 1, 0.5 and 0.3. A near-black print sheet and faint crop marks frame quiet, dimensional foil surfaces. The interactive page shares one WebGL2 context, with a CSS fallback driven by the same lamp.",
  },
  colors: [
    {
      name: "印张",
      nameEn: "Print Sheet",
      value: "#0c0b10",
      group: "surface",
      role: {
        zh: "全页近黑画布；让变化中的银箔和光谱成为视觉焦点。",
        en: "The near-black page ground, keeping the changing silver foil and spectrum in focus.",
      },
      token: "--color-print-sheet",
    },
    {
      name: "面板",
      nameEn: "Panel",
      value: "#141319",
      group: "surface",
      role: {
        zh: "暗色卡片与容器底色，配极细白色描边分层。",
        en: "Dark card and container fill, separated by a faint white hairline.",
      },
      token: "--color-panel",
    },
    {
      name: "暗银箔",
      nameEn: "Dark Silver Foil",
      value: "#a3a2af",
      group: "neutral",
      role: {
        zh: "暗箔面本身的银灰基底；虹彩只在角度吻合处叠上去。",
        en: "The silver-grey base for dark foil; iridescence overlays it only at matching angles.",
      },
      token: "--color-dark-silver",
    },
    {
      name: "亮银箔",
      nameEn: "Light Silver Foil",
      value: "#e9e8f0",
      group: "surface",
      role: {
        zh: "适合印刷深色油墨字的浅银箔面，不用纯白替代。",
        en: "The light-silver surface for dark ink; use it instead of a flat white fill.",
      },
      token: "--color-light-silver",
    },
    {
      name: "油墨",
      nameEn: "Ink",
      value: "#16151c",
      group: "neutral",
      role: {
        zh: "仅在浅银箔上印标题和按钮文案，避免压在彩虹带上。",
        en: "Headline and button ink for light foil only; keep it clear of saturated bands.",
      },
      token: "--color-foil-ink",
    },
    {
      name: "正文",
      nameEn: "Text",
      value: "#ececf2",
      group: "neutral",
      role: {
        zh: "印张和暗面板上的主要文字，高对比但不刺眼。",
        en: "Primary type on the sheet and dark panels, with clear but quiet contrast.",
      },
      token: "--color-text",
    },
    {
      name: "次要文字",
      nameEn: "Secondary Text",
      value: "#a9a8b6",
      group: "neutral",
      role: {
        zh: "说明、注释和次级内容；退后一级，不缩小到难读。",
        en: "Descriptions and supporting notes recede one step without shrinking to illegibility.",
      },
      token: "--color-text-secondary",
    },
    {
      name: "焦点银",
      nameEn: "Focus Silver",
      value: "#c9c8d4",
      group: "accent",
      role: {
        zh: "键盘焦点、范围滑杆和克制的行动按钮，保持可见轮廓。",
        en: "Keyboard focus, range sliders and restrained actions; preserve a visible outline.",
      },
      token: "--color-focus-silver",
    },
    {
      name: "光谱红",
      nameEn: "Sampled Spectral Red",
      value: "#d2052d",
      group: "accent",
      role: {
        zh: "1500 nm CSS 光谱条上的一枚红端采样；仅作为动态光谱一部分。",
        en: "One red-end sample from the 1500 nm CSS spectrum, used as part of moving light.",
      },
      token: "--color-spectrum-red-sample",
    },
    {
      name: "光谱绿",
      nameEn: "Sampled Spectral Green",
      value: "#00d777",
      group: "accent",
      role: {
        zh: "CSS 光谱条上计算出的绿色采样，不是固定组件填色。",
        en: "A computed green sample in the CSS spectrum, never a fixed component fill.",
      },
      token: "--color-spectrum-green-sample",
    },
    {
      name: "光谱紫",
      nameEn: "Sampled Spectral Violet",
      value: "#6600e1",
      group: "accent",
      role: {
        zh: "CSS 光谱条上计算出的紫色采样；随灯和衍射级次变化。",
        en: "A computed violet sample in the CSS spectrum; bands move with the lamp and order.",
      },
      token: "--color-spectrum-violet-sample",
    },
  ],
  fonts: [
    {
      family: "Sans Serif",
      substitute: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      weights: [400, 500, 600, 700, 800],
      sizes: [12, 14, 16, 20, 24, 32, 48, 72],
      lineHeight: { display: 1.05, heading: 1.2, body: 1.65 },
      tracking: { display: "-0.025em", label: "0.2em" },
      role: {
        zh: "全站使用 font-sans；大标题粗而紧凑，次级标记用等宽字体和字距，不引入新字体。",
        en: "Use the site sans face: heavy, tight display type and monospace labels with tracking; add no new font dependency.",
      },
      token: "--font-sans",
    },
    {
      family: "Monospace",
      substitute: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      weights: [400, 500, 600],
      sizes: [12, 14, 16, 18],
      lineHeight: { display: 1.2, heading: 1.4, body: 1.65 },
      tracking: { display: "0.04em", label: "0.2em" },
      role: {
        zh: "用于光栅方程、纳米数值、兑换码和稀疏技术标签，不用于长段正文。",
        en: "For the grating equation, nanometre values, redeem codes and sparse technical labels, never long-form copy.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", weight: 800, size: 72, lineHeight: 1.05, tracking: "-0.025em", token: "--text-display" },
    { role: "heading-lg", weight: 800, size: 48, lineHeight: 1.12, tracking: "-0.02em", token: "--text-heading-lg" },
    { role: "heading", weight: 800, size: 32, lineHeight: 1.2, tracking: "-0.015em", token: "--text-heading" },
    { role: "subheading", weight: 600, size: 24, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.65, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.65, token: "--text-body" },
    { role: "label", font: "Monospace", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.2em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [4, 8, 12, 16, 24, 32, 40, 48, 64, 96],
    maxWidth: 1280,
    sectionGap: 64,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "Cards and foil panels", value: "16px–24px" },
    { element: "Buttons and input fields", value: "12px" },
    { element: "Pills and star seals", value: "999px" },
    { element: "Section dividers", value: "0px; 1px border" },
  ],
  surfaces: [
    { level: 0, name: "Print Sheet", value: "#0c0b10", purpose: "Near-black page ground supporting the foil." },
    { level: 1, name: "Raised Panel", value: "#141319", purpose: "Content cards use a 10% white hairline." },
    { level: 2, name: "Dark Silver Foil", value: "linear-gradient(#4f4e59, #a3a2af 28%, #5e5d68 50%, #adacb9 76%, #575661)", purpose: "Grey metal under a spectrum blended with screen." },
    { level: 2, name: "Light Silver Foil", value: "linear-gradient(#b4b3bf, #e9e8f0 30%, #bdbcc8 52%, #ecebf2 78%, #b6b5c1)", purpose: "Light metal uses overlay to preserve ink contrast." },
    { level: 3, name: "Diffracted Spectrum", value: "1500 nm grating; orders 1:0.5:0.3 over silver", purpose: "Computed from lamp angle, never a static RGB fill." },
  ],
  elevation: [
    { name: "Trading card", value: "0 24px 48px -28px rgba(0,0,0,0.9)" },
    { name: "Light-foil top rim", value: "inset 0 1px 0 rgba(255,255,255,0.6)" },
    { name: "Dark panel", value: "1px solid rgba(255,255,255,0.1); no broad glow" },
    { name: "Lamp highlight", value: "radial highlight within 150px of shared lamp" },
  ],
  components: [
    {
      name: "Foil Trading Card",
      role: {
        zh: "收藏展示主体：深色卡框承托宽幅烫印箔面。",
        en: "The collector's centerpiece: a wide stamped foil in a quiet dark frame.",
      },
      construction: {
        zh: "用 #141319 卡框、白色 10% 细描边和 24px 左右圆角；中央箔面纵横比 1.8:1。标题字靠底边印在浅色位置；说明与编号用 #a9a8b6 和等宽字。边缘可以有深色投影，箔面本身不叠重阴影。",
        en: "Use a #141319 frame, a 10% white hairline and roughly 24px radius around a 1.8:1 foil field. Set the title near the lower edge where the surface is light enough for ink; print notes and serial numbers in secondary grey or monospace. Shadow may sit below the frame, never muddy the foil.",
      },
      sizes: "foil face 1.8:1; frame padding 20px–24px",
      states: "spectrum follows the shared lamp; non-foil card frame remains still",
    },
    {
      name: "Light Foil Button",
      role: {
        zh: "浅银箔上的主要行动，压下时材质弯曲而版面位置不动。",
        en: "A primary action printed on light foil; pressing bends the material without shifting layout.",
      },
      construction: {
        zh: "用亮银多层银色底、screen 高光与 overlay 光谱；深色 #16151c 油墨字，12px 圆角，min-height 44px，水平 padding 24px，字体 14px/600。内侧加细白高光与深色落影；键盘操作保留 2px 的 #c9c8d4 外轮廓。",
        en: "Layer a light silver base with a screen highlight and the spectrum in overlay mode. Set dark #16151c ink at 14px/600, 12px radius, 44px minimum height and about 24px horizontal padding. Keep a fine inset rim and restrained shadow; keyboard focus takes a 2px #c9c8d4 outline with offset.",
      },
      sizes: "minimum height 44px; 12px radius",
      states: "press: bend shading normal up to 14° and spring back; never translate the button",
    },
    {
      name: "Grating Controls",
      role: {
        zh: "让读者直接观察入射角和刻槽间距怎样改变衍射级次。",
        en: "Let readers see how incident angle and groove period change diffraction orders.",
      },
      construction: {
        zh: "深色面板内使用两条水平范围控件：灯角度 0°–70°，间距 800–2200 nm、步长 50 nm；实时显示数值和 1–3 级衍射位置。滑轨使用 #c9c8d4 作银色强调，标签 14px，数值等宽显示。",
        en: "Place two horizontal range controls in a dark panel: lamp angle 0°–70° and groove period 800–2200 nm in 50 nm steps. Show the live value and each diffraction order. The track uses silver #c9c8d4, 14px labels and monospace values.",
      },
      sizes: "panel padding 24px–32px; two 44px-high controls",
      states: "changing angle or period updates computed wavelength markers and spectral strip",
    },
    {
      name: "Foil Material Samples",
      role: {
        zh: "并列展示彩虹膜、同心星芒和碎钻的刻槽差异。",
        en: "Compare film, concentric starburst and glitter groove layouts side by side.",
      },
      construction: {
        zh: "用统一尺寸、12px 圆角和 #141319 卡底；图形依次使用交叉光栅、圆形刻槽和随机晶面。拉丝光栅与薄膜干涉需要 WebGL2 的逐像素效果，使用明确的 WebGL 示例链接，不以假静态色块代替。",
        en: "Use equal samples with 12px corners on #141319. Film combines crossed gratings, star uses concentric grooves, and glitter uses randomly oriented facets. Brushed grooves and thin-film interference require the WebGL2 pixel shader; link to its live study instead of showing a false flat swatch.",
      },
    },
    {
      name: "Redeem-Code Field",
      role: {
        zh: "收藏卡或包装上用于兑换的短码。",
        en: "A short collector's code for a card or foil pack.",
      },
      construction: {
        zh: "面板底 #141319，1px rgba(255,255,255,0.15) 描边，12px 圆角，padding 12px 16px；占位格式 XXXX-XXXX-XXXX，使用等宽大写字、0.2em 字距和 #6c6b78 占位文字。聚焦描边切换为 #c9c8d4，保留可见焦点环。",
        en: "Use a #141319 fill, 1px white border at 15%, 12px radius and 12px 16px padding. The XXXX-XXXX-XXXX format is uppercase monospace with 0.2em tracking and #6c6b78 placeholder text. Focus shifts the border to #c9c8d4 and keeps its ring visible.",
      },
      sizes: "14px monospace; 12px 16px padding; 12px radius",
      states: "input uppercases characters and announces incomplete/valid format; validation does not depend on color alone",
    },
    {
      name: "Collector Navigation",
      role: {
        zh: "作为纸面边缘的一行轻导航，而非厚重应用栏。",
        en: "A quiet row along the print sheet, rather than a heavy application bar.",
      },
      construction: {
        zh: "近黑底、底部 1px rgba(255,255,255,0.1) 细线、24px 水平 padding；字标可使用油墨彩箔字，普通链接保持 #a9a8b6。右侧仅放短行动按钮，桌面可提供下载 HTML 的文字链接。",
        en: "Set it on the near-black ground with a 1px white-at-10% rule below and 24px horizontal padding. The wordmark may carry spectral foil text; ordinary links stay #a9a8b6. Reserve the right side for one compact action, with the reference HTML as a secondary text link on wide screens.",
      },
      sizes: "roughly 56px high; 24px horizontal padding",
      states: "hover raises text contrast; keyboard links keep the silver offset outline",
    },
  ],
  imagery: {
    zh: "展示真实光谱箔面、藏品或包装的宏观细节，保留能辨认金属基底的区域。静态展示用预计算光谱条加银底和方向性高光；避免照片噪点淹没细槽。WebGL-only 拉丝与幻彩需使用实际 shader 预览。",
    en: "Show close crops of real spectral foil, collectibles or packaging while retaining visible metal underneath. Static examples use the precomputed spectral strip, silver base and directional highlight; keep photography grain from obscuring fine grooves. Brushed and pearl effects require their actual WebGL shader preview.",
  },
  layout: {
    zh: "印张主容器上限 1280px，移动端 padding 24px，桌面端 40px；区块上方细线、48px 移动端/64px 桌面端垂直节奏。亮面采用 1.8:1 宽卡，可并排布局一个主卡和两个方形材质样片；阅读区留白足够区分印张、面板与箔片。",
    en: "Cap the print-sheet container at 1280px, with 24px mobile and 40px desktop padding. Divide sections with a hairline and 48px mobile / 64px desktop vertical rhythm. Use 1.8:1 for the primary foil card and place it beside two square material studies when space allows; preserve enough breathing room to separate sheet, frame and foil.",
  },
  dos: [
    {
      zh: "用 λ = d × |dot(h, k)| / m 计算颜色，d 默认 1500 nm；1、2、3 级分别按 1、0.5、0.3 加权。",
      en: "Compute wavelength with λ = d × |dot(h, k)| / m, using 1500 nm for d and order weights 1, 0.5 and 0.3.",
    },
    {
      zh: "使用离屏 300px 的共享指针灯；颜色与方向角相关，银底在未衍射处显露。",
      en: "Use one shared pointer lamp 300px above the screen; color follows relative angle and bare silver shows between orders.",
    },
    {
      zh: "把紫、蓝、绿、黄、红的变化视为计算得到的动态光谱，而不是固定配色。",
      en: "Treat violet, blue, green, yellow and red as a computed moving spectrum, not a fixed palette.",
    },
    {
      zh: "整页互动效果共用一个 WebGL2 上下文，逐项绘制并复制到元素画布。",
      en: "Share one WebGL2 context across the interactive page; render each material and copy it to the element canvas.",
    },
    {
      zh: "为不支持或关闭 WebGL 的用户提供跟随同一盏灯的 CSS 平替。",
      en: "Keep a CSS fallback that follows the same lamp when WebGL is unavailable or disabled.",
    },
    {
      zh: "把操作反馈落在法线与光照上，按压最多倾斜 14°，弹簧参数采用刚度 320、阻尼比 0.32。",
      en: "Put interaction on the shading normal: tilt at most 14°, with stiffness 320 and damping ratio 0.32.",
    },
    {
      zh: "把深色油墨限制在亮银箔上；暗印张正文使用 #ececf2，次要文字使用 #a9a8b6。",
      en: "Reserve dark ink for light silver; set sheet copy in #ececf2 and supporting text in #a9a8b6.",
    },
    {
      zh: "尊重减少动态偏好：固定灯的位置，停止轨道运动和弹簧过冲。",
      en: "Honor reduced-motion preferences by parking the lamp and disabling orbit and spring overshoot.",
    },
  ],
  donts: [
    {
      zh: "不要用静态虹彩渐变或 background-position 平移冒充光栅衍射。",
      en: "Do not fake diffraction with a static iridescent gradient or animated background-position.",
    },
    {
      zh: "不要把彩虹铺满箔面；多数区域必须读作银色。",
      en: "Do not flood the foil with rainbow; most of each surface must still read as silver.",
    },
    {
      zh: "不要让油墨文字压在高饱和光谱上；需要时把文字放到亮银区。",
      en: "Do not set ink on saturated bands; move the text over a light-silver area instead.",
    },
    {
      zh: "不要给每个元素新建 WebGL 上下文，也不要逐元素重复昂贵着色器。",
      en: "Do not open one WebGL context per element or repeatedly run expensive independent shaders.",
    },
    {
      zh: "不要靠循环 hue-rotate 改色；这会让箔面失去可解释的光栅与灯光关系。",
      en: "Do not cycle hue-rotate; it breaks the material's explainable relationship to grooves and light.",
    },
    {
      zh: "不要为 WebGL-only 的拉丝或幻彩样式生成假的 CSS 色块预览。",
      en: "Do not invent a flat CSS swatch for WebGL-only brushed or pearl materials.",
    },
    {
      zh: "不要交错读取布局和写入样式；先测量，再统一绘制或写变量。",
      en: "Do not interleave layout reads with style writes; measure first, then render or write variables.",
    },
    {
      zh: "不要在减少动态模式下保留自动绕行、弹跳或过冲。",
      en: "Do not keep orbit, bounce or spring overshoot under reduced-motion settings.",
    },
  ],
  promptGuide: {
    quickColors: {
      background: "#0c0b10",
      panel: "#141319",
      text: "#ececf2",
      secondaryText: "#a9a8b6",
      inkOnLightFoil: "#16151c",
      silver: "#c9c8d4",
      brightSilver: "#e9e8f0",
    },
    prompts: [
      {
        zh: "做一张可交互的烫印收藏卡。画布 #0c0b10，卡框 #141319、白色 10% 细描边，里面放一块 1.8:1 的银箔面。按 λ = d × |dot(h, k)| / m 计算光栅波长，d = 1500 nm，第 1/2/3 级权重为 1/0.5/0.3；一盏距屏幕 300px 的共享指针灯控制整页，银底应露出大部分面积。亮箔用 overlay、暗箔用 screen 混合。全页只用一个 WebGL2 上下文，并提供由同一光谱条和光源控制的 CSS 平替；按压只弯法线，不移动布局。偏好减少动态时停住光源。请验收：颜色随灯角度变化、大部分表面读作银、卡片尺寸稳定、焦点环清晰、CSS 平替可用。",
        en: "Build an interactive hot-stamped collector card on #0c0b10. Frame it in #141319 with a 10% white hairline and a 1.8:1 silver foil field. Compute wavelength with λ = d × |dot(h, k)| / m, d = 1500 nm, and order weights 1/0.5/0.3. One shared pointer lamp 300px above the screen drives the whole page; most of each surface must remain silver. Use overlay on light foil and screen on dark foil. Share a single WebGL2 context and provide a CSS fallback driven by the same spectrum strip and lamp; press bends the shading normal without moving the card. Park the lamp for reduced motion. Verify that hue follows lamp angle, silver remains visible, card geometry stays fixed, focus is clear, and the CSS fallback works.",
      },
    ],
  },
  similar: [
    {
      name: "Holographic",
      slug: "holographic",
      why: {
        zh: "两者都有虹彩，但全息渐变以移动 CSS 渐变表达；镭射箔按光栅方程和灯的角度计算波长，银色必须保留为材质底层。",
        en: "Both can look iridescent, but Holographic shifts CSS gradients; Diffraction Foil computes wavelength from groove geometry and lamp angle while retaining silver beneath.",
      },
    },
  ],
  completeness: "full",
};
