import type { DesignStyle } from "./types";

const description = "通透的玻璃浮在内容之上：中心清晰、边缘轻折光，白色细高光勾勒厚度。用在浮动导航、搜索和控制面板，触碰时轻压、拖动时伸展、松手后回弹。";
const descriptionEn = "Clear glass floats above the content, bending detail near a fine white rim. Floating navigation, search, and controls compress on press, stretch with the gesture, and spring back on release.";

export const liquidGlass: DesignStyle = {
  slug: "liquid-glass",
  name: "液态玻璃",
  nameEn: "Liquid Glass",
  description,
  descriptionEn,
  cover: "/styles/liquid-glass.svg",
  styleType: "visual",
  tags: ["brand-inspired"],
  category: "modern",
  colors: {
    primary: "#f3f2ed",
    secondary: "#202929",
    accent: ["#25414a", "#e4efeb", "#c7e4e5", "#557b79"],
  },
  keywords: ["液态玻璃", "流动玻璃", "Apple", "透明材质", "光学折射", "浮动导航", "回弹"],
  keywordsEn: ["liquid glass", "Apple Liquid Glass", "transparent material", "glassmorphism", "optical refraction", "floating dock", "thin specular rim", "spring motion"],

  philosophy: `玻璃属于操作层。先布置清晰的内容，再把用户下一步要用的导航、搜索和控制放在其上方。玻璃从场景借色，靠一条细高光表现厚度。折射集中在边缘，中心要能辨认原来的线条和纹理。

材质分成三种：清透玻璃给有纹理的图片或图形上的小控件；着色玻璃给菜单、搜索和设置；实体表面承载正文、列表和表格。动效来自手势：按下轻压，拖动时沿方向伸展，释放后迅速归位。`,
  philosophyEn: `Glass is the control layer. Lay out sharp content first, then float the navigation, search, and controls that people need above it. Glass borrows color from the scene, and a fine glint gives the rim depth. Bend the backdrop near the edge and keep its original texture recognizable in the center.

Use three surfaces: clear glass for compact controls over richly textured scenes, tinted glass for menus, search, and settings, and solid surfaces for reading, lists, and tables. Motion follows the gesture: press to compress, drag to stretch, release to settle.`,

  doList: [
    "把浮动导航和主要控件作为玻璃层，正文和长列表放在实体表面。",
    "让中心保留背景细节，把中性折射和约 1px 的白色高光集中在边缘。",
    "过亮、复杂或变化大的背景上提高着色浓度，保持文字和焦点清晰。",
    "短操作用胶囊，浮层用 22–28px 圆角；底栏内共用一块移动的选中胶囊。",
    "按压约 110ms，释放在约 420ms 内归位；键盘和触屏都能操作。",
    "提供静止和实体材质选项；不支持实时折射时保留色调、细边和可读性。",
  ],
  doListEn: [
    "Place floating navigation and key controls in the glass layer; keep reading and long lists on solid surfaces.",
    "Keep recognizable detail at the center, concentrating neutral refraction and a roughly 1px white glint near the rim.",
    "Increase tint over bright, busy, or changing scenes to preserve readable labels and visible focus.",
    "Use capsules for compact controls and 22–28px corners for overlays. Share one moving selection lens in the dock.",
    "Compress in about 110ms and settle in about 420ms; support keyboard and touch.",
    "Provide still and opaque alternatives; retain tint, a fine rim, and contrast when live refraction is unavailable.",
  ],
  dontList: [
    "避免霓虹标题、彩虹边框、发光描边和夸张的 RGB 分离；真实折射边缘允许微量色散。",
    "不要给每个卡片或每个导航按钮单独加一层玻璃。",
    "不要用重度模糊掩盖背景，也不要把 CSS 模糊描述成实时折射。",
    "不要让内容文字变形或让动效循环；也不要用纯颜色区分选中、禁用与聚焦。",
    "不要将清透白字控件直接放在高亮背景上，或把拖动作为唯一操作方式。",
  ],
  dontListEn: [
    "Avoid neon headlines, painted rainbow borders, glowing outlines, and exaggerated RGB separation; very subtle optical dispersion is allowed.",
    "Do not give every card or every dock item its own layer of glass.",
    "Do not erase the backdrop with heavy blur or describe CSS blur as live refraction.",
    "Do not distort foreground text or loop motion; do not use color alone for selected, disabled, or focused states.",
    "Do not put clear white-label controls over a bright backdrop without contrast support, or make dragging the only way to act.",
  ],

  components: {
    button: {
      name: "玻璃按钮",
      nameEn: "Glass Button",
      description: "胶囊形操作按钮，细高光，按下轻压，适合在深色场景上操作。",
      descriptionEn: "A tinted capsule over a dark scene with a fine rim and tactile press.",
      code: `import { LiquidGlass } from "@/components/liquid-glass/liquid-glass";

<LiquidGlass appearance="clear" radius={999} className="inline-block text-white"
  settings={{ refraction: 62, depth: 40, spread: 52, dispersion: 5, frost: 1.1, light: 72 }}
  tint="rgba(20,43,54,0.64)">
  <button type="button" className="liquid-button liquid-pressable">查看场景</button>
</LiquidGlass>`,
    },
    card: {
      name: "玻璃信息卡",
      nameEn: "Glass Info Card",
      description: "短信息浮在清透玻璃上，背景只在边缘弯折；长篇正文使用实体阅读面板。",
      descriptionEn: "A clear glass card for concise information, with refraction at the rim. Keep long-form reading on a solid surface.",
      code: `import { LiquidGlass } from "@/components/liquid-glass/liquid-glass";

<LiquidGlass appearance="clear" radius={24} className="max-w-72 text-[#17374c]"
  settings={{ refraction: 62, depth: 40, spread: 52, dispersion: 5, frost: 1.1, light: 72 }}
  tint="rgba(240,250,255,0.065)" contentClassName="min-h-36 px-5 py-4">
  <article>
    <h2 className="font-sans text-base font-semibold">冰河湖的光</h2>
    <p className="mt-1 text-xs">冰岛 · 杰古沙龙冰河湖</p>
  </article>
</LiquidGlass>`,
    },
    input: {
      name: "玻璃搜索",
      nameEn: "Glass Search",
      description: "着色胶囊保持输入文字清晰，始终提供可见标签和键盘焦点。",
      descriptionEn: "Tinted search keeps entered text crisp and shows a visible label and keyboard focus.",
      code: `import { LiquidGlass } from "@/components/liquid-glass/liquid-glass";

<label className="liquid-field">
  <span>搜索场景</span>
  <LiquidGlass appearance="clear" radius={999} className="text-white"
    settings={{ refraction: 62, depth: 40, spread: 52, dispersion: 5, frost: 1.1, light: 72 }}
    tint="rgba(20,43,54,0.72)">
    <input className="liquid-input" type="search" placeholder="例如：潮汐" />
  </LiquidGlass>
</label>`,
    },
    nav: {
      name: "浮动底栏",
      nameEn: "Floating Dock",
      description: "共用一块清透玻璃，选中项有胶囊形轮廓和语义状态。",
      descriptionEn: "One clear shell for navigation with a capsule and semantic current state.",
      code: `import { LiquidGlass } from "@/components/liquid-glass/liquid-glass";

<LiquidGlass appearance="clear" radius={999} className="inline-block text-white"
  settings={{ refraction: 62, depth: 40, spread: 52, dispersion: 5, frost: 1.1, light: 72 }}
  tint="rgba(20,43,54,0.64)">
  <nav className="liquid-dock" aria-label="场景导航">
    <a href="#tide" className="liquid-button" aria-current="page">潮汐</a>
    <a href="#ridge" className="liquid-button">山脊</a>
    <a href="#rain" className="liquid-button">细雨</a>
  </nav>
</LiquidGlass>`,
    },
    hero: {
      name: "光学场景",
      nameEn: "Optical Scene",
      description: "让等高线经过玻璃下面，保留清晰的标题和足够的控件对比度。",
      descriptionEn: "Run contours underneath the glass and keep headings and control contrast sharp.",
      code: `import { LiquidGlass } from "@/components/liquid-glass/liquid-glass";

<section className="liquid-scene" id="tide">
  <p className="liquid-kicker">光学场景</p>
  <h1>潮汐</h1>
  <LiquidGlass appearance="clear" radius={999} tint="rgba(20,43,54,0.64)">
    <a className="liquid-button" href="#scenes">浏览场景</a>
  </LiquidGlass>
</section>`,
    },
    footer: {
      name: "实体页脚",
      nameEn: "Solid Footer",
      description: "页脚使用与内容一致的实体材质，为信息留出清晰的收尾。",
      descriptionEn: "Close the experience on the same solid material as the reading layer.",
      code: `<footer className="liquid-content" id="scenes">
  <p>场景资料库</p>
  <a href="#tide">回到潮汐</a>
</footer>`,
    },
  },

  globalCss: `/* Liquid Glass fallback skin. Live rim refraction requires the shared LiquidGlass renderer. Use .liquid-system on the owning region. */
.liquid-system {
  --liquid-paper: #f3f2ed;
  --liquid-ink: #202929;
  --liquid-muted: #4c5d57;
  --liquid-scene: #25414a;
  --liquid-glint: rgb(255 255 255 / 62%);
  --liquid-rim: rgb(255 255 255 / 25%);
  --liquid-clear-fill: rgb(15 25 32 / 21%);
  --liquid-tinted-fill: rgb(17 29 37 / 88%);
  --liquid-opaque: #20343b;
  --liquid-on-glass: #fff;
  --liquid-selection: rgb(255 255 255 / 18%);
  --liquid-placeholder: #d5e0e0;
  --liquid-focus: #c7e4e5;
  --liquid-focus-on-paper: #557b79;
  --liquid-panel-radius: 24px;
  --liquid-press: 110ms;
  --liquid-release: 420ms cubic-bezier(.26, 1.55, .52, 1);
  color: var(--liquid-ink);
  background: var(--liquid-paper);
  font-family: system-ui, sans-serif;
}

.liquid-system [data-liquid-tone="light"] {
  --liquid-clear-fill: rgb(243 242 237 / 68%);
  --liquid-tinted-fill: rgb(243 242 237 / 92%);
  --liquid-opaque: #f3f2ed;
  --liquid-on-glass: #202929;
  --liquid-selection: rgb(32 41 41 / 12%);
  --liquid-placeholder: #4c5d57;
  --liquid-focus: var(--liquid-focus-on-paper);
}

.liquid-scene {
  display: grid;
  justify-items: start;
  align-content: center;
  min-block-size: 18rem;
  gap: 1rem;
  padding: clamp(1.5rem, 5vw, 4rem);
  border-radius: var(--liquid-panel-radius);
  color: #fff;
  background:
    repeating-linear-gradient(163deg, transparent 0 19px, rgb(221 239 234 / 16%) 20px 21px),
    linear-gradient(140deg, #18262e, var(--liquid-scene) 62%, #486d72);
}

.liquid-kicker {
  margin: 0;
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .08em;
}

.liquid-glass {
  --liquid-fill: var(--liquid-clear-fill);
  --liquid-blur: blur(4px);
  position: relative;
  box-sizing: border-box;
  border: 1px solid var(--liquid-rim);
  border-radius: var(--liquid-panel-radius);
  color: var(--liquid-on-glass);
  background-color: var(--liquid-opaque);
  box-shadow: inset 0 1px 0 var(--liquid-glint), 0 8px 24px -18px rgb(8 24 38 / 55%);
}

.liquid-glass--tinted {
  --liquid-fill: var(--liquid-tinted-fill);
  --liquid-blur: blur(12px);
}

@supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .liquid-glass {
    background-color: var(--liquid-fill);
    -webkit-backdrop-filter: var(--liquid-blur);
    backdrop-filter: var(--liquid-blur);
  }
}

/* Only opt in after verifying SVG backdrop support and attaching a live lens map. */
.liquid-glass[data-liquid-optics="svg"] {
  backdrop-filter: var(--liquid-refraction-filter, var(--liquid-blur));
}

.liquid-content {
  padding: clamp(1rem, 3vw, 2rem);
  border: 1px solid #d9e0db;
  border-radius: var(--liquid-panel-radius);
  background: #fff;
  color: var(--liquid-ink);
}

.liquid-dock {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 4px;
  max-inline-size: 100%;
  padding: 5px;
  border-radius: 999px;
}

.liquid-button,
.liquid-input {
  box-sizing: border-box;
  min-block-size: 44px;
  border-radius: 999px;
  padding: .625rem 1rem;
  font: inherit;
}

.liquid-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

.liquid-button[aria-current]:not([aria-current="false"]),
.liquid-button[aria-pressed="true"] {
  background: var(--liquid-selection);
  box-shadow: inset 0 1px 0 var(--liquid-glint);
}

.liquid-pressable {
  transition: transform var(--liquid-release);
}

.liquid-pressable:active:not(:disabled) {
  transform: scale(.97, .92);
  transition-duration: var(--liquid-press);
}

.liquid-button:disabled {
  opacity: .55;
  cursor: not-allowed;
}

.liquid-field {
  display: grid;
  gap: .375rem;
}

.liquid-input {
  inline-size: 100%;
}

.liquid-input::placeholder {
  color: var(--liquid-placeholder);
  opacity: 1;
}

.liquid-content :focus-visible {
  outline: 2px solid var(--liquid-focus-on-paper);
  outline-offset: 3px;
}

.liquid-button:focus-visible,
.liquid-input:focus-visible {
  outline: 2px solid var(--liquid-focus);
  outline-offset: 3px;
}

.liquid-system[data-liquid-transparency="reduce"] .liquid-glass {
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  background-color: var(--liquid-opaque);
}

@media (prefers-reduced-transparency: reduce) {
  .liquid-system .liquid-glass {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    background-color: var(--liquid-opaque);
  }
}

@media (prefers-reduced-motion: reduce) {
  .liquid-system .liquid-pressable {
    transition: none;
  }
  .liquid-system .liquid-pressable:active {
    transform: none;
  }
}

@media (forced-colors: active) {
  .liquid-system .liquid-glass {
    border: 1px solid ButtonText;
    color: ButtonText;
    background: ButtonFace;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    box-shadow: none;
  }
  .liquid-button[aria-current]:not([aria-current="false"]),
  .liquid-button[aria-pressed="true"] {
    outline: 1px solid Highlight;
    outline-offset: -2px;
  }
  .liquid-button:focus-visible,
  .liquid-input:focus-visible {
    outline-color: Highlight;
  }
}`,

  aiRules: `# 液态玻璃 · 实现规范

## 材质与层级
- 先做内容层，再把玻璃放在操作层。阅读内容用纸白 #f3f2ed 或白色，标题和正文用墨色 #202929。
- 用深青灰 #25414a 的等高线、照片或滚动内容给玻璃提供可辨认的纹理。玻璃跟随场景色；不在材质本身涂彩虹。
- 清透玻璃用在经过对比度检查的深色媒体上，例如浮动底栏和单个工具按钮。中心低模糊，边缘约 1px 白色方向性高光。
- 着色玻璃用在搜索、菜单、设置面板等带文字的操作层，先保证清楚再保留少量背景。
- 正文、卡片内容、密集列表和表格保持实体表面。大面积玻璃会抹平内容层级。

## 光学实现
- 在支持的 Chromium 浏览器，必须默认启用真实 SVG 背景位移；只用半透明背景和 blur 不构成液态玻璃。位移图由曲面法线和 Snell 折射曲线生成，在中心完全中性，靠窄边带弯折。允许极轻的 RGB 色散。仅处理背景，把可交互子元素留在滤镜之外。
- 只有检测到可用的 SVG 背景滤镜且贴图准备好才启用折射。浏览器只支持模糊时，清透层可用约 4px，着色层约 12px；完全无滤镜时用实体填色。
- 先准备不透明底色和可靠文字对比，再逐步增强材质。用直线网格和深浅背景检查折射，避免以彩色边框模拟。

## 组件与交互
- 底栏使用一个共享胶囊容器，按钮用真实导航或可按压语义。选中态除颜色外有轮廓或位置；拖拽时选中胶囊横向拉伸，松手后落到目标，点按和键盘也能切换。
- 按钮和搜索用胶囊形状，面板约 22–28px 圆角。按下约 110ms 轻压，释放约 420ms 归位。留出至少 44px 触控目标。
- 搜索和输入保留可见标签。弹层能用 Escape 关闭并把焦点交回触发按钮；禁用态不可触发。
- 对比度随背景检查，普通文本至少 4.5:1。焦点环可辨，减少动态效果时取消拉伸和弹跳；减少透明度或强制颜色时使用实体底色。
- 展示页用真实背景切换、折射调节和同位置清透/磨砂对比来说明材质。移动透镜只更新位置，不重建位移图。拖动取消、失去捕获或 Escape 时恢复起点，方向键和居中按钮提供等价操作。不要用没有接通音频的播放器或占位功能填充展示。
- 不使用霓虹标题、绘制的彩虹边、整页重模糊、循环抖动、发光文字或重复叠滤镜。
- CSS tokens/recipes 仅是降级外观，必须搭配共享 LiquidGlass 渲染器。参考固定实现：rdev/liquid-glass-react@ac48eab18d1f7f444ae30002d240cae29c863a21；9und30/glassy-liquid@2361eb1f03979703db988180028ccc6d5fc23fe5；shuding/liquid-glass@a2d2e847f793430e3409a52927af815a23f4d372。复制或改编须保留完整 MIT 署名。`,

  aiRulesEn: `# Liquid Glass · Implementation Rules

## Materials and Layers
- Build the content layer first, then float glass where people act. Set reading content in ink #202929 on paper #f3f2ed or white.
- Give the glass recognizable detail: a #25414a contour scene, a photograph, or scrolling content. The glass borrows the scene color.
- Use clear glass on compact controls over tested, contrast-safe media. Keep the center lightly blurred and use a roughly 1px directional white glint near the rim.
- Use tinted glass for labeled search, menus, and settings. Preserve text contrast before increasing transparency.
- Keep articles, data, lists, and reading cards on solid surfaces. Do not coat every container in glass.

## Optical Implementation
- On compatible Chromium engines, real SVG backdrop displacement is required by default; translucent fill plus blur alone is not Liquid Glass. Generate a narrow curved rim from surface normals and a Snell refraction profile, with a fully neutral center. Subtle RGB dispersion is allowed. Filter the backdrop only and keep the interactive foreground sharp.
- Enable refraction only after checking support and preparing the map. Approximate the material with about 4px blur for clear and 12px for tinted where SVG refraction does not work. Use solid fill when no backdrop filter is available.
- Set readable opaque colors first and enhance progressively. Test with straight lines and both light and dark backgrounds. A colorful outline is not refraction.

## Components and Interaction
- Float one capsule shell around dock items. Use semantic navigation or pressed buttons, and make selection visible in shape or position. Stretch the shared lens along the drag and settle on release; offer click and keyboard selection too.
- Use capsules for short controls and inputs and 22–28px corners for panels. Compress in about 110ms and settle in about 420ms. Allow at least 44px for touch targets.
- Keep visible input labels. Close overlays with Escape and return focus to the trigger; disabled actions must not fire.
- Check text against the actual backdrop (at least 4.5:1 for normal text). Give focus a visible outline. Remove stretch and bounce in reduced-motion mode and use solid fills for reduced transparency or forced colors.
- Demonstrate the material through working background choices, refraction strength, and a clear/frost comparison at the same lens position. Move the lens without regenerating its map. Cancelled gestures, lost capture, and Escape restore the starting position; offer arrow keys and a center action. Do not pad the showcase with unconnected playback or placeholder features.
- Avoid neon headlines, painted rainbow rims, page-wide heavy blur, idle wobble, glowing type, and redundant layered filters.
- CSS tokens/recipes are fallback skins and must be paired with the shared LiquidGlass renderer. Pinned references: rdev/liquid-glass-react@ac48eab18d1f7f444ae30002d240cae29c863a21; 9und30/glassy-liquid@2361eb1f03979703db988180028ccc6d5fc23fe5; shuding/liquid-glass@a2d2e847f793430e3409a52927af815a23f4d372. Retain full MIT notices when copying or adapting.`,

  examplePrompts: [
    {
      title: "清透材质体验",
      titleEn: "Clear Material Experience",
      description: "在同一幅画面上移动透镜，比较真实折射和磨砂。",
      descriptionEn: "Move a lens across one scene and compare refraction with frost.",
      prompt: "设计一个液态玻璃材质体验页。用有明确许可的明亮照片承托一枚可移动的透明透镜，提供照片、等高线、网格三种真实背景切换，以及同一位置的清透/磨砂对比和折射强度调节。内容文字保持锐利。拖动取消或 Escape 恢复起点，方向键可移动、按钮可居中。适配深浅主题、触屏、减少运动和减少透明度；不支持 SVG 背景折射时明确显示磨砂降级。不要添加占位播放器。",
      promptEn: "Build a Liquid Glass material experience. Place one movable clear lens above a licensed bright photograph. Offer working photo, contour and grid backgrounds, a clear/frost comparison at the same position, and refraction strength. Keep foreground text sharp. Cancel or Escape restores the drag start; arrow keys move and a button centers the lens. Support light/dark themes, touch, reduced motion and reduced transparency, and label the frosted fallback when SVG backdrop refraction is unavailable. Do not add a placeholder player.",
    },
    {
      title: "快速控制面板",
      titleEn: "Quick Controls",
      description: "可读的设置浮层和独立的滑块、开关。",
      descriptionEn: "A readable settings overlay with sliders and toggles.",
      prompt: "用深青灰光学场景承托着色控制面板。包含亮度、音量、两项切换和关闭按钮。白色细边只在光照方向突出；旋钮拖动时增强触感，正文和数值始终清楚。Escape 关闭并恢复焦点；背景太亮时提高面板不透明度。",
      promptEn: "Place a tinted quick-control panel above a deep teal optical scene. Include brightness, volume, two toggles, and Close. Put the finest rim light on the lit edge. Add feedback while dragging the thumb without compromising label contrast. Escape closes the panel and restores focus; increase opacity over bright scenes.",
    },
    {
      title: "图册与悬浮搜索",
      titleEn: "Gallery with Floating Search",
      description: "照片保持清晰，导航和搜索用适当透明度的玻璃。",
      descriptionEn: "Crisp photos with glass reserved for navigation and search.",
      prompt: "设计一套作品图册。照片和说明保持实体材质，把搜索入口与分类切换放在下方悬浮操作层。分类按钮共用一块清玻璃，带文字的搜索和筛选弹层使用着色玻璃。提供无结果、清空、聚焦和回到触发器的状态。",
      promptEn: "Design a portfolio gallery. Keep photos and captions solid and sharp; float search and category navigation below. Group categories in one clear shell, use tinted glass for labeled search and filters, and include empty, clear, focus, and focus-return states.",
    },
  ],
};
