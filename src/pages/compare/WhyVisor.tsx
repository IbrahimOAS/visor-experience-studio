import { I18nContentPage } from "@/components/seo/I18nContentPage";

export default function WhyVisor() {
  return (
    <I18nContentPage
      pageKey="whyVisor"
      path="/why-visor"
      breadcrumbTrail={[{ key: "home", href: "/" }]}
    />
  );
}
