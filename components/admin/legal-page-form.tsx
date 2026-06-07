"use client";

import { upsertLegalPage } from "@/lib/actions";
import { syncVditorForm, VditorEditor } from "@/components/forms/vditor-editor";
import { SubmitButton, TextField } from "@/components/forms/base";

type VditorMode = "wysiwyg" | "sv";

export function LegalPageForm({
  slug,
  contentType,
  titleLabel,
  contentLabel,
  defaultTitle,
  defaultContent,
  saveLabel,
  mode,
  restoreTemplate,
  restoreLabel,
  confirmRestore
}: {
  slug: string;
  contentType: string;
  titleLabel: string;
  contentLabel: string;
  defaultTitle: string;
  defaultContent: string;
  saveLabel: string;
  mode: VditorMode;
  restoreTemplate?: string;
  restoreLabel?: string;
  confirmRestore?: string;
}) {
  const editorId = `legal-editor-${slug}`;

  return (
    <form
      action={upsertLegalPage}
      className="space-y-2 rounded-lg border border-slate-100 p-3"
      onSubmit={(event) => {
        syncVditorForm(event.currentTarget);
      }}
    >
      <input type="hidden" name="locale" value="ja" />
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="contentType" value={contentType} />
      <TextField name="title" label={titleLabel} defaultValue={defaultTitle} />
      <p className="text-sm text-slate-600">{contentLabel}</p>
      <VditorEditor
        editorId={editorId}
        name="content"
        mode={mode}
        defaultValue={defaultContent}
        restoreTemplate={restoreTemplate}
        restoreLabel={restoreLabel}
        confirmRestore={confirmRestore}
      />
      <SubmitButton label={saveLabel} />
    </form>
  );
}
