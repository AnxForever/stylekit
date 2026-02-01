"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/lib/i18n/context";

type ComponentType = "button" | "input" | "card" | "alert" | "progress";

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
};

export default function PlaygroundPage() {
  const [activeComponent, setActiveComponent] = useState<ComponentType>("button");
  const [state, setState] = useState<PlaygroundState>(initialState);
  const { t } = useI18n();

  const components: { key: ComponentType; label: string }[] = [
    { key: "button", label: "Button" },
    { key: "input", label: "Input" },
    { key: "card", label: "Card" },
    { key: "alert", label: "Alert" },
    { key: "progress", label: "Progress" },
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
    }
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
            {/* Component Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
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

            <div className="grid md:grid-cols-2 gap-8">
              {/* Preview */}
              <div className="border border-border p-8 min-h-[300px] flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50">
                {renderPreview()}
              </div>

              {/* Controls */}
              <div className="border border-border p-6">
                <h3 className="text-lg font-medium mb-4">{t("playground.props")}</h3>
                {renderControls()}
              </div>
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
