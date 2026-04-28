import SiteInfoPage from "@/app/admin/site/page";
import type { AppLocale } from "@/lib/i18n";

export default function LocalizedAdminSitePage({ params }: { params: { locale: string } }) {
  return <SiteInfoPage params={{ locale: params.locale as AppLocale }} />;
}
