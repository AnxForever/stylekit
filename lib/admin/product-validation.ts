export type ProductValidationReadinessCheck = {
  id: string;
  status: "pass" | "blocked" | "pending" | "warning";
  message: string;
};

export type ProductValidationReadinessReport = {
  status: "ready" | "blocked";
  checks: ProductValidationReadinessCheck[];
};

export type ProductValidationAdminData = {
  generatedAt: string;
  experiment: {
    id: string;
    offerVersion: string;
    packId: string;
    packVersion: string;
    lifecycle: "planned" | "collecting" | "ended";
    window: { start: string; end: string };
    variants: Array<{
      id: string;
      currency: string;
      amountMinor: number;
      qualifiedVisitors: number;
      offerExposures: number;
      priceExposures: number;
      priceAcceptances: number;
    }>;
  };
  funnel: {
    qualifiedVisitors: number;
    offerExposures: number;
    priceExposures: number;
    priceAcceptances: number;
    qualifiedInterviews: number;
    depositLinkRequests: number;
    checkoutStarts: number;
    depositsPaid: number;
  };
  readiness: ProductValidationReadinessReport;
  latestEvidenceAt: string | null;
};
