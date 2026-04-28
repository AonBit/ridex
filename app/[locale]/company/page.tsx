import { notFound } from "next/navigation";
import { Locale } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getMessages, isSupportedLocale } from "@/lib/i18n";

function toDbLocale(locale: string): Locale {
  if (locale === "zh-Hant") return Locale.zh_Hant;
  if (locale === "en") return Locale.en;
  return Locale.ja;
}

export default async function CompanyInfoPage({ params }: { params: { locale: string } }) {
  if (!isSupportedLocale(params.locale)) notFound();
  const companyInfo = await prisma.companyInfo.findUnique({ where: { locale: toDbLocale(params.locale) } });
  if (!companyInfo) notFound();

  const legalMessages = getMessages(params.locale).legal;

  return (
    <main className="container py-24">
      <h1 className="mb-6 text-3xl font-bold">{legalMessages.company}</h1>
      <dl className="grid gap-4 rounded-xl bg-white p-6 shadow md:grid-cols-2">
        <div><dt className="text-sm text-slate-500">会社名</dt><dd>{companyInfo.companyName}</dd></div>
        <div><dt className="text-sm text-slate-500">代表者</dt><dd>{companyInfo.representative}</dd></div>
        <div><dt className="text-sm text-slate-500">登録番号</dt><dd>{companyInfo.registrationNo}</dd></div>
        <div><dt className="text-sm text-slate-500">郵便番号</dt><dd>{companyInfo.postalCode}</dd></div>
        <div className="md:col-span-2"><dt className="text-sm text-slate-500">所在地</dt><dd>{companyInfo.address}</dd></div>
        <div><dt className="text-sm text-slate-500">電話番号</dt><dd>{companyInfo.phone}</dd></div>
        <div><dt className="text-sm text-slate-500">メール</dt><dd>{companyInfo.email}</dd></div>
        <div><dt className="text-sm text-slate-500">営業時間</dt><dd>{companyInfo.businessHours}</dd></div>
        <div><dt className="text-sm text-slate-500">サポート対応時間</dt><dd>{companyInfo.supportHours}</dd></div>
      </dl>
    </main>
  );
}
