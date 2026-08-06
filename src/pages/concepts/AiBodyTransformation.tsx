import { I18nContentPage } from "@/components/seo/I18nContentPage";
import { AiTransformationDisclaimer } from "@/components/legal/CompanyLegalInfo";

const definedTermLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "AI body transformation",
  description:
    "AI-generated visual previews of a user's future body at structured time horizons, based on a starting photo, training plan, and goals.",
  inDefinedTermSet: "https://charmflow-vision.lovable.app/concepts",
};

export default function AiBodyTransformation() {
  return (
    <I18nContentPage
      pageKey="aiBodyTransformation"
      path="/concepts/ai-body-transformation"
      breadcrumbTrail={[
        { key: "home", href: "/" },
        { key: "concepts", href: "/why-visor" },
      ]}
      jsonLd={definedTermLd}
      afterSections={<AiTransformationDisclaimer className="mt-12" />}
    />
  );
}
