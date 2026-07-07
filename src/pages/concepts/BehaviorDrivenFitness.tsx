import { I18nContentPage } from "@/components/seo/I18nContentPage";

const definedTermLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "Behavior-driven fitness",
  description:
    "A fitness model that optimizes for the daily identity-aligned behaviors that produce long-term outcomes, rather than for workout completion alone.",
  inDefinedTermSet: "https://charmflow-vision.lovable.app/concepts",
};

export default function BehaviorDrivenFitness() {
  return (
    <I18nContentPage
      pageKey="behaviorDrivenFitness"
      path="/concepts/behavior-driven-fitness"
      breadcrumbTrail={[
        { key: "home", href: "/" },
        { key: "concepts", href: "/why-visor" },
      ]}
      jsonLd={definedTermLd}
    />
  );
}
