import type { Locale } from "@/lib/i18n/translations";
import type { PromptPairInput } from "@/lib/styles/prompt-pair";

export const PROJECT_BRIEF_PROJECT_TYPES = [
  "landing",
  "dashboard",
  "app",
  "portfolio",
  "blog",
  "commerce",
  "other",
] as const;

export const PROJECT_BRIEF_STACKS = [
  "nextjs",
  "react",
  "vue",
  "svelte",
  "typescript",
  "javascript",
  "tailwind",
  "css-modules",
  "shadcn",
  "other",
] as const;

export const PROJECT_BRIEF_STATES = [
  "loading",
  "empty",
  "error",
  "success",
  "disabled",
] as const;

export type ProjectBriefProjectType = (typeof PROJECT_BRIEF_PROJECT_TYPES)[number];
export type ProjectBriefStack = (typeof PROJECT_BRIEF_STACKS)[number];
export type ProjectBriefState = (typeof PROJECT_BRIEF_STATES)[number];
export type ProjectBriefCompletionTier = "core" | "guided" | "complete";

export interface ProjectImplementationBriefInput {
  locale: Locale;
  style: PromptPairInput;
  projectType: ProjectBriefProjectType;
  audience: string;
  primaryGoal: string;
  stacks: ProjectBriefStack[];
  requiredItems: string[];
  requiredStates: ProjectBriefState[];
  brandPersonality: string[];
  antiReferences: string[];
  additionalConstraints: string;
}

export type ProjectBriefValidationField =
  | "projectType"
  | "audience"
  | "primaryGoal"
  | "stacks"
  | "requiredItems"
  | "requiredStates"
  | "brandPersonality"
  | "antiReferences"
  | "additionalConstraints"
  | "style";

export interface ProjectBriefValidationIssue {
  field: ProjectBriefValidationField;
  code: "required" | "invalid" | "too_long" | "too_many";
  limit?: number;
}

export interface ProjectBriefValidationResult {
  valid: boolean;
  issues: ProjectBriefValidationIssue[];
}

export interface ProjectBriefAnalyticsMetadata {
  slug: string;
  locale: Locale;
  project_type: ProjectBriefProjectType;
  stack_count: number;
  required_item_count: number;
  state_count: number;
  optional_field_count: number;
  completion_tier: ProjectBriefCompletionTier;
  source: "style_detail";
}

const LIMITS = {
  audience: 300,
  primaryGoal: 600,
  stacks: 8,
  requiredItems: 12,
  requiredItem: 120,
  requiredStates: 5,
  brandPersonality: 6,
  brandPersonalityItem: 60,
  antiReferences: 12,
  antiReferenceItem: 120,
  additionalConstraints: 1_200,
} as const;

const projectTypeLabels: Record<Locale, Record<ProjectBriefProjectType, string>> = {
  zh: {
    landing: "着陆页",
    dashboard: "数据后台",
    app: "应用或工具",
    portfolio: "作品集",
    blog: "内容或博客",
    commerce: "电商",
    other: "其他",
  },
  en: {
    landing: "Landing page",
    dashboard: "Dashboard",
    app: "Application or tool",
    portfolio: "Portfolio",
    blog: "Content or blog",
    commerce: "Commerce",
    other: "Other",
  },
};

const stackLabels: Record<ProjectBriefStack, string> = {
  nextjs: "Next.js",
  react: "React",
  vue: "Vue",
  svelte: "Svelte",
  typescript: "TypeScript",
  javascript: "JavaScript",
  tailwind: "Tailwind CSS",
  "css-modules": "CSS Modules",
  shadcn: "shadcn/ui",
  other: "Other / existing project stack",
};

const stateLabels: Record<Locale, Record<ProjectBriefState, string>> = {
  zh: {
    loading: "加载",
    empty: "空",
    error: "错误",
    success: "成功",
    disabled: "禁用",
  },
  en: {
    loading: "Loading",
    empty: "Empty",
    error: "Error",
    success: "Success",
    disabled: "Disabled",
  },
};

export function getProjectBriefProjectTypeLabel(
  projectType: ProjectBriefProjectType,
  locale: Locale,
): string {
  return projectTypeLabels[locale][projectType];
}

