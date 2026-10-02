import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { lintStyleCode, type StyleLintComponent, type StyleLintReport } from "stylekit-core/styles";
import { knownSlug } from "./core.js";

const IGNORED = new Set(["node_modules", ".git", ".next", "dist", "build", "coverage", ".turbo"]);
const EXTENSIONS = new Set([".tsx", ".jsx", ".html", ".vue", ".svelte", ".ts", ".js"]);

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (IGNORED.has(entry.name) || entry.isSymbolicLink()) return [];
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(filename);
    return entry.isFile() && EXTENSIONS.has(path.extname(filename)) ? [filename] : [];
  });
}

function globRegex(pattern: string): RegExp {
  let result = "";
  for (let i = 0; i < pattern.length; i += 1) {
    const char = pattern[i];
    if (char === "*" && pattern[i + 1] === "*") {
      i += 1;
      if (pattern[i + 1] === "/") { result += "(?:.*/)?"; i += 1; }
      else result += ".*";
    } else if (char === "*") result += "[^/]*";
    else if (char === "?") result += "[^/]";
    else result += char.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
  }
  return new RegExp(`^${result}$`);
}

export function resolveLintFiles(patterns: string[]): string[] {
  const files = new Set<string>();
  for (const pattern of patterns) {
    const absolute = path.resolve(pattern).split(path.sep).join("/");
    const wildcard = absolute.search(/[*?]/);
    if (wildcard < 0) {
      const stats = statSync(absolute);
      if (stats.isDirectory()) walk(absolute).forEach((file) => files.add(file));
      else if (stats.isFile()) files.add(absolute);
      continue;
    }
    const base = absolute.slice(0, absolute.lastIndexOf("/", wildcard)) || "/";
    const regex = globRegex(absolute);
    for (const filename of walk(base)) if (regex.test(filename.split(path.sep).join("/"))) files.add(filename);
  }
  if (files.size === 0) throw new Error("No source files matched. Use paths, directories, or * / ** / ? globs.");
  return [...files].sort();
}

const escapeData = (value: string) => value.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
const escapeProperty = (value: string) => escapeData(value).replace(/:/g, "%3A").replace(/,/g, "%2C");

export function runLint(slug: string, patterns: string[], options: {
  stdin?: boolean; json?: boolean; format?: string; strict?: boolean; components?: string[];
}): void {
  if (!knownSlug(slug)) throw new Error(`Unknown style "${slug}". Run stylekit search to find a bundled slug.`);
  if (options.format && !["text", "json", "github"].includes(options.format)) throw new Error("--format must be text, json, or github.");
  if (options.components?.some((component) => !["button", "card", "input"].includes(component))) throw new Error("--component must be button, card, or input.");
  if (options.strict && !options.components?.length) throw new Error("--strict requires --component to identify the snippet's required classes.");
  if (options.stdin && patterns.length) throw new Error("Use either --stdin or file paths, not both.");
  if (!options.stdin && patterns.length === 0) throw new Error("Provide file paths, --files <glob>, or --stdin.");
  const files = options.stdin ? ["<stdin>"] : resolveLintFiles(patterns);
  const reports = files.map((filename) => ({
    file: filename === "<stdin>" ? filename : path.relative(process.cwd(), filename),
    report: lintStyleCode(slug, readFileSync(filename === "<stdin>" ? 0 : filename, "utf8"), {
      strict: options.strict, checkRequired: options.components as StyleLintComponent[] | undefined,
    }),
  }));
  const status: StyleLintReport["status"] = reports.some(({ report }) => report.status === "fail") ? "fail"
    : reports.some(({ report }) => report.status === "inconclusive") ? "inconclusive" : "pass";
  if (options.json || options.format === "json") console.log(JSON.stringify({ slug, status, ok: status === "pass", files: reports }, null, 2));
  else if (options.format === "github") {
    for (const { file, report } of reports) {
      for (const violation of report.violations) console.log(`::error file=${escapeProperty(file)},line=${violation.line}::${escapeData(violation.reason)}`);
      for (const missing of report.missingRequired) console.log(`::${options.strict ? "error" : "warning"} file=${escapeProperty(file)}::${escapeData(`Missing ${missing.component} classes: ${missing.missing.join(" ")}`)}`);
      for (const warning of report.warnings) console.log(`::warning file=${escapeProperty(file)}::${escapeData(warning)}`);
    }
    console.log(`StyleKit ${status}: ${reports.length} file(s).`);
  } else {
    for (const { file, report } of reports) {
      console.log(`${file}: ${report.status} (${report.checkedClasses} classes)`);
      for (const violation of report.violations) console.log(`  line ${violation.line}: ${violation.className}: ${violation.reason}`);
      for (const missing of report.missingRequired) console.log(`  missing ${missing.component}: ${missing.missing.join(" ")}`);
      for (const warning of report.warnings) console.log(`  ${warning}`);
    }
  }
  process.exitCode = status === "pass" ? 0 : status === "fail" ? 1 : 3;
}
