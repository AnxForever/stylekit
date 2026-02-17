import type { StyleTokens } from "@/lib/styles/tokens";

interface StackBlitzProject {
  title: string;
  description: string;
  template: "node";
  files: Record<string, string>;
  dependencies: Record<string, string>;
}

interface StackBlitzSDK {
  openProject: (
    project: {
      title: string;
      description: string;
      template: string;
      files: Record<string, string>;
    },
    opts?: { openFile?: string },
  ) => void;
}

type StackBlitzWindow = Window & { StackBlitzSDK?: StackBlitzSDK };

const STACKBLITZ_SDK_URL = "https://unpkg.com/@stackblitz/sdk@1.11.0/bundles/sdk.umd.js";

async function loadStackBlitzSdk(): Promise<StackBlitzSDK> {
  const win = window as StackBlitzWindow;
  if (win.StackBlitzSDK) return win.StackBlitzSDK;

  const existing = document.querySelector<HTMLScriptElement>('script[data-stackblitz-sdk="true"]');
  if (existing) {
    if (existing.dataset.loaded === "true") {
      if (win.StackBlitzSDK) return win.StackBlitzSDK;
      throw new Error("StackBlitz SDK script is loaded, but global API was not found.");
    }

    await new Promise<void>((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load StackBlitz SDK.")), {
        once: true,
      });
    });
    if (win.StackBlitzSDK) return win.StackBlitzSDK;
    throw new Error("StackBlitz SDK loaded, but global API was not found.");
  }

  const script = document.createElement("script");
  script.src = STACKBLITZ_SDK_URL;
  script.async = true;
  script.defer = true;
  script.dataset.stackblitzSdk = "true";

  await new Promise<void>((resolve, reject) => {
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load StackBlitz SDK."));
    document.body.appendChild(script);
  });

  if (!win.StackBlitzSDK) {
    throw new Error("StackBlitz SDK loaded, but global API was not found.");
  }

  return win.StackBlitzSDK;
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

function buildProject(
  code: string,
  styleSlug: string,
  tokens: StyleTokens | null,
): StackBlitzProject {
  return {
    title: `StyleKit - ${styleSlug}`,
    description: `Exported from StyleKit playground (${styleSlug} style)`,
    template: "node",
    files: {
      "src/App.tsx": code,
      "src/main.tsx": [
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
      "src/index.css": buildCSS(tokens),
      "index.html": [
        "<!DOCTYPE html>",
        '<html lang="en">',
        "  <head>",
        '    <meta charset="UTF-8" />',
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        `    <title>StyleKit - ${styleSlug}</title>`,
        "  </head>",
        "  <body>",
        '    <div id="root"></div>',
        '    <script type="module" src="/src/main.tsx"></script>',
        "  </body>",
        "</html>",
      ].join("\n"),
      "vite.config.ts": [
        'import { defineConfig } from "vite";',
        'import react from "@vitejs/plugin-react";',
        "",
        "export default defineConfig({",
        "  plugins: [react()],",
        "});",
      ].join("\n"),
      "tsconfig.json": JSON.stringify(
        {
          compilerOptions: {
            target: "ES2020",
            useDefineForClassFields: true,
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
      "package.json": JSON.stringify(
        {
          name: `stylekit-${styleSlug}`,
          private: true,
          type: "module",
          scripts: {
            dev: "vite",
            build: "vite build",
          },
          dependencies: {
            react: "^19.0.0",
            "react-dom": "^19.0.0",
          },
          devDependencies: {
            "@vitejs/plugin-react": "^4.3.0",
            tailwindcss: "^4.0.0",
            typescript: "^5.6.0",
            vite: "^6.0.0",
            "@types/react": "^19.0.0",
            "@types/react-dom": "^19.0.0",
          },
        },
        null,
        2,
      ),
    },
    dependencies: {},
  };
}

export async function openInStackBlitz(
  code: string,
  styleSlug: string,
  tokens: StyleTokens | null,
): Promise<void> {
  const project = buildProject(code, styleSlug, tokens);
  const sdk = await loadStackBlitzSdk();
  sdk.openProject(
    {
      title: project.title,
      description: project.description,
      template: project.template,
      files: project.files,
    },
    { openFile: "src/App.tsx" },
  );
}
