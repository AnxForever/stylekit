/**
 * Gate dispatch by submission kind.
 *
 * API routes and the review console call `runGates` and never learn which kind
 * they are handling. Adding "template" means adding a branch here plus a gate
 * module, with no changes upstream.
 */

import type { GateReport, SubmissionKind } from "../types";
import { runStyleGates, type StyleGateContext } from "./style-gates";

export type GateContext = StyleGateContext;

export async function runGates(
  kind: SubmissionKind,
  input: unknown,
  context: GateContext = {},
): Promise<GateReport> {
  switch (kind) {
    case "style":
      return runStyleGates(input, context);
    case "template":
      throw new Error("Template submissions are not implemented yet.");
  }
}