export function getProjectBriefStackLabel(stack: ProjectBriefStack): string {
  return stackLabels[stack];
}

export function getProjectBriefStateLabel(
  state: ProjectBriefState,
  locale: Locale,
): string {
  return stateLabels[locale][state];
}

export class ProjectBriefValidationError extends Error {
  constructor(public readonly issues: ProjectBriefValidationIssue[]) {
    super("Invalid project implementation brief input");
    this.name = "ProjectBriefValidationError";
  }
}

function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function hasCjk(value: string): boolean {
  return /[\u3400-\u9fff]/.test(value);
}

function normalizeList(values: string[]): string[] {
  const seen = new Set<string>();
  const normalized: string[] = [];

  for (const value of values) {
    const item = normalizeText(value);
    if (!item) continue;
    const key = item.toLocaleLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    normalized.push(item);
  }

  return normalized;
}

export function normalizeProjectBriefList(value: string): string[] {
  return normalizeList(value.split(/[,，、;；\n]+/));
}

function isOneOf<T extends string>(value: string, options: readonly T[]): value is T {
  return options.includes(value as T);
}

function pushLengthIssue(
  issues: ProjectBriefValidationIssue[],
  field: ProjectBriefValidationField,
  value: string,
  limit: number,
): void {
  if (normalizeText(value).length > limit) {
    issues.push({ field, code: "too_long", limit });
  }
}

function pushListIssues(
  issues: ProjectBriefValidationIssue[],
  field: ProjectBriefValidationField,
  values: string[],
  listLimit: number,
  itemLimit?: number,
): void {
  const normalized = normalizeList(values);
  if (normalized.length > listLimit) {
    issues.push({ field, code: "too_many", limit: listLimit });
  }
  if (itemLimit && normalized.some((item) => item.length > itemLimit)) {
    issues.push({ field, code: "too_long", limit: itemLimit });
  }
}

export function validateProjectImplementationBriefInput(
  input: ProjectImplementationBriefInput,
): ProjectBriefValidationResult {
  const issues: ProjectBriefValidationIssue[] = [];

  if (!input.projectType) {
    issues.push({ field: "projectType", code: "required" });
  } else if (!isOneOf(input.projectType, PROJECT_BRIEF_PROJECT_TYPES)) {
    issues.push({ field: "projectType", code: "invalid" });
  }

  if (!normalizeText(input.audience)) {
    issues.push({ field: "audience", code: "required" });
  }
  if (!normalizeText(input.primaryGoal)) {
    issues.push({ field: "primaryGoal", code: "required" });
  }
  pushLengthIssue(issues, "audience", input.audience, LIMITS.audience);
  pushLengthIssue(issues, "primaryGoal", input.primaryGoal, LIMITS.primaryGoal);
  pushListIssues(issues, "stacks", input.stacks, LIMITS.stacks);
  pushListIssues(
    issues,
    "requiredItems",
    input.requiredItems,
    LIMITS.requiredItems,
    LIMITS.requiredItem,
  );
  pushListIssues(
    issues,
    "requiredStates",
    input.requiredStates,
    LIMITS.requiredStates,
  );
  pushListIssues(
    issues,
    "brandPersonality",
    input.brandPersonality,
    LIMITS.brandPersonality,
    LIMITS.brandPersonalityItem,
  );
  pushListIssues(
    issues,
    "antiReferences",
    input.antiReferences,
    LIMITS.antiReferences,
    LIMITS.antiReferenceItem,
  );
  pushLengthIssue(
    issues,
    "additionalConstraints",
    input.additionalConstraints,
    LIMITS.additionalConstraints,
  );

  if (input.stacks.some((item) => !isOneOf(item, PROJECT_BRIEF_STACKS))) {
    issues.push({ field: "stacks", code: "invalid" });
  }
  if (input.requiredStates.some((item) => !isOneOf(item, PROJECT_BRIEF_STATES))) {
    issues.push({ field: "requiredStates", code: "invalid" });
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.style.styleSlug)) {
    issues.push({ field: "style", code: "invalid" });
  }

  return { valid: issues.length === 0, issues };
}

function bulletList(values: string[], emptyValue: string): string {
  if (values.length === 0) return `- ${emptyValue}`;
  return values.map((value) => `- ${value}`).join("\n");
}

