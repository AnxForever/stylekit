"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import {
  Check, Copy, Eye, Send, AlertCircle, ChevronRight,
  ChevronLeft, Sparkles, X, Save, RotateCcw, Palette,
  Code, FileText, Layers
} from "lucide-react";
import type { StyleCategory, StyleType, StyleTag } from "@/lib/styles/meta";

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

const categoryOptions: { value: StyleCategory; label: string }[] = [
  { value: "modern", label: "现代" },
  { value: "minimal", label: "极简" },
  { value: "expressive", label: "表现" },
  { value: "retro", label: "复古" },
];

const typeOptions: { value: StyleType; label: string }[] = [
  { value: "visual", label: "视觉风格" },
  { value: "layout", label: "布局模式" },
  { value: "animation", label: "动效风格" },
];

const tagOptions: { value: StyleTag; label: string }[] = [
  { value: "modern", label: "现代" },
  { value: "minimal", label: "极简" },
  { value: "expressive", label: "表现" },
  { value: "retro", label: "复古" },
  { value: "high-contrast", label: "高对比" },
  { value: "responsive", label: "响应式" },
  { value: "brand-inspired", label: "品牌风格" },
];

const STORAGE_KEY = "stylekit-submit-draft";

const stepInfo = [
  { icon: FileText, title: "基本信息", desc: "名称、描述、分类" },
  { icon: Palette, title: "配色方案", desc: "主色、次色、强调色" },
  { icon: Layers, title: "设计规范", desc: "Do/Don't 规则" },
  { icon: Code, title: "组件代码", desc: "按钮、卡片、输入框" },
];

