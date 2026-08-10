import { PROJECT_BRIEF_ANALYTICS_SIGNAL_VERSION } from "@/lib/admin/analytics-api-contract";

export type SystemPreflightStatus = "ready" | "warning" | "blocked";
export type SystemPreflightSeverity = "required" | "recommended" | "manual";

export interface SystemPreflightCheck {
  id: string;
  label: string;
  status: SystemPreflightStatus;
  severity: SystemPreflightSeverity;
  summary: string;
  nextStep: string;
  migration?: string;
}

export interface AdminSystemPreflightData {
  generatedAt: string;
  overall: SystemPreflightStatus;
  checks: SystemPreflightCheck[];
}

export interface SystemPreflightInput {
  auth: {
    sessionSecretConfigured: boolean;
    passwordConfigured: boolean;
    passwordPlaintextConfigured: boolean;
    passwordSha256Configured: boolean;
    adminTokenConfigured: boolean;
    adminUserIdsConfigured: boolean;
  };
  supabaseConfigured: boolean;
  analyticsSignalVersion: number | null;
  tables: Record<string, boolean>;
  localFiles: Record<string, boolean>;
}

const CONTENT_TABLES = ["site_announcements", "support_acknowledgments"];
const KNOWLEDGE_TABLES = [
  "knowledge_resources",
  "knowledge_ingest_runs",
  "knowledge_reviews",
  "knowledge_publications",
  "knowledge_search_documents",
  "knowledge_audit_events",
];
const PRODUCT_VALIDATION_TABLES = [
  "product_validation_participants",
  "product_validation_events",
  "product_validation_interviews",
];

function missingNames(values: Record<string, boolean>, keys: string[]) {
  return keys.filter((key) => values[key] !== true);
}

function tableCheck(
  values: Record<string, boolean>,
  keys: string[],
  label: string,
  severity: SystemPreflightSeverity,
  migration: string,
  nextStep: string,
): SystemPreflightCheck {
  const missing = missingNames(values, keys);
  if (missing.length === 0) {
    return {
      id: label,
      label,
      status: "ready",
      severity,
      summary: `已确认 ${keys.length} 张相关数据表可访问。`,
      nextStep: "保留当前迁移记录，发布前再次刷新本检查。",
      migration,
    };
  }

  return {
    id: label,
    label,
    status: severity === "required" ? "blocked" : "warning",
    severity,
    summary: `缺少或无法访问：${missing.join("、")}。`,
    nextStep,
    migration,
  };
}

export function getSystemPreflightOverallStatus(
  checks: SystemPreflightCheck[],
): SystemPreflightStatus {
  if (checks.some((check) => check.status === "blocked" && check.severity === "required")) {
    return "blocked";
  }
  if (checks.some((check) => check.status !== "ready")) {
    return "warning";
  }
  return "ready";
}

