# Community reply release

This release adds contextual replies and private in-app notifications, corrects
color-detail answers, and moves HTML ownership to locale-aware document roots.
It does not send email or push notifications.

## Status and order

Completed on 2026-09-15: migration 040 is applied to production and the verified
application build is deployed from `main` commit `5404e3ef`. The previous app
artifact remains available at
`/www/stylekit-backups/stylekit-pre-5404e3ef-20260915T1713+0800` for rollback.
The steps below remain the required order for later environments and restores.

1. Review migration `lib/supabase/migrations/040_comment_replies_notifications.sql`.
   Capture a database backup and verify the intended production database with a
   read-only `select current_database(), current_user, version()` query. Do not
   infer the target from a shell's unrelated `DATABASE_URL`.
2. Apply migration 040 to the explicitly selected database before deploying code.
   It is transactional and rerunnable. It adds comment reply/identity columns and
   a notification table, but does not alter favorites or replay migration 003.
3. Deploy the verified source and `.next` artifacts using the existing ECS/nginx/
   `stylekit.service` release process documented in `README.md`. Include the new
   root layout files and remove the old `app/layout.tsx`/`app/page.tsx` entry points
   from the deployed source snapshot; those implementations now live under
   `components/`. A partial source sync is not a valid release.
4. If the color catalog changed, regenerate and install the Nginx color allow map
   from the deployed app's direct sitemap as documented in `README.md`.
5. Restart the service through the existing deployment procedure, then verify
   `/api/health`, community discovery, both locale roots, private inbox auth, and
   the checks below. No Nginx proxy URL changes are required.

The intended manual migration command, only after target verification, is:

```bash
psql "$DATABASE_URL" -X -v ON_ERROR_STOP=1 \
  -f lib/supabase/migrations/040_comment_replies_notifications.sql
```

## Storage and privacy contract

- Public comment reads/writes continue through server APIs. Direct table grants
  to `PUBLIC`, `anon`, and `authenticated` are revoked, including legacy IP/session
  data; the service role retains access. Keep its key server-side.
- A composite foreign key requires a reply target in the same style. Notifications
  are created by an insert trigger in the same transaction, with the recipient
  derived from the parent comment's real account (including validated legacy
  account IDs). Clients cannot provide recipients or trigger self-notifications.
- Notifications store references and read state, not permanent comment excerpts.
  Deleting a reply or its parent removes associated notifications. The reply itself
  remains when its parent is deleted and displays a removed-context notice.
- The inbox checks current style visibility, is authenticated and no-store, and
  filters every read/update by the current account. Marking a page read affects
  only the explicitly selected IDs, not notifications that arrived afterwards.
- Missing migration 040 disables reply controls and returns an explicit unavailable
  inbox response. Ordinary comments can still be read using the old schema; a
  failed reply is never silently posted as a top-level comment.

## Verification after deployment

Use separate test accounts and remove their test comments afterwards:

1. Account A comments on a public style; B replies. A receives one inbox item;
   B does not receive a self-notification. An anonymous inbox request returns 401.
2. Open the notification link: the exact reply is loaded even outside page one.
   Open its parent, then return to all comments.
3. Mark only the visible page read; another account cannot acknowledge A's items.
4. Delete the original and check that the reply remains with removed context and
   the notification disappears. Hide a community style and check that its comments
   and notifications are no longer exposed through public/private read endpoints.
5. Check `/zh`, `/zh/styles/dark-mode`, and `/zh/community` with JavaScript disabled:
   raw `html.lang` is `zh-CN`, content is visible, and the canonical remains localized.
6. Check `/en/colors/111827`: RGB answer, near-vs-exact Tailwind wording, real palette
   pairings, and graph URLs all match visible content and its English canonical.
7. Run the runtime sitemap check against the deployment using a conservative
   concurrency. Do not claim ranking/AI-citation improvement without follow-up data.

## Rollback

Prefer rolling back the app artifact while retaining the additive schema. Older
code ignores reply columns and the new notification table and still uses the
server comment API. Do not drop columns/tables to perform an ordinary rollback:
that would destroy replies, read state, and context.

If new notifications must be paused, disable only the `notify_style_comment_reply`
trigger after explicit operational approval; document that subsequent replies
will not create inbox events. Do not reopen anonymous table grants as a workaround.

## Local evidence

`tests/sql/comment-replies-notifications.sql` passes against an isolated PostgreSQL
16 cluster, including a legacy comment table without user/avatar columns, migration
rerun, same-style references, self-notification prevention, parent/reply deletion,
trigger-failure atomic rollback, and grants inherited through PUBLIC.

Unit tests cover authorization, malformed cursors, account cache separation,
mark-read scoping, reply upgrades, parent context, and UI recovery. Browser tests
use read-only fixtures and do not create production comments or notifications.
