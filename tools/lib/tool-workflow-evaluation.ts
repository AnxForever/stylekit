import { createHash } from "node:crypto";
import { builtinModules, createRequire } from "node:module";
import {
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import ts from "typescript";
import { z } from "zod";

export const TOOL_WORKFLOW_SCENARIOS = [
  {
    id: "admin-dashboard",
    title: "后台数据面板",
    userTask: "查看经营概况，筛选一条记录并进入详情；遇到空数据或服务错误时找到恢复路径。",
    userFlow: [
      "扫描关键指标和最近更新时间。",
      "使用搜索、筛选或排序定位记录。",
      "打开记录详情或执行明确的主要操作。",
      "在无匹配记录时清除筛选或回到列表。",
      "服务失败时保留上下文并提供重试或说明。",
    ],
    expectedStates: ["loading", "populated", "empty", "error", "success"],
    requirements: [
      "指标有名称、单位、时间范围或比较基准，不能只靠颜色表达变化。",
      "桌面表格或列表要有可识别的列标题、行操作和当前筛选条件。",
      "移动端 390px 宽度下可完成筛选和查看记录，不依赖横向滚动整张桌面表格。",
      "筛选、排序、菜单和行操作可用键盘触达；动态结果通过合适的状态提示播报。",
      "非必要过渡在 prefers-reduced-motion 下关闭或缩短。",
      "加载、无结果、失败和成功状态各有明确文案与可执行的恢复操作。",
    ],
    criteria: ["user-flow", "expected-states", "mobile", "aria-keyboard", "reduced-motion", "failure-recovery", "visual-review"],
  },
  {
    id: "marketing-landing-page",
    title: "产品落地页",
    userTask: "理解产品价值，检查可信依据，再从移动端或桌面端完成主要注册/咨询动作。",
    userFlow: [
      "从首屏理解目标用户、核心价值和主要行动。",
      "沿页面查看功能或可信依据。",
      "使用主要行动进入注册、咨询或演示申请。",
      "收到字段校验、提交中和提交成功反馈。",
      "提交失败时保留已填内容并说明重试方式。",
    ],
    expectedStates: ["idle", "invalid", "submitting", "success", "error"],
    requirements: [
      "首屏包含明确价值表达和一个优先行动，视觉装饰不能遮住信息层级。",
      "行动链路能到达表单、注册或咨询终点，而不是仅展示不可操作按钮。",
      "390px 宽度下导航、标题、表单和行动按钮完整可用且没有页面级溢出。",
      "导航链接、表单标签、字段错误、提交状态和成功反馈有可访问名称或关联关系。",
      "滚动揭示、视差和装饰动画尊重 prefers-reduced-motion。",
      "校验失败和服务错误均可恢复，错误内容不只使用颜色区分。",
    ],
    criteria: ["user-flow", "expected-states", "mobile", "aria-keyboard", "reduced-motion", "failure-recovery", "visual-review"],
  },
  {
    id: "existing-page-redesign",
    title: "现有页面改造",
    userTask: "在保留现有路由、数据和核心操作的前提下改造一页，并确认常用流程没有退化。",
    userFlow: [
      "从现有入口打开改造页面。",
      "使用页面原有的核心查找、编辑或提交流程。",
      "返回、刷新后仍能继续合理的任务上下文。",
      "检查空数据、校验失败和服务错误下的原有恢复路径。",
    ],
    expectedStates: ["existing-content", "loading", "empty", "validation-error", "service-error", "success"],
    requirements: [
      "提交改造前后的原有任务、路由、关键字段和行动均有证据记录。",
      "重设计没有用静态演示数据替代真实数据边界或隐藏未实现操作。",
      "390px 宽度下保留主要流程；控件、表单和列表无需精确点按。",
      "键盘焦点顺序、可见焦点、表单标签和错误关联不低于改造前基线。",
      "新增动效有 prefers-reduced-motion 分支，主要内容不依赖动画才可见。",
      "失败后保留用户输入或编辑上下文，并明确重试、返回或撤销方式。",
    ],
    criteria: ["user-flow", "expected-states", "mobile", "aria-keyboard", "reduced-motion", "failure-recovery", "visual-review"],
  },
] as const;

export type ToolWorkflowScenarioId = (typeof TOOL_WORKFLOW_SCENARIOS)[number]["id"];
export type EvaluationStatus = "pass" | "fail" | "inconclusive";
export type EvaluationScope = "toolchain" | "candidate" | "all";

const scenarioIds = TOOL_WORKFLOW_SCENARIOS.map((scenario) => scenario.id) as [ToolWorkflowScenarioId, ...ToolWorkflowScenarioId[]];
const artifactKinds = ["source", "css", "screenshot", "browser-report", "accessibility-report", "prompt", "model-record", "other"] as const;

const evidenceArtifactSchema = z.object({
  path: z.string().min(1).max(500),
  kind: z.enum(artifactKinds),
  description: z.string().max(500).optional(),
}).strict();

const browserReportSchema = z.object({
  schemaVersion: z.literal("stylekit-tool-workflow-browser-v1"),
  scenarioId: z.enum(scenarioIds),
  runId: z.string().min(1).max(200),
  runner: z.object({ name: z.string().min(1).max(100), version: z.string().min(1).max(100) }).strict(),
  startedAt: z.string().datetime({ offset: true }),
  baseUrl: z.string().url(),
  viewports: z.object({
    desktop: z.object({ width: z.number().int().positive(), height: z.number().int().positive() }).strict(),
    mobile: z.object({ width: z.number().int().positive(), height: z.number().int().positive() }).strict(),
  }).strict(),
  reducedMotionEmulated: z.boolean(),
  pageErrors: z.array(z.string().max(1000)).max(100),
  consoleErrors: z.array(z.string().max(1000)).max(100),
  horizontalOverflow: z.object({ viewportWidth: z.number().int().positive(), documentWidth: z.number().int().positive() }).strict(),
  checks: z.record(z.string(), z.object({
    status: z.enum(["pass", "fail", "inconclusive"]),
    observation: z.string().min(1).max(2000),
    evidence: z.array(z.string().max(500)).min(1).max(20),
  }).strict()),
}).strict();

const candidateScenarioSchema = z.object({
  artifacts: z.array(evidenceArtifactSchema).max(100),
  browserReport: z.string().max(500).optional(),
  visualReview: z.object({
    reviewer: z.string().min(1).max(200),
    reviewedAt: z.string().datetime({ offset: true }),
    status: z.enum(["pass", "fail"]),
    evidence: z.array(z.string().max(500)).min(1).max(20),
    notes: z.string().max(4000).optional(),
  }).strict().optional(),
}).strict();

const workflowCandidateSchema = z.object({
  schemaVersion: z.literal("stylekit-tool-workflow-candidate-v1"),
  run: z.object({
    id: z.string().min(1).max(200),
    createdAt: z.string().datetime({ offset: true }),
    source: z.enum(["provided", "agent-session", "model-adapter"]),
    agentSession: z.object({
      agent: z.string().min(1).max(200),
      model: z.string().max(200).optional(),
      threadId: z.string().max(300).optional(),
      promptSha256: z.string().regex(/^[a-f0-9]{64}$/i),
    }).strict().optional(),
    model: z.object({
      adapter: z.string().min(1).max(200),
      provider: z.string().min(1).max(100),
      model: z.string().min(1).max(200),
      requestId: z.string().max(300).optional(),
      promptSha256: z.string().regex(/^[a-f0-9]{64}$/i),
      responseSha256: z.string().regex(/^[a-f0-9]{64}$/i).optional(),
    }).strict().optional(),
  }).strict().superRefine((run, context) => {
    if (run.source === "model-adapter" && !run.model) {
      context.addIssue({ code: "custom", path: ["model"], message: "model-adapter runs require recorded adapter/provider/model and prompt hash metadata" });
    }
    if (run.source === "model-adapter" && run.agentSession) {
      context.addIssue({ code: "custom", path: ["agentSession"], message: "model-adapter runs must not also claim an agent-session source" });
    }
    if (run.source === "agent-session" && !run.agentSession) {
      context.addIssue({ code: "custom", path: ["agentSession"], message: "agent-session runs require agent identity and prompt hash metadata" });
    }
    if (run.source === "agent-session" && run.model) {
      context.addIssue({ code: "custom", path: ["model"], message: "agent-session runs use agentSession metadata, not model-adapter metadata" });
    }
    if (run.source === "provided" && (run.model || run.agentSession)) {
      context.addIssue({ code: "custom", path: ["source"], message: "provided runs must not claim a model adapter or agent session" });
    }
  }),
  scenarios: z.record(z.string(), candidateScenarioSchema),
}).strict();

export type WorkflowCandidateManifest = z.infer<typeof workflowCandidateSchema>;

export interface EvidenceReference {
  path: string;
  kind: string;
  sha256?: string;
}

export interface EvaluationCheck {
  id: string;
  status: EvaluationStatus;
  message: string;
  evidence: EvidenceReference[];
  source: "runner" | "candidate-artifact" | "browser-record" | "human-review";
}

export interface ToolchainEvaluation {
  status: EvaluationStatus;
  checks: EvaluationCheck[];
  observations: Array<{
    client: "mcp" | "cli";
    operation: string;
    input: Record<string, unknown>;
    outputSha256: string;
    summary: Record<string, unknown>;
  }>;
  sourceAuthority: "bundled-package-snapshot";
  networkAccess: "blocked";
  limitations: string[];
}

export interface CandidateEvaluation {
  status: EvaluationStatus;
  directory: string;
  manifestPath?: string;
  modelRun: {
    status: "recorded" | "agent-session" | "not-provided";
    verification: "self-reported" | "not-applicable";
    adapter?: string;
    provider?: string;
    model?: string;
    requestId?: string;
    threadId?: string;
    promptSha256?: string;
    responseSha256?: string;
  };
  scenarios: Array<{
    id: ToolWorkflowScenarioId;
    status: EvaluationStatus;
    sourceValidation: EvaluationStatus;
    cssCompilation: EvaluationStatus;
    checks: EvaluationCheck[];
  }>;
  checks: EvaluationCheck[];
  limitations: string[];
}

export interface ToolWorkflowEvaluationReport {
  schemaVersion: "stylekit-tool-workflow-evaluation-v1";
  run: { id: string; createdAt: string; scope: EvaluationScope };
  status: EvaluationStatus;
  exitCode: 0 | 1 | 2;
  toolchain: ToolchainEvaluation;
  candidate: CandidateEvaluation | null;
  coverage: {
    scenarios: Array<{
      id: ToolWorkflowScenarioId;
      criteria: string[];
      verified: number;
      reported: number;
      failed: number;
      inconclusive: number;
      consumerChecks: { typeScript: EvaluationStatus; tailwindCss: EvaluationStatus };
    }>;
  };
}

export function overallEvaluationStatus(checks: readonly EvaluationCheck[]): EvaluationStatus {
  if (checks.some((check) => check.status === "fail")) return "fail";
  if (checks.length === 0 || checks.some((check) => check.status === "inconclusive")) return "inconclusive";
  return "pass";
}

export function statusExitCode(status: EvaluationStatus): 0 | 1 | 2 {
  if (status === "pass") return 0;
  return status === "fail" ? 1 : 2;
}

export function createEvaluationCheck(
  id: string,
  status: EvaluationStatus,
  message: string,
  source: EvaluationCheck["source"] = "runner",
  evidence: EvidenceReference[] = [],
): EvaluationCheck {
  return { id, status, message, source, evidence };
}

function sha256(value: Uint8Array): string {
  return createHash("sha256").update(value).digest("hex");
}

async function isSupportedScreenshot(value: Uint8Array): Promise<boolean> {
  try {
    const metadata = await sharp(value, { limitInputPixels: 40_000_000 }).metadata();
    return ["png", "jpeg", "webp"].includes(metadata.format ?? "") && Boolean(metadata.width && metadata.height);
  } catch {
    return false;
  }
}

function safeArtifactRelativePath(value: string): string | null {
  if (value.startsWith("/") || value.startsWith("\\") || /^[a-zA-Z]:/.test(value) || value.includes("\\")) return null;
  const segments = value.split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === "..")) return null;
  if (segments.some((segment) => /^\.env(?:\.|$)/i.test(segment))) return null;
  return segments.join("/");
}

