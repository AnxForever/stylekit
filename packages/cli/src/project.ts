/**
 * Read-only project inspection and explicit shadcn installation for the CLI.
 *
 * Planning never invokes a package manager. Applying requires an explicit
 * `apply: true` option, re-runs preflight, and calls a fixed package-manager
 * executable with an argv array and `shell: false`.
 */

import { createHash } from "node:crypto";
import {
  closeSync,
  lstatSync,
  openSync,
  readFileSync,
  readSync,
  realpathSync,
  statSync,
} from "node:fs";
import {
  delimiter,
  dirname,
  isAbsolute,
  join,
  relative,
  resolve,
  sep,
} from "node:path";
import {
  spawn,
  type ChildProcessWithoutNullStreams,
} from "node:child_process";

const PLAN_SCHEMA = "stylekit-cli-add-plan-v1" as const;
const STYLEKIT_SITE_URL = "https://www.stylekit.top";
const MAX_CAPTURED_OUTPUT_BYTES = 64 * 1024;
const MAX_INSPECTED_FILE_BYTES = 8 * 1024 * 1024;
const PACKAGE_MANAGER_LOCKFILES = [
  { name: "pnpm-lock.yaml", manager: "pnpm" },
  { name: "package-lock.json", manager: "npm" },
  { name: "npm-shrinkwrap.json", manager: "npm" },
] as const;

export type SupportedPackageManager = "pnpm" | "npm";
export type ProjectFindingStatus = "ok" | "warning" | "blocked" | "unknown";

export interface ProjectFinding {
  id: string;
  status: ProjectFindingStatus;
  message: string;
  path?: string;
}

export interface ProjectInspection {
  schemaVersion: "stylekit-cli-project-v1";
  requestedRoot: string;
  root: string;
  exists: boolean;
  readyForAdd: boolean;
  packageJson: {
    status: "ok" | "missing" | "invalid" | "blocked";
    path: string;
    name?: string;
    packageManagerField?: string;
    error?: string;
  };
  packageManager: {
    status: "supported" | "unsupported" | "unknown";
    name?: SupportedPackageManager;
    evidence?: string;
    message: string;
    warnings?: string[];
  };
  tsconfig: {
    status: "present" | "missing" | "unknown" | "blocked";
    path: string;
    message: string;
  };
  componentsJson: {
    status: "present" | "missing" | "invalid" | "blocked";
    path: string;
    tailwindCssVariables?: boolean;
    configuredCssPath?: string;
    resolvedCssPath?: string;
    message: string;
  };
  tailwind: {
    status: "detected" | "unknown" | "missing";
    registryCompatibility: "supported" | "unsupported" | "unknown";
    declaredVersion?: string;
    installedVersion?: string;
    major?: number;
    source?: "installed" | "package.json";
    message: string;
  };
  cssEntry: {
    status: "ready" | "missing" | "invalid" | "blocked" | "unknown";
    configuredPath?: string;
    path?: string;
    tailwindImport: "detected" | "not-detected" | "unknown";
    message: string;
  };
  findings: ProjectFinding[];
  blockers: string[];
  warnings: string[];
}

export interface PlannedFile {
  path: string;
  role: "theme-css-vars" | "project-config" | "package-manifest" | "package-lock";
  likelihood: "expected" | "possible";
  reason: string;
}

export interface PlannedFileFingerprint {
  path: string;
  exists: boolean | null;
  sha256?: string;
}

export interface AddPlan {
  schemaVersion: typeof PLAN_SCHEMA;
  slug: string;
  cwd: string;
  registryUrl: string | null;
  target: {
    projectRoot: string;
    cssFile?: string;
  };
  command: {
    executable: string | null;
    args: string[];
    display: string | null;
    executionBoundary: "shell:false";
  };
  prerequisites: ProjectFinding[];
  affectedFiles: PlannedFile[];
  fileFingerprints: PlannedFileFingerprint[];
  expectedSourceFiles: string[];
  readyForApply: boolean;
  blockers: string[];
  warnings: string[];
  inspection: ProjectInspection;
}

export interface SpawnOptionsForStyleKit {
  cwd: string;
  shell: false;
  windowsHide: true;
  stdio: "pipe";
}

export type SpawnImpl = (
  command: string,
  args: string[],
  options: SpawnOptionsForStyleKit,
) => ChildProcessWithoutNullStreams;

export interface ApplyOptions {
  apply: true;
  spawnImpl?: SpawnImpl;
}

export interface ObservedFileSummary {
  path: string;
  beforeExists: boolean | null;
  afterExists: boolean | null;
  beforeHash?: string;
  afterHash?: string;
  changed: boolean | null;
}

export interface ApplyResult {
  schemaVersion: "stylekit-cli-add-result-v1";
  ok: boolean;
  status: "not-authorized" | "blocked" | "spawn-error" | "completed" | "failed";
  slug: string;
  projectRoot: string;
  process: {
    executable: string | null;
    args: string[];
    exitCode: number | null;
    signal: string | null;
    error?: string;
    errorCode?: string;
    stdout: string;
    stderr: string;
    outputTruncated: boolean;
  };
  blockers: string[];
  verification: {
    themeIdentity: "unverified";
    visualResult: "unverified";
    checkedFiles: string[];
    files: ObservedFileSummary[];
    changedFiles: string[];
    partialChanges: string[];
    css: {
      path?: string;
      fileChanged: boolean | null;
      variablesAdded: string[];
      variablesUpdated: string[];
      variablesRemoved: string[];
      changesObserved: boolean;
      message: string;
    };
    package: {
      manifestChanged: boolean | null;
      dependencyChanges: string[];
      packageFilesChanged: string[];
    };
    sourceFilesExpected: string[];
    sourceFilesScanned: false;
    note: string;
  };
}

interface JsonFileResult {
  status: "ok" | "missing" | "invalid" | "blocked";
  path: string;
  data?: Record<string, unknown>;
  error?: string;
}

interface ProjectFilePresence {
  status: "present" | "missing" | "unknown" | "blocked";
  path: string;
  error?: string;
}

interface SafePathResult {
  status: "ok" | "missing" | "invalid" | "blocked";
  configuredPath: string;
  path: string;
  error?: string;
}

interface FileSnapshot {
  path: string;
  state: "present" | "missing" | "unreadable";
  fingerprint?: string;
  content?: string;
  size?: number;
}

