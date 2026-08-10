import { buildKnowledgeDocuments } from "./extract";
import { loadKnowledgeCatalog, searchKnowledgeCatalog, type KnowledgeSearchHit } from "./catalog";

export interface KnowledgeAdvisorReference {
  id: string;
  name: string;
  summary: string;
  tags: string[];
  sourceUrl: string;
  usagePolicy: "retrieval-only" | "snippet-approved" | "generator-approved" | "distribution-approved";
}

export interface KnowledgeAdvisorContext {
  query: string;
  references: KnowledgeAdvisorReference[];
  retrieved: boolean;
}

export async function retrieveKnowledgeForAdvisor(query: string, limit = 5): Promise<KnowledgeAdvisorContext> {
  const resources = await loadKnowledgeCatalog();
  const hits = searchKnowledgeCatalog(
    resources.filter((resource) => resource.usagePolicy !== "research-only" && resource.usagePolicy !== "revoked"),
    { query, limit },
  );
  return {
    query,
    retrieved: hits.length > 0,
    references: hits.map(toAdvisorReference),
  };
}

export function toAdvisorReference(hit: KnowledgeSearchHit): KnowledgeAdvisorReference {
  const documents = buildKnowledgeDocuments(hit.resource);
  const document = documents.find((item) => item.locale === "en-US");
  return {
    id: hit.resource.id,
    name: hit.resource.nameEn,
    summary: document?.text.split("\n").slice(0, 2).join(" ") ?? hit.resource.knowledge.summaryEn,
    tags: hit.resource.knowledge.tags,
    sourceUrl: hit.resource.sourceUrl,
    usagePolicy: hit.resource.usagePolicy as KnowledgeAdvisorReference["usagePolicy"],
  };
}
