import { existsSync } from "node:fs";
import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";
import { afterEach, describe, expect, it } from "vitest";
import {
  evaluateCandidateDirectory,
  buildCoverageSummary,
  overallEvaluationStatus,
  statusExitCode,
  TOOL_WORKFLOW_SCENARIOS,
  type EvaluationCheck,
} from "@/tools/lib/tool-workflow-evaluation";

const temporaryDirectories: string[] = [];

async function makeTemporaryDirectory(): Promise<string> {
  const directory = await mkdtemp(path.join(os.tmpdir(), "stylekit-workflow-evaluation-"));
  temporaryDirectories.push(directory);
  return directory;
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

describe("tool workflow evaluation policy", () => {
  it("defines the three task journeys with states and accessibility/mobile criteria", () => {
    expect(TOOL_WORKFLOW_SCENARIOS.map((scenario) => scenario.id)).toEqual([
      "admin-dashboard",
      "marketing-landing-page",
      "existing-page-redesign",
    ]);
    for (const scenario of TOOL_WORKFLOW_SCENARIOS) {
      expect(scenario.userFlow.length).toBeGreaterThanOrEqual(4);
      expect(scenario.expectedStates.length).toBeGreaterThanOrEqual(4);
      expect(scenario.criteria).toEqual(expect.arrayContaining([
        "user-flow",
        "expected-states",
        "mobile",
        "aria-keyboard",
        "reduced-motion",
        "failure-recovery",
        "visual-review",
      ]));
    }
  });

  it("never upgrades missing evidence to a pass and maps failure/inconclusive to distinct exit codes", () => {
    const check = (status: EvaluationCheck["status"]): EvaluationCheck => ({
      id: "criterion",
      status,
      message: status,
      source: "runner",
      evidence: [],
    });

    expect(overallEvaluationStatus([])).toBe("inconclusive");
    expect(overallEvaluationStatus([check("pass")])).toBe("pass");
    expect(overallEvaluationStatus([check("pass"), check("inconclusive")])).toBe("inconclusive");
    expect(overallEvaluationStatus([check("inconclusive"), check("fail")])).toBe("fail");
    expect(statusExitCode("pass")).toBe(0);
    expect(statusExitCode("fail")).toBe(1);
    expect(statusExitCode("inconclusive")).toBe(2);
  });

  it("reports a missing candidate manifest as inconclusive rather than successful", async () => {
    const directory = await makeTemporaryDirectory();
    const result = await evaluateCandidateDirectory(directory, process.cwd());

    expect(result.status).toBe("inconclusive");
    expect(result.checks[0]?.id).toBe("candidate-manifest");
  });

  it("rejects a symlinked candidate manifest before reading its target", async () => {
    const directory = await makeTemporaryDirectory();
    await writeFile(path.join(directory, ".env"), JSON.stringify({
      schemaVersion: "stylekit-tool-workflow-candidate-v1",
      run: { id: "fixture-env-manifest", createdAt: "2026-10-20T00:00:00.000Z", source: "provided" },
      scenarios: {},
    }));
    await symlink(".env", path.join(directory, "stylekit-tool-workflow.json"), "file");

    const result = await evaluateCandidateDirectory(directory, process.cwd());

    expect(result.status).toBe("fail");
    expect(result.checks[0]?.message).toContain("must be a regular file, not a symbolic link");
  });

  it("rejects an artifact symlink whose resolved target is a .env file", async () => {
    const directory = await makeTemporaryDirectory();
    await mkdir(path.join(directory, "admin"));
    await writeFile(path.join(directory, ".env"), "export default function Page() { return <main>private</main>; }\n");
    await symlink("../.env", path.join(directory, "admin", "page.tsx"), "file");
    await writeFile(path.join(directory, "stylekit-tool-workflow.json"), JSON.stringify({
      schemaVersion: "stylekit-tool-workflow-candidate-v1",
      run: { id: "fixture-env-artifact", createdAt: "2026-10-20T00:00:00.000Z", source: "provided" },
      scenarios: {
        "admin-dashboard": { artifacts: [{ path: "admin/page.tsx", kind: "source" }] },
      },
    }));

    const result = await evaluateCandidateDirectory(directory, process.cwd());
    const artifact = result.checks.find((check) => check.id === "artifact:admin/page.tsx");

    expect(artifact?.status).toBe("fail");
    expect(artifact?.message).toContain("cannot resolve to .env files");
    expect(result.status).toBe("fail");
  });

  it("rejects TypeScript imports of unlisted or out-of-root candidate source", async () => {
    const unlistedDirectory = await makeTemporaryDirectory();
    await mkdir(path.join(unlistedDirectory, "admin"));
    await writeFile(path.join(unlistedDirectory, "admin", "page.tsx"), 'import { label } from "./unlisted"; export default function Page() { return <main>{label}</main>; }\n');
    await writeFile(path.join(unlistedDirectory, "admin", "unlisted.ts"), 'export const label = "Unhashed";\n');
    await writeFile(path.join(unlistedDirectory, "admin", "package.json"), JSON.stringify({
      name: "consumer-fixture",
      private: true,
      dependencies: { react: "19" },
    }));
    await writeFile(path.join(unlistedDirectory, "stylekit-tool-workflow.json"), JSON.stringify({
      schemaVersion: "stylekit-tool-workflow-candidate-v1",
      run: { id: "fixture-unlisted-import", createdAt: "2026-10-20T00:00:00.000Z", source: "provided" },
      scenarios: {
        "admin-dashboard": {
          artifacts: [
            { path: "admin/page.tsx", kind: "source" },
            { path: "admin/package.json", kind: "other" },
          ],
        },
      },
    }));

    const unlistedResult = await evaluateCandidateDirectory(unlistedDirectory, process.cwd());
    const unlistedScenario = unlistedResult.scenarios.find((scenario) => scenario.id === "admin-dashboard");
    const unlistedTypecheck = unlistedScenario?.checks.find((check) => check.id.endsWith(":consumer-typescript"));

    expect(unlistedScenario?.sourceValidation).toBe("fail");
    expect(unlistedTypecheck?.message).toContain("unlisted candidate artifact");

    const outsideDirectory = await makeTemporaryDirectory();
    await mkdir(path.join(outsideDirectory, "admin"));
    const outsideModule = path.join(process.cwd(), "tools", "lib", "tool-workflow-evaluation");
    const relativeOutsideModule = path.relative(path.join(outsideDirectory, "admin"), outsideModule).replaceAll(path.sep, "/");
    const outsideSpecifier = relativeOutsideModule.startsWith(".") ? relativeOutsideModule : `./${relativeOutsideModule}`;
    await writeFile(path.join(outsideDirectory, "admin", "page.tsx"), `import type { ToolWorkflowScenarioId } from ${JSON.stringify(outsideSpecifier)}; export type Scenario = ToolWorkflowScenarioId; export default function Page() { return <main>Outside</main>; }\n`);
    await writeFile(path.join(outsideDirectory, "admin", "package.json"), JSON.stringify({
      name: "consumer-fixture",
      private: true,
      dependencies: { react: "19" },
    }));
    await writeFile(path.join(outsideDirectory, "stylekit-tool-workflow.json"), JSON.stringify({
      schemaVersion: "stylekit-tool-workflow-candidate-v1",
      run: { id: "fixture-outside-import", createdAt: "2026-10-20T00:00:00.000Z", source: "provided" },
      scenarios: {
        "admin-dashboard": {
          artifacts: [
            { path: "admin/page.tsx", kind: "source" },
            { path: "admin/package.json", kind: "other" },
          ],
        },
      },
    }));

    const outsideResult = await evaluateCandidateDirectory(outsideDirectory, process.cwd());
    const outsideScenario = outsideResult.scenarios.find((scenario) => scenario.id === "admin-dashboard");
    const outsideTypecheck = outsideScenario?.checks.find((check) => check.id.endsWith(":consumer-typescript"));

    expect(outsideScenario?.sourceValidation).toBe("fail");
    expect(outsideTypecheck?.message).toContain("resolves outside the candidate and local dependency directories");
  });

  it("does not load unlisted candidate files through TypeScript path references", async () => {
    const directory = await makeTemporaryDirectory();
    await mkdir(path.join(directory, "admin"));
    await writeFile(path.join(directory, "admin", "page.tsx"), '/// <reference path="./unlisted.d.ts" />\nexport default function Page() { return <main>Dashboard</main>; }\n');
    await writeFile(path.join(directory, "admin", "unlisted.d.ts"), "declare const unlistedValue: string;\n");
    await writeFile(path.join(directory, "admin", "package.json"), JSON.stringify({
      name: "consumer-fixture",
      private: true,
      dependencies: { react: "19" },
    }));
    await writeFile(path.join(directory, "stylekit-tool-workflow.json"), JSON.stringify({
      schemaVersion: "stylekit-tool-workflow-candidate-v1",
      run: { id: "fixture-unlisted-reference", createdAt: "2026-10-20T00:00:00.000Z", source: "provided" },
      scenarios: {
        "admin-dashboard": {
          artifacts: [
            { path: "admin/page.tsx", kind: "source" },
            { path: "admin/package.json", kind: "other" },
          ],
        },
      },
    }));

    const result = await evaluateCandidateDirectory(directory, process.cwd());
    const scenario = result.scenarios.find((entry) => entry.id === "admin-dashboard");
    const typecheck = scenario?.checks.find((check) => check.id.endsWith(":consumer-typescript"));

    expect(scenario?.sourceValidation).toBe("fail");
    expect(typecheck?.message).toContain("unlisted.d.ts");
  });

  it("requires declared type reference packages and resolves them when declared", async () => {
    const createTypeReferenceCandidate = async (directory: string, includeNodeTypes: boolean) => {
      await mkdir(path.join(directory, "admin"));
      await writeFile(path.join(directory, "admin", "page.tsx"), '/// <reference types="node" />\nexport default function Page() { return <main>{process.cwd()}</main>; }\n');
      await writeFile(path.join(directory, "admin", "package.json"), JSON.stringify({
        name: "consumer-fixture",
        private: true,
        dependencies: {
          react: "19",
          ...(includeNodeTypes ? { "@types/node": "20" } : {}),
        },
      }));
      await writeFile(path.join(directory, "stylekit-tool-workflow.json"), JSON.stringify({
        schemaVersion: "stylekit-tool-workflow-candidate-v1",
        run: { id: `fixture-node-types-${includeNodeTypes}`, createdAt: "2026-10-20T00:00:00.000Z", source: "provided" },
        scenarios: {
          "admin-dashboard": {
            artifacts: [
              { path: "admin/page.tsx", kind: "source" },
              { path: "admin/package.json", kind: "other" },
            ],
          },
        },
      }));
    };

    const undeclaredDirectory = await makeTemporaryDirectory();
    await createTypeReferenceCandidate(undeclaredDirectory, false);
    const undeclaredResult = await evaluateCandidateDirectory(undeclaredDirectory, process.cwd());
    const undeclaredScenario = undeclaredResult.scenarios.find((scenario) => scenario.id === "admin-dashboard");
    const undeclaredTypecheck = undeclaredScenario?.checks.find((check) => check.id.endsWith(":consumer-typescript"));

    expect(undeclaredScenario?.sourceValidation).toBe("fail");
    expect(undeclaredTypecheck?.message).toContain("@types/node");

    const declaredDirectory = await makeTemporaryDirectory();
    await createTypeReferenceCandidate(declaredDirectory, true);
    const declaredResult = await evaluateCandidateDirectory(declaredDirectory, process.cwd());
    const declaredScenario = declaredResult.scenarios.find((scenario) => scenario.id === "admin-dashboard");

    expect(declaredScenario?.sourceValidation).toBe("pass");
  });

  it("does not follow package metadata symlinks into .env during TypeScript resolution", async () => {
    const directory = await makeTemporaryDirectory();
    await mkdir(path.join(directory, "admin", "components"), { recursive: true });
    await writeFile(path.join(directory, ".env"), JSON.stringify({ types: "./admin/components/types.d.ts" }));
    await symlink("../../.env", path.join(directory, "admin", "components", "package.json"), "file");
    await writeFile(path.join(directory, "admin", "components", "types.d.ts"), "export interface ComponentProps { label: string; }\n");
    await writeFile(path.join(directory, "admin", "page.tsx"), 'import type { ComponentProps } from "./components"; const props: ComponentProps = { label: "Dashboard" }; export default function Page() { return <main>{props.label}</main>; }\n');
    await writeFile(path.join(directory, "admin", "package.json"), JSON.stringify({
      name: "consumer-fixture",
      private: true,
      dependencies: { react: "19" },
    }));
    await writeFile(path.join(directory, "stylekit-tool-workflow.json"), JSON.stringify({
      schemaVersion: "stylekit-tool-workflow-candidate-v1",
      run: { id: "fixture-env-resolution", createdAt: "2026-10-20T00:00:00.000Z", source: "provided" },
      scenarios: {
        "admin-dashboard": {
          artifacts: [
            { path: "admin/page.tsx", kind: "source" },
            { path: "admin/components/types.d.ts", kind: "source" },
            { path: "admin/package.json", kind: "other" },
          ],
        },
      },
    }));

    const result = await evaluateCandidateDirectory(directory, process.cwd());
    const scenario = result.scenarios.find((entry) => entry.id === "admin-dashboard");
    const typecheck = scenario?.checks.find((check) => check.id.endsWith(":consumer-typescript"));

    expect(scenario?.sourceValidation).toBe("fail");
    expect(typecheck?.message).toContain('does not resolve inside the candidate project');
  });

  it("rejects artifact path traversal and never reads outside the candidate directory", async () => {
    const directory = await makeTemporaryDirectory();
    await mkdir(path.join(directory, "pages"));
    await writeFile(path.join(directory, "pages", "page.tsx"), "export default function Page() { return <main>safe</main>; }\n");
    await writeFile(path.join(directory, "stylekit-tool-workflow.json"), JSON.stringify({
      schemaVersion: "stylekit-tool-workflow-candidate-v1",
      run: { id: "fixture", createdAt: "2026-10-20T00:00:00.000Z", source: "provided" },
      scenarios: {
        "admin-dashboard": {
          artifacts: [
            { path: "pages/page.tsx", kind: "source" },
            { path: "../../outside.tsx", kind: "source" },
          ],
        },
      },
    }));

    const result = await evaluateCandidateDirectory(directory, process.cwd());
    const traversal = result.checks.find((check) => check.id.includes("../../outside.tsx"));

    expect(traversal?.status).toBe("fail");
    expect(result.status).toBe("fail");
  });

  it("requires a recorded adapter for a model-adapter candidate run", async () => {
    const directory = await makeTemporaryDirectory();
    await writeFile(path.join(directory, "stylekit-tool-workflow.json"), JSON.stringify({
      schemaVersion: "stylekit-tool-workflow-candidate-v1",
      run: { id: "fixture-model", createdAt: "2026-10-20T00:00:00.000Z", source: "model-adapter" },
      scenarios: {},
    }));

    const result = await evaluateCandidateDirectory(directory, process.cwd());

    expect(result.status).toBe("fail");
    expect(result.checks[0]?.id).toBe("candidate-manifest");
    expect(result.checks[0]?.message).toContain("model-adapter runs require recorded");
  });

  it("records the current agent session without labeling it a provider-authenticated run", async () => {
    const directory = await makeTemporaryDirectory();
    await writeFile(path.join(directory, "stylekit-tool-workflow.json"), JSON.stringify({
      schemaVersion: "stylekit-tool-workflow-candidate-v1",
      run: {
        id: "fixture-agent-session",
        createdAt: "2026-10-20T00:00:00.000Z",
        source: "agent-session",
        agentSession: {
          agent: "Codex",
          model: "runtime-reported model",
          promptSha256: "a".repeat(64),
        },
      },
      scenarios: {},
    }));

    const result = await evaluateCandidateDirectory(directory, process.cwd());

    expect(result.modelRun).toMatchObject({
      status: "agent-session",
      verification: "self-reported",
      adapter: "Codex",
      model: "runtime-reported model",
    });
    expect(result.checks.find((check) => check.id === "model-run-record")?.status).toBe("pass");
    expect(result.limitations).toContain("An agent-session candidate is an in-session model outcome, not an independent or blinded Skill A/B benchmark.");
    expect(result.status).toBe("inconclusive");
  });

  it("fails consumer source that imports an undeclared UI package", async () => {
    const directory = await makeTemporaryDirectory();
    await mkdir(path.join(directory, "admin"));
    await writeFile(path.join(directory, "admin", "page.tsx"), 'import { Button } from "unlisted-ui-kit"; export default function Page() { return <Button />; }\n');
    await writeFile(path.join(directory, "admin", "package.json"), JSON.stringify({
      name: "consumer-fixture",
      private: true,
      dependencies: { react: "19" },
    }));
    await writeFile(path.join(directory, "stylekit-tool-workflow.json"), JSON.stringify({
      schemaVersion: "stylekit-tool-workflow-candidate-v1",
      run: { id: "fixture-dependency", createdAt: "2026-10-20T00:00:00.000Z", source: "provided" },
      scenarios: {
        "admin-dashboard": {
          artifacts: [
            { path: "admin/page.tsx", kind: "source" },
            { path: "admin/package.json", kind: "other" },
          ],
        },
      },
    }));

    const result = await evaluateCandidateDirectory(directory, process.cwd());
    const admin = result.scenarios.find((scenario) => scenario.id === "admin-dashboard");

    expect(admin?.sourceValidation).toBe("fail");
    expect(admin?.checks.find((check) => check.id.endsWith(":consumer-typescript"))?.message).toContain("does not declare direct import");
  });

  it("skips executable Tailwind plugin/config directives without running their side effects", async () => {
    const directives = [
      { name: "plugin", css: '@plugin "./side-effect.cjs";' },
      { name: "config", css: '@config "./side-effect.cjs";' },
    ] as const;

    for (const directive of directives) {
      const directory = await makeTemporaryDirectory();
      await mkdir(path.join(directory, "admin"));
      const sentinel = path.join(directory, "admin", "executed.txt");
      const sideEffect = `require("node:fs").writeFileSync(${JSON.stringify(sentinel)}, "executed"); module.exports = {};\n`;
      await writeFile(path.join(directory, "admin", "page.tsx"), 'export default function Page() { return <main className="text-slate-900">Dashboard</main>; }\n');
      await writeFile(path.join(directory, "admin", "globals.css"), `@import "tailwindcss"; ${directive.css}\n`);
      await writeFile(path.join(directory, "admin", "side-effect.cjs"), sideEffect);
      await writeFile(path.join(directory, "admin", "package.json"), JSON.stringify({
        name: "consumer-fixture",
        private: true,
        dependencies: { react: "19", tailwindcss: "4" },
      }));
      await writeFile(path.join(directory, "stylekit-tool-workflow.json"), JSON.stringify({
        schemaVersion: "stylekit-tool-workflow-candidate-v1",
        run: { id: `fixture-css-${directive.name}`, createdAt: "2026-10-20T00:00:00.000Z", source: "provided" },
        scenarios: {
          "admin-dashboard": {
            artifacts: [
              { path: "admin/page.tsx", kind: "source" },
              { path: "admin/globals.css", kind: "css" },
              { path: "admin/side-effect.cjs", kind: "other" },
              { path: "admin/package.json", kind: "other" },
            ],
          },
        },
      }));

      const result = await evaluateCandidateDirectory(directory, process.cwd());
      const admin = result.scenarios.find((scenario) => scenario.id === "admin-dashboard");
      const cssCheck = admin?.checks.find((check) => check.id === "admin-dashboard:tailwind-css");

      expect(admin?.cssCompilation).toBe("inconclusive");
      expect(cssCheck?.message).toContain(`@${directive.name} can load executable candidate code`);
      expect(existsSync(sentinel)).toBe(false);
    }
  });

  it("marks external imports and root-escaping source paths inconclusive without compiling them", async () => {
    const unsupportedCss = [
      { css: '@import "https://example.test/theme.css"; @import "tailwindcss";', reason: '@import "https://example.test/theme.css"' },
      { css: '@import "tailwindcss"; @source "../shared";', reason: "@source path \"../shared\"" },
    ];

    for (const [index, fixture] of unsupportedCss.entries()) {
      const directory = await makeTemporaryDirectory();
      await mkdir(path.join(directory, "admin"));
      await writeFile(path.join(directory, "admin", "page.tsx"), 'export default function Page() { return <main className="text-slate-900">Dashboard</main>; }\n');
      await writeFile(path.join(directory, "admin", "globals.css"), `${fixture.css}\n`);
      await writeFile(path.join(directory, "admin", "package.json"), JSON.stringify({
        name: `consumer-fixture-${index}`,
        private: true,
        dependencies: { react: "19", tailwindcss: "4" },
      }));
      await writeFile(path.join(directory, "stylekit-tool-workflow.json"), JSON.stringify({
        schemaVersion: "stylekit-tool-workflow-candidate-v1",
        run: { id: `fixture-css-unsupported-${index}`, createdAt: "2026-10-20T00:00:00.000Z", source: "provided" },
        scenarios: {
          "admin-dashboard": {
            artifacts: [
              { path: "admin/page.tsx", kind: "source" },
              { path: "admin/globals.css", kind: "css" },
              { path: "admin/package.json", kind: "other" },
            ],
          },
        },
      }));

      const result = await evaluateCandidateDirectory(directory, process.cwd());
      const admin = result.scenarios.find((scenario) => scenario.id === "admin-dashboard");
      const cssCheck = admin?.checks.find((check) => check.id === "admin-dashboard:tailwind-css");
      expect(admin?.cssCompilation).toBe("inconclusive");
      expect(cssCheck?.message).toContain(fixture.reason);
    }
  });

  it("strictly typechecks listed consumer source and compiles Tailwind CSS without claiming browser acceptance", async () => {
    const directory = await makeTemporaryDirectory();
    await mkdir(path.join(directory, "admin"));
    await writeFile(path.join(directory, "admin", "page.tsx"), 'import type { ComponentProps } from "react"; type MainProps = ComponentProps<"main">; export default function Page() { const props: MainProps = {}; return <main {...props} className="text-slate-900 md:grid">Dashboard</main>; }\n');
    await writeFile(path.join(directory, "admin", "globals.css"), '@import "tailwindcss";\n');
    await writeFile(path.join(directory, "admin", "package.json"), JSON.stringify({
      name: "consumer-fixture",
      private: true,
      dependencies: { react: "19", tailwindcss: "4" },
    }));
    await writeFile(path.join(directory, "stylekit-tool-workflow.json"), JSON.stringify({
      schemaVersion: "stylekit-tool-workflow-candidate-v1",
      run: { id: "fixture-source", createdAt: "2026-10-20T00:00:00.000Z", source: "provided" },
      scenarios: {
        "admin-dashboard": {
          artifacts: [
            { path: "admin/page.tsx", kind: "source" },
            { path: "admin/globals.css", kind: "css" },
            { path: "admin/package.json", kind: "other" },
          ],
        },
      },
    }));

    const result = await evaluateCandidateDirectory(directory, process.cwd());
    const admin = result.scenarios.find((scenario) => scenario.id === "admin-dashboard");

    expect(admin?.sourceValidation, admin?.checks.find((check) => check.id.endsWith(":consumer-typescript"))?.message).toBe("pass");
    expect(admin?.cssCompilation, admin?.checks.find((check) => check.id.endsWith(":tailwind-css"))?.message).toBe("pass");
    expect(admin?.status).toBe("inconclusive");
    expect(admin?.checks.some((check) => check.id === "admin-dashboard:mobile" && check.status === "inconclusive")).toBe(true);
  });

  it("records browser and human evidence as reported while keeping an incomplete candidate inconclusive", async () => {
    const directory = await makeTemporaryDirectory();
    await mkdir(path.join(directory, "admin"));
    const screenshot = await sharp({ create: { width: 1, height: 1, channels: 4, background: "#fff" } }).png().toBuffer();
    await writeFile(path.join(directory, "admin", "mobile.png"), screenshot);
    const criteria = ["user-flow", "expected-states", "mobile", "aria-keyboard", "reduced-motion", "failure-recovery"];
    const browserReport = {
      schemaVersion: "stylekit-tool-workflow-browser-v1",
      scenarioId: "admin-dashboard",
      runId: "fixture-browser",
      runner: { name: "Playwright", version: "fixture" },
      startedAt: "2026-10-20T00:00:00.000Z",
      baseUrl: "http://127.0.0.1:3187",
      viewports: {
        desktop: { width: 1440, height: 900 },
        mobile: { width: 390, height: 844 },
      },
      reducedMotionEmulated: true,
      pageErrors: [],
      consoleErrors: [],
      horizontalOverflow: { viewportWidth: 390, documentWidth: 390 },
      checks: Object.fromEntries(criteria.map((criterion) => [criterion, {
        status: "pass",
        observation: `Recorded ${criterion} result.`,
        evidence: ["admin/mobile.png"],
      }])),
    };
    await writeFile(path.join(directory, "admin", "browser-report.json"), JSON.stringify(browserReport));
    await writeFile(path.join(directory, "stylekit-tool-workflow.json"), JSON.stringify({
      schemaVersion: "stylekit-tool-workflow-candidate-v1",
      run: { id: "fixture-browser", createdAt: "2026-10-20T00:00:00.000Z", source: "provided" },
      scenarios: {
        "admin-dashboard": {
          artifacts: [
            { path: "admin/mobile.png", kind: "screenshot" },
            { path: "admin/browser-report.json", kind: "browser-report" },
          ],
          browserReport: "admin/browser-report.json",
          visualReview: {
            reviewer: "fixture-reviewer",
            reviewedAt: "2026-10-20T00:10:00.000Z",
            status: "pass",
            evidence: ["admin/mobile.png"],
          },
        },
      },
    }));

    const result = await evaluateCandidateDirectory(directory, process.cwd());
    const coverage = buildCoverageSummary(result).scenarios.find((scenario) => scenario.id === "admin-dashboard");
    const admin = result.scenarios.find((scenario) => scenario.id === "admin-dashboard");

    expect(admin?.checks.filter((check) => check.source === "browser-record" && check.status === "pass")).toHaveLength(6);
    expect(admin?.checks.find((check) => check.id === "admin-dashboard:visual-review")?.status).toBe("pass");
    expect(coverage).toMatchObject({ reported: 7, inconclusive: 0, verified: 0 });
    expect(result.status).toBe("inconclusive");
  });
});