interface SpawnResult {
  exitCode: number | null;
  signal: string | null;
  error?: string;
  errorCode?: string;
  stdout: string;
  stderr: string;
  outputTruncated: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function insideRoot(root: string, target: string): boolean {
  const pathFromRoot = relative(root, target);
  return (
    pathFromRoot === "" ||
    (pathFromRoot !== ".." &&
      !pathFromRoot.startsWith(`..${sep}`) &&
      !isAbsolute(pathFromRoot))
  );
}

function safeRoot(cwd: string | undefined): {
  requestedRoot: string;
  root: string;
  exists: boolean;
  error?: string;
} {
  const input = cwd ?? process.cwd();
  let requestedRoot: string;
  try {
    requestedRoot = resolve(input);
  } catch (error) {
    const fallback = process.cwd();
    return {
      requestedRoot: fallback,
      root: fallback,
      exists: false,
      error: `Could not resolve the requested working directory: ${errorMessage(error)}`,
    };
  }

  try {
    const stats = statSync(requestedRoot);
    if (!stats.isDirectory()) {
      return {
        requestedRoot,
        root: requestedRoot,
        exists: false,
        error: "The requested working directory is not a directory.",
      };
    }
    return {
      requestedRoot,
      root: realpathSync(requestedRoot),
      exists: true,
    };
  } catch (error) {
    return {
      requestedRoot,
      root: requestedRoot,
      exists: false,
      error: `The requested working directory is unavailable: ${errorMessage(error)}`,
    };
  }
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/** Resolve a project-relative path and reject any symlink that escapes root. */
function resolveProjectPath(root: string, configuredPath: string): SafePathResult {
  if (
    configuredPath.length === 0 ||
    configuredPath.includes("\0") ||
    isAbsolute(configuredPath)
  ) {
    return {
      status: "invalid",
      configuredPath,
      path: resolve(root, configuredPath),
      error: "The configured path must be a non-empty relative path.",
    };
  }

  const lexicalPath = resolve(root, configuredPath);
  if (!insideRoot(root, lexicalPath)) {
    return {
      status: "blocked",
      configuredPath,
      path: lexicalPath,
      error: "The configured path resolves outside the selected project directory.",
    };
  }

  const segments = relative(root, lexicalPath).split(sep).filter(Boolean);
  let cursor = root;
  let foundMissing = false;

  for (const segment of segments) {
    cursor = join(cursor, segment);
    if (foundMissing) continue;

    try {
      const linkStats = lstatSync(cursor);
      if (linkStats.isSymbolicLink()) {
        const realTarget = realpathSync(cursor);
        if (!insideRoot(root, realTarget)) {
          return {
            status: "blocked",
            configuredPath,
            path: lexicalPath,
            error: `The path contains a symlink that resolves outside the project: ${cursor}`,
          };
        }
        cursor = realTarget;
      }
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;
      if (code === "ENOENT" || code === "ENOTDIR") {
        foundMissing = true;
      } else {
        return {
          status: "invalid",
          configuredPath,
          path: lexicalPath,
          error: `Could not inspect the configured path: ${errorMessage(error)}`,
        };
      }
    }
  }

  if (foundMissing) {
    return { status: "missing", configuredPath, path: lexicalPath };
  }

  if (!insideRoot(root, cursor)) {
    return {
      status: "blocked",
      configuredPath,
      path: cursor,
      error: "The resolved path is outside the selected project directory.",
    };
  }

  return { status: "ok", configuredPath, path: cursor };
}

function readProjectJson(root: string, relativePath: string): JsonFileResult {
  const safe = resolveProjectPath(root, relativePath);
  if (safe.status !== "ok" && safe.status !== "missing") {
    return {
      status: safe.status,
      path: safe.path,
      error: safe.error,
    };
  }
  if (safe.status === "missing") {
    return { status: "missing", path: safe.path };
  }

  try {
    if (!statSync(safe.path).isFile()) {
      return {
        status: "invalid",
        path: safe.path,
        error: `${relativePath} is not a regular file.`,
      };
    }
    const value: unknown = JSON.parse(readFileSync(safe.path, "utf8"));
    if (!isRecord(value)) {
      return {
        status: "invalid",
        path: safe.path,
        error: `${relativePath} must contain a JSON object.`,
      };
    }
    return { status: "ok", path: safe.path, data: value };
  } catch (error) {
    return {
      status: "invalid",
      path: safe.path,
      error: `Could not read ${relativePath}: ${errorMessage(error)}`,
    };
  }
}

/** Check only presence/readability; shadcn owns tsconfig JSONC parsing. */
function inspectProjectFile(root: string, relativePath: string): ProjectFilePresence {
  const safe = resolveProjectPath(root, relativePath);
  if (safe.status === "missing") {
    return { status: "missing", path: safe.path };
  }
  if (safe.status === "blocked") {
    return {
      status: "blocked",
      path: safe.path,
      error: safe.error ?? `${relativePath} resolves outside the selected project.`,
    };
  }
  if (safe.status !== "ok") {
    return {
      status: "unknown",
      path: safe.path,
      error: safe.error ?? `Could not resolve ${relativePath}.`,
    };
  }

  try {
    if (!statSync(safe.path).isFile()) {
      return {
        status: "unknown",
        path: safe.path,
        error: `${relativePath} exists but is not a regular file.`,
      };
    }
    const descriptor = openSync(safe.path, "r");
    closeSync(descriptor);
    return { status: "present", path: safe.path };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { status: "missing", path: safe.path };
    }
    return {
      status: "unknown",
      path: safe.path,
      error: `Could not confirm ${relativePath} is readable: ${errorMessage(error)}`,
    };
  }
}

function manifestDependencyVersion(
  manifest: Record<string, unknown> | undefined,
  packageName: string,
): string | undefined {
  if (!manifest) return undefined;
  for (const key of ["dependencies", "devDependencies", "optionalDependencies"]) {
    const group = manifest[key];
    if (isRecord(group) && typeof group[packageName] === "string") {
      return group[packageName];
    }
  }
  return undefined;
}

function findInstalledTailwind(root: string): string | undefined {
  let directory = root;
  for (let depth = 0; depth < 8; depth += 1) {
    const packagePath = join(directory, "node_modules", "tailwindcss", "package.json");
    try {
      const realPackagePath = realpathSync(packagePath);
      const stats = statSync(realPackagePath);
      if (!stats.isFile()) return undefined;
      const parsed: unknown = JSON.parse(readFileSync(realPackagePath, "utf8"));
      if (isRecord(parsed) && typeof parsed.version === "string") {
        return parsed.version;
      }
      return undefined;
    } catch {
      // Inspect one exact package metadata path per ancestor; never walk node_modules.
    }

    const parent = dirname(directory);
    if (parent === directory) break;
    directory = parent;
  }
  return undefined;
}

function versionMajor(version: string | undefined): number | undefined {
  if (!version) return undefined;
  const match = version.match(/(?:^|[^\d])(\d+)(?:\.|$)/);
  if (!match) return undefined;
  const major = Number(match[1]);
  return Number.isSafeInteger(major) ? major : undefined;
}

function inspectPackageManager(
  root: string,
  packageJson: JsonFileResult,
): ProjectInspection["packageManager"] {
  const lockfiles = PACKAGE_MANAGER_LOCKFILES.filter(({ name }) => {
    try {
      const safe = resolveProjectPath(root, name);
      return safe.status === "ok" && statSync(safe.path).isFile();
    } catch {
      return false;
    }
  });
  const field = packageJson.data?.packageManager;
  if (typeof field === "string") {
    const declared = field.match(/^(pnpm|npm)@(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?)$/);
    if (declared) {
      const name = declared[1] as SupportedPackageManager;
      const conflicts = lockfiles
        .filter((lockfile) => lockfile.manager !== name)
        .map((lockfile) => lockfile.name);
      return {
        status: "supported",
        name,
        evidence: `package.json packageManager=${field}`,
        message: `Using ${name}, declared by package.json.${conflicts.length > 0 ? ` Conflicting lockfile evidence: ${conflicts.join(", ")}; check that it is stale.` : ""}`,
        ...(conflicts.length > 0
          ? { warnings: [`packageManager declares ${name}, while ${conflicts.join(", ")} also exist.`] }
          : {}),
      };
    }

    const unsupported = field.match(/^(yarn|bun)@/);
    if (unsupported) {
      return {
        status: "unsupported",
        evidence: `package.json packageManager=${field}`,
        message: `The project declares ${unsupported[1]}, which this installer does not invoke. Use the printed shadcn command with your package manager.`,
      };
    }

    return {
      status: "unknown",
      evidence: "package.json contains an unrecognized packageManager value",
      message: "The packageManager field is not a supported pnpm or npm declaration, so automatic installation is disabled.",
    };
  }

  if (field !== undefined) {
    return {
      status: "unknown",
      evidence: "package.json packageManager field is not a string",
      message: "The packageManager field is malformed, so automatic installation is disabled.",
    };
  }

  const managers = [...new Set(lockfiles.map((lockfile) => lockfile.manager))];

  if (managers.length === 1) {
    const name = managers[0] as SupportedPackageManager;
    return {
      status: "supported",
      name,
      evidence: `root ${lockfiles.map(({ name: lockfile }) => lockfile).join(" and ")} lockfile`,
      message: `Using ${name}, inferred from the project lockfile.`,
    };
  }

  if (managers.length > 1) {
    return {
      status: "unknown",
      message: "Multiple supported package-manager lockfiles are present; automatic installation is disabled until the project manager is clear.",
    };
  }

  return {
    status: "unknown",
    message: "No supported packageManager declaration or pnpm/npm lockfile was found; automatic installation is disabled.",
  };
}

function addFinding(
  findings: ProjectFinding[],
  blockers: string[],
  warnings: string[],
  finding: ProjectFinding,
): void {
  findings.push(finding);
  if (finding.status === "blocked") blockers.push(finding.message);
  if (finding.status === "warning" || finding.status === "unknown") {
    warnings.push(finding.message);
  }
}

/** Inspect the selected project using only exact, known configuration paths. */
export function inspectProject(cwd?: string): ProjectInspection {
  const rootInfo = safeRoot(cwd);
  const root = rootInfo.root;
  const findings: ProjectFinding[] = [];
  const blockers: string[] = [];
  const warnings: string[] = [];

  const packageFile = rootInfo.exists
    ? readProjectJson(root, "package.json")
    : { status: "missing" as const, path: join(root, "package.json") };
  const tsconfigFile = rootInfo.exists
    ? inspectProjectFile(root, "tsconfig.json")
    : { status: "missing" as const, path: join(root, "tsconfig.json") };
  const componentsFile = rootInfo.exists
    ? readProjectJson(root, "components.json")
    : { status: "missing" as const, path: join(root, "components.json") };

  if (rootInfo.error) {
    addFinding(findings, blockers, warnings, {
      id: "project-root",
      status: "blocked",
      message: rootInfo.error,
      path: root,
    });
  }

  if (packageFile.status === "ok") {
    addFinding(findings, blockers, warnings, {
      id: "package-json",
      status: "ok",
      message: "package.json is readable.",
      path: packageFile.path,
    });
  } else {
    addFinding(findings, blockers, warnings, {
      id: "package-json",
      status: "blocked",
      message:
        packageFile.status === "missing"
          ? "package.json is missing; select a package project before installing."
          : packageFile.error ?? "package.json could not be read safely.",
      path: packageFile.path,
    });
  }

  const manager = inspectPackageManager(root, packageFile);
  if (manager.status === "supported") {
    addFinding(findings, blockers, warnings, {
      id: "package-manager",
      status: manager.warnings?.length ? "warning" : "ok",
      message: manager.message,
    });
    if (manager.warnings) warnings.push(...manager.warnings);
  } else {
    addFinding(findings, blockers, warnings, {
      id: "package-manager",
      status: "blocked",
      message: manager.message,
    });
  }

  if (tsconfigFile.status === "present") {
    addFinding(findings, blockers, warnings, {
      id: "tsconfig",
      status: "ok",
      message: "tsconfig.json is readable. Doctor checks presence only; the shadcn CLI validates its JSONC syntax during install.",
      path: tsconfigFile.path,
    });
  } else if (tsconfigFile.status === "missing") {
    addFinding(findings, blockers, warnings, {
      id: "tsconfig",
      status: "blocked",
      message: "tsconfig.json is missing. The shadcn add command could not load a Tailwind v4 project without it; add the project config or initialize it before applying.",
      path: tsconfigFile.path,
    });
  } else {
    addFinding(findings, blockers, warnings, {
      id: "tsconfig",
      status: "blocked",
      message: tsconfigFile.error ?? "Could not confirm a readable tsconfig.json; let the shadcn CLI validate its JSONC syntax after access is fixed.",
      path: tsconfigFile.path,
    });
  }

  let configuredCssPath: string | undefined;
  let resolvedCssPath: string | undefined;
  let tailwindCssVariables: boolean | undefined;
  let cssEntryStatus: ProjectInspection["cssEntry"]["status"] = "unknown";
  let cssTailwindImport: ProjectInspection["cssEntry"]["tailwindImport"] = "unknown";
  let cssMessage = "A configured Tailwind CSS entry could not be determined.";

  if (componentsFile.status === "ok") {
    const tailwind = componentsFile.data?.tailwind;
    if (isRecord(tailwind)) {
      if (typeof tailwind.css === "string") configuredCssPath = tailwind.css;
      if (typeof tailwind.cssVariables === "boolean") {
        tailwindCssVariables = tailwind.cssVariables;
      }
    }

    if (!configuredCssPath) {
      cssEntryStatus = "invalid";
      cssMessage = "components.json must set tailwind.css to the stylesheet used by this project.";
    } else {
      const cssPath = resolveProjectPath(root, configuredCssPath);
      resolvedCssPath = cssPath.path;
      if (cssPath.status === "blocked") {
        cssEntryStatus = "blocked";
        cssMessage = cssPath.error ?? "The CSS entry points outside the selected project.";
      } else if (cssPath.status === "invalid") {
        cssEntryStatus = "invalid";
        cssMessage = cssPath.error ?? "The CSS entry path is invalid.";
      } else if (cssPath.status === "missing") {
        cssEntryStatus = "missing";
        cssMessage = `The configured CSS entry does not exist: ${configuredCssPath}.`;
      } else {
        try {
          const stats = statSync(cssPath.path);
          if (!stats.isFile()) {
            cssEntryStatus = "invalid";
            cssMessage = "The configured Tailwind CSS entry is not a regular file.";
          } else {
            cssEntryStatus = "ready";
            cssMessage = "The configured stylesheet exists inside the selected project.";
            if (stats.size <= MAX_INSPECTED_FILE_BYTES) {
              const css = readFileSync(cssPath.path, "utf8");
              cssTailwindImport = /@import\s+(?:url\()?\s*["']tailwindcss["']|@tailwind\s+(?:base|components|utilities)/i.test(css)
                ? "detected"
                : "not-detected";
              if (cssTailwindImport === "not-detected") {
                cssMessage += " No Tailwind import/directive was detected in this file; confirm the configured entry is active in the application.";
              }
            }
          }
        } catch (error) {
          cssEntryStatus = "invalid";
          cssMessage = `Could not inspect the configured CSS entry: ${errorMessage(error)}`;
        }
      }
    }
  }

  if (componentsFile.status === "ok") {
    addFinding(findings, blockers, warnings, {
      id: "components-json",
      status: "ok",
      message: "components.json is readable.",
      path: componentsFile.path,
    });

    if (tailwindCssVariables === false) {
      addFinding(findings, blockers, warnings, {
        id: "css-variables",
        status: "blocked",
        message: "components.json sets tailwind.cssVariables to false, while StyleKit registry themes provide CSS variables.",
        path: componentsFile.path,
      });
    } else if (tailwindCssVariables === true) {
      addFinding(findings, blockers, warnings, {
        id: "css-variables",
        status: "ok",
        message: "CSS variable theming is enabled in components.json.",
        path: componentsFile.path,
      });
    } else {
      addFinding(findings, blockers, warnings, {
        id: "css-variables",
        status: "blocked",
        message: "components.json must state tailwind.cssVariables as a boolean; the current shadcn schema requires this setting for add.",
        path: componentsFile.path,
      });
    }
  } else {
    addFinding(findings, blockers, warnings, {
      id: "components-json",
      status: "blocked",
      message:
        componentsFile.status === "missing"
          ? "components.json is missing. The shadcn CLI requires this configuration for add; initialize it yourself before applying."
          : componentsFile.error ?? "components.json could not be read safely.",
      path: componentsFile.path,
    });
  }

  if (cssEntryStatus === "ready") {
    addFinding(findings, blockers, warnings, {
      id: "tailwind-css-entry",
      status: "ok",
      message: cssMessage,
      path: resolvedCssPath,
    });
    if (cssTailwindImport === "not-detected") {
      addFinding(findings, blockers, warnings, {
        id: "tailwind-css-import",
        status: "warning",
        message: "No Tailwind import/directive was detected in the configured CSS entry; the entry may import Tailwind indirectly.",
        path: resolvedCssPath,
      });
    }
  } else {
    addFinding(findings, blockers, warnings, {
      id: "tailwind-css-entry",
      status: "blocked",
      message: cssMessage,
      path: resolvedCssPath,
    });
  }

  const declaredTailwind = manifestDependencyVersion(packageFile.data, "tailwindcss");
  const installedTailwind = rootInfo.exists ? findInstalledTailwind(root) : undefined;
  const tailwindVersion = installedTailwind ?? declaredTailwind;
  const declaredTailwindMajor = versionMajor(declaredTailwind);
  const installedTailwindMajor = versionMajor(installedTailwind);
  const conflictingTailwindMajors =
    declaredTailwindMajor !== undefined &&
    installedTailwindMajor !== undefined &&
    declaredTailwindMajor !== installedTailwindMajor;
  const tailwindMajor = conflictingTailwindMajors
    ? undefined
    : versionMajor(tailwindVersion);
  const registryCompatibility =
    tailwindMajor === undefined
      ? "unknown"
      : tailwindMajor === 4
        ? "supported"
        : "unsupported";
  const tailwindBaseMessage = installedTailwind
    ? `Tailwind CSS ${installedTailwind} is installed${declaredTailwind ? ` (manifest range ${declaredTailwind})` : ""}.`
    : declaredTailwind
      ? `Tailwind CSS is declared as ${declaredTailwind}; the installed version could not be confirmed from this project or its ancestors.`
      : "Tailwind CSS was not found in package.json or the project's exact node_modules package path.";
  const tailwindCompatibilityMessage =
    conflictingTailwindMajors
      ? `${tailwindBaseMessage} Installed and declared major versions conflict, so registry compatibility is unknown.`
      : registryCompatibility === "supported"
        ? `${tailwindBaseMessage} StyleKit registry themes support Tailwind CSS v4.`
        : registryCompatibility === "unsupported" && tailwindMajor === 3
          ? `${tailwindBaseMessage} StyleKit registry endpoints are Tailwind v4 only; full hsl(...) values can become nested hsl(hsl(...)) in Tailwind v3 shadcn setups. Use the legacy Style Pack <slug>-variables.css and <slug>-tailwind-preset.js artifacts; rename the preset to .cjs for ESM projects.`
          : registryCompatibility === "unsupported"
            ? `${tailwindBaseMessage} StyleKit registry endpoints support Tailwind v4 only; this detected major version is unsupported.`
            : `${tailwindBaseMessage} Registry installation is blocked until Tailwind v4 can be confirmed.`;
  const tailwind: ProjectInspection["tailwind"] = {
    status: !tailwindVersion
      ? "missing"
      : tailwindMajor === undefined
        ? "unknown"
        : "detected",
    registryCompatibility,
    ...(declaredTailwind ? { declaredVersion: declaredTailwind } : {}),
    ...(installedTailwind ? { installedVersion: installedTailwind } : {}),
    ...(tailwindMajor !== undefined ? { major: tailwindMajor } : {}),
    ...(tailwindVersion ? { source: installedTailwind ? "installed" : "package.json" } : {}),
    message: tailwindCompatibilityMessage,
  };

  if (tailwind.registryCompatibility === "supported") {
    addFinding(findings, blockers, warnings, {
      id: "tailwind-version",
      status: "ok",
      message: tailwind.message,
      path: packageFile.path,
    });
  } else if (tailwind.registryCompatibility === "unsupported") {
    addFinding(findings, blockers, warnings, {
      id: "tailwind-version",
      status: "blocked",
      message: tailwind.message,
      path: packageFile.path,
    });
  } else {
    addFinding(findings, blockers, warnings, {
      id: "tailwind-version",
      status: "blocked",
      message: tailwind.message,
      path: packageFile.path,
    });
  }

  const readyForAdd = rootInfo.exists && blockers.length === 0;
  return {
    schemaVersion: "stylekit-cli-project-v1",
    requestedRoot: rootInfo.requestedRoot,
    root,
    exists: rootInfo.exists,
    readyForAdd,
    packageJson: {
      status: packageFile.status,
      path: packageFile.path,
      ...(typeof packageFile.data?.name === "string" ? { name: packageFile.data.name } : {}),
      ...(typeof packageFile.data?.packageManager === "string"
        ? { packageManagerField: packageFile.data.packageManager }
        : {}),
      ...(packageFile.error ? { error: packageFile.error } : {}),
    },
    packageManager: manager,
    tsconfig: {
      status: tsconfigFile.status,
      path: tsconfigFile.path,
      message:
        tsconfigFile.status === "present"
          ? "tsconfig.json is readable; syntax validation is delegated to shadcn."
          : tsconfigFile.status === "missing"
            ? "tsconfig.json is required for the shadcn add path used here."
            : tsconfigFile.error ?? "tsconfig.json could not be inspected.",
    },
    componentsJson: {
      status:
        componentsFile.status === "ok"
          ? "present"
          : componentsFile.status === "missing"
            ? "missing"
            : componentsFile.status,
      path: componentsFile.path,
      ...(tailwindCssVariables !== undefined ? { tailwindCssVariables } : {}),
      ...(configuredCssPath ? { configuredCssPath } : {}),
      ...(resolvedCssPath ? { resolvedCssPath } : {}),
      message:
        componentsFile.status === "ok"
          ? "components.json is readable."
          : componentsFile.status === "missing"
            ? "components.json is required by the shadcn CLI add command."
            : componentsFile.error ?? "components.json could not be inspected.",
    },
    tailwind,
    cssEntry: {
      status: cssEntryStatus,
      ...(configuredCssPath ? { configuredPath: configuredCssPath } : {}),
      ...(resolvedCssPath ? { path: resolvedCssPath } : {}),
      tailwindImport: cssTailwindImport,
      message: cssMessage,
    },
    findings,
    blockers: [...new Set(blockers)],
    warnings: [...new Set(warnings)],
  };
}

function validSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function isAddPlan(value: unknown): value is AddPlan {
  if (!isRecord(value) || value.schemaVersion !== PLAN_SCHEMA) return false;
  if (
    typeof value.slug !== "string" ||
    !validSlug(value.slug) ||
    typeof value.cwd !== "string" ||
    typeof value.readyForApply !== "boolean" ||
    !Array.isArray(value.fileFingerprints) ||
    !value.fileFingerprints.every((fingerprint) =>
      isRecord(fingerprint) &&
      typeof fingerprint.path === "string" &&
      (typeof fingerprint.exists === "boolean" || fingerprint.exists === null) &&
      (fingerprint.sha256 === undefined ||
        (typeof fingerprint.sha256 === "string" && /^[a-f0-9]{64}$/.test(fingerprint.sha256))),
    ) ||
    !isRecord(value.target) ||
    typeof value.target.projectRoot !== "string" ||
    !isRecord(value.command) ||
    (value.command.executable !== null && typeof value.command.executable !== "string") ||
    !Array.isArray(value.command.args) ||
    !value.command.args.every((argument) => typeof argument === "string")
  ) {
    return false;
  }
  return true;
}

function registryUrl(slug: string): string {
  return `${STYLEKIT_SITE_URL}/r/${encodeURIComponent(slug)}.json`;
}

interface RuntimeCommand {
  executable: string;
  args: string[];
  display: string;
}

function isFile(path: string): boolean {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}

function pathEntries(): string[] {
  const entries = [
    ...(process.env.PATH ?? "").split(delimiter),
    ...(process.env.PNPM_HOME ? [process.env.PNPM_HOME] : []),
    dirname(process.execPath),
  ];
  return [...new Set(entries.map((entry) => entry.trim().replace(/^"|"$/g, "")).filter(Boolean))];
}

function resolveWindowsManager(manager: SupportedPackageManager): {
  executable: string;
  prefixArgs: string[];
} | null {
  const entries = pathEntries();
  if (manager === "pnpm") {
    for (const entry of entries) {
      for (const candidate of [
        join(entry, "pnpm.exe"),
        join(entry, "node_modules", "pnpm", "pnpm.exe"),
      ]) {
        if (isFile(candidate)) {
          return { executable: realpathSync(candidate), prefixArgs: [] };
        }
      }
    }
    for (const entry of entries) {
      for (const candidate of [
        join(entry, "node_modules", "pnpm", "bin", "pnpm.cjs"),
        join(entry, "node_modules", "pnpm", "bin", "pnpm.js"),
      ]) {
        if (isFile(candidate)) {
          return { executable: process.execPath, prefixArgs: [realpathSync(candidate)] };
        }
      }
    }
    for (const entry of entries) {
      const candidate = join(entry, "node_modules", "corepack", "dist", "pnpm.js");
      if (isFile(candidate)) {
        return { executable: process.execPath, prefixArgs: [realpathSync(candidate)] };
      }
    }
    return null;
  }

  for (const entry of entries) {
    const candidate = join(entry, "node_modules", "npm", "bin", "npx-cli.js");
    if (isFile(candidate)) {
      return { executable: process.execPath, prefixArgs: [realpathSync(candidate)] };
    }
  }
  return null;
}

function commandFor(
  manager: SupportedPackageManager | undefined,
  url: string,
  cwd: string,
): RuntimeCommand | null {
  if (!manager) return null;
  const displayArgs = manager === "pnpm"
    ? ["dlx", "shadcn@latest", "add", url, "--yes", "--cwd", cwd]
    : ["--yes", "shadcn@latest", "add", url, "--yes", "--cwd", cwd];
  const runtime = process.platform === "win32"
    ? resolveWindowsManager(manager)
    : { executable: manager === "pnpm" ? "pnpm" : "npx", prefixArgs: [] };
  if (!runtime) return null;

  const args = [...runtime.prefixArgs, ...displayArgs];
  const display = [manager === "pnpm" ? "pnpm" : "npx", ...displayArgs]
    .map(quoteDisplayArg)
    .join(" ");
  return {
    executable: runtime.executable,
    args,
    display:
      runtime.executable === (manager === "pnpm" ? "pnpm" : "npx")
        ? display
        : `${display} (resolved for shell:false execution)`,
  };
}

function quoteDisplayArg(value: string): string {
  return `"${value.replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;
}

/** Build a non-executing installation plan for a style. */
export function createAddPlan(slug: string, cwd?: string): AddPlan {
  const inspection = inspectProject(cwd);
  const blockers = [...inspection.blockers];
  const warnings = [...inspection.warnings];
  warnings.push("Planning does not fetch remote registry JSON; the predicted CSS target and empty source-file list reflect the current local StyleKit registry generator and may differ if the published item changes.");
  const valid = validSlug(slug);
  if (!valid) blockers.unshift("The style slug must use lowercase letters, numbers, and single hyphens only.");

  const url = valid ? registryUrl(slug) : null;
  const command = url
    ? commandFor(inspection.packageManager.name, url, inspection.root)
    : null;
  if (valid && !command) {
    blockers.push("No supported pnpm or npm executable can be selected from the project evidence.");
  }

  const affectedFiles: PlannedFile[] = [];
  if (inspection.cssEntry.path) {
    affectedFiles.push({
      path: inspection.cssEntry.path,
      role: "theme-css-vars",
      likelihood: "expected",
      reason: "The current StyleKit registry theme item declares cssVars and no source files; shadcn applies its variables to components.json tailwind.css.",
    });
  }
  affectedFiles.push(
    {
      path: inspection.componentsJson.path,
      role: "project-config",
      likelihood: "possible",
      reason: "The shadcn CLI may update project registry metadata while resolving a registry item.",
    },
    {
      path: inspection.packageJson.path,
      role: "package-manifest",
      likelihood: "possible",
      reason: "The CLI may update the project manifest if the registry item introduces dependencies; current StyleKit theme items declare none.",
    },
  );
  for (const lockfile of PACKAGE_MANAGER_LOCKFILES) {
    const lockPath = join(inspection.root, lockfile.name);
    if (inspection.packageManager.name && lockfile.manager === inspection.packageManager.name) {
      affectedFiles.push({
        path: lockPath,
        role: "package-lock",
        likelihood: "possible",
        reason: "Included in post-install checks for package-manager changes.",
      });
    }
  }

  const fileSnapshots = snapshotFiles(trackedPaths(inspection));
  for (const snapshot of fileSnapshots.values()) {
    if (snapshot.state === "unreadable") {
      blockers.push(`Could not create a reliable fingerprint for ${snapshot.path}; resolve its file access before applying.`);
    }
  }
  const fileFingerprints = toPlannedFileFingerprints(fileSnapshots);

  return {
    schemaVersion: PLAN_SCHEMA,
    slug,
    cwd: inspection.requestedRoot,
    registryUrl: url,
    target: {
      projectRoot: inspection.root,
      ...(inspection.cssEntry.path ? { cssFile: inspection.cssEntry.path } : {}),
    },
    command: {
      executable: command?.executable ?? null,
      args: command?.args ?? [],
      display: command?.display ?? null,
      executionBoundary: "shell:false",
    },
    prerequisites: inspection.findings,
    affectedFiles,
    fileFingerprints,
    expectedSourceFiles: [],
    readyForApply: valid && command !== null && inspection.readyForAdd && blockers.length === 0,
    blockers: [...new Set(blockers)],
    warnings: [...new Set(warnings)],
    inspection,
  };
}

function trackedPaths(inspection: ProjectInspection): string[] {
  const paths: string[] = [];
  if (inspection.packageJson.status !== "blocked") paths.push(inspection.packageJson.path);
  if (inspection.tsconfig.status !== "blocked") paths.push(inspection.tsconfig.path);
  if (inspection.componentsJson.status !== "blocked") paths.push(inspection.componentsJson.path);
  if (inspection.cssEntry.status !== "blocked" && inspection.cssEntry.path) {
    paths.push(inspection.cssEntry.path);
  }
  for (const lockfile of PACKAGE_MANAGER_LOCKFILES) {
    const safe = resolveProjectPath(inspection.root, lockfile.name);
    if (safe.status === "ok" || safe.status === "missing") paths.push(safe.path);
  }
  return [...new Set(paths)];
}

function sha256File(path: string): string {
  const descriptor = openSync(path, "r");
  const hash = createHash("sha256");
  const buffer = Buffer.allocUnsafe(64 * 1024);
  try {
    let bytesRead = 0;
    while ((bytesRead = readSync(descriptor, buffer, 0, buffer.length, null)) > 0) {
      hash.update(buffer.subarray(0, bytesRead));
    }
    return hash.digest("hex");
  } finally {
    closeSync(descriptor);
  }
}

function snapshotFile(path: string): FileSnapshot {
  try {
    const stats = statSync(path);
    if (!stats.isFile()) {
      return { path, state: "unreadable", fingerprint: `not-file:${stats.mode}` };
    }
    if (stats.size <= MAX_INSPECTED_FILE_BYTES) {
      const bytes = readFileSync(path);
      const content = bytes.toString("utf8");
      const fingerprint = createHash("sha256").update(bytes).digest("hex");
      return { path, state: "present", fingerprint, content, size: stats.size };
    }
    return {
      path,
      state: "present",
      fingerprint: sha256File(path),
      size: stats.size,
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { path, state: "missing", fingerprint: "missing" };
    }
    return { path, state: "unreadable", fingerprint: `error:${errorMessage(error)}` };
  }
}

function snapshotFiles(paths: string[]): Map<string, FileSnapshot> {
  return new Map(paths.map((path) => [path, snapshotFile(path)]));
}

function toPlannedFileFingerprints(
  snapshots: Map<string, FileSnapshot>,
): PlannedFileFingerprint[] {
  return [...snapshots.values()].map((snapshot) => ({
    path: snapshot.path,
    exists:
      snapshot.state === "unreadable"
        ? null
        : snapshot.state === "present",
    ...(snapshot.state === "present" && snapshot.fingerprint && /^[a-f0-9]{64}$/.test(snapshot.fingerprint)
      ? { sha256: snapshot.fingerprint }
      : {}),
  }));
}

function changedState(before: FileSnapshot | undefined, after: FileSnapshot): boolean | null {
  if (!before) return null;
  if (before.state === "unreadable" || after.state === "unreadable") return null;
  if (before.state === "missing" || after.state === "missing") {
    return before.state !== after.state;
  }
  return before.fingerprint !== after.fingerprint;
}

function parseCssVariables(css: string | undefined): Map<string, string> {
  const variables = new Map<string, string>();
  if (!css) return variables;
  const declaration = /(--[a-zA-Z0-9_-]+)\s*:\s*([^;{}]+)\s*;?/g;
  for (const match of css.matchAll(declaration)) {
    const name = match[1];
    const value = match[2]?.trim();
    if (name && value !== undefined) variables.set(name, value);
  }
  return variables;
}

function cssVariableDiff(before?: string, after?: string): {
  added: string[];
  updated: string[];
  removed: string[];
} {
  const previous = parseCssVariables(before);
  const current = parseCssVariables(after);
  const added = [...current.keys()].filter((name) => !previous.has(name)).sort();
  const updated = [...current.keys()]
    .filter((name) => previous.has(name) && previous.get(name) !== current.get(name))
    .sort();
  const removed = [...previous.keys()].filter((name) => !current.has(name)).sort();
  return { added, updated, removed };
}

function dependencyChanges(before?: string, after?: string): string[] {
  if (!before || !after) return [];
  try {
    const previous: unknown = JSON.parse(before);
    const current: unknown = JSON.parse(after);
    if (!isRecord(previous) || !isRecord(current)) return [];
    const groups = ["dependencies", "devDependencies", "optionalDependencies"];
    const changes: string[] = [];
    for (const groupName of groups) {
      const oldGroup = isRecord(previous[groupName]) ? previous[groupName] : {};
      const newGroup = isRecord(current[groupName]) ? current[groupName] : {};
      const names = new Set([...Object.keys(oldGroup), ...Object.keys(newGroup)]);
      for (const name of [...names].sort()) {
        const oldVersion = oldGroup[name];
        const newVersion = newGroup[name];
        if (oldVersion !== newVersion) {
          changes.push(
            `${groupName}.${name}: ${typeof oldVersion === "string" ? oldVersion : "<missing>"} -> ${typeof newVersion === "string" ? newVersion : "<missing>"}`,
          );
        }
      }
    }
    return changes;
  } catch {
    return [];
  }
}

function captureProcess(
  executable: string,
  args: string[],
  cwd: string,
  spawnImpl: SpawnImpl,
): Promise<SpawnResult> {
  return new Promise((resolvePromise) => {
    let child: ChildProcessWithoutNullStreams;
    try {
      const options: SpawnOptionsForStyleKit = {
        cwd,
        shell: false,
        windowsHide: true,
        stdio: "pipe",
      };
      child = spawnImpl(executable, [...args], options);
    } catch (error) {
      resolvePromise({
        exitCode: null,
        signal: null,
        error: errorMessage(error),
        stdout: "",
        stderr: "",
        outputTruncated: false,
      });
      return;
    }

    let stdout = "";
    let stderr = "";
    let outputBytes = 0;
    let outputTruncated = false;
    const collect = (destination: "stdout" | "stderr") => (chunk: Buffer | string) => {
      const value = Buffer.isBuffer(chunk) ? chunk.toString("utf8") : chunk;
      const remaining = MAX_CAPTURED_OUTPUT_BYTES - outputBytes;
      if (remaining <= 0) {
        outputTruncated = true;
        return;
      }
      const buffer = Buffer.from(value);
      const accepted = buffer.subarray(0, remaining).toString("utf8");
      outputBytes += Buffer.byteLength(accepted);
      if (accepted.length < value.length) outputTruncated = true;
      if (destination === "stdout") stdout += accepted;
      else stderr += accepted;
    };

    child.stdout.on("data", collect("stdout"));
    child.stderr.on("data", collect("stderr"));
    child.stdin.end();

    let settled = false;
    child.once("error", (error) => {
      if (settled) return;
      settled = true;
      resolvePromise({
        exitCode: null,
        signal: null,
        error: error.message,
        ...("code" in error && typeof error.code === "string" ? { errorCode: error.code } : {}),
        stdout,
        stderr,
        outputTruncated,
      });
    });
    child.once("close", (exitCode, signal) => {
      if (settled) return;
      settled = true;
      resolvePromise({
        exitCode,
        signal,
        stdout,
        stderr,
        outputTruncated,
      });
    });
  });
}

function emptyVerification(note: string): ApplyResult["verification"] {
  return {
    checkedFiles: [],
    themeIdentity: "unverified",
    visualResult: "unverified",
    changedFiles: [],
    files: [],
    partialChanges: [],
    css: {
      fileChanged: null,
      variablesAdded: [],
      variablesUpdated: [],
      variablesRemoved: [],
      changesObserved: false,
      message: "The install did not reach post-install file checks.",
    },
    package: {
      manifestChanged: null,
      dependencyChanges: [],
      packageFilesChanged: [],
    },
    sourceFilesExpected: [],
    sourceFilesScanned: false,
    note,
  };
}

/**
 * Apply a plan only after explicit caller authorization. The plan's displayed
 * command is never executed; the executable and arguments are rebuilt from
 * validated project evidence and the validated slug.
 */
export async function applyAddPlan(
  plan: AddPlan,
  options: ApplyOptions,
): Promise<ApplyResult> {
  const baseResult = {
    schemaVersion: "stylekit-cli-add-result-v1" as const,
    slug: typeof plan?.slug === "string" ? plan.slug : "",
    projectRoot: typeof plan?.target?.projectRoot === "string" ? plan.target.projectRoot : "",
  };

  if (options?.apply !== true) {
    return {
      ...baseResult,
      ok: false,
      status: "not-authorized",
      process: {
        executable: null,
        args: [],
        exitCode: null,
        signal: null,
        stdout: "",
        stderr: "",
        outputTruncated: false,
      },
      blockers: ["Installation requires an explicit apply: true option."],
      verification: emptyVerification("No external process was started."),
    };
  }

  if (!isAddPlan(plan)) {
    return {
      ...baseResult,
      ok: false,
      status: "blocked",
      process: {
        executable: null,
        args: [],
        exitCode: null,
        signal: null,
        stdout: "",
        stderr: "",
        outputTruncated: false,
      },
      blockers: ["The installation plan is invalid or has an unsafe style slug."],
      verification: emptyVerification("No external process was started."),
    };
  }

  if (!plan.readyForApply) {
    return {
      ...baseResult,
      ok: false,
      status: "blocked",
      process: {
        executable: null,
        args: [],
        exitCode: null,
        signal: null,
        stdout: "",
        stderr: "",
        outputTruncated: false,
      },
      blockers: plan.blockers,
      verification: emptyVerification("The original plan did not pass preflight; create a fresh plan after resolving its blockers."),
    };
  }

  const freshPlan = createAddPlan(plan.slug, plan.cwd);
  if (
    freshPlan.target.projectRoot !== plan.target.projectRoot ||
    freshPlan.target.cssFile !== plan.target.cssFile ||
    freshPlan.command.executable !== plan.command.executable ||
    JSON.stringify(freshPlan.command.args) !== JSON.stringify(plan.command.args) ||
    JSON.stringify(freshPlan.fileFingerprints) !== JSON.stringify(plan.fileFingerprints)
  ) {
    return {
      ...baseResult,
      ok: false,
      status: "blocked",
      process: {
        executable: null,
        args: [],
        exitCode: null,
        signal: null,
        stdout: "",
        stderr: "",
        outputTruncated: false,
      },
      blockers: ["The project changed after planning. Run the command again to create a fresh plan."],
      verification: emptyVerification("No external process was started because the plan is stale."),
    };
  }

  if (!freshPlan.readyForApply || !freshPlan.command.executable) {
    return {
      ...baseResult,
      ok: false,
      status: "blocked",
      process: {
        executable: null,
        args: [],
        exitCode: null,
        signal: null,
        stdout: "",
        stderr: "",
        outputTruncated: false,
      },
      blockers: freshPlan.blockers,
      verification: emptyVerification("Preflight did not pass; no external process was started."),
    };
  }

  const inspection = freshPlan.inspection;
  const paths = trackedPaths(inspection);
  const before = snapshotFiles(paths);
  if (
    JSON.stringify(toPlannedFileFingerprints(before)) !==
    JSON.stringify(plan.fileFingerprints)
  ) {
    return {
      ...baseResult,
      ok: false,
      status: "blocked",
      process: {
        executable: null,
        args: [],
        exitCode: null,
        signal: null,
        stdout: "",
        stderr: "",
        outputTruncated: false,
      },
      blockers: ["Checked project files changed during preflight. Run the command again to create a fresh plan."],
      verification: emptyVerification("No external process was started because the checked project state changed."),
    };
  }
  const executable = freshPlan.command.executable;
  const args = freshPlan.command.args;
  const run = await captureProcess(
    executable,
    args,
    inspection.root,
    options.spawnImpl ?? (spawn as unknown as SpawnImpl),
  );
  const after = snapshotFiles(paths);

  const changedFiles: string[] = [];
  const partialChanges: string[] = [];
  const fileSummaries: ObservedFileSummary[] = [];
  for (const path of paths) {
    const beforeFile = before.get(path);
    const afterFile = after.get(path)!;
    const changed = changedState(before.get(path), after.get(path)!);
    if (changed === true) changedFiles.push(path);
    fileSummaries.push({
      path,
      beforeExists:
        !beforeFile || beforeFile.state === "unreadable"
          ? null
          : beforeFile.state === "present",
      afterExists:
        afterFile.state === "unreadable"
          ? null
          : afterFile.state === "present",
      ...(beforeFile?.state === "present" && beforeFile.fingerprint
        ? { beforeHash: beforeFile.fingerprint }
        : {}),
      ...(afterFile.state === "present" && afterFile.fingerprint
        ? { afterHash: afterFile.fingerprint }
        : {}),
      changed,
    });
  }
  if (run.exitCode !== 0) partialChanges.push(...changedFiles);

  const cssPath = inspection.cssEntry.path;
  const cssBefore = cssPath ? before.get(cssPath) : undefined;
  const cssAfter = cssPath ? after.get(cssPath) : undefined;
  const cssChanged = cssAfter ? changedState(cssBefore, cssAfter) : null;
  const variableDiff = cssVariableDiff(cssBefore?.content, cssAfter?.content);
  const cssChangesObserved =
    run.exitCode === 0 &&
    cssChanged === true &&
    (variableDiff.added.length > 0 || variableDiff.updated.length > 0);

  const packagePath = inspection.packageJson.path;
  const packageBefore = before.get(packagePath);
  const packageAfter = after.get(packagePath);
  const packageChanged = packageAfter
    ? changedState(packageBefore, packageAfter)
    : null;
  const packageFilesChanged = changedFiles.filter((path) =>
    PACKAGE_MANAGER_LOCKFILES.some((lockfile) => path === join(inspection.root, lockfile.name)),
  );
  const note =
    run.exitCode === 0
      ? cssChangesObserved
        ? "shadcn exited successfully and CSS variable changes were observed in the configured stylesheet. This does not verify that the values match the requested style; style identity and rendered visual result remain unverified. The file snapshot is limited to checkedFiles; source files were not scanned."
        : "shadcn exited successfully, but no CSS variable change was confirmed in the configured stylesheet. This may be an idempotent no-op; style identity and rendered visual result remain unverified. The file snapshot is limited to checkedFiles; source files were not scanned."
      : `shadcn did not complete successfully${run.exitCode === null ? "" : ` (exit ${run.exitCode})`}; inspect any partial project changes before retrying. No rollback was attempted. The file snapshot is limited to checkedFiles; source files were not scanned.`;

  return {
    ...baseResult,
    ok: run.exitCode === 0,
    status:
      run.error
        ? "spawn-error"
        : run.exitCode === 0
          ? "completed"
          : "failed",
    process: {
      executable,
      args,
      exitCode: run.exitCode,
      signal: run.signal,
      ...(run.error ? { error: run.error } : {}),
      ...(run.errorCode ? { errorCode: run.errorCode } : {}),
      stdout: run.stdout,
      stderr: run.stderr,
      outputTruncated: run.outputTruncated,
    },
    blockers: run.exitCode === 0 ? [] : [
      run.error
        ? `Could not start ${executable}: ${run.error}`
        : `The installer exited with code ${run.exitCode ?? "unknown"}${run.signal ? ` after signal ${run.signal}` : ""}.`,
    ],
    verification: {
      themeIdentity: "unverified",
      visualResult: "unverified",
      checkedFiles: paths,
      files: fileSummaries,
      changedFiles,
      partialChanges,
      css: {
        ...(cssPath ? { path: cssPath } : {}),
        fileChanged: cssChanged,
        variablesAdded: variableDiff.added,
        variablesUpdated: variableDiff.updated,
        variablesRemoved: variableDiff.removed,
        changesObserved: cssChangesObserved,
        message:
          cssChangesObserved
            ? `Observed ${variableDiff.added.length} added and ${variableDiff.updated.length} updated CSS custom properties; expected values and theme identity were not checked.`
          : cssAfter?.state === "present" && !cssAfter.content
              ? "The CSS file exceeds the inspection size limit; content changes could not be parsed."
              : cssChanged === true
                ? "The CSS file changed, but no added or updated custom property was confirmed."
                : cssChanged === false
                  ? "No CSS file change was detected. Existing identical theme variables may already be present."
                  : "The CSS file could not be compared reliably.",
      },
      package: {
        manifestChanged: packageChanged,
        dependencyChanges: dependencyChanges(packageBefore?.content, packageAfter?.content),
        packageFilesChanged,
      },
      sourceFilesExpected: freshPlan.expectedSourceFiles,
      sourceFilesScanned: false,
      note,
    },
  };
}
