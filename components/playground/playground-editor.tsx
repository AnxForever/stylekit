"use client";

import { useEffect, useRef, useCallback } from "react";
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching } from "@codemirror/language";
import { closeBrackets } from "@codemirror/autocomplete";
import { highlightSelectionMatches } from "@codemirror/search";

interface PlaygroundEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: "jsx" | "html" | "css";
  darkMode?: boolean;
}

export function PlaygroundEditor({
  value,
  onChange,
  language = "jsx",
  darkMode = false,
}: PlaygroundEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);

  // Keep onChange ref up to date without recreating editor
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const getLanguageExtension = useCallback(() => {
    switch (language) {
      case "html":
        return html();
      case "css":
        return css();
      case "jsx":
      default:
        return javascript({ jsx: true, typescript: true });
    }
  }, [language]);

  useEffect(() => {
    if (!containerRef.current) return;

    const extensions = [
      lineNumbers(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      bracketMatching(),
      closeBrackets(),
      highlightSelectionMatches(),
      syntaxHighlighting(defaultHighlightStyle),
      getLanguageExtension(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      keymap.of([...defaultKeymap, indentWithTab] as any),
      EditorState.tabSize.of(2),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChangeRef.current(update.state.doc.toString());
        }
      }),
      EditorView.theme({
        "&": {
          height: "100%",
          fontSize: "13px",
        },
        ".cm-scroller": {
          overflow: "auto",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        },
        ".cm-content": {
          padding: "8px 0",
        },
      }),
    ];

    if (darkMode) {
      extensions.push(oneDark);
    } else {
      extensions.push(
        EditorView.theme({
          "&": {
            backgroundColor: "#fafafa",
          },
          ".cm-gutters": {
            backgroundColor: "#f0f0f0",
            borderRight: "1px solid #e0e0e0",
          },
        })
      );
    }

    const state = EditorState.create({
      doc: value,
      extensions,
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // Only recreate editor when language or darkMode changes, not on every value change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, darkMode, getLanguageExtension]);

  // Update editor content when value changes externally (e.g., template load)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const currentValue = view.state.doc.toString();
    if (currentValue !== value) {
      view.dispatch({
        changes: {
          from: 0,
          to: currentValue.length,
          insert: value,
        },
      });
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden"
    />
  );
}
