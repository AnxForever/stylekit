"use client";

import { useMemo } from "react";
import { AlertTriangle, AlertCircle, Info, Lightbulb } from "lucide-react";
import { lintCode, type Violation } from "@/lib/linter";

interface PlaygroundLintPanelProps {
  code: string;
  styleSlug: string;
}

const severityIcon = {
  error: AlertCircle,
  warning: AlertTriangle,
} as const;

const severityColor = {
  error: "text-red-500 bg-red-500/10",
  warning: "text-yellow-500 bg-yellow-500/10",
} as const;

export function PlaygroundLintPanel({ code, styleSlug }: PlaygroundLintPanelProps) {
  const result = useMemo(() => {
    if (!code.trim()) return null;
    try {
      return lintCode(styleSlug, code);
    } catch {
      return null;
    }
  }, [code, styleSlug]);

  const violations = result?.violations ?? [];
  const errorCount = result?.stats.errorCount ?? 0;
  const warningCount = result?.stats.warningCount ?? 0;

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-1.5 border-b border-border bg-zinc-50 dark:bg-zinc-900 flex items-center justify-between">
        <span className="text-xs text-muted uppercase tracking-wider">Lint</span>
        <div className="flex items-center gap-3 text-xs tabular-nums">
          {errorCount > 0 && (
            <span className="flex items-center gap-1 text-red-500">
              <AlertCircle className="w-3 h-3" /> {errorCount}
            </span>
          )}
          {warningCount > 0 && (
            <span className="flex items-center gap-1 text-yellow-500">
              <AlertTriangle className="w-3 h-3" /> {warningCount}
            </span>
          )}
          {violations.length === 0 && (
            <span className="text-emerald-500">No issues</span>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {violations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted text-xs gap-2 py-8">
            <Info className="w-5 h-5 opacity-30" />
            <span>No style issues detected</span>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {violations.map((v, i) => (
              <ViolationItem key={`${v.class}-${v.line}-${i}`} violation={v} />
            ))}
          </ul>
        )}
        {result && result.suggestions.length > 0 && (
          <div className="border-t border-border px-3 py-2">
            <div className="text-[10px] text-muted uppercase tracking-wider mb-1">Suggestions</div>
            {result.suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[11px] text-muted py-1">
                <Lightbulb className="w-3 h-3 mt-0.5 shrink-0 text-yellow-500/70" />
                <span>{s.description}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ViolationItem({ violation }: { violation: Violation }) {
  const sev = violation.severity === "error" ? "error" : "warning";
  const Icon = severityIcon[sev];
  const colors = severityColor[sev];

  return (
    <div className={`px-3 py-2 ${colors.split(" ")[1]}`}>
      <div className="flex items-start gap-2">
        <Icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${colors.split(" ")[0]}`} />
        <div className="flex-1 min-w-0">
          <span className="text-xs font-medium text-foreground">{violation.reason}</span>
          <div className="flex items-center gap-2 mt-0.5">
            <code className="text-[10px] text-muted bg-muted/10 px-1 rounded">{violation.class}</code>
            {violation.line && <span className="text-[10px] text-muted">L{violation.line}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
