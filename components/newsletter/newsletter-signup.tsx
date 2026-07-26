"use client";

import { useState } from "react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { useI18n } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics/events";

type Variant = "inline" | "card";
type Status = "idle" | "loading" | "success" | "error";

export function NewsletterSignup({ variant = "card" }: { variant?: Variant }) {
  const { t, locale } = useI18n();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const idPrefix = `newsletter-${variant}`;
  const emailId = `${idPrefix}-email`;
  const helperTextId = `${idPrefix}-helper`;
  const statusTextId = `${idPrefix}-status`;
  const legalLabel = locale === "zh"
    ? "订阅即表示您同意我们的"
    : "By subscribing, you agree to our";
  const privacyLabel = locale === "zh" ? "隐私政策" : "Privacy Policy";
  const termsLabel = locale === "zh" ? "服务条款" : "Terms";
  const helperText = `${legalLabel} `;
  const helperTextEndMark = locale === "zh" ? "。" : ".";
  const describedBy = status === "error"
    ? `${helperTextId} ${statusTextId}`
    : helperTextId;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    // Zod is loaded on demand so it stays out of the first-load bundle;
    // validation only ever runs at submit time.
    try {
      const { z } = await import("zod");
      const result = z.string().email().safeParse(email);
      if (!result.success) {
        setStatus("error");
        setErrorMsg(t("newsletter.invalidEmail"));
        return;
      }
    } catch {
      setStatus("error");
      setErrorMsg(t("newsletter.error"));
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
        <p
          role="status"
          aria-live="polite"
          className="text-sm text-green-600 dark:text-green-400"
        >
          {t("newsletter.success")}
        </p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
        <p className="text-xs tracking-widest uppercase text-muted mb-1">
          {t("newsletter.title")}
        </p>
        <label htmlFor={emailId} className="sr-only">
          {t("newsletter.placeholder")}
        </label>
        <div className="flex gap-2">
          <input
            id={emailId}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("newsletter.placeholder")}
            className="flex-1 min-w-0 rounded-md border border-border bg-background px-3 py-1.5 text-sm placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
            disabled={status === "loading"}
            required
            autoComplete="email"
            inputMode="email"
            aria-describedby={describedBy}
            aria-invalid={status === "error" ? true : undefined}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 min-h-11 rounded-md bg-foreground text-background px-4 py-1.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === "loading" ? "..." : t("newsletter.subscribe")}
          </button>
        </div>
        <p id={helperTextId} className="text-xs leading-relaxed text-muted">
          {helperText}
          <LocalizedLink href="/privacy" className="underline underline-offset-2 hover:text-foreground">
            {privacyLabel}
          </LocalizedLink>
          {" "}
          {locale === "zh" ? "和" : "and"}
          {" "}
          <LocalizedLink href="/terms" className="underline underline-offset-2 hover:text-foreground">
            {termsLabel}
          </LocalizedLink>
          {helperTextEndMark}
        </p>
        {status === "error" && errorMsg && (
          <p id={statusTextId} role="alert" aria-live="assertive" className="text-xs text-red-500">
            {errorMsg}
          </p>
        )}
      </form>
    );
  }

  return (
    <div className="rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold mb-1">{t("newsletter.title")}</h3>
      <p className="text-sm text-muted mb-4">{t("newsletter.description")}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row" noValidate>
        <label htmlFor={emailId} className="sr-only">
          {t("newsletter.placeholder")}
        </label>
        <input
          id={emailId}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("newsletter.placeholder")}
          className="flex-1 min-w-0 rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
          disabled={status === "loading"}
          required
          autoComplete="email"
          inputMode="email"
          aria-describedby={describedBy}
          aria-invalid={status === "error" ? true : undefined}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 min-h-11 rounded-md bg-foreground text-background px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "loading" ? "..." : t("newsletter.subscribe")}
        </button>
      </form>
      <p id={helperTextId} className="mt-2 text-xs leading-relaxed text-muted">
        {helperText}
        <LocalizedLink href="/privacy" className="underline underline-offset-2 hover:text-foreground">
          {privacyLabel}
        </LocalizedLink>
        {" "}
        {locale === "zh" ? "和" : "and"}
        {" "}
        <LocalizedLink href="/terms" className="underline underline-offset-2 hover:text-foreground">
          {termsLabel}
        </LocalizedLink>
        {helperTextEndMark}
      </p>
      {status === "error" && errorMsg && (
        <p id={statusTextId} role="alert" aria-live="assertive" className="text-xs text-red-500 mt-2">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
