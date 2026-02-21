-- Migration 011: Fix seq_id gaps and prevent future gaps
--
-- Problem:
--   Postgres sequences (nextval) can skip numbers on rollback, crash, or
--   cache eviction. This causes visible gaps in user IDs shown in the admin
--   panel — e.g. 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,51,52,...
--
-- Solution:
--   1. Renumber existing rows to be dense again.
--   2. Replace assign_user_seq_id() to use MAX(seq_id)+1 with a table lock
--      instead of nextval(), guaranteeing dense IDs even under concurrency.

-- Step 1: Renumber existing rows densely (same as migration 008)
WITH ranked AS (
  SELECT
    user_id,
    ROW_NUMBER() OVER (ORDER BY seq_id ASC) AS new_seq_id
  FROM public.user_seq_ids
)
UPDATE public.user_seq_ids AS t
SET seq_id = ranked.new_seq_id
FROM ranked
WHERE t.user_id = ranked.user_id;

-- Step 2: Reset sequence (kept as fallback; function below no longer uses it)
SELECT setval(
  'public.user_seq_id_seq',
  COALESCE((SELECT MAX(seq_id) FROM public.user_seq_ids), 0) + 1,
  false
);

-- Step 3: Replace the function to use MAX+1 instead of nextval
CREATE OR REPLACE FUNCTION public.assign_user_seq_id(p_user_id UUID)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_seq_id BIGINT;
BEGIN
  -- Return existing seq_id if the user already has one
  SELECT seq_id INTO v_seq_id
  FROM public.user_seq_ids
  WHERE user_id = p_user_id;

  IF FOUND THEN
    RETURN v_seq_id;
  END IF;

  -- Lock table to prevent concurrent MAX+1 collisions.
  -- User registration is low-volume, so this is acceptable.
  LOCK TABLE public.user_seq_ids IN EXCLUSIVE MODE;

  -- Assign next dense ID
  SELECT COALESCE(MAX(seq_id), 0) + 1 INTO v_seq_id
  FROM public.user_seq_ids;

  INSERT INTO public.user_seq_ids (user_id, seq_id)
  VALUES (p_user_id, v_seq_id);

  RETURN v_seq_id;
END;
$$;
