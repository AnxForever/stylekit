import type { DesignStyle } from "./types";
import { diffractionFoilPrompt } from "@/lib/prompts/diffraction-foil";
import { DIFFRACTION_FOIL_SPECTRUM, foilPreviewStyle, foilTextPreviewStyle } from "./diffraction-foil-art";


/**
 * Diffraction Foil. The color is computed from a grating lit by a pointer lamp rather
 * than painted as a gradient. Reference: public/experiments/diffraction-foil/index.html,
 * page 002 of 1001 Pages (https://yophon.github.io/1001-pages/holo.html).
 */
export const diffractionFoil: DesignStyle = {
  slug: "diffraction-foil",
  name: "镭射箔",
  nameEn: "Diffraction Foil",
  description: "按衍射光栅实时算颜色的镭射烫印箔：指针是一盏灯，彩虹以灯为圆心扫过每个元素，银底、星芒、碎钻和幻彩都是不同的刻槽排布。",
  descriptionEn: "Holographic hot-stamping foil whose color is computed from a diffraction grating. The pointer is a lamp; rainbow bands sweep around it across every element, and silver, star, glitter, and pearl are different groove layouts.",
  cover: "/styles/diffraction-foil.svg",
  styleType: "visual",
  category: "expressive",
  tags: ["dark-theme", "colorful", "texture-heavy", "high-contrast"],
  colors: {
    primary: "#0c0b10",
    secondary: "#c9c8d4",
    accent: ["#ff5ab8", "#ffd36b", "#4fe0b4", "#5aa8ff", "#a98bff"],
  },
  keywords: ["镭射", "烫印", "衍射光栅", "全息箔", "收藏卡", "防伪", "WebGL", "光谱", "指针光源"],
  keywordsEn: ["diffraction grating", "holographic foil", "hot stamping", "trading card", "anti-counterfeit", "WebGL shader", "spectral color", "pointer light", "iridescent foil"],

  philosophy: `镭射箔的颜色不是画上去的，是算出来的。膜面上刻着间距 1500 纳米的细槽，光打上去按光栅方程分出波长：角度小时是银，角度变大，紫、蓝、绿、黄、红依次扫过，高级次再来一遍。

核心理念：
- 指针是一盏灯：灯离屏幕 300 像素高，所有镭射元素共用这一盏灯，彩虹以它为圆心一圈圈扫过整页
- 材质是刻槽的排布：直纹、交叉纹、同心圆（星芒）、随机小碎片（碎钻）、薄膜干涉（幻彩），喂给同一个光栅函数
- 银底是主角：彩虹只出现在角度对上的地方，大部分时间是金属的银，这才像真箔
- 一个 WebGL 上下文画整页：所有元素共用一个隐藏画布逐个渲染再拷贝，另有一套 CSS 平替跟着同一盏灯走
- 手感落在材质上：按下、勾选、拖动时只弯膜面的法线，颜色跳一下，元素本身不动

视觉语言：
- 近黑的印张底色，浅浅的裁切线，让箔面跳出来
- 油墨字只印在浅色箔上，不压在饱和的彩虹带上
- 减少动态效果时灯停在固定位置，画面静止`,
  philosophyEn: `Diffraction foil is computed, not painted. Grooves 1500 nm apart split light by the grating equation: at small angles the foil is silver, and as the angle grows violet, blue, green, yellow, and red sweep past, then repeat in higher orders.

Core principles:
- The pointer is a lamp 300 px above the screen; every foil element shares it, so rainbow rings sweep around it across the whole page
- A material is a groove layout: straight, crossed, concentric (star), random facets (glitter), or thin-film interference (pearl), all fed to one grating function
- Silver leads: color appears only where the angle lines up, so most of the surface reads as metal
- One WebGL context draws the page: a hidden canvas renders each element in turn and copies it out, with a CSS fallback that follows the same lamp
- Touch lands on the material: pressing, toggling, and dragging bend the shading normal so the color jumps, while the element stays put

Visual language:
- A near-black print sheet with faint crop marks lets the foil stand out
- Ink text sits only on light foil, never on saturated bands
- With reduced motion, the lamp parks and the frame holds still`,

  doList: [
    "按光栅方程算颜色：λ = d × |dot(h, k)| / m，d = 1500nm，1、2、3 级按 1、0.5、0.3 叠加",
    "把指针当成离屏幕 300px 的灯，所有镭射元素共用；指针静止 4 秒后灯自己慢慢绕圈",
    "用 bg-[#0c0b10] 近黑印张承托箔面，正文用 text-[#ececf2]，次要文字用 text-[#a9a8b6]",
    "整页只开一个 WebGL2 上下文，逐个元素渲染后用 drawImage 拷进各自的 2D 画布",
    "提供 CSS 平替：1024×1 光谱条按灯的方向截取窗口，::before 旋转到刻槽方向，用 screen 叠在银底上",
    "按下、勾选、拖动时只弯着色法线，用刚度 320、阻尼比 0.32 的弹簧弹回",
    "油墨字只印在 foil-light 浅色箔上，焦点环用 focus-visible:outline-[#c9c8d4]",
    "遵守减少动态效果：灯停在 72%、22%，不绕圈、不过冲",
  ],
  doListEn: [
    "Compute color with the grating equation λ = d * |dot(h, k)| / m, d = 1500 nm, summing orders 1-3 at weights 1, 0.5, 0.3",
    "Treat the pointer as a lamp 300 px above the screen shared by every foil element; after 4 idle seconds let it orbit slowly",
    "Seat the foil on a bg-[#0c0b10] print sheet with text-[#ececf2] body copy and text-[#a9a8b6] secondary text",
    "Use one WebGL2 context for the page; render each element in turn and copy it into its own 2D canvas with drawImage",
    "Ship a CSS fallback: window a 1024x1 spectrum strip by lamp direction, rotate a ::before layer to the groove angle, and screen it over silver",
    "Bend only the shading normal on press, toggle, and drag; spring back with stiffness 320 and damping ratio 0.32",
    "Print ink text only on foil-light; mark focus with focus-visible:outline-[#c9c8d4]",
    "Honor reduced motion: park the lamp at 72%, 22%, no orbit and no overshoot",
  ],
  dontList: [
    "禁止用一条固定的彩虹渐变再平移 background-position 冒充镭射",
    "禁止给每个元素各开一个 WebGL 上下文",
    "禁止让彩虹铺满整块：大部分面积应该是银",
    "禁止把文字压在饱和的彩虹带上",
    "禁止用 hue-rotate 动画循环换色",
    "禁止每写一个 CSS 变量就读一次布局，先量完再统一写",
  ],
  dontListEn: [
    "Do not fake foil with a fixed rainbow gradient and an animated background-position",
    "Do not open one WebGL context per element",
    "Do not flood the surface with rainbow; most of it should read as silver",
    "Do not place text on saturated spectral bands",
    "Do not cycle colors with hue-rotate animations",
    "Do not interleave layout reads with style writes; measure everything, then write",
  ],

  components: {
    button: {
      name: "镭射按钮",
      nameEn: "Foil button",
      description: "浅色银箔上印油墨字，彩虹用 overlay 压上去；按下时膜面朝按下的位置弯一下。",
      descriptionEn: "Ink on light silver foil with the spectrum overlaid; pressing bends the surface toward the press point.",
      code: `<button
  type="button"
  className="
    foil foil-light relative isolate inline-flex min-h-11 items-center justify-center
    overflow-hidden rounded-xl px-6 py-3
    font-semibold tracking-wide text-[#16151c]
    shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_24px_-14px_rgba(0,0,0,0.8)]
    transition-transform duration-150 active:scale-[0.98]
    focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9c8d4]
  "
>
  Open a pack
</button>`,
      preview: `<div class="rounded-2xl bg-[#0c0b10] px-10 py-8">
  <button type="button" class="relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-xl px-6 py-3 font-semibold tracking-wide text-[#16151c] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_24px_-14px_rgba(0,0,0,0.8)] transition-transform duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9c8d4]" style="${foilPreviewStyle("light", 0.3, 0.62)}">Open a pack</button>
</div>`,
    },
    card: {
      name: "收藏卡",
      nameEn: "Trading card",
      description: "深色卡框里一块 1.8:1 的箔面；箔面由 WebGL 画布或 CSS 平替绘制，完整实现规则在复现提示词里。",
      descriptionEn: "A dark frame holding a 1.8:1 foil panel drawn by the WebGL canvas or the CSS fallback; the full rules live in the reproduction prompt.",
      code: `<article className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141319] p-5 text-[#ececf2] shadow-[0_24px_48px_-28px_rgba(0,0,0,0.9)]">
  <div className="foil relative mb-4 aspect-[1.8] overflow-hidden rounded-xl">
    {/* Foil layer: the shared WebGL canvas, or the CSS fallback driven by the lamp script */}
    <span className="foil-text absolute left-5 bottom-4 text-4xl font-extrabold tracking-tight">Lumen</span>
  </div>
  <h3 className="font-semibold tracking-wide">Lumen · No. 042</h3>
  <p className="mt-1 text-sm text-[#a9a8b6]">Hot-stamped diffraction foil, 1500 nm grooves</p>
</article>`,
      preview: `<div class="rounded-2xl bg-[#0c0b10] p-8">
  <article class="relative w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#141319] p-5 text-[#ececf2] shadow-[0_24px_48px_-28px_rgba(0,0,0,0.9)]">
    <div class="relative mb-4 aspect-[1.8] overflow-hidden rounded-xl" style="${foilPreviewStyle("dark", 0.33, 0.7)}">
      <span class="absolute left-5 bottom-4 font-sans text-4xl font-extrabold tracking-tight" style="${foilTextPreviewStyle(0.25, 0.55)}">Lumen</span>
    </div>
    <h3 class="font-sans font-semibold tracking-wide">Lumen · No. 042</h3>
    <p class="mt-1 text-sm text-[#a9a8b6]">Hot-stamped diffraction foil, 1500 nm grooves</p>
  </article>
</div>`,
    },
    input: {
      name: "兑换码输入框",
      nameEn: "Redeem code field",
      description: "深色输入框，等宽字距拉开；聚焦时边框变成银色。",
      descriptionEn: "A dark field with spaced monospace characters; the border turns silver on focus.",
      code: `<label className="block text-sm text-[#a9a8b6]">
  Redeem code
  <input
    type="text"
    placeholder="XXXX-XXXX-XXXX"
    className="
      mt-2 block w-full rounded-xl border border-white/15 bg-[#141319]
      px-4 py-3 font-mono tracking-[0.2em] text-[#ececf2]
      placeholder:text-[#6c6b78]
      focus:outline-none focus:border-[#c9c8d4]
      focus-visible:ring-2 focus-visible:ring-[#c9c8d4]/40
      transition-colors
    "
  />
</label>`,
      preview: `<div class="w-full max-w-md rounded-2xl bg-[#0c0b10] p-8">
  <label class="block text-sm text-[#a9a8b6]">Redeem code
    <input type="text" placeholder="XXXX-XXXX-XXXX" class="mt-2 block w-full rounded-xl border border-white/15 bg-[#141319] px-4 py-3 font-mono tracking-[0.2em] text-[#ececf2] placeholder:text-[#6c6b78] focus:outline-none focus:border-[#c9c8d4] focus-visible:ring-2 focus-visible:ring-[#c9c8d4]/40 transition-colors" />
  </label>
</div>`,
    },
    nav: {
      name: "导航栏",
      nameEn: "Navigation",
      description: "印张上的一行细导航，字标是一小块镭射字。",
      descriptionEn: "A quiet row on the print sheet with a small foil wordmark.",
      code: `<nav className="flex items-center justify-between border-b border-white/10 bg-[#0c0b10] px-6 py-4 text-[#ececf2]">
  <a href="/" className="foil-text text-xl font-extrabold tracking-tight">Lumen</a>
  <div className="flex gap-6 text-sm text-[#a9a8b6]">
    <a href="#cards" className="hover:text-[#ececf2] transition-colors">Cards</a>
    <a href="#foils" className="hover:text-[#ececf2] transition-colors">Foils</a>
  </div>
</nav>`,
      preview: `<nav class="flex w-full items-center justify-between border-b border-white/10 bg-[#0c0b10] px-6 py-4 text-[#ececf2]">
  <a href="#" class="font-sans text-xl font-extrabold tracking-tight" style="${foilTextPreviewStyle(0.08, 0.48, 36)}">Lumen</a>
  <div class="flex gap-6 text-sm text-[#a9a8b6]">
    <a href="#" class="hover:text-[#ececf2] transition-colors">Cards</a>
    <a href="#" class="hover:text-[#ececf2] transition-colors">Foils</a>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      nameEn: "Hero",
      description: "近黑印张上一张宽幅箔卡，标题保持安静，让箔面说话。",
      descriptionEn: "One wide foil card on the dark sheet; the heading stays quiet and lets the foil speak.",
      code: `<section className="bg-[#0c0b10] px-6 py-20 text-[#ececf2]">
  <div className="mx-auto max-w-5xl">
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#6c6b78]">Series 02 · Diffraction foil</p>
    <h1 className="mt-3 text-5xl font-extrabold tracking-tight md:text-7xl">Light is the ink.</h1>
    <div className="foil relative mt-10 aspect-[1.8] w-full overflow-hidden rounded-2xl" />
  </div>
</section>`,
      preview: `<section class="w-full bg-[#0c0b10] px-6 py-16 text-[#ececf2]">
  <div class="mx-auto max-w-3xl">
    <p class="font-mono text-xs uppercase tracking-[0.2em] text-[#6c6b78]">Series 02 · Diffraction foil</p>
    <h1 class="mt-3 font-sans text-5xl font-extrabold tracking-tight">Light is the ink.</h1>
    <div class="relative mt-10 aspect-[1.8] w-full overflow-hidden rounded-2xl" style="${foilPreviewStyle("dark", 0.3, 0.62)}"></div>
  </div>
</section>`,
    },
    footer: {
      name: "页脚",
      nameEn: "Footer",
      description: "细线分隔的等宽注释。",
      descriptionEn: "Monospace notes under a hairline.",
      code: `<footer className="flex flex-wrap justify-between gap-3 border-t border-white/10 bg-[#0c0b10] px-6 py-6 font-mono text-xs tracking-[0.12em] text-[#6c6b78]">
  <span>Grooves 1500 nm · Lamp 300 px</span>
  <span>One WebGL context</span>
</footer>`,
      preview: `<footer class="flex w-full flex-wrap justify-between gap-3 border-t border-white/10 bg-[#0c0b10] px-6 py-6 font-mono text-xs tracking-[0.12em] text-[#6c6b78]">
  <span>Grooves 1500 nm · Lamp 300 px</span>
  <span>One WebGL context</span>
</footer>`,
    },
  },

  globalCss: `/* Diffraction Foil：CSS 平替。灯的脚本（见复现提示词第 7 条）按灯的方向写入
   --k（刻槽法向角度）、--bs/--bp（光谱窗口）、--lx/--ly（灯相对元素的位置）；
   没有脚本时显示一张静态的银底和默认光谱。 */
:root {
  --foil-sheet: #0c0b10;
  --foil-ink: #16151c;
  --foil-silver: #c9c8d4;
  /* 光谱条：t 从 -1.25 到 1.25，按 |t| 处的光栅颜色画（d = 1500nm，1–3 级） */
  --spectrum: ${DIFFRACTION_FOIL_SPECTRUM};
}

.foil {
  --k: 24deg;
  isolation: isolate;
  overflow: hidden;
  background: linear-gradient(calc(var(--k) + 90deg), #4f4e59, #a3a2af 28%, #5e5d68 50%, #adacb9 76%, #575661);
}
.foil.foil-light {
  --blend: overlay;
  background: linear-gradient(calc(var(--k) + 90deg), #b4b3bf, #e9e8f0 30%, #bdbcc8 52%, #ecebf2 78%, #b6b5c1);
}
.foil::before {
  content: "";
  position: absolute;
  z-index: -1;
  left: 50%;
  top: 50%;
  width: var(--dg, 300%);
  height: var(--dg, 300%);
  transform: translate(-50%, -50%) rotate(var(--k));
  background: var(--spectrum) var(--bp, 0) 0 / var(--bs, 100%) 100% repeat-x;
  mix-blend-mode: var(--blend, screen);
  opacity: 0.92;
  pointer-events: none;
}
.foil::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle at var(--lx, 70%) var(--ly, 0%), rgb(255 255 255 / 0.55), rgb(255 255 255 / 0) 150px);
  mix-blend-mode: screen;
  pointer-events: none;
}
.foil-text {
  background:
    radial-gradient(circle at var(--lx, 70%) var(--ly, 0%), rgb(255 255 255 / 0.9), rgb(255 255 255 / 0) 120px),
    var(--spectrum) var(--bp, 0) 0 / var(--bs, 100%) 100% repeat-x,
    linear-gradient(#e2e1ea, #8f8e9b 55%, #cfced9);
  background-blend-mode: screen, screen, normal;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
@media (prefers-reduced-motion: reduce) {
  .foil, .foil-text { transition: none; }
}`,

  aiRules: `## 镭射箔风格规则
- 颜色按衍射光栅算，不是渐变：d = 1500nm，λ = d × |dot(h, k)| / m，1–3 级按 1、0.5、0.3 叠加，CIE 1931 配色、ACES 色调映射
- 指针是离屏幕 300px 的灯，所有镭射元素共用；4 秒没动时灯自己慢慢绕圈
- 背景用近黑印张 bg-[#0c0b10]；正文 text-[#ececf2]，次要 text-[#a9a8b6]，注释 text-[#6c6b78]
- 镭射元素用 foil（深银）或 foil foil-light（浅银，可印 text-[#16151c] 油墨字）；镭射字用 foil-text；foil 不自带定位，配 relative 或 absolute
- 大部分面积是银，彩虹只出现在角度对上的地方
- 整页一个 WebGL2 上下文，逐个元素渲染后拷进各自的 2D 画布；同时提供 CSS 平替
- 按下、勾选、拖动只弯着色法线，弹簧刚度 320、阻尼比 0.32
- 焦点：focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9c8d4]
- 禁止固定彩虹渐变加 background-position 动画；禁止 hue-rotate 循环；禁止文字压在彩虹带上

默认按下方完整复现规则生成。用户指定的品牌名、文案和配色可以覆盖默认数据；光栅、灯、材质、单上下文和无障碍规则保持不变。

${diffractionFoilPrompt.zh}`,
  aiRulesEn: `## Diffraction Foil Rules
- Compute color with a diffraction grating, not a gradient: d = 1500 nm, λ = d * |dot(h, k)| / m, orders 1-3 at weights 1, 0.5, 0.3, CIE 1931 color matching, ACES tone mapping
- The pointer is a lamp 300 px above the screen shared by every foil element; after 4 idle seconds it orbits slowly
- Use a near-black sheet bg-[#0c0b10]; body text-[#ececf2], secondary text-[#a9a8b6], notes text-[#6c6b78]
- Foil surfaces use foil (dark silver) or foil foil-light (light silver that can carry text-[#16151c] ink); foil type uses foil-text; foil sets no position, so pair it with relative or absolute
- Most of the surface stays silver; color appears only where the angle lines up
- One WebGL2 context for the page, rendering each element and copying it into its own 2D canvas, plus a CSS fallback
- Press, toggle, and drag bend only the shading normal, springing back with stiffness 320 and damping ratio 0.32
- Focus: focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9c8d4]
- Never animate a fixed rainbow gradient's background-position, never cycle hue-rotate, never put text on spectral bands

Use the complete reproduction rules below by default. Explicit user requests for a brand name, copy, or palette override those values; keep the grating, lamp, materials, single-context, and accessibility rules.

${diffractionFoilPrompt.en}`,

  examplePrompts: [
    {
      title: "完整复现镭射收藏卡",
      titleEn: "Reproduce the foil trading card",
      description: "单文件 HTML：WebGL 衍射箔卡片、零件表和 CSS 平替。",
      descriptionEn: "A single HTML file with the WebGL diffraction card, a component sheet, and the CSS fallback.",
      prompt: diffractionFoilPrompt.zh,
      promptEn: diffractionFoilPrompt.en,
    },
    {
      title: "镭射定价卡",
      titleEn: "Foil pricing cards",
      description: "三档定价卡，只有推荐档用镭射箔。",
      descriptionEn: "Three pricing tiers where only the recommended tier is foil.",
      prompt: "用镭射箔风格做三档定价卡。近黑印张背景 #0c0b10；只有推荐档的卡头用 foil foil-light 浅色箔，价格用油墨字 #16151c 印在箔上，其余两档是深色卡。指针当成离屏幕 300px 的灯，用复现提示词里的 CSS 平替脚本让箔面跟着灯变色；遵守减少动态效果。交付单文件 HTML。",
      promptEn: "Create three pricing tiers in Diffraction Foil style. Use a near-black #0c0b10 sheet; only the recommended tier's header is foil foil-light with ink #16151c pricing printed on it, while the other two tiers stay dark. Treat the pointer as a lamp 300 px above the screen and drive the foil with the CSS fallback script from the reproduction prompt; honor reduced motion. Deliver one HTML file.",
    },
    {
      title: "防伪标签组件",
      titleEn: "Anti-counterfeit label",
      description: "星芒圆章、编号和防撕封签。",
      descriptionEn: "A star-groove seal, serial number, and tamper-evident label.",
      prompt: "用镭射箔风格做一个防伪标签：一枚同心圆刻槽的星芒圆章（只有朝着灯的半径亮出彩虹），旁边是等宽编号，下面一条撕开会露出 VOID 字样的封签。颜色按光栅方程算，指针是灯。交付单文件 HTML。",
      promptEn: "Create an anti-counterfeit label in Diffraction Foil style: a concentric-groove star seal where only the radius facing the lamp shows color, a monospace serial number beside it, and a tamper strip that reveals VOID when peeled. Compute color with the grating equation; the pointer is the lamp. Deliver one HTML file.",
    },
  ],

  variants: [
    {
      id: "diffraction-foil-gold",
      name: "镭射箔金箔版",
      nameEn: "Diffraction Foil Gold",
      description: "Gold base metal under the same grating: warmer silver bands, same spectral sweep",
      colors: {
        primary: "#100d08",
        secondary: "#d9c08a",
        accent: ["#ff6a8c", "#ffd36b", "#7be0a4", "#6aa8ff", "#c28bff"],
      },
    },
    {
      id: "diffraction-foil-paper",
      name: "镭射箔白卡纸版",
      nameEn: "Diffraction Foil on Paper",
      description: "Foil stamped on white card stock: light sheet, ink text, foil kept to small marks",
      colors: {
        primary: "#f4f2ec",
        secondary: "#9c9ba8",
        accent: ["#e0459e", "#e8b23c", "#2fbf8f", "#3f86e6", "#8a6be8"],
      },
    },
  ],
};
