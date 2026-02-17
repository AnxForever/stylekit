import type { StyleTokens } from "@/lib/styles/tokens";

interface CSBFile {
  content: string;
  isBinary: boolean;
}

function buildCSS(tokens: StyleTokens | null): string {
  const lines = [
    '@import "tailwindcss";',
    "",
  ];

  if (tokens) {
    lines.push(
      `:root {`,
      `  --style-border-width: ${tokens.border.width};`,
      `  --style-border-color: ${tokens.border.color};`,
      `  --style-border-radius: ${tokens.border.radius};`,
      `}`,
    );
  }

  return lines.join("\n");
}

function buildFiles(
  code: string,
  styleSlug: string,
  tokens: StyleTokens | null,
): Record<string, CSBFile> {
  const file = (content: string): CSBFile => ({ content, isBinary: false });

  return {
    "src/App.tsx": file(code),
    "src/main.tsx": file(
      [
        'import { StrictMode } from "react";',
        'import { createRoot } from "react-dom/client";',
        'import App from "./App";',
        'import "./index.css";',
        "",
        'createRoot(document.getElementById("root")!).render(',
        "  <StrictMode>",
        "    <App />",
        "  </StrictMode>,",
        ");",
      ].join("\n"),
    ),
    "src/index.css": file(buildCSS(tokens)),
    "public/index.html": file(
      [
        "<!DOCTYPE html>",
        '<html lang="en">',
        "  <head>",
        '    <meta charset="UTF-8" />',
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `    <title>StyleKit - ${styleSlug}</title>`,
        "  </head>",
        "  <body>",
        '    <div id="root"></div>',
        "  </body>",
        "</html>",
      ].join("\n"),
    ),
    "tsconfig.json": file(
      JSON.stringify(
        {
          compilerOptions: {
            target: "ES2020",
            lib: ["ES2020", "DOM", "DOM.Iterable"],
            module: "ESNext",
            skipLibCheck: true,
            moduleResolution: "bundler",
            allowImportingTsExtensions: true,
            isolatedModules: true,
            noEmit: true,
            jsx: "react-jsx",
            strict: true,
          },
          include: ["src"],
        },
        null,
        2,
      ),
    ),
    "package.json": file(
      JSON.stringify(
        {
          name: `stylekit-${styleSlug}`,
          private: true,
          main: "src/main.tsx",
          dependencies: {
            react: "^19.0.0",
            "react-dom": "^19.0.0",
            "react-scripts": "5.0.1",
            tailwindcss: "^4.0.0",
            typescript: "^5.6.0",
            "@types/react": "^19.0.0",
            "@types/react-dom": "^19.0.0",
          },
        },
        null,
        2,
      ),
    ),
  };
}

function encodeBase64Utf8(value: string): string {
  const bytes = new TextEncoder().encode(value);
  const chunkSize = 0x8000;
  let binary = "";

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

// Compress files into CodeSandbox parameters using form POST approach
function compressFiles(files: Record<string, CSBFile>): string {
  const payload = JSON.stringify({ files });
  // Base64 encode for the form submission with UTF-8 safety
  return encodeBase64Utf8(payload);
}

export async function openInCodeSandbox(
  code: string,
  styleSlug: string,
  tokens: StyleTokens | null,
): Promise<void> {
  const files = buildFiles(code, styleSlug, tokens);
  const parameters = compressFiles(files);

  // Use a hidden form to POST to CodeSandbox define API
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://codesandbox.io/api/v1/sandboxes/define";
  form.target = "_blank";

  const paramInput = document.createElement("input");
  paramInput.type = "hidden";
  paramInput.name = "parameters";
  paramInput.value = parameters;
  form.appendChild(paramInput);

  const queryInput = document.createElement("input");
  queryInput.type = "hidden";
  queryInput.name = "query";
  queryInput.value = "file=/src/App.tsx";
  form.appendChild(queryInput);

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