function isPathWithin(root: string, target: string): boolean {
  const relative = path.relative(path.resolve(root), path.resolve(target));
  return relative === "" || (relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative));
}

function containsEnvironmentPath(root: string, target: string): boolean {
  const relative = path.relative(path.resolve(root), path.resolve(target));
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) return false;
  return relative.split(path.sep).some((segment) => /^\.env(?:\.|$)/i.test(segment));
}

async function resolveArtifact(
  candidateRoot: string,
  relativePath: string,
  kind: string,
): Promise<{ reference: EvidenceReference; absolutePath: string } | EvaluationCheck> {
  const safe = safeArtifactRelativePath(relativePath);
  if (!safe) {
    return createEvaluationCheck(
      `artifact:${relativePath}`,
      "fail",
      "Artifact paths must be relative, stay inside the candidate directory, and must not reference .env files.",
      "candidate-artifact",
    );
  }

  const absolutePath = path.resolve(candidateRoot, ...safe.split("/"));
  const rootPrefix = `${candidateRoot}${path.sep}`;
  if (!absolutePath.startsWith(rootPrefix)) {
    return createEvaluationCheck(`artifact:${safe}`, "fail", "Artifact resolves outside the candidate directory.", "candidate-artifact");
  }

  try {
    const actualPath = await realpath(absolutePath);
    if (!isPathWithin(candidateRoot, actualPath)) {
      return createEvaluationCheck(`artifact:${safe}`, "fail", "Artifact symlink resolves outside the candidate directory.", "candidate-artifact");
    }
    if (containsEnvironmentPath(candidateRoot, actualPath)) {
      return createEvaluationCheck(`artifact:${safe}`, "fail", "Artifact symlinks cannot resolve to .env files.", "candidate-artifact");
    }
    const info = await lstat(actualPath);
    if (!info.isFile()) {
      return createEvaluationCheck(`artifact:${safe}`, "fail", "Artifact must be a regular file.", "candidate-artifact");
    }
    if (info.size > 10 * 1024 * 1024) {
      return createEvaluationCheck(`artifact:${safe}`, "fail", "Artifact exceeds the 10 MiB per-file limit.", "candidate-artifact");
    }
    const bytes = await readFile(actualPath);
    if (kind === "screenshot" && !(await isSupportedScreenshot(bytes))) {
      return createEvaluationCheck(`artifact:${safe}`, "fail", "Screenshot artifacts must be valid PNG, JPEG, or WebP images.", "candidate-artifact");
    }
    return {
      reference: { path: safe, kind, sha256: sha256(bytes) },
      absolutePath: actualPath,
    };
  } catch {
    return createEvaluationCheck(`artifact:${safe}`, "inconclusive", "Referenced artifact is missing or unreadable.", "candidate-artifact");
  }
}

