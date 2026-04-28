import { LegalContentType, Locale } from "@prisma/client";
import { marked } from "marked";
import { prisma } from "@/lib/prisma";
import { upsertLegalPage } from "@/lib/actions";
import { SectionCard, SubmitButton, TextArea, TextField } from "@/components/forms/base";

const localeOptions = [
  { db: Locale.ja, app: "ja", label: "日本語" },
  { db: Locale.en, app: "en", label: "English" },
  { db: Locale.zh_Hant, app: "zh-Hant", label: "繁體中文" }
] as const;

const legalSlugs = [
  { slug: "tokushoho", title: "特定商取引法に基づく表記", contentType: LegalContentType.TEXT },
  { slug: "privacy", title: "個人情報とプライバシー規約", contentType: LegalContentType.TEXT },
  { slug: "anti-social-policy", title: "反社会的勢力に対する基本方針", contentType: LegalContentType.TEXT },
  { slug: "rental-terms", title: "レンタカー貸渡約款", contentType: LegalContentType.MARKDOWN }
] as const;

export default async function LegalPage() {
  const legalPages = await prisma.legalPage.findMany();

  return (
    <SectionCard title="Legal Content" description="Manage legal pages by language. Rental terms supports markdown.">
      <div className="space-y-8">
        {localeOptions.map((locale) => (
          <div key={locale.db} className="rounded-xl border border-slate-200 p-4">
            <h3 className="mb-3 text-lg font-semibold">{locale.label}</h3>
            <div className="space-y-4">
              {legalSlugs.map((entry) => {
                const current = legalPages.find((item) => item.locale === locale.db && item.slug === entry.slug);
                return (
                  <form key={`${locale.db}-${entry.slug}`} action={upsertLegalPage} className="space-y-2 rounded-lg border border-slate-100 p-3">
                    <input type="hidden" name="locale" value={locale.app} />
                    <input type="hidden" name="slug" value={entry.slug} />
                    <input type="hidden" name="contentType" value={entry.contentType} />
                    <TextField name="title" label={`${entry.title} 标题`} defaultValue={current?.title ?? entry.title} />
                    <TextArea
                      name="content"
                      label={entry.contentType === LegalContentType.MARKDOWN ? "Markdown 内容" : "内容"}
                      defaultValue={current?.content ?? ""}
                      rows={entry.contentType === LegalContentType.MARKDOWN ? 12 : 6}
                    />
                    {entry.contentType === LegalContentType.MARKDOWN && current?.content ? (
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <p className="mb-2 text-xs text-slate-500">预览</p>
                        <div dangerouslySetInnerHTML={{ __html: marked.parse(current.content) }} />
                      </div>
                    ) : null}
                    <SubmitButton label="保存" />
                  </form>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
