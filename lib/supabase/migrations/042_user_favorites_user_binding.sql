-- Migration 042: bind user_favorites to user accounts
--
-- Migration 034 deliberately left 003's user_favorites.user_id column
-- unapplied, noting that no code referenced it. The code does reference it:
-- both the favorites API and the merge path have shipped a user_id arm with a
-- session_id fallback since 2026-02-21, so production has served every
-- signed-in favorite through the legacy `user:<uuid>` identity. This applies
-- the column and folds those rows onto the real one.
--
-- Two details deliberately differ from 003 as written:
--
--   * The session_id NOT NULL drop is load-bearing, not cosmetic. The modern
--     arm inserts {user_id, style_slug} and never names session_id, so a
--     NOT NULL there fails the write with 23502.
--
--   * The unique index is not partial. Postgres refuses to infer a partial
--     index as the arbiter for `onConflict: "user_id,style_slug"` and fails
--     the merge with 42P10, which no error classifier in the route treats as
--     a missing column. Dropping the predicate costs nothing here: Postgres
--     treats NULL user_id values as distinct, so anonymous rows stay
--     unconstrained either way.
--
-- RLS is left alone on purpose. Every favorites read and write goes through
-- the service role, and 034's policies key off session_id, which the backfill
-- preserves unchanged. Rows the modern arm writes carry a NULL session_id,
-- which those policies deny to anon callers -- fail-closed rather than open.

ALTER TABLE public.user_favorites
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

ALTER TABLE public.user_favorites
  ALTER COLUMN session_id DROP NOT NULL;

-- Fold the legacy `user:<uuid>` session identities onto user_id. The regex
-- guard keeps a malformed suffix from aborting the cast, and the auth.users
-- check keeps a deleted account from tripping the foreign key. Rows that fail
-- either guard keep working through the legacy read path.
UPDATE public.user_favorites AS f
SET user_id = (substring(f.session_id FROM 6))::uuid
WHERE f.session_id LIKE 'user:%'
  AND f.user_id IS NULL
  AND substring(f.session_id FROM 6)
      ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
  AND EXISTS (
    SELECT 1 FROM auth.users AS u
    WHERE u.id = (substring(f.session_id FROM 6))::uuid
  );

-- A writer holding the same style twice would make the unique index below
-- fail. Anonymous rows are untouched: they carry a NULL user_id, which never
-- participates in the comparison.
DELETE FROM public.user_favorites AS dup
USING public.user_favorites AS keep
WHERE dup.user_id IS NOT NULL
  AND dup.user_id = keep.user_id
  AND dup.style_slug = keep.style_slug
  AND (dup.created_at, dup.id) < (keep.created_at, keep.id);

CREATE UNIQUE INDEX IF NOT EXISTS user_favorites_user_slug
  ON public.user_favorites(user_id, style_slug);

CREATE INDEX IF NOT EXISTS idx_favorites_user
  ON public.user_favorites(user_id);
