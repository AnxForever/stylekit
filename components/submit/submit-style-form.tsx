"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Check, Copy, Eye, Send, AlertCircle, ChevronRight,
  ChevronLeft, Sparkles, X, Save, RotateCcw, Palette,
  Code, FileText, Layers
} from "lucide-react";
import type { StyleCategory, StyleType, StyleTag } from "@/lib/styles/meta";
import type { Locale } from "@/lib/i18n/translations";
import { formatLocaleDateTime, pickLocale } from "@/lib/i18n/locale-copy";
import {
  parseStyleExtractorInput,
  type ExtractedStyleDraft,
} from "@/lib/style-extractor/adapter";
import { submitCopy } from "@/lib/i18n/submit-copy";

interface StyleFormData {
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  category: StyleCategory;
  styleType: StyleType;
  tags: StyleTag[];
  primaryColor: string;
  secondaryColor: string;
  accentColors: string[];
  keywords: string[];
  philosophy: string;
  doList: string[];
  dontList: string[];
  buttonCode: string;
  cardCode: string;
  inputCode: string;
}

const initialFormData: StyleFormData = {
  name: "",
  nameEn: "",
  slug: "",
  description: "",
  category: "modern",
  styleType: "visual",
  tags: [],
  primaryColor: "#000000",
  secondaryColor: "#ffffff",
  accentColors: ["#3b82f6"],
  keywords: [],
  philosophy: "",
  doList: [""],
  dontList: [""],
  buttonCode: "",
  cardCode: "",
  inputCode: "",
};

const categoryOptions: StyleCategory[] = ["modern", "minimal", "expressive", "retro"];
const typeOptions: StyleType[] = ["visual", "layout", "animation"];
const tagOptions: StyleTag[] = ["modern", "minimal", "expressive", "retro", "high-contrast", "responsive", "brand-inspired"];
const stepIcons = [FileText, Palette, Layers, Code] as const;



const STORAGE_KEY = "stylekit-submit-draft";
const STORAGE_HISTORY_KEY = "stylekit-submit-draft-history";
const LOCALE_STORAGE_KEY = "stylekit-submit-locale";
const DRAFT_SCHEMA_VERSION = 1;
const MAX_DRAFT_HISTORY = 8;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

interface StoredDraft {
  schemaVersion: number;
  revision: number;
  updatedAt: string;
  data: StyleFormData;
}

interface DraftMeta {
  revision: number;
  updatedAt: string;
}

const stepFieldMap: Record<number, string[]> = {
  1: ["name", "slug"],
  2: ["primaryColor", "secondaryColor", "accentColors"],
  3: ["doList"],
  4: ["components"],
};

const styleCategoryValues: StyleCategory[] = ["modern", "minimal", "expressive", "retro"];
const styleTypeValues: StyleType[] = ["visual", "layout", "animation"];
const styleTagValues: StyleTag[] = ["modern", "minimal", "expressive", "retro", "high-contrast", "responsive", "brand-inspired"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function normalizeTags(value: unknown): StyleTag[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is StyleTag =>
      typeof item === "string" && styleTagValues.includes(item as StyleTag)
  );
}

function normalizeFormData(value: unknown): StyleFormData {
  if (!isRecord(value)) return { ...initialFormData };

  const category = normalizeString(value.category);
  const styleType = normalizeString(value.styleType);
  const accentColors = normalizeStringArray(value.accentColors);
  const doList = normalizeStringArray(value.doList);
  const dontList = normalizeStringArray(value.dontList);

  return {
    name: normalizeString(value.name),
    nameEn: normalizeString(value.nameEn),
    slug: normalizeString(value.slug),
    description: normalizeString(value.description),
    category: styleCategoryValues.includes(category as StyleCategory)
      ? (category as StyleCategory)
      : initialFormData.category,
    styleType: styleTypeValues.includes(styleType as StyleType)
      ? (styleType as StyleType)
      : initialFormData.styleType,
    tags: normalizeTags(value.tags),
    primaryColor: normalizeString(value.primaryColor) || initialFormData.primaryColor,
    secondaryColor: normalizeString(value.secondaryColor) || initialFormData.secondaryColor,
    accentColors: accentColors.length > 0 ? accentColors : [...initialFormData.accentColors],
    keywords: normalizeStringArray(value.keywords).map((keyword) => keyword.trim()).filter(Boolean),
    philosophy: normalizeString(value.philosophy),
    doList: doList.length > 0 ? doList : [""],
    dontList: dontList.length > 0 ? dontList : [""],
    buttonCode: normalizeString(value.buttonCode),
    cardCode: normalizeString(value.cardCode),
    inputCode: normalizeString(value.inputCode),
  };
}

function hasMeaningfulContent(data: StyleFormData): boolean {
  return Boolean(
    data.name.trim() ||
      data.nameEn.trim() ||
      data.slug.trim() ||
      data.description.trim() ||
      data.keywords.length > 0 ||
      data.philosophy.trim() ||
      data.doList.some((item) => item.trim()) ||
      data.dontList.some((item) => item.trim()) ||
      data.buttonCode.trim() ||
      data.cardCode.trim() ||
      data.inputCode.trim()
  );
}

