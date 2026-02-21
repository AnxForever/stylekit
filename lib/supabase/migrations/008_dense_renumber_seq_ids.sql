-- Migration 008: Renumber seq_ids to eliminate gaps
--
-- Background:
--   Migration 004 backfilled ~50 legacy metadata accounts into user_seq_ids.
--   Those accounts were later deleted (cascade), leaving gaps (e.g. 1-10, 51+).
--   Migration 007 reset the sequence pointer but did NOT renumber existing rows.
--   This caused the admin panel to show jumpy raw IDs, requiring a separate
--   "displaySeqId" layer to present dense numbers.
--
-- This migration renumbers all existing seq_ids to be dense (1, 2, 3, ...)
-- preserving the original ordering, then resets the sequence accordingly.
-- After this, raw seq_id == display seq_id, eliminating the mapping layer.

-- Step 1: Renumber in-place using a CTE with row_number()
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

-- Step 2: Reset sequence to next available value
SELECT setval(
  'public.user_seq_id_seq',
  COALESCE((SELECT MAX(seq_id) FROM public.user_seq_ids), 0) + 1,
  false
);
