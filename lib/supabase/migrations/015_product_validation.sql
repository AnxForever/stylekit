-- Authoritative evidence store for isolated Pack price experiments.
-- Public clients cannot read or write these tables. All mutations go through
-- validated server routes using the service-role client.

create table if not exists public.product_validation_participants (
  experiment_id text not null,
  offer_version text not null,
  identity_key text not null,
  identity_confidence text not null check (
    identity_confidence in ('authenticated_account', 'verified_contact_hmac', 'anonymous', 'session_only')
  ),
  variant_id text not null,
  assigned_at timestamptz not null,
  source_channel text not null check (
    source_channel in ('direct', 'email', 'community', 'social', 'referral', 'paid', 'interview')
  ),
  environment text not null check (
    environment in ('production', 'preview', 'development', 'test')
  ),
  icp_status text not null default 'edge' check (
    icp_status in ('qualified', 'edge', 'not_qualified')
  ),
  qualification_rule_version text not null,
  qualification_answers jsonb not null default '{}'::jsonb,
  qualified_at timestamptz,
  withdrawn_at timestamptz,
  is_bot boolean not null default false,
  is_internal boolean not null default false,
  is_test boolean not null default false,
  bot_rule_version text not null,
  first_touch jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (experiment_id, identity_key)
);

create table if not exists public.product_validation_events (
  event_id text primary key,
  occurred_at timestamptz not null,
  received_at timestamptz not null default timezone('utc', now()),
  identity_key text not null,
  experiment_id text not null,
  offer_version text not null,
  variant_id text not null,
  event_type text not null check (
    event_type in (
      'pack_offer_view',
      'pack_price_view',
      'pack_purchase_intent',
      'pack_checkout_start',
      'pack_purchase',
      'pack_refund',
      'pack_install_attempt',
      'pack_install_success'
    )
  ),
  trust text not null,
  event_data jsonb not null default '{}'::jsonb,
  source_record_hash text,
  created_by text not null check (
    created_by in ('client_exposure_api', 'authenticated_intent_api', 'admin_reconciliation', 'payment_webhook', 'install_verifier')
  ),
  foreign key (experiment_id, identity_key)
    references public.product_validation_participants (experiment_id, identity_key)
    on delete restrict
);

create table if not exists public.product_validation_interviews (
  interview_id text primary key,
  experiment_id text not null,
  offer_version text not null,
  occurred_at timestamptz not null,
  participant_identity_key text not null,
  icp_status text not null check (icp_status in ('qualified', 'edge', 'not_qualified')),
  primary_variant_id text,
  offer_snapshot_sha256 text not null check (offer_snapshot_sha256 ~ '^sha256:[0-9a-f]{64}$'),
  contact_verification_method text not null check (
    contact_verification_method in ('authenticated_account', 'verified_email', 'manual_interview')
  ),
  evidence_log_sha256 text not null check (evidence_log_sha256 ~ '^sha256:[0-9a-f]{64}$'),
  evidence_source text not null check (
    evidence_source in ('interview_notes', 'transcript', 'payment_provider', 'manual_reconciliation')
  ),
  reviewed_by text not null,
  consent_recorded boolean not null check (consent_recorded = true),
  price_accepted boolean not null,
  deposit_link_requested boolean not null,
  checkout_started boolean not null,
  non_refundable_deposit_paid boolean not null,
  protocol_deviation boolean not null default false,
  withdrawn boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (experiment_id, participant_identity_key)
);

create index if not exists product_validation_participants_offer_idx
  on public.product_validation_participants (experiment_id, offer_version, variant_id, icp_status);

create index if not exists product_validation_events_identity_idx
  on public.product_validation_events (experiment_id, identity_key, occurred_at);

create index if not exists product_validation_events_type_idx
  on public.product_validation_events (experiment_id, offer_version, event_type, occurred_at);

alter table public.product_validation_participants enable row level security;
alter table public.product_validation_events enable row level security;
alter table public.product_validation_interviews enable row level security;

revoke all on table public.product_validation_participants from anon, authenticated;
revoke all on table public.product_validation_events from anon, authenticated;
revoke all on table public.product_validation_interviews from anon, authenticated;

comment on table public.product_validation_participants is
  'De-identified Pack experiment assignments and ICP qualification evidence. No raw email, IP, name, or user-agent.';
comment on table public.product_validation_events is
  'Append-only Pack validation evidence. Authoritative event types require trusted server writers.';
comment on table public.product_validation_interviews is
  'De-identified interview outcomes linked to a frozen offer and hashed evidence log. Raw notes and contact mappings live outside analytics storage.';

create or replace function public.withdraw_product_validation_participant(
  target_experiment_id text,
  target_identity_key text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  participant_found boolean;
begin
  select exists (
    select 1
    from public.product_validation_participants
    where experiment_id = target_experiment_id
      and identity_key = target_identity_key
  ) into participant_found;

  if not participant_found then
    return false;
  end if;

  delete from public.product_validation_events
  where experiment_id = target_experiment_id
    and identity_key = target_identity_key;

  update public.product_validation_interviews
  set withdrawn = true,
      updated_at = timezone('utc', now())
  where experiment_id = target_experiment_id
    and participant_identity_key = target_identity_key;

  update public.product_validation_participants
  set icp_status = 'not_qualified',
      qualification_answers = '{}'::jsonb,
      qualified_at = null,
      withdrawn_at = timezone('utc', now()),
      updated_at = timezone('utc', now())
  where experiment_id = target_experiment_id
    and identity_key = target_identity_key;

  return true;
end;
$$;

revoke all on function public.withdraw_product_validation_participant(text, text) from public, anon, authenticated;
grant execute on function public.withdraw_product_validation_participant(text, text) to service_role;