export function SubmitStyleForm() {
  const { t } = useI18n();
  const router = useRouter();
  const [formData, setFormData] = useState<StyleFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [hasDraft, setHasDraft] = useState(false);
  const [showDraftNotice, setShowDraftNotice] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalSteps = 4;

  // Load draft from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        if (draft.name || draft.nameEn || draft.description) {
          setHasDraft(true);
          setShowDraftNotice(true);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    const hasContent = formData.name || formData.nameEn || formData.description;
    if (hasContent) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const loadDraft = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
        setShowDraftNotice(false);
      } catch {
        // ignore
      }
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(initialFormData);
    setHasDraft(false);
    setShowDraftNotice(false);
    setTouched({});
    setErrors({});
  };

  const updateField = <K extends keyof StyleFormData>(
    field: K,
    value: StyleFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateStep = useCallback((step: number): boolean => {
    const newErrors: Record<string, string> = {};

    // 只有第一步的名称是必填的
    if (step === 1) {
      if (!formData.name.trim() && !formData.nameEn.trim()) {
        newErrors.name = "请至少输入中文或英文名称";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[\u4e00-\u9fa5]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleNameEnChange = (value: string) => {
    updateField("nameEn", value);
    if (!formData.slug) {
      updateField("slug", generateSlug(value));
    }
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
        button: { name: "按钮", code: formData.buttonCode },
        card: { name: "卡片", code: formData.cardCode },
        input: { name: "输入框", code: formData.inputCode },
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

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.name || formData.nameEn; // 只需要名称
      default:
        return true;
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
    let total = 6; // 降低总数，让进度更容易达到
    if (formData.name || formData.nameEn) filled += 2; // 名称权重更高
    if (formData.description) filled++;
    if (formData.primaryColor && formData.secondaryColor) filled++;
    if (formData.doList.some((i) => i.trim())) filled++;
    if (formData.buttonCode || formData.cardCode || formData.inputCode) filled++;
    return Math.round((filled / total) * 100);
  };

  // Input field component with error handling
  const InputField = ({
    label,
    field,
    value,
    placeholder,
    required,
    mono,
    hint,
  }: {
    label: string;
    field: string;
    value: string;
    placeholder: string;
    required?: boolean;
    mono?: boolean;
    hint?: string;
  }) => (
    <div>
      <label className="block text-sm mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => updateField(field as keyof StyleFormData, e.target.value)}
        onBlur={() => markTouched(field)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border bg-background outline-none transition-colors ${
          errors[field] && touched[field]
            ? "border-red-500 focus:border-red-500"
            : "border-border focus:border-foreground"
        } ${mono ? "font-mono text-sm" : ""}`}
      />
      {errors[field] && touched[field] && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {errors[field]}
        </p>
      )}
      {hint && !errors[field] && (
        <p className="text-xs text-muted mt-1">{hint}</p>
      )}
    </div>
  );

  return (
    <>
      {/* Draft Notice */}
      {showDraftNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-background border border-border shadow-lg p-4 max-w-md animate-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
            <Save className="w-5 h-5 text-muted mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">发现未完成的草稿</p>
              <p className="text-xs text-muted mb-3">是否继续编辑上次的内容？</p>
              <div className="flex gap-2">
                <button
                  onClick={loadDraft}
                  className="px-3 py-1.5 text-xs bg-foreground text-background hover:bg-foreground/90 transition-colors"
                >
                  继续编辑
                </button>
                <button
                  onClick={() => setShowDraftNotice(false)}
                  className="px-3 py-1.5 text-xs border border-border hover:border-foreground transition-colors"
                >
                  重新开始
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
            返回
          </button>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted mb-2 md:mb-4">
                Submit Style
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-4">提交新风格</h1>
              <p className="text-base md:text-lg text-muted max-w-xl">
                填写表单提交你发现的优质设计风格
              </p>
            </div>
            {/* Completion indicator */}
            <div className="flex items-center gap-3 text-sm">
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
                  title="清除草稿"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
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
              {stepInfo.map((info, idx) => {
                const step = idx + 1;
                const Icon = info.icon;
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
                        <p className="text-sm font-medium">{info.title}</p>
                        <p className={`text-xs ${currentStep === step ? "text-background/70" : "text-muted"}`}>
                          {info.desc}
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
              <p className="font-medium">{stepInfo[currentStep - 1].title}</p>
              <p className="text-xs text-muted">{stepInfo[currentStep - 1].desc}</p>
            </div>
          </div>

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className={`space-y-6 transition-opacity duration-150 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
              {/* 提示信息 */}
              <div className="p-4 border border-border bg-zinc-50 dark:bg-zinc-900">
                <p className="text-sm text-muted">
                  只有风格名称为必填项（中文或英文至少填一个），其他字段可选填。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm mb-2">
                    风格名称 (中文) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="例如：新野兽派"
                    className="w-full px-4 py-3 border border-border bg-background outline-none transition-colors focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">
                    风格名称 (英文) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => handleNameEnChange(e.target.value)}
                    placeholder="例如：Neo-Brutalist"
                    className="w-full px-4 py-3 border border-border bg-background outline-none transition-colors focus:border-foreground"
                  />
                </div>
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 flex items-center gap-1 -mt-4">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}

              <div>
                <label className="block text-sm mb-2">Slug (URL 标识)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  placeholder="例如：neo-brutalist（自动生成）"
                  className="w-full px-4 py-3 border border-border bg-background outline-none transition-colors focus:border-foreground font-mono text-sm"
                />
                <p className="text-xs text-muted mt-1">用于 URL 路径，只能包含小写字母、数字和连字符</p>
              </div>

              <div>
                <label className="block text-sm mb-2">简短描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="用一两句话描述这个风格的核心特点..."
                  rows={3}
                  className="w-full px-4 py-3 border border-border bg-background outline-none transition-colors resize-none focus:border-foreground"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm mb-2">分类</label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateField("category", e.target.value as StyleCategory)}
                    className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors"
                  >
                    {categoryOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">类型</label>
                  <select
                    value={formData.styleType}
                    onChange={(e) => updateField("styleType", e.target.value as StyleType)}
                    className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors"
                  >
                    {typeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">标签</label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => (
                    <button
                      key={tag.value}
                      type="button"
                      onClick={() => toggleTag(tag.value)}
                      className={`px-3 py-1.5 text-sm border transition-colors ${
                        formData.tags.includes(tag.value)
                          ? "bg-foreground text-background border-foreground"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">关键词</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                    placeholder="输入关键词后按回车添加"
                    className="flex-1 px-4 py-2 border border-border bg-background focus:border-foreground outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="px-4 py-2 border border-border hover:border-foreground transition-colors"
                  >
                    添加
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
                  <label className="block text-sm mb-2">主色 *</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => updateField("primaryColor", e.target.value)}
                      className="w-12 h-12 border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => updateField("primaryColor", e.target.value)}
                      className="flex-1 px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">次色 *</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => updateField("secondaryColor", e.target.value)}
                      className="w-12 h-12 border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.secondaryColor}
                      onChange={(e) => updateField("secondaryColor", e.target.value)}
                      className="flex-1 px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors font-mono text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">强调色</label>
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
                    + 添加强调色
                  </button>
                )}
              </div>

              {/* Color Preview */}
              <div>
                <label className="block text-sm mb-2">配色预览</label>
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
                <label className="block text-sm mb-2">设计哲学</label>
                <textarea
                  value={formData.philosophy}
                  onChange={(e) => updateField("philosophy", e.target.value)}
                  placeholder="描述这个风格的设计理念、核心思想..."
                  rows={4}
                  className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">必须做 (Do List) *</label>
                <div className="space-y-2">
                  {formData.doList.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateListItem("doList", index, e.target.value)}
                        placeholder="例如：使用纯黑边框 border-black border-2"
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
                  + 添加规则
                </button>
              </div>

              <div>
                <label className="block text-sm mb-2">禁止做 (Don&apos;t List)</label>
                <div className="space-y-2">
                  {formData.dontList.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateListItem("dontList", index, e.target.value)}
                        placeholder="例如：禁止使用圆角 rounded-lg"
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
                  + 添加规则
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
                    请提供该风格下按钮、卡片、输入框的 Tailwind CSS 代码示例。
                    至少填写一个组件代码。
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">按钮组件代码</label>
                <textarea
                  value={formData.buttonCode}
                  onChange={(e) => updateField("buttonCode", e.target.value)}
                  placeholder={`<button className="bg-[#ff006e] text-white font-black px-6 py-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
  点击我
</button>`}
                  rows={6}
                  className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors resize-none font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">卡片组件代码</label>
                <textarea
                  value={formData.cardCode}
                  onChange={(e) => updateField("cardCode", e.target.value)}
                  placeholder={`<div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
  <h3 className="font-black text-xl mb-2">卡片标题</h3>
  <p className="font-mono text-gray-700">卡片内容</p>
</div>`}
                  rows={6}
                  className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors resize-none font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">输入框组件代码</label>
                <textarea
                  value={formData.inputCode}
                  onChange={(e) => updateField("inputCode", e.target.value)}
                  placeholder={`<input
  type="text"
  placeholder="请输入..."
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
              <span className="hidden sm:inline">上一步</span>
              <span className="sm:hidden">返回</span>
            </button>
            <div className="flex gap-2 sm:gap-3 order-1 sm:order-2">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border border-border hover:border-foreground transition-colors flex-1 sm:flex-none"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">预览</span>
              </button>
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors flex-1 sm:flex-none"
                >
                  <span>下一步</span>
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
                  {copied ? "已复制" : "复制 JSON"}
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
              <h3 className="text-lg font-medium">JSON 预览</h3>
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
                关闭
              </button>
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "已复制" : "复制 JSON"}
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
              <h2 className="text-lg md:text-xl mb-2">提交说明</h2>
              <p className="text-sm text-muted">完成表单后，按以下步骤提交你的风格</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-4 border border-border bg-background">
              <div className="text-xs text-muted mb-2">步骤 1</div>
              <p className="text-sm">点击「复制 JSON」复制风格定义</p>
            </div>
            <div className="p-4 border border-border bg-background">
              <div className="text-xs text-muted mb-2">步骤 2</div>
              <p className="text-sm">前往 GitHub 创建 Issue</p>
            </div>
            <div className="p-4 border border-border bg-background">
              <div className="text-xs text-muted mb-2">步骤 3</div>
              <p className="text-sm">粘贴 JSON 到描述中</p>
            </div>
            <div className="p-4 border border-border bg-background">
              <div className="text-xs text-muted mb-2">步骤 4</div>
              <p className="text-sm">等待审核通过</p>
            </div>
          </div>
          <a
            href="https://github.com/AnxForever/stylekit/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            <Send className="w-4 h-4" />
            在 GitHub 提交
          </a>
        </div>
      </section>
    </>
  );
}