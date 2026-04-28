import { Locale } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { upsertCompanyInfo } from "@/lib/actions";
import { SectionCard, SubmitButton, TextField } from "@/components/forms/base";

const localeOptions = [
  { db: Locale.ja, app: "ja", label: "日本語" },
  { db: Locale.en, app: "en", label: "English" },
  { db: Locale.zh_Hant, app: "zh-Hant", label: "繁體中文" }
] as const;

export default async function CompanyPage() {
  const infos = await prisma.companyInfo.findMany();

  return (
    <SectionCard title="Company Information" description="Localized company placeholders required for legal disclosure.">
      <div className="space-y-6">
        {localeOptions.map((locale) => {
          const current = infos.find((item) => item.locale === locale.db);

          return (
            <form key={locale.db} action={upsertCompanyInfo} className="space-y-3 rounded-xl border border-slate-200 p-4">
              <input type="hidden" name="locale" value={locale.app} />
              <h3 className="text-lg font-semibold">{locale.label}</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <TextField name="companyName" label="公司名" defaultValue={current?.companyName} />
                <TextField name="representative" label="代表者" defaultValue={current?.representative} />
                <TextField name="registrationNo" label="法人番号/注册号" defaultValue={current?.registrationNo} />
                <TextField name="postalCode" label="郵便番号" defaultValue={current?.postalCode} />
                <TextField name="address" label="所在地" defaultValue={current?.address} />
                <TextField name="phone" label="電話番号" defaultValue={current?.phone} />
                <TextField name="email" label="メール" defaultValue={current?.email} />
                <TextField name="businessHours" label="営業時間" defaultValue={current?.businessHours} />
                <TextField name="supportHours" label="サポート対応時間" defaultValue={current?.supportHours} />
              </div>
              <SubmitButton label="保存" />
            </form>
          );
        })}
      </div>
    </SectionCard>
  );
}
