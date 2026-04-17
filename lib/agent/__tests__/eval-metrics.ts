import type { EvalResult, EvalTurnResult } from "./eval-harness";
import type { EvalScenario } from "./eval-scenarios";

/**
 * Agent eval metrics collection & scoring.
 *
 * Design principles:
 * - Each metric is computable from a (scenario, result) pair alone — no
 *   external state, fully reproducible.
 * - Metrics range [0, 1] (or null when not applicable) so they can be
 *   averaged across scenarios or compared across runs.
 * - A scenario can fail one metric but pass others; the scoreboard surfaces
 *   the breakdown instead of a single pass/fail bit.
 */

export interface ScenarioMetrics {
  scenarioId: string;
  /** Phase order matched expected across turns: matched/total */
  phaseProgressionAccuracy: number;
  /** Slot-fill set matched expected where expectedSlotsFilled declared */
  slotFillAccuracy: number | null;
  /** codePrompt presence matched expected where shouldProduceCodePrompt declared */
  codePromptCorrectness: number | null;
  /** Final turn reached phase="done" (0 or 1) */
  terminationCorrectness: 0 | 1;
  /** Total turns that produced errors (lower is better) */
  errorCount: number;
  /** Overall passed flag */
  passed: boolean;
  /** L6: summed cost across all turns (USD) */
  totalCostUsd: number;
  /** L6: summed duration across all turns (ms) */
  totalDurationMs: number;
  /** L6: summed LLM calls */
  llmCallCount: number;
}

export interface Scoreboard {
  runAt: string;
  scenarios: ScenarioMetrics[];
  summary: {
    totalScenarios: number;
    passedScenarios: number;
    passRate: number;
    avgPhaseProgression: number;
    avgSlotFill: number;
    avgCodePromptCorrectness: number;
    avgTerminationCorrectness: number;
    totalErrors: number;
    /** L6: aggregated cost + latency */
    totalCostUsd: number;
    avgCostPerScenarioUsd: number;
    avgDurationMs: number;
    totalLlmCalls: number;
  };
}

/* ---------- Per-scenario metric computation ---------- */

export function computeScenarioMetrics(
  scenario: EvalScenario,
  result: EvalResult
): ScenarioMetrics {
  const totalCostUsd = result.turns.reduce(
    (sum, turn) => sum + (turn.turnMetrics?.totalCostUsd ?? 0),
    0
  );
  const totalDurationMs = result.turns.reduce(
    (sum, turn) => sum + (turn.turnMetrics?.totalDurationMs ?? 0),
    0
  );
  const llmCallCount = result.turns.reduce(
    (sum, turn) => sum + (turn.turnMetrics?.llmCallCount ?? 0),
    0
  );
  return {
    scenarioId: scenario.id,
    phaseProgressionAccuracy: computePhaseProgression(scenario, result),
    slotFillAccuracy: computeSlotFillAccuracy(scenario, result),
    codePromptCorrectness: computeCodePromptCorrectness(scenario, result),
    terminationCorrectness: computeTerminationCorrectness(result),
    errorCount: result.errors.length,
    passed: result.passed,
    totalCostUsd,
    totalDurationMs,
    llmCallCount,
  };
}

function computePhaseProgression(scenario: EvalScenario, result: EvalResult): number {
  const total = scenario.turns.length;
  if (total === 0) return 1;
  let matched = 0;
  for (let i = 0; i < total; i++) {
    const expected = scenario.turns[i].expectedPhase;
    const actual = result.turns[i]?.phase;
    if (actual === expected) matched += 1;
  }
  return matched / total;
}

function computeSlotFillAccuracy(scenario: EvalScenario, result: EvalResult): number | null {
  const eligibleTurns = scenario.turns.filter((t) => t.expectedSlotsFilled);
  if (eligibleTurns.length === 0) return null;
  let matched = 0;
  for (let i = 0; i < scenario.turns.length; i++) {
    const expected = scenario.turns[i].expectedSlotsFilled;
    if (!expected) continue;
    const actual = result.turns[i]?.slotsFilled ?? [];
    if (setsEqual(actual, expected)) matched += 1;
  }
  return matched / eligibleTurns.length;
}

