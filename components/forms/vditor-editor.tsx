"use client";

import { useEffect, useRef } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";

type VditorMode = "wysiwyg" | "sv";

export function VditorEditor({
  editorId,
  name,
  mode,
  defaultValue,
  height = 360,
  restoreTemplate,
  restoreLabel,
  confirmRestore
}: {
  editorId: string;
  name: string;
  mode: VditorMode;
  defaultValue?: string | null;
  height?: number;
  restoreTemplate?: string;
  restoreLabel?: string;
  confirmRestore?: string;
}) {
  const vditorRef = useRef<Vditor | null>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);
  const initialValue = defaultValue ?? "";

  useEffect(() => {
    const vditor = new Vditor(editorId, {
      height,
      mode,
      value: mode === "sv" ? initialValue : "",
      cache: { enable: false },
      toolbar:
        mode === "wysiwyg"
          ? [
              "headings",
              "bold",
              "italic",
              "strike",
              "|",
              "line",
              "quote",
              "list",
              "ordered-list",
              "|",
              "table",
              "link",
              "|",
              "undo",
              "redo"
            ]
          : [
              "headings",
              "bold",
              "italic",
              "strike",
              "|",
              "line",
              "quote",
              "list",
              "ordered-list",
              "check",
              "|",
              "code",
              "inline-code",
              "table",
              "link",
              "|",
              "preview",
              "fullscreen",
              "|",
              "undo",
              "redo"
            ],
      after: () => {
        if (mode === "wysiwyg") {
          if (initialValue.trim().startsWith("<") && vditor.vditor.wysiwyg?.element) {
            vditor.vditor.wysiwyg.element.innerHTML = initialValue;
          } else if (initialValue) {
            vditor.setValue(initialValue);
          }
        }
        vditorRef.current = vditor;
        syncHiddenInput(vditor);
      },
      input: () => {
        if (vditorRef.current) syncHiddenInput(vditorRef.current);
      }
    });

    return () => {
      vditor.destroy();
      vditorRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorId, mode]);

  function syncHiddenInput(vditor: Vditor) {
    if (!hiddenRef.current) return;
    hiddenRef.current.value = mode === "wysiwyg" ? vditor.getHTML() : vditor.getValue();
  }

  function handleRestore() {
    if (!restoreTemplate || !vditorRef.current) return;
    if (confirmRestore && !window.confirm(confirmRestore)) return;

    const vditor = vditorRef.current;
    if (mode === "wysiwyg" && vditor.vditor.wysiwyg?.element) {
      vditor.vditor.wysiwyg.element.innerHTML = restoreTemplate;
    } else {
      vditor.setValue(restoreTemplate);
    }
    syncHiddenInput(vditor);
  }

  function handleSubmitSync() {
    if (vditorRef.current) syncHiddenInput(vditorRef.current);
  }

  return (
    <div className="space-y-2">
      {restoreTemplate && restoreLabel ? (
        <button
          type="button"
          onClick={handleRestore}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
        >
          {restoreLabel}
        </button>
      ) : null}
      <div id={editorId} className="vditor-host" />
      <input ref={hiddenRef} type="hidden" name={name} defaultValue={initialValue} />
      <button type="submit" className="hidden" aria-hidden onFocus={handleSubmitSync} />
      <span
        className="hidden"
        data-vditor-sync={editorId}
        onClick={handleSubmitSync}
      />
    </div>
  );
}

export function syncVditorForm(form: HTMLFormElement) {
  form.querySelectorAll<HTMLElement>("[data-vditor-sync]").forEach((node) => node.click());
}
