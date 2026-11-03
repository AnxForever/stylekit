"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics/events";

type Variant = "inline" | "card";
type Status = "idle" | "loading" | "subscribed" | "already" | "error";

interface SubscribeResponse {
  success?: boolean;
  code?: string;
  emailSent?: boolean;
  error?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSignup({ variant = "card" }: { variant?: Variant }) {
  const { t, locale } = useI18n();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailSent, setEmailSent] = useState(false);
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

  function localizeError(code: string | undefined): string {
    if (code === "invalid-email") return t("newsletter.invalidEmail");
    if (code === "rate-limited") return t("newsletter.rateLimited");
    return t("newsletter.error");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    // Check the address here first so a typo is answered without a round trip.
    // name="email" on the input also keeps the autofill and password-manager
    // hints on the form itself.
    const normalized = email.trim();
    if (!EMAIL_PATTERN.test(normalized)) {
      setStatus("error");
      setErrorMsg(t("newsletter.invalidEmail"));
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalized, locale }),
      });

      const data = (await res.json().catch(() => ({}))) as SubscribeResponse;

      if (data.code === "already-subscribed") {
        setStatus("already");
        return;
      }

      if (!res.ok || data.success === false) {
        setStatus("error");
        setErrorMsg(localizeError(data.code));
        return;
      }

      setEmailSent(Boolean(data.emailSent));
      setStatus("subscribed");
      trackEvent("newsletter_subscribe", { source: variant });
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg(t("newsletter.error"));
    }
  }

  if (status === "subscribed" || status === "already") {
    const heading = status === "already"
      ? t("newsletter.alreadySubscribed")
      : t("newsletter.successTitle");
    const detail = status === "already"
      ? t("newsletter.alreadySubscribedDetail")
      : emailSent
        ? t("newsletter.successDetail")
        : t("newsletter.successSavedOnly");

    return (
      <div
        className={variant === "card" ? "rounded-lg border border-border p-6" : "border border-border/80 bg-foreground/[0.03] px-4 py-3"}
      >
        <div role="status" aria-live="polite" className="flex items-start gap-2.5">
          <Check aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">{heading}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{detail}</p>
          </div>
        </div>
      </div>
    );
  }

  const form = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
      <label htmlFor={emailId} className="sr-only">
        {t("newsletter.placeholder")}
      </label>
      <div className="flex gap-2">
        <input
          id={emailId}
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("newsletter.placeholder")}
          className="h-11 min-w-0 flex-1 border border-border bg-foreground/[0.04] px-3.5 text-sm text-foreground transition-colors placeholder:text-muted hover:border-foreground/40 focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/25 disabled:opacity-60 aria-invalid:border-red-500/70 aria-invalid:focus-visible:ring-red-500/30"
          disabled={status === "loading"}
          required
          autoComplete="email"
          inputMode="email"
          aria-describedby={describedBy}
          aria-invalid={status === "error" ? true : undefined}
        />
        <Button
          type="submit"
          variant="secondary"
          loading={status === "loading"}
          aria-busy={status === "loading"}
          className="group h-11 shrink-0 rounded-none px-4 font-mono text-[11px] uppercase tracking-[0.18em] hover:bg-accent hover:text-accent-foreground"
        >
          {status === "loading" ? (
            t("newsletter.subscribing")
          ) : (
            <>
              {t("newsletter.subscribe")}
              <ArrowRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              />
            </>
          )}
        </Button>
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

  if (variant === "inline") {
    return form;
  }

  return (
    <div className="rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold mb-1">{t("newsletter.title")}</h3>
      <p className="text-sm text-muted mb-4">{t("newsletter.description")}</p>
      {form}
    </div>
  );
}
