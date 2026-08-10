import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { parseKnowledgeResource, type KnowledgeResource, type KnowledgeResourceKind } from "./schema";

export interface KnowledgeSearchOptions {
  query?: string;
  resourceKind?: KnowledgeResourceKind;
  framework?: string;
  usagePolicy?: KnowledgeResource["usagePolicy"];
  includeUnpublished?: boolean;
  limit?: number;
}

export interface KnowledgeSearchHit {
  resource: KnowledgeResource;
  score: number;
  matchedFields: string[];
}

export interface KnowledgeResourcePayload {
  id: string;
  name: string;
  nameEn: string;
  resourceKind: KnowledgeResource["resourceKind"];
  sourceUrl: string;
  repositoryUrl?: string;
  license: KnowledgeResource["license"];
  knowledge: KnowledgeResource["knowledge"];
  usagePolicy: KnowledgeResource["usagePolicy"];
  reviewStatus: KnowledgeResource["reviewStatus"];
  publicationStatus: KnowledgeResource["publicationStatus"];
  sourceRef: string;
  commitSha?: string;
  mirror: KnowledgeResource["mirror"];
  provenance: KnowledgeResource["provenance"];
  quality: KnowledgeResource["quality"];
  security: KnowledgeResource["security"];
  contentHash?: string;
  publishedAt?: string;
  updatedAt: string;
}

const MANIFEST_DIR = path.join(process.cwd(), "knowledge", "manifests");

function tokenize(value: string): string[] {
  return value
    .toLocaleLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .map((token) => token.trim())
    .filter(Boolean);
}

function isRetrievable(resource: KnowledgeResource, includeUnpublished: boolean): boolean {
  if (resource.reviewStatus === "revoked" || resource.publicationStatus === "revoked") return false;
  if (includeUnpublished) return true;
  return resource.reviewStatus === "approved" && resource.publicationStatus === "published";
}

export async function loadKnowledgeCatalog(options: { includeUnpublished?: boolean } = {}): Promise<KnowledgeResource[]> {
  const entries = await readdir(MANIFEST_DIR, { withFileTypes: true });
  const resources: KnowledgeResource[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) continue;
    const raw = JSON.parse(await readFile(path.join(MANIFEST_DIR, entry.name), "utf8")) as unknown;
    const resource = parseKnowledgeResource(raw);
    if (isRetrievable(resource, options.includeUnpublished ?? false)) resources.push(resource);
  }

  return resources.sort((left, right) => left.name.localeCompare(right.name));
}

export function toKnowledgeResourcePayload(resource: KnowledgeResource): KnowledgeResourcePayload {
  return {
    id: resource.id,
    name: resource.name,
    nameEn: resource.nameEn,
    resourceKind: resource.resourceKind,
    sourceUrl: resource.sourceUrl,
    ...(resource.repositoryUrl ? { repositoryUrl: resource.repositoryUrl } : {}),
    license: resource.license,
    knowledge: resource.knowledge,
    usagePolicy: resource.usagePolicy,
    reviewStatus: resource.reviewStatus,
    publicationStatus: resource.publicationStatus,
    sourceRef: resource.sourceRef,
    ...(resource.commitSha ? { commitSha: resource.commitSha } : {}),
    mirror: resource.mirror,
    provenance: resource.provenance,
    quality: resource.quality,
    security: resource.security,
    ...(resource.contentHash ? { contentHash: resource.contentHash } : {}),
    ...(resource.publishedAt ? { publishedAt: resource.publishedAt } : {}),
    updatedAt: resource.updatedAt,
  };
}

export async function getPublishedKnowledgeResource(id: string): Promise<KnowledgeResource | undefined> {
  const resources = await loadKnowledgeCatalog();
  return resources.find((resource) => resource.id === id);
}

export function searchKnowledgeCatalog(
  resources: KnowledgeResource[],
  options: KnowledgeSearchOptions = {},
): KnowledgeSearchHit[] {
  const queryTokens = tokenize(options.query ?? "");
  const limit = Math.max(1, Math.min(options.limit ?? 20, 100));

  return resources
    .filter((resource) => {
      if (options.resourceKind && resource.resourceKind !== options.resourceKind) return false;
      if (options.framework && !resource.knowledge.frameworks.some((framework) => framework.toLowerCase() === options.framework?.toLowerCase())) return false;
      if (options.usagePolicy && resource.usagePolicy !== options.usagePolicy) return false;
      if (!isRetrievable(resource, options.includeUnpublished ?? false)) return false;
      return true;
    })
    .map((resource) => {
      const fields: Record<string, string> = {
        name: `${resource.name} ${resource.nameEn}`,
        knowledge: `${resource.knowledge.summary} ${resource.knowledge.summaryEn}`,
        tags: resource.knowledge.tags.join(" "),
        useCases: resource.knowledge.useCases.join(" "),
        topics: resource.knowledge.extractedTopics.join(" "),
        frameworks: resource.knowledge.frameworks.join(" "),
      };
      const matchedFields = Object.entries(fields)
        .filter(([, value]) => {
          const fieldTokens = new Set(tokenize(value));
          return queryTokens.some((token) => fieldTokens.has(token));
        })
        .map(([field]) => field);
      const score = queryTokens.length === 0 ? 0 : matchedFields.length / queryTokens.length;
      return { resource, score, matchedFields };
    })
    .filter((hit) => queryTokens.length === 0 || hit.score > 0)
    .sort((left, right) => right.score - left.score || left.resource.name.localeCompare(right.resource.name))
    .slice(0, limit);
}
