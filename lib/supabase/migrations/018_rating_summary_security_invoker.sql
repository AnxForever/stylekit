-- Make the public rating summary obey the querying role's permissions and RLS.
-- The underlying style_ratings table already has an explicit public SELECT
-- policy, while trusted API reads use the service role, so behavior is kept.

alter view if exists public.style_rating_summary
  set (security_invoker = true);
