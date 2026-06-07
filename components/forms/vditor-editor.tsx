"use client";

import "vditor/dist/index.css";
import { useEffect, useRef, useState } from "react";

type VditorCtor = typeof import("vditor").default;
type VditorInstance = InstanceType<VditorCtor>;

const syncHandlers = new Map<string, () => void>();

const SV_TOOLBAR = [
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
  "undo",
  "redo"
] as const;

function safeDestroy(vditor: VditorInstance | null) {
  if (!vditor) return;

  try {
    vditor.destroy();
  } catch {
    // Strict Mode teardown race
  }
}

export function syncVditorForm(form: HTMLFormElement) {
  form.querySelectorAll<HTMLElement>("[data-vditor-editor-id]").forEach((node) => {
    const editorId = node.dataset.vditorEditorId;
    if (editorId) syncHandlers.get(editorId)?.();
  });
}

export function VditorEditor({
  editorId,
  name,
  defaultValue,
  height = 320,
  restoreTemplate,
  restoreLabel,
  confirmRestore,
  loadingLabel = "Loading editor..."
}: {
  editorId: string;
  name: string;
  defaultValue?: string | null;
  height?: number;
  restoreTemplate?: string;
  restoreLabel?: string;
  confirmRestore?: string;
  loadingLabel?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const vditorRef = useRef<VditorInstance | null>(null);
  const readyRef = useRef(false);
  const hiddenRef = useRef<HTMLInputElement>(null);
  const initialValue = defaultValue ?? "";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    readyRef.current = false;
    vditorRef.current = null;
    setLoading(true);
    container.innerHTML = "";

    const syncToHidden = () => {
      if (!hiddenRef.current || !readyRef.current || !vditorRef.current) return;

      try {
        hiddenRef.current.value = vditorRef.current.getValue();
      } catch {
        hiddenRef.current.value = initialValue;
      }
    };

    syncHandlers.set(editorId, syncToHidden);

    void (async () => {
      try {
        const { default: Vditor } = await import("vditor");
        if (cancelled || !containerRef.current) return;

        const vditor = new Vditor(containerRef.current, {
          height,
          mode: "sv",
          value: initialValue,
          cache: { enable: false },
          preview: { actions: [] },
          toolbar: [...SV_TOOLBAR],
          after: () => {
            if (cancelled) {
              safeDestroy(vditor);
              return;
            }

            readyRef.current = true;
            vditorRef.current = vditor;
            syncToHidden();
            setLoading(false);
          },
          input: () => {
            syncToHidden();
          }
        });

        if (cancelled) safeDestroy(vditor);
      } catch {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      syncHandlers.delete(editorId);
      const instance = vditorRef.current;
      readyRef.current = false;
      vditorRef.current = null;
      if (instance) safeDestroy(instance);
      container.innerHTML = "";
      setLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorId]);

  function handleRestore() {
    if (!restoreTemplate || !vditorRef.current || !readyRef.current) return;
    if (confirmRestore && !window.confirm(confirmRestore)) return;

    vditorRef.current.setValue(restoreTemplate);
    syncHandlers.get(editorId)?.();
  }

  return (
    <div className="space-y-2" data-vditor-editor-id={editorId}>
      {restoreTemplate && restoreLabel ? (
        <button
          type="button"
          onClick={handleRestore}
          disabled={loading}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          {restoreLabel}
        </button>
      ) : null}
      {loading ? <p className="text-sm text-slate-500">{loadingLabel}</p> : null}
      <div ref={containerRef} className="vditor-host min-h-[320px]" />
      <input ref={hiddenRef} type="hidden" name={name} defaultValue={initialValue} />
    </div>
  );
}
