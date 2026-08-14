"use client";

import { useState } from "react";

import { trackEvent } from "@/lib/analytics/events";

import styles from "./webgl-lab.module.css";

export interface SourceFile {
  name: string;
  code: string;
}

interface SourcePanelProps {
  label: string;
  title: string;
  files: SourceFile[];
  usage: string;
}

export function SourcePanel({ label, title, files, usage }: SourcePanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const active = files[activeIndex];

  async function copy(name: string, code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(name);
      trackEvent("code_copy", { slug: `webgl-lab:${name}`, language: "tsx" });
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  return (
    <article className={styles.sourcePanel}>
      <div className={styles.sourceHeader}>
        <span className={styles.signalLabel}>{label}</span>
        <span>{title}</span>
      </div>
      <div className={styles.fileTabs} role="tablist" aria-label={`${title} source files`}>
        {files.map((file, index) => (
          <button
            key={file.name}
            role="tab"
            aria-selected={index === activeIndex}
            className={index === activeIndex ? styles.fileTabActive : styles.fileTab}
            onClick={() => setActiveIndex(index)}
          >
            {file.name}
          </button>
        ))}
        <button
          type="button"
          className={styles.copyButton}
          onClick={() => copy(active.name, active.code)}
        >
          {copied === active.name ? "COPIED ✓" : "COPY FILE"}
        </button>
      </div>
      <pre className={styles.codeScroll} tabIndex={0}>
        <code>{active.code}</code>
      </pre>
      <div className={styles.usageBlock}>
        <span className={styles.signalLabel}>USAGE</span>
        <pre>
          <code>{usage}</code>
        </pre>
        <button
          type="button"
          className={styles.copyButton}
          onClick={() => copy(`${title}-usage`, usage)}
        >
          {copied === `${title}-usage` ? "COPIED ✓" : "COPY"}
        </button>
      </div>
    </article>
  );
}
