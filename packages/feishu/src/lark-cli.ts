/**
 * Thin wrapper around the official lark-cli (github.com/larksuite/cli).
 *
 * The chat surface runs on @larksuite/channel; the write-back layer runs here.
 * The CLI is the tool this year's winners built on ("give an Agent hands on
 * Feishu"), and its `base` / `drive` domains do exactly the two writes this
 * bot performs: a record in a Base, and a Markdown doc imported into Drive.
 *
 * Commands are executed as array arguments through execFile — no shell, so
 * field values that look like shell syntax cannot escape.
 */

import { execFile } from "node:child_process";

const CLI = process.env.LARK_CLI_BIN ?? "lark-cli";

export class LarkCliError extends Error {
  constructor(
    message: string,
    public readonly code: "NOT_FOUND" | "NONZERO" | "BAD_OUTPUT",
    public readonly detail?: string,
  ) {
    super(message);
    this.name = "LarkCliError";
  }
}

function run(
  args: string[],
  stdin?: string,
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolvePromise, reject) => {
    execFile(
      CLI,
      args,
      { maxBuffer: 32 * 1024 * 1024, timeout: 60_000 },
      (error, stdout, stderr) => {
        if (error) {
          const message = String((error as { message?: string }).message ?? error);
          if (message.includes("ENOENT")) {
            reject(
              new LarkCliError(
                `lark-cli not found on PATH. Install it with: npx @larksuite/cli@latest install`,
                "NOT_FOUND",
              ),
            );
            return;
          }
          reject(
            new LarkCliError(
              `lark-cli exited with an error.`,
              "NONZERO",
              `${message}\n${stderr}`.trim(),
            ),
          );
          return;
        }
        resolvePromise({ stdout, stderr });
      },
    );
  });
}

export interface LarkCli {
  /**
   * Writes one record to a Base table and returns the created record ids.
   * Field values follow the Base API field syntax (text as string, single
   * select as string, multi select as string array, hyperlink as
   * { text, link }).
   */
  baseBatchCreate(params: {
    baseToken: string;
    tableId: string;
    fields: Record<string, unknown>[];
    dryRun?: boolean;
  }): Promise<string[]>;
  /**
   * Imports a local Markdown file into Drive as a docx and returns the
   * document URL when the CLI prints one, otherwise the bare token. Uses the
   * application identity (no user prompt).
   */
  driveImportMarkdown(params: {
    filePath: string;
    folderToken?: string;
    dryRun?: boolean;
  }): Promise<string>;
  /**
   * Patches fields on existing records, keyed by record id.
   */
  baseBatchUpdate(params: {
    baseToken: string;
    tableId: string;
    updates: Record<string, Record<string, unknown>>;
    dryRun?: boolean;
  }): Promise<void>;
}

export const larkCli: LarkCli = {
  async baseBatchCreate({ baseToken, tableId, fields, dryRun }) {
    const args = [
      "base",
      "+record-batch-create",
      "--as",
      "bot",
      "--format",
      "json",
      "--base-token",
      baseToken,
      "--table-id",
      tableId,
      "--json",
      JSON.stringify({ create_records: fields }),
    ];
    if (dryRun) args.push("--dry-run");

    const { stdout } = await run(args);
    try {
      const payload = JSON.parse(stdout) as {
        record_ids?: string[];
        records?: Array<{ record_id?: string }>;
      };
      const ids =
        payload.record_ids ??
        (payload.records ?? [])
          .map((record) => record.record_id)
          .filter((id): id is string => Boolean(id));
      if (ids.length === 0) {
        throw new LarkCliError(
          `lark-cli returned no record ids.`,
          "BAD_OUTPUT",
          stdout.slice(0, 500),
        );
      }
      return ids;
    } catch (error) {
      if (error instanceof LarkCliError) throw error;
      throw new LarkCliError(
        `lark-cli returned non-JSON output.`,
        "BAD_OUTPUT",
        stdout.slice(0, 500),
      );
    }
  },

  async driveImportMarkdown({ filePath, folderToken, dryRun }) {
    const args = [
      "drive",
      "+import",
      "--format",
      "json",
      "--file",
      filePath,
      "--type",
      "docx",
    ];
    if (folderToken) args.push("--folder-token", folderToken);
    if (dryRun) args.push("--dry-run");

    const { stdout } = await run(args);
    const text = stdout.trim();

    // Prefer a full URL when the CLI prints one; fall back to a bare token.
    const urlMatch = text.match(/https:\/\/[^\s"'<>]+/);
    if (urlMatch) return urlMatch[0];

    const tokenMatch = text.match(/[a-zA-Z0-9]{20,}/);
    if (!tokenMatch) {
      throw new LarkCliError(
        `lark-cli import returned no document token.`,
        "BAD_OUTPUT",
        stdout.slice(0, 500),
      );
    }
    return tokenMatch[0];
  },

  async baseBatchUpdate({ baseToken, tableId, updates, dryRun }) {
    const args = [
      "base",
      "+record-batch-update",
      "--as",
      "bot",
      "--format",
      "json",
      "--base-token",
      baseToken,
      "--table-id",
      tableId,
      "--json",
      JSON.stringify({ update_records: updates }),
    ];
    if (dryRun) args.push("--dry-run");

    await run(args);
  },
};
