import { I18nContentPage } from "@/components/seo/I18nContentPage";

export default function VsFreeletics() {
  return (
    <I18nContentPage
      pageKey="vsFreeletics"
      path="/vs/freeletics"
      breadcrumbTrail={[
        { key: "home", href: "/" },
        { key: "compare", href: "/why-visor" },
      ]}
    />
  );
}
