import { auditProductTruth } from "@/lib/product-truth/audit";

async function main(): Promise<void> {
  const report = await auditProductTruth(process.cwd());

  if (report.issues.length === 0) {
    console.log("[check:product-truth] PASS - public claims match working repository capabilities.");
    return;
  }

  console.error(`[check:product-truth] FAIL - ${report.issues.length} issue(s) found:`);
  for (const issue of report.issues) {
    console.error(`- [${issue.code}] ${issue.source}: ${issue.message}`);
  }
  process.exitCode = 1;
}

void main();
