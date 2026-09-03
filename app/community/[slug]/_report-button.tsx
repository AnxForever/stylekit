"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import { REPORT_REASONS, type ReportReason } from "@/lib/community/moderation";

/**
 * Reader-facing report entry for one community style.
 *
 * Kept deliberately quiet in the layout: reporting is rare, and a prominent
 * control on every community style would read as a warning about the work
 * rather than a safety valve.
 */

const REASON_LABELS: Record<ReportReason, { en: string; zh: string }> = {
  plagiarism: { en: "Copied from someone else", zh: "抄袭他人作品" },
  broken: { en: "Broken or unusable", zh: "无法使用或损坏" },
  inappropriate: { en: "Inappropriate content", zh: "内容不当" },
  mislabeled: { en: "Wrong category or tags", zh: "分类或标签错误" },
  other: { en: "Something else", zh: "其他问题" },
};

const COPY = {
  en: {
    trigger: "Report",
    title: "Report this style",
    detail: "Anything else we should know? (optional)",
    cancel: "Cancel",
    submit: "Send report",
    sending: "Sending...",
    done: "Report received. A maintainer will review it.",
    failed: "Could not send the report. Try again in a moment.",
  },
  zh: {
    trigger: "举报",
    title: "举报这个风格",
    detail: "还有什么需要我们知道的？（选填）",
    cancel: "取消",
    submit: "提交举报",
    sending: "提交中...",
    done: "举报已收到，维护者会尽快处理。",
    failed: "举报没能提交，请稍后重试。",
  },
} as const;

export function ReportButton({
  slug,
  locale,
}: {
  slug: string;
  locale: "en" | "zh";
}) {
  const t = COPY[locale];
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<ReportReason>("plagiarism");
  const [detail, setDetail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit() {
    setState("sending");
    try {
      const res = await fetch("/api/community/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, reason, detail: detail.trim() || undefined }),
      });
      if (!res.ok) throw new Error("failed");
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="font-mono text-xs text-muted-foreground">{t.done}</p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        <Flag className="h-3 w-3" />
        {t.trigger}
      </button>
    );
  }

  return (
    <div className="max-w-md rounded-lg border border-border p-4">
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {t.title}
      </p>

      <div className="mt-3 space-y-2">
        {REPORT_REASONS.map((value) => (
          <label key={value} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="report-reason"
              value={value}
              checked={reason === value}
              onChange={() => setReason(value)}
              className="h-3 w-3"
            />
            {REASON_LABELS[value][locale]}
          </label>
        ))}
      </div>

      <label className="mt-3 block text-xs text-muted-foreground" htmlFor="report-detail">
        {t.detail}
      </label>
      <textarea
        id="report-detail"
        value={detail}
        onChange={(event) => setDetail(event.target.value)}
        maxLength={500}
        rows={3}
        className="mt-1 w-full resize-none rounded-md border border-border bg-transparent p-2 text-sm"
      />

      {state === "error" ? (
        <p className="mt-2 text-xs text-red-600">{t.failed}</p>
      ) : null}

      <div className="mt-3 flex gap-3">
        <button
          type="button"
          onClick={submit}
          disabled={state === "sending"}
          className="h-9 rounded-md border border-foreground px-3 text-xs font-medium transition-colors hover:bg-foreground hover:text-background disabled:opacity-50"
        >
          {state === "sending" ? t.sending : t.submit}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="h-9 px-2 text-xs text-muted-foreground underline-offset-4 hover:underline"
        >
          {t.cancel}
        </button>
      </div>
    </div>
  );
}
