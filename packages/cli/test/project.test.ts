import assert from "node:assert/strict";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  applyAddPlan,
  createAddPlan,
  inspectProject,
  type ApplyOptions,
  type SpawnImpl,
} from "../src/project.js";

const temporaryRoots: string[] = [];
let assertions = 0;

function check(condition: unknown, message: string): void {
  assertions += 1;
  assert.ok(condition, message);
}

function createProject(options: {
  name?: string;
  packageManager?: string;
  lockfile?: "pnpm" | "npm" | "both" | "none";
  components?: unknown;
  cssPath?: string;
  css?: string;
  tailwind?: string;
  tsconfig?: boolean;
} = {}): string {
  const root = mkdtempSync(join(tmpdir(), options.name ?? "stylekit cli project with spaces-"));
  temporaryRoots.push(root);
  const packageJson: Record<string, unknown> = {
    name: "fixture-project",
    private: true,
    ...(options.packageManager ? { packageManager: options.packageManager } : {}),
    devDependencies: { tailwindcss: options.tailwind ?? "^4.1.0" },
  };
  writeFileSync(join(root, "package.json"), `${JSON.stringify(packageJson, null, 2)}\n`);
  if (options.tsconfig !== false) {
    writeFileSync(join(root, "tsconfig.json"), '{"compilerOptions":{"strict":true}}\n');
  }
  const cssPath = options.cssPath ?? "src/theme.css";
  const cssAbsolute = join(root, cssPath);
  if (!cssPath.startsWith("../")) {
    mkdirSync(join(cssAbsolute, ".."), { recursive: true });
    writeFileSync(cssAbsolute, options.css ?? '@import "tailwindcss";\n:root { --primary: #000; }\n');
  }
  const components = options.components ?? {
    $schema: "https://ui.shadcn.com/schema.json",
    style: "new-york",
    tailwind: { css: cssPath, cssVariables: true },
    aliases: { ui: "@/components/ui" },
  };
  if (options.components !== null) {
    writeFileSync(join(root, "components.json"), `${JSON.stringify(components, null, 2)}\n`);
  }

  const lockfile = options.lockfile ?? "pnpm";
  if (lockfile === "pnpm" || lockfile === "both") {
    writeFileSync(join(root, "pnpm-lock.yaml"), "lockfileVersion: '9.0'\n");
  }
  if (lockfile === "npm" || lockfile === "both") {
    writeFileSync(join(root, "package-lock.json"), '{"lockfileVersion":3}\n');
  }
  writeFileSync(join(root, ".env"), "fixture-only-do-not-read\n");
  return root;
}

const childStub = String.raw`
const fs = require("node:fs");
const path = require("node:path");
const mode = process.argv[2];
const executable = process.argv[3];
const args = JSON.parse(process.argv[4]);
if (mode === "mutate" || mode === "fail-after-mutation") {
  const cssPath = path.join(process.cwd(), "src", "theme.css");
  fs.appendFileSync(cssPath, "\n:root { --primary: oklch(0.4 0.2 20); --card: #fff; }\n");
  const packagePath = path.join(process.cwd(), "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  packageJson.dependencies = { ...(packageJson.dependencies || {}), "fixture-theme-check": "1.0.0" };
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + "\n");
  fs.writeFileSync(path.join(process.cwd(), "pnpm-lock.yaml"), "lockfileVersion: '9.0'\nimporters:\n  .:\n    dependencies:\n      fixture-theme-check: 1.0.0\n");
}
console.log(JSON.stringify({ executable, args, cwd: process.cwd() }));
process.stderr.write("fixture stderr\n");
process.exit(mode === "fail-after-mutation" ? 7 : 0);
`;

