"use client";

import { useMemo, useState, useTransition } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { useI18n } from "@/lib/i18n/context";

interface RepairStyleOption {
  slug: string;
  name: string;
  nameEn: string;
  curated: boolean;
}

interface RepairResponse {
  slug: string;
  code: string;
  edits: Array<{ from: string; to: string; line: number }>;
  unfixed: Array<{ className: string; line: number; reason: string }>;
  before: { status: string; violations: unknown[]; checkedClasses: number };
  report: { status: string; violations: unknown[] };
}

const SAMPLE = `<section className="rounded-2xl border-2 bg-white/80 p-8 shadow-2xl">
  <h2 className="text-3xl font-bold">Q3 revenue</h2>
  <p className="mt-2 text-sm text-gray-500">Updated 12 minutes ago</p>
  <button className="mt-6 rounded-full bg-black px-6 py-2 text-white">Export</button>
</section>`;

export function RepairWorkbench({ styles }: { styles: RepairStyleOption[] }) {
  const { locale } = useI18n();
  const isZh = locale === "zh";
  const [slug, setSlug] = useState("neo-brutalist");
  const [code, setCode] = useState(SAMPLE);
  const [result, setResult] = useState<RepairResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const clipboard = useClipboard();

  const options = useMemo(
    () => [...styles].sort((a, b) => Number(b.curated) - Number(a.curated)),
    [styles],
  );

  async function check() {
    setError(null);
    startTransition(async () => {
      try {
        const response = await fetch(`/api/styles/${slug}/repair`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ code }),
        });
        const body = (await response.json()) as RepairResponse & { error?: string };
        if (!response.ok) {
          setError(body.error ?? (isZh ? "检查失败。" : "The check failed."));
          setResult(null);
          return;
        }
        setResult(body);
      } catch {
        setError(isZh ? "网络错误，请重试。" : "Network error. Please try again.");
      }
    });
  }

  const violationCount = result?.before.violations.length ?? 0;

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:py-16">
      <section aria-labelledby="repair-title">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
          {isZh ? "粘贴 · 检查 · 修复" : "Paste · Check · Repair"}
        </p>
        <h1 id="repair-title" className="mt-4 max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">
          {isZh ? "把 AI 生成的页面放进来，拿回改好的代码。" : "Paste an AI-generated page, get back the fixed code."}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          {isZh
            ? "选择你想要的风格，贴入 JSX 或 HTML。我们用这个风格自己的约束找出偏离，并直接替换成它自己的令牌 —— 替换来自风格本身，不是猜测。"
            : "Pick the style you meant, then paste JSX or HTML. We check it against that style's own constraints and swap in its own tokens — the replacements come from the style, not from a guess."}
        </p>

        <span className="mt-8 block text-sm font-medium" id="repair-style-label">
          {isZh ? "目标风格" : "Target style"}
        </span>
        <Select value={slug} onValueChange={setSlug}>
          <SelectTrigger aria-labelledby="repair-style-label" className="mt-2 w-full max-w-md px-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[320px]">
            {options.map((option) => (
              <SelectItem key={option.slug} value={option.slug}>
                {(isZh ? option.name : option.nameEn) +
                  (option.curated ? (isZh ? " · 规则详尽" : " · detailed rules") : "")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label className="mt-6 block text-sm font-medium" htmlFor="repair-code">
          {isZh ? "粘贴代码" : "Paste code"}
        </label>
        <textarea
          id="repair-code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          spellCheck={false}
          rows={14}
          className="mt-2 w-full resize-y border border-border bg-background p-4 font-mono text-[13px] leading-6"
        />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={check}
            disabled={pending || code.trim().length === 0}
            className="border border-foreground bg-foreground px-5 py-2 text-sm font-semibold text-background disabled:opacity-50"
          >
            {pending ? (isZh ? "检查中…" : "Checking…") : isZh ? "检查并修复" : "Check and repair"}
          </button>
          {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
        </div>
      </section>

      <aside className="grid content-start gap-4" aria-live="polite">
        {result ? (
          <>
            <div className="border border-border p-5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                {isZh ? "检查结果" : "Verdict"}
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {result.before.status === "pass"
                  ? isZh ? "没有偏离" : "Nothing to fix"
                  : isZh
                    ? `发现 ${violationCount} 处偏离`
                    : `${violationCount} deviation${violationCount === 1 ? "" : "s"} found`}
              </p>
              <p className="mt-1 text-sm text-muted">
                {isZh
                  ? `检查了 ${result.before.checkedClasses} 个类名；修复后状态 ${result.report.status}。`
                  : `Checked ${result.before.checkedClasses} class tokens; the repaired code reports ${result.report.status}.`}
              </p>
            </div>

            {result.edits.length > 0 ? (
              <div className="border border-border p-5">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  {isZh ? "已替换" : "Replaced"}
                </p>
                <ul className="mt-3 space-y-2 font-mono text-xs">
                  {result.edits.map((edit) => (
                    <li key={`${edit.line}-${edit.from}`} className="break-all">
                      <span className="text-muted">L{edit.line}</span>{" "}
                      <span className="line-through opacity-60">{edit.from}</span>{" "}
                      <span aria-hidden="true">→</span>{" "}
                      <span className="font-semibold">{edit.to}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {result.unfixed.length > 0 ? (
              <div className="border border-border p-5">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  {isZh ? "需要你手动决定" : "Needs your call"}
                </p>
                <ul className="mt-3 space-y-2 text-xs">
                  {result.unfixed.map((item) => (
                    <li key={`${item.line}-${item.className}`}>
                      <span className="font-mono line-through opacity-60">{item.className}</span>
                      <span className="mt-1 block text-muted">{item.reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => clipboard.copy(result.code, "repair-result")}
              className="border border-border px-4 py-2 text-sm hover:border-foreground"
            >
              {isZh ? "复制修复后的代码" : "Copy repaired code"}
            </button>
            {clipboard.result?.state === "copied" ? (
              <p className="text-xs text-muted">{isZh ? "已复制" : "Copied"}</p>
            ) : null}
            <pre className="max-h-[420px] overflow-auto border border-border bg-surface p-4 font-mono text-[12px] leading-6">
              <code>{result.code}</code>
            </pre>
          </>
        ) : (
          <div className="border border-border p-5 text-sm leading-6 text-muted">
            {isZh
              ? "结果会显示在这里：找到几处偏离、每一处被替换成了什么、以及哪些需要你自己决定。"
              : "Results appear here: how many deviations were found, what each one became, and which ones need your judgement."}
          </div>
        )}
      </aside>
    </div>
  );
}