function recordObject(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

async function consumerDependencies(
  packageJsonPath: string | undefined,
): Promise<{ status: EvaluationStatus; dependencies: Set<string> | null; message: string }> {
  if (!packageJsonPath) {
    return {
      status: "inconclusive",
      dependencies: null,
      message: "No package.json artifact was listed; direct consumer dependencies cannot be verified.",
    };
  }
  try {
    const parsed: unknown = JSON.parse(await readFile(packageJsonPath, "utf8"));
    const root = recordObject(parsed);
    if (!root) throw new Error("package.json root must be an object.");
    const dependencies = new Set<string>();
    for (const field of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]) {
      if (root[field] === undefined) continue;
      const entries = recordObject(root[field]);
      if (!entries || Object.values(entries).some((version) => typeof version !== "string")) {
        throw new Error(`${field} must map package names to version strings.`);
      }
      for (const name of Object.keys(entries)) dependencies.add(name);
    }
    return {
      status: "pass",
      dependencies,
      message: `Consumer package.json declares ${dependencies.size} direct dependencies.`,
    };
  } catch (error) {
    return {
      status: "fail",
      dependencies: null,
      message: `Consumer package.json is invalid: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

function toRelativeEvidence(artifact: EvidenceReference): EvidenceReference {
  return { ...artifact };
}

async function validateTypeScriptSources(
  sourceFiles: Array<{ path: string; absolutePath: string }>,
  candidateRoot: string,
  repositoryRoot: string,
  declaredDependencies: Set<string> | null,
  candidateArtifactPaths: ReadonlySet<string>,
): Promise<{ status: EvaluationStatus; message: string }> {
  if (sourceFiles.length === 0) return { status: "inconclusive", message: "No source artifacts were listed." };

  const canonicalPath = (fileName: string): string => {
    const absolutePath = path.resolve(fileName);
    try {
      return path.resolve(ts.sys.realpath?.(absolutePath) ?? absolutePath);
    } catch {
      return absolutePath;
    }
  };
  const normalizedCandidateArtifacts = new Set([...candidateArtifactPaths].map(canonicalPath));
  const nodeModulesRoot = canonicalPath(path.join(repositoryRoot, "node_modules"));
  const isAllowedCompilerInput = (fileName: string): boolean => {
    const absolutePath = path.resolve(fileName);
    const resolvedPath = canonicalPath(absolutePath);
    if (
      containsEnvironmentPath(candidateRoot, absolutePath) ||
      containsEnvironmentPath(candidateRoot, resolvedPath) ||
      containsEnvironmentPath(repositoryRoot, absolutePath) ||
      containsEnvironmentPath(repositoryRoot, resolvedPath) ||
      containsEnvironmentPath(nodeModulesRoot, absolutePath) ||
      containsEnvironmentPath(nodeModulesRoot, resolvedPath)
    ) {
      return false;
    }
    if (isPathWithin(candidateRoot, absolutePath) || isPathWithin(candidateRoot, resolvedPath)) {
      return normalizedCandidateArtifacts.has(resolvedPath);
    }
    return isPathWithin(nodeModulesRoot, absolutePath) || isPathWithin(nodeModulesRoot, resolvedPath);
  };

  const sourcePaths = sourceFiles.map((file) => file.absolutePath);
  const imports = new Set<string>();
  const importsByFile = new Map<string, Set<string>>();
  const typeReferenceNames = new Set<string>();
  for (const file of sourceFiles) {
    const source = ts.createSourceFile(file.absolutePath, await readFile(file.absolutePath, "utf8"), ts.ScriptTarget.Latest, true);
    for (const directive of source.typeReferenceDirectives ?? []) typeReferenceNames.add(directive.fileName);
    const fileImports = new Set<string>();
    const addImport = (specifier: string) => {
      imports.add(specifier);
      fileImports.add(specifier);
    };
    const visit = (node: ts.Node): void => {
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) addImport(node.moduleSpecifier.text);
      if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) addImport(node.moduleSpecifier.text);
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) addImport(node.arguments[0].text);
      if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteral(node.argument.literal)) addImport(node.argument.literal.text);
      ts.forEachChild(node, visit);
    };
    visit(source);
    importsByFile.set(file.absolutePath, fileImports);
  }
  const builtinNames = new Set([...builtinModules, ...builtinModules.map((name) => name.replace(/^node:/, ""))]);
  const packageName = (specifier: string): string | null => {
    if (specifier.startsWith(".") || specifier.startsWith("/") || specifier.startsWith("@/") || specifier.startsWith("#") || builtinNames.has(specifier)) return null;
    const pieces = specifier.split("/");
    return specifier.startsWith("@") ? pieces.slice(0, 2).join("/") : pieces[0];
  };
  const packageNames = new Set([...imports].map(packageName).filter((name): name is string => name !== null));
  if (sourceFiles.some((file) => [".tsx", ".jsx"].includes(path.extname(file.path).toLowerCase()))) packageNames.add("react");
  if ([...imports].some((specifier) => specifier.startsWith("node:") || builtinNames.has(specifier))) {
    typeReferenceNames.add("node");
  }

  const options: ts.CompilerOptions = {
    allowJs: true,
    allowSyntheticDefaultImports: true,
    baseUrl: candidateRoot,
    esModuleInterop: true,
    jsx: ts.JsxEmit.ReactJSX,
    lib: ["lib.es2022.d.ts", "lib.dom.d.ts", "lib.dom.iterable.d.ts"],
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    noEmit: true,
    paths: {
      "@/*": [path.join(candidateRoot, "*")],
      react: [path.join(repositoryRoot, "node_modules", "@types", "react", "index.d.ts")],
      "react/*": [path.join(repositoryRoot, "node_modules", "@types", "react", "*")],
      "react-dom": [path.join(repositoryRoot, "node_modules", "@types", "react-dom", "index.d.ts")],
      "react-dom/*": [path.join(repositoryRoot, "node_modules", "@types", "react-dom", "*")],
      "*": [path.join(repositoryRoot, "node_modules", "*")],
    },
    resolveJsonModule: true,
    skipLibCheck: true,
    strict: true,
    target: ts.ScriptTarget.ES2022,
    typeRoots: [path.join(repositoryRoot, "node_modules", "@types")],
    types: ["react", "react-dom"],
  };

  const moduleResolutionHost: ts.ModuleResolutionHost = {
    ...ts.sys,
    readFile: (fileName) => isAllowedCompilerInput(fileName) ? ts.sys.readFile(fileName) : undefined,
    realpath: canonicalPath,
  };

  let missingInstalledPackages: string[] = [];
  const typeReferencePackages = new Set<string>();
  const fallbackTypeReferencePackage = (typeName: string): string => {
    const normalized = typeName.replaceAll("\\", "/");
    if (normalized === "node" || normalized.startsWith("node/")) return "@types/node";
    if (normalized.startsWith("@types/")) return normalized.split("/").slice(0, 2).join("/");
    if (normalized.startsWith("@")) {
      const [scope, packageNameValue] = normalized.slice(1).split("/");
      return scope && packageNameValue ? `@types/${scope}__${packageNameValue}` : `@types/${scope ?? normalized.slice(1)}`;
    }
    const firstSegment = normalized.split("/")[0];
    return normalized.includes("/") ? firstSegment : `@types/${firstSegment}`;
  };
  const packageNameFromNodeModulesPath = (fileName: string): string | null => {
    const segments = path.resolve(fileName).split(path.sep);
    for (let index = segments.length - 1; index >= 0; index -= 1) {
      if (segments[index]?.toLowerCase() !== "node_modules") continue;
      const first = segments[index + 1];
      if (!first) return null;
      if (first === "@types") {
        const typePackage = segments[index + 2];
        return typePackage ? `@types/${typePackage}` : null;
      }
      if (first.startsWith("@")) {
        const packageSegment = segments[index + 2];
        return packageSegment ? `${first}/${packageSegment}` : null;
      }
      return first;
    }
    return null;
  };

  for (const typeName of typeReferenceNames) {
    const resolution = ts.resolveTypeReferenceDirective(typeName, sourcePaths[0], options, moduleResolutionHost).resolvedTypeReferenceDirective;
    if (!resolution?.resolvedFileName) {
      const dependencyName = fallbackTypeReferencePackage(typeName);
      typeReferencePackages.add(dependencyName);
      missingInstalledPackages.push(dependencyName);
      continue;
    }
    const resolvedPath = canonicalPath(resolution.resolvedFileName);
    const resolvedInCandidate = isPathWithin(candidateRoot, resolution.resolvedFileName) || isPathWithin(candidateRoot, resolvedPath);
    if (resolvedInCandidate && !normalizedCandidateArtifacts.has(resolvedPath)) {
      return {
        status: "fail",
        message: `Type reference "${typeName}" resolves to an unlisted candidate artifact (${path.relative(candidateRoot, resolvedPath).replaceAll(path.sep, "/")}).`,
      };
    }
    if (!resolvedInCandidate && !isPathWithin(nodeModulesRoot, resolvedPath)) {
      return {
        status: "fail",
        message: `Type reference "${typeName}" resolves outside the candidate and local dependency directories.`,
      };
    }
    const dependencyName = packageNameFromNodeModulesPath(resolvedPath) ?? fallbackTypeReferencePackage(typeName);
    typeReferencePackages.add(dependencyName);
  }

  const requiredDependencies = new Set([...packageNames, ...typeReferencePackages]);
  if (declaredDependencies) {
    const undeclared = [...requiredDependencies].filter((name) => !declaredDependencies.has(name));
    if (undeclared.length > 0) {
      return { status: "fail", message: `Consumer package.json does not declare direct import(s) or type reference package(s): ${undeclared.join(", ")}.` };
    }
  }

  for (const file of sourceFiles) {
    for (const specifier of importsByFile.get(file.absolutePath) ?? []) {
      if (!specifier.startsWith(".") && !specifier.startsWith("/") && !specifier.startsWith("@/")) {
        if (specifier.startsWith("#")) continue;
      }
      const resolution = ts.resolveModuleName(specifier, file.absolutePath, options, moduleResolutionHost).resolvedModule;
      if (!resolution) {
        const rootPackage = packageName(specifier);
        if (rootPackage && (declaredDependencies === null || declaredDependencies.has(rootPackage))) {
          missingInstalledPackages.push(rootPackage);
          continue;
        }
        return { status: "fail", message: `Consumer import "${specifier}" from ${file.path} does not resolve inside the candidate project.` };
      }
      const resolvedPath = canonicalPath(resolution.resolvedFileName);
      const resolvedInCandidate =
        isPathWithin(candidateRoot, resolution.resolvedFileName) || isPathWithin(candidateRoot, resolvedPath);
      if (resolvedInCandidate && !normalizedCandidateArtifacts.has(resolvedPath)) {
        return {
          status: "fail",
          message: `Consumer import "${specifier}" from ${file.path} resolves to an unlisted candidate artifact (${path.relative(candidateRoot, resolvedPath).replaceAll(path.sep, "/")}).`,
        };
      }
      if (!resolvedInCandidate && !isPathWithin(nodeModulesRoot, resolvedPath)) {
        return {
          status: "fail",
          message: `Consumer import "${specifier}" from ${file.path} resolves outside the candidate and local dependency directories.`,
        };
      }
    }
  }
  for (const name of packageNames) {
    const resolution = ts.resolveModuleName(name, sourcePaths[0], options, moduleResolutionHost).resolvedModule;
    if (!resolution) missingInstalledPackages.push(name);
  }
  if (requiredDependencies.size > 0 && declaredDependencies === null) {
    missingInstalledPackages.push(...requiredDependencies);
  }
  if (missingInstalledPackages.length > 0) {
    missingInstalledPackages = [...new Set(missingInstalledPackages)];
    return {
      status: "inconclusive",
      message: `Consumer imports are ${declaredDependencies ? "declared" : "not verifiable without package.json"}, but local typechecking cannot resolve: ${missingInstalledPackages.join(", ")}. No packages were installed.`,
    };
  }

  const compilerHost = ts.createCompilerHost(options);
  const defaultFileExists = compilerHost.fileExists.bind(compilerHost);
  const defaultReadFile = compilerHost.readFile.bind(compilerHost);
  const defaultGetSourceFile = compilerHost.getSourceFile.bind(compilerHost);
  compilerHost.fileExists = (fileName) => isAllowedCompilerInput(fileName) && defaultFileExists(fileName);
  compilerHost.readFile = (fileName) => isAllowedCompilerInput(fileName) ? defaultReadFile(fileName) : undefined;
  compilerHost.getSourceFile = (fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile) => {
    if (!isAllowedCompilerInput(fileName)) return undefined;
    return defaultGetSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile);
  };

  const program = ts.createProgram({ rootNames: sourcePaths, options, host: compilerHost });
  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length === 0) {
    return { status: "pass", message: `TypeScript checked ${sourceFiles.length} listed source artifact(s) with strict, no-emit consumer settings.` };
  }

  const rendered = diagnostics.slice(0, 8).map((diagnostic) => {
    const relative = diagnostic.file
      ? path.relative(candidateRoot, diagnostic.file.fileName).replaceAll(path.sep, "/")
      : "project";
    const line = diagnostic.file && diagnostic.start !== undefined
      ? diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start).line + 1
      : undefined;
    return `${relative}${line ? `:${line}` : ""}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")}`;
  });
  return {
    status: "fail",
    message: `TypeScript found ${diagnostics.length} diagnostic(s): ${rendered.join(" | ")}`,
  };
}