function createSpawnStub(root: string, mode: string, calls: Array<Record<string, unknown>>): SpawnImpl {
  const fixturePath = join(root, "stub-installer.cjs");
  writeFileSync(fixturePath, childStub);
  return (command, args, options) => {
    calls.push({ command, args: [...args], options: { ...options } });
    return spawn(process.execPath, [fixturePath, mode, command, JSON.stringify(args)], options);
  };
}

try {
  const validRoot = createProject();
  const validInspection = inspectProject(validRoot);
  check(validInspection.readyForAdd, "a complete pnpm project passes preflight");
  check(validInspection.packageManager.name === "pnpm", "pnpm is selected from the declared project manager");
  check(validInspection.tailwind.major === 4, "Tailwind major version is derived from the declared dependency when not installed");
  check(validInspection.tailwind.registryCompatibility === "supported", "Tailwind v4 is marked compatible with the StyleKit registry endpoint");
  check(validInspection.cssEntry.status === "ready", "configured CSS entry is checked directly");
  check(validInspection.cssEntry.tailwindImport === "detected", "Tailwind import is reported from the configured CSS entry");
  check(validInspection.tsconfig.status === "present", "doctor reports the tsconfig state");

  const dryRunPackageBefore = readFileSync(join(validRoot, "package.json"), "utf8");
  const dryRunCssBefore = readFileSync(join(validRoot, "src", "theme.css"), "utf8");
  const plan = createAddPlan("synthwave", validRoot);
  check(plan.readyForApply, "a valid style plan is ready to apply");
  check(plan.command.executable === "pnpm", "pnpm projects plan a fixed pnpm executable");
  check(plan.command.args[0] === "dlx" && plan.command.args.includes("--cwd"), "pnpm command is an argv array with explicit target cwd");
  check(plan.command.args.includes(plan.target.projectRoot), "the absolute target is one exact argv value");
  check(plan.expectedSourceFiles.length === 0, "StyleKit theme plan reflects its source-free registry item");
  check(plan.affectedFiles.some((file) => file.role === "theme-css-vars" && file.path.endsWith("theme.css")), "plan previews the configured CSS variable target");
  check(readFileSync(join(validRoot, ".env"), "utf8") === "fixture-only-do-not-read\n", "planning leaves environment files untouched");
  check(readFileSync(join(validRoot, "package.json"), "utf8") === dryRunPackageBefore, "planning does not write the package manifest");
  check(readFileSync(join(validRoot, "src", "theme.css"), "utf8") === dryRunCssBefore, "planning does not write the CSS target");

  const npmRoot = createProject({ packageManager: undefined, lockfile: "npm" });
  const npmPlan = createAddPlan("synthwave", npmRoot);
  check(npmPlan.command.executable === "npx", "npm projects select the fixed npx executable from package-lock.json");
  check(npmPlan.command.args[0] === "--yes", "npx arguments begin with its explicit confirmation option");

  const missingComponentsRoot = createProject({ components: null });
  const missingInspection = inspectProject(missingComponentsRoot);
  const missingPlan = createAddPlan("synthwave", missingComponentsRoot);
  check(!missingInspection.readyForAdd, "missing shadcn config blocks automatic install");
  check(missingInspection.blockers.some((item) => item.includes("components.json")), "doctor explains the missing shadcn configuration");
  check(missingInspection.tsconfig.status === "present", "tsconfig is checked independently from shadcn readiness");
  check(!missingPlan.readyForApply && missingPlan.command.executable === "pnpm", "blocked plans still show a safe command preview");
  const blockedCalls: Array<Record<string, unknown>> = [];
  const blockedResult = await applyAddPlan(missingPlan, {
    apply: true,
    spawnImpl: createSpawnStub(missingComponentsRoot, "mutate", blockedCalls),
  });
  check(blockedResult.status === "blocked" && blockedCalls.length === 0, "preflight failure does not start the child process");

  const noTsconfigRoot = createProject({ tsconfig: false });
  const noTsconfigInspection = inspectProject(noTsconfigRoot);
  const noTsconfigPlan = createAddPlan("synthwave", noTsconfigRoot);
  check(noTsconfigInspection.tsconfig.status === "missing", "doctor explicitly reports a missing tsconfig");
  check(!noTsconfigInspection.readyForAdd, "missing tsconfig blocks automatic shadcn installation");
  check(noTsconfigInspection.blockers.some((item) => item.includes("tsconfig.json")), "the tsconfig blocker explains the actual add prerequisite");
  check(noTsconfigPlan.fileFingerprints.some((item) => item.path.endsWith("tsconfig.json") && item.exists === false), "missing tsconfig state is included in plan fingerprints");
  const noTsconfigCalls: Array<Record<string, unknown>> = [];
  const noTsconfigResult = await applyAddPlan(noTsconfigPlan, {
    apply: true,
    spawnImpl: createSpawnStub(noTsconfigRoot, "mutate", noTsconfigCalls),
  });
  check(noTsconfigResult.status === "blocked" && noTsconfigCalls.length === 0, "missing tsconfig prevents shadcn from spawning");

  const jsoncTsconfigRoot = createProject({ tsconfig: false });
  writeFileSync(
    join(jsoncTsconfigRoot, "tsconfig.json"),
    '// JSONC comments and trailing commas are supported by TypeScript.\n{"compilerOptions":{"strict":true,},}\n',
  );
  const jsoncInspection = inspectProject(jsoncTsconfigRoot);
  check(jsoncInspection.tsconfig.status === "present", "readable JSONC tsconfig is recognized without strict JSON parsing");
  check(jsoncInspection.readyForAdd, "doctor delegates JSONC syntax validation to the shadcn CLI");
  check(jsoncInspection.tsconfig.message.includes("delegated to shadcn"), "doctor does not claim JSONC validity");

  const unsupportedManagerRoot = createProject({ packageManager: "yarn@4.2.0", lockfile: "none" });
  const unsupportedPlan = createAddPlan("synthwave", unsupportedManagerRoot);
  check(!unsupportedPlan.readyForApply && unsupportedPlan.command.executable === null, "unsupported manager does not fall back to npm or pnpm");

  const freeTextManagerRoot = createProject({
    packageManager: "pnpm@9.0.0; touch should-not-run",
    lockfile: "pnpm",
  });
  const freeTextManagerPlan = createAddPlan("synthwave", freeTextManagerRoot);
  check(!freeTextManagerPlan.readyForApply, "malformed packageManager text disables execution");
  check(freeTextManagerPlan.command.executable === null, "packageManager free text is never used as an executable");

  const conflictingDeclaredRoot = createProject({ packageManager: "pnpm@10.1.0", lockfile: "npm" });
  const conflictingDeclared = inspectProject(conflictingDeclaredRoot);
  check(conflictingDeclared.packageManager.name === "pnpm", "a valid packageManager field remains the selected manager");
  check(conflictingDeclared.warnings.some((item) => item.includes("package-lock.json")), "a conflicting lockfile is disclosed as a warning");

  const tailwindV3Root = createProject({ tailwind: "^3.4.17" });
  const tailwindV3Inspection = inspectProject(tailwindV3Root);
  const tailwindV3Plan = createAddPlan("synthwave", tailwindV3Root);
  check(tailwindV3Inspection.tailwind.registryCompatibility === "unsupported", "Tailwind v3 is identified as incompatible with full-HSL registry colors");
  check(!tailwindV3Inspection.readyForAdd && !tailwindV3Plan.readyForApply, "known Tailwind v3 projects are blocked from registry installation");
  check(tailwindV3Inspection.blockers.some((item) => item.includes("Style Pack")), "Tailwind v3 blocker gives the documented legacy artifact path");
  const tailwindV3Calls: Array<Record<string, unknown>> = [];
  const tailwindV3Result = await applyAddPlan(tailwindV3Plan, {
    apply: true,
    spawnImpl: createSpawnStub(tailwindV3Root, "mutate", tailwindV3Calls),
  });
  check(tailwindV3Result.status === "blocked" && tailwindV3Calls.length === 0, "Tailwind v3 never starts the installer");

  const unknownTailwindRoot = createProject({ tailwind: "latest" });
  const unknownTailwindInspection = inspectProject(unknownTailwindRoot);
  const unknownTailwindPlan = createAddPlan("synthwave", unknownTailwindRoot);
  check(unknownTailwindInspection.tailwind.registryCompatibility === "unknown", "unparseable Tailwind version is not presumed to be v4");
  check(!unknownTailwindInspection.readyForAdd && !unknownTailwindPlan.readyForApply, "unknown Tailwind version cannot produce a ready install plan");
  const unknownTailwindCalls: Array<Record<string, unknown>> = [];
  const unknownTailwindResult = await applyAddPlan(unknownTailwindPlan, {
    apply: true,
    spawnImpl: createSpawnStub(unknownTailwindRoot, "mutate", unknownTailwindCalls),
  });
  check(unknownTailwindResult.status === "blocked" && unknownTailwindCalls.length === 0, "unknown Tailwind version never starts the installer");

  const conflictingTailwindRoot = createProject({ tailwind: "^3.4.17" });
  mkdirSync(join(conflictingTailwindRoot, "node_modules", "tailwindcss"), { recursive: true });
  writeFileSync(join(conflictingTailwindRoot, "node_modules", "tailwindcss", "package.json"), '{"version":"4.1.0"}\n');
  const conflictingTailwindInspection = inspectProject(conflictingTailwindRoot);
  check(conflictingTailwindInspection.tailwind.registryCompatibility === "unknown", "declared and installed Tailwind major conflicts stay blocked as unknown");

  const conflictingManagerRoot = createProject({ packageManager: undefined, lockfile: "both" });
  const conflictingPlan = createAddPlan("synthwave", conflictingManagerRoot);
  check(!conflictingPlan.readyForApply, "conflicting package-manager lockfiles block install planning");

  const unsafeSlugPlan = createAddPlan("synthwave;touch-injected", validRoot);
  check(!unsafeSlugPlan.readyForApply && unsafeSlugPlan.registryUrl === null, "slug input cannot become a command argument");
  check(unsafeSlugPlan.command.display === null, "an invalid slug has no executable command preview");

  const traversalRoot = createProject({ cssPath: "../outside.css" });
  const traversalPlan = createAddPlan("synthwave", traversalRoot);
  check(!traversalPlan.readyForApply, "CSS path traversal blocks application");
  check(traversalPlan.blockers.some((item) => item.includes("outside")), "path traversal blocker explains the root boundary");

  const symlinkRoot = createProject();
  const externalCss = join(symlinkRoot, "..", "external-stylekit-theme.css");
  temporaryRoots.push(externalCss);
  writeFileSync(externalCss, '@import "tailwindcss";\n');
  rmSync(join(symlinkRoot, "src", "theme.css"));
  symlinkSync(externalCss, join(symlinkRoot, "src", "theme.css"));
  const symlinkPlan = createAddPlan("synthwave", symlinkRoot);
  check(!symlinkPlan.readyForApply, "a CSS symlink escaping the project blocks application");
  check(symlinkPlan.blockers.some((item) => item.includes("symlink")), "symlink escape is named in preflight");

  const shellMarker = `shell-injected-${process.pid}`;
  const applyRoot = createProject({ name: `stylekit cli;touch ${shellMarker}-` });
  const applyPlan = createAddPlan("synthwave", applyRoot);
  const applyCalls: Array<Record<string, unknown>> = [];
  const applyResult = await applyAddPlan(applyPlan, {
    apply: true,
    spawnImpl: createSpawnStub(applyRoot, "mutate", applyCalls),
  });
  check(applyCalls.length === 1, "explicit apply starts one real stub child process");
  check(applyCalls[0]?.command === "pnpm", "executor uses the fixed package-manager executable");
  check((applyCalls[0]?.options as { shell?: boolean })?.shell === false, "executor forces shell:false");
  check(applyResult.status === "completed" && applyResult.process.exitCode === 0, "successful child process exit is reported separately");
  check(applyResult.verification.css.changesObserved, "post-install CSS variable changes are checked from the fixture");
  check(applyResult.verification.css.variablesAdded.includes("--card"), "new CSS custom properties are identified");
  check(applyResult.verification.css.variablesUpdated.includes("--primary"), "updated CSS custom properties are identified");
  check(applyResult.verification.package.manifestChanged === true, "manifest changes are checked after installation");
  check(applyResult.verification.package.dependencyChanges.some((item) => item.includes("fixture-theme-check")), "manifest dependency changes are reported");
  check(applyResult.verification.package.packageFilesChanged.some((file) => file.endsWith("pnpm-lock.yaml")), "package-manager lockfile changes are reported");
  check(applyResult.verification.themeIdentity === "unverified", "file changes do not prove the selected style identity");
  check(applyResult.verification.visualResult === "unverified", "file changes do not prove the rendered visual result");
  check(applyResult.verification.note.includes("style identity and rendered visual result remain unverified"), "installer outcome and visual acceptance remain separate");
  check(applyResult.verification.files.every((file) => !Object.hasOwn(file, "content")), "JSON file summaries never expose project file contents");
  check(applyResult.verification.files.every((file) => file.beforeHash || file.afterHash || file.changed !== null), "file summaries contain path/hash/change evidence only");
  check(!applyResult.verification.sourceFilesScanned, "post-install verification states that unrelated source files were not scanned");
  check(plan.warnings.some((item) => item.includes("does not fetch remote registry JSON")), "plan discloses that remote item metadata was not fetched");
  check(!existsSync(join(applyRoot, shellMarker)), "shell metacharacters in a cwd remain literal arguments and create no injected file");

  const noopRoot = createProject();
  const noopPlan = createAddPlan("synthwave", noopRoot);
  const noopResult = await applyAddPlan(noopPlan, {
    apply: true,
    spawnImpl: createSpawnStub(noopRoot, "noop", []),
  });
  check(noopResult.status === "completed" && noopResult.process.exitCode === 0, "idempotent no-op can still be a successful installer outcome");
  check(noopResult.verification.css.fileChanged === false, "no-op result reports an unchanged CSS file");
  check(!noopResult.verification.css.changesObserved, "same-name existing variables are not treated as style verification");
  check(noopResult.verification.themeIdentity === "unverified", "no-op does not claim selected style identity");

  const tamperedPlan = {
    ...applyPlan,
    command: { ...applyPlan.command, args: ["pnpm", "install; touch injected"] },
  };
  const tamperedCalls: Array<Record<string, unknown>> = [];
  const tamperedResult = await applyAddPlan(tamperedPlan, {
    apply: true,
    spawnImpl: createSpawnStub(applyRoot, "mutate", tamperedCalls),
  });
  check(tamperedResult.status === "blocked" && tamperedCalls.length === 0, "modified command text is never executed");

  const notAuthorizedCalls: Array<Record<string, unknown>> = [];
  const notAuthorized = await applyAddPlan(applyPlan, {
    apply: false,
    spawnImpl: createSpawnStub(applyRoot, "mutate", notAuthorizedCalls),
  } as unknown as ApplyOptions);
  check(notAuthorized.status === "not-authorized" && notAuthorizedCalls.length === 0, "executor requires explicit apply authorization");

  const failureRoot = createProject();
  const failurePlan = createAddPlan("synthwave", failureRoot);
  const failureCalls: Array<Record<string, unknown>> = [];
  const failure = await applyAddPlan(failurePlan, {
    apply: true,
    spawnImpl: createSpawnStub(failureRoot, "fail-after-mutation", failureCalls),
  });
  check(failure.status === "failed" && failure.process.exitCode === 7, "installer failure preserves the real exit code");
  check(failure.verification.partialChanges.some((file) => file.endsWith("theme.css")), "installer failure reports a partial CSS change");
  check(failure.verification.note.includes("No rollback was attempted"), "partial changes are reported without destructive rollback");

  const staleRoot = createProject();
  const stalePlan = createAddPlan("synthwave", staleRoot);
  writeFileSync(join(staleRoot, "components.json"), JSON.stringify({
    tailwind: { css: "src/other.css", cssVariables: true },
  }));
  const staleCalls: Array<Record<string, unknown>> = [];
  const staleResult = await applyAddPlan(stalePlan, {
    apply: true,
    spawnImpl: createSpawnStub(staleRoot, "mutate", staleCalls),
  });
  check(staleResult.status === "blocked" && staleCalls.length === 0, "stale plans are refused before spawning");

  check(
    stalePlan.fileFingerprints.some((item) => item.path.endsWith("theme.css") && item.sha256),
    "plan fingerprints include the CSS target without including its contents",
  );
  check(
    stalePlan.fileFingerprints.some((item) => item.path.endsWith("package.json") && item.sha256),
    "plan fingerprints include the package manifest hash",
  );
  check(
    stalePlan.fileFingerprints.some((item) => item.path.endsWith("components.json") && item.sha256),
    "plan fingerprints include the shadcn config hash",
  );
  check(
    stalePlan.fileFingerprints.every((item) => !Object.hasOwn(item, "content")),
    "plan fingerprints never serialize project file contents",
  );

  for (const changedTarget of ["css", "package", "components", "lock", "tsconfig"] as const) {
    const projectRoot = createProject();
    const contentPlan = createAddPlan("synthwave", projectRoot);
    const filePath = join(
      projectRoot,
      changedTarget === "css"
        ? "src/theme.css"
        : changedTarget === "package"
          ? "package.json"
          : changedTarget === "components"
            ? "components.json"
            : changedTarget === "lock"
              ? "pnpm-lock.yaml"
              : "tsconfig.json",
    );
    const previous = readFileSync(filePath, "utf8");
    const replacement =
      changedTarget === "css"
        ? `${previous}\n/* changed after planning */\n`
        : changedTarget === "lock"
          ? `${previous}\n# changed after planning\n`
          : JSON.stringify({
              ...JSON.parse(previous),
              reviewMarker: `changed-${changedTarget}`,
            }, null, 2) + "\n";
    writeFileSync(filePath, replacement);

    const calls: Array<Record<string, unknown>> = [];
    const contentStaleResult = await applyAddPlan(contentPlan, {
      apply: true,
      spawnImpl: createSpawnStub(projectRoot, "mutate", calls),
    });
    check(
      contentStaleResult.status === "blocked" && calls.length === 0,
      `same-path ${changedTarget} content change blocks apply before spawning`,
    );
  }

  const badCssVariablesRoot = createProject({
    components: {
      tailwind: { css: "src/theme.css", cssVariables: false },
    },
  });
  check(!inspectProject(badCssVariablesRoot).readyForAdd, "explicitly disabled CSS variables block theme installation");

  const missingCssVariablesRoot = createProject({
    components: { tailwind: { css: "src/theme.css" } },
  });
  check(!inspectProject(missingCssVariablesRoot).readyForAdd, "missing required cssVariables setting blocks theme installation");

  check(existsSync(join(validRoot, ".env")), "fixture environment sentinel remains in place");
  console.log(`PASS: ${assertions} project/installer assertions`);
} finally {
  for (const target of temporaryRoots.reverse()) {
    try {
      rmSync(target, { recursive: true, force: true });
    } catch {
      // Continue cleaning independent temporary fixtures.
    }
  }
}
