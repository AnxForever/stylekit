import type { writeFile } from "node:fs/promises";

export type PublicationWriteKind = "generated" | "registry";

export interface PublicationWrite {
  relativePath: string;
  content: string;
  kind: PublicationWriteKind;
  previousContent?: string;
}

/**
 * A complete, side-effect-free description of one style publication.
 *
 * The plan is the publication module's seam: callers can inspect what will
 * change before the commit phase writes anything to the repository.
 */
export interface StylePublicationPlan {
  slug: string;
  writes: readonly PublicationWrite[];
}

export interface StylePublicationResult {
  success: boolean;
  filesWritten: string[];
  registriesPatched: string[];
  errors: string[];
}

export interface StylePublicationOptions {
  writeFile?: typeof writeFile;
}
