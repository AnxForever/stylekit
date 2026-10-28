# Google Analytics measurement

Reviewed 2026-10-21 for the Google tag supplied by the site owner: `G-NVTV523BK9`.
The measurement ID is public configuration, not a credential.

| Feature | Evidence and decision | Delivery / coverage / history | Acceptance |
| --- | --- | --- | --- |
| GA-01: load the Google tag across site routes | Locale and legacy roots share `SiteDocument`. Use its existing `next/script` integration with `afterInteractive`; initialize the queue before loading `gtag.js`. Keep Umami and internal events independent. | Enabled / partial / none | Unit tests cover both production hosts and repeated initialization. Live browser: one configuration, one loader, script HTTP 200 and initial pageview HTTP 204. Google reporting UI remains unverified. |
| GA-02: measure client navigation | Next.js and Google document automatic history-based pageviews. Adopt enhanced measurement rather than adding another manual route tracker. | Enabled / partial / none | Live `/en` to `/en/styles` client navigation produced exactly one pageview, HTTP 204, with `/en` as the referrer. No second configuration or loader. Google reporting UI remains unverified. |
| GA-03: control collection and browser access | Existing analytics opt-out, production-host allowlist, browser privacy signals, Google non-Ads CSP guidance, and privacy disclosure. | Enabled / partial / none | Unit tests cover preview domains, DNT and GPC. Candidate browser on localhost loaded no Google script; live script and collector requests passed the response CSP. |

## Configuration and deployment

`NEXT_PUBLIC_ANALYTICS_DISABLED=true` omits the Google bootstrap along with the
other third-party analytics. Leave it unset or false when building production.
This is a build-time setting, including for statically generated pages; changing
only the running server environment does not update a previously built page.
No additional package, Google credential, or environment variable is required.

The loader only runs on `stylekit.top` and `www.stylekit.top`. It skips browsers
with Do Not Track (`1`) or Global Privacy Control enabled. The tag disables
Google signals and ad personalization signals. It does not forward the internal
custom event stream to Google.

After deploying, check the response CSP (including any reverse-proxy headers),
the async `gtag.js?id=G-NVTV523BK9` request, and GA4 Realtime or DebugView.
Verify one initial `page_view` and one event per client navigation with updated
location/referrer. Enable browser-history page changes in the web stream's
enhanced measurement settings. An ad blocker or privacy signal can prevent
this check. Local tests do not prove that Google received production events.

## Primary references

- [Next.js: Google Analytics and pageviews](https://nextjs.org/docs/app/guides/third-party-libraries#google-analytics)
- [Google: automatic and manual pageviews](https://developers.google.com/analytics/devguides/collection/ga4/views)
- [Google: CSP for Analytics without Ads](https://developers.google.com/tag-platform/security/guides/csp#google_analytics)
- [Google: advertising-signal configuration](https://developers.google.com/analytics/devguides/collection/ga4/reference/config#allow_google_signals)

## Verification

- `pnpm run lint`: passed with 38 existing warnings and no errors.
- `pnpm exec tsc --noEmit`: passed.
- `pnpm run security:secrets`: passed for tracked files.
- `pnpm run test`: 307 files passed; 8087 tests passed, one existing live-runtime
  test skipped. Ten new bootstrap cases cover host restrictions, privacy signals,
  repeated initialization, and data-layer preservation.
- `pnpm run build`: passed with the local analytics opt-out enabled.
- `NEXT_PUBLIC_ANALYTICS_DISABLED=false pnpm exec next build`: passed with
  analytics enabled for this command only; `.env.local` was not changed.
- Enabled-build artifacts for `/en`, `/zh`, and the neo-brutalist showcase contain
  the measurement ID and guarded bootstrap. The generated response-header
  manifest permits the Google script and collector origins.

These checks describe the original Windows working checkout. The deployed
production snapshot was separately validated below.

## Production deployment: 2026-10-21

Deployed to `https://www.stylekit.top` with build ID
`EKdguFqg9FkVTuWnX2HnT`. The isolated release preserved the existing production
SEO changes and excluded unrelated local work. Its baseline was checked against
3586 production files before activation. Eight scoped source/doc/test files were
shipped, including one catalog-page parameter signature correction required by
Next.js's generated page types; the catalog page body was unchanged.

The successful Linux build used Node 22.23.3 and `pnpm exec next build --webpack`
with a 4096 MB heap limit. Earlier candidates failed on the upstream Google-font
URL issue or final tracing under Node 24 and were never activated. The production
snapshot passed lint (28 existing warnings, no errors), type checking, secret
scanning, 306 test files and 8041 tests, with one existing live-runtime test
skipped, and the complete production build.

Before activation, a candidate browser checked `/en`, `/zh`, `/en/styles`,
`/login`, `/privacy` and `/api/health`. The local hostname loaded one bootstrap
and no Google loader or requests. After that server was stopped, the frozen
artifact was checksummed and transferred; 10021 build files were verified before
the application was switched. Production `.env.production` was not changed.

Live verification:

- `/en`, `/zh`, `/en/styles`, `/login` and `/privacy` returned HTTP 200, with
  the Google tag and expected CSP origins.
- `gtag.js?id=G-NVTV523BK9` returned HTTP 200. Exactly one tag and configuration
  were present.
- The initial `/en` `page_view` reached Google's collector and returned HTTP 204.
- A browser click from `/en` to `/en/styles` preserved the document's
  `performance.timeOrigin`, proving client navigation. Exactly one new
  `page_view` returned HTTP 204 with `/en` as its referrer. The tag and
  configuration counts remained one.
- The application, health watchdog timer and public health endpoint were healthy
  after deployment. The previous build and source were retained at
  `/www/stylekit-backups/ga4-20261021T022458Z`; activation included automatic
  rollback on health or smoke-check failure and retained previous hashed assets.

Google Analytics reports and account settings were not opened or independently
verified. HTTP 204 proves collector delivery, not report processing.
