#!/usr/bin/env node

/**
 * Lightweight repository secret scanner for tracked files.
 *
 * Goals:
 * - block accidental commits of high-risk file types (.env, private keys, etc.)
 * - detect common token/key formats and private key blocks
 * - keep dependencies zero (Node built-ins only)
 */

const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const MAX_FILE_SIZE_BYTES = 1024 * 1024;

const SECRET_PATTERNS = [
  {
    name: "Private key block",
    regex: /-----BEGIN(?: RSA| EC| OPENSSH)? PRIVATE KEY-----/,
  },
  {
    name: "GitHub personal access token",
    regex: /\b(?:ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})\b/,
  },
  {
    name: "GitLab personal access token",
    regex: /\bglpat-[A-Za-z0-9_-]{20,}\b/,
  },
  {
    name: "Slack token",
    regex: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/,
  },
  {
    name: "OpenAI key",
    regex: /\b(?:sk-proj-[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9]{20,})\b/,
  },
  {
    name: "Anthropic key",
    regex: /\bsk-ant-[A-Za-z0-9_-]{20,}\b/,
  },
  {
    name: "Google API key",
    regex: /\bAIza[0-9A-Za-z_-]{20,}\b/,
  },
  {
    name: "AWS access key ID",
    regex: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/,
  },
  {
    name: "Stripe live key",
    regex: /\b(?:sk_live|rk_live)_[0-9A-Za-z]{16,}\b/,
  },
  {
    name: "Credentialed connection string",
    regex: /\b(?:postgres|mysql|mongodb(?:\+srv)?|redis):\/\/[^\s:@/]+:[^\s@/]+@/i,
  },
  {
    name: "Hardcoded secret assignment",
    regex:
      /\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|service[_-]?role[_-]?key|secret|password|passwd)\b\s*[:=]\s*["'`](?<value>[^"'`\n]{12,})["'`]/i,
    ignoreIf: (line) => {
      const match = line.match(
        /\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|service[_-]?role[_-]?key|secret|password|passwd)\b\s*[:=]\s*["'`](?<value>[^"'`\n]{12,})["'`]/i
      );
      if (!match?.groups?.value) return false;
      const value = match.groups.value.toLowerCase();
      // Real credentials (API keys, tokens, passwords) never contain spaces.
      // Values with spaces are human-readable strings: error messages, labels,
      // descriptions, placeholder text, etc. — not actual secrets.
      if (value.includes(" ")) return true;
      return (
        value.includes("example") ||
        value.includes("placeholder") ||
        value.includes("changeme") ||
        value.includes("your_") ||
        value.includes("your-") ||
        value.includes("your ") ||
        value.includes("<") ||
        value.includes(">")
      );
    },
  },
];

const FORBIDDEN_PATH_RULES = [
  {
    name: "Environment file tracked in git",
    test: (file) =>
      /(^|\/)\.env(?:\.[^/]+)?$/i.test(file) &&
      !/(^|\/)\.env\.example$/i.test(file) &&
      !/(^|\/)example\.env$/i.test(file),
  },
  {
    name: "Private key/certificate file tracked in git",
    test: (file) => /\.(?:pem|key|p12|pfx|jks|keystore|crt|cer)$/i.test(file),
  },
  {
    name: "Private SSH key tracked in git",
    test: (file) => /(^|\/)(?:id_rsa|id_dsa|id_ed25519)$/i.test(file),
  },
  {
    name: "Credentials file tracked in git",
    test: (file) => /(^|\/)(?:\.npmrc|\.pypirc|\.netrc)$/i.test(file),
  },
  {
    name: "Service account credential file tracked in git",
    test: (file) => /service[-_]?account.*\.json$/i.test(path.basename(file)),
  },
];

function getTrackedFiles() {
  const raw = execSync("git ls-files -z", { encoding: "utf8" });
  return raw.split("\0").filter(Boolean).map((f) => f.replace(/\\/g, "/"));
}

function looksBinary(buffer) {
  const size = Math.min(buffer.length, 4096);
  for (let i = 0; i < size; i += 1) {
    if (buffer[i] === 0) return true;
  }
  return false;
}

function formatFinding(finding) {
  if (finding.line) {
    return `${finding.file}:${finding.line}  ${finding.type}\n  ${finding.preview}`;
  }
  return `${finding.file}  ${finding.type}`;
}

function main() {
  const findings = [];
  const files = getTrackedFiles();

  for (const file of files) {
    for (const rule of FORBIDDEN_PATH_RULES) {
      if (rule.test(file)) {
        findings.push({
          file,
          type: rule.name,
          preview: "(forbidden file path)",
        });
      }
    }

    let stat;
    try {
      stat = fs.statSync(file);
    } catch {
      continue;
    }

    if (!stat.isFile()) continue;
    if (stat.size > MAX_FILE_SIZE_BYTES) continue;

    let buffer;
    try {
      buffer = fs.readFileSync(file);
    } catch {
      continue;
    }

    if (looksBinary(buffer)) continue;

    const text = buffer.toString("utf8");
    const lines = text.split(/\r?\n/);

    lines.forEach((line, index) => {
      for (const pattern of SECRET_PATTERNS) {
        pattern.regex.lastIndex = 0;
        if (!pattern.regex.test(line)) continue;
        if (typeof pattern.ignoreIf === "function" && pattern.ignoreIf(line)) continue;

        findings.push({
          file,
          line: index + 1,
          type: pattern.name,
          preview: line.trim().slice(0, 220),
        });
      }
    });
  }

  if (findings.length === 0) {
    console.log("[check-secrets] OK. No obvious secrets found in tracked files.");
    return;
  }

  console.error(`[check-secrets] FAILED. Found ${findings.length} potential secret issue(s):\n`);
  findings.slice(0, 200).forEach((finding) => {
    console.error(formatFinding(finding));
  });
  if (findings.length > 200) {
    console.error(`... plus ${findings.length - 200} more finding(s).`);
  }
  process.exit(1);
}

main();
