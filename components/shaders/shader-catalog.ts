// Shader Lab catalog: every @paper-design/shaders-react background shader
// registered with its presets, parameter metadata, and bilingual copy.
//
// Controls are rendered generically from each preset's `params` object (all
// presets ship `Required<Params>`, so the first preset doubles as the default
// state). The tables below only carry what the generic renderer cannot infer:
// hidden engine params, slider ranges, and segmented-button enums.

import type { ComponentType } from "react";
import type { ShaderComponentProps } from "@paper-design/shaders-react";
import {
  DitheringShapes,
  DitheringTypes,
  DotGridShapes,
  GemSmokeShapes,
  GlassDistortionShapes,
  GlassGridShapes,
  GrainGradientShapes,
  HalftoneCmykTypes,
  HalftoneDotsGrids,
  HalftoneDotsTypes,
  LiquidMetalShapes,
  PulsingBorderAspectRatios,
  WarpPatterns,
} from "@paper-design/shaders";
import {
  ColorPanels,
  colorPanelsPresets,
  Dithering,
  ditheringPresets,
  DotGrid,
  dotGridPresets,
  DotOrbit,
  dotOrbitPresets,
  FlutedGlass,
  flutedGlassPresets,
  GemSmoke,
  gemSmokePresets,
  GodRays,
  godRaysPresets,
  GrainGradient,
  grainGradientPresets,
  HalftoneCmyk,
  halftoneCmykPresets,
  HalftoneDots,
  halftoneDotsPresets,
  Heatmap,
  heatmapPresets,
  ImageDithering,
  imageDitheringPresets,
  LensDistortion,
  lensDistortionPresets,
  LiquidMetal,
  liquidMetalPresets,
  MeshGradient,
  meshGradientPresets,
  Metaballs,
  metaballsPresets,
  NeuroNoise,
  neuroNoisePresets,
  PaperTexture,
  paperTexturePresets,
  PerlinNoise,
  perlinNoisePresets,
  PulsingBorder,
  pulsingBorderPresets,
  SimplexNoise,
  simplexNoisePresets,
  SmokeRing,
  smokeRingPresets,
  Spiral,
  spiralPresets,
  StaticMeshGradient,
  staticMeshGradientPresets,
  StaticRadialGradient,
  staticRadialGradientPresets,
  Swirl,
  swirlPresets,
  Voronoi,
  voronoiPresets,
  Warp,
  warpPresets,
  Water,
  waterPresets,
  Waves,
  wavesPresets,
} from "@paper-design/shaders-react";

export type ShaderParamValue = string | number | boolean | string[];
export type ShaderParams = Record<string, ShaderParamValue | undefined>;
export type AnyShaderComponent = ComponentType<
  ShaderComponentProps & Record<string, unknown>
>;

export type ShaderCategory = "gradient" | "fluid" | "noise" | "pattern" | "optic";

export interface ShaderCatalogEntry {
  id: string;
  nameEn: string;
  nameZh: string;
  descEn: string;
  descZh: string;
  category: ShaderCategory;
  Component: AnyShaderComponent;
  presets: ReadonlyArray<{ name: string; params: ShaderParams }>;
  /** Local demo image passed as the `image` uniform (image-driven shaders). */
  defaultImage?: string;
  /** Extra params hidden from the controls, on top of HIDDEN_PARAMS. */
  hiddenParams?: string[];
  /** Segmented-button options; the param value is one of the object keys. */
  enums?: Record<string, Record<string, string | number>>;
}

export const SHADER_CATEGORIES: Array<{
  id: ShaderCategory;
  nameEn: string;
  nameZh: string;
}> = [
  { id: "gradient", nameEn: "Gradients", nameZh: "渐变" },
  { id: "fluid", nameEn: "Fluid", nameZh: "流体" },
  { id: "noise", nameEn: "Noise", nameZh: "噪声" },
  { id: "pattern", nameEn: "Patterns", nameZh: "图案" },
  { id: "optic", nameEn: "Optics", nameZh: "光学" },
];

