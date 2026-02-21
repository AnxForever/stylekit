#!/usr/bin/env node

/*
 * Component preview health checker
 * - Scans style component code snippets in lib/styles/*.ts
 * - Flags patterns that are likely to cause broken/blank previews
 */

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = process.cwd();
const STYLES_DIR = path.join(PROJECT_ROOT, "lib", "styles");

const args = new Set(process.argv.slice(2));
const strict = args.has("--strict") || args.has("--fail-on-warn");
const json = args.has("--json");

/** @typedef {{ severity: "error"|"warn"|"info", style: string, file: string, component: string, rule: string, message: string }} Issue */

/**
 * @param {string} source
 * @param {number} openIndex
 */
function findMatchingBrace(source, openIndex) {
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let inLineComment = false;
  let inBlockComment = false;
  let escaped = false;

  for (let i = openIndex; i < source.length; i += 1) {
    const ch = source[i];
    const next = source[i + 1] || "";

    if (inLineComment) {
      if (ch === "\n") {
        inLineComment = false;
      }
      continue;
    }

    if (inBlockComment) {
      if (ch === "*" && next === "/") {
        inBlockComment = false;
        i += 1;
      }
      continue;
    }

    if (inSingle) {
      if (!escaped && ch === "'") {
        inSingle = false;
      }
      escaped = !escaped && ch === "\\";
      if (ch !== "\\") {
        escaped = false;
      }
      continue;
    }

    if (inDouble) {
      if (!escaped && ch === '"') {
        inDouble = false;
      }
      escaped = !escaped && ch === "\\";
      if (ch !== "\\") {
        escaped = false;
      }
      continue;
    }

    if (inTemplate) {
      if (!escaped && ch === "`") {
        inTemplate = false;
      }
      escaped = !escaped && ch === "\\";
      if (ch !== "\\") {
        escaped = false;
      }
      continue;
    }

    if (ch === "/" && next === "/") {
      inLineComment = true;
      i += 1;
      continue;
    }

    if (ch === "/" && next === "*") {
      inBlockComment = true;
      i += 1;
      continue;
    }

    if (ch === "'") {
      inSingle = true;
      escaped = false;
      continue;
    }

    if (ch === '"') {
      inDouble = true;
      escaped = false;
      continue;
    }

    if (ch === "`") {
      inTemplate = true;
      escaped = false;
      continue;
    }

    if (ch === "{") {
      depth += 1;
      continue;
    }

    if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        return i;
      }
      continue;
    }
  }

  return -1;
}

/**
 * @param {string} source
 * @param {string} key
 */
function findObjectBlockByKey(source, key) {
  const keyIdx = source.indexOf(`${key}:`);
  if (keyIdx < 0) {
    return null;
  }

  const openIdx = source.indexOf("{", keyIdx);
  if (openIdx < 0) {
    return null;
  }

  const closeIdx = findMatchingBrace(source, openIdx);
  if (closeIdx < 0) {
    return null;
  }

  return source.slice(openIdx + 1, closeIdx);
}

/**
 * @param {string} block
 */
function parseComponentEntries(block) {
  const entries = [];
  let i = 0;

  while (i < block.length) {
    while (i < block.length && /[\s,]/.test(block[i])) {
      i += 1;
    }

    if (i >= block.length) {
      break;
    }

    const keyMatch = /^[A-Za-z_][A-Za-z0-9_]*/.exec(block.slice(i));
    if (!keyMatch) {
      i += 1;
      continue;
    }

    const component = keyMatch[0];
    i += component.length;

    while (i < block.length && /\s/.test(block[i])) {
      i += 1;
    }

    if (block[i] !== ":") {
      continue;
    }
    i += 1;

    while (i < block.length && /\s/.test(block[i])) {
      i += 1;
    }

    if (block[i] !== "{") {
      continue;
    }

    const openIdx = i;
    const closeIdx = findMatchingBrace(block, openIdx);
    if (closeIdx < 0) {
      break;
    }

    const body = block.slice(openIdx + 1, closeIdx);
    entries.push({ component, body });
    i = closeIdx + 1;
  }

  return entries;
}

/**
 * @param {string} objectBody
 * @param {string} field
 */
function extractTemplateField(objectBody, field) {
  const fieldRe = new RegExp(`\\b${field}\\s*:\\s*`);
  const match = fieldRe.exec(objectBody);
  if (!match) {
    return null;
  }

  let i = (match.index || 0) + match[0].length;
  while (i < objectBody.length && /\s/.test(objectBody[i])) {
    i += 1;
  }

  if (objectBody[i] !== "`") {
    return null;
  }

  i += 1;
  let start = i;
  let escaped = false;

  while (i < objectBody.length) {
    const ch = objectBody[i];
    if (!escaped && ch === "`") {
      return objectBody.slice(start, i);
    }
    escaped = !escaped && ch === "\\";
    if (ch !== "\\") {
      escaped = false;
    }
    i += 1;
  }

  return null;
}

/**
 * @param {string} source
 */
function extractStyleSlug(source) {
  const match = /\bslug\s*:\s*"([^"]+)"/.exec(source);
  return match ? match[1] : "unknown-style";
}

/**
 * @param {string} fileName
 */
