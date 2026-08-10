#!/usr/bin/env tsx

import { scanKnowledgeMirror } from "../../lib/knowledge";

const pathArg = process.argv.find((argument) => argument.startsWith("--path="))?.slice("--path=".length);
if (!pathArg) {
  console.error("Usage: npm run scan:knowledge-mirror -- --path=/absolute/path/to/mirror");
  process.exit(1);
}

const report = await scanKnowledgeMirror(pathArg);
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