function checklist(values: string[]): string {
  return values.map((value) => `- [ ] ${value}`).join("\n");
}

function localizedStyleRules(
  input: ProjectImplementationBriefInput,
): { required: string[]; forbidden: string[]; keywords: string[] } {
  if (input.locale === "zh") {
    return {
      required: normalizeList(input.style.doList).slice(0, 8),
      forbidden: normalizeList(input.style.dontList).slice(0, 8),
      keywords: normalizeList(input.style.keywords).slice(0, 8),
    };
  }

  const englishOnly = (values: string[] | undefined) =>
    normalizeList(values ?? []).filter((value) => !hasCjk(value));
  const required = englishOnly(input.style.doListEn);
  const forbidden = englishOnly(input.style.dontListEn);
  const keywords = englishOnly(input.style.keywordsEn);

  return {
    required:
      required.length > 0
        ? required.slice(0, 8)
        : ["Preserve the selected style's defining hierarchy and component treatment."],
    forbidden:
      forbidden.length > 0
        ? forbidden.slice(0, 8)
        : ["Do not replace the selected direction with generic component-library defaults."],
    keywords: keywords.slice(0, 8),
  };
}

function optionalFieldCount(input: ProjectImplementationBriefInput): number {
  return [
    normalizeList(input.stacks).length > 0,
    normalizeList(input.requiredItems).length > 0,
    normalizeList(input.requiredStates).length > 0,
    normalizeList(input.brandPersonality).length > 0,
    normalizeList(input.antiReferences).length > 0,
    Boolean(normalizeText(input.additionalConstraints)),
  ].filter(Boolean).length;
}

export function getProjectBriefAnalyticsMetadata(
  input: ProjectImplementationBriefInput,
): ProjectBriefAnalyticsMetadata {
  const optionalCount = optionalFieldCount(input);
  const completionTier: ProjectBriefCompletionTier =
    optionalCount >= 4 ? "complete" : optionalCount >= 1 ? "guided" : "core";

  return {
    slug: input.style.styleSlug,
    locale: input.locale,
    project_type: input.projectType,
    stack_count: normalizeList(input.stacks).length,
    required_item_count: normalizeList(input.requiredItems).length,
    state_count: normalizeList(input.requiredStates).length,
    optional_field_count: optionalCount,
    completion_tier: completionTier,
    source: "style_detail",
  };
}

