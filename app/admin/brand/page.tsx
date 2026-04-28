import { updateSiteConfig } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { SectionCard, SubmitButton, TextArea, TextField } from "@/components/forms/base";

export default async function BrandPage() {
  const site = await prisma.siteConfig.findUnique({ where: { id: 1 } });

  return (
    <SectionCard title="Brand Settings" description="Manage company identity and contact details.">
      <form action={updateSiteConfig} className="grid gap-3 md:grid-cols-2">
        <TextField name="companyName" label="Company name" defaultValue={site?.companyName} required />
        <TextField name="companyTagline" label="Tagline" defaultValue={site?.companyTagline} />
        <TextField name="contactPhone" label="Phone" defaultValue={site?.contactPhone} />
        <TextField name="contactEmail" label="Email" defaultValue={site?.contactEmail} type="email" />
        <TextField name="whatsapp" label="WhatsApp / WeChat" defaultValue={site?.whatsapp} />
        <TextField name="businessHours" label="Business hours" defaultValue={site?.businessHours} />
        <div className="md:col-span-2">
          <TextField name="address" label="Address" defaultValue={site?.address} />
        </div>
        <div className="md:col-span-2">
          <TextField name="footerCopyright" label="Footer copyright" defaultValue={site?.footerCopyright} />
        </div>
        <div className="md:col-span-2">
          <TextArea name="legalNotice" label="Legal notice / filing info" defaultValue={site?.legalNotice} rows={3} />
        </div>
        <div className="md:col-span-2">
          <SubmitButton />
        </div>
      </form>
    </SectionCard>
  );
}