function parseStoredDraft(raw: string | null): StoredDraft | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);

    if (
      isRecord(parsed) &&
      typeof parsed.revision === "number" &&
      typeof parsed.updatedAt === "string" &&
      "data" in parsed
    ) {
      return {
        schemaVersion: DRAFT_SCHEMA_VERSION,
        revision: Math.max(1, Math.floor(parsed.revision)),
        updatedAt: parsed.updatedAt,
        data: normalizeFormData(parsed.data),
      };
    }

    const legacyData = normalizeFormData(parsed);
    if (!hasMeaningfulContent(legacyData)) return null;

    return {
      schemaVersion: DRAFT_SCHEMA_VERSION,
      revision: 1,
      updatedAt: new Date().toISOString(),
      data: legacyData,
    };
  } catch {
    return null;
  }
}

function parseDraftHistory(raw: string | null): StoredDraft[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => {
        if (
          isRecord(item) &&
          typeof item.revision === "number" &&
          typeof item.updatedAt === "string" &&
          "data" in item
        ) {
          return {
            schemaVersion: DRAFT_SCHEMA_VERSION,
            revision: Math.max(1, Math.floor(item.revision)),
            updatedAt: item.updatedAt,
            data: normalizeFormData(item.data),
          } satisfies StoredDraft;
        }
        return null;
      })
      .filter((item): item is StoredDraft => item !== null)
      .sort((a, b) => b.revision - a.revision)
      .slice(0, MAX_DRAFT_HISTORY);
  } catch {
    return [];
  }
}

function getFormFingerprint(data: StyleFormData): string {
  return JSON.stringify(data);
}

function validateFormData(data: StyleFormData, locale: Locale): Record<string, string> {
  const text = submitCopy[locale].validation;
  const nextErrors: Record<string, string> = {};

  if (!data.name.trim() && !data.nameEn.trim()) {
    nextErrors.name = text.name;
  }

  const slug = data.slug.trim();
  if (slug && !SLUG_PATTERN.test(slug)) {
    nextErrors.slug = text.slug;
  }

  if (!HEX_COLOR_PATTERN.test(data.primaryColor.trim())) {
    nextErrors.primaryColor = text.primaryColor;
  }

  if (!HEX_COLOR_PATTERN.test(data.secondaryColor.trim())) {
    nextErrors.secondaryColor = text.secondaryColor;
  }

  const invalidAccentIndex = data.accentColors.findIndex(
    (color) => !HEX_COLOR_PATTERN.test(color.trim())
  );
  if (invalidAccentIndex >= 0) {
    nextErrors.accentColors = `${text.accentColorPrefix}${invalidAccentIndex + 1}${text.accentColorSuffix}`;
  }

  if (!data.doList.some((item) => item.trim())) {
    nextErrors.doList = text.doList;
  }

  if (![data.buttonCode, data.cardCode, data.inputCode].some((code) => code.trim())) {
    nextErrors.components = text.components;
  }

  return nextErrors;
}