function buildEnglishBrief(input: ProjectImplementationBriefInput): string {
  const requiredItems = normalizeList(input.requiredItems);
  const requiredStates = normalizeList(input.requiredStates) as ProjectBriefState[];
  const personalities = normalizeList(input.brandPersonality);
  const antiReferences = normalizeList(input.antiReferences);
  const stacks = normalizeList(input.stacks) as ProjectBriefStack[];
  const rules = localizedStyleRules(input);
  const referencePath = `/en/styles/${input.style.styleSlug}`;

  return `# Project Implementation Brief

style_slug: ${input.style.styleSlug}
source_reference: ${referencePath}
artifact_type: deterministic implementation work order

## Operating Contract
- Inspect the repository, relevant files, and existing conventions before editing.
- Confirm that the requested task fits the current architecture; ask targeted questions when a material ambiguity remains.
- Keep the work inside the defined scope. Do not reformat, clean up, or fix unrelated code.
- Preserve working behavior and existing visual conventions outside this brief.

## Project Context
- Project type: ${projectTypeLabels.en[input.projectType]}
- Primary audience: ${normalizeText(input.audience)}
- Brand personality: ${personalities.length > 0 ? personalities.join(", ") : "Use the selected style without adding a separate brand layer."}

## Core Task
Implement the smallest coherent experience that lets the primary audience complete this task:

${normalizeText(input.primaryGoal)}

## Scope
### Required Pages, Sections, Or Flow Steps
${bulletList(requiredItems, "Derive only the minimum surfaces needed for the core task, then confirm the scope before expanding it.")}

### Explicit Boundaries
- Do not add adjacent product features that are not necessary for the core task.
- Do not replace the project's framework, routing, data layer, or component system.
${bulletList(antiReferences, "No additional visual exclusions were supplied; the style's forbidden rules still apply.")}

## Technical Constraints
- Target stack: ${stacks.length > 0 ? stacks.map((stack) => stackLabels[stack]).join(", ") : "Use and preserve the repository's existing stack."}
- Reuse existing components, tokens, utilities, data patterns, and dependencies where they fit.
- Do not add a dependency until the repository has been inspected and the dependency is demonstrably necessary.
- Additional constraint: ${normalizeText(input.additionalConstraints) || "No additional constraint supplied."}

## Required UI States
${
    requiredStates.length > 0
      ? requiredStates
          .map(
            (state) =>
              `- ${stateLabels.en[state]}: implement this state deliberately and keep layout, messaging, actions, and accessibility coherent.`,
          )
          .join("\n")
      : "- Identify which loading, empty, error, success, and disabled states apply to the core task. Implement only the applicable states and document any intentional omission."
  }

## Selected Style Direction
- Style: ${normalizeText(input.style.styleName)}
- Reference: ${referencePath}
- Style signals: ${rules.keywords.length > 0 ? rules.keywords.join(", ") : "Use the reference and required rules as the source of truth."}

### Required Style Rules
${bulletList(rules.required, "Follow the selected style reference consistently.")}

### Forbidden Style Rules
${bulletList(rules.forbidden, "Do not introduce generic visual defaults that conflict with the selected style.")}

## Responsive, Interaction, And Accessibility Requirements
- Define stable responsive behavior for narrow mobile, tablet, and desktop widths without horizontal overflow.
- Keep controls and dynamic states from shifting surrounding layout unexpectedly.
- Support keyboard operation, visible focus, semantic labels, and programmatically associated instructions and errors.
- Maintain WCAG AA text contrast and practical touch targets.
- Respect reduced-motion preferences and avoid motion that is required to understand or complete the task.

## Implementation Sequence
1. Inspect the repository and identify the smallest relevant file set, existing patterns, and test commands.
2. Restate the core task, scope, preservation boundaries, and unresolved assumptions before editing.
3. Implement the primary happy path using existing architecture and components.
4. Add the selected states, responsive behavior, keyboard behavior, and accessibility semantics.
5. Apply the required style rules and remove any forbidden or generic visual defaults.
6. Run focused tests, type checks, lint, and the relevant build or browser checks.
7. Review the final diff for unrelated changes, regressions, omissions, and style drift.

## Acceptance Checklist
${checklist([
    "The specified audience can complete the primary task end to end.",
    "Only required pages, sections, and flow steps were added or changed.",
    "Applicable loading, empty, error, success, and disabled states are complete and coherent.",
    "The result remains usable at narrow mobile and desktop widths with no horizontal overflow.",
    "All interactive elements work by keyboard and have visible focus and accessible names.",
    "Reduced-motion preferences are respected, and text contrast meets WCAG AA.",
    `The result is recognizably ${normalizeText(input.style.styleName)} and follows every required and forbidden style rule.`,
    "Existing architecture and unrelated visual behavior were preserved.",
    "Focused tests, lint, type checks, and relevant build or browser checks pass.",
    "Review the final diff and report changed files, verification performed, and remaining limitations.",
  ])}`;
}

