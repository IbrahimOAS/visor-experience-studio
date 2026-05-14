import { ContentPage } from "@/components/seo/ContentPage";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is VISOR better than MyFitnessPal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VISOR and MyFitnessPal solve different problems. MyFitnessPal is a calorie and macro logger. VISOR is an identity-driven AI fitness platform that predicts your future body, coaches you emotionally, and gamifies the daily behaviors of who you want to become. If your goal is logging food, MyFitnessPal is sufficient. If your goal is becoming the person behind the body, VISOR is built for that.",
      },
    },
    {
      "@type": "Question",
      name: "Does VISOR track calories like MyFitnessPal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. VISOR includes personalized nutrition plans and tracking, but treats calories as one input rather than the product itself. The center of VISOR is the AI Coach and Soul Track identity system.",
      },
    },
  ],
};

export default function VsMyFitnessPal() {
  return (
    <ContentPage
      title="VISOR vs MyFitnessPal: AI Body Transformation vs Calorie Tracking"
      description="MyFitnessPal logs calories. VISOR predicts your future body, coaches you emotionally, and gamifies identity through Soul Track. Honest comparison."
      path="/vs/myfitnesspal"
      h1="VISOR vs MyFitnessPal"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Compare", href: "/why-visor" },
        { label: "vs MyFitnessPal", href: "/vs/myfitnesspal" },
      ]}
      jsonLd={faqLd}
      intro={
        <>
          MyFitnessPal is the default calorie tracker for over 200M users. VISOR is a newer category:
          identity-driven AI fitness. Both can live on your phone — they answer different questions.
        </>
      }
      sections={[
        {
          heading: "Core difference in one sentence",
          body: (
            <p>
              MyFitnessPal answers <em>"what did I eat?"</em>. VISOR answers <em>"who am I becoming, and how does today move me there?"</em>
            </p>
          ),
        },
        {
          heading: "Feature-by-feature",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Calorie & macro tracking:</strong> MyFitnessPal — extensive food database. VISOR — included, AI-personalized.</li>
              <li><strong>AI body transformation previews:</strong> MyFitnessPal — none. VISOR — Month 1, Month 3, Olympia mode.</li>
              <li><strong>Emotionally adaptive AI coach:</strong> MyFitnessPal — none. VISOR — adjusts tone, intensity, and personality to your mood.</li>
              <li><strong>Identity / streak gamification:</strong> MyFitnessPal — basic streaks. VISOR — Soul Track ties streaks to who you want to become.</li>
              <li><strong>Workout programming:</strong> MyFitnessPal — limited. VISOR — full personalized plans.</li>
              <li><strong>Human coaching:</strong> MyFitnessPal — none. VISOR — Elite tier.</li>
            </ul>
          ),
        },
        {
          heading: "When MyFitnessPal is the right choice",
          body: <p>You already know your routine, you already train consistently, and you only need a fast database to log meals. MyFitnessPal is the proven, free-tier-friendly logger for that job.</p>,
        },
        {
          heading: "When VISOR is the right choice",
          body: <p>You don't quit because you lack workouts — you quit because you can't see your future self. VISOR is built for the consistency problem: visualize the result, adapt to how you feel, build the identity behind the body.</p>,
        },
        {
          heading: "Pricing",
          body: <p>MyFitnessPal: free with Premium at ~$19.99/mo. VISOR: free tier, Core at $9.99/mo, Elite at $19.99/mo with personal coaching.</p>,
        },
      ]}
    />
  );
}
