import { prisma } from "@/lib/prisma";
import { SectionCard } from "@/components/forms/base";

export default async function MediaPage() {
  const assets = await prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <SectionCard title="Media Library" description="Upload files via API endpoint /api/upload then reference returned path.">
      <p className="mb-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">Current implementation stores files on local disk and writes metadata to SQLite.</p>
      <div className="space-y-2">
        {assets.map((asset) => (
          <div key={asset.id} className="rounded-lg border border-slate-200 p-3 text-sm">
            <p className="font-semibold">{asset.fileName}</p>
            <p className="text-slate-600">{asset.path} · {asset.mimeType} · {asset.size} bytes</p>
            {asset.usedBy ? <p className="text-xs text-slate-500">Used by: {asset.usedBy}</p> : null}
          </div>
        ))}
        {!assets.length && <p className="text-sm text-slate-500">No uploaded files yet.</p>}
      </div>
    </SectionCard>
  );
}
