export type {
  SubmissionKind,
  GateResult,
  GateReport,
  QualitySignal,
} from "./types";
export { isAccepted, blockingFailures } from "./types";
export { runGates, type GateContext } from "./gates";
export { LIBRARY_A11Y_MEDIAN } from "./gates/style-gates";
export { MAX_MANIFEST_BYTES, isSlugTaken, isSlugTakenBySlug, readManifestSlug } from "./intake";
export { MASTER_PROMPT, PROMPT_INPUT_CHECKLIST } from "./ai-prompt";
export {
  deriveStyleColors,
  deriveStyleTokens,
  deriveDesignStyle,
  paletteConsistency,
  type PaletteConsistency,
} from "./adapters/style";
