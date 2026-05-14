import { ContentPage } from "@/components/seo/ContentPage";

const definedTermLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "Emotionally adaptive coaching",
  description: "A coaching system that detects a user's mood, motivation, and context, then adjusts tone, language, and program intensity in real time.",
  inDefinedTermSet: "https://charmflow-vision.lovable.app/concepts",
};

export default function EmotionallyAdaptiveCoaching() {
  return (
    <ContentPage
      title="Emotionally Adaptive Coaching, Explained"
      description="Emotionally adaptive coaching detects mood, motivation, and context, then adjusts tone, intensity, and personality in real time. How VISOR implements it."
      path="/concepts/emotionally-adaptive-coaching"
      h1="Emotionally Adaptive Coaching"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Concepts", href: "/why-visor" },
        { label: "Emotionally Adaptive Coaching", href: "/concepts/emotionally-adaptive-coaching" },
      ]}
      jsonLd={definedTermLd}
      intro={<>Most fitness coaching is fixed: same voice, same intensity, same plan whether you slept four hours or feel unstoppable. Emotionally adaptive coaching changes that.</>}
      sections={[
        {
          heading: "Definition",
          body: <p>Emotionally adaptive coaching is a system that detects a user's emotional and motivational state — through check-ins, behavior signals, and context — then dynamically adjusts coaching tone, language, intensity, and program structure to match.</p>,
        },
        {
          heading: "Why it matters",
          body: <p>Adherence is the only metric that compounds. A program you abandon at week 3 returns nothing. Emotionally adaptive coaching reduces dropout by meeting you where you are: harder when you're hungry for it, gentler when you're fragile, focused on recovery when your body needs it.</p>,
        },
        {
          heading: "How VISOR implements it",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Mood and motivation detection</strong> via short daily check-ins and behavioral signals.</li>
              <li><strong>Three coach personalities:</strong> supportive, challenging, recovery-focused.</li>
              <li><strong>Real-time adjustment</strong> of program intensity, language style, and reward framing.</li>
              <li><strong>Soul Track integration</strong> so emotional state feeds identity progress, not just workout logs.</li>
            </ul>
          ),
        },
        {
          heading: "Related concepts",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li><a href="/concepts/ai-body-transformation" className="text-primary hover:underline">AI body transformation</a></li>
              <li><a href="/concepts/behavior-driven-fitness" className="text-primary hover:underline">Behavior-driven fitness</a></li>
            </ul>
          ),
        },
      ]}
    />
  );
}
