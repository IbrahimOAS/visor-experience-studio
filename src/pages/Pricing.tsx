import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Crown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/lib/visor-api";
import { getSession } from "@/lib/auth";

const plans = [
  {
    tierType: "core",
    name: "Core",
    monthly: "$12.99",
    annual: "$89.99",
    features: ["Full 12-week plan", "Unlimited tracking", "Month 3 prediction", "Unlimited coach chat"],
  },
  {
    tierType: "pro",
    name: "Pro",
    monthly: "$19.99",
    annual: "$139.99",
    features: ["AI food scanner", "Custom workout builder", "Month 6 prediction", "Community groups"],
  },
  {
    tierType: "elite",
    name: "Elite",
    monthly: "$27.99",
    annual: "$199.99",
    features: ["Olympia Mode", "Unlimited predictions", "AI nutrition generator", "7-day free trial"],
    highlighted: true,
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [loadingPlan, setLoadingPlan] = useState("");
  const [error, setError] = useState("");

  const startCheckout = async (tierType: string) => {
    if (!getSession()) {
      navigate(`/login?redirect=${encodeURIComponent("/pricing")}`);
      return;
    }

    setError("");
    setLoadingPlan(tierType);
    try {
      const { url } = await createCheckoutSession(tierType, billingPeriod);
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout");
      setLoadingPlan("");
    }
  };

  return (
    <main className="min-h-screen bg-background px-5 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between py-3">
          <Link to="/" className="font-['Space_Grotesk'] text-xl font-bold">
            VISOR
          </Link>
          <Button asChild variant="outline">
            <Link to="/account">Account</Link>
          </Button>
        </header>

        <section className="py-14 text-center">
          <h1 className="text-4xl font-bold md:text-6xl">Choose your VISOR plan</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Subscribe on the web, then sign in with the same account in the mobile app.
          </p>
          <div className="mx-auto mt-8 inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            {(["monthly", "annual"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setBillingPeriod(period)}
                className={`h-10 rounded-full px-5 text-sm capitalize transition ${
                  billingPeriod === period ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          {error && <p className="mt-5 text-sm text-destructive">{error}</p>}
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.tierType}
              className={`flex rounded-2xl p-7 ${
                plan.highlighted ? "glass-card-elite" : "glass-card-strong"
              }`}
            >
              <div className="flex w-full flex-col">
                {plan.highlighted && (
                  <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase text-primary">
                    <Crown className="h-4 w-4" />
                    Best value
                  </div>
                )}
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{billingPeriod === "monthly" ? plan.monthly : plan.annual}</span>
                  <span className="text-sm text-muted-foreground">/{billingPeriod === "monthly" ? "mo" : "yr"}</span>
                </div>
                <ul className="my-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-foreground/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button onClick={() => startCheckout(plan.tierType)} disabled={loadingPlan === plan.tierType}>
                  {loadingPlan === plan.tierType && <Loader2 className="h-4 w-4 animate-spin" />}
                  Continue to checkout
                </Button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Pricing;
