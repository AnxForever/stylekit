// Style Tokens Registry
// Maps style slugs to their token definitions

import type { StyleTokens } from "./tokens";
import { neoBrutalistTokens } from "./neo-brutalist-tokens";
import { editorialTokens } from "./editorial-tokens";
import { neumorphismTokens } from "./neumorphism-tokens";
import { glassmorphismTokens } from "./glassmorphism-tokens";
import { bentoGridTokens } from "./bento-grid-tokens";
// New style tokens
import { corporateCleanTokens } from "./corporate-clean-tokens";
import { cyberpunkNeonTokens } from "./cyberpunk-neon-tokens";
import { darkModeTokens } from "./dark-mode-tokens";
import { softUITokens } from "./soft-ui-tokens";
import { modernGradientTokens } from "./modern-gradient-tokens";
import { naturalOrganicTokens } from "./natural-organic-tokens";
// New visual style tokens
import { claymorphismTokens } from "./claymorphism-tokens";
import { notionStyleTokens } from "./notion-style-tokens";
import { stripeStyleTokens } from "./stripe-style-tokens";
import { appleStyleTokens } from "./apple-style-tokens";
import { pixelArtTokens } from "./pixel-art-tokens";
// Batch 1 visual style tokens
import { vaporwaveTokens } from "./vaporwave-tokens";
import { y2kTokens } from "./y2k-tokens";
import { memphisTokens } from "./memphis-tokens";
import { artDecoTokens } from "./art-deco-tokens";
import { bauhausTokens } from "./bauhaus-tokens";
// Batch 2 visual style tokens
import { skeuomorphismTokens } from "./skeuomorphism-tokens";
import { swissStyleTokens } from "./swiss-style-tokens";
import { ghibliStyleTokens } from "./ghibli-style-tokens";
import { materialDesignTokens } from "./material-design-tokens";
import { fluentDesignTokens } from "./fluent-design-tokens";
// Batch 3 visual style tokens
import { comicStyleTokens } from "./comic-style-tokens";
import { sketchStyleTokens } from "./sketch-style-tokens";
import { watercolorStyleTokens } from "./watercolor-style-tokens";
import { synthwaveTokens } from "./synthwave-tokens";
// Layout style tokens
import { masonryFlowTokens } from "./masonry-flow-tokens";
import { splitScreenTokens } from "./split-screen-tokens";
import { fullPageScrollTokens } from "./full-page-scroll-tokens";
import { timelineVerticalTokens } from "./timeline-vertical-tokens";
import { cardStackTokens } from "./card-stack-tokens";
import { sidebarFixedTokens } from "./sidebar-fixed-tokens";
import { magazineGridTokens } from "./magazine-grid-tokens";
import { heroFullscreenTokens } from "./hero-fullscreen-tokens";
import { fPatternLayoutTokens } from "./f-pattern-layout-tokens";
import { zPatternLayoutTokens } from "./z-pattern-layout-tokens";
import { holyGrailLayoutTokens } from "./holy-grail-layout-tokens";
import { dashboardLayoutTokens } from "./dashboard-layout-tokens";
// Dedicated tokens for variant styles
import { geometricBoldTokens } from "./geometric-bold-tokens";
import { minimalistFlatTokens } from "./minimalist-flat-tokens";
import { neoBrutalistPlayfulTokens } from "./neo-brutalist-playful-tokens";
import { neoBrutalistSoftTokens } from "./neo-brutalist-soft-tokens";
import { retroVintageTokens } from "./retro-vintage-tokens";
// New styles - Batch 4
import { artNouveauTokens } from "./art-nouveau-tokens";
import { surrealismTokens } from "./surrealism-tokens";
import { ukiyoEDigitalTokens } from "./ukiyo-e-digital-tokens";
import { gothicTokens } from "./gothic-tokens";
import { outrunTokens } from "./outrun-tokens";
import { darkAcademiaTokens } from "./dark-academia-tokens";
import { cottagecoreTokens } from "./cottagecore-tokens";
import { risographTokens } from "./risograph-tokens";
import { mechaTokens } from "./mecha-tokens";
import { gothicLolitaTokens } from "./gothic-lolita-tokens";
import { cyberChineseTokens } from "./cyber-chinese-tokens";
// New styles - Batch 5
import { acidGraphicsTokens } from "./acid-graphics-tokens";
import { handDrawnDoodleTokens } from "./hand-drawn-doodle-tokens";
import { swissPosterTokens } from "./swiss-poster-tokens";
import { watercolorArtTokens } from "./watercolor-art-tokens";
import { impressionistOilTokens } from "./impressionist-oil-tokens";
import { collageArtTokens } from "./collage-art-tokens";
import { glitchArtTokens } from "./glitch-art-tokens";
import { visualNovelTokens } from "./visual-novel-tokens";
import { shoujoMangaTokens } from "./shoujo-manga-tokens";
import { cyberAnimeTokens } from "./cyber-anime-tokens";
import { pixelAnimeTokens } from "./pixel-anime-tokens";
import { japaneseFreshTokens } from "./japanese-fresh-tokens";
import { neonSamuraiTokens } from "./neon-samurai-tokens";
import { magicCircleTokens } from "./magic-circle-tokens";
import { cyberWafuuTokens } from "./cyber-wafuu-tokens";
// New styles - Batch 6
import { steampunkTokens } from "./steampunk-tokens";
import { popArtTokens } from "./pop-art-tokens";
import { solarpunkTokens } from "./solarpunk-tokens";
import { jrpgTokens } from "./jrpg-tokens";
import { asymmetricGridTokens } from "./asymmetric-grid-tokens";
import { parallaxSectionsTokens } from "./parallax-sections-tokens";

