"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { StyleGenForm, type StyleGenerationResponse } from "@/components/ai-generator/style-gen-form";
import { StyleGenResult } from "@/components/ai-generator/style-gen-result";

export function GenerateStyleContent() {
  const { t } = useI18n();
  const [result, setResult] = useState<StyleGenerationResponse | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <p className="text-xs tracking-widest text-muted uppercase mb-3">
            {t("aiGen.badge")}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
            {t("aiGen.title")}
          </h1>
          <p className="text-muted text-sm md:text-base max-w-2xl">
            {t("aiGen.description")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Form */}
          <div>
            <StyleGenForm onGenerate={setResult} />
          </div>

          {/* Right: Result */}
          <div>
            {result ? (
              <StyleGenResult result={result} />
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px] border border-dashed border-border rounded-lg">
                <p className="text-sm text-muted">
                  {t("aiGen.noResult")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
