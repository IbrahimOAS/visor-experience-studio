import { ContentPage } from "@/components/seo/ContentPage";

const definedTermLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "AI body transformation",
  description: "AI-generated visual previews of a user's future body at structured time horizons, based on a starting photo, training plan, and goals.",
  inDefinedTermSet: "https://charmflow-vision.lovable.app/concepts",
};

export default function AiBodyTransformation() {
  return (
    <ContentPage
      title="AI Body Transformation, Explained"
      description="AI body transformation generates visual previews of your future body at Month 1, Month 3, and Olympia mode. The science of seeing the result before earning it."
      path="/concepts/ai-body-transformation"
      h1="AI Body Transformation"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Concepts", href: "/why-visor" },
        { label: "AI Body Transformation", href: "/concepts/ai-body-transformation" },
      ]}
      jsonLd={definedTermLd}
      intro={<>The most powerful predictor of behavior change isn't willpower — it's a vivid, believable picture of the person you're becoming. AI body transformation makes that picture visible.</>}
      sections={[
        {
          heading: "Definition",
          body: <p>AI body transformation is the use of generative AI models to produce a realistic visual progression of a user's future physique, calibrated to their starting photo, training plan, nutrition, and timeline.</p>,
        },
        {
          heading: "VISOR's three horizons",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Month 1:</strong> early visible adaptations — leaner face, posture, baseline composition shift.</li>
              <li><strong>Month 3:</strong> the inflection point — when consistent training becomes externally obvious.</li>
              <li><strong>Olympia mode:</strong> aspirational ceiling — the maximal version of you given the protocol.</li>
            </ul>
          ),
        },
        {
          heading: "Why visual prediction works",
          body: <p>Identity precedes behavior. When the brain accepts an image as plausibly future-self, daily decisions reorganize around it. Soul Track turns that anticipation into a streak loop, so each session is reinforcement of an identity already forming.</p>,
        },
        {
          heading: "Related concepts",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li><a href="/concepts/emotionally-adaptive-coaching" className="text-primary hover:underline">Emotionally adaptive coaching</a></li>
              <li><a href="/concepts/behavior-driven-fitness" className="text-primary hover:underline">Behavior-driven fitness</a></li>
            </ul>
          ),
        },
      ]}
    />
  );
}
