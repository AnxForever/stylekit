const SHARED_SOURCES = [
  "components/home/featured-carousel.tsx",
  "components/home/home-style-card.tsx",
  "components/home/style-card.tsx",
  "components/style-preview-switcher.tsx",
  "components/style-preview/style-cover-preview.tsx",
  "lib/style-components.tsx",
  "lib/style-preview/delivery.ts",
  "lib/style-preview/registry.ts",
  "lib/style-preview/types.ts",
  "lib/styles/meta-registry.ts",
] as const;

// A cover's imported renderer and local image can change its pixels without
// changing its preview module. Pin the liquid-glass dependency chain too.
export const LIQUID_GLASS_PREVIEW_DEPENDENCIES = [
  "components/liquid-glass/liquid-glass.tsx",
  "components/liquid-glass/liquid-glass.module.css",
  "lib/liquid-glass/index.ts",
  "lib/liquid-glass/optics.ts",
  "public/styles/liquid-glass/glacier.webp",
] as const;

export function approvedPreviewSourcePaths(slugs: readonly string[]): string[] {
  return [...new Set([
    ...SHARED_SOURCES,
    ...slugs.map((slug) => `lib/style-preview/styles/${slug}.tsx`),
    ...(slugs.includes("liquid-glass") ? LIQUID_GLASS_PREVIEW_DEPENDENCIES : []),
  ])].sort();
}
