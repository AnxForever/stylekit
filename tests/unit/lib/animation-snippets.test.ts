import { describe, expect, it } from "vitest";
import ts from "typescript";
import { getAllAnimations } from "@/lib/animations";

describe("animation TSX snippets", () => {
  it("keeps every published TSX snippet syntactically valid", () => {
    const invalidSnippets: string[] = [];
    const hookSnippetsWithoutClientDirective: string[] = [];

    for (const animation of getAllAnimations()) {
      for (const [index, snippet] of animation.codeSnippets.entries()) {
        if (snippet.language !== "tsx") continue;

        const { diagnostics = [] } = ts.transpileModule(snippet.code, {
          fileName: `${animation.slug}-${index}.tsx`,
          compilerOptions: {
            jsx: ts.JsxEmit.Preserve,
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ESNext,
          },
          reportDiagnostics: true,
        });

        for (const diagnostic of diagnostics) {
          if (diagnostic.category !== ts.DiagnosticCategory.Error) continue;
          const location = diagnostic.file?.getLineAndCharacterOfPosition(diagnostic.start ?? 0);
          invalidSnippets.push(
            `${animation.slug}/${snippet.label}:${(location?.line ?? 0) + 1} ${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")}`
          );
        }

        const source = ts.createSourceFile(
          `${animation.slug}-${index}.tsx`,
          snippet.code,
          ts.ScriptTarget.Latest,
          true,
          ts.ScriptKind.TSX
        );

        const importsClientHook = source.statements.some((statement) => {
          if (
            !ts.isImportDeclaration(statement) ||
            !ts.isStringLiteral(statement.moduleSpecifier) ||
            !["react", "framer-motion"].includes(statement.moduleSpecifier.text)
          ) {
            return false;
          }

          const bindings = statement.importClause?.namedBindings;
          return (
            !!bindings &&
            ts.isNamedImports(bindings) &&
            bindings.elements.some((specifier) => /^use[A-Z]/.test(specifier.name.text))
          );
        });

        if (importsClientHook && !snippet.code.trimStart().startsWith('"use client";')) {
          hookSnippetsWithoutClientDirective.push(`${animation.slug}/${snippet.label}`);
        }

      }
    }

    expect(invalidSnippets).toEqual([]);
    expect(hookSnippetsWithoutClientDirective).toEqual([]);
  });
});
