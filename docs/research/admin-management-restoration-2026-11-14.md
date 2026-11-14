# Restore admin management access

Reviewed production build `5ceb4035` and the current source on 2026-11-14. The authenticated `/admin/users` page rendered, but its browser requests to users, comments and analytics APIs returned 401. A private server-token request to the users API returned a total of 602 users, confirming that the directory remained available.

| Feature | Evidence | Decision and acceptance | Coverage and history |
| --- | --- | --- | --- |
| Admin session to API | The browser had Supabase `auth-token.0` and `.1` cookies. `proxy.ts` accepted this form, while `lib/auth/admin-api.ts` matched only `auth-token=`. | Recognize split cookie names, then continue verifying the actual Supabase user and admin allowlist. A split-cookie regression test must pass; live browser API requests must return data for the existing authorized session. | Implemented, partial until live check, inherited gap backfilled. |
| Admin navigation visibility | At 1280 × 480 CSS pixels, the fixed sidebar's 588 px navigation did not scroll and the user-management link ended below the viewport. | Let only the navigation area scroll; keep its header and logout control visible. Verify the user-management link is reachable in a short desktop viewport and the mobile menu. | Implemented, partial until live browser check, inherited gap backfilled. |

The user directory, navigation entries and route files existed before and after the previous analytics release. The fix changes authorization recognition and sidebar access, without changing user records.
