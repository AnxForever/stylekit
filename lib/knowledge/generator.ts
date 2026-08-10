import { isGeneratorApprovedResource, type KnowledgeResource } from "./schema";
import { loadKnowledgeCatalog, searchKnowledgeCatalog } from "./catalog";
import { toAdvisorReference, type KnowledgeAdvisorReference } from "./retrieval";

export function selectGeneratorKnowledge(
  resources: KnowledgeResource[],
  query: string,
  limit = 5,
): KnowledgeAdvisorReference[] {
  const eligible = resources.filter((resource) =>
    isGeneratorApprovedResource(resource)
    && resource.reviewStatus === "approved"
    && resource.publicationStatus === "published"
    && resource.license.commercialUse
    && resource.license.modificationAllowed
    && resource.license.redistributionAllowed
    && Boolean(resource.contentHash),
  );
  return searchKnowledgeCatalog(eligible, { query, limit }).map(toAdvisorReference);
}

export async function retrieveGeneratorKnowledge(query: string, limit = 5): Promise<KnowledgeAdvisorReference[]> {
  return selectGeneratorKnowledge(await loadKnowledgeCatalog(), query, limit);
}
