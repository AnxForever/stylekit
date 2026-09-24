/**
 * Cookie that makes the browser-test mock user answer as signed out.
 *
 * Playwright injects a mock signed-in user for the whole test run, which would
 * otherwise make it impossible to assert signed-out behaviour: the specs that
 * check 401s and "sign in to continue" screens would always see an authenticated
 * user instead. A request carrying this cookie is treated as anonymous.
 *
 * It is only read inside the mock-user branches of ./supabase-server.ts, so
 * production never consults it -- both mock switches are undefined there.
 *
 * Kept in its own module so the Playwright specs can import the name without
 * pulling in `next/headers`, which only resolves inside the Next.js runtime.
 */
export const E2E_SIGNED_OUT_COOKIE = "stylekit-e2e-signed-out";
