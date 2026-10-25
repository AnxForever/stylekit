import ts from "typescript";
import type { RequiredComponent } from "./align-recipe-required";

export type RequiredArrayValues = Record<RequiredComponent, string[]>;

export interface PlannedSourceEdit {
  file: string;
  original: string;
  next: string;
}

export interface SourceEditIO {
  readFile(file: string): string;
  writeFile(file: string, contents: string): void;
}

/** Preflight every source, then apply edits with best-effort rollback on failure. */
export function commitPlannedSourceEdits(plans: PlannedSourceEdit[], io: SourceEditIO): void {
  const seen = new Set<string>();
  for (const plan of plans) {
    if (seen.has(plan.file)) throw new Error(`duplicate planned source file: ${plan.file}`);
    seen.add(plan.file);
    if (io.readFile(plan.file) !== plan.original) {
      throw new Error(`${plan.file} changed after planning; aborting before any writes`);
    }
  }

  const touched: PlannedSourceEdit[] = [];
  let currentFile = "";
  try {
    for (const plan of plans) {
      if (plan.original === plan.next) continue;
      currentFile = plan.file;
      // Include the current file before writing, since a failed write may have
      // changed part of it before the filesystem reported the failure.
      touched.push(plan);
      io.writeFile(plan.file, plan.next);
    }
  } catch (error) {
    const rollbackFailures: string[] = [];
    for (const plan of touched.reverse()) {
      try {
        io.writeFile(plan.file, plan.original);
      } catch (rollbackError) {
        rollbackFailures.push(`${plan.file}: ${errorMessage(rollbackError)}`);
      }
    }
    const rollbackStatus = rollbackFailures.length
      ? `rollback failed for ${rollbackFailures.join("; ")}`
      : `restored ${touched.length} touched file(s)`;
    throw new Error(`write failed for ${currentFile}: ${errorMessage(error)}; ${rollbackStatus}`, { cause: error });
  }
}

