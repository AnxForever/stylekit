import type { Metadata } from "next";
import { ClientProviders } from "@/components/providers/client-providers";
import { LazyCommandPalette } from "@/components/ui/lazy-command-palette";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://stylekit.cc";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "StyleKit - AI-Friendly Design System | 16+ Visual Styles",
    template: "%s | StyleKit",
  },
  description: "AI-friendly design system with 16+ visual styles including Neo-Brutalist, Glassmorphism, Neumorphism. Export design tokens, component recipes, and AI prompts for consistent UI generation.",
  keywords: [
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
    languages: {
      "en-US": `${BASE_URL}/en`,
      "zh-CN": BASE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    url: BASE_URL,
    siteName: "StyleKit",
    title: "StyleKit - AI-Friendly Design System",
    description: "16+ visual styles with design tokens, component recipes, and AI prompts. Make AI-generated UI beautiful and consistent.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "StyleKit - AI-Friendly Design System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StyleKit - AI-Friendly Design System",
    description: "16+ visual styles with design tokens, component recipes, and AI prompts.",
    images: ["/og-image.svg"],
    creator: "@stylekit",
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
    // 添加你的验证码
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "StyleKit",
              description: "AI-friendly design system with 16+ visual styles, design tokens, component recipes, and AI prompts.",
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
      </head>
      <body className="antialiased">
        <ClientProviders>
          <LazyCommandPalette />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
