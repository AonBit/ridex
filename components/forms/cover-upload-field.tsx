"use client";

import { useCallback, useRef, useState } from "react";
import { updateCarCover } from "@/lib/actions";
import { resolveMediaUrl } from "@/lib/media-url";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png"]);

type UploadLabels = {
  dropHint: string;
  selectHint: string;
  uploading: string;
  retry: string;
  invalidType: string;
  tooLarge: string;
  uploadFailed: string;
};

export function CoverUploadField({
  carId,
  defaultPath,
  usedBy,
  labels
}: {
  carId: string;
  defaultPath?: string | null;
  usedBy: string;
  labels: UploadLabels;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [path, setPath] = useState(defaultPath ?? "");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const uploadFile = useCallback(
    (file: File) => {
      if (!ALLOWED_TYPES.has(file.type)) {
        setError(labels.invalidType);
        return;
      }
      if (file.size > MAX_BYTES) {
        setError(labels.tooLarge);
        return;
      }

      setUploading(true);
      setProgress(0);
      setError("");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("usedBy", usedBy);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload");
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress(Math.round((event.loaded / event.total) * 100));
        }
      };
      xhr.onload = async () => {
        setUploading(false);
        try {
          const data = JSON.parse(xhr.responseText);
          if (xhr.status < 200 || xhr.status >= 300) {
            throw new Error(data.error || labels.uploadFailed);
          }
          const nextPath = data.asset.path as string;
          setPath(nextPath);
          await updateCarCover(carId, nextPath);
        } catch (uploadError) {
          setError(uploadError instanceof Error ? uploadError.message : labels.uploadFailed);
        }
      };
      xhr.onerror = () => {
        setUploading(false);
        setError(labels.uploadFailed);
      };
      xhr.send(formData);
    },
    [carId, labels, usedBy]
  );

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (file) uploadFile(file);
  }

  return (
    <div className="space-y-3 text-sm">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
        }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={`flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 transition ${
          dragOver ? "border-sky-500 bg-sky-50" : "border-slate-300 bg-slate-50 hover:border-sky-400"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />
        <p className="font-medium text-slate-700">{labels.dropHint}</p>
        <p className="mt-1 text-xs text-slate-500">{labels.selectHint}</p>
      </div>

      {uploading ? (
        <div className="space-y-1">
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full bg-sky-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-slate-500">
            {labels.uploading} {progress}%
          </p>
        </div>
      ) : null}

      {path ? (
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <img src={resolveMediaUrl(path)} alt="" className="max-h-48 w-full object-cover" />
          <p className="truncate px-2 py-1 text-xs text-slate-500">{path}</p>
        </div>
      ) : null}

      {error ? (
        <div className="space-y-2">
          <p className="text-xs text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs"
          >
            {labels.retry}
          </button>
        </div>
      ) : null}
    </div>
  );
}
