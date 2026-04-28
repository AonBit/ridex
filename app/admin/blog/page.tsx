import { createBlogPost } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { CheckField, SectionCard, SubmitButton, TextArea, TextField } from "@/components/forms/base";
import { getMessages, type AppLocale } from "@/lib/i18n";

export default async function BlogPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
  const t = getMessages(locale).admin.blogPage;

  return (
    <div className="space-y-4">
      <SectionCard title={t.title} description={t.desc}>
        <form action={createBlogPost} className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <TextField name="title" label={t.postTitle} required />
            <TextField name="coverPath" label={t.coverPath} />
          </div>
          <TextArea name="excerpt" label={t.excerpt} rows={2} />
          <TextArea name="body" label={t.body} rows={6} />
          <CheckField name="isPublished" label={t.published} defaultChecked />
          <SubmitButton label={t.create} />
        </form>
      </SectionCard>

      <SectionCard title={t.existing}>
        <div className="space-y-2">
          {posts.map((post) => (
            <div key={post.id} className="rounded-lg border border-slate-200 p-3 text-sm">
              <p className="font-semibold">{post.title}</p>
              <p className="text-slate-600">{post.excerpt}</p>
            </div>
          ))}
          {!posts.length && <p className="text-sm text-slate-500">{t.empty}</p>}
        </div>
      </SectionCard>
    </div>
  );
}
