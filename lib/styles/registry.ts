// Style Registry - Central registration for all design styles

import type { DesignStyle } from "./types";
// 导入所有风格
import { neoBrutalist } from "./neo-brutalist";
import { editorial } from "./editorial";
import { neumorphism } from "./neumorphism";
import { glassmorphism } from "./glassmorphism";
import { bentoGrid } from "./bento-grid";
// 新增风格
import { corporateClean } from "./corporate-clean";
import { minimalistFlat } from "./minimalist-flat";
import { softUI } from "./soft-ui";
import { naturalOrganic } from "./natural-organic";
import { modernGradient } from "./modern-gradient";
import { retroVintage } from "./retro-vintage";
import { darkMode } from "./dark-mode";
import { macosVibrancy } from "./macos-vibrancy";
import { geometricBold } from "./geometric-bold";
// 新增布局风格
import { masonryFlow } from "./masonry-flow";
import { splitScreen } from "./split-screen";
import { fullPageScroll } from "./full-page-scroll";
import { timelineVertical } from "./timeline-vertical";
import { cardStack } from "./card-stack";
import { sidebarFixed } from "./sidebar-fixed";
import { magazineGrid } from "./magazine-grid";
import { heroFullscreen } from "./hero-fullscreen";
// 新增视觉风格
import { claymorphism } from "./claymorphism";
import { notionStyle } from "./notion-style";
import { stripeStyle } from "./stripe-style";
import { appleStyle } from "./apple-style";
import { pixelArt } from "./pixel-art";
// 新增风格 - 批次1
import { vaporwave } from "./vaporwave";
import { y2k } from "./y2k";
import { memphis } from "./memphis";
import { artDeco } from "./art-deco";
import { bauhaus } from "./bauhaus";
// 新增风格 - 批次2
import { skeuomorphism } from "./skeuomorphism";
import { swissStyle } from "./swiss-style";
import { ghibliStyle } from "./ghibli-style";
import { materialDesign } from "./material-design";
import { fluentDesign } from "./fluent-design";
// 新增风格 - 批次3（视觉风格）
import { comicStyle } from "./comic-style";
import { sketchStyle } from "./sketch-style";
import { watercolorStyle } from "./watercolor-style";
// 新增布局风格 - 批次3
import { fPatternLayout } from "./f-pattern-layout";
import { zPatternLayout } from "./z-pattern-layout";
import { holyGrailLayout } from "./holy-grail-layout";
import { dashboardLayout } from "./dashboard-layout";
// Orphaned styles - previously defined but not registered
import { cyberpunkNeon } from "./cyberpunk-neon";
import { synthwave } from "./synthwave";
import { neoBrutalistSoft } from "./neo-brutalist-soft";
import { neoBrutalistPlayful } from "./neo-brutalist-playful";
// New styles - Batch 4
import { artNouveau } from "./art-nouveau";
import { surrealism } from "./surrealism";
import { ukiyoEDigital } from "./ukiyo-e-digital";
import { gothic } from "./gothic";
import { outrun } from "./outrun";
import { darkAcademia } from "./dark-academia";
import { cottagecore } from "./cottagecore";
import { risograph } from "./risograph";
import { mecha } from "./mecha";
import { gothicLolita } from "./gothic-lolita";
import { cyberChinese } from "./cyber-chinese";
// New styles - Batch 5
import { acidGraphics } from "./acid-graphics";
import { handDrawnDoodle } from "./hand-drawn-doodle";
import { swissPoster } from "./swiss-poster";
import { watercolorArt } from "./watercolor-art";
import { impressionistOil } from "./impressionist-oil";
import { immersivePhoto } from "./immersive-photo";
import { collageArt } from "./collage-art";
import { glitchArt } from "./glitch-art";
import { visualNovel } from "./visual-novel";
import { shoujoManga } from "./shoujo-manga";
import { cyberAnime } from "./cyber-anime";
import { pixelAnime } from "./pixel-anime";
import { japaneseFresh } from "./japanese-fresh";
import { neonSamurai } from "./neon-samurai";
import { magicCircle } from "./magic-circle";
import { cyberWafuu } from "./cyber-wafuu";
// New styles - Batch 6
import { steampunk } from "./steampunk";
import { popArt } from "./pop-art";
import { solarpunk } from "./solarpunk";
import { jrpg } from "./jrpg";
import { asymmetricGrid } from "./asymmetric-grid";
import { parallaxSections } from "./parallax-sections";
// New styles - Batch 7
import { warmDashboard } from "./warm-dashboard";
import { neonGradient } from "./neon-gradient";
// New styles - Batch 8
import { liquidGlass } from "./liquid-glass";
// New styles - from style-optimization
import { scandinavian } from "./scandinavian";
import { celShading } from "./cel-shading";
import { cinematicVideoHero } from "./cinematic-video-hero";
import { wabiSabi } from "./wabi-sabi";
import { zenGarden } from "./zen-garden";
// New styles - Batch 9 (Competitive analysis)
import { sciFiHud } from "./sci-fi-hud";
import { scrollytelling } from "./scrollytelling";
import { kawaiiMinimal } from "./kawaii-minimal";
import { kineticConstructivism } from "./kinetic-constructivism";
import { broadcastGlitch } from "./broadcast-glitch";
import { kineticTypography } from "./kinetic-typography";
import { filmNoir } from "./film-noir";
// New styles - Batch 10
import { arcadeCrt } from "./arcade-crt";
import { frutigerAero } from "./frutiger-aero";
// New styles - Anti-Design
import { antiDesign } from "./anti-design";
// New styles - Brutalist Web
import { brutalistWeb } from "./brutalist-web";
// New styles - Batch 11
import { holographic } from "./holographic";
import { generativeArt } from "./generative-art";
import { particle } from "./particle";
import { parallaxEditorial } from "./parallax-editorial";
import { vhsAesthetic } from "./vhs-aesthetic";
// New styles - Terracotta
import { terracotta } from "./terracotta";
// New styles - Monochrome
import { monochrome } from "./monochrome";
// New styles - Ink Wash
import { inkWash } from "./ink-wash";
// New styles - Batch 13
import { midCenturyModern } from "./mid-century-modern";
import { constructivism } from "./constructivism";
import { opArt } from "./op-art";
import { islamicGeometric } from "./islamic-geometric";
import { indianFestive } from "./indian-festive";
import { africanTextile } from "./african-textile";
import { koreanMinimal } from "./korean-minimal";
import { pastelGoth } from "./pastel-goth";
import { maximalism } from "./maximalism";
import { medievalManuscript } from "./medieval-manuscript";
import { graffitiStreet } from "./graffiti-street";
import { marbleLuxury } from "./marble-luxury";
import { victorianBotanical } from "./victorian-botanical";
import { cubism } from "./cubism";
import { tropicalParadise } from "./tropical-paradise";
import { githubStyle } from "./github-style";
import { witchcore } from "./witchcore";
import { neonTokyo } from "./neon-tokyo";
import { paperCraft } from "./paper-craft";
import { blueprint } from "./blueprint";
import { dopamineDesign } from "./dopamine-design";
import { linearStyle } from "./linear-style";
import { shopifyClean } from "./shopify-clean";
import { luxuryRetail } from "./luxury-retail";
import { freshMarket } from "./fresh-market";
import { dataDense } from "./data-dense";
import { oversizedTypography } from "./oversized-typography";
import { developerTerminal } from "./developer-terminal";
import { horizontalGallery } from "./horizontal-gallery";
import { latexPaper } from "./latex-paper";
import { distillStyle } from "./distill-style";
import { studioBold } from "./studio-bold";
import { galleryDark } from "./gallery-dark";
import { warmOrganic } from "./warm-organic";
import { launchKeynote } from "./launch-keynote";
import { luxeLookbook } from "./luxe-lookbook";
import { shaderGradient } from "./shader-gradient";
import { normalizeStyleRules } from "./rule-normalizer";
import { pastelUi } from "./pastel-ui";
import { mobileEditorial } from "./mobile-editorial";
import { softUtility } from "./soft-utility";




