import { updatePageContent } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { CheckField, SectionCard, SubmitButton, TextArea, TextField } from "@/components/forms/base";

export default async function ContentPage() {
  const page = await prisma.pageContent.findUnique({ where: { id: 1 } });

  return (
    <SectionCard title="Homepage Content" description="Edit hero copy, section headings, toggles, and SEO.">
      <form action={updatePageContent} className="space-y-3">
        <TextField name="heroTitle" label="Hero title" defaultValue={page?.heroTitle} />
        <TextArea name="heroSubtitle" label="Hero subtitle" defaultValue={page?.heroSubtitle} rows={2} />
        <div className="grid gap-3 md:grid-cols-2">
          <TextField name="heroCtaText" label="Hero CTA text" defaultValue={page?.heroCtaText} />
          <TextField name="heroCtaLink" label="Hero CTA link" defaultValue={page?.heroCtaLink} />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <TextField name="sectionFeaturedTitle" label="Featured section title" defaultValue={page?.sectionFeaturedTitle} />
          <TextField name="sectionWhyUsTitle" label="Why us section title" defaultValue={page?.sectionWhyUsTitle} />
          <TextField name="sectionBlogTitle" label="Blog section title" defaultValue={page?.sectionBlogTitle} />
          <TextField name="sectionFaqTitle" label="FAQ section title" defaultValue={page?.sectionFaqTitle} />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <CheckField name="showWhyUs" label="Show Why us section" defaultChecked={page?.showWhyUs} />
          <CheckField name="showTestimonials" label="Show testimonials section" defaultChecked={page?.showTestimonials} />
          <CheckField name="showFaq" label="Show FAQ section" defaultChecked={page?.showFaq} />
          <CheckField name="showBlog" label="Show blog section" defaultChecked={page?.showBlog} />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <TextField name="seoTitle" label="SEO title" defaultValue={page?.seoTitle} />
          <TextField name="seoDescription" label="SEO description" defaultValue={page?.seoDescription} />
        </div>
        <SubmitButton />
      </form>
    </SectionCard>
  );
}