// Registry of all style tokens
export const styleTokensRegistry: Record<string, StyleTokens> = {
  "neo-brutalist": neoBrutalistTokens,
  "neo-brutalist-soft": neoBrutalistSoftTokens,
  "neo-brutalist-playful": neoBrutalistPlayfulTokens,
  "editorial": editorialTokens,
  "neumorphism": neumorphismTokens,
  "glassmorphism": glassmorphismTokens,
  "bento-grid": bentoGridTokens,
  // New styles
  "corporate-clean": corporateCleanTokens,
  "minimalist-flat": minimalistFlatTokens,
  "soft-ui": softUITokens,
  "cyberpunk-neon": cyberpunkNeonTokens,
  "natural-organic": naturalOrganicTokens,
  "modern-gradient": modernGradientTokens,
  "retro-vintage": retroVintageTokens,
  "dark-mode": darkModeTokens,
  "geometric-bold": geometricBoldTokens,
  // New visual styles
  "claymorphism": claymorphismTokens,
  "notion-style": notionStyleTokens,
  "stripe-style": stripeStyleTokens,
  "apple-style": appleStyleTokens,
  "pixel-art": pixelArtTokens,
  // Batch 1 visual style tokens
  "vaporwave": vaporwaveTokens,
  "y2k": y2kTokens,
  "memphis": memphisTokens,
  "art-deco": artDecoTokens,
  "bauhaus": bauhausTokens,
  // Batch 2 visual style tokens
  "skeuomorphism": skeuomorphismTokens,
  "swiss-style": swissStyleTokens,
  "ghibli-style": ghibliStyleTokens,
  "material-design": materialDesignTokens,
  "fluent-design": fluentDesignTokens,
  // Batch 3 visual style tokens
  "comic-style": comicStyleTokens,
  "sketch-style": sketchStyleTokens,
  "watercolor-style": watercolorStyleTokens,
  "synthwave": synthwaveTokens,
  // Layout style tokens
  "masonry-flow": masonryFlowTokens,
  "split-screen": splitScreenTokens,
  "full-page-scroll": fullPageScrollTokens,
  "timeline-vertical": timelineVerticalTokens,
  "card-stack": cardStackTokens,
  "sidebar-fixed": sidebarFixedTokens,
  "magazine-grid": magazineGridTokens,
  "hero-fullscreen": heroFullscreenTokens,
  "f-pattern-layout": fPatternLayoutTokens,
  "z-pattern-layout": zPatternLayoutTokens,
  "holy-grail-layout": holyGrailLayoutTokens,
  "dashboard-layout": dashboardLayoutTokens,
  // New styles - Batch 4
  "art-nouveau": artNouveauTokens,
  "surrealism": surrealismTokens,
  "ukiyo-e-digital": ukiyoEDigitalTokens,
  "gothic": gothicTokens,
  "outrun": outrunTokens,
  "dark-academia": darkAcademiaTokens,
  "cottagecore": cottagecoreTokens,
  "risograph": risographTokens,
  "mecha": mechaTokens,
  "gothic-lolita": gothicLolitaTokens,
  "cyber-chinese": cyberChineseTokens,
  // New styles - Batch 5
  "acid-graphics": acidGraphicsTokens,
  "hand-drawn-doodle": handDrawnDoodleTokens,
  "swiss-poster": swissPosterTokens,
  "watercolor-art": watercolorArtTokens,
  "impressionist-oil": impressionistOilTokens,
  "collage-art": collageArtTokens,
  "glitch-art": glitchArtTokens,
  "visual-novel": visualNovelTokens,
  "shoujo-manga": shoujoMangaTokens,
  "cyber-anime": cyberAnimeTokens,
  "pixel-anime": pixelAnimeTokens,
  "japanese-fresh": japaneseFreshTokens,
  "neon-samurai": neonSamuraiTokens,
  "magic-circle": magicCircleTokens,
  "cyber-wafuu": cyberWafuuTokens,
  // New styles - Batch 6
  "steampunk": steampunkTokens,
  "pop-art": popArtTokens,
  "solarpunk": solarpunkTokens,
  "jrpg": jrpgTokens,
  "asymmetric-grid": asymmetricGridTokens,
  "parallax-sections": parallaxSectionsTokens,
};

// Get tokens for a style by slug
export function getStyleTokens(slug: string): StyleTokens | undefined {
  return styleTokensRegistry[slug];
}

// Check if a style has tokens defined
export function hasStyleTokens(slug: string): boolean {
  return slug in styleTokensRegistry;
}
