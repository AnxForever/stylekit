-- Migration 041: bind style_ratings to user accounts
--
-- Migration 003 declared this column, but production only ever received its
-- style_comments and submissions halves. style_ratings kept writing the legacy
-- `session_id = 'user:<uuid>'` identity instead, and a database without the
-- column rejects any insert that so much as names user_id -- null or not.
-- This applies the missing half and folds the legacy rows onto the real
-- identity, so the column stops being a schema the code only pretends to have.

ALTER TABLE public.style_ratings
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Fold the legacy `user:<uuid>` session identities onto user_id. The regex
-- guard keeps a malformed suffix from aborting the cast, and the auth.users
-- check keeps a deleted account from tripping the foreign key. Rows that fail
-- either guard stay on their session identity and keep working through the
-- legacy read path.
UPDATE public.style_ratings AS r
SET user_id = (substring(r.session_id FROM 6))::uuid
WHERE r.session_id LIKE 'user:%'
  AND r.user_id IS NULL
  AND substring(r.session_id FROM 6)
      ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
  AND EXISTS (
    SELECT 1 FROM auth.users AS u
    WHERE u.id = (substring(r.session_id FROM 6))::uuid
  );

-- A writer holding two ratings for one style would make the unique index below
-- fail. Only the newest row per (style, user) survives, which is also the row
-- the rating read path already reports.
DELETE FROM public.style_ratings AS dup
USING public.style_ratings AS keep
WHERE dup.user_id IS NOT NULL
  AND dup.user_id = keep.user_id
  AND dup.style_slug = keep.style_slug
  AND (dup.created_at, dup.id) < (keep.created_at, keep.id);

CREATE UNIQUE INDEX IF NOT EXISTS style_ratings_user_slug
  ON public.style_ratings(style_slug, user_id) WHERE user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_ratings_user
  ON public.style_ratings(user_id) WHERE user_id IS NOT NULL;
