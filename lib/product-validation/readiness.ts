export type ProductValidationReadinessInput = {
  hmacSecretConfigured: boolean;
  adminApiConfigured: boolean;
  offerSnapshotVerified: boolean;
  remoteTables: Record<
    "product_validation_participants" | "product_validation_events" | "product_validation_interviews",
    boolean
  >;
  licenseReviewStatus: string;
  publicSaleAuthorized: boolean;
  experimentLifecycle: "planned" | "collecting" | "ended";
  checkoutProviderConfigured: boolean;
  qualifiedVisitors: number;
  qualifiedInterviews: number;
  minimumQualifiedVisitors: number;
  minimumQualifiedInterviews: number;
};

export type ProductValidationReadinessCheck = {
  id: string;
  status: "pass" | "blocked" | "pending" | "warning";
  message: string;
};

export type ProductValidationReadinessReport = {
  status: "ready" | "blocked";
  checks: ProductValidationReadinessCheck[];
};

export function evaluateProductValidationReadiness(
  input: ProductValidationReadinessInput,
): ProductValidationReadinessReport {
  const checks: ProductValidationReadinessCheck[] = [
    {
      id: "hmac-secret",
      status: input.hmacSecretConfigured ? "pass" : "blocked",
      message: input.hmacSecretConfigured
        ? "PRODUCT_VALIDATION_HMAC_SECRET 已配置且长度合格。"
        : "缺少至少 32 字符的 PRODUCT_VALIDATION_HMAC_SECRET，无法生成稳定去标识身份。",
    },
    {
      id: "admin-api",
      status: input.adminApiConfigured ? "pass" : "warning",
      message: input.adminApiConfigured
        ? "管理员 API 凭据已配置。"
        : "未配置 ADMIN_API_TOKEN；若没有可用管理员登录态，权威导出与访谈录入不可用。",
    },
    {
      id: "offer-snapshot",
      status: input.offerSnapshotVerified ? "pass" : "blocked",
      message: input.offerSnapshotVerified
        ? "冻结 Offer 文件、哈希与实验契约一致。"
        : "冻结 Offer 文件或哈希校验失败。",
    },
    ...Object.entries(input.remoteTables).map(([table, ready]) => ({
      id: `remote-table:${table}`,
      status: ready ? ("pass" as const) : ("blocked" as const),
      message: ready ? `远端表 ${table} 可访问。` : `远端表 ${table} 不可访问；不能采集权威证据。`,
    })),
    {
      id: "experiment-window",
      status: input.experimentLifecycle === "collecting" ? "pass" : "pending",
      message:
        input.experimentLifecycle === "planned"
          ? "实验窗口尚未开始。"
          : input.experimentLifecycle === "ended"
            ? "实验窗口已经结束，应封存并评估数据。"
            : "实验处于冻结的采集窗口。",
    },
    {
      id: "commercial-license",
      status:
        input.licenseReviewStatus === "draft_requires_final_review" ? "blocked" : "pass",
      message:
        input.licenseReviewStatus === "draft_requires_final_review"
          ? "商业许可仍是待终审草案，E2 价格接受必须保持关闭。"
          : "商业许可已完成终审。",
    },
    {
      id: "public-sale",
      status: input.publicSaleAuthorized ? "pass" : "blocked",
      message: input.publicSaleAuthorized
        ? "公开销售已获明确授权。"
        : "公开销售未获授权，不得创建真实订单或对外宣称可购买。",
    },
    {
      id: "checkout-provider",
      status: input.checkoutProviderConfigured ? "pass" : "blocked",
      message: input.checkoutProviderConfigured
        ? "真实 checkout/订金证据渠道已配置。"
        : "没有真实 checkout 或不可退订金渠道，E3 强意向证据无法产生。",
    },
    {
      id: "qualified-visitors",
      status:
        input.qualifiedVisitors >= input.minimumQualifiedVisitors ? "pass" : "pending",
      message: `合格访客 ${input.qualifiedVisitors}/${input.minimumQualifiedVisitors}。`,
    },
    {
      id: "qualified-interviews",
      status:
        input.qualifiedInterviews >= input.minimumQualifiedInterviews ? "pass" : "pending",
      message: `合格访谈 ${input.qualifiedInterviews}/${input.minimumQualifiedInterviews}。`,
    },
  ];

  return {
    status: checks.some((check) => check.status === "blocked") ? "blocked" : "ready",
    checks,
  };
}
