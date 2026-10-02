#!/usr/bin/env node
/**
 * StyleKit CLI — browse design styles, tokens, recipes, and public assets.
 * Bundled data stays available offline; remote asset source is reported explicitly.
 *
 * Contract: success goes to stdout with exit 0; errors and usage go to stderr
 * with exit 1. With --json, both success and error emit JSON.
 */

import { createRequire } from "node:module";
import { parseArgs } from "node:util";

import {
  cmdList,
  cmdSearch,
  cmdShow,
  cmdTokens,
  cmdRecipe,
  cmdAdd,
  cmdAssets,
  cmdAsset,
  usageFail,
  type CommandResult,
} from "./commands.js";
import { ASSET_KINDS, isAssetKind } from "./core.js";
import type { PublicAssetKind, StyleCategory } from "./core.js";
import { getImplementationBriefLive } from "stylekit-core/discovery";
import { runLint } from "./lint.js";

const VERSION = (
  createRequire(import.meta.url)("../package.json") as { version: string }
).version;
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
  assets                     List public assets (filter by kind/query and page)
  asset <kind> <id>          Show a namespaced public asset record
  brief <slug>               Print the complete implementation contract (JSON)
  lint <slug> <files...>      Check source files against a style's rules

Flags:
  --category <c>   Filter by category (modern|retro|minimal|expressive)
  --limit <n>      Limit results to a positive integer (assets: 1-100)
  --offset <n>     Skip results for the assets command (zero or greater)
  --kind <kind>    Filter public assets by namespace/kind
  --query <text>   Search public asset metadata
  --json           Output JSON (errors included)
  --help, -h       Show this help
  --version, -v    Show version
  --style <slug>   Style for lint (alternative to positional slug)
  --files <glob>   File path or glob for lint; may be repeated
  --stdin          Read lint source from stdin
  --component <c>  Check required classes for button|card|input; may be repeated
  --strict         Fail missing required classes (requires --component)
  --format <f>     Lint output: text|json|github

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

function die(message: string, json: boolean, code: string): never {
  console.error(
    json
      ? JSON.stringify({ error: message, code }, null, 2)
      : message,
  );
  process.exit(1);
}

