"use client";

import dynamic from "next/dynamic";
import { useState, useTransition } from "react";
import { upsertLegalPage } from "@/lib/actions";
import { syncVditorForm } from "@/components/forms/vditor-editor";
import { SubmitButton, TextField } from "@/components/forms/base";

const VditorEditor = dynamic(
  () => import("@/components/forms/vditor-editor").then((mod) => mod.VditorEditor),
  { ssr: false }
);

export function LegalPageForm({
  slug,
  titleLabel,
  contentLabel,
  defaultTitle,
  defaultContent,
  saveLabel,
  savedLabel,
  restoreTemplate,
  restoreLabel,
  confirmRestore
}: {
  slug: string;
  titleLabel: string;
  contentLabel: string;
  defaultTitle: string;
  defaultContent: string;
  saveLabel: string;
  savedLabel: string;
  restoreTemplate?: string;
  restoreLabel?: string;
  confirmRestore?: string;
}) {
  const editorId = `legal-editor-${slug}`;
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="space-y-2 rounded-lg border border-slate-100 p-3"
      onSubmit={(event) => {
        event.preventDefault();
        syncVditorForm(event.currentTarget);
        const formData = new FormData(event.currentTarget);
        formData.set("contentType", "MARKDOWN");
        startTransition(async () => {
          await upsertLegalPage(formData);
          setSaved(true);
          window.setTimeout(() => setSaved(false), 2000);
        });
      }}
    >
      <input type="hidden" name="locale" value="ja" />
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="contentType" value="MARKDOWN" />
      <TextField name="title" label={titleLabel} defaultValue={defaultTitle} />
      <p className="text-sm text-slate-600">{contentLabel}</p>
      <VditorEditor
        editorId={editorId}
        name="content"
        defaultValue={defaultContent}
        restoreTemplate={restoreTemplate}
        restoreLabel={restoreLabel}
        confirmRestore={confirmRestore}
      />
      <div className="flex items-center gap-3">
        <SubmitButton label={pending ? "..." : saveLabel} />
        {saved ? <span className="text-sm text-emerald-600">{savedLabel}</span> : null}
      </div>
    </form>
  );
}
