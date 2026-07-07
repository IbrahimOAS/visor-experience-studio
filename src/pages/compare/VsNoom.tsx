import { I18nContentPage } from "@/components/seo/I18nContentPage";

export default function VsNoom() {
  return (
    <I18nContentPage
      pageKey="vsNoom"
      path="/vs/noom"
      breadcrumbTrail={[
        { key: "home", href: "/" },
        { key: "compare", href: "/why-visor" },
      ]}
    />
  );
}
