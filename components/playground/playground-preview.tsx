"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Loader2 } from "lucide-react";

interface PlaygroundPreviewProps {
  code: string;
  styleSlug: string;
  /** CSS variables/tokens to inject as inline styles */
  tokenCss: string;
  deviceWidth?: number;
}

function buildSrcdoc(code: string, tokenCss: string): string {
  // Escape closing script tags in user code to prevent srcdoc breakout
  const safeCode = code.replace(/<\/script/gi, "<\\/script");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; }
    ${tokenCss}
  </style>
</head>
<body>
  <div id="preview-root">${safeCode}</div>
</body>
</html>`;
}

export function PlaygroundPreview({
  code,
  styleSlug,
  tokenCss,
  deviceWidth,
}: PlaygroundPreviewProps) {
  const [debouncedCode, setDebouncedCode] = useState(code);
  const [debouncedTokenCss, setDebouncedTokenCss] = useState(tokenCss);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Derive loading from whether inputs differ from debounced values
  const loading = code !== debouncedCode || tokenCss !== debouncedTokenCss;

  // Debounce code + tokenCss updates
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedCode(code);
      setDebouncedTokenCss(tokenCss);
    }, 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [code, tokenCss]);

  const srcdoc = useMemo(
    () => buildSrcdoc(debouncedCode, debouncedTokenCss),
    [debouncedCode, debouncedTokenCss]
  );

  return (
    <div className="relative h-full w-full bg-white dark:bg-zinc-900">
      {loading && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-xs text-muted">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>Updating...</span>
        </div>
      )}
      <iframe
        key={styleSlug}
        srcDoc={srcdoc}
        className="w-full h-full border-0"
        style={deviceWidth ? { maxWidth: deviceWidth } : undefined}
        title="Preview"
        sandbox="allow-scripts"
      />
    </div>
  );
}
