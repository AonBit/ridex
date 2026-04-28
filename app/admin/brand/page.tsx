import { updateSiteConfig } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { SectionCard, SubmitButton, TextArea, TextField } from "@/components/forms/base";
import { getMessages, type AppLocale } from "@/lib/i18n";

export default async function BrandPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const site = await prisma.siteConfig.findUnique({ where: { id: 1 } });
  const t = getMessages(locale).admin.brandPage;

  return (
    <SectionCard title={t.title} description={t.desc}>
      <form action={updateSiteConfig} className="grid gap-3 md:grid-cols-2">
        <TextField name="companyName" label={t.companyName} defaultValue={site?.companyName} required />
        <TextField name="companyTagline" label={t.tagline} defaultValue={site?.companyTagline} />
        <TextField name="contactPhone" label={t.phone} defaultValue={site?.contactPhone} />
        <TextField name="contactEmail" label={t.email} defaultValue={site?.contactEmail} type="email" />
        <TextField name="whatsapp" label={t.whatsapp} defaultValue={site?.whatsapp} />
        <TextField name="businessHours" label={t.businessHours} defaultValue={site?.businessHours} />
        <div className="md:col-span-2"><TextField name="address" label={t.address} defaultValue={site?.address} /></div>
        <div className="md:col-span-2"><TextField name="footerCopyright" label={t.footerCopyright} defaultValue={site?.footerCopyright} /></div>
        <div className="md:col-span-2"><TextArea name="legalNotice" label={t.legalNotice} defaultValue={site?.legalNotice} rows={3} /></div>
        <div className="md:col-span-2"><SubmitButton label={t.save} /></div>
      </form>
    </SectionCard>
  );
}