function buildChineseBrief(input: ProjectImplementationBriefInput): string {
  const requiredItems = normalizeList(input.requiredItems);
  const requiredStates = normalizeList(input.requiredStates) as ProjectBriefState[];
  const personalities = normalizeList(input.brandPersonality);
  const antiReferences = normalizeList(input.antiReferences);
  const stacks = normalizeList(input.stacks) as ProjectBriefStack[];
  const rules = localizedStyleRules(input);
  const referencePath = `/styles/${input.style.styleSlug}`;

  return `# 项目实施简报

style_slug: ${input.style.styleSlug}
source_reference: ${referencePath}
artifact_type: 确定性实施工作单

## 执行约定
- 修改前先检查仓库、相关文件和已有工程约定。
- 确认任务适合当前架构；若仍有影响实现的歧义，先提出少量针对性问题。
- 严格限制在定义的范围内，不格式化、清理或修复无关代码。
- 保留本简报范围之外已经正常工作的行为和视觉约定。

## 项目上下文
- 项目类型：${projectTypeLabels.zh[input.projectType]}
- 主要用户：${normalizeText(input.audience)}
- 品牌调性：${personalities.length > 0 ? personalities.join("、") : "不额外添加品牌层，直接遵循所选风格。"}

## 核心任务
实现能够让主要用户完成以下任务的最小完整体验：

${normalizeText(input.primaryGoal)}

## 范围
### 必要页面、区块或流程步骤
${bulletList(requiredItems, "只推导完成核心任务所需的最少界面，并在扩大范围前确认。")}

### 明确边界
- 不添加核心任务不需要的相邻产品功能。
- 不替换项目现有框架、路由、数据层或组件系统。
${bulletList(antiReferences, "未提供额外视觉排除项，但仍必须执行该风格的禁止规则。")}

## 技术约束
- 目标技术栈：${stacks.length > 0 ? stacks.map((stack) => stackLabels[stack]).join("、") : "沿用并保留仓库现有技术栈。"}
- 优先复用已有组件、Token、工具函数、数据模式和依赖。
- 检查仓库并证明必要性之前，不新增依赖。
- 额外约束：${normalizeText(input.additionalConstraints) || "无额外约束。"}

## 必要界面状态
${
    requiredStates.length > 0
      ? requiredStates
          .map(
            (state) =>
              `- ${stateLabels.zh[state]}：明确实现该状态，并保持布局、信息、操作和可访问性一致。`,
          )
          .join("\n")
      : "- 识别适用的加载、空、错误、成功和禁用状态；只实现与核心任务有关的状态，并说明有意省略的状态。"
  }

## 所选风格方向
- 风格：${normalizeText(input.style.styleName)}
- 参考：${referencePath}
- 风格信号：${rules.keywords.length > 0 ? rules.keywords.join("、") : "以参考页面和必要规则为准。"}

### 必须遵守的风格规则
${bulletList(rules.required, "始终一致地遵循所选风格参考。")}

### 禁止的风格规则
${bulletList(rules.forbidden, "不要引入与所选风格冲突的通用视觉默认值。")}

## 响应式、交互与可访问性要求
- 明确窄屏手机、平板和桌面宽度下的稳定响应式行为，不出现横向溢出。
- 控件和动态状态不得导致周围布局意外跳动。
- 支持键盘操作、清晰焦点、语义化标签，以及程序化关联的说明和错误信息。
- 保持 WCAG AA 文字对比度和合理的触控目标。
- 尊重 reduced-motion 偏好，不能依赖动效理解或完成任务。

## 实现顺序
1. 检查仓库，确定最小相关文件集、已有模式和测试命令。
2. 编辑前复述核心任务、范围、保留边界和未解决假设。
3. 使用现有架构和组件实现主要成功路径。
4. 补齐所选状态、响应式行为、键盘行为和可访问性语义。
5. 应用必须遵守的风格规则，移除禁止项和冲突的通用视觉默认值。
6. 运行聚焦测试、类型检查、lint，以及相关构建或浏览器检查。
7. 检查最终 diff，排除无关改动、回归、遗漏和风格漂移。

## 验收清单
${checklist([
    "指定用户可以端到端完成核心任务。",
    "只新增或修改了必要页面、区块和流程步骤。",
    "适用的加载、空、错误、成功和禁用状态完整且一致。",
    "窄屏手机和桌面宽度均可使用，不存在横向溢出。",
    "所有交互元素都支持键盘操作，并有清晰焦点和可访问名称。",
    "尊重 reduced-motion 偏好，文字对比度达到 WCAG AA。",
    `结果能够识别为${normalizeText(input.style.styleName)}，并遵守全部必须和禁止规则。`,
    "保留了现有架构和范围外的视觉行为。",
    "聚焦测试、lint、类型检查和相关构建或浏览器检查全部通过。",
    "检查最终 diff，并报告修改文件、验证过程和剩余限制。",
  ])}`;
}

export function buildProjectImplementationBrief(
  input: ProjectImplementationBriefInput,
): string {
  const validation = validateProjectImplementationBriefInput(input);
  if (!validation.valid) {
    throw new ProjectBriefValidationError(validation.issues);
  }

  return input.locale === "zh" ? buildChineseBrief(input) : buildEnglishBrief(input);
}