// Engine-level params that never belong in the lab controls or the exported
// snippet: canvas transform defaults and the manual frame stepper. `image` is
// handled by the dedicated image picker instead of the generic renderer.
export const HIDDEN_PARAMS = new Set([
  "fit",
  "scale",
  "rotation",
  "originX",
  "originY",
  "offsetX",
  "offsetY",
  "worldWidth",
  "worldHeight",
  "frame",
  "image",
]);

// Slider [min, max, step] for params whose usable range is not 0..1. Params
// missing from this table fall back to 0..1 / 0.01, widened to 0..default*2
// when the preset default exceeds 1 (see lab component).
export const PARAM_RANGES: Record<string, [number, number, number]> = {
  speed: [-2, 2, 0.05],
  angle: [0, 360, 1],
  focalAngle: [0, 360, 1],
  count: [1, 10, 1],
  positions: [2, 10, 1],
  bandCount: [1, 24, 1],
  foldCount: [0, 12, 1],
  spots: [0, 16, 1],
  drops: [0, 30, 1],
  noiseIterations: [1, 8, 1],
  octaveCount: [1, 6, 1],
  colorSteps: [2, 8, 1],
  stepsPerColor: [1, 8, 1],
  seed: [0, 100, 1],
  radius: [0, 2, 0.01],
  midSize: [0, 2, 0.01],
  twist: [-5, 5, 0.05],
  noiseFrequency: [0, 20, 0.1],
  frequency: [0, 20, 0.1],
  size: [0, 2, 0.01],
};

export const DEMO_IMAGES: Array<{ url: string; nameEn: string; nameZh: string }> = [
  { url: "/styles/wabi-sabi.jpg", nameEn: "Wabi-Sabi", nameZh: "侘寂" },
  { url: "/styles/scandinavian.jpg", nameEn: "Scandinavian", nameZh: "北欧" },
  { url: "/placeholder.jpg", nameEn: "Studio", nameZh: "工作室" },
];

const DEFAULT_IMAGE = DEMO_IMAGES[0].url;
const BORDER_MARGINS = ["marginLeft", "marginRight", "marginTop", "marginBottom"];

