import SiteDocument, { generateSiteMetadata } from "@/components/layout/site-document";
export { viewport } from "@/components/layout/site-document";
import type { Metadata } from "next";
import { TemplateViewTracker } from "@/components/analytics/template-view-tracker";
import { baseTemplateMetadata } from "@/lib/templates/metadata";
import {
  addTemplateDemoBoundary,
  findTemplateEntryForPath,
} from "@/lib/templates/demo-boundary";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { applyRequestMetadata } from "@/lib/i18n/metadata";
import { TemplateDemoNotice } from "@/components/templates/template-demo-notice";

const TEMPLATES_WITHOUT_A_PAGE_HEADING = new Set([
  "/templates/crm-frosted-glass",
  "/templates/file-manager",
  "/templates/fitness-health",
  "/templates/kokonutui-dashboard",
  "/templates/learning-course",
]);

export async function generateMetadata(): Promise<Metadata> {
  const context = await getRequestLocaleContext();
  const entry = findTemplateEntryForPath(context.contentPath);
  const localized = entry
    ? {
        ...baseTemplateMetadata,
        title: context.locale === "zh" ? entry.name.zh : entry.name.en,
        description:
          context.locale === "zh" ? entry.description.zh : entry.description.en,
      }
    : baseTemplateMetadata;

  const metadata = {
    ...await generateSiteMetadata(),
    ...applyRequestMetadata(localized, context),
  };

  return entry ? addTemplateDemoBoundary(metadata, context.locale) : metadata;
}

export default async function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = await getRequestLocaleContext();
  const entry = findTemplateEntryForPath(context.contentPath);
  const heading = entry && TEMPLATES_WITHOUT_A_PAGE_HEADING.has(context.contentPath)
    ? context.locale === "zh"
      ? entry.name.zh
      : entry.name.en
    : null;

  return (
    <SiteDocument>
      <TemplateViewTracker />
      {heading ? <h1 className="sr-only">{heading}</h1> : null}
      {entry ? <TemplateDemoNotice locale={context.locale} /> : null}
      {entry ? (
        <div className="contents" data-nosnippet>
          {children}
        </div>
      ) : children}
    </SiteDocument>
  );
}
