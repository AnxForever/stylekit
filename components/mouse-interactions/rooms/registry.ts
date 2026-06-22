"use client";

import type { ComponentType } from "react";
import { NeoBrutalistRoom } from "./neo-brutalist-room";
import { GlassmorphismRoom } from "./glassmorphism-room";
import { EditorialRoom } from "./editorial-room";
import type { RoomProps } from "./types";

/**
 * 风格房间注册表 — 数据驱动, Cursor Lab 和详情页都从这里取。
 *
 * 两种房间:
 *  - Component (现有 3): 独立实现, 直接渲染 <Component showHeader={false} />
 *  - stage (新房间): 原语组合 + 视觉配置, 由 <GenericRoom> 渲染
 */

export type PrimitiveType =
  | "FollowAura"
  | "Trail"
  | "Spotlight"
  | "GlitchRGB"
  | "Scanline"
  | "PressDent"
  | "Mirror"
  | "Grid3D"
  | "Tilt3D"
  | "MagneticTarget"
  | "Warp"
  | "Squish"
  | "Ripple"
  | "Confetti"
  | "EmblemSpin"
  | "SpeedLine"
  | "PaperLayer"
  | "GeometricFragments";

export interface PrimitiveConfig {
  type: PrimitiveType;
  props?: Record<string, unknown>;
}

export interface RoomStageConfig {
  bg: string;
  fontColor?: string;
  fontFamily?: string;
  primitives: PrimitiveConfig[];
  /** 舞台内的大字标题 (默认风格英文名) */
  hero?: string;
  heroColor?: string;
}

export interface RoomConfig {
  slug: string;
  index: string;
  accent: string;
  name: { en: string; zh: string };
  tagline: { en: string; zh: string };
  note: { en: string; zh: string };
  effects: { en: string[]; zh: string[] };
  /** 现有独立房间 */
  Component?: ComponentType<RoomProps>;
  /** 新房间 (原语组合) */
  stage?: RoomStageConfig;
}

