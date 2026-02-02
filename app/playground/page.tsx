"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n/context";
import { Copy, Check, RotateCcw, Code2, Eye } from "lucide-react";

type ComponentType = "button" | "input" | "card" | "alert" | "progress" | "select" | "radio";

interface PlaygroundState {
  // Button
  buttonVariant: "primary" | "secondary" | "outline" | "ghost" | "danger";
  buttonSize: "sm" | "md" | "lg";
  buttonLoading: boolean;
  buttonDisabled: boolean;
  buttonText: string;
  // Input
  inputPlaceholder: string;
  inputDisabled: boolean;
  inputType: "text" | "email" | "password";
  // Card
  cardTitle: string;
  cardContent: string;
  // Alert
  alertVariant: "default" | "success" | "warning" | "error";
  alertTitle: string;
  alertMessage: string;
  // Progress
  progressValue: number;
  progressShowLabel: boolean;
  // Select
  selectPlaceholder: string;
  selectDisabled: boolean;
  selectOptions: string[];
  // Radio
  radioOrientation: "horizontal" | "vertical";
  radioDisabled: boolean;
  radioOptions: string[];
}

const initialState: PlaygroundState = {
  buttonVariant: "primary",
  buttonSize: "md",
  buttonLoading: false,
  buttonDisabled: false,
  buttonText: "Click me",
  inputPlaceholder: "Enter text...",
  inputDisabled: false,
  inputType: "text",
  cardTitle: "Card Title",
  cardContent: "This is the card content. You can customize it.",
  alertVariant: "default",
  alertTitle: "Heads up!",
  alertMessage: "This is an alert message.",
  progressValue: 60,
  progressShowLabel: true,
  selectPlaceholder: "Select an option",
  selectDisabled: false,
  selectOptions: ["Option 1", "Option 2", "Option 3"],
  radioOrientation: "vertical",
  radioDisabled: false,
  radioOptions: ["Option A", "Option B", "Option C"],
};

