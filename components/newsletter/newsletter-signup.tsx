"use client";

import { useState } from "react";
import { z } from "zod";
import { useI18n } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics/events";

const clientEmailSchema = z.string().email();

type Variant = "inline" | "card";
type Status = "idle" | "loading" | "success" | "error";

export function NewsletterSignup({ variant = "card" }: { variant?: Variant }) {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const result = clientEmailSchema.safeParse(email);
    if (!result.success) {
      setStatus("error");
      setErrorMsg(t("newsletter.invalidEmail"));
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || t("newsletter.error"));
        return;
      }

      setStatus("success");
      trackEvent("newsletter_subscribe", { source: variant });
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg(t("newsletter.error"));
    }
  }

  if (status === "success") {
    return (
      <div className={variant === "card" ? "rounded-lg border border-border p-6" : ""}>
        <p className="text-sm text-green-600 dark:text-green-400">
          {t("newsletter.success")}
        </p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <p className="text-xs tracking-widest uppercase text-muted mb-1">
          {t("newsletter.title")}
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("newsletter.placeholder")}
            className="flex-1 min-w-0 rounded-md border border-border bg-background px-3 py-1.5 text-sm placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
            disabled={status === "loading"}
            aria-label={t("newsletter.placeholder")}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded-md bg-foreground text-background px-4 py-1.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === "loading" ? "..." : t("newsletter.subscribe")}
          </button>
        </div>
        {status === "error" && errorMsg && (
          <p className="text-xs text-red-500">{errorMsg}</p>
        )}
      </form>
    );
  }

  return (
    <div className="rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold mb-1">{t("newsletter.title")}</h3>
      <p className="text-sm text-muted mb-4">{t("newsletter.description")}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("newsletter.placeholder")}
          className="flex-1 min-w-0 rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
          disabled={status === "loading"}
          aria-label={t("newsletter.placeholder")}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-md bg-foreground text-background px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "loading" ? "..." : t("newsletter.subscribe")}
        </button>
      </form>
      {status === "error" && errorMsg && (
        <p className="text-xs text-red-500 mt-2">{errorMsg}</p>
      )}
    </div>
  );
}
