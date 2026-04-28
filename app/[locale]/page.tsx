import { notFound } from "next/navigation";
import { getPublicData } from "@/lib/data";
import { PublicHome } from "@/components/site/public-home";
import { ThemeInjector } from "@/components/site/theme-injector";
import { isSupportedLocale } from "@/lib/i18n";

export default async function LocalizedPage({ params }: { params: { locale: string } }) {
  if (!isSupportedLocale(params.locale)) notFound();

  const data = await getPublicData(params.locale);

  return (
    <>
      <ThemeInjector theme={data.theme} />
      <PublicHome data={data} locale={params.locale} />
    </>
  );
}
