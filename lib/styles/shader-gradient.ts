import type { DesignStyle } from "./types";

export const shaderGradient: DesignStyle = {
  slug: "shader-gradient",
  name: "着色器渐变",
  nameEn: "Shader Gradient",
  description:
    "以实时 WebGL 片元着色器驱动的流动网格渐变作背景的高端 SaaS 美学。近黑画布上一层缓慢呼吸的虹彩渐变场，冻毛玻璃内容面板悬浮其上，干净现代无衬线配一支明亮强调色——Stripe / Linear / Vercel 首屏的活体渐变。",
  descriptionEn:
    "A premium SaaS aesthetic built on a real-time WebGL fragment-shader mesh gradient. A slowly breathing iridescent field flows across a near-black canvas while frosted-glass panels float above it, paired with a clean modern sans and a single bright accent - the living-gradient look of Stripe, Linear, and Vercel heroes.",
  cover: "/styles/shader-gradient.svg",
  styleType: "visual",
  tags: [],
  category: "modern",
  colors: {
    primary: "#08090D",
    secondary: "#EDEEF2",
    accent: ["#7C5CFF", "#22D3EE", "#F472B6"],
  },
  keywords: [
    "shader",
    "webgl",
    "gradient",
    "mesh gradient",
    "fragment shader",
    "living background",
    "iridescent",
    "着色器",
    "渐变",
    "流体渐变",
    "网格渐变",
    "首屏背景",
    "高端 SaaS",
  ],
  keywordsEn: [
    "shader gradient",
    "webgl gradient",
    "mesh gradient",
    "animated gradient background",
    "fragment shader hero",
    "living gradient",
    "iridescent background",
    "fluid gradient",
    "saas landing page",
    "stripe gradient",
    "linear gradient hero",
    "glassmorphism panels",
  ],

  philosophy: `着色器渐变的信条：背景不是一张图，而是一段永不重复的光。真正的实时着色器让首屏"活"了起来——渐变缓慢流动、色彩彼此渗透，像一块会呼吸的极光。这种活体感是高端 SaaS 的信号：它在说"我们连背景都亲手写了 shader"，而不是随手贴了一张导出的渐变 PNG。

核心理念：
- 活体背景 = 高端信号：真正跑在 GPU 上的 fragment shader，噪声驱动的流动场，没有两帧完全相同。廉价感来自静态渐变或 CSS 关键帧假动画；高级感来自真 shader 的连续演化
- 克制是纪律：只有画布在动，DOM 绝不乱飞。所有 UI 动效只碰 transform / opacity，把 GPU 预算留给着色器。一个页面一块活体渐变就够了，不要满屏 canvas
- 近黑 + 虹彩：深近黑底 #08090D 让虹彩渐变（violet #7C5CFF / cyan #22D3EE / magenta #F472B6）发光。色相互相渗透而非硬切，靠 fbm 噪声域扭曲（domain warp）产生有机流动
- 冻毛玻璃承载内容：内容坐在 backdrop-blur 的玻璃面板上，1px white/10 描边，配暗色 scrim 保证文字对渐变场 4.5:1 对比。渐变是氛围，文字必须永远清晰
- 一支强调色：violet #7C5CFF 作唯一 UI 强调（主 CTA、焦点环、链接），其余交给玻璃与近黑。多个抢眼色会毁掉高级感

设计原则：
- 性能红线：devicePixelRatio 上限 2；IntersectionObserver 离屏即暂停 rAF、进屏恢复；单一全屏 quad + 一次编译的着色器，别每帧重建
- 降级链：prefers-reduced-motion 只渲染一帧静态画面（不起循环）；WebGL 不可用回退到视觉近似的 CSS 静态渐变；移动端可降采样或直接静帧
- 无障碍与 CLS：canvas 纯装饰 aria-hidden；显式尺寸 / 固定容器高度防 CLS；内容层永远独立于 canvas，canvas 挂了页面照常可读`,

  philosophyEn: `The shader-gradient creed: the background is not an image, it is light that never repeats. A genuine real-time shader brings the hero to life - the gradient flows slowly, colors bleed into one another, like a breathing aurora. That living quality is a premium-SaaS signal: it says "we wrote a shader even for the background", not "we pasted an exported gradient PNG".

Core principles:
- Living background = premium signal: a real fragment shader running on the GPU, a noise-driven flowing field where no two frames are identical. Cheapness comes from a static gradient or a fake CSS keyframe animation; class comes from the continuous evolution of a true shader
- Restraint is discipline: only the canvas moves, the DOM never flies around. Every UI animation touches transform / opacity only, leaving the GPU budget for the shader. One living gradient per page is enough - do not fill the screen with canvases
- Near-black plus iridescence: a deep near-black base #08090D lets the iridescent gradient (violet #7C5CFF / cyan #22D3EE / magenta #F472B6) glow. Hues bleed rather than hard-cut, using fbm domain warping to produce organic flow
- Frosted glass carries content: content sits on backdrop-blur glass panels with a 1px white/10 border and a dark scrim to hold text at 4.5:1 over the gradient field. The gradient is atmosphere; text must always stay crisp
- One accent color: violet #7C5CFF is the single UI accent (primary CTA, focus ring, links); everything else is glass and near-black. Multiple loud colors destroy the premium feel

Design principles:
- Performance line: cap devicePixelRatio at 2; pause the rAF loop when offscreen via IntersectionObserver and resume in view; a single full-screen quad with a shader compiled once, never rebuilt per frame
- Fallback chain: prefers-reduced-motion renders exactly one static frame (no loop); when WebGL is unavailable, fall back to a visually similar static CSS gradient; mobile may downsample or show a still
- Accessibility and CLS: decorative canvas gets aria-hidden; explicit size / fixed container height prevents CLS; the content layer is always independent of the canvas, so the page stays readable if the canvas fails`,

  doList: [
    "用真实 WebGL fragment shader 驱动流动渐变：全屏 quad + time / resolution uniform + fbm 噪声域扭曲",
    "devicePixelRatio 上限 2，监听 resize 重设 canvas 与 viewport",
    "IntersectionObserver 离屏暂停 requestAnimationFrame、进屏恢复，省电省 GPU",
    "prefers-reduced-motion 只渲染单帧静态画面，绝不起动画循环",
    "WebGL 不可用时回退到视觉近似的 CSS 静态渐变背景",
    "内容坐在 backdrop-blur 冻毛玻璃面板上，1px white/10 描边 + 暗 scrim 保证 4.5:1",
    "近黑 #08090D 底 + 虹彩渐变，只用一支 violet #7C5CFF 作 UI 强调",
    "所有 DOM 动效只碰 transform / opacity，把动画预算留给着色器",
    "canvas 纯装饰 aria-hidden，显式尺寸防 CLS，内容层独立于 canvas",
  ],

  doListEn: [
    "Drive the flowing gradient with a real WebGL fragment shader: full-screen quad + time / resolution uniforms + fbm domain warp",
    "Cap devicePixelRatio at 2 and re-size the canvas and viewport on resize",
    "Pause requestAnimationFrame offscreen and resume in view via IntersectionObserver to save power and GPU",
    "Under prefers-reduced-motion render exactly one static frame, never start the animation loop",
    "When WebGL is unavailable, fall back to a visually similar static CSS gradient background",
    "Sit content on backdrop-blur frosted-glass panels with a 1px white/10 border and a dark scrim for 4.5:1",
    "Near-black #08090D base with an iridescent gradient, using only a single violet #7C5CFF UI accent",
    "Restrict every DOM animation to transform / opacity, leaving the animation budget for the shader",
    "Give the decorative canvas aria-hidden, set explicit size to prevent CLS, keep the content layer independent of the canvas",
  ],

  dontList: [
    "禁止用静态渐变 PNG 或 CSS 关键帧假动画冒充实时着色器（廉价感的根源）",
    "禁止不设 devicePixelRatio 上限（视网膜屏上像素爆炸、掉帧）",
    "禁止离屏还在跑 rAF 循环（白白烧电烧 GPU）",
    "禁止忽略 prefers-reduced-motion 或省略 WebGL 不可用回退",
    "禁止文字直接压渐变场不加玻璃面板 / scrim（对比不达标）",
    "禁止满屏多块 canvas 或多支抢眼强调色（毁掉高级克制感）",
    "禁止让 DOM 元素做位移 / 阴影动画抢着色器的 GPU 预算",
  ],

  dontListEn: [
    "Never fake a real-time shader with a static gradient PNG or a CSS keyframe animation (the root of cheapness)",
    "Never skip a devicePixelRatio cap (pixel blowup and dropped frames on retina)",
    "Never keep the rAF loop running while offscreen (burns power and GPU for nothing)",
    "Never ignore prefers-reduced-motion or omit the WebGL-unavailable fallback",
    "Never place text directly on the gradient field with no glass panel / scrim (fails contrast)",
    "Never fill the screen with multiple canvases or multiple loud accents (kills the premium restraint)",
    "Never animate DOM element position / shadow and steal the shader's GPU budget",
  ],

  components: {
    button: {
      name: "Button",
      description: "Violet accent CTA and a frosted-glass secondary",
      code: `<button className="inline-flex items-center gap-2
  px-6 py-3 rounded-xl
  bg-[#7C5CFF] text-white font-medium
  shadow-[0_8px_30px_rgba(124,92,255,0.35)]
  hover:bg-[#8f72ff] active:scale-[0.98]
  transition-all duration-300
">
  Start building
</button>

<button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
  bg-white/8 backdrop-blur-xl border border-white/12 text-white
  hover:bg-white/12 transition-all duration-300">
  View docs
</button>`,
    },
    card: {
      name: "Card",
      description: "Frosted-glass panel floating over the shader field",
      code: `<div className="relative rounded-2xl p-6
  bg-white/[0.06] backdrop-blur-2xl
  border border-white/10
  shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
  <div className="w-9 h-9 rounded-lg bg-[#7C5CFF]/20 border border-[#7C5CFF]/30 mb-4" />
  <h3 className="text-white text-lg font-semibold mb-2">Realtime by default</h3>
  <p className="text-white/60 text-sm leading-relaxed">
    Every frame is computed on the GPU. Nothing is baked.
  </p>
</div>`,
    },
    input: {
      name: "Input",
      description: "Frosted field legible over the gradient",
      code: `<input type="email" placeholder="you@company.com"
  className="w-full px-4 py-3 rounded-xl
    bg-white/[0.06] backdrop-blur-xl border border-white/12
    text-white placeholder-white/40
    focus:outline-none focus:border-[#7C5CFF]/70 focus:bg-white/[0.09]
    focus:ring-2 focus:ring-[#7C5CFF]/25
    transition-all duration-300" />`,
    },
    nav: {
      name: "Navigation",
      description: "Frosted floating nav over the living gradient",
      code: `<nav className="fixed top-0 inset-x-0 z-50">
  <div className="max-w-6xl mx-auto mt-4 px-5 h-14 flex items-center justify-between
    rounded-2xl bg-white/[0.05] backdrop-blur-2xl border border-white/10">
    <span className="text-white font-semibold tracking-tight">Prism</span>
    <div className="flex items-center gap-6 text-sm text-white/70">
      <a href="#features" className="hover:text-white transition-colors">Features</a>
      <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero",
      description: "WebGL shader canvas behind glass content, with reduced-motion and no-WebGL fallbacks",
      code: `function ShaderHero() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return; // CSS gradient fallback stays visible under the canvas
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // ... compile the fragment shader below, then either render one frame
    //     (reduce) or drive a rAF loop paused by an IntersectionObserver.
  }, []);
  return (
    <section className="relative h-screen overflow-hidden bg-[#08090D]">
      <div className="absolute inset-0" style={{ background:
        "radial-gradient(60% 60% at 30% 30%, #7C5CFF33, transparent), radial-gradient(50% 50% at 75% 60%, #22D3EE22, transparent)" }} />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 h-full flex items-center max-w-6xl mx-auto px-6">
        <div className="rounded-2xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 p-10 max-w-2xl">
          <h1 className="text-white text-5xl md:text-7xl font-semibold tracking-tight">Ship the living web</h1>
        </div>
      </div>
    </section>
  );
}`,
    },
    footer: {
      name: "Footer",
      description: "Quiet near-black footer below the shader hero",
      code: `<footer className="bg-[#08090D] border-t border-white/8 py-14">
  <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
    <span className="text-white/50 text-sm">Prism - the living gradient.</span>
    <a href="#top" className="text-white/50 hover:text-white text-sm transition-colors">Back to top</a>
  </div>