function computeCodePromptCorrectness(scenario: EvalScenario, result: EvalResult): number | null {
  const eligibleTurns = scenario.turns.filter(
    (t) => t.shouldProduceCodePrompt !== undefined
  );
  if (eligibleTurns.length === 0) return null;
  let matched = 0;
  for (let i = 0; i < scenario.turns.length; i++) {
    const expected = scenario.turns[i].shouldProduceCodePrompt;
    if (expected === undefined) continue;
    const actual = result.turns[i]?.hasCodePrompt ?? false;
    if (actual === expected) matched += 1;
  }
  return matched / eligibleTurns.length;
}

function computeTerminationCorrectness(result: EvalResult): 0 | 1 {
  const last: EvalTurnResult | undefined = result.turns[result.turns.length - 1];
  return last?.phase === "done" ? 1 : 0;
}

function setsEqual(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  for (let i = 0; i < sortedA.length; i++) {
    if (sortedA[i] !== sortedB[i]) return false;
  }
  return true;
}

/* ---------- Aggregate scoreboard ---------- */

export function buildScoreboard(
  scenarios: readonly EvalScenario[],
  results: readonly EvalResult[]
): Scoreboard {
  if (scenarios.length !== results.length) {
    throw new Error(
      `Scoreboard mismatch: ${scenarios.length} scenarios vs ${results.length} results`
    );
  }

  const scenarioMetrics: ScenarioMetrics[] = scenarios.map((scenario, i) =>
    computeScenarioMetrics(scenario, results[i])
  );

  const total = scenarioMetrics.length;
  const passed = scenarioMetrics.filter((s) => s.passed).length;
  const avg = (picker: (s: ScenarioMetrics) => number | null): number => {
    const values = scenarioMetrics.map(picker).filter((v): v is number => v !== null);
    if (values.length === 0) return 0;
    return values.reduce((sum, v) => sum + v, 0) / values.length;
  };

  return {
    runAt: new Date().toISOString(),
    scenarios: scenarioMetrics,
    summary: {
      totalScenarios: total,
      passedScenarios: passed,
      passRate: total === 0 ? 0 : passed / total,
      avgPhaseProgression: avg((s) => s.phaseProgressionAccuracy),
      avgSlotFill: avg((s) => s.slotFillAccuracy),
      avgCodePromptCorrectness: avg((s) => s.codePromptCorrectness),
      avgTerminationCorrectness: avg((s) => s.terminationCorrectness),
      totalErrors: scenarioMetrics.reduce((sum, s) => sum + s.errorCount, 0),
      totalCostUsd: scenarioMetrics.reduce((sum, s) => sum + s.totalCostUsd, 0),
      avgCostPerScenarioUsd:
        total === 0
          ? 0
          : scenarioMetrics.reduce((sum, s) => sum + s.totalCostUsd, 0) / total,
      avgDurationMs:
        total === 0
          ? 0
          : scenarioMetrics.reduce((sum, s) => sum + s.totalDurationMs, 0) / total,
      totalLlmCalls: scenarioMetrics.reduce((sum, s) => sum + s.llmCallCount, 0),
    },
  };
}

/* ---------- Human-readable printer ---------- */