async function main(): Promise<void> {
  const jsonRequested = process.argv.slice(2).includes("--json");
  let values: Record<string, unknown>;
  let positionals: string[];
  try {
    const parsed = parseArgs({
      allowPositionals: true,
      options: {
        json: { type: "boolean", default: false },
        category: { type: "string" },
        limit: { type: "string" },
        offset: { type: "string" },
        kind: { type: "string" },
        query: { type: "string" },
        help: { type: "boolean", short: "h", default: false },
        version: { type: "boolean", short: "v", default: false },
        style: { type: "string" },
        files: { type: "string", multiple: true },
        stdin: { type: "boolean", default: false },
        component: { type: "string", multiple: true },
        strict: { type: "boolean", default: false },
        format: { type: "string" },
      },
    });
    values = parsed.values;
    positionals = parsed.positionals;
  } catch (err) {
    die(`Error: ${(err as Error).message}\n\n${HELP}`, jsonRequested, "INVALID_ARGUMENTS");
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

  const json = values.json === true || values.format === "json";

  // Validate --limit (positive integer).
  let limit: number | undefined;
  if (typeof values.limit === "string") {
    const n = Number(values.limit);
    if (!Number.isSafeInteger(n) || n < 1) {
      die(
        `Invalid --limit "${values.limit}": must be a positive integer.`,
        json,
        "INVALID_LIMIT",
      );
    }
    limit = n;
  }
  if (command === "assets" && limit !== undefined && limit > 100) {
    die(
      'Invalid --limit "' + limit + '": assets accepts values from 1 to 100.',
      json,
      "INVALID_LIMIT",
    );
  }
  if (
    command === "assets" &&
    typeof values.query === "string" &&
    values.query.length > 500
  ) {
    die(
      "Invalid --query: public asset queries are limited to 500 characters.",
      json,
      "INVALID_QUERY",
    );
  }
  if (
    command === "assets" &&
    typeof values.kind === "string" &&
    !isAssetKind(values.kind)
  ) {
    die(
      'Invalid --kind "' + values.kind + '": must be one of ' + ASSET_KINDS.join(", ") + ".",
      json,
      "INVALID_ASSET_KIND",
    );
  }

  // Validate --offset (zero or greater).
  let offset: number | undefined;
  if (typeof values.offset === "string") {
    const n = Number(values.offset);
    if (!Number.isSafeInteger(n) || n < 0) {
      die(
        'Invalid --offset "' + values.offset + '": must be a non-negative integer.',
        json,
        "INVALID_OFFSET",
      );
    }
    offset = n;
  }

  // Validate --category against the known set.
  let category: StyleCategory | undefined;
  if (typeof values.category === "string") {
    if (!CATEGORIES.includes(values.category as (typeof CATEGORIES)[number])) {
      die(
        `Invalid --category "${values.category}": must be one of ${CATEGORIES.join(", ")}.`,
        json,
        "INVALID_CATEGORY",
      );
    }
    category = values.category as StyleCategory;
  }

  const arg1 = positionals[1];
  const arg2 = positionals[2];

  let result: CommandResult;
  try {
    switch (command) {
      case "brief": {
        if (!arg1) die("Provide a known slug: stylekit brief <slug>", json, "UNKNOWN_STYLE");
        const result = await getImplementationBriefLive(arg1);
        if (!result.data) {
          const message = result.failureKind === "not-found"
            ? `Unknown style "${arg1}".`
            : `Could not retrieve an implementation brief for "${arg1}".${result.fallbackReason ? ` ${result.fallbackReason}` : ""}`;
          die(message, json, result.failureKind === "not-found" ? "UNKNOWN_STYLE" : "STYLE_BRIEF_UNAVAILABLE");
        }
        console.log(JSON.stringify({
          ...result.data,
          origin: result.origin,
          ...(result.fallbackReason ? { fallbackReason: result.fallbackReason } : {}),
        }, null, 2));
        return;
      }
      case "lint": {
        const slug = typeof values.style === "string" ? values.style : arg1;
        if (!slug) die("Usage: stylekit lint <slug> <files...> | --stdin", json, "INVALID_ARGUMENTS");
        await runLint(slug, [...positionals.slice(typeof values.style === "string" ? 1 : 2), ...(values.files as string[] ?? [])], {
          json, stdin: values.stdin === true, strict: values.strict === true,
          format: values.format as string | undefined, components: values.component as string[] | undefined,
        });
        return;
      }
      case "list":
        result = await cmdList(category, limit);
        break;
      case "search":
        result = arg1 ? await cmdSearch(arg1, limit) : usageFail("stylekit search <query>");
        break;
      case "show":
        result = arg1 ? await cmdShow(arg1) : usageFail("stylekit show <slug>");
        break;
      case "tokens":
        result = arg1 ? await cmdTokens(arg1) : usageFail("stylekit tokens <slug>");
        break;
      case "recipe":
        result = arg1
          ? await cmdRecipe(arg1, arg2)
          : usageFail("stylekit recipe <slug> <component>");
        break;
      case "add":
        result = arg1 ? await cmdAdd(arg1) : usageFail("stylekit add <slug>");
        break;
      case "assets":
        result = await cmdAssets({
          ...(typeof values.kind === "string"
            ? { kind: values.kind as PublicAssetKind }
            : {}),
          ...(typeof values.query === "string" ? { query: values.query } : {}),
          ...(offset !== undefined ? { offset } : {}),
          ...(limit !== undefined ? { limit } : {}),
        });
        break;
      case "asset":
        if (!arg1 || !arg2) {
          result = usageFail("stylekit asset <kind> <id>");
        } else if (!isAssetKind(arg1)) {
          die(
            'Invalid asset kind "' +
              arg1 +
              '": must be one of ' +
              ASSET_KINDS.join(", ") +
              ".",
            json,
            "INVALID_ASSET_KIND",
          );
        } else {
          result = await cmdAsset(arg1 as PublicAssetKind, arg2);
        }
        break;
      default:
        die(`Unknown command: ${command}\n\n${HELP}`, json, "UNKNOWN_COMMAND");
    }

    emit(result, json);
  } catch (err) {
    die(`Unexpected error: ${(err as Error).message}`, json, "UNEXPECTED_ERROR");
  }
}

void main();