</footer>`,
    },
  },

  globalCss: `/* Shader Gradient Global Styles */

:root {
  --sg-base: #08090D;
  --sg-surface: #12131A;
  --sg-paper: #EDEEF2;
  --sg-violet: #7C5CFF;
  --sg-cyan: #22D3EE;
  --sg-magenta: #F472B6;
}

/* Full-bleed shader canvas base */
.sg-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

/* CSS static-gradient fallback (WebGL unavailable / under the canvas) */
.sg-fallback {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(60% 60% at 28% 32%, rgba(124, 92, 255, 0.35), transparent 70%),
    radial-gradient(55% 55% at 74% 58%, rgba(34, 211, 238, 0.22), transparent 70%),
    radial-gradient(50% 60% at 55% 85%, rgba(244, 114, 182, 0.20), transparent 70%),
    #08090D;
}

/* Frosted-glass panel */
.sg-glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 1rem;
}

/* Readability scrim under text over the gradient */
.sg-scrim {
  background: linear-gradient(to top, rgba(8, 9, 13, 0.7), rgba(8, 9, 13, 0.1) 55%, rgba(8, 9, 13, 0.35));
}

@media (prefers-reduced-motion: reduce) {
  /* the shader loop is not started by script; a single static frame stays */
  .sg-canvas { animation: none; }
}`,

  aiRules: `# 着色器渐变设计系统

