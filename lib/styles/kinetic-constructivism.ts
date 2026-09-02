import type { DesignStyle } from "./types";

export const kineticConstructivism: DesignStyle = {
  slug: "kinetic-constructivism",
  name: "动力学构成主义",
  nameEn: "Kinetic Constructivism",
  description:
    "会动的构成主义。米白纸面上，红、蓝、黄的实色几何——圆、三角、方与粗对角线——不是被摆上去的，而是沿着轴线做机械运动：圆盘公转、三角钟摆、方块按节拍行进。运动学自 El Lissitzky 与 Rodchenko 的海报，节奏来自机械本身。",
  descriptionEn:
    "Constructivism set in motion. On bone-white paper, solid geometric primitives — discs, triangles, squares and thick diagonal bars in red, blue and yellow — are not placed but engineered to move along axes: discs orbit, triangles swing like pendulums, blocks march to a beat. The kinematics descend from El Lissitzky and Rodchenko posters; the rhythm comes from the machine itself.",
  cover: "/styles/kinetic-constructivism.svg",
  styleType: "visual",
  tags: ["geometric", "high-contrast", "colorful"],
  category: "expressive",
  colors: {
    primary: "#EFE9DC",
    secondary: "#17130E",
    accent: ["#E0231B", "#1C4A87", "#F4B301"],
  },
  keywords: [
    "构成主义",
    "会动的构成主义",
    "动态几何",
    "机械运动",
    "李西茨基",
    "罗琴科",
    "苏联海报",
    "包豪斯几何",
    "对角构图",
    "实色块",
    "motion graphics",
    "MG动画",
  ],
  keywordsEn: [
    "kinetic constructivism",
    "constructivist design",
    "motion graphics",
    "animated geometry",
    "El Lissitzky",
    "Rodchenko",
    "soviet poster",
    "bauhaus geometry",
    "diagonal composition",
    "mechanical motion",
    "flat color blocks",
    "geometric animation",
    "landing page",
  ],

  philosophy: `动力学构成主义的信条：几何不是静止的装饰，而是一台机器。构成主义把画面当作工程——对角线是力的方向，圆是转动的轴，三角是楔入的动作。当这些图元真的动起来，海报就变成了机器：每一个圆盘都在公转，每一根对角线都在推进。

核心理念：
- 图元即零件：只用最基本的几何（圆、三角、方、粗线、弧），像机械零件一样组合，拒绝插画和照片
- 运动即结构：动效不是缀饰，而是构成关系的外化——圆做公转与自转，三角做钟摆，方块做节拍行进，对角块做扫入
- 三色一墨一纸：构成红 #E0231B、群青蓝 #1C4A87、金黄 #F4B301，落在暖墨 #17130E 与米白纸 #EFE9DC 上，绝无第四种颜色
- 对角线是主轴：重要构图沿 -30° / -45° 对角线组织，制造张力与方向感，正交只用于稳定的骨架
- 硬边零圆角：所有边缘是刀切的直线，实色平涂，没有渐变、没有阴影、没有发光
- 机械缓动：入场用 expo-out（快启慢落），循环用匀速或 steps() 的齿轮感，回弹用克制的 back，绝不弹跳卖萌

设计原则：
- 性能红线：只动 transform / opacity，几何运动全部用 transform（translate / rotate / scale），绝不触发重排
- 无障碍红线：prefers-reduced-motion 下所有循环停在构成终态，画面依然是一张完整的构成主义海报，信息零丢失
- 节奏红线：一个视口内只让一组图元做主导运动，其余保持静态骨架，避免"满屏乱动"的廉价感
- 版式：超粗无衬线大写标题 + 等宽数字标签，字块本身也是构成的一部分，可沿对角线旋转排布`,

  philosophyEn: `The kinetic-constructivist creed: geometry is not static ornament — it is a machine. Constructivism treats the canvas as engineering: the diagonal is a vector of force, the circle is an axis of rotation, the triangle is a wedge in motion. When those primitives actually move, the poster becomes the machine: every disc orbits, every diagonal drives forward.

Core principles:
- Primitives are parts: only the most basic geometry (circle, triangle, square, thick bar, arc), assembled like machine components; no illustration, no photography
- Motion is structure: animation is not garnish but the externalization of compositional relationships — discs orbit and spin, triangles swing, squares march to a beat, diagonal blocks sweep in
- Three colors, one ink, one paper: constructivist red #E0231B, ultramarine blue #1C4A87, chrome yellow #F4B301, on warm ink #17130E and bone paper #EFE9DC — never a fourth hue
- The diagonal is the main axis: organize key compositions along -30deg / -45deg diagonals for tension and direction; orthogonal layout is reserved for the stable scaffold
- Hard edges, zero radius: every edge is a knife-cut straight line, flat solid fills, no gradients, no shadows, no glow
- Mechanical easing: entrances use expo-out (fast start, slow settle), loops use linear or stepped gear motion, rebounds use restrained back — never a cutesy bounce

Design principles:
- Performance line: animate transform / opacity only; all geometric motion via transform (translate / rotate / scale), never triggering reflow
- Accessibility line: under prefers-reduced-motion every loop settles into its constructivist end-state; the frame remains a complete constructivist poster with zero information loss
- Rhythm line: only one group of primitives leads the motion per viewport while the rest holds a static scaffold, avoiding the cheap look of everything moving at once
- Typography: ultra-bold uppercase sans-serif headlines + tabular numeric labels; the type blocks are themselves part of the composition and may rotate along the diagonal`,

  doList: [
    "背景用米白纸 #EFE9DC，主体用暖墨 #17130E，制造纸面印刷的质感",
    "只用三种强调色：构成红 #E0231B、群青蓝 #1C4A87、金黄 #F4B301，绝不引入第四色",
    "只用基本几何图元：圆、三角、方、粗对角线、弧，实色平涂、硬边零圆角",
    "重要构图沿 -30° / -45° 对角线组织，用旋转的字块和色带制造方向张力",
    "让图元真的机械运动：圆做公转/自转、三角做钟摆、方块做节拍行进、对角块做扫入",
    "入场用 expo-out（cubic-bezier(0.16,1,0.3,1)，0.6-0.9s），循环旋转用 linear 或 steps() 制造齿轮感",
    "标题用超粗无衬线大写（Archivo/Anton 一类，wght 800-900）+ 等宽数字标签",
    "所有动画都写 prefers-reduced-motion 降级，停在完整的构成终态",
  ],

  doListEn: [
    "Set the page on bone paper #EFE9DC with warm ink #17130E for a printed-poster feel",
    "Use only three accents — constructivist red #E0231B, ultramarine #1C4A87, chrome yellow #F4B301 — never a fourth",
    "Use only basic primitives: circle, triangle, square, thick diagonal bar, arc — flat fills, hard edges, zero radius",
    "Organize key compositions along -30deg / -45deg diagonals with rotated type blocks and color bands for directional tension",
    "Make primitives genuinely move mechanically: discs orbit/spin, triangles swing, squares march, diagonal blocks sweep",
    "Entrances use expo-out (cubic-bezier(0.16,1,0.3,1), 0.6-0.9s); rotation loops use linear or steps() for a gear feel",
    "Headlines in ultra-bold uppercase sans (Archivo/Anton family, wght 800-900) + tabular numeric labels",
    "Every animation ships a prefers-reduced-motion fallback that settles on the complete constructivist end-state",
  ],

  dontList: [
    "禁止圆角（rounded-*）、阴影（shadow-md 以上）、渐变（bg-gradient-*）、发光与模糊——构成主义是刀切的硬边实色",
    "禁止第四种颜色，禁止低饱和 pastel，禁止把三原色调浑",
    "禁止用插画、照片、3D 拟物抢几何的戏——图元本身就是主角",
    "禁止弹跳卖萌的卡通缓动与超过 1.2s 的拖沓循环",
    "禁止一屏同时让所有图元乱动（保留静态骨架，一次只有一组主导运动）",
    "禁止动画 top/left/width/height（重排卡顿）——几何运动只用 transform",
    "禁止忽略 prefers-reduced-motion",
  ],

  dontListEn: [
    "Never use rounded corners, shadows (md+), gradients, glow or blur — constructivism is knife-cut hard edges and flat color",
    "Never introduce a fourth hue, never use low-saturation pastels, never muddy the primaries",
    "Never let illustration, photography or 3D skeuomorphism steal the stage from geometry — primitives are the protagonist",
    "Never use cutesy bouncy easing or dragging loops over 1.2s",
    "Never let every primitive move at once (keep a static scaffold; one dominant motion at a time)",
    "Never animate top/left/width/height (layout thrash) — geometric motion uses transform only",
    "Never skip the prefers-reduced-motion fallback",
  ],

  components: {
    button: {
      name: "Button",
      description: "Hard-edged block button; a red panel wipes across on the diagonal on hover",
      code: `<button className="group relative overflow-hidden
  px-7 py-3.5
  bg-[#17130E] text-[#EFE9DC]
  uppercase tracking-[0.12em] text-sm font-extrabold
  border-2 border-[#17130E] rounded-none
  transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
  hover:text-[#EFE9DC]
  active:scale-[0.98]
">
  <span className="absolute inset-0 bg-[#E0231B] -translate-x-full -skew-x-12
    group-hover:translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" />
  <span className="relative z-10">Build Forward</span>
</button>`,
    },
    card: {
      name: "Card",
      description: "Numbered constructivist card with a thick top rule and a spinning corner disc",
      code: `<article className="group relative bg-[#EFE9DC] border-2 border-[#17130E] rounded-none p-6 overflow-hidden">
  <span className="absolute top-0 left-0 right-0 h-2 bg-[#1C4A87]" />
  <span className="absolute -right-6 -top-6 w-16 h-16 rounded-full bg-[#F4B301] border-2 border-[#17130E]
    [transform-origin:center] group-hover:[animation:kc-spin_1.2s_linear_infinite]" />
  <span className="block font-mono text-xs text-[#E0231B] tabular-nums mb-4">01</span>
  <h3 className="text-2xl font-extrabold uppercase text-[#17130E] tracking-tight leading-none mb-3">
    Motion Is Structure
  </h3>
  <p className="text-sm text-[#17130E]/70 leading-relaxed max-w-xs">
    The disc does not decorate — it turns. Every part carries a force.
  </p>
</article>`,
    },
    input: {
      name: "Input",
      description: "Boxed field whose red baseline bar drives in from the left on focus",
      code: `<label className="group block">
  <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-[#17130E]/60 mb-2
    group-focus-within:text-[#E0231B] transition-colors duration-300">
    Your Name
  </span>
  <div className="relative">
    <input type="text" placeholder="Type here"
      className="w-full bg-transparent py-3 px-3 text-lg text-[#17130E] placeholder-[#17130E]/30
        border-2 border-[#17130E] rounded-none focus:outline-none" />
    <span className="absolute bottom-0 left-0 h-1 w-full bg-[#E0231B] origin-left scale-x-0
      group-focus-within:scale-x-100 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" />
  </div>
</label>`,
    },
    nav: {
      name: "Navigation",
      description: "Wordmark with a rotating disc glyph; links gain a driving red underline",
      code: `<nav className="sticky top-0 z-50 bg-[#EFE9DC] border-b-2 border-[#17130E]">
  <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
    <a href="/" className="flex items-center gap-2 text-[#17130E] font-extrabold uppercase tracking-tight text-lg">
      <span className="w-4 h-4 rounded-full bg-[#E0231B] [animation:kc-spin_4s_linear_infinite]" />
      KONSTRUKT
    </a>
    <div className="flex items-center gap-7">
      <a href="#work" className="group relative text-sm font-bold uppercase tracking-[0.12em] text-[#17130E]/70 hover:text-[#17130E] transition-colors duration-300">
        Work
        <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#E0231B] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero",
      description: "Diagonal poster hero: orbiting disc, swinging triangle, marching squares behind a rotated headline",
      code: `<section className="relative min-h-screen bg-[#EFE9DC] overflow-hidden flex items-center px-6">
  <style>{\`
    @keyframes kc-orbit { to { transform: rotate(360deg); } }
    @keyframes kc-spin { to { transform: rotate(360deg); } }
    @keyframes kc-pendulum { 0%,100% { transform: rotate(-24deg); } 50% { transform: rotate(24deg); } }
    @media (prefers-reduced-motion: reduce) {
      .kc-orbit, .kc-spin, .kc-pendulum { animation: none !important; }
    }
  \`}</style>

  {/* Orbiting disc */}
  <div className="absolute left-[14%] top-[22%] w-40 h-40 kc-orbit" style={{ animation: "kc-orbit 12s linear infinite" }}>
    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#E0231B] border-2 border-[#17130E]" />
  </div>
  {/* Swinging triangle */}
  <div className="absolute right-[18%] top-[16%] origin-top kc-pendulum" style={{ animation: "kc-pendulum 3.4s ease-in-out infinite" }}>
    <span className="block w-0 h-0 border-l-[26px] border-r-[26px] border-b-[46px] border-l-transparent border-r-transparent border-b-[#1C4A87]" />
  </div>
  {/* Rotated headline block */}
  <h1 className="relative z-10 max-w-3xl text-[#17130E] font-extrabold uppercase leading-[0.86] tracking-tight text-[clamp(3rem,11vw,9rem)]">
    <span className="block">Build</span>
    <span className="block text-[#E0231B]">In</span>
    <span className="inline-block -rotate-3 bg-[#F4B301] px-3 border-2 border-[#17130E]">Motion</span>
  </h1>
</section>`,
    },
  },

  globalCss: `/* Kinetic Constructivism - geometry as a machine */

:root {
  --kc-paper: #EFE9DC;
  --kc-ink: #17130E;
  --kc-red: #E0231B;
  --kc-blue: #1C4A87;
  --kc-yellow: #F4B301;
  --kc-ease: cubic-bezier(0.16, 1, 0.3, 1);   /* expo-out: fast start, slow settle */
  --kc-back: cubic-bezier(0.34, 1.4, 0.64, 1); /* restrained mechanical rebound */
}

/* Gear rotation: constant angular velocity */
@keyframes kc-spin { to { transform: rotate(360deg); } }

/* Orbit: parent rotates, child rides the rim */
@keyframes kc-orbit { to { transform: rotate(360deg); } }

/* Pendulum: a triangle/bar swinging about its anchor */
@keyframes kc-pendulum {
  0%, 100% { transform: rotate(-24deg); }
  50% { transform: rotate(24deg); }
}

/* March: squares stepping across on a beat */
@keyframes kc-march {
  0% { transform: translateX(0); }
  100% { transform: translateX(24px); }
}

/* Diagonal sweep entrance: a color panel drives in along the diagonal */
@keyframes kc-sweep {
  from { transform: translateX(-110%) skewX(-12deg); }
  to { transform: translateX(0) skewX(-12deg); }
}

/* Block rise entrance for headline slabs */
@keyframes kc-rise {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.kc-spin { animation: kc-spin 4s linear infinite; }
.kc-orbit { animation: kc-orbit 12s linear infinite; }
.kc-pendulum { transform-origin: top center; animation: kc-pendulum 3.4s ease-in-out infinite; }
.kc-march { animation: kc-march 0.9s steps(3) infinite alternate; }

@media (prefers-reduced-motion: reduce) {
  .kc-spin, .kc-orbit, .kc-pendulum, .kc-march { animation: none !important; }
  .kc-rise { animation: none !important; opacity: 1; transform: none; }
}`,

  aiRules: `# 动力学构成主义（Kinetic Constructivism）设计系统

你是一个专精动力学构成主义（Kinetic Constructivism）风格的前端开发专家，生成的所有代码都必须严格遵循以下规范。

## 风格身份
- **名称**：Kinetic Constructivism（动力学构成主义 / 会动的构成主义）
- **本质**：几何图元是机器零件，运动是构成关系的外化——海报会动起来
- **气质**：理性、有力、工业感、宣传海报式的方向张力
- **灵感来源**：El Lissitzky、Alexander Rodchenko、Varvara Stepanova 的苏联构成主义海报；包豪斯几何；Motion Graphics 的图元运动本源

---

## 绝对禁止

| 模式 | 原因 |
|---------|--------|
| 圆角 / 阴影 / 渐变 / 发光 / 模糊 | 构成主义是刀切硬边 + 实色平涂，任何柔化都破坏工业感 |
| 第四种颜色 / 低饱和 pastel / 调浑三原色 | 只有红蓝黄 + 墨 + 纸五色，色彩是结构信号不是氛围 |
| 插画 / 照片 / 3D 拟物 | 基本几何图元本身就是主角，其它一律抢戏 |
| 弹跳卖萌卡通缓动 / 超过 1.2s 的循环 | 破坏机械节奏；用 expo-out 入场、匀速或 steps() 循环 |
| 一屏所有图元同时乱动 | 保留静态骨架，一次只有一组主导运动 |
| 动画 top/left/width/height/margin | 触发重排卡顿；只允许 transform、opacity 参与动画 |
| 缺少 prefers-reduced-motion 降级 | 无障碍没有商量余地 |

## 必须遵守

### 画面（纸与墨与三色）
- 背景 #EFE9DC（米白纸），主体 #17130E（暖墨黑）
- 三个强调色：构成红 #E0231B、群青蓝 #1C4A87、金黄 #F4B301
- 实色平涂，硬边零圆角（rounded-none），关键块用 2px 或 4px 墨色描边

### 图元库（只用这些）
圆（disc）、三角（triangle）、方（square）、粗对角线（diagonal bar）、弧（arc / 同心圆环）。像机械零件一样拼装，禁止其它形状。

### 对角构图
重要构图沿 -30° 或 -45° 对角线组织；标题字块可 -rotate-3 到 -rotate-6 旋转，色带沿对角线切入。正交网格只用于稳定骨架。

### 机械运动（招牌）
\`\`\`css
@keyframes kc-spin   { to { transform: rotate(360deg); } }          /* 齿轮自转，linear */
@keyframes kc-orbit  { to { transform: rotate(360deg); } }          /* 父元素转、子元素骑在轮缘 */
@keyframes kc-pendulum { 0%,100%{transform:rotate(-24deg)} 50%{transform:rotate(24deg)} } /* 钟摆，ease-in-out */
@keyframes kc-march  { to { transform: translateX(24px); } }        /* 方块节拍行进，steps(3) */
@keyframes kc-sweep  { from{transform:translateX(-110%) skewX(-12deg)} to{transform:translateX(0) skewX(-12deg)} }
\`\`\`
- 公转：外层 div 做 kc-orbit（rotate 360deg linear），子圆放在顶部轮缘，即得圆绕圆公转
- 自转：圆盘 / 放射线做 kc-spin，linear 匀速，得齿轮感
- 钟摆：三角 / 粗线 transform-origin:top center，做 kc-pendulum，ease-in-out
- 行进：一排方块做 kc-march，steps(3) alternate，得机械步进
- 入场：色块 / 字块用 expo-out（cubic-bezier(0.16,1,0.3,1)，0.6-0.9s）

### 缓动
- 入场：cubic-bezier(0.16,1,0.3,1)（expo-out，快启慢落）
- 循环旋转 / 公转：linear（匀速齿轮）
- 钟摆：ease-in-out
- 回弹（克制）：cubic-bezier(0.34,1.4,0.64,1)，绝不用 >1.56 的夸张回弹

### 字体
\`\`\`html
<link rel="stylesheet" href="https://fonts.loli.net/css2?family=Archivo:wght@700;800;900&family=Space+Mono&display=swap" />
\`\`\`
标题栈：font-family: "Archivo", "Anton", "Helvetica Neue", ui-sans-serif, sans-serif；超粗（800-900）、大写、tracking-tight。
标签 / 数字：font-family: "Space Mono", ui-monospace, monospace；大写、letter-spacing 0.2-0.3em、tabular-nums。

### 节奏
- 一个视口只有一组主导运动，其余保持静态骨架
- 入场 0.6-0.9s；hover 反馈 0.3-0.4s；循环 3-12s（越大的轮子越慢）

### 无障碍
\`\`\`css
@media (prefers-reduced-motion: reduce) {
  .kc-spin, .kc-orbit, .kc-pendulum, .kc-march { animation: none !important; }
}
\`\`\`
所有循环停在构成终态，画面仍是一张完整的构成主义海报。

### animejs 配方（可选，项目已装 animejs@4）
\`\`\`js
import { animate, stagger } from "animejs";
animate(".kc-square", {
  translateX: [0, 24],
  ease: "steps(3)",
  loop: true,
  alternate: true,
  duration: 900,
  delay: stagger(120),
});
\`\`\`

## 自检清单

- [ ] 纸底墨字 + 只有红蓝黄三色
- [ ] 只用圆/三角/方/对角线/弧，硬边零圆角实色平涂
- [ ] 关键构图沿对角线，标题字块有旋转
- [ ] 图元真的机械运动（公转/自转/钟摆/行进），不是静态摆拍
- [ ] 参与动画的只有 transform / opacity
- [ ] 一屏只有一组主导运动
- [ ] 存在 prefers-reduced-motion 降级到构成终态`,

  aiRulesEn: `# Kinetic Constructivism Design System

You are an expert frontend developer specializing in kinetic constructivism. Generate all code strictly following these specifications.

## Style Identity
- **Name**: Kinetic Constructivism
- **Essence**: geometric primitives are machine parts; motion is the externalization of compositional relationships — the poster moves
- **Mood**: rational, forceful, industrial, propaganda-poster directional tension
- **Inspiration**: El Lissitzky, Alexander Rodchenko, Varvara Stepanova Soviet constructivist posters; Bauhaus geometry; the primitive-in-motion origins of motion graphics

---

## Forbidden

| Pattern | Reason |
|---------|--------|
| Rounded corners / shadows / gradients / glow / blur | Constructivism is knife-cut hard edges + flat fills; any softening kills the industrial feel |
| A fourth hue / low-sat pastels / muddied primaries | Only red, blue, yellow + ink + paper; color is a structural signal, not atmosphere |
| Illustration / photography / 3D skeuomorphism | Basic primitives are the protagonist; anything else steals the stage |
| Cutesy bouncy easing / loops over 1.2s | Breaks the mechanical rhythm; use expo-out entrances, linear or stepped loops |
| Every primitive moving at once | Keep a static scaffold; one dominant motion at a time |
| Animating top/left/width/height/margin | Layout thrash; only transform and opacity may animate |
| Missing prefers-reduced-motion fallback | Accessibility is non-negotiable |

## Required

### The Frame (paper, ink, three colors)
- Background #EFE9DC (bone paper), body #17130E (warm ink)
- Three accents: constructivist red #E0231B, ultramarine #1C4A87, chrome yellow #F4B301
- Flat fills, hard edges (rounded-none), key blocks get a 2px or 4px ink stroke

### Primitive Library (only these)
Disc, triangle, square, thick diagonal bar, arc / concentric ring. Assemble like machine parts; no other shapes.

### Diagonal Composition
Organize key compositions along -30deg or -45deg diagonals; headline type blocks may rotate -3deg to -6deg; color bands cut in along the diagonal. Orthogonal grids only for the stable scaffold.

### Mechanical Motion (signature)
\`\`\`css
@keyframes kc-spin   { to { transform: rotate(360deg); } }          /* gear self-rotation, linear */
@keyframes kc-orbit  { to { transform: rotate(360deg); } }          /* parent rotates, child rides the rim */
@keyframes kc-pendulum { 0%,100%{transform:rotate(-24deg)} 50%{transform:rotate(24deg)} } /* pendulum, ease-in-out */
@keyframes kc-march  { to { transform: translateX(24px); } }        /* squares march, steps(3) */
@keyframes kc-sweep  { from{transform:translateX(-110%) skewX(-12deg)} to{transform:translateX(0) skewX(-12deg)} }
\`\`\`
- Orbit: outer div runs kc-orbit (rotate 360deg linear), a child disc sits on the top rim -> a circle orbiting a circle
- Spin: a disc / radial burst runs kc-spin, linear, for a gear feel
- Pendulum: a triangle / thick bar with transform-origin:top center runs kc-pendulum, ease-in-out
- March: a row of squares runs kc-march, steps(3) alternate, for mechanical stepping
- Entrance: color/type blocks use expo-out (cubic-bezier(0.16,1,0.3,1), 0.6-0.9s)

### Easing
- Entrance: cubic-bezier(0.16,1,0.3,1) (expo-out, fast start slow settle)
- Rotation / orbit loops: linear (constant gear speed)
- Pendulum: ease-in-out
- Rebound (restrained): cubic-bezier(0.34,1.4,0.64,1); never an exaggerated >1.56 overshoot

### Typography
\`\`\`html
<link rel="stylesheet" href="https://fonts.loli.net/css2?family=Archivo:wght@700;800;900&family=Space+Mono&display=swap" />
\`\`\`
Headline stack: font-family: "Archivo", "Anton", "Helvetica Neue", ui-sans-serif, sans-serif; ultra-bold (800-900), uppercase, tracking-tight.
Labels / numbers: font-family: "Space Mono", ui-monospace, monospace; uppercase, letter-spacing 0.2-0.3em, tabular-nums.

### Rhythm
- One dominant motion per viewport; the rest holds a static scaffold
- Entrances 0.6-0.9s; hover feedback 0.3-0.4s; loops 3-12s (bigger wheels turn slower)

### Reduced Motion
\`\`\`css
@media (prefers-reduced-motion: reduce) {
  .kc-spin, .kc-orbit, .kc-pendulum, .kc-march { animation: none !important; }
}
\`\`\`
Every loop settles into its constructivist end-state; the frame stays a complete poster.

### animejs Recipe (optional, project ships animejs@4)
\`\`\`js
import { animate, stagger } from "animejs";
animate(".kc-square", {
  translateX: [0, 24],
  ease: "steps(3)",
  loop: true,
  alternate: true,
  duration: 900,
  delay: stagger(120),
});
\`\`\`

## Self-Verification Checklist

- [ ] Paper ground, ink type, only red/blue/yellow
- [ ] Only circle/triangle/square/diagonal/arc, hard edges, zero radius, flat fills
- [ ] Key composition on the diagonal, headline blocks rotated
- [ ] Primitives genuinely move mechanically (orbit/spin/pendulum/march), not static mockups
- [ ] Only transform / opacity animate
- [ ] One dominant motion per viewport
- [ ] prefers-reduced-motion fallback settling on the constructivist end-state`,

  examplePrompts: [
    {
      title: "构成主义机器落地页",
      titleEn: "Constructivist Machine Landing Page",
      description: "几何图元真的会动的宣传海报式落地页",
      descriptionEn: "A propaganda-poster landing page where the geometry truly moves",
      prompt: `Create a kinetic constructivism landing page with:
1. Frame: #EFE9DC bone paper, #17130E ink, three accents #E0231B / #1C4A87 / #F4B301 only
2. Load Archivo (wght 700-900) + Space Mono from fonts.loli.net
3. Hero on a diagonal: an orbiting red disc (parent div rotate 360deg 12s linear, child disc on the rim), a blue triangle swinging like a pendulum (transform-origin top center, rotate -24deg..24deg ease-in-out), a rotated headline block with one word on a yellow slab tilted -3deg
4. A row of squares marching with steps(3) between sections
5. Numbered feature cards: thick ink border, top color rule, a corner disc that spins on hover
6. Diagonal sweep entrances for color panels (translateX -110% skewX -12deg -> 0)
7. All motion via transform/opacity only; expo-out cubic-bezier(0.16,1,0.3,1) entrances; linear loops; prefers-reduced-motion settles everything on the constructivist end-state`,
      promptEn: `Create a kinetic constructivism landing page with:
1. Frame: #EFE9DC bone paper, #17130E ink, three accents #E0231B / #1C4A87 / #F4B301 only
2. Load Archivo (wght 700-900) + Space Mono from fonts.loli.net
3. Hero on a diagonal: an orbiting red disc (parent div rotate 360deg 12s linear, child disc on the rim), a blue triangle swinging like a pendulum (transform-origin top center, rotate -24deg..24deg ease-in-out), a rotated headline block with one word on a yellow slab tilted -3deg
4. A row of squares marching with steps(3) between sections
5. Numbered feature cards: thick ink border, top color rule, a corner disc that spins on hover
6. Diagonal sweep entrances for color panels (translateX -110% skewX -12deg -> 0)
7. All motion via transform/opacity only; expo-out cubic-bezier(0.16,1,0.3,1) entrances; linear loops; prefers-reduced-motion settles everything on the constructivist end-state`,
    },
    {
      title: "几何运动标题墙",
      titleEn: "Kinetic Geometry Poster Wall",
      description: "以对角构图和机械循环为主角的作品集首屏",
      descriptionEn: "A portfolio hero carried by diagonal composition and mechanical loops",
      prompt: `Create a constructivist portfolio hero with:
1. Bone paper #EFE9DC, ink #17130E, red/blue/yellow accents only, flat fills, hard edges
2. A large concentric-ring arc in the corner slowly spinning (kc-spin 18s linear)
3. Project rows as huge uppercase Archivo headlines; on hover a red diagonal bar sweeps across (translateX -110% skewX -12deg -> 0) and a mono index number in Space Mono slides in
4. A pendulum triangle pinned to the top-right, swinging ease-in-out
5. Section labels in tabular-nums Space Mono, uppercase, tracked 0.25em
6. Everything transform/opacity only; one dominant motion per viewport; full prefers-reduced-motion fallback`,
      promptEn: `Create a constructivist portfolio hero with:
1. Bone paper #EFE9DC, ink #17130E, red/blue/yellow accents only, flat fills, hard edges
2. A large concentric-ring arc in the corner slowly spinning (kc-spin 18s linear)
3. Project rows as huge uppercase Archivo headlines; on hover a red diagonal bar sweeps across (translateX -110% skewX -12deg -> 0) and a mono index number in Space Mono slides in
4. A pendulum triangle pinned to the top-right, swinging ease-in-out
5. Section labels in tabular-nums Space Mono, uppercase, tracked 0.25em
6. Everything transform/opacity only; one dominant motion per viewport; full prefers-reduced-motion fallback`,
    },
  ],

  variants: [
    {
      id: "kinetic-constructivism-noir",
      name: "动力学构成主义·夜刊",
      nameEn: "Constructivist Noir",
      description: "Inverted stage: ink ground with bone type, red the only surviving accent for a stark propaganda feel",
      colors: {
        primary: "#17130E",
        secondary: "#EFE9DC",
        accent: ["#E0231B", "#C9C1AE", "#F4B301"],
      },
    },
    {
      id: "kinetic-constructivism-blueprint",
      name: "动力学构成主义·蓝图",
      nameEn: "Constructivist Blueprint",
      description: "Ultramarine ground with bone geometry and yellow signal, an engineering-drawing variant",
      colors: {
        primary: "#1C4A87",
        secondary: "#EFE9DC",
        accent: ["#F4B301", "#E0231B", "#9DB4D4"],
      },
    },
  ],
};
