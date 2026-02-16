"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";

interface VersionBadgeProps {
  version: string;
  changelog?: { version: string; date: string; changes: string[] }[];
}

export function VersionBadge({ version, changelog }: VersionBadgeProps) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useI18n();

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-border bg-zinc-50 text-muted hover:bg-zinc-100 hover:text-foreground transition-colors"
        title={t("version.tooltip")}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        v{version}
      </button>

      {expanded && changelog && changelog.length > 0 && (
        <div className="absolute top-full left-0 mt-1 z-50 w-72 border border-border bg-white shadow-lg">
          <div className="px-3 py-2 border-b border-border">
            <p className="text-xs font-medium">{t("version.changelog")}</p>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {changelog.map((entry) => (
              <div key={entry.version} className="px-3 py-2 border-b border-border last:border-b-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">v{entry.version}</span>
                  <span className="text-xs text-muted">{entry.date}</span>
                </div>
                <ul className="space-y-0.5">
                  {entry.changes.map((change, i) => (
                    <li key={i} className="text-xs text-muted">
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
