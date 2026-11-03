/** Change the versioned paths when the public identity changes, including favicons. */
export const BRAND_ASSETS = {
  logo: "/brand/v3/stylekit-horizontal-ink.svg",
  logoInverse: "/brand/v3/stylekit-horizontal-white.svg",
  favicon: "/brand/v3/favicon.ico",
  icon: "/brand/v3/icon.svg",
  icon16: "/brand/v3/favicon-16x16.png",
  icon32: "/brand/v3/favicon-32x32.png",
  icon512: "/brand/v3/icon-512x512.png",
  appleTouchIcon: "/brand/v3/apple-touch-icon.png",
  manifest: "/brand/v3/manifest.webmanifest",
  socialPreview: "/brand/v3/social-preview.png",
} as const;

export const BRAND_SOCIAL_CREATOR = "@Justice66890051";

/** Version page-specific images as well as the shared social card. */
export function brandPreviewUrl(path: string): string {
  return `${path}${path.includes("?") ? "&" : "?"}v=brand-v3`;
}
