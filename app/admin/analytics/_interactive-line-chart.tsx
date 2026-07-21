"use client";

import { useId, useMemo, useState } from "react";

export interface AnalyticsChartPoint {
  key: string;
  label: string;
  primary: number;
  secondary?: number;
}

export function InteractiveLineChart({
  points,
  primaryLabel,
  secondaryLabel,
  secondaryIsComparison = false,
  ariaLabel,
}: {
  points: AnalyticsChartPoint[];
  primaryLabel: string;
  secondaryLabel?: string;
  secondaryIsComparison?: boolean;
  ariaLabel: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const gradientId = useId().replace(/:/g, "");
  const width = 960;
  const height = 286;
  const chartLeft = 58;
  const chartRight = 930;
  const chartTop = 16;
  const chartBottom = 238;
  const plottedValues = points.flatMap((point) => point.secondary == null ? [point.primary] : [point.primary, point.secondary]);
  const dataMin = plottedValues.length > 0 ? Math.min(...plottedValues) : 0;
  const dataMax = Math.max(...plottedValues, 1);
  const span = Math.max(dataMax - dataMin, 1);
  const yMin = dataMin <= 0 ? 0 : Math.max(0, dataMin - span * 0.12);
  const yMax = dataMax + span * 0.12;
  const xFor = (index: number) =>
    points.length <= 1
      ? (chartLeft + chartRight) / 2
      : chartLeft + (index / (points.length - 1)) * (chartRight - chartLeft);
  const yFor = (value: number) =>
    chartBottom - ((value - yMin) / Math.max(yMax - yMin, 1)) * (chartBottom - chartTop);
  const primaryCoordinates = points.map(
    (point, index) => [xFor(index), yFor(point.primary)] as const
  );
  const secondaryCoordinates = points.map(
    (point, index) => [xFor(index), yFor(point.secondary ?? 0)] as const
  );
  const primaryPath = buildMonotonePath(primaryCoordinates);
  const secondaryPath = buildMonotonePath(secondaryCoordinates);
  const areaPath = primaryPath
    ? `${primaryPath} L ${chartRight} ${chartBottom} L ${chartLeft} ${chartBottom} Z`
    : "";
  const active = activeIndex == null ? null : points[activeIndex] ?? null;
  const activeX = activeIndex == null ? null : xFor(activeIndex);

  const tableRows = useMemo(() => points, [points]);
  const xTickIndexes = useMemo(() => getXAxisTickIndexes(points.length), [points.length]);

  function updateActiveFromPointer(event: React.PointerEvent<SVGSVGElement>) {
    if (points.length === 0) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const svgX = ((event.clientX - bounds.left) / bounds.width) * width;
    const plotX = Math.max(chartLeft, Math.min(chartRight, svgX));
    const index = Math.round(((plotX - chartLeft) / (chartRight - chartLeft)) * Math.max(points.length - 1, 0));
    setActiveIndex(index);
  }

  return (
    <div className="relative mt-4">
      <div className="mb-4 flex flex-wrap gap-4 text-xs text-muted">
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-5 bg-[var(--admin-status-blue)]" />
          {primaryLabel}
        </span>
        {secondaryLabel ? (
          <span className="flex items-center gap-2">
            <span className="w-5 border-t border-dashed border-[var(--admin-text-muted)]" />
            {secondaryLabel}
          </span>
        ) : null}
      </div>
      <div className="relative mx-auto w-full max-w-[1040px]">
        <svg
          className="mx-auto block h-auto w-full touch-none overflow-visible"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={ariaLabel}
          onPointerMove={updateActiveFromPointer}
          onPointerLeave={() => setActiveIndex(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--admin-status-blue)" stopOpacity="0.14" />
              <stop offset="1" stopColor="var(--admin-status-blue)" stopOpacity="0.01" />
            </linearGradient>
          </defs>
          {[0, 0.5, 1].map((ratio) => {
            const y = chartTop + (chartBottom - chartTop) * ratio;
            return (
              <g key={ratio}>
                <line x1={chartLeft} x2={chartRight} y1={y} y2={y} stroke="var(--admin-border-soft)" />
                <text x={chartLeft - 10} y={y + 4} textAnchor="end" fill="var(--admin-text-muted)" fontSize="10" fontFamily="var(--font-geist-mono)">
                  {Math.round(yMax - (yMax - yMin) * ratio).toLocaleString("zh-CN")}
                </text>
              </g>
            );
          })}
          <line x1={chartLeft} x2={chartRight} y1={chartBottom} y2={chartBottom} stroke="var(--admin-border-emphasis)" />
          {xTickIndexes.map((index) => {
            const x = xFor(index);
            return <g key={`x-${points[index]?.key ?? index}`}><line x1={x} x2={x} y1={chartBottom} y2={chartBottom + 5} stroke="var(--admin-border-emphasis)" /><text x={x} y={chartBottom + 21} textAnchor={index === 0 ? "start" : index === points.length - 1 ? "end" : "middle"} fill="var(--admin-text-muted)" fontSize="10" fontFamily="var(--font-geist-mono)">{formatXAxisLabel(points[index]?.key, points[0]?.key, points.at(-1)?.key)}</text></g>;
          })}
          {areaPath ? <path d={areaPath} fill={`url(#${gradientId})`} /> : null}
          {secondaryLabel ? (
            <path
              d={secondaryPath}
              fill="none"
              stroke="var(--admin-text-muted)"
              strokeDasharray="5 5"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          ) : null}
          <path
            d={primaryPath}
            fill="none"
            stroke="var(--admin-status-blue)"
            strokeWidth="2.25"
            vectorEffect="non-scaling-stroke"
          />
          {active && activeX != null ? (
            <>
              <line
                x1={activeX}
                x2={activeX}
                y1={chartTop}
                y2={chartBottom}
                stroke="var(--admin-border-emphasis)"
              />
              <circle
                cx={activeX}
                cy={yFor(active.primary)}
                r="5"
                fill="var(--admin-panel)"
                stroke="var(--admin-status-blue)"
                strokeWidth="2"
              />
              {secondaryLabel ? (
                <circle
                  cx={activeX}
                  cy={yFor(active.secondary ?? 0)}
                  r="4"
                  fill="var(--admin-panel)"
                  stroke="var(--admin-text-muted)"
                  strokeWidth="1.5"
                />
              ) : null}
            </>
          ) : null}
          {points.map((point, index) => (
            <circle
              key={point.key}
              cx={xFor(index)}
              cy={yFor(point.primary)}
              r="10"
              fill="transparent"
              tabIndex={0}
              aria-label={`${point.label}，${primaryLabel} ${point.primary}${secondaryLabel ? `，${secondaryLabel} ${point.secondary ?? 0}` : ""}`}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
            />
          ))}
          {points.length > 0 && activeIndex == null ? (
            <circle
              cx={xFor(points.length - 1)}
              cy={yFor(points.at(-1)?.primary ?? 0)}
              r="4.5"
              fill="var(--admin-status-blue)"
              stroke="var(--admin-panel)"
              strokeWidth="2"
            />
          ) : null}
        </svg>

        {active && activeX != null ? (
          <div
            className="pointer-events-none absolute top-2 z-10 min-w-36 -translate-x-1/2 rounded-md bg-[var(--admin-panel)] px-3 py-2 text-xs shadow-[var(--admin-shadow-menu)]"
            style={{ left: `${(activeX / width) * 100}%` }}
            role="status"
          >
            <p className="font-medium text-foreground">{active.label}</p>
            <p className="mt-1 flex justify-between gap-4 text-muted">
              <span>{primaryLabel}</span>
              <span className="font-mono tabular-nums text-foreground">
                {active.primary.toLocaleString("zh-CN")}
              </span>
            </p>
            {secondaryLabel ? (
              <p className="mt-1 flex justify-between gap-4 text-muted">
                <span>{secondaryLabel}</span>
                <span className="font-mono tabular-nums text-foreground">
                  {(active.secondary ?? 0).toLocaleString("zh-CN")}
                </span>
              </p>
            ) : null}
            {secondaryIsComparison && active.secondary != null && active.secondary > 0 ? (
              <p className="mt-2 border-t border-[var(--admin-border-soft)] pt-2 text-right font-mono text-[10px] text-muted">
                {`${((active.primary - active.secondary) / active.secondary * 100) >= 0 ? "+" : ""}${((active.primary - active.secondary) / active.secondary * 100).toFixed(1)}%`}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <details className="mt-4 text-xs text-muted">
        <summary className="w-fit cursor-pointer rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:shadow-[var(--admin-focus-ring)]">
          查看图表数据
        </summary>
        <div className="mt-3 max-h-64 overflow-auto rounded-md shadow-[var(--admin-shadow-border)]">
          <table className="w-full border-collapse text-left">
            <thead className="sticky top-0 bg-[var(--admin-panel)] text-muted">
              <tr>
                <th className="px-3 py-2 font-medium">时间</th>
                <th className="px-3 py-2 text-right font-medium">{primaryLabel}</th>
                {secondaryLabel ? (
                  <th className="px-3 py-2 text-right font-medium">{secondaryLabel}</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((point) => (
                <tr key={point.key} className="shadow-[0_-1px_0_0_var(--admin-border-soft)]">
                  <td className="px-3 py-2">{point.label}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums">{point.primary}</td>
                  {secondaryLabel ? (
                    <td className="px-3 py-2 text-right font-mono tabular-nums">{point.secondary ?? 0}</td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

function getXAxisTickIndexes(length: number): number[] {
  if (length <= 1) return length === 1 ? [0] : [];
  const tickCount = Math.min(length, 5);
  return Array.from(new Set(Array.from({ length: tickCount }, (_, index) => Math.round((index / (tickCount - 1)) * (length - 1)))));
}

function formatXAxisLabel(key: string | undefined, firstKey?: string, lastKey?: string): string {
  if (!key) return "";
  const date = new Date(key);
  if (Number.isNaN(date.getTime())) return key;
  const spanMs = firstKey && lastKey ? new Date(lastKey).getTime() - new Date(firstKey).getTime() : 0;
  return spanMs <= 36 * 60 * 60 * 1000
    ? date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false })
    : date.toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" });
}

function buildMonotonePath(
  coordinates: ReadonlyArray<readonly [number, number]>
): string {
  if (coordinates.length === 0) return "";
  if (coordinates.length === 1) {
    return `M ${coordinates[0][0]} ${coordinates[0][1]}`;
  }

  const segmentSlopes = coordinates.slice(0, -1).map((point, index) => {
    const next = coordinates[index + 1];
    return (next[1] - point[1]) / (next[0] - point[0]);
  });
  const tangents = coordinates.map((_, index) => {
    if (index === 0) return segmentSlopes[0];
    if (index === coordinates.length - 1) return segmentSlopes.at(-1) ?? 0;
    return (segmentSlopes[index - 1] + segmentSlopes[index]) / 2;
  });

  for (let index = 0; index < segmentSlopes.length; index += 1) {
    const slope = segmentSlopes[index];
    if (slope === 0) {
      tangents[index] = 0;
      tangents[index + 1] = 0;
      continue;
    }

    const leftRatio = tangents[index] / slope;
    const rightRatio = tangents[index + 1] / slope;
    const magnitude = Math.hypot(leftRatio, rightRatio);
    if (magnitude > 3) {
      const scale = 3 / magnitude;
      tangents[index] = scale * leftRatio * slope;
      tangents[index + 1] = scale * rightRatio * slope;
    }
  }

  let path = `M ${coordinates[0][0]} ${coordinates[0][1]}`;
  for (let index = 0; index < coordinates.length - 1; index += 1) {
    const current = coordinates[index];
    const next = coordinates[index + 1];
    const width = next[0] - current[0];
    path += ` C ${current[0] + width / 3} ${current[1] + (tangents[index] * width) / 3}, ${next[0] - width / 3} ${next[1] - (tangents[index + 1] * width) / 3}, ${next[0]} ${next[1]}`;
  }
  return path;
}
