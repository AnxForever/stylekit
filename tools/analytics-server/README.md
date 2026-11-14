# Private analytics service

This service stores only measurement-version-2 telemetry in a dedicated
`stylekit_analytics` PostgreSQL database. Authentication, community data and
legacy reporting stay in their existing database. It has no arbitrary SQL API
and does not connect to the Umami database.

The website sends validated events to a private HTTP endpoint over an encrypted,
restricted SSH tunnel. The service binds `127.0.0.1:3190`; PostgreSQL also stays
on loopback. An independent bearer token is required for every endpoint,
including health. Do not expose either port publicly.

## Build and install

1. Create the dedicated database owned by the migration operator. Create a
   separate login role named `stylekit_analytics_runtime`, with a generated
   credential and no superuser, createdb or createrole privileges. Revoke public
   database CONNECT and grant CONNECT only to that runtime role and operators.
2. Generate the bootstrap from the committed report definitions:
   `node tools/analytics-server/schema.mjs <absolute-output-path>`.
   Apply it as the owner using `psql -X -v ON_ERROR_STOP=1 -d stylekit_analytics`.
   This creates only the dedicated table, indexes and fixed report functions;
   it requires no Supabase global roles or business tables.
3. Install `server.mjs` and this directory's `package.json` under
   `/opt/stylekit-analytics`. Install its pinned `pg` 8.23.0 dependency in that
   directory using pnpm with a reviewed lockfile/runtime receipt. Do not reuse
   or modify Umami's package installation. The app repository does not gain a
   production PostgreSQL dependency.
4. Put the following values in `/etc/stylekit-analytics.env` (root-owned, 0600).
   Generate credentials; never copy these placeholders into production:

   ```dotenv
   ANALYTICS_DATABASE_URL=GENERATED_LOOPBACK_CONNECTION_STRING
   ANALYTICS_BACKEND_TOKEN=GENERATED_URL_SAFE_TOKEN_AT_LEAST_32_CHARACTERS
   ANALYTICS_PORT=3190
   ANALYTICS_STORAGE_PATH=/var/lib/postgresql
   ```

   The connection string must target `stylekit_analytics` on PostgreSQL
   loopback using the dedicated runtime role and its generated credential.

5. Install the three systemd unit templates after reviewing the local Node and
   PostgreSQL executable paths. Start the service and retention timer. The
   retention service runs as PostgreSQL's local administrative OS account;
   the network runtime role cannot execute cleanup, alter or delete data.
6. Configure the website's server-only `ANALYTICS_BACKEND_URL` to its loopback
   tunnel endpoint and `ANALYTICS_BACKEND_TOKEN` to the same generated token.
   Do not set `NEXT_PUBLIC_` aliases. A failed self-hosted write must not fall
   back to Supabase, otherwise counts and quota usage diverge silently.

## Fixed API

All responses use `Cache-Control: private, no-store`. All JSON request bodies
are capped at 16 KiB, and every query uses parameters.

| Request | Body | Response |
| --- | --- | --- |
| `POST /events` | `event_id`, `visitor_id`, `session_id`, `event_type`, `event_data`, `style_slug`, `created_at` | `{success:true,duplicate:boolean}` only after PostgreSQL commits |
| `POST /insights` | `{start,end}` for a positive window up to 90 days | Existing version-2 report plus `collectionHealth` |
| `POST /prompt-copies` | `{start,end}` | Existing prompt-copy report shape |
| `GET /health` | None | Service name, capacity status and estimated retained-row metadata |

Only the client event allowlist is accepted; payment or other authoritative
business outcomes cannot be submitted to this endpoint. The website remains
responsible for catalog validation and its collection exclusions. The private
service independently bounds types, timestamps and properties, disallows raw
search text, and requires production measurement version 2. There are no
names, emails, IP addresses or user-agent strings in this table.

Repeated UUIDs return a successful duplicate acknowledgment without a second
row. Browser identifiers remain anonymous browser identifiers rather than
natural-person identity. No historical identities or exposures are backfilled.

## Capacity, recovery and retention

The pool uses at most three connections, bounded query/connection timeouts,
and the service has a 192 MiB systemd memory cap. Capacity probes are coalesced
and cached for ten seconds. The retained database warns at 2 GiB, and new
ingestion stops with HTTP 503 at 4 GiB or when filesystem free space is below
2 GiB. Unavailable health probes also pause ingestion. Reports remain readable
and include a visible collection-health status. These limits prevent uncontrolled
growth from consuming other services' reserve; they do not promise collection
without loss during a full disk, network outage or sustained limit.

`collectionHealth` has `status` (`ok`, `warning`, `blocked`), nullable
`databaseBytes` and `freeDiskBytes`, ISO `checkedAt`, and an optional
`reason` (`database_limit`, `disk_pressure`, `health_unavailable`). Unknown
measurements are null rather than fabricated zeroes.

The retention timer removes at most 50,000 rows older than 90 days per run,
every fifteen minutes. It does not shorten retention when capacity becomes
tight. Preserve PostgreSQL backups outside the live database and monitor real
growth after release. An application rollback can leave this service and its
records intact; do not delete the database as part of an automatic rollback.

## Verification

The root Vitest suite includes `server.test.mjs`: HTTP authentication,
committed acknowledgments, UUID behavior, bounded input, parameterized queries,
capacity failures and readable reports. Run real isolated PostgreSQL checks:

```powershell
node tools/analytics-server/verify-schema.mjs D:\codex-work\analytics-sql-fixture
```

That directory must contain a disposable installation of `@electric-sql/pglite`.
The verifier creates an in-memory database, checks exact reports and role
privileges, and never reads production configuration.
