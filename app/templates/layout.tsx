import type { Metadata } from "next";
import { TemplateViewTracker } from "@/components/analytics/template-view-tracker";
import { templateCatalog } from "@/lib/templates/catalog";
import { baseTemplateMetadata } from "@/lib/templates/metadata";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { applyRequestMetadata } from "@/lib/i18n/metadata";

const TEMPLATES_WITHOUT_A_PAGE_HEADING = new Set([
  "/templates/crm-frosted-glass",
  "/templates/file-manager",
  "/templates/fitness-health",
  "/templates/kokonutui-dashboard",
  "/templates/learning-course",
]);

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

export default async function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = await getRequestLocaleContext();
  const entry = templateCatalog.find((template) => template.href === context.contentPath);
  const heading = entry && TEMPLATES_WITHOUT_A_PAGE_HEADING.has(context.contentPath)
    ? context.locale === "zh"
      ? entry.name.zh
      : entry.name.en
    : null;

  return (
    <>
      <TemplateViewTracker />
      {heading ? <h1 className="sr-only">{heading}</h1> : null}
      {children}
    </>
  );
}
