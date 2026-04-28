"use client";

import { useMemo, useState } from "react";
import { marked } from "marked";

export function MarkdownEditor({
  name,
  label,
  defaultValue,
  previewLabel,
  rows = 12,
  required = false
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  previewLabel: string;
  rows?: number;
  required?: boolean;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const html = useMemo(() => marked.parse(value), [value]);

  return (
    <div className="space-y-2">
      <label className="block text-sm">
        <span className="mb-1 block text-slate-600">
          {label}
          {required ? <span className="ml-1 text-rose-500">*</span> : null}
        </span>
        <textarea
          name={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          rows={rows}
          required={required}
          className="w-full border-0 border-b-2 border-slate-300 bg-transparent px-1 py-2 outline-none transition duration-200 focus:-translate-y-0.5 focus:border-sky-500"
        />
      </label>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
        <p className="mb-2 text-xs text-slate-500">{previewLabel}</p>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
