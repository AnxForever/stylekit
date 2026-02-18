"use client";

import { useAdminSystem } from "@/lib/swr";
import { AlertTriangle } from "lucide-react";

export function DbStatusBanner() {
  const { data, isLoading } = useAdminSystem();

  if (isLoading || !data) return null;

  const { supabaseConfigured } = data.environment;
  const { connected, tables } = data.database;

  if (supabaseConfigured && connected) return null;

  const missingEnvVars = !supabaseConfigured;
  const allTablesEmpty =
    connected && tables.length > 0 && tables.every((t) => t.rowCount === 0);

  return (
    <div className="mb-6 rounded-lg border border-yellow-400/60 bg-yellow-50 px-4 py-3 dark:border-yellow-600/40 dark:bg-yellow-950/30">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600 dark:text-yellow-400" />
        <div className="space-y-1 text-sm">
          {missingEnvVars ? (
            <>
              <p className="font-medium text-yellow-800 dark:text-yellow-200">
                Database not connected
              </p>
              <p className="text-yellow-700 dark:text-yellow-300">
                Supabase environment variables are missing.
                Set <code className="rounded bg-yellow-200/60 px-1 py-0.5 text-xs dark:bg-yellow-800/40">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
                <code className="rounded bg-yellow-200/60 px-1 py-0.5 text-xs dark:bg-yellow-800/40">SUPABASE_SERVICE_ROLE_KEY</code> in
                your Vercel environment variables (Preview environment) and redeploy.
              </p>
            </>
          ) : allTablesEmpty ? (
            <>
              <p className="font-medium text-yellow-800 dark:text-yellow-200">
                Database connected but all tables are empty
              </p>
              <p className="text-yellow-700 dark:text-yellow-300">
                Supabase is configured and connected, but no data was found in any table.
                Ensure the tables exist and contain data.
              </p>
            </>
          ) : (
            <>
              <p className="font-medium text-yellow-800 dark:text-yellow-200">
                Database connection issue
              </p>
              <p className="text-yellow-700 dark:text-yellow-300">
                Supabase is configured but the connection failed.
                Check that the service role key is correct and the Supabase project is accessible.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
