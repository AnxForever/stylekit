"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Check, ChevronRight, ChevronLeft, Save, RotateCcw,
  X, AlertCircle, FileText, Palette, Type, Layers,
  Code, Eye, Send
} from "lucide-react";
import type { StyleCategory, StyleType, StyleTag } from "@/lib/styles/meta";
import type { Locale } from "@/lib/i18n/translations";
import { formatLocaleDateTime, pickLocale } from "@/lib/i18n/locale-copy";
import { parseStyleExtractorInput, type ExtractedStyleDraft } from "@/lib/style-extractor/adapter";
import { submitCopy } from "@/lib/i18n/submit-copy";
import { stylesMeta } from "@/lib/styles/meta";
import { BasicInfoStep } from "./steps/basic-info-step";
import { ColorPaletteStep } from "./steps/color-palette-step";
import { TypographyStep } from "./steps/typography-step";
import { RulesStep } from "./steps/rules-step";
import { ComponentsStep } from "./steps/components-step";
import { PreviewValidateStep } from "./steps/preview-validate-step";
import { SubmitStep } from "./steps/submit-step";

// ── Form Data ──────────────────────────────────────────────────────
export interface WizardFormData {
  name: string; nameEn: string; slug: string; description: string;
  category: StyleCategory; styleType: StyleType; tags: StyleTag[];
  primaryColor: string; secondaryColor: string; accentColors: string[];
  background: string; foreground: string; muted: string;
  keywords: string[]; philosophy: string;
  headingFont: string; bodyFont: string;
  fontSizeBase: string; fontSizeHeading: string; fontSizeSmall: string;
  fontWeightNormal: string; fontWeightBold: string;
  lineHeightNormal: string; lineHeightTight: string;
  borderRadius: string; spacingSm: string; spacingMd: string; spacingLg: string;
  doList: string[]; dontList: string[]; aiRules: string[];
  buttonCode: string; cardCode: string; inputCode: string;
}

const initial: WizardFormData = {
  name: "", nameEn: "", slug: "", description: "",
  category: "modern", styleType: "visual", tags: [],
  primaryColor: "#000000", secondaryColor: "#ffffff", accentColors: ["#3b82f6"],
  background: "#ffffff", foreground: "#0f172a", muted: "#64748b",
  keywords: [], philosophy: "",
  headingFont: "system-ui, -apple-system, sans-serif",
  bodyFont: "system-ui, -apple-system, sans-serif",
  fontSizeBase: "1rem", fontSizeHeading: "2.25rem", fontSizeSmall: "0.875rem",
  fontWeightNormal: "400", fontWeightBold: "700",
  lineHeightNormal: "1.5", lineHeightTight: "1.25",
  borderRadius: "0.5rem", spacingSm: "0.5rem", spacingMd: "1rem", spacingLg: "2rem",
  doList: [""], dontList: [""], aiRules: [""],
  buttonCode: "", cardCode: "", inputCode: "",
};

// ── Constants ──────────────────────────────────────────────────────
const STORAGE_KEY = "stylekit-submit-draft-v2";
const LOCALE_KEY = "stylekit-submit-locale";
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const TOTAL_STEPS = 7;

const stepIcons = [FileText, Palette, Type, Layers, Code, Eye, Send] as const;

function hasMeaningful(d: WizardFormData) {
  return !!(d.name.trim() || d.nameEn.trim() || d.slug.trim() ||
    d.description.trim() || d.keywords.length || d.philosophy.trim() ||
    d.doList.some(i => i.trim()) || d.buttonCode.trim() || d.cardCode.trim());
}

function validate(d: WizardFormData, locale: Locale) {
  const t = submitCopy[locale].validation;
  const e: Record<string, string> = {};
  if (!d.name.trim() && !d.nameEn.trim()) e.name = t.name;
  const s = d.slug.trim();
  if (!s) e.slug = t.slugRequired;
  else if (!SLUG_RE.test(s)) e.slug = t.slug;
  else if (stylesMeta.some(x => x.slug === s)) e.slug = t.slugDuplicate;
  if (!HEX_RE.test(d.primaryColor.trim())) e.primaryColor = t.primaryColor;
  if (!HEX_RE.test(d.secondaryColor.trim())) e.secondaryColor = t.secondaryColor;
  const bad = d.accentColors.findIndex(c => !HEX_RE.test(c.trim()));
  if (bad >= 0) e.accentColors = `${t.accentColorPrefix}${bad + 1}${t.accentColorSuffix}`;
  if (!d.doList.some(i => i.trim())) e.doList = t.doList;
  if (![d.buttonCode, d.cardCode, d.inputCode].some(c => c.trim())) e.components = t.components;
  return e;
}

const stepFields: Record<number, string[]> = {
  1: ["name", "slug"], 2: ["primaryColor", "secondaryColor", "accentColors"],
  4: ["doList"], 5: ["components"],
};

