# CDN acceleration runbook

This project runs as one Next.js process behind Nginx on the production host.
The production hostname currently resolves directly to the origin (`59.110.91.219`)
and does not expose an edge-cache header. The application is now CDN-ready, but
DNS/CDN changes remain an operator action because they affect production traffic.

## What is already prepared in the application

- `NEXT_PUBLIC_ASSET_PREFIX` is an optional build-time setting. When set to an
  absolute HTTP(S) URL, Next.js sends hashed JS, CSS, and `next/font` assets from
  that origin while leaving API and page URLs on `www.stylekit.top`.
- `/_next/static/*` is marked `public, max-age=31536000, immutable` and permits
  cross-origin font delivery. Pages also preconnect to the external asset
  origin, avoiding a late DNS/TCP/TLS setup on the first CDN request.
- The Nginx include applies a one-day browser cache, a 30-day shared/edge cache,
  and stale-while-revalidate to image, font, and video files under the
  allow-listed asset directories. It uses `try_files`, so sensitive `support/`
  and `profile/` files and extension-looking dynamic routes are not in that
  policy. Because these locations bypass Next.js, the include also enables
  gzip for JS, CSS, JSON, and SVG origin responses (including CDN origin fills).
- `next.config.ts` keeps a narrower app-origin fallback for the same public
  asset directories. Deploy the Nginx include alongside the app when possible:
  its `try_files` check prevents a missing asset from being negatively cached.
- The Next image optimizer keeps generated variants for at least 30 days.
- `app/layout.tsx` preloads only the body font. Display and mono faces still use
  `font-display: swap`, but no longer occupy the critical request queue.
- `ops/nginx/stylekit-performance-locations.conf` can serve cacheable assets
  directly from disk, bypassing Node. Include it in the `www.stylekit.top`
  server block before the catch-all `location /`.

## Recommended low-risk topology

Use a separate accelerated hostname for build assets first:

```text
Browser ── HTML/API ──> www.stylekit.top ──> Nginx ──> Next.js
       └─ hashed assets ─> static.stylekit.top (CDN) ──> origin www.stylekit.top
```

This avoids caching authenticated pages or React Server Component responses at
the edge. A whole-site CDN can be evaluated later after its cache key handles
the `RSC` and locale headers correctly.

## Alibaba Cloud CDN setup

The current DNS nameservers are HiChina/Alibaba (`dns29.hichina.com` and
`dns30.hichina.com`). In the Alibaba Cloud CDN console:

1. Add `static.stylekit.top` as an accelerated domain.
2. Set the origin to `www.stylekit.top` (HTTPS, port 443) and set the
   back-to-origin `Host` header to `www.stylekit.top`. This is important because
   the origin Nginx server block is named `www.stylekit.top`.
3. Add the CNAME shown by CDN as a DNS CNAME for `static.stylekit.top`.
4. Add cache rules:

   - On the accelerated hostname, `/_next/static/*`: edge TTL 365 days;
     honor/return the immutable header.
   - On a whole-site CDN, `/_next/image` may use a 30-day edge TTL. Preserve
     the response `Vary: Accept` behavior (or add `Accept` to the cache key;
     AVIF/WebP variants must not share a cache entry).
   - If the CDN is also placed in front of `www.stylekit.top`, static files
     under `/styles/*`, `/templates/*`, `/images/*`, `/brand/*`, `/readme/*`,
     `/video/*`, `/launch/*`, `/experiments/*`, and `/submission/*` (images,
     fonts, and media only): edge TTL 30 days. Do not apply this rule to HTML
     pages or API responses. In the separate-host phase, these public URLs
     remain on `www` until the app is explicitly changed to emit the `static.*`
     hostname for them.
   - Bypass `/api/*`, `/admin*`, `/profile*`, `/login*`, `/submit*`,
     `/workspace*`, `/validation*`, and `/umami*`.
   - Do not enable “cache all HTML” yet. Next App Router responses vary by
     locale, RSC headers, and authentication cookies.
   - Cache successful `200`/`206` responses only; do not cache `4xx`/`5xx`
     responses for these asset rules.

5. Enable HTTPS for the accelerated hostname and configure CORS `*` for
   `/_next/static/*` (font files need this when loaded from `static.*`).
   Enable Brotli with gzip fallback for JS, CSS, JSON, and SVG. Preserve
   `Vary: Accept-Encoding`; without compression the shared Tailwind stylesheet
   costs far more transfer bytes even when it is served from a nearby edge.
6. At build time, set:

   ```dotenv
   NEXT_PUBLIC_ASSET_PREFIX=https://static.stylekit.top
   ```

   The value is embedded into the Next build, so rebuild and sync `.next/` after
   changing it. Keep it empty until the CDN hostname is live.

## Origin Nginx change

Copy the locations include to the host and include it inside the existing
`server_name www.stylekit.top` block:

```bash
scp ops/nginx/stylekit-performance-locations.conf stylekit-prod:/etc/nginx/snippets/stylekit-performance-locations.conf
ssh stylekit-prod 'nginx -t && systemctl reload nginx'
```

The include is intentionally limited to static paths. It does not change the
SSE, admin, Supabase, or general proxy locations. Keep a backup of the current
Nginx file before editing it.

## Deploy retention when CDN is enabled

`/_next/static` URLs are immutable and browsers may retain them for a year. Do
not remove the previous build's hashed files immediately after a deployment:
keep a small release history (or sync `.next/static` without `--delete`) so a
browser returning to an older page can still resolve its chunks. Clean up old
asset generations only after the browser/CDN retention window, or store the
static directory separately from the active Next.js release.

## Verification

Before enabling the DNS CNAME, verify the origin response:

```bash
curl -sSI https://www.stylekit.top/_next/static/<known-build-asset>.js
curl -sSI https://www.stylekit.top/styles/editorial.svg
```

Expected headers include:

```text
Cache-Control: public, max-age=31536000, immutable       # _next/static
Cache-Control: public, max-age=86400, s-maxage=2592000   # public media files
Access-Control-Allow-Origin: *                           # CDN font delivery
```

After the CNAME propagates, request the same files through
`https://static.stylekit.top` twice. Confirm the CDN’s hit header (`X-Cache`,
`Age`, or the provider-specific equivalent) changes from MISS to HIT. Also load
`https://www.stylekit.top/en` in a browser and check that API, login, and profile
requests still use `www.stylekit.top`.

Verify compression separately (the exact hit-header name is provider-specific):

```bash
curl --compressed -sSI https://static.stylekit.top/_next/static/<known-build-asset>.css \
  | grep -Ei 'content-encoding|vary|age|cache'
```

Expect `Content-Encoding: br` where Brotli is supported, or `gzip` as the
fallback. The response should also retain `Timing-Allow-Origin: *` so browser
field metrics can report the CDN transfer accurately.

## Rollback

1. Remove `NEXT_PUBLIC_ASSET_PREFIX` and rebuild the app; same-origin asset paths
   are the default.
2. Purge the accelerated hostname and remove its DNS CNAME if necessary.
3. The origin continues serving all assets through the existing catch-all proxy,
   so no application rollback is required for a CDN-only failure.
