"use client";

import { AlertCircle, X, GripVertical, Plus } from "lucide-react";

interface RulesStepProps {
  formData: {
    doList: string[];
    dontList: string[];
    aiRules: string[];
  };
  updateField: (field: string, value: unknown) => void;
  getVisibleError: (field: string, step: number) => string;
  markTouched: (field: string) => void;
  isAnimating: boolean;
  text: {
    fields: {
      requiredRules: string;
      forbiddenRules: string;
    };
    placeholders: {
      doRule: string;
      dontRule: string;
    };
    addRule: string;
  };
}

function ListEditor({
  items,
  onChange,
  placeholder,
  label,
  addLabel,
  fieldName,
  markTouched,
  minCount,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  label: string;
  addLabel: string;
  fieldName: string;
  markTouched: (field: string) => void;
  minCount?: number;
}) {
  const updateItem = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      onChange(items.filter((_, i) => i !== index));
    }
  };

  const addItem = () => {
    onChange([...items, ""]);
  };

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [removed] = next.splice(from, 1);
    next.splice(to, 0, removed);
    onChange(next);
  };

  const filledCount = items.filter((item) => item.trim()).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm">{label}</label>
        {minCount !== undefined && (
          <span className={`text-xs ${filledCount >= minCount ? "text-green-600 dark:text-green-400" : "text-muted"}`}>
            {filledCount}/{minCount}+
          </span>
        )}
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 items-center group">
            <button
              type="button"
              className="flex flex-col gap-0.5 text-muted opacity-0 group-hover:opacity-100 transition-opacity cursor-grab"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => moveItem(index, index - 1)}
              disabled={index === 0}
            >
              <GripVertical className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              onBlur={() => markTouched(fieldName)}
              placeholder={placeholder}
              className="flex-1 px-4 py-2 border border-border bg-background focus:border-foreground outline-none transition-colors"
            />
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="px-2 py-2 border border-border hover:border-foreground text-muted hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-2 inline-flex items-center gap-1 px-4 py-2 border border-border hover:border-foreground transition-colors text-sm"
      >
        <Plus className="w-3 h-3" />
        {addLabel}
      </button>
    </div>
  );
}

export function RulesStep({
  formData,
  updateField,
  getVisibleError,
  markTouched,
  isAnimating,
  text,
}: RulesStepProps) {
  return (
    <div className={`space-y-6 transition-opacity duration-150 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
      <ListEditor
        items={formData.doList}
        onChange={(items) => updateField("doList", items)}
        placeholder={text.placeholders.doRule}
        label={`${text.fields.requiredRules} *`}
        addLabel={text.addRule}
        fieldName="doList"
        markTouched={markTouched}
        minCount={3}
      />
      {getVisibleError("doList", 4) && (
        <p className="text-xs text-red-500 flex items-center gap-1 -mt-4">
          <AlertCircle className="w-3 h-3" />
          {getVisibleError("doList", 4)}
        </p>
      )}

      <ListEditor
        items={formData.dontList}
        onChange={(items) => updateField("dontList", items)}
        placeholder={text.placeholders.dontRule}
        label={text.fields.forbiddenRules}
        addLabel={text.addRule}
        fieldName="dontList"
        markTouched={markTouched}
        minCount={3}
      />

      <ListEditor
        items={formData.aiRules}
        onChange={(items) => updateField("aiRules", items)}
        placeholder="e.g. Always use border-2 border-black for containers"
        label="AI Rules"
        addLabel={text.addRule}
        fieldName="aiRules"
        markTouched={markTouched}
        minCount={3}
      />

      <div className="p-4 border border-border bg-zinc-50 dark:bg-zinc-900">
        <p className="text-xs text-muted">
          AI Rules are instructions that AI code generators follow when using this style.
          They complement Do/Don&apos;t rules with specific implementation guidance.
        </p>
      </div>
    </div>
  );
}
