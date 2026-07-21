#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "DATABASE_URL is required." >&2
  echo "Use the Supabase direct or session-pooler Postgres connection string." >&2
  exit 2
fi

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)
migration="$repo_root/lib/supabase/migrations/019_admin_analytics_aggregates.sql"

if [[ ! -f "$migration" ]]; then
  echo "Migration not found: $migration" >&2
  exit 2
fi

echo "Checking database connection..."
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -Atqc "select current_database(), current_user;"

echo "Applying admin analytics aggregation migration..."
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$migration"

echo "Verifying aggregate functions and service-role grants..."
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -Atqc "
select p.proname
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in (
    'admin_analytics_overview',
    'admin_analytics_breakdown',
    'admin_analytics_registrations',
    'admin_analytics_content'
  )
order by p.proname;
"

echo "Migration applied successfully."
