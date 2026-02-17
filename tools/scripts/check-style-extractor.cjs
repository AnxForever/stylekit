#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const PROJECT_ROOT = process.cwd();
const EXTRACTOR_ROOT = path.join(PROJECT_ROOT, "style-extractor-dev");
const SCAN_DIRS = ["scripts", "tests", "tools"];
const JS_EXTENSIONS = new Set([".js", ".cjs", ".mjs"]);

function collectJavaScriptFiles(dirPath, out) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      collectJavaScriptFiles(fullPath, out);
      continue;
    }

    if (!entry.isFile()) continue;
    if (!JS_EXTENSIONS.has(path.extname(entry.name))) continue;
    out.push(fullPath);
  }
}

function runSyntaxChecks(files) {
  const failures = [];

  for (const file of files) {
    const result = spawnSync(process.execPath, ["--check", file], {
      encoding: "utf8",
      stdio: "pipe",
    });

    if (result.status !== 0) {
      failures.push({
        file,
        stderr: result.stderr || result.stdout || "Unknown syntax check failure",
      });
    }
  }

  return failures;
}

function getScriptCountFromLoader(loaderSource) {
  const startMarker = "const SCRIPTS = [";
  const startIndex = loaderSource.indexOf(startMarker);
  if (startIndex === -1) return null;

  const endIndex = loaderSource.indexOf("];", startIndex);
  if (endIndex === -1) return null;

  const scriptsBlock = loaderSource.slice(startIndex, endIndex);
  const matches = scriptsBlock.match(/'[^']+\.js'/g);
  return matches ? matches.length : 0;
}

function runConsistencyChecks() {
  const issues = [];
  const readmePath = path.join(EXTRACTOR_ROOT, "README.md");
  const adapterPath = path.join(EXTRACTOR_ROOT, "scripts", "stylekit-adapter.js");
  const loaderPath = path.join(EXTRACTOR_ROOT, "tests", "load-scripts.js");

  const readme = fs.readFileSync(readmePath, "utf8");
  if (!readme.includes("await extractStyle")) {
    issues.push("README should document async usage with `await extractStyle(...)`.");
  }

  const adapter = fs.readFileSync(adapterPath, "utf8");
  if (!adapter.includes("files['tokens.json']")) {
    issues.push("stylekit-adapter should export JSON as `tokens.json`.");
  }

  const loader = fs.readFileSync(loaderPath, "utf8");
  const declaredMatch = loader.match(/Loads all (\d+) scripts/i);
  const declaredCount = declaredMatch ? Number.parseInt(declaredMatch[1], 10) : null;
  const actualCount = getScriptCountFromLoader(loader);

  if (declaredCount === null) {
    issues.push("load-scripts.js is missing the script-count header comment.");
  } else if (actualCount === null) {
    issues.push("load-scripts.js SCRIPTS array could not be parsed.");
  } else if (declaredCount !== actualCount) {
    issues.push(
      `load-scripts.js script count mismatch: header=${declaredCount}, array=${actualCount}.`,
    );
  }

  return issues;
}

function main() {
  if (!fs.existsSync(EXTRACTOR_ROOT)) {
    console.error("[style-extractor-check] Missing folder: style-extractor-dev");
    process.exit(1);
  }

  const files = [];
  for (const relativeDir of SCAN_DIRS) {
    collectJavaScriptFiles(path.join(EXTRACTOR_ROOT, relativeDir), files);
  }

  files.sort();

  if (files.length === 0) {
    console.error("[style-extractor-check] No JavaScript files found to validate.");
    process.exit(1);
  }

  const syntaxFailures = runSyntaxChecks(files);
  const consistencyIssues = runConsistencyChecks();

  if (syntaxFailures.length > 0 || consistencyIssues.length > 0) {
    console.error("[style-extractor-check] Failed.");

    if (syntaxFailures.length > 0) {
      console.error(`\nSyntax failures (${syntaxFailures.length}):`);
      for (const failure of syntaxFailures) {
        const relativePath = path.relative(PROJECT_ROOT, failure.file);
        console.error(`- ${relativePath}`);
        console.error(failure.stderr.trim());
      }
    }

    if (consistencyIssues.length > 0) {
      console.error(`\nConsistency issues (${consistencyIssues.length}):`);
      for (const issue of consistencyIssues) {
        console.error(`- ${issue}`);
      }
    }

    process.exit(1);
  }

  console.log(
    `[style-extractor-check] OK. Checked ${files.length} JavaScript files + consistency checks.`,
  );
}

main();
