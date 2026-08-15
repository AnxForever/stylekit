import type { CSSProperties } from "react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import {
  Albert_Sans,
  Playfair_Display,
  Fragment_Mono,
  Noto_Serif_SC,
} from "next/font/google";
import { ClientProviders } from "@/components/providers/client-providers";
import { LazyCommandPalette } from "@/components/ui/lazy-command-palette";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ClientScripts } from "@/components/layout/client-scripts";
import { AnnouncementBanner } from "@/components/layout/announcement-banner";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { getSiteBaseUrl } from "@/lib/site-url";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { buildSiteMetadata } from "@/lib/seo/site-metadata";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";
import { getShowcaseTypographyProfile } from "@/lib/typography/showcase-profiles";
import { LazyShowcaseTypographyRuntime } from "@/components/typography/lazy-showcase-typography-runtime";
import { ShowcaseBackBar } from "@/components/showcase/showcase-back-bar";
import { getSiteAnnouncement } from "@/lib/site-announcements";
import "./globals.css";

const publicSans = Albert_Sans({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  display: "swap",
  variable: "--font-public-sans",
});

const publicDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-public-display",
});

const publicMono = Fragment_Mono({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  variable: "--font-public-mono",
});

// Chinese serif companion for Playfair Display headings. Google Fonts serves
// CJK faces as unicode-range slices, so browsers only fetch the glyph blocks
// actually used on the page. preload: false — CJK slice preloading would push
// dozens of <link rel=preload> tags.
const publicDisplayZh = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  preload: false,
  variable: "--font-public-display-zh",
});

const productFontVariables = {
  "--font-body-active":
    '"PingFang SC", "Microsoft YaHei", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  "--font-display-active":
    '"PingFang SC", "Microsoft YaHei", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  "--font-mono-active":
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
} as CSSProperties;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

const BASE_URL = getSiteBaseUrl();
const LOCALE_BOOTSTRAP_SCRIPT = `
(() => {
  try {
    const pathname = window.location.pathname || "/";
    const firstSegment = pathname.split("/")[1];
    const lang = firstSegment === "zh" ? "zh-CN" : "en";
    document.documentElement.lang = lang;
    document.documentElement.dataset.locale = firstSegment === "zh" ? "zh" : "en";
  } catch {}
})();
`;

const DEV_SW_CLEANUP_SCRIPT = `
(() => {
  try {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        void registration.unregister();
      });
    }).catch(() => {});

    if ("caches" in window) {
      caches.keys().then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith("stylekit-"))
          .map((key) => caches.delete(key))
      )).catch(() => {});
    }
  } catch {}
})();
`;

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata(await getRequestLocaleContext());
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, htmlLang, contentPath } = await getRequestLocaleContext();
  const announcement = await getSiteAnnouncement(locale === "zh" ? "zh-CN" : "en");
  const showcaseTypography = getShowcaseTypographyProfile(contentPath);
  const isProductSurface = /^\/(?:admin|admin-login|login|profile|validation|workspace)(?:\/|$)/.test(
    contentPath
  );
  const showcaseFontVariables = showcaseTypography
    ? ({
        "--font-body-active": showcaseTypography.bodyStack,
        "--font-display-active": showcaseTypography.displayStack,
        "--font-mono-active": showcaseTypography.monoStack,
      } as CSSProperties)
    : undefined;
  const routeFontVariables = showcaseFontVariables ??
    (isProductSurface ? productFontVariables : undefined);

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <Script
          id="vibeloft-telemetry"
          strategy="lazyOnload"
          src="https://vibeloft.ai/telemetry/v1.js"
          data-vl-product-id="89414aab-7920-4854-8720-5ef041561792"
          data-vl-auth-key="vl_web.grGnbaTxVblO8tSKoOK8zC-726z3_2htURIvubBSPXM"
        />
        {process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL &&
        process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ? (
          <Script
            id="umami-analytics"
            strategy="afterInteractive"
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        ) : null}
        {showcaseTypography ? (
          <link
            rel="stylesheet"
            href={showcaseTypography.stylesheetUrl}
            data-showcase-font-profile={showcaseTypography.id}
          />
        ) : null}
        <script
          dangerouslySetInnerHTML={{
            __html: LOCALE_BOOTSTRAP_SCRIPT,
          }}
        />
        {process.env.NODE_ENV !== "production" ? (
          <script
            dangerouslySetInnerHTML={{
              __html: DEV_SW_CLEANUP_SCRIPT,
            }}
          />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "@id": `${BASE_URL}/#webapplication`,
              name: "StyleKit",
              description: `Open-source visual style library for AI-generated web interfaces with ${CURATED_STYLE_COUNT} curated styles, design tokens, component recipes, and AI prompts.`,
              url: BASE_URL,
              applicationCategory: "DesignApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                "@id": `${BASE_URL}/#organization`,
                name: "StyleKit",
              },
              isPartOf: {
                "@id": `${BASE_URL}/#website`,
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${BASE_URL}/#organization`,
              "name": "StyleKit",
              "url": BASE_URL,
              "logo": {
                "@type": "ImageObject",
                "url": `${BASE_URL}/icon-512x512.png`,
              },
              "description": `Open-source visual style library for AI-generated web interfaces with ${CURATED_STYLE_COUNT} curated styles, design tokens, and AI prompts.`,
              "sameAs": [
                "https://github.com/AnxForever/stylekit",
                "https://x.com/Justice66890051",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${BASE_URL}/#website`,
              name: "StyleKit",
              url: BASE_URL,
              inLanguage: ["en", "zh-CN"],
              publisher: {
                "@id": `${BASE_URL}/#organization`,
              },
            }),
          }}
        />
      </head>
      <body
        className={`${publicSans.variable} ${publicDisplay.variable} ${publicMono.variable} ${publicDisplayZh.variable} antialiased pb-16 md:pb-0`}
        data-showcase-font={showcaseTypography?.id}
        data-product-font={isProductSurface ? "true" : undefined}
        style={routeFontVariables}
      >
        <ClientProviders initialLocale={locale}>
          <LazyShowcaseTypographyRuntime />
        <AnnouncementBanner announcement={announcement} />
          <LazyCommandPalette />
          {children}
          <ShowcaseBackBar />
          <MobileBottomNav />
          <ScrollToTop />
        </ClientProviders>
        <ClientScripts />
      </body>
    </html>
  );
}
