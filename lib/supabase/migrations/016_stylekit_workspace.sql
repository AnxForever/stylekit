-- Persistent StyleKit SaaS workspace.
-- Authenticated users can only access their own projects, immutable revisions,
-- and export records. Public/anonymous clients receive no workspace access.

create table if not exists public.stylekit_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 120),
  description text not null default '' check (char_length(description) <= 2000),
  project_type text not null check (project_type in ('landing', 'dashboard', 'app', 'portfolio', 'blog', 'other')),
  stack jsonb not null default '[]'::jsonb check (jsonb_typeof(stack) = 'array'),
  brief jsonb not null default '{}'::jsonb check (jsonb_typeof(brief) = 'object'),
  selected_style_slug text,
  status text not null default 'active' check (status in ('active', 'archived')),
  current_revision_number integer not null default 0 check (current_revision_number >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (id, user_id)
);

create table if not exists public.stylekit_project_revisions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  revision_number integer not null check (revision_number > 0),
  snapshot jsonb not null check (jsonb_typeof(snapshot) = 'object'),
  document_schema_version integer not null default 1 check (document_schema_version > 0),
  content_sha256 text not null check (content_sha256 ~ '^sha256:[0-9a-f]{64}$'),
  source text not null check (source in ('manual_save', 'generation', 'restore', 'import')),
  parent_revision_number integer check (parent_revision_number is null or parent_revision_number >= 0),
  change_summary text check (change_summary is null or char_length(change_summary) <= 240),
  created_at timestamptz not null default timezone('utc', now()),
  foreign key (project_id, user_id)
    references public.stylekit_projects (id, user_id)
    on delete cascade,
  unique (project_id, revision_number)
);

create table if not exists public.stylekit_project_exports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  revision_number integer not null check (revision_number > 0),
  format text not null check (format in ('nextjs', 'react', 'html', 'registry', 'zip')),
  artifact_sha256 text not null check (artifact_sha256 ~ '^sha256:[0-9a-f]{64}$'),
  file_count integer not null check (file_count > 0),
  status text not null check (status in ('generated', 'verified', 'failed')),
  verification jsonb not null default '{}'::jsonb check (jsonb_typeof(verification) = 'object'),
  created_at timestamptz not null default timezone('utc', now()),
  foreign key (project_id, user_id)
    references public.stylekit_projects (id, user_id)
    on delete cascade
);

create index if not exists stylekit_projects_user_updated_idx
  on public.stylekit_projects (user_id, updated_at desc);
create index if not exists stylekit_revisions_project_number_idx
  on public.stylekit_project_revisions (project_id, revision_number desc);
create index if not exists stylekit_exports_project_created_idx
  on public.stylekit_project_exports (project_id, created_at desc);
create unique index if not exists stylekit_exports_artifact_identity_idx
  on public.stylekit_project_exports (project_id, revision_number, format, artifact_sha256);

alter table public.stylekit_projects enable row level security;
alter table public.stylekit_project_revisions enable row level security;
alter table public.stylekit_project_exports enable row level security;
alter table public.stylekit_projects force row level security;
alter table public.stylekit_project_revisions force row level security;
alter table public.stylekit_project_exports force row level security;

revoke all on table public.stylekit_projects from anon;
revoke all on table public.stylekit_project_revisions from anon;
revoke all on table public.stylekit_project_exports from anon;

revoke insert, update, delete on table public.stylekit_projects from authenticated;
grant select on table public.stylekit_projects to authenticated;
grant select on table public.stylekit_project_revisions to authenticated;
grant select on table public.stylekit_project_exports to authenticated;

create policy "Users manage their own StyleKit projects"
  on public.stylekit_projects
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "Users read their own StyleKit revisions"
  on public.stylekit_project_revisions
  for select to authenticated
  using (user_id = auth.uid());

create policy "Users read their own StyleKit exports"
  on public.stylekit_project_exports
  for select to authenticated
  using (user_id = auth.uid());