export function SubmitStyleForm() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "zh";
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return saved === "en" || saved === "zh" ? saved : "zh";
  });
  const [formData, setFormData] = useState<StyleFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");
  const [extractUrl, setExtractUrl] = useState("");
  const [isExtractingUrl, setIsExtractingUrl] = useState(false);
  const [extractInput, setExtractInput] = useState("");
  const [extractMessage, setExtractMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [stepValidationState, setStepValidationState] = useState<Record<number, boolean>>({});
  const [hasDraft, setHasDraft] = useState(false);
  const [showDraftNotice, setShowDraftNotice] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [draftHistory, setDraftHistory] = useState<StoredDraft[]>([]);
  const [draftMeta, setDraftMeta] = useState<DraftMeta | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [conflictDraft, setConflictDraft] = useState<StoredDraft | null>(null);
  const lastSavedFingerprintRef = useRef("");
  const text = pickLocale(locale, submitCopy);

  const totalSteps = 4;
  const validationErrors = useMemo(() => validateFormData(formData, locale), [formData, locale]);

  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const markTouched = useCallback((field: string) => {
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
  }, []);

  const getVisibleError = useCallback(
    (field: string, step: number) => {
      if (!stepValidationState[step] && !touched[field]) return "";
      return validationErrors[field] ?? "";
    },
    [stepValidationState, touched, validationErrors]
  );

  const persistDraft = useCallback((nextData: StyleFormData) => {
    if (!hasMeaningfulContent(nextData)) {
      return null;
    }

    const existingDraft = parseStoredDraft(localStorage.getItem(STORAGE_KEY));
    const nextFingerprint = getFormFingerprint(nextData);
    const existingFingerprint = existingDraft ? getFormFingerprint(existingDraft.data) : "";

    if (existingDraft && existingFingerprint === nextFingerprint) {
      setHasDraft(true);
      setDraftMeta({
        revision: existingDraft.revision,
        updatedAt: existingDraft.updatedAt,
      });
      setSaveStatus("saved");
      lastSavedFingerprintRef.current = nextFingerprint;
      return existingDraft;
    }

    const nextDraft: StoredDraft = {
      schemaVersion: DRAFT_SCHEMA_VERSION,
      revision: existingDraft ? existingDraft.revision + 1 : 1,
      updatedAt: new Date().toISOString(),
      data: nextData,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDraft));

    if (existingDraft && existingFingerprint !== nextFingerprint) {
      const history = parseDraftHistory(localStorage.getItem(STORAGE_HISTORY_KEY));
      const nextHistory = [
        existingDraft,
        ...history.filter((item) => item.revision !== existingDraft.revision),
      ].slice(0, MAX_DRAFT_HISTORY);
      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(nextHistory));
      setDraftHistory(nextHistory);
    }

    setHasDraft(true);
    setDraftMeta({
      revision: nextDraft.revision,
      updatedAt: nextDraft.updatedAt,
    });
    setSaveStatus("saved");
    lastSavedFingerprintRef.current = nextFingerprint;
    return nextDraft;
  }, []);

  // Load draft from localStorage
  useEffect(() => {
    const draft = parseStoredDraft(localStorage.getItem(STORAGE_KEY));
    const history = parseDraftHistory(localStorage.getItem(STORAGE_HISTORY_KEY));
    setDraftHistory(history);

    if (draft) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      setHasDraft(true);
      setDraftMeta({
        revision: draft.revision,
        updatedAt: draft.updatedAt,
      });
      lastSavedFingerprintRef.current = getFormFingerprint(draft.data);
      if (hasMeaningfulContent(draft.data)) {
        setShowDraftNotice(true);
      }
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    if (!hasMeaningfulContent(formData)) return;
    const timer = window.setTimeout(() => {
      persistDraft(formData);
    }, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [formData, persistDraft]);

  // Cross-tab draft conflict detection
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.storageArea !== localStorage) return;

      if (event.key === STORAGE_HISTORY_KEY) {
        setDraftHistory(parseDraftHistory(event.newValue));
        return;
      }

      if (event.key !== STORAGE_KEY) return;

      if (!event.newValue) {
        setHasDraft(false);
        setDraftMeta(null);
        setConflictDraft(null);
        return;
      }

      const incomingDraft = parseStoredDraft(event.newValue);
      if (!incomingDraft) return;

      const incomingFingerprint = getFormFingerprint(incomingDraft.data);
      const localFingerprint = getFormFingerprint(formData);

      setHasDraft(true);
      setDraftMeta({
        revision: incomingDraft.revision,
        updatedAt: incomingDraft.updatedAt,
      });

      if (
        incomingFingerprint === localFingerprint ||
        incomingFingerprint === lastSavedFingerprintRef.current
      ) {
        return;
      }

      if (!hasMeaningfulContent(formData)) {
        setFormData(incomingDraft.data);
        setConflictDraft(null);
        setShowDraftNotice(false);
        lastSavedFingerprintRef.current = incomingFingerprint;
        return;
      }

      setConflictDraft(incomingDraft);
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [formData]);

  const loadDraft = () => {
    const draft = parseStoredDraft(localStorage.getItem(STORAGE_KEY));
    if (draft) {
      setFormData(draft.data);
      setHasDraft(true);
      setShowDraftNotice(false);
      setConflictDraft(null);
      setDraftMeta({
        revision: draft.revision,
        updatedAt: draft.updatedAt,
      });
      setSaveStatus("saved");
      lastSavedFingerprintRef.current = getFormFingerprint(draft.data);
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_HISTORY_KEY);
    setFormData(initialFormData);
    setHasDraft(false);
    setShowDraftNotice(false);
    setTouched({});
    setStepValidationState({});
    setDraftHistory([]);
    setDraftMeta(null);
    setSaveStatus("idle");
    setConflictDraft(null);
    lastSavedFingerprintRef.current = "";
  };

  const restoreHistoryDraft = (revision: number) => {
    const snapshot = draftHistory.find((item) => item.revision === revision);
    if (!snapshot) return;

    setFormData(snapshot.data);
    setShowDraftNotice(false);
    setConflictDraft(null);
    setTouched({});
    setStepValidationState({});
  };

  const applyIncomingDraft = () => {
    if (!conflictDraft) return;

    setFormData(conflictDraft.data);
    setHasDraft(true);
    setDraftMeta({
      revision: conflictDraft.revision,
      updatedAt: conflictDraft.updatedAt,
    });
    setSaveStatus("saved");
    setConflictDraft(null);
    setShowDraftNotice(false);
    lastSavedFingerprintRef.current = getFormFingerprint(conflictDraft.data);
  };

  const keepLocalDraft = () => {
    if (!hasMeaningfulContent(formData)) {
      setConflictDraft(null);
      return;
    }
    persistDraft(formData);
    setConflictDraft(null);
  };

  const updateField = <K extends keyof StyleFormData>(
    field: K,
    value: StyleFormData[K]
  ) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      setSaveStatus(hasMeaningfulContent(next) ? "saving" : "idle");
      return next;
    });
  };

  const validateStep = useCallback((step: number): boolean => {
    const fields = stepFieldMap[step] ?? [];
    const hasStepError = fields.some((field) => Boolean(validationErrors[field]));
    if (!hasStepError) return true;

    setStepValidationState((prev) => ({ ...prev, [step]: true }));
    setTouched((prev) => {
      const next = { ...prev };
      for (const field of fields) next[field] = true;
      return next;
    });
    return false;
  }, [validationErrors]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[\u4e00-\u9fa5]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const applyExtractedData = (data: ExtractedStyleDraft, sourceLabel: string) => {
    setFormData((prev) => {
      const next: StyleFormData = {
        ...prev,
        name: data.name ?? prev.name,
        nameEn: data.nameEn ?? prev.nameEn,
        slug: data.slug ?? prev.slug,
        description: data.description ?? prev.description,
        category: data.category ?? prev.category,
        styleType: data.styleType ?? prev.styleType,
        tags: data.tags && data.tags.length > 0 ? data.tags : prev.tags,
        primaryColor: data.primaryColor ?? prev.primaryColor,
        secondaryColor: data.secondaryColor ?? prev.secondaryColor,
        accentColors:
          data.accentColors && data.accentColors.length > 0
            ? data.accentColors
            : prev.accentColors,
        keywords:
          data.keywords && data.keywords.length > 0
            ? data.keywords
            : prev.keywords,
        philosophy: data.philosophy ?? prev.philosophy,
        doList: data.doList && data.doList.length > 0 ? data.doList : prev.doList,
        dontList:
          data.dontList && data.dontList.length > 0 ? data.dontList : prev.dontList,
        buttonCode: data.buttonCode ?? prev.buttonCode,
        cardCode: data.cardCode ?? prev.cardCode,
        inputCode: data.inputCode ?? prev.inputCode,
      };

      if (!next.slug) {
        const slugSeed = next.nameEn || next.name;
        if (slugSeed) next.slug = generateSlug(slugSeed);
      }

      return next;
    });

    setTouched({});
    setStepValidationState({});
    setSaveStatus("saving");
    setExtractMessage({
      type: "success",
      text: `${text.extractorSuccessPrefix} ${sourceLabel}`,
    });
  };

  const applyExtractedDraft = () => {
    const parsed = parseStyleExtractorInput(extractInput);
    if (!parsed.ok || !parsed.data) {
      setExtractMessage({
        type: "error",
        text: `${text.extractorErrorPrefix} ${parsed.error ?? "Unknown format"}`,
      });
      return;
    }

    const sourceLabel =
      parsed.source === "json" ? text.extractorJsonSource : text.extractorMarkdownSource;
    applyExtractedData(parsed.data, sourceLabel);
  };

  const extractFromUrl = async () => {
    const trimmedUrl = extractUrl.trim();
    if (!trimmedUrl) return;

    setIsExtractingUrl(true);
    setExtractMessage(null);

    try {
      const response = await fetch("/api/style-extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmedUrl }),
      });

      const payload = (await response.json()) as {
        draft?: ExtractedStyleDraft;
        raw?: string;
        error?: string;
      };

      if (!response.ok) {
        setExtractMessage({
          type: "error",
          text: `${text.extractorErrorPrefix} ${payload.error ?? `HTTP ${response.status}`}`,
        });
        return;
      }

      const fallbackRaw = payload.draft ? JSON.stringify(payload.draft, null, 2) : "";
      const raw = typeof payload.raw === "string" && payload.raw.trim() ? payload.raw : fallbackRaw;

      if (!raw) {
        setExtractMessage({
          type: "error",
          text: `${text.extractorErrorPrefix} Empty extraction output.`,
        });
        return;
      }

      setExtractInput(raw);
      const parsed = parseStyleExtractorInput(raw);
      if (!parsed.ok || !parsed.data) {
        setExtractMessage({
          type: "error",
          text: `${text.extractorErrorPrefix} ${parsed.error ?? "Unknown format"}`,
        });
        return;
      }

      const host = (() => {
        try {
          return new URL(trimmedUrl).hostname.replace(/^www\./, "");
        } catch {
          return trimmedUrl;
        }
      })();

      applyExtractedData(parsed.data, `${text.extractorUrlSource} (${host})`);
    } catch (error) {
      setExtractMessage({
        type: "error",
        text: `${text.extractorErrorPrefix} ${(error as Error).message}`,
      });
    } finally {
      setIsExtractingUrl(false);
    }
  };

  const handleNameEnChange = (value: string) => {
    updateField("nameEn", value);
    if (!formData.slug) {
      updateField("slug", generateSlug(value));
    }
  };

  const handleSlugChange = (value: string) => {
    const normalized = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-{2,}/g, "-")
      .replace(/^-|-$/g, "");
    updateField("slug", normalized);
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      updateField("keywords", [...formData.keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    updateField("keywords", formData.keywords.filter((k) => k !== keyword));
  };

  const toggleTag = (tag: StyleTag) => {
    if (formData.tags.includes(tag)) {
      updateField("tags", formData.tags.filter((t) => t !== tag));
    } else {
      updateField("tags", [...formData.tags, tag]);
    }
  };

  const addListItem = (field: "doList" | "dontList") => {
    updateField(field, [...formData[field], ""]);
  };

  const updateListItem = (field: "doList" | "dontList", index: number, value: string) => {
    const newList = [...formData[field]];
    newList[index] = value;
    updateField(field, newList);
  };

  const removeListItem = (field: "doList" | "dontList", index: number) => {
    if (formData[field].length > 1) {
      updateField(field, formData[field].filter((_, i) => i !== index));
    }
  };

  const addAccentColor = () => {
    if (formData.accentColors.length < 5) {
      updateField("accentColors", [...formData.accentColors, "#3b82f6"]);
    }
  };

  const updateAccentColor = (index: number, value: string) => {
    const newColors = [...formData.accentColors];
    newColors[index] = value;
    updateField("accentColors", newColors);
  };

  const removeAccentColor = (index: number) => {
    if (formData.accentColors.length > 1) {
      updateField("accentColors", formData.accentColors.filter((_, i) => i !== index));
    }
  };

  const generateOutput = () => {
    const output = {
      slug: formData.slug,
      name: formData.name,
      nameEn: formData.nameEn,
      description: formData.description,
      cover: `/styles/${formData.slug}.png`,
      styleType: formData.styleType,
      tags: formData.tags,
      category: formData.category,
      colors: {
        primary: formData.primaryColor,
        secondary: formData.secondaryColor,
        accent: formData.accentColors,
      },
      keywords: formData.keywords,
      philosophy: formData.philosophy,
      doList: formData.doList.filter((item) => item.trim()),
      dontList: formData.dontList.filter((item) => item.trim()),
      components: {
        button: { name: "Button", code: formData.buttonCode },
        card: { name: "Card", code: formData.cardCode },
        input: { name: "Input", code: formData.inputCode },
      },
    };
    return JSON.stringify(output, null, 2);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateOutput());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const goToStep = (step: number) => {
    // Can go back freely, but going forward requires validation
    if (step < currentStep) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(step);
        setIsAnimating(false);
      }, 150);
    } else if (step > currentStep) {
      // Validate all steps up to the target
      let canProceed = true;
      for (let i = currentStep; i < step; i++) {
        if (!validateStep(i)) {
          canProceed = false;
          break;
        }
      }
      if (canProceed) {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentStep(step);
          setIsAnimating(false);
        }, 150);
      }
    }
  };

  // Calculate completion percentage
  const getCompletionPercent = () => {
    let filled = 0;
    const total = 6;
    if (formData.name || formData.nameEn) filled += 2;
    if (formData.description) filled++;
    if (formData.primaryColor && formData.secondaryColor) filled++;
    if (formData.doList.some((i) => i.trim())) filled++;
    if (formData.buttonCode || formData.cardCode || formData.inputCode) filled++;
    return Math.round((filled / total) * 100);
  };

  return (
    <>
      {/* Conflict Notice */}
      {conflictDraft && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-50 border border-amber-300 text-amber-900 shadow-lg p-4 max-w-xl animate-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">
                {text.conflictTitle} (v{conflictDraft.revision})
              </p>
              <p className="text-xs mb-3">
                {text.conflictMessagePrefix} {formatLocaleDateTime(conflictDraft.updatedAt, locale)}. {text.conflictMessageSuffix}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={applyIncomingDraft}
                  className="px-3 py-1.5 text-xs bg-foreground text-background hover:bg-foreground/90 transition-colors"
                >
                  {text.loadRemoteDraft}
                </button>
                <button
                  onClick={keepLocalDraft}
                  className="px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
                >
                  {text.keepLocalDraft}
                </button>
              </div>
            </div>
            <button
              onClick={() => setConflictDraft(null)}
              className="text-muted hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Draft Notice */}
      {showDraftNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-background border border-border shadow-lg p-4 max-w-md animate-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
            <Save className="w-5 h-5 text-muted mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">{text.draftNoticeTitle}</p>
              <p className="text-xs text-muted mb-1">{text.draftNoticeDescription}</p>
              {draftMeta && (
                <p className="text-[11px] text-muted mb-3">
                  v{draftMeta.revision} - {formatLocaleDateTime(draftMeta.updatedAt, locale)}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={loadDraft}
                  className="px-3 py-1.5 text-xs bg-foreground text-background hover:bg-foreground/90 transition-colors"
                >
                  {text.continueEditing}
                </button>
                <button
                  onClick={() => setShowDraftNotice(false)}
                  className="px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
                >
                  {text.startFresh}
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowDraftNotice(false)}
              className="text-muted hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-16">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            {text.back}
          </button>
          <div className="mb-6 flex justify-end">
            <button
              type="button"
              onClick={() => setLocale((prev) => (prev === "en" ? "zh" : "en"))}
              title={text.localeButtonTitle}
              className="px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
            >
              {text.localeSwitch}
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-2 md:mb-4">
                {text.submitStyleLabel}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-4">{text.submitStyleTitle}</h1>
              <p className="text-base md:text-lg text-muted max-w-xl">
                {text.submitStyleDescription}
              </p>
            </div>
            {/* Completion indicator */}
            <div className="flex flex-col items-start md:items-end gap-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground transition-all duration-300"
                    style={{ width: `${getCompletionPercent()}%` }}
                  />
                </div>
                <span className="text-muted">{getCompletionPercent()}%</span>
                {hasDraft && (
                  <button
                    onClick={clearDraft}
                    className="text-muted hover:text-foreground transition-colors"
                    title={text.clearDraftTitle}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-xs text-muted">
                {saveStatus === "saving" && text.saving}
                {saveStatus === "saved" && draftMeta && `${text.savedPrefix} v${draftMeta.revision} - ${formatLocaleDateTime(draftMeta.updatedAt, locale)}`}
                {saveStatus === "idle" && text.noDraft}
              </p>
              {draftHistory.length > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted">{text.restoreVersion}</span>
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      const revision = Number(e.target.value);
                      if (!Number.isNaN(revision) && revision > 0) restoreHistoryDraft(revision);
                      e.currentTarget.value = "";
                    }}
                    className="px-2 py-1 border border-border bg-background text-xs"
                  >
                    <option value="">
                      {text.selectHistoryVersion}
                    </option>
                    {draftHistory.slice(0, 6).map((item) => (
                      <option key={item.revision} value={item.revision}>
                        v{item.revision} - {formatLocaleDateTime(item.updatedAt, locale)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-12">
          {/* Progress Steps - Desktop */}
          <div className="hidden md:block mb-12">
            <div className="flex items-center justify-between">
              {stepIcons.map((Icon, idx) => {
                const step = idx + 1;
                const stepLabel = text.stepInfo[idx];
                return (
                  <div key={step} className="flex items-center flex-1">
                    <button
                      onClick={() => goToStep(step)}
                      className={`flex items-center gap-3 p-3 border-2 transition-all ${
                        currentStep === step
                          ? "bg-foreground text-background border-foreground"
                          : currentStep > step
                          ? "bg-foreground/5 border-foreground text-foreground"
                          : "border-border text-muted hover:border-foreground/50"
                      }`}
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        {currentStep > step ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium">{stepLabel.title}</p>
                        <p className={`text-xs ${currentStep === step ? "text-background/70" : "text-muted"}`}>
                          {stepLabel.desc}
                        </p>
                      </div>
                    </button>
                    {step < 4 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 transition-colors ${
                          currentStep > step ? "bg-foreground" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Steps - Mobile */}
          <div className="md:hidden mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  onClick={() => goToStep(step)}
                  className={`w-10 h-10 flex items-center justify-center border-2 transition-colors ${
                    currentStep === step
                      ? "bg-foreground text-background border-foreground"
                      : currentStep > step
                      ? "bg-foreground/10 border-foreground"
                      : "border-border text-muted"
                  }`}
                >
                  {currentStep > step ? <Check className="w-4 h-4" /> : step}
                </button>
              ))}
            </div>
            <div className="text-center">
              <p className="font-medium">{text.stepInfo[currentStep - 1].title}</p>
              <p className="text-xs text-muted">{text.stepInfo[currentStep - 1].desc}</p>
            </div>
          </div>

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className={`space-y-6 transition-opacity duration-150 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
              {/* Hint */}
              <div className="p-4 border border-border bg-zinc-50 dark:bg-zinc-900">
                <p className="text-sm text-muted">
                  {text.hint}
                </p>
              </div>

              <div className="p-4 border border-border bg-background">
                <label className="block text-sm font-medium mb-2">
                  {text.extractorUrlLabel}
                </label>
                <p className="text-xs text-muted mb-3">{text.extractorUrlHint}</p>
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                  <input
                    type="url"
                    value={extractUrl}
                    onChange={(e) => setExtractUrl(e.target.value)}
                    placeholder={text.extractorUrlPlaceholder}
                    className="flex-1 px-4 py-2 border border-border bg-background outline-none transition-colors focus:border-foreground text-sm"
                  />
                  <button
                    type="button"
                    onClick={extractFromUrl}
                    disabled={!extractUrl.trim() || isExtractingUrl}
                    className="inline-flex items-center justify-center px-4 py-2 border border-border hover:border-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm whitespace-nowrap"
                  >
                    {isExtractingUrl ? text.extractorUrlLoading : text.extractorUrlAction}
                  </button>
                </div>

                <div className="border-t border-border pt-4">
                <label className="block text-sm font-medium mb-2">
                  {text.extractorTitle}
                </label>
                <p className="text-xs text-muted mb-3">{text.extractorDescription}</p>
                <textarea
                  value={extractInput}
                  onChange={(e) => {
                    setExtractInput(e.target.value);
                    if (extractMessage) setExtractMessage(null);
                  }}
                  placeholder={text.extractorPlaceholder}
                  rows={6}
                  className="w-full px-4 py-3 border border-border bg-background outline-none transition-colors resize-y focus:border-foreground font-mono text-xs"
                />
                <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={applyExtractedDraft}
                    disabled={!extractInput.trim() || isExtractingUrl}
                    className="inline-flex items-center justify-center px-4 py-2 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    {text.extractorApply}
                  </button>
                  {extractMessage && (
                    <p
                      className={`text-xs ${
                        extractMessage.type === "success"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {extractMessage.text}
                    </p>
                  )}
                </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm mb-2">
                    {text.fields.styleNameLocal} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    onBlur={() => markTouched("name")}
                    placeholder={text.placeholders.styleNameLocal}
                    className="w-full px-4 py-3 border border-border bg-background outline-none transition-colors focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">
                    {text.fields.styleNameEnglish} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => handleNameEnChange(e.target.value)}
                    onBlur={() => markTouched("name")}
                    placeholder={text.placeholders.styleNameEnglish}
                    className="w-full px-4 py-3 border border-border bg-background outline-none transition-colors focus:border-foreground"
                  />
                </div>
              </div>
              {getVisibleError("name", 1) && (
                <p className="text-xs text-red-500 flex items-center gap-1 -mt-4">
                  <AlertCircle className="w-3 h-3" />
                  {getVisibleError("name", 1)}
                </p>
              )}

              <div>
                <label className="block text-sm mb-2">{text.fields.slug}</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  onBlur={() => markTouched("slug")}
                  placeholder={text.placeholders.slug}
                  className="w-full px-4 py-3 border border-border bg-background outline-none transition-colors focus:border-foreground font-mono text-sm"
                />
                <p className="text-xs text-muted mt-1">{text.fields.slugHint}</p>
                {getVisibleError("slug", 1) && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {getVisibleError("slug", 1)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">{text.fields.shortDescription}</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder={text.placeholders.shortDescription}
                  rows={3}
                  className="w-full px-4 py-3 border border-border bg-background outline-none transition-colors resize-none focus:border-foreground"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm mb-2">{text.fields.category}</label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateField("category", e.target.value as StyleCategory)}
                    className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors"
                  >
                    {categoryOptions.map((value) => (
                      <option key={value} value={value}>{text.categoryLabels[value]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">{text.fields.type}</label>
                  <select
                    value={formData.styleType}
                    onChange={(e) => updateField("styleType", e.target.value as StyleType)}
                    className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors"
                  >
                    {typeOptions.map((value) => (
                      <option key={value} value={value}>{text.typeLabels[value]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">{text.fields.tags}</label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tagValue) => (
                    <button
                      key={tagValue}
                      type="button"
                      onClick={() => toggleTag(tagValue)}
                      className={`px-3 py-1.5 text-sm border transition-colors ${
                        formData.tags.includes(tagValue)
                          ? "bg-foreground text-background border-foreground"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {text.tagLabels[tagValue]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">{text.fields.keywords}</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                    placeholder={text.placeholders.keywords}
                    className="flex-1 px-4 py-2 border border-border bg-background focus:border-foreground outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="px-4 py-2 border border-border hover:border-foreground transition-colors"
                  >
                    {text.add}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-sm"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="text-muted hover:text-foreground"
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Colors */}
          {currentStep === 2 && (
            <div className={`space-y-6 transition-opacity duration-150 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm mb-2">{text.fields.primaryColor} *</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => updateField("primaryColor", e.target.value)}
                      onBlur={() => markTouched("primaryColor")}
                      className="w-12 h-12 border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => updateField("primaryColor", e.target.value)}
                      onBlur={() => markTouched("primaryColor")}
                      className="flex-1 px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
                    />
                  </div>
                  {getVisibleError("primaryColor", 2) && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {getVisibleError("primaryColor", 2)}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-2">{text.fields.secondaryColor} *</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => updateField("secondaryColor", e.target.value)}
                      onBlur={() => markTouched("secondaryColor")}
                      className="w-12 h-12 border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.secondaryColor}
                      onChange={(e) => updateField("secondaryColor", e.target.value)}
                      onBlur={() => markTouched("secondaryColor")}
                      className="flex-1 px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
                    />
                  </div>
                  {getVisibleError("secondaryColor", 2) && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {getVisibleError("secondaryColor", 2)}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">{text.fields.accentColors}</label>
                <div className="space-y-3">
                  {formData.accentColors.map((color, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => updateAccentColor(index, e.target.value)}
                        className="w-12 h-12 border border-border cursor-pointer"
                      />
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => updateAccentColor(index, e.target.value)}
                        onBlur={() => markTouched("accentColors")}
                        className="flex-1 px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
                      />
                      {formData.accentColors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAccentColor(index)}
                          className="px-3 py-3 border border-border hover:border-foreground text-muted hover:text-foreground transition-colors"
                        >
                          x
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {formData.accentColors.length < 5 && (
                  <button
                    type="button"
                    onClick={addAccentColor}
                    className="mt-3 px-4 py-2 border border-border hover:border-foreground transition-colors text-sm"
                  >
                    + {text.addAccentColor}
                  </button>
                )}
                {getVisibleError("accentColors", 2) && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-2">
                    <AlertCircle className="w-3 h-3" />
                    {getVisibleError("accentColors", 2)}
                  </p>
                )}
              </div>

              {/* Color Preview */}
              <div>
                <label className="block text-sm mb-2">{text.fields.colorPreview}</label>
                <div className="flex h-16 border border-border overflow-hidden">
                  <div className="flex-1" style={{ backgroundColor: formData.primaryColor }} />
                  <div className="flex-1" style={{ backgroundColor: formData.secondaryColor }} />
                  {formData.accentColors.map((color, i) => (
                    <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Design Rules */}
          {currentStep === 3 && (
            <div className={`space-y-6 transition-opacity duration-150 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
              <div>
                <label className="block text-sm mb-2">{text.fields.designPhilosophy}</label>
                <textarea
                  value={formData.philosophy}
                  onChange={(e) => updateField("philosophy", e.target.value)}
                  placeholder={text.placeholders.designPhilosophy}
                  rows={4}
                  className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">{text.fields.requiredRules} *</label>
                <div className="space-y-2">
                  {formData.doList.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateListItem("doList", index, e.target.value)}
                        onBlur={() => markTouched("doList")}
                        placeholder={text.placeholders.doRule}
                        className="flex-1 px-4 py-2 border border-border bg-background focus:border-foreground outline-none transition-colors"
                      />
                      {formData.doList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeListItem("doList", index)}
                          className="px-3 py-2 border border-border hover:border-foreground text-muted hover:text-foreground transition-colors"
                        >
                          x
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addListItem("doList")}
                  className="mt-2 px-4 py-2 border border-border hover:border-foreground transition-colors text-sm"
                >
                  + {text.addRule}
                </button>
                {getVisibleError("doList", 3) && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-2">
                    <AlertCircle className="w-3 h-3" />
                    {getVisibleError("doList", 3)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">{text.fields.forbiddenRules}</label>
                <div className="space-y-2">
                  {formData.dontList.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateListItem("dontList", index, e.target.value)}
                        placeholder={text.placeholders.dontRule}
                        className="flex-1 px-4 py-2 border border-border bg-background focus:border-foreground outline-none transition-colors"
                      />
                      {formData.dontList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeListItem("dontList", index)}
                          className="px-3 py-2 border border-border hover:border-foreground text-muted hover:text-foreground transition-colors"
                        >
                          x
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addListItem("dontList")}
                  className="mt-2 px-4 py-2 border border-border hover:border-foreground transition-colors text-sm"
                >
                  + {text.addRule}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Component Code */}
          {currentStep === 4 && (
            <div className={`space-y-6 transition-opacity duration-150 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
              <div className="p-4 border border-border bg-zinc-50 dark:bg-zinc-900">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 text-muted" />
                  <p className="text-sm text-muted">
                    {text.step4Tip}
                  </p>
                </div>
                {getVisibleError("components", 4) && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-3">
                    <AlertCircle className="w-3 h-3" />
                    {getVisibleError("components", 4)}
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
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border border-border hover:border-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{text.previous}</span>
              <span className="sm:hidden">{text.back}</span>
            </button>
            <div className="flex gap-2 sm:gap-3 order-1 sm:order-2">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border border-border hover:border-foreground transition-colors flex-1 sm:flex-none"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">{text.preview}</span>
              </button>
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors flex-1 sm:flex-none"
                >
                  <span>{text.next}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep(4)) {
                      copyToClipboard();
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors flex-1 sm:flex-none"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? text.copied : text.copyJson}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-background border border-border max-w-3xl w-full max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-border bg-background">
              <h3 className="text-lg font-medium">{text.jsonPreview}</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-1 text-muted hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap overflow-x-auto bg-zinc-50 dark:bg-zinc-900 p-4 border border-border">
                {generateOutput()}
              </pre>
            </div>
            <div className="sticky bottom-0 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 p-4 border-t border-border bg-background">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 border border-border hover:border-foreground transition-colors"
              >
                {text.close}
              </button>
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? text.copied : text.copyJson}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Instructions */}
      <section className="border-t border-border bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-12">
          <div className="flex items-start gap-3 mb-6">
            <Sparkles className="w-5 h-5 mt-0.5 text-muted" />
            <div>
              <h2 className="text-lg md:text-xl mb-2">{text.submissionGuide}</h2>
              <p className="text-sm text-muted">{text.submissionGuideDesc}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-4 border border-border bg-background">
              <div className="text-xs text-muted mb-2">{text.step} 1</div>
              <p className="text-sm">{text.submissionSteps[0]}</p>
            </div>
            <div className="p-4 border border-border bg-background">
              <div className="text-xs text-muted mb-2">{text.step} 2</div>
              <p className="text-sm">{text.submissionSteps[1]}</p>
            </div>
            <div className="p-4 border border-border bg-background">
              <div className="text-xs text-muted mb-2">{text.step} 3</div>
              <p className="text-sm">{text.submissionSteps[2]}</p>
            </div>
            <div className="p-4 border border-border bg-background">
              <div className="text-xs text-muted mb-2">{text.step} 4</div>
              <p className="text-sm">{text.submissionSteps[3]}</p>
            </div>
          </div>
          <a
            href="https://github.com/AnxForever/stylekit/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            <Send className="w-4 h-4" />
            {text.submitOnGithub}
          </a>
        </div>
      </section>
    </>
  );
}
