import { useEffect, useState } from "react";
import { useCurrency, formatPrice } from "@/hooks/useCurrency";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, CheckCircle2, Crown, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { createCheckoutSession, getSubscriptionStatus, SubscriptionStatus } from "@/lib/visor-api";
import AccountShell from "@/components/billing/AccountShell";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
});

const tierRank: Record<string, number> = { free: 0, core: 1, pro: 2, elite: 3 };

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
    highlighted: true,
  },
  {
    tierType: "elite",
    name: "Elite",
    monthly: 44.90,
    annual: 299.90,
    features: ["Olympia Mode", "Unlimited predictions", "AI nutrition generator", "7-day free trial"],
  },
];

const AccountPlan = () => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const { currency } = useCurrency();
  const [status, setStatus]               = useState<SubscriptionStatus | null>(null);
  const [loadingPlan, setLoadingPlan]     = useState("");
  const [statusLoading, setStatusLoading] = useState(true);
  const [error, setError]                 = useState("");
  useEffect(() => {
    const s = getSession();
    if (!s) { navigate(`/login?redirect=${encodeURIComponent("/account/plan")}`); return; }
    (async () => {
      try { setStatus(await getSubscriptionStatus()); }
      catch { /* non-critical */ }
      finally { setStatusLoading(false); }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCheckout = async (tierType: string) => {
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

  const session = getSession();
  if (!session) return null;

  const currentTier = status?.tier_type ?? "free";
  const currentRank = tierRank[currentTier] ?? 0;

  return (
    <AccountShell>
      <div className="space-y-6">

        {/* ── Header ────────────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {statusLoading ? "Loading…" : currentTier === "free" ? "You're on the free plan." : `You're currently on ${status?.tier_name}.`}
            </p>
          </div>
          {/* Billing period toggle */}
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            {(["monthly", "annual"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setBillingPeriod(period)}
                className={`h-9 rounded-full px-5 text-sm capitalize transition ${
                  billingPeriod === period
                    ? "bg-primary text-background font-semibold shadow-[0_0_12px_hsl(204,100%,73%,0.3)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {period}
                {period === "annual" && <span className="ml-1.5 text-[10px] font-bold text-emerald-400">-40%</span>}
              </button>
            ))}
          </div>
        </motion.div>

        {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">{error}</p>}

        {/* ── Plan cards ────────────────────────────────────────────────────── */}
        <div className="grid gap-4 sm:grid-cols-3">
          {plans.map((plan, i) => {
            const planRank   = tierRank[plan.tierType] ?? 0;
            const isCurrent  = plan.tierType === currentTier;
            const isDowngrade = planRank < currentRank;
            const isHigher   = planRank > currentRank;

            return (
              <motion.article
                key={plan.tierType}
                {...fadeUp(0.06 + i * 0.06)}
                className={`relative flex flex-col rounded-2xl border p-6 transition ${
                  isCurrent
                    ? "border-primary/40 bg-primary/8 shadow-[0_0_24px_hsl(204,100%,73%,0.12)]"
                    : plan.highlighted
                      ? "border-white/20 bg-white/[0.04] hover:border-primary/25"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-background">
                    <CheckCircle2 className="h-3 w-3" />
                    Current plan
                  </div>
                )}
                {plan.highlighted && !isCurrent && (
                  <div className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase text-primary">
                    <Crown className="h-3.5 w-3.5" />
                    Most popular
                  </div>
                )}

                <h2 className="text-xl font-bold">{plan.name}</h2>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold">
                    {formatPrice(billingPeriod === "monthly" ? plan.monthly : plan.annual, currency)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    /{billingPeriod === "monthly" ? "mo" : "yr"}
                  </span>
                </div>

                <ul className="my-6 flex-1 space-y-2.5">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <Button disabled variant="outline" className="w-full rounded-xl border-primary/30 text-primary">
                    <Sparkles className="mr-2 h-4 w-4" /> Active
                  </Button>
                ) : (
                  <Button
                    onClick={() => startCheckout(plan.tierType)}
                    disabled={!!loadingPlan || isDowngrade}
                    className={`w-full rounded-xl font-semibold ${
                      isHigher
                        ? "bg-primary text-background hover:bg-primary/90"
                        : "bg-white/10 text-foreground hover:bg-white/15 border border-white/10"
                    }`}
                  >
                    {loadingPlan === plan.tierType && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isDowngrade ? "Manage via billing" : isHigher ? "Upgrade" : "Select"}
                  </Button>
                )}

                {isDowngrade && (
                  <p className="mt-2 text-center text-[10px] text-muted-foreground">
                    To downgrade, use <span className="text-primary underline cursor-pointer" onClick={() => navigate("/account/billing")}>Manage billing</span>
                  </p>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* ── Note ──────────────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.24)} className="rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4 text-xs text-muted-foreground leading-relaxed">
          All plans auto-renew. Cancel any time from <span className="cursor-pointer text-primary underline" onClick={() => navigate("/account/billing")}>billing</span>. Elite includes a 7-day free trial — payment begins when the trial ends unless cancelled first.
        </motion.div>

      </div>
    </AccountShell>
  );
};

export default AccountPlan;
