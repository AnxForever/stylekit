-- Email OTP state must be shared across instances and survive process restarts.
create table if not exists public.email_otp_challenges (
  id text primary key,
  email text not null,
  digest text not null,
  attempts integer not null default 0,
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint email_otp_challenges_attempts_nonnegative check (attempts >= 0)
);

create index if not exists email_otp_challenges_expires_at_idx
  on public.email_otp_challenges (expires_at);

alter table public.email_otp_challenges enable row level security;
revoke all on public.email_otp_challenges from anon, authenticated;
grant all on public.email_otp_challenges to service_role;

-- The service-role-only RPC keeps the attempt increment and successful
-- consumption atomic. It is invoker-security by design; the caller is the
-- server-side service_role client, while public API roles have no EXECUTE.
create or replace function public.consume_email_otp_challenge(
  p_challenge_id text,
  p_email text,
  p_digest text,
  p_max_attempts integer default 5
)
returns text
language plpgsql
security invoker
set search_path = public
as $$
declare
  challenge public.email_otp_challenges%rowtype;
begin
  select *
    into challenge
    from public.email_otp_challenges
   where id = p_challenge_id
   for update;

  if not found then
    return 'missing';
  end if;

  if challenge.expires_at <= now() or challenge.consumed_at is not null then
    return 'expired';
  end if;

  if challenge.attempts >= p_max_attempts then
    return 'attempts';
  end if;

  if challenge.email = lower(trim(p_email)) and challenge.digest = p_digest then
    update public.email_otp_challenges
       set consumed_at = now()
     where id = p_challenge_id;
    return 'valid';
  end if;

  update public.email_otp_challenges
     set attempts = attempts + 1
   where id = p_challenge_id;
  return 'invalid';
end;
$$;

revoke all on function public.consume_email_otp_challenge(text, text, text, integer)
  from public, anon, authenticated;
grant execute on function public.consume_email_otp_challenge(text, text, text, integer)
  to service_role;
