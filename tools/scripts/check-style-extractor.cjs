#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const PROJECT_ROOT = process.cwd();
const EXTRACTOR_ROOT = path.join(PROJECT_ROOT, "style-extractor-dev");
const STYLE_ROOT = path.join(PROJECT_ROOT, "lib", "styles");
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

function collectStyleFiles(dirPath, out) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      collectStyleFiles(fullPath, out);
      continue;
    }

    if (!entry.isFile()) continue;
    if (!entry.name.endsWith(".ts")) continue;
    out.push(fullPath);
  }
}

function findNextUnescapedBacktick(text, startIndex) {
  for (let i = startIndex; i < text.length; i += 1) {
    if (text[i] !== "`") continue;

    let slashCount = 0;
    let cursor = i - 1;
    while (cursor >= 0 && text[cursor] === "\\") {
      slashCount += 1;
      cursor -= 1;
    }

    if (slashCount % 2 === 0) {
      return i;
    }
  }

  return -1;
}

function buildLineStartOffsets(text) {
  const offsets = [0];
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === "\n") {
      offsets.push(i + 1);
    }
  }
  return offsets;
}

function lineNumberFromOffset(lineStarts, offset) {
  let low = 0;
  let high = lineStarts.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (lineStarts[mid] <= offset) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return high + 1;
}

function runStylePromptSafetyChecks() {
  const files = [];
  const issues = [];
  collectStyleFiles(STYLE_ROOT, files);
  files.sort();

  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    if (!/aiRules:\s*`/.test(source)) {
      continue;
    }
    const lineStarts = buildLineStartOffsets(source);

    let searchFrom = 0;
    while (true) {
      const aiRulesIndex = source.indexOf("aiRules:", searchFrom);
      if (aiRulesIndex === -1) break;

      const startTick = findNextUnescapedBacktick(source, aiRulesIndex + "aiRules:".length);
      if (startTick === -1) {
        searchFrom = aiRulesIndex + "aiRules:".length;
        continue;
      }

      let cursor = startTick + 1;
      let closed = false;

      while (cursor < source.length) {
        const tick = findNextUnescapedBacktick(source, cursor);
        if (tick === -1) break;

        let afterTick = tick + 1;
        while (afterTick < source.length && /\s/.test(source[afterTick])) {
          afterTick += 1;
        }

        if (source[afterTick] === ",") {
          closed = true;
          searchFrom = afterTick + 1;
          break;
        }

        issues.push({
          file,
          line: lineNumberFromOffset(lineStarts, tick),
          message: "Unescaped backtick found inside aiRules. Use plain text or escape it as \\`.",
        });
        cursor = tick + 1;
      }

      if (!closed) {
        issues.push({
          file,
          line: lineNumberFromOffset(lineStarts, startTick),
          message: "aiRules template literal is not properly closed.",
        });
        break;
      }
    }
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
  const promptSafetyIssues = runStylePromptSafetyChecks();

  if (syntaxFailures.length > 0 || consistencyIssues.length > 0 || promptSafetyIssues.length > 0) {
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

    if (promptSafetyIssues.length > 0) {
      console.error(`\nStyle prompt safety issues (${promptSafetyIssues.length}):`);
      for (const issue of promptSafetyIssues) {
        const relativePath = path.relative(PROJECT_ROOT, issue.file);
        console.error(`- ${relativePath}:${issue.line} ${issue.message}`);
      }
    }

    process.exit(1);
  }

  console.log(
    `[style-extractor-check] OK. Checked ${files.length} JavaScript files + consistency checks + style prompt safety.`,
  );
}

main();
