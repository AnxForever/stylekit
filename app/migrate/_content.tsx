"use client";

import { ArrowRightLeft } from "lucide-react";
import { ThemeImporter } from "@/components/migration/theme-importer";

export function MigrateContent() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
      <div className="mb-8">
        <p className="text-sm font-medium text-muted-foreground mb-1">
          Migration Tool
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
          <ArrowRightLeft className="w-7 h-7" />
          Import Design System Theme
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Paste your Material UI, Ant Design, or Chakra UI theme configuration
          below to convert it into StyleKit tokens. The importer maps colors,
          typography, spacing, borders, and shadows to their closest StyleKit
          equivalents.
        </p>
      </div>

      <ThemeImporter />
    </div>
  );
}
