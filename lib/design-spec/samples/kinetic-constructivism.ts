import type { DesignSpec } from "../types";

export const kineticConstructivismSpec: DesignSpec = {
  slug: "kinetic-constructivism",
  name: "动力学构成主义",
  nameEn: "Kinetic Constructivism",
  cover: "/styles/kinetic-constructivism.svg",
  theme: "light",
  northStar: {
    zh: "几何图元不是被摆放的，而是被装上轴的：圆在公转，三角在摆动。",
    en: "The primitives are not placed but mounted on axes — discs orbit, triangles swing.",
  },
  summary: {
    zh: "动力学构成主义把构成主义装上了马达：米白纸（#ef e9dc）上只用圆、三角、方、粗斜条与弧这五种图元，填构成红（#e0231b）、群青（#1c4a87）、金黄（#f4b301）三色，暖墨（#17130e）作主体。图元不装饰版面，而是沿轴运动——圆公转、三角像钟摆摆动、方块按拍子行进。入场用 expo-out（0.6 到 0.9 秒），旋转循环用 linear 或 steps() 做出齿轮感。禁令极硬：不许圆角阴影渐变发光模糊、不许第四种颜色、不许把三原色调浑、不许插画抢戏、不许一屏所有图元同时乱动（保留静态骨架，一次只有一组主导运动）、不许动画布局属性、不许忽略 reduced-motion。",
    en: "Kinetic Constructivism bolts a motor onto Constructivism: only five primitives — circle, triangle, square, thick diagonal bar, arc — on bone paper (#efe9dc), filled in constructivist red (#e0231b), ultramarine (#1c4a87) and chrome yellow (#f4b301), with warm ink (#17130e) as the body. The primitives do not decorate the page, they travel along axes: discs orbit, triangles swing like pendulums, blocks march to a beat. Entrances use expo-out at 0.6 to 0.9 seconds, while rotation loops run linear or on steps() for a geared feel. The prohibitions are hard — no radius, shadow, gradient, glow or blur; no fourth color; no muddying of the primaries; no illustration stealing the scene; never every primitive moving at once; no animating layout properties, and no ignoring reduced motion.",
  },
  colors: [
    {
      name: "米白纸",
      nameEn: "Bone Paper",
      value: "#efe9dc",
      group: "surface",
      role: {
        zh: "页面底。略带黄的纸色，像一张还没印的海报。",
        en: "The page ground — a faintly yellow paper stock, like an unprinted poster.",
      },
      token: "--color-bone-paper",
    },
    {
      name: "暖墨",
      nameEn: "Warm Ink",
      value: "#17130e",
      group: "brand",
      role: {
        zh: "文字与最粗的斜条。带暖调的近黑。",
        en: "Type and the heaviest diagonal bars — a warm near black.",
      },
      token: "--color-warm-ink",
    },
    {
      name: "构成红",
      nameEn: "Constructivist Red",
      value: "#e0231b",
      group: "accent",
      role: {
        zh: "第一原色：主圆盘与最抢眼的图元。",
        en: "The first primary on the main disc and the loudest primitive.",
      },
      token: "--color-red",
    },
    {
      name: "群青",
      nameEn: "Ultramarine",
      value: "#1c4a87",
      group: "accent",
      role: {
        zh: "第二原色：三角与次级图元。",
        en: "The second primary on triangles and secondary primitives.",
      },
      token: "--color-ultramarine",
    },
    {
      name: "金黄",
      nameEn: "Chrome Yellow",
      value: "#f4b301",
      group: "accent",
      role: {
        zh: "第三原色：最小的方块与高亮点。",
        en: "The third primary on the smallest squares and highlight points.",
      },
      token: "--color-chrome-yellow",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Arial Black', Helvetica, sans-serif",
      weights: [700, 900],
      sizes: [13, 16, 22, 32, 48, 72],
      lineHeight: { display: 0.95, heading: 1.05, body: 1.5 },
      tracking: { display: "-0.03em", label: "0.08em" },
      role: {
        zh: "全站无衬线，700 与 900。标题压到行高 0.95，字块本身就是一块几何体。",
        en: "Sans throughout at 700 and 900. Headlines run at 0.95 leading so the text block becomes one more solid.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 72, lineHeight: 0.95, tracking: "-0.03em", token: "--text-display" },
    { role: "heading", weight: 900, size: 48, lineHeight: 1, tracking: "-0.03em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 32, lineHeight: 1.1, token: "--text-subheading" },
    { role: "body-lg", weight: 700, size: 22, lineHeight: 1.4, token: "--text-body-lg" },
    { role: "body", weight: 700, size: 16, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 700, size: 13, lineHeight: 1.4, tracking: "0.08em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1200,
    sectionGap: 96,
    cardPadding: 24,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "discs", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Bone Paper", value: "#efe9dc", purpose: "页面底" },
    { level: 1, name: "Red Solid", value: "#e0231b", purpose: "红色图元" },
    { level: 2, name: "Ultramarine Solid", value: "#1c4a87", purpose: "蓝色图元" },
  ],
  elevation: [{ name: "None", value: "none — knife-cut hard edges only" }],
  components: [
    {
      name: "Orbiting Disc",
      role: { zh: "公转圆盘（核心组件）", en: "The orbiting disc — the core component" },
      construction: {
        zh: "一个实心圆（40 到 160px、填构成红），沿另一个更大的隐形圆轨道公转：用 @keyframes 只改 transform 的 rotate（外圈旋转带动内层反向旋转以保持自身不转）。周期 12 到 24 秒、linear 无限。圆本身零圆角（它是圆）、无阴影无描边。",
        en: "A solid disc 40 to 160px across in constructivist red travelling a larger invisible orbit: the keyframes rotate only transform on the parent while the child counter-rotates to stay upright. The cycle runs 12 to 24 seconds, linear and infinite. The disc has no shadow and no stroke, and it is the only element that is round.",
      },
      sizes: "cycle 12–24s linear",
    },
    {
      name: "Pendulum Triangle",
      role: { zh: "钟摆三角", en: "The pendulum triangle" },
      construction: {
        zh: "一个实心等腰三角（用 clip-path polygon）以顶点为轴做 ±18 度的摆动，周期 4 到 6 秒、cubic-bezier(0.45, 0, 0.55, 1)（近似正弦）。填群青或金黄。摆动的支点必须在顶点，否则看起来像在飘。",
        en: "A solid isosceles triangle (clip-path polygon) swings ±18 degrees about its apex over four to six seconds on cubic-bezier(0.45, 0, 0.55, 1), close to a sine. Filled ultramarine or chrome yellow, it pivots at the apex — anywhere else and it looks like it is drifting.",
      },
      sizes: "swing ±18deg; 4–6s",
    },
    {
      name: "Marching Blocks",
      role: { zh: "行进的方块", en: "The marching blocks" },
      construction: {
        zh: "3 到 6 个等大的方块（各 24 到 40px）排成一行，依次以 120ms 的延迟沿 X 轴平移 16px 再回位，周期 1.6 秒、linear 或 steps(2)（齿轮感）。填三原色轮换。绝不许它们同时移动——错峰才有行军感。",
        en: "Three to six equal squares (24 to 40px) in a row, each translating 16px on X and back with a 120ms stagger over a 1.6-second cycle, linear or steps(2) for the geared feel, filled in rotating primaries. They never move in unison — the stagger is what makes it march.",
      },
      sizes: "stagger 120ms; cycle 1.6s",
    },
    {
      name: "Diagonal Bar",
      role: { zh: "粗斜条", en: "The thick diagonal bar" },
      construction: {
        zh: "一条 16 到 40px 粗、斜 45 度或 -30 度的实心条，填暖墨或构成红，横跨区块并允许溢出容器。它是最强的构图轴，静态——动的图元应该沿着它的方向运动。",
        en: "A 16 to 40px bar at 45 or -30 degrees in warm ink or constructivist red, spanning a section and free to bleed. It is the strongest compositional axis and it stays still — moving primitives should travel along it.",
      },
    },
    {
      name: "Hard Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "构成红填充、米白文字、零圆角、无描边、16px/900、字距 0.08em、padding 12px 28px，无阴影。hover 时填充硬切到群青；按下时位移 2px 2px（无阴影可归零，用位移表示压入）。入场用 expo-out 0.7 秒。",
        en: "Constructivist red fill, bone paper text, zero radius, no border, 16px/900 at 0.08em, 12px 28px padding, no shadow. Hover cuts the fill to ultramarine; press translates 2px 2px — with no shadow to zero, the shift itself shows the press. It enters on expo-out over 0.7 seconds.",
      },
      sizes: "padding 12px 28px; label 16px",
      states: "hover: blue fill; active: translate 2px",
    },
  ],
  imagery: {
    zh: "没有图像，图元就是图像。允许极少量黑白摄影并以硬边几何裁切嵌入。不使用插画、3D 拟物与有任何柔和边缘的图像。",
    en: "There is no imagery — the primitives are the imagery. A small amount of black-and-white photography may sit inside a hard-edged geometric crop. No illustration, no 3D objects, nothing with a soft edge.",
  },
  layout: {
    zh: "上限 1200px、容器内边距 24px，区块间距 96px。允许图元溢出容器与页面边缘。**一屏只允许一组主导运动**：其余图元保持静态，作为骨架。所有运动只用 transform，绝不动 top/left/width/height。",
    en: "Capped at 1200px with 24px padding, sections 96px apart. Primitives may bleed past container and page. Only one group leads the motion per screen — the rest hold still as skeleton. Every animation uses transform only, never top, left, width or height.",
  },
  dos: [
    { zh: "只用五种图元、三种原色", en: "Five primitives, three primaries" },
    { zh: "圆公转、三角摆、方块行进", en: "Discs orbit, triangles swing, blocks march" },
    { zh: "入场用 expo-out 0.6 到 0.9 秒", en: "Entrances use expo-out at 0.6 to 0.9 seconds" },
    { zh: "旋转循环用 linear 或 steps()", en: "Rotation loops run linear or steps()" },
    { zh: "一屏只有一组主导运动", en: "One lead motion group per screen" },
    { zh: "动画只用 transform", en: "Animate transform only" },
  ],
  donts: [
    { zh: "不要用圆角、阴影、渐变、发光与模糊", en: "No radius, shadow, gradient, glow or blur" },
    { zh: "不要引入第四种颜色", en: "Never introduce a fourth color" },
    { zh: "不要把三原色调浑", en: "Never muddy the primaries" },
    { zh: "不要让插画抢戏", en: "Never let illustration steal the scene" },
    { zh: "不要一屏所有图元同时乱动", en: "Never animate every primitive at once" },
    { zh: "不要动画布局属性", en: "Never animate layout properties" },
  ],
  promptGuide: {
    quickColors: {
      text: "#17130e",
      background: "#efe9dc",
      red: "#e0231b",
      blue: "#1c4a87",
      yellow: "#f4b301",
      ink: "#17130e",
    },
    prompts: [
      {
        zh: "做一个动力学构成主义版面：米白纸 #efe9dc 底、暖墨 #17130e 文字。一个 120px 的构成红 #e0231b 实心圆沿隐形轨道公转（@keyframes 只改 transform rotate、周期 18s linear、内层反向旋转保持直立）。一个群青 #1c4a87 等腰三角以顶点为轴 ±18 度摆动（5s、cubic-bezier(0.45,0,0.55,1)）。四个 32px 的金黄 #f4b301 方块错峰 120ms 沿 X 轴平移 16px（1.6s linear）。一条 32px 粗的暖墨斜条以 45 度横跨区块并溢出容器。标题 72px/900、行高 0.95、字距 -0.03em。零圆角零阴影无渐变，一屏只有一组主导运动。",
        en: "Build a kinetic constructivist layout: bone paper #efe9dc with warm ink #17130e type. A 120px constructivist red #e0231b disc orbits on an invisible path (keyframes rotating transform only, 18s linear, with the child counter-rotating to stay upright). An ultramarine #1c4a87 isosceles triangle swings ±18 degrees about its apex over 5s on cubic-bezier(0.45,0,0.55,1). Four 32px chrome yellow #f4b301 squares translate 16px on X with a 120ms stagger over 1.6s linear. A 32px warm ink bar runs 45 degrees across the section and bleeds past the container. The headline runs 72px/900 at 0.95 leading and -0.03em. Zero radius, zero shadow, no gradients, and one lead motion group per screen.",
      },
    ],
  },
  similar: [
    { name: "Constructivism", why: { zh: "同一语汇，但原版是静态海报，动力版把图元装上轴", en: "Same vocabulary, though the original is a still poster while this mounts the primitives on axes" } },
    { name: "Kinetic Typography", why: { zh: "同属动力学，但那个让字动，这个让几何体动", en: "Both kinetic, though that one moves type while this moves geometry" } },
  ],
  completeness: "full",
};
