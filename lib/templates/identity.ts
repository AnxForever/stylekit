import { templateCatalog } from "@/lib/templates/catalog";

/**
 * Template identities derived from the catalog, for validating analytics.
 *
 * In-site showcases use the same rule as the source and download APIs
 * (`getTemplateProject`): the catalog id equals the route slug and the entry
 * is not external. Partner projects hosted elsewhere are identified by id.
 */
const showcaseTemplateSlugs = new Set(
  templateCatalog
    .filter(
      (entry) =>
        !entry.external &&
        entry.href === `/templates/${entry.id}` &&
        entry.codePath === `app/templates/${entry.id}/page.tsx`,
    )
    .map((entry) => entry.id),
);

const externalTemplateIds = new Set(
  templateCatalog.filter((entry) => entry.external).map((entry) => entry.id),
);

export function isShowcaseTemplateSlug(slug: string): boolean {
  return showcaseTemplateSlugs.has(slug);
}

export function isExternalTemplateId(id: string): boolean {
  return externalTemplateIds.has(id);
}