你是一位专精于实时着色器渐变（Shader Gradient）界面的前端开发专家。生成的所有代码都必须严格遵守以下规范。

## 风格身份
- **名称**：Shader Gradient（着色器渐变）
- **本质**：背景不是一张图，而是一段永不重复的光——真正的实时 WebGL fragment shader 让首屏"活"了起来
- **气质**：高端、现代、沉静、高工艺感的 SaaS
- **灵感来源**：Stripe / Linear / Vercel 的首屏背景，GPU 网格渐变

---

## 绝对禁止

| 模式 | 原因 |
|---------|--------|
| 用静态渐变 PNG 或 CSS 关键帧假动画冒充实时着色器 | 廉价感的根源 |
| 不设 devicePixelRatio 上限 | 视网膜屏上像素爆炸、掉帧 |
| 离屏时仍在跑 rAF 循环 | 白白烧电、烧 GPU |
| 忽略 prefers-reduced-motion，或省略 WebGL 不可用回退 | 无障碍与健壮性双双失守 |
| 文字直接压在渐变场上、不加玻璃面板 / scrim | 对比度不达标 |
| 满屏多块 canvas 或多支抢眼强调色 | 毁掉高端的克制感 |
| 对 DOM 元素做位移 / 阴影动画 | 抢走着色器的 GPU 预算 |

