import { Locale } from "@prisma/client";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { upsertCompanyInfo } from "@/lib/actions";
import { SectionCard, SubmitButton, TextField } from "@/components/forms/base";
import { getMessages, type AppLocale } from "@/lib/i18n";

export default async function CompanyPage({ params }: { params?: { locale?: AppLocale } }) {
  const locale = params?.locale ?? "ja";
  const companyInfo = await prisma.companyInfo.findUnique({ where: { locale: Locale.ja } });
  const messages = getMessages(locale);
  const t = messages.admin.companyPage;
  const c = getMessages("ja").company;

  return (
    <SectionCard title={t.title} description={`${t.desc}（日本語のみ）`}>
      <div className="mb-4 flex gap-2">
        <Link href={`/${locale}/admin/company`} className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white">
          {messages.admin.company}
        </Link>
        <Link href={`/${locale}/admin/site`} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700">
          {messages.admin.siteInfo}
        </Link>
      </div>
      <form action={upsertCompanyInfo} className="space-y-3 rounded-xl border border-slate-200 p-4">
        <input type="hidden" name="locale" value="ja" />
        <div className="grid gap-3 md:grid-cols-2">
          <TextField name="companyName" label={c.fieldCompanyName} defaultValue={companyInfo?.companyName} />
          <TextField name="representative" label={c.fieldRepresentative} defaultValue={companyInfo?.representative} />
          <TextField name="registrationNo" label={c.fieldRegistrationNo} defaultValue={companyInfo?.registrationNo} />
          <TextField name="postalCode" label={c.fieldPostalCode} defaultValue={companyInfo?.postalCode} />
          <TextField name="address" label={c.fieldAddress} defaultValue={companyInfo?.address} />
          <TextField name="phone" label={c.fieldPhone} defaultValue={companyInfo?.phone} />
          <TextField name="email" label={c.fieldEmail} defaultValue={companyInfo?.email} />
          <TextField name="businessHours" label={c.fieldBusinessHours} defaultValue={companyInfo?.businessHours} />
          <TextField name="supportHours" label={c.fieldSupportHours} defaultValue={companyInfo?.supportHours} />
        </div>
        <SubmitButton label={t.saveCompany} />
      </form>
    </SectionCard>
  );
}
