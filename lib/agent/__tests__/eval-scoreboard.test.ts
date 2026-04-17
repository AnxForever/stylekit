import { describe, it, afterAll, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { evalScenarios } from "./eval-scenarios";
import { runEvalScenario, type EvalResult } from "./eval-harness";
import {
  buildScoreboard,
  formatScoreboard,
  type Scoreboard,
} from "./eval-metrics";

/**
 * Scoreboard test: runs ALL eval scenarios and produces a scoreboard JSON.
 *
 * Unlike eval.test.ts which asserts per-scenario expectations, this file
 * aggregates results into metrics and writes a machine-readable scoreboard
 * at docs/agent-learning/eval-latest.json. The pass-rate assertion at the
 * end doubles as a CI gate for regressions.
 *
 * Run via: npm run eval
 */

const LATEST_PATH = path.resolve(
  process.cwd(),
  "docs",
  "agent-learning",
  "eval-latest.json"
);

let scoreboard: Scoreboard | null = null;

describe("agent eval scoreboard", () => {
  it("runs all scenarios and produces scoreboard", async () => {
    const results: EvalResult[] = [];
    for (const scenario of evalScenarios) {
      const result = await runEvalScenario(scenario);
      results.push(result);
    }
    scoreboard = buildScoreboard(evalScenarios, results);

    /* Structural invariants */
    expect(scoreboard.scenarios.length).toBe(evalScenarios.length);
    expect(scoreboard.summary.totalScenarios).toBe(evalScenarios.length);
  });

  it("pass rate meets threshold", () => {
    expect(scoreboard, "scoreboard built by previous test").toBeTruthy();
    expect(
      scoreboard!.summary.passRate,
      `Pass rate must be >= 0.8 (got ${scoreboard!.summary.passRate})`
    ).toBeGreaterThanOrEqual(0.8);
  });

  afterAll(() => {
    if (!scoreboard) return;
    fs.mkdirSync(path.dirname(LATEST_PATH), { recursive: true });
    fs.writeFileSync(LATEST_PATH, JSON.stringify(scoreboard, null, 2));
    /* eslint-disable no-console */
    console.log("\n" + formatScoreboard(scoreboard));
    console.log(
      `\n  Scoreboard written to docs/agent-learning/eval-latest.json`
    );
    /* eslint-enable no-console */
  });
});
