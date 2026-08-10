-- Allow one searchable document per resource and locale.
-- 026 originally used resource_id as the primary key; this migration makes
-- the bilingual extractor safe without changing the resource contract.

alter table public.knowledge_search_documents
  drop constraint if exists knowledge_search_documents_pkey;

alter table public.knowledge_search_documents
  add column if not exists id uuid default gen_random_uuid();

update public.knowledge_search_documents
set id = gen_random_uuid()
where id is null;

alter table public.knowledge_search_documents
  alter column id set not null;

alter table public.knowledge_search_documents
  add constraint knowledge_search_documents_pkey primary key (id);

create unique index if not exists idx_knowledge_search_documents_resource_locale
  on public.knowledge_search_documents (resource_id, locale);
