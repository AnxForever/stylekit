# Self-hosted Umami: location data and admin dashboard

This repository reads its traffic numbers from the **self-hosted Umami** at
`https://www.stylekit.top/umami`, not from Umami Cloud. Cloud's API requires a
paid plan, so Cloud is disabled as a collector and as a read source.

Two things live outside this repository and cannot be fixed from here: the
Umami container's environment (for location data) and its admin credentials.

## 1. Location data (region and city)

### Symptom

The Umami dashboard shows pageviews and visitors, but **Countries / Regions /
Cities are empty**.

### Cause

Umami does not geolocate visitors in the browser. The tracker script sends no
country field at all — verified against `https://www.stylekit.top/umami/script.js`,
which contains no `country`, `region`, or `city` field. Umami resolves location
**server-side**, from either:

1. CDN headers (`CF-IPCountry`, `CF-Region-Code`, `CF-IPCity`), or
2. its bundled geo database, when headers are absent.

This site sits behind plain nginx (`Server: nginx`, no `CF-*` headers), so path 1
yields nothing. If the geo database path is also unavailable in the container,
every location column stays blank.

### Fix

Set one environment variable on the **Umami** container and restart it:

```dotenv
SKIP_LOCATION_HEADERS=1
```

This disables header detection and forces the internal geo database, which
returns country, region, and city with no nginx changes.

**With docker compose** — add the variable to the `umami` service, then recreate:

```yaml
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    environment:
      DATABASE_URL: postgresql://umami:umami@db:5432/umami
      # Force the internal geo database instead of CDN headers.
      SKIP_LOCATION_HEADERS: "1"
```

```bash
docker compose up -d umami
```

**With `docker run` on a host where the env file was used:**

```bash
# Append the variable to the existing env file, then recreate the container.
echo 'SKIP_LOCATION_HEADERS=1' >> /path/to/umami.env
docker rm -f umami
docker run -d --name umami --env-file /path/to/umami.env -p 3000:3000 \
  ghcr.io/umami-software/umami:postgresql-latest
```

Rebuilding the image is **not** required: `SKIP_LOCATION_HEADERS` is a runtime
variable.

### Verify

Location data is written for **new** visits. Old rows stay blank.

```bash
pnpm run analytics:verify-umami
```

The final check reads the last 7 days of country metrics and fails if every row
is blank. To confirm new visits specifically, load the site in a browser once,
then check the Umami dashboard's Realtime panel for a country.

## 2. Admin dashboard credentials

The admin analytics pages read from the Umami API. Self-hosted Umami has no API
keys; it exchanges a username and password for a short-lived Bearer token.

Set in `.env.local` (never commit this file):

```dotenv
UMAMI_USERNAME=your-admin-username
UMAMI_PASSWORD=your-admin-password
```

The token is cached in process memory and refreshed on expiry. If either value
is missing the dashboard falls back to the self-built Supabase aggregates
instead of failing, so a blank config degrades rather than breaks.

> Prefer a dedicated read-only account over the main admin login, so the
> dashboard credential cannot change data.

## 3. Collector configuration

The tracker is rendered only when **both** values are set:

```dotenv
NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://www.stylekit.top/umami/script.js
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
```

There is deliberately no default collector. Falling back to Umami Cloud would
double-count every visit once the self-hosted instance is also collecting.

`NEXT_PUBLIC_*` values are inlined at build time, so changing them requires a
rebuild, not just a restart.

The tracker is restricted to `stylekit.top` and `www.stylekit.top` via
`data-domains`, so preview deploys and localhost never pollute production
numbers. `lib/analytics/events.ts` mirrors that list to skip dispatch on other
hosts.

## 4. Checking the whole chain

```bash
pnpm run analytics:verify-umami
```

Checks, in order: tracker script reachable, tracker tag rendered with the
website ID, API login accepted, website readable, and country data present. It
is read-only apart from the login request.
