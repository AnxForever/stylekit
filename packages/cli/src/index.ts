#!/usr/bin/env node
/**
 * StyleKit CLI — browse design styles and pull tokens, recipes, and shadcn
 * install commands from the terminal. Served offline from @stylekit/core.
 *
 * Contract: success goes to stdout with exit 0; errors and usage go to stderr
 * with exit 1. With --json, both success and error emit JSON.
 */

import { parseArgs } from "node:util";

import {
  cmdList,
  cmdSearch,
  cmdShow,
  cmdTokens,
  cmdRecipe,
  cmdAdd,
  usageFail,
  type CommandResult,
} from "./commands.js";
import type { StyleCategory } from "./core.js";

const VERSION = "0.1.0";
const CATEGORIES = ["modern", "retro", "minimal", "expressive"] as const;

const HELP = `stylekit — StyleKit CLI v${VERSION}

Usage: stylekit <command> [args] [flags]

Commands:
  list                       List all styles
  search <query>             Search styles by keyword
  show <slug>                Show a style's full detail
  tokens <slug>              Print a style's design tokens (JSON)
  recipe <slug> <component>  Print a rendered component recipe
  add <slug>                 Print the shadcn install command

Flags:
  --category <c>   Filter by category (modern|retro|minimal|expressive)
  --limit <n>      Limit results to a positive integer
  --json           Output JSON (errors included)
  --help, -h       Show this help
  --version, -v    Show version

Examples:
  stylekit list --category retro
  stylekit search glass --limit 5
  stylekit show neo-brutalist
  stylekit add synthwave
`;

function emit(result: CommandResult, json: boolean): void {
  const out = json ? JSON.stringify(result.json, null, 2) : result.text;
  if (result.ok) {
    console.log(out);
  } else {
    console.error(out);
    process.exitCode = 1;
  }
}

function die(message: string): never {
  console.error(message);
  process.exit(1);
}

function main(): void {
  let values: Record<string, unknown>;
  let positionals: string[];
  try {
    const parsed = parseArgs({
      allowPositionals: true,
      options: {
        json: { type: "boolean", default: false },
        category: { type: "string" },
        limit: { type: "string" },
        help: { type: "boolean", short: "h", default: false },
        version: { type: "boolean", short: "v", default: false },
      },
    });
    values = parsed.values;
    positionals = parsed.positionals;
  } catch (err) {
    die(`Error: ${(err as Error).message}\n\n${HELP}`);
  }

  if (values.version) {
    console.log(VERSION);
    return;
  }

  const command = positionals[0];
  if (!command || values.help) {
    console.log(HELP);
    return;
  }

  const json = values.json === true;

  // Validate --limit (positive integer).
  let limit: number | undefined;
  if (typeof values.limit === "string") {
    const n = Number(values.limit);
    if (!Number.isInteger(n) || n < 1) {
      die(`Invalid --limit "${values.limit}": must be a positive integer.`);
    }
    limit = n;
  }

  // Validate --category against the known set.
  let category: StyleCategory | undefined;
  if (typeof values.category === "string") {
    if (!CATEGORIES.includes(values.category as (typeof CATEGORIES)[number])) {
      die(
        `Invalid --category "${values.category}": must be one of ${CATEGORIES.join(", ")}.`,
      );
    }
    category = values.category as StyleCategory;
  }

  const arg1 = positionals[1];
  const arg2 = positionals[2];

  let result: CommandResult;
  switch (command) {
    case "list":
      result = cmdList(category, limit);
      break;
    case "search":
      result = arg1 ? cmdSearch(arg1, limit) : usageFail("stylekit search <query>");
      break;
    case "show":
      result = arg1 ? cmdShow(arg1) : usageFail("stylekit show <slug>");
      break;
    case "tokens":
      result = arg1 ? cmdTokens(arg1) : usageFail("stylekit tokens <slug>");
      break;
    case "recipe":
      result = arg1
        ? cmdRecipe(arg1, arg2)
        : usageFail("stylekit recipe <slug> <component>");
      break;
    case "add":
      result = arg1 ? cmdAdd(arg1) : usageFail("stylekit add <slug>");
      break;
    default:
      die(`Unknown command: ${command}\n\n${HELP}`);
  }

  try {
    emit(result, json);
  } catch (err) {
    die(`Unexpected error: ${(err as Error).message}`);
  }
}

main();
