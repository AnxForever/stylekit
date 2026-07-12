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
        throw new Error(body?.error ?? "无法登录，请检查密码后重试。");
      }

      router.replace(nextPath);
      router.refresh();
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "无法登录，请稍后重试。"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--admin-canvas)] px-4 py-10 text-[var(--admin-text-primary)] sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <section className="w-full rounded-xl bg-[var(--admin-panel)] p-6 shadow-[var(--admin-shadow-medium)] sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-foreground text-background shadow-[var(--admin-shadow-border)]">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-semibold leading-6 tracking-[-0.4px]">管理后台</h1>
              <p className="mt-1 text-sm text-muted">StyleKit</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-muted">
                管理员密码
              </span>
              <input
                autoComplete="current-password"
                autoFocus
                className="h-10 w-full rounded-md bg-[var(--admin-input)] px-3 text-sm text-foreground shadow-[var(--admin-shadow-border)] outline-none transition-shadow placeholder:text-[var(--admin-text-muted)] hover:shadow-[0_0_0_1px_var(--admin-border-emphasis)]"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="请输入管理员密码"
                type="password"
                value={password}
              />
            </label>

            {error ? (
              <p className="rounded-md bg-[var(--admin-panel)] px-3 py-2 text-sm text-[var(--admin-status-red)] shadow-[var(--admin-shadow-border)]">
                {error}
              </p>
            ) : null}

            <button
              className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-foreground px-4 text-sm font-normal text-background shadow-[var(--admin-shadow-border)] transition-colors hover:bg-[#2b2b2b] disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-[#d6d6d6]"
              disabled={isSubmitting || !password}
              type="submit"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              登录
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