/** Replace only the required arrays inside a createStyleTokens() call. */
export function rewriteTokenRequiredArrays(source: string, values: RequiredArrayValues, fileName = "tokens.ts"): string {
  const sourceFile = parse(source, fileName);
  const calls: ts.CallExpression[] = [];
  const visit = (node: ts.Node) => {
    if (
      ts.isCallExpression(node) &&
      ((ts.isIdentifier(node.expression) && node.expression.text === "createStyleTokens") ||
        (ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "createStyleTokens"))
    ) calls.push(node);
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  let tokensObject: ts.ObjectLiteralExpression | undefined;
  if (calls.length === 1 && calls[0].arguments[0] && ts.isObjectLiteralExpression(calls[0].arguments[0])) {
    tokensObject = calls[0].arguments[0];
  } else if (calls.length === 0) {
    const directObjects: ts.ObjectLiteralExpression[] = [];
    for (const statement of sourceFile.statements) {
      if (!ts.isVariableStatement(statement)) continue;
      for (const declaration of statement.declarationList.declarations) {
        if (
          ts.isIdentifier(declaration.name) && /tokens$/i.test(declaration.name.text) &&
          declaration.initializer && ts.isObjectLiteralExpression(declaration.initializer) &&
          findProperty(declaration.initializer, "required")
        ) directObjects.push(declaration.initializer);
      }
    }
    if (directObjects.length === 1) tokensObject = directObjects[0];
  }
  if (!tokensObject) throw new Error(`${fileName}: expected one createStyleTokens(object) call or typed *Tokens object`);
  const required = getUniqueProperty(tokensObject, "required", fileName);
  if (!required || !ts.isObjectLiteralExpression(required.initializer)) {
    throw new Error(`${fileName}: expected a required object in createStyleTokens()`);
  }
  return rewriteComponentArrays(source, sourceFile, required.initializer, values, fileName);
}

/** Replace only the required arrays in the named style's lint-rules entry. */
export function rewriteCuratedRequiredArrays(source: string, slug: string, values: RequiredArrayValues, fileName = "lint-rules.ts"): string {
  const sourceFile = parse(source, fileName);
  const matches: ts.ObjectLiteralExpression[] = [];
  const visit = (node: ts.Node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const styleProperty = findProperty(node, slug);
      if (styleProperty && ts.isObjectLiteralExpression(styleProperty.initializer)) {
        const required = findProperty(styleProperty.initializer, "required");
        if (required && ts.isObjectLiteralExpression(required.initializer)) matches.push(required.initializer);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  if (matches.length > 1) throw new Error(`${fileName}: found multiple curated entries for ${slug}`);
  if (matches.length === 0) return source;
  return rewriteComponentArrays(source, sourceFile, matches[0], values, `${fileName}:${slug}`);
}

function rewriteComponentArrays(
  source: string,
  sourceFile: ts.SourceFile,
  requiredObject: ts.ObjectLiteralExpression,
  values: RequiredArrayValues,
  fileName: string,
): string {
  const edits: Array<{ start: number; end: number; text: string }> = [];
  const missing: RequiredComponent[] = [];
  for (const component of ["button", "card", "input"] as const) {
    const property = getUniqueProperty(requiredObject, component, fileName);
    if (!property) {
      missing.push(component);
      continue;
    }
    if (!ts.isArrayLiteralExpression(property.initializer)) {
      throw new Error(`${fileName}: required.${component} must be an array literal`);
    }
    const oldValues = property.initializer.elements.map((element) => {
      if (!ts.isStringLiteral(element) && !ts.isNoSubstitutionTemplateLiteral(element)) {
        throw new Error(`${fileName}: required.${component} contains a non-literal entry`);
      }
      return element.text;
    });
    if (oldValues.length === values[component].length && oldValues.every((value, index) => value === values[component][index])) continue;
    ensureNoComments(source, property.initializer, fileName);
    edits.push({
      start: property.initializer.getStart(sourceFile),
      end: property.initializer.end,
      text: formatArray(values[component], source, property.initializer.getStart(sourceFile)),
    });
  }
  if (missing.length) edits.push(...planMissingProperties(source, requiredObject, missing, values, fileName));
  return applyTextEdits(source, edits);
}

function planMissingProperties(
  source: string,
  object: ts.ObjectLiteralExpression,
  missing: RequiredComponent[],
  values: RequiredArrayValues,
  fileName: string,
): Array<{ start: number; end: number; text: string }> {
  const close = object.end - 1;
  const lineStart = Math.max(source.lastIndexOf("\n", close - 1), source.lastIndexOf("\r", close - 1)) + 1;
  const closeIndent = source.slice(lineStart, close).match(/^\s*/)?.[0] ?? "";
  const newline = source.includes("\r\n") ? "\r\n" : "\n";
  const last = object.properties[object.properties.length - 1];
  const edits: Array<{ start: number; end: number; text: string }> = [];
  let multilineGap = false;
  let gap = "";
  if (last) {
    gap = source.slice(last.end, close);
    if (!/^\s*,/.test(gap)) edits.push({ start: last.end, end: last.end, text: "," });
    multilineGap = /[\r\n]/.test(gap);
  } else {
    gap = source.slice(object.getStart() + 1, close);
    multilineGap = /[\r\n]/.test(gap);
  }
  const propertyIndent = `${closeIndent}  `;
  const relativePropertyIndent = multilineGap ? "  " : "";
  const entries = missing.map((component) => `${relativePropertyIndent}${component}: ${formatArray(values[component], source, close, propertyIndent)},`).join(newline);
  const insertion = multilineGap
    ? `${entries}${newline}${closeIndent}`
    : `${newline}${propertyIndent}${entries}${newline}${closeIndent}`;
  edits.push({ start: close, end: close, text: insertion });
  void fileName;
  return edits;
}

function getUniqueProperty(object: ts.ObjectLiteralExpression, name: string, fileName: string): ts.PropertyAssignment | undefined {
  const properties = object.properties.filter((property) => propertyName(property) === name);
  if (properties.length > 1) throw new Error(`${fileName}: duplicate property ${name}`);
  if (!properties.length) return undefined;
  if (!ts.isPropertyAssignment(properties[0])) throw new Error(`${fileName}: ${name} must be a property assignment`);
  return properties[0];
}

function findProperty(object: ts.ObjectLiteralExpression, name: string): ts.PropertyAssignment | undefined {
  const property = object.properties.find((candidate) => propertyName(candidate) === name);
  return property && ts.isPropertyAssignment(property) ? property : undefined;
}

function propertyName(property: ts.ObjectLiteralElementLike): string | undefined {
  if (!("name" in property) || !property.name) return undefined;
  if (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) || ts.isNumericLiteral(property.name)) return property.name.text;
  return undefined;
}

function parse(source: string, fileName: string): ts.SourceFile {
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const diagnostics = ts.transpileModule(source, {
    fileName,
    reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.Latest },
  }).diagnostics?.filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error) ?? [];
  if (diagnostics.length) {
    const first = diagnostics[0];
    throw new Error(`${fileName}: cannot rewrite invalid TypeScript: ${ts.flattenDiagnosticMessageText(first.messageText, " ")}`);
  }
  return sourceFile;
}

function ensureNoComments(source: string, array: ts.ArrayLiteralExpression, fileName: string): void {
  const start = array.getStart() + 1;
  const length = Math.max(0, array.end - start - 1);
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.Standard, source.slice(start, start + length));
  let token = scanner.scan();
  while (token !== ts.SyntaxKind.EndOfFileToken) {
    if (token === ts.SyntaxKind.SingleLineCommentTrivia || token === ts.SyntaxKind.MultiLineCommentTrivia) {
      throw new Error(`${fileName}: required arrays containing comments are left unchanged for manual review`);
    }
    token = scanner.scan();
  }
}

function formatArray(values: string[], source: string, start: number, indentationOverride?: string): string {
  if (values.length === 0) return "[]";
  const lineStart = Math.max(source.lastIndexOf("\n", start - 1), source.lastIndexOf("\r", start - 1)) + 1;
  const indentation = indentationOverride ?? source.slice(lineStart, start).match(/^\s*/)?.[0] ?? "";
  const newline = source.includes("\r\n") ? "\r\n" : "\n";
  const entries = values.map((value) => `${indentation}  ${JSON.stringify(value)},`).join(newline);
  return `[${newline}${entries}${newline}${indentation}]`;
}

function applyTextEdits(source: string, edits: Array<{ start: number; end: number; text: string }>): string {
  edits.sort((left, right) => right.start - left.start);
  let next = source;
  let previousStart = Number.POSITIVE_INFINITY;
  for (const edit of edits) {
    if (edit.end > previousStart) throw new Error("overlapping required-array source edits");
    next = `${next.slice(0, edit.start)}${edit.text}${next.slice(edit.end)}`;
    previousStart = edit.start;
  }
  return next;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
