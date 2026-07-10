import type { Metadata } from "next";
import { TemplateViewTracker } from "@/components/analytics/template-view-tracker";
import { templateCatalog } from "@/lib/templates/catalog";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { applyRequestMetadata } from "@/lib/i18n/metadata";

export const baseTemplateMetadata: Metadata = {
  title: "Page Templates",
  description:
    "30+ complete page templates for SaaS landing, admin panel, e-commerce, portfolio, blog, dashboard, auth, and more. Preview and export page source with one click.",
};

export async function generateMetadata(): Promise<Metadata> {
  const context = await getRequestLocaleContext();
  const entry = templateCatalog.find((template) => template.href === context.contentPath);
  const localized = entry
    ? {
        ...baseTemplateMetadata,
        title: context.locale === "zh" ? entry.name.zh : entry.name.en,
        description:
          context.locale === "zh" ? entry.description.zh : entry.description.en,
      }
    : baseTemplateMetadata;

  return applyRequestMetadata(localized, context);
}

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TemplateViewTracker />
      {children}
    </>
  );
}
