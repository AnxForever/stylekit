import type { KnowledgeResource } from "./schema";

export interface KnowledgeDocument {
  schemaVersion: "knowledge-document-v1";
  resourceId: string;
  locale: "zh-CN" | "en-US";
  title: string;
  text: string;
  tags: string[];
  sourceUrl: string;
  usagePolicy: KnowledgeResource["usagePolicy"];
}

export function buildKnowledgeDocuments(resource: KnowledgeResource): KnowledgeDocument[] {
  const base = {
    schemaVersion: "knowledge-document-v1" as const,
    resourceId: resource.id,
    tags: [...new Set([...resource.knowledge.tags, ...resource.knowledge.extractedTopics])],
    sourceUrl: resource.sourceUrl,
    usagePolicy: resource.usagePolicy,
  };
  return [
    {
      ...base,
      locale: "zh-CN",
      title: resource.name,
      text: [resource.name, resource.knowledge.summary, `适用场景：${resource.knowledge.useCases.join("、")}`, `限制：${resource.knowledge.limitations.join("、")}`, `框架：${resource.knowledge.frameworks.join("、")}`].join("\n"),
    },
    {
      ...base,
      locale: "en-US",
      title: resource.nameEn,
      text: [resource.nameEn, resource.knowledge.summaryEn, `Use cases: ${resource.knowledge.useCases.join(", ")}`, `Limitations: ${resource.knowledge.limitations.join(", ")}`, `Frameworks: ${resource.knowledge.frameworks.join(", ")}`].join("\n"),
    },
  ];
}
