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

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "StyleKit - UI Design Prompts, Visual Styles & AI-Friendly Design System",
    template: "%s | StyleKit",
  },
  description: "UI design prompt library and AI-friendly design system with 120+ visual styles. Export design tokens, component recipes, Tailwind-ready patterns, and AI prompts for consistent website UI generation.",
  keywords: [
    "UI design prompts",
    "web design prompts",
    "website design prompts",
    "AI UI prompt library",
    "design system",
    "UI components",
    "Tailwind CSS",
    "Neo-Brutalist",
    "Glassmorphism",
    "Neumorphism",
    "AI coding",
    "design tokens",
    "React components",
    "v0 prompts",
    "shadcn/ui",
    "web design",
  ],
  authors: [{ name: "StyleKit Team", url: BASE_URL }],
  creator: "StyleKit",
  publisher: "StyleKit",
  formatDetection: {
    email: false,
    telephone: false,
  },
  alternates: {
    canonical: BASE_URL,
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "StyleKit Blog" },
        { url: "/feed/styles.xml", title: "StyleKit - New Styles" },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "StyleKit",
    title: "StyleKit - UI Design Prompts, Visual Styles & AI-Friendly Design System",
    description: "120+ visual styles with design tokens, component recipes, Tailwind-ready patterns, and AI prompts for beautiful, consistent website UI.",
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "StyleKit - AI-Friendly Design System",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StyleKit - UI Design Prompts, Visual Styles & AI-Friendly Design System",
    description: "120+ visual styles with design tokens, component recipes, Tailwind-ready patterns, and AI prompts.",
    creator: "@stylekit",
    images: [`${BASE_URL}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "2f16e5aff2dd3b60",
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION || "",
    },
  },
  category: "technology",
};

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
              name: "StyleKit",
              description: "AI-friendly design system with 120+ visual styles, design tokens, component recipes, and AI prompts.",
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
                name: "StyleKit Team",
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
              "name": "StyleKit",
              "url": BASE_URL,
              "logo": `${BASE_URL}/icon.svg`,
              "description": "AI-friendly design system with 120+ visual styles, design tokens, and AI prompts.",
              "sameAs": [
                "https://github.com/AnxForever/stylekit",
                "https://x.com/stylekit",
              ],
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
