"use client";

import Link from "next/link";
import type { AnalysisResult, StyleMatch } from "@/lib/analyzer";

function ConfidenceBar({ value }: { value: number }) {
  const width = Math.max(0, Math.min(100, value));
  let color = "bg-red-500";
  if (value >= 60) color = "bg-green-500";
  else if (value >= 40) color = "bg-yellow-500";
  else if (value >= 20) color = "bg-orange-500";

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full bg-muted/20 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500`}
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="text-sm font-mono font-medium tabular-nums w-10 text-right">
        {value}%
      </span>
    </div>
  );
}

function MatchCard({ match, rank }: { match: StyleMatch; rank: number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted/20 text-xs font-bold text-muted-foreground">
            {rank}
          </span>
          <div>
            <h3 className="font-semibold text-foreground">{match.name}</h3>
            <p className="text-xs text-muted-foreground font-mono">
              {match.slug}
            </p>
          </div>
        </div>
        <Link
          href={`/styles/${match.slug}`}
          className="text-xs text-primary hover:underline whitespace-nowrap"
        >
          View style
        </Link>
      </div>

      <ConfidenceBar value={match.confidence} />

      <p className="text-sm text-muted-foreground leading-relaxed">
        {match.explanation}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
        <Detail label="Class overlap" value={`${match.matchDetails.classOverlap}%`} />
        <Detail label="Required" value={`${match.matchDetails.requiredPresence}%`} />
        <Detail label="Forbidden" value={`${match.matchDetails.forbiddenViolations}`} />
        <Detail label="Pattern" value={`${match.matchDetails.patternScore}%`} />
        <Detail label="Context" value={`${match.matchDetails.environmentScore}%`} />
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded bg-muted/10 px-2 py-1">
      <span className="text-muted-foreground">{label}:</span>{" "}
      <span className="font-mono font-medium text-foreground">{value}</span>
    </div>
  );
}

export function MatchResults({ result }: { result: AnalysisResult }) {
  if (result.topMatches.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center text-muted-foreground">
        No Tailwind classes detected in the provided code. Paste JSX/TSX
        containing className attributes to analyze.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span>
          Classes found:{" "}
          <strong className="text-foreground">{result.classesFound.length}</strong>
        </span>
        {result.dominantPatterns.length > 0 && (
          <span>
            Patterns:{" "}
            <strong className="text-foreground">
              {result.dominantPatterns.join(", ")}
            </strong>
          </span>
        )}
        {result.environmentHints && result.environmentHints.length > 0 && (
          <span>
            Context hints:{" "}
            <strong className="text-foreground">
              {result.environmentHints.join(", ")}
            </strong>
          </span>
        )}
      </div>

      {/* Ranked matches */}
      <div className="space-y-3">
        {result.topMatches.map((match, i) => (
          <MatchCard key={match.slug} match={match} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}
