import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { lintCodeWithRules, type StyleLintComponent, type StyleLintReport } from "stylekit-core/styles";
import { getImplementationBriefLive, rulesFromBrief } from "stylekit-core/discovery";

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
    const char = pattern[i]!;
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

export async function runLint(slug: string, patterns: string[], options: {
  stdin?: boolean; json?: boolean; format?: string; strict?: boolean; components?: string[];
  remoteOptions?: Parameters<typeof getImplementationBriefLive>[1];
}): Promise<void> {
  if (options.format && !["text", "json", "github"].includes(options.format)) throw new Error("--format must be text, json, or github.");
  if (options.components?.some((component) => !["button", "card", "input"].includes(component))) throw new Error("--component must be button, card, or input.");
  if (options.strict && !options.components?.length) throw new Error("--strict requires --component to identify the snippet's required classes.");
  if (options.stdin && patterns.length) throw new Error("Use either --stdin or file paths, not both.");
  if (!options.stdin && patterns.length === 0) throw new Error("Provide file paths, --files <glob>, or --stdin.");

  const briefSource = await getImplementationBriefLive(slug, options.remoteOptions);
  const brief = briefSource.data;
  if (!brief) {
    const notFound = briefSource.failureKind === "not-found";
    const message = notFound
      ? `Unknown style "${slug}". Run stylekit search to find a valid slug.`
      : `Could not load implementation rules for "${slug}".${briefSource.fallbackReason ? ` ${briefSource.fallbackReason}` : ""}`;
    console.error(options.json || options.format === "json"
      ? JSON.stringify({ error: message, code: notFound ? "UNKNOWN_STYLE" : "STYLE_BRIEF_UNAVAILABLE", origin: briefSource.origin, ...(briefSource.fallbackReason ? { fallbackReason: briefSource.fallbackReason } : {}) }, null, 2)
      : message);
    process.exitCode = 1;
    return;
  }
  const rules = rulesFromBrief(brief);
  if (!rules) {
    const message = `The implementation brief for "${slug}" contains an invalid stylekit-lint-v1 rule contract.`;
    console.error(options.json || options.format === "json"
      ? JSON.stringify({ error: message, code: "INVALID_LINT_CONTRACT", origin: briefSource.origin }, null, 2)
      : message);
    process.exitCode = 1;
    return;
  }

  const files = options.stdin ? ["<stdin>"] : resolveLintFiles(patterns);
  const reports = files.map((filename) => ({
    file: filename === "<stdin>" ? filename : path.relative(process.cwd(), filename),
    report: lintCodeWithRules(rules, readFileSync(filename === "<stdin>" ? 0 : filename, "utf8"), {
      strict: options.strict, checkRequired: options.components as StyleLintComponent[] | undefined,
      slug,
    }),
  }));
  const status: StyleLintReport["status"] = reports.some(({ report }) => report.status === "fail") ? "fail"
    : reports.some(({ report }) => report.status === "inconclusive") ? "inconclusive" : "pass";
  const metadata = {
    origin: briefSource.origin,
    contentSource: brief.provenance.source,
    ...(briefSource.fallbackReason ? { fallbackReason: briefSource.fallbackReason } : {}),
  };
  if (options.json || options.format === "json") console.log(JSON.stringify({ slug, ...metadata, status, ok: status === "pass", files: reports }, null, 2));
  else if (options.format === "github") {
    console.log(`::notice::StyleKit lint rules origin=${briefSource.origin} contentSource=${brief.provenance.source}${briefSource.fallbackReason ? ` fallbackReason=${escapeData(briefSource.fallbackReason)}` : ""}`);
    for (const { file, report } of reports) {
      for (const violation of report.violations) console.log(`::error file=${escapeProperty(file)},line=${violation.line}::${escapeData(violation.reason)}`);
      for (const missing of report.missingRequired) console.log(`::${options.strict ? "error" : "warning"} file=${escapeProperty(file)}::${escapeData(`Missing ${missing.component} classes: ${missing.missing.join(" ")}`)}`);
      for (const warning of report.warnings) console.log(`::warning file=${escapeProperty(file)}::${escapeData(warning)}`);
    }
    console.log(`StyleKit ${status}: ${reports.length} file(s).`);
  } else {
    console.log(`StyleKit rules origin: ${briefSource.origin} · content provenance: ${brief.provenance.source}${briefSource.fallbackReason ? ` · fallback: ${briefSource.fallbackReason}` : ""}`);
    for (const { file, report } of reports) {
      console.log(`${file}: ${report.status} (${report.checkedClasses} classes)`);
      for (const violation of report.violations) console.log(`  line ${violation.line}: ${violation.className}: ${violation.reason}`);
      for (const missing of report.missingRequired) console.log(`  missing ${missing.component}: ${missing.missing.join(" ")}`);
      for (const warning of report.warnings) console.log(`  ${warning}`);
    }
  }
  process.exitCode = status === "pass" ? 0 : status === "fail" ? 1 : 3;
}
