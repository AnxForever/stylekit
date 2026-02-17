"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const INSTALL_REMINDER_KEY = "stylekit:pwa-install-reminder-until";
const REMIND_LATER_MS = 1000 * 60 * 60 * 24 * 30;
const ACCEPTED_MS = 1000 * 60 * 60 * 24 * 365;

function readReminderUntil() {
  try {
    const value = window.localStorage.getItem(INSTALL_REMINDER_KEY);
    if (!value) return 0;
    const timestamp = Number.parseInt(value, 10);
    if (Number.isNaN(timestamp)) return 0;
    return timestamp;
  } catch {
    return 0;
  }
}

function postponeReminder(durationMs: number) {
  try {
    window.localStorage.setItem(
      INSTALL_REMINDER_KEY,
      String(Date.now() + durationMs),
    );
  } catch {
    // ignore persistence failures
  }
}

export function RegisterSW() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // SW registration failure is non-fatal
      });
    }

    // Show a lightweight install reminder only when user is eligible.
    const handler = (event: Event) => {
      const reminderUntil = readReminderUntil();
      if (reminderUntil > Date.now()) return;
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferredPrompt || !isVisible) return null;

  const handleInstall = async () => {
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        postponeReminder(ACCEPTED_MS);
        setDeferredPrompt(null);
        setIsVisible(false);
        return;
      }
      postponeReminder(REMIND_LATER_MS);
    } catch {
      postponeReminder(REMIND_LATER_MS);
    }
    setIsVisible(false);
  };

  const handleDismiss = () => {
    postponeReminder(REMIND_LATER_MS);
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex items-center gap-2 rounded-full border border-border bg-background/95 px-3 py-2 shadow-sm backdrop-blur">
        <Download className="h-4 w-4 text-muted-foreground" />
        <p className="text-xs text-foreground">可安装为桌面应用</p>
        <button
          type="button"
          onClick={handleInstall}
          className="rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background hover:opacity-90"
        >
          安装
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className="rounded-full p-1 text-muted-foreground hover:text-foreground"
          aria-label="关闭安装提醒"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
