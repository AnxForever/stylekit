-- StyleKit Knowledge Base control plane
-- Git remains the source of truth for manifests, pinned snapshots, notices,
-- and SBOM files. Supabase stores workflow state, review evidence, and the
-- searchable metadata needed by internal tooling.

create table if not exists public.knowledge_resources (
  id text primary key,
  schema_version text not null,
  name text not null,
  name_en text not null,
  resource_kind text not null,
  source_url text not null,
  repository_url text,
  source_ref text not null,
  commit_sha text,
  license jsonb not null,
  mirror jsonb not null,
  provenance jsonb not null,
  knowledge jsonb not null,
  quality jsonb not null,
  security jsonb not null,
  usage_policy text not null,
  review_status text not null default 'draft',
  publication_status text not null default 'unpublished',
  content_hash text,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint knowledge_resources_kind_check check (resource_kind in (
    'design-system', 'component-library', 'animation', 'typography', 'font',
    'gradient', 'shadow', 'background-pattern', 'icon', 'illustration',
    'chart', 'design-md', 'agent-skill', 'design-to-code-tool',
    'accessibility-guideline'
  )),
  constraint knowledge_resources_usage_policy_check check (usage_policy in (
    'research-only', 'retrieval-only', 'snippet-approved',
    'generator-approved', 'distribution-approved', 'revoked'
  )),
  constraint knowledge_resources_review_status_check check (review_status in (
    'draft', 'pending', 'approved', 'rejected', 'revoked'
  )),
  constraint knowledge_resources_publication_status_check check (publication_status in (
    'unpublished', 'published', 'deprecated', 'revoked'
  )),
  constraint knowledge_resources_license_object_check check (jsonb_typeof(license) = 'object'),
  constraint knowledge_resources_mirror_object_check check (jsonb_typeof(mirror) = 'object'),
  constraint knowledge_resources_provenance_object_check check (jsonb_typeof(provenance) = 'object'),
  constraint knowledge_resources_knowledge_object_check check (jsonb_typeof(knowledge) = 'object'),
  constraint knowledge_resources_quality_object_check check (jsonb_typeof(quality) = 'object'),
  constraint knowledge_resources_security_object_check check (jsonb_typeof(security) = 'object')
);

create index if not exists idx_knowledge_resources_publication
  on public.knowledge_resources (publication_status, review_status, resource_kind);
create index if not exists idx_knowledge_resources_updated_at
  on public.knowledge_resources (updated_at desc);

create table if not exists public.knowledge_ingest_runs (
  id uuid primary key default gen_random_uuid(),
  source_type text not null,
  source_url text,
  source_ref text,
  commit_sha text,
  status text not null default 'running',
  manifest_count integer not null default 0,
  summary jsonb not null default '{}'::jsonb,
  error_summary text,
  initiated_by uuid references auth.users(id) on delete set null,
  started_at timestamptz not null default timezone('utc', now()),
  finished_at timestamptz,
  constraint knowledge_ingest_runs_status_check check (status in ('running', 'passed', 'failed', 'cancelled')),
  constraint knowledge_ingest_runs_summary_object_check check (jsonb_typeof(summary) = 'object')
);

create index if not exists idx_knowledge_ingest_runs_started_at
  on public.knowledge_ingest_runs (started_at desc);

create table if not exists public.knowledge_reviews (
  id uuid primary key default gen_random_uuid(),
  resource_id text not null references public.knowledge_resources(id) on delete cascade,
  reviewer_id uuid references auth.users(id) on delete set null,
  decision text not null,
  notes text,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  constraint knowledge_reviews_decision_check check (decision in ('approve', 'reject', 'request-changes', 'revoke')),
  constraint knowledge_reviews_evidence_object_check check (jsonb_typeof(evidence) = 'object')
);

create index if not exists idx_knowledge_reviews_resource_created
  on public.knowledge_reviews (resource_id, created_at desc);

create table if not exists public.knowledge_publications (
  id uuid primary key default gen_random_uuid(),
  resource_id text not null references public.knowledge_resources(id) on delete cascade,
  action text not null,
  content_hash text,
  publisher_id uuid references auth.users(id) on delete set null,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  constraint knowledge_publications_action_check check (action in ('publish', 'deprecate', 'revoke'))
);

create index if not exists idx_knowledge_publications_resource_created
  on public.knowledge_publications (resource_id, created_at desc);

create table if not exists public.knowledge_search_documents (
  resource_id text primary key references public.knowledge_resources(id) on delete cascade,
  locale text not null default 'zh-CN',
  document text not null,
  document_tsv tsvector generated always as (
    to_tsvector('simple'::regconfig, document)
  ) stored,
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_knowledge_search_documents_tsv
  on public.knowledge_search_documents using gin (document_tsv);

create table if not exists public.knowledge_audit_events (
  id uuid primary key default gen_random_uuid(),
  resource_id text references public.knowledge_resources(id) on delete set null,
  action text not null,
  actor_id uuid references auth.users(id) on delete set null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  constraint knowledge_audit_events_payload_object_check check (jsonb_typeof(payload) = 'object')
);

create index if not exists idx_knowledge_audit_events_resource_created
  on public.knowledge_audit_events (resource_id, created_at desc);

-- Keep the control plane private until the Supabase adapter applies the same
-- approved-and-published gate as the Git catalog.
alter table public.knowledge_resources enable row level security;
alter table public.knowledge_ingest_runs enable row level security;
alter table public.knowledge_reviews enable row level security;
alter table public.knowledge_publications enable row level security;
alter table public.knowledge_search_documents enable row level security;
alter table public.knowledge_audit_events enable row level security;

create policy "Service role can manage knowledge resources"
  on public.knowledge_resources for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Service role can manage knowledge ingest runs"
  on public.knowledge_ingest_runs for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Service role can manage knowledge reviews"
  on public.knowledge_reviews for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Service role can manage knowledge publications"
  on public.knowledge_publications for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Service role can manage knowledge search documents"
  on public.knowledge_search_documents for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Service role can manage knowledge audit events"
  on public.knowledge_audit_events for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