interface CssAstNode {
  type?: string;
  name?: string;
  params?: string;
  nodes?: CssAstNode[];
}

const CSS_AT_RULE_ALLOWLIST = new Set([
  "apply",
  "charset",
  "container",
  "custom-variant",
  "font-face",
  "keyframes",
  "layer",
  "media",
  "namespace",
  "page",
  "property",
  "screen",
  "starting-style",
  "supports",
  "theme",
  "utility",
  "variant",
  "-webkit-keyframes",
]);

function quotedCssValue(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  const quote = trimmed[0];
  if ((quote !== "\"" && quote !== "'") || trimmed.at(-1) !== quote) return null;
  const content = trimmed.slice(1, -1);
  if (content.includes(quote) || content.length === 0) return null;
  return content;
}

function validateCssAstForOfflineCompilation(
  astValue: unknown,
  cssEntryPath: string,
  candidateRoot: string,
  sourceFiles: Array<{ path: string; absolutePath: string }>,
): string | null {
  const root = astValue as CssAstNode;
  let tailwindImportCount = 0;
  const cssDirectory = path.dirname(cssEntryPath);

  const visit = (node: CssAstNode, depth: number): string | null => {
    if (node.type === "root" || node.type === "rule") {
      for (const child of node.nodes ?? []) {
        const issue = visit(child, depth + (node.type === "rule" ? 1 : 0));
        if (issue) return issue;
      }
      return null;
    }

    if (node.type === "decl" || node.type === "comment") return null;
    if (node.type !== "atrule" || !node.name) {
      return "CSS node type \"" + (node.type ?? "unknown") + "\" is outside the offline compilation allowlist.";
    }

    const name = node.name.toLowerCase();
    if (name === "plugin" || name === "config") {
      return "@" + name + " can load executable candidate code; offline CSS compilation was skipped.";
    }

    if (name === "import") {
      if (depth !== 0) return "Nested @import is not supported by the offline CSS allowlist.";
      const imported = quotedCssValue(node.params);
      if (imported !== "tailwindcss") {
        return "@import " + (node.params ?? "") + " is outside the offline allowlist; only @import \"tailwindcss\" is supported.";
      }
      tailwindImportCount += 1;
      return null;
    }

    if (name === "source") {
      if (depth !== 0) return "Nested @source is not supported by the offline CSS allowlist.";
      const sourcePath = quotedCssValue(node.params);
      if (!sourcePath) return "@source " + (node.params ?? "") + " is not a simple quoted local path.";
      if (
        sourcePath.includes("\\") ||
        path.posix.isAbsolute(sourcePath) ||
        /^[a-zA-Z]:/.test(sourcePath) ||
        sourcePath.split("/").includes("..") ||
        sourcePath.includes("*") ||
        sourcePath.includes("?") ||
        sourcePath.includes("[")
      ) {
        return "@source path \"" + sourcePath + "\" is outside the supported candidate-relative paths.";
      }
      const resolved = path.resolve(candidateRoot, cssDirectory, sourcePath);
      const relative = path.relative(candidateRoot, resolved).split(path.sep).join("/");
      if (relative === ".." || relative.startsWith("../") || path.isAbsolute(relative)) {
        return "@source path \"" + sourcePath + "\" resolves outside the candidate directory.";
      }
      if (relative.split("/").some((segment) => /^\.env(?:\.|$)/i.test(segment))) {
        return "@source cannot include .env files.";
      }
      const sourcePrefix = relative ? relative.replace(/\/$/, "") + "/" : "";
      const listedSourceMatches = sourceFiles.some((file) =>
        file.path === relative || file.path.startsWith(sourcePrefix),
      );
      if (!listedSourceMatches) {
        return "@source path \"" + sourcePath + "\" does not point at a listed source artifact.";
      }
      return null;
    }

    if (!CSS_AT_RULE_ALLOWLIST.has(name)) {
      return "@" + name + " is outside the static CSS allowlist; offline compilation was skipped.";
    }
    for (const child of node.nodes ?? []) {
      const issue = visit(child, depth + 1);
      if (issue) return issue;
    }
    return null;
  };

  const issue = visit(root, 0);
  if (issue) return issue;
  if (tailwindImportCount !== 1) {
    return "Expected exactly one @import \"tailwindcss\"; found " + tailwindImportCount + ".";
  }
  return null;
}