export const ROOMS: RoomConfig[] = [
  {
    slug: "neo-brutalist",
    index: "01",
    accent: "#ff006e",
    name: { en: "Neo-Brutalist", zh: "新野兽派" },
    tagline: {
      en: "Hard shadows, hard switches. Physics you can feel.",
      zh: "硬阴影、硬切换。能感受到的物理。",
    },
    note: {
      en: "Neobrutalism embraces purposeful motion — every effect guides or reports.",
      zh: "新野兽派拥抱有目的的动效——每个效果都在引导或反馈。",
    },
    effects: {
      en: ["Mutual magnetic CTA", "Inertial drag card", "Zone state cursor"],
      zh: ["双向磁吸 CTA", "惯性拖拽卡片", "区域状态光标"],
    },
    Component: NeoBrutalistRoom,
  },
  {
    slug: "glassmorphism",
    index: "02",
    accent: "#a78bfa",
    name: { en: "Glassmorphism", zh: "玻璃拟态" },
    tagline: {
      en: "Ambient, weightless, breathable. Light follows you.",
      zh: "环境感、无重量、可呼吸。光追随你。",
    },
    note: {
      en: "Depth drifts beneath; the aura narrows to violet inside the glass.",
      zh: "深度在下方漂移;进入玻璃的瞬间,光晕从青色收缩为紫色。",
    },
    effects: {
      en: ["Ambient aura follow", "Parallax depth layers", "Glass spotlight + zoning"],
      zh: ["环境光晕跟随", "视差深度层", "玻璃聚光灯 + 区域切换"],
    },
    Component: GlassmorphismRoom,
  },
  {
    slug: "editorial",
    index: "03",
    accent: "#b91c1c",
    name: { en: "Editorial", zh: "杂志编辑" },
    tagline: {
      en: "Restrained and literate. The cursor only nudges the type.",
      zh: "克制而有教养。光标只是轻轻拨开文字。",
    },
    note: {
      en: "The type is the protagonist. Repulsion is a gesture, not a gag.",
      zh: "文字是主角。排斥是手势而非噱头。",
    },
    effects: {
      en: ["Serif letter repulsion", "Ink dot trail", "Proximity reveal actions"],
      zh: ["衬线逐字排斥", "墨点轨迹", "靠近浮现操作"],
    },
    Component: EditorialRoom,
  },
  /* ===== 第 1 批新增 (原语组合) ===== */
  {
    slug: "cyberpunk-neon",
    index: "04",
    accent: "#00ffc8",
    name: { en: "Cyberpunk Neon", zh: "赛博朋克霓虹" },
    tagline: {
      en: "RGB ghosting, scanlines, neon bleed. High signal, high noise.",
      zh: "RGB 残影、扫描线、霓虹溢出。高信号,高噪声。",
    },
    note: {
      en: "Glitch aesthetics — the cursor leaks red/cyan/blue channels and drags a scanline.",
      zh: "故障美学——光标漏出红/青/蓝三通道,并拖出一道扫描线。",
    },
    effects: {
      en: ["RGB channel split", "Scanline follow", "Neon dot trail"],
      zh: ["RGB 通道分离", "扫描线跟随", "霓虹点轨迹"],
    },
    stage: {
      bg: "radial-gradient(circle at 30% 20%, #0a1a2a 0%, #050810 70%)",
      fontColor: "#00ffc8",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      hero: "NEON",
      heroColor: "#00ffc8",
      primitives: [
        { type: "GlitchRGB", props: { size: 32 } },
        { type: "Scanline", props: { color: "rgba(0,255,200,0.55)" } },
        { type: "Trail", props: { color: "rgba(0,255,200,0.4)", dotSize: 5, spacing: 24, fadeMs: 800 } },
      ],
    },
  },
  {
    slug: "neumorphism",
    index: "05",
    accent: "#8a99a8",
    name: { en: "Neumorphism", zh: "新拟态" },
    tagline: {
      en: "Soft surfaces that dent under the cursor. Touchable shadows.",
      zh: "光标下会凹陷的柔软表面。可触摸的阴影。",
    },
    note: {
      en: "Extruded UI pressed inward by proximity — soft, physical, calm.",
      zh: "凸起界面被靠近压凹——柔软、物理、平静。",
    },
    effects: {
      en: ["Press dent surface", "Magnetic soft button", "Ambient soft light"],
      zh: ["压凹表面", "磁吸软按钮", "环境柔光"],
    },
    stage: {
      bg: "#e6ebf0",
      fontColor: "#5a6a7d",
      fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      hero: "soft",
      heroColor: "#5a6a7d",
      primitives: [
        { type: "PressDent", props: { className: "absolute left-1/2 top-1/2 h-40 w-56 -translate-x-1/2 -translate-y-1/2 p-6" } },
        { type: "MagneticTarget", props: { strength: 0.22, className: "absolute right-[12%] top-[20%]" } },
        { type: "FollowAura", props: { color: "rgba(150,170,190,0.35)", size: 200, blur: 24, blend: "multiply" } },
      ],
    },
  },
  {
    slug: "bauhaus",
    index: "06",
    accent: "#e63946",
    name: { en: "Bauhaus", zh: "包豪斯" },
    tagline: {
      en: "Primary colors, primary shapes. Form follows function.",
      zh: "原色、原型。形式追随功能。",
    },
    note: {
      en: "Geometric restraint — a magnetic primary button and a tilting yellow block. Pure form.",
      zh: "几何克制——磁吸原色按钮和倾斜黄色方块。纯粹形式。",
    },
    effects: {
      en: ["Magnetic primary button", "3D tilt block"],
      zh: ["磁吸原色按钮", "3D 倾斜方块"],
    },
    stage: {
      bg: "#f4f1ea",
      fontColor: "#1a1a1a",
      fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      hero: "BAUHAUS",
      heroColor: "#1a1a1a",
      primitives: [
        { type: "MagneticTarget", props: { strength: 0.3, className: "absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2" } },
        { type: "Tilt3D", props: { max: 10, className: "absolute right-[12%] top-[20%] h-28 w-44 border-[3px] border-black bg-[#ffcd3c]" } },
      ],
    },
  },
  {
    slug: "art-deco",
    index: "07",
    accent: "#d4af37",
    name: { en: "Art Deco", zh: "装饰艺术" },
    tagline: {
      en: "Symmetrical gilded reflections. Geometry of luxury.",
      zh: "对称的金色倒影。奢华的几何。",
    },
    note: {
      en: "Two gold auras mirror across the stage axis — opulence in duplicate.",
      zh: "两团金色光晕沿舞台轴线镜像——奢华的双重。",
    },
    effects: {
      en: ["Mirror gold auras", "Gilded ambient light", "Gold dust trail"],
      zh: ["镜像金光晕", "金色环境光", "金粉轨迹"],
    },
    stage: {
      bg: "radial-gradient(circle at 50% 40%, #1a1208 0%, #080604 80%)",
      fontColor: "#d4af37",
      fontFamily: "var(--font-serif), ui-serif, Georgia, serif",
      hero: "DECO",
      heroColor: "#d4af37",
      primitives: [
        { type: "Mirror", props: { color: "rgba(212,175,55,0.65)" } },
        { type: "FollowAura", props: { color: "rgba(212,175,55,0.4)", size: 180, blur: 14, blend: "screen" } },
        { type: "Trail", props: { color: "rgba(212,175,55,0.5)", dotSize: 5, spacing: 28, fadeMs: 1000 } },
      ],
    },
  },
  {
    slug: "vaporwave",
    index: "08",
    accent: "#ff71ce",
    name: { en: "Vaporwave", zh: "蒸汽波" },
    tagline: {
      en: "Pink scanlines, magenta bleed, retro-future drift.",
      zh: "粉色扫描线、品红溢出、复古未来漂移。",
    },
    note: {
      en: "AESTHETIC — scanline + RGB split + pink dust, all the way down.",
      zh: "AESTHETIC——扫描线 + RGB 分裂 + 粉尘,一路到底。",
    },
    effects: {
      en: ["Pink scanline follow", "RGB split cursor", "Magenta dust trail"],
      zh: ["粉色扫描线跟随", "RGB 分裂光标", "品红粉尘轨迹"],
    },
    stage: {
      bg: "linear-gradient(135deg, #2a1a3a 0%, #4a1a4a 50%, #6a2a5a 100%)",
      fontColor: "#ff71ce",
      fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      hero: "AESTHETIC",
      heroColor: "#ff71ce",
      primitives: [
        { type: "Grid3D", props: { color: "rgba(255,113,206,0.35)", size: 44 } },
        { type: "Scanline", props: { color: "rgba(255,113,206,0.6)" } },
        { type: "Trail", props: { color: "rgba(255,113,206,0.45)", dotSize: 6, spacing: 30, fadeMs: 900 } },
      ],
    },
  },
  /* ===== 第 2 批: 软/玻璃 ===== */
  {
    slug: "liquid-glass",
    index: "09",
    accent: "#b4dcff",
    name: { en: "Liquid Glass", zh: "液态玻璃" },
    tagline: {
      en: "A liquid blob drifts under the cursor, refracting light.",
      zh: "液态光斑在光标下漂移,折射光线。",
    },
    note: {
      en: "Organic morphing aura — border-radius breathes, scale pulses, like liquid metal.",
      zh: "有机形变光晕——圆角呼吸、缩放脉动,像液态金属。",
    },
    effects: {
      en: ["Liquid morph blob", "Refraction aura", "Glass spotlight"],
      zh: ["液态形变光斑", "折射光晕", "玻璃聚光灯"],
    },
    stage: {
      bg: "radial-gradient(circle at 40% 30%, #142840 0%, #0a1424 80%)",
      fontColor: "#b4dcff",
      fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      hero: "liquid",
      heroColor: "#b4dcff",
      primitives: [
        { type: "Warp", props: { color: "rgba(180,220,255,0.5)", size: 200 } },
        { type: "FollowAura", props: { color: "rgba(180,220,255,0.3)", size: 240, blur: 20, blend: "screen" } },
        { type: "Spotlight", props: { color: "180,220,255", strength: 0.16 } },
      ],
    },
  },
  {
    slug: "claymorphism",
    index: "10",
    accent: "#e8a0c8",
    name: { en: "Claymorphism", zh: "黏土拟态" },
    tagline: {
      en: "Squeeze the clay. Soft, rounded, bouncy.",
      zh: "挤压黏土。柔软、圆润、有弹性。",
    },
    note: {
      en: "Clay UI that squishes under proximity — elastic, chubby, tactile.",
      zh: "黏土界面在靠近时被挤压——弹性、圆润、可触摸。",
    },
    effects: {
      en: ["Clay squish", "Soft press dent", "Magnetic round button"],
      zh: ["黏土挤压", "柔压凹", "磁吸圆按钮"],
    },
    stage: {
      bg: "#f0e4ec",
      fontColor: "#8a6080",
      fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      hero: "clay",
      heroColor: "#c08090",
      primitives: [
        { type: "Squish", props: { className: "absolute left-1/2 top-1/2 h-40 w-56 -translate-x-1/2 -translate-y-1/2" } },
        { type: "PressDent", props: { className: "absolute right-[14%] top-[22%] h-28 w-36" } },
        { type: "MagneticTarget", props: { strength: 0.22, className: "absolute left-[14%] bottom-[20%]" } },
      ],
    },
  },
  /* ===== 第 3 批: 粗野/理性 ===== */
  {
    slug: "brutalist-web",
    index: "11",
    accent: "#e63946",
    name: { en: "Brutalist Web", zh: "粗野主义" },
    tagline: {
      en: "Raw HTML feel. Red ripples break on every move.",
      zh: "原始 HTML 感。红色涟漪随每次移动荡开。",
    },
    note: {
      en: "Classic brutalist — ripples + magnetic link + red spotlight, unpolished on purpose.",
      zh: "经典粗野——涟漪 + 磁吸链接 + 红色聚光灯,刻意不加修饰。",
    },
    effects: {
      en: ["Red ripple waves", "Magnetic text link", "Red spotlight"],
      zh: ["红色涟漪波", "磁吸文字链接", "红色聚光灯"],
    },
    stage: {
      bg: "#0a0a0a",
      fontColor: "#e63946",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      hero: "RAW",
      heroColor: "#e63946",
      primitives: [
        { type: "Ripple", props: { color: "rgba(230,57,70,0.6)", spacing: 55 } },
        { type: "MagneticTarget", props: { strength: 0.26, className: "absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2" } },
        { type: "Spotlight", props: { color: "230,57,70", strength: 0.16 } },
      ],
    },
  },
  {
    slug: "anti-design",
    index: "12",
    accent: "#ccff00",
    name: { en: "Anti-Design", zh: "反设计" },
    tagline: {
      en: "Maximum chaos. Confetti, glitch, everything screaming.",
      zh: "最大化混乱。彩纸、故障,一切都在尖叫。",
    },
    note: {
      en: "Deliberately ugly — confetti spray + RGB split + neon trail, anti-aesthetic.",
      zh: "刻意丑陋——彩纸喷射 + RGB 分裂 + 霓虹轨迹,反美学。",
    },
    effects: {
      en: ["Confetti spray", "RGB glitch split", "Acid green trail"],
      zh: ["彩纸喷射", "RGB 故障分裂", "酸绿轨迹"],
    },
    stage: {
      bg: "repeating-linear-gradient(45deg, #1a1a2a 0 20px, #16213e 20px 40px)",
      fontColor: "#ccff00",
      fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      hero: "UGLY",
      heroColor: "#ccff00",
      primitives: [
        { type: "Confetti", props: { colors: ["#ccff00", "#ff006e", "#00d9ff", "#ff9500", "#ffffff"], spacing: 35 } },
        { type: "GlitchRGB", props: { size: 28 } },
        { type: "Trail", props: { color: "rgba(204,255,0,0.5)", dotSize: 8, spacing: 26, fadeMs: 700 } },
      ],
    },
  },
  {
    slug: "constructivism",
    index: "13",
    accent: "#cc0000",
    name: { en: "Constructivism", zh: "构成主义" },
    tagline: {
      en: "Red emblem spinning. Propaganda geometry in motion.",
      zh: "红色徽章旋转。宣传几何在运动。",
    },
    note: {
      en: "Constructivist constellation — red ring orbits cursor, geometric fragments float like poster elements.",
      zh: "构成主义星座——红色徽章绕光标公转,几何碎片如海报元素漂浮。",
    },
    effects: {
      en: ["Spinning red emblem", "Geometric fragment constellation"],
      zh: ["旋转红徽章", "几何碎片星座"],
    },
    stage: {
      bg: "#f0ead8",
      fontColor: "#cc0000",
      fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      hero: "RED",
      heroColor: "#cc0000",
      primitives: [
        { type: "EmblemSpin", props: { color: "rgba(204,0,0,0.85)", size: 54 } },
        { type: "GeometricFragments", props: { color: "rgba(204,0,0,0.65)", count: 24, stirRadius: 180 } },
      ],
    },
  },
  {
    slug: "swiss-poster",
    index: "14",
    accent: "#1a1a1a",
    name: { en: "Swiss Poster", zh: "瑞士海报" },
    tagline: {
      en: "Grid precision. The layout tilts as you read.",
      zh: "网格精准。版式随你阅读倾斜。",
    },
    note: {
      en: "Swiss rational — a black-yellow grid responds in perspective, restrained and exact.",
      zh: "瑞士理性——黑黄网格以透视响应,克制而精确。",
    },
    effects: {
      en: ["Perspective grid", "Subtle 3D tilt"],
      zh: ["透视网格", "微妙 3D 倾斜"],
    },
    stage: {
      bg: "#f4f1ea",
      fontColor: "#1a1a1a",
      fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      hero: "GRID",
      heroColor: "#1a1a1a",
      primitives: [
        { type: "Grid3D", props: { color: "rgba(26,26,26,0.35)", size: 48 } },
        { type: "Tilt3D", props: { max: 6, className: "absolute right-[12%] top-[20%] h-28 w-44 bg-[#ffcd3c]" } },
      ],
    },
  },
  /* ===== 第 4 批: 艺术 ===== */
  {
    slug: "comic-style",
    index: "15",
    accent: "#ff1f1f",
    name: { en: "Comic Style", zh: "漫画风" },
    tagline: {
      en: "KA-POW! Speed lines burst from the cursor. Halftone impact.",
      zh: "轰!速度线从光标迸发。半调冲击。",
    },
    note: {
      en: "Comic energy — radial speed lines + bold tilt + halftone dots trail.",
      zh: "漫画能量——放射速度线 + 粗壮倾斜 + 半调点轨迹。",
    },
    effects: {
      en: ["Radial speed lines", "Bold 3D tilt", "Halftone dot trail"],
      zh: ["放射速度线", "粗壮 3D 倾斜", "半调点轨迹"],
    },
    stage: {
      bg: "#fff45e",
      fontColor: "#ff1f1f",
      fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      hero: "POW!",
      heroColor: "#ff1f1f",
      primitives: [
        { type: "SpeedLine", props: { color: "rgba(20,20,30,0.7)", spacing: 32, fadeMs: 450 } },
        { type: "Tilt3D", props: { max: 14, className: "absolute right-[12%] top-[20%] h-28 w-44 border-[4px] border-black bg-white" } },
        { type: "Trail", props: { color: "rgba(20,20,30,0.5)", dotSize: 9, spacing: 28, fadeMs: 600 } },
      ],
    },
  },
  {
    slug: "collage-art",
    index: "16",
    accent: "#8a6a3a",
    name: { en: "Collage Art", zh: "拼贴艺术" },
    tagline: {
      en: "Torn paper layers drift at different depths.",
      zh: "撕纸层在不同深度漂移。",
    },
    note: {
      en: "Collage parallax — layered paper scraps shift independently with the cursor.",
      zh: "拼贴视差——层叠纸片随光标各自位移。",
    },
    effects: {
      en: ["Layered paper parallax", "Torn paper depth"],
      zh: ["多层纸片视差", "撕纸深度"],
    },
    stage: {
      bg: "#e8dcc4",
      fontColor: "#5a4520",
      fontFamily: "var(--font-serif), ui-serif, Georgia, serif",
      hero: "torn",
      heroColor: "#5a4520",
      primitives: [
        { type: "PaperLayer", props: { layers: [
          { depth: 22, className: "left-[10%] top-[18%] h-28 w-44 rotate-[-6deg]", color: "#c4a373" },
          { depth: -10, className: "right-[12%] top-[24%] h-32 w-40 rotate-[4deg]", color: "#d9b88a" },
          { depth: 38, className: "left-[40%] bottom-[16%] h-24 w-48 rotate-[2deg]", color: "#8a6a3a" },
        ] } },
      ],
    },
  },
  {
    slug: "acid-graphics",
    index: "17",
    accent: "#caff00",
    name: { en: "Acid Graphics", zh: "酸性图形" },
    tagline: {
      en: "Liquid chrome and acid green. The cursor melts the surface.",
      zh: "液态铬和酸绿。光标熔化表面。",
    },
    note: {
      en: "Acid Y2K — liquid blob morph + RGB split + scanline bleed.",
      zh: "酸性 Y2K——液态光斑形变 + RGB 分裂 + 扫描线溢出。",
    },
    effects: {
      en: ["Liquid chrome blob", "Acid RGB split", "Scanline bleed"],
      zh: ["液态铬光斑", "酸性 RGB 分裂", "扫描线溢出"],
    },
    stage: {
      bg: "radial-gradient(circle at 50% 50%, #1a2a00 0%, #0a0f00 80%)",
      fontColor: "#caff00",
      fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      hero: "ACID",
      heroColor: "#caff00",
      primitives: [
        { type: "Warp", props: { color: "rgba(200,255,0,0.5)", size: 190 } },
        { type: "GlitchRGB", props: { size: 28 } },
        { type: "Scanline", props: { color: "rgba(200,255,0,0.5)" } },
      ],
    },
  },
];

export function getRoomBySlug(slug: string): RoomConfig | undefined {
  return ROOMS.find((r) => r.slug === slug);
}
