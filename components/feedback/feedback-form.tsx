"use client";

import { useState } from "react";
import { z } from "zod";
import { useI18n } from "@/lib/i18n/context";

const clientSchema = z.object({
  message: z.string().trim().min(1),
  email: z.string().email().optional().or(z.literal("")),
});

type Status = "idle" | "loading" | "success" | "error";

const COPY = {
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
} as const;

export function FeedbackForm() {
  const { locale } = useI18n();
  const c = COPY[locale as keyof typeof COPY] ?? COPY.en;
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const result = clientSchema.safeParse({ message, email });
    if (!result.success) {
      setStatus("error");
      setErrorMsg(c.errorEmpty);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, email, website }),
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
      <label htmlFor="feedback-message" className="sr-only">
        {c.messageLabel}
      </label>
      <textarea
        id="feedback-message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={c.messagePlaceholder}
        rows={4}
        required
        disabled={status === "loading"}
        className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm leading-relaxed placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
      />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor="feedback-email" className="sr-only">
          {c.emailLabel}
        </label>
        <input
          id="feedback-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={c.emailPlaceholder}
          autoComplete="email"
          inputMode="email"
          disabled={status === "loading"}
          className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="min-h-11 shrink-0 rounded-md bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
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
