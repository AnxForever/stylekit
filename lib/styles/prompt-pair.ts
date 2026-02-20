import { buildStyleCopyIdentity } from "./style-copy-identity";

export interface PromptPairInput {
  styleName: string;
  styleSlug: string;
  aiRules: string;
  enhancedRules?: string | null;
  doList: string[];
  dontList: string[];
  keywords: string[];
}

export interface PromptPairContent {
  hardPrompt: string;
  softPrompt: string;
}

function pickUnique(values: string[], limit: number): string[] {
  const seen = new Set<string>();
  const picked: string[] = [];

  for (const value of values) {
    const item = value.trim();
    if (!item) continue;
    if (seen.has(item)) continue;
    seen.add(item);
    picked.push(item);
    if (picked.length >= limit) break;
  }

  return picked;
}

function toBulletList(values: string[]): string {
  if (values.length === 0) {
    return "- (none)";
  }

  return values.map((value) => `- ${value}`).join("\n");
}

export function buildHardPrompt(input: PromptPairInput): string {
  const identity = buildStyleCopyIdentity({
    styleName: input.styleName,
    styleSlug: input.styleSlug,
  });
  const sourceRules = (input.enhancedRules || input.aiRules).trim();

  return `${identity}

# Hard Prompt

请严格遵守以下风格规则并保持一致性，禁止风格漂移。

## 执行要求
- 优先保证风格一致性，其次再做创意延展。
- 遇到冲突时以禁止项为最高优先级。
- 输出前自检：颜色、排版、间距、交互是否仍属于该风格。

## Style Rules
${sourceRules}`;
}

export function buildSoftPrompt(input: PromptPairInput): string {
  const identity = buildStyleCopyIdentity({
    styleName: input.styleName,
    styleSlug: input.styleSlug,
  });

  const keywords = pickUnique(input.keywords, 6);
  const dos = pickUnique(input.doList, 4);
  const donts = pickUnique(input.dontList, 3);

  return `${identity}

# Soft Prompt

保持整体风格气质即可，允许实现细节灵活调整，但不要偏离核心视觉语言。

## Style Signals
${toBulletList(keywords)}

## Prefer
${toBulletList(dos)}

## Avoid
${toBulletList(donts)}

## Output Guidance
- 先保证整体风格识别度，再优化细节。
- 避免过度炫技，保持可读性与可维护性。`;
}

export function buildPromptPair(input: PromptPairInput): PromptPairContent {
  return {
    hardPrompt: buildHardPrompt(input),
    softPrompt: buildSoftPrompt(input),
  };
}
