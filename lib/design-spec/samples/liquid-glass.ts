import type { DesignSpec } from "../types";

/**
 * A liquid surface is an optical material and an interaction layer.
 * Keep the reading canvas clear; reserve glass for the controls that float
 * over it, and tune its contrast to the scene beneath.
 */
export const liquidGlassSpec: DesignSpec = {
  slug: "liquid-glass",
  name: "液态玻璃",
  nameEn: "Liquid Glass",
  sourceUrl: "https://developer.apple.com/design/human-interface-guidelines/materials",
  cover: "/styles/liquid-glass.svg",
  theme: "mixed",
  northStar: {
    zh: "玻璃让背景透过、在边缘微微弯折，随触碰轻轻回弹。",
    en: "Glass lets the scene through, bends it softly at the rim, and springs back to touch.",
  },
  summary: {
    zh: "液态玻璃由清晰背景、薄透的中性色表面、细小的定向边缘高光和克制的折射共同构成。把它留给悬浮导航、搜索、播放控件和临时菜单；正文与信息卡保持稳定、易读。支持的环境必须默认使用 SVG 位移滤镜，让背景在玻璃边缘产生可见弯折；纯透明白加 blur 只是降级，不是完整液态玻璃。曲面边缘使用折射曲线与平坦中心，可保留极轻色散。深浅背景都须照顾文字对比；点击时短促压缩，拖动时轻微伸展，释放后约 420ms 平顺回到原位。",
    en: "Liquid Glass combines a clear scene, a thin neutral surface, a fine directional rim highlight, and measured refraction. Reserve it for floating navigation, search, playback controls, and temporary menus; keep body copy and information cards steady and easy to read. Compatible environments must enable SVG backdrop displacement by default, with visible curvature at the rim and an undistorted center. White transparency plus blur is only a fallback, not the complete material. A curved optical profile and very subtle dispersion may be used. Keep labels legible on both light and dark backdrops. A press compresses briefly, a drag stretches slightly, and release settles over roughly 420ms.",
  },
  colors: [
    {
      name: "纸面",
      nameEn: "Paper",
      value: "#F3F2ED",
      group: "neutral",
      role: {
        zh: "安静、低对比的主页面底色，使悬浮玻璃和文字保持清楚。",
        en: "A quiet, low-contrast canvas that keeps floating glass and text clear.",
      },
      token: "--color-paper",
    },
    {
      name: "石墨墨色",
      nameEn: "Graphite Ink",
      value: "#202929",
      group: "neutral",
      role: {
        zh: "标题、正文和浅色背景控件中的主要文字颜色。",
        en: "The primary text color for headings, body copy, and controls on light surfaces.",
      },
      token: "--color-ink",
    },
    {
      name: "深海场景",
      nameEn: "Deep Sea Scene",
      value: "#25414A",
      group: "surface",
      role: {
        zh: "玻璃需要透过和折射的照片、色调或线条背景；深色浮层在此处使用白字。",
        en: "Photographic, tonal, or lined content that glass can reveal and refract; dark floating layers use white text here.",
      },
      token: "--color-glass-scene",
    },
    {
      name: "海盐雾",
      nameEn: "Salt Mist",
      value: "#E4EFEB",
      group: "surface",
      role: {
        zh: "轻量的蓝绿色表面色，用于着色材质的柔和底片，而非外发光。",
        en: "A muted blue-green used as the quiet base of a tinted material, never as a glow.",
      },
      token: "--color-glass-mist",
    },
    {
      name: "掠光",
      nameEn: "Glancing Light",
      value: "#FFFFFF",
      group: "neutral",
      role: {
        zh: "沿玻璃上缘或受光侧的一像素高光，显出曲面方向。",
        en: "A one-pixel highlight along the lit edge that reveals the surface curvature.",
      },
      token: "--color-glass-glint",
    },
    {
      name: "灰绿焦点",
      nameEn: "Sage Focus",
      value: "#557B79",
      group: "accent",
      role: {
        zh: "浅色背景控件的焦点环及少量操作状态提示，维持足够对比。",
        en: "Focus rings and a few state cues on light controls, with enough contrast to stay visible.",
      },
      token: "--color-focus",
    },
  ],
  fonts: [
    {
      family: "System UI",
      substitute: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      weights: [400, 500, 600],
      sizes: [12, 14, 16, 20, 28, 40, 56],
      lineHeight: { display: 1.05, heading: 1.18, body: 1.55 },
      tracking: { display: "-0.045em", label: "0.025em" },
      role: {
        zh: "使用平台系统字体保持自然亲切；标题以字号、留白和中等字重建立层级，不使用描边或发光。",
        en: "Use the platform system face for a natural feel. Establish hierarchy with size, space, and medium weights, without strokes or glow.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 500, size: 56, lineHeight: 1.05, tracking: "-0.045em", token: "--text-display" },
    { role: "heading-lg", weight: 500, size: 40, lineHeight: 1.12, tracking: "-0.035em", token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 28, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", weight: 500, size: 20, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.35, tracking: "0.025em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [4, 8, 12, 16, 24, 32, 48, 64, 88],
    maxWidth: 1120,
    sectionGap: 88,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "buttons and navigation", value: "999px" },
    { element: "search and segmented controls", value: "999px" },
    { element: "cards", value: "24px" },
    { element: "menus and sheets", value: "28px" },
  ],
  surfaces: [
    { level: 0, name: "Paper canvas", value: "#F3F2ED", purpose: "Stable reading and content surface" },
    { level: 1, name: "Clear glass", value: "rgba(255, 255, 255, 0.12)", purpose: "Floating controls on a rich, darker scene" },
    { level: 2, name: "Tinted glass", value: "rgba(239, 245, 242, 0.86)", purpose: "Menus and short labels over a bright or detailed scene" },
    { level: 3, name: "Solid content", value: "#FCFCFA", purpose: "Long-form copy, data, and controls requiring steady contrast" },
  ],
  elevation: [
    { name: "Floating control", value: "0 8px 24px rgba(19, 37, 41, 0.12), inset 0 1px 0 rgba(255,255,255,0.72)" },
    { name: "Transient panel", value: "0 16px 40px rgba(19, 37, 41, 0.18), inset 0 1px 0 rgba(255,255,255,0.78)" },
  ],
  components: [
    {
      name: "Floating Glass Bar",
      role: { zh: "主导航与场景切换", en: "Primary navigation and scene switching" },
      construction: {
        zh: "胶囊底栏高 56–64px，可触区域至少 44px。放在有色照片或内容上：清透状态使用低浓度表面染色、默认启用的真实背景位移折射和一像素定向高光。中心保持平坦，折射集中在约 8–24px 的曲面边带；允许克制的色散。深色场景上用白色图标和文字；明亮场景则加中性着色，避免标签消失。选中片随拖动横向移动，按下压到 0.96，拖动时轻微拉宽，释放后约 420ms 回弹到位。键盘焦点使用清楚的双像素焦点环。",
        en: "A 56–64px capsule dock with at least a 44px hit area. Place it over a colorful photograph or content: the clear state uses low tint, real backdrop displacement enabled by default, and a one-pixel directional glint. Keep the center flat and refraction within an approximately 8–24px curved rim; subtle dispersion is allowed. Use white icons and labels on dark scenes; add a neutral tint on bright scenes so labels stay visible. The selected pill slides with drag, compresses to 0.96 on press, widens slightly while dragging, then springs home in about 420ms. Give keyboard focus a crisp two-pixel ring.",
      },
      sizes: "56–64px overall height; at least 44px per hit area; capsule radius",
      states: "Idle; 110ms press compression; drag with slight horizontal stretch; 420ms spring settle; keyboard focus; disabled",
    },
    {
      name: "Clear Glass Button",
      role: { zh: "照片或媒体上方的轻量操作", en: "A light action over a photo or media" },
      construction: {
        zh: "胶囊形，至少 44px 高，使用低浓度表面、真实边缘折射和极细上缘高光；仅在不支持折射时使用轻柔模糊。优先用深场景上的白色标签；亮背景上切换到深色标签和中性着色表面。按下约 110ms 轻压至 0.96，松开以 420ms 左右弹性过渡恢复；尊重减少动态效果偏好。避免在没有可见背景内容时使用清透款。",
        en: "A capsule at least 44px tall, with a low-tint surface, real edge refraction, and a fine top glint; use soft blur only as a fallback. Prefer white labels over dark scenes; switch to dark labels and a neutral tint over bright imagery. Compress lightly to 0.96 over about 110ms on press and return with a roughly 420ms spring. Respect reduced-motion preferences. Do not use the clear state when there is no visible content beneath it.",
      },
      sizes: "44px minimum hit target; capsule radius; 12–16px horizontal inset",
      states: "Rest; hover edge glint; compress on press; visible focus; disabled at readable opacity",
    },
    {
      name: "Tinted Glass Menu",
      role: { zh: "短菜单和临时选项", en: "Short menus and temporary choices" },
      construction: {
        zh: "22–28px 圆角，以更不透明的暖白或灰绿色层承载短标签、选项和图标。背景模糊控制在适中范围，外投影轻柔，顶部只留一条细高光。菜单内文字始终使用墨色；长说明和复杂设置另放在稳定的实色内容面板。",
        en: "A 22–28px corner radius and a more opaque warm-white or sage-tinted layer carry short labels, choices, and icons. Keep backdrop blur moderate, shadows soft, and the top glint fine. Menu text stays ink-colored. Put long explanations and complex settings on a stable solid panel.",
      },
      sizes: "22–28px radius; 8–16px item spacing; menu rows at least 44px high",
      states: "Resting; focused or selected row; open; dismiss; keyboard navigation",
    },
    {
      name: "Glass Search Field",
      role: { zh: "照片和有色场景上的搜索", en: "Search over photography and color" },
      construction: {
        zh: "圆角胶囊、至少 44px 高，外层略着色并提供柔和模糊；输入与结果文字使用深墨色，避免空心或低对比占位符。边缘高光保持静态，焦点用独立的高对比灰绿色外环表达，不以发光代替焦点反馈。",
        en: "A rounded capsule at least 44px tall, with a tinted refracting outer surface, a flat center, and blur only as an unsupported-browser fallback. Search text and results use dark ink; keep placeholder contrast readable. The rim highlight remains still. Show keyboard focus with a separate high-contrast sage ring, not a glow.",
      },
      sizes: "44–52px height; capsule radius; 12–16px horizontal inset",
      states: "Empty; editing; focus-visible; clear action; results; no results; disabled",
    },
    {
      name: "Solid Reading Card",
      role: { zh: "说明正文、表格与长内容", en: "Explanatory copy, data, and long-form content" },
      construction: {
        zh: "使用稳定的暖白实色面板、22–24px 圆角和 24px 内边距。最多配一条低对比中性分隔线和轻柔外阴影，不做玻璃折射，以免滚动背景干扰阅读。",
        en: "Use a stable warm-white solid surface, a 22–24px radius, and 24px padding. At most, add a low-contrast neutral divider and soft outer shadow. Keep refraction off so scrolling backdrops cannot compete with reading.",
      },
      sizes: "22–24px radius; 24px padding; generous text measure",
      states: "Stable reading surface; optional subtle hover when interactive",
    },
  ],
  imagery: {
    zh: "给清透玻璃提供可见的背景细节：照片、低对比地貌线、色调变化或几何网格都可以。把纹理放在悬浮控制下方，让直线和细节在玻璃边缘发生轻微位移，中心则保持平静。不要用彩虹渐变、霓虹字或只靠模糊的空白单色底充当折射。",
    en: "Give clear glass real detail to reveal: photography, quiet contour lines, tonal shifts, or a geometric grid. Place the texture beneath floating controls so straight lines and fine detail shift slightly at the rim while the center stays calm. Avoid rainbow gradients, neon type, and blank single-color grounds that rely on blur alone.",
  },
  layout: {
    zh: "用温暖浅纸面组织页面，以明亮细节照片、等高线或网格作为预览画布，验证深浅背景。内容按「稳定正文 → 玻璃操作层」建立层级；导航和短菜单少量悬浮，信息主体保留清晰实色底。桌面居中展示场景和底栏，窄屏将同一底栏保持为可触的胶囊控件并为系统安全区留白。",
    en: "Organize the page on warm paper, with a detailed photograph, contours, or a grid as the preview stage, checking both bright and dark backdrops. Keep a clear hierarchy from stable content to floating controls: navigation and short menus may hover, while the information itself stays on a solid legible surface. Center the scene and dock on desktop; on narrow screens retain the same touch-sized capsule and leave room for system safe areas.",
  },
  dos: [
    { zh: "仅把清透玻璃放在确有内容可透过的导航和控件上", en: "Use clear glass for navigation and controls only when there is visible content beneath" },
    { zh: "根据亮暗背景选择白色或墨色标签，保证文字清楚", en: "Choose white or ink labels to keep contrast clear on each backdrop" },
    { zh: "用一像素定向高光和轻微位移表达玻璃曲面", en: "Use a one-pixel directional glint and slight displacement to reveal curvature" },
    { zh: "让菜单等短内容稍着色以提升对比", en: "Tint short transient content such as menus to preserve contrast" },
    { zh: "保持正文、表格和复杂信息在稳定的实色面上", en: "Keep body copy, tables, and dense information on steady solid surfaces" },
    { zh: "按下约 110ms 轻压，拖动略伸展，松开约 420ms 回弹", en: "Compress lightly on an approximately 110ms press, stretch a little while dragging, and spring back over about 420ms" },
    { zh: "尊重减少动态和减少透明度等辅助偏好", en: "Respect reduced-motion and reduced-transparency accessibility preferences" },
    { zh: "在无法实时折射的浏览器保留可读的磨砂表面和细高光", en: "Keep a readable frosted surface and fine glint when live refraction is unavailable" },
  ],
  donts: [
    { zh: "不要用彩虹边、霓虹描边标题或彩色发光模拟折射", en: "Do not use rainbow rims, neon headline strokes, or colored glow as refraction" },
    { zh: "不要把清透玻璃铺满卡片、正文和整个页面", en: "Do not spread clear glass across cards, body copy, and the whole page" },
    { zh: "不要在无细节的纯色背景上铺清透玻璃", en: "Do not place clear glass on a flat ground with nothing to reveal" },
    { zh: "不要让细高光和折射损害文字、图标或焦点状态的对比", en: "Do not let glints or refraction reduce text, icon, or focus contrast" },
    { zh: "不要持续随机改变边框圆角；液态反馈应由交互触发", en: "Do not randomly morph corner radii at rest; liquid feedback should follow interaction" },
    { zh: "不要把滤镜支持视为所有浏览器一致", en: "Do not assume live filter support is identical across browsers" },
  ],
  promptGuide: {
    quickColors: {
      text: "#202929",
      background: "#F3F2ED",
      scene: "#25414A",
      glassTint: "rgba(255, 255, 255, 0.12)",
      glint: "rgba(255, 255, 255, 0.72)",
      focus: "#557B79",
    },
    prompts: [
      {
        zh: "设计一套清透液态玻璃导航：把圆角胶囊底栏悬浮在有细线和明暗变化的照片上。使用低浓度中性表面、一像素方向高光和默认启用的 SVG 背景位移折射。由曲面法线与折射曲线生成窄边带，中心保持平坦；允许极轻色散，但不要画彩虹边框。选项至少 44px 高，文字颜色随明暗背景保持清楚。点击轻压，拖动时略微横向伸展，松开约 420ms 弹性归位；添加键盘焦点反馈并遵守减少动态效果。正文和信息卡留在暖白实色面上，菜单用更不透明的浅灰绿着色材质。实时背景折射只在 Chromium 使用，其他浏览器保留相同表面和磨砂反馈。不要使用彩虹边、霓虹文字或连续自动形变。",
        en: "Design a clear liquid-glass dock over photography with fine lines and tonal detail. Use low neutral tint, a one-pixel directional glint, and SVG backdrop displacement enabled by default. Build a narrow rim from surface normals and a refraction profile with a flat center. Allow very subtle dispersion without painted rainbow borders. Give each option a 44px minimum hit area and keep labels legible against light or dark scenes. Lightly compress on press, stretch slightly sideways during drag, then spring back in about 420ms. Add keyboard focus and honor reduced motion. Keep body copy and information cards on warm-white solid surfaces; use a more opaque sage-tinted layer for menus. Enable live backdrop refraction only in Chromium and retain the same surface with a frosted fallback elsewhere. Avoid rainbow rims, neon text, and continuous idle morphing.",
      },
    ],
  },
  similar: [
    { name: "Apple Style", slug: "apple-style", why: { zh: "共用系统字体、克制层级与留白；液态玻璃额外加入边缘折射和跟手反馈。", en: "Shares system type, restrained hierarchy, and whitespace; Liquid Glass adds edge refraction and touch response." } },
    { name: "macOS Vibrancy", slug: "macos-vibrancy", why: { zh: "同样让背景通过控件可见；液态玻璃在边缘加入更明确的光学曲率与弹性操作反馈。", en: "Also lets content show through controls; Liquid Glass adds clearer optical curvature at the edge and elastic touch feedback." } },
  ],
  customSections: [
    {
      title: { zh: "必需的光学实现与参考源码", en: "Required Optical Implementation and Source References" },
      body: {
        zh: "支持环境中，导航、按钮、搜索和浮层必须通过真实的背景折射渲染器显示边缘弯折，不能只输出 backdrop-blur。StyleKit 使用 components/liquid-glass/liquid-glass.tsx 与 lib/liquid-glass/optics.ts：Snell 曲面边缘、解析圆角法线、中性中心、按控件尺寸限制位移、可选微量色散以及随指针变化的细边高光。可复制的 CSS recipe 是降级外观，须搭配该渲染器。用同一位置的清透/磨砂切换和网格比较验证效果；取消手势恢复起点，键盘能完成同一操作。参考固定版本：rdev https://github.com/rdev/liquid-glass-react/tree/ac48eab18d1f7f444ae30002d240cae29c863a21；glassy https://github.com/9und30/glassy-liquid/tree/2361eb1f03979703db988180028ccc6d5fc23fe5；shuding https://github.com/shuding/liquid-glass/tree/a2d2e847f793430e3409a52927af815a23f4d372。代码均为 MIT，复制或改编须保留完整署名；StyleKit 的曲面 profile 已包含 glassy 的 MIT notice。Safari/Firefox 的实时页面 SVG backdrop 不可等同于普通 blur 支持；需要真实折射时采用显式 scene 渲染，未实现时明确降级。",
        en: "On compatible engines, navigation, buttons, search, and overlays must use a real backdrop-refraction renderer with visible edge bending; backdrop-blur alone is insufficient. StyleKit uses components/liquid-glass/liquid-glass.tsx with lib/liquid-glass/optics.ts: a Snell curved-rim profile, analytic rounded-rectangle normals, a neutral center, size-bounded displacement, subtle optional dispersion, and a pointer-directed rim highlight. CSS recipes describe the fallback and must be paired with that renderer. Verify with the same-position Glass/Frost comparison and a grid; cancellation restores the drag start and keyboard controls offer equivalent actions. Pinned references: rdev https://github.com/rdev/liquid-glass-react/tree/ac48eab18d1f7f444ae30002d240cae29c863a21; glassy https://github.com/9und30/glassy-liquid/tree/2361eb1f03979703db988180028ccc6d5fc23fe5; shuding https://github.com/shuding/liquid-glass/tree/a2d2e847f793430e3409a52927af815a23f4d372. All are MIT; retain full notices when copying or adapting. StyleKit includes the glassy MIT notice for its adapted optical profile. Generic blur support does not establish SVG backdrop support in Safari/Firefox: use an explicit scene renderer when refraction there is required, otherwise label the fallback.",
      },
    },
  ],
  completeness: "full",
};
