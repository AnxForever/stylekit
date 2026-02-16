"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/analyzer";
import { AnalyzeForm } from "@/components/analyzer/analyze-form";
import { MatchResults } from "@/components/analyzer/match-results";

export function AnalyzeContent() {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
      <div className="mb-8">
        <p className="text-sm font-medium text-muted-foreground mb-1">
          Style Analyzer
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Detect Your Design Style
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Paste your component code below and we will analyze which StyleKit
          design style best matches your existing Tailwind CSS patterns.
        </p>
      </div>

      <div className="space-y-8">
        <AnalyzeForm onResult={setResult} />

        {result && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Analysis Results
            </h2>
            <MatchResults result={result} />
          </div>
        )}
      </div>
    </div>
  );
}
