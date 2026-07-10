import type { ProductValidationResult } from "@/lib/product-validation/evaluate";

function formatRate(basisPoints: number): string {
  return `${(basisPoints / 100).toFixed(2)}%`;
}

export function renderProductValidationReport(
  result: ProductValidationResult,
): string {
  const lines = [
    `# Product Validation Report: ${result.experimentId}`,
    "",
    `Offer version: ${result.offerVersion}`,
    `Evaluated at: ${result.evaluatedAt}`,
    `Decision: ${result.decision}`,
    "",
    "## Online evidence",
    "",
    `Status: ${result.online.status}`,
    `Qualified visitors: ${result.online.qualifiedVisitors} / ${result.online.targetQualifiedVisitors}`,
    `Soft intent: ${result.online.softIntentPeople} (${formatRate(result.online.softIntentRateBps)})`,
    `Strong intent: ${result.online.strongIntentPeople} (${formatRate(result.online.strongIntentRateBps)})`,
    `Purchasers: ${result.online.purchasers}`,
  ];

  for (const [variantId, variant] of Object.entries(result.online.variants)) {
    lines.push(
      `- ${variantId}: visitors ${variant.qualifiedVisitors}, soft ${variant.softIntentPeople}, strong ${variant.strongIntentPeople}, ${variant.status}`,
    );
  }

  lines.push(
    "",
    "## Interview evidence",
    "",
    `Status: ${result.interviews.status}`,
    `Qualified interviews: ${result.interviews.qualifiedInterviews} / ${result.interviews.targetQualifiedInterviews}`,
    `Price acceptances: ${result.interviews.priceAcceptances}`,
    `Deposit-link requests: ${result.interviews.depositLinkRequests}`,
    `Non-refundable deposits: ${result.interviews.nonRefundableDeposits}`,
  );

  for (const [variantId, variant] of Object.entries(result.interviews.variants)) {
    lines.push(
      `- ${variantId}: interviews ${variant.qualifiedInterviews}, accepted ${variant.priceAcceptances}, deposit links ${variant.depositLinkRequests}, ${variant.sampleStatus}`,
    );
  }

  lines.push(
    "",
    "## Economics forecast",
    "",
    `Status: ${result.economics.status}`,
    `Currency: ${result.economics.currency}`,
    `Fixed cost (minor units): ${result.economics.fixedCostMinor}`,
    `Maximum accepted break-even units: ${result.economics.maximumBreakEvenUnits}`,
  );

  for (const [variantId, variant] of Object.entries(result.economics.variants)) {
    lines.push(
      `- ${variantId}: contribution ${variant.contributionMinor}, margin ${formatRate(variant.contributionMarginBps)}, break-even ${variant.breakEvenUnits ?? "never"}, ${variant.status}`,
    );
  }

  lines.push(
    "",
    "## Private Brand Kit",
    "",
    `Demand status: ${result.brandKit.status}`,
    `Economics status: ${result.brandKit.economicsStatus}`,
    `Qualified conversations: ${result.brandKit.qualifiedConversations}`,
    `Proposal requests: ${result.brandKit.proposalRequests}`,
    `Paid commitments: ${result.brandKit.paidCommitments}`,
    `Contribution (minor units): ${result.brandKit.contributionMinor ?? "not evaluated"}`,
  );

  lines.push("", "## Issues", "");
  if (result.issues.length === 0) {
    lines.push("- None");
  } else {
    for (const issue of result.issues) {
      lines.push(`- [${issue.severity}] ${issue.code}: ${issue.message}`);
    }
  }

  return `${lines.join("\n")}\n`;
}