export default function PlaygroundPage() {
  const [activeComponent, setActiveComponent] = useState<ComponentType>("button");
  const [state, setState] = useState<PlaygroundState>(initialState);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t } = useI18n();

  const components: { key: ComponentType; label: string }[] = [
    { key: "button", label: "Button" },
    { key: "input", label: "Input" },
    { key: "card", label: "Card" },
    { key: "alert", label: "Alert" },
    { key: "progress", label: "Progress" },
    { key: "select", label: "Select" },
    { key: "radio", label: "Radio" },
  ];

  const updateState = <K extends keyof PlaygroundState>(
    key: K,
    value: PlaygroundState[K]
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const renderPreview = () => {
    switch (activeComponent) {
      case "button":
        return (
          <Button
            variant={state.buttonVariant}
            size={state.buttonSize}
            loading={state.buttonLoading}
            disabled={state.buttonDisabled}
          >
            {state.buttonText}
          </Button>
        );
      case "input":
        return (
          <Input
            placeholder={state.inputPlaceholder}
            disabled={state.inputDisabled}
            type={state.inputType}
            className="max-w-xs"
          />
        );
      case "card":
        return (
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>{state.cardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted text-sm">{state.cardContent}</p>
            </CardContent>
          </Card>
        );
      case "alert":
        return (
          <Alert variant={state.alertVariant} className="max-w-md">
            <strong>{state.alertTitle}</strong>
            <p>{state.alertMessage}</p>
          </Alert>
        );
      case "progress":
        return (
          <div className="w-full max-w-xs space-y-2">
            <Progress value={state.progressValue} />
            {state.progressShowLabel && (
              <p className="text-sm text-muted text-center">{state.progressValue}%</p>
            )}
          </div>
        );
      case "select":
        return (
          <Select disabled={state.selectDisabled}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={state.selectPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {state.selectOptions.map((opt) => (
                <SelectItem key={opt} value={opt.toLowerCase().replace(/\s/g, "-")}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "radio":
        return (
          <RadioGroup
            defaultValue={state.radioOptions[0]?.toLowerCase().replace(/\s/g, "-")}
            className={state.radioOrientation === "horizontal" ? "flex gap-4" : "space-y-2"}
            disabled={state.radioDisabled}
          >
            {state.radioOptions.map((opt) => (
              <RadioGroupItem
                key={opt}
                value={opt.toLowerCase().replace(/\s/g, "-")}
                label={opt}
              />
            ))}
          </RadioGroup>
        );
    }
  };

  // Generate code string based on current state
  const generateCode = useMemo(() => {
    switch (activeComponent) {
      case "button": {
        const props: string[] = [];
        if (state.buttonVariant !== "primary") props.push(`variant="${state.buttonVariant}"`);
        if (state.buttonSize !== "md") props.push(`size="${state.buttonSize}"`);
        if (state.buttonLoading) props.push("loading");
        if (state.buttonDisabled) props.push("disabled");
        const propsStr = props.length > 0 ? ` ${props.join(" ")}` : "";
        return `<Button${propsStr}>\n  ${state.buttonText}\n</Button>`;
      }
      case "input": {
        const props: string[] = [];
        if (state.inputType !== "text") props.push(`type="${state.inputType}"`);
        props.push(`placeholder="${state.inputPlaceholder}"`);
        if (state.inputDisabled) props.push("disabled");
        return `<Input ${props.join(" ")} />`;
      }
      case "card":
        return `<Card>
  <CardHeader>
    <CardTitle>${state.cardTitle}</CardTitle>
  </CardHeader>
  <CardContent>
    <p>${state.cardContent}</p>
  </CardContent>
</Card>`;
      case "alert": {
        const props: string[] = [];
        if (state.alertVariant !== "default") props.push(`variant="${state.alertVariant}"`);
        const propsStr = props.length > 0 ? ` ${props.join(" ")}` : "";
        return `<Alert${propsStr}>
  <strong>${state.alertTitle}</strong>
  <p>${state.alertMessage}</p>
</Alert>`;
      }
      case "progress": {
        return `<Progress value={${state.progressValue}} />${
          state.progressShowLabel ? `\n<p className="text-sm text-muted">${state.progressValue}%</p>` : ""
        }`;
      }
      case "select": {
        const optionsCode = state.selectOptions
          .map((opt) => `  <SelectItem value="${opt.toLowerCase().replace(/\s/g, "-")}">${opt}</SelectItem>`)
          .join("\n");
        return `<Select${state.selectDisabled ? " disabled" : ""}>
  <SelectTrigger>
    <SelectValue placeholder="${state.selectPlaceholder}" />
  </SelectTrigger>
  <SelectContent>
${optionsCode}
  </SelectContent>
</Select>`;
      }
      case "radio": {
        const optionsCode = state.radioOptions
          .map((opt) => `  <RadioGroupItem value="${opt.toLowerCase().replace(/\s/g, "-")}" label="${opt}" />`)
          .join("\n");
        const classStr = state.radioOrientation === "horizontal" ? ` className="flex gap-4"` : "";
        return `<RadioGroup defaultValue="${state.radioOptions[0]?.toLowerCase().replace(/\s/g, "-")}"${classStr}${state.radioDisabled ? " disabled" : ""}>
${optionsCode}
</RadioGroup>`;
      }
      default:
        return "";
    }
  }, [activeComponent, state]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generateCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = generateCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setState(initialState);
  };

  const renderControls = () => {
    switch (activeComponent) {
      case "button":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">{t("playground.variant")}</label>
              <div className="flex flex-wrap gap-2">
                {(["primary", "secondary", "outline", "ghost", "danger"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => updateState("buttonVariant", v)}
                    className={`px-3 py-1 text-sm border rounded ${
                      state.buttonVariant === v
                        ? "bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("playground.size")}</label>
              <div className="flex gap-2">
                {(["sm", "md", "lg"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateState("buttonSize", s)}
                    className={`px-3 py-1 text-sm border rounded ${
                      state.buttonSize === s
                        ? "bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("playground.text")}</label>
              <Input
                value={state.buttonText}
                onChange={(e) => updateState("buttonText", e.target.value)}
                className="max-w-xs"
              />
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={state.buttonLoading}
                  onCheckedChange={(c) => updateState("buttonLoading", !!c)}
                />
                <span className="text-sm">{t("playground.loading")}</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={state.buttonDisabled}
                  onCheckedChange={(c) => updateState("buttonDisabled", !!c)}
                />
                <span className="text-sm">{t("playground.disabled")}</span>
              </label>
            </div>
          </div>
        );

      case "input":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">{t("playground.type")}</label>
              <div className="flex gap-2">
                {(["text", "email", "password"] as const).map((inputType) => (
                  <button
                    key={inputType}
                    onClick={() => updateState("inputType", inputType)}
                    className={`px-3 py-1 text-sm border rounded ${
                      state.inputType === inputType
                        ? "bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {inputType}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("playground.placeholder")}</label>
              <Input
                value={state.inputPlaceholder}
                onChange={(e) => updateState("inputPlaceholder", e.target.value)}
                className="max-w-xs"
              />
            </div>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={state.inputDisabled}
                onCheckedChange={(c) => updateState("inputDisabled", !!c)}
              />
              <span className="text-sm">{t("playground.disabled")}</span>
            </label>
          </div>
        );

      case "card":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">{t("playground.title.label")}</label>
              <Input
                value={state.cardTitle}
                onChange={(e) => updateState("cardTitle", e.target.value)}
                className="max-w-xs"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("playground.content")}</label>
              <textarea
                value={state.cardContent}
                onChange={(e) => updateState("cardContent", e.target.value)}
                className="w-full max-w-xs h-24 px-3 py-2 border border-border rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        );

      case "alert":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">{t("playground.variant")}</label>
              <div className="flex flex-wrap gap-2">
                {(["default", "success", "warning", "error"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => updateState("alertVariant", v)}
                    className={`px-3 py-1 text-sm border rounded ${
                      state.alertVariant === v
                        ? "bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("playground.title.label")}</label>
              <Input
                value={state.alertTitle}
                onChange={(e) => updateState("alertTitle", e.target.value)}
                className="max-w-xs"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("playground.message")}</label>
              <Input
                value={state.alertMessage}
                onChange={(e) => updateState("alertMessage", e.target.value)}
                className="max-w-xs"
              />
            </div>
          </div>
        );

      case "progress":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t("playground.value")}: {state.progressValue}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={state.progressValue}
                onChange={(e) => updateState("progressValue", Number(e.target.value))}
                className="w-full max-w-xs"
              />
            </div>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={state.progressShowLabel}
                onCheckedChange={(c) => updateState("progressShowLabel", !!c)}
              />
              <span className="text-sm">{t("playground.showLabel")}</span>
            </label>
          </div>
        );

      case "select":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">{t("playground.placeholder")}</label>
              <Input
                value={state.selectPlaceholder}
                onChange={(e) => updateState("selectPlaceholder", e.target.value)}
                className="max-w-xs"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("playground.options")}</label>
              <div className="space-y-2">
                {state.selectOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...state.selectOptions];
                        newOpts[i] = e.target.value;
                        updateState("selectOptions", newOpts);
                      }}
                      className="max-w-[200px]"
                    />
                    {state.selectOptions.length > 2 && (
                      <button
                        onClick={() => {
                          const newOpts = state.selectOptions.filter((_, j) => j !== i);
                          updateState("selectOptions", newOpts);
                        }}
                        className="text-xs text-muted hover:text-red-500 transition-colors"
                      >
                        {t("playground.remove")}
                      </button>
                    )}
                  </div>
                ))}
                {state.selectOptions.length < 6 && (
                  <button
                    onClick={() => updateState("selectOptions", [...state.selectOptions, `Option ${state.selectOptions.length + 1}`])}
                    className="text-xs text-muted hover:text-foreground transition-colors"
                  >
                    + {t("playground.addOption")}
                  </button>
                )}
              </div>
            </div>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={state.selectDisabled}
                onCheckedChange={(c) => updateState("selectDisabled", !!c)}
              />
              <span className="text-sm">{t("playground.disabled")}</span>
            </label>
          </div>
        );

      case "radio":
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">{t("playground.orientation")}</label>
              <div className="flex gap-2">
                {(["vertical", "horizontal"] as const).map((dir) => (
                  <button
                    key={dir}
                    onClick={() => updateState("radioOrientation", dir)}
                    className={`px-3 py-1 text-sm border rounded ${
                      state.radioOrientation === dir
                        ? "bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("playground.options")}</label>
              <div className="space-y-2">
                {state.radioOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...state.radioOptions];
                        newOpts[i] = e.target.value;
                        updateState("radioOptions", newOpts);
                      }}
                      className="max-w-[200px]"
                    />
                    {state.radioOptions.length > 2 && (
                      <button
                        onClick={() => {
                          const newOpts = state.radioOptions.filter((_, j) => j !== i);
                          updateState("radioOptions", newOpts);
                        }}
                        className="text-xs text-muted hover:text-red-500 transition-colors"
                      >
                        {t("playground.remove")}
                      </button>
                    )}
                  </div>
                ))}
                {state.radioOptions.length < 5 && (
                  <button
                    onClick={() => updateState("radioOptions", [...state.radioOptions, `Option ${String.fromCharCode(65 + state.radioOptions.length)}`])}
                    className="text-xs text-muted hover:text-foreground transition-colors"
                  >
                    + {t("playground.addOption")}
                  </button>
                )}
              </div>
            </div>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={state.radioDisabled}
                onCheckedChange={(c) => updateState("radioDisabled", !!c)}
              />
              <span className="text-sm">{t("playground.disabled")}</span>
            </label>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border">
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("playground.subtitle")}
            </p>
            <h1 className="text-4xl md:text-5xl mb-4">{t("playground.title")}</h1>
            <p className="text-lg text-muted max-w-2xl">
              {t("playground.description")}
            </p>
          </div>
        </section>

        {/* Playground */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            {/* Component Tabs + Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                {components.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setActiveComponent(c.key)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      activeComponent === c.key
                        ? "bg-foreground text-background"
                        : "border border-border hover:border-foreground"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted hover:text-foreground transition-colors border border-border hover:border-foreground"
                  title={t("playground.reset")}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {t("playground.reset")}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Preview */}
              <div className="border border-border overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-800/50 border-b border-border">
                  <span className="text-xs text-muted font-medium uppercase tracking-wider">
                    {t("playground.preview")}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setShowCode(false)}
                      className={`p-1 rounded transition-colors ${!showCode ? "text-foreground" : "text-muted hover:text-foreground"}`}
                      title={t("playground.preview")}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setShowCode(true)}
                      className={`p-1 rounded transition-colors ${showCode ? "text-foreground" : "text-muted hover:text-foreground"}`}
                      title={t("playground.code")}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                {!showCode ? (
                  <div className="p-8 min-h-[280px] flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50">
                    {renderPreview()}
                  </div>
                ) : (
                  <div className="relative">
                    <div className="flex items-center justify-between px-4 py-1.5 bg-zinc-800">
                      <span className="text-xs text-zinc-400 font-mono">tsx</span>
                      <button
                        onClick={handleCopyCode}
                        className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors px-2 py-1"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3" />
                            {t("export.copied")}
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            {t("export.copyCode")}
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 bg-zinc-900 text-zinc-100 min-h-[246px] overflow-auto">
                      <code className="text-sm font-mono whitespace-pre">{generateCode}</code>
                    </pre>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="border border-border p-6">
                <h3 className="text-lg font-medium mb-4">{t("playground.props")}</h3>
                {renderControls()}
              </div>
            </div>

            {/* Generated Code (always visible below on larger screens) */}
            <div className="mt-6 border border-border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-800">
                <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider">
                  {t("playground.generatedCode")}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors px-2 py-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      {t("export.copied")}
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      {t("export.copyCode")}
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 bg-zinc-900 text-zinc-100 overflow-auto">
                <code className="text-sm font-mono whitespace-pre">{generateCode}</code>
              </pre>
            </div>

            {/* Quick Links */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted mb-4">{t("playground.moreComponents")}</p>
              <div className="flex gap-4">
                <Link
                  href="/components"
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  {t("playground.viewAllComponents")} →
                </Link>
                <Link
                  href="/styles"
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  {t("playground.exploreStyles")} →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
