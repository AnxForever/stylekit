#!/usr/bin/env tsx

import { styles } from "../../lib/styles";
import { detectStyleRuleConflicts } from "../../lib/styles/rule-normalizer";

interface StyleIssue {
  slug: string;
  doDont: string[];
  aiRules: string[];
}

function main(): void {
  const issues: StyleIssue[] = [];

  for (const style of styles) {
    const report = detectStyleRuleConflicts(style);
    if (report.doDont.length === 0 && report.aiRules.length === 0) continue;
    issues.push({
      slug: style.slug,
      doDont: report.doDont,
      aiRules: report.aiRules,
    });
  }

  if (issues.length === 0) {
    console.log("[lint:style-rules] PASS - no hard utility conflicts found.");
    return;
  }

  console.error("[lint:style-rules] FAIL - style rule conflicts detected:");
  for (const issue of issues) {
    if (issue.doDont.length > 0) {
      console.error(`- ${issue.slug} do/dont: ${issue.doDont.join(", ")}`);
    }
    if (issue.aiRules.length > 0) {
      console.error(`- ${issue.slug} aiRules: ${issue.aiRules.join(", ")}`);
    }
  }

  process.exitCode = 1;
}

main();

