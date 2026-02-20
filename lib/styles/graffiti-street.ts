import { DesignStyle } from "./index";

export const graffitiStreet: DesignStyle = {
  slug: "graffiti-street",
  name: "涂鸦街头",
  nameEn: "Graffiti Street",
  description:
    "街头涂鸦艺术风格，喷漆质感、大胆的撞色、手写体标签、砖墙背景。都市文化与反叛精神的视觉表达。",
  cover: "/styles/graffiti-street.svg",
  styleType: "visual",
  tags: ["expressive", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#ff2d55",
    secondary: "#1c1c1e",
    accent: ["#00e5ff", "#ffea00", "#b620e0", "#ff6d00"],
  },
  keywords: ["涂鸦", "街头", "喷漆", "撞色", "都市", "反叛", "标签"],

  philosophy: `涂鸦街头（Graffiti Street）风格源自20世纪60年代纽约地铁和费城街头的涂鸦文化，是嘻哈文化四大元素之一。从早期的简单"tag"签名到后来的"wildstyle"和"piece"（masterpiece），涂鸦始终是城市青年自我表达和反叛精神的象征。

在数字设计中，涂鸦风格通过以下方式重现街头的原始能量：深灰/近黑 #1c1c1e 模拟沥青路面和砖墙底色；喷漆红 #ff2d55 和霓虹青 #00e5ff 是标志性的高饱和度撞色；粗犷的大写字母和倾斜文字模拟喷漆书写的随性。

核心理念：
- 喷漆质感：text-shadow 和 drop-shadow 模拟喷漆扩散的毛边效果
- 大胆撞色：红、青、黄、紫、橙五色高饱和度对撞，拒绝和谐，追求冲击
- 手写标签：倾斜文字 -rotate-[N deg]、大写粗体、不规则间距模拟手喷标签
- 砖墙背景：深灰底色配合微妙的网格纹理暗示砖墙或混凝土墙面

涂鸦风格适合音乐厂牌网站、街头服饰品牌、滑板文化社区、独立音乐人主页等需要表达都市反叛精神和青年文化认同的场景。

关键原则：涂鸦从不对齐，从不温和，从不请求许可。每一个元素都应该有"直接喷上去"的即兴感和力量感。`,

  doList: [
    "使用深灰/近黑 bg-[#1c1c1e] 作为主背景模拟砖墙/沥青",
    "使用高饱和度撞色：text-[#ff2d55], text-[#00e5ff], text-[#ffea00], text-[#b620e0]",
    "文字使用 font-black uppercase 并添加随机旋转 -rotate-[N deg]",
    "使用 text-shadow 或 drop-shadow 模拟喷漆扩散效果",
    "按钮和标签使用粗边框 border-4 和硬偏移阴影 shadow-[Npx_Npx_0px]",
    "元素添加 skew-x 或 skew-y 变换增加街头动态感",
    "使用不同颜色的下划线 underline decoration 模拟喷漆划线",
    "混用超大字号（text-7xl+）和超小字号（text-xs）形成对比",
  ],

  dontList: [
    "禁止使用柔和的粉彩色（pastel colors）",
    "禁止使用纤细字体（font-light, font-thin）",
    "禁止使用对称整齐的网格布局",
    "禁止使用圆润可爱的元素（rounded-full on cards）",
    "禁止使用毛玻璃效果（backdrop-blur）",
    "禁止使用柔和阴影（shadow-sm, shadow-md）",
    "禁止使用温暖舒适的配色方案",
  ],

  components: {
    button: {
      name: "按钮",
      description:
        "涂鸦风格按钮，喷漆红背景、粗黑边框、硬偏移阴影和倾斜变换",
      code: `<button
  className="
    px-8 py-4
    bg-[#ff2d55]
    text-white font-black uppercase tracking-wider text-lg
    border-4 border-[#1c1c1e]
    shadow-[6px_6px_0px_#00e5ff]
    hover:bg-[#00e5ff] hover:text-[#1c1c1e]
    hover:shadow-[8px_8px_0px_#ffea00]
    hover:-translate-y-1
    active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
    transition-all duration-100 ease-linear
  "
  style={{ transform: "rotate(-2deg) skewX(-2deg)" }}
>
  TAG IT
</button>`,
    },
    card: {
      name: "卡片",
      description:
        "涂鸦风格卡片，深灰背景、多色边框、喷漆文字和倾斜装饰",
      code: `<div
  className="
    group
    p-8
    bg-[#1c1c1e]
    border-4 border-[#ff2d55]
    shadow-[8px_8px_0px_#ffea00]
    hover:shadow-[12px_12px_0px_#00e5ff]
    hover:-translate-y-2 hover:-rotate-1
    transition-all duration-150 ease-linear
    relative overflow-hidden
  "
  style={{ transform: "rotate(1deg)" }}
>
  {/* Spray paint drip decoration */}
  <div className="absolute top-0 right-8 w-3 h-12 bg-[#ff2d55] origin-top group-hover:scale-y-[2.5] transition-transform duration-300 ease-out" />
  <div className="absolute top-0 right-14 w-2 h-9 bg-[#00e5ff] origin-top group-hover:scale-y-[3] transition-transform duration-500 ease-out delay-75" />

  <span className="inline-block px-3 py-1 bg-[#ffea00] text-[#1c1c1e] text-xs font-black uppercase tracking-widest mb-4"
    style={{ transform: "rotate(-2deg)" }}
  >
    Fresh
  </span>
  <h3 className="text-3xl font-black text-[#00e5ff] uppercase mb-3"
    style={{ transform: "skewX(-4deg)" }}
  >
    STREET ART
  </h3>
  <p className="text-white/70 text-sm font-bold group-hover:text-white transition-colors duration-100">
    The wall is the canvas. The city is the gallery. Make it loud.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description:
        "涂鸦风格输入框，深灰背景、霓虹聚焦边框和粗体占位文字",
      code: `<div>
  <label className="block text-sm font-black text-[#ffea00] uppercase tracking-widest mb-2"
    style={{ transform: "rotate(-1deg)" }}
  >
    Your Tag
  </label>
  <input
    type="text"
    placeholder="WRITE YOUR NAME..."
    className="
      w-full px-6 py-4
      bg-[#1c1c1e]/80
      border-4 border-[#ff2d55]/60
      rounded-none
      text-white placeholder-white/20
      font-bold uppercase
      focus:border-[#00e5ff]
      focus:shadow-[0_0_12px_rgba(0,229,255,0.3)]
      focus:outline-none
      transition-all duration-150
    "
  />
</div>`,
    },
    hero: {
      name: "Hero 区块",
      description:
        "涂鸦风格 Hero 区域，深色砖墙背景、超大喷漆标题和多色装饰元素",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#1c1c1e]
  relative overflow-hidden
">
  {/* Brick wall texture hint */}
  <div className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 31px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.1) 60px, rgba(255,255,255,0.1) 61px)"
    }}
  />

  {/* Spray paint splatters */}
  <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#ff2d55]/5 blur-xl" />
  <div className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-[#00e5ff]/5 blur-xl" />
  <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-[#ffea00]/5 blur-lg" />

  <div className="relative z-10 text-center px-6">
    <p className="text-sm font-black text-[#ffea00] uppercase tracking-[0.5em] mb-4"
      style={{ transform: "rotate(-2deg)" }}
    >
      No Permission Needed
    </p>
    <h1 className="text-7xl md:text-9xl font-black text-white uppercase leading-none mb-2"
      style={{ transform: "skewX(-4deg)" }}
    >
      GRAFF<span className="text-[#ff2d55]">ITI</span>
    </h1>
    <h2 className="text-5xl md:text-7xl font-black text-[#00e5ff] uppercase mb-8"
      style={{ transform: "rotate(1deg) skewX(-2deg)" }}
    >
      STREET
    </h2>
    <div className="flex gap-4 justify-center flex-wrap">
      <button className="
        px-10 py-4
        bg-[#ff2d55]
        text-white font-black uppercase tracking-wider
        border-4 border-[#1c1c1e]
        shadow-[4px_4px_0px_#00e5ff]
        hover:shadow-[2px_2px_0px_#00e5ff]
        hover:translate-x-[2px] hover:translate-y-[2px]
        transition-all duration-150
      "
        style={{ transform: "rotate(-2deg)" }}
      >
        Explore
      </button>
      <button className="
        px-10 py-4
        bg-transparent
        text-[#ffea00] font-black uppercase tracking-wider
        border-4 border-[#ffea00]
        shadow-[4px_4px_0px_#b620e0]
        hover:bg-[#ffea00] hover:text-[#1c1c1e]
        hover:shadow-[2px_2px_0px_#b620e0]
        hover:translate-x-[2px] hover:translate-y-[2px]
        transition-all duration-150
      "
        style={{ transform: "rotate(1deg)" }}
      >
        Gallery
      </button>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Graffiti Street Global Styles */

:root {
  --graf-red: #ff2d55;
  --graf-dark: #1c1c1e;
  --graf-cyan: #00e5ff;
  --graf-yellow: #ffea00;
  --graf-purple: #b620e0;
  --graf-orange: #ff6d00;
}

/* Spray paint text glow */
.graf-spray {
  text-shadow:
    0 0 4px currentColor,
    0 0 8px currentColor;
}

/* Drip effect */
.graf-drip::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 20%;
  width: 3px;
  height: 12px;
  background: currentColor;
  border-radius: 0 0 50% 50%;
  opacity: 0.5;
}

/* Brick wall background pattern */
.graf-brick-wall {
  background-color: var(--graf-dark);
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 30px,
      rgba(255, 255, 255, 0.03) 30px,
      rgba(255, 255, 255, 0.03) 31px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 60px,
      rgba(255, 255, 255, 0.03) 60px,
      rgba(255, 255, 255, 0.03) 61px
    );
}

/* Tag underline - spray paint style */
.graf-tag-underline {
  text-decoration: underline;
  text-decoration-color: var(--graf-red);
  text-decoration-thickness: 4px;
  text-underline-offset: 4px;
}

/* Stencil text effect */
.graf-stencil {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  -webkit-text-stroke: 2px currentColor;
  color: transparent;
}`,

  aiRules: `You are a Graffiti Street design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Pastel or soft colors (pink-200, blue-200, etc.)
- Thin fonts (font-light, font-thin, font-normal)
- Perfectly aligned symmetric grid layouts
- Rounded cute elements (rounded-full on cards)
- Backdrop blur effects (backdrop-blur)
- Soft shadows (shadow-sm, shadow-md, shadow-lg)
- Warm cozy color schemes

## Must Follow

- Dark asphalt background bg-[#1c1c1e] as base
- High-saturation spray colors: #ff2d55, #00e5ff, #ffea00, #b620e0, #ff6d00
- Extra-bold fonts font-black uppercase throughout
- Random rotation and skew transforms on elements
- Thick borders border-4 with hard offset shadows shadow-[Npx_Npx_0px]
- Text shadow for spray paint glow effect
- Asymmetric, non-grid layouts preferred
- No rounded corners: rounded-none throughout

## Color Palette

Primary:
- Spray Red: #ff2d55
- Asphalt: #1c1c1e
- Cyan Spray: #00e5ff
- Neon Yellow: #ffea00
- Purple: #b620e0
- Orange: #ff6d00

## Unique Elements (Graffiti-Only)

1. Spray paint transforms: style={{ transform: "rotate(Ndeg) skewX(Ndeg)" }} on text and cards
2. Drip decorations: thin vertical div elements simulating paint drips
3. Brick wall texture: repeating-linear-gradient grid pattern in the background
4. Stencil text: font-black uppercase with letter-spacing and optional stroke
5. Color tag badges: inline colored spans with font-black uppercase labels

## Animation & Interaction Rules

- Paint Drip: hover 时让滴落装饰沿 Y 轴拉伸，模拟新喷漆的流淌感。
- Vandalism Snap: 交互允许更激进的旋转/倾斜切换，强调未经许可的街头破坏感。
- Hard Contrast: active 需瞬间移除硬阴影并大幅位移，制造“盖章撞墙”式冲击。
- Zero Polish: 动画保持短促硬切（duration-100/150 + ease-linear），避免优雅顺滑风格。`,

  examplePrompts: [
    {
      title: "涂鸦街头音乐页面",
      titleEn: "Graffiti Street Music Page",
      description:
        "街头涂鸦风格的独立音乐人页面，喷漆文字、砖墙背景和霓虹撞色",
      descriptionEn:
        "Independent musician page with spray-painted text, brick wall background, drip decorations, and neon clash colors",
      prompt: `Use Graffiti Street style to create an indie musician landing page:
1. Background: dark asphalt #1c1c1e with brick wall grid pattern
2. Hero: massive skewed title (font-black), spray paint glow, drip decorations
3. Cards: dark bg, colored thick borders, hard offset shadows, rotation transforms
4. Buttons: spray red or cyan, thick borders, hard shadows, slight rotation
5. Tags: colored badges with font-black uppercase labels
6. Typography: all uppercase, font-black, random rotations and skews
7. Colors: spray red, cyan, neon yellow, purple, orange clash freely`,
    },
  ],
};
