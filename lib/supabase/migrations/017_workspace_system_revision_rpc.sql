-- Upgrade the Workspace revision RPC after migration 016 was already applied.
-- Safe to run repeatedly. Existing projects, revisions and exports are preserved.

drop function if exists public.append_stylekit_project_revision(
  uuid, integer, jsonb, integer, text, text, text, integer
);
drop function if exists public.append_stylekit_project_revision(
  uuid, integer, jsonb, integer, text, text, text, integer, uuid
);

create function public.append_stylekit_project_revision(
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

revoke all on function public.append_stylekit_project_revision(
  uuid, integer, jsonb, integer, text, text, text, integer, uuid
) from public, anon;
grant execute on function public.append_stylekit_project_revision(
  uuid, integer, jsonb, integer, text, text, text, integer, uuid
) to authenticated, service_role;
