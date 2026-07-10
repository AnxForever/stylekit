import type { Metadata, Viewport } from "next";
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
import "./globals.css";

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
  const { locale, htmlLang } = await getRequestLocaleContext();

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
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
              description: `AI-friendly design system with ${CURATED_STYLE_COUNT} curated visual styles, design tokens, component recipes, and AI prompts.`,
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
              "description": `AI-friendly design system with ${CURATED_STYLE_COUNT} curated visual styles, design tokens, and AI prompts.`,
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
      <body className="antialiased pb-16 md:pb-0">
        <ClientProviders initialLocale={locale}>
          <AnnouncementBanner />
          <LazyCommandPalette />
          {children}
          <MobileBottomNav />
          <ScrollToTop />
        </ClientProviders>
        <ClientScripts />
      </body>
    </html>
  );
}
