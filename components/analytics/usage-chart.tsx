"use client";

interface UsageBarProps {
  label: string;
  sublabel?: string;
  count: number;
  maxCount: number;
  color?: string;
}

function UsageBar({ label, sublabel, count, maxCount, color }: UsageBarProps) {
  const barWidth = maxCount > 0 ? Math.max((count / maxCount) * 100, 4) : 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 min-w-0">
          <span className="truncate">{label}</span>
          {sublabel && (
            <span className="text-xs text-muted truncate">{sublabel}</span>
          )}
        </div>
        <span className="text-xs text-muted tabular-nums ml-2 shrink-0">
          {count}
        </span>
      </div>
      <div className="h-2 bg-zinc-100 dark:bg-zinc-800">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${barWidth}%`,
            backgroundColor: color || "var(--color-foreground)",
            opacity: 0.6,
          }}
        />
      </div>
    </div>
  );
}

interface UsageChartProps {
  items: { label: string; sublabel?: string; count: number; color?: string }[];
}

export function UsageChart({ items }: UsageChartProps) {
  if (items.length === 0) return null;

  const maxCount = items[0]?.count || 1;

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <UsageBar
          key={item.label}
          label={item.label}
          sublabel={item.sublabel}
          count={item.count}
          maxCount={maxCount}
          color={item.color}
        />
      ))}
    </div>
  );
}
