-- Track the exact manifest contract separately from a source snapshot hash.
-- A manifest change must trigger review even when the upstream source commit
-- itself has not changed.

alter table public.knowledge_resources
  add column if not exists manifest_hash text;

create index if not exists idx_knowledge_resources_manifest_hash
  on public.knowledge_resources (manifest_hash);
