import { generateSiteMetadata } from "@/components/layout/site-document";

export { default, viewport } from "@/components/layout/legacy-root-layout";

/**
 * These routes are prototypes kept online for reference; they are not pages of
 * the product, are not linked from anywhere and are absent from the sitemap.
 * They still inherit the site's indexable metadata, so they are excluded from
 * search explicitly. They stay crawlable on purpose: a Disallow rule in
 * robots.txt would stop a crawler before it could read this directive, the same
 * reasoning the public login and submit routes follow.
 */
export async function generateMetadata() {
  const metadata = await generateSiteMetadata();
  return { ...metadata, robots: { index: false, follow: false } };
}
