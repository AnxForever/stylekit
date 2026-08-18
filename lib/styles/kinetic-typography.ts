import type { DesignStyle } from "./types";

export const kineticTypography: DesignStyle = {
  slug: "kinetic-typography",
  name: "动力学排印",
  nameEn: "Kinetic Typography",
  description:
    "文字即界面的动态排印风格。墨黑舞台上，可变字体的字重与字宽成为动画本体：逐字登场、字重呼吸、滚动速度拉伸字宽。一切动效只属于文字，唯一的信号橙负责指路。",
  descriptionEn:
    "Type is the interface. On an ink-black stage the variable font itself becomes the animation: letters arrive one by one, weights breathe, widths stretch with scroll velocity. Motion belongs to the words alone, and a single signal orange points the way.",
  cover: "/styles/kinetic-typography.svg",
  styleType: "visual",
  tags: [],
  category: "expressive",
  colors: {
    primary: "#0B0B0C",
    secondary: "#F4F1EB",
    accent: ["#FF4D00", "#141416", "#8A857B"],
  },
  keywords: ["kinetic typography", "variable font", "motion", "stagger", "marquee", "type-driven", "动态排印", "可变字体", "文字动画"],
  keywordsEn: ["kinetic typography", "animated typography", "text animation", "variable fonts", "staggered text reveal", "marquee text", "big type", "scroll-driven animation", "motion design", "type-driven layout", "landing page"],

  philosophy: `动力学排印的信条：文字不是排上去的，是登场的。当文字本身成为唯一主角，动效就不再是装饰，而是语气——字重是音量，字宽是呼吸，入场节奏是断句。

核心理念：
- 文字即界面：没有插图、没有图标堆砌，信息层级全部由字号、字重、字宽的巨大反差承担（12px 的注释与 12vw 的标题同屏）
- 可变字体是引擎：动画的不是位置和颜色，而是 font-variation-settings 的 wght 与 wdth 轴——这是别的风格做不到的原生动效
- 编舞规则：一屏只允许一个主导动效。逐字入场时别的元素安静；跑马灯滚动时标题静止
- 遮罩入场：文字从 overflow 遮罩下方升起（translateY 110% → 0），像幕布后走出的演员，绝不用平淡的 fade
- 唯一信号色：信号橙 #FF4D00 只用于主 CTA、关键词高亮和悬停反馈，永不铺底
- 动效即物理：expo-out 缓动（cubic-bezier(0.22,1,0.36,1)），快启动慢落定；stagger 30-50ms 制造波浪

设计原则：
- 性能红线：只动 transform / opacity / font-variation-settings，绝不动 top/left/width 触发重排
- 无障碍红线：prefers-reduced-motion 下所有动画降级为静态终态，信息零丢失
- 交互反馈：hover 字重加粗或下划线扫入，active 缩放 0.98，focus 有可见轮廓
- 响应式：标题用 clamp() 流式缩放，移动端 stagger 间隔减半保持利落`,

  philosophyEn: `The kinetic creed: words are not placed, they enter. When type is the only protagonist, motion stops being decoration and becomes tone of voice — weight is volume, width is breath, stagger is punctuation.

Core principles:
- Type is the interface: no illustration, no icon salad; hierarchy is carried entirely by extreme contrast of size, weight and width (12px annotations share the stage with 12vw headlines)
- The variable font is the engine: animate font-variation-settings wght and wdth axes, not positions and colors — a native motion no other style owns
- Choreography rule: one dominant motion per viewport; while letters stagger in, everything else holds still
- Mask entrances: text rises from an overflow mask (translateY 110% → 0) like an actor stepping from behind a curtain — never a flat fade
- One signal color: #FF4D00 appears only on primary CTAs, key words and hover feedback, never as a surface
- Motion is physics: expo-out easing cubic-bezier(0.22,1,0.36,1), fast start, slow settle; 30-50ms stagger builds the wave`,

  doList: [
    "背景用近黑墨色 #0B0B0C，文字用暖骨白 #F4F1EB，制造高对比舞台感",
    "加载可变字体（如 Anybody，wght 100-900 + wdth 50-150 双轴）作为展示字体",
    "标题入场用遮罩上升：外层 overflow-hidden，内层 translateY(110%) 动画到 0，逐字/逐词 stagger 30-50ms",
    "缓动统一用 expo-out：cubic-bezier(0.22,1,0.36,1)，时长 0.7-0.9s",
    "用 font-variation-settings 动画字重（呼吸 300-800）与字宽（滚动速度联动 100-150）",
    "字号反差拉满：标签 11-12px 大写宽字距 + 标题 clamp(3rem,10vw,9rem) tracking-tight",
    "跑马灯用 CSS 无缝循环（内容复制两份 + translateX -50%），hover 暂停",
    "信号橙 #FF4D00 只出现在主 CTA、关键词与悬停态",
    "所有动画都写 prefers-reduced-motion 降级到静态终态",
  ],

  doListEn: [
    "Stage the page on near-black ink #0B0B0C with warm bone text #F4F1EB for maximum contrast",
    "Load a variable font (e.g. Anybody, wght 100-900 + wdth 50-150) as the display face",
    "Mask entrances for headlines: overflow-hidden wrapper, inner element animates translateY(110%) to 0, staggered 30-50ms per char/word",
    "One easing everywhere: expo-out cubic-bezier(0.22,1,0.36,1), 0.7-0.9s",
    "Animate font-variation-settings: weight breathing 300-800, width stretching 100-150 with scroll velocity",
    "Extreme size contrast: 11-12px uppercase tracked labels against clamp(3rem,10vw,9rem) tracking-tight headlines",
    "Seamless CSS marquee (duplicate content, translateX -50% loop), pause on hover",
    "Signal orange #FF4D00 only on primary CTAs, key words and hover states",
    "Every animation ships a prefers-reduced-motion fallback that lands on the static end state",
  ],

  dontList: [
    "禁止动画 top/left/width/height 等布局属性（重排卡顿）——只许 transform/opacity/font-variation-settings",
    "禁止一屏同时跑多个主导动效（编舞规则：一次一个主角）",
    "禁止用图片或插画抢文字的戏（本风格里图像最多是背景纹理）",
    "禁止超过一个强调色，禁止把信号橙铺成大面积底色",
    "禁止平淡的 opacity-only 淡入代替遮罩上升",
    "禁止超过 1.2s 的拖沓动画与 linear 缓动",
    "禁止忽略 prefers-reduced-motion",
  ],

  dontListEn: [
    "Never animate layout properties (top/left/width/height) — transform/opacity/font-variation-settings only",
    "Never run multiple dominant motions in one viewport (choreography: one protagonist at a time)",
    "Never let images or illustration steal the stage from type (imagery is texture at most)",
    "Never use more than one accent, never flood signal orange as a surface color",
    "Never substitute a flat opacity fade for a mask rise",
    "Never drag animations past 1.2s or use linear easing",
    "Never skip the prefers-reduced-motion fallback",
  ],

  components: {
    button: {
      name: "Button",
      description: "Ink button with signal-orange fill wipe and weight shift on hover",
      code: `<button className="group relative overflow-hidden
  px-7 py-3.5
  bg-transparent border border-[#F4F1EB]/25
  text-[#F4F1EB] uppercase tracking-[0.15em] text-sm font-semibold
  transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
  hover:border-[#FF4D00] hover:text-[#0B0B0C]
  active:scale-[0.98]
">
  <span className="absolute inset-0 bg-[#FF4D00] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
  <span className="relative z-10">Enter Motion</span>
</button>`,
    },
    card: {
      name: "Card",
      description: "Numbered type card whose headline gains weight on hover",
      code: `<article className="group border-t border-[#F4F1EB]/15 py-8 px-1
  transition-colors duration-500 hover:border-[#FF4D00]
">
  <span className="block font-mono text-xs text-[#F4F1EB]/40 mb-4">01</span>
  <h3 className="text-3xl md:text-4xl text-[#F4F1EB] tracking-tight leading-none mb-3
    [font-variation-settings:'wght'_450]
    group-hover:[font-variation-settings:'wght'_800]
    transition-[font-variation-settings] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
  ">
    Weight Is Volume
  </h3>
  <p className="text-[#F4F1EB]/55 text-sm max-w-sm leading-relaxed">
    The headline speaks louder as you approach. No color change, no shadow — just mass.
  </p>
</article>`,
    },
    input: {
      name: "Input",
      description: "Underline field whose baseline sweeps in signal orange on focus",
      code: `<label className="group block">
  <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-[#F4F1EB]/45 mb-2
    group-focus-within:text-[#FF4D00] transition-colors duration-300">
    Your Name
  </span>
  <div className="relative">
    <input type="text" placeholder="Type here"
      className="w-full bg-transparent py-3 text-xl text-[#F4F1EB] placeholder-[#F4F1EB]/25
        border-b border-[#F4F1EB]/20 focus:outline-none" />
    <span className="absolute bottom-0 left-0 h-px w-full bg-[#FF4D00] origin-left scale-x-0
      group-focus-within:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
  </div>
</label>`,
    },
    nav: {
      name: "Navigation",
      description: "Wordmark nav; links grow an orange underline sweep on hover",
      code: `<nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0B0C]/90 backdrop-blur-sm border-b border-[#F4F1EB]/10">
  <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
    <a href="/" className="text-[#F4F1EB] font-extrabold tracking-tight text-lg">
      KINETIC<span className="text-[#FF4D00]">*</span>
    </a>
    <div className="flex items-center gap-7">
      <a href="#work" className="group relative text-sm text-[#F4F1EB]/60 hover:text-[#F4F1EB] uppercase tracking-[0.15em] transition-colors duration-300">
        Work
        <span className="absolute -bottom-1 left-0 h-px w-full bg-[#FF4D00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero",
      description: "Giant staggered mask-rise headline with one breathing accent word",
      code: `<section className="min-h-screen bg-[#0B0B0C] flex items-center px-6 overflow-hidden">
  <style>{\`
    @keyframes kt-rise { from { transform: translateY(110%); } to { transform: translateY(0); } }
    @keyframes kt-breathe {
      from { font-variation-settings: "wght" 300; }
      to { font-variation-settings: "wght" 800; }
    }
    .kt-line { overflow: hidden; }
    .kt-line > span { display: inline-block; animation: kt-rise 0.9s cubic-bezier(0.22,1,0.36,1) both; }
    .kt-breathe { animation: kt-breathe 2.4s ease-in-out infinite alternate; }
    @media (prefers-reduced-motion: reduce) {
      .kt-line > span { animation: none; }
      .kt-breathe { animation: none; font-variation-settings: "wght" 700; }
    }
  \`}</style>
  <h1 className="text-[#F4F1EB] tracking-tight leading-[0.95] text-[clamp(3rem,10vw,9rem)] font-bold">
    <span className="kt-line block"><span style={{ animationDelay: "0s" }}>Words</span></span>
    <span className="kt-line block"><span style={{ animationDelay: "0.08s" }}>in <em className="not-italic text-[#FF4D00] kt-breathe">motion</em></span></span>
  </h1>
</section>`,
    },
  },

  globalCss: `/* Kinetic Typography Global Styles */

:root {
  --kt-ink: #0B0B0C;
  --kt-ink-raised: #141416;
  --kt-bone: #F4F1EB;
  --kt-signal: #FF4D00;
  --kt-muted: rgba(244, 241, 235, 0.55);
  --kt-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --kt-duration: 0.9s;
  --kt-stagger: 40ms;
}

/* Mask-rise entrance: wrap each line in .kt-line, put text in a child span */
.kt-line {
  overflow: hidden;
  display: block;
}
.kt-line > span {
  display: inline-block;
  transform: translateY(110%);
  animation: kt-rise var(--kt-duration) var(--kt-ease) both;
}

@keyframes kt-rise {
  to { transform: translateY(0); }
}

/* Variable-font weight breathing */
@keyframes kt-breathe {
  from { font-variation-settings: "wght" 300; }
  to { font-variation-settings: "wght" 800; }
}
.kt-breathe { animation: kt-breathe 2.4s ease-in-out infinite alternate; }

/* Seamless marquee: duplicate the strip content twice inside .kt-marquee-track */
.kt-marquee { overflow: hidden; white-space: nowrap; }
.kt-marquee-track {
  display: inline-flex;
  animation: kt-marquee 24s linear infinite;
}
.kt-marquee:hover .kt-marquee-track { animation-play-state: paused; }
@keyframes kt-marquee {
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .kt-line > span { animation: none; transform: none; }
  .kt-breathe { animation: none; font-variation-settings: "wght" 700; }
  .kt-marquee-track { animation: none; }
}`,

  aiRules: `# 动力学排印（Kinetic Typography）设计系统

你是一个专精动力学排印（Kinetic Typography）风格的前端开发专家，生成的所有代码都必须严格遵循以下规范。

## 风格身份
- **名称**：Kinetic Typography（动力学排印）
- **本质**：文字即界面；可变字体本身就是动画引擎
- **气质**：自信、富有节奏感、编辑感与野兽派交织、如舞台一般
- **灵感来源**：动态海报、片头字幕序列、Studio Dumbar 一脉的字体实验

---

## 绝对禁止

| 模式 | 原因 |
|---------|--------|
| 给 top/left/width/height/margin 做动画 | 触发重排卡顿；只允许 transform、opacity、font-variation-settings 参与动画 |
| 一屏同时出现多个主导动效 | 编舞规则：一次只有一个主角 |
| 图片／插画与文字抢戏 | 文字才是舞台的主人；图像最多只是纹理 |
| 超过一个强调色；把橙色铺成大面积表面 | #FF4D00 是信号色，绝不能作为填充色 |
| 只用 opacity 做入场淡入 | 遮罩上升才是本风格的招牌；平淡淡入是禁止的 |
| 动画超过 1.2s，或使用 linear 缓动 | 会失去干脆的节奏感；请使用 0.9s 以内的 expo-out |
| 缺少 prefers-reduced-motion 降级 | 无障碍体验没有商量余地 |

## 必须遵守

### 舞台
- 背景 #0B0B0C（近黑墨色），抬升面 #141416
- 文字 #F4F1EB（暖骨白），次要文字 rgba(244,241,235,0.55)
- 唯一强调色 #FF4D00：仅用于主 CTA、关键词、悬停反馈

### 可变字体引擎
\`\`\`html
<link rel="stylesheet" href="https://fonts.loli.net/css2?family=Anybody:wdth,wght@50..150,100..900&display=swap" />
\`\`\`
展示字体栈：font-family: "Anybody", Archivo, ui-sans-serif, sans-serif
（fonts.googleapis.com 同样可用；loli.net 是它的国内镜像，方便中国大陆访问）

### 遮罩上升入场（招牌）
\`\`\`html
<span class="block overflow-hidden">
  <span class="inline-block" style="transform: translateY(110%); animation: kt-rise 0.9s cubic-bezier(0.22,1,0.36,1) both; animation-delay: calc(var(--i) * 40ms)">Word</span>
</span>
\`\`\`
\`\`\`css
@keyframes kt-rise { to { transform: translateY(0); } }
\`\`\`

### 字重呼吸
\`\`\`css
@keyframes kt-breathe {
  from { font-variation-settings: "wght" 300; }
  to { font-variation-settings: "wght" 800; }
}
.kt-breathe { animation: kt-breathe 2.4s ease-in-out infinite alternate; }
\`\`\`
每屏只用在一个关键词上。

### 滚动速度拉伸字宽（进阶，JS）
\`\`\`js
let last = scrollY, vel = 0;
(function tick() {
  vel = vel * 0.9 + Math.abs(scrollY - last) * 0.1; last = scrollY;
  el.style.fontVariationSettings = \`"wght" 700, "wdth" \${Math.min(150, 100 + vel * 2)}\`;
  requestAnimationFrame(tick);
})();
\`\`\`

### GSAP 配方（可选，项目已有 gsap 时优先）
\`\`\`js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);
const split = SplitText.create(".headline", { type: "chars" });
gsap.from(split.chars, {
  yPercent: 110, stagger: 0.04, duration: 0.9, ease: "expo.out",
  scrollTrigger: { trigger: ".headline", start: "top 80%" },
});
\`\`\`

### 跑马灯
把内容复制两份放进 track；track 做 translateX(-50%) 的 linear infinite 24s 动画；hover 时暂停。

### 字号系统
- 标签：11-12px，大写，letter-spacing 0.2-0.3em
- 正文：15-16px，line-height 1.6
- 标题：clamp(3rem, 10vw, 9rem)，letter-spacing -0.02em，line-height 0.95

### 节奏
- 统一使用一种缓动：cubic-bezier(0.22,1,0.36,1)
- 入场 0.7-0.9s；hover 反馈 0.3-0.5s；逐字 stagger 30-50ms，逐行 stagger 80-120ms

### 无障碍
\`\`\`css
@media (prefers-reduced-motion: reduce) {
  .kt-line > span, .kt-breathe, .kt-marquee-track { animation: none; transform: none; }
}
\`\`\`
所有元素都停在各自的静态终态，信息零丢失。

## 自检清单

- [ ] 墨色舞台、骨白文字、唯一橙色信号
- [ ] 标题使用遮罩上升 + stagger，绝不使用平淡淡入
- [ ] 参与动画的只有 transform/opacity/font-variation-settings
- [ ] 一屏只有一个主导动效
- [ ] 存在 prefers-reduced-motion 降级
- [ ] 全程统一使用 expo-out 缓动`,

  aiRulesEn: `# Kinetic Typography Design System

You are an expert frontend developer specializing in kinetic typography. Generate all code strictly following these specifications.

## Style Identity
- **Name**: Kinetic Typography
- **Essence**: Type is the interface; the variable font is the animation engine
- **Mood**: Confident, rhythmic, editorial-brutalist, stage-like
- **Inspiration**: Motion posters, title sequences, Studio Dumbar-school type experiments

---

## Forbidden

| Pattern | Reason |
|---------|--------|
| Animating top/left/width/height/margin | Layout thrash; only transform, opacity, font-variation-settings may animate |
| Multiple dominant motions per viewport | Choreography rule: one protagonist at a time |
| Images/illustration competing with type | Type owns the stage; imagery is texture at most |
| More than one accent; orange surfaces | #FF4D00 is a signal, never a fill |
| Opacity-only fades for entrances | Mask rises are the signature; flat fades are forbidden |
| Animations over 1.2s or linear easing | Kills the snap; use expo-out under 0.9s |
| Missing prefers-reduced-motion fallback | Accessibility is non-negotiable |

## Required

### Stage
- Background #0B0B0C (near-black ink), raised surface #141416
- Text #F4F1EB (warm bone), secondary rgba(244,241,235,0.55)
- The one accent #FF4D00: primary CTAs, key words, hover feedback only

### Variable Font Engine
\`\`\`html
<link rel="stylesheet" href="https://fonts.loli.net/css2?family=Anybody:wdth,wght@50..150,100..900&display=swap" />
\`\`\`
Display stack: font-family: "Anybody", Archivo, ui-sans-serif, sans-serif
(fonts.googleapis.com works too; loli.net mirrors it for CN access)

### Mask Rise Entrance (signature)
\`\`\`html
<span class="block overflow-hidden">
  <span class="inline-block" style="transform: translateY(110%); animation: kt-rise 0.9s cubic-bezier(0.22,1,0.36,1) both; animation-delay: calc(var(--i) * 40ms)">Word</span>
</span>
\`\`\`
\`\`\`css
@keyframes kt-rise { to { transform: translateY(0); } }
\`\`\`

### Weight Breathing
\`\`\`css
@keyframes kt-breathe {
  from { font-variation-settings: "wght" 300; }
  to { font-variation-settings: "wght" 800; }
}
.kt-breathe { animation: kt-breathe 2.4s ease-in-out infinite alternate; }
\`\`\`
Apply to ONE key word per viewport.

### Scroll-Velocity Width Stretch (advanced, JS)
\`\`\`js
let last = scrollY, vel = 0;
(function tick() {
  vel = vel * 0.9 + Math.abs(scrollY - last) * 0.1; last = scrollY;
  el.style.fontVariationSettings = \`"wght" 700, "wdth" \${Math.min(150, 100 + vel * 2)}\`;
  requestAnimationFrame(tick);
})();
\`\`\`

### GSAP Recipe (preferred when gsap is available)
\`\`\`js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);
const split = SplitText.create(".headline", { type: "chars" });
gsap.from(split.chars, {
  yPercent: 110, stagger: 0.04, duration: 0.9, ease: "expo.out",
  scrollTrigger: { trigger: ".headline", start: "top 80%" },
});
\`\`\`

### Marquee
Duplicate strip content twice inside a track; animate track translateX(-50%) linear infinite 24s; pause on hover.

### Type Scale
- Labels: 11-12px, uppercase, letter-spacing 0.2-0.3em
- Body: 15-16px, line-height 1.6
- Headlines: clamp(3rem, 10vw, 9rem), letter-spacing -0.02em, line-height 0.95

### Rhythm
- One easing: cubic-bezier(0.22,1,0.36,1)
- Entrances 0.7-0.9s; hover 0.3-0.5s; stagger 30-50ms per char, 80-120ms per line

### Reduced Motion
\`\`\`css
@media (prefers-reduced-motion: reduce) {
  .kt-line > span, .kt-breathe, .kt-marquee-track { animation: none; transform: none; }
}
\`\`\`
Everything lands on its static end state; zero information loss.

## Self-Verification Checklist

- [ ] Ink stage, bone type, single orange signal
- [ ] Headlines use mask rise + stagger, never flat fades
- [ ] Only transform/opacity/font-variation-settings animate
- [ ] One dominant motion per viewport
- [ ] prefers-reduced-motion fallback present
- [ ] expo-out easing everywhere`,

  examplePrompts: [
    {
      title: "动力学排印落地页",
      titleEn: "Kinetic Type Landing Page",
      description: "文字为唯一主角的产品发布页",
      descriptionEn: "A launch page where type is the only protagonist",
      prompt: `Create a kinetic typography landing page with:
1. Stage: #0B0B0C background, #F4F1EB text, single #FF4D00 accent
2. Load variable font Anybody (wght 100-900, wdth 50-150) from fonts.loli.net
3. Hero: clamp(3rem,10vw,9rem) headline, each line rising from an overflow mask with 80ms stagger, one accent word running a wght 300-800 breathing loop
4. A full-width marquee strip of uppercase feature words, pause on hover
5. Numbered feature cards whose headlines jump from wght 450 to 800 on hover
6. CTA button with signal-orange fill wipe rising on hover
7. All easing cubic-bezier(0.22,1,0.36,1); only transform/opacity/font-variation-settings animate; prefers-reduced-motion lands everything on static end states`,
      promptEn: `Create a kinetic typography landing page with:
1. Stage: #0B0B0C background, #F4F1EB text, single #FF4D00 accent
2. Load variable font Anybody (wght 100-900, wdth 50-150) from fonts.loli.net
3. Hero: clamp(3rem,10vw,9rem) headline, each line rising from an overflow mask with 80ms stagger, one accent word running a wght 300-800 breathing loop
4. A full-width marquee strip of uppercase feature words, pause on hover
5. Numbered feature cards whose headlines jump from wght 450 to 800 on hover
6. CTA button with signal-orange fill wipe rising on hover
7. All easing cubic-bezier(0.22,1,0.36,1); only transform/opacity/font-variation-settings animate; prefers-reduced-motion lands everything on static end states`,
    },
    {
      title: "文字驱动作品集",
      titleEn: "Type-Driven Portfolio",
      description: "无图片的纯排印作品集",
      descriptionEn: "An image-free portfolio carried entirely by type",
      prompt: `Create a type-driven portfolio site with:
1. Ink stage #0B0B0C, bone type #F4F1EB, orange signal #FF4D00
2. Project list as huge headline rows (clamp 2.5rem-6rem): on hover the row's font-variation-settings width stretches wdth 100 to 130 and an orange index number slides in
3. Section headings enter with per-char mask rise, 40ms stagger, expo-out
4. A skills marquee strip between sections, opposite scroll directions on alternate strips
5. Footer contact line with a giant breathing "HELLO" (wght 300-800 loop)
6. GSAP ScrollTrigger optional recipe for scroll-scrubbed entrances; CSS fallback required
7. prefers-reduced-motion: all text static at final weights`,
      promptEn: `Create a type-driven portfolio site with:
1. Ink stage #0B0B0C, bone type #F4F1EB, orange signal #FF4D00
2. Project list as huge headline rows (clamp 2.5rem-6rem): on hover the row's font-variation-settings width stretches wdth 100 to 130 and an orange index number slides in
3. Section headings enter with per-char mask rise, 40ms stagger, expo-out
4. A skills marquee strip between sections, opposite scroll directions on alternate strips
5. Footer contact line with a giant breathing "HELLO" (wght 300-800 loop)
6. GSAP ScrollTrigger optional recipe for scroll-scrubbed entrances; CSS fallback required
7. prefers-reduced-motion: all text static at final weights`,
    },
  ],

  variants: [
    {
      id: "kinetic-typography-acid",
      name: "动力学排印·酸性",
      nameEn: "Kinetic Acid",
      description: "Chartreuse signal on the same ink stage for rave and event energy",
      colors: {
        primary: "#0B0B0C",
        secondary: "#F4F1EB",
        accent: ["#D8FF3D", "#141416", "#8A857B"],
      },
    },
    {
      id: "kinetic-typography-paper",
      name: "动力学排印·纸面",
      nameEn: "Kinetic Paper",
      description: "Inverted stage: bone paper background with ink type, same signal orange",
      colors: {
        primary: "#F4F1EB",
        secondary: "#0B0B0C",
        accent: ["#FF4D00", "#E8E4DA", "#6B665C"],
      },
    },
  ],
};
