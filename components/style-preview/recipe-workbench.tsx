"use client";

import { useId, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ComponentUsageGuide } from "@/components/style-preview/component-usage-guide";
import { CodeBlock } from "@/components/style-preview/code-block";
import { ExtractedComponentPreview } from "@/components/style-preview/extracted-component-preview";
import type { PreviewAssets } from "@/lib/style-preview/preview-assets";
import { sanitizePreviewHtml } from "@/lib/security/sanitize-html";
import { useI18n } from "@/lib/i18n/context";
import type { ComponentRecipe, RecipeParameter, RecipeRenderParams, RecipeSlot } from "@/lib/recipes/types";
import {
  buildWorkbenchArtifact,
  getWorkbenchDefaults,
  isWorkbenchRecipe,
} from "@/lib/recipes/workbench";

export interface RecipeWorkbenchProps {
  recipe: ComponentRecipe;
  styleSlug?: string;
  previewAssets?: PreviewAssets;
}

const EMPTY_PREVIEW_ASSETS: PreviewAssets = {};

function copyFor(locale: string) {
  const zh = locale === "zh";
  return {
    variants: zh ? "样式变体" : "Variants",
    preview: zh ? "实时预览" : "Live preview",
    fullCode: zh ? "完整 TSX" : "Full TSX",
    reset: zh ? "重置" : "Reset",
    requiredError: zh ? "请填写必填内容后再查看预览和代码。" : "Fill in the required fields to see the preview and code.",
    unsupportedSlot: zh ? "此配方包含暂不支持编辑的必填插槽，无法生成预览。" : "This recipe has a required slot that cannot be edited here, so a preview cannot be generated.",
    buildError: zh ? "当前参数无法生成组件，请恢复默认值或调整输入内容。" : "The component could not be generated from these values. Reset or adjust the inputs and try again.",
    unavailable: zh ? "此组件暂不支持在线调参。" : "This component does not support interactive editing yet.",
    loadError: zh ? "组件参数暂时无法加载。" : "Component options could not be loaded.",
    label: zh ? "字段名称" : "Label",
    codeLanguage: "tsx",
  };
}

function isEditableTextSlot(slot: RecipeSlot): boolean {
  // The workbench builder converts children and element slots to escaped text,
  // so every non-icon slot can be edited without accepting JSX or HTML input.
  return slot.type !== "icon";
}

function cloneValues(values: RecipeRenderParams): RecipeRenderParams {
  return {
    ...values,
    params: { ...values.params },
    slots: { ...values.slots },
  };
}

function Unavailable({ message }: { message: string }) {
  return (
    <div className="border border-border p-4 text-sm text-muted" role="status">
      {message}
    </div>
  );
}

export function RecipeWorkbench({ recipe, styleSlug, previewAssets }: RecipeWorkbenchProps) {
  const { locale } = useI18n();
  const copy = copyFor(locale);
  let supported = false;
  let initialValues: RecipeRenderParams | null = null;
  try {
    supported = isWorkbenchRecipe(recipe);
    if (supported) initialValues = getWorkbenchDefaults(recipe);
  } catch {
    initialValues = null;
  }
  if (!supported) return <Unavailable message={copy.unavailable} />;
  if (!initialValues) return <Unavailable message={copy.loadError} />;

  // Include the complete recipe so a style change cannot retain values from
  // the previous component, even when its id stays the same.
  const resetKey = `${styleSlug ?? ""}:${JSON.stringify(recipe)}`;
  return (
    <RecipeWorkbenchPanel
      key={resetKey}
      recipe={recipe}
      styleSlug={styleSlug}
      previewAssets={previewAssets}
      initialValues={initialValues}
    />
  );
}

