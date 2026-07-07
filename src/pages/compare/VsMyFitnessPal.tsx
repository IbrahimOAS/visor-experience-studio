import { I18nContentPage } from "@/components/seo/I18nContentPage";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is VISOR better than MyFitnessPal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VISOR and MyFitnessPal solve different problems. MyFitnessPal is a calorie and macro logger. VISOR is an identity-driven AI fitness platform that predicts your future body, coaches you emotionally, and gamifies the daily behaviors of who you want to become.",
      },
    },
    {
      "@type": "Question",
      name: "Does VISOR track calories like MyFitnessPal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. VISOR includes personalized nutrition plans and tracking, but treats calories as one input rather than the product itself.",
      },
    },
  ],
};

export default function VsMyFitnessPal() {
  return (
    <I18nContentPage
      pageKey="vsMyFitnessPal"
      path="/vs/myfitnesspal"
      breadcrumbTrail={[
        { key: "home", href: "/" },
        { key: "compare", href: "/why-visor" },
      ]}
      jsonLd={faqLd}
    />
  );
}
