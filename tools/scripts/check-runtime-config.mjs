import { readFileSync, statSync } from "node:fs";
import path from "node:path";

const failures = [];
const warnings = [];
const envFileValues = readEnvFile(path.join(process.cwd(), ".env.local"));
const get = (name) => process.env[name]?.trim() || envFileValues[name]?.trim() || "";
const has = (name) => Boolean(get(name));

const plaintextPassword = has("ADMIN_PASSWORD");
const passwordHash = get("ADMIN_PASSWORD_SHA256");
if (plaintextPassword) {
  failures.push("ADMIN_PASSWORD 仍为明文配置，请迁移到 ADMIN_PASSWORD_SHA256。");
}
if (passwordHash && !/^[0-9a-f]{64}$/i.test(passwordHash)) {
  failures.push("ADMIN_PASSWORD_SHA256 必须是 64 位十六进制 SHA-256 哈希。");
}
if ((passwordHash || plaintextPassword) && !has("ADMIN_SESSION_SECRET") && !has("ADMIN_API_TOKEN")) {
  failures.push("管理员密码已配置，但缺少 ADMIN_SESSION_SECRET 或 ADMIN_API_TOKEN。");
}

const supabaseUrl = has("NEXT_PUBLIC_SUPABASE_URL");
const supabaseServiceRole = has("SUPABASE_SERVICE_ROLE_KEY");
if (supabaseUrl !== supabaseServiceRole) {
  failures.push("NEXT_PUBLIC_SUPABASE_URL 与 SUPABASE_SERVICE_ROLE_KEY 必须同时配置或同时为空。");
}

const envLocalPath = path.join(process.cwd(), ".env.local");
try {
  const mode = statSync(envLocalPath).mode & 0o777;
  if ((mode & 0o077) !== 0) {
    failures.push(".env.local 对组用户或其他用户可读写，建议权限设为 600。");
  }
} catch {
  // Production may use platform environment variables instead of .env.local.
}

function readEnvFile(filePath) {
  let contents;
  try {
    contents = readFileSync(filePath, "utf8");
  } catch {
    return {};
  }

  const values = {};
  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match) continue;
    const [, name, rawValue] = match;
    values[name] = rawValue.replace(/^(['"])(.*)\1$/, "$2");
  }
  return values;
}

if (has("PACK_CHECKOUT_PROVIDER")) {
  warnings.push("PACK_CHECKOUT_PROVIDER 已设置；只有真实 checkout/订金链路完成审计后才可使用。");
}

for (const message of failures) console.error(`[check:runtime-config] BLOCKED ${message}`);
for (const message of warnings) console.warn(`[check:runtime-config] WARNING ${message}`);

if (failures.length > 0) {
  console.error(`[check:runtime-config] BLOCKED (${failures.length} 项)`);
  process.exitCode = 1;
} else {
  console.log(`[check:runtime-config] OK${warnings.length ? ` (${warnings.length} 条提醒)` : ""}`);
}
