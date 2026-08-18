import type { DesignStyle } from "./types";

export const cinematicVideoHero: DesignStyle = {
  slug: "cinematic-video-hero",
  name: "电影视频首屏",
  nameEn: "Cinematic Video Hero",
  description:
    "以短循环视频开场的电影级首屏。海报帧先出作 LCP，视频进视口才静音自动播、无缝循环；文字压在可读性遮罩上，暗场调色与缓慢运动营造预告片般的沉浸开场。",
  descriptionEn:
    "A cinematic opener led by a short looping video. A poster frame paints first as the LCP; the muted video autoplays and loops only once in view; text sits on a readability scrim. Dark grading and slow motion build a trailer-like immersive entrance.",
  cover: "/styles/cinematic-video-hero.svg",
  styleType: "visual",
  tags: [],
  category: "expressive",
  colors: {
    primary: "#05060A",
    secondary: "#F3EFE8",
    accent: ["#E4C063", "#141821", "#9AA6B8"],
  },
  keywords: ["cinematic", "video hero", "background video", "loop", "poster", "trailer", "电影感", "视频背景", "首屏", "循环"],
  keywordsEn: ["video hero", "cinematic hero", "background video", "hero video section", "video landing page", "autoplay loop", "poster frame", "video banner", "dark cinematic", "trailer style"],

  philosophy: `电影视频首屏的信条：开场是一部预告片，不是一张幻灯片。视频给静态页面注入时间感——光在流动、雾在飘、色在呼吸——但它必须先让位于性能：海报帧秒开，视频悄悄补上。

核心理念：
- 海报优先：poster 帧是 LCP，必须瞬间可见（AVIF/WebP，小而精）。视频是渐进增强，不是首屏依赖
- 视频是氛围不是内容：背景视频承载情绪与运动感，关键信息永远在文字层，不在视频里（视频可能不播）
- 静音自动循环：muted + autoplay + loop + playsInline，无声才能自动播；短循环（6-10s）无缝衔接，绝不突兀跳帧
- 可读性遮罩：文字压视频必铺渐变暗罩，保证 4.5:1；视频再动也不能吃掉文字
- 暗场电影调色：近黑底 + 低饱和冷暖对撞 + 一支暖金强调（#E4C063），像调色过的胶片
- 缓慢运动：镜头感的慢，不是花哨的快。运动服务氛围，快了就晕

设计原则：
- 性能红线：video preload="none"、进视口才 load/play（IntersectionObserver）、poster 属性兜底；显式宽高比防 CLS；hero 之外不放自动播视频
- 流量与降级：honor prefers-reduced-motion（不自动播、显 poster 静帧）、honor Save-Data（不加载视频）、移动端可只显 poster
- 格式：优先 webm(VP9/AV1) + mp4(H.264) 双 source；始终配 poster
- 无障碍：视频纯装饰要 aria-hidden；有信息的配 <track> 字幕；给用户暂停入口`,

  philosophyEn: `The cinematic-video-hero creed: the opener is a trailer, not a slide. Video injects a sense of time into a static page — light flowing, mist drifting, color breathing — but it must first yield to performance: the poster paints instantly, the video slips in behind it.

Core principles:
- Poster first: the poster frame is the LCP and must be instantly visible (AVIF/WebP, small and sharp). The video is progressive enhancement, never a first-paint dependency
- Video is atmosphere, not content: the background video carries mood and motion; critical information always lives in the text layer, never in the video (which may not play)
- Muted autoplay loop: muted + autoplay + loop + playsInline (silence is what allows autoplay); a short loop (6-10s) seams seamlessly, never a jarring jump-cut
- Readability scrim: text over video always sits on a gradient darkening for 4.5:1; however much the video moves, it never eats the text
- Dark cinematic grade: near-black base + low-saturation warm/cool clash + one warm-gold accent (#E4C063), like graded film
- Slow motion: cinematic slowness, not flashy speed. Motion serves mood; fast induces nausea

Design principles:
- Performance line: video preload="none", load/play only in view (IntersectionObserver), poster attribute as the floor; explicit aspect-ratio to prevent CLS; no autoplay video below the hero
- Data and fallback: honor prefers-reduced-motion (no autoplay, show the poster still), honor Save-Data (skip the video), mobile may show poster only
- Formats: prefer webm (VP9/AV1) + mp4 (H.264) dual sources; always pair with a poster
- Accessibility: decorative video gets aria-hidden; informational video gets <track> captions; give users a pause affordance`,

  doList: [
    "海报帧作 LCP：poster 属性 + AVIF/WebP，小而清晰，秒开",
    "视频 muted + autoplay + loop + playsInline，无声无缝短循环（6-10s）",
    "video preload=\"none\"，用 IntersectionObserver 进视口才 load()/play()",
    "文字压视频必铺渐变可读性遮罩，保证 4.5:1 对比",
    "暗场电影调色：近黑 #05060A 底 + 一支暖金 #E4C063 强调",
    "显式 aspect-ratio 或固定容器高度防 CLS",
    "双格式 source：webm(VP9) + mp4(H.264)，始终配 poster",
    "缓慢镜头感运动，关键信息全在文字层不在视频里",
    "prefers-reduced-motion / Save-Data 下不自动播、显 poster 静帧",
  ],

  doListEn: [
    "Poster frame as LCP: poster attribute + AVIF/WebP, small and sharp, instant",
    "Video muted + autoplay + loop + playsInline, a silent seamless short loop (6-10s)",
    'Video preload="none"; load()/play() only in view via IntersectionObserver',
    "Always scrim text over video with a gradient darkening for 4.5:1 contrast",
    "Dark cinematic grade: near-black #05060A base with one warm-gold #E4C063 accent",
    "Explicit aspect-ratio or fixed container height to prevent CLS",
    "Dual-source: webm (VP9) + mp4 (H.264), always paired with a poster",
    "Slow, cinematic motion; all critical information in the text layer, never in the video",
    "Under prefers-reduced-motion / Save-Data, do not autoplay — show the poster still",
  ],

  dontList: [
    "禁止视频作 LCP 依赖 / 省略 poster（首屏白屏、LCP 爆炸）",
    "禁止 preload=\"auto\" 或自动加载大视频（流量与性能灾难）",
    "禁止把关键信息放进视频（视频可能不播 / 被降级）",
    "禁止有声自动播（浏览器会拦，且打扰用户）",
    "禁止文字直接压视频不加遮罩",
    "禁止快速/跳变运动或不无缝的循环",
    "禁止忽略 prefers-reduced-motion 与移动端降级",
  ],

  dontListEn: [
    "Never make the video the LCP dependency or omit the poster (blank first paint, LCP blowup)",
    'Never preload="auto" or auto-load a large video (data + performance disaster)',
    "Never put critical information inside the video (it may not play or may be downgraded)",
    "Never autoplay with sound (browsers block it and it disturbs users)",
    "Never place text directly on video with no scrim",
    "Never use fast / jump-cut motion or a loop that does not seam",
    "Never ignore prefers-reduced-motion or a mobile fallback",
  ],

  components: {
    button: {
      name: "Button",
      description: "Warm-gold cinematic CTA and a frosted secondary",
      code: `<button className="inline-flex items-center gap-2
  px-7 py-3.5 rounded-full
  bg-[#E4C063] text-[#05060A] font-semibold
  hover:bg-[#efce78] active:scale-[0.98]
  transition-all duration-300
">
  Watch the film
  <span aria-hidden>&#9654;</span>
</button>

<button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
  bg-white/10 backdrop-blur-md border border-white/25 text-white
  hover:bg-white/18 transition-all duration-300">
  Learn more
</button>`,
    },
    card: {
      name: "Card",
      description: "Poster-backed scene card with scrim caption",
      code: `<article className="relative aspect-video overflow-hidden rounded-xl">
  <img src="/poster.avif" alt="Aurora over the range" loading="lazy" decoding="async"
    className="absolute inset-0 w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
  <div className="absolute bottom-0 p-5">
    <p className="text-xs uppercase tracking-widest text-[#E4C063] mb-1">Scene 01</p>
    <h3 className="text-white text-lg font-semibold">The long dissolve</h3>
  </div>
</article>`,
    },
    input: {
      name: "Input",
      description: "Frosted field legible over footage",
      code: `<input type="email" placeholder="Email for the premiere"
  className="w-full px-5 py-3 rounded-full
    bg-white/10 backdrop-blur-md border border-white/25
    text-white placeholder-white/50
    focus:outline-none focus:border-[#E4C063]/70 focus:bg-white/15
    transition-all duration-300" />`,
    },
    nav: {
      name: "Navigation",
      description: "Transparent-to-scrim nav floating over the video",
      code: `<nav className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-black/60 to-transparent">
  <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
    <span className="text-white font-semibold tracking-tight">Aurora Studios</span>
    <div className="flex items-center gap-6 text-sm text-white/80">
      <a href="#films" className="hover:text-white transition-colors">Films</a>
      <a href="#about" className="hover:text-white transition-colors">About</a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero",
      description: "Poster-first video hero: LCP poster, in-view autoplay, scrim, reduced-motion fallback",
      code: `function VideoHero() {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // keep poster still
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { v.load(); v.play().catch(() => {}); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <section className="relative h-screen overflow-hidden bg-[#05060A]">
      <video ref={ref} poster="/poster.avif" muted loop playsInline preload="none" aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover">
        <source src="/aurora.webm" type="video/webm" />
        <source src="/aurora.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/40" />
      <div className="relative z-10 h-full flex flex-col justify-end max-w-6xl mx-auto px-6 pb-24">
        <p className="text-[#E4C063] uppercase tracking-widest text-sm mb-3">Now screening</p>
        <h1 className="text-white text-5xl md:text-7xl font-semibold max-w-3xl leading-[1.05]">
          Some stories only move
        </h1>
      </div>
    </section>
  );
}`,
    },
  },

  globalCss: `/* Cinematic Video Hero Global Styles */

:root {
  --cv-base: #05060A;
  --cv-surface: #141821;
  --cv-paper: #F3EFE8;
  --cv-gold: #E4C063;
  --cv-steel: #9AA6B8;
}

/* Full-bleed video / poster base */
.cv-cover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Readability scrims */
.cv-scrim-cinematic { background: linear-gradient(to top, rgba(5,6,10,0.78), rgba(5,6,10,0.2) 45%, rgba(5,6,10,0.45)); }

/* Letterbox bars for a filmic frame (optional) */
.cv-letterbox::before,
.cv-letterbox::after {
  content: "";
  position: absolute;
  left: 0; right: 0;
  height: 6vh;
  background: #05060A;
  z-index: 20;
  pointer-events: none;
}
.cv-letterbox::before { top: 0; }
.cv-letterbox::after { bottom: 0; }

@media (prefers-reduced-motion: reduce) {
  /* video is not autoplayed by script; poster stays. Nothing to animate. */
}`,

  aiRules: `# 电影视频首屏设计系统

你是一位专精于电影感视频首屏（Cinematic Video Hero）界面的前端开发专家。生成的所有代码都必须严格遵守以下规范。

## 风格身份
- **名称**：Cinematic Video Hero（电影视频首屏）
- **本质**：开场是一部预告片；短循环视频注入时间感，但出于性能考虑必须由海报帧率先出场
- **气质**：电影感、沉浸氛围、高端、预告片质感
- **灵感来源**：电影公司官网首屏、产品发布预告片、流媒体平台的 hero 视频

---

## 绝对禁止

| 模式 | 原因 |
|---------|--------|
| 视频作为 LCP 依赖 / 不设 poster | 首屏白屏，LCP 爆炸 |
| preload="auto" 或自动加载大体积视频 | 流量与性能双重灾难 |
| 把关键信息放进视频里 | 视频可能不播放，或被降级 |
| 有声自动播放 | 浏览器会拦截，且打扰用户 |
| 文字直接压在视频上不加遮罩 | 不可读，对比度不达标 |
| 快速 / 跳变运动，或不无缝的循环 | 破坏电影感 |
| 忽略 prefers-reduced-motion 或移动端降级 | 无障碍与流量双双失守 |

## 必须遵守

### 海报优先（poster = LCP）
视频必须携带 poster 属性，指向一张小而清晰的 AVIF/WebP 首帧图。poster 瞬间绘制、作为 LCP；视频只是渐进增强。设置显式 aspect-ratio（如 h-screen 或 aspect-video）防止 CLS。

### 视频加载与播放
- 属性：muted loop playsInline preload="none" + poster
- 只在进入视口时播放（IntersectionObserver），绝不在页面加载时就 load：
\`\`\`js
const io = new IntersectionObserver(([e]) => {
  if (e.isIntersecting) { v.load(); v.play().catch(() => {}); io.disconnect(); }
}, { threshold: 0.25 });
io.observe(v);
\`\`\`
- 双格式 source：\`<source src="x.webm" type="video/webm"><source src="x.mp4" type="video/mp4">\`

### 可读性遮罩
文字压在视频上之前，先铺一层渐变暗罩，保证 4.5:1：
\`linear-gradient(to top, rgba(5,6,10,0.78), rgba(5,6,10,0.2) 45%, rgba(5,6,10,0.45))\`

### 暗场电影调色
- 近黑底 #05060A / 抬升面 #141821 / 纸白文字 #F3EFE8
- 画面上的文字：text-white + white/80 + white/60
- 唯一暖金 #E4C063：主 CTA、章节 kicker、高亮；钢蓝 #9AA6B8 作次要色
- 可选：cv-letterbox 上下黑边，营造宽银幕画框

### 降级方案（关键）
- prefers-reduced-motion：不自动播放，显示静态 poster，提供播放按钮让用户自主开启
- Save-Data（navigator.connection.saveData）：完全不加载视频，只显示 poster
- 移动端可只显示 poster（省流量、省电）

### 无障碍
- 纯装饰性视频设 aria-hidden="true"；有信息内容的视频配 <track kind="captions">
- 提供暂停/播放入口；绝不剥夺用户的控制权

## 自检清单

- [ ] 视频是否有 poster，且 poster 就是瞬间绘制的 LCP？
- [ ] 是否 preload="none" + 只在进入视口时播放（IntersectionObserver）？
- [ ] 是否 muted loop playsInline，无声无缝短循环？
- [ ] 视频上的文字是否坐在遮罩上、对比度达标？
- [ ] 关键信息是否都在文字层，而不是视频里？
- [ ] 是否具备 prefers-reduced-motion / Save-Data 降级方案？
- [ ] 是否暗场调色 + 唯一暖金强调色 + 已防 CLS？`,

  aiRulesEn: `# Cinematic Video Hero Design System

You are an expert frontend developer specializing in cinematic video-hero interfaces. Generate all code strictly following these specifications.

## Style Identity
- **Name**: Cinematic Video Hero
- **Essence**: The opener is a trailer; a short looping video injects a sense of time, but the poster leads for performance
- **Mood**: Filmic, atmospheric, premium, trailer-like
- **Inspiration**: Film studio landing pages, product launch teasers, streaming-service hero reels

---

## Forbidden

| Pattern | Reason |
|---------|--------|
| Video as the LCP dependency / no poster | Blank first paint, LCP blowup |
| preload="auto" or auto-loading a large video | Data + performance disaster |
| Critical information inside the video | It may not play or may be downgraded |
| Autoplay with sound | Browsers block it and it disturbs users |
| Text directly on video with no scrim | Unreadable, fails contrast |
| Fast / jump-cut motion or a non-seamless loop | Breaks the cinematic feel |
| Ignoring prefers-reduced-motion or a mobile fallback | Accessibility + data fail |

## Required

### Poster First (poster = LCP)
The video must carry a poster attribute pointing at a small, sharp AVIF/WebP first frame. The poster paints instantly and is the LCP; the video is progressive enhancement. Set an explicit aspect-ratio (e.g. h-screen or aspect-video) to prevent CLS.

### Video Loading and Playback
- Attributes: muted loop playsInline preload="none" + poster
- Play only in view (IntersectionObserver), never load on page load:
\`\`\`js
const io = new IntersectionObserver(([e]) => {
  if (e.isIntersecting) { v.load(); v.play().catch(() => {}); io.disconnect(); }
}, { threshold: 0.25 });
io.observe(v);
\`\`\`
- Dual source: \`<source src="x.webm" type="video/webm"><source src="x.mp4" type="video/mp4">\`

### Readability Scrim
Before text over video, lay a gradient darkening for 4.5:1:
\`linear-gradient(to top, rgba(5,6,10,0.78), rgba(5,6,10,0.2) 45%, rgba(5,6,10,0.45))\`

### Dark Cinematic Grade
- Near-black base #05060A / raised surface #141821 / paper text #F3EFE8
- Text on footage: text-white + white/80 + white/60
- One warm gold #E4C063: primary CTA, chapter kickers, highlights; steel #9AA6B8 for secondary
- Optional: cv-letterbox top/bottom black bars for a widescreen frame

### Fallbacks (critical)
- prefers-reduced-motion: do not autoplay, show the poster still, offer a play button for opt-in
- Save-Data (navigator.connection.saveData): skip the video entirely, show poster only
- Mobile may show poster only (saves data + battery)

### Accessibility
- Decorative video aria-hidden="true"; informational video gets <track kind="captions">
- Provide a pause/play affordance; never strip user control

## Self-Verification Checklist

- [ ] Video has a poster and the poster is the LCP, instant
- [ ] preload="none" + play only in view (IntersectionObserver)
- [ ] muted loop playsInline, a silent seamless short loop
- [ ] Text over video sits on a scrim and passes contrast
- [ ] Critical information is in the text layer, not the video
- [ ] prefers-reduced-motion / Save-Data fallbacks present
- [ ] Dark grade + single warm-gold accent + CLS prevented`,

  examplePrompts: [
    {
      title: "电影工作室首屏",
      titleEn: "Film Studio Hero",
      description: "视频背景开场的工作室落地页",
      descriptionEn: "A studio landing page with a video-hero opener",
      prompt: `Create a cinematic video-hero studio landing page with:
1. Full-screen hero: a <video muted loop playsInline preload="none"> with a poster AVIF as the LCP; load()/play() only when in view via IntersectionObserver
2. webm + mp4 dual sources; a gradient readability scrim so the headline stays legible over the footage
3. Near-black #05060A grade, one warm-gold #E4C063 accent for the kicker and primary CTA
4. Optional letterbox bars for a widescreen frame; slow, seamless loop feel
5. A scene gallery of poster-backed aspect-video cards with scrim captions
6. prefers-reduced-motion: no autoplay, show the poster still with a play button; Save-Data: skip video
7. Frosted secondary buttons and inputs that stay legible over the video; critical info only in the text layer`,
      promptEn: `Create a cinematic video-hero studio landing page with:
1. Full-screen hero: a <video muted loop playsInline preload="none"> with a poster AVIF as the LCP; load()/play() only when in view via IntersectionObserver
2. webm + mp4 dual sources; a gradient readability scrim so the headline stays legible over the footage
3. Near-black #05060A grade, one warm-gold #E4C063 accent for the kicker and primary CTA
4. Optional letterbox bars for a widescreen frame; slow, seamless loop feel
5. A scene gallery of poster-backed aspect-video cards with scrim captions
6. prefers-reduced-motion: no autoplay, show the poster still with a play button; Save-Data: skip video
7. Frosted secondary buttons and inputs that stay legible over the video; critical info only in the text layer`,
    },
    {
      title: "产品发布预告首屏",
      titleEn: "Product Launch Teaser",
      description: "视频预告式的产品发布首屏",
      descriptionEn: "A product launch hero framed like a teaser",
      prompt: `Create a cinematic product launch teaser hero with:
1. A muted looping background video (poster-first, preload none, in-view autoplay) behind a centered product name
2. Poster AVIF as LCP; explicit h-screen to avoid CLS; webm + mp4 sources
3. Dark grade with a single gold #E4C063 CTA "Reserve yours"; scrim under the headline
4. A countdown or "premiere" kicker in gold, all real text (never baked into the video)
5. Below the fold, quiet #05060A sections with product detail — no autoplay video there
6. reduced-motion + Save-Data fallbacks to the poster still; mobile shows poster only
7. A visible mute/pause control; decorative video aria-hidden`,
      promptEn: `Create a cinematic product launch teaser hero with:
1. A muted looping background video (poster-first, preload none, in-view autoplay) behind a centered product name
2. Poster AVIF as LCP; explicit h-screen to avoid CLS; webm + mp4 sources
3. Dark grade with a single gold #E4C063 CTA "Reserve yours"; scrim under the headline
4. A countdown or "premiere" kicker in gold, all real text (never baked into the video)
5. Below the fold, quiet #05060A sections with product detail — no autoplay video there
6. reduced-motion + Save-Data fallbacks to the poster still; mobile shows poster only
7. A visible mute/pause control; decorative video aria-hidden`,
    },
  ],

  variants: [
    {
      id: "cinematic-video-hero-noir",
      name: "电影首屏·黑白",
      nameEn: "Cinematic Noir",
      description: "Monochrome grade: grayscale footage with a single cold-white accent for a film-noir teaser",
      colors: {
        primary: "#050506",
        secondary: "#ECECEC",
        accent: ["#D8DCE2", "#141416", "#7E828A"],
      },
    },
    {
      id: "cinematic-video-hero-warm",
      name: "电影首屏·暖阳",
      nameEn: "Cinematic Golden Hour",
      description: "Warm sunset grade: amber-drenched footage with a deep ember accent for lifestyle teasers",
      colors: {
        primary: "#0B0705",
        secondary: "#F5ECDD",
        accent: ["#F0A24B", "#241811", "#C98A5E"],
      },
    },
  ],
};
