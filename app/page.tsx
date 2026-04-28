import { getPublicData } from "@/lib/data";
import { PublicHome } from "@/components/site/public-home";
import { ThemeInjector } from "@/components/site/theme-injector";

export default async function Page() {
  const data = await getPublicData();

  return (
    <>
      <ThemeInjector theme={data.theme} />
      <PublicHome data={data} />
    </>
  );
}