// 风格列表
/** Pre-normalization definitions. Tooling that compares the two rule fields
 * must read these: `styles` has aiRules rewritten with the canonical do/dont
 * sections appended, which no longer matches what the author wrote. */
export const rawStyles: DesignStyle[] = [
  neoBrutalist,
  editorial,
  neumorphism,
  glassmorphism,
  bentoGrid,
  // 新增风格
  corporateClean,
  minimalistFlat,
  softUI,
  naturalOrganic,
  modernGradient,
  retroVintage,
  darkMode,
  macosVibrancy,
  geometricBold,
  // 新增布局风格
  masonryFlow,
  splitScreen,
  fullPageScroll,
  timelineVertical,
  cardStack,
  sidebarFixed,
  magazineGrid,
  heroFullscreen,
  // 新增视觉风格
  claymorphism,
  notionStyle,
  stripeStyle,
  appleStyle,
  pixelArt,
  // 新增风格 - 批次1
  vaporwave,
  y2k,
  memphis,
  artDeco,
  bauhaus,
  // 新增风格 - 批次2
  skeuomorphism,
  swissStyle,
  ghibliStyle,
  materialDesign,
  fluentDesign,
  // 新增风格 - 批次3（视觉风格）
  comicStyle,
  sketchStyle,
  watercolorStyle,
  // 新增布局风格 - 批次3
  fPatternLayout,
  zPatternLayout,
  holyGrailLayout,
  dashboardLayout,
  // Previously orphaned styles
  cyberpunkNeon,
  synthwave,
  neoBrutalistSoft,
  neoBrutalistPlayful,
  // New styles - Batch 4
  artNouveau,
  surrealism,
  ukiyoEDigital,
  gothic,
  outrun,
  darkAcademia,
  cottagecore,
  risograph,
  mecha,
  gothicLolita,
  cyberChinese,
  // New styles - Batch 5
  acidGraphics,
  handDrawnDoodle,
  swissPoster,
  watercolorArt,
  impressionistOil,
  immersivePhoto,
  collageArt,
  glitchArt,
  visualNovel,
  shoujoManga,
  cyberAnime,
  pixelAnime,
  japaneseFresh,
  neonSamurai,
  magicCircle,
  cyberWafuu,
  // New styles - Batch 6
  steampunk,
  popArt,
  solarpunk,
  jrpg,
  asymmetricGrid,
  parallaxSections,
  // New styles - Batch 7
  warmDashboard,
  neonGradient,
  // New styles - Batch 8
  liquidGlass,
  // New styles - from style-optimization
  scandinavian,
  celShading,
  cinematicVideoHero,
  wabiSabi,
  zenGarden,
  // New styles - Batch 9 (Competitive analysis)
  sciFiHud,
  scrollytelling,
  kawaiiMinimal,
  kineticConstructivism,
  broadcastGlitch,
  kineticTypography,
  filmNoir,
  // New styles - Batch 10
  arcadeCrt,
  frutigerAero,
  // New styles - Anti-Design
  antiDesign,
  // New styles - Brutalist Web
  brutalistWeb,
  // New styles - Batch 11
  holographic,
  generativeArt,
  particle,
  parallaxEditorial,
  vhsAesthetic,
  // New styles - Terracotta
  terracotta,
  // New styles - Monochrome
  monochrome,
  // New styles - Ink Wash
  inkWash,
  // New styles - Batch 13
  midCenturyModern,
  constructivism,
  opArt,
  islamicGeometric,
  indianFestive,
  africanTextile,
  koreanMinimal,
  pastelGoth,
  maximalism,
  medievalManuscript,
  graffitiStreet,
  marbleLuxury,
  victorianBotanical,
  cubism,
  tropicalParadise,
  githubStyle,
  witchcore,
  neonTokyo,
  paperCraft,
  blueprint,
  // New styles - Batch 14
  dopamineDesign,
  linearStyle,
  // New styles - Batch 15 (Scenario Gap Fill)
  shopifyClean,
  luxuryRetail,
  freshMarket,
  dataDense,
  // New styles - Batch 16 (Portfolio + Academic)
  oversizedTypography,
  developerTerminal,
  horizontalGallery,
  latexPaper,
  distillStyle,
  studioBold,
  galleryDark,
  warmOrganic,
  launchKeynote,
  luxeLookbook,
  shaderGradient,
  pastelUi,
  mobileEditorial,
  softUtility,
];

export const styles: DesignStyle[] = rawStyles.map((style) => normalizeStyleRules(style));

// 根据 slug 获取风格
export function getStyleBySlug(slug: string): DesignStyle | undefined {
  return styles.find((style) => style.slug === slug);
}
