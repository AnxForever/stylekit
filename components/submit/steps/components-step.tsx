"use client";

import { AlertCircle } from "lucide-react";

interface ComponentsStepProps {
  formData: {
    buttonCode: string;
    cardCode: string;
    inputCode: string;
    navCode: string;
    heroCode: string;
    footerCode: string;
  };
  updateField: (field: string, value: unknown) => void;
  getVisibleError: (field: string, step: number) => string;
  markTouched: (field: string) => void;
  isAnimating: boolean;
  text: {
    fields: {
      buttonCode: string;
      cardCode: string;
      inputCode: string;
      navCode: string;
      heroCode: string;
      footerCode: string;
    };
    placeholders: {
      input: string;
    };
    step4Tip: string;
  };
}

export function ComponentsStep({
  formData,
  updateField,
  getVisibleError,
  markTouched,
  isAnimating,
  text,
}: ComponentsStepProps) {
  return (
    <div className={`space-y-6 transition-opacity duration-150 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
      <div className="p-4 border border-border bg-zinc-50 dark:bg-zinc-900">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 text-muted" />
          <p className="text-sm text-muted">{text.step4Tip}</p>
        </div>
        {getVisibleError("components", 5) && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-3">
            <AlertCircle className="w-3 h-3" />
            {getVisibleError("components", 5)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-2">{text.fields.buttonCode}</label>
        <textarea
          value={formData.buttonCode}
          onChange={(e) => updateField("buttonCode", e.target.value)}
          onBlur={() => markTouched("components")}
          placeholder={`<button className="bg-[#ff006e] text-white font-black px-6 py-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
  Click me
</button>`}
          rows={6}
          className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors resize-none font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">{text.fields.cardCode}</label>
        <textarea
          value={formData.cardCode}
          onChange={(e) => updateField("cardCode", e.target.value)}
          onBlur={() => markTouched("components")}
          placeholder={`<div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
  <h3 className="font-black text-xl mb-2">Card title</h3>
  <p className="font-mono text-gray-700">Card content</p>
</div>`}
          rows={6}
          className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors resize-none font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">{text.fields.inputCode}</label>
        <textarea
          value={formData.inputCode}
          onChange={(e) => updateField("inputCode", e.target.value)}
          onBlur={() => markTouched("components")}
          placeholder={`<input
  type="text"
  placeholder="${text.placeholders.input}"
  className="w-full px-4 py-3 border-4 border-black bg-white font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
/>`}
          rows={6}
          className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors resize-none font-mono text-sm"
        />
      </div>

      {/* Optional extended components */}
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted mb-4">Optional (recommended for higher quality score)</p>
      </div>

      <div>
        <label className="block text-sm mb-2">{text.fields.navCode}</label>
        <textarea
          value={formData.navCode}
          onChange={(e) => updateField("navCode", e.target.value)}
          placeholder={`<nav className="flex items-center justify-between px-6 py-4 bg-black text-white border-b-4 border-[#ff006e]">
  <span className="font-black text-xl">BRAND</span>
  <div className="flex gap-6 font-mono text-sm uppercase">
    <a href="#" className="hover:text-[#ff006e]">Home</a>
    <a href="#" className="hover:text-[#ff006e]">About</a>
    <a href="#" className="hover:text-[#ff006e]">Contact</a>
  </div>
</nav>`}
          rows={6}
          className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors resize-none font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">{text.fields.heroCode}</label>
        <textarea
          value={formData.heroCode}
          onChange={(e) => updateField("heroCode", e.target.value)}
          placeholder={`<section className="py-20 px-6 bg-[#ff006e] text-white text-center">
  <h1 className="text-6xl font-black uppercase mb-4">Bold Statement</h1>
  <p className="text-xl font-mono max-w-2xl mx-auto mb-8">A short tagline that captures the style essence.</p>
  <button className="px-8 py-4 bg-black text-white font-black text-lg border-4 border-white hover:bg-white hover:text-black transition-all">
    Get Started
  </button>
</section>`}
          rows={6}
          className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors resize-none font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">{text.fields.footerCode}</label>
        <textarea
          value={formData.footerCode}
          onChange={(e) => updateField("footerCode", e.target.value)}
          placeholder={`<footer className="px-6 py-8 bg-black text-white border-t-4 border-[#ff006e]">
  <div className="flex justify-between items-center">
    <span className="font-black">BRAND</span>
    <span className="font-mono text-sm text-gray-400">Built with StyleKit</span>
  </div>
</footer>`}
          rows={6}
          className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors resize-none font-mono text-sm"
        />
      </div>
    </div>
  );
}