export function formatScoreboard(scoreboard: Scoreboard): string {
  const { summary, scenarios } = scoreboard;
  const lines: string[] = [];

  lines.push("==================== AGENT EVAL SCOREBOARD ====================");
  lines.push(`Run at: ${scoreboard.runAt}`);
  lines.push("");
  lines.push("Scenarios:");
  lines.push("");
  lines.push(
    [
      "  id".padEnd(30),
      "pass".padEnd(5),
      "phase".padEnd(7),
      "slot".padEnd(7),
      "cp".padEnd(5),
      "term".padEnd(5),
      "err".padEnd(4),
      "calls".padEnd(6),
      "cost$".padEnd(9),
      "ms",
    ].join(" ")
  );
  lines.push("  " + "-".repeat(82));

  for (const s of scenarios) {
    lines.push(
      [
        `  ${s.scenarioId}`.padEnd(30),
        (s.passed ? "✔" : "✘").padEnd(5),
        pct(s.phaseProgressionAccuracy).padEnd(7),
        pct(s.slotFillAccuracy).padEnd(7),
        pct(s.codePromptCorrectness).padEnd(5),
        String(s.terminationCorrectness).padEnd(5),
        String(s.errorCount).padEnd(4),
        String(s.llmCallCount).padEnd(6),
        s.totalCostUsd.toFixed(4).padEnd(9),
        String(s.totalDurationMs),
      ].join(" ")
    );
  }

  lines.push("");
  lines.push("Summary:");
  lines.push(
    `  Pass rate:               ${summary.passedScenarios}/${summary.totalScenarios} (${pct(summary.passRate)})`
  );
  lines.push(`  Phase progression:       ${pct(summary.avgPhaseProgression)}`);
  lines.push(`  Slot fill:               ${pct(summary.avgSlotFill)}`);
  lines.push(`  Code prompt correctness: ${pct(summary.avgCodePromptCorrectness)}`);
  lines.push(`  Termination correctness: ${pct(summary.avgTerminationCorrectness)}`);
  lines.push(`  Total errors:            ${summary.totalErrors}`);
  lines.push(`  Total LLM calls:         ${summary.totalLlmCalls}`);
  lines.push(`  Total cost:              $${summary.totalCostUsd.toFixed(4)}`);
  lines.push(`  Avg cost per scenario:   $${summary.avgCostPerScenarioUsd.toFixed(4)}`);
  lines.push(`  Avg duration per scen.:  ${summary.avgDurationMs.toFixed(0)}ms`);
  lines.push("================================================================");

  return lines.join("\n");
}

function pct(value: number | null): string {
  if (value === null) return "   n/a";
  return `${(value * 100).toFixed(1)}%`;
}

/* ---------- Baseline comparison ---------- */

export interface BaselineComparison {
  regressed: Array<{ scenarioId: string; metric: string; before: number; after: number }>;
  improved: Array<{ scenarioId: string; metric: string; before: number; after: number }>;
}

export function compareToBaseline(
  baseline: Scoreboard,
  current: Scoreboard,
  threshold = 0.001
): BaselineComparison {
  const regressed: BaselineComparison["regressed"] = [];
  const improved: BaselineComparison["improved"] = [];

  const baselineById = new Map(baseline.scenarios.map((s) => [s.scenarioId, s]));

  for (const cur of current.scenarios) {
    const prev = baselineById.get(cur.scenarioId);
    if (!prev) continue;
    compareField(cur, prev, "phaseProgressionAccuracy", threshold, regressed, improved);
    compareField(cur, prev, "slotFillAccuracy", threshold, regressed, improved);
    compareField(cur, prev, "codePromptCorrectness", threshold, regressed, improved);
  }

  return { regressed, improved };
}

function compareField(
  cur: ScenarioMetrics,
  prev: ScenarioMetrics,
  field: keyof Pick<
    ScenarioMetrics,
    "phaseProgressionAccuracy" | "slotFillAccuracy" | "codePromptCorrectness"
  >,
  threshold: number,
  regressed: BaselineComparison["regressed"],
  improved: BaselineComparison["improved"]
): void {
  const before = prev[field];
  const after = cur[field];
  if (before === null || after === null) return;
  const delta = after - before;
  if (delta < -threshold) {
    regressed.push({ scenarioId: cur.scenarioId, metric: field, before, after });
  } else if (delta > threshold) {
    improved.push({ scenarioId: cur.scenarioId, metric: field, before, after });
  }
}
