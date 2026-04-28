import { updatePageContent } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { CheckField, SectionCard, SubmitButton, TextArea, TextField } from "@/components/forms/base";
import { getMessages, type AppLocale } from "@/lib/i18n";

export default async function ContentPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const page = await prisma.pageContent.findUnique({ where: { id: 1 } });
  const t = getMessages(locale).admin.contentPage;

  return (
    <SectionCard title={t.title} description={t.desc}>
      <form action={updatePageContent} className="space-y-3">
        <TextField name="heroTitle" label={t.heroTitle} defaultValue={page?.heroTitle} />
        <TextArea name="heroSubtitle" label={t.heroSubtitle} defaultValue={page?.heroSubtitle} rows={2} />
        <div className="grid gap-3 md:grid-cols-2">
          <TextField name="heroCtaText" label={t.heroCtaText} defaultValue={page?.heroCtaText} />
          <TextField name="heroCtaLink" label={t.heroCtaLink} defaultValue={page?.heroCtaLink} />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <TextField name="sectionFeaturedTitle" label={t.sectionFeaturedTitle} defaultValue={page?.sectionFeaturedTitle} />
          <TextField name="sectionWhyUsTitle" label={t.sectionWhyUsTitle} defaultValue={page?.sectionWhyUsTitle} />
          <TextField name="sectionBlogTitle" label={t.sectionBlogTitle} defaultValue={page?.sectionBlogTitle} />
          <TextField name="sectionFaqTitle" label={t.sectionFaqTitle} defaultValue={page?.sectionFaqTitle} />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <CheckField name="showWhyUs" label={t.showWhyUs} defaultChecked={page?.showWhyUs} />
          <CheckField name="showTestimonials" label={t.showTestimonials} defaultChecked={page?.showTestimonials} />
          <CheckField name="showFaq" label={t.showFaq} defaultChecked={page?.showFaq} />
          <CheckField name="showBlog" label={t.showBlog} defaultChecked={page?.showBlog} />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <TextField name="seoTitle" label={t.seoTitle} defaultValue={page?.seoTitle} />
          <TextField name="seoDescription" label={t.seoDescription} defaultValue={page?.seoDescription} />
        </div>
        <SubmitButton label={t.save} />
      </form>
    </SectionCard>
  );
}