function shouldSkipFile(fileName) {
  if (!fileName.endsWith(".ts")) {
    return true;
  }

  return (
    fileName.endsWith("-tokens.ts") ||
    fileName === "index.ts" ||
    fileName === "meta.ts" ||
    fileName === "token-defaults.ts" ||
    fileName === "types.ts" ||
    fileName.startsWith("__tests__") ||
    fileName.includes("test") ||
    fileName.includes("runtime")
  );
}

/**
 * @param {string} code
 * @param {boolean} hasPreview
 * @param {{ style: string, file: string, component: string }} context
 * @returns {Issue[]}
 */
function analyzeComponentCode(code, hasPreview, context) {
  const issues = [];
  const trimmed = code.trim();

  if (!trimmed) {
    issues.push({
      severity: "error",
      ...context,
      rule: "empty-code",
      message: "Component code is empty.",
    });
    return issues;
  }

  if (/<(script|iframe|object|embed)\b/i.test(trimmed) || /\b(document|window)\./.test(trimmed)) {
    issues.push({
      severity: "error",
      ...context,
      rule: "unsafe-dom-pattern",
      message: "Code contains unsafe DOM/runtime patterns for preview rendering.",
    });
  }

  if (/\bclassName\s*=\s*["'][^"']*\bfixed\b/i.test(trimmed) || /\bposition\s*:\s*fixed\b/i.test(trimmed)) {
    issues.push({
      severity: "warn",
      ...context,
      rule: "fixed-position",
      message: "Uses fixed positioning; verify preview placement and clipping.",
    });
  }

  if (/\{[\s\S]*?\.map\(/.test(trimmed) || /\{[\s\S]*?=>/.test(trimmed)) {
    if (hasPreview) {
      issues.push({
        severity: "info",
        ...context,
        rule: "dynamic-jsx-with-preview",
        message:
          "Contains dynamic JSX expressions but has explicit preview fallback.",
      });
    } else {
      issues.push({
        severity: "warn",
        ...context,
        rule: "dynamic-jsx-no-preview",
        message: "Contains dynamic JSX expressions but no explicit preview field.",
      });
    }
  }

  if (/\b(h-screen|min-h-screen|w-screen)\b/.test(trimmed)) {
    issues.push({
      severity: "info",
      ...context,
      rule: "viewport-size-classes",
      message: "Uses viewport-sized classes; verify mobile/desktop preview fit.",
    });
  }

  return issues;
}

/** @type {Issue[]} */
const issues = [];
let scannedStyles = 0;
let scannedComponents = 0;

if (!fs.existsSync(STYLES_DIR)) {
  console.error("[component-preview-check] Missing directory: lib/styles");
  process.exit(1);
}

const files = fs
  .readdirSync(STYLES_DIR)
  .filter((fileName) => !shouldSkipFile(fileName))
  .sort();

for (const fileName of files) {
  const filePath = path.join(STYLES_DIR, fileName);
  const source = fs.readFileSync(filePath, "utf8");

  if (!source.includes("components:")) {
    continue;
  }

  const style = extractStyleSlug(source);
  const componentsBlock = findObjectBlockByKey(source, "components");
  if (!componentsBlock) {
    issues.push({
      severity: "error",
      style,
      file: `lib/styles/${fileName}`,
      component: "*",
      rule: "components-block-missing",
      message: "Found components key but failed to parse its object block.",
    });
    continue;
  }

  const componentEntries = parseComponentEntries(componentsBlock);
  if (componentEntries.length === 0) {
    issues.push({
      severity: "error",
      style,
      file: `lib/styles/${fileName}`,
      component: "*",
      rule: "no-components-found",
      message: "No component definitions detected in components block.",
    });
    continue;
  }

  scannedStyles += 1;

  for (const entry of componentEntries) {
    scannedComponents += 1;
    const code = extractTemplateField(entry.body, "code");
    const hasPreviewField = /\bpreview\s*:/.test(entry.body);

    if (code == null) {
      issues.push({
        severity: "error",
        style,
        file: `lib/styles/${fileName}`,
        component: entry.component,
        rule: "code-field-missing",
        message: "Missing template-literal code field.",
      });
      continue;
    }

    issues.push(
      ...analyzeComponentCode(code, hasPreviewField, {
        style,
        file: `lib/styles/${fileName}`,
        component: entry.component,
      })
    );
  }
}

const errors = issues.filter((issue) => issue.severity === "error");
const warnings = issues.filter((issue) => issue.severity === "warn");
const infos = issues.filter((issue) => issue.severity === "info");

if (json) {
  const payload = {
    scannedStyles,
    scannedComponents,
    summary: {
      errors: errors.length,
      warnings: warnings.length,
      infos: infos.length,
    },
    issues,
  };
  console.log(JSON.stringify(payload, null, 2));
} else {
  console.log(
    `[component-preview-check] Scanned ${scannedStyles} styles, ${scannedComponents} components.`
  );

  if (issues.length === 0) {
    console.log("[component-preview-check] OK. No preview risks detected.");
  } else {
    for (const issue of issues) {
      const label = issue.severity.toUpperCase().padEnd(5, " ");
      console.log(
        `[component-preview-check] ${label} ${issue.style}.${issue.component} (${issue.rule}) - ${issue.message} [${issue.file}]`
      );
    }

    console.log(
      `[component-preview-check] Summary: ${errors.length} error(s), ${warnings.length} warning(s), ${infos.length} info item(s).`
    );
  }
}

if (errors.length > 0 || (strict && warnings.length > 0)) {
  process.exit(1);
}

process.exit(0);
