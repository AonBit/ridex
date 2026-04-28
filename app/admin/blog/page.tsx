import { createBlogPost } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { CheckField, SectionCard, SubmitButton, TextArea, TextField } from "@/components/forms/base";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div className="space-y-4">
      <SectionCard title="Blog Management" description="Optional content operation module.">
        <form action={createBlogPost} className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <TextField name="title" label="Title" required />
            <TextField name="coverPath" label="Cover image path" />
          </div>
          <TextArea name="excerpt" label="Excerpt" rows={2} />
          <TextArea name="body" label="Body" rows={6} />
          <CheckField name="isPublished" label="Published" defaultChecked />
          <SubmitButton label="Create post" />
        </form>
      </SectionCard>

      <SectionCard title="Existing Posts">
        <div className="space-y-2">
          {posts.map((post) => (
            <div key={post.id} className="rounded-lg border border-slate-200 p-3 text-sm">
              <p className="font-semibold">{post.title}</p>
              <p className="text-slate-600">{post.excerpt}</p>
            </div>
          ))}
          {!posts.length && <p className="text-sm text-slate-500">No blog posts yet.</p>}
        </div>
      </SectionCard>
    </div>
  );
}
