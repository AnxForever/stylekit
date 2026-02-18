-- Migration 004: database-backed sequential user IDs
-- Replaces filesystem-based counter with Postgres sequence + mapping table.

CREATE SEQUENCE IF NOT EXISTS public.user_seq_id_seq
  AS BIGINT
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  CACHE 1;

CREATE TABLE IF NOT EXISTS public.user_seq_ids (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  seq_id BIGINT NOT NULL UNIQUE DEFAULT nextval('public.user_seq_id_seq'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_seq_ids_seq_id ON public.user_seq_ids(seq_id);

-- Backfill from existing metadata-assigned seq_id values (if any).
INSERT INTO public.user_seq_ids (user_id, seq_id, created_at)
SELECT
  id,
  (raw_user_meta_data ->> 'seq_id')::BIGINT,
  now()
FROM auth.users
WHERE
  raw_user_meta_data ? 'seq_id'
  AND (raw_user_meta_data ->> 'seq_id') ~ '^[0-9]+$'
ON CONFLICT DO NOTHING;

-- Keep sequence aligned with existing rows (safe for re-run).
SELECT setval(
  'public.user_seq_id_seq',
  (
    SELECT
      GREATEST(
        COALESCE(MAX(seq_id), 0),
        COALESCE(
          (
            SELECT MAX((raw_user_meta_data ->> 'seq_id')::BIGINT)
            FROM auth.users
            WHERE
              raw_user_meta_data ? 'seq_id'
              AND (raw_user_meta_data ->> 'seq_id') ~ '^[0-9]+$'
          ),
          0
        )
      ) + 1
    FROM public.user_seq_ids
  ),
  false
);

CREATE OR REPLACE FUNCTION public.assign_user_seq_id(p_user_id UUID)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_seq_id BIGINT;
BEGIN
  INSERT INTO public.user_seq_ids (user_id)
  VALUES (p_user_id)
  ON CONFLICT (user_id)
  DO UPDATE SET user_id = excluded.user_id
  RETURNING seq_id INTO v_seq_id;

  RETURN v_seq_id;
END;
$$;

REVOKE ALL ON FUNCTION public.assign_user_seq_id(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.assign_user_seq_id(UUID) TO service_role;
