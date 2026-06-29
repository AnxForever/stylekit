#!/usr/bin/env node
/**
 * StyleKit CLI — browse design styles and pull tokens, recipes, and shadcn
 * install commands from the terminal. Served offline from @stylekit/core.
 */

import { parseArgs } from "node:util";

import {
  cmdList,
  cmdSearch,
  cmdShow,
  cmdTokens,
  cmdRecipe,
  cmdAdd,
} from "./commands.js";
import type { StyleCategory } from "./core.js";

const VERSION = "0.1.0";

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
  --category <c>   Filter list by category (modern|retro|minimal|expressive)
  --limit <n>      Limit number of results
  --json           Output JSON
  --help, -h       Show this help
  --version, -v    Show version

Examples:
  stylekit list --category retro
  stylekit search glass
  stylekit show neo-brutalist
  stylekit add synthwave
`;

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
    console.error(`Error: ${(err as Error).message}\n`);
    console.error(HELP);
    process.exit(1);
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
  const limitRaw = values.limit;
  const limit =
    typeof limitRaw === "string" ? parseInt(limitRaw, 10) : undefined;
  const category = values.category as StyleCategory | undefined;
  const arg1 = positionals[1];
  const arg2 = positionals[2];

  let out: string;
  switch (command) {
    case "list":
      out = cmdList(category, limit, json);
      break;
    case "search":
      out = arg1 ? cmdSearch(arg1, json) : "Usage: stylekit search <query>";
      break;
    case "show":
      out = arg1 ? cmdShow(arg1, json) : "Usage: stylekit show <slug>";
      break;
    case "tokens":
      out = arg1 ? cmdTokens(arg1, json) : "Usage: stylekit tokens <slug>";
      break;
    case "recipe":
      out = arg1
        ? cmdRecipe(arg1, arg2, json)
        : "Usage: stylekit recipe <slug> <component>";
      break;
    case "add":
      out = arg1 ? cmdAdd(arg1, json) : "Usage: stylekit add <slug>";
      break;
    default:
      console.error(`Unknown command: ${command}\n`);
      console.error(HELP);
      process.exit(1);
  }

  console.log(out);
}

main();
