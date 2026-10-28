import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StylesContent } from "@/components/styles/styles-content";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { generateBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";
import { getSiteBaseUrl } from "@/lib/site-url";
import { DesignWorkflowLinks } from "@/components/seo/design-workflow-links";
import { isLocale, localizeHref } from "@/lib/i18n/routing";

export const metadata: Metadata = {
  title: `Browse ${CURATED_STYLE_COUNT} UI Design Styles & AI Prompts`,
  description:
    `Explore ${CURATED_STYLE_COUNT} curated visual styles with design tokens, component recipes, Tailwind-ready patterns, and AI UI prompt guidance for websites and dashboards.`,
  openGraph: {
    title: `Browse ${CURATED_STYLE_COUNT} UI Design Styles & AI Prompts | StyleKit`,
    description: `Explore ${CURATED_STYLE_COUNT} curated visual styles with design tokens, component recipes, and AI UI prompts.`,
    siteName: "StyleKit",
    images: [{ url: "/social-preview-home-v2.png", width: 1200, height: 630 }],
    type: "website",
  },
};

export const dynamic = "force-static";

export default async function StylesPage({ params }: { params?: Promise<{ locale?: string }> }) {
  const routeParams = await params;
  const locale = isLocale(routeParams?.locale) ? routeParams.locale : "en";
  const allStyles = getAllStylesMeta();
  const BASE_URL = getSiteBaseUrl();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: locale === "zh" ? "首页" : "Home", url: `${BASE_URL}${localizeHref("/", locale)}` },
    { name: locale === "zh" ? "风格库" : "Styles", url: `${BASE_URL}${localizeHref("/styles", locale)}` },
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <Header />
      <div className="container mx-auto px-4 pt-4">
        <Breadcrumb
          items={[
            { label: locale === "zh" ? "首页" : "Home", href: localizeHref("/", locale) },
            { label: locale === "zh" ? "风格库" : "Styles" },
          ]}
        />
      </div>
      <main className="flex-1">
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16" />}>
          <StylesContent allStyles={allStyles} />
        </Suspense>
        <DesignWorkflowLinks locale={locale} />
      </main>
      <Footer />
    </div>
  );
}
