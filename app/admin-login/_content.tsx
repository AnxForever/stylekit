"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, Loader2, LogIn } from "lucide-react";

export function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextPath = useMemo(() => {
    const rawNext = searchParams.get("next");
    if (!rawNext || !rawNext.startsWith("/admin")) {
      return "/admin/analytics";
    }
    return rawNext;
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Unable to sign in.");
      }

      router.replace(nextPath);
      router.refresh();
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "Unable to sign in."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--admin-canvas)] px-4 py-10 text-foreground sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <section className="w-full rounded-lg border border-[var(--admin-border-soft)] bg-[var(--admin-panel)] p-6 shadow-[var(--admin-shadow)] sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md border border-[var(--admin-border-soft)] bg-foreground text-background">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold leading-6">Admin console</h1>
              <p className="mt-1 text-sm text-muted">StyleKit</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                Password
              </span>
              <input
                autoComplete="current-password"
                autoFocus
                className="h-11 w-full rounded-md border border-[var(--admin-border-soft)] bg-[var(--admin-input)] px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted hover:border-border focus:border-foreground/35"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
                type="password"
                value={password}
              />
            </label>

            {error ? (
              <p className="rounded-md border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-300">
                {error}
              </p>
            ) : null}

            <button
              className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-foreground px-4 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting || !password}
              type="submit"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              Sign in
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