// ── Component ──────────────────────────────────────────────────────
export function SubmissionWizard() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "zh";
    const s = window.localStorage.getItem(LOCALE_KEY);
    return s === "en" || s === "zh" ? s : "zh";
  });
  const [fd, setFd] = useState<WizardFormData>(initial);
  const [step, setStep] = useState(1);
  const [anim, setAnim] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [stepVal, setStepVal] = useState<Record<number, boolean>>({});
  const [hasDraft, setHasDraft] = useState(false);
  const [showDraft, setShowDraft] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [keywordInput, setKeywordInput] = useState("");
  const [extractUrl, setExtractUrl] = useState("");
  const [isExtractingUrl, setIsExtractingUrl] = useState(false);
  const [extractInput, setExtractInput] = useState("");
  const [extractMsg, setExtractMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const lastFP = useRef("");
  const text = pickLocale(locale, submitCopy);
  const errors = useMemo(() => validate(fd, locale), [fd, locale]);

  useEffect(() => { localStorage.setItem(LOCALE_KEY, locale); }, [locale]);

  // Draft load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.data && hasMeaningful(parsed.data)) {
        setHasDraft(true);
        setShowDraft(true);
        lastFP.current = JSON.stringify(parsed.data);
      }
    } catch { /* ignore */ }
  }, []);

  // Auto-save
  useEffect(() => {
    if (!hasMeaningful(fd)) return;
    const fp = JSON.stringify(fd);
    if (fp === lastFP.current) return;
    setSaveStatus("saving");
    const t = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: fd, at: new Date().toISOString() }));
      lastFP.current = fp;
      setHasDraft(true);
      setSaveStatus("saved");
    }, 500);
    return () => clearTimeout(t);
  }, [fd]);

  const loadDraft = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const p = JSON.parse(raw);
      if (p?.data) { setFd({ ...initial, ...p.data }); setShowDraft(false); }
    } catch { /* ignore */ }
  };

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFd(initial); setHasDraft(false); setShowDraft(false);
    setTouched({}); setStepVal({}); setSaveStatus("idle");
    lastFP.current = "";
  };

  const markTouched = useCallback((f: string) => {
    setTouched(p => p[f] ? p : { ...p, [f]: true });
  }, []);

  const getVisibleError = useCallback((f: string, s: number) => {
    if (!stepVal[s] && !touched[f]) return "";
    return errors[f] ?? "";
  }, [stepVal, touched, errors]);

  const updateField = useCallback((f: string, v: unknown) => {
    setFd(p => ({ ...p, [f]: v }));
  }, []);

  const validateStep = useCallback((s: number) => {
    const fields = stepFields[s] ?? [];
    const hasErr = fields.some(f => !!errors[f]);
    if (!hasErr) return true;
    setStepVal(p => ({ ...p, [s]: true }));
    setTouched(p => {
      const n = { ...p };
      for (const f of fields) n[f] = true;
      return n;
    });
    return false;
  }, [errors]);

  const goStep = (target: number) => {
    if (target < step) { setAnim(true); setTimeout(() => { setStep(target); setAnim(false); }, 150); return; }
    if (target > step) {
      for (let i = step; i < target; i++) { if (!validateStep(i)) return; }
      setAnim(true); setTimeout(() => { setStep(target); setAnim(false); }, 150);
    }
  };

  const nextStep = () => { if (validateStep(step) && step < TOTAL_STEPS) goStep(step + 1); };
  const prevStep = () => { if (step > 1) goStep(step - 1); };

  const generateSlug = (n: string) => n.toLowerCase().replace(/[\u4e00-\u9fa5]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleNameEnChange = (v: string) => {
    updateField("nameEn", v);
    if (!fd.slug) updateField("slug", generateSlug(v));
  };

  const handleSlugChange = (v: string) => {
    updateField("slug", v.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-{2,}/g, "-").replace(/^-|-$/g, ""));
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !fd.keywords.includes(keywordInput.trim())) {
      updateField("keywords", [...fd.keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (k: string) => updateField("keywords", fd.keywords.filter(x => x !== k));

  const toggleTag = (t: StyleTag) => {
    updateField("tags", fd.tags.includes(t) ? fd.tags.filter(x => x !== t) : [...fd.tags, t]);
  };

  const addAccentColor = () => { if (fd.accentColors.length < 5) updateField("accentColors", [...fd.accentColors, "#3b82f6"]); };
  const updateAccentColor = (i: number, v: string) => { const n = [...fd.accentColors]; n[i] = v; updateField("accentColors", n); };
  const removeAccentColor = (i: number) => { if (fd.accentColors.length > 1) updateField("accentColors", fd.accentColors.filter((_, j) => j !== i)); };

  const applyExtractedData = (data: ExtractedStyleDraft, src: string) => {
    setFd(p => {
      const n = { ...p,
        name: data.name ?? p.name, nameEn: data.nameEn ?? p.nameEn,
        slug: data.slug ?? p.slug, description: data.description ?? p.description,
        category: data.category ?? p.category, styleType: data.styleType ?? p.styleType,
        tags: data.tags?.length ? data.tags : p.tags,
        primaryColor: data.primaryColor ?? p.primaryColor,
        secondaryColor: data.secondaryColor ?? p.secondaryColor,
        accentColors: data.accentColors?.length ? data.accentColors : p.accentColors,
        keywords: data.keywords?.length ? data.keywords : p.keywords,
        philosophy: data.philosophy ?? p.philosophy,
        doList: data.doList?.length ? data.doList : p.doList,
        dontList: data.dontList?.length ? data.dontList : p.dontList,
        buttonCode: data.buttonCode ?? p.buttonCode,
        cardCode: data.cardCode ?? p.cardCode,
        inputCode: data.inputCode ?? p.inputCode,
      };
      if (!n.slug) { const seed = n.nameEn || n.name; if (seed) n.slug = generateSlug(seed); }
      return n;
    });
    setExtractMsg({ type: "success", text: `${text.extractorSuccessPrefix} ${src}` });
  };

  const applyExtractedDraft = () => {
    const p = parseStyleExtractorInput(extractInput);
    if (!p.ok || !p.data) { setExtractMsg({ type: "error", text: `${text.extractorErrorPrefix} ${p.error ?? "Unknown"}` }); return; }
    applyExtractedData(p.data, p.source === "json" ? text.extractorJsonSource : text.extractorMarkdownSource);
  };

  const extractFromUrl = async () => {
    const u = extractUrl.trim(); if (!u) return;
    setIsExtractingUrl(true); setExtractMsg(null);
    try {
      const r = await fetch("/api/style-extract", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: u }) });
      const j = await r.json() as { draft?: ExtractedStyleDraft; raw?: string; error?: string };
      if (!r.ok) { setExtractMsg({ type: "error", text: `${text.extractorErrorPrefix} ${j.error ?? `HTTP ${r.status}`}` }); return; }
      const raw = (typeof j.raw === "string" && j.raw.trim()) ? j.raw : (j.draft ? JSON.stringify(j.draft, null, 2) : "");
      if (!raw) { setExtractMsg({ type: "error", text: `${text.extractorErrorPrefix} Empty output` }); return; }
      setExtractInput(raw);
      const p = parseStyleExtractorInput(raw);
      if (!p.ok || !p.data) { setExtractMsg({ type: "error", text: `${text.extractorErrorPrefix} ${p.error ?? "Unknown"}` }); return; }
      const host = (() => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } })();
      applyExtractedData(p.data, `${text.extractorUrlSource} (${host})`);
    } catch (e) { setExtractMsg({ type: "error", text: `${text.extractorErrorPrefix} ${(e as Error).message}` }); }
    finally { setIsExtractingUrl(false); }
  };

  const pct = (() => {
    let f = 0; const t = 8;
    if (fd.name || fd.nameEn) f += 2;
    if (fd.description) f++;
    if (fd.primaryColor && fd.secondaryColor) f++;
    if (fd.headingFont && fd.bodyFont) f++;
    if (fd.doList.some(i => i.trim())) f++;
    if (fd.aiRules.some(i => i.trim())) f++;
    if (fd.buttonCode || fd.cardCode || fd.inputCode) f++;
    return Math.round((f / t) * 100);
  })();

  const stepInfo = [
    { title: text.stepInfo[0].title, desc: text.stepInfo[0].desc },
    { title: text.stepInfo[1].title, desc: text.stepInfo[1].desc },
    { title: "Typography", desc: "Fonts, sizes, spacing" },
    { title: text.stepInfo[2].title, desc: text.stepInfo[2].desc },
    { title: text.stepInfo[3].title, desc: text.stepInfo[3].desc },
    { title: "Preview", desc: "Validate & score" },
    { title: "Submit", desc: "Download or GitHub" },
  ];

  return (
    <>
      {/* Draft Notice */}
      {showDraft && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-background border border-border shadow-lg p-4 max-w-md animate-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
            <Save className="w-5 h-5 text-muted mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">{text.draftNoticeTitle}</p>
              <p className="text-xs text-muted mb-3">{text.draftNoticeDescription}</p>
              <div className="flex gap-2">
                <button onClick={loadDraft} className="px-3 py-1.5 text-xs bg-foreground text-background hover:bg-foreground/90 transition-colors">{text.continueEditing}</button>
                <button onClick={() => setShowDraft(false)} className="px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors">{text.startFresh}</button>
              </div>
            </div>
            <button onClick={() => setShowDraft(false)} className="text-muted hover:text-foreground"><X className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-16">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6">
            <ChevronLeft className="w-4 h-4" />{text.back}
          </button>
          <div className="mb-6 flex justify-end">
            <button type="button" onClick={() => setLocale(p => p === "en" ? "zh" : "en")} title={text.localeButtonTitle} className="px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors">{text.localeSwitch}</button>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-2 md:mb-4">{text.submitStyleLabel}</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-4">{text.submitStyleTitle}</h1>
              <p className="text-base md:text-lg text-muted max-w-xl">{text.submitStyleDescription}</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-foreground transition-all duration-300" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-muted">{pct}%</span>
                {hasDraft && (
                  <button onClick={clearDraft} className="text-muted hover:text-foreground transition-colors" title={text.clearDraftTitle}>
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-xs text-muted">
                {saveStatus === "saving" && text.saving}
                {saveStatus === "saved" && text.savedPrefix}
                {saveStatus === "idle" && text.noDraft}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-12">
          {/* Desktop Steps */}
          <div className="hidden lg:block mb-12">
            <div className="flex items-center justify-between">
              {stepIcons.map((Icon, idx) => {
                const s = idx + 1;
                return (
                  <div key={s} className="flex items-center flex-1">
                    <button onClick={() => goStep(s)} className={`flex items-center gap-2 p-2 border-2 transition-all text-left ${
                      step === s ? "bg-foreground text-background border-foreground" :
                      step > s ? "bg-foreground/5 border-foreground text-foreground" :
                      "border-border text-muted hover:border-foreground/50"
                    }`}>
                      <div className="w-7 h-7 flex items-center justify-center shrink-0">
                        {step > s ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate">{stepInfo[idx].title}</p>
                      </div>
                    </button>
                    {s < TOTAL_STEPS && <div className={`flex-1 h-0.5 mx-1 transition-colors ${step > s ? "bg-foreground" : "bg-border"}`} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Steps */}
          <div className="lg:hidden mb-8">
            <div className="flex items-center justify-between mb-4 overflow-x-auto gap-1">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map(s => (
                <button key={s} onClick={() => goStep(s)} className={`w-9 h-9 flex items-center justify-center border-2 transition-colors shrink-0 text-sm ${
                  step === s ? "bg-foreground text-background border-foreground" :
                  step > s ? "bg-foreground/10 border-foreground" : "border-border text-muted"
                }`}>{step > s ? <Check className="w-3 h-3" /> : s}</button>
              ))}
            </div>
            <div className="text-center">
              <p className="font-medium">{stepInfo[step - 1].title}</p>
              <p className="text-xs text-muted">{stepInfo[step - 1].desc}</p>
            </div>
          </div>

          {/* Step Content */}
          {step === 1 && <BasicInfoStep formData={fd} updateField={updateField} getVisibleError={getVisibleError} markTouched={markTouched} isAnimating={anim} text={text} extractUrl={extractUrl} setExtractUrl={setExtractUrl} isExtractingUrl={isExtractingUrl} extractFromUrl={extractFromUrl} extractInput={extractInput} setExtractInput={setExtractInput} extractMessage={extractMsg} setExtractMessage={setExtractMsg} applyExtractedDraft={applyExtractedDraft} handleNameEnChange={handleNameEnChange} handleSlugChange={handleSlugChange} keywordInput={keywordInput} setKeywordInput={setKeywordInput} addKeyword={addKeyword} removeKeyword={removeKeyword} toggleTag={toggleTag} />}
          {step === 2 && <ColorPaletteStep formData={fd} updateField={updateField} getVisibleError={getVisibleError} markTouched={markTouched} isAnimating={anim} text={text} addAccentColor={addAccentColor} updateAccentColor={updateAccentColor} removeAccentColor={removeAccentColor} />}
          {step === 3 && <TypographyStep formData={fd} updateField={updateField} isAnimating={anim} />}
          {step === 4 && <RulesStep formData={fd} updateField={updateField} getVisibleError={getVisibleError} markTouched={markTouched} isAnimating={anim} text={text} />}
          {step === 5 && <ComponentsStep formData={fd} updateField={updateField} getVisibleError={getVisibleError} markTouched={markTouched} isAnimating={anim} text={text} />}
          {step === 6 && <PreviewValidateStep formData={fd} isAnimating={anim} />}
          {step === 7 && <SubmitStep formData={fd} isAnimating={anim} text={text} />}

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
            <button type="button" onClick={prevStep} disabled={step === 1} className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border border-border hover:border-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1">
              <ChevronLeft className="w-4 h-4" />
              <span>{text.previous}</span>
            </button>
            <div className="flex gap-2 sm:gap-3 order-1 sm:order-2">
              {step < TOTAL_STEPS && (
                <button type="button" onClick={nextStep} className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors flex-1 sm:flex-none">
                  <span>{text.next}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
