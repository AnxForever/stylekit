"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
import styles from "./_components/field-manual.module.css";

const THEME_STORAGE_KEY = "stylekit-technical-profile-theme";
const THEME_CHANGE_EVENT = "stylekit-technical-profile-theme-change";

function subscribeToThemeChanges(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
  };
}

function getThemeSnapshot() {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark";
  } catch {
    return false;
  }
}

function getServerThemeSnapshot() {
  return false;
}

export default function TechnicalProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const storedTheme = useSyncExternalStore(
    subscribeToThemeChanges,
    getThemeSnapshot,
    getServerThemeSnapshot
  );
  const [selectedTheme, setSelectedTheme] = useState<boolean | null>(null);
  const isDark = selectedTheme ?? storedTheme;

  function toggleTheme() {
    const next = !isDark;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
      setSelectedTheme(null);
    } catch {
      setSelectedTheme(next);
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <>
      <TemplateBackButton />
      <div id="top" className={`${styles.sheet} ${isDark ? styles.dark : ""}`}>
      <header className={`${styles.masthead} ${styles.crosslineBottom}`}>
        <div className={styles.rail}>
          <Link className={styles.wordmark} href="/templates/technical-profile">
            <span className={styles.wordmarkGlyph} aria-hidden="true">F/</span>
            <span>Field Manual</span>
          </Link>
          <nav className={styles.navigation} aria-label="Main navigation">
            <Link href="/templates/technical-profile#work">Work</Link>
            <Link href="/templates/technical-profile#notes">Notes</Link>
          </nav>
          <button
            className={styles.themeButton}
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Use light theme" : "Use dark theme"}
            title={isDark ? "Use light theme" : "Use dark theme"}
          >
            {isDark ? <Sun aria-hidden="true" size={16} /> : <Moon aria-hidden="true" size={16} />}
          </button>
        </div>
      </header>
      {children}
      <footer className={styles.footer}>
        <div className={styles.rail}>
          <div className={styles.footerTop}>
            <Link href="/templates/technical-profile" className={styles.wordmark}>
              <span className={styles.wordmarkGlyph} aria-hidden="true">F/</span>
              <span>Field Manual</span>
            </Link>
            <a href="#top" className={styles.backToTop}>Back to top</a>
          </div>
          <p className={styles.sampleNote}>
            Sample profile and project details. Replace the copy, links, and mark with your own.
          </p>
          <div className={styles.footerMeta}>
            <span>Independent practice / 2026</span>
            <span>Built as a StyleKit template</span>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
