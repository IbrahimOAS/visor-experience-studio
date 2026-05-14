import { ContentPage } from "@/components/seo/ContentPage";

export default function WhyVisor() {
  return (
    <ContentPage
      title="Why VISOR: The Identity-Driven AI Fitness Platform"
      description="VISOR is the AI fitness app that predicts your future body, coaches you emotionally, and gamifies the identity behind the goal. Here's why that matters."
      path="/why-visor"
      h1="Why VISOR"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Why VISOR", href: "/why-visor" },
      ]}
      intro={<>Most fitness apps fail at the same wall: consistency. VISOR is built around the insight that people don't quit because they lack workouts — they quit because they can't see their future self.</>}
      sections={[
        {
          heading: "The three pillars",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>AI Body Transformation:</strong> visual proof of your trajectory at Month 1, Month 3, and Olympia mode.</li>
              <li><strong>VISOR AI Coach:</strong> emotionally adaptive — supportive, challenging, or recovery-focused, depending on the day.</li>
              <li><strong>Soul Track:</strong> gamified streaks tied to the identity you're building, not just workouts logged.</li>
            </ul>
          ),
        },
        {
          heading: "Compare VISOR",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li><a href="/vs/myfitnesspal" className="text-primary hover:underline">VISOR vs MyFitnessPal</a> — identity vs calorie tracking</li>
              <li><a href="/vs/freeletics" className="text-primary hover:underline">VISOR vs Freeletics</a> — emotional adaptivity vs program adaptation</li>
              <li><a href="/vs/noom" className="text-primary hover:underline">VISOR vs Noom</a> — AI identity vs CBT psychology</li>
            </ul>
          ),
        },
        {
          heading: "Concepts behind VISOR",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li><a href="/concepts/emotionally-adaptive-coaching" className="text-primary hover:underline">Emotionally adaptive coaching</a></li>
              <li><a href="/concepts/ai-body-transformation" className="text-primary hover:underline">AI body transformation</a></li>
              <li><a href="/concepts/behavior-driven-fitness" className="text-primary hover:underline">Behavior-driven fitness</a></li>
            </ul>
          ),
        },
      ]}
    />
  );
}