create or replace function public.create_stylekit_project(
  project_snapshot jsonb,
  revision_schema_version integer,
  revision_content_sha256 text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  owner_id uuid := auth.uid();
  created_project_id uuid;
  created_revision_id uuid;
begin
  if owner_id is null then
    raise exception 'AUTHENTICATION_REQUIRED' using errcode = 'P0001';
  end if;
  if jsonb_typeof(project_snapshot) <> 'object' or octet_length(project_snapshot::text) > 524288 then
    raise exception 'PROJECT_DOCUMENT_INVALID' using errcode = 'P0001';
  end if;
  -- Project creation is always a user-authored manual save. Generated artifacts
  -- must only enter the revision log through the service-role append path.
  if project_snapshot ? 'generation' then
    raise exception 'SERVER_REVISION_REQUIRED' using errcode = 'P0001';
  end if;
  if revision_schema_version <= 0 or revision_content_sha256 !~ '^sha256:[0-9a-f]{64}$' then
    raise exception 'REVISION_METADATA_INVALID' using errcode = 'P0001';
  end if;
  -- Serialize the active-project quota check per owner. Without this lock,
  -- concurrent creates can both observe 49 projects and commit projects 50 and 51.
  perform pg_advisory_xact_lock(hashtextextended(owner_id::text, 0));
  if (select count(*) from public.stylekit_projects where user_id = owner_id and status = 'active') >= 50 then
    raise exception 'PROJECT_LIMIT_REACHED' using errcode = 'P0001';
  end if;

  insert into public.stylekit_projects (
    user_id, name, description, project_type, stack, brief,
    selected_style_slug, status, current_revision_number
  ) values (
    owner_id,
    project_snapshot->>'name',
    coalesce(project_snapshot->>'description', ''),
    project_snapshot->>'projectType',
    coalesce(project_snapshot->'stack', '[]'::jsonb),
    coalesce(project_snapshot->'brief', '{}'::jsonb),
    nullif(project_snapshot->>'selectedStyleSlug', ''),
    'active',
    1
  ) returning id into created_project_id;

  insert into public.stylekit_project_revisions (
    project_id, user_id, revision_number, snapshot, document_schema_version,
    content_sha256, source, parent_revision_number, change_summary
  ) values (
    created_project_id, owner_id, 1, project_snapshot, revision_schema_version,
    revision_content_sha256, 'manual_save', null, '创建项目'
  ) returning id into created_revision_id;

  return jsonb_build_object(
    'projectId', created_project_id,
    'revisionId', created_revision_id,
    'revisionNumber', 1
  );
end;
$$;

revoke all on function public.create_stylekit_project(jsonb, integer, text) from public, anon;
grant execute on function public.create_stylekit_project(jsonb, integer, text) to authenticated;

create or replace function public.update_stylekit_project(
  target_project_id uuid,
  project_patch jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  owner_id uuid := auth.uid();
  project_row public.stylekit_projects%rowtype;
  updated_row public.stylekit_projects%rowtype;
begin
  if owner_id is null then
    raise exception 'AUTHENTICATION_REQUIRED' using errcode = 'P0001';
  end if;
  if jsonb_typeof(project_patch) <> 'object'
    or project_patch = '{}'::jsonb
    or octet_length(project_patch::text) > 16384
    or project_patch - array['name', 'description', 'projectType', 'stack', 'brief', 'selectedStyleSlug', 'status'] <> '{}'::jsonb
  then
    raise exception 'PROJECT_PATCH_INVALID' using errcode = 'P0001';
  end if;

  select * into project_row
  from public.stylekit_projects
  where id = target_project_id and user_id = owner_id
  for update;

  if not found then
    raise exception 'PROJECT_NOT_FOUND' using errcode = 'P0001';
  end if;

  if project_patch ? 'status'
    and project_patch->>'status' = 'active'
    and project_row.status = 'archived'
  then
    perform pg_advisory_xact_lock(hashtextextended(owner_id::text, 0));
    if (select count(*) from public.stylekit_projects where user_id = owner_id and status = 'active') >= 50 then
      raise exception 'PROJECT_LIMIT_REACHED' using errcode = 'P0001';
    end if;
  end if;

  update public.stylekit_projects
  set name = case when project_patch ? 'name' then project_patch->>'name' else name end,
      description = case when project_patch ? 'description' then project_patch->>'description' else description end,
      project_type = case when project_patch ? 'projectType' then project_patch->>'projectType' else project_type end,
      stack = case when project_patch ? 'stack' then project_patch->'stack' else stack end,
      brief = case when project_patch ? 'brief' then project_patch->'brief' else brief end,
      selected_style_slug = case when project_patch ? 'selectedStyleSlug' then nullif(project_patch->>'selectedStyleSlug', '') else selected_style_slug end,
      status = case when project_patch ? 'status' then project_patch->>'status' else status end,
      updated_at = timezone('utc', now())
  where id = target_project_id and user_id = owner_id
  returning * into updated_row;

  return to_jsonb(updated_row);
end;
$$;

revoke all on function public.update_stylekit_project(uuid, jsonb) from public, anon;
grant execute on function public.update_stylekit_project(uuid, jsonb) to authenticated;

create or replace function public.delete_stylekit_project(target_project_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  owner_id uuid := auth.uid();
  deleted_count integer;
begin
  if owner_id is null then
    raise exception 'AUTHENTICATION_REQUIRED' using errcode = 'P0001';
  end if;

  delete from public.stylekit_projects
  where id = target_project_id and user_id = owner_id;
  get diagnostics deleted_count = row_count;
  return deleted_count = 1;
end;
$$;

revoke all on function public.delete_stylekit_project(uuid) from public, anon;
grant execute on function public.delete_stylekit_project(uuid) to authenticated;


drop function if exists public.append_stylekit_project_revision(uuid, integer, jsonb, integer, text, text, text, integer);

create or replace function public.append_stylekit_project_revision(
  target_project_id uuid,
  expected_revision_number integer,
  revision_snapshot jsonb,
  revision_schema_version integer,
  revision_content_sha256 text,
  revision_source text,
  revision_change_summary text default null,
  revision_parent_number integer default null,
  target_owner_id uuid default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_role text := auth.role();
  owner_id uuid;
  project_row public.stylekit_projects%rowtype;
  next_revision integer;
  inserted_id uuid;
begin
  if caller_role = 'service_role' then
    owner_id := target_owner_id;
    if owner_id is null then
      raise exception 'TARGET_OWNER_REQUIRED' using errcode = 'P0001';
    end if;
    if revision_source not in ('generation', 'restore', 'import') then
      raise exception 'SYSTEM_REVISION_SOURCE_REQUIRED' using errcode = 'P0001';
    end if;
  elsif caller_role = 'authenticated' then
    owner_id := auth.uid();
    if owner_id is null then
      raise exception 'AUTHENTICATION_REQUIRED' using errcode = 'P0001';
    end if;
    if target_owner_id is not null or revision_source <> 'manual_save' or revision_snapshot ? 'generation' then
      raise exception 'SERVER_REVISION_REQUIRED' using errcode = 'P0001';
    end if;
  else
    raise exception 'AUTHENTICATION_REQUIRED' using errcode = 'P0001';
  end if;

  select * into project_row
  from public.stylekit_projects
  where id = target_project_id and user_id = owner_id
  for update;

  if not found then
    raise exception 'PROJECT_NOT_FOUND' using errcode = 'P0001';
  end if;
  if project_row.status = 'archived' then
    raise exception 'PROJECT_ARCHIVED' using errcode = 'P0001';
  end if;
  if project_row.current_revision_number <> expected_revision_number then
    raise exception 'PROJECT_REVISION_CONFLICT' using errcode = 'P0001';
  end if;
  if project_row.current_revision_number >= 200 then
    raise exception 'REVISION_LIMIT_REACHED' using errcode = 'P0001';
  end if;
  if jsonb_typeof(revision_snapshot) <> 'object' or octet_length(revision_snapshot::text) > 524288 then
    raise exception 'REVISION_DOCUMENT_INVALID' using errcode = 'P0001';
  end if;
  if revision_schema_version <= 0 or revision_content_sha256 !~ '^sha256:[0-9a-f]{64}$' then
    raise exception 'REVISION_METADATA_INVALID' using errcode = 'P0001';
  end if;
  if revision_source not in ('manual_save', 'generation', 'restore', 'import') then
    raise exception 'REVISION_SOURCE_INVALID' using errcode = 'P0001';
  end if;

  next_revision := project_row.current_revision_number + 1;
  insert into public.stylekit_project_revisions (
    project_id, user_id, revision_number, snapshot, document_schema_version,
    content_sha256, source, parent_revision_number, change_summary
  ) values (
    target_project_id, owner_id, next_revision, revision_snapshot, revision_schema_version,
    revision_content_sha256, revision_source, revision_parent_number, revision_change_summary
  ) returning id into inserted_id;

  update public.stylekit_projects
  set name = revision_snapshot->>'name',
      description = coalesce(revision_snapshot->>'description', ''),
      project_type = revision_snapshot->>'projectType',
      stack = coalesce(revision_snapshot->'stack', '[]'::jsonb),
      brief = coalesce(revision_snapshot->'brief', '{}'::jsonb),
      selected_style_slug = nullif(revision_snapshot->>'selectedStyleSlug', ''),
      status = coalesce(revision_snapshot->>'status', 'active'),
      current_revision_number = next_revision,
      updated_at = timezone('utc', now())
  where id = target_project_id and user_id = owner_id;

  return jsonb_build_object('id', inserted_id, 'revisionNumber', next_revision);
end;
$$;

revoke all on function public.append_stylekit_project_revision(uuid, integer, jsonb, integer, text, text, text, integer, uuid) from public, anon;
grant execute on function public.append_stylekit_project_revision(uuid, integer, jsonb, integer, text, text, text, integer, uuid) to authenticated, service_role;
