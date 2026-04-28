import { notFound } from "next/navigation";
import { Locale } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getMessages, isSupportedLocale } from "@/lib/i18n";

export default async function CompanyInfoPage({ params }: { params: { locale: string } }) {
  if (!isSupportedLocale(params.locale)) notFound();
  const companyInfo = await prisma.companyInfo.findUnique({ where: { locale: Locale.ja } });
  if (!companyInfo) notFound();

  const messages = getMessages(params.locale);

  return (
    <main className="container py-24">
      <h1 className="mb-6 text-3xl font-bold">{messages.legal.company}</h1>
      <dl className="grid gap-4 rounded-xl bg-white p-6 shadow md:grid-cols-2">
        <div><dt className="text-sm text-slate-500">{messages.company.fieldCompanyName}</dt><dd>{companyInfo.companyName}</dd></div>
        <div><dt className="text-sm text-slate-500">{messages.company.fieldRepresentative}</dt><dd>{companyInfo.representative}</dd></div>
        <div><dt className="text-sm text-slate-500">{messages.company.fieldRegistrationNo}</dt><dd>{companyInfo.registrationNo}</dd></div>
        <div><dt className="text-sm text-slate-500">{messages.company.fieldPostalCode}</dt><dd>{companyInfo.postalCode}</dd></div>
        <div className="md:col-span-2"><dt className="text-sm text-slate-500">{messages.company.fieldAddress}</dt><dd>{companyInfo.address}</dd></div>
        <div><dt className="text-sm text-slate-500">{messages.company.fieldPhone}</dt><dd>{companyInfo.phone}</dd></div>
        <div><dt className="text-sm text-slate-500">{messages.company.fieldEmail}</dt><dd>{companyInfo.email}</dd></div>
        <div><dt className="text-sm text-slate-500">{messages.company.fieldBusinessHours}</dt><dd>{companyInfo.businessHours}</dd></div>
        <div><dt className="text-sm text-slate-500">{messages.company.fieldSupportHours}</dt><dd>{companyInfo.supportHours}</dd></div>
      </dl>
    </main>
  );
}
