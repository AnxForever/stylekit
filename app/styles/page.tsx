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

export const metadata: Metadata = {
  title: `Browse ${CURATED_STYLE_COUNT} UI Design Styles & AI Prompts`,
  description:
    `Explore ${CURATED_STYLE_COUNT} curated visual styles with design tokens, component recipes, Tailwind-ready patterns, and AI UI prompt guidance for websites, dashboards, and landing pages.`,
};

export const dynamic = "force-static";

export default function StylesPage() {
  const allStyles = getAllStylesMeta();
  const BASE_URL = getSiteBaseUrl();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: BASE_URL },
    { name: "Styles", url: `${BASE_URL}/styles` },
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
            { label: "Home", href: "/" },
            { label: "Styles" },
          ]}
        />
      </div>
      <main className="flex-1">
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16" />}>
          <StylesContent allStyles={allStyles} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
