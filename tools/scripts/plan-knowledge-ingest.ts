#!/usr/bin/env tsx

import { loadKnowledgeCatalog, buildKnowledgeIngestPlan } from "../../lib/knowledge";

async function main(): Promise<void> {
  const resources = await loadKnowledgeCatalog({ includeUnpublished: true });
  const plan = buildKnowledgeIngestPlan(resources);
  console.log(JSON.stringify(plan, null, 2));
}

void main();
