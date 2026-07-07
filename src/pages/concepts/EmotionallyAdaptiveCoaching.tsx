import { I18nContentPage } from "@/components/seo/I18nContentPage";

const definedTermLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "Emotionally adaptive coaching",
  description:
    "A coaching system that detects a user's mood, motivation, and context, then adjusts tone, language, and program intensity in real time.",
  inDefinedTermSet: "https://charmflow-vision.lovable.app/concepts",
};

export default function EmotionallyAdaptiveCoaching() {
  return (
    <I18nContentPage
      pageKey="emotionallyAdaptiveCoaching"
      path="/concepts/emotionally-adaptive-coaching"
      breadcrumbTrail={[
        { key: "home", href: "/" },
        { key: "concepts", href: "/why-visor" },
      ]}
      jsonLd={definedTermLd}
    />
  );
}
