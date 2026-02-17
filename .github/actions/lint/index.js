/**
 * StyleKit Lint - GitHub Actions script
 *
 * Reads files matching a glob pattern and lints them against
 * a StyleKit design style using the project's linter module.
 *
 * Environment variables (set by action.yml):
 *   INPUT_STYLE   - Style slug (e.g., neo-brutalist)
 *   INPUT_FILES   - Glob pattern for files to check
 *   INPUT_FAIL_ON - Threshold: error | warning | none
 */

const { glob } = require("node:fs/promises").catch
  ? require("node:fs")
  : require("fs");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

async function findFiles(pattern) {
  // Use Node.js 20+ built-in glob from fs/promises
  const { glob: fsGlob } = require("node:fs");
  return new Promise((resolve, reject) => {
    const matches = [];
    fsGlob(pattern, (err, files) => {
      if (err) reject(err);
      else resolve(files);
    });
  }).catch(() => {
    // Fallback: use child_process with find for simple patterns
    const { execSync } = require("node:child_process");
    const result = execSync(`find . -path "./${pattern}" -type f 2>/dev/null`, {
      encoding: "utf-8",
    });
    return result
      .split("\n")
      .filter(Boolean)
      .map((f) => f.replace(/^\.\//, ""));
  });
}

async function main() {
  const style = process.env.INPUT_STYLE;
  const filesPattern = process.env.INPUT_FILES || "src/**/*.tsx";
  const failOn = process.env.INPUT_FAIL_ON || "error";

  if (!style) {
    console.log("::error::Missing required input: style");
    process.exit(1);
  }

  // Import the linter from the project source via tsx/ts-node or built core
  let lintCode;
  try {
    // Try importing from built core package first
    const core = require("../../packages/core/dist/linter/index.cjs");
    lintCode = core.lintCode;
  } catch {
    try {
      // Fallback: use tsx to load TypeScript source directly
      const { execSync } = require("node:child_process");
      const script = `
        const { lintCode } = require('./lib/linter/index.ts');
        process.stdout.write(JSON.stringify({ ok: true }));
      `;
      execSync(`npx tsx -e "${script}"`, { encoding: "utf-8" });
      // If tsx is available, we'll shell out per file instead
      lintCode = null;
    } catch {
      console.log(
        "::error::Could not load StyleKit linter. Ensure packages/core is built or tsx is available."
      );
      process.exit(1);
    }
  }

  // Find matching files
  let files;
  try {
    const { execSync } = require("node:child_process");
    const result = execSync(
      `find . -type f -path "./${filesPattern}" 2>/dev/null || true`,
      { encoding: "utf-8" }
    );
    files = result
      .split("\n")
      .filter(Boolean)
      .map((f) => f.replace(/^\.\//, ""));
  } catch {
    files = [];
  }

  if (files.length === 0) {
    console.log(`No files found matching pattern: ${filesPattern}`);
    process.exit(0);
  }

  console.log(`Linting ${files.length} file(s) against style: ${style}`);

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const file of files) {
    const content = await readFile(file, "utf-8");

    let result;
    if (lintCode) {
      result = lintCode(style, content);
    } else {
      // Shell out to tsx for TypeScript source
      const { execSync } = require("node:child_process");
      const escaped = content.replace(/'/g, "'\\''");
      try {
        const output = execSync(
          `npx tsx -e "const { lintCode } = require('./lib/linter/index.ts'); console.log(JSON.stringify(lintCode('${style}', \`${escaped}\`)))"`,
          { encoding: "utf-8", cwd: process.cwd() }
        );
        result = JSON.parse(output.trim());
      } catch {
        console.log(`::warning file=${file}::Failed to lint file`);
        continue;
      }
    }

    for (const violation of result.violations) {
      const location = violation.line ? `,line=${violation.line}` : "";
      const msg = `${violation.class}: ${violation.reason}`;

      if (violation.severity === "error") {
        console.log(`::error file=${file}${location}::${msg}`);
        totalErrors++;
      } else {
        console.log(`::warning file=${file}${location}::${msg}`);
        totalWarnings++;
      }
    }
  }

  console.log(
    `\nResults: ${totalErrors} error(s), ${totalWarnings} warning(s)`
  );

  if (failOn === "error" && totalErrors > 0) {
    console.log(`Failing due to ${totalErrors} error(s)`);
    process.exit(1);
  }

  if (failOn === "warning" && (totalErrors > 0 || totalWarnings > 0)) {
    console.log(
      `Failing due to ${totalErrors} error(s) and ${totalWarnings} warning(s)`
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.log(`::error::${err.message}`);
  process.exit(1);
});
