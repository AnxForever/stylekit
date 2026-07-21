import { createHash } from "node:crypto";
import { lstat, readFile, realpath } from "node:fs/promises";
import path from "node:path";
import {
  validationOfferSnapshotArtifactSchema,
  type ProductValidationBundle,
  type ValidationOfferSnapshotArtifact,
} from "@/lib/product-validation/schema";

export type OfferSnapshotVerificationIssueCode =
  | "unsafe-artifact-path"
  | "missing-artifact"
  | "artifact-hash-mismatch"
  | "invalid-artifact"
  | "offer-version-mismatch"
  | "pack-id-mismatch"
  | "pack-version-mismatch"
  | "variant-mismatch"
  | "offer-sealed-after-experiment-start";

export interface OfferSnapshotVerificationIssue {
  code: OfferSnapshotVerificationIssueCode;
  message: string;
}

export interface OfferSnapshotVerificationReport {
  ok: boolean;
  artifactPath: string;
  expectedSha256: string;
  actualSha256: string | null;
  artifact: ValidationOfferSnapshotArtifact | null;
  issues: OfferSnapshotVerificationIssue[];
}

function sha256(content: Buffer): string {
  return `sha256:${createHash("sha256").update(content).digest("hex")}`;
}

function variantsMatch(
  artifact: ValidationOfferSnapshotArtifact,
  bundle: ProductValidationBundle,
): boolean {
  return JSON.stringify(artifact.variants) === JSON.stringify(bundle.experiment.variants);
}

export async function verifyValidationOfferSnapshot(
  rootDir: string,
  bundle: ProductValidationBundle,
): Promise<OfferSnapshotVerificationReport> {
  const { artifactPath, sha256: expectedSha256 } = bundle.experiment.offerSnapshot;
  const issues: OfferSnapshotVerificationIssue[] = [];
  const rootPath = path.resolve(rootDir);
  const candidatePath = path.resolve(rootPath, artifactPath);
  const relativePath = path.relative(rootPath, candidatePath);
  let actualSha256: string | null = null;
  let artifact: ValidationOfferSnapshotArtifact | null = null;

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    issues.push({
      code: "unsafe-artifact-path",
      message: `Offer artifact escapes the repository root: ${artifactPath}`,
    });
    return {
      ok: false,
      artifactPath,
      expectedSha256,
      actualSha256,
      artifact,
      issues,
    };
  }

  try {
    const [rootRealPath, candidateRealPath, stats] = await Promise.all([
      realpath(rootPath),
      realpath(candidatePath),
      lstat(candidatePath),
    ]);
    const realRelativePath = path.relative(rootRealPath, candidateRealPath);
    if (
      realRelativePath.startsWith("..") ||
      path.isAbsolute(realRelativePath) ||
      !stats.isFile() ||
      stats.isSymbolicLink()
    ) {
      issues.push({
        code: "unsafe-artifact-path",
        message: `Offer artifact is not a regular in-repository file: ${artifactPath}`,
      });
      return {
        ok: false,
        artifactPath,
        expectedSha256,
        actualSha256,
        artifact,
        issues,
      };
    }
  } catch {
    issues.push({
      code: "missing-artifact",
      message: `Offer artifact does not exist: ${artifactPath}`,
    });
    return {
      ok: false,
      artifactPath,
      expectedSha256,
      actualSha256,
      artifact,
      issues,
    };
  }

  const raw = await readFile(candidatePath);
  actualSha256 = sha256(raw);
  if (actualSha256 !== expectedSha256) {
    issues.push({
      code: "artifact-hash-mismatch",
      message: `Offer artifact hash mismatch: expected ${expectedSha256}, received ${actualSha256}`,
    });
  }

  try {
    const parsed = validationOfferSnapshotArtifactSchema.safeParse(
      JSON.parse(raw.toString("utf8")) as unknown,
    );
    if (!parsed.success) {
      const details = parsed.error.issues
        .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
        .join("; ");
      issues.push({
        code: "invalid-artifact",
        message: `Offer artifact does not satisfy the snapshot schema: ${details}`,
      });
    } else {
      artifact = parsed.data;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown JSON error";
    issues.push({
      code: "invalid-artifact",
      message: `Offer artifact is not valid JSON: ${message}`,
    });
  }

  if (artifact) {
    if (artifact.offerVersion !== bundle.experiment.offerVersion) {
      issues.push({
        code: "offer-version-mismatch",
        message: `Offer artifact version ${artifact.offerVersion} does not match experiment ${bundle.experiment.offerVersion}`,
      });
    }
    if (artifact.pack.id !== bundle.experiment.packId) {
      issues.push({
        code: "pack-id-mismatch",
        message: `Offer artifact pack ${artifact.pack.id} does not match experiment ${bundle.experiment.packId}`,
      });
    }
    if (artifact.pack.version !== bundle.experiment.packVersion) {
      issues.push({
        code: "pack-version-mismatch",
        message: `Offer artifact pack version ${artifact.pack.version} does not match experiment ${bundle.experiment.packVersion}`,
      });
    }
    if (!variantsMatch(artifact, bundle)) {
      issues.push({
        code: "variant-mismatch",
        message: "Offer artifact price variants do not exactly match the experiment variants",
      });
    }
    if (Date.parse(artifact.sealedAt) > Date.parse(bundle.experiment.window.start)) {
      issues.push({
        code: "offer-sealed-after-experiment-start",
        message: "Offer artifact must be sealed before the experiment window starts",
      });
    }
  }

  return {
    ok: issues.length === 0,
    artifactPath,
    expectedSha256,
    actualSha256,
    artifact,
    issues,
  };
}
