import { createHash } from "node:crypto";
import { lstat, readFile, realpath } from "node:fs/promises";
import path from "node:path";
import {
  assetProvenanceSnapshotSchema,
  type StyleExperiencePack,
} from "@/lib/experience-packs/schema";
import { getStyleBySlug } from "@/lib/styles/registry";

export interface ExperiencePackVerificationIssue {
  code:
    | "missing-source-style"
    | "unsafe-source-path"
    | "missing-install-file"
    | "invalid-install-file"
    | "empty-install-file"
    | "private-import"
    | "remote-runtime-asset"
    | "missing-asset"
    | "asset-hash-mismatch"
    | "asset-budget-exceeded"
    | "unsupported-registry-asset"
    | "missing-provenance-snapshot"
    | "invalid-provenance-snapshot"
    | "provenance-mismatch"
    | "evidence-asset-unapproved"
    | "evidence-asset-unhashed"
    | "missing-evidence-coverage"
    | "missing-required-document";
  source: string;
  message: string;
}

export interface ExperiencePackVerificationReport {
  ok: boolean;
  issues: ExperiencePackVerificationIssue[];
  checkedFiles: string[];
  checkedAssets: string[];
  checkedEvidence: string[];
  checkedClaims: string[];
}

const REQUIRED_DOCUMENTS = ["README.md", "LICENSE.md", "THIRD_PARTY_NOTICES.md"];
const CODE_FILE_RE = /\.(?:css|js|jsx|mjs|cjs|ts|tsx)$/i;
const PRIVATE_IMPORT_RE = /(?:from\s+|import\s*\(|require\s*\()\s*["'](?:@\/|stylekit(?:\/|["']))/;
const REMOTE_RUNTIME_ASSET_RE = /(?:src|url|href)\s*[=:]\s*["']https?:\/\//i;

export function getExperiencePackFilesRoot(rootDir: string, slug: string): string {
  return path.join(rootDir, "experience-packs", slug, "files");
}

export function getExperiencePackInstallFiles(pack: StyleExperiencePack): string[] {
  return [...pack.blocks, ...pack.templates]
    .flatMap((installable) => installable.files)
    .sort((left, right) => left.localeCompare(right));
}

export async function sha256File(filePath: string): Promise<string> {
  const content = await readFile(filePath);
  return `sha256:${createHash("sha256").update(content).digest("hex")}`;
}

async function isSafeRegularFile(baseDir: string, candidate: string): Promise<boolean> {
  try {
    const [baseReal, candidateReal, stats] = await Promise.all([
      realpath(baseDir),
      realpath(candidate),
      lstat(candidate),
    ]);
    const relative = path.relative(baseReal, candidateReal);
    return !relative.startsWith("..") && !path.isAbsolute(relative) && stats.isFile() && !stats.isSymbolicLink();
  } catch {
    return false;
  }
}

export async function verifyExperiencePack(
  rootDir: string,
  pack: StyleExperiencePack,
): Promise<ExperiencePackVerificationReport> {
  const issues: ExperiencePackVerificationIssue[] = [];
  const checkedFiles: string[] = [];
  const checkedAssets: string[] = [];
  const filesRoot = getExperiencePackFilesRoot(rootDir, pack.slug);
  const installFiles = getExperiencePackInstallFiles(pack);

  if (!getStyleBySlug(pack.styleSlug)) {
    issues.push({
      code: "missing-source-style",
      source: pack.styleSlug,
      message: `Pack references unknown source style: ${pack.styleSlug}`,
    });
  }

  if (pack.tier === "pro" && ["preview", "published"].includes(pack.status)) {
    const requiredCoverage = [
      {
        label: "desktop overview",
        present: pack.evidence.some(
          (scene) => scene.kind === "overview" && scene.device === "desktop",
        ),
      },
      {
        label: "mobile evidence",
        present: pack.evidence.some((scene) => scene.device === "mobile"),
      },
      {
        label: "installable deliverable",
        present: pack.evidence.some((scene) => scene.kind === "deliverable"),
      },
      ...(pack.preview.archetype === "app"
        ? [{ label: "business state", present: pack.evidence.some((scene) => scene.kind === "state") }]
        : []),
    ];
    for (const requirement of requiredCoverage.filter((item) => !item.present)) {
      issues.push({
        code: "missing-evidence-coverage",
        source: pack.slug,
        message: `Pro ${pack.preview.archetype ?? "pack"} evidence is missing: ${requirement.label}`,
      });
    }
  }

  const assetsById = new Map(pack.assets.map((asset) => [asset.id, asset]));
  for (const scene of pack.evidence) {
    const asset = assetsById.get(scene.assetRef);
    if (!asset) continue;
    if (asset.provenance.auditStatus !== "approved") {
      issues.push({
        code: "evidence-asset-unapproved",
        source: scene.id,
        message: `Evidence scene uses an asset without approved provenance: ${scene.assetRef}`,
      });
    }
    if (!asset.contentHash) {
      issues.push({
        code: "evidence-asset-unhashed",
        source: scene.id,
        message: `Evidence scene uses an asset without a content hash: ${scene.assetRef}`,
      });
    }
  }

  for (const requiredDocument of REQUIRED_DOCUMENTS) {
    if (!installFiles.includes(requiredDocument)) {
      issues.push({
        code: "missing-required-document",
        source: requiredDocument,
        message: `Pack must install ${requiredDocument}`,
      });
    }
  }

  for (const relativeFile of installFiles) {
    const sourcePath = path.resolve(filesRoot, relativeFile);
    const relativeToRoot = path.relative(filesRoot, sourcePath);
    if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) {
      issues.push({
        code: "unsafe-source-path",
        source: relativeFile,
        message: `Install source escapes the pack file root: ${relativeFile}`,
      });
      continue;
    }

    if (!(await isSafeRegularFile(filesRoot, sourcePath))) {
      issues.push({
        code: "missing-install-file",
        source: relativeFile,
        message: `Install file is missing or is not a regular in-root file: ${relativeFile}`,
      });
      continue;
    }

    checkedFiles.push(relativeFile);
    const content = await readFile(sourcePath, "utf8");
    if (!content.trim()) {
      issues.push({
        code: "empty-install-file",
        source: relativeFile,
        message: `Install file is empty: ${relativeFile}`,
      });
    }

    if (CODE_FILE_RE.test(relativeFile)) {
      if (PRIVATE_IMPORT_RE.test(content)) {
        issues.push({
          code: "private-import",
          source: relativeFile,
          message: `Pack code must not import StyleKit-private modules: ${relativeFile}`,
        });
      }
      if (REMOTE_RUNTIME_ASSET_RE.test(content)) {
        issues.push({
          code: "remote-runtime-asset",
          source: relativeFile,
          message: `Pack code must not depend on remote runtime assets: ${relativeFile}`,
        });
      }
    }
  }

  for (const asset of pack.assets) {
    const publicPath = path.join(rootDir, "public", asset.src.replace(/^\//, ""));
    if (!(await isSafeRegularFile(path.join(rootDir, "public"), publicPath))) {
      issues.push({
        code: "missing-asset",
        source: asset.src,
        message: `Pack asset is missing or unsafe: ${asset.src}`,
      });
      continue;
    }

    checkedAssets.push(asset.src);
    if (asset.contentHash) {
      const actualHash = await sha256File(publicPath);
      if (actualHash !== asset.contentHash) {
        issues.push({
          code: "asset-hash-mismatch",
          source: asset.src,
          message: `Asset hash mismatch: expected ${asset.contentHash}, received ${actualHash}`,
        });
      }
    }

    const assetStats = await lstat(publicPath);
    if (assetStats.size > asset.performance.budgetBytes) {
      issues.push({
        code: "asset-budget-exceeded",
        source: asset.src,
        message: `Asset exceeds its byte budget: ${assetStats.size} > ${asset.performance.budgetBytes}`,
      });
    }

    if (asset.distributable && !["svg", "icon"].includes(asset.kind)) {
      issues.push({
        code: "unsupported-registry-asset",
        source: asset.src,
        message: `The initial text registry compiler only supports distributable SVG or icon assets: ${asset.src}`,
      });
    }

    if (asset.provenance.sourceSnapshot) {
      const snapshotPath = path.join(
        rootDir,
        "public",
        asset.provenance.sourceSnapshot.replace(/^\//, ""),
      );
      if (!(await isSafeRegularFile(path.join(rootDir, "public"), snapshotPath))) {
        issues.push({
          code: "missing-provenance-snapshot",
          source: asset.provenance.sourceSnapshot,
          message: `Provenance snapshot is missing or unsafe: ${asset.provenance.sourceSnapshot}`,
        });
      } else {
        try {
          const snapshot = assetProvenanceSnapshotSchema.parse(
            JSON.parse(await readFile(snapshotPath, "utf8")),
          );
          const actualHash = await sha256File(publicPath);
          const mismatches = [
            snapshot.assetId !== asset.id ? "assetId" : null,
            snapshot.originType !== asset.provenance.originType ? "originType" : null,
            snapshot.creator !== asset.creator ? "creator" : null,
            snapshot.auditStatus !== asset.provenance.auditStatus ? "auditStatus" : null,
            snapshot.auditedBy !== asset.provenance.auditedBy ? "auditedBy" : null,
            snapshot.auditedAt !== asset.provenance.auditedAt ? "auditedAt" : null,
            snapshot.assetPath && snapshot.assetPath !== asset.src ? "assetPath" : null,
            snapshot.contentHash && snapshot.contentHash !== actualHash ? "contentHash" : null,
            snapshot.width && snapshot.width !== asset.width ? "width" : null,
            snapshot.height && snapshot.height !== asset.height ? "height" : null,
            snapshot.bytes !== undefined && snapshot.bytes !== assetStats.size ? "bytes" : null,
            snapshot.distributable !== undefined && snapshot.distributable !== asset.distributable
              ? "distributable"
              : null,
          ].filter(Boolean);
          if (mismatches.length > 0) {
            issues.push({
              code: "provenance-mismatch",
              source: asset.provenance.sourceSnapshot,
              message: `Provenance snapshot does not match the asset manifest: ${mismatches.join(", ")}`,
            });
          }
        } catch {
          issues.push({
            code: "invalid-provenance-snapshot",
            source: asset.provenance.sourceSnapshot,
            message: `Provenance snapshot is invalid JSON or violates the evidence schema: ${asset.provenance.sourceSnapshot}`,
          });
        }
      }
    }
  }

  issues.sort((left, right) =>
    `${left.source}:${left.code}:${left.message}`.localeCompare(
      `${right.source}:${right.code}:${right.message}`,
    ),
  );

  return {
    ok: issues.length === 0,
    issues,
    checkedFiles: checkedFiles.sort(),
    checkedAssets: checkedAssets.sort(),
    checkedEvidence: pack.evidence.map((scene) => scene.id).sort(),
    checkedClaims: pack.claims.map((claim) => claim.id).sort(),
  };
}

export async function assertExperiencePackVerified(
  rootDir: string,
  pack: StyleExperiencePack,
): Promise<void> {
  const report = await verifyExperiencePack(rootDir, pack);
  if (report.ok) return;

  throw new Error(
    report.issues.map((issue) => `[${issue.code}] ${issue.source}: ${issue.message}`).join("\n"),
  );
}
