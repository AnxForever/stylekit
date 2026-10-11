import type { Metadata } from "next";
import { BRAND_ASSETS, BRAND_SOCIAL_CREATOR } from "@/lib/brand/assets";

// A child route replaces nested metadata in Next. Keep its title and image
// together instead of accidentally inheriting the homepage's Twitter card.
export function withBrandPreviews(metadata: Metadata): Metadata {
  const images = metadata.openGraph?.images ?? [{
    url: BRAND_ASSETS.socialPreview,
    width: 1200,
    height: 630,
    alt: "StyleKit — visual styles, design tokens, components, and AI prompts",
  }];
  return {
    ...metadata,
    openGraph: { siteName: "StyleKit", ...metadata.openGraph, images },
    twitter: {
      card: "summary_large_image",
      creator: BRAND_SOCIAL_CREATOR,
      title: metadata.openGraph?.title ?? metadata.title ?? undefined,
      description: metadata.openGraph?.description ?? metadata.description ?? undefined,
      ...metadata.twitter,
      images: metadata.twitter?.images ?? images,
    },
  };
}