export const SHADER_CATALOG: ShaderCatalogEntry[] = [
  // === Gradients ===
  {
    id: "mesh-gradient",
    nameEn: "MeshGradient",
    nameZh: "网格渐变",
    descEn: "Multi-point gradient field with organic swirls and film grain.",
    descZh: "多点渐变场,带有机旋涡与胶片颗粒。",
    category: "gradient",
    Component: MeshGradient as unknown as AnyShaderComponent,
    presets: meshGradientPresets,
  },
  {
    id: "static-mesh-gradient",
    nameEn: "StaticMeshGradient",
    nameZh: "静态网格渐变",
    descEn: "Non-animated mesh gradient tuned for hero backgrounds.",
    descZh: "无动画网格渐变,适合 hero 背景。",
    category: "gradient",
    Component: StaticMeshGradient as unknown as AnyShaderComponent,
    presets: staticMeshGradientPresets,
  },
  {
    id: "static-radial-gradient",
    nameEn: "StaticRadialGradient",
    nameZh: "静态径向渐变",
    descEn: "Radial gradient with focal point and falloff control.",
    descZh: "径向渐变,焦点与衰减可控。",
    category: "gradient",
    Component: StaticRadialGradient as unknown as AnyShaderComponent,
    presets: staticRadialGradientPresets,
  },
  {
    id: "grain-gradient",
    nameEn: "GrainGradient",
    nameZh: "颗粒渐变",
    descEn: "Grainy gradient masked by waves, dots, truchet and more.",
    descZh: "带颗粒的渐变,支持波浪/圆点/曲尺等遮罩形状。",
    category: "gradient",
    Component: GrainGradient as unknown as AnyShaderComponent,
    presets: grainGradientPresets,
    enums: { shape: GrainGradientShapes },
  },
  {
    id: "color-panels",
    nameEn: "ColorPanels",
    nameZh: "色块面板",
    descEn: "Angular color panels sliding over each other.",
    descZh: "多角度色块互相滑移。",
    category: "gradient",
    Component: ColorPanels as unknown as AnyShaderComponent,
    presets: colorPanelsPresets,
  },

  // === Fluid ===
  {
    id: "smoke-ring",
    nameEn: "SmokeRing",
    nameZh: "烟圈",
    descEn: "Turbulent smoke ring with a configurable inner cutout.",
    descZh: "湍流烟圈,内孔形状可调。",
    category: "fluid",
    Component: SmokeRing as unknown as AnyShaderComponent,
    presets: smokeRingPresets,
  },
  {
    id: "gem-smoke",
    nameEn: "GemSmoke",
    nameZh: "宝石烟",
    descEn: "Smoke swirling inside a gem-shaped boundary.",
    descZh: "在宝石形状边界内盘旋的烟。",
    category: "fluid",
    Component: GemSmoke as unknown as AnyShaderComponent,
    presets: gemSmokePresets,
    defaultImage: DEFAULT_IMAGE,
    enums: { shape: GemSmokeShapes },
  },
  {
    id: "metaballs",
    nameEn: "Metaballs",
    nameZh: "变形球",
    descEn: "Gooey blob field where color bubbles merge.",
    descZh: "黏连液泡互相融合的场。",
    category: "fluid",
    Component: Metaballs as unknown as AnyShaderComponent,
    presets: metaballsPresets,
  },
  {
    id: "liquid-metal",
    nameEn: "LiquidMetal",
    nameZh: "液态金属",
    descEn: "Chrome-like metallic flow with RGB shift.",
    descZh: "铬金属质感流动,带 RGB 通道偏移。",
    category: "fluid",
    Component: LiquidMetal as unknown as AnyShaderComponent,
    presets: liquidMetalPresets,
    defaultImage: DEFAULT_IMAGE,
    enums: { shape: LiquidMetalShapes },
  },
  {
    id: "water",
    nameEn: "Water",
    nameZh: "水面",
    descEn: "Caustic water surface refracting an image.",
    descZh: "折射图像的焦散水面。",
    category: "fluid",
    Component: Water as unknown as AnyShaderComponent,
    presets: waterPresets,
    defaultImage: DEFAULT_IMAGE,
  },

  // === Noise ===
  {
    id: "simplex-noise",
    nameEn: "SimplexNoise",
    nameZh: "单纯形噪声",
    descEn: "Flowing simplex bands between up to ten colors.",
    descZh: "最多十色之间流动的单纯形色带。",
    category: "noise",
    Component: SimplexNoise as unknown as AnyShaderComponent,
    presets: simplexNoisePresets,
  },
  {
    id: "perlin-noise",
    nameEn: "PerlinNoise",
    nameZh: "柏林噪声",
    descEn: "Classic Perlin fog with octave, persistence and lacunarity.",
    descZh: "经典柏林雾,倍频/持续度/间隙度可调。",
    category: "noise",
    Component: PerlinNoise as unknown as AnyShaderComponent,
    presets: perlinNoisePresets,
  },
  {
    id: "neuro-noise",
    nameEn: "NeuroNoise",
    nameZh: "神经噪声",
    descEn: "Three-tone neural fizz with brightness and contrast.",
    descZh: "三色神经泡沫,亮度对比度可调。",
    category: "noise",
    Component: NeuroNoise as unknown as AnyShaderComponent,
    presets: neuroNoisePresets,
  },
  {
    id: "dithering",
    nameEn: "Dithering",
    nameZh: "抖动",
    descEn: "Ordered dithering drawn as simplex, dots, waves and more.",
    descZh: "有序抖动图案,含单纯形/圆点/波形等形状。",
    category: "noise",
    Component: Dithering as unknown as AnyShaderComponent,
    presets: ditheringPresets,
    enums: { shape: DitheringShapes, type: DitheringTypes },
  },
  {
    id: "image-dithering",
    nameEn: "ImageDithering",
    nameZh: "图像抖动",
    descEn: "Retro ordered dithering applied to an image.",
    descZh: "对图像施加复古有序抖动。",
    category: "noise",
    Component: ImageDithering as unknown as AnyShaderComponent,
    presets: imageDitheringPresets,
    defaultImage: DEFAULT_IMAGE,
    enums: { type: DitheringTypes },
  },
  {
    id: "paper-texture",
    nameEn: "PaperTexture",
    nameZh: "纸张纹理",
    descEn: "Fiber, folds and crumples on a paper base.",
    descZh: "纸张上的纤维、折痕与褶皱。",
    category: "noise",
    Component: PaperTexture as unknown as AnyShaderComponent,
    presets: paperTexturePresets,
    defaultImage: DEFAULT_IMAGE,
  },

  // === Patterns ===
  {
    id: "dot-grid",
    nameEn: "DotGrid",
    nameZh: "点阵网格",
    descEn: "Static dot lattice with shape, gap and stroke control.",
    descZh: "静态点阵,形状/间距/描边可控。",
    category: "pattern",
    Component: DotGrid as unknown as AnyShaderComponent,
    presets: dotGridPresets,
    enums: { shape: DotGridShapes },
  },
  {
    id: "dot-orbit",
    nameEn: "DotOrbit",
    nameZh: "点阵轨道",
    descEn: "Dots orbiting in color bands across a dark field.",
    descZh: "圆点沿色带在暗场上环绕。",
    category: "pattern",
    Component: DotOrbit as unknown as AnyShaderComponent,
    presets: dotOrbitPresets,
  },
  {
    id: "voronoi",
    nameEn: "Voronoi",
    nameZh: "泰森多边形",
    descEn: "Voronoi cells with glow and gap strokes.",
    descZh: "带辉光与缝隙描边的泰森多边形。",
    category: "pattern",
    Component: Voronoi as unknown as AnyShaderComponent,
    presets: voronoiPresets,
  },
  {
    id: "spiral",
    nameEn: "Spiral",
    nameZh: "螺旋",
    descEn: "Line spiral with taper, cap and noise wobble.",
    descZh: "线状螺旋,收尖/端帽/噪声扰动可调。",
    category: "pattern",
    Component: Spiral as unknown as AnyShaderComponent,
    presets: spiralPresets,
  },
  {
    id: "waves",
    nameEn: "Waves",
    nameZh: "波纹",
    descEn: "Layered wave lines as a static composable pattern.",
    descZh: "分层波线,静态可组合图案。",
    category: "pattern",
    Component: Waves as unknown as AnyShaderComponent,
    presets: wavesPresets,
    hiddenParams: ["shape"],
  },
  {
    id: "warp",
    nameEn: "Warp",
    nameZh: "翘曲",
    descEn: "Checks and stripes warped by swirl iterations.",
    descZh: "棋盘/条纹经旋涡迭代翘曲。",
    category: "pattern",
    Component: Warp as unknown as AnyShaderComponent,
    presets: warpPresets,
    enums: { shape: WarpPatterns },
  },
  {
    id: "swirl",
    nameEn: "Swirl",
    nameZh: "旋涡",
    descEn: "Banded swirl field with a movable center.",
    descZh: "条带旋涡,中心可移动。",
    category: "pattern",
    Component: Swirl as unknown as AnyShaderComponent,
    presets: swirlPresets,
  },
  {
    id: "halftone-dots",
    nameEn: "HalftoneDots",
    nameZh: "半调网点",
    descEn: "Print halftone of an image in square or hex grids.",
    descZh: "图像印刷半调,方/六边形网格。",
    category: "pattern",
    Component: HalftoneDots as unknown as AnyShaderComponent,
    presets: halftoneDotsPresets,
    defaultImage: DEFAULT_IMAGE,
    enums: { grid: HalftoneDotsGrids, type: HalftoneDotsTypes },
  },
  {
    id: "halftone-cmyk",
    nameEn: "HalftoneCmyk",
    nameZh: "四色半调",
    descEn: "CMYK print screen with per-plate flood control.",
    descZh: "四色印刷网屏,各色版墨量可控。",
    category: "pattern",
    Component: HalftoneCmyk as unknown as AnyShaderComponent,
    presets: halftoneCmykPresets,
    defaultImage: DEFAULT_IMAGE,
    enums: { type: HalftoneCmykTypes },
  },
  {
    id: "pulsing-border",
    nameEn: "PulsingBorder",
    nameZh: "呼吸边框",
    descEn: "Animated glowing border that breathes around content.",
    descZh: "绕内容呼吸的动画发光边框。",
    category: "pattern",
    Component: PulsingBorder as unknown as AnyShaderComponent,
    presets: pulsingBorderPresets,
    hiddenParams: BORDER_MARGINS,
    enums: { aspectRatio: PulsingBorderAspectRatios },
  },

  // === Optics ===
  {
    id: "god-rays",
    nameEn: "GodRays",
    nameZh: "丁达尔光",
    descEn: "Volumetric light shafts with bloom.",
    descZh: "体积光束,带辉光。",
    category: "optic",
    Component: GodRays as unknown as AnyShaderComponent,
    presets: godRaysPresets,
  },
  {
    id: "lens-distortion",
    nameEn: "LensDistortion",
    nameZh: "镜头畸变",
    descEn: "Anamorphic lens over an image with RGB dispersion.",
    descZh: "变形宽银幕镜头,带 RGB 色散。",
    category: "optic",
    Component: LensDistortion as unknown as AnyShaderComponent,
    presets: lensDistortionPresets,
    defaultImage: DEFAULT_IMAGE,
  },
  {
    id: "fluted-glass",
    nameEn: "FlutedGlass",
    nameZh: "槽纹玻璃",
    descEn: "Reeded glass channels refracting an image.",
    descZh: "竖槽玻璃折射背后的图像。",
    category: "optic",
    Component: FlutedGlass as unknown as AnyShaderComponent,
    presets: flutedGlassPresets,
    defaultImage: DEFAULT_IMAGE,
    hiddenParams: BORDER_MARGINS,
    enums: { shape: GlassDistortionShapes, grid: GlassGridShapes },
  },
  {
    id: "heatmap",
    nameEn: "Heatmap",
    nameZh: "热力图",
    descEn: "Contour heatmap of an image's luminance.",
    descZh: "按图像亮度生成的等值热力图。",
    category: "optic",
    Component: Heatmap as unknown as AnyShaderComponent,
    presets: heatmapPresets,
    defaultImage: DEFAULT_IMAGE,
  },
];

/** Initial params for an entry: first preset (always "Default") + demo image. */
export function getInitialParams(entry: ShaderCatalogEntry): ShaderParams {
  const base = entry.presets[0]?.params ?? {};
  const params: ShaderParams = { ...base };
  if (entry.defaultImage) params.image = entry.defaultImage;
  return params;
}

/** Param keys shown in the controls, in the preset's original order. */
export function getVisibleParamKeys(entry: ShaderCatalogEntry): string[] {
  const hidden = new Set([...HIDDEN_PARAMS, ...(entry.hiddenParams ?? [])]);
  const keys = Object.keys(entry.presets[0]?.params ?? {}).filter(
    (key) => !hidden.has(key)
  );
  // `speed` leads the controls when the shader animates.
  return keys.sort((a, b) => Number(b === "speed") - Number(a === "speed"));
}
