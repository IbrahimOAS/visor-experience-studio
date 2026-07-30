import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Activity,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import AccountShell from "@/components/billing/AccountShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/auth";
import { createPortalSession, getSubscriptionStatus, SubscriptionStatus } from "@/lib/visor-api";

const tierRank: Record<string, number> = {
  free: 0,
  core: 1,
  pro: 2,
  elite: 3,
};

const featureRows = [
  { label: "Full AI plan", key: "ai_plan_full", minTier: "core" },
  { label: "Food scanner", key: "food_scanner", minTier: "pro" },
  { label: "Olympia mode", key: "olympia_mode", minTier: "elite" },
  { label: "Priority rendering", key: "priority_ai_rendering", minTier: "elite" },
];

const Account = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const session = getSession();

  const loadStatus = async () => {
    setError("");
    setLoading(true);
    try {
      setStatus(await getSubscriptionStatus());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load account");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) {
      navigate(`/login?redirect=${encodeURIComponent("/account")}`);
      return;
    }

    loadStatus();
  }, [navigate, session]);

  const openPortal = async () => {
    setError("");
    setPortalLoading(true);
    try {
      const { url } = await createPortalSession();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open billing portal");
      setPortalLoading(false);
    }
  };

  const planProgress = useMemo(() => {
    const rank = tierRank[status?.tier_type ?? "free"] ?? 0;
    return Math.max(8, (rank / 3) * 100);
  }, [status?.tier_type]);

  if (!session) return null;

  const subscribed = Boolean(status?.is_subscribed && status?.tier_type !== "free");

  return (
    <AccountShell>
      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <section id="billing" className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <ShieldCheck className="h-4 w-4" />
                {loading ? "Syncing" : subscribed ? "Active subscription" : "Free account"}
              </div>
              <h2 className="text-3xl font-bold">{loading ? "Checking plan..." : status?.tier_name ?? "VISOR FREE"}</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                {subscribed
                  ? "Your web subscription is connected to the same VISOR account used by the mobile app."
                  : "Choose a web plan to unlock VISOR features on this account."}
              </p>
            </div>
            <Button variant="outline" onClick={loadStatus} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Refresh
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-background/35 p-4">
              <p className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                Tier
              </p>
              <p className="text-xl font-bold capitalize">{status?.tier_type ?? "free"}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-background/35 p-4">
              <p className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarClock className="h-4 w-4" />
                Renewal
              </p>
              <p className="text-sm font-semibold">
                {status?.expires_at ? new Date(status.expires_at).toLocaleDateString() : "Not scheduled"}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-background/35 p-4">
              <p className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Billing
              </p>
              <p className="text-sm font-semibold">{status?.will_renew ? "Renews automatically" : "No auto-renewal"}</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-3 flex justify-between text-sm">
              <span className="text-muted-foreground">Plan level</span>
              <span className="font-semibold">{status?.tier_name ?? "VISOR FREE"}</span>
            </div>
            <Progress value={planProgress} className="h-2" />
          </div>

          {error && <p className="mt-5 text-sm text-destructive">{error}</p>}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={openPortal} disabled={portalLoading || !subscribed}>
              {portalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
              Manage billing
            </Button>
            <Button asChild variant="outline">
              <Link to="/pricing">{subscribed ? "Change plan" : "Upgrade plan"}</Link>
            </Button>
          </div>
        </section>

        <section id="usage" className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
          <h3 className="mb-2 flex items-center gap-2 text-xl font-bold">
            <Activity className="h-5 w-5 text-primary" />
            Usage limits
          </h3>
          <p className="mb-6 text-sm leading-6 text-muted-foreground">Current account limits from the Django subscription API.</p>
          <div className="space-y-4">
            {[
              { label: "AI transformations", value: status?.limits?.transformations },
              { label: "Rituals", value: status?.limits?.rituals },
              { label: "Workout sessions", value: status?.limits?.workout_sessions_per_month ?? "Unlimited" },
              { label: "Coach messages", value: status?.limits?.ai_chat_messages_per_day ?? "Unlimited" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-semibold">{String(value ?? "-")}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section id="security" className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-6">
        <h3 className="mb-5 flex items-center gap-2 text-xl font-bold">
          <Zap className="h-5 w-5 text-primary" />
          Feature access
        </h3>
        <div className="space-y-4">
          {featureRows.map((feature) => {
            const enabled =
              typeof status?.feature_flags?.[feature.key] === "boolean"
                ? Boolean(status?.feature_flags?.[feature.key])
                : (tierRank[status?.tier_type ?? "free"] ?? 0) >= tierRank[feature.minTier];
            return (
              <div key={feature.key}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">{feature.label}</p>
                    <p className="text-xs text-muted-foreground">Requires {feature.minTier.toUpperCase()} or above</p>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${enabled ? "text-primary" : "text-muted-foreground"}`}>
                    <CheckCircle2 className="h-4 w-4" />
                    {enabled ? "Enabled" : "Locked"}
                  </div>
                </div>
                <Separator className="mt-4 bg-white/10" />
              </div>
            );
          })}
        </div>
      </section>
    </AccountShell>
  );
};

export default Account;
