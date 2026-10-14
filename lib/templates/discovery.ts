import type { TemplateCatalogEntry, TemplateCatalogType } from "./catalog";

export type TemplateTypeFilter = TemplateCatalogType | "all" | "pricing";

export function getTemplateTypes(template: TemplateCatalogEntry): TemplateCatalogType[] {
  return [...new Set([template.type, ...(template.additionalTypes ?? [])])];
}

export function matchesTemplateType(
  template: TemplateCatalogEntry,
  type: TemplateTypeFilter
): boolean {
  if (type === "all") return true;
  if (type === "pricing") return template.id === "pricing-page";
  return getTemplateTypes(template).includes(type);
}

export function getTemplateTypeScenarios<Scenario extends string>(
  template: TemplateCatalogEntry,
  scenarioByType: Partial<Record<TemplateCatalogType, Scenario>>
): Scenario[] {
  return [
    ...new Set(
      getTemplateTypes(template)
        .map((type) => scenarioByType[type])
        .filter((scenario): scenario is Scenario => Boolean(scenario))
    ),
  ];
}

export function getTemplateSearchText(
  template: TemplateCatalogEntry,
  extraTerms: string[] = []
): string {
  const localizedFeatures = template.external?.features
    ? Object.values(template.external.features).flat()
    : [];

  return [
    template.id,
    template.href,
    template.name.zh,
    template.name.en,
    template.description.zh,
    template.description.en,
    template.type,
    ...(template.additionalTypes ?? []),
    ...(template.keywords ?? []),
    ...extraTerms,
    template.external?.repoUrl,
    template.external?.siteUrl,
    template.external?.stack,
    template.external?.license?.label,
    ...localizedFeatures,
  ]
    .filter((term): term is string => Boolean(term))
    .join(" ")
    .toLowerCase();
}

export function matchesTemplateSearch(
  template: TemplateCatalogEntry,
  query: string,
  extraTerms: string[] = []
): boolean {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;
  return getTemplateSearchText(template, extraTerms).includes(normalizedQuery);
}
