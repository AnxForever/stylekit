/**
 * Submission framework contracts.
 *
 * One pipeline serves every kind of submission: validate the payload against a
 * kind-specific gate set, attach soft quality signals, then hand the accepted
 * payload to a kind-specific publisher. Adding a kind means adding gates and an
 * adapter, not touching the API routes or the review console.
 */

/** Content types that can be submitted. Only "style" is implemented today. */
export type SubmissionKind = "style" | "template";

/**
 * Outcome of one gate.
 *
 * Hard gates block a submission; soft signals never do. The split is not a
 * matter of taste: every hard gate here was calibrated against the existing
 * 146-style library and produces zero false positives on it. Anything our own
 * library cannot pass is a soft signal by definition.
 */
export interface GateResult {
  id: string;
  /** Short human-readable label, shown in the submit form and review console. */
  label: string;
  passed: boolean;
  /** Why it failed, phrased as an instruction the submitter can act on. */
  detail: string;
  severity: "blocking" | "advisory";
}

export interface QualitySignal {
  id: string;
  label: string;
  /** Formatted value, e.g. "62 / 100" or "3 of 6". */
  value: string;
  /** How this compares to the existing library, when a baseline exists. */
  comparison?: string;
}

export interface GateReport {
  kind: SubmissionKind;
  slug: string;
  /** True only when every blocking gate passed. */
  accepted: boolean;
  gates: GateResult[];
  signals: QualitySignal[];
  checkedAt: string;
}

export function isAccepted(gates: readonly GateResult[]): boolean {
  return gates.every((gate) => gate.severity !== "blocking" || gate.passed);
}

export function blockingFailures(report: GateReport): GateResult[] {
  return report.gates.filter((gate) => gate.severity === "blocking" && !gate.passed);
}
