/**
 * Style Mapping Utilities
 *
 * Shared functions for mapping style recommendations to style slugs.
 * Used by both the API generate endpoint and the MCP server.
 */

/**
 * Map a style recommendation name to an actual style slug.
 *
 * @param stylePriority - Style name from knowledge base (e.g. "Minimalism", "Corporate")
 * @param colorScheme - Color scheme preference ("light" | "dark" | "auto")
 * @returns A valid style slug
 */
export function mapStyleToSlug(
  stylePriority: string,
  colorScheme: string = "auto"
): string {
  const normalized = stylePriority.toLowerCase();

  const map: Record<string, string> = {
    // Direct style matches
    minimalism: "minimalist-flat",
    corporate: "corporate-clean",
    "neo-brutalism": "neo-brutalist",
    neumorphism: "neumorphism",
    glassmorphism: "glassmorphism",
    editorial: "editorial",
    claymorphism: "claymorphism",
    skeuomorphism: "skeuomorphism",
    // Mood / intent matches
    modern: colorScheme === "dark" ? "dark-mode" : "corporate-clean",
    playful: "neo-brutalist-playful",
    futuristic: "cyberpunk-neon",
    organic: "natural-organic",
    gradient: "modern-gradient",
    retro: "retro-vintage",
    dark: "dark-mode",
    bold: "geometric-bold",
    soft: "soft-ui",
    bento: "bento-grid",
    // Category matches
    elegant: "editorial",
    luxury: "art-deco",
    cute: "kawaii-minimal",
    kawaii: "kawaii-minimal",
    "sci-fi": "sci-fi-hud",
    scifi: "sci-fi-hud",
    gothic: "gothic",
    anime: "cyber-anime",
    manga: "shoujo-manga",
    pixel: "pixel-art",
    gaming: "jrpg",
    steampunk: "steampunk",
    cyberpunk: "cyberpunk-neon",
    vaporwave: "vaporwave",
    synthwave: "synthwave",
    // Art style matches
    watercolor: "watercolor-style",
    sketch: "sketch-style",
    comic: "comic-style",
    doodle: "hand-drawn-doodle",
    collage: "collage-art",
    "ink-wash": "ink-wash",
    ink: "ink-wash",
    // Design system matches
    material: "material-design",
    fluent: "fluent-design",
    apple: "apple-style",
    notion: "notion-style",
    stripe: "stripe-style",
    // Cultural matches
    japanese: "japanese-fresh",
    zen: "zen-garden",
    nordic: "scandinavian",
    scandinavian: "scandinavian",
    "wabi-sabi": "wabi-sabi",
    mediterranean: "terracotta",
    chinese: "cyber-chinese",
    // Mood matches
    warm: "warm-dashboard",
    minimal: "minimalist-flat",
    clean: "corporate-clean",
    professional: "corporate-clean",
    creative: "geometric-bold",
    artistic: "watercolor-art",
    mysterious: "gothic",
    romantic: "cottagecore",
    academic: "dark-academia",
    brutalist: "brutalist-web",
    glitch: "glitch-art",
    neon: "neon-gradient",
    holographic: "holographic",
    monochrome: "monochrome",
    // Batch 13 mappings
    "mid-century": "mid-century-modern",
    atomic: "mid-century-modern",
    "50s": "mid-century-modern",
    constructivist: "constructivism",
    soviet: "constructivism",
    propaganda: "constructivism",
    "op-art": "op-art",
    optical: "op-art",
    islamic: "islamic-geometric",
    arabic: "islamic-geometric",
    tessellation: "islamic-geometric",
    indian: "indian-festive",
    bollywood: "indian-festive",
    diwali: "indian-festive",
    mandala: "indian-festive",
    african: "african-textile",
    kente: "african-textile",
    tribal: "african-textile",
    korean: "korean-minimal",
    "k-beauty": "korean-minimal",
    "pastel-goth": "pastel-goth",
    maximalist: "maximalism",
    ornate: "maximalism",
    medieval: "medieval-manuscript",
    manuscript: "medieval-manuscript",
    illuminated: "medieval-manuscript",
    graffiti: "graffiti-street",
    "street-art": "graffiti-street",
    spray: "graffiti-street",
    marble: "marble-luxury",
    "marble-luxury": "marble-luxury",
    victorian: "victorian-botanical",
    botanical: "victorian-botanical",
    cubist: "cubism",
    tropical: "tropical-paradise",
    paradise: "tropical-paradise",
    github: "github-style",
    witch: "witchcore",
    mystical: "witchcore",
    tarot: "witchcore",
    tokyo: "neon-tokyo",
    "paper-craft": "paper-craft",
    origami: "paper-craft",
    blueprint: "blueprint",
    technical: "blueprint",
    engineering: "blueprint",
  };

  return map[normalized] || "corporate-clean";
}

/**
 * Determine if a style slug implies a dark color scheme.
 */
export function isDarkStyle(slug: string): boolean {
  const darkSlugs = new Set([
    "dark-mode", "cyberpunk-neon", "dark-academia", "gothic",
    "gothic-lolita", "outrun", "synthwave", "vaporwave",
    "arcade-crt", "vhs-aesthetic", "sci-fi-hud", "neon-gradient",
    "cyber-anime", "cyber-chinese", "cyber-wafuu", "neon-samurai",
    "magic-circle", "mecha", "glitch-art", "acid-graphics",
    "particle", "generative-art", "holographic",
    "pastel-goth", "graffiti-street", "neon-tokyo", "witchcore",
    "african-textile",
  ]);
  return darkSlugs.has(slug) || slug.includes("dark") || slug.includes("cyberpunk");
}

/**
 * Resolve effective color scheme based on style and user preference.
 */
export function resolveColorScheme(
  colorScheme: string,
  styleSlug: string
): "light" | "dark" {
  if (colorScheme === "auto") {
    return isDarkStyle(styleSlug) ? "dark" : "light";
  }
  return colorScheme as "light" | "dark";
}
