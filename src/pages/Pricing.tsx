import { useState } from "react";
import { useCurrency, formatPrice } from "@/hooks/useCurrency";
import { Link, useNavigate } from "react-router-dom";
import { Check, Crown, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/lib/visor-api";
import { getSession } from "@/lib/auth";
import { SignInDialog } from "@/components/SignInDialog";
import { EliteCoachesDialog } from "@/components/EliteCoachesDialog";
import KineticGrid from "@/components/ui/kinetic-grid";
import { GlassNavbar } from "@/visor/components/GlassNavbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/visor/i18n";

const plans = [
  {
    tierType: "core",
    name: "Core",
    monthly: 19.90,
    annual: 139.90,
    features: ["Full 12-week plan", "Unlimited tracking", "Month 3 prediction", "Unlimited coach chat"],
  },
  {
    tierType: "pro",
    name: "Pro",
    monthly: 29.90,
    annual: 199.90,
    features: ["AI food scanner", "Custom workout builder", "Month 6 prediction", "Community groups"],
  },
  {
    tierType: "elite",
    name: "Elite",
    monthly: 44.90,
    annual: 299.90,
    features: ["Olympia Mode", "Unlimited predictions", "AI nutrition generator", "7-day free trial"],
    highlighted: true,
  },
];

const PricingPage = () => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [loadingPlan, setLoadingPlan] = useState("");
  const [error, setError] = useState("");
  const { currency } = useCurrency();
  const [accountOpen, setAccountOpen] = useState(false);
  const [pendingPlan, setPendingPlan] = useState("");
  const [eliteCoachesOpen, setEliteCoachesOpen] = useState(false);

  const startCheckout = async (tierType: string) => {
    if (!getSession()) {
      setPendingPlan(tierType);
      setAccountOpen(true);
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

  const handleNavNavigate = (index: number) => {
    if (index === 2) {
      // Already on pricing.
      return;
    }
    navigate("/");
  };

  return (
    <LanguageProvider>
      <KineticGrid className="min-h-screen">
        <div className="relative min-h-screen text-white selection:bg-[#99FFFF]/30">
          <GlassNavbar
            onNavigate={handleNavNavigate}
            onSignIn={() => setAccountOpen(true)}
            onEliteCoaches={() => setEliteCoachesOpen(true)}
          />

          <main className="px-5 py-8 pt-28 sm:pt-32">
            <div className="mx-auto max-w-6xl">
              <header className="flex items-center justify-between py-3">
                <Link to="/" className="font-sans text-xl font-bold tracking-wider text-white hover:text-[#99FFFF] transition-colors">
                  VISOR
                </Link>
                <Button asChild variant="outline" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  <Link to="/account">
                    <User className="mr-1.5 h-4 w-4" />
                    Account
                  </Link>
                </Button>
              </header>

              <SignInDialog
                open={accountOpen}
                onOpenChange={(open) => {
                  setAccountOpen(open);
                  if (!open) setPendingPlan("");
                }}
                redirectTo="/pricing"
                onAuthenticated={() => {
                  if (pendingPlan) {
                    const plan = pendingPlan;
                    setPendingPlan("");
                    void startCheckout(plan);
                  }
                }}
              />
              <EliteCoachesDialog open={eliteCoachesOpen} onOpenChange={setEliteCoachesOpen} />

              <section className="py-14 text-center">
                <h1 className="text-4xl font-bold text-white md:text-6xl">Choose your VISOR plan</h1>
                <p className="mx-auto mt-4 max-w-2xl text-white/70">
                  Subscribe on the web, then sign in with the same account in the mobile app. Prices are shown
                  in USD and exclude any taxes that may apply in your country.
                </p>
                <div className="mx-auto mt-8 inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                  {(["monthly", "annual"] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => setBillingPeriod(period)}
                      className={`h-10 rounded-full px-5 text-sm capitalize transition ${
                        billingPeriod === period
                          ? "bg-[#99FFFF] text-[#0A1926] font-semibold shadow-[0_0_16px_rgba(153,255,255,0.35)]"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
                {error && <p className="mt-5 text-sm text-red-400">{error}</p>}
              </section>

              <section className="grid gap-5 md:grid-cols-3">
                {plans.map((plan) => (
                  <article
                    key={plan.tierType}
                    className={`neon-ball-card flex rounded-2xl p-7 backdrop-blur-xl border transition-transform hover:-translate-y-1 ${
                      plan.highlighted
                        ? "bg-gradient-to-b from-[#99FFFF]/15 to-white/[0.06] border-[#99FFFF]/40 shadow-[0_8px_32px_rgba(153,255,255,0.18)]"
                        : "bg-white/[0.05] border-white/15 hover:border-white/25"
                    }`}
                  >
                    <span className="neon-ball" aria-hidden="true" />
                    <div className="relative z-[3] flex w-full flex-col">
                      {plan.highlighted && (
                        <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase text-[#99FFFF]">
                          <Crown className="h-4 w-4" />
                          Best value
                        </div>
                      )}
                      <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                      <div className="mt-5 flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">
                          {formatPrice(billingPeriod === "monthly" ? plan.monthly : plan.annual, currency)}
                        </span>
                        <span className="text-sm text-white/60">/{billingPeriod === "monthly" ? "mo" : "yr"}</span>
                      </div>
                      <ul className="my-8 flex-1 space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex gap-3 text-sm text-white/80">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#99FFFF]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        onClick={() => startCheckout(plan.tierType)}
                        disabled={loadingPlan === plan.tierType}
                        className={`w-full rounded-full font-semibold transition-all ${
                          plan.highlighted
                            ? "bg-[#99FFFF] text-[#0A1926] hover:bg-[#B3FFFF] shadow-[0_0_20px_rgba(153,255,255,0.45)]"
                            : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
                        }`}
                      >
                        {loadingPlan === plan.tierType && <Loader2 className="h-4 w-4 animate-spin" />}
                        Continue to checkout
                      </Button>
                    </div>
                  </article>
                ))}
              </section>

              <section className="mx-auto mt-12 max-w-3xl space-y-3 rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-sm text-white/70 backdrop-blur-xl">
                <h2 className="text-base font-semibold text-white">Subscription terms</h2>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Elite includes a 7-day free trial. Payment begins when the trial ends unless you cancel before then.</li>
                  <li>All plans renew automatically — monthly plans every month, annual plans every 12 months — at the price shown above, until cancelled.</li>
                  <li>
                    Subscriptions purchased through Apple App Store or Google Play are billed and managed by the applicable
                    platform. Users must cancel subscriptions through their Apple or Google account settings. Refunds for those
                    purchases are handled by Apple or Google under their policies.
                  </li>
                  <li>
                    Web subscriptions can be cancelled at any time from your{" "}
                    <Link to="/account" className="text-[#99FFFF] hover:underline">account page</Link>; access continues until
                    the end of the paid period.
                  </li>
                  <li>No wearable hardware is included in any plan. Any hardware is sold separately and is not part of these subscription fees.</li>
                  <li>
                    See our <Link to="/terms" className="text-[#99FFFF] hover:underline">Terms of Use</Link> and{" "}
                    <Link to="/privacy" className="text-[#99FFFF] hover:underline">Privacy Policy</Link>.
                  </li>
                </ul>
                <p className="pt-1">VISOR Fitness is a product owned and operated by Cedra Kaddour FZ-LLC.</p>
              </section>
            </div>
          </main>

          <Footer />
        </div>
      </KineticGrid>
    </LanguageProvider>
  );
};

export default PricingPage;
