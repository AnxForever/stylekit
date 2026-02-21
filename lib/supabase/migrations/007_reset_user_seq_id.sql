-- Migration 007: Reset user_seq_id sequence to current active maximum
--
-- Background:
--   Migration 004 aligned the sequence by reading GREATEST(max from user_seq_ids,
--   max from auth.users metadata). At that time, ~50 legacy accounts existed in
--   metadata (from the old filesystem-based counter), causing the sequence to be
--   set to 51. Those accounts were later deleted, which cascade-removed their
--   user_seq_ids rows, but Postgres sequences never rewind automatically.
--   As a result, new registrations skipped IDs 11-50 and started at 51.
--
-- This migration resets the sequence to MAX(active seq_id) + 1.
-- Assumption: deleted accounts (IDs 11-50) either never posted comments or their
--             comments have been cleaned up. author_seq_id in style_comments is a
--             denormalized snapshot and is not a live foreign key, so recycling
--             these IDs does not break referential integrity.

SELECT setval(
  'public.user_seq_id_seq',
  COALESCE((SELECT MAX(seq_id) FROM public.user_seq_ids), 0) + 1,
  false
);
