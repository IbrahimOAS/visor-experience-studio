import { ContentPage } from "@/components/seo/ContentPage";

export default function VsNoom() {
  return (
    <ContentPage
      title="VISOR vs Noom: Identity-Driven AI vs Psychology-Based Weight Loss"
      description="Noom uses CBT-style behavior change for weight loss. VISOR uses AI body transformation previews, an emotionally adaptive coach, and identity streaks."
      path="/vs/noom"
      h1="VISOR vs Noom"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Compare", href: "/why-visor" },
        { label: "vs Noom", href: "/vs/noom" },
      ]}
      intro={<>Noom built a category around psychology-led weight loss. VISOR shares the conviction that behavior matters more than calories, but takes an identity-first, AI-native approach.</>}
      sections={[
        {
          heading: "Core difference",
          body: <p>Noom teaches you <em>why</em> you eat what you eat. VISOR shows you <em>who</em> you're becoming and adapts every interaction to that identity.</p>,
        },
        {
          heading: "Feature comparison",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Behavior change model:</strong> Noom — CBT-style daily lessons. VISOR — identity-based via Soul Track.</li>
              <li><strong>AI body transformation:</strong> Noom — none. VISOR — Month 1, Month 3, Olympia previews.</li>
              <li><strong>Coaching:</strong> Noom — human coaches via chat. VISOR — emotionally adaptive AI coach + optional human coaching on Elite.</li>
              <li><strong>Workout programming:</strong> Noom — light. VISOR — full personalized plans.</li>
              <li><strong>Color-coded food system:</strong> Noom's signature feature. VISOR uses standard macro tracking.</li>
              <li><strong>Pricing:</strong> Noom — ~$70/mo. VISOR — Free / $9.99 / $19.99.</li>
            </ul>
          ),
        },
        {
          heading: "When Noom wins",
          body: <p>You want daily reading-based behavior lessons and a human coach as your primary contact, and the higher price isn't a blocker.</p>,
        },
        {
          heading: "When VISOR wins",
          body: <p>You want visual proof of your trajectory, an AI coach available 24/7 that adapts to mood, and a fitness layer Noom doesn't deliver — at a fraction of the price.</p>,
        },
      ]}
    />
  );
}