## 必须遵守

### 真实 WebGL 着色器（核心技法）
一个全屏 quad，配一个只编译一次的 fragment shader，构成一片由 noise 驱动的流动场。可直接复用下面的骨架：

顶点着色器（全屏 quad，直接透传坐标）：
\`\`\`glsl
attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }
\`\`\`

片元着色器（fbm 域扭曲渐变，uniform 为 u_res / u_time / u_speed / u_blend / u_grain）：
\`\`\`glsl
precision highp float;
uniform vec2 u_res; uniform float u_time, u_speed, u_blend, u_grain;
vec2 hash2(vec2 p){ p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))); return fract(sin(p)*43758.5453)*2.0-1.0; }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);
  return mix(mix(dot(hash2(i),f),dot(hash2(i+vec2(1,0)),f-vec2(1,0)),u.x),
             mix(dot(hash2(i+vec2(0,1)),f-vec2(0,1)),dot(hash2(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y); }
float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }
void main(){
  vec2 uv=gl_FragCoord.xy/u_res.xy; vec2 q=uv; q.x*=u_res.x/u_res.y;
  float t=u_time*0.05*u_speed;
  float f1=fbm(q*1.5+vec2(t,-t*0.5));
  float f2=fbm(q*2.0+vec2(f1*u_blend-t*0.3,f1+t*0.2));
  float f=fbm(q*1.2+f2*(0.6+u_blend));
  vec3 base=vec3(0.031,0.035,0.051), violet=vec3(0.486,0.361,1.0), cyan=vec3(0.133,0.827,0.933), magenta=vec3(0.956,0.447,0.714);
  vec3 col=base;
  col=mix(col,violet,smoothstep(0.15,0.75,f+0.35));
  col=mix(col,cyan,smoothstep(0.3,0.9,f2*0.5+0.5)*0.6);
  col=mix(col,magenta,smoothstep(0.4,1.0,f1*0.5+0.5)*0.45);
  float vig=smoothstep(1.2,0.2,length(uv-0.5)); col*=0.55+0.6*vig;
  col+=(fract(sin(dot(uv+t,vec2(12.9898,78.233)))*43758.5453)-0.5)*u_grain*0.12;
  gl_FragColor=vec4(col,1.0);
}
\`\`\`

### 渲染循环与性能
- const dpr = Math.min(window.devicePixelRatio || 1, 2)
- resize 时：canvas.width = clientWidth * dpr；gl.viewport(0, 0, w, h)；更新 u_res
- IntersectionObserver：离屏时 cancelAnimationFrame，进屏时重新启动
- 着色器只编译一次；每帧只更新 uniform（u_time = performance.now() / 1000）

### 降级链（关键）
- prefers-reduced-motion：只绘制恰好一帧（t 固定），不调用 requestAnimationFrame
- gl 为 null（WebGL 不可用）：保留 canvas 下方的 .sg-fallback CSS 静态渐变，直接 return
- 移动端可降采样（dpr = 1）或直接显示静帧

### 视觉与内容层
- 近黑 #08090D 底；虹彩 violet #7C5CFF / cyan #22D3EE / magenta #F472B6
- 内容坐在 .sg-glass 冻毛玻璃面板上：bg-white/[0.05] + backdrop-blur-2xl + border-white/10
- 文字压在渐变上要有 scrim 或玻璃衬底，保证 4.5:1
- 唯一的 UI 强调色 violet #7C5CFF：主 CTA、焦点环 focus:ring-[#7C5CFF]/25、链接
- 所有 DOM 动效只碰 transform / opacity

### 无障碍与 CLS
- canvas 设 aria-hidden="true"；显式容器高度（如 h-screen）防止 CLS
- 内容层独立于 canvas；即便 canvas 失效，页面依旧可读

## 自检清单

- [ ] 是否是真实的 WebGL fragment shader（全屏 quad + fbm 流动），而非假动画？
- [ ] dpr 是否封顶 2，处理了 resize，并用 IntersectionObserver 做了离屏暂停？
- [ ] prefers-reduced-motion 下是否只渲染单帧，且有 WebGL 不可用的 CSS 回退？
- [ ] 文字是否坐在玻璃面板 / scrim 上、对比度达标？
- [ ] 是否近黑底 + 唯一 violet 强调色 + DOM 只动 transform/opacity？
- [ ] canvas 是否 aria-hidden 且已防 CLS？`,

  aiRulesEn: `# Shader Gradient Design System

You are an expert frontend developer specializing in real-time shader-gradient interfaces. Generate all code strictly following these specifications.

## Style Identity
- **Name**: Shader Gradient
- **Essence**: The background is not an image, it is light that never repeats - a real WebGL fragment shader that makes the hero feel alive
- **Mood**: Premium, modern, calm, high-craft SaaS
- **Inspiration**: Stripe / Linear / Vercel hero backgrounds, GPU mesh gradients

---

## Forbidden

| Pattern | Reason |
|---------|--------|
| Static gradient PNG or CSS keyframe faking a real-time shader | The root of cheapness |
| No devicePixelRatio cap | Pixel blowup and dropped frames on retina |
| rAF loop running while offscreen | Burns power and GPU for nothing |
| Ignoring prefers-reduced-motion / omitting a no-WebGL fallback | Accessibility + robustness fail |
| Text directly on the gradient with no glass panel / scrim | Fails contrast |
| Multiple canvases or multiple loud accents | Kills premium restraint |
| Animating DOM position / shadow | Steals the shader's GPU budget |

## Required

### Real WebGL shader (the core technique)
A single full-screen quad plus a fragment shader compiled once, a noise-driven flowing field. Reuse this skeleton directly:

Vertex shader (full-screen quad, passthrough):
\`\`\`glsl
attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }
\`\`\`

Fragment shader (fbm domain-warp gradient, uniforms u_res / u_time / u_speed / u_blend / u_grain):
\`\`\`glsl
precision highp float;
uniform vec2 u_res; uniform float u_time, u_speed, u_blend, u_grain;
vec2 hash2(vec2 p){ p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))); return fract(sin(p)*43758.5453)*2.0-1.0; }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);
  return mix(mix(dot(hash2(i),f),dot(hash2(i+vec2(1,0)),f-vec2(1,0)),u.x),
             mix(dot(hash2(i+vec2(0,1)),f-vec2(0,1)),dot(hash2(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y); }
float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }
void main(){
  vec2 uv=gl_FragCoord.xy/u_res.xy; vec2 q=uv; q.x*=u_res.x/u_res.y;
  float t=u_time*0.05*u_speed;
  float f1=fbm(q*1.5+vec2(t,-t*0.5));
  float f2=fbm(q*2.0+vec2(f1*u_blend-t*0.3,f1+t*0.2));
  float f=fbm(q*1.2+f2*(0.6+u_blend));
  vec3 base=vec3(0.031,0.035,0.051), violet=vec3(0.486,0.361,1.0), cyan=vec3(0.133,0.827,0.933), magenta=vec3(0.956,0.447,0.714);
  vec3 col=base;
  col=mix(col,violet,smoothstep(0.15,0.75,f+0.35));
  col=mix(col,cyan,smoothstep(0.3,0.9,f2*0.5+0.5)*0.6);
  col=mix(col,magenta,smoothstep(0.4,1.0,f1*0.5+0.5)*0.45);
  float vig=smoothstep(1.2,0.2,length(uv-0.5)); col*=0.55+0.6*vig;
  col+=(fract(sin(dot(uv+t,vec2(12.9898,78.233)))*43758.5453)-0.5)*u_grain*0.12;
  gl_FragColor=vec4(col,1.0);
}
\`\`\`

### Render loop and performance
- const dpr = Math.min(window.devicePixelRatio || 1, 2)
- resize: canvas.width = clientWidth * dpr; gl.viewport(0, 0, w, h); update u_res
- IntersectionObserver: cancelAnimationFrame when offscreen, restart in view
- Compile the shader once; per frame only update uniforms (u_time = performance.now() / 1000)

### Fallback chain (critical)
- prefers-reduced-motion: draw exactly one frame (fixed t), do not requestAnimationFrame
- gl is null (WebGL unavailable): keep the .sg-fallback CSS static gradient under the canvas and return
- Mobile may downsample (dpr = 1) or show a still

### Visuals and content layer
- Near-black #08090D base; iridescent violet #7C5CFF / cyan #22D3EE / magenta #F472B6
- Content sits on .sg-glass frosted panels: bg-white/[0.05] + backdrop-blur-2xl + border-white/10
- Text over the gradient gets a scrim or glass backing for 4.5:1
- One UI accent, violet #7C5CFF: primary CTA, focus ring focus:ring-[#7C5CFF]/25, links
- Every DOM animation touches transform / opacity only

### Accessibility and CLS
- canvas aria-hidden="true"; explicit container height (h-screen etc.) to prevent CLS
- The content layer is independent of the canvas; the page stays readable if the canvas fails

## Self-Verification Checklist

- [ ] A real WebGL fragment shader (full-screen quad + fbm flow), not a fake animation
- [ ] dpr capped at 2 + resize handling + IntersectionObserver pause offscreen
- [ ] prefers-reduced-motion single frame + no-WebGL CSS fallback
- [ ] Text sits on glass panels / scrim and passes contrast
- [ ] Near-black base + single violet accent + DOM animates only transform/opacity
- [ ] canvas aria-hidden + CLS prevented`,

  examplePrompts: [
    {
      title: "SaaS 首屏落地页",
      titleEn: "SaaS Hero Landing Page",
      description: "着色器渐变背景的高端 SaaS 首屏",
      descriptionEn: "A premium SaaS hero on a shader-gradient background",
      prompt: `Create a premium SaaS landing hero with a real WebGL shader-gradient background:
1. A full-screen <canvas> WebGL fragment shader: a single quad, fbm domain-warped flowing field, uniforms u_res / u_time; near-black #08090D base with iridescent violet #7C5CFF, cyan #22D3EE and magenta #F472B6
2. Cap devicePixelRatio at 2, handle resize, and pause the rAF loop offscreen with an IntersectionObserver
3. prefers-reduced-motion renders one static frame; if WebGL is unavailable, fall back to a visually similar CSS radial-gradient background
4. Frosted-glass content panel (bg-white/[0.05], backdrop-blur-2xl, 1px white/10 border) holding the headline, subtext, and a single violet CTA plus a frosted secondary button
5. A frosted floating nav and a feature row of glass cards below the fold on quiet near-black sections
6. Only the canvas animates; all DOM motion is transform / opacity only; canvas aria-hidden and explicit heights to avoid CLS`,
      promptEn: `Create a premium SaaS landing hero with a real WebGL shader-gradient background:
1. A full-screen <canvas> WebGL fragment shader: a single quad, fbm domain-warped flowing field, uniforms u_res / u_time; near-black #08090D base with iridescent violet #7C5CFF, cyan #22D3EE and magenta #F472B6
2. Cap devicePixelRatio at 2, handle resize, and pause the rAF loop offscreen with an IntersectionObserver
3. prefers-reduced-motion renders one static frame; if WebGL is unavailable, fall back to a visually similar CSS radial-gradient background
4. Frosted-glass content panel (bg-white/[0.05], backdrop-blur-2xl, 1px white/10 border) holding the headline, subtext, and a single violet CTA plus a frosted secondary button
5. A frosted floating nav and a feature row of glass cards below the fold on quiet near-black sections
6. Only the canvas animates; all DOM motion is transform / opacity only; canvas aria-hidden and explicit heights to avoid CLS`,
    },
    {
      title: "开发者产品首屏 + 着色器实验台",
      titleEn: "Developer Product Hero with Shader Lab",
      description: "带可调 uniform 滑块的着色器渐变首屏",
      descriptionEn: "A shader-gradient hero with sliders wired to shader uniforms",
      prompt: `Create a developer-product hero on a living shader gradient, plus an interactive shader lab:
1. WebGL fragment-shader background (fbm flowing field, near-black #08090D + violet/cyan/magenta), dpr capped at 2, IntersectionObserver pause, reduced-motion single frame, CSS-gradient fallback when WebGL is missing
2. Glass hero panel with a monospace kicker, a bold sans headline, and one violet #7C5CFF CTA
3. A "shader lab" card with three sliders - speed, color blend, grain - each wired via useState/refs to the u_speed / u_blend / u_grain uniforms so the gradient responds live
4. A frosted stat strip and a pricing row of glass cards on near-black sections below
5. One accent only; DOM animation limited to transform / opacity; canvas aria-hidden with explicit sizes to prevent CLS`,
      promptEn: `Create a developer-product hero on a living shader gradient, plus an interactive shader lab:
1. WebGL fragment-shader background (fbm flowing field, near-black #08090D + violet/cyan/magenta), dpr capped at 2, IntersectionObserver pause, reduced-motion single frame, CSS-gradient fallback when WebGL is missing
2. Glass hero panel with a monospace kicker, a bold sans headline, and one violet #7C5CFF CTA
3. A "shader lab" card with three sliders - speed, color blend, grain - each wired via useState/refs to the u_speed / u_blend / u_grain uniforms so the gradient responds live
4. A frosted stat strip and a pricing row of glass cards on near-black sections below
5. One accent only; DOM animation limited to transform / opacity; canvas aria-hidden with explicit sizes to prevent CLS`,
    },
  ],

  variants: [
    {
      id: "shader-gradient-aurora",
      name: "着色器渐变·极光",
      nameEn: "Shader Aurora",
      description: "Cool aurora grade: emerald and teal flowing over deep navy for a calmer, greener field",
      colors: {
        primary: "#070B10",
        secondary: "#E8F0EE",
        accent: ["#34D399", "#22D3EE", "#818CF8"],
      },
    },
    {
      id: "shader-gradient-ember",
      name: "着色器渐变·余烬",
      nameEn: "Shader Ember",
      description: "Warm ember grade: coral and amber bleeding through a near-black base for a warmer hero",
      colors: {
        primary: "#0C0708",
        secondary: "#F4ECE6",
        accent: ["#FB7185", "#FB923C", "#F472B6"],
      },
    },
  ],
};