function RecipeWorkbenchPanel({
  recipe,
  styleSlug,
  previewAssets,
  initialValues,
}: RecipeWorkbenchProps & { initialValues: RecipeRenderParams }) {
  const { locale } = useI18n();
  const zh = locale === "zh";
  const copy = copyFor(locale);
  const [values, setValues] = useState(() => cloneValues(initialValues));

  const variants = Object.values(recipe.variants);
  const textSlots = recipe.slots.filter(isEditableTextSlot);
  const hasDeclaredLabel = recipe.slots.some((slot) => slot.id === "label");
  const needsInputLabel = recipe.skeleton.element === "input" && !hasDeclaredLabel;

  const formError = useMemo(() => {
    const missingUnsupportedSlot = recipe.slots.some((slot) =>
      slot.required && !isEditableTextSlot(slot) && !String(values.slots[slot.id] ?? "").trim()
    );
    if (missingUnsupportedSlot) return copy.unsupportedSlot;

    const missingRequiredSlot = recipe.slots.some((slot) =>
      slot.required && !String(values.slots[slot.id] ?? "").trim()
    );
    if (needsInputLabel && !String(values.slots.label ?? "").trim()) return copy.requiredError;
    if (missingRequiredSlot) return copy.requiredError;
    return null;
  }, [copy.requiredError, copy.unsupportedSlot, needsInputLabel, recipe.slots, values.slots]);

  const result = useMemo(() => {
    if (formError) return { artifact: null, error: formError };
    try {
      return { artifact: buildWorkbenchArtifact(recipe, values), error: null };
    } catch {
      return { artifact: null, error: copy.buildError };
    }
  }, [copy.buildError, formError, recipe, values]);

  const updateParam = (parameter: RecipeParameter, value: string | boolean) => {
    setValues((current) => ({
      ...current,
      params: { ...current.params, [parameter.id]: value },
    }));
  };

  const updateSlot = (slotId: string, value: string) => {
    setValues((current) => ({
      ...current,
      slots: { ...current.slots, [slotId]: value },
    }));
  };

  const html = result.artifact ? sanitizePreviewHtml(result.artifact.preview) : "";

  return (
    <section className="w-full min-w-0 space-y-3 border border-border p-3 md:p-4">
      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-[15rem_minmax(0,1fr)] md:items-start">
        <div className="min-w-0 space-y-3">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setValues(cloneValues(initialValues))}
              className="border border-border px-2 py-1 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {copy.reset}
            </button>
          </div>

          {variants.length > 0 && (
            <fieldset className="min-w-0">
              <legend className="sr-only">{copy.variants}</legend>
              <div className="flex min-w-0 flex-wrap gap-1" role="group" aria-label={copy.variants}>
                {variants.map((variant) => {
                  const selected = values.variant === variant.id;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setValues((current) => ({ ...current, variant: variant.id }))}
                      className={`max-w-full border px-2 py-1 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${selected ? "border-foreground bg-foreground text-background" : "border-border text-muted hover:border-foreground hover:text-foreground"}`}
                    >
                      <span className="break-words">{zh ? variant.labelZh || variant.label : variant.label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          <div className="min-w-0 space-y-2.5">
            {recipe.parameters.map((parameter) => {
              const label = zh ? parameter.labelZh || parameter.label : parameter.label;
              const value = values.params[parameter.id];

              if (parameter.type === "select") {
                return (
                  <fieldset key={parameter.id} className="min-w-0 space-y-1">
                    <legend className="text-xs text-foreground">{label}</legend>
                    <div className="flex min-w-0 flex-wrap gap-1" role="group" aria-label={label}>
                      {(parameter.options ?? []).map((option) => {
                        const selected = value === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => updateParam(parameter, option.value)}
                            className={`max-w-full border px-2 py-1 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${selected ? "border-foreground bg-foreground text-background" : "border-border text-muted hover:border-foreground hover:text-foreground"}`}
                          >
                            <span className="break-words">{zh ? option.labelZh || option.label : option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                );
              }

              if (parameter.type === "boolean") {
                return (
                  <div key={parameter.id} className="flex min-h-7 items-center">
                    <Checkbox
                      checked={value === true}
                      onCheckedChange={(checked) => updateParam(parameter, checked === true)}
                      label={label}
                      className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    />
                  </div>
                );
              }

              return null;
            })}
          </div>

          {(textSlots.length > 0 || needsInputLabel) && (
            <div className="min-w-0 space-y-2">
              {textSlots.map((slot) => (
                <TextSlotField
                  key={slot.id}
                  value={values.slots[slot.id] ?? ""}
                  label={zh ? slot.labelZh || slot.label : slot.label}
                  required={slot.required}
                  requiredError={Boolean(result.error && slot.required && !String(values.slots[slot.id] ?? "").trim())}
                  placeholder={slot.placeholder}
                  onChange={(value) => updateSlot(slot.id, value)}
                />
              ))}
              {needsInputLabel && (
                <TextSlotField
                  value={values.slots.label ?? ""}
                  label={copy.label}
                  required
                  requiredError={Boolean(result.error && !String(values.slots.label ?? "").trim())}
                  onChange={(value) => updateSlot("label", value)}
                />
              )}
            </div>
          )}
        </div>

        <section className="min-w-0 space-y-2" aria-labelledby="recipe-workbench-preview-heading">
          <h3 id="recipe-workbench-preview-heading" className="text-sm font-medium text-foreground">{copy.preview}</h3>
          {result.error ? (
            <p className="border border-border px-3 py-2 text-sm text-muted" role="alert">{result.error}</p>
          ) : (
            <div className="min-w-0 overflow-x-auto border border-border bg-background p-3 md:p-4">
              <div className="relative isolate min-h-20 w-full min-w-0">
                <ExtractedComponentPreview
                  html={html}
                  assets={previewAssets ?? EMPTY_PREVIEW_ASSETS}
                  componentKey={recipe.id}
                />
              </div>
            </div>
          )}
        </section>
      </div>

      {result.artifact && (
        <div className="space-y-3">
          <details className="min-w-0 border-t border-border pt-2">
            <summary className="flex min-w-0 cursor-pointer items-center gap-2 py-1 text-sm text-foreground marker:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              <span className="shrink-0">{copy.fullCode}</span>
              <span className="min-w-0 truncate font-mono text-xs text-muted">{result.artifact.fileName}</span>
            </summary>
            <div className="mt-2 min-w-0">
              <CodeBlock code={result.artifact.code} language={copy.codeLanguage} slug={styleSlug} />
            </div>
          </details>
          <ComponentUsageGuide
            componentId={recipe.id}
            styleSlug={styleSlug}
            artifact={result.artifact}
          />
        </div>
      )}
    </section>
  );
}

function TextSlotField({
  value,
  label,
  required,
  requiredError,
  placeholder,
  onChange,
}: {
  value: string;
  label: string;
  required: boolean;
  requiredError: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  const reactId = useId();
  const id = `recipe-workbench-slot-${reactId.replace(/:/g, "")}`;
  return (
    <label htmlFor={id} className="min-w-0 space-y-1 text-xs text-foreground">
      <span className="block break-words">{label}{required ? <span aria-hidden="true"> *</span> : null}</span>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={requiredError}
        onChange={(event) => onChange(event.currentTarget.value)}
        className="w-full min-w-0 border border-border bg-background px-2 py-1.5 text-xs text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      />
    </label>
  );
}
