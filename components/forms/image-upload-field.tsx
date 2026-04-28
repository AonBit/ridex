"use client";

import { useRef, useState } from "react";

export function ImageUploadField({
  name,
  label,
  defaultValue,
  usedBy
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  usedBy: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [path, setPath] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("usedBy", usedBy);
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }
      setPath(data.asset.path);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2 text-sm">
      <span className="mb-1 block text-slate-600">{label}</span>
      <input type="hidden" name={name} value={path} />
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          className="block w-full max-w-sm border-0 border-b-2 border-slate-300 bg-transparent px-1 py-2 outline-none transition focus:border-sky-500"
        />
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload image"}
        </button>
      </div>
      {path ? <p className="rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-500">{path}</p> : null}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
