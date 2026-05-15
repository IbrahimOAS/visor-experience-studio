import { ContentPage } from "@/components/seo/ContentPage";

export default function VsFreeletics() {
  return (
    <ContentPage
      title="VISOR vs Freeletics: Adaptive AI vs Bodyweight Workouts"
      description="Freeletics adjusts bodyweight programs with AI. VISOR adds visual body transformation previews, an emotionally adaptive coach, and Soul Track identity streaks."
      path="/vs/freeletics"
      h1="VISOR vs Freeletics"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Compare", href: "/why-visor" },
        { label: "vs Freeletics", href: "/vs/freeletics" },
      ]}
      intro={<>Freeletics pioneered AI-adjusted bodyweight training. VISOR builds on that foundation with visual transformation previews, emotional adaptivity, and identity-driven streaks.</>}
      sections={[
        {
          heading: "Core difference",
          body: <p>Freeletics optimizes the <em>workout</em>. VISOR optimizes the <em>person doing the workout</em> — what they see, how they feel, who they're becoming.</p>,
        },
        {
          heading: "Feature comparison",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Bodyweight programming:</strong> Freeletics — its strength. VISOR — included, plus weighted and gym programming.</li>
              <li><strong>AI program adaptation:</strong> Freeletics — adjusts difficulty per session. VISOR — adjusts difficulty <em>and</em> coaching tone to mood.</li>
              <li><strong>Visual body transformation:</strong> Freeletics — none. VISOR — AI previews at Month 1, Month 3, Olympia mode.</li>
              <li><strong>Emotional intelligence:</strong> Freeletics — fixed coach voice. VISOR — supportive, challenging, or recovery personalities.</li>
              <li><strong>Identity gamification:</strong> Freeletics — workout streaks. VISOR — Soul Track ties streaks to identity, not just sessions.</li>
              <li><strong>Nutrition:</strong> Both included.</li>
              <li><strong>Human coaching:</strong> Freeletics — none. VISOR — Elite tier.</li>
            </ul>
          ),
        },
        {
          heading: "When Freeletics wins",
          body: <p>You want a focused bodyweight HIIT system, you train alone, and a single coach voice works for you. Freeletics is mature and proven for that.</p>,
        },
        {
          heading: "When VISOR wins",
          body: <p>You need to <em>see</em> the outcome to commit, your motivation fluctuates, and you want training that adapts to the person — not just the protocol.</p>,
        },
      ]}
    />
  );
}
