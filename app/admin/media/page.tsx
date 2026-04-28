import { prisma } from "@/lib/prisma";
import { SectionCard } from "@/components/forms/base";
import { getMessages, type AppLocale } from "@/lib/i18n";

export default async function MediaPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const assets = await prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" } });
  const t = getMessages(locale).admin.mediaPage;

  return (
    <SectionCard title={t.title} description={t.desc}>
      <p className="mb-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">{t.hint}</p>
      <div className="space-y-2">
        {assets.map((asset) => (
          <div key={asset.id} className="rounded-lg border border-slate-200 p-3 text-sm">
            <p className="font-semibold">{asset.fileName}</p>
            <p className="text-slate-600">{asset.path} · {asset.mimeType} · {asset.size} {t.bytes}</p>
            {asset.usedBy ? <p className="text-xs text-slate-500">{t.usedBy}: {asset.usedBy}</p> : null}
          </div>
        ))}
        {!assets.length && <p className="text-sm text-slate-500">{t.empty}</p>}
      </div>
    </SectionCard>
  );
}
