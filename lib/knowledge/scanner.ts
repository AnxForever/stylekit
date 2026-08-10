import { lstat, readdir, readFile } from "node:fs/promises";
import path from "node:path";

export type KnowledgeFindingSeverity = "critical" | "warning";

export interface KnowledgeScanFinding {
  severity: KnowledgeFindingSeverity;
  rule: "forbidden-path" | "secret-pattern" | "file-too-large" | "binary-file" | "symlink-skipped";
  path: string;
  detail: string;
}

export interface KnowledgeScanReport {
  root: string;
  filesScanned: number;
  bytesScanned: number;
  findings: KnowledgeScanFinding[];
  passed: boolean;
}

const DEFAULT_MAX_FILE_BYTES = 2 * 1024 * 1024;
const FORBIDDEN_SEGMENTS = new Set([
  ".git",
  ".next",
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".cache",
  ".turbo",
]);
const SECRET_PATTERNS: Array<[RegExp, string]> = [
  [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i, "private key header"],
  [/(?:api[_-]?key|secret|token|password)\s*[:=]\s*["'][^"']{12,}["']/i, "credential-like assignment"],
  [/sk-[A-Za-z0-9]{20,}/, "provider secret token"],
  [/gh[pousr]_[A-Za-z0-9]{20,}/, "GitHub token"],
];

export async function scanKnowledgeMirror(
  root: string,
  options: { maxFileBytes?: number } = {},
): Promise<KnowledgeScanReport> {
  const resolvedRoot = path.resolve(root);
  const findings: KnowledgeScanFinding[] = [];
  let filesScanned = 0;
  let bytesScanned = 0;
  const maxFileBytes = options.maxFileBytes ?? DEFAULT_MAX_FILE_BYTES;

  async function visit(directory: string): Promise<void> {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const absolute = path.join(directory, entry.name);
      const relative = path.relative(resolvedRoot, absolute).replaceAll(path.sep, "/");
      if (FORBIDDEN_SEGMENTS.has(entry.name)) {
        findings.push({ severity: "warning", rule: "forbidden-path", path: relative, detail: "Build output, dependency cache, or VCS metadata must not enter a mirror." });
        continue;
      }
      if (entry.isSymbolicLink()) {
        findings.push({ severity: "warning", rule: "symlink-skipped", path: relative, detail: "Symlinks are skipped to keep the snapshot boundary explicit." });
        continue;
      }
      if (entry.isDirectory()) {
        await visit(absolute);
        continue;
      }
      if (!entry.isFile()) continue;

      const stats = await lstat(absolute);
      filesScanned += 1;
      bytesScanned += stats.size;
      if (stats.size > maxFileBytes) {
        findings.push({ severity: "warning", rule: "file-too-large", path: relative, detail: `File is ${stats.size} bytes; limit is ${maxFileBytes}.` });
        continue;
      }

      const content = await readFile(absolute);
      if (content.includes(0)) {
        findings.push({ severity: "warning", rule: "binary-file", path: relative, detail: "Binary files are not imported into the text knowledge index." });
        continue;
      }
      const text = content.toString("utf8");
      for (const [pattern, detail] of SECRET_PATTERNS) {
        if (pattern.test(text)) {
          findings.push({ severity: "critical", rule: "secret-pattern", path: relative, detail });
        }
      }
    }
  }

  await visit(resolvedRoot);
  return {
    root: resolvedRoot,
    filesScanned,
    bytesScanned,
    findings,
    passed: !findings.some((finding) => finding.severity === "critical"),
  };
}
