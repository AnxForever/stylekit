const LIVE_COVER_PREVIEW_SLUGS = new Set([
  "liquid-glass",
  "neo-brutalist",
  "editorial",
  "neumorphism",
  "glassmorphism",
  "bento-grid",
]);

export function shouldUseLiveCoverPreview(slug: string): boolean {
  return LIVE_COVER_PREVIEW_SLUGS.has(slug);
}
