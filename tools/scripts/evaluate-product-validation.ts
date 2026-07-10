import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  evaluateProductValidation,
  productValidationBundleSchema,
  renderProductValidationReport,
} from "@/lib/product-validation";

type OutputFormat = "json" | "markdown";

function printUsage(): void {
  console.error(
    "Usage: pnpm run validate:product-experiment -- <evidence.json> [--format json|markdown]",
  );
}

function parseArguments(args: string[]): {
  inputPath: string;
  format: OutputFormat;
} | null {
  const inputPath = args.find((argument) => !argument.startsWith("--"));
  if (!inputPath) return null;

  const formatIndex = args.indexOf("--format");
  const formatValue = formatIndex >= 0 ? args[formatIndex + 1] : "markdown";
  if (formatValue !== "json" && formatValue !== "markdown") {
    return null;
  }

  return { inputPath, format: formatValue };
}

async function main(): Promise<void> {
  const parsedArgs = parseArguments(process.argv.slice(2));
  if (!parsedArgs) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const absolutePath = path.resolve(process.cwd(), parsedArgs.inputPath);
    const raw = await readFile(absolutePath, "utf8");
    const json = JSON.parse(raw) as unknown;
    const parsed = productValidationBundleSchema.safeParse(json);
    if (!parsed.success) {
      console.error("[validate:product-experiment] Invalid evidence bundle:");
      for (const issue of parsed.error.issues) {
        console.error(`- ${issue.path.join(".") || "root"}: ${issue.message}`);
      }
      process.exitCode = 1;
      return;
    }

    const result = evaluateProductValidation(parsed.data);
    if (parsedArgs.format === "json") {
      console.log(JSON.stringify(result, null, 2));
    } else {
      process.stdout.write(renderProductValidationReport(result));
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[validate:product-experiment] ${message}`);
    process.exitCode = 1;
  }
}

void main();
