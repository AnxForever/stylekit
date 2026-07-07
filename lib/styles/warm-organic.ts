import type { DesignStyle } from "./types";

export const warmOrganic: DesignStyle = {
  slug: "warm-organic",
  name: "暖感有机风",
  nameEn: "Warm Organic",
  description:
    "温暖的自然主义作品集风格：陶土与黏土色系、天然质感、柔和阴影与有机曲线。为建筑师、室内设计师、产品设计师、陶瓷艺术家与景观设计师而设计。设计本身像手工制作——仿佛印在了纹理纸上。",
  descriptionEn:
    "A warm, naturalist portfolio style for architects, interior designers, product designers, ceramic artists, and landscape architects. Think warm-toned minimalism: terracotta and clay colors, natural textures, soft shadows, organic curves, and a palpable sense of craft. The design itself feels handmade — like it was printed on textured paper.",
  cover: "/styles/warm-organic.svg",
  styleType: "visual",
  tags: ["texture-heavy"],
  category: "minimal",
  colors: {
    primary: "#2D2A24",
    secondary: "#F5F0EB",
    accent: ["#C86A4A", "#7A8B5E", "#D4BFA5", "#E8DED1"],
  },
  keywords: ["有机", "温暖", "自然", "大地色", "陶土", "作品集", "手工", "建筑师", "产品设计", "室内设计"],
  keywordsEn: ["organic", "warm", "natural", "earthy", "terracotta", "portfolio", "handcrafted", "architect", "product design", "interior"],

  philosophy: `暖感有机风是"大地色系的呼吸感"：把陶土、黏土、沙粒与橄榄枝的颜色织进数字界面，让网页像一件手捏的陶器一样温暖而有触感。

核心理念：
- 大地即是色盘：#F5F0EB 的未漂纸色不是空缺，而是黏土的底色；#C86A4A 的陶土色不是装饰，是火烧过的痕迹；#7A8B5E 的橄榄绿不是点缀，是窗外那棵树的颜色
- 有机即真实：曲线不应被强制拉直，边界不应被完美切割。圆角是水流打磨过的鹅卵石，不是气泡——rounded-lg 但不 rounded-2xl，有温度但不刻意
- 质感即内容：软阴影（claymorphism-lite）让卡片像轻压在纸面上，自然的米色分层暗示纸张的叠放与材质的厚度
- 手工感即信任：不打磨到绝对光滑，保留一点"未完成"的呼吸。设计师并不隐藏手迹，就像陶艺家不会磨掉指纹

设计原则：
- 温润的明暗对比：深褐 #2D2A24 与暖白 #F5F0EB 之间不追求极端对比，而是阳光透过亚麻窗帘后的柔和反差
- 圆角克制：只做 rounded-lg，但 corners 的曲率足够让所有锐利边缘消失，像被水冲刷过的卵石
- 阴影带温度：box-shadow 不用冷灰 #000，用暖褐 #2D2A24 半透明，让影子落在大地上而不是水泥上
- 纹理是底色：纯色块保留一点肌理暗示（通过 background pattern 或噪点），不让数字表面过于冰冷
- 绿色代表生长：橄榄绿 #7A8B5E 作为自然隐喻出现在植物插图、生态数据或二级强调中，衬在陶土旁就像一株盆栽立在陶罐边`,

  philosophyEn: `Warm Organic is "the breath of the earth palette": weaving the colors of terracotta, clay, sand, and olive branch into a digital interface until the page feels as warm and tactile as a hand-thrown vessel.

Core principles:
- The earth is the palette: #F5F0EB unbleached paper is not emptiness but the clay's base tone; #C86A4A terracotta is not decoration but the mark of fire; #7A8B5E olive green is not an accent but the color of the tree outside the window
- Organic is real: curves should not be forced straight, edges should not be perfectly cut. Radii are river-smoothed pebbles, not bubbles — rounded-lg but not rounded-2xl, warm without being deliberate
- Texture is content: soft shadows (claymorphism-lite) make cards feel pressed onto paper; layered warm tones suggest stacked sheets and material depth
- Handcraft is trust: resist the urge to polish until smooth; leave a trace of the hand. The designer does not hide their marks, just as a potter does not erase their fingerprints

Design principles:
- Warm contrast: the gap between deep brown #2D2A24 and warm white #F5F0EB does not chase extreme contrast but the soft tension of sunlight through a linen curtain
- Restrained radii: rounded-lg only, but enough curvature to dissolve every sharp edge, like pebbles smoothed by water
- Shadows carry warmth: box-shadows use warm brown #2D2A24 with transparency, not cold gray #000, so shadows fall on earth not concrete
- Texture as ground: flat color blocks retain a hint of grain (via background pattern or noise) so the digital surface is never too cold
- Green is growth: olive #7A8B5E appears as a natural metaphor in botanical illustrations, ecological data, or secondary emphasis, sitting beside terracotta like a potted plant next to a clay vase`,

  doList: [
    "背景使用 bg-[#F5F0EB] 暖白底色，卡片和面板用 bg-[#E8DED1] 或 bg-white/60 半透明白叠加",
    "圆角统一为 rounded-lg，粗看是圆角但曲率自然，像水流打磨过的鹅卵石",
    "卡片阴影用 warm shadow：shadow-[0_4px_20px_-4px_rgba(45,42,36,0.12)] 暖褐半透，不用冷灰",
    "正文使用 font-sans text-[#2D2A24] leading-relaxed，标题用 font-serif font-medium 或 font-sans font-light tracking-wide",
    "强调色用 text-[#C86A4A] 陶土红做链接与 CTA，bg-[#C86A4A] 做按钮；橄榄绿 text-[#7A8B5E] 做二级标签与自然元素",
    "分割线用 warm hairline：border-t border-[#D4BFA5] opacity-60，像纸张叠放留下的自然阴影",
    "输入框用 bg-[#E8DED1]/40 暖灰底、border-[#D4BFA5] 边线、focus 时切换陶土色 border-[#C86A4A] ring-1 ring-[#C86A4A]/20",
    "装饰分隔元素用圆形或有机形状：w-12 h-12 rounded-full bg-[#D4BFA5]/30 配合极细橄榄绿点",
  ],

  doListEn: [
    "Set the page background to bg-[#F5F0EB] warm off-white; cards and panels use bg-[#E8DED1] or bg-white/60 translucent white",
    "Use unified rounded-lg radii everywhere — curves that look natural like river-smoothed pebbles, not artificial bubbles",
    "Cards cast warm shadows: shadow-[0_4px_20px_-4px_rgba(45,42,36,0.12)] with warm brown undertone, never cold gray",
    "Body text uses font-sans text-[#2D2A24] leading-relaxed; headings use font-serif font-medium or font-sans font-light tracking-wide",
    "Accent colors: text-[#C86A4A] terracotta for links and CTAs, bg-[#C86A4A] for buttons; olive green text-[#7A8B5E] for secondary tags and natural elements",
    "Dividers use warm hairlines: border-t border-[#D4BFA5] opacity-60, like the natural shadow between stacked sheets of paper",
    "Inputs use bg-[#E8DED1]/40 warm gray background, border-[#D4BFA5] edges, switching to terracotta border-[#C86A4A] with ring-1 ring-[#C86A4A]/20 on focus",
    "Decorative dividers use circular or organic shapes: w-12 h-12 rounded-full bg-[#D4BFA5]/30 with a hairline olive dot",
  ],

  dontList: [
    "禁止使用冷灰色 #999 / #6B7280 作为文字或背景中性色——所有中性色必须偏暖",
    "禁止直角 rounded-none 或极微小圆角 rounded-sm——有机风格需要圆润的边缘",
    "禁止冷色投影（shadow 用 #000 或冷灰），阴影必须带暖褐底色",
    "禁止高饱和霓虹色或冷调蓝——#C86A4A 陶土红和 #7A8B5E 橄榄绿是唯二的强调色",
    "禁止玻璃拟态（backdrop-blur + 半透明白）——有机质感来自暖色分层与软阴影，不是毛玻璃",
    "禁止正文使用纯黑 #000000，#2D2A24 深褐是正文颜色的上限",
  ],

  dontListEn: [
    "Never use cool grays like #999 or #6B7280 for text or background neutrals — every neutral must lean warm",
    "Never use sharp rounded-none or tiny rounded-sm — the organic aesthetic needs soft, rounded edges",
    "Never use cool shadows (shadow with #000 or cold gray); shadows must carry a warm brown undertone",
    "Never use saturated neon colors or cool blues — terracotta #C86A4A and olive #7A8B5E are the only accent colors",
    "Never use glassmorphism (backdrop-blur + translucent white) — organic texture comes from warm color layers and soft shadows, not frosted glass",
    "Never use pure black #000000 for body text; deep brown #2D2A24 is the maximum darkness for text",
  ],

  components: {
    button: {
      name: "陶土按钮",
      description: "暖感主操作按钮，陶土色圆角按钮，hover 时加深，像烧制后的黏土",
      code: `<button className="px-6 py-2.5 bg-[#C86A4A] text-white text-sm font-medium rounded-lg hover:bg-[#B55A3A] active:bg-[#A04A2A] shadow-[0_2px_12px_-3px_rgba(200,106,74,0.3)] transition-all duration-200">Get in Touch</button>`,
    },
    card: {
      name: "暖感卡片",
      description: "米色底暖感卡片，软阴影伴随暖褐半透，衬在纹理纸上一般温润",
      code: `<div className="bg-[#E8DED1] rounded-lg p-6 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)]">
  <p className="text-[10px] uppercase tracking-[0.15em] text-[#7A8B5E] mb-2">Project</p>
  <h3 className="font-serif text-lg font-medium text-[#2D2A24] mb-2">Clay House</h3>
  <p className="text-sm leading-relaxed text-[#2D2A24]/80">A residential project in the Catalonian countryside, built with rammed earth and local terracotta tiles.</p>
  <div className="mt-4 pt-4 border-t border-[#D4BFA5] opacity-60 flex items-center gap-3">
    <span className="inline-block w-2 h-2 rounded-full bg-[#7A8B5E]/50"></span>
    <span className="text-xs text-[#7A8B5E]">Architecture · 2025</span>
  </div>
</div>`,
    },
    input: {
      name: "黏土输入框",
      description: "暖灰底、黏土色边线输入框，聚焦时陶土色光晕，如写在手工纸上",
      code: `<input
  type="text"
  placeholder="Your email address"
  className="w-full px-4 py-3 bg-[#E8DED1]/40 border border-[#D4BFA5] rounded-lg text-sm text-[#2D2A24] placeholder:text-[#2D2A24]/40 focus:outline-none focus:border-[#C86A4A] focus:ring-1 focus:ring-[#C86A4A]/20 transition-all duration-200"
/>`,
    },
    nav: {
      name: "暖感导航",
      description: "暖色系品牌导航，logo 用衬线字，链接用浅褐小字与陶土 hover 指示",
      code: `<nav className="flex items-center justify-between px-6 py-5 bg-[#F5F0EB] border-b border-[#D4BFA5]/40">
  <span className="font-serif text-xl font-medium tracking-tight text-[#2D2A24]">Clay & Olive</span>
  <div className="flex items-center gap-8 text-sm text-[#2D2A24]/65">
    <span className="hover:text-[#C86A4A] transition-colors duration-200 cursor-pointer">Work</span>
    <span className="hover:text-[#C86A4A] transition-colors duration-200 cursor-pointer">Studio</span>
    <span className="hover:text-[#C86A4A] transition-colors duration-200 cursor-pointer">Journal</span>
    <span className="px-4 py-1.5 bg-[#C86A4A] text-white text-xs rounded-lg hover:bg-[#B55A3A] transition-colors duration-200 cursor-pointer">Contact</span>
  </div>
</nav>`,
    },
    hero: {
      name: "作品集主页头部",
      description: "建筑师/设计师风格的标题区：衬线 big title、橄榄绿标签、陶土装饰元素与手写感副标题",
      code: `<section className="bg-[#F5F0EB] px-6 py-20 md:py-28">
  <div className="max-w-3xl mx-auto">
    <div className="flex items-center gap-2 mb-6">
      <span className="inline-block w-3 h-3 rounded-full bg-[#C86A4A]/60"></span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A8B5E]">Portfolio · 2025</span>
    </div>
    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-[#2D2A24] mb-4">Objects with Soul</h1>
    <p className="font-sans text-lg text-[#2D2A24]/70 leading-relaxed max-w-2xl">We design spaces and objects that feel like they have always been there — warm, grounded, and unmistakably human.</p>
    <div className="mt-8 flex items-center gap-4">
      <button className="px-6 py-2.5 bg-[#C86A4A] text-white text-sm font-medium rounded-lg hover:bg-[#B55A3A] shadow-[0_2px_12px_-3px_rgba(200,106,74,0.3)] transition-all duration-200">View Projects</button>
      <button className="px-6 py-2.5 bg-transparent text-[#2D2A24] text-sm font-medium rounded-lg border border-[#D4BFA5] hover:bg-[#E8DED1]/60 transition-all duration-200">About the Studio</button>
    </div>
  </div>
</section>`,
    },
    footer: {
      name: "暖感页脚",
      description: "大地色页脚，陶土装饰圆点，橄榄绿与暖褐色联系方式网格",
      code: `<footer className="bg-[#E8DED1] border-t border-[#D4BFA5]/40 px-6 py-12">
  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    <div>
      <span className="font-serif text-lg font-medium text-[#2D2A24]">Clay & Olive</span>
      <p className="text-sm text-[#2D2A24]/65 mt-2 leading-relaxed">Design studio for warm, grounded spaces.</p>
      <div className="flex items-center gap-2 mt-4">
        <span className="inline-block w-2 h-2 rounded-full bg-[#C86A4A]/50"></span>
        <span className="inline-block w-2 h-2 rounded-full bg-[#7A8B5E]/50"></span>
        <span className="inline-block w-2 h-2 rounded-full bg-[#D4BFA5]"></span>
      </div>
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-[0.15em] text-[#7A8B5E] mb-3">Studio</p>
      <p className="text-sm text-[#2D2A24]/65 leading-loose">Carrer del Sol 14<br />Barcelona 08002<br />Spain</p>
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-[0.15em] text-[#7A8B5E] mb-3">Contact</p>
      <p className="text-sm text-[#2D2A24]/65 leading-loose">hello@clayandolive.com<br />+34 93 123 45 67</p>
    </div>
  </div>
  <div className="mt-10 pt-6 border-t border-[#D4BFA5]/40 text-center text-xs text-[#2D2A24]/50">
    &copy; 2025 Clay & Olive · Crafted with intention
  </div>
</footer>`,
    },
  },

  globalCss: `/* Warm Organic Global Styles */

/* Signature warm shadow (claymorphism-lite) */
.warm-organic-card-shadow {
  box-shadow: 0 4px 20px -4px rgba(45, 42, 36, 0.10);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.warm-organic-card-shadow:hover {
  box-shadow: 0 8px 30px -6px rgba(45, 42, 36, 0.15);
  transform: translateY(-2px);
}

/* Warm button shadow */
.warm-organic-button-shadow {
  box-shadow: 0 2px 12px -3px rgba(200, 106, 74, 0.3);
}

/* Organic decorative dot */
.warm-organic-dot {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
}

.warm-organic-dot--terracotta {
  background: #C86A4A;
}

.warm-organic-dot--olive {
  background: #7A8B5E;
}

.warm-organic-dot--clay {
  background: #D4BFA5;
}

/* Warm hairline divider */
.warm-organic-hairline {
  border: none;
  border-top: 1px solid #D4BFA5;
  opacity: 0.6;
}

/* Natural texture overlay (subtle paper grain) */
.warm-organic-texture {
  position: relative;
}

.warm-organic-texture::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
  background-repeat: repeat;
  pointer-events: none;
}

/* Image treatment: rounded with warm undertone border */
.warm-organic-image {
  border-radius: 0.5rem;
  border: 1px solid rgba(212, 191, 165, 0.4);
}

/* Decorative organic divider */
.warm-organic-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.warm-organic-divider::before,
.warm-organic-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #D4BFA5;
  opacity: 0.5;
}

.warm-organic-divider-dot {
  display: inline-block;
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 9999px;
  background: rgba(200, 106, 74, 0.4);
}

/* Warm Organic Design Tokens */
:root {
  --warm-organic-paper: #F5F0EB;
  --warm-organic-sand: #E8DED1;
  --warm-organic-clay: #D4BFA5;
  --warm-organic-ink: #2D2A24;
  --warm-organic-terracotta: #C86A4A;
  --warm-organic-olive: #7A8B5E;
}

@keyframes warm-organic-fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.warm-organic-animate-in {
  animation: warm-organic-fade-up 0.5s ease-out both;
}`,

  aiRules: `You are a warm organic (earthy portfolio) design expert specializing in natural, handcrafted visual language. All generated code must strictly follow these constraints:

## Absolute Rules

- Page background: bg-[#F5F0EB] (unbleached paper); card backgrounds: bg-[#E8DED1] (sand) or bg-white/60 translucent
- Primary text: text-[#2D2A24] (deep warm brown); never pure black #000000
- Primary accent: bg-[#C86A4A] / text-[#C86A4A] (terracotta) for buttons, links, and CTAs
- Secondary accent: bg-[#7A8B5E] / text-[#7A8B5E] (olive green) for tags, natural elements, and secondary emphasis
- Neutral surfaces: bg-[#D4BFA5] (clay) for subtle backgrounds; border-[#D4BFA5] for hairline dividers
- Radii: rounded-lg is the standard; never go above rounded-lg or below rounded-md
- Shadows: use warm brown rgba(45,42,36,0.12) not cold gray; card shadow: shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)]
- Heading typography: font-serif font-medium or font-sans font-light tracking-wide
- Body typography: font-sans text-[#2D2A24] leading-relaxed
- Dividers: border-[#D4BFA5] with opacity-60, warm-toned not cool gray
- Decorative elements: small circular dots (w-2 h-2 rounded-full) in terracotta or olive tones

## Forbidden

- Cool grays (#999, #6B7280, etc.) — all neutrals must lean warm
- Sharp corners (rounded-none) or tiny radii (rounded-sm)
- Cold shadows using #000 or cool gray
- Saturated neon colors or cool blues (no cyan, no electric blue)
- Glassmorphism (backdrop-blur + translucent white)
- Pure black #000000 for any text
- Gradients that shift to cool tones

## Layout & Spacing

- Section padding: py-16 md:py-24
- Container max width: max-w-5xl or max-w-4xl for prose
- Card spacing: gap-6 md:gap-8
- Card padding: p-5 md:p-6
- Content column: max-w-3xl mx-auto for centered prose

## Responsive

- Mobile: single column, compact card padding
- Tablet (768px+): two-column grids for project cards
- Desktop (1024px+): wider cards, richer shadows, expanded whitespace

## Self-Check

After generating code, verify:
1. Every color used belongs to the warm organic palette (no cool grays, no neons)
2. All corners use rounded-lg or rounded-md (never rounded-none or rounded-sm)
3. Shadows use warm brown rgba(45,42,36,*) not #000 or cool gray
4. Body text is #2D2A24 not #000000
5. Only accent colors present: terracotta #C86A4A and olive #7A8B5E
6. All neutral tones lean warm (sand, clay, paper tones)`,
};