async function compileCandidateCss(
  cssFiles: Array<{ path: string; absolutePath: string }>,
  sourceFiles: Array<{ path: string; absolutePath: string }>,
  candidateRoot: string,
  repositoryRoot: string,
  declaredDependencies: Set<string> | null,
): Promise<{ status: EvaluationStatus; message: string }> {
  if (cssFiles.length === 0) return { status: "inconclusive", message: "No CSS artifact was listed." };
  const cssEntry = cssFiles[0];
  const source = await readFile(cssEntry.absolutePath, "utf8");
  const packageRequire = createRequire(path.join(repositoryRoot, "package.json"));
  let postcss: {
    parse(input: string, options: Record<string, unknown>): unknown;
    (plugins: unknown[]): { process(input: string, options: Record<string, unknown>): Promise<{ css: string }> };
  };
  let cssAst: unknown;
  try {
    const nextPackage = packageRequire.resolve("next/package.json");
    const nextRequire = createRequire(nextPackage);
    const postcssPath = nextRequire.resolve("postcss");
    postcss = nextRequire(postcssPath) as typeof postcss;
    cssAst = postcss.parse(source, { from: cssEntry.absolutePath });
  } catch (error) {
    return {
      status: "fail",
      message: `CSS syntax or parser setup failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
  const safetyIssue = validateCssAstForOfflineCompilation(cssAst, cssEntry.path, candidateRoot, sourceFiles);
  if (safetyIssue) return { status: "inconclusive", message: safetyIssue };
  if (!declaredDependencies) {
    return { status: "inconclusive", message: "Tailwind CSS 4 is locally available, but no consumer package.json was listed to verify the dependency contract." };
  }
  if (!declaredDependencies.has("tailwindcss")) {
    return { status: "fail", message: "Consumer package.json does not declare tailwindcss, required by the listed Tailwind CSS 4 stylesheet." };
  }
  if (/@import\s+(?:url\()?\s*["']?https?:\/\//i.test(source)) {
    return {
      status: "inconclusive",
      message: "CSS contains a remote @import; the offline consumer check will not resolve external stylesheets.",
    };
  }
  const cssDirectory = path.dirname(cssEntry.path);
  const localImports = [...source.matchAll(/@import\s+(?:url\(\s*)?["']([^"']+)["']\s*\)?/gi)]
    .map((match) => match[1])
    .filter((importPath) => importPath !== "tailwindcss");
  for (const importPath of localImports) {
    if (!importPath.startsWith(".")) {
      return {
        status: "inconclusive",
        message: `CSS package import "${importPath}" was not listed as a candidate artifact; package imports are not resolved by the isolated compiler.`,
      };
    }
    const importedPath = path.resolve(candidateRoot, cssDirectory, importPath);
    if (!importedPath.startsWith(`${candidateRoot}${path.sep}`)) {
      return { status: "fail", message: `CSS import "${importPath}" resolves outside the candidate directory.` };
    }
  }
  const sourceDirectives = [...source.matchAll(/@source\s+(?:not\s+)?([^\s;]+)/gi)].map((match) => match[1]);
  for (const rawDirective of sourceDirectives) {
    const directive = rawDirective.replace(/^(["'])(.*)\1$/, "$2");
    if (directive.startsWith("inline(") || directive.startsWith("not(")) continue;
    if (directive.startsWith("/") || directive.startsWith("\\") || /^[a-zA-Z]:/.test(directive)) {
      return { status: "fail", message: `Tailwind @source path "${directive}" must be relative to the candidate.` };
    }
    const sourcePath = path.resolve(candidateRoot, cssDirectory, directive);
    if (!sourcePath.startsWith(`${candidateRoot}${path.sep}`) && sourcePath !== candidateRoot) {
      return { status: "fail", message: `Tailwind @source path "${directive}" resolves outside the candidate directory.` };
    }
  }

  const isolatedParent = path.join(repositoryRoot, "node_modules", ".cache");
  let consumerRoot: string | undefined;
  try {
    await mkdir(isolatedParent, { recursive: true });
    consumerRoot = await mkdtemp(path.join(isolatedParent, "stylekit-workflow-consumer-"));
    const consumerPrefix = `${path.resolve(isolatedParent)}${path.sep}`;
    if (!path.resolve(consumerRoot).startsWith(consumerPrefix)) {
      throw new Error("Temporary consumer fixture resolved outside the local node_modules cache.");
    }
    for (const file of [...sourceFiles, ...cssFiles]) {
      const target = path.resolve(consumerRoot, ...file.path.split("/"));
      if (!target.startsWith(`${consumerRoot}${path.sep}`)) throw new Error(`Unsafe copied candidate path: ${file.path}`);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, await readFile(file.absolutePath));
    }

    const tailwindcss = packageRequire("@tailwindcss/postcss") as (options: Record<string, unknown>) => unknown;
    const isolatedCssPath = path.join(consumerRoot, ...cssEntry.path.split("/"));
    const isolatedCss = await readFile(isolatedCssPath, "utf8");
    const plugin = tailwindcss({ base: consumerRoot, optimize: false });
    const result = await postcss([plugin]).process(isolatedCss, { from: isolatedCssPath });
    if (result.css.trim().length === 0) {
      return { status: "fail", message: "Tailwind CSS 4 completed but emitted an empty stylesheet." };
    }
    const sourceText = (await Promise.all(sourceFiles.map((file) => readFile(file.absolutePath, "utf8")))).join("\n");
    const staticClassTokens = [...sourceText.matchAll(/\bclass(?:Name)?=["'`]([^"'`]+)["'`]/g)]
      .flatMap((match) => match[1].split(/\s+/))
      .filter((token) => /^[a-z0-9][a-z0-9/-]*$/i.test(token));
    const emittedUtility = staticClassTokens.find((token) => result.css.includes(token));
    const scannedSource = sourceFiles.length > 0 && Boolean(emittedUtility);
    return {
      status: scannedSource ? "pass" : "inconclusive",
      message: scannedSource
        ? `Tailwind CSS 4 compiled ${cssEntry.path}, scanned ${sourceFiles.length} listed source artifact(s), and emitted the static utility ${emittedUtility}; output was ${result.css.length} characters.`
        : "Tailwind CSS 4 compiled the stylesheet, but no recognizable static utility from a listed source artifact was confirmed in the output.",
    };
  } catch (error) {
    return {
      status: "fail",
      message: `Tailwind CSS 4 compilation failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  } finally {
    if (consumerRoot) {
      const resolved = path.resolve(consumerRoot);
      const consumerPrefix = `${path.resolve(isolatedParent)}${path.sep}`;
      if (resolved.startsWith(consumerPrefix)) await rm(resolved, { recursive: true, force: true });
    }
  }
}

function artifactByPath(
  artifacts: EvidenceReference[],
  artifactPath: string,
): EvidenceReference | undefined {
  return artifacts.find((artifact) => artifact.path === artifactPath);
}

function isLoopbackHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" && url.username.length === 0 && url.password.length === 0 && ["127.0.0.1", "localhost", "[::1]"].includes(url.hostname);
  } catch {
    return false;
  }
}

function validateBrowserReport(
  reportValue: unknown,
  scenarioId: ToolWorkflowScenarioId,
  expectedRunId: string,
  scenario: typeof TOOL_WORKFLOW_SCENARIOS[number],
  artifacts: EvidenceReference[],
): EvaluationCheck[] {
  const parsed = browserReportSchema.safeParse(reportValue);
  if (!parsed.success) {
    return [createEvaluationCheck(`browser-report:${scenarioId}`, "fail", `Browser evidence does not match the documented schema: ${parsed.error.issues[0]?.message ?? "invalid record"}`, "browser-record")];
  }
  const report = parsed.data;
  const reportChecks: EvaluationCheck[] = [];

  if (report.scenarioId !== scenarioId) {
    reportChecks.push(createEvaluationCheck(`browser-report:${scenarioId}:scenario`, "fail", "Browser report scenarioId does not match its candidate scenario.", "browser-record"));
  }
  if (report.runId !== expectedRunId) {
    reportChecks.push(createEvaluationCheck(`browser-report:${scenarioId}:run`, "fail", "Browser report runId does not match the candidate manifest run.id.", "browser-record"));
  }
  if (!isLoopbackHttpUrl(report.baseUrl)) {
    reportChecks.push(createEvaluationCheck(`browser-report:${scenarioId}:origin`, "fail", "Browser report baseUrl must be a local loopback HTTP origin.", "browser-record"));
  }
  if (report.viewports.mobile.width > 430) {
    reportChecks.push(createEvaluationCheck(`browser-report:${scenarioId}:mobile-viewport`, "fail", "Mobile browser evidence must use a viewport no wider than 430px.", "browser-record"));
  }
  if (report.viewports.mobile.width < 320) {
    reportChecks.push(createEvaluationCheck(`browser-report:${scenarioId}:mobile-viewport`, "fail", "Mobile browser evidence must use a viewport at least 320px wide.", "browser-record"));
  }
  if (report.viewports.desktop.width < 1024) {
    reportChecks.push(createEvaluationCheck(`browser-report:${scenarioId}:desktop-viewport`, "fail", "Desktop browser evidence must use a viewport at least 1024px wide.", "browser-record"));
  }
  if (report.horizontalOverflow.viewportWidth !== report.viewports.mobile.width) {
    reportChecks.push(createEvaluationCheck(`browser-report:${scenarioId}:overflow-viewport`, "fail", "Horizontal-overflow measurement must use the declared mobile viewport width.", "browser-record"));
  }
  if (report.horizontalOverflow.documentWidth > report.horizontalOverflow.viewportWidth) {
    reportChecks.push(createEvaluationCheck(`browser-report:${scenarioId}:overflow`, "fail", `Browser report records horizontal overflow (${report.horizontalOverflow.documentWidth}px document vs ${report.horizontalOverflow.viewportWidth}px viewport).`, "browser-record"));
  }
  if (report.pageErrors.length > 0 || report.consoleErrors.length > 0) {
    reportChecks.push(createEvaluationCheck(`browser-report:${scenarioId}:runtime-errors`, "fail", `Browser report contains ${report.pageErrors.length} page error(s) and ${report.consoleErrors.length} console error(s).`, "browser-record"));
  }
  if (!report.reducedMotionEmulated) {
    reportChecks.push(createEvaluationCheck(`browser-report:${scenarioId}:reduced-motion`, "inconclusive", "Browser run did not emulate prefers-reduced-motion.", "browser-record"));
  }

  for (const criterion of scenario.criteria.filter((id) => id !== "visual-review")) {
    const observation = report.checks[criterion];
    if (!observation) {
      reportChecks.push(createEvaluationCheck(`${scenarioId}:${criterion}`, "inconclusive", "Browser report has no result for this acceptance criterion.", "browser-record"));
      continue;
    }
    const resolvedEvidence: EvidenceReference[] = [];
    let missingEvidence = false;
    for (const evidencePath of observation.evidence) {
      const existing = artifactByPath(artifacts, evidencePath);
      if (existing) resolvedEvidence.push(toRelativeEvidence(existing));
      else missingEvidence = true;
    }
    const usableEvidence = resolvedEvidence.filter((evidence) => evidence.kind !== "browser-report");
    if (criterion === "mobile" && !usableEvidence.some((evidence) => evidence.kind === "screenshot")) {
      missingEvidence = true;
    }
    if (criterion === "aria-keyboard" && !usableEvidence.some((evidence) => ["screenshot", "accessibility-report", "other"].includes(evidence.kind))) {
      missingEvidence = true;
    }
    const status = missingEvidence
      ? "inconclusive"
      : observation.status;
    reportChecks.push(createEvaluationCheck(
      `${scenarioId}:${criterion}`,
      status,
      missingEvidence
        ? "Browser report evidence is absent, unlisted, or the wrong artifact kind for this acceptance criterion."
        : observation.observation,
      "browser-record",
      resolvedEvidence,
    ));
  }

  if (reportChecks.length === 0) {
    reportChecks.push(createEvaluationCheck(`browser-report:${scenarioId}`, "pass", `Validated structured browser report from ${report.runner.name} ${report.runner.version} at ${report.baseUrl}. Browser actions are reported, not replayed by this evaluator.`, "browser-record"));
  }
  return reportChecks;
}

export async function evaluateCandidateDirectory(
  inputDirectory: string,
  repositoryRoot: string,
): Promise<CandidateEvaluation> {
  const checks: EvaluationCheck[] = [];
  let candidateRoot: string;
  try {
    candidateRoot = await realpath(path.resolve(inputDirectory));
    const info = await lstat(candidateRoot);
    if (!info.isDirectory()) throw new Error("Candidate path is not a directory.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Candidate directory is unavailable.";
    return {
      status: "fail",
      directory: inputDirectory,
      modelRun: { status: "not-provided", verification: "not-applicable" },
      scenarios: [],
      checks: [createEvaluationCheck("candidate-directory", "fail", message, "candidate-artifact")],
      limitations: ["No candidate artifacts were available for validation."],
    };
  }

  const manifestAbsolutePath = path.join(candidateRoot, "stylekit-tool-workflow.json");
  let manifestRaw: string;
  try {
    if ((await lstat(manifestAbsolutePath)).isSymbolicLink()) {
      return {
        status: "fail",
        directory: candidateRoot,
        manifestPath: "stylekit-tool-workflow.json",
        modelRun: { status: "not-provided", verification: "not-applicable" },
        scenarios: [],
        checks: [createEvaluationCheck("candidate-manifest", "fail", "Candidate manifest must be a regular file, not a symbolic link.", "candidate-artifact")],
        limitations: [],
      };
    }
  } catch {
    // The read below returns an inconclusive result for a missing manifest.
  }
  try {
    const manifestPath = await realpath(manifestAbsolutePath);
    if (path.resolve(manifestPath) !== path.resolve(manifestAbsolutePath)) {
      throw new Error("Candidate manifest must be a regular file, not a symbolic link.");
    }
    if (!isPathWithin(candidateRoot, manifestPath)) throw new Error("Candidate manifest resolves outside the candidate directory.");
    if (containsEnvironmentPath(candidateRoot, manifestPath)) throw new Error("Candidate manifest cannot resolve to a .env file.");
    const stat = await lstat(manifestPath);
    if (!stat.isFile() || stat.size > 1024 * 1024) throw new Error("Candidate manifest must be a regular file no larger than 1 MiB.");
    manifestRaw = await readFile(manifestPath, "utf8");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Candidate manifest is missing or unreadable.";
    return {
      status: "inconclusive",
      directory: candidateRoot,
      modelRun: { status: "not-provided", verification: "not-applicable" },
      scenarios: [],
      checks: [createEvaluationCheck("candidate-manifest", "inconclusive", message, "candidate-artifact")],
      limitations: ["Expected stylekit-tool-workflow.json; without it the evaluator cannot map artifacts to scenarios or acceptance evidence."],
    };
  }

  let rawJson: unknown;
  try {
    rawJson = JSON.parse(manifestRaw) as unknown;
  } catch (error) {
    return {
      status: "fail",
      directory: candidateRoot,
      manifestPath: "stylekit-tool-workflow.json",
      modelRun: { status: "not-provided", verification: "not-applicable" },
      scenarios: [],
      checks: [createEvaluationCheck("candidate-manifest", "fail", `Manifest is not valid JSON: ${error instanceof Error ? error.message : String(error)}`, "candidate-artifact")],
      limitations: [],
    };
  }

  const parsed = workflowCandidateSchema.safeParse(rawJson);
  if (!parsed.success) {
    return {
      status: "fail",
      directory: candidateRoot,
      manifestPath: "stylekit-tool-workflow.json",
      modelRun: { status: "not-provided", verification: "not-applicable" },
      scenarios: [],
      checks: [createEvaluationCheck("candidate-manifest", "fail", `Manifest schema error at ${parsed.error.issues[0]?.path.join(".") || "root"}: ${parsed.error.issues[0]?.message ?? "invalid value"}`, "candidate-artifact")],
      limitations: [],
    };
  }

  const manifest = parsed.data;
  const unknownScenarioIds = Object.keys(manifest.scenarios).filter((id) => !scenarioIds.includes(id as ToolWorkflowScenarioId));
  if (unknownScenarioIds.length > 0) {
    checks.push(createEvaluationCheck("candidate-scenario-ids", "fail", `Unknown scenario id(s): ${unknownScenarioIds.join(", ")}.`, "candidate-artifact"));
  }

  const scenarioResults: CandidateEvaluation["scenarios"] = [];
  let totalBytes = 0;
  let totalArtifacts = 0;

  for (const scenarioDefinition of TOOL_WORKFLOW_SCENARIOS) {
    const scenarioInput = manifest.scenarios[scenarioDefinition.id];
    if (!scenarioInput) {
      scenarioResults.push({
        id: scenarioDefinition.id,
        status: "inconclusive",
        sourceValidation: "inconclusive",
        cssCompilation: "inconclusive",
        checks: [createEvaluationCheck(`${scenarioDefinition.id}:candidate`, "inconclusive", "No candidate artifacts were supplied for this scenario.", "candidate-artifact")],
      });
      continue;
    }

    const scenarioChecks: EvaluationCheck[] = [];
    const evidenceRefs: EvidenceReference[] = [];
    const sourceFiles: Array<{ path: string; absolutePath: string }> = [];
    const cssFiles: Array<{ path: string; absolutePath: string }> = [];
    const resolvedByPath = new Map<string, string>();

    for (const artifact of scenarioInput.artifacts) {
      totalArtifacts += 1;
      const resolved = await resolveArtifact(candidateRoot, artifact.path, artifact.kind);
      if ("id" in resolved) {
        scenarioChecks.push(resolved);
        continue;
      }
      totalBytes += resolved.reference.sha256 ? (await lstat(resolved.absolutePath)).size : 0;
      evidenceRefs.push(resolved.reference);
      resolvedByPath.set(resolved.reference.path, resolved.absolutePath);
      const ext = path.extname(resolved.reference.path).toLowerCase();
      if (artifact.kind === "source" && [".ts", ".tsx", ".js", ".jsx"].includes(ext)) {
        sourceFiles.push({ path: resolved.reference.path, absolutePath: resolved.absolutePath });
      }
      if (artifact.kind === "css" && ext === ".css") {
        cssFiles.push({ path: resolved.reference.path, absolutePath: resolved.absolutePath });
      }
    }

    const packageJsonPath = scenarioInput.artifacts.find((artifact) =>
      artifact.kind === "other" && path.posix.basename(artifact.path) === "package.json",
    )?.path;
    const consumerPackage = await consumerDependencies(packageJsonPath ? resolvedByPath.get(packageJsonPath) : undefined);
    const packageArtifact = packageJsonPath ? artifactByPath(evidenceRefs, packageJsonPath) : undefined;
    scenarioChecks.push(createEvaluationCheck(
      `${scenarioDefinition.id}:consumer-package`,
      consumerPackage.status,
      consumerPackage.message,
      "candidate-artifact",
      packageArtifact ? [packageArtifact] : [],
    ));

    if (totalArtifacts > 300 || totalBytes > 50 * 1024 * 1024) {
      scenarioChecks.push(createEvaluationCheck("candidate-size-limit", "fail", "Candidate artifacts exceed 300 files or 50 MiB total.", "candidate-artifact"));
    }

    const browserReportPath = scenarioInput.browserReport;
    if (browserReportPath) {
      const reportArtifact = artifactByPath(evidenceRefs, browserReportPath);
      const reportAbsolutePath = resolvedByPath.get(browserReportPath);
      if (!reportArtifact || !reportAbsolutePath || reportArtifact.kind !== "browser-report") {
        scenarioChecks.push(createEvaluationCheck(`${scenarioDefinition.id}:browser-report-ref`, "inconclusive", "browserReport must reference a listed browser-report artifact.", "candidate-artifact"));
      } else {
        try {
          const reportJson = JSON.parse(await readFile(reportAbsolutePath, "utf8")) as unknown;
          scenarioChecks.push(...validateBrowserReport(reportJson, scenarioDefinition.id, manifest.run.id, scenarioDefinition, evidenceRefs));
        } catch (error) {
          scenarioChecks.push(createEvaluationCheck(`${scenarioDefinition.id}:browser-report`, "fail", `Browser report is not valid JSON: ${error instanceof Error ? error.message : String(error)}`, "browser-record", [reportArtifact]));
        }
      }
    } else {
      scenarioChecks.push(...scenarioDefinition.criteria
        .filter((id) => id !== "visual-review")
        .map((id) => createEvaluationCheck(`${scenarioDefinition.id}:${id}`, "inconclusive", "No structured local browser report was supplied.", "browser-record")));
    }

    if (scenarioInput.visualReview) {
      const review = scenarioInput.visualReview;
      const reviewArtifacts = review.evidence.map((artifactPath) => artifactByPath(evidenceRefs, artifactPath));
      const invalidEvidence = reviewArtifacts.some((artifact) => !artifact || artifact.kind !== "screenshot");
      scenarioChecks.push(createEvaluationCheck(
        `${scenarioDefinition.id}:visual-review`,
        invalidEvidence ? "inconclusive" : review.status,
        invalidEvidence
          ? "Human visual review must reference listed screenshot artifacts."
          : `Visual review reported ${review.status} by ${review.reviewer} at ${review.reviewedAt}. This is reviewer attestation; the evaluator does not infer visual quality from image hashes.`,
        "human-review",
        reviewArtifacts.filter((artifact): artifact is EvidenceReference => artifact !== undefined),
      ));
    } else {
      scenarioChecks.push(createEvaluationCheck(`${scenarioDefinition.id}:visual-review`, "inconclusive", "No reviewer, timestamp, decision, and screenshot reference were supplied.", "human-review"));
    }

    const scenarioStatus = overallEvaluationStatus(scenarioChecks);
    scenarioResults.push({
      id: scenarioDefinition.id,
      status: scenarioStatus,
      sourceValidation: sourceFiles.length > 0 ? "inconclusive" : "inconclusive",
      cssCompilation: cssFiles.length > 0 ? "inconclusive" : "inconclusive",
      checks: scenarioChecks,
    });

    const sourceValidation = await validateTypeScriptSources(
      sourceFiles,
      candidateRoot,
      repositoryRoot,
      consumerPackage.dependencies,
      new Set(resolvedByPath.values()),
    );
    const sourceCheck = createEvaluationCheck(`${scenarioDefinition.id}:consumer-typescript`, sourceValidation.status, sourceValidation.message, "runner", evidenceRefs.filter((artifact) => artifact.kind === "source"));
    scenarioChecks.push(sourceCheck);
    const cssCompilation = await compileCandidateCss(cssFiles, sourceFiles, candidateRoot, repositoryRoot, consumerPackage.dependencies);
    const cssCheck = createEvaluationCheck(`${scenarioDefinition.id}:tailwind-css`, cssCompilation.status, cssCompilation.message, "runner", evidenceRefs.filter((artifact) => artifact.kind === "css" || artifact.kind === "source"));
    scenarioChecks.push(cssCheck);

    const updated = scenarioResults[scenarioResults.length - 1];
    updated.sourceValidation = sourceValidation.status;
    updated.cssCompilation = cssCompilation.status;
    updated.status = overallEvaluationStatus(scenarioChecks);
  }

  if (totalArtifacts > 300 || totalBytes > 50 * 1024 * 1024) {
    checks.push(createEvaluationCheck("candidate-size-limit", "fail", "Candidate artifacts exceed 300 files or 50 MiB total.", "candidate-artifact"));
  }
  const scenarioCheckSets = scenarioResults.flatMap((scenario) => scenario.checks);
  checks.push(...scenarioCheckSets);
  const model = manifest.run.model;
  const session = manifest.run.agentSession;
  const modelRun: CandidateEvaluation["modelRun"] = model
    ? {
        status: "recorded",
        verification: "self-reported",
        adapter: model.adapter,
        provider: model.provider,
        model: model.model,
        ...(model.requestId ? { requestId: model.requestId } : {}),
        promptSha256: model.promptSha256,
        ...(model.responseSha256 ? { responseSha256: model.responseSha256 } : {}),
      }
    : session
      ? {
          status: "agent-session",
          verification: "self-reported",
          adapter: session.agent,
          provider: "OpenAI",
          ...(session.model ? { model: session.model } : {}),
          ...(session.threadId ? { threadId: session.threadId } : {}),
          promptSha256: session.promptSha256,
        }
      : { status: "not-provided", verification: "not-applicable" };

  if (manifest.run.source === "model-adapter" && model) {
    checks.push(createEvaluationCheck("model-run-record", "pass", `Recorded adapter ${model.adapter} reported ${model.provider}/${model.model}; provider execution is not independently authenticated.`, "candidate-artifact"));
  } else if (manifest.run.source === "agent-session" && session) {
    checks.push(createEvaluationCheck("model-run-record", "pass", `Recorded ${session.agent} agent session${session.model ? ` using ${session.model}` : ""}; model identity is self-reported.`, "candidate-artifact"));
  } else {
    checks.push(createEvaluationCheck("model-run-record", "inconclusive", "No model adapter record was supplied; candidate artifacts may be human-authored or generated elsewhere.", "candidate-artifact"));
  }

  const status = overallEvaluationStatus(checks);
  const limitations = [
    "Candidate claims and browser reports are structurally validated and hashed, not replayed by this evaluator.",
    "Visual quality is a human judgment. The report records reviewer attribution and screenshot hashes without scoring pixels.",
    "A recorded model adapter is self-reported; provider execution and model identity are not authenticated.",
    "The isolated consumer check typechecks listed source files and compiles listed Tailwind CSS without installing dependencies or running a full application build.",
  ];
  if (manifest.run.source === "agent-session") {
    limitations.push("An agent-session candidate is an in-session model outcome, not an independent or blinded Skill A/B benchmark.");
  }

  return {
    status,
    directory: candidateRoot,
    manifestPath: "stylekit-tool-workflow.json",
    modelRun,
    scenarios: scenarioResults,
    checks,
    limitations,
  };
}

export function buildCoverageSummary(candidate: CandidateEvaluation | null) {
  return {
    scenarios: TOOL_WORKFLOW_SCENARIOS.map((scenario) => {
      const scenarioResult = candidate?.scenarios.find((result) => result.id === scenario.id);
      const checks = scenarioResult?.checks ?? [];
      const criterionIds = new Set(scenario.criteria.map((criterion) => `${scenario.id}:${criterion}`));
      const criterionChecks = checks.filter((check) => criterionIds.has(check.id));
      const reportedChecks = criterionChecks.filter((check) => check.source === "browser-record" || check.source === "human-review");
      const concluded = new Set(criterionChecks.filter((check) => check.status !== "inconclusive").map((check) => check.id));
      return {
        id: scenario.id,
        criteria: [...scenario.criteria],
        verified: criterionChecks.filter((check) => check.source === "runner" && check.status === "pass").length,
        reported: reportedChecks.filter((check) => check.status !== "inconclusive").length,
        failed: criterionChecks.filter((check) => check.status === "fail").length,
        inconclusive: scenario.criteria.length - concluded.size,
        consumerChecks: {
          typeScript: scenarioResult?.sourceValidation ?? "inconclusive",
          tailwindCss: scenarioResult?.cssCompilation ?? "inconclusive",
        },
      };
    }),
  };
}

export function parseToolWorkflowCandidate(value: unknown) {
  return workflowCandidateSchema.safeParse(value);
}

export function parseBrowserWorkflowRecord(value: unknown) {
  return browserReportSchema.safeParse(value);
}