export function buildSystemPreflightChecks(
  input: SystemPreflightInput,
): SystemPreflightCheck[] {
  const checks: SystemPreflightCheck[] = [];
  const hasAlternativeAdminAccess =
    input.auth.adminTokenConfigured || input.auth.adminUserIdsConfigured;

  if (input.auth.passwordConfigured && !input.auth.sessionSecretConfigured) {
    checks.push({
      id: "admin-auth",
      label: "管理员认证",
      status: "blocked",
      severity: "required",
      summary: "已配置密码，但缺少管理员会话密钥。",
      nextStep: "配置 ADMIN_SESSION_SECRET 后再发布。",
    });
  } else if (
    !input.auth.passwordConfigured &&
    !hasAlternativeAdminAccess
  ) {
    checks.push({
      id: "admin-auth",
      label: "管理员认证",
      status: "blocked",
      severity: "required",
      summary: "没有可用的密码、管理员令牌或管理员用户白名单。",
      nextStep: "配置哈希密码，或配置 ADMIN_API_TOKEN / ADMIN_USER_IDS。",
    });
  } else if (
    input.auth.passwordConfigured &&
    input.auth.passwordPlaintextConfigured &&
    !input.auth.passwordSha256Configured
  ) {
    checks.push({
      id: "admin-auth",
      label: "管理员认证",
      status: "warning",
      severity: "required",
      summary: "当前仍使用明文 ADMIN_PASSWORD，登录可用但不符合推荐配置。",
      nextStep: "确认收付后，把 ADMIN_PASSWORD 迁移为 ADMIN_PASSWORD_SHA256。",
    });
  } else if (
    input.auth.passwordConfigured &&
    input.auth.passwordPlaintextConfigured &&
    input.auth.passwordSha256Configured
  ) {
    checks.push({
      id: "admin-auth",
      label: "管理员认证",
      status: "warning",
      severity: "required",
      summary: "同时存在密码环境变量；当前代码会优先使用 ADMIN_PASSWORD。",
      nextStep: "确认哈希登录正常后移除 ADMIN_PASSWORD，仅保留哈希配置。",
    });
  } else {
    checks.push({
      id: "admin-auth",
      label: "管理员认证",
      status: "ready",
      severity: "required",
      summary: input.auth.passwordSha256Configured
        ? "已配置 SHA-256 管理员密码和会话密钥。"
        : "已配置可用的管理员替代入口。",
      nextStep: "发布前执行一次管理员登录验收。",
    });
  }

  checks.push({
    id: "supabase",
    label: "Supabase 连接",
    status: input.supabaseConfigured ? "ready" : "blocked",
    severity: "required",
    summary: input.supabaseConfigured
      ? "服务端 Supabase 客户端已配置。"
      : "服务端 Supabase URL 或 service role key 未配置。",
    nextStep: input.supabaseConfigured
      ? "发布前刷新一次表存在性检查。"
      : "配置 NEXT_PUBLIC_SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY。",
  });

  if (input.analyticsSignalVersion === PROJECT_BRIEF_ANALYTICS_SIGNAL_VERSION) {
    checks.push({
      id: "analytics-signal",
      label: "实施意向聚合",
      status: "ready",
      severity: "recommended",
      summary: "已确认项目实施简报动作纳入后台实现意向统计。",
      nextStep: "保留 031 迁移记录，发布后继续观察 Explore → Apply 信号。",
      migration: "031_project_brief_analytics_signal.sql",
    });
  } else {
    checks.push({
      id: "analytics-signal",
      label: "实施意向聚合",
      status: "warning",
      severity: "recommended",
      summary: input.supabaseConfigured
        ? "远端聚合函数尚未报告 031 版本，实施简报行为可能未计入实现意向。"
        : "尚未连接 Supabase，暂时无法确认实施意向聚合版本。",
      nextStep: "确认收付后应用 031_project_brief_analytics_signal.sql，再刷新本检查。",
      migration: "031_project_brief_analytics_signal.sql",
    });
  }

  checks.push(
    tableCheck(
      input.tables,
      CONTENT_TABLES,
      "公告与赞助",
      "required",
      "029_support_acknowledgments.sql + 030_site_announcements.sql",
      "先应用缺失迁移，再验收公告和赞助截图上传。",
    ),
  );
  checks.push(
    tableCheck(
      input.tables,
      KNOWLEDGE_TABLES,
      "知识库后台",
      "recommended",
      "026_knowledge_base.sql + 027_knowledge_manifest_hash.sql + 028_knowledge_search_document_locale.sql",
      "如果本次发布包含知识库功能，先应用知识库迁移。",
    ),
  );
  checks.push(
    tableCheck(
      input.tables,
      PRODUCT_VALIDATION_TABLES,
      "产品验证数据",
      "recommended",
      "015_product_validation.sql",
      "产品验证页面会保持明确的迁移提示；确认要启用时再应用该迁移。",
    ),
  );

  const opsFiles = Object.values(input.localFiles);
  const opsReady = opsFiles.length > 0 && opsFiles.every(Boolean);
  checks.push({
    id: "ops-tools",
    label: "运维工具",
    status: opsReady ? "ready" : "warning",
    severity: "recommended",
    summary: opsReady
      ? "健康检查、清理和验收脚本均存在。"
      : "本地运维脚本不完整，不能把发布后的验收交给自动化。",
    nextStep: opsReady
      ? "部署确认后运行只读验收脚本。"
      : "补齐 ops 下的健康检查、清理和生产验收脚本。",
  });

  checks.push({
    id: "payment-confirmation",
    label: "收付确认",
    status: "warning",
    severity: "manual",
    summary: "发布闸门仍等待你确认收付已核对完成。",
    nextStep: "你明确确认后，才进入生产迁移和部署步骤。",
  });

  return checks;
}

export function buildAdminSystemPreflight(
  input: SystemPreflightInput,
  generatedAt = new Date().toISOString(),
): AdminSystemPreflightData {
  const checks = buildSystemPreflightChecks(input);
  return {
    generatedAt,
    overall: getSystemPreflightOverallStatus(checks),
    checks,
  };
}
