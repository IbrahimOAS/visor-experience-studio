import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarClock,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  Gift,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/auth";
import { createPortalSession, getSubscriptionStatus, SubscriptionStatus } from "@/lib/visor-api";
import AccountShell from "@/components/billing/AccountShell";

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
  const [copied, setCopied] = useState(false);
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

  const referralLink = `https://visorfitness.com?fpr=${session?.user.username ?? ""}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
              <p className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Billing
              </p>
              <Button className="mb-2 w-full" variant="outline" onClick={openPortal} disabled={portalLoading}>
                {portalLoading ? "Opening..." : "Manage billing"}
              </Button>
              <Button asChild className="w-full" variant="outline">
                <Link to="/pricing">Change plan</Link>
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Share your personal link. When someone subscribes through it, you automatically earn{" "}
            <span className="text-primary font-semibold">15% recurring commission</span> — no cap, no expiry.
          </p>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="flex-1 truncate text-sm font-mono text-muted-foreground">{referralLink}</span>
            <Button size="sm" variant="outline" onClick={copyReferralLink} className="shrink-0 gap-1.5">
              {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Commissions are tracked automatically. Check your earnings at{" "}
            <a
              href="https://visorfitness.firstpromoter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              visorfitness.firstpromoter.com
            </a>
          </p>
        </section>

        {/* Referral section */}
        <section className="mt-6 glass-card-strong rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
              <Gift className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Refer &amp; Earn</h2>
              <p className="text-sm text-muted-foreground">Earn 15% of every subscription your friends start</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Share your personal link. When someone subscribes through it, you automatically earn{" "}
            <span className="text-primary font-semibold">15% recurring commission</span> — no cap, no expiry.
          </p>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="flex-1 truncate text-sm font-mono text-muted-foreground">{referralLink}</span>
            <Button size="sm" variant="outline" onClick={copyReferralLink} className="shrink-0 gap-1.5">
              {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Commissions are tracked automatically. Check your earnings at{" "}
            <a
              href="https://visorfitness.firstpromoter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              visorfitness.firstpromoter.com
            </a>
          </p>
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
