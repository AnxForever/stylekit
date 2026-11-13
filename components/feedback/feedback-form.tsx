"use client";

import { useState } from "react";
import { z } from "zod";
import { useI18n } from "@/lib/i18n/context";
import { supporterContactCopy } from "@/lib/site/support";

const clientSchema = z.object({
  message: z.string().trim().min(1),
  email: z.string().email().optional().or(z.literal("")),
  contact: z.string().trim().max(200).optional(),
});

type Status = "idle" | "loading" | "success" | "error";
type Variant = "feedback" | "supporter";
type LocaleKey = "en" | "zh";

type FormCopy = {
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  success: string;
  errorEmpty: string;
  errorGeneric: string;
  // Feedback variant: an optional reply address.
  emailLabel?: string;
  emailPlaceholder?: string;
  // Supporter variant: a required email or WeChat handle, because the whole
  // point of that form is being able to answer.
  contactLabel?: string;
  contactPlaceholder?: string;
  errorContact?: string;
};

const FEEDBACK_COPY: Record<LocaleKey, FormCopy> = {
  en: {
    messageLabel: "Your message",
    messagePlaceholder:
      "Suggest a feature, report a rough edge, or tell us what you'd like to see next.",
    emailLabel: "Email (optional)",
    emailPlaceholder: "you@example.com — only if you'd like a reply",
    submit: "Send feedback",
    sending: "Sending…",
    success: "Thanks — your message landed in our inbox.",
    errorEmpty: "Please write a message first.",
    errorGeneric: "Something went wrong. Please try again later.",
  },
  zh: {
    messageLabel: "你的想法",
    messagePlaceholder:
      "提个功能建议、反馈使用中的小问题，或者告诉我们你接下来想看到什么。",
    emailLabel: "邮箱（可选）",
    emailPlaceholder: "you@example.com —— 想要回复的话再填",
    submit: "发送反馈",
    sending: "发送中…",
    success: "谢谢你 —— 反馈已经送到我们邮箱了。",
    errorEmpty: "先写点内容吧。",
    errorGeneric: "出了点问题，请稍后再试。",
  },
};

const COPY: Record<Variant, Record<LocaleKey, FormCopy>> = {
  feedback: FEEDBACK_COPY,
  supporter: supporterContactCopy,
};

export function FeedbackForm({ variant = "feedback" }: { variant?: Variant }) {
  const { locale } = useI18n();
  const isSupporter = variant === "supporter";
  const c = COPY[variant][locale === "zh" ? "zh" : "en"];
  const idPrefix = isSupporter ? "supporter-contact" : "feedback";
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const result = clientSchema.safeParse({ message, email, contact });
    if (!result.success) {
      setStatus("error");
      setErrorMsg(c.errorEmpty);
      return;
    }
    if (isSupporter && !result.data.contact) {
      setStatus("error");
      setErrorMsg(c.errorContact ?? c.errorEmpty);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          email: isSupporter ? "" : email,
          contact: isSupporter ? contact : undefined,
          website,
          topic: variant,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || c.errorGeneric);
        return;
      }

      setStatus("success");
      setMessage("");
      setEmail("");
      setContact("");
    } catch {
      setStatus("error");
      setErrorMsg(c.errorGeneric);
    }
  }

  if (status === "success") {
    return (
      <p
        role="status"
        aria-live="polite"
        className="text-sm text-green-600 dark:text-green-400"
      >
        {c.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <label htmlFor={`${idPrefix}-message`} className="sr-only">
        {c.messageLabel}
      </label>
      <textarea
        id={`${idPrefix}-message`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={c.messagePlaceholder}
        rows={4}
        required
        disabled={status === "loading"}
        className="w-full resize-y border border-border bg-background px-3.5 py-3 text-sm leading-relaxed placeholder:text-muted transition-colors focus:border-foreground focus:outline-none"
      />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {isSupporter ? (
          <>
            <label htmlFor={`${idPrefix}-contact`} className="sr-only">
              {c.contactLabel}
            </label>
            <input
              id={`${idPrefix}-contact`}
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={c.contactPlaceholder}
              autoComplete="email"
              required
              disabled={status === "loading"}
              className="min-w-0 flex-1 border border-border bg-background px-3.5 py-2 text-sm placeholder:text-muted transition-colors focus:border-foreground focus:outline-none"
            />
          </>
        ) : (
          <>
            <label htmlFor={`${idPrefix}-email`} className="sr-only">
              {c.emailLabel}
            </label>
            <input
              id={`${idPrefix}-email`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={c.emailPlaceholder}
              autoComplete="email"
              inputMode="email"
              disabled={status === "loading"}
              className="min-w-0 flex-1 border border-border bg-background px-3.5 py-2 text-sm placeholder:text-muted transition-colors focus:border-foreground focus:outline-none"
            />
          </>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="min-h-11 shrink-0 border border-foreground bg-foreground px-6 py-2 text-sm font-medium text-background transition-colors hover:bg-transparent hover:text-foreground disabled:opacity-50 disabled:hover:bg-foreground disabled:hover:text-background"
        >
          {status === "loading" ? c.sending : c.submit}
        </button>
      </div>
      {/* Honeypot: off-screen, not tab-reachable. Bots fill it; we drop those. */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      {status === "error" && errorMsg && (
        <p role="alert" aria-live="assertive" className="text-sm text-red-500">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
