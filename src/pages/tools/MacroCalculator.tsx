import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SeoHead } from "@/components/seo/SeoHead";

type Sex = "male" | "female";
type Activity = "sedentary" | "light" | "moderate" | "active" | "athlete";
type Goal = "cut" | "maintain" | "bulk";
type Units = "metric" | "imperial";

const ACTIVITY_FACTOR: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  athlete: 1.9,
};

const GOAL_DELTA: Record<Goal, number> = {
  cut: -0.2,
  maintain: 0,
  bulk: 0.15,
};

const ACTIVITY_LABELS: Record<Activity, string> = {
  sedentary: "Sedentary (desk job, no exercise)",
  light: "Lightly active (1–3 days/week)",
  moderate: "Moderately active (3–5 days/week)",
  active: "Very active (6–7 days/week)",
  athlete: "Athlete (2x/day or physical job)",
};

const GOAL_LABELS: Record<Goal, string> = {
  cut: "Lose fat (cut)",
  maintain: "Maintain",
  bulk: "Build muscle (lean bulk)",
};

export default function MacroCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState(28);
  const [weight, setWeight] = useState(75); // kg or lb
  const [height, setHeight] = useState(178); // cm or in
  const [activity, setActivity] = useState<Activity>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");

  const result = useMemo(() => {
    const weightKg = units === "metric" ? weight : weight * 0.453592;
    const heightCm = units === "metric" ? height : height * 2.54;

    // Mifflin–St Jeor
    const bmr =
      10 * weightKg + 6.25 * heightCm - 5 * age + (sex === "male" ? 5 : -161);
    const tdee = bmr * ACTIVITY_FACTOR[activity];
    const calories = tdee * (1 + GOAL_DELTA[goal]);

    // Macro split: protein 2.0 g/kg (cut 2.2, bulk 1.8), fat 25% of kcal, carbs remainder
    const proteinPerKg = goal === "cut" ? 2.2 : goal === "bulk" ? 1.8 : 2.0;
    const proteinG = Math.round(weightKg * proteinPerKg);
    const fatG = Math.round((calories * 0.25) / 9);
    const carbsG = Math.max(
      0,
      Math.round((calories - proteinG * 4 - fatG * 9) / 4),
    );

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories: Math.round(calories),
      proteinG,
      fatG,
      carbsG,
    };
  }, [units, sex, age, weight, height, activity, goal]);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the AI macro and calorie calculator work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VISOR's calculator uses the Mifflin–St Jeor BMR equation, applies your activity factor to estimate TDEE, and adjusts calories for your goal (cut, maintain, or lean bulk). Macros default to ~2 g/kg protein, 25% of calories from fat, and the remainder from carbs.",
        },
      },
      {
        "@type": "Question",
        name: "How many calories should I eat to lose fat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For sustainable fat loss, most people do best at roughly 20% below maintenance calories (TDEE). VISOR pairs that with higher protein (around 2.2 g/kg) to preserve muscle while you cut.",
        },
      },
      {
        "@type": "Question",
        name: "What's the right macro split for building muscle?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A lean-bulk surplus of about 10–15% above maintenance with protein near 1.8 g/kg, fats around 25% of calories, and carbs filling the remainder gives most lifters the energy to train hard without unnecessary fat gain.",
        },
      },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://visorfitness.com/" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://visorfitness.com/tools/macro-calculator" },
      { "@type": "ListItem", position: 3, name: "Macro & Calorie Calculator", item: "https://visorfitness.com/tools/macro-calculator" },
    ],
  };

  return (
    <>
      <SeoHead
        title="AI Macro & Calorie Calculator | VISOR"
        description="Free AI-powered calorie and macro calculator. Get your daily calories, protein, carbs, and fat for fat loss, maintenance, or lean bulk in seconds."
        path="/tools/macro-calculator"
        jsonLd={[breadcrumbLd, faqLd]}
      />
      <main className="bg-background text-foreground overflow-x-hidden min-h-screen">
        <Navbar />
        <article className="max-w-4xl mx-auto px-6 pt-32 pb-24">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap gap-2">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li>/</li>
              <li><span className="text-foreground/80">Tools</span></li>
              <li>/</li>
              <li><span className="text-foreground/80">Macro & Calorie Calculator</span></li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-6xl font-bold font-['Space_Grotesk'] mb-4 leading-tight">
            AI Macro & Calorie Calculator
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            Calculate your daily calories, protein, carbs, and fat in seconds.
            Powered by the Mifflin–St Jeor equation and calibrated to your goal —
            fat loss, maintenance, or lean bulk — the way VISOR's AI coach plans nutrition.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Inputs */}
            <section className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
              <h2 className="text-2xl font-bold font-['Space_Grotesk']">Your stats</h2>

              <div className="flex gap-2">
                {(["metric", "imperial"] as Units[]).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnits(u)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      units === u ? "bg-primary text-primary-foreground" : "glass-card hover:bg-primary/10"
                    }`}
                  >
                    {u === "metric" ? "Metric (kg/cm)" : "Imperial (lb/in)"}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                {(["male", "female"] as Sex[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSex(s)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                      sex === s ? "bg-primary text-primary-foreground" : "glass-card hover:bg-primary/10"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <Field label="Age (years)">
                <input
                  type="number" min={14} max={100} value={age}
                  onChange={(e) => setAge(Number(e.target.value) || 0)}
                  className="calc-input"
                />
              </Field>
              <Field label={`Weight (${units === "metric" ? "kg" : "lb"})`}>
                <input
                  type="number" min={30} max={400} value={weight}
                  onChange={(e) => setWeight(Number(e.target.value) || 0)}
                  className="calc-input"
                />
              </Field>
              <Field label={`Height (${units === "metric" ? "cm" : "in"})`}>
                <input
                  type="number" min={48} max={250} value={height}
                  onChange={(e) => setHeight(Number(e.target.value) || 0)}
                  className="calc-input"
                />
              </Field>

              <Field label="Activity level">
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value as Activity)}
                  className="calc-input"
                >
                  {(Object.keys(ACTIVITY_LABELS) as Activity[]).map((a) => (
                    <option key={a} value={a}>{ACTIVITY_LABELS[a]}</option>
                  ))}
                </select>
              </Field>

              <Field label="Goal">
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(GOAL_LABELS) as Goal[]).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGoal(g)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        goal === g ? "bg-primary text-primary-foreground" : "glass-card hover:bg-primary/10"
                      }`}
                    >
                      {GOAL_LABELS[g]}
                    </button>
                  ))}
                </div>
              </Field>
            </section>

            {/* Results */}
            <section className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
              <h2 className="text-2xl font-bold font-['Space_Grotesk']">Your plan</h2>
              <div>
                <div className="text-sm text-muted-foreground">Daily calories</div>
                <div className="text-5xl font-bold text-gradient">{result.calories.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  BMR {result.bmr} · TDEE {result.tdee} kcal
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Macro label="Protein" value={result.proteinG} accent="from-primary/30 to-primary/5" />
                <Macro label="Carbs" value={result.carbsG} accent="from-primary/20 to-primary/5" />
                <Macro label="Fat" value={result.fatG} accent="from-primary/15 to-primary/5" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                These targets are a starting point. VISOR's AI coach refines them weekly
                based on your training load, recovery, and how your body is actually responding —
                so the plan compounds instead of plateauing.
              </p>

              <Link
                to="/"
                className="inline-block w-full text-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
              >
                Get the full AI plan in VISOR
              </Link>
            </section>
          </div>

          {/* SEO long-tail content */}
          <section className="mt-16 space-y-10">
            <div>
              <h2 className="text-3xl font-bold font-['Space_Grotesk'] mb-4">
                How the calorie calculator works
              </h2>
              <p className="text-foreground/85 leading-relaxed">
                VISOR's calorie calculator uses the Mifflin–St Jeor equation — the most
                accurate BMR formula for adults — then multiplies your basal metabolic
                rate by an activity factor to estimate your Total Daily Energy
                Expenditure (TDEE). Your goal adjusts the final target: roughly a 20%
                deficit for fat loss, maintenance at TDEE, or a 10–15% surplus for a
                lean bulk.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold font-['Space_Grotesk'] mb-4">
                How macros are split
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-foreground/85 leading-relaxed">
                <li><strong>Protein:</strong> ~2 g per kg of body weight (2.2 g/kg on a cut, 1.8 g/kg on a bulk) to preserve and grow lean mass.</li>
                <li><strong>Fat:</strong> 25% of total calories — enough for hormonal health without crowding out training fuel.</li>
                <li><strong>Carbs:</strong> the remainder — your primary fuel for hard training sessions.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold font-['Space_Grotesk'] mb-4">
                Why pair a macro calculator with an AI coach
              </h2>
              <p className="text-foreground/85 leading-relaxed">
                A static macro target is a starting line, not a plan. Your real numbers
                shift with sleep, stress, training volume, and weekly weight trend.
                VISOR's AI coach recalibrates calories and macros automatically as your
                data comes in, so the plan keeps working when the simple formula stops.
              </p>
            </div>
          </section>
        </article>
        <Footer />
      </main>
    </>
  );
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="text-sm text-muted-foreground mb-1.5 block">{label}</span>
    {children}
  </label>
);

const Macro = ({ label, value, accent }: { label: string; value: number; accent: string }) => (
  <div className={`rounded-xl p-4 bg-gradient-to-br ${accent} border border-primary/10`}>
    <div className="text-xs text-muted-foreground">{label}</div>
    <div className="text-2xl font-bold">{value}<span className="text-sm font-normal text-muted-foreground"> g</span></div>
  </div>
);
