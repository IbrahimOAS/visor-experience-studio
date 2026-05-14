import { ContentPage } from "@/components/seo/ContentPage";

const definedTermLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "Behavior-driven fitness",
  description: "A fitness model that optimizes for the daily identity-aligned behaviors that produce long-term outcomes, rather than for workout completion alone.",
  inDefinedTermSet: "https://charmflow-vision.lovable.app/concepts",
};

export default function BehaviorDrivenFitness() {
  return (
    <ContentPage
      title="Behavior-Driven Fitness, Explained"
      description="Behavior-driven fitness optimizes for identity-aligned daily behavior, not workout completion. How Soul Track turns consistency into a compound asset."
      path="/concepts/behavior-driven-fitness"
      h1="Behavior-Driven Fitness"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Concepts", href: "/why-visor" },
        { label: "Behavior-Driven Fitness", href: "/concepts/behavior-driven-fitness" },
      ]}
      jsonLd={definedTermLd}
      intro={<>Workouts are a lagging indicator. The leading indicator is the identity-aligned behavior that produced them. Behavior-driven fitness inverts the priority.</>}
      sections={[
        {
          heading: "Definition",
          body: <p>Behavior-driven fitness is a model that measures, rewards, and adapts to the daily behaviors tied to who a user is becoming — sleep, intentional movement, nutrition consistency, recovery — rather than counting workouts in isolation.</p>,
        },
        {
          heading: "Why workout-counting fails",
          body: <p>"30 sessions completed" is meaningless if the underlying identity didn't shift. Most users churn the moment a streak breaks because the streak was the goal, not the person behind it. Behavior-driven systems survive missed days because the identity is intact.</p>,
        },
        {
          heading: "How Soul Track applies it",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Identity prompts</strong> defined at onboarding — who you want to become, in your words.</li>
              <li><strong>Daily aligned behaviors</strong> tracked as evidence of the identity, not as tasks.</li>
              <li><strong>Streak forgiveness</strong> tied to identity rather than perfect execution.</li>
              <li><strong>AI Coach reinforcement</strong> framed in second-person identity language ("you are someone who…").</li>
            </ul>
          ),
        },
        {
          heading: "Related concepts",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li><a href="/concepts/ai-body-transformation" className="text-primary hover:underline">AI body transformation</a></li>
              <li><a href="/concepts/emotionally-adaptive-coaching" className="text-primary hover:underline">Emotionally adaptive coaching</a></li>
            </ul>
          ),
        },
      ]}
    />
  );
}
