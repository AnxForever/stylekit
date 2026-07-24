import type { StyleScaffoldInput } from "@/lib/scaffold/style-scaffold";
import { commitStylePublication } from "./commit";
import { createStylePublicationPlan } from "./plan";
import type {
  StylePublicationOptions,
  StylePublicationResult,
} from "./types";

/**
 * Publish one approved style through the plan → commit interface.
 *
 * Planning is side-effect-free and validates all generated files and registry
 * projections before commit starts. A commit failure rolls back every write
 * already made, including generated files.
 */
export async function publishStyle(
  input: StyleScaffoldInput,
  rootDir: string,
  options: StylePublicationOptions = {},
): Promise<StylePublicationResult> {
  try {
    const plan = await createStylePublicationPlan(input, rootDir);
    return commitStylePublication(plan, rootDir, options);
  } catch (error: unknown) {
    return {
      success: false,
      filesWritten: [],
      registriesPatched: [],
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
}

export type {
  StylePublicationOptions,
  StylePublicationResult,
} from "./types";
